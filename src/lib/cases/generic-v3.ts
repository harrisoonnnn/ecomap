import type { NewsCategory } from "@/types";
import {
  L, LS,
  type CaseFactor, type CaseTimelineNode, type CaseStakeholder, type CaseRelation,
  type CaseTheory, type CaseMethod, type CaseChart, type CaseDataset, type CasePaper,
  type CaseEssayGuide, type CaseIntegratedArgument, type CaseProposal,
} from "./types";
import type { Pool } from "./pools";

const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

const FLABEL: Record<string, [string, string, string, string]> = {
  // key: [en label, zh label, en angle, zh angle]
  "bg.economic": ["Economic", "经济", "relative prices, costs, incentives and market structure", "相对价格、成本、激励与市场结构"],
  "bg.political": ["Political", "政治", "who has power, who lobbies, and how policy is decided", "谁掌握权力、谁游说、政策如何决定"],
  "bg.social": ["Social", "社会", "distribution across groups, equity and who is affected", "群体间分配、公平与受影响者"],
  "bg.technological": ["Technological", "技术", "how technology changes production, control and costs", "技术如何改变生产、控制与成本"],
  "bg.legal": ["Legal", "法律", "rights, classification, enforcement and compliance", "权利、身份认定、执行与合规"],
  "bg.environmental": ["Environmental", "环境", "emissions, resource use and physical spillovers", "排放、资源使用与物理外溢"],
  "bg.historical": ["Historical", "历史", "precedents, path dependence and how we got here", "先例、路径依赖与演变由来"],
  "bg.cultural": ["Cultural", "文化", "norms, attitudes and legitimacy", "规范、态度与合法性"],
};

const FACTOR_KEYS = ["bg.economic", "bg.political", "bg.social", "bg.technological", "bg.legal", "bg.environmental", "bg.historical", "bg.cultural"];

/** Generate eight genuinely different background factors (no real citations — templated). */
export function genericFactors(ev: string, evZh: string, category: NewsCategory): CaseFactor[] {
  return FACTOR_KEYS.map((key) => {
    const [en, zh, angleEn, angleZh] = FLABEL[key];
    return {
      key,
      summary: L(`The ${en.toLowerCase()} angle: ${angleEn}.`, `${zh}视角：${angleZh}。`),
      detail: L(
        `Through the ${en.toLowerCase()} lens, "${ev}" is shaped by ${angleEn}. Asking how this dimension changes who gains and loses — and by how much — sharpens the analysis and prevents a one-sided account.`,
        `从${zh}视角看，「${evZh}」受${angleZh}影响。追问该维度如何改变赢家与输家、以及改变多少，可使分析更精准、避免片面。`
      ),
      statistics: LS([`Find the ${en.toLowerCase()} baseline (official statistics, regulator reports, industry data) for "${ev}".`, `为「${evZh}」查找${zh}基线（官方统计、监管报告、行业数据）。`]),
      stakeholders: LS(["The groups most exposed on this dimension.", "在该维度上暴露最大的群体。"]),
      essayIdeas: LS([`Turn the ${en.toLowerCase()} angle into a focused research question.`, `把${zh}视角转化为聚焦的研究问题。`]),
      arguments: LS([`The ${en.toLowerCase()} evidence can support a case for action on "${ev}".`, `${zh}证据可支持就「${evZh}」采取行动。`]),
      counterarguments: LS([`But the same dimension warns against over-reaction or unintended harm.`, `但同一维度也提醒不要反应过度或造成非预期伤害。`]),
      whyMatters: L(`The ${en.toLowerCase()} dimension conditions the size and direction of the effect — ignore it and the analysis is incomplete.`, `${zh}维度制约效应的规模与方向——忽略它分析便不完整。`),
      whoBenefits: L(`Groups advantaged by the ${en.toLowerCase()} status quo around "${ev}".`, `在「${evZh}」的${zh}现状中占优的群体。`),
      whoLoses: L(`Groups exposed to the ${en.toLowerCase()} downside of "${ev}".`, `在「${evZh}」的${zh}风险下受损的群体。`),
      essayEntry: L(`Use the ${en.toLowerCase()} angle as a distinct body paragraph with its own evidence.`, `把${zh}视角作为独立段落，配自有证据。`),
    };
  });
}

