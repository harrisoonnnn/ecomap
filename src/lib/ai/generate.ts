import type {
  EvidenceSource,
  Locale,
  NewsCategory,
  Proposal,
  Stakeholder,
  Theory,
} from "@/types";
import {
  COUNTER_THEORIES,
  DATASETS,
  EVIDENCE,
  METHODS,
  MathMethod,
  STAKEHOLDERS,
  THEORY_CATALOG,
} from "@/lib/data/catalog";
import { getNews } from "@/lib/data/news";
import { seededRand } from "@/lib/utils";
import { lookupKnowledge } from "./knowledge";

type L = { en: string; zh: string };

export interface PestleFactor {
  key: string; // dict key e.g. bg.political
  items: L[];
}

export interface TimelineEvent {
  date: string;
  label: L;
}

export interface LitItem {
  cite: string;
  finding: L;
  stance: "support" | "oppose";
}

export interface CriticalBlock {
  key: string;
  text: L;
}

export interface EssayArg {
  claim: L;
  evidence: L;
  counter: L;
  eval: L;
}

export interface Framework {
  id: string;
  event: L;
  category: NewsCategory;
  score: number;
  potential: { label: L; value: number }[];
  summary: {
    oneLine: L;
    overview: L;
    matters: L[];
    stakeholders: string[];
  };
  pestle: PestleFactor[];
  timeline: TimelineEvent[];
  stakeholders: Stakeholder[];
  theories: Theory[];
  counter: typeof COUNTER_THEORIES;
  methods: MathMethod[];
  datasets: typeof DATASETS;
  evidence: EvidenceSource[];
  literature: {
    supporting: LitItem[];
    opposing: LitItem[];
    authors: { name: string; field: L }[];
    gaps: L[];
    future: L[];
    consensus: number; // % support
  };
  proposals: Proposal[];
  critical: CriticalBlock[];
  essay: {
    rq: L;
    thesis: L;
    intro: L;
    args: EssayArg[];
    conclusion: L;
  };
}

/* ---- per-event narrative overrides (hero events authored richly) ---- */
const OVERRIDES: Record<
  string,
  { oneLine: L; matters: L[]; rq: L; thesis: L }
> = {
  "ev-tariffs": {
    oneLine: {
      en: "A 100% US tariff on Chinese EVs is a protectionist response to overcapacity that trades consumer welfare for strategic and political goals.",
      zh: "美国对中国电动车征收 100% 关税，是对产能过剩的保护主义回应，以消费者福利换取战略与政治目标。",
    },
    matters: [
      { en: "Tests free-trade theory against industrial strategy and national security.", zh: "在产业战略与国家安全面前检验自由贸易理论。" },
      { en: "Directly affects EV prices, the green transition and supply chains.", zh: "直接影响电动车价格、绿色转型与供应链。" },
      { en: "A live case of tariffs, deadweight loss and retaliation risk.", zh: "关税、无谓损失与报复风险的现实案例。" },
    ],
    rq: {
      en: "To what extent does a 100% tariff on Chinese electric vehicles improve net welfare in the importing economy?",
      zh: "对中国电动车征收 100% 关税，在多大程度上提升进口国的净福利？",
    },
    thesis: {
      en: "While the tariff may protect domestic producers and strategic capacity, standard trade theory predicts a net welfare loss whose size depends on elasticities, retaliation and the value placed on security externalities.",
      zh: "尽管关税可保护本国生产者与战略产能，标准贸易理论预测会产生净福利损失，其规模取决于弹性、报复以及对安全外部性的赋值。",
    },
  },
  "delivery-workers": {
    oneLine: {
      en: "Extending social insurance to delivery riders reallocates risk from workers to platforms, with contested effects on wages, prices and employment.",
      zh: "将社会保险扩展至外卖骑手会把风险从劳动者转移到平台，对工资、价格与就业的影响存在争议。",
    },
    matters: [
      { en: "Reframes gig work through labour-market and market-failure theory.", zh: "用劳动力市场与市场失灵理论重新审视零工经济。" },
      { en: "Tests who bears a mandated benefit: firms, workers or consumers.", zh: "检验强制福利的最终承担者：企业、劳动者还是消费者。" },
      { en: "Touches informality, monopsony and the future of platform work.", zh: "涉及非正规化、买方垄断与平台用工的未来。" },
    ],
    rq: {
      en: "What are the welfare and employment effects of mandating platform contributions to delivery riders' social insurance?",
      zh: "强制平台为外卖骑手缴纳社会保险，会对福利与就业产生何种影响？",
    },
    thesis: {
      en: "Mandated contributions internalise a real externality and may raise rider welfare, but in a monopsonistic, price-elastic market part of the cost is shifted to riders and consumers, so net effects are an empirical question.",
      zh: "强制缴纳使真实外部性内部化，可能提升骑手福利；但在买方垄断且价格弹性较高的市场中，部分成本会转嫁给骑手与消费者，净效应需由实证检验。",
    },
  },
};

