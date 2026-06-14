import type { NewsCategory, DiagramKind } from "@/types";
import { CaseTheory, CaseMethod, CaseEvidence, L, LS } from "./types";

export interface Pool {
  theories: { n: [string, string]; d: DiagramKind; m: number; ex: [string, string]; rel: [string, string] }[];
  methods: { n: [string, string]; f: number; p: [string, string]; formula: string }[];
  authors: { name: string; field: [string, string] }[];
  debates: [string, string][];
  proposalThemes: { n: [string, string]; o: [string, string] }[];
}

function theory(t: Pool["theories"][number]): CaseTheory {
  return {
    name: L(t.n[0], t.n[1]),
    match: t.m,
    diagram: t.d,
    explanation: L(t.ex[0], t.ex[1]),
    relevance: L(t.rel[0], t.rel[1]),
    strengths: LS(["Clear analytical predictions", "清晰的分析性预测"], ["Well supported in the literature", "在文献中有良好支持"]),
    weaknesses: LS(["Relies on simplifying assumptions", "依赖简化假设"], ["Context-specific magnitudes", "量级依赖具体情境"]),
  };
}
export function poolTheories(p: Pool): CaseTheory[] {
  return p.theories.map(theory);
}
export function poolMethods(p: Pool): CaseMethod[] {
  return p.methods.map((m) => ({
    name: L(m.n[0], m.n[1]),
    fit: m.f,
    purpose: L(m.p[0], m.p[1]),
    formula: m.formula,
    assumptions: L("Identifying assumptions hold; data are reliable.", "识别假设成立；数据可靠。"),
    data: L("Relevant panel or cross-section for the variables above.", "上述变量的相关面板或截面数据。"),
    advantages: L("Directly addresses the core empirical question.", "直接回应核心实证问题。"),
    weaknesses: L("Sensitive to specification and confounders.", "对设定与混杂因素敏感。"),
  }));
}

const macro: Pool = {
  theories: [
    { n: ["AD–AS & Keynesian Demand Management", "AD–AS 与凯恩斯需求管理"], d: "adas", m: 93, ex: ["Aggregate demand drives short-run output when prices are sticky.", "价格粘性时总需求驱动短期产出。"], rel: ["Frames how the shock moves output, prices and employment.", "刻画冲击如何改变产出、价格与就业。"] },
    { n: ["Monetary Policy & the Phillips Curve", "货币政策与菲利普斯曲线"], d: "adas", m: 90, ex: ["Central banks trade off inflation and unemployment via interest rates.", "央行通过利率在通胀与失业间权衡。"], rel: ["Explains the policy response to inflation or slack.", "解释对通胀或产能闲置的政策回应。"] },
    { n: ["Classical / Quantity Theory of Money", "古典／货币数量论"], d: "adas", m: 80, ex: ["In the long run output is supply-determined and money is neutral.", "长期产出由供给决定，货币中性。"], rel: ["Provides the long-run benchmark for evaluating policy.", "为评估政策提供长期基准。"] },
    { n: ["Rational Expectations", "理性预期"], d: "supplyDemand", m: 74, ex: ["Agents anticipate policy, blunting predictable interventions.", "主体预期政策，削弱可预见的干预。"], rel: ["Warns that announced policy may be partly priced in.", "提示已宣布政策可能部分被定价。"] },
  ],
  methods: [
    { n: ["Vector Autoregression (VAR)", "向量自回归（VAR）"], f: 90, p: ["Trace dynamic responses of macro variables to a shock.", "追踪宏观变量对冲击的动态反应。"], formula: "Yₜ = c + Σ AᵢYₜ₋ᵢ + εₜ" },
    { n: ["ARIMA Forecasting", "ARIMA 预测"], f: 84, p: ["Forecast inflation/output from past dynamics.", "依据历史动态预测通胀／产出。"], formula: "yₜ = c + Σφᵢyₜ₋ᵢ + Σθⱼεₜ₋ⱼ + εₜ" },
    { n: ["Taylor-Rule Estimation", "泰勒规则估计"], f: 82, p: ["Model the policy-rate reaction function.", "建模政策利率反应函数。"], formula: "i = r* + π + α(π−π*) + β(y−y*)" },
  ],
  authors: [ { name: "Olivier Blanchard", field: ["Macroeconomics", "宏观经济学"] }, { name: "Christina Romer", field: ["Monetary history", "货币史"] }, { name: "John Taylor", field: ["Monetary rules", "货币规则"] } ],
  debates: [["Rules vs discretion in monetary policy.", "货币政策的规则 对 相机抉择。"], ["Is current inflation demand- or supply-driven?", "当前通胀由需求还是供给驱动？"]],
  proposalThemes: [ { n: ["Adjust the policy interest rate", "调整政策利率"], o: ["Steer demand toward the inflation/employment target.", "引导需求趋向通胀／就业目标。"] }, { n: ["Use fiscal stabilisation", "运用财政稳定"], o: ["Support or restrain demand to smooth the cycle.", "支撑或抑制需求以平滑周期。"] }, { n: ["Forward guidance / credibility", "前瞻指引／可信度"], o: ["Anchor expectations to ease the trade-off.", "锚定预期以缓解权衡。"] } ],
};

