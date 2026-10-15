const OUTPUT_CHARACTER_LIMIT = 8_000;

export type GeminiResponseResult =
  | { success: true; message: string; incomplete: boolean }
  | { success: false; category: "invalid_output" | "blocked_output" | "abnormal_finish" };

function isMalformedProviderOutput(content: string): boolean {
  const normalized = content.trim().toLowerCase();
  if (!normalized) return true;
  if (/^(?:prev|next|null|undefined|n\/a|-)\.?$/.test(normalized)) return true;
  return normalized.length < 4 && !/[.!?]/.test(normalized);
}

function trimObviouslyUnfinishedTail(content: string): string {
  const trimmed = content.trim();
  const hasStrongTailSignal =
    /[,;:]$/.test(trimmed) ||
    /\b(?:and|or|but|because|so|which|that|with|to|for|including|such as)$/i.test(trimmed) ||
    /(?:^|\n)\s*(?:-|\*|\d+[.)])\s*$/.test(trimmed);

  if (!hasStrongTailSignal) return trimmed;

  const matches = [...trimmed.matchAll(/[.!?](?=\s|$)/g)];
  const lastBoundary = matches.at(-1)?.index;
  if (lastBoundary === undefined || lastBoundary < 80) return trimmed;
  return trimmed.slice(0, lastBoundary + 1).trim();
}

export function parseGeminiResponse(payload: unknown): GeminiResponseResult {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { success: false, category: "invalid_output" };
  }
  if (!Array.isArray((payload as { candidates?: unknown }).candidates)) {
    return { success: false, category: "invalid_output" };
  }
  const candidate = (payload as {
    candidates?: Array<{
      content?: { parts?: Array<{ text?: unknown }> };
      finishReason?: unknown;
    }>;
  }).candidates?.[0];
  const finishReason = typeof candidate?.finishReason === "string" ? candidate.finishReason.toUpperCase() : "";
  if (finishReason === "SAFETY") return { success: false, category: "blocked_output" };
  if (finishReason !== "STOP" && finishReason !== "MAX_TOKENS") {
    return { success: false, category: "abnormal_finish" };
  }

  const parts = candidate?.content?.parts;
  const content = (Array.isArray(parts) ? parts : [])
    .map((part) => part && typeof part === "object" ? part.text : undefined)
    .filter((text): text is string => typeof text === "string")
    .join("");

  if (typeof content !== "string" || isMalformedProviderOutput(content)) {
    return { success: false, category: "invalid_output" };
  }

  const trimmed = content.trim();
  const characterLimited = trimmed.length > OUTPUT_CHARACTER_LIMIT;
  const bounded = characterLimited ? trimmed.slice(0, OUTPUT_CHARACTER_LIMIT) : trimmed;
  const incomplete = finishReason === "MAX_TOKENS" || characterLimited;

  return {
    success: true,
    message: incomplete ? trimObviouslyUnfinishedTail(bounded) : bounded,
    incomplete,
  };
}

/** Translate only public assistant content, never reasoning or provider metadata. */
export function parseGroqResponse(payload: unknown): GeminiResponseResult {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { success: false, category: "invalid_output" };
  }
  const choices = (payload as { choices?: unknown }).choices;
  if (!Array.isArray(choices) || !choices[0] || typeof choices[0] !== "object") {
    return { success: false, category: "invalid_output" };
  }
  const choice = choices[0] as { finish_reason?: unknown; message?: { role?: unknown; content?: unknown } };
  if (choice.finish_reason === "content_filter") return { success: false, category: "blocked_output" };
  if (choice.finish_reason !== "stop" && choice.finish_reason !== "length") {
    return { success: false, category: "abnormal_finish" };
  }
  if (choice.message?.role !== "assistant" || typeof choice.message.content !== "string") {
    return { success: false, category: "invalid_output" };
  }
  // The UI deliberately renders plain text. Remove simple presentation markers.
  const text = choice.message.content.replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/\*\*([^*\n]+)\*\*/g, "$1");
  return parseGeminiResponse({ candidates: [{
    finishReason: choice.finish_reason === "length" ? "MAX_TOKENS" : "STOP",
    content: { parts: [{ text }] },
  }] });
}