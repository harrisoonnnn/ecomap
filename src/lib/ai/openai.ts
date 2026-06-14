import "server-only";

/**
 * Minimal server-side OpenAI client (no SDK dependency — uses fetch).
 * Reads OPENAI_API_KEY from the environment; never hardcode a key.
 *
 * Uses the Responses API with the hosted `web_search` tool so the model can
 * actually look up real institutions, reports, datasets and papers — the same
 * research behaviour demonstrated by hand in the delivery-rider benchmark case.
 */

const KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.OPENAI_MODEL || "gpt-4.1";
const BASE = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";

export function hasOpenAI(): boolean {
  return Boolean(KEY);
}

interface RunOpts {
  system: string;
  user: string;
  webSearch?: boolean;
  /** ask the model to return strict JSON */
  json?: boolean;
  maxTokens?: number;
  temperature?: number;
}

/** Calls the Responses API and returns the concatenated output text. */
export async function runOpenAI(opts: RunOpts): Promise<string> {
  if (!KEY) throw new Error("OPENAI_API_KEY not set");

  const body: Record<string, unknown> = {
    model: MODEL,
    input: [
      { role: "system", content: opts.system },
      { role: "user", content: opts.user },
    ],
    temperature: opts.temperature ?? 0.4,
    max_output_tokens: opts.maxTokens ?? 8000,
  };
  if (opts.webSearch) body.tools = [{ type: "web_search" }];
  if (opts.json) body.text = { format: { type: "json_object" } };

  const res = await fetch(`${BASE}/responses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${KEY}`,
    },
    body: JSON.stringify(body),
    // research calls can be slow; give them room
    signal: AbortSignal.timeout(120_000),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`OpenAI ${res.status}: ${detail.slice(0, 300)}`);
  }

  const data = await res.json();
  return extractText(data);
}

/** Responses API returns a structured object; pull out all output_text parts. */
function extractText(data: unknown): string {
  const d = data as {
    output_text?: string;
    output?: { content?: { type?: string; text?: string }[] }[];
  };
  if (typeof d.output_text === "string" && d.output_text.trim()) return d.output_text;
  const parts: string[] = [];
  for (const item of d.output ?? []) {
    for (const c of item.content ?? []) {
      if (c.type === "output_text" && typeof c.text === "string") parts.push(c.text);
    }
  }
  return parts.join("\n").trim();
}

/** Robustly parse a JSON object out of a model response (handles code fences). */
export function parseJsonLoose<T = unknown>(text: string): T {
  let s = text.trim();
  // strip ```json ... ``` fences
  const fence = s.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) s = fence[1].trim();
  // grab the outermost {...}
  const first = s.indexOf("{");
  const last = s.lastIndexOf("}");
  if (first !== -1 && last !== -1) s = s.slice(first, last + 1);
  return JSON.parse(s) as T;
}
