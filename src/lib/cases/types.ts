import type { DiagramKind, NewsCategory } from "@/types";

/** Localised string. Helper `L` fills zh with the en fallback when omitted. */
export interface L {
  en: string;
  zh: string;
}
export const L = (en: string, zh?: string): L => ({ en, zh: zh ?? en });
export const LS = (...items: [string, string?][]): L[] => items.map(([e, z]) => L(e, z));

/** A real, citable source attached to a finding. */
export interface Source {
  institution: string;
  title: L;
  year: string;
  url: string;
  finding: L;
}

export interface CaseTheory {
  name: L;
  match: number;
  diagram: DiagramKind;
  explanation: L;
  relevance: L;
  strengths: L[];
  weaknesses: L[];
  /** V3 depth (optional; benchmark cases populate these) */
  what?: L;
  applicationPoints?: L[];
  evaluation?: L;
  noDiagram?: boolean;
}


export interface CaseCounter {
  a: L;
  b: L;
  tension: L;
}

export interface CaseMethod {
  name: L;
  fit: number;
  purpose: L;
  formula: string;
  assumptions: L;
  data: L;
  advantages: L;
  weaknesses: L;
  /** V3 educational depth (optional) */
  what?: L;
  how?: L;
  why?: L;
  dataExample?: L;
  application?: L;
}

export interface CaseEvidence {
  title: L;
  publisher: string;
  grade: "A+" | "A" | "B" | "C" | "D";
  reliability: number;
  bias: L;
  requiredData: L;
  whyItMatters: L;
  howItSupports: L;
  url: string;
  year: number;
}

/** V3 needed-dataset entry (replaces reliability-scored evidence in benchmark cases). */
export interface CaseDataset {
  name: L;
  whyMatters: L;
  howSupports: L;
  institution: string;
  website: string;
  url: string;
  sampleFinding: L;
  year: string;
}

export interface CaseLitItem {
  cite: string;
  finding: L;
  stance: "support" | "oppose";
}

/** V3 rich literature entry. */
export interface CasePaper {
  citation: string;
  authors: string;
  year: string;
  finding: L;
  helps: L;
  extract: L;
  url: string;
}

export interface CaseProposal {
  id: string;
  name: L;
  objective: L;
  cost: number;
  impact: number;
  fairness: number;
  feasibility: number;
  risk: number;
  steps: L[];
  timeline: L;
  budget: L;
  stakeholderResponses: { who: L; reaction: L }[];
  risks: L[];
  alternatives: L[];
  metrics: L[];
  /** V3 embedded evaluation (optional) */
  mechanism?: L;
  benefits?: L[];
  stakeholdersList?: L[];
  evalProblems?: L[];
  evalUnintended?: L[];
  evalPolitical?: L[];
  evalTradeoffs?: L[];
  evalLongRisks?: L[];
}

export interface CaseFactor {
  key: string; // bg.*
  summary: L;
  detail: L;
  statistics: L[];
  stakeholders: L[];
  essayIdeas: L[];
  arguments: L[];
  counterarguments: L[];
  /** V3 sourced research (optional) */
  sources?: Source[];
  whyMatters?: L;
  whoBenefits?: L;
  whoLoses?: L;
  essayEntry?: L;
}

export interface CaseTimelineNode {
  date: string;
  kind: "cause" | "trigger" | "milestone" | "future";
  title: L;
  detail: L;
  /** V3 narrative depth (optional) */
  what?: L;
  why?: L;
  who?: L;
  influence?: L;
  importance?: L;
}

/** V3 stakeholder (restored + deepened). */
export interface CaseStakeholder {
  id: string;
  name: L;
  icon: string;
  summary: L;
  goals: L;
  benefit: L;
  cost: L;
  incentives: L;
  conflicts: L;
  shared: L;
}

/** V3 stakeholder relationship edge for the map. */
export interface CaseRelation {
  a: string; // stakeholder id
  b: string;
  kind: "conflict" | "ally";
  note: L;
}

/** V3 chart with interpretation. */
export interface CaseChart {
  id: "scatter" | "trend" | "correlation";
  title: L;
  showing: L;
  trends: L;
  findings: L;
  supportsArgument: L;
  limitations: L;
}

export interface CaseCritical {
  key: string; // ce.*
  text: L;
}

/** V3 expandable essay-section guidance. */
export interface CaseEssayGuide {
  key: string; // es.*
  brief: L;
  whatToInclude: L[];
  dataToCite: L[];
  mistakes: L[];
  example: L;
}

export interface CaseEssayLevel {
  rq: L;
  thesis: L;
  outline: { heading: L; points: L[] }[];
  note: L;
}

export interface CaseStudy {
  id: string;
  category: NewsCategory;
  event: L;
  score: number;
  potential: { label: L; value: number }[];
  summary: {
    oneLine: L;
    overview: L;
    matters: L[];
    stakeholders: L[];
    /** V3: per-phrase glossary expanding the one-liner into a mini background report */
    overviewExpanded?: { term: L; explain: L }[];
  };
  factors: CaseFactor[];
  timeline: CaseTimelineNode[];
  theories: CaseTheory[];
  counter: CaseCounter[];
  methods: CaseMethod[];
  datasets: { name: string; provider: string; url: string }[];
  evidence: CaseEvidence[];
  literature: {
    supporting: CaseLitItem[];
    opposing: CaseLitItem[];
    debates: L[];
    authors: { name: string; field: L }[];
    gaps: L[];
    future: L[];
    consensus: number;
  };
  proposals: CaseProposal[];
  critical: CaseCritical[];
  essay: {
    basic: CaseEssayLevel;
    advanced: CaseEssayLevel;
    research: CaseEssayLevel;
  };
  /** ---- V3 benchmark-only optional modules ---- */
  stakeholdersDetailed?: CaseStakeholder[];
  relations?: CaseRelation[];
  charts?: CaseChart[];
  neededDatasets?: CaseDataset[];
  papers?: CasePaper[];
  essayGuides?: CaseEssayGuide[];
}

