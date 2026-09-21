import {
  ANONYMOUS_SESSION_ID_PATTERN,
  CHAT_EVENT_NAMES,
  type ChatAnalyticsEvent,
  writeChatAnalytics,
} from "@/lib/chat/analytics";
import type { BenkaiEnv } from "./env";

const MAX_ANALYTICS_REQUEST_BYTES = 1_024;
const UI_EVENTS = new Set<ChatAnalyticsEvent["event"]>([
  "chat_open",
  "starter_prompt_click",
  "chat_retry",
  "chat_contact_click",
]);

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Cache-Control": "no-store", "Content-Type": "application/json" },
  });
}

/**
 * `POST /api/chat/analytics` — UI-level Assistant events only.
 *
 * Event name, anonymous session id and viewport class are accepted; no chat
 * message content, prompt text or personal data is ever stored.
 */
export async function handleChatAnalyticsRequest(request: Request, env: BenkaiEnv): Promise<Response> {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return jsonResponse({ error: "Cross-origin requests are not accepted." }, 403);
  }

  if (!(request.headers.get("content-type") ?? "").toLowerCase().startsWith("application/json")) {
    return jsonResponse({ error: "Content-Type must be application/json." }, 415);
  }

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > MAX_ANALYTICS_REQUEST_BYTES) {
    return jsonResponse({ error: "Request is too large." }, 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return jsonResponse({ error: "The request body must be valid JSON." }, 400);
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return jsonResponse({ error: "Invalid analytics event." }, 400);
  }

  const allowedKeys = new Set(["event", "sessionId", "viewport"]);
  if (Object.keys(body).some((key) => !allowedKeys.has(key))) {
    return jsonResponse({ error: "Invalid analytics event." }, 400);
  }

  const { event, sessionId, viewport } = body as { event?: unknown; sessionId?: unknown; viewport?: unknown };
  const validViewport = viewport === "mobile" || viewport === "tablet" || viewport === "desktop";
  if (
    typeof event !== "string" ||
    !CHAT_EVENT_NAMES.includes(event as ChatAnalyticsEvent["event"]) ||
    !UI_EVENTS.has(event as ChatAnalyticsEvent["event"]) ||
    typeof sessionId !== "string" ||
    !ANONYMOUS_SESSION_ID_PATTERN.test(sessionId) ||
    !validViewport
  ) {
    return jsonResponse({ error: "Invalid analytics event." }, 400);
  }

  writeChatAnalytics(env, {
    event: event as ChatAnalyticsEvent["event"],
    sessionId,
    viewport: viewport as "mobile" | "tablet" | "desktop",
  });
  return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
}
