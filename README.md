# OPG Solutions Finance

Corporate website for **OPG Solutions Finance** — built by [LUMIQ INDUSTRIES](https://github.com/Lumiq-Industries) (VILATECH × Infini Colon).

**Live preview:** https://opg-solutions-finance.vercel.app

**Repository:** https://github.com/Lumiq-Industries/OPG-SOLUTONS-FINANCE

---

## Overview

Single-page corporate site presenting OPG Solutions Finance services, business profile, and contact flows. Premium dark UI with animated finance branding, smooth scroll, and an AI assistant powered by **OpenAI GPT-4o Mini**.

## Tech stack

- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion** (logo / preloader animations)
- **Vercel** (hosting)

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Setup

```bash
git clone https://github.com/Lumiq-Industries/OPG-SOLUTONS-FINANCE.git
cd OPG-SOLUTONS-FINANCE
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000

### Environment variables

Copy `.env.example` to `.env.local`:

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes (for chatbot) | OpenAI API key — [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| `OPENAI_MODEL` | No | Defaults to `gpt-4o-mini` |
| `ANTHROPIC_API_KEY` | No | Optional fallback for the assistant |

On Vercel: **Project Settings → Environment Variables → add `OPENAI_API_KEY` → Redeploy**

## Project structure

```
src/
├── app/
│   ├── api/chat/       # AI assistant API route
│   ├── page.tsx        # Main single-page site
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── opg-finance-logo.tsx
│   ├── finance-shell.tsx
│   ├── preloader.tsx
│   └── chatbot.tsx
└── lib/
    ├── assistant.ts    # OpenAI / fallback logic
    └── site.ts         # Business info & contact details
public/brand/           # Finance logo assets
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local dev server |
| `npm run build` | Production build |
| `npm run start` | Run production build locally |
| `npm run lint` | ESLint |

## Working with another developer

### Branch workflow

1. Pull latest `main` before starting work:
   ```bash
   git pull origin main
   ```
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-change
   ```
3. Commit with clear messages and open a PR into `main`.
4. Another developer reviews before merge.

### What to coordinate on

- **Content changes** — edit `src/app/page.tsx` and `src/lib/site.ts`
- **Branding** — logo files in `public/brand/`
- **Chatbot behaviour** — `src/lib/assistant.ts` and `src/components/chatbot.tsx`
- **Env vars** — never commit `.env` or `.env.local`; share keys securely (1Password, etc.)

### Deployment

Production deploys automatically from `main` on Vercel, or manually:

```bash
npx vercel --prod
```

## Related projects

| Project | Repo | Live |
|---------|------|------|
| Hardware Store | [OPG-SOLUTIONS-HARDWARE](https://github.com/Lumiq-Industries/OPG-SOLUTIONS-HARDWARE) | https://opg-solutions-store.vercel.app |
| Client Quotations | — | https://opg-solutions-quotes.vercel.app |

## Client

**OPG Solutions** — Phiphidi / Masakona, Limpopo, South Africa

---

Built by **LUMIQ INDUSTRIES** · VILATECH × Infini Colon