const CATEGORY_DIAGRAM: Record<NewsCategory, Theory["diagram"]> = {
  macro: "adas",
  finance: "supplyDemand",
  labour: "labourMarket",
  development: "ppc",
  tech: "costCurves",
  trade: "supplyDemand",
  policy: "externalities",
  sustainability: "externalities",
};

export function buildFramework(id: string, salt = 0): Framework {
  const news = getNews(id);
  const event: L = news?.headline ?? {
    en: id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    zh: id.replace(/-/g, " "),
  };
  const category: NewsCategory = news?.category ?? "macro";
  const rand = seededRand(id + ":" + salt);
  const ev = event.en;

  const ov = OVERRIDES[id];
  const score = ov ? 94 : 78 + Math.floor(rand() * 16);

  // theory ranking — bias by category, jitter by seed
  const preferred = CATEGORY_DIAGRAM[category];
  const theories: Theory[] = [...THEORY_CATALOG]
    .map((t) => ({
      ...t,
      match: Math.min(
        99,
        t.match + (t.diagram === preferred ? 4 : 0) - Math.floor(rand() * 6)
      ),
    }))
    .sort((a, b) => b.match - a.match)
    .slice(0, 6);

  const proposals = buildProposals(ev, rand);

  return {
    id,
    event,
    category,
    score,
    potential: [
      { label: { en: "Theory richness", zh: "理论丰富度" }, value: 88 + Math.floor(rand() * 10) },
      { label: { en: "Data availability", zh: "数据可得性" }, value: 80 + Math.floor(rand() * 16) },
      { label: { en: "Debate / contestability", zh: "争议性" }, value: 84 + Math.floor(rand() * 12) },
      { label: { en: "Policy relevance", zh: "政策相关性" }, value: 86 + Math.floor(rand() * 12) },
    ],
    summary: {
      oneLine:
        ov?.oneLine ?? {
          en: `${ev} is best understood as an economic problem of incentives, trade-offs and distribution rather than a purely political story.`,
          zh: `「${event.zh}」最好被理解为关于激励、权衡与分配的经济问题，而非纯粹的政治叙事。`,
        },
      overview: {
        en: `This event reshapes the costs, prices and incentives facing key actors. An economist would ask who gains, who loses, how behaviour adjusts at the margin, and whether the new equilibrium is efficient and equitable. The framework below maps the relevant theory, evidence and policy options around "${ev}".`,
        zh: `该事件重塑了关键主体面临的成本、价格与激励。经济学家会追问：谁获益、谁受损、行为在边际上如何调整，以及新的均衡是否兼顾效率与公平。下文围绕「${event.zh}」梳理相关理论、证据与政策选项。`,
      },
      matters:
        ov?.matters ?? [
          { en: `It changes relative prices and incentives across the ${category} system.`, zh: `它改变了${category}体系中的相对价格与激励。` },
          { en: "It creates clear winners and losers worth analysing distributionally.", zh: "它造就了明确的赢家与输家，值得从分配角度分析。" },
          { en: "It connects to live theoretical and policy debates.", zh: "它与当下的理论与政策辩论紧密相关。" },
        ],
      stakeholders: ["government", "firms", "workers", "consumers", "investors"],
    },
    pestle: buildPestle(ev, event.zh),
    timeline: buildTimeline(news?.date ?? "2026-06-01", event),
    stakeholders: STAKEHOLDERS,
    theories,
    counter: COUNTER_THEORIES,
    methods: [...METHODS].sort((a, b) => b.fit - a.fit),
    datasets: DATASETS,
    evidence: EVIDENCE,
    literature: buildLiterature(ev, rand),
    proposals,
    critical: buildCritical(ev),
    essay: {
      rq:
        ov?.rq ?? {
          en: `To what extent does ${lower(ev)} improve economic welfare, and for whom?`,
          zh: `「${event.zh}」在多大程度上、并为谁提升了经济福利？`,
        },
      thesis:
        ov?.thesis ?? {
          en: `${ev} produces both efficiency and distributional effects; whether the net impact is positive depends on elasticities, the strength of any market failure being corrected, and the risk of government failure.`,
          zh: `「${event.zh}」同时带来效率与分配效应；净影响是否为正，取决于弹性、所纠正市场失灵的强度，以及政府失灵的风险。`,
        },
      intro: {
        en: `This essay analyses "${ev}" using core microeconomic and macroeconomic theory. It defines the problem, identifies the market or policy mechanism at work, and evaluates the welfare consequences for each stakeholder group before reaching a reasoned judgement.`,
        zh: `本文运用核心微观与宏观经济理论分析「${event.zh}」。文章界定问题、识别其中的市场或政策机制，并在做出有依据的判断前评估各利益相关者群体的福利后果。`,
      },
      args: buildEssayArgs(ev, theories),
      conclusion: {
        en: `On balance, ${lower(ev)} is neither costless nor self-evidently beneficial. The defensible position is conditional: it improves welfare only where it corrects a genuine market failure at lower cost than the government failure it risks, and where distributional losses are compensated. The strength of the evidence — and the elasticities — should decide the verdict.`,
        zh: `总体而言，「${event.zh}」既非毫无成本，也并非不言自明地有益。可辩护的立场是有条件的：唯有当它以低于所冒政府失灵的成本纠正真实的市场失灵，且对分配损失予以补偿时，才提升福利。证据强度与弹性大小应最终决定结论。`,
      },
    },
  };
}