const finance: Pool = {
  theories: [
    { n: ["Asymmetric Information & Moral Hazard", "信息不对称与道德风险"], d: "supplyDemand", m: 92, ex: ["Hidden information and incentives distort lending and risk-taking.", "隐藏信息与激励扭曲放贷与冒险。"], rel: ["Explains mispriced risk behind the financial event.", "解释金融事件背后被错误定价的风险。"] },
    { n: ["Systemic Risk & Contagion", "系统性风险与传染"], d: "supplyDemand", m: 90, ex: ["Interlinked balance sheets propagate shocks across the system.", "相互关联的资产负债表使冲击在系统内扩散。"], rel: ["Frames why one failure threatens many.", "解释为何一处失败威胁多方。"] },
    { n: ["Minsky Financial Instability", "明斯基金融不稳定"], d: "adas", m: 84, ex: ["Stability breeds leverage and fragility, then sudden reversal.", "稳定催生杠杆与脆弱，继而骤然反转。"], rel: ["Explains boom-to-bust dynamics in the episode.", "解释该事件的繁荣—崩溃动态。"] },
    { n: ["Bank Runs (Diamond–Dybvig)", "银行挤兑（戴蒙德—迪布维格）"], d: "supplyDemand", m: 80, ex: ["Maturity mismatch makes solvent banks vulnerable to runs.", "期限错配使有偿付能力的银行易遭挤兑。"], rel: ["Motivates deposit insurance and lender-of-last-resort.", "为存款保险与最后贷款人提供依据。"] },
  ],
  methods: [
    { n: ["Stress Testing / Scenario Analysis", "压力测试／情景分析"], f: 89, p: ["Assess balance-sheet resilience to adverse shocks.", "评估资产负债表对不利冲击的韧性。"], formula: "Capital_post = Capital − Σ Loss(scenarioₖ)" },
    { n: ["Value-at-Risk (VaR)", "在险价值（VaR）"], f: 83, p: ["Quantify potential loss at a confidence level.", "在某置信水平下量化潜在损失。"], formula: "P(Loss > VaRα) = 1 − α" },
    { n: ["Event Study", "事件研究"], f: 82, p: ["Measure abnormal returns around the event.", "测量事件前后的异常收益。"], formula: "AR = R_actual − R_expected" },
  ],
  authors: [ { name: "Hyman Minsky", field: ["Financial instability", "金融不稳定"] }, { name: "Gary Gorton", field: ["Banking & panics", "银行与恐慌"] }, { name: "Markus Brunnermeier", field: ["Systemic risk", "系统性风险"] } ],
  debates: [["How much regulation prevents crises without choking credit?", "多大监管能在不扼杀信贷的情况下预防危机？"], ["Bailouts vs market discipline.", "救助 对 市场纪律。"]],
  proposalThemes: [ { n: ["Tighten prudential regulation", "收紧审慎监管"], o: ["Raise capital/liquidity to reduce systemic risk.", "提高资本／流动性以降低系统性风险。"] }, { n: ["Expand deposit insurance / backstops", "扩大存款保险／后盾"], o: ["Stem runs and contagion.", "遏制挤兑与传染。"] }, { n: ["Macroprudential limits", "宏观审慎限制"], o: ["Lean against leverage and asset bubbles.", "抑制杠杆与资产泡沫。"] } ],
};