export function genericTimeline(ev: string, evZh: string, category: NewsCategory, event: { en: string; zh: string }): CaseTimelineNode[] {
  const node = (kind: CaseTimelineNode["kind"], date: string, tEn: string, tZh: string, whatEn: string, whatZh: string): CaseTimelineNode => ({
    date, kind, title: L(tEn, tZh), detail: L(whatEn, whatZh),
    what: L(whatEn, whatZh),
    why: L(`Underlying ${category} pressures and incentives made this likely.`, `潜在的${category}压力与激励使之很可能发生。`),
    who: L("The key stakeholders identified in the stakeholder section.", "利益相关者部分所识别的关键各方。"),
    influence: L("It shifted the costs and options facing later decisions.", "它改变了后续决策面临的成本与选项。"),
    importance: L("It is a step in the causal chain an essay must trace.", "它是论文必须追溯的因果链中的一环。"),
  });
  return [
    node("cause", "Earlier", "Structural pressures build", "结构性压力累积", `Long-run ${category} forces set the stage for "${ev}".`, `长期的${category}力量为「${evZh}」铺垫。`),
    node("cause", "Recently", "Early signals & pilots", "早期信号与试点", "First indicators and small-scale responses appear.", "首批指标与小规模回应出现。"),
    { date: "The event", kind: "trigger", title: event, detail: L(`"${ev}" crystallises the issue into a concrete decision.`, `「${evZh}」将问题凝结为具体决策。`), what: L(`"${ev}" is announced or occurs.`, `「${evZh}」被宣布或发生。`), why: L("Accumulated pressure makes inaction costly.", "累积的压力使不作为代价高昂。"), who: L("Decision-makers, affected firms and groups.", "决策者、受影响企业与群体。"), influence: L("It forces stakeholders to respond and reveals their incentives.", "它迫使各方回应并暴露其激励。"), importance: L("The focal event the whole workspace analyses.", "整个工作台分析的焦点事件。") },
    node("milestone", "After", "Responses & adjustments", "反应与调整", "Affected actors adapt; second-round effects emerge.", "受影响主体适应；二轮效应显现。"),
    node("future", "Next", "Spillovers & new equilibrium", "外溢与新均衡", "Substitution, entry/exit and innovation reshape outcomes.", "替代、进入／退出与创新重塑结果。"),
    node("future", "Long run", "Long-run verdict", "长期结论", "Whether the response proved efficient and equitable becomes clear.", "回应是否高效且公平变得清晰。"),
  ];
}

const SH_DEFS: { id: string; icon: string; en: string; zh: string }[] = [
  { id: "government", icon: "🏛", en: "Government / Regulators", zh: "政府／监管者" },
  { id: "firms", icon: "🏭", en: "Firms / Industry", zh: "企业／行业" },
  { id: "workers", icon: "👷", en: "Workers", zh: "劳动者" },
  { id: "consumers", icon: "🛒", en: "Consumers", zh: "消费者" },
  { id: "investors", icon: "📈", en: "Investors", zh: "投资者" },
  { id: "civil", icon: "🤝", en: "Civil Society / NGOs", zh: "公民社会／NGO" },
];

