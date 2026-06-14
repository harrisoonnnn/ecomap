"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen, Brain, Calculator, ChevronRight, Database, ExternalLink, FileText,
  GitBranch, Landmark, Layers, Library, Map as MapIcon, Scale, ShieldCheck, Sigma, Sparkles, Users,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { getCase } from "@/lib/cases";
import type { CaseTimelineNode } from "@/lib/cases/types";
import { ModuleCard } from "@/components/ui/ModuleCard";
import { Badge, Button, GlassCard, Meter, ScoreRing } from "@/components/ui/primitives";
import { CATEGORY_META, getNews } from "@/lib/data/news";
import { cn } from "@/lib/utils";
import type { DictKey } from "@/lib/i18n/dictionaries";
import {
  Field, MiniList, SH, EssayLevel, TheorySection, MathSection, ChartsSection,
  DatasetsSection, PapersSection, ProposalsV3Section, EssayGuideSection, type Case,
} from "./WorkspaceSections";

type EssayLevelId = "basic" | "advanced" | "research";

const RESEARCH_MODES: { id: string; key: DictKey; d: DictKey; level: EssayLevelId; focus: string[] }[] = [
  { id: "essay", key: "mode.essay", d: "mode.essay.d", level: "advanced", focus: ["summary", "theory", "essay"] },
  { id: "case", key: "mode.case", d: "mode.case.d", level: "advanced", focus: ["summary", "background", "stakeholders", "theory"] },
  { id: "policy", key: "mode.policy", d: "mode.policy.d", level: "advanced", focus: ["stakeholders", "proposals"] },
  { id: "nec", key: "mode.nec", d: "mode.nec.d", level: "research", focus: ["theory", "evidence", "proposals", "essay"] },
  { id: "academic", key: "mode.academic", d: "mode.academic.d", level: "research", focus: ["theory", "math", "literature", "evidence"] },
];

const SECTIONS: { id: string; key: DictKey; icon: React.ElementType }[] = [
  { id: "summary", key: "sec.summary", icon: FileText },
  { id: "background", key: "sec.background", icon: Layers },
  { id: "stakeholders", key: "sec.stakeholders", icon: Landmark },
  { id: "theory", key: "sec.theory", icon: Brain },
  { id: "math", key: "sec.math", icon: Calculator },
  { id: "evidence", key: "sec.evidence", icon: Database },
  { id: "literature", key: "sec.literature", icon: Library },
  { id: "proposals", key: "sec.proposals", icon: Scale },
  { id: "essay", key: "sec.essay", icon: Sigma },
];