const labour: Pool = {
  theories: [
    { n: ["Labour Market Supply & Demand", "劳动力供给与需求"], d: "labourMarket", m: 93, ex: ["Wages and employment clear where labour demand meets supply.", "工资与就业在劳动供需相交处出清。"], rel: ["Predicts how the policy shifts wages and jobs.", "预测政策如何改变工资与就业。"] },
    { n: ["Minimum Wage & Monopsony", "最低工资与买方垄断"], d: "labourMarket", m: 90, ex: ["Under monopsony, a wage floor can raise both pay and employment.", "买方垄断下，工资下限可同时提高薪酬与就业。"], rel: ["Determines whether wage policy cuts jobs.", "决定工资政策是否减少就业。"] },
    { n: ["Human Capital Theory", "人力资本理论"], d: "labourMarket", m: 84, ex: ["Skills and education raise productivity and earnings.", "技能与教育提升生产率与收入。"], rel: ["Frames reskilling responses to the shock.", "刻画对冲击的再培训应对。"] },
    { n: ["Efficiency Wage Theory", "效率工资理论"], d: "labourMarket", m: 78, ex: ["Above-market pay can raise effort and retention.", "高于市场的薪酬可提升努力与留存。"], rel: ["Suggests higher pay may offset some cost.", "表明加薪可能抵消部分成本。"] },
  ],
  methods: [
    { n: ["Difference-in-Differences", "双重差分"], f: 92, p: ["Compare treated vs control labour markets over time.", "随时间对比处理与对照劳动市场。"], formula: "Y = β₀+β₁Treat+β₂Post+β₃(Treat·Post)+ε" },
    { n: ["Labour-Demand Elasticity Estimation", "劳动需求弹性估计"], f: 85, p: ["Estimate how employment responds to wage changes.", "估计就业对工资变动的反应。"], formula: "η = (%ΔL)/(%Δw)" },
    { n: ["Synthetic Control", "合成控制"], f: 80, p: ["Build a counterfactual region for the policy.", "为政策构建反事实地区。"], formula: "Ŷ_control = Σ wⱼ Yⱼ" },
  ],
  authors: [ { name: "David Card", field: ["Labour economics", "劳动经济学"] }, { name: "Alan Manning", field: ["Monopsony", "买方垄断"] }, { name: "Claudia Goldin", field: ["Labour & gender", "劳动与性别"] } ],
  debates: [["Do wage floors reduce employment?", "工资下限是否减少就业？"], ["Flexibility vs security in modern work.", "现代工作的灵活性 对 保障。"]],
  proposalThemes: [ { n: ["Set or adjust a wage floor", "设定或调整工资下限"], o: ["Raise low-end pay while watching employment.", "在关注就业的同时提高低端薪酬。"] }, { n: ["Fund training & active labour-market policy", "资助培训与积极劳动力市场政策"], o: ["Raise human capital and re-employment.", "提升人力资本与再就业。"] }, { n: ["Strengthen worker protections", "强化劳动者保护"], o: ["Improve conditions and bargaining power.", "改善条件与议价能力。"] } ],
};

