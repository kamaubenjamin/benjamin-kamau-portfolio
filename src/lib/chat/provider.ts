import type { ChatGenerationResult, ChatMessage } from "./types";
import { parseGeminiResponse, parseGroqResponse } from "./provider-response";

const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const DEFAULT_MODEL = "gemini-3.5-flash";
export const PROVIDER_DEADLINE_MS = 20_000;

export class ChatProviderNotConfiguredError extends Error {}
export class ChatProviderQuotaError extends Error {}
export type ChatProviderErrorCategory =
  | "invalid_request" | "permission" | "model_or_endpoint" | "timeout"
  | "provider_unavailable" | "blocked_output" | "abnormal_finish"
  | "invalid_output" | "provider_failure";

export class ChatProviderError extends Error {
  constructor(public readonly category: ChatProviderErrorCategory) {
    super("Provider request failed.");
  }
}

function classifyProviderStatus(status: number): ChatProviderErrorCategory {
  if (status === 400 || status === 422) return "invalid_request";
  if (status === 401 || status === 403) return "permission";
  if (status === 404) return "model_or_endpoint";
  if (status === 408) return "timeout";
  if (status >= 500 && status <= 599) return "provider_unavailable";
  return "provider_failure";
}

export interface ChatProviderConfig {
  provider?: "gemini" | "groq";
  apiKey?: string;
  model?: string;
  requestId?: string;
}

export async function generateChatResponse(
  messages: ChatMessage[], systemPrompt: string, config: ChatProviderConfig,
): Promise<ChatGenerationResult> {
  const apiKey = config.apiKey?.trim();
  if (!apiKey) throw new ChatProviderNotConfiguredError("Chat provider is not configured.");
  const model = config.model?.trim() || DEFAULT_MODEL;
  const groq = config.provider === "groq";
  const provider = groq ? "groq" : "gemini";
  // Keep recent complete turns within a small input budget; never truncate company facts.
  const history = [...messages];
  while (groq && history.length > 1 && new TextEncoder().encode(JSON.stringify(history)).length > 2_000) {
    history.splice(0, 2);
  }
  const started = Date.now();
  const controller = new AbortController();
  let attempts = 0;
  let upstreamStatus: number | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      controller.abort();
      reject(new ChatProviderError("timeout"));
    }, PROVIDER_DEADLINE_MS);
  });
  const work = async (): Promise<ChatGenerationResult> => {
    for (let attempt = 0; attempt < 2; attempt++) {
      if (controller.signal.aborted) throw new ChatProviderError("timeout");
      attempts++;
      const response = await fetch(groq ? "https://api.groq.com/openai/v1/chat/completions"
        : `${GEMINI_API_BASE}/${encodeURIComponent(model)}:generateContent`, {
        method: "POST",
        headers: groq ? { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` }
          : { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify(groq ? {
          model: config.model?.trim() || "openai/gpt-oss-120b",
          messages: [{ role: "system", content: systemPrompt + "\nFor this plain-text interface, use short natural paragraphs and hyphen bullets only. For a business scenario, first clarify the current workflow with one question before proposing implementation. Do not promise WhatsApp integrations or unverified capabilities." }, ...history],
          max_completion_tokens: 1200,
          temperature: 0.2,
          reasoning_effort: "low",
          include_reasoning: false,
        } : {
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: messages.map(message => ({
            role: message.role === "assistant" ? "model" : "user",
            parts: [{ text: message.content }],
          })),
          generationConfig: { maxOutputTokens: 1800, temperature: 0.2, responseMimeType: "text/plain" },
        }),
        signal: controller.signal,
      });
      upstreamStatus = response.status;
      if (!response.ok) {
        await response.body?.cancel();
        // Ambiguous 429s may represent exhausted quota: do not retry automatically.
        if (response.status === 429) throw new ChatProviderQuotaError("Provider usage limit.");
        const category = classifyProviderStatus(response.status);
        if (attempt === 0 && (response.status === 408 || (response.status >= 500 && response.status <= 599))) {
          const retryAfter = response.headers.get("retry-after");
          const seconds = retryAfter === null ? NaN : Number(retryAfter);
          const requestedDelay = retryAfter === null ? 0 : Number.isFinite(seconds)
            ? seconds * 1000 : Date.parse(retryAfter) - Date.now();
          const delay = Math.max(500 * 2 ** attempt + Math.random() * 250,
            Number.isFinite(requestedDelay) ? requestedDelay : 0);
          if (delay + 1000 < PROVIDER_DEADLINE_MS - (Date.now() - started)) {
            console.warn("Benkai Assistant provider retry", {
              requestId: config.requestId, provider, category,
              upstreamStatus, attempt: attempts, durationMs: Date.now() - started,
            });
            await new Promise<void>(resolve => setTimeout(resolve, delay));
            continue;
          }
        }
        throw new ChatProviderError(category);
      }
      let payload: unknown;
      try { payload = await response.json(); }
      catch { throw new ChatProviderError(controller.signal.aborted ? "timeout" : "invalid_output"); }
      const result = groq ? parseGroqResponse(payload) : parseGeminiResponse(payload);
      if (!result.success) throw new ChatProviderError(result.category);
      return result;
    }
    throw new ChatProviderError("provider_unavailable");
  };
  try {
    return await Promise.race([work(), deadline]);
  } catch (error) {
    const category = controller.signal.aborted ? "timeout" : error instanceof ChatProviderQuotaError
      ? "usage_limit" : error instanceof ChatProviderError ? error.category : "provider_failure";
    console.warn("Benkai Assistant provider failure", {
      requestId: config.requestId, provider, category, upstreamStatus,
      attempts, durationMs: Date.now() - started,
    });
    if (error instanceof ChatProviderQuotaError) throw error;
    throw new ChatProviderError(category === "usage_limit" ? "provider_failure" : category);
  } finally {
    clearTimeout(timer);
  }
}
