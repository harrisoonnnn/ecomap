import { L, type CaseDataset, type CasePaper } from "./types";

/** Case-specific datasets the researcher actually needs (no reliability scoring). */
export const deliveryDatasets: CaseDataset[] = [
  {
    name: L("Delivery-rider population & activity", "外卖骑手规模与活跃度"),
    whyMatters: L("Sizes the affected workforce — the denominator for any coverage, cost or welfare estimate.", "测算受影响劳动力规模——任何覆盖、成本或福利估计的分母。"),
    howSupports: L("Feeds the scale of the mandate into cost-benefit and incidence models.", "将强制规模输入成本收益与归宿模型。"),
    institution: "Meituan 美团", website: "sgpjbg.com", url: "https://www.sgpjbg.com/baogao/719316.html",
    sampleFinding: L("Monthly average 3.36m riders with orders (2024); ~800k took orders 260+ days/year.", "月均有单骑手 336 万（2024）；约 80 万全年接单 260 天以上。"), year: "2025",
  },
  {
    name: L("Average rider income", "骑手平均收入"),
    whyMatters: L("The base for estimating how much a contribution affects take-home pay.", "估计缴费对到手收入影响的基础。"),
    howSupports: L("Anchors the pass-through and equity analysis.", "支撑转嫁与公平分析。"),
    institution: "Meituan CSR Report 美团企业社会责任报告", website: "ithome.com", url: "https://www.ithome.com/0/864/222.htm",
    sampleFinding: L("High-frequency riders earn ¥6,650–9,344/month; skilled first-tier-city riders ~¥11,547.", "高频骑手月收入 6,650–9,344 元；一线城市熟练骑手约 11,547 元。"), year: "2025",
  },
  {
    name: L("Social-insurance coverage rate (flexible workers)", "社保覆盖率（灵活就业）"),
    whyMatters: L("Quantifies the gap the policy targets and why voluntary schemes failed.", "量化政策所针对的缺口，以及自愿方案为何失败。"),
    howSupports: L("Justifies the mandate as a fix for a take-up failure.", "为以强制纠正参保不足提供依据。"),
    institution: "State Council report (21st Century Business Herald)", website: "21jingji.com", url: "https://www.21jingji.com/article/20251226/herald/15755b6a50446e08a8b7ab52f5710555.html",
    sampleFinding: L("240m+ flexible workers; social-insurance participation below 40%.", "灵活就业者 2.4 亿+；社保参与率不足 40%。"), year: "2025",
  },
  {
    name: L("Occupational-injury pilot enrolment", "职业伤害保障试点参保"),
    whyMatters: L("Direct evidence of how fast mandatory coverage scales.", "强制覆盖扩张速度的直接证据。"),
    howSupports: L("The dependent variable for a difference-in-differences study.", "双重差分研究的因变量。"),
    institution: "Beijing Daily 北京日报", website: "news.bjd.com.cn", url: "https://news.bjd.com.cn/2025/07/09/11228339.shtml",
    sampleFinding: L("Cumulative enrolment 12,345,700 by mid-2025 (from ~6.68m in Oct 2023).", "截至 2025 年中累计参保 1,234.57 万（2023 年 10 月约 668 万）。"), year: "2025",
  },
  {
    name: L("Rider work-injury & traffic-accident data", "骑手工伤与交通事故数据"),
    whyMatters: L("Values the injury externality the insurance is meant to cover.", "为保险所要覆盖的工伤外部性赋值。"),
    howSupports: L("The benefit side of the cost-benefit analysis.", "成本收益分析的收益端。"),
    institution: "Shanghai Municipal Government 上海市政府", website: "shanghai.gov.cn", url: "https://www.shanghai.gov.cn/nw31406/20250715/3fc693dda18a42c6afed55c2f565eef5.html",
    sampleFinding: L("Rider traffic-violation deaths fell 42.9% after the 'three-colour safety code' reform.", "“三色安全码”改革后骑手交通违法致死下降 42.9%。"), year: "2025",
  },
  {
    name: L("Platform employment structure (FT vs casual)", "平台用工结构（全职 对 临时）"),
    whyMatters: L("Determines who a mandate actually reaches and who bears its cost.", "决定强制实际触达谁、成本由谁承担。"),
    howSupports: L("Shapes the incidence and equity sections.", "塑造归宿与公平部分。"),
    institution: "Securities Times 证券时报", website: "stcn.com", url: "https://stcn.com/article/detail/1324811.html",
    sampleFinding: L("~7.45m riders earned income in a year; nearly half took orders fewer than 30 days.", "约 745 万骑手一年内获得收入；近半全年接单不足 30 天。"), year: "2024",
  },
  {
    name: L("Sharing-economy workforce (macro context)", "共享经济劳动力（宏观背景）"),
    whyMatters: L("Places riders within the wider gig/flexible workforce.", "将骑手置于更广的零工／灵活就业群体中。"),
    howSupports: L("Generalises the case to national policy stakes.", "将案例推广至国家政策层面的意义。"),
    institution: "State Information Center 国��信息中心", website: "sic.gov.cn", url: "https://www.sic.gov.cn/sic/93/552/557/0223/10741.pdf",
    sampleFinding: L("~84m sharing-economy service providers; ~840m participants (2022).", "共享经济服务提供者约 8,400 万；参与者约 8.4 亿（2022）。"), year: "2023",
  },
  {
    name: L("ILO comparative social-protection data", "ILO 社会保护比较数据"),
    whyMatters: L("Benchmarks China against global gig-protection models.", "将中国与全球零工保护模式作对照。"),
    howSupports: L("Supports comparative-policy and proposal-design sections.", "支撑比较政策与方案设计部分。"),
    institution: "ILO 国际劳工组织", website: "ilo.org", url: "https://www.ilo.org/sites/default/files/wcmsp5/groups/public/@asia/@ro-bangkok/@ilo-beijing/documents/publication/wcms_861984.pdf",
    sampleFinding: L("Analyses pension/medical coverage gaps for platform workers and the limits of voluntary enrolment.", "分析平台从业者养老／医疗覆盖缺口及自愿参保的局限。"), year: "2023",
  },
];

