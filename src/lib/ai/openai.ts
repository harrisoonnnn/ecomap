import "server-only";

/**
 * Server-side DeepSeek client (OpenAI-compatible Chat Completions API, via fetch).
 * Reads DEEPSEEK_API_KEY from the environment; never hardcode a key.
 *
 * Note: DeepSeek has no hosted web-search tool. The model draws on its training
 * knowledge to name real institutions, reports, datasets and papers. These are
 * usually genuine for well-known topics, but specific figures may be dated and
 * should be verified — the UI labels AI output accordingly.
 */

const KEY = process.env.DEEPSEEK_API_KEY;
const MODEL = process.env.DEEPSEEK_MODEL || "deepseek-chat";
const BASE = process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com";

export function hasAI(): boolean {
  return Boolean(KEY);
}
// kept for backward-compat with existing imports
export const hasOpenAI = hasAI;

interface RunOpts {
  system: string;
  user: string;
  /** ask the model to return strict JSON */
  json?: boolean;
  maxTokens?: number;
  temperature?: number;
  /** ignored — DeepSeek has no hosted web search; kept for call-site compatibility */
  webSearch?: boolean;
}

export async function runAI(opts: RunOpts): Promise<string> {
  if (!KEY) throw new Error("DEEPSEEK_API_KEY not set");

  const body: Record<string, unknown> = {
    model: MODEL,
    messages: [
      { role: "system", content: opts.system },
      { role: "user", content: opts.user },
    ],
    temperature: opts.temperature ?? 0.4,
    max_tokens: opts.maxTokens ?? 8000,
    stream: false,
  };
  if (opts.json) body.response_format = { type: "json_object" };

  const res = await fetch(`${BASE}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${KEY}`,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(170_000),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`DeepSeek ${res.status}: ${detail.slice(0, 400)}`);
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (typeof text !== "string" || !text.trim()) throw new Error("DeepSeek returned empty output");
  return text;
}
// backward-compat alias
export const runOpenAI = runAI;

/** Robustly parse a JSON object out of a model response (handles code fences). */
export function parseJsonLoose<T = unknown>(text: string): T {
  let s = text.trim();
  const fence = s.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) s = fence[1].trim();
  const first = s.indexOf("{");
  const last = s.lastIndexOf("}");
  if (first !== -1 && last !== -1) s = s.slice(first, last + 1);
  return JSON.parse(s) as T;
}
