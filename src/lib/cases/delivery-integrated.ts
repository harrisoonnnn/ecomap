import { L, LS, type CaseIntegratedArgument } from "./types";

/**
 * The synthesis layer: each argument visibly inherits a theory, a mathematical
 * method, a dataset and a paper from the earlier sections, then shows the full
 * writing logic chain from claim to mini-conclusion.
 */
export const deliveryIntegratedArguments: CaseIntegratedArgument[] = [
  {
    n: 1,
    coreClaim: L(
      "Mandating platform contributions to riders' social insurance need not cause large job losses, because China's delivery market is monopsonistic.",
      "强制平台为骑手缴纳社会保险不必然造成大规模失业，因为中国外卖市场具买方垄断性。"
    ),
    theory: L("Labour Market Theory with Monopsony", "含买方垄断的劳动力市场理论"),
    theoryApply: LS(
      ["Meituan + Ele.me ≈ duopoly buyers of rider labour", "美团＋饿了么 ≈ 骑手劳动的双寡头买方"],
      ["Riders face few alternative employers → low labour-supply elasticity to the platform", "骑手少有替代雇主 → 对平台的劳动供给弹性低"],
      ["Platforms set pay below marginal product, earning rents", "平台将薪酬定在边际产出之下，赚取租金"],
      ["A mandated cost can come out of those rents, not employment", "强制成本可来自这些租金，而非就业"],
    ),
    mathMethod: L("Difference-in-Differences (DiD)", "双重差分（DiD）"),
    mathSupports: {
      collect: L("Rider headcount and earnings in the 7 pilot provinces vs non-pilot provinces, before and after the 2022 injury-insurance pilot.", "2022 年工伤保险试点前后，7 个试点省份对非试点省份的骑手人数与收入。"),
      relationship: L("Test whether employment fell in treated provinces relative to controls after the mandate.", "检验强制后处理省份的就业相对对照组是否下降。"),
      result: L("A near-zero treated-vs-control employment gap (β₃ ≈ 0) would confirm the monopsony prediction and refute the job-loss objection.", "处理组与对照组就业差接近零（β₃ ≈ 0）将证实买方垄断预测、反驳就业损失论。"),
    },
    evidence: L("Occupational-injury pilot enrolment (Beijing Daily): 6.68m in 2023 → 12.35m by mid-2025, with no reported collapse in rider numbers.", "职业伤害保障试点参保（北京日报）：2023 年 668 万 → 2025 年中 1,234.57 万，且未见骑手数量崩塌。"),
    literature: L("Dube, Lester & Reich (2010) and Card & Krueger (1994): higher labour costs in low-wage services need not cut jobs; Manning (2003) on monopsony.", "Dube、Lester & Reich (2010) 与 Card & Krueger (1994)：低薪服务业更高用工成本未必减少就业；Manning (2003) 论买方垄断。"),
    evaluation: L("The conclusion is conditional on the labour-supply elasticity: strong under monopsony estimates, weaker under competitive assumptions.", "结论取决于劳动供给弹性：在买方垄断估计下成立，在竞争假设下减弱。"),
    miniConclusion: L("So the employment objection is weak where platforms hold wage-setting power — the burden falls largely on rents.", "因此，在平台具工资设定权之处，就业反对意见站不住脚——负担主要落在租金上。"),
    logicChain: LS(
      ["Claim: a mandate won't cause mass layoffs", "主张：强制不会导致大规模裁员"],
      ["Theory: monopsony labour market", "理论：买方垄断劳动市场"],
      ["Mechanism: cost absorbed by platform rents, not jobs", "机制：成本由平台租金吸收，而非就业"],
      ["Evidence: pilot enrolment 6.68m→12.35m, no headcount collapse", "证据：试点参保 668 万→1,234 万，人数未崩塌"],
      ["Math: DiD on 7 pilot vs non-pilot provinces", "数学：对 7 个试点省份与非试点省份做 DiD"],
      ["Literature: Card–Krueger, Dube et al., Manning", "文献：Card–Krueger、Dube 等、Manning"],
      ["Evaluation: depends on labour-supply elasticity", "评估：取决于劳动供给弹性"],
      ["Mini-conclusion: employment objection is weak under monopsony", "小结：买方垄断下就业反对意见站不住脚"],
    ),
  },
  {
    n: 2,
    coreClaim: L(
      "The mandate's cost is shared between platforms, riders and consumers — it is not a pure deadweight tax that destroys welfare.",
      "强制成本由平台、骑手与消费者分担——它并非摧毁福利的纯无谓损失税。"
    ),
    theory: L("Economics of Mandated Benefits (Summers 1989) + Externalities", "强制福利经济学（Summers 1989）＋外部性"),
    theoryApply: LS(
      ["Riders value injury cover → the benefit is not a pure tax", "骑手重视工伤保障 → 该福利并非纯税收"],
      ["Cost partly shifts into pay, partly into fees, partly into rents", "成本部分转嫁进薪酬、部分进费用、部分进租金"],
      ["Uninsured-injury externality on public hospitals is internalised", "对公立医院的未保险工伤外部性被内部化"],
      ["Net efficiency improves if the external cost was real", "若外部成本真实存在，净效率改善"],
    ),
    mathMethod: L("Tax-Incidence / Pass-Through Analysis + Cost–Benefit Analysis", "税收归宿／转嫁分析＋成本收益分析"),
    mathSupports: {
      collect: L("Rider labour-supply elasticity, consumer fee sensitivity, and avoided injury costs from Shanghai accident data.", "骑手劳动供给弹性、消费者费用敏感度，以及由上海事故数据估算的避免工伤成本。"),
      relationship: L("Compute the share borne by each party: Burden_consumers = εS / (εS + εD); then NPV of benefits vs contributions.", "计算各方承担份额：消费者负担 = εS /(εS + εD)；再算收益与缴费的净现值。"),
      result: L("A positive net present value once avoided injury and old-age costs are counted would justify the mandate on efficiency grounds.", "在计入避免的工伤与养老成本后净现值为正，即可从效率角度为强制辩护。"),
    },
    evidence: L("Meituan income range ¥6,650–9,344/month (sets the pay base for incidence); Shanghai deaths −42.9% after safety reform (values the externality).", "美团月收入区间 6,650–9,344 元（归宿的薪酬基准）；上海安全改革后致死 −42.9%（为外部性赋值）。"),
    literature: L("Summers (1989) on wage-shifting; Gruber (1994) empirical full shifting with little job loss.", "Summers (1989) 论工资转嫁；Gruber (1994) 实证完全转嫁且几乎无就业损失。"),
    evaluation: L("Incidence depends on elasticities; if demand is very price-elastic, more cost lands on riders, weakening the equity case.", "归宿取决于弹性；若需求价格弹性很高，更多成本落到骑手，削弱公平论证。"),
    miniConclusion: L("So 'who pays' has a nuanced answer — shared incidence plus an internalised externality, not pure welfare loss.", "因此“谁来付”有一个微妙答案——共担归宿加上被内部化的外部性，而非纯福利损失。"),
    logicChain: LS(
      ["Claim: cost is shared, not a deadweight tax", "主张：成本共担，而非无谓损失税"],
      ["Theory: Summers mandated-benefits + externalities", "理论：Summers 强制福利＋外部性"],
      ["Mechanism: wage-shifting + internalised injury cost", "机制：工资转嫁＋内部化工伤成本"],
      ["Evidence: ¥6,650–9,344 pay base; −42.9% deaths", "证据：6,650–9,344 元薪酬基准；致死 −42.9%"],
      ["Math: pass-through formula + cost–benefit NPV", "数学：转嫁公式＋成本收益净现值"],
      ["Literature: Summers (1989), Gruber (1994)", "文献：Summers (1989)、Gruber (1994)"],
      ["Evaluation: incidence depends on elasticities", "评估：归宿取决于弹性"],
      ["Mini-conclusion: shared incidence, not pure loss", "小结：共担归宿，而非纯损失"],
    ),
  },
  {
    n: 3,
    coreClaim: L(
      "A mandate beats voluntary schemes because riders systematically under-insure, but it should be designed to preserve flexibility.",
      "强制优于自愿方案，因为骑手系统性投保不足；但其设计应保留灵活性。"
    ),
    theory: L("Behavioural Economics (present bias) + Principal–Agent", "行为经济学（现时偏好）＋委托代理"),
    theoryApply: LS(
      ["Present-biased riders under-weight future injury/old-age risk", "具现时偏好的骑手低估未来工伤／养老风险"],
      ["Voluntary take-up therefore stays near zero", "自愿参保因此停留在接近零"],
      ["A default/mandate corrects the bias (like pension auto-enrolment)", "默认／强制纠正该偏见（如养老金自动加入）"],
      ["Design it as portable + per-order to keep flexibility intact", "设计为可携带＋按单，以保持灵活性不变"],
    ),
    mathMethod: L("Regression / take-up analysis (voluntary vs mandatory)", "回归／参保率分析（自愿 对 强制）"),
    mathSupports: {
      collect: L("Coverage rates under voluntary schemes vs the mandatory pilot, controlling for income and city.", "在控制收入与城市下，自愿方案与强制试点的覆盖率。"),
      relationship: L("Estimate how much of the coverage jump is explained by the switch from voluntary to mandatory enrolment.", "估计覆盖率跃升中有多少由“自愿转强制”解释。"),
      result: L("A large, significant mandatory coefficient confirms that present bias — not just cost — drove the take-up failure.", "强制项系数显著且较大，确认是现时偏好（而非仅成本）导致参保失败。"),
    },
    evidence: L("Flexible-worker coverage <40% under voluntarism (State Council report) vs pilot enrolment scaling to 12.35m under the mandate.", "自愿下灵活就业者覆盖率 <40%（国务院报告）对 强制下试点参保增至 1,234 万。"),
    literature: L("Mas & Pallais (2017) — flexibility valued modestly; Chen et al. (2019) — but real flexibility surplus exists; the 2024 voluntarism-failure study.", "Mas & Pallais (2017)——灵活性估值有限；Chen 等 (2019)——但真实存在灵活性剩余；2024 年自愿失败研究。"),
    evaluation: L("The paternalism concern is real, but auto-enrolment with opt-out preserves autonomy while fixing the take-up failure.", "家长式担忧真实存在，但带退出选项的自动加入在纠正参保失败的同时保留自主。"),
    miniConclusion: L("So the design question matters more than the yes/no: a portable, hours-neutral mandate captures the gains without killing flexibility.", "因此设计问题比是否更重要：可携带、与工时无关的强制能在不扼杀灵活性的情况下获取收益。"),
    logicChain: LS(
      ["Claim: mandate beats voluntarism, if well-designed", "主张：若设计得当，强制优于自愿"],
      ["Theory: present bias + principal–agent", "理论：现时偏好＋委托代理"],
      ["Mechanism: default corrects under-insurance", "机制：默认纠正投保不足"],
      ["Evidence: <40% voluntary vs 12.35m mandatory", "证据：自愿 <40% 对 强制 1,234 万"],
      ["Math: take-up regression, voluntary vs mandatory", "数学：参保率回归，自愿 对 强制"],
      ["Literature: Mas–Pallais, Chen et al., voluntarism study", "文献：Mas–Pallais、Chen 等、自愿研究"],
      ["Evaluation: paternalism vs opt-out design", "评估：家长主义 对 退出选项设计"],
      ["Mini-conclusion: portable, hours-neutral mandate wins", "小结：可携带、与工时无关的强制更优"],
    ),
  },
];
