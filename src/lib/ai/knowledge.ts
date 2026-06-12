import type { Locale } from "@/types";

interface Entry {
  keys: RegExp;
  en: string;
  zh: string;
}

/** A compact economics / finance / policy knowledge base for the Copilot. */
const KB: Entry[] = [
  {
    keys: /deadweight loss|dwl|无谓损失|福利损失/i,
    en: "Deadweight loss is the loss of total surplus when a market isn't at its efficient equilibrium — e.g. from a tax, tariff, price control or monopoly. On a supply–demand diagram it's the triangle between the curves over the units no longer traded. It measures the value of mutually beneficial trades that don't happen.",
    zh: "无谓损失是市场未处于有效均衡时损失的总剩余——例如来自税收、关税、价格管制或垄断。在供需图上，它是不再成交的那些单位上、供需曲线之间的三角形。它衡量了本可互利却没有发生的交易的价值。",
  },
  {
    keys: /externalit|外部性/i,
    en: "An externality is a cost or benefit imposed on a third party not reflected in the market price. Negative externalities (e.g. pollution) lead to over-production; positive ones (e.g. vaccination) to under-production. The fix is to internalise it — a Pigouvian tax/subsidy, regulation, or assigning property rights (Coase).",
    zh: "外部性是施加于未反映在市场价格中的第三方的成本或收益。负外部性（如污染）导致过度生产；正外部性（如疫苗接种）导致生产不足。解决之道是将其内部化——庇古税／补贴、监管，或界定产权（科斯）。",
  },
  {
    keys: /elasticit|弹性/i,
    en: "Elasticity measures how responsive one variable is to another. Price elasticity of demand = %ΔQ ÷ %ΔP. Demand is elastic (>1) when there are close substitutes, the good is a luxury, or buyers have time to adjust; inelastic (<1) for necessities or addictive goods. Elasticity decides who bears a tax and how much revenue a price change raises.",
    zh: "弹性衡量一个变量对另一个变量的反应程度。需求价格弹性 = %ΔQ ÷ %ΔP。当有相近替代品、商品为奢侈品或买方有时间调整时，需求富有弹性（>1）；必需品或成瘾品则缺乏弹性（<1）。弹性决定了税收由谁承担，以及价格变化带来多少收入。",
  },
  {
    keys: /opportunity cost|机会成本/i,
    en: "Opportunity cost is the value of the next-best alternative forgone when you make a choice. It's the true economic cost of any decision — for a government, spending on one programme means forgoing another. It underlies the production-possibility curve and all rational choice.",
    zh: "机会成本是你做出选择时所放弃的次优替代方案的价值。它是任何决策的真实经济成本——对政府而言，把钱花在一个项目上就意味着放弃另一个。它是生产可能性曲线与一切理性选择的基础。",
  },
  {
    keys: /comparative advantage|比较优势/i,
    en: "Comparative advantage means a country (or person) should specialise in what it produces at the lowest opportunity cost, then trade. Even if one party is absolutely better at everything, both still gain from specialisation and trade. It's the core argument for the gains from trade.",
    zh: "比较优势意味着一个国家（或个人）应专注于以最低机会成本生产的产品，然后进行贸易。即使一方在所有方面都绝对更强，双方仍能从专业化与贸易中获益。这是贸易收益的核心论证。",
  },
  {
    keys: /market failure|市场失灵/i,
    en: "Market failure is when the free market fails to allocate resources efficiently. The main types are: externalities, public goods (non-rival, non-excludable), information asymmetry, and market power (monopoly). Each justifies a different kind of intervention — but watch for government failure too.",
    zh: "市场失灵是指自由市场未能有效配置资源。主要类型包括：外部性、公共物品（非竞争性、非排他性）、信息不对称与市场势力（垄断）。每种都为不同类型的干预提供理由——但也要警惕政府失灵。",
  },
  {
    keys: /monopol|market power|垄断|市场势力/i,
    en: "A monopoly is a single seller facing the whole market demand curve. Because that curve slopes down, the firm restricts output and sets price above marginal cost, earning supernormal profit and creating deadweight loss. Policy responses: competition law, price regulation, or removing barriers to entry.",
    zh: "垄断是面对整个市场需求曲线的单一卖方。由于该曲线向下倾斜，企业会限制产量并将价格定在边际成本之上，获得超额利润并造成无谓损失。政策回应：竞争法、价格管制或消除进入壁垒。",
  },
  {
    keys: /fiscal policy|财政政策/i,
    en: "Fiscal policy is the government's use of spending and taxation to influence aggregate demand. Expansionary fiscal policy (more spending / lower taxes) boosts demand in a downturn; contractionary policy cools an overheating economy. Key debates: crowding out, time lags, and the size of the multiplier.",
    zh: "财政政策是政府运用支出与税收来影响总需求。扩张性财政政策（增加支出／降低税收）在衰退时提振需求；紧缩性政策为过热经济降温。关键争论：挤出效应、时滞与乘数大小。",
  },
  {
    keys: /monetary policy|interest rate|央行|货币政策|利率/i,
    en: "Monetary policy is the central bank's management of interest rates and the money supply to hit an inflation (and often employment) target. Raising rates cools demand and inflation but risks unemployment — the Phillips-curve trade-off. Transmission works through borrowing costs, asset prices and the exchange rate.",
    zh: "货币政策是央行对利率与货币供应的管理，以实现通胀（通常还有就业）目标。加息为需求与通胀降温，却有失业风险——即菲利普斯曲线的权衡。其传导通过借贷成本、资产价格与汇率实现。",
  },
  {
    keys: /inflation|通胀|通货膨胀/i,
    en: "Inflation is a sustained rise in the general price level, eroding purchasing power. Demand-pull inflation comes from excess demand; cost-push from rising input costs. It's measured by the CPI. Moderate, stable inflation (~2%) is the usual target; high or volatile inflation distorts decisions and hits savers.",
    zh: "通胀是一般物价水平的持续上升，侵蚀购买力。需求拉动型来自过度需求；成本推动型来自投入成本上升。通常以 CPI 衡量。温和、稳定的通胀（约 2%）是常见目标；高或波动的通胀会扭曲决策并打击储蓄者。",
  },
  {
    keys: /\bgdp\b|gross domestic|国内生产总值/i,
    en: "GDP is the total market value of all final goods and services produced in an economy in a period. It can be measured by output, income or expenditure (C+I+G+NX). Real GDP strips out inflation. It's a useful but imperfect welfare measure — it ignores distribution, unpaid work and environmental costs.",
    zh: "GDP 是一个经济体在某一时期内生产的所有最终商品与服务的总市场价值。可按产出、收入或支出（C+I+G+NX）衡量。实际 GDP 剔除了通胀。它是有用但不完美的福利指标——忽略了分配、无偿劳动与环境成本。",
  },
  {
    keys: /supply and demand|供需|供给与需求/i,
    en: "Supply and demand set price and quantity where the two curves cross. Demand slopes down (lower price → more bought); supply slopes up. A shift in either curve — from costs, incomes, expectations or policy — moves the equilibrium. It's the first tool to reach for in almost any market question.",
    zh: "供给与需求在两条曲线相交处决定价格与数量。需求向下倾斜（价格越低→购买越多）；供给向上倾斜。任一曲线因成本、收入、预期或政策而移动，都会改变均衡。它是几乎任何市场问题首先要用的工具。",
  },
  {
    keys: /monopsony|买方垄断/i,
    en: "Monopsony is a market with a single (or dominant) buyer — often an employer of labour. The buyer faces an upward-sloping supply curve, so it sets a wage below the competitive level and hires less. Importantly, a minimum wage or mandated benefit can then raise both pay and employment.",
    zh: "买方垄断是只有单一（或主导）买方的市场——常见于劳动力雇主。买方面对向上倾斜的供给曲线，因而把工资定在竞争水平之下并少雇人。重要的是，此时最低工资或强制福利可同时提高薪酬与就业。",
  },
  {
    keys: /moral hazard|道德风险/i,
    en: "Moral hazard arises when one party takes more risk because it doesn't bear the full cost — e.g. an insured firm, or a bank expecting a bailout. It's an information problem (hidden action). Remedies: deductibles, monitoring, skin-in-the-game and well-designed incentives.",
    zh: "道德风险是指一方因不承担全部成本而承担更多风险——例如已投保的企业，或预期会被救助的银行。这是一个信息问题（隐藏行动）。对策：免赔额、监督、利益绑定与设计良好的激励。",
  },
  {
    keys: /efficient market|emh|有效市场/i,
    en: "The Efficient Markets Hypothesis says asset prices reflect all available information, so you can't consistently beat the market on a risk-adjusted basis. Weak/semi-strong/strong forms differ on which information is priced. Behavioural finance challenges it with bubbles, herding and biases.",
    zh: "有效市场假说认为资产价格反映了所有可得信息，因此在风险调整后你无法持续跑赢市场。弱式／半强式／强式之分在于哪些信息被定价。行为金融以泡沫、羊群效应与偏见对其提出挑战。",
  },
  {
    keys: /essay structure|how (do|to).*essay|write.*essay|论文结构|怎么写|如何写/i,
    en: "A strong economics essay: (1) define key terms and a sharp research question; (2) state a thesis; (3) build 2–3 argument blocks, each = claim → diagram/theory → evidence → counterargument → evaluation; (4) a conditional conclusion that weighs the evidence rather than sitting on the fence. Open the Essay Builder and pick Basic, Advanced or Research-Level for the right depth.",
    zh: "一篇出色的经济学论文：(1) 界定关键术语与一个尖锐的研究问题；(2) 提出论点陈述；(3) 构建 2–3 段论证，每段＝主张 → 图示／理论 → 证据 → 反论 → 评估；(4) 一个权衡证据、而非骑墙的有条件结论。打开论文构建器，选择基础、进阶或研究级以获得合适深度。",
  },
  {
    keys: /evaluation|evaluate|评估|如何评价/i,
    en: "To evaluate well, don't just list pros and cons — prioritise. Use frames like: short run vs long run, magnitude (does it depend on elasticity?), who is affected (distribution/equity), the counterfactual, and the risk of government failure. End with a judgement conditional on the most important factor.",
    zh: "要评估到位，不要只罗列利弊——要分清主次。可用这些框架：短期 对 长期、量级（是否取决于弹性？）、谁受影响（分配／公平）、反事实，以及政府失灵的风险。最后给出取决于最关键因素的有条件判断。",
  },
];

const GENERIC = {
  en: "I can explain economics and finance concepts, financial events, policy questions and essay structure. Try asking 'What is deadweight loss?', 'Explain monetary policy', or 'How do I structure an A-Level essay?'. For a full framework on a specific event, open the Research Workspace.",
  zh: "我可以解释经济与金融概念、金融事件、政策问题与论文结构。试着问“什么是无谓损失？”、“解释货币政策”，或“A-Level 论文怎么搭结构？”。若想对某个具体事件获得完整框架，请打开研究工作台。",
};

/** Returns a substantive answer if the question matches the KB; else null. */
export function lookupKnowledge(input: string, locale: Locale): string | null {
  for (const e of KB) if (e.keys.test(input)) return locale === "zh" ? e.zh : e.en;
  return null;
}

export function genericAnswer(locale: Locale): string {
  return GENERIC[locale];
}
