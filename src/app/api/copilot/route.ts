import { NextResponse } from "next/server";
import { hasOpenAI, runOpenAI } from "@/lib/ai/openai";
import { COPILOT_SYSTEM } from "@/lib/ai/researchPrompt";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  if (!hasOpenAI()) return NextResponse.json({ ok: false, reason: "no-key" });

  let message = "";
  let context = "";
  let webSearch = false;
  try {
    const body = await req.json();
    message = String(body?.message ?? "").slice(0, 2000).trim();
    context = String(body?.context ?? "").slice(0, 4000);
    webSearch = Boolean(body?.webSearch);
  } catch {
    return NextResponse.json({ ok: false, reason: "bad-request" }, { status: 400 });
  }
  if (!message) return NextResponse.json({ ok: false, reason: "empty" }, { status: 400 });

  try {
    const user = context ? `Current workspace context:\n${context}\n\nUser: ${message}` : message;
    const reply = await runOpenAI({
      system: COPILOT_SYSTEM,
      user,
      webSearch,
      maxTokens: 900,
      temperature: 0.5,
    });
    return NextResponse.json({ ok: true, reply });
  } catch (e) {
    return NextResponse.json({ ok: false, reason: "error", message: e instanceof Error ? e.message : "unknown" });
  }
}
