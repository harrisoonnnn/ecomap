import { NextResponse } from "next/server";
import { hasAI, runAI } from "@/lib/ai/openai";
import { gatherSources, hasSearch } from "@/lib/ai/search";
import { COPILOT_SYSTEM } from "@/lib/ai/researchPrompt";

export const runtime = "nodejs";
export const maxDuration = 120;

const SEARCH_INTENT = /evidence|source|data|paper|study|statistic|research|证据|来源|数据|论文|文献|研究/i;

export async function POST(req: Request) {
  if (!hasAI()) return NextResponse.json({ ok: false, reason: "no-key" });

  let message = "";
  let context = "";
  let topic = "";
  try {
    const body = await req.json();
    message = String(body?.message ?? "").slice(0, 2000).trim();
    context = String(body?.context ?? "").slice(0, 4000);
    topic = String(body?.topic ?? "").slice(0, 200);
  } catch {
    return NextResponse.json({ ok: false, reason: "bad-request" }, { status: 400 });
  }
  if (!message) return NextResponse.json({ ok: false, reason: "empty" }, { status: 400 });

  // When the user asks for evidence/sources and search is available, fetch live.
  let sources = "";
  if (hasSearch() && SEARCH_INTENT.test(message)) {
    try {
      const r = await gatherSources(topic || message);
      if (r.used) sources = `\n\nLive search results to ground your answer (cite these real URLs):\n${r.brief.slice(0, 3500)}`;
    } catch {
      /* ignore — answer from context only */
    }
  }

  try {
    const user = `${context ? `Current workspace context:\n${context}\n\n` : ""}User: ${message}${sources}`;
    const reply = await runAI({ system: COPILOT_SYSTEM, user, maxTokens: 1100, temperature: 0.5 });
    return NextResponse.json({ ok: true, reply, searched: Boolean(sources) });
  } catch (e) {
    return NextResponse.json({ ok: false, reason: "error", message: e instanceof Error ? e.message : "unknown" });
  }
}