export function genericStakeholders(ev: string, evZh: string): CaseStakeholder[] {
  return SH_DEFS.map((s) => ({
    id: s.id, icon: s.icon, name: L(s.en, s.zh),
    summary: L(`How ${s.en.toLowerCase()} are positioned on "${ev}".`, `${s.zh}在「${evZh}」上的处境。`),
    goals: L(`Advance ${s.en.toLowerCase()} interests around "${ev}".`, `推进${s.zh}在「${evZh}」上的利益。`),
    benefit: L(`Gains ${s.en.toLowerCase()} can capture from the outcome.`, `${s.zh}可从结果中获得的收益。`),
    cost: L(`Costs or risks ${s.en.toLowerCase()} bear.`, `${s.zh}承担的成本或风险。`),
    incentives: L(`What drives ${s.en.toLowerCase()} to act — and how strongly.`, `驱动${s.zh}行动的因素及其强度。`),
    conflicts: L(`Where ${s.en.toLowerCase()} clash with other stakeholders.`, `${s.zh}与其他相关者冲突之处。`),
    shared: L(`Common ground ${s.en.toLowerCase()} share with others.`, `${s.zh}与他者的共同点。`),
  }));
}

export function genericRelations(): CaseRelation[] {
  return [
    { a: "government", b: "firms", kind: "conflict", note: L("Regulation and cost vs profit and autonomy.", "监管与成本 对 利润与自主。") },
    { a: "workers", b: "firms", kind: "conflict", note: L("Pay and conditions vs labour cost.", "薪酬与条件 对 用工成本。") },
    { a: "consumers", b: "firms", kind: "ally", note: L("Both want an affordable, available product.", "双方都希望产品可负担、可得。") },
    { a: "government", b: "workers", kind: "ally", note: L("Shared interest in stability and welfare.", "在稳定与福利上利益一致。") },
    { a: "investors", b: "firms", kind: "ally", note: L("Both favour predictable rules and returns.", "双方都倾向可预期规则与回报。") },
    { a: "civil", b: "firms", kind: "conflict", note: L("Accountability and equity vs commercial interest.", "问责与公平 对 商业利益。") },
  ];
}

/** Deepen pool theories with what/application/evaluation, varying the diagram. */
export function deepenTheories(base: CaseTheory[], ev: string, evZh: string): CaseTheory[] {
  return base.map((t, i) => ({
    ...t,
    what: L(`${t.name.en} is a framework about ${lower(t.explanation.en)}`, `${t.name.zh}是一个关于${lower(t.explanation.zh)}的框架`),
    applicationPoints: LS(
      [`Identify the mechanism in "${ev}" the theory predicts.`, `识别该理论在「${evZh}」中预测的机制。`],
      [`Trace who gains and loses under that mechanism.`, `追踪该机制下谁获益、谁受损。`],
      [`State the testable implication to check against evidence.`, `给出可与证据对照的可检验含义。`],
    ),
    evaluation: L(`Strong where its assumptions hold for "${ev}"; weaker where ${i % 2 === 0 ? "frictions and power" : "expectations and dynamics"} dominate.`, `当其假设在「${evZh}」中成立时有力；当${i % 2 === 0 ? "摩擦与权力" : "预期与动态"}主导时减弱。`),
    noDiagram: i >= 3, // first three keep diagrams, deeper ones are conceptual
  }));
}

/** Deepen pool methods with educational what/how/why/dataExample/application. */
export function deepenMethods(base: CaseMethod[], ev: string, evZh: string): CaseMethod[] {
  return base.map((m) => ({
    ...m,
    what: L(`A way to ${lower(m.purpose.en)}`, `一种用于${lower(m.purpose.zh)}的方法`),
    how: L("You gather the relevant data, fit the model, and read off the key parameter that answers the question.", "你收集相关数据、拟合模型，并读取回答问题的关键参数。"),
    why: L(`It turns a vague claim about "${ev}" into a number you can test and defend.`, `它把关于「${evZh}」的模糊主张转化为可检验、可辩护的数字。`),
    dataExample: L(`Collect before/after or treated/control data on "${ev}" — e.g. outcomes for affected vs unaffected groups.`, `为「${evZh}」收集前后或处理／对照数据——如受影响 对 未受影响群体的结果。`),
    application: L(`Use it to estimate the size and direction of the effect of "${ev}".`, `用它估计「${evZh}」效应的规模与方向。`),
  }));
}

