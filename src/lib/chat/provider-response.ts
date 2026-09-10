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

  const content = candidate?.content?.parts
    ?.map((part) => part.text)
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