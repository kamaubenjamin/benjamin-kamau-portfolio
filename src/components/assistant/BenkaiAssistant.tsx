"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, KeyboardEvent as ReactKeyboardEvent, useEffect, useRef, useState } from "react";
import { ArrowUp, X } from "lucide-react";
import type { ChatErrorResponse, ChatMessage, ChatSuccessResponse } from "@/lib/chat/types";
import { MAX_CONVERSATION_MESSAGES, MAX_MESSAGE_LENGTH } from "@/lib/chat/validation";

const STORAGE_KEY = "benkai-assistant-conversation";
const SUBMIT_COOLDOWN_MS = 900;
const starterPrompts = [
  "What does Benkai build?",
  "Tell me about GymBolt",
  "Can Benkai help my business?",
  "What technologies do you use?",
];

function readSessionMessages(): ChatMessage[] {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is ChatMessage =>
        Boolean(item) &&
        typeof item === "object" &&
        (item.role === "user" || item.role === "assistant") &&
        typeof item.content === "string",
    ).slice(-MAX_CONVERSATION_MESSAGES);
  } catch {
    return [];
  }
}

export function BenkaiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(readSessionMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const launcherRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const conversationRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const cooldownRef = useRef(false);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // Session storage is optional; conversation still works in component memory.
    }
  }, [messages]);

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
  }, [messages, isLoading, error]);

  const close = () => {
    setIsOpen(false);
    requestAnimationFrame(() => launcherRef.current?.focus());
  };

  const submitMessage = async (messageText: string) => {
    const content = messageText.trim();
    if (!content || isLoading || cooldownRef.current) return;

    cooldownRef.current = true;
    window.setTimeout(() => {
      cooldownRef.current = false;
    }, SUBMIT_COOLDOWN_MS);
    setError("");
    setInput("");
    setIsLoading(true);

    const userMessage: ChatMessage = { role: "user", content };
    const context = [...messages, userMessage].slice(-MAX_CONVERSATION_MESSAGES);
    setMessages(context);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: context }),
      });
      const payload: ChatSuccessResponse | ChatErrorResponse = await response.json();
      if (!response.ok || "error" in payload) {
        throw new Error("error" in payload ? payload.error : "Benkai Assistant could not respond.");
      }
      const assistantMessage: ChatMessage = { role: "assistant", content: payload.message };
      setMessages((current) => [...current, assistantMessage].slice(-MAX_CONVERSATION_MESSAGES));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Benkai Assistant could not respond just now.");
    } finally {
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
                    <button key={prompt} type="button" onClick={() => void submitMessage(prompt)} className="assistant-prompt">
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
            {isLoading && <div className="assistant-message assistant-message-assistant">Reviewing verified portfolio details…</div>}
            {error && (
              <div className="assistant-error" role="alert">
                <p>{error}</p>
                <Link href="/contact" onClick={close}>Discuss a Business Problem →</Link>
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
          <p className="assistant-disclosure">Session-only conversation. Do not share sensitive information.</p>
        </div>
      )}

      {!isOpen && (
        <button ref={launcherRef} type="button" onClick={() => setIsOpen(true)} className="assistant-launcher" aria-label="Open Benkai Assistant" aria-haspopup="dialog">
          <span className="assistant-launcher-mark" aria-hidden="true">
            <Image src="/brand/benkai-mark.png" alt="" width={512} height={512} sizes="28px" />
          </span>
          <span>Ask Benkai</span>
        </button>
      )}
    </div>
  );
}