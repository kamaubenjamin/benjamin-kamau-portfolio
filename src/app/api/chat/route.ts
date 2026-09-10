import { NextResponse } from "next/server";
import { buildBenkaiSystemPrompt } from "@/lib/chat/knowledge";
import {
  ChatProviderNotConfiguredError,
  ChatProviderQuotaError,
  generateChatResponse,
} from "@/lib/chat/provider";
import { MAX_REQUEST_BYTES, validateChatPayload } from "@/lib/chat/validation";
import type { ChatErrorResponse, ChatRequestMetadata, ChatSuccessResponse } from "@/lib/chat/types";
import { ANONYMOUS_SESSION_ID_PATTERN, writeChatAnalytics } from "@/lib/chat/analytics";
import { getLocalChatAnswer } from "@/lib/chat/local-answers";

export const runtime = "nodejs";

const responseHeaders = {
  "Cache-Control": "no-store",
  "Content-Type": "application/json",
  "X-Content-Type-Options": "nosniff",
};
const MAX_GEMINI_TURNS_PER_SESSION = 4;

function validateMetadata(value: unknown): ChatRequestMetadata {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const metadata = value as ChatRequestMetadata;
  return {
    sessionId: typeof metadata.sessionId === "string" && ANONYMOUS_SESSION_ID_PATTERN.test(metadata.sessionId) ? metadata.sessionId : undefined,
    geminiTurns: Number.isInteger(metadata.geminiTurns) && Number(metadata.geminiTurns) >= 0 && Number(metadata.geminiTurns) <= MAX_GEMINI_TURNS_PER_SESSION
      ? Number(metadata.geminiTurns)
      : undefined,
    viewport: metadata.viewport === "mobile" || metadata.viewport === "tablet" || metadata.viewport === "desktop" ? metadata.viewport : undefined,
  };
}

function errorResponse(error: string, code: ChatErrorResponse["code"], status: number) {
  return NextResponse.json<ChatErrorResponse>({ error, code }, { status, headers: responseHeaders });
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return errorResponse("Content-Type must be application/json.", "INVALID_REQUEST", 415);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_REQUEST_BYTES) {
    return errorResponse("Request is too large.", "INVALID_REQUEST", 413);
  }

  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return errorResponse("Cross-origin requests are not accepted.", "INVALID_REQUEST", 403);
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return errorResponse("The request body could not be read.", "INVALID_REQUEST", 400);
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
    return errorResponse("Request is too large.", "INVALID_REQUEST", 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return errorResponse("The request body must be valid JSON.", "INVALID_REQUEST", 400);
  }

  const validated = validateChatPayload(body);
  if (!validated.success) return errorResponse(validated.error, "INVALID_REQUEST", 400);

  const metadata = validateMetadata((body as { metadata?: unknown }).metadata);
  const latestMessage = validated.messages.at(-1)?.content ?? "";
  const localAnswer = getLocalChatAnswer(latestMessage);
  if (localAnswer) {
    if (metadata.sessionId) writeChatAnalytics({ event: "chat_local_answer", sessionId: metadata.sessionId, source: "local_grounded", projectSlug: localAnswer.projectSlug, viewport: metadata.viewport });
    return NextResponse.json<ChatSuccessResponse>({ message: localAnswer.message, source: "local_grounded", projectSlug: localAnswer.projectSlug }, { headers: responseHeaders });
  }

  if ((metadata.geminiTurns ?? 0) >= MAX_GEMINI_TURNS_PER_SESSION) {
    if (metadata.sessionId) writeChatAnalytics({ event: "chat_session_limit", sessionId: metadata.sessionId, outcome: "session_budget", viewport: metadata.viewport });
    return errorResponse(
      "You've reached this session's AI conversation limit. You can still ask about Benkai's projects and services, or contact us to continue the discussion.",
      "SESSION_LIMIT",
      429,
    );
  }

  try {
    if (metadata.sessionId) writeChatAnalytics({ event: "chat_gemini_request", sessionId: metadata.sessionId, source: "gemini", viewport: metadata.viewport });
    const result = await generateChatResponse(validated.messages, buildBenkaiSystemPrompt());
    if (metadata.sessionId) writeChatAnalytics({ event: "chat_gemini_answer", sessionId: metadata.sessionId, source: "gemini", outcome: result.incomplete ? "incomplete" : "success", viewport: metadata.viewport });
    return NextResponse.json<ChatSuccessResponse>({ message: result.message, source: "gemini", incomplete: result.incomplete || undefined }, { headers: responseHeaders });
  } catch (error) {
    if (error instanceof ChatProviderNotConfiguredError) {
      return errorResponse(
        "Benkai Assistant is not available yet. You can still discuss your workflow through our contact page.",
        "PROVIDER_REQUIRED",
        503,
      );
    }

    if (error instanceof ChatProviderQuotaError) {
      if (metadata.sessionId) writeChatAnalytics({ event: "chat_quota_limit", sessionId: metadata.sessionId, source: "gemini", outcome: "quota", viewport: metadata.viewport });
      return errorResponse(
        "The Benkai Assistant has reached its current AI usage limit. You can still explore our work or contact Benkai Systems directly.",
        "PROVIDER_LIMIT",
        429,
      );
    }

    if (metadata.sessionId) writeChatAnalytics({ event: "chat_error", sessionId: metadata.sessionId, source: "gemini", outcome: "provider_failure", viewport: metadata.viewport });

    return errorResponse(
      "Benkai Assistant could not respond just now. Please try again shortly or use the contact page.",
      "SERVICE_UNAVAILABLE",
      502,
    );
  }
}