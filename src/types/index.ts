export type Locale = "en" | "zh";

export type NewsCategory =
  | "macro"
  | "finance"
  | "labour"
  | "development"
  | "tech"
  | "trade"
  | "policy"
  | "sustainability";

export interface NewsItem {
  id: string;
  category: NewsCategory;
  headline: { en: string; zh: string };
  source: string;
  publisher: string;
  url: string;
  date: string;
  summary: { en: string; zh: string };
  region: string;
}

export type EvidenceGrade = "A+" | "A" | "B" | "C" | "D";

export interface EvidenceSource {
  id: string;
  title: string;
  publisher: string;
  grade: EvidenceGrade;
  reliability: number; // 0-100
  bias: string;
  strength: number; // 0-100
  url: string;
  year: number;
}

export interface Theory {
  id: string;
  name: { en: string; zh: string };
  match: number; // 0-100
  diagram: DiagramKind;
  explanation: { en: string; zh: string };
  relevance: { en: string; zh: string };
  strengths: { en: string; zh: string }[];
  weaknesses: { en: string; zh: string }[];
}

export type DiagramKind =
  | "supplyDemand"
  | "ppc"
  | "costCurves"
  | "labourMarket"
  | "externalities"
  | "adas";

export interface Stakeholder {
  id: string;
  name: { en: string; zh: string };
  icon: string;
  interests: { en: string; zh: string };
  incentives: { en: string; zh: string };
  benefits: { en: string; zh: string };
  risks: { en: string; zh: string };
}

export interface Proposal {
  id: string;
  name: { en: string; zh: string };
  objective: { en: string; zh: string };
  implementation: { en: string; zh: string };
  cost: number; // 1-5
  impact: number; // 1-5
  fairness: number; // 1-5
  feasibility: number; // 1-5
  risk: number; // 1-5 (higher = riskier)
}

export type Difficulty =
  | "IGCSE"
  | "A-Level"
  | "IB"
  | "AP"
  | "NEC"
  | "Undergraduate"
  | "Research Paper";

export interface Project {
  id: string;
  title: string;
  event: string;
  category: NewsCategory;
  score: number;
  updated: string;
  folder: string;
  favorite: boolean;
}
