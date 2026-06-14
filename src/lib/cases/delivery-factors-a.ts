import { L, LS, type CaseFactor } from "./types";

/**
 * Eight genuinely different, sourced background sections for the delivery-rider
 * social-insurance case. Figures are drawn from real institutions/reports
 * (State Information Center, MOHRSS, Meituan/Ele.me reports, ILO, Shanghai gov).
 * Demo data — verify against the linked primary source before formal citation.
 */
export const deliveryFactors: CaseFactor[] = [
  {
    key: "bg.economic",
    summary: L(
      "Platforms classify riders as contractors, so labour costs exclude pension, medical and injury contributions — shifting risk onto riders and the state.",
      "平台将骑手列为承包人，用工成本因此不含养老、医疗与工伤缴费——把风险转嫁给骑手与国家。"
    ),
    detail: L(
      "China's two delivery giants form a near-duopoly. Meituan reported a monthly average of 3.36 million riders with orders in 2024, and Ele.me reports over 4 million urban riders. High-frequency riders earn roughly ¥6,650–9,344 a month, but contractor status means platforms pay no social-insurance contributions, so the cost of old-age, sickness and injury risk sits with riders themselves and, ultimately, public hospitals and pension funds.",
      "中国两大外卖巨头近乎双寡头。美团 2024 年月均有单骑手 336 万，饿了么城市骑手超 400 万。高频骑手月收入约 6,650–9,344 元，但承包人身份意味着平台不缴社保，养老、疾病与工伤风险的成本由骑手本人、并最终由公立医院与养老基金承担。"
    ),
    sources: [
      { institution: "Meituan 美团", title: L("2024 Corporate Social Responsibility Report", "2024 企业社会责任报告"), year: "2025", url: "https://www.sgpjbg.com/baogao/719316.html", finding: L("Monthly average 3.36m riders with orders; high-frequency monthly income ¥6,650–9,344 (¥11,547 for skilled first-tier-city riders).", "月均有单骑手 336 万；高频骑手月收入 6,650–9,344 元（一线城市熟练骑手达 11,547 元）。") },
      { institution: "Xinhua 新华社", title: L("Ele.me signs first platform algorithm-and-labour agreement", "饿了么签署首份平台算法与劳动规则协议"), year: "2025", url: "https://www.news.cn/tech/20250911/9d96349dd95648dea0e9903b9f99ae0d/c.html", finding: L("Ele.me reports over 4 million urban riders (城市骑士).", "饿了么报告城市骑手（城市骑士）超 400 万。") },
    ],
    statistics: LS(
      ["Meituan: 3.36m monthly active riders with orders (2024)", "美团：月均有单骑手 336 万（2024）"],
      ["High-frequency rider income: ¥6,650–9,344 / month", "高频骑手月收入：6,650–9,344 元"],
      ["~800,000 Meituan riders took orders 260+ days/year (full-time proxy)", "约 80 万美团骑手全年接单 260 天以上（全职代理指标）"],
    ),
    stakeholders: LS(["Riders", "骑手"], ["Platforms (Meituan, Ele.me)", "平台（美团、饿了么）"], ["Public pension & health funds", "公共养老与医疗基金"]),
    whyMatters: L("The uninsured cost of injury and old age doesn't disappear — it is borne privately by riders or publicly by the state, a textbook negative externality of the contractor model.", "工伤与养老的未保险成本并未消失——而是由骑手私人或国家公共承担，是承包人模式的典型负外部性。"),
    whoBenefits: L("Platforms (lower labour cost) and consumers (cheaper delivery) under the status quo.", "现状下平台（更低用工成本）与消费者（更便宜配送）受益。"),
    whoLoses: L("Riders facing uninsured risk, and public systems absorbing accident and old-age costs.", "面临未保险风险的骑手，以及承接事故与养老成本的公共系统。"),
    essayEntry: L("Frame the mandate as internalising an externality — a clean efficiency argument distinct from pure redistribution.", "把强制保险框定为将外部性内部化——一个区别于单纯再分配的清晰效率论证。"),
    essayIdeas: LS(["Model uninsured injury as a negative externality on the state.", "把未保险工伤建模为对国家的负外部性。"]),
    arguments: LS(["A mandate internalises a real social cost the price currently ignores.", "强制规定将价格当前忽略的真实社会成本内部化。"]),
    counterarguments: LS(["If costs pass through to riders' piece-rates, take-home pay may fall.", "若成本转嫁至骑手计件工资，到手收入可能下降。"]),
  },
  {
    key: "bg.political",
    summary: L(
      "Worker welfare and social stability are explicit state priorities; nine ministries jointly drove the 2025 expansion of rider injury insurance.",
      "劳动者福利与社会稳定是明确的国家优先项；九部门共同推动 2025 年骑手工伤保险扩面。"
    ),
    detail: L(
      "Rider protection has become a coordinated, high-level policy priority. The occupational-injury pilot launched in July 2022 across seven provinces and seven platforms; in July 2025 nine central departments — led by MOHRSS with the NDRC, Ministry of Finance, transport, commerce, tax, market-regulation, financial-regulation authorities and the ACFTU — jointly issued a notice to expand it, with nationwide rollout planned for 2026. This reflects both genuine welfare concern and the politics of visible protection for a large, visible workforce.",
      "骑手保护已成为高层协调的政策优先项。职业伤害保障试点于 2022 年 7 月在七省七平台启动；2025 年 7 月，由人社部牵头，会同发改委、财政部、交通运输部、商务部、税务总局、市场监管总局、金融监管总局与全国总工会等九部门联合发文扩面，计划 2026 年全国推开。这既体现真实的福利关切，也体现对庞大且显眼劳动群体进行显性保护的政治考量。"
    ),
    sources: [
      { institution: "State Council 国务院", title: L("Notice on expanding the occupational-injury insurance pilot (nine departments)", "关于扩大职业伤害保障试点的通知（九部门）"), year: "2025", url: "https://www.gov.cn/zhengce/zhengceku/202507/content_7031656.htm", finding: L("Nine central departments jointly expand the pilot; nationwide rollout planned for 2026.", "九个中央部门联合扩大试点；计划 2026 年全国推开。") },
      { institution: "Xinhua 新华社", title: L("Occupational-injury pilot to expand nationwide in 2026", "职业伤害保障试点 2026 年扩至全国"), year: "2025", url: "https://www.news.cn/politics/20250708/984d11941b7448dfa186a0f3fdadb8d4/c.html", finding: L("Confirms nationwide expansion timetable.", "确认全国扩面时间表。") },
    ],
    statistics: LS(
      ["Pilot launched July 2022 in 7 provinces / 7 platforms", "试点 2022 年 7 月在 7 省 / 7 平台启动"],
      ["9 central departments jointly issued the 2025 expansion notice", "9 个中央部门联合发布 2025 扩面通知"],
    ),
    stakeholders: LS(["MOHRSS 人社部", "人社部"], ["Local governments", "地方政府"], ["ACFTU 全国总工会", "全国总工会"]),
    whyMatters: L("Multi-ministry coordination signals the reform is durable, not symbolic — strengthening the case that this is a real natural experiment to analyse.", "多部门协调表明改革具持久性而非象征性——更说明这是一个可供分析的真实自然实验。"),
    whoBenefits: L("Government legitimacy; riders gaining protection.", "政府合法性；获得保护的骑手。"),
    whoLoses: L("Platforms facing new mandated costs and compliance.", "面临新强制成本与合规的平台。"),
    essayEntry: L("Use public-choice theory: who organises and who is dispersed shapes which version of the policy passes.", "运用公共选择理论：谁有组织、谁分散，决定了政策以何种版本通过。"),
    essayIdeas: LS(["Analyse why protection arrived as injury insurance first, not full social insurance.", "分析为何保护先以工伤保险、而非完整社保的形式到来。"]),
    arguments: LS(["Coordinated state backing makes phased, enforceable coverage feasible.", "国家协调支持使分阶段、可执行的覆盖成为可能。"]),
    counterarguments: LS(["Top-down mandates may ignore rider heterogeneity and local cost differences.", "自上而���的强制可能忽视骑手异质性与地方成本差异。"]),
  },
  {
    key: "bg.technological",
    summary: L(
      "Algorithmic dispatch sets pay, routing and penalties with little transparency, creating a principal–agent gap that incentivises unsafe speed.",
      "算法派单在不透明的情况下设定薪酬、路线与处罚，造成委托代理缺口，激励不安全的抢速度。"
    ),
    detail: L(
      "Platforms manage riders through algorithms — dynamic routing, ratings, dispatch and penalty rules — that function as a managerial regime even though riders are formally independent. Ya-Wen Lei's study in the American Sociological Review documents how this architecture controls couriers while pushing accident risk onto them. Pay-per-order incentives reward speed over safety, which is why Shanghai's enforcement data repeatedly ranks delivery platforms top for traffic violations.",
      "平台通过算法管理骑手——动态路线、评分、派单与处罚规则——尽管骑手名义上独立，这套机制实际充当了管理体制。雷雅雯发表于《美国社会学评论》的研究记录了该架构如何控制骑手、同时把事故风险推给他们。按单计酬激励抢速度而非安全，这也是上海执法数据反复将外卖平台列为交通违法之首的原因。"
    ),
    sources: [
      { institution: "American Sociological Review (Ya-Wen Lei)", title: L("Delivering Solidarity: Platform Architecture and Collective Contention in China's Platform Economy", "传递团结：中国平台经济中的平台架构与集体抗争"), year: "2021", url: "https://journals.sagepub.com/doi/10.1177/0003122420979980", finding: L("Algorithmic management controls couriers as a managerial regime while riders bear accident and penalty risk.", "算法管理作为管理体制控制骑手，而骑手承担事故与处罚风险。") },
      { institution: "Shanghai Municipal Government 上海市政府", title: L("'Three-colour safety code' cuts rider traffic-violation deaths", "“三色安全码”降低骑手交通违法死亡"), year: "2025", url: "https://www.shanghai.gov.cn/nw31406/20250715/3fc693dda18a42c6afed55c2f565eef5.html", finding: L("After the safety-code system, rider traffic-violation deaths fell 42.9%.", "实施安全码系统后，骑手交通违法致死下降 42.9%。") },
    ],
    statistics: LS(
      ["Shanghai: delivery platforms ranked #1 (Meituan) and #2 (Ele.me) for traffic violations", "上海：外卖平台交通违法排名第一（美团）、第二（饿了么）"],
      ["Rider traffic-violation deaths −42.9% after Shanghai safety-code reform", "上海安全码改革后骑手交通违法致死 −42.9%"],
    ),
    stakeholders: LS(["Riders", "骑手"], ["Platform algorithm teams", "平台算法团队"], ["Road users / public", "道路使用者与公众"]),
    whyMatters: L("It shows riders are de facto managed like employees but carry the risk of contractors — the asymmetry at the heart of the normative argument for a mandate.", "它表明骑手事实上被像雇员一样管理，却承担承包人的风险——这正是支持强制规定的规范性论证的核心不对称。"),
    whoBenefits: L("Platforms capture efficiency gains from algorithmic control.", "平台从算法控制中获得效率收益。"),
    whoLoses: L("Riders pressured into unsafe speed; the public bears accident costs.", "被迫抢速度的骑手；承担事故成本的公众。"),
    essayEntry: L("Use principal–agent theory to explain why algorithmic pay design produces unsafe outcomes.", "运用委托代理理论解释算法薪酬设计为何导致不安全结果。"),
    essayIdeas: LS(["Link 'control without protection' to the case for reclassification or mandated benefits.", "把“有控制无保护”与重新归类或强制福利的论证联系起来。"]),
    arguments: LS(["If platforms control the labour process, they should bear its risks.", "若平台控制劳动过程，就应承担其风险。"]),
    counterarguments: LS(["Algorithmic flexibility is also what lets riders choose hours freely.", "算法的灵活性也正是让骑手自由选择工时的原因。"]),
  },
];
