export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface ChatSuccessResponse {
  message: string;
}

export interface ChatErrorResponse {
  error: string;
  code: "INVALID_REQUEST" | "PROVIDER_REQUIRED" | "PROVIDER_LIMIT" | "SERVICE_UNAVAILABLE";
}