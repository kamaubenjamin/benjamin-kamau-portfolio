import { NextResponse } from "next/server";
import {
  ANONYMOUS_SESSION_ID_PATTERN,
  CHAT_EVENT_NAMES,
  type ChatAnalyticsEvent,
  writeChatAnalytics,
} from "@/lib/chat/analytics";

export const runtime = "nodejs";

const MAX_ANALYTICS_REQUEST_BYTES = 1_024;
const UI_EVENTS = new Set<ChatAnalyticsEvent["event"]>([
  "chat_open",
  "starter_prompt_click",
  "chat_retry",
  "chat_contact_click",
]);

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: "Cross-origin requests are not accepted." }, { status: 403 });
  }

  if (!(request.headers.get("content-type") ?? "").toLowerCase().startsWith("application/json")) {
    return NextResponse.json({ error: "Content-Type must be application/json." }, { status: 415 });
  }

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > MAX_ANALYTICS_REQUEST_BYTES) {
    return NextResponse.json({ error: "Request is too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "The request body must be valid JSON." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid analytics event." }, { status: 400 });
  }

  const allowedKeys = new Set(["event", "sessionId", "viewport"]);
  if (Object.keys(body).some((key) => !allowedKeys.has(key))) {
    return NextResponse.json({ error: "Invalid analytics event." }, { status: 400 });
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
    return NextResponse.json({ error: "Invalid analytics event." }, { status: 400 });
  }

  writeChatAnalytics({ event: event as ChatAnalyticsEvent["event"], sessionId, viewport: viewport as "mobile" | "tablet" | "desktop" });
  return new NextResponse(null, { status: 204, headers: { "Cache-Control": "no-store" } });
}