export function genericCharts(ev: string, evZh: string): CaseChart[] {
  return [
    { id: "scatter", title: L("Outcome vs intensity", "结果 对 强度"), showing: L(`Each point relates a driver of "${ev}" to its outcome, with a trend line.`, `每个点关联「${evZh}」的一个驱动因素与结果，并配趋势线。`), trends: L("The slope shows the direction and strength of the relationship.", "斜率显示关系的方向与强度。"), findings: L("Clustering and outliers hint at sub-groups worth separate analysis.", "聚集与离群点提示值得单独分析的子群。"), supportsArgument: L("Use it to motivate a correlation your theory then explains.", "用它引出一个由理论加以解释的相关。"), limitations: L("Correlation, not causation — confounders may drive both variables.", "相关而非因果——混杂因素可能同时驱动两个变量。") },
    { id: "trend", title: L("Trend over time + forecast", "随时间趋势＋预测"), showing: L(`The variable of interest before and after "${ev}", with a projection.`, `关注变量在「${evZh}」前后的走势，并附预测。`), trends: L("A change in slope around the event hints at its impact.", "事件前后斜率变化提示其影响。"), findings: L("Compare the actual path with the pre-event trend.", "将实际路径与事件前趋势比较。"), supportsArgument: L("Strong visual for a before/after argument.", "前后对比论证的有力可视化。"), limitations: L("A simple trend can't separate the event from other shocks.", "简单趋势无法将事件与其他冲击分离。") },
    { id: "correlation", title: L("Correlation matrix", "相关矩阵"), showing: L(`How the key variables around "${ev}" move together.`, `「${evZh}」相关关键变量如何联动。`), trends: L("Strong positive/negative cells flag the tightest relationships.", "强正／负单元格标示最紧密的关系。"), findings: L("Use it to choose which relationships to model formally.", "用它选择要正式建模的关系。"), supportsArgument: L("Justifies your choice of variables for the model.", "为模型的变量选择提供依据。"), limitations: L("Pairwise only; misses non-linearities and confounders.", "仅两两相关；忽略非线性与混杂。") },
  ];
}

export function genericDatasets(pool: Pool, ev: string, evZh: string): CaseDataset[] {
  const mk = (nameEn: string, nameZh: string, inst: string, site: string, url: string): CaseDataset => ({
    name: L(nameEn, nameZh), whyMatters: L(`Quantifies a core dimension of "${ev}".`, `量化「${evZh}」的核心维度。`),
    howSupports: L(`Provides inputs for ${pool.methods[0]?.n[0] ?? "the model"} and the welfare analysis.`, `为${pool.methods[0]?.n[1] ?? "模型"}与福利分析提供输入。`),
    institution: inst, website: site, url, sampleFinding: L("Search the institution's database for the latest figure for your region.", "在该机构数据库中检索你所在地区的最新数字。"), year: "latest",
  });
  return [
    mk("Core official statistics", "核心官方统计", "World Bank — DataBank", "data.worldbank.org", "https://databank.worldbank.org"),
    mk("National accounts & sector data", "国民经济与行业数据", "OECD.Stat", "stats.oecd.org", "https://stats.oecd.org"),
    mk("High-frequency economic series", "高频经济序列", "FRED", "fred.stlouisfed.org", "https://fred.stlouisfed.org"),
    mk("Peer-reviewed causal estimates", "同行评审因果估计", "NBER Working Papers", "nber.org", "https://www.nber.org/papers"),
  ];
}

