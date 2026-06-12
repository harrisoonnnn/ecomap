import type {
  DiagramKind,
  EvidenceSource,
  Stakeholder,
  Theory,
} from "@/types";

/* ============ THEORY CATALOG ============ */
export const THEORY_CATALOG: Theory[] = [
  {
    id: "supply-demand",
    name: { en: "Demand & Supply", zh: "供给与需求" },
    match: 96,
    diagram: "supplyDemand",
    explanation: {
      en: "Prices and quantities are set where the marginal willingness to pay meets marginal cost; shifts in either curve re-clear the market.",
      zh: "价格与数量由边际支付意愿与边际成本的交点决定；任一曲线移动都会使市场重新出清。",
    },
    relevance: {
      en: "A policy or shock that changes costs, expectations or available substitutes shifts equilibrium price and quantity directly.",
      zh: "改变成本、预期或可得替代品的政策或冲击，会直接改变均衡价格与数量。",
    },
    strengths: [
      { en: "Transparent, testable comparative statics", zh: "透明、可检验的比较静态分析" },
      { en: "Applies across almost any market", zh: "几乎适用于任何市场" },
    ],
    weaknesses: [
      { en: "Assumes rationality and good information", zh: "假设理性与充分信息" },
      { en: "Ignores power, frictions and dynamics", zh: "忽略权力、摩擦与动态过程" },
    ],
  },
  {
    id: "externalities",
    name: { en: "Externalities", zh: "外部性" },
    match: 92,
    diagram: "externalities",
    explanation: {
      en: "When private costs or benefits diverge from social ones, markets over- or under-produce relative to the social optimum.",
      zh: "当私人成本或收益偏离社会成本或收益时，市场相对社会最优会过度或不足生产。",
    },
    relevance: {
      en: "Spillovers onto third parties justify corrective taxes, subsidies or regulation to close the welfare gap.",
      zh: "对第三方的溢出效应为纠正性税收、补贴或监管提供了依据，以弥合福利缺口。",
    },
    strengths: [
      { en: "Clear welfare rationale for intervention", zh: "为干预提供清晰的福利依据" },
      { en: "Quantifiable deadweight loss", zh: "可量化的无谓损失" },
    ],
    weaknesses: [
      { en: "Hard to value external effects", zh: "外部效应难以估值" },
      { en: "Risk of government failure", zh: "存在政府失灵风险" },
    ],
  },
  {
    id: "market-failure",
    name: { en: "Market Failure", zh: "市场失灵" },
    match: 90,
    diagram: "supplyDemand",
    explanation: {
      en: "Public goods, externalities, information gaps and market power prevent the price mechanism from allocating resources efficiently.",
      zh: "公共物品、外部性、信息缺口与市场势力使价格机制无法有效配置资源。",
    },
    relevance: {
      en: "Diagnoses why an unregulated outcome is inefficient and what type of intervention theory recommends.",
      zh: "诊断为何无监管结果低效，以及理论建议采取何种干预。",
    },
    strengths: [
      { en: "Organising framework for policy", zh: "政策的组织性框架" },
      { en: "Links many sub-theories", zh: "连接多个子理论" },
    ],
    weaknesses: [
      { en: "Can over-justify intervention", zh: "可能过度为干预辩护" },
      { en: "Second-best problems", zh: "存在次优问题" },
    ],
  },
  {
    id: "labour-market",
    name: { en: "Labour Market Theory", zh: "劳动力市场理论" },
    match: 88,
    diagram: "labourMarket",
    explanation: {
      en: "Wages and employment are set by labour demand (marginal revenue product) and supply, modified by frictions, minimum wages and monopsony.",
      zh: "工资与就业由劳动需求（边际收益产品）与供给决定，并受摩擦、最低工资与买方垄断影响。",
    },
    relevance: {
      en: "Explains how wage floors, automation or insurance mandates change employment and labour costs.",
      zh: "解释工资下限、自动化或保险强制规定如何改变就业与用工成本。",
    },
    strengths: [
      { en: "Integrates institutions and power", zh: "纳入制度与权力因素" },
      { en: "Rich empirical evidence", zh: "拥有丰富的实证证据" },
    ],
    weaknesses: [
      { en: "Elasticities are context-specific", zh: "弹性高度依赖具体情境" },
      { en: "Hard to isolate causation", zh: "难以分离因果关系" },
    ],
  },
  {
    id: "human-capital",
    name: { en: "Human Capital Theory", zh: "人力资本理论" },
    match: 84,
    diagram: "labourMarket",
    explanation: {
      en: "Investment in education, skills and health raises productivity and future earnings, treating workers' capabilities as capital.",
      zh: "对教育、技能与健康的投资提升生产率与未来收入，将劳动者能力视为资本。",
    },
    relevance: {
      en: "Frames reskilling and training responses to structural change such as automation or trade shocks.",
      zh: "为应对自动化或贸易冲击等结构性变化的再培训提供框架。",
    },
    strengths: [
      { en: "Connects micro choices to growth", zh: "连接微观选择与经济增长" },
      { en: "Policy-actionable", zh: "具备政策可操作性" },
    ],
    weaknesses: [
      { en: "Signalling vs. real productivity", zh: "信号效应与真实生产率之争" },
      { en: "Ignores credit constraints", zh: "忽略信贷约束" },
    ],
  },
  {
    id: "behavioural",
    name: { en: "Behavioural Economics", zh: "行为经济学" },
    match: 81,
    diagram: "supplyDemand",
    explanation: {
      en: "Bounded rationality, biases and framing cause systematic deviations from the rational-agent benchmark.",
      zh: "有限理性、偏见与框架效应导致系统性偏离理性人基准。",
    },
    relevance: {
      en: "Explains under-saving, present bias and why nudges may outperform price signals.",
      zh: "解释储蓄不足、现时偏好，以及为何助推可能优于价格信号。",
    },
    strengths: [
      { en: "Realistic micro-foundations", zh: "更贴近现实的微观基础" },
      { en: "Cheap policy levers (nudges)", zh: "低成本的政策杠杆（助推）" },
    ],
    weaknesses: [
      { en: "Effects can be small or fade", zh: "效应可能较小或衰减" },
      { en: "Ethics of choice architecture", zh: "选择架构的伦理争议" },
    ],
  },
  {
    id: "keynesian",
    name: { en: "Keynesian Economics", zh: "凯恩斯主义经济学" },
    match: 78,
    diagram: "adas",
    explanation: {
      en: "Aggregate demand drives output in the short run; sticky prices mean demand management can stabilise the cycle.",
      zh: "短期内总需求驱动产出；价格粘性意味着需求管理可以稳定经济周期。",
    },
    relevance: {
      en: "Justifies fiscal or monetary responses when an event threatens demand and employment.",
      zh: "当事件威胁需求与就业时，为财政或货币应对提供依据。",
    },
    strengths: [
      { en: "Explains recessions and slack", zh: "解释衰退与产能闲置" },
      { en: "Guides stabilisation policy", zh: "指导稳定政策" },
    ],
    weaknesses: [
      { en: "Crowding out and lags", zh: "挤出效应与时滞" },
      { en: "Less clear in supply shocks", zh: "面对供给冲击时较不明确" },
    ],
  },
  {
    id: "classical",
    name: { en: "Classical Economics", zh: "古典经济学" },
    match: 72,
    diagram: "adas",
    explanation: {
      en: "Markets clear through flexible prices; output is supply-determined in the long run and intervention is largely neutral.",
      zh: "市场通过价格弹性出清；长期产出由供给决定，干预大体中性。",
    },
    relevance: {
      en: "Provides the long-run benchmark and warns against persistent demand-side fixes.",
      zh: "提供长期基准，并警示对持续性需求侧手段的依赖。",
    },
    strengths: [
      { en: "Disciplined long-run view", zh: "严谨的长期视角" },
      { en: "Highlights supply-side reform", zh: "强调供给侧改革" },
    ],
    weaknesses: [
      { en: "Understates short-run pain", zh: "低估短期阵痛" },
      { en: "Assumes fast adjustment", zh: "假设快速调整" },
    ],
  },
  {
    id: "monopoly",
    name: { en: "Monopoly & Market Power", zh: "垄断与市场势力" },
    match: 70,
    diagram: "costCurves",
    explanation: {
      en: "A firm facing a downward-sloping demand curve restricts output and raises price above marginal cost.",
      zh: "面对向下倾斜需求曲线的企业会限制产量，并将价格抬高至边际成本之上。",
    },
    relevance: {
      en: "Relevant where platforms or incumbents concentrate pricing and bargaining power.",
      zh: "在平台或在位者集中定价与议价能力之处尤为相关。",
    },
    strengths: [
      { en: "Explains rents and mark-ups", zh: "解释租金与加成" },
      { en: "Grounds competition policy", zh: "为竞争政策奠基" },
    ],
    weaknesses: [
      { en: "Contestability may discipline", zh: "可竞争性可能起到约束作用" },
      { en: "Scale can lower costs", zh: "规模可能降低成本" },
    ],
  },
  {
    id: "public-choice",
    name: { en: "Public Choice Theory", zh: "公共选择理论" },
    match: 66,
    diagram: "supplyDemand",
    explanation: {
      en: "Politicians, bureaucrats and voters act in self-interest, so policy can be captured by concentrated lobbies.",
      zh: "政客、官僚与选民追求自身利益，政策可能被集中的游说集团俘获。",
    },
    relevance: {
      en: "Warns that the chosen intervention may serve insiders rather than the social optimum.",
      zh: "警示所选干预可能服务于内部人而非社会最优。",
    },
    strengths: [
      { en: "Realistic political economy", zh: "贴近现实的政治经济学" },
      { en: "Predicts government failure", zh: "预测政府失灵" },
    ],
    weaknesses: [
      { en: "Can be overly cynical", zh: "可能过于犬儒" },
      { en: "Underweights public ethos", zh: "低估公共精神" },
    ],
  },
];

