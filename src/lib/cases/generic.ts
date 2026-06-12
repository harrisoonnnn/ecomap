import type { NewsCategory } from "@/types";
import { seededRand } from "@/lib/utils";
import {
  CaseStudy,
  CaseProposal,
  CaseCounter,
  L,
  LS,
} from "./types";
import { poolEvidence, poolMethods, poolTheories, resolvePool } from "./pools";

function lower(s: string) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

function makeCounter(debate: [string, string]): CaseCounter {
  const [en, zh] = debate;
  const partsEn = en.replace(/[.?]$/, "").split(/\s+vs\.?\s+/i);
  const partsZh = zh.replace(/[。？.?]$/, "").split(/\s+对\s+|\s+vs\.?\s+/i);
  if (partsEn.length === 2) {
    return {
      a: L(partsEn[0], partsZh[0] ?? partsEn[0]),
      b: L(partsEn[1], partsZh[1] ?? partsEn[1]),
      tension: L(en, zh),
    };
  }
  return { a: L("View A", "观点 A"), b: L("View B", "观点 B"), tension: L(en, zh) };
}

function proposalFrom(theme: { n: [string, string]; o: [string, string] }, id: string, i: number, rand: () => number): CaseProposal {
  const r = () => 2 + Math.floor(rand() * 4);
  return {
    id,
    name: L(theme.n[0], theme.n[1]),
    objective: L(theme.o[0], theme.o[1]),
    cost: r(), impact: r(), fairness: r(), feasibility: r(), risk: r(),
    steps: LS(
      ["Define the instrument, eligibility and rates/limits.", "界定工具、资格与税率／限值。"],
      ["Build administration, data and enforcement.", "搭建行政、数据与执行。"],
      ["Pilot, evaluate, then scale or adjust.", "试点、评估，再扩大或调整。"],
    ),
    timeline: L("Pilot in 6–12 months; full rollout in 1–3 years.", "6–12 个月试点；1–3 年全面推行。"),
    budget: L("Set against expected benefits in a cost–benefit frame.", "在成本收益框架下对照预期收益。"),
    stakeholderResponses: [
      { who: L("Beneficiaries", "受益者"), reaction: L("Generally supportive; want strong delivery.", "总体支持；希望落实有力。") },
      { who: L("Those bearing the cost", "成本承担者"), reaction: L("Resist; lobby for exemptions or delay.", "抵制；游说豁免或延后。") },
    ],
    risks: LS(["Implementation and compliance gaps.", "实施与合规缺口。"], ["Unintended behavioural responses.", "非预期的行为反应。"]),
    alternatives: LS(["The other proposals in this comparison.", "本对比中的其他方案。"]),
    metrics: LS(["Primary outcome vs baseline.", "主要结果 对 基线。"], ["Cost per unit of benefit; distributional impact.", "单位收益成本；分配影响。"]),
  };
}

