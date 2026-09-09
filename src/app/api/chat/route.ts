import { NextResponse } from "next/server";
import { buildBenkaiSystemPrompt } from "@/lib/chat/knowledge";
import {
  ChatProviderNotConfiguredError,
  ChatProviderQuotaError,
  generateChatResponse,
} from "@/lib/chat/provider";
import { MAX_REQUEST_BYTES, validateChatPayload } from "@/lib/chat/validation";
import type { ChatErrorResponse, ChatSuccessResponse } from "@/lib/chat/types";

export const runtime = "nodejs";

const responseHeaders = {
  "Cache-Control": "no-store",
  "Content-Type": "application/json",
  "X-Content-Type-Options": "nosniff",
};

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

  try {
    const message = await generateChatResponse(validated.messages, buildBenkaiSystemPrompt());
    return NextResponse.json<ChatSuccessResponse>({ message }, { headers: responseHeaders });
  } catch (error) {
    if (error instanceof ChatProviderNotConfiguredError) {
      return errorResponse(
        "Benkai Assistant is not available yet. You can still discuss your workflow through our contact page.",
        "PROVIDER_REQUIRED",
        503,
      );
    }

    if (error instanceof ChatProviderQuotaError) {
      return errorResponse(
        "The Benkai Assistant has reached its current AI usage limit. You can still explore our work or contact Benkai Systems directly.",
        "PROVIDER_LIMIT",
        429,
      );
    }

    return errorResponse(
      "Benkai Assistant could not respond just now. Please try again shortly or use the contact page.",
      "SERVICE_UNAVAILABLE",
      502,
    );
  }
}