export const COUNTER_THEORIES = [
  {
    a: { en: "Keynesian", zh: "凯恩斯主义" },
    b: { en: "Classical", zh: "古典学派" },
    tension: {
      en: "Should the state manage demand through the shock, or trust flexible prices to restore equilibrium?",
      zh: "国家应在冲击中管理需求，还是信任价格弹性恢复均衡？",
    },
  },
  {
    a: { en: "Free Market", zh: "自由市场" },
    b: { en: "Regulation", zh: "监管" },
    tension: {
      en: "Does intervention correct a genuine market failure, or introduce a larger government failure?",
      zh: "干预是纠正真实的市场失灵，还是引入更大的政府失灵？",
    },
  },
];

/* ============ STAKEHOLDER ARCHETYPES ============ */
export const STAKEHOLDERS: Stakeholder[] = [
  {
    id: "government",
    name: { en: "Government", zh: "政府" },
    icon: "🏛",
    interests: { en: "Stability, revenue, legitimacy and growth", zh: "稳定、财政收入、合法性与增长" },
    incentives: { en: "Win support while avoiding visible costs", zh: "在避免显性成本的同时赢得支持" },
    benefits: { en: "Policy credit, tax base, strategic control", zh: "政策政绩、税基、战略控制" },
    risks: { en: "Backlash, capture, fiscal strain", zh: "民意反弹、被俘获、财政压力" },
  },
  {
    id: "firms",
    name: { en: "Firms", zh: "企业" },
    icon: "🏭",
    interests: { en: "Profit, market share and predictability", zh: "利润、市场份额与可预期性" },
    incentives: { en: "Cut costs, pass through prices, lobby", zh: "降本、价格转嫁、游说" },
    benefits: { en: "Protected margins or new demand", zh: "受保护的利润率或新需求" },
    risks: { en: "Higher costs, compliance, retaliation", zh: "成本上升、合规、报复" },
  },
  {
    id: "workers",
    name: { en: "Workers", zh: "劳动者" },
    icon: "👷",
    interests: { en: "Wages, security and conditions", zh: "工资、保障与工作条件" },
    incentives: { en: "Protect jobs and bargaining power", zh: "保护岗位与议价能力" },
    benefits: { en: "Higher pay or stronger protection", zh: "更高薪酬或更强保护" },
    risks: { en: "Displacement, automation, informality", zh: "被替代、自动化、非正规化" },
  },
  {
    id: "consumers",
    name: { en: "Consumers", zh: "消费者" },
    icon: "🛒",
    interests: { en: "Low prices, quality and choice", zh: "低价、质量与选择" },
    incentives: { en: "Maximise value for money", zh: "实现性价比最大化" },
    benefits: { en: "Cheaper or safer goods", zh: "更便宜或更安全的商品" },
    risks: { en: "Higher prices, less variety", zh: "价格上涨、选择减少" },
  },
  {
    id: "investors",
    name: { en: "Investors", zh: "投资者" },
    icon: "📈",
    interests: { en: "Risk-adjusted returns", zh: "风险调整后的回报" },
    incentives: { en: "Reallocate capital to winners", zh: "将资本重新配置给赢家" },
    benefits: { en: "Repricing opportunities", zh: "重新定价的机会" },
    risks: { en: "Volatility, policy uncertainty", zh: "波动性、政策不确定性" },
  },
  {
    id: "ngos",
    name: { en: "NGOs & Civil Society", zh: "非政府组织与公民社会" },
    icon: "🤝",
    interests: { en: "Equity, rights and sustainability", zh: "公平、权利与可持续性" },
    incentives: { en: "Shift norms and hold actors to account", zh: "改变规范并问责各方" },
    benefits: { en: "Stronger protections and transparency", zh: "更强的保护与透明度" },
    risks: { en: "Being side-lined or co-opted", zh: "被边缘化或被收编" },
  },
  {
    id: "international",
    name: { en: "International Organisations", zh: "国际组织" },
    icon: "🌐",
    interests: { en: "Coordination and global stability", zh: "协调与全球稳定" },
    incentives: { en: "Promote rules and avoid spillovers", zh: "推动规则并避免外溢" },
    benefits: { en: "Reduced systemic and trade risk", zh: "降低系统性与贸易风险" },
    risks: { en: "Fragmentation and non-compliance", zh: "碎片化与不遵守" },
  },
];

