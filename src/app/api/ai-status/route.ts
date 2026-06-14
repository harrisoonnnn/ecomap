import { NextResponse } from "next/server";
import { hasOpenAI } from "@/lib/ai/openai";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ live: hasOpenAI() });
}
