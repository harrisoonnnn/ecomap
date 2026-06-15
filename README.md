# 🗺️ Ecomap

**The AI Research Operating System for Economics, Finance & Policy.**
Turn real-world economic and financial events into complete research frameworks — context, theory, evidence, proposals, evaluation and a finished essay.

Built for NEC competitors, EPQ / IB Extended Essay / A-Level Economics students, undergraduate researchers, and finance enthusiasts. The goal is to help users **think like economists**, not just generate essays.

---

## ✨ Features

| Module | What it does |
|---|---|
| **Daily News Center** | 8 categories of live-style events; every card opens a full research workspace |
| **Research Workspace** | Executive summary · PESTLE + timeline · stakeholder map · theory matching (scored) + interactive diagrams · math-modelling hub + charts · graded evidence center (A+→D) · literature review · proposal comparison · critical evaluation · essay builder (IGCSE→Research Paper) |
| **Economic Diagram Engine** | Interactive SVG: Demand & Supply, Externalities, Labour Market, AD–AS, PPC, Cost Curves (with comparative-statics shift toggles) |
| **AI Research Copilot** | Persistent dock + dedicated page; Text / Voice / PDF / URL / Paper inputs; one prompt → whole framework |
| **Mind Maps + AI Canvas** | React Flow radial mind map and free-form Miro-style canvas; drag, zoom, add nodes, export PNG |
| **Literature Hub** | Citation network, consensus meter, key authors, gaps, and APA/MLA/Harvard/Chicago citations |
| **Dashboard** | Saved projects, folders, favorites, recently viewed, and a knowledge graph linking topics |
| **i18n** | Full **English / 中文** switch (top-right) — UI, AI output, dashboards all switch instantly |
| **Export** | Per-card copy / regenerate / export and a full-workspace Markdown export |

## 🎨 Design

Glassmorphism + rounded cards + smooth Framer Motion animations over a flowing animated aurora background. Palette: white, light blue, soft purple, pale cyan — inspired by Notion · Perplexity · Linear · Stripe · Obsidian.

## 🧱 Tech stack

- **Next.js 15** (App Router) · **TypeScript** · **TailwindCSS**
- **Framer Motion** (animation) · **@xyflow/react / React Flow** (mind maps + canvas) · **Recharts** (charts)
- **lucide-react** icons · custom lightweight i18n

### Backend / AI seam
This is a self-contained, investor-demoable MVP with **realistic mock data**. The AI and data layers sit behind clean interfaces so production providers drop in with minimal change:

- `src/lib/ai/openai.ts` — DeepSeek client (server-only); `generate.ts` — offline generator + copilot fallback
- `src/lib/ai/search.ts` — Tavily (web/news/gov/policy) + Semantic Scholar (papers) retrieval layer
- `src/lib/ai/provider.ts` — provider seam + content-mode labelling (`sourced` / `templated` / `live`)
- `src/lib/ai/research.ts` — workspace-aware research-partner replies
- `src/lib/cases/` — hand-authored benchmark cases + the generic engine that gives **any** typed topic the same benchmark depth (background, timeline, stakeholders, theory, methods, charts, datasets, literature, proposals, synthesis-layer essay)
- `src/lib/data/*` — news, theory catalog, evidence, projects (swap for **Supabase**)
- Auth seam ready for **Clerk**

#### Live AI (optional)
Without a key, Ecomap runs fully offline: the benchmark **delivery-riders** case is hand-researched with real institutions/reports/links (badged *Researched & sourced*), and every other topic uses Ecomap's research **methodology framework** with placeholder sources (badged *AI methodology framework* — verify figures before citing). 

To enable **AI-generated** research for any topic (via **DeepSeek** + real search):

```bash
cp .env.example .env.local
# DEEPSEEK_API_KEY=sk-...      (platform.deepseek.com) — required for AI
# TAVILY_API_KEY=tvly-...      (tavily.com) — adds live web/news/gov/policy search
# SEMANTIC_SCHOLAR_API_KEY=... (optional) — academic papers (works keyless too)
npm run dev
```

**Retrieval-augmented pipeline.** When a topic is submitted, `POST /api/generate`:
1. **Tavily** runs parallel searches for current **news**, **official statistics / government reports**, and **policy documents**;
2. **Semantic Scholar** retrieves relevant **academic papers** (authors, year, venue, citations, links);
3. those real sources are assembled into a brief and handed to **DeepSeek**, which grounds a full `CaseStudy` (the 11-step methodology) in them — reusing the real URLs, figures and citations.

The workspace badges the result **🔎 Live web + papers** (with a count of web results + papers used). The Copilot (`POST /api/copilot`) also runs a live Tavily + Semantic Scholar search when you ask it for evidence or sources, then answers grounded in them. If Tavily isn't configured, DeepSeek still generates from its knowledge (badged *AI research (DeepSeek)*); if no AI key is set, everything falls back to the offline methodology engine. Keys are read server-side only and never sent to the browser. Always verify key figures at the linked source.

Tunables: `DEEPSEEK_MODEL` (default `deepseek-chat`, or `deepseek-reasoner`), `DEEPSEEK_BASE_URL`.

The workspace-aware **Copilot** remembers the open workspace (topic, theories, methods, evidence, thesis) and acts as a research partner: "expand the theory", "find stronger evidence", "give me Chinese sources", "replace this theory with behavioural economics", "challenge my argument", "suggest a stronger thesis". Every module also has a **Refine with AI** button that opens the Copilot pre-seeded with that section's context.

## 🚀 Getting started

```bash
npm install          # if the global npm cache errors, use: npm install --cache /tmp/ecomap-npm-cache
npm run dev          # http://localhost:3000
# or
npm run build && npm run start
```

## 📁 Structure

```
src/
├── app/            # routes: / news /workspace/[id] /assistant /mindmaps /literature /dashboard
├── components/     # layout · ui · landing · workspace · diagrams · charts · mindmap · copilot
├── lib/            # i18n (en/zh) · ai (generator + copilot) · data (catalogs) · utils
└── types/
```

## 🌐 Roadmap to production

1. Live AI via DeepSeek is wired (`/api/generate`, `/api/copilot`); extend prompts per section as needed.
2. Wire `lib/data` to Supabase tables (`projects`, `workspace_sections`, `evidence_sources`, …).
3. Add Clerk auth + per-user project persistence.
4. Real PDF/URL ingestion for the Copilot upload modes.
5. DOCX/PDF export (currently Markdown + PNG).

_© 2026 Ecomap — demo build._
