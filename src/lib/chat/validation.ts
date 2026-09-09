import type { ChatMessage } from "./types";

export const MAX_MESSAGE_LENGTH = 1200;
export const MAX_ASSISTANT_MESSAGE_LENGTH = 8_000;
export const MAX_CONVERSATION_MESSAGES = 24;
export const MAX_REQUEST_BYTES = 48_000;

type ValidationResult =
  | { success: true; messages: ChatMessage[] }
  | { success: false; error: string };

export function validateChatPayload(value: unknown): ValidationResult {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { success: false, error: "Send a JSON object containing messages." };
  }

  const messages = (value as { messages?: unknown }).messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return { success: false, error: "At least one message is required." };
  }

  if (messages.length > MAX_CONVERSATION_MESSAGES) {
    return { success: false, error: `Keep the conversation to ${MAX_CONVERSATION_MESSAGES} messages or fewer.` };
  }

  const validated: ChatMessage[] = [];
  for (const [index, message] of messages.entries()) {
    if (!message || typeof message !== "object" || Array.isArray(message)) {
      return { success: false, error: "Each message must include a valid role and content." };
    }

    const { role, content } = message as { role?: unknown; content?: unknown };
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") {
      return { success: false, error: "Each message must include a valid role and text content." };
    }

    const expectedRole = index % 2 === 0 ? "user" : "assistant";
    if (role !== expectedRole) {
      return { success: false, error: "Conversation roles must alternate between user and assistant." };
    }

    const trimmed = content.trim();
    if (!trimmed) return { success: false, error: "Messages cannot be empty." };
    const messageLimit = role === "user" ? MAX_MESSAGE_LENGTH : MAX_ASSISTANT_MESSAGE_LENGTH;
    if (trimmed.length > messageLimit) {
      return { success: false, error: `${role === "user" ? "User" : "Assistant"} messages must be ${messageLimit} characters or fewer.` };
    }

    validated.push({ role, content: trimmed });
  }

  if (validated.at(-1)?.role !== "user") {
    return { success: false, error: "The final message must be from the user." };
  }

  return { success: true, messages: validated };
}