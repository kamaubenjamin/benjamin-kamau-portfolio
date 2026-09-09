"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, KeyboardEvent as ReactKeyboardEvent, useEffect, useRef, useState } from "react";
import { ArrowUp, X } from "lucide-react";
import type { ChatErrorResponse, ChatMessage, ChatSuccessResponse } from "@/lib/chat/types";
import { MAX_CONVERSATION_MESSAGES, MAX_MESSAGE_LENGTH } from "@/lib/chat/validation";

const STORAGE_KEY = "benkai-assistant-conversation";
const SESSION_ID_KEY = "benkai-assistant-session-id";
const GEMINI_TURNS_KEY = "benkai-assistant-gemini-turns";
const LOCAL_CACHE_KEY = "benkai-assistant-local-cache";
const MAX_GEMINI_TURNS = 4;
const SUBMIT_COOLDOWN_MS = 900;
const LOADING_DISPLAY_DELAY_MS = 180;
const MAX_CONTEXT_BYTES = 46_000;
const starterPrompts = [
  "What does Benkai build?",
  "Tell me about GymBolt",
  "Can Benkai help my business?",
  "What technologies do you use?",
];

function boundConversation(history: ChatMessage[]): ChatMessage[] {
  const bounded = history.slice(-MAX_CONVERSATION_MESSAGES);
  if (bounded[0]?.role === "assistant") bounded.shift();

  while (bounded.length > 1 && new TextEncoder().encode(JSON.stringify({ messages: bounded })).byteLength > MAX_CONTEXT_BYTES) {
    bounded.splice(0, bounded[1]?.role === "assistant" ? 2 : 1);
  }

  return bounded;
}

function readSessionMessages(): ChatMessage[] {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    return boundConversation(parsed.filter(
      (item): item is ChatMessage =>
        Boolean(item) &&
        typeof item === "object" &&
        (item.role === "user" || item.role === "assistant") &&
        typeof item.content === "string",
    ));
  } catch {
    return [];
  }
}

function getViewportClass(): "mobile" | "tablet" | "desktop" {
  const width = typeof window !== "undefined" ? window.innerWidth : 0;
  return width < 768 ? "mobile" : width < 1024 ? "tablet" : "desktop";
}

function getOrCreateSessionId(): string | null {
  try {
    let id = sessionStorage.getItem(SESSION_ID_KEY);
    if (!id) {
      id = typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `fallback-${Math.random().toString(16).slice(2)}-${Date.now().toString(16)}`;
      sessionStorage.setItem(SESSION_ID_KEY, id);
    }
    return id;
  } catch {
    return null;
  }
}

function readGeminiTurns(): number {
  try {
    const value = Number(sessionStorage.getItem(GEMINI_TURNS_KEY) ?? 0);
    return Number.isInteger(value) && value >= 0 ? value : 0;
  } catch {
    return 0;
  }
}

function writeGeminiTurns(count: number): void {
  try {
    sessionStorage.setItem(GEMINI_TURNS_KEY, String(count));
  } catch {
    // Session storage is optional.
  }
}

function readLocalCache(): Record<string, { text: string }> {
  try {
    const parsed: unknown = JSON.parse(sessionStorage.getItem(LOCAL_CACHE_KEY) ?? "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed as Record<string, { text: string }> : {};
  } catch {
    return {};
  }
}

function writeLocalCache(cache: Record<string, { text: string }>): void {
  try {
    sessionStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(cache));
  } catch {
    // Session storage is optional.
  }
}

function postAnalytics(event: string): void {
  const sessionId = getOrCreateSessionId();
  if (!sessionId) return;
  void fetch("/api/chat/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, sessionId, viewport: getViewportClass() }),
  }).catch(() => {
    // Analytics are best effort and never block the Assistant.
  });
}

