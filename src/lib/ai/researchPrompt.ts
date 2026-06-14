import {
  L, type CaseStudy, type CaseFactor, type CaseTimelineNode, type CaseStakeholder,
  type CaseRelation, type CaseTheory, type CaseMethod, type CaseChart, type CaseDataset,
  type CasePaper, type CaseProposal, type CaseEssayGuide, type CaseIntegratedArgument,
} from "@/lib/cases/types";
import type { DiagramKind, NewsCategory } from "@/types";

/** The model returns this shape; zh is optional (falls back to en). */
type LL = { en: string; zh?: string } | string;
const toL = (v: LL | undefined, fb = ""): { en: string; zh: string } => {
  if (!v) return L(fb);
  if (typeof v === "string") return L(v);
  return L(v.en ?? fb, v.zh ?? v.en ?? fb);
};
const arrL = (xs: LL[] | undefined): { en: string; zh: string }[] => (xs ?? []).map((x) => toL(x));
const str = (v: unknown, fb = ""): string => (typeof v === "string" && v ? v : fb);
const num = (v: unknown, fb: number): number => (typeof v === "number" && isFinite(v) ? v : fb);

const DIAGRAMS: DiagramKind[] = ["supplyDemand", "ppc", "costCurves", "labourMarket", "externalities", "adas"];
const okDiagram = (v: unknown): DiagramKind => (DIAGRAMS.includes(v as DiagramKind) ? (v as DiagramKind) : "supplyDemand");

export const BRIEF_SYSTEM = `You are a meticulous economics research analyst. You use web search to gather REAL, current, verifiable sources on a topic. You never invent statistics or citations. For every claim you give the exact institution, the exact report/dataset/paper title, the year, a working URL, and the specific key figure or finding.`;

export function briefUserPrompt(topic: string): string {
  return `Research the topic: "${topic}" using web search.

Produce a concise but information-dense research brief in plain text with these sections, citing REAL sources (institution — title (year) — URL — key figure/finding) throughout:

1. EVENT / CONTEXT: what it is, why it matters now, the sharp research question, the major stakeholders.
2. BACKGROUND — 8 perspectives, each with at least one real source + figure: Historical, Social, Cultural, Political, Economic, Technological, Environmental, Legal.
3. TIMELINE: 5-6 dated milestones (causes, trigger, key developments, outlook).
4. STAKEHOLDERS: 5-6 groups with their goals, gains, costs and conflicts.
5. ECONOMIC THEORIES most relevant to THIS topic (4-6), and why each applies.
6. QUANTITATIVE METHODS suited to it (3-4).
7. DATASETS: 4-6 SPECIFIC datasets with institution, website and direct URL.
8. LITERATURE: 8-10 real papers/reports (authors, year, title, finding, URL).
9. POLICY OPTIONS: 6 distinct proposals.

Be specific with numbers and links. This brief will be turned into a structured framework, so pack in the real institutions, figures, years and URLs.`;
}

export const RESEARCH_SYSTEM = `You are Ecomap's AI Economics & Policy Research Department. You convert a sourced research brief into a rigorous, university-level research framework JSON.

Replicate this proven 11-step methodology (the standard set by a benchmark case on China's delivery-rider social insurance):
1 Event identification (what happened, why it matters, research question, stakeholders)
2 Background analysis from 8 DISTINCT perspectives (historical, social, cultural, political, economic, technological, environmental, legal) — each with REAL sources, why it matters, who benefits, who loses, an essay entry point. No repeated templates.
3 Narrative timeline (causes, trigger, milestones, future) with what/why/who/influence/importance.
4 Stakeholder analysis (goals, benefit, cost, incentives, conflicts, shared interests) + relationships.
5 Economic theory selected for THIS topic (not fixed) — what it is, why relevant here, how it applies, strengths, weaknesses, evaluation, suggested diagram.
6 Mathematical modelling explained for beginners (what/how/why/data needed/how applied).
7 Evidence: specific datasets with institution, website and direct link.
8 Literature review: at least 8 genuinely relevant papers with citation, authors, year, finding, why it helps, extract, link.
9 At least 6 policy proposals (objective, mechanism, steps, cost, benefits, stakeholders, feasibility, metrics).
10 Evaluation embedded IN each proposal (problems, unintended consequences, political challenges, trade-offs, long-term risks).
11 Essay construction: integrated arguments where each visibly inherits a theory, a math method, evidence and literature, plus a writing logic chain.

Output STRICT JSON only (no prose, no markdown) matching the schema given by the user. Keep each text field concise (1-3 sentences). Provide a Chinese translation in "zh" for every localised field where possible.`;

