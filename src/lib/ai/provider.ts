/**
 * Provider seam for AI. With a DeepSeek key configured (server-side), the
 * Research Assistant and Copilot generate live analysis; without a key — the
 * default for this self-contained demo — the app uses the deterministic offline
 * engine and the workspace-aware Copilot fallback.
 *
 * Note: this runs on the client too, where server env vars are not readable, so
 * a live AI-generated case is detected at the call site (sessionStorage) and
 * badged "live" there. Here we only distinguish hand-authored sourced cases from
 * the offline methodology template.
 */

/** Whether a given case id is hand-authored & sourced vs methodology-templated. */
const SOURCED_CASES = new Set(["delivery-workers"]);
export function isSourced(id: string): boolean {
  return SOURCED_CASES.has(id);
}

export type ContentMode = "sourced" | "templated" | "live" | "websearch";
export function contentMode(id: string): ContentMode {
  return isSourced(id) ? "sourced" : "templated";
}
