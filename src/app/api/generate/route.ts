import { NextResponse } from "next/server";
import { hasAI, runAI, parseJsonLoose } from "@/lib/ai/openai";
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
    return NextResponse.json({ ok: true, cached: true, case: cache.get(cacheKey) });
  }

  try {
    const text = await runAI({
      system: RESEARCH_SYSTEM,
      user: researchUserPrompt(topic),
      json: true,
      maxTokens: 8000,
      temperature: 0.4,
    });
    const raw = parseJsonLoose(text);
    const built = mapToCase(id, raw);
    cache.set(cacheKey, built);
    return NextResponse.json({ ok: true, case: built });
  } catch (e) {
    return NextResponse.json(
      { ok: false, reason: "error", message: e instanceof Error ? e.message : "unknown" },
      { status: 200 }
    );
  }
}