export function researchUserPrompt(topic: string, brief = ""): string {
  const sourceBlock = brief
    ? `Use ONLY the following sourced research brief (gathered via live web search) as your factual basis. Preserve the exact institutions, report titles, figures, years and URLs from it — do not invent new ones.\n\n=== RESEARCH BRIEF ===\n${brief}\n=== END BRIEF ===\n\n`
    : "";
  return `${sourceBlock}Topic: "${topic}"

Return ONLY a JSON object with this exact shape (all text fields may be either a string or {"en","zh"}):
{
 "category": one of ["macro","finance","labour","development","tech","trade","policy","sustainability"],
 "title": {"en","zh"},
 "score": number 80-96,
 "potential": [{"label":{"en","zh"},"value":0-100} x4],
 "summary": {"oneLine":{}, "overview":{}, "matters":[{} x3], "stakeholders":[{} x5],
   "overviewExpanded":[{"term":{},"explain":{}} x4]},
 "factors": [ {"key":"bg.economic|bg.political|bg.social|bg.technological|bg.legal|bg.environmental|bg.historical|bg.cultural",
   "summary":{}, "detail":{}, "whyMatters":{}, "whoBenefits":{}, "whoLoses":{}, "essayEntry":{},
   "statistics":[{} x1-2], "stakeholders":[{} x1-2], "essayIdeas":[{}], "arguments":[{}], "counterarguments":[{}],
   "sources":[{"institution":"","title":{},"year":"","url":"","finding":{}} x1-2] } x8 (one per key, all 8) ],
 "timeline": [ {"date":"","kind":"cause|trigger|milestone|future","title":{},"detail":{},
   "what":{}, "why":{}, "who":{}, "influence":{}, "importance":{}} x5-6 ],
 "stakeholders": [ {"id":"government|firms|workers|consumers|investors|unions|regulators|international",
   "icon":"emoji","name":{},"summary":{},"goals":{},"benefit":{},"cost":{},"incentives":{},"conflicts":{},"shared":{}} x5-6 ],
 "relations": [ {"a":"<id>","b":"<id>","kind":"conflict|ally","note":{}} x4-6 ],
 "theories": [ {"name":{},"match":60-98,"diagram":"supplyDemand|ppc|costCurves|labourMarket|externalities|adas",
   "noDiagram":bool,"what":{},"explanation":{},"relevance":{},"applicationPoints":[{} x3],
   "strengths":[{} x2],"weaknesses":[{} x2],"evaluation":{}} x4-6 ],
 "counter": [ {"a":{},"b":{},"tension":{}} x2 ],
 "methods": [ {"name":{},"fit":60-95,"formula":"plain text","what":{},"how":{},"why":{},
   "dataExample":{},"application":{},"purpose":{},"assumptions":{},"data":{},"advantages":{},"weaknesses":{}} x3-4 ],
 "charts": [ {"id":"scatter|trend|correlation","title":{},"showing":{},"trends":{},"findings":{},"supportsArgument":{},"limitations":{}} x3 ],
 "datasets": [ {"name":{},"whyMatters":{},"howSupports":{},"institution":"","website":"","url":"","sampleFinding":{},"year":""} x4-6 ],
 "papers": [ {"citation":"","authors":"","year":"","finding":{},"helps":{},"extract":{},"url":""} x8-10 ],
 "literatureConsensus": 0-100,
 "proposals": [ {"id":"A..F","name":,"objective":{},"mechanism":{},"cost":1-5,"impact":1-5,"fairness":1-5,"feasibility":1-5,"risk":1-5,
   "steps":[{} x2-3],"timeline":{},"budget":{},"benefits":[{} x2],"stakeholderResponses":[{"who":{},"reaction":{}} x2],
   "risks":[{}],"alternatives":[{}],"metrics":[{} x2],
   "evalProblems":[{}],"evalUnintended":[{}],"evalPolitical":[{}],"evalTradeoffs":[{}],"evalLongRisks":[{}]} x6 ],
 "essayGuides": [ {"key":"es.rq|es.intro|es.arg|es.counter|es.eval|es.conclusion",
   "brief":{},"whatToInclude":[{} x2],"dataToCite":[{} x2],"mistakes":[{} x2],"example":{}} x6 ],
 "integratedArguments": [ {"n":1,"coreClaim":{},"theory":{},"theoryApply":[{} x3-4],"mathMethod":{},
   "mathSupports":{"collect":{},"relationship":{},"result":{}},"evidence":{},"literature":{},
   "evaluation":{},"miniConclusion":{},"logicChain":[{} x8]} x3 ],
 "essay": { "basic":{"rq":{},"thesis":{},"outline":[{"heading":{},"points":[{}]} x4],"note":{}},
   "advanced":{...same...}, "research":{...same...} }
}
Return all 8 factors, 6 proposals, 8+ papers. Use real URLs from your web search. JSON only.`;
}

