import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";

export const CHAT_EVENT_NAMES = [
  "chat_open",
  "starter_prompt_click",
  "chat_local_answer",
  "chat_gemini_request",
  "chat_gemini_answer",
  "chat_retry",
  "chat_error",
  "chat_quota_limit",
  "chat_session_limit",
  "chat_contact_click",
] as const;

export type ChatEventName = (typeof CHAT_EVENT_NAMES)[number];
export type ChatAnswerSource = "local_grounded" | "gemini";
export type ViewportClass = "mobile" | "tablet" | "desktop";

export interface ChatAnalyticsEvent {
  event: ChatEventName;
  sessionId: string;
  source?: ChatAnswerSource;
  projectSlug?: string;
  outcome?: string;
  viewport?: ViewportClass;
}

export const ANONYMOUS_SESSION_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function writeChatAnalytics(event: ChatAnalyticsEvent): void {
  try {
    const { env } = getCloudflareContext();
    env.BENKAI_ANALYTICS?.writeDataPoint({
      indexes: [event.sessionId],
      blobs: [event.event, event.source ?? "", event.projectSlug ?? "", event.outcome ?? "", event.viewport ?? ""],
      doubles: [1],
    });
  } catch {
    // Analytics are best effort and must never affect the Assistant response.
  }
}