const tech: Pool = {
  theories: [
    { n: ["Automation & the Task Model", "自动化与任务模型"], d: "labourMarket", m: 93, ex: ["Technology substitutes for tasks, displacing some labour and complementing other tasks.", "技术替代部分任务，取代部分劳动并与其他任务互补。"], rel: ["Explains which jobs are displaced vs augmented.", "解释哪些岗位被取代、哪些被增强。"] },
    { n: ["Skill-Biased Technical Change", "技能偏向型技术进步"], d: "labourMarket", m: 89, ex: ["Technology raises demand for skilled relative to unskilled labour.", "技术提高对熟练相对非熟练劳动的需求。"], rel: ["Frames widening wage gaps from the shock.", "刻画冲击带来的工资差距扩大。"] },
    { n: ["Creative Destruction (Schumpeter)", "创造性破坏（熊彼特）"], d: "costCurves", m: 85, ex: ["Innovation destroys old industries while creating new ones.", "创新摧毁旧产业同时创造新产业。"], rel: ["Frames net effects beyond first-order job loss.", "刻画超越一阶就业损失的净效应。"] },
    { n: ["Network Effects & Platform Economics", "网络效应与平台经济"], d: "supplyDemand", m: 82, ex: ["Value rises with users, tending toward concentration.", "价值随用户增加而上升，趋向集中。"], rel: ["Explains market power and winner-take-most dynamics.", "解释市场势力与赢者通吃动态。"] },
  ],
  methods: [
    { n: ["Difference-in-Differences (exposure)", "双重差分（暴露度）"], f: 90, p: ["Compare high- vs low-exposure sectors/occupations.", "对比高暴露与低暴露的部门／职业。"], formula: "Y = β₀+β₁Exposure×Post+controls+ε" },
    { n: ["Task-Exposure Index", "任务暴露指数"], f: 84, p: ["Score occupations by automatability.", "按可自动化程度为职业评分。"], formula: "Exposureₒ = Σ taskₖ · automatabilityₖ" },
    { n: ["Shift-Share (Bartik) Instrument", "份额转移（Bartik）工具"], f: 80, p: ["Instrument local exposure to technology shocks.", "为地方技术冲击暴露构造工具。"], formula: "Bartikᵣ = Σ shareᵣₖ · growthₖ" },
  ],
  authors: [ { name: "Daron Acemoglu", field: ["Technology & tasks", "技术与任务"] }, { name: "David Autor", field: ["Labour & automation", "劳动与自动化"] }, { name: "Erik Brynjolfsson", field: ["Digital economy", "数字经济"] } ],
  debates: [["Does technology destroy or create more jobs net?", "技术净增还是净减就业？"], ["Will AI compress or widen wage inequality?", "AI 会压缩还是扩大工资不平等？"]],
  proposalThemes: [ { n: ["Reskilling & education investment", "再培训与教育投资"], o: ["Move displaced workers into complementary tasks.", "将被取代者转向互补任务。"] }, { n: ["Adjust the tax treatment of automation", "调整自动化的税收待遇"], o: ["Reduce distortions favouring capital over labour.", "减少偏向资本而非劳动的扭曲。"] }, { n: ["Competition / platform regulation", "竞争／平台监管"], o: ["Limit market power from network effects.", "限制网络效应带来的市场势力。"] } ],
};

const development: Pool = {
  theories: [
    { n: ["Institutions & Growth (Acemoglu)", "制度与增长（阿西莫格鲁）"], d: "ppc", m: 90, ex: ["Inclusive institutions secure property rights and drive growth.", "包容性制度保障产权并推动增长。"], rel: ["Frames the structural roots of the development issue.", "刻画该发展问题的结构性根源。"] },
    { n: ["Poverty Traps", "贫困陷阱"], d: "ppc", m: 88, ex: ["Low income reproduces low investment in capital and skills.", "低收入再生产对资本与技能的低投资。"], rel: ["Explains why a push or shock can have outsized effects.", "解释为何推动或冲击会有超常效应。"] },
    { n: ["Financial Inclusion & Microfinance", "金融普惠与微型金融"], d: "supplyDemand", m: 86, ex: ["Access to credit can relax constraints — or cause over-indebtedness.", "信贷可得性可放松约束——也可能导致过度负债。"], rel: ["Directly relevant to credit-access events.", "与信贷可得性事件直接相关。"] },
    { n: ["Lewis Dual-Sector Model", "刘易斯二元部门模型"], d: "ppc", m: 80, ex: ["Surplus labour shifts from traditional to modern sectors.", "剩余劳动力从传统部门转向现代部门。"], rel: ["Frames structural transformation dynamics.", "刻画结构转型动态。"] },
  ],
  methods: [
    { n: ["Randomised Controlled Trial (RCT)", "随机对照试验（RCT）"], f: 91, p: ["Identify causal effects of a development intervention.", "识别发展干预的因果效应。"], formula: "ATE = E[Y|T=1] − E[Y|T=0]" },
    { n: ["Instrumental Variables", "工具变量"], f: 84, p: ["Address endogeneity in observational data.", "处理观测数据的内生性。"], formula: "Ŷ = β·Z (Z ⟂ ε, Z→X)" },
    { n: ["Regression Discontinuity", "断点回归"], f: 82, p: ["Exploit eligibility cutoffs for causal estimates.", "利用资格门槛进行因果估计。"], formula: "τ = lim E[Y|x↓c] − lim E[Y|x↑c]" },
  ],
  authors: [ { name: "Esther Duflo", field: ["Development & RCTs", "发展与随机试验"] }, { name: "Abhijit Banerjee", field: ["Poverty economics", "贫困经济学"] }, { name: "Daron Acemoglu", field: ["Institutions", "制度"] } ],
  debates: [["Microcredit: empowerment or debt trap?", "微贷：赋能还是债务陷阱？"], ["Institutions vs geography vs policy in development.", "发展中制度 对 地理 对 政策。"]],
  proposalThemes: [ { n: ["Regulate / cap lending terms", "监管／限制放贷条款"], o: ["Curb predatory rates while keeping access.", "遏制掠夺性利率同时保留可得性。"] }, { n: ["Invest in institutions & infrastructure", "投资制度与基础设施"], o: ["Address structural constraints to growth.", "应对增长的结构性约束。"] }, { n: ["Targeted transfers / safety nets", "定向转移／安全网"], o: ["Protect the vulnerable from shocks.", "保护弱势群体免受冲击。"] } ],
};

