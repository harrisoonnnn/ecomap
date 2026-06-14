import { L, LS, type CaseEssayGuide } from "./types";

/** Expandable, section-by-section essay guidance specific to this case. */
export const deliveryEssayGuides: CaseEssayGuide[] = [
  {
    key: "es.rq",
    brief: L("Frame a sharp, answerable question about the welfare effect of the mandate.", "就强制规定的福利效应，提出一个尖锐、可回答的问题。"),
    whatToInclude: LS(
      ["A clear scope: which benefit (injury vs full social insurance), which workers, which country.", "明确范围：哪种待遇（工伤 对 完整社保）、哪些劳动者、哪个国家。"],
      ["A 'to what extent' framing that invites evaluation, not a yes/no.", "采用“在多大程度上”的措辞，引导评估而非是非判断。"],
    ),
    dataToCite: LS(["The scale (3.36m monthly active riders) to justify why the question matters.", "规模（月活骑手 336 万）以说明该问题为何重要。"]),
    mistakes: LS(["Too broad ('is the gig economy good?').", "过于宽泛（“零工经济好不好？”）。"], ["A descriptive question with no welfare angle.", "只描述、无福利视角的问题。"]),
    example: L("\"To what extent would mandating platform contributions to delivery riders' social insurance improve net economic welfare in China?\"", "「强制平台为外卖骑手缴纳社会保险，在多大程度上会提升中国的净经济福利？」"),
  },
  {
    key: "es.intro",
    brief: L("Define terms, give scale, and state your thesis and roadmap.", "界定术语、给出规模，并陈述论点与行文脉络。"),
    whatToInclude: LS(
      ["Define 'social insurance', 'gig/contractor', and 'incidence'.", "界定“社会保险”“零工／承包人”“归宿”。"],
      ["One or two scale statistics to motivate the question.", "一到两个规模数据以引出问题。"],
      ["A thesis that signals a conditional answer.", "一个预示有条件答案的论点。"],
    ),
    dataToCite: LS(["240m+ flexible workers, <40% social-insurance coverage.", "灵活就业者 2.4 亿+，社保覆盖率 <40%。"], ["Pilot enrolment 6.68m (2023) → 12.3m (2025).", "试点参保 668 万（2023）→ 1,234 万（2025）。"]),
    mistakes: LS(["Starting with a long history instead of the question.", "以冗长历史而非问题开篇。"], ["No thesis — just 'this essay will discuss'.", "没有论点——只写“本文将讨论”。"]),
    example: L("Open with the coverage gap, define the mandate, then: 'This essay argues the welfare effect is positive but conditional on platform monopsony power and the design of the scheme.'", "以覆盖缺口开篇，界定强制规定，然后：“本文论证其福利效应为正，但取决于平台买方垄断势力与方案设计。”"),
  },
  {
    key: "es.arg",
    brief: L("Build each argument as claim → theory/diagram → evidence → mini-evaluation.", "每个论点按 主张 → 理论／图示 → 证据 → 小结评估 构建。"),
    whatToInclude: LS(
      ["Argument 1: efficiency — internalising the injury externality (Pigouvian + monopsony).", "论点一：效率——将工伤外部性内部化（庇古＋买方垄断）。"],
      ["Argument 2: incidence — who pays (Summers/Gruber wage-shifting).", "论点二：归宿——谁来付（Summers／Gruber 的工资转嫁）。"],
      ["Argument 3: the flexibility counter and how design answers it (Chen et al. vs Mas & Pallais).", "论点三：灵活性的反论及设计如何回应（Chen 等 对 Mas & Pallais）。"],
    ),
    dataToCite: LS(["Meituan income range ¥6,650–9,344; pilot enrolment scaling; Shanghai −42.9% deaths.", "美团收入区间 6,650–9,344 元；试点参保扩张；上海致死 −42.9%。"]),
    mistakes: LS(["Listing theories without applying them to riders.", "罗列理论却不应用于骑手。"], ["Evidence with no source or number.", "证据无来源或无数字。"]),
    example: L("Claim: a mandate need not cut jobs. Theory: monopsony labour diagram. Evidence: pilot enrolment rose with no reported collapse in rider numbers. Evaluate: depends on labour-supply elasticity.", "主张：强制未必减少就业。理论：买方垄断劳动图。证据：试点参保上升且未见骑手数量崩塌。评估：取决于劳动供给弹性。"),
  },
  {
    key: "es.counter",
    brief: L("Give the strongest opposing case fairly before answering it.", "在回应之前，公允地给出最强的反方论证。"),
    whatToInclude: LS(
      ["The flexibility-value argument (Chen et al. 2019) and the pass-through-to-riders risk.", "灵活性价值论（Chen 等 2019）与向骑手转嫁的风险。"],
      ["The competitive-market prediction of job losses.", "竞争市场关于就业损失的预测。"],
    ),
    dataToCite: LS(["Nearly half of Meituan riders take orders <30 days/year (casual workers who may value low commitment).", "近半美团骑手全年接单 <30 天（可能看重低承诺的临时工）。"]),
    mistakes: LS(["A strawman counterargument that's easy to knock down.", "一个易被推翻的稻草人反论。"], ["Ignoring the strongest objection (flexibility).", "忽略最强反对意见（灵活性）。"]),
    example: L("'Critics argue, following Chen et al. (2019), that mandates threaten a flexibility surplus riders value highly…' then rebut via portable, hours-neutral design.", "“批评者依据 Chen 等（2019）认为，强制威胁骑手高度重视的灵活性剩余……”随后以可携带、与工时无关的设计加以反驳。"),
  },
  {
    key: "es.eval",
    brief: L("Weigh arguments by importance; don't just list pros and cons.", "按重要性权衡论点；不要只罗列利弊。"),
    whatToInclude: LS(
      ["Identify the decisive factor (here: platform monopsony power + scheme design).", "指出决定性因素（此处：平台买方垄断势力＋方案设计）。"],
      ["Use short vs long run, and distribution/equity.", "运用短期 对 长期，以及分配／公平。"],
      ["Acknowledge the key uncertainty (elasticities).", "承认关键不确定性（弹性）。"],
    ),
    dataToCite: LS(["Gruber (1994) full-shifting result to temper claims of large job losses.", "Gruber（1994）完全转嫁结果以缓和大规模失业的论断。"]),
    mistakes: LS(["'On balance both sides have points' with no judgement.", "“总体而言双方都有道理”却不下判断。"], ["Weighing everything equally.", "对所有因素等量齐观。"]),
    example: L("'The net effect is most sensitive to labour-supply elasticity: under the monopsony estimates of Dube et al., the welfare gain dominates; under competitive assumptions it shrinks.'", "“净效应对劳动供给弹性最敏感：在 Dube 等的买方垄断估计下福利收益占主导；在竞争假设下则收窄。”"),
  },
  {
    key: "es.conclusion",
    brief: L("Answer the question directly, conditionally, and note what evidence would settle it.", "直接、有条件地回答问题，并指出何种证据可定论。"),
    whatToInclude: LS(
      ["A clear verdict tied to your decisive factor.", "一个与决定性因素挂钩的明确结论。"],
      ["A policy recommendation (e.g. portable per-order cover).", "一项政策建议（如可携带按单覆盖）。"],
      ["What future evidence (a DiD on the pilot) would confirm it.", "何种未来证据（对试点的双重差分）能予以确认。"],
    ),
    dataToCite: LS(["Reference the 2022 pilot as the natural experiment that could test your claim.", "引用 2022 年试点作为可检验你论断的自然实验。"]),
    mistakes: LS(["Introducing a brand-new argument.", "引入全新论点。"], ["A vague 'more research is needed' with no specifics.", "含糊的“需进一步研究”而无具体内容。"]),
    example: L("'A well-designed, portable per-order mandate likely raises net welfare; a difference-in-differences study of the 2022 pilot provinces would confirm the employment effect.'", "“设计良好、可携带的按单强制很可能提升净福利；对 2022 年试点省份的双重差分研究将确认其就业效应。”"),
  },
];

