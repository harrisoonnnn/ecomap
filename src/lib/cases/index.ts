import type { CaseStudy } from "./types";
import { evTariffs } from "./ev-tariffs";
import { deliveryWorkersV3 } from "./delivery-v3";
import { buildGenericCase } from "./generic";
import { getNews } from "@/lib/data/news";
import type { NewsCategory } from "@/types";

/** Hand-authored hero cases (richest content). */
const HERO: Record<string, CaseStudy> = {
  "ev-tariffs": evTariffs,
  "delivery-workers": deliveryWorkersV3,
};

/** keyword → category for free-form assistant prompts not in the news feed. */
function guessCategory(id: string, eventEn: string): NewsCategory {
  const h = `${id} ${eventEn}`.toLowerCase();
  if (/tariff|trade|export|import|comparative|关税|贸易|出口|进口/.test(h)) return "trade";
  if (/rider|gig|worker|wage|labour|labor|employ|union|外卖|骑手|工资|就业|劳动|工人|用工/.test(h)) return "labour";
  if (/\bai\b|robot|automat|chip|semiconductor|platform|tech|人工智能|自动化|机器人|芯片|半导体|平台/.test(h)) return "tech";
  if (/bank|finance|credit|debt|stock|invest|银行|金融|信贷|债务|股市|投资/.test(h)) return "finance";
  if (/carbon|climate|emission|green|sustain|energy|碳|气候|排放|环保|绿色|能源/.test(h)) return "sustainability";
  if (/hous|rent|land|property|住房|租金|房价|房地产|土地/.test(h)) return "policy";
  if (/inflation|rate|fed|monetary|gdp|macro|opec|通胀|利率|货币|宏观|经济增长/.test(h)) return "macro";
  if (/develop|poverty|aid|imf|发展|贫困|援助/.test(h)) return "development";
  return "policy";
}

/**
 * Deterministic, cached case retrieval. The same id always returns the same
 * content (article consistency) unless `salt` is bumped by an explicit regenerate.
 *
 * `eventOverride` lets the Research Assistant analyse an arbitrary typed topic:
 * the exact prompt becomes the event title and drives theory/category selection.
 */
export function getCase(
  id: string,
  salt = 0,
  eventOverride?: { en: string; zh: string }
): CaseStudy {
  if (salt === 0 && HERO[id] && !eventOverride) return HERO[id];

  const news = getNews(id);
  const event =
    eventOverride ??
    news?.headline ?? {
      en: id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      zh: id.replace(/-/g, " "),
    };
  const category = news?.category ?? guessCategory(id, event.en);
  return buildGenericCase(id, event, category, salt);
}

export type { CaseStudy } from "./types";
