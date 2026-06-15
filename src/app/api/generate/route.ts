import { NextResponse } from "next/server";
import { hasAI, runAI, parseJsonLoose } from "@/lib/ai/openai";
import { gatherSources } from "@/lib/ai/search";
import { RESEARCH_SYSTEM, researchUserPrompt, mapToCase } from "@/lib/ai/researchPrompt";

export const runtime = "nodejs";
export const maxDuration = 300;

// in-memory cache so the same topic is consistent within a server session
const cache = new Map<string, unknown>();

export async function POST(req: Request) {
  if (!hasAI()) {
    return NextResponse.json({ ok: false, reason: "no-key" }, { status: 200 });
  }
  let topic = "";
  let id = "";
  try {
    const body = await req.json();
    topic = String(body?.topic ?? "").slice(0, 400).trim();
    id = String(body?.id ?? "").slice(0, 80) || "topic";
  } catch {
    return NextResponse.json({ ok: false, reason: "bad-request" }, { status: 400 });
  }
  if (!topic) return NextResponse.json({ ok: false, reason: "empty" }, { status: 400 });

  const cacheKey = `${id}::${topic}`;
  if (cache.has(cacheKey)) {
    return NextResponse.json({ ok: true, cached: true, ...(cache.get(cacheKey) as object) });
  }

  // STEP 1 — real web + academic search (Tavily + Semantic Scholar). Optional.
  let brief = "";
  let searched = { used: false, web: 0, papers: 0 };
  try {
    const r = await gatherSources(topic);
    brief = r.brief;
    searched = { used: r.used, web: r.web, papers: r.papers };
  } catch {
    /* search failed — fall through to knowledge-only generation */
  }

  // STEP 2 — DeepSeek grounds the CaseStudy JSON in the retrieved sources.
  try {
    const text = await runAI({
      system: RESEARCH_SYSTEM,
      user: researchUserPrompt(topic, brief),
      json: true,
      maxTokens: 8000,
      temperature: 0.4,
    });
    const raw = parseJsonLoose(text);
    const built = mapToCase(id, raw);
    const payload = { case: built, searched };
    cache.set(cacheKey, payload);
    return NextResponse.json({ ok: true, ...payload });
  } catch (e) {
    return NextResponse.json(
      { ok: false, reason: "error", message: e instanceof Error ? e.message : "unknown", searched },
      { status: 200 }
    );
  }
}
