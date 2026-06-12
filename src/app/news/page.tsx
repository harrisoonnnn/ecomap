"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, ExternalLink, MapPin, Search } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { NEWS, CATEGORY_META } from "@/lib/data/news";
import { Badge, GlassCard } from "@/components/ui/primitives";
import type { NewsCategory, NewsItem } from "@/types";
import { cn } from "@/lib/utils";

const TODAY = new Date("2026-06-12").getTime();

export default function NewsPage() {
  const { t, tl, locale } = useI18n();
  const [cat, setCat] = useState<NewsCategory | "all">("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return NEWS.filter((n) => {
      if (cat !== "all" && n.category !== cat) return false;
      if (!q.trim()) return true;
      const hay = `${n.headline[locale]} ${n.summary[locale]} ${n.region} ${n.source} ${n.publisher}`.toLowerCase();
      return hay.includes(q.toLowerCase());
    });
  }, [cat, q, locale]);

  const groups = useMemo(() => {
    const g: Record<string, NewsItem[]> = { today: [], recent: [], past: [] };
    for (const n of filtered) {
      const age = (TODAY - new Date(n.date).getTime()) / 86400000;
      if (age <= 2) g.today.push(n);
      else if (age <= 30) g.recent.push(n);
      else g.past.push(n);
    }
    return g;
  }, [filtered]);

  const cats = Object.keys(CATEGORY_META) as NewsCategory[];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">{t("news.title")}</h1>
        <p className="mt-2 max-w-2xl text-ink-soft">{t("news.subtitle")}</p>
      </motion.div>

      <div className="mt-6 flex items-center gap-2 rounded-2xl border hairline surface px-4 backdrop-blur">
        <Search className="h-4 w-4 text-ink-muted" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("news.search")} className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-ink-muted/70" />
        <span className="text-xs text-ink-muted">{filtered.length} {t("news.results")}</span>
      </div>

      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
        <Chip active={cat === "all"} onClick={() => setCat("all")}>{t("news.all")}</Chip>
        {cats.map((c) => (
          <Chip key={c} active={cat === c} onClick={() => setCat(c)}>
            <span>{CATEGORY_META[c].emoji}</span>{t(CATEGORY_META[c].key)}
          </Chip>
        ))}
      </div>

      {(["today", "recent", "past"] as const).map((grp) =>
        groups[grp].length ? (
          <section key={grp} className="mt-8">
            <div className="mb-3 flex items-center gap-2">
              <span className={cn("h-2 w-2 rounded-full", grp === "today" ? "bg-emerald-400" : grp === "recent" ? "bg-brand-blue" : "bg-ink-muted")} />
              <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-ink-soft">{t(`news.${grp}` as never)}</h2>
              <span className="text-xs text-ink-muted">· {groups[grp].length}</span>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {groups[grp].map((n, i) => <NewsCard key={n.id} n={n} i={i} />)}
            </div>
          </section>
        ) : null
      )}
    </div>
  );
}

function NewsCard({ n, i }: { n: NewsItem; i: number }) {
  const { t, tl } = useI18n();
  const meta = CATEGORY_META[n.category];
  return (
    <motion.div layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (i % 6) * 0.05 }}>
      <GlassCard className="group flex h-full flex-col p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-glass-lg">
        <div className="flex items-center justify-between">
          <Badge color={meta.color as never}><span>{meta.emoji}</span>{t(meta.key)}</Badge>
          <span className="text-xs font-medium text-ink-muted">{n.source}</span>
        </div>
        <Link href={`/workspace/${n.id}`} className="mt-3 flex-1">
          <h3 className="font-display text-base font-semibold leading-snug text-ink transition-colors group-hover:text-brand-deep">{tl(n.headline)}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{tl(n.summary)}</p>
        </Link>
        <div className="mt-3 flex items-center gap-3 text-[11px] text-ink-muted">
          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{n.date}</span>
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{n.region}</span>
        </div>
        <p className="mt-1 text-[11px] text-ink-muted">{t("news.publishedBy")} {n.publisher}</p>
        <div className="mt-3 flex items-center justify-between gap-2 border-t hairline pt-3">
          <a href={n.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs font-medium text-ink-soft hover:text-brand-deep">
            <ExternalLink className="h-3.5 w-3.5" />{t("common.readOriginal")}
          </a>
          <Link href={`/workspace/${n.id}`} className="flex items-center gap-1 text-xs font-semibold text-brand-deep">
            {t("news.open")}<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </GlassCard>
    </motion.div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={cn("flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all", active ? "bg-gradient-to-r from-brand-deep to-brand-purple text-white shadow-md" : "border hairline surface-soft text-ink-soft hover:surface-strong")}>
      {children}
    </button>
  );
}
