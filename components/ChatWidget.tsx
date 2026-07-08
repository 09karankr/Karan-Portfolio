"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { profile } from "@/content/profile";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What's his experience with Kubernetes?",
  "Tell me about his AI projects",
  "Is he open to new roles?",
  "What's his strongest tech stack?",
];

const firstName = profile.name.split(" ")[0];

const NUDGE_KEY = "chat-nudge-dismissed-v1";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showNudge, setShowNudge] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, streaming]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Auto-appearing nudge bubble to draw attention (once per browser).
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(NUDGE_KEY) === "1") return;
    const t = setTimeout(() => setShowNudge(true), 3500);
    return () => clearTimeout(t);
  }, []);

  // Let other components (e.g. the hero button) open the chat.
  useEffect(() => {
    function openChat() {
      setOpen(true);
      setShowNudge(false);
    }
    window.addEventListener("open-chat", openChat);
    return () => window.removeEventListener("open-chat", openChat);
  }, []);

  function dismissNudge() {
    setShowNudge(false);
    try {
      window.localStorage.setItem(NUDGE_KEY, "1");
    } catch {
      // ignore
    }
  }

  function toggleOpen() {
    setOpen((v) => !v);
    if (showNudge) dismissNudge();
  }

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;

    setError(null);
    setInput("");
    const nextMessages: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setStreaming(true);

    // Placeholder assistant message we stream into.
    setMessages((m) => [...m, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Something went wrong.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setError(msg);
      // Drop the empty assistant placeholder on error.
      setMessages((m) => {
        const copy = [...m];
        if (copy.at(-1)?.role === "assistant" && !copy.at(-1)?.content) {
          copy.pop();
        }
        return copy;
      });
    } finally {
      setStreaming(false);
    }
  }

  return (
    <>
      {/* Nudge bubble */}
      {showNudge && !open && (
        <div
          data-print-hide
          className="fixed bottom-24 right-5 z-50 w-60 nudge-in"
        >
          <div className="relative rounded-2xl rounded-br-sm border border-border bg-bg/95 backdrop-blur-xl p-3.5 shadow-xl">
            <button
              type="button"
              onClick={dismissNudge}
              aria-label="Dismiss"
              className="absolute -top-2 -right-2 grid size-5 place-items-center rounded-full border border-border bg-card text-muted hover:text-fg"
            >
              <X className="size-3" />
            </button>
            <div className="flex items-start gap-2.5">
              <div className="grid size-7 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                <Bot className="size-4" />
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpen(true);
                  dismissNudge();
                }}
                className="text-left text-sm text-fg/90 leading-snug hover:text-fg"
              >
                👋 Curious about {firstName}? Ask my AI anything — his skills,
                projects, availability.
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Launcher */}
      <button
        type="button"
        data-print-hide
        aria-label={open ? "Close chat" : "Chat with Karan's AI assistant"}
        onClick={toggleOpen}
        className="group fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-semibold text-bg shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:scale-105 active:scale-95 transition-all"
      >
        {/* Pulsing ring to draw the eye */}
        {!open && (
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-accent animate-ping opacity-20"
          />
        )}
        {open ? (
          <X className="size-5" />
        ) : (
          <>
            <Sparkles className="size-4 relative" />
            <span className="relative">Ask AI</span>
          </>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          data-print-hide
          className="fixed bottom-20 right-5 z-50 flex w-[calc(100vw-2.5rem)] max-w-sm flex-col rounded-2xl border border-border bg-bg/95 backdrop-blur-xl shadow-2xl h-[32rem] max-h-[calc(100vh-7rem)]"
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border p-4">
            <div className="grid size-9 place-items-center rounded-full bg-accent/15 text-accent">
              <Bot className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium leading-tight">
                Ask about {firstName}
              </p>
              <p className="text-xs text-muted leading-tight">
                AI assistant · trained on his portfolio
              </p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="space-y-4">
                <div className="flex gap-2.5">
                  <div className="grid size-7 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                    <Bot className="size-4" />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-card px-3.5 py-2.5 text-sm text-fg/90">
                    Hi! I&apos;m {firstName}&apos;s AI assistant. Ask me about his
                    experience, projects, or skills.
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs text-muted hover:text-fg hover:border-muted transition-colors text-left"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-accent px-3.5 py-2.5 text-sm text-bg">
                    {m.content}
                  </div>
                </div>
              ) : (
                <div key={i} className="flex gap-2.5">
                  <div className="grid size-7 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                    <Bot className="size-4" />
                  </div>
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-card px-3.5 py-2.5 text-sm text-fg/90 whitespace-pre-wrap">
                    {m.content ||
                      (streaming && i === messages.length - 1 ? (
                        <TypingDots />
                      ) : null)}
                  </div>
                </div>
              ),
            )}

            {error && (
              <p className="text-xs text-red-400 px-1">{error}</p>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-t border-border p-3 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask about ${firstName}...`}
              maxLength={1000}
              className="flex-1 rounded-lg border border-border bg-card/50 px-3 py-2 text-sm text-fg placeholder:text-muted focus:border-accent focus:outline-none"
            />
            <button
              type="submit"
              disabled={streaming || !input.trim()}
              aria-label="Send"
              className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-bg hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              <Send className="size-4" />
            </button>
          </form>
          <p className="px-4 pb-3 text-[10px] text-muted text-center">
            AI can make mistakes. Verify important details.
          </p>
        </div>
      )}
    </>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex gap-1 py-1">
      <span className="size-1.5 rounded-full bg-muted animate-bounce [animation-delay:-0.3s]" />
      <span className="size-1.5 rounded-full bg-muted animate-bounce [animation-delay:-0.15s]" />
      <span className="size-1.5 rounded-full bg-muted animate-bounce" />
    </span>
  );
}
