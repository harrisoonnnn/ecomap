/**
 * Provider seam for live AI. With an OpenAI key configured (server-side), these
 * functions can be upgraded to genuine, sourced generation. Without a key — the
 * default for this self-contained demo — the app uses the deterministic offline
 * engine and the workspace-aware Copilot fallback.
 *
 * Keeping this seam isolated means swapping in a real provider is a one-file change.
 */

export const AI_LIVE = Boolean(
  typeof process !== "undefined" && process.env && process.env.OPENAI_API_KEY
);

/** Whether a given case id is hand-authored & sourced vs methodology-templated. */
const SOURCED_CASES = new Set(["delivery-workers"]);
export function isSourced(id: string): boolean {
  return SOURCED_CASES.has(id);
}

export type ContentMode = "sourced" | "templated" | "live";
export function contentMode(id: string): ContentMode {
  if (isSourced(id)) return "sourced";
  return AI_LIVE ? "live" : "templated";
}
