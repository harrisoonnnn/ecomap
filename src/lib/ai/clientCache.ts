"use client";

import type { CaseStudy } from "@/lib/cases/types";

/** Client-side store for AI-generated cases, so the workspace can render them. */
const KEY = (id: string) => `ecomap.aicase.${id}`;

export function saveAICase(id: string, c: CaseStudy, searched?: { used: boolean; web: number; papers: number }) {
  try {
    sessionStorage.setItem(KEY(id), JSON.stringify(c));
    if (searched) sessionStorage.setItem(KEY(id) + ".searched", JSON.stringify(searched));
  } catch {
    /* quota / unavailable — ignore, workspace falls back to offline engine */
  }
}

export function loadAICase(id: string): CaseStudy | null {
  try {
    const s = sessionStorage.getItem(KEY(id));
    return s ? (JSON.parse(s) as CaseStudy) : null;
  } catch {
    return null;
  }
}

export function loadSearched(id: string): { used: boolean; web: number; papers: number } | null {
  try {
    const s = sessionStorage.getItem(KEY(id) + ".searched");
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
}

export async function aiIsLive(): Promise<boolean> {
  try {
    const r = await fetch("/api/ai-status", { cache: "no-store" });
    const d = await r.json();
    return Boolean(d?.live);
  } catch {
    return false;
  }
}
