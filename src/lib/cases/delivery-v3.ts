import type { CaseStudy } from "./types";
import { deliveryWorkers } from "./delivery-workers";
import { deliveryFactors } from "./delivery-factors-a";
import { deliveryFactorsB } from "./delivery-factors-b";
import { deliveryTimeline, deliveryStakeholders, deliveryRelations } from "./delivery-timeline";
import { deliveryTheories, deliveryMethods, deliveryCharts } from "./delivery-theories";
import { deliveryDatasets, deliveryPapers } from "./delivery-data";
import { deliveryProposals } from "./delivery-proposals";
import { deliveryEssayGuides, deliveryOverviewExpanded } from "./delivery-essay";
import { deliveryIntegratedArguments } from "./delivery-integrated";

/**
 * V3 benchmark: the delivery-rider case, deeply researched and sourced.
 * Built by overlaying authored modules onto the bilingual base case so the
 * existing summary/essay/literature still work, while every module gains depth.
 */
export const deliveryWorkersV3: CaseStudy = {
  ...deliveryWorkers,
  summary: {
    ...deliveryWorkers.summary,
    overviewExpanded: deliveryOverviewExpanded,
  },
  factors: [...deliveryFactors, ...deliveryFactorsB],
  timeline: deliveryTimeline,
  theories: deliveryTheories,
  methods: deliveryMethods,
  proposals: deliveryProposals,
  // V3-only modules
  stakeholdersDetailed: deliveryStakeholders,
  relations: deliveryRelations,
  charts: deliveryCharts,
  neededDatasets: deliveryDatasets,
  papers: deliveryPapers,
  essayGuides: deliveryEssayGuides,
  integratedArguments: deliveryIntegratedArguments,
};
