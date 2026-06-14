import { NextResponse } from "next/server";
import { hasOpenAI, runOpenAI, parseJsonLoose } from "@/lib/ai/openai";
import {
  RESEARCH_SYSTEM, researchUserPrompt, mapToCase,
  BRIEF_SYSTEM, briefUserPrompt,
} from "@/lib/ai/researchPrompt";

export const runtime = "nodejs";
export const maxDuration = 300;

// in-memory cache so the same topic is consistent within a server session
const cache = new Map<string, unknown>();

export async function POST(req: Request) {
  if (!hasOpenAI()) {
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
    return NextResponse.json({ ok: true, cached: true, case: cache.get(cacheKey) });
  }

  // STEP 1 — web-searched research brief (real sources). Tool + plain text only.
  let brief = "";
  try {
    brief = await runOpenAI({
      system: BRIEF_SYSTEM,
      user: briefUserPrompt(topic),
      webSearch: true,
      maxTokens: 6000,
      temperature: 0.3,
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, reason: "search-failed", message: e instanceof Error ? e.message : "unknown" },
      { status: 200 }
    );
  }

  // STEP 2 — convert the sourced brief into strict CaseStudy JSON (no tools).
  try {
    const text = await runOpenAI({
      system: RESEARCH_SYSTEM,
      user: researchUserPrompt(topic, brief),
      json: true,
      maxTokens: 16000,
      temperature: 0.3,
    });
    const raw = parseJsonLoose(text);
    const built = mapToCase(id, raw);
    cache.set(cacheKey, built);
    return NextResponse.json({ ok: true, case: built });
  } catch (e) {
    return NextResponse.json(
      { ok: false, reason: "json-failed", message: e instanceof Error ? e.message : "unknown", brief: brief.slice(0, 500) },
      { status: 200 }
    );
  }
}