function lower(s: string) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

function buildPestle(en: string, zh: string): PestleFactor[] {
  return [
    { key: "bg.political", items: [
      { en: `Government uses ${lower(en)} to signal priorities and respond to constituencies.`, zh: `政府借「${zh}」释放优先信号并回应选民。` },
      { en: "Coalitions and lobbies shape how far the measure goes.", zh: "联盟与游说集团决定该措施推进的程度。" },
    ]},
    { key: "bg.economic", items: [
      { en: "Relative prices, costs and incentives shift at the margin.", zh: "相对价格、成本与激励在边际上发生变化。" },
      { en: "Possible effects on inflation, employment and competitiveness.", zh: "可能影响通胀、就业与竞争力。" },
    ]},
    { key: "bg.social", items: [
      { en: "Distributional impact across income groups and regions.", zh: "对不同收入群体与地区的分配影响。" },
    ]},
    { key: "bg.technological", items: [
      { en: "Adoption, automation and innovation responses to the new incentives.", zh: "面对新激励的采纳、自动化与创新反应。" },
    ]},
    { key: "bg.legal", items: [
      { en: "Compliance, enforcement and challenge under existing rules.", zh: "在既有规则下的合规、执行与挑战。" },
    ]},
    { key: "bg.environmental", items: [
      { en: "Direct or indirect effects on emissions and resource use.", zh: "对排放与资源使用的直接或间接影响。" },
    ]},
    { key: "bg.historical", items: [
      { en: "Precedents and path dependence frame today's options.", zh: "先例与路径依赖框定了今天的选项。" },
    ]},
    { key: "bg.cultural", items: [
      { en: "Norms and expectations affect legitimacy and compliance.", zh: "规范与预期影响合法性与遵从度。" },
    ]},
  ];
}

function buildTimeline(date: string, event: L): TimelineEvent[] {
  const y = Number(date.slice(0, 4));
  return [
    { date: `${y - 3}`, label: { en: "Structural pressures build", zh: "结构性压力累积" } },
    { date: `${y - 1}`, label: { en: "Early signals & pilot measures", zh: "早期信号与试点措施" } },
    { date, label: event },
    { date: `${y}+`, label: { en: "Adjustment, responses & spillovers", zh: "调整、反应与外溢" } },
  ];
}

function buildLiterature(ev: string, rand: () => number) {
  const consensus = 60 + Math.floor(rand() * 25);
  return {
    consensus,
    supporting: [
      { cite: "Acemoglu & Restrepo (2022)", finding: { en: "Identifies sizeable adjustment effects consistent with the mechanism.", zh: "识别出与该机制一致的显著调整效应。" }, stance: "support" as const },
      { cite: "World Bank (2025)", finding: { en: "Cross-country evidence supports the predicted direction of impact.", zh: "跨国证据支持所预测的影响方向。" }, stance: "support" as const },
      { cite: "Card & Krueger lineage", finding: { en: "Empirical work shows effects can be smaller than naive theory implies.", zh: "实证研究表明效应可能小于朴素理论的预期。" }, stance: "support" as const },
    ],
    opposing: [
      { cite: "Public-choice critique", finding: { en: "Argues the measure is captured and welfare-reducing in practice.", zh: "认为该措施被俘获，实践中降低福利。" }, stance: "oppose" as const },
      { cite: "Neoclassical trade school", finding: { en: "Predicts deadweight loss exceeding the targeted benefit.", zh: "预测无谓损失超过目标收益。" }, stance: "oppose" as const },
    ],
    authors: [
      { name: "Daron Acemoglu", field: { en: "Institutions & technology", zh: "制度与技术" } },
      { name: "Esther Duflo", field: { en: "Development & evaluation", zh: "发展与政策评估" } },
      { name: "David Autor", field: { en: "Labour economics", zh: "劳动经济学" } },
    ],
    gaps: [
      { en: "Few causal estimates in this specific context.", zh: "在该具体情境下的因果估计稀少。" },
      { en: "Long-run and general-equilibrium effects under-studied.", zh: "长期与一般均衡效应研究不足。" },
    ],
    future: [
      { en: "A difference-in-differences study exploiting the policy timing.", zh: "利用政策时点的双重差分研究。" },
      { en: "Distributional analysis across deciles and regions.", zh: "跨收入十分位与地区的分配分析。" },
    ],
  };
}

