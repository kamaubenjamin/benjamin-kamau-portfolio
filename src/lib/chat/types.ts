export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface ChatSuccessResponse {
  message: string;
  source: "local_grounded" | "gemini";
  projectSlug?: string;
}

export interface ChatErrorResponse {
  error: string;
  code: "INVALID_REQUEST" | "PROVIDER_REQUIRED" | "PROVIDER_LIMIT" | "SESSION_LIMIT" | "SERVICE_UNAVAILABLE";
}

export interface ChatRequestMetadata {
  sessionId?: string;
  geminiTurns?: number;
  viewport?: "mobile" | "tablet" | "desktop";
}