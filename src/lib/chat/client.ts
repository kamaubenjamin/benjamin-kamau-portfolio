import type { ChatMessage, ChatRequestMetadata, ChatSuccessResponse } from "./types";

export const CLIENT_DEADLINE_MS = 25_000;
const FAILURE = "Benkai Assistant could not respond just now. Please try again shortly or use the contact page.";
export class ChatClientError extends Error {
  constructor(message: string, public readonly code?: string) { super(message); }
}

/** No automatic client retry: explicit retry reuses the failed conversation. */
export async function requestChat(messages: ChatMessage[], metadata: ChatRequestMetadata): Promise<ChatSuccessResponse> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CLIENT_DEADLINE_MS);
  try {
    const response = await fetch("/api/chat", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, metadata }), signal: controller.signal,
    });
    let payload: unknown;
    try { payload = await response.json(); } catch { throw new Error(FAILURE); }
    if (!payload || typeof payload !== "object") throw new Error(FAILURE);
    const data = payload as Record<string, unknown>;
    if (!response.ok || "error" in data) {
      // Only application-owned messages are displayed; never raw upstream payloads.
      const safeCodes = ["INVALID_REQUEST", "PROVIDER_REQUIRED", "PROVIDER_LIMIT", "SESSION_LIMIT", "SERVICE_UNAVAILABLE"];
      throw new ChatClientError(typeof data.code === "string" && safeCodes.includes(data.code)
        && typeof data.error === "string" && data.error.length <= 300 ? data.error : FAILURE,
        typeof data.code === "string" && safeCodes.includes(data.code) ? data.code : undefined);
    }
    if (typeof data.message !== "string" || !data.message.trim()
      || (data.source !== "gemini" && data.source !== "groq" && data.source !== "local_grounded")) throw new Error(FAILURE);
    return data as unknown as ChatSuccessResponse;
  } catch (error) {
    if (controller.signal.aborted) throw new Error("Benkai Assistant took too long to respond. Please try again or use the contact page.");
    if (error instanceof TypeError) throw new Error(FAILURE);
    throw error;
  } finally {
    clearTimeout(timer);
  }
}