export function BenkaiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessionReady, setSessionReady] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadingState, setShowLoadingState] = useState(false);
  const [error, setError] = useState("");
  const [failedContext, setFailedContext] = useState<ChatMessage[] | null>(null);
  const [geminiTurns, setGeminiTurns] = useState<number>(readGeminiTurns);
  const [localCache, setLocalCache] = useState<Record<string, { text: string }>>(readLocalCache);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const conversationRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const cooldownRef = useRef(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMessages(boundConversation(readSessionMessages()));
      setSessionReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!sessionReady) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Session storage is optional; conversation still works in component memory.
    }
  }, [messages, sessionReady]);

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        requestAnimationFrame(() => launcherRef.current?.focus());
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], textarea:not([disabled])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    conversationRef.current?.scrollTo({ top: conversationRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, showLoadingState, error]);

  const close = () => {
    setIsOpen(false);
    requestAnimationFrame(() => launcherRef.current?.focus());
  };

  const submitMessage = async (messageText: string, retryContext?: ChatMessage[]) => {
    const content = messageText.trim();
    if (!content || isLoading || (!retryContext && cooldownRef.current)) return;

    cooldownRef.current = true;
    window.setTimeout(() => {
      cooldownRef.current = false;
    }, SUBMIT_COOLDOWN_MS);
    setError("");
    setFailedContext(null);
    setInput("");
    setIsLoading(true);

    // Reuse a previously answered local factual question within this session (0 Gemini calls).
    if (!retryContext && localCache[content]) {
      const assistantMessage: ChatMessage = { role: "assistant", content: localCache[content].text };
      setMessages((current) => boundConversation([...current, assistantMessage]));
      setIsLoading(false);
      requestAnimationFrame(() => inputRef.current?.focus());
      return;
    }

    const userMessage: ChatMessage = { role: "user", content };
    const context = retryContext ?? boundConversation([...messages, userMessage]);
    if (!retryContext) setMessages(context);

    const metadata = {
      sessionId: getOrCreateSessionId(),
      geminiTurns,
      viewport: getViewportClass(),
    };
    const loadingDisplayTimeout = window.setTimeout(
      () => setShowLoadingState(true),
      LOADING_DISPLAY_DELAY_MS,
    );

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: context, metadata }),
      });
      const payload: ChatSuccessResponse | ChatErrorResponse = await response.json();
      if (!response.ok || "error" in payload) {
        const code = "error" in payload ? payload.code : undefined;
        if (code === "SESSION_LIMIT") {
          setError("error" in payload ? payload.error : "You've reached this session's AI conversation limit.");
          setFailedContext(null);
          return;
        }
        throw new Error("error" in payload ? payload.error : "Benkai Assistant could not respond.");
      }
      const assistantMessage: ChatMessage = { role: "assistant", content: payload.message };
      setMessages((current) => boundConversation([...current, assistantMessage]));
      if (payload.source === "local_grounded") {
        const next = { ...localCache, [content]: { text: payload.message } };
        setLocalCache(next);
        writeLocalCache(next);
      } else if (payload.source === "gemini") {
        const next = Math.min(geminiTurns + 1, MAX_GEMINI_TURNS);
        setGeminiTurns(next);
        writeGeminiTurns(next);
      }
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Benkai Assistant could not respond just now.");
      setFailedContext(context);
    } finally {
      window.clearTimeout(loadingDisplayTimeout);
      setShowLoadingState(false);
      setIsLoading(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    void submitMessage(input);
  };

  const handleInputKeyDown = (event: ReactKeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void submitMessage(input);
    }
  };

  return (
    <div className="benkai-assistant">
      {isOpen && (
        <div
          ref={panelRef}
          className="assistant-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="benkai-assistant-title"
          aria-describedby="benkai-assistant-description"
        >
          <header className="assistant-header">
            <div className="min-w-0">
              <h2 id="benkai-assistant-title" className="text-sm font-semibold text-[var(--color-text)]">
                Benkai Assistant
              </h2>
              <p id="benkai-assistant-description" className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                Ask about our systems, projects or your workflow.
              </p>
            </div>
            <button ref={closeRef} type="button" onClick={close} className="assistant-icon-button" aria-label="Close Benkai Assistant">
              <X size={18} aria-hidden="true" />
            </button>
          </header>

          <div ref={conversationRef} className="assistant-conversation" aria-live="polite" aria-busy={isLoading}>
            {messages.length === 0 && (
              <div className="assistant-intro">
                <p className="text-sm leading-6 text-[var(--color-text-muted)]">
                  I can explain Benkai&apos;s verified work or help you frame an operational problem.
                </p>
                <div className="mt-4 grid gap-2">
                  {starterPrompts.map((prompt) => (
                    <button key={prompt} type="button" onClick={() => { postAnalytics("starter_prompt_click"); void submitMessage(prompt); }} className="assistant-prompt">
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`assistant-message assistant-message-${message.role}`}>
                <span className="sr-only">{message.role === "user" ? "You" : "Benkai Assistant"}: </span>
                {message.content}
              </div>
            ))}
            {showLoadingState && (
              <div className="assistant-message assistant-message-assistant assistant-loading" role="status">
                <div className="assistant-loading-status">
                  <span className="assistant-loading-dot" aria-hidden="true" />
                  <span>Preparing grounded response...</span>
                  <span className="assistant-loading-cursor" aria-hidden="true" />
                </div>
                <div className="assistant-loading-lines" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
            {error && (
              <div className="assistant-error" role="alert">
                <p>{error}</p>
                <div className="assistant-error-actions">
                  {failedContext && (
                    <button type="button" onClick={() => { postAnalytics("chat_retry"); void submitMessage(failedContext.at(-1)?.content ?? "", failedContext); }} disabled={isLoading}>
                      Try again
                    </button>
                  )}
                  <Link href="/contact" onClick={() => { postAnalytics("chat_contact_click"); close(); }}>Discuss a Business Problem →</Link>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="assistant-form">
            <label htmlFor="benkai-assistant-input" className="sr-only">Message Benkai Assistant</label>
            <textarea
              ref={inputRef}
              id="benkai-assistant-input"
              value={input}
              onChange={(event) => setInput(event.target.value.slice(0, MAX_MESSAGE_LENGTH))}
              onKeyDown={handleInputKeyDown}
              rows={1}
              maxLength={MAX_MESSAGE_LENGTH}
              placeholder="Describe a workflow or ask a question…"
              disabled={isLoading}
            />
            <button type="submit" className="assistant-send" disabled={isLoading || !input.trim()} aria-label="Send message">
              <ArrowUp size={17} aria-hidden="true" />
            </button>
          </form>
          <p className="assistant-disclosure">Chat history stays in this browser session. Benkai may count anonymous Assistant usage, but message content is not stored for analytics.</p>
        </div>
      )}

      {!isOpen && (
        <button ref={launcherRef} type="button" onClick={() => { postAnalytics("chat_open"); setIsOpen(true); }} className="assistant-launcher" aria-label="Open Benkai Assistant" aria-haspopup="dialog">
          <span className="assistant-launcher-mark" aria-hidden="true">
            <Image src="/brand/benkai-mark.png" alt="" width={512} height={512} sizes="28px" />
          </span>
          <span>Ask Benkai</span>
        </button>
      )}
    </div>
  );
}