import type { NewsCategory, NewsItem } from "@/types";
import type { DictKey } from "@/lib/i18n/dictionaries";

export const CATEGORY_META: Record<
  NewsCategory,
  { key: DictKey; color: string; emoji: string }
> = {
  macro: { key: "cat.macro", color: "blue", emoji: "📊" },
  finance: { key: "cat.finance", color: "purple", emoji: "💹" },
  labour: { key: "cat.labour", color: "cyan", emoji: "👷" },
  development: { key: "cat.development", color: "green", emoji: "🌍" },
  tech: { key: "cat.tech", color: "amber", emoji: "🤖" },
  trade: { key: "cat.trade", color: "rose", emoji: "🚢" },
  policy: { key: "cat.policy", color: "slate", emoji: "⚖" },
  sustainability: { key: "cat.sustainability", color: "green", emoji: "🌱" },
};

export const NEWS: NewsItem[] = [
  // ---------- TODAY / VERY RECENT ----------
  {
    id: "ev-tariffs", category: "trade",
    headline: { en: "US raises tariffs on Chinese electric vehicles to 100%", zh: "美国将中国电动汽车关税上调至 100%" },
    source: "Reuters", publisher: "Reuters", url: "https://www.reuters.com/business/autos-transportation/", date: "2026-06-11", region: "US · China",
    summary: { en: "Washington quadruples duties on imported Chinese EVs, citing overcapacity and national security. Automakers and consumers brace for price effects.", zh: "华盛顿将进口中国电动车关税提高四倍，理由是产能过剩与国家安全。车企与消费者正应对价格冲击。" },
  },
  {
    id: "fed-hold", category: "macro",
    headline: { en: "Federal Reserve holds rates as sticky services inflation persists", zh: "服务业通胀粘性持续，美联储维持利率不变" },
    source: "Financial Times", publisher: "The Financial Times", url: "https://www.ft.com/us-economy", date: "2026-06-12", region: "United States",
    summary: { en: "The FOMC keeps the policy rate at 4.25–4.50%, signalling patience as core services inflation proves slow to cool.", zh: "联邦公开市场委员会将政策利率维持在 4.25–4.50%，在核心服务通胀缓慢降温之际保持耐心。" },
  },
  {
    id: "delivery-workers", category: "labour",
    headline: { en: "China moves to extend social insurance to food-delivery riders", zh: "中国拟将社会保险扩展至外卖骑手" },
    source: "Caixin", publisher: "Caixin Global", url: "https://www.caixinglobal.com/", date: "2026-06-11", region: "China",
    summary: { en: "New rules would require platforms to contribute to pensions and injury insurance for millions of gig riders, reshaping platform labour economics.", zh: "新规将要求平台为数百万零工骑手缴纳养老金与工伤保险，重塑平台用工经济。" },
  },
  {
    id: "ai-layoffs", category: "tech",
    headline: { en: "Generative AI linked to first measurable dip in entry-level hiring", zh: "生成式 AI 与入门级岗位招聘首次出现可测下滑相关" },
    source: "The Economist", publisher: "The Economist", url: "https://www.economist.com/finance-and-economics", date: "2026-06-12", region: "Global",
    summary: { en: "New labour-market data suggests AI tools are substituting for routine cognitive tasks, raising questions about human capital and reskilling.", zh: "最新劳动力市场数据显示，AI 工具正替代常规认知任务，引发对人力资本与再培训的讨论。" },
  },
  {
    id: "ecb-cut", category: "macro",
    headline: { en: "ECB cuts rates 25bp as euro-area growth stalls", zh: "欧元区增长停滞，欧洲央行降息 25 个基点" },
    source: "Bloomberg", publisher: "Bloomberg", url: "https://www.bloomberg.com/europe", date: "2026-06-12", region: "Eurozone",
    summary: { en: "The European Central Bank eases policy as manufacturing weakens, diverging from a more cautious Federal Reserve.", zh: "在制造业走弱之际，欧洲央行放松政策，与更谨慎的美联储出现分化。" },
  },
  {
    id: "nvidia-export", category: "tech",
    headline: { en: "New curbs tighten advanced-chip exports to data centres abroad", zh: "新规收紧对海外数据中心的先进芯片出口" },
    source: "Nikkei Asia", publisher: "Nikkei Asia", url: "https://asia.nikkei.com/Business/Technology", date: "2026-06-10", region: "US · Asia",
    summary: { en: "Tighter export rules on AI accelerators test the economics of industrial policy, supply chains and comparative advantage in semiconductors.", zh: "对 AI 加速器更严的出口规则，检验着半导体领域产业政策、供应链与比较优势的经济逻辑。" },
  },

  // ---------- RECENT ----------
  {
    id: "carbon-border", category: "sustainability",
    headline: { en: "EU carbon border tax enters full enforcement phase", zh: "欧盟碳边境税进入全面执行阶段" },
    source: "Bloomberg", publisher: "Bloomberg Green", url: "https://www.bloomberg.com/green", date: "2026-06-05", region: "European Union",
    summary: { en: "CBAM now charges importers for embedded emissions in steel, cement and aluminium, with ripple effects across global supply chains.", zh: "碳边境调节机制（CBAM）开始对钢铁、水泥与铝的隐含排放征费，波及全球供应链。" },
  },
  {
    id: "housing-affordability", category: "policy",
    headline: { en: "Cities pilot land-value taxes to tackle housing affordability", zh: "多城市试点土地价值税以应对住房可负担性" },
    source: "The Guardian", publisher: "The Guardian", url: "https://www.theguardian.com/business/economics", date: "2026-06-04", region: "UK · Australia",
    summary: { en: "Several municipalities trial Georgist land taxes to curb speculation and fund infrastructure without distorting development.", zh: "数个城市试行乔治主义土地税，以遏制投机并为基础设施融资，同时尽量不扭曲开发。" },
  },
  {
    id: "africa-fintech", category: "development",
    headline: { en: "Mobile-money lending boom raises over-indebtedness fears in East Africa", zh: "移动金融放贷热潮引发东非过度负债担忧" },
    source: "Rest of World", publisher: "Rest of World", url: "https://restofworld.org/", date: "2026-06-03", region: "Kenya · Tanzania",
    summary: { en: "Rapid growth of app-based microloans expands financial inclusion but regulators warn of predatory rates and debt traps.", zh: "基于 App 的小额贷款快速增长扩大了金融普惠，但监管者警告掠夺性利率与债务陷阱。" },
  },
  {
    id: "bank-stress", category: "finance",
    headline: { en: "Regional bank stress returns as commercial real estate loans sour", zh: "商业地产贷款恶化，区域银行压力重现" },
    source: "Wall Street Journal", publisher: "The Wall Street Journal", url: "https://www.wsj.com/finance/banking", date: "2026-06-02", region: "United States",
    summary: { en: "Falling office valuations pressure mid-sized lenders, reviving debate over deposit insurance and systemic risk.", zh: "写字楼估值下跌令中型银行承压，重新引发对存款保险与系统性风险的讨论。" },
  },
  {
    id: "min-wage", category: "labour",
    headline: { en: "Seoul debates a 12% minimum-wage rise amid automation concerns", zh: "首尔在自动化担忧中讨论最低工资上调 12%" },
    source: "Korea Herald", publisher: "The Korea Herald", url: "https://www.koreaherald.com/", date: "2026-06-01", region: "South Korea",
    summary: { en: "Unions push for higher pay while small businesses warn of job cuts and accelerated automation in services.", zh: "工会推动提薪，小企业则警告将裁员并加速服务业自动化。" },
  },
  {
    id: "chip-subsidy", category: "tech",
    headline: { en: "India unveils $15bn semiconductor subsidy to localise chip supply", zh: "印度公布 150 亿美元半导体补贴以实现芯片本地化" },
    source: "Nikkei Asia", publisher: "Nikkei Asia", url: "https://asia.nikkei.com/Business/Tech/Semiconductors", date: "2026-05-30", region: "India",
    summary: { en: "New Delhi bets on industrial policy to attract fabs, testing the limits of subsidy-led development and infant-industry theory.", zh: "新德里押注产业政策以吸引晶圆厂，检验补贴主导发展与幼稚产业理论的边界。" },
  },
  {
    id: "rent-control", category: "policy",
    headline: { en: "Berlin revisits rent caps as affordability crisis deepens", zh: "可负担性危机加深，柏林重启租金管制讨论" },
    source: "Deutsche Welle", publisher: "Deutsche Welle", url: "https://www.dw.com/en/business/", date: "2026-05-29", region: "Germany",
    summary: { en: "A renewed push for rent ceilings reignites the classic debate over price controls, housing supply and unintended shortages.", zh: "重新推动租金上限，再度点燃关于价格管制、住房供给与非预期短缺的经典辩论。" },
  },
  {
    id: "imf-debt", category: "development",
    headline: { en: "IMF warns one in three low-income nations near debt distress", zh: "IMF 警告三分之一低收入国家接近债务困境" },
    source: "IMF", publisher: "International Monetary Fund", url: "https://www.imf.org/en/News", date: "2026-05-28", region: "Global South",
    summary: { en: "Rising debt-service costs crowd out health and education spending, reigniting calls for restructuring frameworks.", zh: "上升的偿债成本挤出医疗与教育支出，重新引发对重组框架的呼吁。" },
  },
  {
    id: "opec-cut", category: "macro",
    headline: { en: "OPEC+ extends output cuts, testing global disinflation", zh: "OPEC+ 延长减产，考验全球去通胀进程" },
    source: "Reuters", publisher: "Reuters", url: "https://www.reuters.com/markets/commodities/", date: "2026-05-27", region: "Global",
    summary: { en: "Producers defend prices as demand softens, with implications for headline inflation and central-bank timing.", zh: "在需求走软之际，产油国捍卫油价，影响整体通胀与央行时点选择。" },
  },
  {
    id: "gig-eu", category: "labour",
    headline: { en: "EU platform-work directive reclassifies millions of gig workers", zh: "欧盟平台工作指令将数百万零工重新归类" },
    source: "Politico Europe", publisher: "Politico Europe", url: "https://www.politico.eu/section/economy/", date: "2026-05-26", region: "European Union",
    summary: { en: "New presumption-of-employment rules could grant gig workers benefits — and reshape platform business models.", zh: "新的“雇佣推定”规则可能赋予零工福利，并重塑平台商业模式。" },
  },
  {
    id: "green-hydrogen", category: "sustainability",
    headline: { en: "Subsidy race heats up over green-hydrogen production credits", zh: "绿色氢能生产补贴竞赛升温" },
    source: "Bloomberg", publisher: "Bloomberg Green", url: "https://www.bloomberg.com/green", date: "2026-05-24", region: "Global",
    summary: { en: "Competing national subsidies for clean hydrogen test industrial policy, learning curves and the economics of decarbonisation.", zh: "各国对清洁氢能的竞争性补贴，检验着产业政策、学习曲线与脱碳经济学。" },
  },

  // ---------- IMPORTANT PAST ----------
  {
    id: "svb-collapse", category: "finance",
    headline: { en: "Lessons from the 2023 bank failures still shape deposit policy", zh: "2023 年银行倒闭的教训仍在塑造存款政策" },
    source: "The Economist", publisher: "The Economist", url: "https://www.economist.com/finance-and-economics", date: "2025-12-15", region: "United States",
    summary: { en: "A landmark episode in bank runs, maturity mismatch and moral hazard — a rich case for the Diamond–Dybvig model.", zh: "银行挤兑、期限错配与道德风险的标志性事件——戴蒙德—迪布维格模型的丰富案例。" },
  },
  {
    id: "minwage-seattle", category: "labour",
    headline: { en: "A decade on, Seattle's $15 minimum wage still divides economists", zh: "十年之后，西雅图 15 美元最低工资仍令经济学家分歧" },
    source: "NBER", publisher: "National Bureau of Economic Research", url: "https://www.nber.org/papers", date: "2025-11-02", region: "United States",
    summary: { en: "A canonical natural experiment on minimum wages, monopsony and employment effects — endlessly re-analysed.", zh: "关于最低工资、买方垄断与就业效应的经典自然实验——被反复重新分析。" },
  },
  {
    id: "brexit-trade", category: "trade",
    headline: { en: "Brexit's long-run trade effects: the evidence a decade later", zh: "脱欧的长期贸易效应：十年后的证据" },
    source: "CEPR", publisher: "Centre for Economic Policy Research", url: "https://cepr.org/", date: "2025-09-20", region: "United Kingdom",
    summary: { en: "A natural experiment in trade barriers, gravity effects and the costs of friction — ideal for difference-in-differences.", zh: "贸易壁垒、引力效应与摩擦成本的自然实验——非常适合双重差分。" },
  },
];

export function getNews(id: string): NewsItem | undefined {
  return NEWS.find((n) => n.id === id);
}

/** Group news by recency for the news page (today / recent / past). */
export function newsByRecency(todayISO = "2026-06-12") {
  const today = new Date(todayISO).getTime();
  const day = 86400000;
  const groups = { today: [] as NewsItem[], recent: [] as NewsItem[], past: [] as NewsItem[] };
  for (const n of NEWS) {
    const age = (today - new Date(n.date).getTime()) / day;
    if (age <= 2) groups.today.push(n);
    else if (age <= 30) groups.recent.push(n);
    else groups.past.push(n);
  }
  return groups;
}