const policy: Pool = {
  theories: [
    { n: ["Market Failure", "市场失灵"], d: "supplyDemand", m: 92, ex: ["Externalities, public goods and information gaps prevent efficient allocation.", "外部性、公共物品与信息缺口妨碍有效配置。"], rel: ["Diagnoses why an unregulated outcome is inefficient.", "诊断无监管结果为何低效。"] },
    { n: ["Externalities & Pigouvian Policy", "外部性与庇古政策"], d: "externalities", m: 90, ex: ["Taxes or subsidies align private with social costs.", "税收或补贴使私人与社会成本对齐。"], rel: ["Justifies corrective intervention.", "为纠正性干预提供依据。"] },
    { n: ["Public Goods & Free-Riding", "公共物品与搭便车"], d: "supplyDemand", m: 84, ex: ["Non-excludable goods are under-provided by markets.", "非排他性物品被市场供给不足。"], rel: ["Frames the case for public provision.", "刻画公共提供的理由。"] },
    { n: ["Behavioural Economics / Nudges", "行为经济学／助推"], d: "supplyDemand", m: 80, ex: ["Biases mean low-cost nudges can change behaviour.", "偏见意味着低成本助推可改变行为。"], rel: ["Offers cheap alternatives to mandates.", "提供强制之外的低成本替代。"] },
  ],
  methods: [
    { n: ["Cost–Benefit Analysis", "成本收益分析"], f: 90, p: ["Compare discounted social costs and benefits.", "比较折现后的社会成本与收益。"], formula: "NPV = Σ (Bₜ−Cₜ)/(1+r)ᵗ" },
    { n: ["Difference-in-Differences", "双重差分"], f: 86, p: ["Evaluate the policy against a control group.", "以对照组评估政策。"], formula: "Y = β₀+β₁Treat+β₂Post+β₃(Treat·Post)+ε" },
    { n: ["Microsimulation", "微观模拟"], f: 82, p: ["Model distributional effects across households.", "建模对各家庭的分配效应。"], formula: "ΔWelfareₕ = f(policy | incomeₕ, behaviourₕ)" },
  ],
  authors: [ { name: "Raj Chetty", field: ["Public economics", "公共经济学"] }, { name: "Emmanuel Saez", field: ["Taxation & inequality", "税收与不平等"] }, { name: "Cass Sunstein", field: ["Behavioural policy", "行为政策"] } ],
  debates: [["Market-based instruments vs direct regulation.", "市场化工具 对 直接监管。"], ["Efficiency vs equity in policy design.", "政策设计中的效率 对 公平。"]],
  proposalThemes: [ { n: ["Corrective tax or subsidy", "纠正性税收或补贴"], o: ["Price the externality to reach the social optimum.", "为外部性定价以达社会最优。"] }, { n: ["Direct regulation / standards", "直接监管／标准"], o: ["Cap the harm via enforceable limits.", "通过可执行限值限制危害。"] }, { n: ["Behavioural nudge", "行为助推"], o: ["Shift choices at low cost and high acceptability.", "以低成本高接受度改变选择。"] } ],
};