function buildProposals(ev: string, rand: () => number): Proposal[] {
  const r = () => 2 + Math.floor(rand() * 4);
  return [
    {
      id: "A",
      name: { en: "Market-based correction", zh: "市场化纠正" },
      objective: { en: "Internalise the externality via a tax or tradable permit.", zh: "通过税收或可交易许可使外部性内部化。" },
      implementation: { en: "Set a price equal to marginal external cost; recycle revenue.", zh: "将价格设为边际外部成本；循环使用收入。" },
      cost: 2, impact: 4, fairness: 3, feasibility: 3, risk: 2,
    },
    {
      id: "B",
      name: { en: "Direct regulation", zh: "直接监管" },
      objective: { en: "Mandate standards or quantities to cap the harm.", zh: "强制标准或数量以限制危害。" },
      implementation: { en: "Legislate limits with monitoring and penalties.", zh: "立法设限，配合监测与处罚。" },
      cost: 3, impact: 4, fairness: 4, feasibility: 4, risk: 3,
    },
    {
      id: "C",
      name: { en: "Compensate & reskill", zh: "补偿与再培训" },
      objective: { en: "Let the market adjust but cushion the losers.", zh: "允许市场调整，同时缓冲受损者。" },
      implementation: { en: "Targeted transfers plus training and transition support.", zh: "定向转移支付，辅以培训与转型支持。" },
      cost: 4, impact: 3, fairness: 5, feasibility: 3, risk: 2,
    },
  ];
}

function buildCritical(ev: string): CriticalBlock[] {
  return [
    { key: "ce.shortRun", text: { en: `In the short run, ${lower(ev)} changes prices and quantities before agents fully adjust, creating visible winners and losers.`, zh: `短期内，「${ev}」在主体充分调整前改变价格与数量，造就明显的赢家与输家。` } },
    { key: "ce.longRun", text: { en: "In the long run, entry, exit, substitution and innovation erode part of the initial effect.", zh: "长期来看，进入、退出、替代与创新会侵蚀部分初始效应。" } },
    { key: "ce.intended", text: { en: "The intended consequence is to correct a perceived failure or protect a valued objective.", zh: "预期后果是纠正所认为的失灵，或保护某一重要目标。" } },
    { key: "ce.unintended", text: { en: "Unintended consequences include avoidance, informality, retaliation or capital reallocation.", zh: "非预期后果包括规避、非正规化、报复或资本重新配置。" } },
    { key: "ce.equity", text: { en: "Equity depends on who ultimately bears the cost — often not the party formally charged.", zh: "公平性取决于最终由谁承担成本——往往并非名义上的缴纳方。" } },
    { key: "ce.sustainability", text: { en: "Sustainability hinges on whether the measure aligns private incentives with long-run social goals.", zh: "可持续性取决于该措施能否使私人激励与长期社会目标一致。" } },
    { key: "ce.ethical", text: { en: "Ethically, the trade-off pits efficiency and liberty against fairness and protection.", zh: "在伦理上，这一权衡将效率与自由同公平与保护对立起来。" } },
    { key: "ce.alternatives", text: { en: "Alternatives range from doing nothing, to nudges, to stronger structural reform.", zh: "替代方案从不作为、到助推、再到更强的结构性改革。" } },
  ];
}

