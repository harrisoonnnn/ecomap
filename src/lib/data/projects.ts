import type { Project } from "@/types";

export const PROJECTS: Project[] = [
  { id: "ev-tariffs", title: "US–China EV Tariffs", event: "ev-tariffs", category: "trade", score: 94, updated: "2026-06-10", folder: "Trade & Industrial Policy", favorite: true },
  { id: "delivery-workers", title: "Gig Riders' Social Insurance", event: "delivery-workers", category: "labour", score: 91, updated: "2026-06-09", folder: "Labour & Welfare", favorite: true },
  { id: "ai-layoffs", title: "AI & Entry-Level Hiring", event: "ai-layoffs", category: "tech", score: 89, updated: "2026-06-08", folder: "Technology & Work", favorite: false },
  { id: "carbon-border", title: "EU Carbon Border Tax", event: "carbon-border", category: "sustainability", score: 87, updated: "2026-06-06", folder: "Climate & Sustainability", favorite: false },
  { id: "housing-affordability", title: "Land-Value Tax Pilots", event: "housing-affordability", category: "policy", score: 85, updated: "2026-06-05", folder: "Public Policy", favorite: true },
  { id: "min-wage", title: "Seoul Minimum-Wage Debate", event: "min-wage", category: "labour", score: 83, updated: "2026-06-02", folder: "Labour & Welfare", favorite: false },
  { id: "chip-subsidy", title: "India Chip Subsidies", event: "chip-subsidy", category: "tech", score: 86, updated: "2026-05-31", folder: "Technology & Work", favorite: false },
  { id: "bank-stress", title: "Regional Bank Stress & CRE", event: "bank-stress", category: "finance", score: 84, updated: "2026-05-30", folder: "Financial Stability", favorite: false },
];

export const FOLDERS = [
  "Trade & Industrial Policy",
  "Labour & Welfare",
  "Technology & Work",
  "Climate & Sustainability",
  "Public Policy",
  "Financial Stability",
];

export const DASHBOARD_STATS = {
  projects: 8,
  sources: 142,
  theories: 47,
  words: 18600,
};