const sustainability: Pool = {
  theories: [
    { n: ["Externalities & Carbon Pricing", "外部性与碳定价"], d: "externalities", m: 94, ex: ["Emissions impose uncosted social damage; a price internalises it.", "排放造成未计价的社会损害；定价使其内部化。"], rel: ["Core rationale for carbon taxes or markets.", "碳税或碳市场的核心依据。"] },
    { n: ["Tragedy of the Commons", "公地悲剧"], d: "supplyDemand", m: 88, ex: ["Shared resources are over-exploited without governance.", "缺乏治理时共享资源被过度开发。"], rel: ["Frames why collective action is needed.", "刻画为何需要集体行动。"] },
    { n: ["Coase Theorem", "科斯定理"], d: "externalities", m: 82, ex: ["With clear rights and low transaction costs, parties can bargain to efficiency.", "在产权清晰且交易成本低时，各方可议价至有效。"], rel: ["Offers a property-rights alternative to taxes.", "提供以产权替代税收的方案。"] },
    { n: ["Green Growth & Porter Hypothesis", "绿色增长与波特假说"], d: "ppc", m: 78, ex: ["Well-designed regulation can spur innovation and competitiveness.", "设计良好的监管可激发创新与竞争力。"], rel: ["Counters the cost-only view of climate policy.", "反驳仅看成本的气候政策观。"] },
  ],
  methods: [
    { n: ["Cost–Benefit with Social Cost of Carbon", "含碳社会成本的成本收益分析"], f: 91, p: ["Value emissions changes against policy costs.", "将排放变化与政策成本对比估值。"], formula: "NPV = Σ (Bₜ − Cₜ − SCC·Eₜ)/(1+r)ᵗ" },
    { n: ["Difference-in-Differences", "双重差分"], f: 85, p: ["Compare regulated vs unregulated emitters.", "对比受监管与不受监管的排放者。"], formula: "Y = β₀+β₁Treat+β₂Post+β₃(Treat·Post)+ε" },
    { n: ["Integrated Assessment Model", "综合评估模型"], f: 80, p: ["Link emissions, climate and the economy.", "连接排放、气候与经济。"], formula: "Welfare = f(emissions, damages, abatement)" },
  ],
  authors: [ { name: "William Nordhaus", field: ["Climate economics", "气候经济学"] }, { name: "Elinor Ostrom", field: ["Commons governance", "公地治理"] }, { name: "Nicholas Stern", field: ["Climate policy", "气候政策"] } ],
  debates: [["Carbon tax vs cap-and-trade.", "碳税 对 总量管制与交易。"], ["Cost of climate action vs cost of inaction.", "气候行动成本 对 不作为成本。"]],
  proposalThemes: [ { n: ["Price carbon (tax or market)", "为碳定价（税或市场）"], o: ["Internalise emissions at the social cost of carbon.", "按碳社会成本内部化排放。"] }, { n: ["Border carbon adjustment", "碳边境调节"], o: ["Prevent leakage and level the field.", "防止泄漏并营造公平环境。"] }, { n: ["Green subsidies & standards", "绿色补贴与标准"], o: ["Accelerate low-carbon adoption.", "加速低碳采纳。"] } ],
};

