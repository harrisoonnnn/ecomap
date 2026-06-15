import "server-only";

/**
 * Real web + academic search layer. Tavily provides current web/news/gov/policy
 * results; Semantic Scholar provides academic papers. Both degrade gracefully:
 * if a key is missing or a call fails, that source is simply omitted.
 */

const TAVILY_KEY = process.env.TAVILY_API_KEY;
const S2_KEY = process.env.SEMANTIC_SCHOLAR_API_KEY; // optional — S2 works keyless at low volume

export function hasTavily(): boolean {
  return Boolean(TAVILY_KEY);
}
export function hasSearch(): boolean {
  return Boolean(TAVILY_KEY); // S2 is keyless-capable, Tavily is the gate for "web search"
}

export interface WebResult {
  title: string;
  url: string;
  snippet: string;
  date?: string;
}
export interface PaperResult {
  title: string;
  authors: string;
  year: string;
  venue: string;
  url: string;
  abstract: string;
  citations: number;
}

/** One Tavily search. topic = the query; depth basic|advanced. */
export async function tavilySearch(
  query: string,
  opts: { topic?: "general" | "news"; maxResults?: number; days?: number } = {}
): Promise<WebResult[]> {
  if (!TAVILY_KEY) return [];
  try {
    const body: Record<string, unknown> = {
      api_key: TAVILY_KEY,
      query,
      search_depth: "advanced",
      max_results: opts.maxResults ?? 5,
      include_answer: false,
      topic: opts.topic ?? "general",
    };
    if (opts.topic === "news" && opts.days) body.days = opts.days;

    const res = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data?.results ?? []).map((r: Record<string, unknown>) => ({
      title: String(r.title ?? ""),
      url: String(r.url ?? ""),
      snippet: String(r.content ?? "").slice(0, 500),
      date: r.published_date ? String(r.published_date) : undefined,
    }));
  } catch {
    return [];
  }
}

/** Semantic Scholar paper search (works without a key at low volume). */
export async function semanticScholarSearch(query: string, limit = 8): Promise<PaperResult[]> {
  try {
    const fields = "title,year,authors,venue,abstract,url,citationCount,externalIds";
    const url = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(query)}&limit=${limit}&fields=${fields}`;
    const res = await fetch(url, {
      headers: S2_KEY ? { "x-api-key": S2_KEY } : {},
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data?.data ?? []).map((p: Record<string, unknown>) => {
      const authorsArr = (p.authors as { name?: string }[] | undefined) ?? [];
      const ext = (p.externalIds as { DOI?: string } | undefined) ?? {};
      const url = (p.url as string) || (ext.DOI ? `https://doi.org/${ext.DOI}` : "");
      return {
        title: String(p.title ?? ""),
        authors: authorsArr.slice(0, 3).map((a) => a.name).filter(Boolean).join(", ") + (authorsArr.length > 3 ? " et al." : ""),
        year: p.year ? String(p.year) : "—",
        venue: String(p.venue ?? ""),
        url,
        abstract: String(p.abstract ?? "").slice(0, 400),
        citations: Number(p.citationCount ?? 0),
      };
    });
  } catch {
    return [];
  }
}

/** Run the full multi-source search for a topic and assemble a sourced brief. */
export async function gatherSources(topic: string): Promise<{ brief: string; used: boolean; web: number; papers: number }> {
  const [news, official, policy, papers] = await Promise.all([
    tavilySearch(`${topic} latest news 2025 2026`, { topic: "news", days: 365, maxResults: 5 }),
    tavilySearch(`${topic} official statistics government data report`, { maxResults: 5 }),
    tavilySearch(`${topic} policy document regulation analysis`, { maxResults: 4 }),
    semanticScholarSearch(`${topic} economics policy`, 8),
  ]);

  const webCount = news.length + official.length + policy.length;
  if (webCount === 0 && papers.length === 0) return { brief: "", used: false, web: 0, papers: 0 };

  const fmtWeb = (rs: WebResult[]) =>
    rs.map((r) => `- ${r.title}${r.date ? ` (${r.date.slice(0, 10)})` : ""}\n  ${r.url}\n  ${r.snippet}`).join("\n");
  const fmtPapers = (ps: PaperResult[]) =>
    ps.map((p) => `- ${p.authors} (${p.year}). "${p.title}". ${p.venue} [${p.citations} citations]\n  ${p.url}\n  ${p.abstract}`).join("\n");

  const brief = [
    `LIVE SEARCH RESULTS for "${topic}" (gathered just now — use these REAL sources, URLs and figures; do not invent others):`,
    news.length ? `\n## CURRENT NEWS\n${fmtWeb(news)}` : "",
    official.length ? `\n## OFFICIAL STATISTICS & GOVERNMENT REPORTS\n${fmtWeb(official)}` : "",
    policy.length ? `\n## POLICY DOCUMENTS & ANALYSIS\n${fmtWeb(policy)}` : "",
    papers.length ? `\n## ACADEMIC PAPERS (Semantic Scholar)\n${fmtPapers(papers)}` : "",
  ].filter(Boolean).join("\n");

  return { brief, used: true, web: webCount, papers: papers.length };
}