export function WorkspaceClient({ id, query }: { id: string; query?: string }) {
  const { t, tl, locale } = useI18n();
  const [mode, setMode] = useState("case");
  const [active, setActive] = useState("summary");

  const override = query ? { en: query, zh: query } : undefined;
  // Research potential is a FIXED expert judgement — no salt, no regeneration.
  const c = useMemo(() => getCase(id, 0, override) as unknown as Case, [id, query]);
  const meta = CATEGORY_META[c.category];
  const news = getNews(id);
  const modeCfg = RESEARCH_MODES.find((m) => m.id === mode)!;

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0 }
    );
    SECTIONS.forEach((s) => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [c]);

  function scrollTo(sid: string) {
    document.getElementById(sid)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function exportAll() {
    const md = `# ${tl(c.event)}\n\n## Summary\n${tl(c.summary.oneLine)}\n\n${tl(c.summary.overview)}\n\n## Essay (Research)\n**RQ:** ${tl(c.essay.research.rq)}\n\n**Thesis:** ${tl(c.essay.research.thesis)}\n\n_Ecomap — demo data._`;
    const url = URL.createObjectURL(new Blob([md], { type: "text/markdown" }));
    const a = document.createElement("a"); a.href = url; a.download = `ecomap-${id}.md`; a.click(); URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 pt-4">
      {/* HEADER — in normal flow (not overlapping), sidebar/content start below it */}
      <GlassCard className="mb-5 px-5 py-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-deep to-brand-purple text-2xl text-white">{meta.emoji}</div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <Badge color={meta.color as never}>{t(meta.key)}</Badge>
              {news && <span className="text-xs text-ink-muted">{news.publisher} · {news.date}</span>}
              {news && <a href={news.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs font-medium text-brand-deep hover:underline"><ExternalLink className="h-3 w-3" />{t("common.readOriginal")}</a>}
            </div>
            <h1 className="font-display text-lg font-bold leading-snug text-ink sm:text-xl">{tl(c.event)}</h1>
          </div>
          <Button onClick={exportAll}>{t("ws.export")}</Button>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 border-t hairline pt-3">
          <span className="flex items-center gap-1 text-xs font-semibold text-ink-muted"><Sparkles className="h-3.5 w-3.5 text-brand-purple" />{t("mode.label")}:</span>
          {RESEARCH_MODES.map((m) => (
            <button key={m.id} onClick={() => setMode(m.id)} title={t(m.d)}
              className={cn("rounded-full px-3 py-1 text-xs font-medium transition-all", mode === m.id ? "bg-gradient-to-r from-brand-deep to-brand-purple text-white shadow" : "border hairline surface-soft text-ink-soft hover:surface-strong")}>
              {t(m.key)}
            </button>
          ))}
          <span className="ml-auto hidden text-xs text-ink-muted lg:block">{t(modeCfg.d)}</span>
        </div>
      </GlassCard>

      <div className="flex items-start gap-6">
        {/* SIDEBAR — sticky, follows viewport (Notion-style), sits below header */}
        <aside className="sticky top-24 hidden h-[calc(100vh-7rem)] w-52 shrink-0 self-start overflow-y-auto lg:block">
          <GlassCard className="p-2">
            <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">{t("ws.contents")}</p>
            {SECTIONS.map((s) => (
              <button key={s.id} onClick={() => scrollTo(s.id)}
                className={cn("group flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm transition-all", active === s.id ? "surface-strong font-semibold text-brand-deep" : "text-ink-soft hover:surface-soft")}>
                <s.icon className={cn("h-4 w-4 shrink-0", active === s.id && "text-brand-deep")} />
                <span className="truncate">{t(s.key)}</span>
                {modeCfg.focus.includes(s.id) && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-purple" />}
              </button>
            ))}
            <div className="mt-2 border-t hairline p-2">
              <Link href={`/mindmaps?topic=${id}`}><Button variant="ghost" size="sm" className="w-full justify-start"><MapIcon className="h-4 w-4" />{t("nav.mindmaps")}</Button></Link>
            </div>
          </GlassCard>
        </aside>

        <div className="min-w-0 flex-1 space-y-5">
          <SummarySection c={c} />
          <BackgroundSection c={c} />
          <StakeholdersSection c={c} />
          <TheorySection c={c} locale={locale} />
          <MathSection c={c} />
          <ChartsSection c={c} />
          <DatasetsSection c={c} />
          <PapersSection c={c} />
          <ProposalsV3Section c={c} />
          <EssayGuideSection c={c} defaultLevel={modeCfg.level} />
        </div>
      </div>
    </div>
  );
}

/* ============ A — SUMMARY (unchanged layout + expandable overview) ============ */
function SummarySection({ c }: { c: Case }) {
  const { t, tl } = useI18n();
  const [exp, setExp] = useState(false);
  return (
    <ModuleCard id="summary" icon={<FileText className="h-5 w-5" />} title={t("sec.summary")} copyText={tl(c.summary.overview)}>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-4 md:col-span-2">
          <Field label={t("sum.oneline")}><p className="text-[15px] font-medium leading-relaxed text-ink">{tl(c.summary.oneLine)}</p></Field>
          <Field label={t("sum.overview")}>
            <p className="text-sm leading-relaxed text-ink-soft">{tl(c.summary.overview)}</p>
            {c.summary.overviewExpanded && (
              <>
                <button onClick={() => setExp((v) => !v)} className="mt-2 flex items-center gap-1 text-xs font-semibold text-brand-deep hover:underline">
                  <ChevronRight className={cn("h-3.5 w-3.5 transition-transform", exp && "rotate-90")} />
                  {exp ? t("ws.overviewCollapse") : t("ws.overviewExpand")}
                </button>
                <AnimatePresence>
                  {exp && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="mt-3 space-y-2 border-l-2 hairline-2 pl-3">
                        {c.summary.overviewExpanded.map((g, i) => (
                          <div key={i}>
                            <p className="text-xs font-semibold text-brand-deep">{tl(g.term)}</p>
                            <p className="text-sm leading-relaxed text-ink-soft">{tl(g.explain)}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t("sum.matters")}><ul className="space-y-1.5">{c.summary.matters.map((m, i) => <li key={i} className="flex gap-2 text-sm text-ink-soft"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-purple" />{tl(m)}</li>)}</ul></Field>
            <Field label={t("sum.stakeholders")}><div className="flex flex-wrap gap-1.5">{c.summary.stakeholders.map((s, i) => <Badge key={i} color="blue">{tl(s)}</Badge>)}</div></Field>
          </div>
        </div>
        <div className="space-y-3">
          <GlassCard tint className="flex flex-col items-center p-4"><ScoreRing value={c.score} size={96} label={t("sum.potential")} /></GlassCard>
          {c.potential.map((p) => (
            <div key={p.label.en}>
              <div className="mb-1 flex justify-between text-xs text-ink-soft"><span>{tl(p.label)}</span><span className="font-semibold">{p.value}</span></div>
              <Meter value={p.value} />
            </div>
          ))}
        </div>
      </div>
    </ModuleCard>
  );
}

/* ============ B — BACKGROUND (sourced, expandable) ============ */
function BackgroundSection({ c }: { c: Case }) {
  const { t, tl } = useI18n();
  return (
    <ModuleCard id="background" icon={<Layers className="h-5 w-5" />} title={t("sec.background")} subtitle={t("pestle.title")} accent="from-sky-500 to-blue-600">
      <div className="space-y-3">
        {c.factors.map((f) => (
          <details key={f.key} className="group rounded-xl border hairline surface-soft p-4 open:surface">
            <summary className="flex cursor-pointer list-none items-start gap-2">
              <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-brand-deep transition-transform group-open:rotate-90" />
              <div><p className="text-sm font-semibold text-ink">{t(f.key as DictKey)}</p><p className="text-xs text-ink-muted">{tl(f.summary)}</p></div>
            </summary>
            <div className="mt-3 space-y-3 pl-6 text-xs">
              <p className="leading-relaxed text-ink-soft">{tl(f.detail)}</p>
              {f.sources && f.sources.length > 0 && (
                <div>
                  <p className="mb-1 font-semibold text-brand-deep">{t("bg.sources")}</p>
                  <div className="space-y-1.5">
                    {f.sources.map((s, i) => (
                      <a key={i} href={s.url} target="_blank" rel="noreferrer" className="block rounded-lg surface p-2 transition-colors hover:surface-strong">
                        <p className="font-semibold text-ink">{s.institution} · <span className="font-normal text-ink-soft">{tl(s.title)}</span> <span className="text-ink-muted">({s.year})</span> <ExternalLink className="inline h-3 w-3 text-brand-deep" /></p>
                        <p className="mt-0.5 text-ink-muted">“{tl(s.finding)}”</p>
                      </a>
                    ))}
                  </div>
                </div>
              )}
              {f.statistics.length > 0 && <MiniList label={t("bg.stats")} items={f.statistics.map(tl)} c="text-blue-600" />}
              {f.whyMatters && <SH label={t("bg.whyMatters")} val={tl(f.whyMatters)} c="text-violet-600" />}
              <div className="grid grid-cols-2 gap-2">
                {f.whoBenefits && <SH label={t("bg.whoBenefits")} val={tl(f.whoBenefits)} c="text-emerald-600" />}
                {f.whoLoses && <SH label={t("bg.whoLoses")} val={tl(f.whoLoses)} c="text-rose-600" />}
              </div>
              {f.stakeholders.length > 0 && <div className="flex flex-wrap gap-1">{f.stakeholders.map((s, i) => <Badge key={i} color="slate">{tl(s)}</Badge>)}</div>}
              {f.essayEntry && (
                <div className="rounded-lg glass-tint p-2">
                  <p className="font-semibold text-brand-deep">{t("bg.essayEntry")}</p>
                  <p className="text-ink-soft">{tl(f.essayEntry)}</p>
                </div>
              )}
            </div>
          </details>
        ))}
      </div>
      <Timeline nodes={c.timeline} />
    </ModuleCard>
  );
}

function Timeline({ nodes }: { nodes: CaseTimelineNode[] }) {
  const { t, tl } = useI18n();
  const [open, setOpen] = useState<number>(-1);
  const color: Record<CaseTimelineNode["kind"], string> = { cause: "from-slate-400 to-slate-600", trigger: "from-rose-400 to-pink-600", milestone: "from-brand-deep to-brand-purple", future: "from-cyan-400 to-sky-600" };
  const klabel: Record<CaseTimelineNode["kind"], DictKey> = { cause: "tl.cause", trigger: "tl.trigger", milestone: "tl.milestone", future: "tl.future" };
  const badge: Record<CaseTimelineNode["kind"], "cyan" | "rose" | "purple" | "slate"> = { future: "cyan", trigger: "rose", milestone: "purple", cause: "slate" };
  return (
    <div className="mt-5">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">{t("timeline.title")}</p>
      <div className="relative ml-2 border-l-2 hairline-2 pl-5">
        {nodes.map((n, i) => (
          <div key={i} className="relative pb-3 last:pb-0">
            <span className={cn("absolute -left-[27px] flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br text-[9px] font-bold text-white", color[n.kind])}>{i + 1}</span>
            <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full flex-wrap items-center gap-2 text-left">
              <span className="text-xs font-semibold text-brand-deep">{n.date}</span>
              <span className="text-sm font-semibold text-ink">{tl(n.title)}</span>
              <Badge color={badge[n.kind]}>{t(klabel[n.kind])}</Badge>
              <ChevronRight className={cn("h-3.5 w-3.5 text-ink-muted transition-transform", open === i && "rotate-90")} />
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="mt-2 space-y-1.5 text-xs">
                    {n.what && <SH label={t("tl.what")} val={tl(n.what)} c="text-blue-600" />}
                    {n.why && <SH label={t("tl.why")} val={tl(n.why)} c="text-violet-600" />}
                    {n.who && <SH label={t("tl.who")} val={tl(n.who)} c="text-cyan-600" />}
                    {n.influence && <SH label={t("tl.influence")} val={tl(n.influence)} c="text-amber-600" />}
                    {n.importance && <SH label={t("tl.importance")} val={tl(n.importance)} c="text-emerald-600" />}
                    {!n.what && <p className="text-ink-soft">{tl(n.detail)}</p>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ C — STAKEHOLDERS (restored + relationship map) ============ */
function StakeholdersSection({ c }: { c: Case }) {
  const { t, tl } = useI18n();
  const list = c.stakeholdersDetailed;
  if (!list || !list.length) return null;
  const name = (sid: string) => tl(list.find((s) => s.id === sid)?.name ?? { en: sid, zh: sid });
  return (
    <ModuleCard id="stakeholders" icon={<Users className="h-5 w-5" />} title={t("sec.stakeholders")} accent="from-violet-500 to-fuchsia-600">
      <div className="grid gap-3 sm:grid-cols-2">
        {list.map((s) => (
          <details key={s.id} className="group rounded-xl border hairline surface-soft p-4 open:surface">
            <summary className="flex cursor-pointer list-none items-center gap-2">
              <span className="text-xl">{s.icon}</span>
              <div className="flex-1"><p className="text-sm font-semibold text-ink">{tl(s.name)}</p><p className="text-xs text-ink-muted">{tl(s.summary)}</p></div>
              <ChevronRight className="h-4 w-4 text-ink-muted transition-transform group-open:rotate-90" />
            </summary>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <SH label={t("sh.goals")} val={tl(s.goals)} c="text-blue-600" />
              <SH label={t("sh.incentives")} val={tl(s.incentives)} c="text-violet-600" />
              <SH label={t("sh.benefit")} val={tl(s.benefit)} c="text-emerald-600" />
              <SH label={t("sh.cost")} val={tl(s.cost)} c="text-rose-600" />
              <SH label={t("sh.conflicts")} val={tl(s.conflicts)} c="text-amber-600" />
              <SH label={t("sh.shared")} val={tl(s.shared)} c="text-cyan-600" />
            </div>
          </details>
        ))}
      </div>
      {c.relations && c.relations.length > 0 && (
        <div className="mt-5">
          <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-ink"><GitBranch className="h-4 w-4 text-brand-purple" />{t("sh.map")}</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {c.relations.map((r, i) => (
              <div key={i} className={cn("rounded-lg border p-2.5 text-xs", r.kind === "conflict" ? "border-rose-200 bg-rose-50/60 dark:border-rose-500/30 dark:bg-rose-500/10" : "border-emerald-200 bg-emerald-50/60 dark:border-emerald-500/30 dark:bg-emerald-500/10")}>
                <p className="font-semibold text-ink">{name(r.a)} <span className={r.kind === "conflict" ? "text-rose-500" : "text-emerald-500"}>{r.kind === "conflict" ? "⚔" : "🤝"}</span> {name(r.b)}</p>
                <p className="mt-0.5 text-ink-muted">{tl(r.note)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </ModuleCard>
  );
}