const trade: Pool = {
  theories: [
    { n: ["Comparative Advantage", "比较优势"], d: "ppc", m: 93, ex: ["Countries gain by specialising where opportunity cost is lowest.", "各国专注机会成本最低之处即可获益。"], rel: ["Frames the gains the event puts at risk.", "刻画该事件所威胁的收益。"] },
    { n: ["Protectionism & Deadweight Loss", "保护主义与无谓损失"], d: "supplyDemand", m: 90, ex: ["Barriers raise price above world level, creating welfare loss.", "壁垒将价格抬高于世界水平，造成福利损失。"], rel: ["Measures the efficiency cost of intervention.", "衡量干预的效率成本。"] },
    { n: ["Strategic Trade Theory", "战略性贸易理论"], d: "externalities", m: 82, ex: ["Under imperfect competition, intervention can shift rents home.", "在不完全竞争下，干预可将租金转移回国内。"], rel: ["Provides the strongest pro-intervention case.", "提供最强的支持干预理由。"] },
    { n: ["Gravity Model", "引力模型"], d: "supplyDemand", m: 80, ex: ["Trade rises with size and falls with distance and barriers.", "贸易随规模上升、随距离与壁垒下降。"], rel: ["Predicts how flows re-route after the shock.", "预测冲击后贸易流如何改道。"] },
  ],
  methods: [
    { n: ["Partial-Equilibrium Welfare Analysis", "局部均衡福利分析"], f: 92, p: ["Measure deadweight loss and surplus shifts.", "测量无谓损失与剩余转移。"], formula: "DWL = ½·Δt·ΔQ" },
    { n: ["Gravity Estimation", "引力模型估计"], f: 88, p: ["Estimate trade-flow responses to barriers.", "估计贸易流对壁垒的反应。"], formula: "ln X_ij = β₀+β₁ln(GDPᵢGDPⱼ)−β₂ln(dist)+ε" },
    { n: ["CGE Modelling", "CGE 建模"], f: 80, p: ["Trace economy-wide and retaliation effects.", "追踪全经济与报复效应。"], formula: "Solve supply=demand across markets" },
  ],
  authors: [ { name: "Paul Krugman", field: ["Trade & geography", "贸易与地理"] }, { name: "Pinelopi Goldberg", field: ["Trade & development", "贸易与发展"] }, { name: "Douglas Irwin", field: ["Trade policy", "贸易政策"] } ],
  debates: [["Free trade vs strategic protection.", "自由贸易 对 战略性保护。"], ["Who bears tariff costs — exporters or importers?", "关税成本由谁承担——出口商还是进口商？"]],
  proposalThemes: [ { n: ["Targeted trade remedy", "定向贸易救济"], o: ["Offset only verified unfair practices.", "仅抵消经核实的不公平行为。"] }, { n: ["Domestic production support", "本国生产支持"], o: ["Build competitiveness without import barriers.", "在无进口壁垒下建立竞争力。"] }, { n: ["Negotiated agreement", "谈判协议"], o: ["Resolve via reciprocal rules.", "通过对等规则解决。"] } ],
};

const POOLS: Record<NewsCategory, Pool> = {
  macro, finance, labour, tech, development, policy, sustainability, trade,
};

/* keyword-specific overrides (match the spec's examples) */
const KEYWORD_POOLS: { test: RegExp; pool: Pool }[] = [
  {
    test: /hous|rent|land|property|mortgage|住房|租金|房价|房地产/i,
    pool: {
      theories: [
        { n: ["Inelastic Housing Supply", "住房供给缺乏弹性"], d: "supplyDemand", m: 94, ex: ["Planning limits make supply inelastic, so demand shocks raise prices not quantity.", "规划限制使供给缺乏弹性，需求冲击抬高价格而非数量。"], rel: ["Core of the affordability problem.", "可负担性问题的核心。"] },
        { n: ["Market Failure & Externalities", "市场失灵与外部性"], d: "externalities", m: 88, ex: ["Speculation, NIMBYism and credit cycles distort the housing market.", "投机、邻避与信贷周期扭曲住房市场。"], rel: ["Justifies intervention in land and housing.", "为土地与住房干预提供依据。"] },
        { n: ["Urban Economics & Agglomeration", "城市经济学与集聚"], d: "ppc", m: 86, ex: ["Agglomeration concentrates demand in productive cities.", "集聚使需求集中于高生产率城市。"], rel: ["Explains why prices spike where jobs are.", "解释房价为何在就业地飙升。"] },
        { n: ["Land Value Tax (Georgist)", "土地价值税（乔治主义）"], d: "supplyDemand", m: 82, ex: ["Taxing land value captures unearned rent without distorting building.", "对土地价值征税可捕获不劳而获的租金而不扭曲建设。"], rel: ["A key proposed remedy.", "一项关键的建议对策。"] },
      ],
      methods: policy.methods,
      authors: [ { name: "Edward Glaeser", field: ["Urban economics", "城市经济学"] }, { name: "Enrico Moretti", field: ["Cities & jobs", "城市与就业"] }, { name: "Henry George", field: ["Land & rent", "土地与租金"] } ],
      debates: [["Supply constraints vs demand subsidies as the real cause.", "供给约束 对 需求补贴谁是真因。"], ["Land-value tax vs zoning reform.", "土地价值税 对 区划改革。"]],
      proposalThemes: [ { n: ["Reform zoning to expand supply", "改革区划以扩大供给"], o: ["Relax planning limits to add housing.", "放松规划限制以增加住房。"] }, { n: ["Introduce a land-value tax", "引入土地价值税"], o: ["Curb speculation and fund infrastructure.", "遏制投机并为基础设施融资。"] }, { n: ["Targeted housing support", "定向住房支持"], o: ["Help low-income renters without inflating prices.", "在不推高房价下帮助低收入租户。"] } ],
    },
  },
  {
    test: /\bai\b|automat|robot|algorithm|machine learning|生成式|人工智能|自动化|机器人/i,
    pool: tech,
  },
  {
    test: /minimum wage|min wage|最低工资|gig|rider|外卖|骑手|工资|劳动|就业/i,
    pool: labour,
  },
];

