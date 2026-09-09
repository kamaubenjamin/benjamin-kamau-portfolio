import "server-only";

import type { ChatMessage } from "./types";

const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const DEFAULT_MODEL = "gemini-3.5-flash";
const OUTPUT_TOKEN_LIMIT = 1200;
const OUTPUT_CHARACTER_LIMIT = 8_000;

export class ChatProviderNotConfiguredError extends Error {}
export class ChatProviderQuotaError extends Error {}

type ChatProviderErrorCategory =
  | "invalid_request"
  | "permission"
  | "model_or_endpoint"
  | "timeout"
  | "provider_unavailable"
  | "provider_failure";

export class ChatProviderError extends Error {
  constructor(public readonly category: ChatProviderErrorCategory) {
    super("Provider request failed.");
  }
}

function classifyProviderStatus(status: number): ChatProviderErrorCategory {
  if (status === 400) return "invalid_request";
  if (status === 403) return "permission";
  if (status === 404) return "model_or_endpoint";
  if (status === 408 || status >= 500) return status === 408 ? "timeout" : "provider_unavailable";
  return "provider_failure";
}

function isMalformedProviderOutput(content: string): boolean {
  const normalized = content.trim().toLowerCase();
  if (!normalized) return true;
  if (/^(?:prev|next|null|undefined|n\/a|-)\.?$/.test(normalized)) return true;
  return normalized.length < 4 && !/[.!?]/.test(normalized);
}

export async function generateChatResponse(
  messages: ChatMessage[],
  systemPrompt: string,
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) throw new ChatProviderNotConfiguredError("Chat provider is not configured.");

  const model = process.env.GEMINI_MODEL?.trim() || DEFAULT_MODEL;
  let response: Response;
  try {
    response = await fetch(`${GEMINI_API_BASE}/${encodeURIComponent(model)}:generateContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: messages.map((message) => ({
          role: message.role === "assistant" ? "model" : "user",
          parts: [{ text: message.content }],
        })),
        generationConfig: {
          maxOutputTokens: OUTPUT_TOKEN_LIMIT,
          temperature: 0.2,
          responseMimeType: "text/plain",
        },
      }),
      signal: AbortSignal.timeout(20_000),
    });
  } catch (error) {
    const category: ChatProviderErrorCategory =
      error instanceof DOMException && error.name === "TimeoutError" ? "timeout" : "provider_failure";
    console.warn("Benkai Assistant provider failure", { provider: "gemini", model, category });
    throw new ChatProviderError(category);
  }

  if (response.status === 429) {
    await response.body?.cancel();
    throw new ChatProviderQuotaError("Chat provider quota is exhausted.");
  }

  if (!response.ok) {
    const category = classifyProviderStatus(response.status);
    await response.body?.cancel();
    console.warn("Benkai Assistant provider failure", {
      provider: "gemini",
      model,
      upstreamStatus: response.status,
      category,
    });
    throw new ChatProviderError(category);
  }

  const payload: unknown = await response.json();
  const parts = (payload as { candidates?: Array<{ content?: { parts?: Array<{ text?: unknown }> } }> })
    .candidates?.[0]?.content?.parts;
  const content = parts
    ?.map((part) => part.text)
    .filter((text): text is string => typeof text === "string")
    .join("");

  if (typeof content !== "string" || isMalformedProviderOutput(content)) {
    throw new Error("Provider returned an invalid response.");
  }

  return content.trim().slice(0, OUTPUT_CHARACTER_LIMIT);
}