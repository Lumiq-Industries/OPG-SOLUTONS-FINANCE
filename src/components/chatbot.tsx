"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

type Message = { role: "user" | "assistant"; content: string };
type Provider = "openai" | "anthropic" | "fallback";

const providerLabel: Record<Provider, string> = {
  openai: "Powered by ChatGPT",
  anthropic: "Powered by Claude",
  fallback: "Quick answers · add OpenAI key for full AI",
};

const WHATSAPP_URL = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  "Hi OPG Solutions Finance, I'd like to discuss funding options for my business."
)}`;

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
          content: `Sorry, I'm having trouble connecting. Please WhatsApp us or email ${site.email}.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={cn(
          "fixed bottom-28 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm rounded-2xl glass-card transition-all duration-300 flex flex-col overflow-hidden",
          open ? "opacity-100 translate-y-0 pointer-events-auto h-[440px]" : "opacity-0 translate-y-4 pointer-events-none h-0"
        )}
      >
        <div className="border-b border-[#2B3A48]/10 px-4 py-3 glass">
          <p className="text-sm font-semibold text-[#2B3A48]">Chat with us</p>
          <p className="text-[10px] text-[#9B7846] uppercase tracking-wider">{providerLabel[provider]}</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f7f5f1]/50">
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                "rounded-xl px-3 py-2 text-sm max-w-[90%]",
                m.role === "user"
                  ? "ml-auto bg-[#2B3A48] text-white"
                  : "glass text-[#2B3A48]/85"
              )}
            >
              {m.content}
            </div>
          ))}
          {loading && <div className="glass rounded-xl px-3 py-2 text-sm text-[#2B3A48]/40 w-16">…</div>}
          <div ref={bottomRef} />
        </div>
        <div className="border-t border-[#2B3A48]/10 p-3 flex gap-2 glass">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask about finance services…"
            className="flex-1 rounded-lg bg-white/80 border border-[#2B3A48]/10 px-3 py-2 text-sm outline-none focus:border-[#9B7846]/50"
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

      <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-3">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-pill glass group text-[#2B3A48]"
          title="WhatsApp us"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-emerald-500" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[8rem] group-hover:opacity-100 transition-all duration-300 sm:max-w-none sm:opacity-100">
            WhatsApp us
          </span>
        </a>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={cn(
            "contact-pill group",
            open ? "glass text-[#2B3A48]" : "glass-gold text-[#2B3A48]"
          )}
          aria-label={open ? "Close chat" : "Chat with us"}
        >
          {open ? (
            <>
              <X className="h-5 w-5 shrink-0" />
              <span>Close</span>
            </>
          ) : (
            <>
              <MessageCircle className="h-5 w-5 shrink-0" />
              <span>Chat with us</span>
            </>
          )}
        </button>
      </div>
    </>
  );
}