export function resolvePool(category: NewsCategory, eventEn: string, id: string): Pool {
  const hay = `${eventEn} ${id}`;
  for (const k of KEYWORD_POOLS) if (k.test.test(hay)) return k.pool;
  return POOLS[category] ?? policy;
}

export function poolEvidence(p: Pool, eventEn: string): CaseEvidence[] {
  const a = p.authors;
  const m = p.methods[0]?.n[0] ?? "the model";
  return [
    {
      title: L("Official statistics & national accounts", "官方统计与国民经济核算"), publisher: "World Bank / IMF / national statistics", grade: "A+", reliability: 96,
      bias: L("Minimal · primary administrative data", "极低 · 一手行政数据"),
      requiredData: L("Core quantities, prices and outcomes for the event.", "与事件相关的核心数量、价格与结果。"),
      whyItMatters: L("Establishes the magnitude and baseline of the problem.", "确立问题的量级与基线。"),
      howItSupports: L(`Provides inputs for ${m} and the welfare analysis.`, `为${p.methods[0]?.n[1] ?? "模型"}与福利分析提供输入。`),
      url: "https://data.worldbank.org", year: 2026,
    },
    {
      title: L(`Peer-reviewed study (${a[0]?.name} tradition)`, `同行评审研究（${a[0]?.name} 传统）`), publisher: "Top-field journal", grade: "A", reliability: 90,
      bias: L("Low · possible publication bias", "低 · 可能存在发表偏倚"),
      requiredData: L("Causal estimates and elasticities relevant to the event.", "与事件相关的因果估计与弹性。"),
      whyItMatters: L("Supplies credible causal magnitudes, not just correlations.", "提供可信的因果量级，而非仅相关。"),
      howItSupports: L("Calibrates the theoretical predictions.", "校准理论预测。"),
      url: "https://www.aeaweb.org/journals/aer", year: 2024,
    },
    {
      title: L("Working paper / policy institute analysis", "工作论文／政策机构分析"), publisher: "NBER / think tank", grade: "A", reliability: 84,
      bias: L("Low · not yet peer-reviewed", "低 · 尚未同行评审"),
      requiredData: L("Recent estimates close to the event timing.", "贴近事件时点的最新估计。"),
      whyItMatters: L("Offers timely evidence ahead of peer review.", "在同行评审前提供及时证据。"),
      howItSupports: L("Cross-checks the peer-reviewed magnitudes.", "交叉验证同行评审的量级。"),
      url: "https://www.nber.org/papers", year: 2026,
    },
    {
      title: L("Industry / sector report", "行业／部门报告"), publisher: "Consultancy or trade body", grade: "B", reliability: 72,
      bias: L("Moderate · commercial incentive", "中等 · 商业激励"),
      requiredData: L("Market-level forecasts and operational detail.", "市场层面的预测与运营细节。"),
      whyItMatters: L("Adds granular, current market context.", "补充细颗粒度的当前市场背景。"),
      howItSupports: L("Informs scenarios; weighted for bias.", "为情景提供依据；对偏见加以权衡。"),
      url: "https://www.oecd.org", year: 2025,
    },
    {
      title: L("Quality news coverage", "优质新闻报道"), publisher: "Reuters / FT / Caixin", grade: "C", reliability: 58,
      bias: L("Editorial framing; timely but thin", "编辑取向；及时但单薄"),
      requiredData: L("Event confirmation, dates and statements.", "事件确认、日期与声明。"),
      whyItMatters: L("Pins down the event and its timing.", "确定事件及其时点。"),
      howItSupports: L("Defines the treatment date; not for magnitudes.", "界定处理时点；不作量级来源。"),
      url: "https://www.reuters.com", year: 2026,
    },
  ];
}
