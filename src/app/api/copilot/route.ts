import { NextResponse } from "next/server";
import { hasAI, runAI } from "@/lib/ai/openai";
import { COPILOT_SYSTEM } from "@/lib/ai/researchPrompt";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  if (!hasAI()) return NextResponse.json({ ok: false, reason: "no-key" });

  let message = "";
  let context = "";
  try {
    const body = await req.json();
    message = String(body?.message ?? "").slice(0, 2000).trim();
    context = String(body?.context ?? "").slice(0, 4000);
  } catch {
    return NextResponse.json({ ok: false, reason: "bad-request" }, { status: 400 });
  }
  if (!message) return NextResponse.json({ ok: false, reason: "empty" }, { status: 400 });

  try {
    const user = context ? `Current workspace context:\n${context}\n\nUser: ${message}` : message;
    const reply = await runAI({ system: COPILOT_SYSTEM, user, maxTokens: 900, temperature: 0.5 });
    return NextResponse.json({ ok: true, reply });
  } catch (e) {
    return NextResponse.json({ ok: false, reason: "error", message: e instanceof Error ? e.message : "unknown" });
  }
}