export function genericPapers(pool: Pool, ev: string, evZh: string): CasePaper[] {
  const a = pool.authors;
  const scholar = (q: string) => `https://scholar.google.com/scholar?q=${encodeURIComponent(q)}`;
  const items: CasePaper[] = a.map((au, i) => ({
    citation: `${au.name} — key work in ${au.field[0]}`, authors: au.name, year: "—",
    finding: L(`Foundational results in ${au.field[0]} relevant to "${ev}".`, `${au.field[1]}领域与「${evZh}」相关的奠基性结果。`),
    helps: L(`Anchors the ${i === 0 ? "main" : "supporting"} theoretical argument.`, `支撑${i === 0 ? "主要" : "辅助"}理论论证。`),
    extract: L("Open the search link to pull the exact quote and citation.", "打开检索链接以获取确切引文与引用。"),
    url: scholar(`${au.name} ${au.field[0]}`),
  }));
  // pad to a useful number with targeted scholar searches
  const angles: [string, string][] = [
    ["welfare effect", "福利效应"], ["incidence who pays", "归宿 谁承担"], ["empirical evidence", "实证证据"],
    ["policy evaluation", "政策评估"], ["distribution inequality", "分配 不平等"], ["China case study", "中国案例"],
    ["difference-in-differences", "双重差分"],
  ];
  angles.forEach(([en, zh], i) => items.push({
    citation: `Literature search: "${ev}" — ${en}`, authors: "(search Google Scholar / SSRN / NBER)", year: "—",
    finding: L(`Find the strongest ${en} studies on "${ev}".`, `寻找关于「${evZh}」最有力的${zh}研究。`),
    helps: L(`Supplies evidence for argument ${(i % 3) + 1}.`, `为论点 ${(i % 3) + 1} 提供证据。`),
    extract: L("Use the search link, then record citation, year and the key finding.", "使用检索链接，然后记录引用、年份与关键发现。"),
    url: scholar(`${ev} ${en} economics`),
  }));
  return items;
}

export function genericEssayGuides(ev: string, evZh: string, t0: string, t0Zh: string): CaseEssayGuide[] {
  const g = (key: string, briefEn: string, briefZh: string): CaseEssayGuide => ({
    key, brief: L(briefEn, briefZh),
    whatToInclude: LS([`The piece of "${ev}" this section must establish.`, `本节须确立的「${evZh}」要点。`], ["A clear link to the next section.", "与下一节的清晰衔接。"]),
    dataToCite: LS(["A figure from the Data Needed section.", "数据需求部分的一个数字。"], ["A paper from the Literature section.", "文献部分的一篇论文。"]),
    mistakes: LS(["Being vague or generic.", "含糊或套路化。"], ["Citing no source or number.", "不引用来源或数字。"]),
    example: L(`For "${ev}", open with the mechanism ${t0} predicts, then bring one statistic.`, `就「${evZh}」，以${t0Zh}预测的机制开篇，再引一个数据。`),
  });
  return [
    g("es.rq", "Frame a sharp 'to what extent' question.", "提出尖锐的“在多大程度上”问题。"),
    g("es.intro", "Define terms, give scale, state the thesis.", "界定术语、给出规模、陈述论点。"),
    g("es.arg", "Build claim → theory → evidence → evaluation.", "构建 主张 → 理论 → 证据 → 评估。"),
    g("es.counter", "Give the strongest opposing case fairly.", "公允地给出最强反方。"),
    g("es.eval", "Weigh by importance; name the decisive factor.", "按重要性权衡；指出决定性因素。"),
    g("es.conclusion", "Answer conditionally; note what would settle it.", "有条件作答；指出何以定论。"),
  ];
}