function buildEssayArgs(ev: string, theories: Theory[]): EssayArg[] {
  const t = theories;
  return [
    {
      claim: { en: `${ev} can be justified on efficiency grounds where it corrects a market failure (${t[0]?.name.en}).`, zh: `当「${ev}」纠正市场失灵（${t[0]?.name.zh}）时，可从效率角度为其辩护。` },
      evidence: { en: "Comparative-statics analysis and supporting empirical studies show a welfare gain under the stated conditions.", zh: "比较静态分析与支持性实证研究显示，在既定条件下存在福利改善。" },
      counter: { en: "Critics argue the failure is overstated and the price mechanism would self-correct.", zh: "批评者认为失灵被夸大，价格机制会自我纠正。" },
      eval: { en: "The argument holds only if the external effect is large and well-measured; otherwise the case weakens.", zh: "唯有外部效应显著且测量良好，该论点才成立；否则其说服力下降。" },
    },
    {
      claim: { en: `Distributionally, the impact falls unevenly across stakeholders (${t[1]?.name.en}).`, zh: `从分配看，影响在各利益相关者之间并不均衡（${t[1]?.name.zh}）。` },
      evidence: { en: "Incidence analysis shows the burden shifts toward the most price-inelastic group.", zh: "归宿分析显示，负担转向价格最缺乏弹性的群体。" },
      counter: { en: "Supporters note revenue can be recycled to compensate losers.", zh: "支持者指出收入可循环用于补偿受损者。" },
      eval: { en: "Compensation is theoretically possible but politically and practically uncertain.", zh: "补偿在理论上可行，但在政治与实践上并不确定。" },
    },
    {
      claim: { en: `In the long run, dynamic responses may offset the intended effect (${t[2]?.name.en}).`, zh: `长期来看，动态反应可能抵消预期效应（${t[2]?.name.zh}）。` },
      evidence: { en: "Evidence of substitution, innovation and behavioural adjustment dampens initial impacts.", zh: "替代、创新与行为调整的证据削弱了初始影响。" },
      counter: { en: "Others argue institutions lock in the new equilibrium.", zh: "另有观点认为制度会锁定新的均衡。" },
      eval: { en: "Net long-run effect is an empirical question requiring causal identification.", zh: "长期净效应是一个需要因果识别的实证问题。" },
    },
  ];
}

/* ---------------- Copilot replies (mock) ---------------- */
export function copilotReply(input: string, locale: Locale): string {
  const q = input.toLowerCase();
  const pick = (en: string, zh: string) => (locale === "zh" ? zh : en);

  // 1) try the knowledge base (definitions, concepts, essay structure)
  const known = lookupKnowledge(input, locale);
  if (known) return known;

  if (q.includes("theory") || q.includes("理论")) {
    return pick(
      "I'd start with Demand & Supply for first-order price effects, then layer Externalities or Market Failure to justify any intervention, and use a Keynesian–Classical contrast for the macro evaluation.",
      "我会先用供给与需求分析一阶价格效应，再叠加外部性或市场失灵来论证干预的合理性，并用凯恩斯—古典之争完成宏观评估。"
    );
  }
  if (q.includes("evidence") || q.includes("data") || q.includes("证据") || q.includes("数据")) {
    return pick(
      "Anchor on A+ sources first — World Bank, IMF, OECD and FRED — then support with peer-reviewed studies. Grade each source for reliability and bias before you cite it.",
      "先以 A+ 级来源为锚——世界银行、IMF、OECD 与 FRED——再用同行评审研究佐证。引用前先为每个来源评定可靠性与偏见。"
    );
  }
  if (q.includes("essay") || q.includes("structure") || q.includes("论文") || q.includes("结构")) {
    return pick(
      "Use a clear RQ → thesis → three argument blocks (claim, evidence, counter, evaluation) → conditional conclusion. Tell me your level (IB, A-Level, NEC…) and I'll set the depth.",
      "采用清晰的研究问题→论点→三段论证（主张、证据、反论、评估）→有条件结论。告诉我你的层级（IB、A-Level、NEC…），我来设定深度。"
    );
  }
  return pick(
    `Good prompt. I'd frame "${input}" as a question of incentives and trade-offs: identify the market or failure at work, map 2–3 theories, find graded evidence, then evaluate short vs long run. Open the Research Workspace and I'll build each section.`,
    `不错的问题。我会把「${input}」框定为激励与权衡问题：识别其中的市场或失灵，映射 2–3 个理论，寻找分级证据，再评估短期与长期。打开研究工作台，我会逐节为你构建。`
  );
}

export const EXAMPLE_PROMPTS = [
  { id: "ev-tariffs", en: "US tariffs on Chinese EVs", zh: "美国对中国电动车关税" },
  { id: "delivery-workers", en: "Chinese food-delivery workers", zh: "中国外卖骑手" },
  { id: "ai-layoffs", en: "AI replacing labour", zh: "AI 取代劳动力" },
  { id: "min-wage", en: "Raising the minimum wage", zh: "上调最低工资" },
];
