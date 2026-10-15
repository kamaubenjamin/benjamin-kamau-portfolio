import { buildBenkaiSystemPrompt } from "@/lib/chat/knowledge";
import {
  ChatProviderNotConfiguredError,
  ChatProviderQuotaError,
  ChatProviderError,
  generateChatResponse,
} from "@/lib/chat/provider";
import { MAX_REQUEST_BYTES, validateChatPayload } from "@/lib/chat/validation";
import type { ChatErrorResponse, ChatRequestMetadata, ChatSuccessResponse } from "@/lib/chat/types";
import { ANONYMOUS_SESSION_ID_PATTERN, writeChatAnalytics } from "@/lib/chat/analytics";
import { getLocalChatAnswer } from "@/lib/chat/local-answers";
import type { BenkaiEnv } from "./env";

const responseHeaders = {
  "Cache-Control": "no-store",
  "Content-Type": "application/json",
  "X-Content-Type-Options": "nosniff",
};
const MAX_GEMINI_TURNS_PER_SESSION = 4;

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), { status, headers: responseHeaders });
}

function validateMetadata(value: unknown): ChatRequestMetadata {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const metadata = value as ChatRequestMetadata;
  return {
    sessionId:
      typeof metadata.sessionId === "string" && ANONYMOUS_SESSION_ID_PATTERN.test(metadata.sessionId)
        ? metadata.sessionId
        : undefined,
    geminiTurns:
      Number.isInteger(metadata.geminiTurns) &&
      Number(metadata.geminiTurns) >= 0 &&
      Number(metadata.geminiTurns) <= MAX_GEMINI_TURNS_PER_SESSION
        ? Number(metadata.geminiTurns)
        : undefined,
    viewport:
      metadata.viewport === "mobile" || metadata.viewport === "tablet" || metadata.viewport === "desktop"
        ? metadata.viewport
        : undefined,
  };
}

/**
 * `POST /api/chat` — hybrid Benkai Assistant endpoint.
 *
 * Local grounded answers resolve first and return without calling the provider.
 * Only unresolved questions reach the configured provider, subject to the session budget.
 * Chat content is never written to analytics.
 */
export async function handleChatRequest(request: Request, env: BenkaiEnv): Promise<Response> {
  const requestId = crypto.randomUUID();
  const started = Date.now();
  const provider = env.CHAT_PROVIDER === "groq" ? "groq" : "gemini";
  const respond = (body: unknown, status: number): Response => {
    const response = jsonResponse(body, status);
    response.headers.set("X-Request-ID", requestId);
    return response;
  };
  const errorResponse = (error: string, code: ChatErrorResponse["code"], status: number): Response =>
    respond({ error, code, requestId } satisfies ChatErrorResponse, status);
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
    if (metadata.sessionId) {
      writeChatAnalytics(env, {
        event: "chat_local_answer",
        sessionId: metadata.sessionId,
        source: "local_grounded",
        projectSlug: localAnswer.projectSlug,
        viewport: metadata.viewport,
      });
    }
    return respond(
      {
        message: localAnswer.message,
        source: "local_grounded",
        projectSlug: localAnswer.projectSlug,
      } satisfies ChatSuccessResponse,
      200,
    );
  }


  if ((metadata.geminiTurns ?? 0) >= MAX_GEMINI_TURNS_PER_SESSION) {
    if (metadata.sessionId) {
      writeChatAnalytics(env, {
        event: "chat_session_limit",
        sessionId: metadata.sessionId,
        outcome: "session_budget",
        viewport: metadata.viewport,
      });
    }
    return errorResponse(
      "You've reached this session's AI conversation limit. You can still ask about Benkai's projects and services, or contact us to continue the discussion.",
      "SESSION_LIMIT",
      429,
    );
  }

  try {
    if (metadata.sessionId) {
      writeChatAnalytics(env, {
        event: provider === "groq" ? "chat_groq_request" : "chat_gemini_request",
        sessionId: metadata.sessionId,
        source: provider,
        viewport: metadata.viewport,
      });
    }
    const result = await generateChatResponse(validated.messages, buildBenkaiSystemPrompt(), {
      provider,
      apiKey: provider === "groq" ? env.GROQ_API_KEY : env.GEMINI_API_KEY,
      model: provider === "groq" ? env.GROQ_MODEL : env.GEMINI_MODEL,
      requestId,
    });
    if (metadata.sessionId) {
      writeChatAnalytics(env, {
        event: provider === "groq" ? "chat_groq_answer" : "chat_gemini_answer",
        sessionId: metadata.sessionId,
        source: provider,
        outcome: result.incomplete ? "incomplete" : "success",
        viewport: metadata.viewport,
      });
    }
    return respond(
      {
        message: result.message,
        source: provider,
        incomplete: result.incomplete || undefined,
      } satisfies ChatSuccessResponse,
      200,
    );
  } catch (error) {
    console.warn("Benkai Assistant request failure", {
      requestId,
      category: error instanceof ChatProviderNotConfiguredError ? "not_configured"
        : error instanceof ChatProviderQuotaError ? "usage_limit"
        : error instanceof ChatProviderError ? error.category : "application_failure",
      durationMs: Date.now() - started,
    });
    if (error instanceof ChatProviderNotConfiguredError) {
      return errorResponse(
        "Benkai Assistant is not available yet. You can still discuss your workflow through our contact page.",
        "PROVIDER_REQUIRED",
        503,
      );
    }

    if (error instanceof ChatProviderQuotaError) {
      if (metadata.sessionId) {
        writeChatAnalytics(env, {
          event: "chat_quota_limit",
          sessionId: metadata.sessionId,
          source: provider,
          outcome: "quota",
          viewport: metadata.viewport,
        });
      }
      return errorResponse(
        "The Benkai Assistant has reached its current AI usage limit. You can still explore our work or contact Benkai Systems directly.",
        "PROVIDER_LIMIT",
        429,
      );
    }

    if (metadata.sessionId) {
      writeChatAnalytics(env, {
        event: "chat_error",
        sessionId: metadata.sessionId,
        source: provider,
        outcome: "provider_failure",
        viewport: metadata.viewport,
      });
    }

    return errorResponse(
      "Benkai Assistant could not respond just now. Please try again shortly or use the contact page.",
      "SERVICE_UNAVAILABLE",
      502,
    );
  }
}
