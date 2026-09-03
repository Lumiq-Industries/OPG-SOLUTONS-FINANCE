"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "assistant"; content: string };
type Provider = "openai" | "anthropic" | "fallback";

const providerLabel: Record<Provider, string> = {
  openai: "Powered by ChatGPT",
  anthropic: "Powered by Claude",
  fallback: "Quick answers · add OpenAI key for full AI",
};

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState<Provider>("openai");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Welcome to OPG Solutions Finance. I can explain invoice discounting, procurement finance, asset-based finance and more. How can we support your business?",
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/chat")
      .then((r) => r.json())
      .then((d) => setProvider(d.provider ?? "fallback"))
      .catch(() => setProvider("fallback"));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: messages.slice(-6) }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting. Please email info@opgsolutions.co.za or call 082 941 5728.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition",
          open ? "bg-[#2B3A48] text-white" : "bg-[#9B7846] text-white hover:opacity-90"
        )}
        aria-label="Open finance assistant"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>

      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm rounded-2xl border border-[#2B3A48]/10 bg-white shadow-2xl transition-all duration-300 flex flex-col overflow-hidden",
          open
            ? "opacity-100 translate-y-0 pointer-events-auto h-[420px]"
            : "opacity-0 translate-y-4 pointer-events-none h-0"
        )}
      >
        <div className="border-b border-[#2B3A48]/10 px-4 py-3 bg-[#f7f5f1]">
          <p className="text-sm font-semibold text-[#2B3A48]">OPG Finance Assistant</p>
          <p className="text-[10px] text-[#9B7846] uppercase tracking-wider">{providerLabel[provider]}</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                "rounded-xl px-3 py-2 text-sm max-w-[90%]",
                m.role === "user"
                  ? "ml-auto bg-[#2B3A48] text-white"
                  : "bg-[#f7f5f1] text-[#2B3A48]/80 border border-[#2B3A48]/10"
              )}
            >
              {m.content}
            </div>
          ))}
          {loading && (
            <div className="rounded-xl px-3 py-2 text-sm bg-[#f7f5f1] text-[#2B3A48]/40 w-16">…</div>
          )}
          <div ref={bottomRef} />
        </div>
        <div className="border-t border-[#2B3A48]/10 p-3 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask about finance services…"
            className="flex-1 rounded-lg bg-[#f7f5f1] border border-[#2B3A48]/10 px-3 py-2 text-sm outline-none focus:border-[#9B7846]/50"
          />
          <button
            type="button"
            onClick={send}
            disabled={loading}
            className="h-10 w-10 flex items-center justify-center rounded-lg bg-[#9B7846] text-white disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
}
