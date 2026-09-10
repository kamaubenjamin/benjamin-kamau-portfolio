import assert from "node:assert/strict";
import test from "node:test";
import { parseGeminiResponse } from "./provider-response.ts";

function payload(text, finishReason) {
  return { candidates: [{ content: { parts: [{ text }] }, finishReason }] };
}

test("accepts a complete plain-text GymBolt overview", () => {
  const message = "GymBolt brings memberships, billing, attendance, services, lockers, and member access into one operational workflow. Reception staff can register members and manage day-to-day activity, while role-based access limits what each person can see. It is a live controlled pilot at Lock & Load Gym, not a production-scale SaaS rollout.\n\nYou can ask me specifically about billing, attendance, memberships, mobile use, or member access.";
  assert.deepEqual(parseGeminiResponse(payload(message, "STOP")), {
    success: true,
    message,
    incomplete: false,
  });
  assert.match(message, /access\.$/);
  assert.doesNotMatch(message, /\*\*|^#/m);
});

test("accepts a complete billing follow-up with preserved GymBolt context", () => {
  const message = "In GymBolt, creating an invoice does not activate a membership by itself. The system records payments against the invoice, supports partial payments, and applies the membership change only after the exact amount is settled. This keeps billing records and member access aligned.";
  const result = parseGeminiResponse(payload(message, "STOP"));
  assert.deepEqual(result, { success: true, message, incomplete: false });
  assert.match(message, /aligned\.$/);
});

test("marks MAX_TOKENS output incomplete and removes an obvious comma-ending fragment when possible", () => {
  const text = "GymBolt supports the daily reception workflow for a live controlled pilot at Lock & Load Gym. When a new member arrives, receptionists can register them,";
  assert.deepEqual(parseGeminiResponse(payload(text, "MAX_TOKENS")), {
    success: true,
    message: "GymBolt supports the daily reception workflow for a live controlled pilot at Lock & Load Gym.",
    incomplete: true,
  });
});

test("marks naturally ending MAX_TOKENS output incomplete without discarding usable prose", () => {
  const message = "GymBolt keeps billing and membership status aligned.";
  assert.deepEqual(parseGeminiResponse(payload(message, "MAX_TOKENS")), {
    success: true,
    message,
    incomplete: true,
  });
});

test("classifies safety and other abnormal finishes without exposing raw metadata", () => {
  assert.deepEqual(parseGeminiResponse({ candidates: [{ finishReason: "SAFETY" }] }), {
    success: false,
    category: "blocked_output",
  });
  assert.deepEqual(parseGeminiResponse(payload("Unfinished response", "RECITATION")), {
    success: false,
    category: "abnormal_finish",
  });
});

test("marks the server character ceiling as incomplete rather than silently successful", () => {
  const result = parseGeminiResponse(payload(`Complete opening sentence. ${"a".repeat(8_100)}`, "STOP"));
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.incomplete, true);
    assert.equal(result.message.length, 8_000);
  }
});