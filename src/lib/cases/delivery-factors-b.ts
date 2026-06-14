import { L, LS, type CaseFactor } from "./types";

/** Background factors part B: social, legal, historical, cultural, environmental. */
export const deliveryFactorsB: CaseFactor[] = [
  {
    key: "bg.social",
    summary: L(
      "Coverage is the core social problem: most flexible workers have no pension or medical insurance, and many riders are rural migrants for whom delivery is a low-barrier entry job.",
      "覆盖是核心社会问题：多数灵活就业者无养老或医疗保险，许多骑手是农村流动人口，外卖是其低门槛的入门工作。"
    ),
    detail: L(
      "China has over 240 million flexible workers, and reporting tied to State Council review puts their social-insurance participation below 40%. For riders specifically, voluntary schemes have failed to lift coverage. A large share are inter-provincial migrants who value flexible, credential-free entry — so formalisation must balance new security against the risk of excluding the very people who rely on easy access.",
      "中国有超过 2.4 亿灵活就业者，与国务院审议相关的报道显示其社保参与率不足 40%。就骑手而言，自愿参保方案未能提升覆盖。相当比例为跨省流动人口，看重灵活、无门槛的进入——因此正规化须在新增保障与排斥依赖便捷进入者的风险之间取得平衡。"
    ),
    sources: [
      { institution: "State Council report (via 21st Century Business Herald)", title: L("Low social-security coverage among flexible/platform workers", "灵活就业与平台从业者社保覆盖偏低"), year: "2025", url: "https://www.21jingji.com/article/20251226/herald/15755b6a50446e08a8b7ab52f5710555.html", finding: L("Exploring having platforms bear part of the contribution cost given low coverage among 240m+ flexible workers (<40%).", "鉴于 2.4 亿+灵活就业者覆盖率低（<40%），正探索由平台承担部分缴费成本。") },
      { institution: "ILO 国际劳工组织", title: L("Social security for flexible and platform workers in China", "中国灵活就业人员和平台从业人员的社会保障研究"), year: "2023", url: "https://www.ilo.org/sites/default/files/wcmsp5/groups/public/@asia/@ro-bangkok/@ilo-beijing/documents/publication/wcms_861984.pdf", finding: L("Analyses the pension/medical coverage gap for platform workers and the limits of voluntary enrolment.", "分析平台从业者养老／医疗覆盖缺口及自愿参保的局限。") },
    ],
    statistics: LS(
      ["240m+ flexible workers nationwide; social-insurance participation <40%", "全国 2.4 亿+灵活就业者；社保参与率 <40%"],
      ["Broader 2025 social-insurance pilot covered ~10.37m riders across 7 provinces", "更广的 2025 社保试点覆盖 7 省约 1,037 万骑手"],
    ),
    stakeholders: LS(["Migrant riders", "流动骑手"], ["Rider families", "骑手家庭"], ["Local social-security bureaus", "地方社保局"]),
    whyMatters: L("Low voluntary take-up is the empirical justification for a mandate — without it, coverage stays stuck near zero.", "自愿参保率低是强制规定的实证理由——没有强制，覆盖率将停滞在接近零。"),
    whoBenefits: L("Uninsured riders gaining a safety net.", "获得安全网的未保险骑手。"),
    whoLoses: L("Riders who prize easy entry, if formalisation raises barriers.", "若正规化抬高门槛，看重便捷进入的骑手受损。"),
    essayEntry: L("Contrast flexibility-as-genuine-preference vs flexibility-as-constrained-choice using Mas & Pallais (2017).", "用 Mas & Pallais (2017) 对比“灵活性作为真实偏好”与“灵活性作为受约束选择”。"),
    essayIdeas: LS(["Is flexibility a real preference or the only option available?", "灵活性是真实偏好，还是唯一可得的选项？"]),
    arguments: LS(["Mandatory coverage corrects a take-up failure voluntary schemes cannot.", "强制覆盖纠正了自愿方案无法解决的参保不足。"]),
    counterarguments: LS(["Formalisation could price out casual riders who want low-commitment work.", "正规化可能挤出想要低承诺工作的临时骑手。"]),
  },
  {
    key: "bg.legal",
    summary: L(
      "Employment classification is the legal pivot: riders sit in a 'new employment forms' grey zone between employee and contractor, which determines who owes social insurance.",
      "雇佣身份认定是法律枢纽：骑手处于雇员与承包人之间的“新就业形态”灰色地带，决定了由谁缴纳社保。"
    ),
    detail: L(
      "Chinese labour law ties most social insurance to a recognised labour relationship (劳动关系). Platforms structure rider engagement as a 'cooperative' rather than employment relationship, which historically excluded riders from mandatory coverage. The 2021 multi-ministry guidance created the category of 'new employment forms' (新就业形态), and the occupational-injury pilot is the first benefit decoupled from full employee status — a legal innovation worth analysing.",
      "中国劳动法将大多数社保与受认可的劳动关系挂钩。平台将骑手用工构造为“合作”而非雇佣关系，历来将骑手排除在强制覆盖之外。2021 年多部门指导意见创设了“新就业形态”类别，职业伤害保障试点是首个与完整雇员身份脱钩的待遇——一项值得分析的法律创新。"
    ),
    sources: [
      { institution: "ILO 国际劳工组织", title: L("Digital Labour Platforms and Labour Protection in China (WP)", "中国数字劳动平台与劳动保护（工作论文）"), year: "2020", url: "https://webapps.ilo.org/static/english/intserv/working-papers/wp011/index.html", finding: L("The 'labour relationship vs cooperative relationship' distinction in Chinese law decides social-insurance eligibility.", "中国法中“劳动关系 对 合作关系”的区分决定社保资格。") },
      { institution: "ILO 国际劳工组织", title: L("Digital Labour Platforms and National Employment Policies in China: Food Delivery (WP 099)", "中国数字劳动平台与国家就业政策：外卖（工作论文 099）"), year: "2023", url: "https://webapps.ilo.org/static/english/intserv/working-papers/wp099/index.html", finding: L("Documents the 2021 guidance and 'new employment forms' (新就业形态) regulatory category and injury-insurance pilots.", "记录 2021 指导意见、“新就业形态”监管类别与工伤保险试点。") },
    ],
    statistics: LS(
      ["2021: multi-ministry guidance creates 'new employment forms' category", "2021：多部门指导意见创设“新就业形态”类别"],
      ["Occupational-injury pilot = first benefit decoupled from full employee status", "职业伤害保障试点＝首个与完整雇员身份脱钩的待遇"],
    ),
    stakeholders: LS(["Labour courts", "劳动法院"], ["Platforms' legal teams", "平台法务团队"], ["MOHRSS rule-makers", "人社部规则制定者"]),
    whyMatters: L("If riders are reclassified as employees, full social-insurance obligations follow automatically — so classification is the lever the whole debate turns on.", "若骑手被重新归类为雇员，完整社保义务将自动随之而来——因此身份认定是整场辩论的支点。"),
    whoBenefits: L("Riders, under employee status; clarity for courts.", "雇员身份下的骑手；法院获得明确性。"),
    whoLoses: L("Platforms facing full payroll obligations under reclassification.", "重新归类下面临完整社保义务的平台。"),
    essayEntry: L("Argue whether a distinct third 'dependent contractor' status fits gig work better than a binary.", "论证是否设立第三类“从属承包人”身份比二分法更契合零工。"),
    essayIdeas: LS(["Evaluate the 'new employment forms' category as a regulatory innovation.", "评价“新就业形态”类别作为监管创新。"]),
    arguments: LS(["A tailored legal category lets protection expand without forcing full reclassification.", "量身定制的法律类别可在不强制完全重新归类的情况下扩大保护。"]),
    counterarguments: LS(["Grey-zone status can let platforms avoid the obligations of real control.", "灰色地带身份可能让平台规避其实际控制所对应的义务。"]),
  },
  {
    key: "bg.historical",
    summary: L(
      "Platform delivery scaled from niche to a ~tens-of-millions workforce in a decade, outpacing a social-insurance system built around stable, single-employer urban jobs.",
      "外卖平台在十年间从小众扩张为数千万规模的劳动大军，超出了围绕稳定、单一雇主城市岗位建立的社保体系。"
    ),
    detail: L(
      "App-based delivery grew explosively from the mid-2010s, built on contractor classification. The State Information Center's sharing-economy reports tracked tens of millions of service providers entering the model. China's social-insurance system, designed for the danwei-era stable employment relationship, was never built for workers who switch platforms, cities and tasks — creating the structural mismatch the current reforms are trying to fix.",
      "基于 App 的外卖自 2010 年代中期爆发式增长，建立在承包人身份之上。国家信息中心的共享经济报告追踪到数千万服务提供者进入该模式。中国的社保体系为“单位时代”稳定雇佣关系而设计，从未为在平台、城市与任务间切换的劳动者建立——由此形成当前改革试图修复的结构性错配。"
    ),
    sources: [
      { institution: "State Information Center 国家信息中心", title: L("China Sharing Economy Development Report (2023)", "中国共享经济发展报告（2023）"), year: "2023", url: "https://www.sic.gov.cn/sic/93/552/557/0223/10741.pdf", finding: L("~84 million service providers in the sharing economy (2022); ~6.31m platform-company employees.", "2022 年共享经济服务提供者约 8,400 万；平台企业员工约 631 万。") },
    ],
    statistics: LS(
      ["~84 million sharing-economy service providers (2022)", "共享经济服务提供者约 8,400 万（2022）"],
      ["Sharing-economy participants ~840 million", "共享经济参与者约 8.4 亿"],
    ),
    stakeholders: LS(["Economic historians", "经济史学者"], ["Policy reformers", "政策改革者"]),
    whyMatters: L("The speed of growth explains why coverage lagged — the workforce arrived faster than the institutions could adapt.", "增长之快解释了覆盖为何滞后——劳动力大军到来的速度超过了制度的适应速度。"),
    whoBenefits: L("Consumers and platforms during the rapid-growth phase.", "快速增长阶段的消费者与平台。"),
    whoLoses: L("Riders left outside a safety net designed for an earlier labour model.", "被排除在为更早劳动模式设计的安全网之外的骑手。"),
    essayEntry: L("Use the institutional-lag framing to explain why reform is happening now, not earlier.", "用“制度滞后”框架解释改革为何现在、而非更早发生。"),
    essayIdeas: LS(["Compare with historical formalisation of other informal sectors.", "与其他非正规部门的历史正规化进行比较。"]),
    arguments: LS(["Institutions are catching up to a structural shift in how work is organised.", "制度正在追赶工作组织方式的结构性转变。"]),
    counterarguments: LS(["Rapid mandates risk disrupting a model that delivered jobs and convenience.", "仓促的强制规定有破坏一个曾带来就业与便利的模式的风险。"]),
  },
  {
    key: "bg.cultural",
    summary: L(
      "High-profile rider-injury stories have shifted public sympathy, raising tolerance for slightly higher delivery prices to fund protection.",
      "高曝光的骑手工伤事件改变了公众同情，提高了为筹资保护而略微上调配送价格的容忍度。"
    ),
    detail: L(
      "Viral reporting on riders 'trapped in the system' (困在系统里) reframed couriers from invisible labour to a sympathetic public cause, building social licence for reform. This matters economically: if consumers accept modestly higher fees, more of a mandate's cost can be passed forward rather than squeezing rider pay — changing the incidence calculus.",
      "关于骑手“困在系统里”的爆款报道，把骑手从隐形劳动重新塑造为引发同情的公共议题，为改革建立了社会许可。这在经济上很重要：若消费者接受适度更高的费用，强制规定的成本就更多向前转嫁，而非挤压骑手收入——从而改变归宿计算。"
    ),
    sources: [
      { institution: "Renmin University labour scholars (via Tencent News)", title: L("Calls for platforms to disclose full-time rider numbers and composition", "呼吁平台披露全职骑手数量与构成"), year: "2025", url: "https://news.qq.com/rain/a/20250228A086ZD00", finding: L("Public and academic pressure pushes platforms toward transparency on rider conditions.", "公众与学界压力推动平台公开骑手状况。") },
    ],
    statistics: LS(
      ["'Trapped in the system' reporting reshaped public opinion on riders", "“困在系统里”报道重塑了公众对骑手的看法"],
    ),
    stakeholders: LS(["Consumers", "消费者"], ["Media", "媒体"], ["Public opinion", "公众舆论"]),
    whyMatters: L("Consumer willingness to pay determines how much of the mandate's cost can be passed forward instead of onto riders.", "消费者支付意愿决定了强制规定的成本有多少能向前转嫁、而非落到骑手身上。"),
    whoBenefits: L("Riders, if social norms support higher fees that fund their cover.", "若社会规范支持用更高费用为其参保筹资，骑手受益。"),
    whoLoses: L("Price-sensitive consumers if fees rise.", "若费用上涨，价格敏感的消费者受损。"),
    essayEntry: L("Connect willingness-to-pay to tax-incidence: norms shift who ultimately bears the cost.", "把支付意愿与税收归宿联系起来：规范改变最终由谁承担成本。"),
    essayIdeas: LS(["How do social norms change the pass-through of a mandated cost?", "社会规范如何改变强制成本的转嫁？"]),
    arguments: LS(["Public sympathy creates room to fund cover without cutting rider pay.", "公众同情为在不削减骑手收入下筹资参保创造空间。"]),
    counterarguments: LS(["Stated sympathy may not survive real price increases at checkout.", "口头同情未必能在结账时真实涨价中存续。"]),
  },
  {
    key: "bg.environmental",
    summary: L(
      "Delivery density shapes urban congestion, road safety and emissions; labour-cost changes alter trip volumes and modes.",
      "配送密度影响城市拥堵、道路安全与排放；用工成本变化会改变行程量与方式。"
    ),
    detail: L(
      "Two-wheelers dominate last-mile delivery, so rider behaviour is also an urban-externality question. Shanghai's enforcement and 'three-colour safety code' data show that changing rider incentives measurably affects road-safety outcomes — a reminder that labour policy and urban-externality policy are linked.",
      "两轮车主导最后一公里配送，因此骑手行为也是城市外部性问题。上海的执法与“三色安全码”数据显示，改变骑手激励会明显影响道路安全结果——提醒人们劳动政策与城市外部性政策相互关联。"
    ),
    sources: [
      { institution: "Shanghai Municipal Government 上海市政府", title: L("'Three-colour safety code' road-safety outcomes", "“三色安全码”道路安全成效"), year: "2025", url: "https://www.shanghai.gov.cn/nw31406/20250715/3fc693dda18a42c6afed55c2f565eef5.html", finding: L("Rider traffic-violation deaths fell 42.9% after incentive/monitoring reform.", "激励／监测改革后骑手交通违法致死下降 42.9%。") },
    ],
    statistics: LS(
      ["Rider traffic-violation deaths −42.9% after Shanghai reform", "上海改革后骑手交通违法致死 −42.9%"],
      ["Two-wheelers dominate last-mile delivery", "两轮车主导最后一公里配送"],
    ),
    stakeholders: LS(["City planners", "城市规划者"], ["Road users", "道路使用者"], ["Riders", "骑手"]),
    whyMatters: L("Safer incentive design produces a positive externality — fewer accidents — that strengthens the welfare case for reform.", "更安全的激励设计带来正外部性——更少事故——强化了改革的福利论证。"),
    whoBenefits: L("The public, through safer streets.", "通过更安全街道受益的公众。"),
    whoLoses: L("Possibly platforms, if safety rules slow delivery throughput.", "若安全规则拖慢配送吞吐，平台可能受损。"),
    essayEntry: L("Link labour-incentive reform to a measurable road-safety externality.", "把劳动激励改革与可测量的道路安全外部性联系起来。"),
    essayIdeas: LS(["Quantify the road-safety co-benefit of de-risking rider pay.", "量化弱化骑手收入风险所带来的道路安全协同收益。"]),
    arguments: LS(["Protection that reduces speed pressure yields safety co-benefits.", "降低速度压力的保护带来安全协同收益。"]),
    counterarguments: LS(["These effects are second-order and hard to attribute cleanly.", "这些效应是次级的，难以清晰归因。"]),
  },
];