/** Per-phrase glossary expanding the executive one-liner into a mini background report. */
export const deliveryOverviewExpanded = [
  { term: L("Social insurance", "社会保险"), explain: L("State-backed protection — pension, medical and work-injury cover — that pools risk so an individual isn't ruined by old age, illness or an accident. Riders have largely been excluded from it.", "由国家支持的保护——养老、医疗与工伤——通过风险共担，使个人不致因年老、疾病或事故而陷入困境。骑手此前在很大程度上被排除在外。") },
  { term: L("Internalises a real externality", "将真实外部性内部化"), explain: L("Right now, the cost of an uninsured rider's injury falls on public hospitals and families, not on the delivery price. A mandate forces that cost back into the price — 'internalising' it — so delivery reflects its true social cost.", "目前，未保险骑手的工伤成本落在公立医院与家庭、而非配送价格上。强制规定把该成本压回价格——即“内部化”——使配送反映其真实社会成本。") },
  { term: L("Monopsonistic market", "买方垄断市场"), explain: L("A market dominated by a few buyers of labour. With Meituan and Ele.me as a near-duopoly, riders have few alternative employers, so the platforms can set pay below what a competitive market would give.", "少数劳动买方主导的市场。美团与饿了么近乎双寡头，骑手少有替代雇主，平台因此能将薪酬定在竞争市场水平之下。") },
  { term: L("Price-elastic", "价格弹性高"), explain: L("How much customers cut back when prices rise. If delivery demand is price-elastic, platforms can't simply pass the whole cost to consumers — so some lands on riders or platform profits.", "价格上涨时顾客减少消费的程度。若外卖需求价格弹性高，平台无法把全部成本转嫁给消费者——部分便落在骑手或平台利润上。") },
  { term: L("Shifts part of the cost back onto riders", "部分成本转嫁回骑手"), explain: L("Economic theory (Summers 1989) predicts a mandated benefit's cost is partly paid through slightly lower pay rather than lost jobs — so the question 'who really pays?' has a nuanced answer.", "经济理论（Summers 1989）预测强制福利的成本部分通过略低的薪酬、而非失业来承担——因此“真正由谁承担？”有一个微妙的答案。") },
];