/* ------- mapper: model JSON -> CaseStudy ------- */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function mapToCase(id: string, raw: any): CaseStudy {
  const cat = (["macro","finance","labour","development","tech","trade","policy","sustainability"].includes(raw?.category) ? raw.category : "policy") as NewsCategory;

  const factors: CaseFactor[] = (raw?.factors ?? []).map((f: any) => ({
    key: str(f?.key, "bg.economic"),
    summary: toL(f?.summary), detail: toL(f?.detail),
    statistics: arrL(f?.statistics), stakeholders: arrL(f?.stakeholders),
    essayIdeas: arrL(f?.essayIdeas), arguments: arrL(f?.arguments), counterarguments: arrL(f?.counterarguments),
    whyMatters: f?.whyMatters ? toL(f.whyMatters) : undefined,
    whoBenefits: f?.whoBenefits ? toL(f.whoBenefits) : undefined,
    whoLoses: f?.whoLoses ? toL(f.whoLoses) : undefined,
    essayEntry: f?.essayEntry ? toL(f.essayEntry) : undefined,
    sources: (f?.sources ?? []).map((s: any) => ({ institution: str(s?.institution), title: toL(s?.title), year: str(s?.year), url: str(s?.url, "#"), finding: toL(s?.finding) })),
  }));

  const timeline: CaseTimelineNode[] = (raw?.timeline ?? []).map((n: any) => ({
    date: str(n?.date), kind: (["cause","trigger","milestone","future"].includes(n?.kind) ? n.kind : "milestone"),
    title: toL(n?.title), detail: toL(n?.detail),
    what: n?.what ? toL(n.what) : undefined, why: n?.why ? toL(n.why) : undefined,
    who: n?.who ? toL(n.who) : undefined, influence: n?.influence ? toL(n.influence) : undefined,
    importance: n?.importance ? toL(n.importance) : undefined,
  }));

  const stakeholdersDetailed: CaseStakeholder[] = (raw?.stakeholders ?? []).map((s: any, i: number) => ({
    id: str(s?.id, `s${i}`), icon: str(s?.icon, "•"), name: toL(s?.name),
    summary: toL(s?.summary), goals: toL(s?.goals), benefit: toL(s?.benefit), cost: toL(s?.cost),
    incentives: toL(s?.incentives), conflicts: toL(s?.conflicts), shared: toL(s?.shared),
  }));

  const relations: CaseRelation[] = (raw?.relations ?? []).map((r: any) => ({
    a: str(r?.a), b: str(r?.b), kind: (r?.kind === "ally" ? "ally" : "conflict"), note: toL(r?.note),
  })).filter((r: CaseRelation) => r.a && r.b);

  const theories: CaseTheory[] = (raw?.theories ?? []).map((t: any) => ({
    name: toL(t?.name), match: num(t?.match, 80), diagram: okDiagram(t?.diagram), noDiagram: Boolean(t?.noDiagram),
    what: t?.what ? toL(t.what) : undefined, explanation: toL(t?.explanation), relevance: toL(t?.relevance),
    applicationPoints: arrL(t?.applicationPoints), strengths: arrL(t?.strengths), weaknesses: arrL(t?.weaknesses),
    evaluation: t?.evaluation ? toL(t.evaluation) : undefined,
  }));

  const methods: CaseMethod[] = (raw?.methods ?? []).map((m: any) => ({
    name: toL(m?.name), fit: num(m?.fit, 80), formula: str(m?.formula, "—"),
    what: m?.what ? toL(m.what) : undefined, how: m?.how ? toL(m.how) : undefined, why: m?.why ? toL(m.why) : undefined,
    dataExample: m?.dataExample ? toL(m.dataExample) : undefined, application: m?.application ? toL(m.application) : undefined,
    purpose: toL(m?.purpose ?? m?.why), assumptions: toL(m?.assumptions), data: toL(m?.data ?? m?.dataExample),
    advantages: toL(m?.advantages), weaknesses: toL(m?.weaknesses),
  }));

  const charts: CaseChart[] = (raw?.charts ?? []).map((c: any) => ({
    id: (["scatter","trend","correlation"].includes(c?.id) ? c.id : "scatter"),
    title: toL(c?.title), showing: toL(c?.showing), trends: toL(c?.trends), findings: toL(c?.findings),
    supportsArgument: toL(c?.supportsArgument), limitations: toL(c?.limitations),
  }));

  const neededDatasets: CaseDataset[] = (raw?.datasets ?? []).map((d: any) => ({
    name: toL(d?.name), whyMatters: toL(d?.whyMatters), howSupports: toL(d?.howSupports),
    institution: str(d?.institution), website: str(d?.website), url: str(d?.url, "#"),
    sampleFinding: toL(d?.sampleFinding), year: str(d?.year, "latest"),
  }));

  const papers: CasePaper[] = (raw?.papers ?? []).map((p: any) => ({
    citation: str(p?.citation), authors: str(p?.authors), year: str(p?.year, "—"),
    finding: toL(p?.finding), helps: toL(p?.helps), extract: toL(p?.extract), url: str(p?.url, "#"),
  }));

  const proposals: CaseProposal[] = (raw?.proposals ?? []).map((p: any, i: number) => ({
    id: str(p?.id, String.fromCharCode(65 + i)), name: toL(p?.name), objective: toL(p?.objective),
    mechanism: p?.mechanism ? toL(p.mechanism) : undefined,
    cost: num(p?.cost, 3), impact: num(p?.impact, 3), fairness: num(p?.fairness, 3), feasibility: num(p?.feasibility, 3), risk: num(p?.risk, 3),
    steps: arrL(p?.steps), timeline: toL(p?.timeline), budget: toL(p?.budget), benefits: arrL(p?.benefits),
    stakeholderResponses: (p?.stakeholderResponses ?? []).map((r: any) => ({ who: toL(r?.who), reaction: toL(r?.reaction) })),
    risks: arrL(p?.risks), alternatives: arrL(p?.alternatives), metrics: arrL(p?.metrics),
    evalProblems: arrL(p?.evalProblems), evalUnintended: arrL(p?.evalUnintended), evalPolitical: arrL(p?.evalPolitical),
    evalTradeoffs: arrL(p?.evalTradeoffs), evalLongRisks: arrL(p?.evalLongRisks),
  }));

  const essayGuides: CaseEssayGuide[] = (raw?.essayGuides ?? []).map((g: any) => ({
    key: str(g?.key, "es.intro"), brief: toL(g?.brief), whatToInclude: arrL(g?.whatToInclude),
    dataToCite: arrL(g?.dataToCite), mistakes: arrL(g?.mistakes), example: toL(g?.example),
  }));

  const integratedArguments: CaseIntegratedArgument[] = (raw?.integratedArguments ?? []).map((a: any, i: number) => ({
    n: num(a?.n, i + 1), coreClaim: toL(a?.coreClaim), theory: toL(a?.theory), theoryApply: arrL(a?.theoryApply),
    mathMethod: toL(a?.mathMethod),
    mathSupports: { collect: toL(a?.mathSupports?.collect), relationship: toL(a?.mathSupports?.relationship), result: toL(a?.mathSupports?.result) },
    evidence: toL(a?.evidence), literature: toL(a?.literature), evaluation: toL(a?.evaluation),
    miniConclusion: toL(a?.miniConclusion), logicChain: arrL(a?.logicChain),
  }));

  const mapLevel = (lv: any) => ({
    rq: toL(lv?.rq), thesis: toL(lv?.thesis),
    outline: (lv?.outline ?? []).map((o: any) => ({ heading: toL(o?.heading), points: arrL(o?.points) })),
    note: toL(lv?.note),
  });

  return {
    id, category: cat, event: toL(raw?.title, id), score: num(raw?.score, 88),
    potential: (raw?.potential ?? []).map((p: any) => ({ label: toL(p?.label), value: num(p?.value, 85) })),
    summary: {
      oneLine: toL(raw?.summary?.oneLine), overview: toL(raw?.summary?.overview),
      matters: arrL(raw?.summary?.matters), stakeholders: arrL(raw?.summary?.stakeholders),
      overviewExpanded: (raw?.summary?.overviewExpanded ?? []).map((g: any) => ({ term: toL(g?.term), explain: toL(g?.explain) })),
    },
    factors, timeline, theories,
    counter: (raw?.counter ?? []).map((c: any) => ({ a: toL(c?.a), b: toL(c?.b), tension: toL(c?.tension) })),
    methods,
    datasets: neededDatasets.map((d) => ({ name: d.name.en, provider: d.institution, url: d.url })),
    evidence: [],
    literature: {
      supporting: [], opposing: [],
      debates: (raw?.counter ?? []).map((c: any) => toL(c?.tension)),
      authors: papers.slice(0, 4).map((p) => ({ name: p.authors, field: L(p.citation) })),
      gaps: [], future: [], consensus: num(raw?.literatureConsensus, 65),
    },
    proposals,
    critical: [],
    essay: { basic: mapLevel(raw?.essay?.basic), advanced: mapLevel(raw?.essay?.advanced), research: mapLevel(raw?.essay?.research) },
    stakeholdersDetailed, relations, charts, neededDatasets, papers, essayGuides, integratedArguments,
  };
}

export const COPILOT_SYSTEM = `You are the Ecomap Copilot, an expert economics & policy research partner embedded in a research workspace. Answer concisely and rigorously, like a research supervisor. When given the current workspace context (topic, theories, methods, evidence, thesis), use it — never ask the user to repeat it. You can: explain concepts, expand a section, find/strengthen evidence (suggest real sources and search strategies), swap theories, generate counterarguments, challenge the argument as a critic, propose alternative essay structures, and sharpen the thesis. If asked for sources, name real institutions/papers and how to find them. Keep replies under ~150 words unless asked for more. Reply in the user's language (English or 中文).`;
