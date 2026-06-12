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

- `src/lib/ai/generate.ts` — framework generator + copilot (swap for **OpenAI**)
- `src/lib/data/*` — news, theory catalog, evidence, projects (swap for **Supabase**)
- Auth seam ready for **Clerk**

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

1. Replace `lib/ai/generate.ts` mock with OpenAI calls (structured JSON output per section).
2. Wire `lib/data` to Supabase tables (`projects`, `workspace_sections`, `evidence_sources`, …).
3. Add Clerk auth + per-user project persistence.
4. Real PDF/URL ingestion for the Copilot upload modes.
5. DOCX/PDF export (currently Markdown + PNG).

_© 2026 Ecomap — demo build._
