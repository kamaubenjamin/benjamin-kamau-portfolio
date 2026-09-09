import "server-only";

import type { ChatMessage } from "./types";

const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const DEFAULT_MODEL = "gemini-2.5-flash-lite";
const OUTPUT_TOKEN_LIMIT = 500;

export class ChatProviderNotConfiguredError extends Error {}
export class ChatProviderQuotaError extends Error {}

export async function generateChatResponse(
  messages: ChatMessage[],
  systemPrompt: string,
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) throw new ChatProviderNotConfiguredError("Chat provider is not configured.");

  const model = process.env.GEMINI_MODEL?.trim() || DEFAULT_MODEL;
  const response = await fetch(`${GEMINI_API_BASE}/${encodeURIComponent(model)}:generateContent`, {
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

  if (response.status === 429) {
    await response.body?.cancel();
    throw new ChatProviderQuotaError("Chat provider quota is exhausted.");
  }

  if (!response.ok) throw new Error("Provider request failed.");

  const payload: unknown = await response.json();
  const parts = (payload as { candidates?: Array<{ content?: { parts?: Array<{ text?: unknown }> } }> })
    .candidates?.[0]?.content?.parts;
  const content = parts
    ?.map((part) => part.text)
    .filter((text): text is string => typeof text === "string")
    .join("");

  if (typeof content !== "string" || !content.trim()) {
    throw new Error("Provider returned an invalid response.");
  }

  return content.trim().slice(0, 4_000);
}