/** 12 genuinely relevant papers/reports. */
export const deliveryPapers: CasePaper[] = [
  {
    citation: "Manning, A. (2003). Monopsony in Motion. Princeton UP.", authors: "Alan Manning", year: "2003",
    finding: L("Search frictions give employers wage-setting power, so wages sit below marginal product.", "搜寻摩擦赋予雇主工资设定权，使工资低于边际产出。"),
    helps: L("Foundation for arguing a mandate need not cut jobs if platforms have monopsony power.", "若平台具买方垄断势力，强制未必减少就业——这是该论点的基础。"),
    extract: L("The labour-supply elasticity to the firm is finite and often low, so firms capture surplus.", "对企业的劳动供给弹性有限且常偏低，故企业攫取剩余。"),
    url: "https://personal.lse.ac.uk/manning/work/mimintro.pdf",
  },
  {
    citation: "Card, D. & Krueger, A. (1994). Minimum Wages and Employment. AER 84(4).", authors: "David Card, Alan Krueger", year: "1994",
    finding: L("New Jersey's minimum-wage rise produced no employment fall vs Pennsylvania.", "新泽西最低工资上调相较宾州未导致就业下降。"),
    helps: L("Canonical evidence that raising labour costs in low-wage services need not cut jobs.", "在低薪服务业提高用工成本未必减少就业的经典证据。"),
    extract: L("Contiguous-market difference-in-differences is itself a template for evaluating rider reform.", "相邻市场双重差分本身即评估骑手改革的范本。"),
    url: "https://davidcard.berkeley.edu/papers/njmin-aer.pdf",
  },
  {
    citation: "Dube, A., Lester, T.W. & Reich, M. (2010). Minimum Wage Effects Across State Borders. REStat 92(4).", authors: "Dube, Lester, Reich", year: "2010",
    finding: L("Border-county design finds earnings rise with no significant disemployment.", "边界县设计发现收入上升且无显著失业。"),
    helps: L("Strengthens the 'cost falls on rents, not jobs' argument with stronger identification.", "以更强识别强化“成本落在租金而非就业”的论点。"),
    extract: L("Spatial controls reveal earlier negative estimates were driven by regional trends.", "空间控制揭示早前负估计源于地区趋势。"),
    url: "https://irle.berkeley.edu/wp-content/uploads/2010/11/Minimum-Wage-Effects-Across-State-Borders.pdf",
  },
  {
    citation: "Azar, J., Marinescu, I. & Steinbaum, M. (2022). Labor Market Concentration. JHR 57(S).", authors: "Azar, Marinescu, Steinbaum", year: "2022",
    finding: L("Most US labour markets are highly concentrated; concentration lowers wages.", "多数美国劳动市场高度集中；集中度降低工资。"),
    helps: L("Empirical proof of employer power — applies to the Meituan/Ele.me near-duopoly.", "雇主势力的实证——适用于美团／饿了么近双寡头。"),
    extract: L("A 10% rise in concentration links to a 0.3–1% wage decline.", "集中度上升 10% 与工资下降 0.3–1% 相关。"),
    url: "https://www.nber.org/papers/w24147",
  },
  {
    citation: "Naidu, S., Posner, E. & Weyl, G. (2018). Antitrust Remedies for Labor Market Power. Harvard Law Review 132.", authors: "Naidu, Posner, Weyl", year: "2018",
    finding: L("Where monopsony depresses wages and employment, mandated standards can raise both.", "当买方垄断压低工资与就业时，强制标准可同时提高二者。"),
    helps: L("Bridges monopsony theory to policy — justifies mandates as a corrective, not a distortion.", "把买方垄断理论与政策联系起来——将强制论证为纠正而非扭曲。"),
    extract: L("A binding standard under monopsony is the opposite of the competitive prediction.", "买方垄断下的约束性标准与竞争预测相反。"),
    url: "https://harvardlawreview.org/print/vol-132/antitrust-remedies-for-labor-market-power/",
  },
  {
    citation: "Summers, L. (1989). Some Simple Economics of Mandated Benefits. AER 79(2).", authors: "Lawrence Summers", year: "1989",
    finding: L("A valued mandated benefit is shifted into wages, causing far less disemployment than a tax.", "被重视的强制福利转嫁进工资，造成的失业远小于税收。"),
    helps: L("The single most important theory paper for the 'who pays' section.", "“谁来付”部分最重要的单篇理论文献。"),
    extract: L("The labour-market consequences of mandated benefits are more benign than a tax.", "强制福利的劳动市场后果比税收更温和。"),
    url: "https://eml.berkeley.edu/~saez/course131/Summers89.pdf",
  },
  {
    citation: "Gruber, J. (1994). The Incidence of Mandated Maternity Benefits. AER 84(3).", authors: "Jonathan Gruber", year: "1994",
    finding: L("Mandated maternity benefits shifted almost fully onto targeted groups' wages, with little job loss.", "强制产假福利几乎完全转嫁至目标群体工资，几乎无就业损失。"),
    helps: L("The key empirical incidence study — expect wage-shifting, not layoffs.", "关键的归宿实证——预期工资转嫁而非裁员。"),
    extract: L("'Full shifting' of group-specific mandate costs to group-specific wages.", "群体特定强制成本向群体特定工资“完全转嫁”。"),
    url: "https://pricetheory.uchicago.edu/levitt/Papers/Gruber1994.pdf",
  },
  {
    citation: "Mas, A. & Pallais, A. (2017). Valuing Alternative Work Arrangements. AER 107(12).", authors: "Alexandre Mas, Amanda Pallais", year: "2017",
    finding: L("Workers value schedule flexibility only modestly (~8% of wages) and dislike employer-controlled hours.", "劳动者对排班灵活性估值有限（约 8% 工资），且厌恶雇主控制的工时。"),
    helps: L("Counters 'riders choose flexibility over benefits' — flexibility is valued less than claimed.", "反驳“骑手选择灵活而非福利”——灵活性的价值低于宣称。"),
    extract: L("Willingness-to-pay for flexibility is small relative to stable income and benefits.", "对灵活性的支付意愿相对稳定收入与福利而言较小。"),
    url: "https://www.aeaweb.org/articles?id=10.1257/aer.20161500",
  },
  {
    citation: "Chen, Chevalier, Rossi & Oehlsen (2019). The Value of Flexible Work: Uber Drivers. JPE 127(6).", authors: "Chen, Chevalier, Rossi, Oehlsen", year: "2019",
    finding: L("Drivers earn about double the surplus from flexible scheduling vs fixed hours.", "灵活排班相较固定工时使司机剩余约翻倍。"),
    helps: L("The strongest pro-flexibility evidence — the essay must engage it (design portable cover).", "支持灵活性的最强证据——论文须正面回应（设计可携带覆盖）。"),
    extract: L("Surplus from on-demand scheduling is large for the marginal driver.", "即时排班对边际司机的剩余很大。"),
    url: "https://www.nber.org/papers/w23296",
  },
  {
    citation: "Lei, Y.-W. (2021). Delivering Solidarity. American Sociological Review 86(2).", authors: "Ya-Wen Lei", year: "2021",
    finding: L("Chinese delivery algorithms function as a managerial regime while riders bear the risk.", "中国外卖算法充当管理体制，而风险由骑手承担。"),
    helps: L("Documents 'control without protection' — the normative core of the mandate argument.", "记录“有控制无保护”——强制论证的规范性核心。"),
    extract: L("The algorithm directs the labour process; riders absorb accident and penalty risk.", "算法主导劳动过程；骑手承担事故与处罚风险。"),
    url: "https://journals.sagepub.com/doi/10.1177/0003122420979980",
  },
  {
    citation: "ILO (2023). Digital Labour Platforms and National Employment Policies in China: Food Delivery (WP 099).", authors: "International Labour Organization", year: "2023",
    finding: L("Documents China's 2021 guidance, the 'new employment forms' category and injury-insurance pilots.", "记录中国 2021 指导意见、“新就业形态”类别与工伤保险试点。"),
    helps: L("The most current institutional detail on China's actual reforms to evaluate.", "可供评估的中国实际改革最新制度细节。"),
    extract: L("'New employment forms' (新就业形态) is the emerging regulatory category for platform workers.", "“新就业形态”是平台劳动者新兴的监管类别。"),
    url: "https://webapps.ilo.org/static/english/intserv/working-papers/wp099/index.html",
  },
  {
    citation: "Can a voluntarist approach extend protection to gig workers? China food delivery (2024).", authors: "(peer-reviewed study)", year: "2024",
    finding: L("Voluntary, opt-in schemes fail to lift coverage among Chinese riders due to cost and incentive barriers.", "因成本与激励障碍，自愿、选择性方案未能提升中国骑手覆盖。"),
    helps: L("Directly answers the counterfactual: without a mandate, coverage stays low.", "直接回答反事实：无强制则覆盖持续偏低。"),
    extract: L("Take-up failure under voluntarism justifies a mandatory design.", "自愿下的参保失败为强制设计提供正当性。"),
    url: "https://www.researchgate.net/publication/382577021",
  },
];