/* ============ EVIDENCE CATALOG (graded A+ → D) ============ */
export const EVIDENCE: EvidenceSource[] = [
  {
    id: "wb",
    title: "World Development Indicators",
    publisher: "World Bank",
    grade: "A+",
    reliability: 97,
    bias: "Minimal · methodological transparency",
    strength: 94,
    url: "https://data.worldbank.org",
    year: 2026,
  },
  {
    id: "imf",
    title: "World Economic Outlook Database",
    publisher: "IMF",
    grade: "A+",
    reliability: 96,
    bias: "Low · institutional framing",
    strength: 93,
    url: "https://www.imf.org/en/Publications/WEO",
    year: 2026,
  },
  {
    id: "oecd",
    title: "OECD Economic Surveys",
    publisher: "OECD",
    grade: "A+",
    reliability: 95,
    bias: "Low · member-state perspective",
    strength: 91,
    url: "https://www.oecd.org/economy/",
    year: 2026,
  },
  {
    id: "fred",
    title: "Federal Reserve Economic Data (FRED)",
    publisher: "Federal Reserve Bank of St. Louis",
    grade: "A+",
    reliability: 96,
    bias: "Minimal · primary series",
    strength: 92,
    url: "https://fred.stlouisfed.org",
    year: 2026,
  },
  {
    id: "jpe",
    title: "Peer-reviewed empirical study (top-5 journal)",
    publisher: "Journal of Political Economy",
    grade: "A",
    reliability: 90,
    bias: "Low · publication bias possible",
    strength: 88,
    url: "https://www.journals.uchicago.edu/toc/jpe/current",
    year: 2025,
  },
  {
    id: "nber",
    title: "NBER Working Paper",
    publisher: "NBER",
    grade: "A",
    reliability: 86,
    bias: "Low · not yet peer-reviewed",
    strength: 82,
    url: "https://www.nber.org/papers",
    year: 2026,
  },
  {
    id: "industry",
    title: "Sector outlook report",
    publisher: "McKinsey Global Institute",
    grade: "B",
    reliability: 72,
    bias: "Moderate · commercial incentive",
    strength: 68,
    url: "https://www.mckinsey.com/mgi",
    year: 2025,
  },
  {
    id: "news",
    title: "Investigative news coverage",
    publisher: "Financial Times",
    grade: "C",
    reliability: 58,
    bias: "Editorial framing",
    strength: 52,
    url: "https://www.ft.com",
    year: 2026,
  },
  {
    id: "opinion",
    title: "Op-ed / commentary",
    publisher: "Independent columnist",
    grade: "D",
    reliability: 32,
    bias: "High · personal viewpoint",
    strength: 28,
    url: "https://example.com",
    year: 2026,
  },
];