/** The synthesis layer for any topic: 3 integrated arguments wired to the pools. */
export function genericIntegratedArguments(theories: CaseTheory[], methods: CaseMethod[], ev: string, evZh: string): CaseIntegratedArgument[] {
  const mk = (n: number, t: CaseTheory, m: CaseMethod, claimEn: string, claimZh: string): CaseIntegratedArgument => ({
    n,
    coreClaim: L(claimEn, claimZh),
    theory: t.name,
    theoryApply: LS(
      [`${t.name.en} identifies the key mechanism`, `${t.name.zh}识别关键机制`],
      ["who gains and who loses", "谁获益、谁受损"],
      ["the testable implication", "可检验的含义"],
    ),
    mathMethod: m.name,
    mathSupports: {
      collect: L(`Data on "${ev}": outcomes for affected vs unaffected groups, before vs after.`, `「${evZh}」数据：受影响 对 未受影响群体、前 对 后。`),
      relationship: L(`Test whether the effect predicted by ${t.name.en} actually appears.`, `检验${t.name.zh}预测的效应是否真实出现。`),
      result: L("A significant estimate in the predicted direction strengthens the claim.", "在预测方向上显著的估计强化该主张。"),
    },
    evidence: L(`Cite a figure from the Data Needed section relevant to "${ev}".`, `引用数据需求部分与「${evZh}」相关的数字。`),
    literature: L(`Cite the strongest paper from the Literature section on this mechanism.`, `引用文献部分关于该机制最有力的论文。`),
    evaluation: L(`Holds where ${t.name.en}'s assumptions fit "${ev}"; weaker otherwise.`, `当${t.name.zh}的假设契合「${evZh}」时成立；否则减弱。`),
    miniConclusion: L("So this argument supports a conditional, evidence-based judgement.", "因此该论点支持一个有条件、基于证据的判断。"),
    logicChain: LS(
      [`Claim: ${claimEn}`, `主张：${claimZh}`],
      [`Theory: ${t.name.en}`, `理论：${t.name.zh}`],
      ["Mechanism: who gains/loses and why", "机制：谁获益／受损及原因"],
      [`Evidence: a figure on "${ev}"`, `证据：「${evZh}」的一个数字`],
      [`Math: ${m.name.en}`, `数学：${m.name.zh}`],
      ["Literature: the strongest study", "文献：最有力的研究"],
      ["Evaluation: conditional on assumptions", "评估：取决于假设"],
      ["Mini-conclusion: evidence-based judgement", "小结：基于证据的判断"],
    ),
  });
  return [
    mk(1, theories[0], methods[0], `"${ev}" has a first-order efficiency effect that ${theories[0].name.en} explains.`, `「${evZh}」具有一阶效率效应，可由${theories[0].name.zh}解释。`),
    mk(2, theories[1] ?? theories[0], methods[1] ?? methods[0], `The impact of "${ev}" is distributed unevenly across stakeholders.`, `「${evZh}」的影响在各相关者间分布不均。`),
    mk(3, theories[2] ?? theories[0], methods[2] ?? methods[0], `In the long run, dynamic responses to "${ev}" may offset the initial effect.`, `长期来看，对「${evZh}」的动态反应可能抵消初始效应。`),
  ];
}

/** Expand the executive overview into a per-phrase mini-report (generic). */
export function genericOverviewExpanded(theories: CaseTheory[], ev: string, evZh: string) {
  return [
    { term: L("Incentives", "激励"), explain: L(`"${ev}" changes the rewards and penalties facing each actor, so behaviour shifts at the margin.`, `「${evZh}」改变各主体面临的奖惩，行为因此在边际上变化。`) },
    { term: L("Trade-offs", "权衡"), explain: L("Every option helps some and costs others; the analysis is about weighing them, not pretending they vanish.", "每个选项利此损彼；分析在于权衡，而非假装其消失。") },
    { term: L("Distribution", "分配"), explain: L("Who ultimately bears the cost or gains the benefit is often not the party it first lands on.", "最终承担成本或获得收益的，往往并非最初落到的一方。") },
    { term: L(theories[0]?.name.en ?? "Core theory", theories[0]?.name.zh ?? "核心理论"), explain: theories[0]?.explanation ?? L("The main analytical lens for this case.", "本案例的主要分析视角。") },
  ];
}
