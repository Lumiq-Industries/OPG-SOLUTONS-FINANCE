import { services, site, team, values } from "./site";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? "";
const OPENAI_MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? "";
const CLAUDE_MODEL = process.env.CLAUDE_MODEL ?? "claude-sonnet-4-20250514";

const FINANCE_SYSTEM = `You are the OPG Solutions Finance assistant — a South African financial services company (NCR ${site.ncr}).

Services: ${services.map((s) => s.title).join(", ")}.

Help SMMEs, contractors and professionals with invoice discounting, asset-based finance, procurement finance, education finance, and consolidation finance.

Contact: ${site.email} | ${site.phones[0]}
Address: ${site.address}
Registration: ${site.registration}

Values: integrity, excellence, customer focus, innovation.

Be professional, trustworthy and concise (under 120 words). Never promise approval — invite clients to request a consultation. Prices in ZAR when relevant.`;

type ChatMessage = { role: "user" | "assistant"; content: string };

async function openAIReply(messages: ChatMessage[]): Promise<string> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      max_tokens: 500,
      temperature: 0.6,
      messages: [{ role: "system", content: FINANCE_SYSTEM }, ...messages],
    }),
  });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}

async function claudeReply(messages: ChatMessage[]): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 500,
      system: FINANCE_SYSTEM,
      messages,
    }),
  });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  const block = data.content?.find((b: { type: string }) => b.type === "text");
  return block?.text?.trim() ?? "";
}

function fallbackReply(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("invoice"))
    return "Invoice discounting helps you access cash from outstanding invoices quickly. Email info@opgsolutions.co.za with your invoice details for a consultation.";
  if (lower.includes("procurement") || lower.includes("supply"))
    return "Procurement finance funds supplies so your projects stay on track. Our team can structure funding around your supplier and delivery timelines.";
  if (lower.includes("asset"))
    return "Asset-based finance turns qualifying business assets into working capital. Share your asset register and project scope for an assessment.";
  if (lower.includes("contact") || lower.includes("phone"))
    return `Reach us at ${site.email} or ${site.phones[0]}. We're at ${site.address}.`;
  return `Welcome to OPG Solutions Finance. We support SMMEs with invoice discounting, procurement finance, asset-based finance and more. How can we help your business today?`;
}

export function getAssistantProvider(): "openai" | "anthropic" | "fallback" {
  if (OPENAI_API_KEY) return "openai";
  if (ANTHROPIC_API_KEY) return "anthropic";
  return "fallback";
}

export async function getFinanceAssistantReply(
  query: string,
  history: { role: string; content: string }[] = []
): Promise<string> {
  const messages: ChatMessage[] = [
    ...history.slice(-6).map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
    { role: "user", content: query },
  ];

  try {
    if (OPENAI_API_KEY) return (await openAIReply(messages)) || fallbackReply(query);
    if (ANTHROPIC_API_KEY) return (await claudeReply(messages)) || fallbackReply(query);
  } catch {
    /* fallback */
  }

  return fallbackReply(query);
}

export const FINANCE_KNOWLEDGE = { services, team, values };