/* ============ QUANTITATIVE METHODS ============ */
export interface MathMethod {
  id: string;
  name: { en: string; zh: string };
  purpose: { en: string; zh: string };
  formula: string;
  assumptions: { en: string; zh: string };
  data: { en: string; zh: string };
  advantages: { en: string; zh: string };
  weaknesses: { en: string; zh: string };
  fit: number;
}

export const METHODS: MathMethod[] = [
  {
    id: "did",
    name: { en: "Difference-in-Differences", zh: "双重差分（DiD）" },
    purpose: { en: "Estimate a policy's causal effect using a treated vs. control group over time.", zh: "利用处理组与对照组随时间的对比，估计政策的因果效应。" },
    formula: "Y = β₀ + β₁·Treat + β₂·Post + β₃·(Treat·Post) + ε",
    assumptions: { en: "Parallel trends absent treatment; no confounding shocks.", zh: "无处理时趋势平行；无混杂冲击。" },
    data: { en: "Panel data spanning before/after for both groups.", zh: "覆盖两组前后期的面板数据。" },
    advantages: { en: "Controls for fixed differences and common trends.", zh: "控制固定差异与共同趋势。" },
    weaknesses: { en: "Fails if trends diverge for other reasons.", zh: "若趋势因其他原因偏离则失效。" },
    fit: 93,
  },
  {
    id: "regression",
    name: { en: "Multiple Regression", zh: "多元回归" },
    purpose: { en: "Quantify how drivers relate to an outcome, holding others constant.", zh: "在控制其他变量下量化各驱动因素与结果的关系。" },
    formula: "Y = β₀ + Σ βᵢXᵢ + ε",
    assumptions: { en: "Linearity, exogeneity, no severe multicollinearity.", zh: "线性、外生性、无严重多重共线性。" },
    data: { en: "Cross-section or panel of outcome and covariates.", zh: "结果与协变量的截面或面板数据。" },
    advantages: { en: "Flexible, interpretable, widely understood.", zh: "灵活、可解释、广为接受。" },
    weaknesses: { en: "Correlation ≠ causation; omitted-variable bias.", zh: "相关不等于因果；存在遗漏变量偏误。" },
    fit: 88,
  },
  {
    id: "timeseries",
    name: { en: "Time-Series (ARIMA/VAR)", zh: "时间序列（ARIMA/VAR）" },
    purpose: { en: "Model and forecast a variable from its own past and related series.", zh: "基于自身历史与相关序列建模并预测。" },
    formula: "yₜ = c + Σ φᵢ yₜ₋ᵢ + Σ θⱼ εₜ₋ⱼ + εₜ",
    assumptions: { en: "Stationarity (after differencing); stable structure.", zh: "（差分后）平稳；结构稳定。" },
    data: { en: "Long, regularly sampled historical series.", zh: "长期、规则采样的历史序列。" },
    advantages: { en: "Strong short-horizon forecasts.", zh: "短期预测能力强。" },
    weaknesses: { en: "Breaks at structural shifts.", zh: "在结构突变处失准。" },
    fit: 80,
  },
  {
    id: "cba",
    name: { en: "Cost–Benefit Analysis", zh: "成本收益分析" },
    purpose: { en: "Compare discounted social costs and benefits of a policy.", zh: "比较政策折现后的社会成本与收益。" },
    formula: "NPV = Σ (Bₜ − Cₜ) / (1+r)ᵗ",
    assumptions: { en: "All effects monetisable; chosen discount rate.", zh: "所有效应可货币化；给定折现率。" },
    data: { en: "Valued costs/benefits, time horizon, discount rate.", zh: "估值后的成本/收益、时间跨度、折现率。" },
    advantages: { en: "Transparent decision rule.", zh: "透明的决策规则。" },
    weaknesses: { en: "Sensitive to discounting and valuation.", zh: "对折现与估值高度敏感。" },
    fit: 85,
  },
  {
    id: "montecarlo",
    name: { en: "Monte Carlo Simulation", zh: "蒙特卡洛模拟" },
    purpose: { en: "Propagate uncertainty by sampling input distributions.", zh: "通过对输入分布抽样来传播不确定性。" },
    formula: "E[f(X)] ≈ (1/N) Σ f(Xᵢ),  Xᵢ ~ P(X)",
    assumptions: { en: "Plausible input distributions and dependencies.", zh: "合理的输入分布与相依结构。" },
    data: { en: "Parameter ranges, correlations, a model.", zh: "参数范围、相关性、一个模型。" },
    advantages: { en: "Captures full risk distribution.", zh: "刻画完整的风险分布。" },
    weaknesses: { en: "Garbage-in, garbage-out.", zh: "输入失真则结果失真。" },
    fit: 74,
  },
  {
    id: "abm",
    name: { en: "Agent-Based Modelling", zh: "基于主体的建模" },
    purpose: { en: "Simulate emergent outcomes from interacting heterogeneous agents.", zh: "模拟异质主体互动所涌现的结果。" },
    formula: "macro = Σ behaviour(agentᵢ | rules, network)",
    assumptions: { en: "Behavioural rules and network structure specified.", zh: "已设定行为规则与网络结构。" },
    data: { en: "Micro behavioural parameters; network data.", zh: "微观行为参数；网络数据。" },
    advantages: { en: "Handles non-linearity and heterogeneity.", zh: "可处理非线性与异质性。" },
    weaknesses: { en: "Hard to calibrate and validate.", zh: "难以校准与验证。" },
    fit: 68,
  },
];

export const DATASETS: { name: string; provider: string; url: string }[] = [
  { name: "World Development Indicators", provider: "World Bank", url: "https://data.worldbank.org" },
  { name: "World Economic Outlook", provider: "IMF", url: "https://www.imf.org/en/Publications/WEO" },
  { name: "OECD.Stat", provider: "OECD", url: "https://stats.oecd.org" },
  { name: "FRED Economic Data", provider: "Federal Reserve", url: "https://fred.stlouisfed.org" },
  { name: "UN Comtrade", provider: "United Nations", url: "https://comtrade.un.org" },
];

export const DIAGRAM_LABELS: Record<DiagramKind, { en: string; zh: string }> = {
  supplyDemand: { en: "Demand & Supply", zh: "供给与需求" },
  ppc: { en: "Production Possibility Curve", zh: "生产可能性曲线" },
  costCurves: { en: "Cost Curves", zh: "成本曲线" },
  labourMarket: { en: "Labour Market", zh: "劳动力市场" },
  externalities: { en: "Externalities", zh: "外部性" },
  adas: { en: "AD–AS Model", zh: "AD–AS 模型" },
};
