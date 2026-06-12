import type { DiagramKind, NewsCategory } from "@/types";

/** Localised string. Helper `L` fills zh with the en fallback when omitted. */
export interface L {
  en: string;
  zh: string;
}
export const L = (en: string, zh?: string): L => ({ en, zh: zh ?? en });
export const LS = (...items: [string, string?][]): L[] => items.map(([e, z]) => L(e, z));

export interface CaseTheory {
  name: L;
  match: number;
  diagram: DiagramKind;
  explanation: L;
  relevance: L;
  strengths: L[];
  weaknesses: L[];
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

export interface CaseLitItem {
  cite: string;
  finding: L;
  stance: "support" | "oppose";
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
}

export interface CaseTimelineNode {
  date: string;
  kind: "cause" | "trigger" | "milestone" | "future";
  title: L;
  detail: L;
}

export interface CaseCritical {
  key: string; // ce.*
  text: L;
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
}