export function buildGenericCase(id: string, event: { en: string; zh: string }, category: NewsCategory, salt = 0): CaseStudy {
  const rand = seededRand(`${id}:${salt}`);
  const pool = resolvePool(category, event.en, id);
  const theories = poolTheories(pool).map((t) => ({ ...t, match: Math.min(98, t.match - Math.floor(rand() * 4)) }));
  const ev = event.en;
  const evZh = event.zh;
  const score = 80 + Math.floor(rand() * 14);

  const factorKeys = ["bg.economic", "bg.political", "bg.social", "bg.technological", "bg.legal", "bg.environmental", "bg.historical", "bg.cultural"];

  return {
    id,
    category,
    event,
    score,
    potential: [
      { label: L("Theory richness", "理论丰富度"), value: 84 + Math.floor(rand() * 12) },
      { label: L("Data availability", "数据可得性"), value: 78 + Math.floor(rand() * 18) },
      { label: L("Debate / contestability", "争议性"), value: 82 + Math.floor(rand() * 14) },
      { label: L("Policy relevance", "政策相关性"), value: 84 + Math.floor(rand() * 13) },
    ],
    summary: {
      oneLine: L(
        `${ev} is best analysed as a problem of incentives, trade-offs and distribution — using ${theories[0].name.en} and ${theories[1].name.en}.`,
        `「${evZh}」最好被分析为关于激励、权衡与分配的问题——运用${theories[0].name.zh}与${theories[1].name.zh}。`
      ),
      overview: L(
        `This event reshapes the costs, prices and incentives facing key actors. An economist asks who gains, who loses, how behaviour adjusts at the margin, and whether the new equilibrium is efficient and equitable. The most relevant frameworks here are ${theories.slice(0, 3).map((t) => t.name.en).join(", ")}.`,
        `该事件重塑了关键主体面临的成本、价格与激励。经济学家会追问：谁获益、谁受损、行为在边际上如何调整，以及新均衡是否兼顾效率与公平。此处最相关的框架是${theories.slice(0, 3).map((t) => t.name.zh).join("、")}。`
      ),
      matters: LS(
        [`It changes relative prices and incentives across the ${category} system.`, `它改变了${category}体系中的相对价格与激励。`],
        ["It creates clear winners and losers worth analysing distributionally.", "它造就了明确的赢家与输家，值得从分配角度分析。"],
        ["It connects to live theoretical and policy debates.", "它与当下的理论与政策辩论紧密相关。"],
      ),
      stakeholders: LS(["Government", "政府"], ["Firms", "企业"], ["Workers", "劳动者"], ["Consumers", "消费者"], ["Investors", "投资者"]),
    },
    factors: factorKeys.map((key) => ({
      key,
      summary: L(`${factorLabel(key).en} dimension of "${ev}".`, `「${evZh}」的${factorLabel(key).zh}维度。`),
      detail: L(`The ${factorLabel(key).en.toLowerCase()} context shapes who is affected by ${lower(ev)} and how strongly, conditioning the size and direction of the economic effects.`, `${factorLabel(key).zh}背景塑造了「${evZh}」影响谁、影响多大，制约着经济效应的规模与方向。`),
      statistics: LS([`Quantify the ${factorLabel(key).en.toLowerCase()} baseline from official data.`, `用官方数据量化${factorLabel(key).zh}基线。`]),
      stakeholders: LS(["Most affected groups in this dimension.", "该维度中受影响最大的群体。"]),
      essayIdeas: LS([`Use this factor to motivate a clear research question.`, `用此因素引出清晰的研究问题。`]),
      arguments: LS([`This dimension supports intervention to address ${lower(ev)}.`, `该维度支持为应对「${evZh}」而干预。`]),
      counterarguments: LS([`But it may also caution against over-reaction.`, `但它也提醒不要反应过度。`]),
    })),
    timeline: [
      { date: "T−3y", kind: "cause", title: L("Structural pressures build", "结构性压力累积"), detail: L(`Underlying ${category} forces set the stage for ${lower(ev)}.`, `潜在的${category}力量为「${evZh}」铺垫。`) },
      { date: "T−1y", kind: "cause", title: L("Early signals & pilots", "早期信号与试点"), detail: L("First indicators and small-scale measures appear.", "首批指标与小规模措施出现。") },
      { date: "T", kind: "trigger", title: event, detail: L("The headline event crystallises the issue.", "标志性事件使问题凸显。") },
      { date: "T+6m", kind: "milestone", title: L("Responses & adjustments", "反应与调整"), detail: L("Affected actors adapt; second-round effects emerge.", "受影响主体适应；二轮效应显现。") },
      { date: "T+2y", kind: "future", title: L("Spillovers & new equilibrium", "外溢与新均衡"), detail: L("Substitution, entry/exit and innovation reshape outcomes.", "替代、进入／退出与创新重塑结果。") },
      { date: "T+5y", kind: "future", title: L("Long-run verdict", "长期结论"), detail: L("Whether the intervention proved efficient and equitable becomes clear.", "干预是否高效且公平变得清晰。") },
    ],
    theories,
    counter: pool.debates.slice(0, 2).map(makeCounter),
    methods: poolMethods(pool),
    datasets: [
      { name: "World Development Indicators", provider: "World Bank", url: "https://data.worldbank.org" },
      { name: "World Economic Outlook", provider: "IMF", url: "https://www.imf.org/en/Publications/WEO" },
      { name: "OECD.Stat", provider: "OECD", url: "https://stats.oecd.org" },
      { name: "FRED Economic Data", provider: "Federal Reserve", url: "https://fred.stlouisfed.org" },
    ],
    evidence: poolEvidence(pool, ev),
    literature: {
      supporting: [
        { cite: `${pool.authors[0]?.name} et al.`, finding: L("Evidence consistent with the predicted direction of impact.", "证据与所预测的影响方向一致。"), stance: "support" },
        { cite: `${pool.authors[1]?.name} (recent)`, finding: L("Empirical estimates support the main mechanism.", "实证估计支持主要机制。"), stance: "support" },
      ],
      opposing: [
        { cite: "Critical / heterodox view", finding: L("Argues the effect is overstated or welfare-reducing in practice.", "认为效应被夸大或实践中降低福利。"), stance: "oppose" },
        { cite: "Public-choice critique", finding: L("Warns the measure may be captured by concentrated interests.", "警示该措施可能被集中利益俘获。"), stance: "oppose" },
      ],
      debates: pool.debates.map(([en, zh]) => L(en, zh)),
      authors: pool.authors.map((a) => ({ name: a.name, field: L(a.field[0], a.field[1]) })),
      gaps: LS(["Few causal estimates in this specific context.", "在该具体情境下的因果估计稀少。"], ["Long-run and general-equilibrium effects under-studied.", "长期与一般均衡效应研究不足。"]),
      future: LS([`A ${pool.methods[0]?.n[0]} study exploiting the policy timing.`, `利用政策时点的${pool.methods[0]?.n[1]}研究。`], ["Distributional analysis across groups and regions.", "跨群体与地区的分配分析。"]),
      consensus: 60 + Math.floor(rand() * 24),
    },
    proposals: pool.proposalThemes.slice(0, 3).map((th, i) => proposalFrom(th, ["A", "B", "C"][i], i, rand)),
    critical: [
      { key: "ce.shortRun", text: L(`In the short run, ${lower(ev)} changes prices and quantities before agents fully adjust.`, `短期内，「${evZh}」在主体充分调整前改变价格与数量。`) },
      { key: "ce.longRun", text: L("In the long run, entry, exit, substitution and innovation erode part of the initial effect.", "长期来看，进入、退出、替代与创新侵蚀部分初始效应。") },
      { key: "ce.intended", text: L("The intended consequence is to correct a perceived failure or protect a valued objective.", "预期后果是纠正所认为的失灵或保护重要目标。") },
      { key: "ce.unintended", text: L("Unintended consequences include avoidance, informality, retaliation or capital reallocation.", "非预期后果包括规避、非正规化、报复或资本重新配置。") },
      { key: "ce.equity", text: L("Equity depends on who ultimately bears the cost — often not the party formally charged.", "公平性取决于最终由谁承担成本——往往并非名义缴纳方。") },
      { key: "ce.sustainability", text: L("Sustainability hinges on aligning private incentives with long-run social goals.", "可持续性取决于使私人激励与长期社会目标一致。") },
      { key: "ce.ethical", text: L("Ethically, the trade-off pits efficiency and liberty against fairness and protection.", "在伦理上，权衡将效率与自由同公平与保护对立。") },
      { key: "ce.alternatives", text: L("Alternatives range from doing nothing, to nudges, to stronger structural reform.", "替代方案从不作为、到助推、再到更强的结构性改革。") },
    ],
    essay: {
      basic: {
        rq: L(`Is ${lower(ev)} good or bad for the economy?`, `「${evZh}」对经济是利还是弊？`),
        thesis: L("It brings clear benefits to some groups and costs to others, so the overall effect is mixed and needs careful weighing.", "它给部分群体带来明显收益、给另一些带来成本，因此总体效应好坏参半，需谨慎权衡。"),
        outline: [
          { heading: L("Introduction", "引言"), points: LS(["Define key terms and state the question.", "界定关键术语并提出问题。"]) },
          { heading: L("Point — benefits", "论点——收益"), points: LS([`Use ${theories[0].name.en} with one diagram.`, `运用${theories[0].name.zh}并配一张图。`]) },
          { heading: L("Point — costs", "论点——成本"), points: LS(["Identify who loses and why.", "识别谁受损及原因。"]) },
          { heading: L("Conclusion", "结论"), points: LS(["Give a simple, balanced judgement.", "给出简单而平衡的判断。"]) },
        ],
        note: L("Simple two-sided structure with one diagram and clear definitions.", "简单的两面结构，配一张图与清晰定义。"),
      },
      advanced: {
        rq: L(`To what extent does ${lower(ev)} improve economic welfare, and for whom?`, `「${evZh}」在多大程度上、并为谁提升经济福利？`),
        thesis: L(`Using ${theories[0].name.en} and ${theories[1].name.en}, the net effect depends on elasticities, the strength of any market failure corrected, and the risk of government failure.`, `运用${theories[0].name.zh}与${theories[1].name.zh}，净效应取决于弹性、所纠正市场失灵的强度，以及政府失灵的风险。`),
        outline: [
          { heading: L("Introduction", "引言"), points: LS(["Define terms; set up the welfare framework.", "界定术语；搭建福利框架。"]) },
          { heading: L("Argument 1 — efficiency", "论点一——效率"), points: LS([`${theories[0].name.en} with diagram, evidence, counter, evaluation.`, `${theories[0].name.zh}，含图、证据、反驳、评估。`]) },
          { heading: L("Argument 2 — distribution", "论点二——分配"), points: LS([`${theories[1].name.en}: who bears the cost?`, `${theories[1].name.zh}：谁承担成本？`]) },
          { heading: L("Argument 3 — long run", "论点三——长期"), points: LS(["Dynamic responses may offset the intended effect.", "动态反应可能抵消预期效应。"]) },
          { heading: L("Conclusion", "结论"), points: LS(["Conditional judgement tied to elasticities.", "与弹性挂钩的有条件判断。"]) },
        ],
        note: L("Three argument blocks, each with evidence, counterargument and evaluation.", "三段论证，每段含证据、反论与评估。"),
      },
      research: {
        rq: L(`What is the net welfare and distributional effect of ${lower(ev)}, and which instrument is superior?`, `「${evZh}」的净福利与分配效应如何？何种工具更优？`),
        thesis: L(`Triangulating ${theories[0].name.en} with ${pool.methods[0]?.n[0]} evidence, the intervention plausibly improves welfare only where it corrects a genuine market failure at lower cost than the government failure it risks.`, `将${theories[0].name.zh}与${pool.methods[0]?.n[1]}证据三角互证，唯有当干预以低于所冒政府失灵的成本纠正真实市场失灵时，才可能提升福利。`),
        outline: [
          { heading: L("Introduction & contribution", "引言与贡献"), points: LS(["Motivate; state the gap and contribution.", "立题；说明空白与贡献。"]) },
          { heading: L("Literature review", "文献综述"), points: LS(["Competing schools and the empirical record.", "对立学派与实证记录。"]) },
          { heading: L("Theoretical framework", "理论框架"), points: LS([`${theories[0].name.en} formalised with welfare terms.`, `以福利项形式化${theories[0].name.zh}。`]) },
          { heading: L("Methodology", "方法"), points: LS([`${pool.methods[0]?.n[0]} with identification strategy and robustness.`, `${pool.methods[0]?.n[1]}，含识别策略与稳健性。`]) },
          { heading: L("Results & policy evaluation", "结果与政策评估"), points: LS(["Compare instruments on welfare, equity, feasibility.", "在福利、公平、可行性上比较各工具。"]) },
          { heading: L("Limitations & research gaps", "局限与研究空白"), points: LS(["Identification threats; unmodelled dynamics.", "识别威胁；未建模动态。"]) },
        ],
        note: L("Full academic structure: literature integration, explicit methodology, identification, policy evaluation and research gaps.", "完整学术结构：文献整合、明确方法、识别、政策评估与研究空白。"),
      },
    },
  };
}

function factorLabel(key: string): { en: string; zh: string } {
  const map: Record<string, { en: string; zh: string }> = {
    "bg.historical": { en: "Historical", zh: "历史" },
    "bg.social": { en: "Social", zh: "社会" },
    "bg.cultural": { en: "Cultural", zh: "文化" },
    "bg.political": { en: "Political", zh: "政治" },
    "bg.economic": { en: "Economic", zh: "经济" },
    "bg.technological": { en: "Technological", zh: "技术" },
    "bg.environmental": { en: "Environmental", zh: "环境" },
    "bg.legal": { en: "Legal", zh: "法律" },
  };
  return map[key] ?? { en: key, zh: key };
}
