import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

// Compile the actual TS modules in memory; no new dependency or generated artifacts.
const root = process.cwd();
const cache = new Map();
function load(file) {
  file = path.resolve(file);
  if (cache.has(file)) return cache.get(file).exports;
  const compiled = { exports: {} };
  cache.set(file, compiled);
  const code = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const require = name => load(name.startsWith("@/")
    ? path.join(root, "src", name.slice(2) + ".ts")
    : path.resolve(path.dirname(file), name + ".ts"));
  vm.runInThisContext(`(function(require,module,exports){${code}\n})`, { filename: file })(require, compiled, compiled.exports);
  return compiled.exports;
}
const provider = load("src/lib/chat/provider.ts");
const { getLocalChatAnswer } = load("src/lib/chat/local-answers.ts");
const { handleChatRequest } = load("workers/chat.ts");
const { requestChat } = load("src/lib/chat/client.ts");
const messages = [{ role: "user", content: "fictional workflow question" }];
const success = () => Response.json({ candidates: [{ finishReason: "STOP", content: { parts: [{ text: "A grounded workflow response." }] } }] });
const originalFetch = globalThis.fetch;
const originalWarn = console.warn;
const logs = [];
console.warn = (...args) => logs.push(args);
test.after(() => { globalThis.fetch = originalFetch; console.warn = originalWarn; });
const generate = () => provider.generateChatResponse(messages, "private-system-context", { apiKey: "secret-test-key", requestId: "safe-id" });

test("explicit company intents use canonical facts, not broad keywords", () => {
  assert.match(getLocalChatAnswer("Who is BenKai?").message, /independent software and data systems studio/);
  assert.match(getLocalChatAnswer("Who founded BenKai Systems?").message, /Benjamin Kamau/);
  assert.match(getLocalChatAnswer("What services does BenKai Systems offer?").message, /Data Engineering/);
  assert.equal(getLocalChatAnswer("Who is Benkai and how should I reconcile my workflow?"), null);
});
test("genuine provider response and one transient retry preserve analytics", async () => {
  let calls = 0;
  globalThis.fetch = async () => ++calls === 1 ? new Response(null, { status: 503 }) : success();
  const events = [];
  const response = await handleChatRequest(new Request("https://example.test/api/chat", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, metadata: { sessionId: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa" } }),
  }), { GEMINI_API_KEY: "secret-test-key", BENKAI_ANALYTICS: { writeDataPoint: e => events.push(e) } });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).source, "gemini");
  assert.match(response.headers.get("X-Request-ID"), /^[0-9a-f-]{36}$/);
  assert.equal(calls, 2);
  assert.deepEqual(events.map(e => e.blobs[0]), ["chat_gemini_request", "chat_gemini_answer"]);
});
test("persistent failure retries only once", async () => {
  let calls = 0;
  globalThis.fetch = async () => { calls++; return new Response(null, { status: 503 }); };
  await assert.rejects(generate(), e => e.category === "provider_unavailable");
  assert.equal(calls, 2);
});
test("local answers never call Gemini; failed request records one final error", async () => {
  let calls = 0;
  globalThis.fetch = async () => { calls++; return new Response(null, { status: 503 }); };
  const events = [];
  const env = { GEMINI_API_KEY: "secret-test-key", BENKAI_ANALYTICS: { writeDataPoint: e => events.push(e) } };
  const request = content => new Request("https://example.test/api/chat", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: [{ role: "user", content }], metadata: { sessionId: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa" } }),
  });
  const local = await handleChatRequest(request("who is benkai?"), env);
  assert.equal((await local.json()).source, "local_grounded");
  assert.equal(calls, 0);
  events.length = 0;
  const failed = await handleChatRequest(request("fictional workflow question"), env);
  const payload = await failed.json();
  assert.equal(failed.status, 502);
  assert.equal(payload.code, "SERVICE_UNAVAILABLE");
  assert.equal(payload.requestId, failed.headers.get("X-Request-ID"));
  assert.deepEqual(events.map(e => e.blobs[0]), ["chat_gemini_request", "chat_error"]);
  assert.equal(calls, 2);
});
test("permanent statuses, usage limits, and long Retry-After never retry", async () => {
  for (const status of [400, 401, 403, 404, 429, 503]) {
    let calls = 0;
    globalThis.fetch = async () => { calls++; return new Response(null, { status, headers: { "Retry-After": "60" } }); };
    await assert.rejects(generate());
    assert.equal(calls, 1);
  }
  globalThis.fetch = async () => { throw Error("must not fetch"); };
  await assert.rejects(provider.generateChatResponse(messages, "", {}), provider.ChatProviderNotConfiguredError);
});
test("shared deadline covers fetch and body reading", async () => {
  const original = globalThis.setTimeout;
  globalThis.setTimeout = (fn, ms, ...args) => original(fn, ms === 20000 ? 10 : ms, ...args);
  try {
    globalThis.fetch = async () => new Promise(() => {});
    await assert.rejects(generate(), e => e.category === "timeout");
    globalThis.fetch = async () => ({ ok: true, status: 200, json: () => new Promise(() => {}) });
    await assert.rejects(generate(), e => e.category === "timeout");
  } finally { globalThis.setTimeout = original; }
});
test("invalid outputs are categorized and sensitive content never reaches logs", async () => {
  for (const payload of [null, {}, { candidates: [{ finishReason: "STOP", content: { parts: [null, {}] } }] }]) {
    globalThis.fetch = async () => Response.json(payload);
    await assert.rejects(generate(), e => e.category === "invalid_output");
  }
  globalThis.fetch = async () => { throw Error("secret-test-key private-system-context fictional workflow question"); };
  await assert.rejects(generate(), e => e.category === "provider_failure");
  assert.doesNotMatch(JSON.stringify(logs), /secret-test-key|private-system-context|fictional workflow question/);
});
test("client errors, timeout and explicit retry preserve request history", async () => {
  const sent = [];
  globalThis.fetch = async (_url, options) => {
    sent.push(JSON.parse(options.body));
    return sent.length === 1 ? Response.json({ code: "SERVICE_UNAVAILABLE", error: "Safe failure." }, { status: 502 })
      : Response.json({ message: "Workflow answer.", source: "gemini" });
  };
  await assert.rejects(requestChat(messages, {}), /Safe failure/);
  assert.equal((await requestChat(messages, {})).source, "gemini");
  assert.deepEqual(sent[0], sent[1]);
  globalThis.fetch = async () => new Response("sensitive-provider-payload", { status: 502 });
  await assert.rejects(requestChat(messages, {}), e => !e.message.includes("sensitive"));
  const original = globalThis.setTimeout;
  globalThis.setTimeout = (fn, ms) => original(fn, ms === 25000 ? 10 : ms);
  try {
    globalThis.fetch = (_url, options) => new Promise((_, reject) => options.signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError"))));
    await assert.rejects(requestChat(messages, {}), /too long/);
  } finally { globalThis.setTimeout = original; }
});