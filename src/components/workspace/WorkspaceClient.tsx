"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  Calculator,
  ChevronRight,
  ExternalLink,
  FileText,
  Gauge,
  GitBranch,
  Landmark,
  Layers,
  Map as MapIcon,
  Scale,
  ShieldCheck,
  Sigma,
  Sparkles,
  X,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { getCase } from "@/lib/cases";
import type { CaseEvidence, CaseProposal, CaseTimelineNode } from "@/lib/cases/types";
import { ModuleCard } from "@/components/ui/ModuleCard";
import { Badge, Button, Dots, GlassCard, Meter, ScoreRing } from "@/components/ui/primitives";
import { EconDiagram } from "@/components/diagrams/EconDiagram";
import { CorrelationMatrix, ScatterPlot, TrendLine } from "@/components/charts/ResearchCharts";
import { DIAGRAM_LABELS } from "@/lib/data/catalog";
import { CATEGORY_META, getNews } from "@/lib/data/news";
import { cn } from "@/lib/utils";
import type { DictKey } from "@/lib/i18n/dictionaries";

type EssayLevel = "basic" | "advanced" | "research";

const RESEARCH_MODES: { id: string; key: DictKey; d: DictKey; level: EssayLevel; focus: string[] }[] = [
  { id: "essay", key: "mode.essay", d: "mode.essay.d", level: "advanced", focus: ["summary", "theory", "essay"] },
  { id: "case", key: "mode.case", d: "mode.case.d", level: "advanced", focus: ["summary", "background", "stakeholders", "theory"] },
  { id: "policy", key: "mode.policy", d: "mode.policy.d", level: "advanced", focus: ["stakeholders", "proposals", "critical"] },
  { id: "nec", key: "mode.nec", d: "mode.nec.d", level: "research", focus: ["theory", "evidence", "proposals", "critical", "essay"] },
  { id: "academic", key: "mode.academic", d: "mode.academic.d", level: "research", focus: ["theory", "math", "evidence", "literature"] },
];

const SECTIONS: { id: string; key: DictKey; icon: React.ElementType }[] = [
  { id: "summary", key: "sec.summary", icon: FileText },
  { id: "background", key: "sec.background", icon: Layers },
  { id: "stakeholders", key: "sec.stakeholders", icon: Landmark },
  { id: "theory", key: "sec.theory", icon: Brain },
  { id: "math", key: "sec.math", icon: Calculator },
  { id: "evidence", key: "sec.evidence", icon: ShieldCheck },
  { id: "literature", key: "sec.literature", icon: BookOpen },
  { id: "proposals", key: "sec.proposals", icon: Scale },
  { id: "critical", key: "sec.critical", icon: Gauge },
  { id: "essay", key: "sec.essay", icon: Sigma },
];

export function WorkspaceClient({ id, query }: { id: string; query?: string }) {
  const { t, tl, locale } = useI18n();
  const [salt, setSalt] = useState(0);
  const [mode, setMode] = useState("case");
  const [active, setActive] = useState("summary");
  const [openProposal, setOpenProposal] = useState<CaseProposal | null>(null);

  // article consistency: persist regenerate salt per id
  useEffect(() => {
    const s = Number(localStorage.getItem(`ecomap.salt.${id}`) || "0");
    if (s) setSalt(s);
  }, [id]);

  // a free-form topic typed in the Research Assistant arrives as ?q=
  const override = query ? { en: query, zh: query } : undefined;
  const c = useMemo(() => getCase(id, salt, override), [id, salt, query]);
  const meta = CATEGORY_META[c.category];
  const news = getNews(id);
  const modeCfg = RESEARCH_MODES.find((m) => m.id === mode)!;

  // scroll-spy (Notion-like sidebar that follows the viewport)
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [c]);

  function regenerate() {
    const next = salt + 1;
    setSalt(next);
    localStorage.setItem(`ecomap.salt.${id}`, String(next));
  }

  function scrollTo(sid: string) {
    document.getElementById(sid)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function exportAll() {
    const md = buildMarkdown(c, tl);
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ecomap-${id}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* header */}
      <GlassCard className="sticky top-20 z-30 mb-5 px-5 py-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-deep to-brand-purple text-2xl text-white">{meta.emoji}</div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <Badge color={meta.color as never}>{t(meta.key)}</Badge>
              {news && <span className="text-xs text-ink-muted">{news.publisher} · {news.date}</span>}
              {news && (
                <a href={news.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs font-medium text-brand-deep hover:underline">
                  <ExternalLink className="h-3 w-3" />{t("common.readOriginal")}
                </a>
              )}
            </div>
            <h1 className="truncate font-display text-lg font-bold text-ink sm:text-xl">{tl(c.event)}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="soft" onClick={regenerate}>{t("ws.regenerate")}</Button>
            <Button onClick={exportAll}>{t("ws.export")}</Button>
          </div>
        </div>

        {/* research mode selector */}
        <div className="mt-3 flex flex-wrap items-center gap-2 border-t hairline pt-3">
          <span className="flex items-center gap-1 text-xs font-semibold text-ink-muted"><Sparkles className="h-3.5 w-3.5 text-brand-purple" />{t("mode.label")}:</span>
          {RESEARCH_MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              title={t(m.d)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-all",
                mode === m.id ? "bg-gradient-to-r from-brand-deep to-brand-purple text-white shadow" : "border hairline surface-soft text-ink-soft hover:surface-strong"
              )}
            >
              {t(m.key)}
            </button>
          ))}
          <span className="ml-auto hidden text-xs text-ink-muted lg:block">{t(modeCfg.d)}</span>
        </div>
      </GlassCard>

      <div className="flex gap-6">
        {/* Notion-style sidebar */}
        <aside className="sticky top-48 hidden h-fit w-52 shrink-0 self-start lg:block">
          <GlassCard className="p-2">
            <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">{t("ws.contents")}</p>
            {SECTIONS.map((s) => {
              const isFocus = modeCfg.focus.includes(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={cn(
                    "group flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm transition-all",
                    active === s.id ? "surface-strong font-semibold text-brand-deep" : "text-ink-soft hover:surface-soft"
                  )}
                >
                  <s.icon className={cn("h-4 w-4 shrink-0", active === s.id && "text-brand-deep")} />
                  <span className="truncate">{t(s.key)}</span>
                  {isFocus && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-purple" title="Focus in this mode" />}
                </button>
              );
            })}
            <div className="mt-2 grid gap-1 border-t hairline p-2">
              <Link href={`/mindmaps?topic=${id}`}><Button variant="ghost" size="sm" className="w-full justify-start"><MapIcon className="h-4 w-4" />{t("nav.mindmaps")}</Button></Link>
            </div>
          </GlassCard>
        </aside>

        {/* main column */}
        <div className="min-w-0 flex-1 space-y-5">
          <SummarySection c={c} />
          <BackgroundSection c={c} />
          <StakeholdersSection c={c} />
          <TheorySection c={c} locale={locale} regenerate={regenerate} />
          <MathSection c={c} />
          <EvidenceSection c={c} />
          <LiteratureSection c={c} />
          <ProposalsSection c={c} onOpen={setOpenProposal} />
          <CriticalSection c={c} />
          <EssaySection c={c} defaultLevel={modeCfg.level} />
        </div>
      </div>

      {/* proposal detail modal */}
      <AnimatePresence>
        {openProposal && <ProposalModal p={openProposal} onClose={() => setOpenProposal(null)} />}
      </AnimatePresence>
    </div>
  );
}

/* ============ A — SUMMARY (the only place with the score) ============ */
function SummarySection({ c }: { c: ReturnType<typeof getCase> }) {
  const { t, tl } = useI18n();
  return (
    <ModuleCard id="summary" icon={<FileText className="h-5 w-5" />} title={t("sec.summary")} copyText={tl(c.summary.overview)}>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-4 md:col-span-2">
          <Field label={t("sum.oneline")}><p className="text-[15px] font-medium leading-relaxed text-ink">{tl(c.summary.oneLine)}</p></Field>
          <Field label={t("sum.overview")}><p className="text-sm leading-relaxed text-ink-soft">{tl(c.summary.overview)}</p></Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t("sum.matters")}>
              <ul className="space-y-1.5">{c.summary.matters.map((m, i) => <li key={i} className="flex gap-2 text-sm text-ink-soft"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-purple" />{tl(m)}</li>)}</ul>
            </Field>
            <Field label={t("sum.stakeholders")}>
              <div className="flex flex-wrap gap-1.5">{c.summary.stakeholders.map((s, i) => <Badge key={i} color="blue">{tl(s)}</Badge>)}</div>
            </Field>
          </div>
        </div>
        <div className="space-y-3">
          <GlassCard tint className="flex flex-col items-center p-4">
            <ScoreRing value={c.score} size={96} label={t("sum.potential")} />
          </GlassCard>
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

/* ============ B — BACKGROUND (expandable factors + interactive timeline) ============ */
function BackgroundSection({ c }: { c: ReturnType<typeof getCase> }) {
  const { t, tl } = useI18n();
  return (
    <ModuleCard id="background" icon={<Layers className="h-5 w-5" />} title={t("sec.background")} subtitle={t("pestle.title")} accent="from-sky-500 to-blue-600">
      <div className="grid gap-3 sm:grid-cols-2">
        {c.factors.map((f) => (
          <details key={f.key} className="group rounded-xl border hairline surface-soft p-4 open:surface">
            <summary className="flex cursor-pointer list-none items-start gap-2">
              <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-brand-deep transition-transform group-open:rotate-90" />
              <div>
                <p className="text-sm font-semibold text-ink">{t(f.key as DictKey)}</p>
                <p className="text-xs text-ink-muted">{tl(f.summary)}</p>
              </div>
            </summary>
            <div className="mt-3 space-y-3 pl-6 text-xs">
              <p className="leading-relaxed text-ink-soft">{tl(f.detail)}</p>
              <MiniList label={t("bg.stats")} items={f.statistics.map(tl)} c="text-blue-600" />
              <MiniList label={t("bg.stakeholders")} items={f.stakeholders.map(tl)} c="text-violet-600" />
              <MiniList label={t("bg.essayIdeas")} items={f.essayIdeas.map(tl)} c="text-brand-deep" />
              <div className="grid grid-cols-2 gap-2">
                <MiniList label={t("bg.arguments")} items={f.arguments.map(tl)} c="text-emerald-600" />
                <MiniList label={t("bg.counter")} items={f.counterarguments.map(tl)} c="text-rose-600" />
              </div>
            </div>
          </details>
        ))}
      </div>
      <InteractiveTimeline nodes={c.timeline} />
    </ModuleCard>
  );
}

function InteractiveTimeline({ nodes }: { nodes: CaseTimelineNode[] }) {
  const { t, tl } = useI18n();
  const [open, setOpen] = useState(2);
  const kindColor: Record<CaseTimelineNode["kind"], string> = {
    cause: "from-slate-400 to-slate-600",
    trigger: "from-rose-400 to-pink-600",
    milestone: "from-brand-deep to-brand-purple",
    future: "from-cyan-400 to-sky-600",
  };
  const kindLabel: Record<CaseTimelineNode["kind"], DictKey> = { cause: "tl.cause", trigger: "tl.trigger", milestone: "tl.milestone", future: "tl.future" };
  const badge: Record<CaseTimelineNode["kind"], "cyan" | "rose" | "purple" | "slate"> = { future: "cyan", trigger: "rose", milestone: "purple", cause: "slate" };
  return (
    <div className="mt-5">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">{t("timeline.title")}</p>
      <div className="relative ml-2 border-l-2 hairline-2 pl-5">
        {nodes.map((n, i) => (
          <div key={i} className="relative pb-4 last:pb-0">
            <span className={cn("absolute -left-[26px] flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br text-[9px] font-bold text-white", kindColor[n.kind])}>{i + 1}</span>
            <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full flex-wrap items-center gap-2 text-left">
              <span className="text-xs font-semibold text-ink-muted">{n.date}</span>
              <span className="text-sm font-semibold text-ink">{tl(n.title)}</span>
              <Badge color={badge[n.kind]}>{t(kindLabel[n.kind])}</Badge>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <p className="mt-1 text-xs leading-relaxed text-ink-soft">{tl(n.detail)}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ C — STAKEHOLDERS ============ */
function StakeholdersSection({ c }: { c: ReturnType<typeof getCase> }) {
  const { t, tl } = useI18n();
  const icons = ["🏛", "🏭", "👷", "🛒", "📈", "🤝", "🌐"];
  return (
    <ModuleCard id="stakeholders" icon={<Landmark className="h-5 w-5" />} title={t("sec.stakeholders")} accent="from-violet-500 to-fuchsia-600">
      <div className="flex flex-wrap gap-2">
        {c.summary.stakeholders.map((s, i) => (
          <GlassCard key={i} className="flex items-center gap-2 px-3 py-2">
            <span className="text-lg">{icons[i % icons.length]}</span>
            <span className="text-sm font-medium text-ink">{tl(s)}</span>
          </GlassCard>
        ))}
      </div>
      <p className="mt-3 text-xs text-ink-muted">{t("sh.interests")} · {t("sh.incentives")} · {t("sh.benefits")} · {t("sh.risks")}</p>
    </ModuleCard>
  );
}

/* ============ D — THEORY ============ */
function TheorySection({ c, locale, regenerate }: { c: ReturnType<typeof getCase>; locale: "en" | "zh"; regenerate: () => void }) {
  const { t, tl } = useI18n();
  return (
    <ModuleCard id="theory" icon={<Brain className="h-5 w-5" />} title={t("sec.theory")} subtitle={t("th.matchScore")} accent="from-indigo-500 to-violet-600" onRegenerate={regenerate}>
      <div className="space-y-3">
        {c.theories.map((th, idx) => (
          <details key={idx} className="group rounded-xl border hairline surface-soft p-4 open:surface">
            <summary className="flex cursor-pointer list-none items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-deep to-brand-purple text-xs font-bold text-white">{th.match}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-ink">{tl(th.name)}</p>
                <Meter value={th.match} className="mt-1" />
              </div>
              <Badge color="purple">{DIAGRAM_LABELS[th.diagram][locale]}</Badge>
            </summary>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <Field label={t("th.explanation")}><p className="text-sm text-ink-soft">{tl(th.explanation)}</p></Field>
                <Field label={t("th.relevance")}><p className="text-sm text-ink-soft">{tl(th.relevance)}</p></Field>
                <div className="grid grid-cols-2 gap-3">
                  <MiniList label={t("th.strengths")} items={th.strengths.map(tl)} c="text-emerald-600" prefix="+ " />
                  <MiniList label={t("th.weaknesses")} items={th.weaknesses.map(tl)} c="text-rose-600" prefix="− " />
                </div>
              </div>
              <div>
                <p className="mb-1 text-xs font-semibold text-brand-deep">{t("th.diagram")} · {DIAGRAM_LABELS[th.diagram][locale]}</p>
                <EconDiagram kind={th.diagram} />
              </div>
            </div>
          </details>
        ))}
      </div>
      <div className="mt-5">
        <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-ink"><GitBranch className="h-4 w-4 text-brand-purple" />{t("th.counter")}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {c.counter.map((cc, i) => (
            <GlassCard tint key={i} className="p-4">
              <div className="mb-2 flex flex-wrap items-center justify-center gap-2 text-sm font-semibold">
                <span className="rounded-lg bg-blue-100 px-2 py-0.5 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">{tl(cc.a)}</span>
                <span className="text-ink-muted">vs</span>
                <span className="rounded-lg bg-violet-100 px-2 py-0.5 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300">{tl(cc.b)}</span>
              </div>
              <p className="text-center text-xs leading-relaxed text-ink-soft">{tl(cc.tension)}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </ModuleCard>
  );
}

/* ============ E — MATH ============ */
function MathSection({ c }: { c: ReturnType<typeof getCase> }) {
  const { t, tl } = useI18n();
  return (
    <ModuleCard id="math" icon={<Calculator className="h-5 w-5" />} title={t("sec.math")} accent="from-cyan-500 to-sky-600">
      <div className="space-y-3">
        {c.methods.map((m, i) => (
          <GlassCard key={i} className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-ink">{tl(m.name)}</p>
              <Badge color="cyan">{m.fit}% fit</Badge>
            </div>
            <code className="mt-2 block overflow-x-auto rounded-lg bg-slate-900/90 px-3 py-2 font-mono text-xs text-cyan-100">{m.formula}</code>
            <div className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
              <SH label={t("math.purpose")} val={tl(m.purpose)} c="text-blue-600" />
              <SH label={t("math.assumptions")} val={tl(m.assumptions)} c="text-violet-600" />
              <SH label={t("math.data")} val={tl(m.data)} c="text-cyan-600" />
              <SH label={t("math.weaknesses")} val={tl(m.weaknesses)} c="text-rose-600" />
            </div>
          </GlassCard>
        ))}
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <ChartCard title={t("math.charts") + " · Scatter"}><ScatterPlot seed={c.id} /></ChartCard>
        <ChartCard title="Trend + Forecast"><TrendLine seed={c.id} /></ChartCard>
        <ChartCard title="Correlation"><CorrelationMatrix seed={c.id} /></ChartCard>
      </div>
      <div className="mt-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">{t("math.datasets")}</p>
        <div className="flex flex-wrap gap-2">
          {c.datasets.map((d) => (
            <a key={d.name} href={d.url} target="_blank" rel="noreferrer" className="rounded-lg border hairline surface px-2.5 py-1 text-xs font-medium text-brand-deep hover:surface-strong">{d.name} · {d.provider} ↗</a>
          ))}
        </div>
      </div>
    </ModuleCard>
  );
}

/* ============ F — EVIDENCE (upgraded, expandable) ============ */
function EvidenceSection({ c }: { c: ReturnType<typeof getCase> }) {
  const { t } = useI18n();
  return (
    <ModuleCard id="evidence" icon={<ShieldCheck className="h-5 w-5" />} title={t("sec.evidence")} subtitle={t("ev.dashboard")} accent="from-emerald-500 to-teal-600">
      <div className="mb-4 grid grid-cols-5 gap-2">
        {(["A+", "A", "B", "C", "D"] as const).map((g) => {
          const n = c.evidence.filter((e) => e.grade === g).length;
          return (
            <GlassCard key={g} className="flex flex-col items-center py-3">
              <span className={cn("rounded-full px-2 py-0.5 text-xs font-bold", gradeBg(g))}>{g}</span>
              <span className="mt-1 text-lg font-bold text-ink">{n}</span>
            </GlassCard>
          );
        })}
      </div>
      <div className="space-y-2">
        {c.evidence.map((e, i) => <EvidenceRow key={i} e={e} />)}
      </div>
    </ModuleCard>
  );
}

function EvidenceRow({ e }: { e: CaseEvidence }) {
  const { t, tl } = useI18n();
  return (
    <details className="group rounded-xl border hairline surface-soft p-3 open:surface">
      <summary className="flex cursor-pointer list-none items-center gap-3">
        <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold", gradeBg(e.grade))}>{e.grade}</span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-ink">{tl(e.title)}</p>
          <p className="truncate text-xs text-ink-muted">{e.publisher} · {e.year}</p>
        </div>
        <div className="hidden w-24 sm:block">
          <div className="mb-0.5 flex justify-between text-[10px] text-ink-muted"><span>{t("ev.reliability")}</span><span>{e.reliability}</span></div>
          <Meter value={e.reliability} color="#10b981" />
        </div>
        <ChevronRight className="h-4 w-4 text-ink-muted transition-transform group-open:rotate-90" />
      </summary>
      <div className="mt-3 grid gap-2 pl-12 text-xs">
        <SH label={t("ev.required")} val={tl(e.requiredData)} c="text-blue-600" />
        <SH label={t("ev.why")} val={tl(e.whyItMatters)} c="text-violet-600" />
        <SH label={t("ev.how")} val={tl(e.howItSupports)} c="text-emerald-600" />
        <SH label={t("ev.bias")} val={tl(e.bias)} c="text-amber-600" />
        <a href={e.url} target="_blank" rel="noreferrer" className="font-semibold text-brand-deep hover:underline">{t("ev.visit")} ↗</a>
      </div>
    </details>
  );
}

/* ============ G — LITERATURE ============ */
function LiteratureSection({ c }: { c: ReturnType<typeof getCase> }) {
  const { t, tl } = useI18n();
  return (
    <ModuleCard id="literature" icon={<BookOpen className="h-5 w-5" />} title={t("sec.literature")} accent="from-amber-500 to-orange-600">
      <div className="mb-4">
        <div className="mb-1.5 flex justify-between text-xs font-semibold">
          <span className="text-emerald-600">{c.literature.consensus}% {t("lit.support")}</span>
          <span className="text-rose-600">{100 - c.literature.consensus}% {t("lit.oppose")}</span>
        </div>
        <div className="flex h-3 overflow-hidden rounded-full">
          <div className="bg-emerald-400" style={{ width: `${c.literature.consensus}%` }} />
          <div className="bg-rose-400" style={{ width: `${100 - c.literature.consensus}%` }} />
        </div>
        <p className="mt-1 text-center text-[11px] text-ink-muted">{t("lit.consensus")}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-semibold text-emerald-600">{t("lit.supporting")}</p>
          <div className="space-y-2">{c.literature.supporting.map((l, i) => <div key={i} className="rounded-lg bg-emerald-50/70 p-2.5 text-xs dark:bg-emerald-500/10"><span className="font-semibold text-ink">{l.cite}</span><p className="text-ink-muted">{tl(l.finding)}</p></div>)}</div>
        </div>
        <div>
          <p className="mb-2 text-xs font-semibold text-rose-600">{t("lit.opposing")}</p>
          <div className="space-y-2">{c.literature.opposing.map((l, i) => <div key={i} className="rounded-lg bg-rose-50/70 p-2.5 text-xs dark:bg-rose-500/10"><span className="font-semibold text-ink">{l.cite}</span><p className="text-ink-muted">{tl(l.finding)}</p></div>)}</div>
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <ListCard title={t("lit.debates")} items={c.literature.debates.map(tl)} />
        <ListCard title={t("lit.authors")} items={c.literature.authors.map((a) => `${a.name} — ${tl(a.field)}`)} />
        <ListCard title={t("lit.gaps")} items={c.literature.gaps.map(tl)} />
        <ListCard title={t("lit.future")} items={c.literature.future.map(tl)} />
      </div>
    </ModuleCard>
  );
}

/* ============ H — PROPOSALS (clickable → modal) ============ */
function ProposalsSection({ c, onOpen }: { c: ReturnType<typeof getCase>; onOpen: (p: CaseProposal) => void }) {
  const { t, tl } = useI18n();
  return (
    <ModuleCard id="proposals" icon={<Scale className="h-5 w-5" />} title={t("sec.proposals")} accent="from-rose-500 to-pink-600">
      <div className="grid gap-3 md:grid-cols-3">
        {c.proposals.map((p) => (
          <button key={p.id} onClick={() => onOpen(p)} className="group text-left">
            <GlassCard className="h-full p-4 transition-all hover:-translate-y-1 hover:shadow-glass-lg">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-deep to-brand-purple text-xs font-bold text-white">{p.id}</span>
                <span className="text-sm font-semibold text-ink">{tl(p.name)}</span>
              </div>
              <p className="text-xs text-ink-muted">{tl(p.objective)}</p>
              <span className="mt-3 flex items-center gap-1 text-xs font-semibold text-brand-deep">{t("pr.open")}<ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></span>
            </GlassCard>
          </button>
        ))}
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-ink-muted">
              <th className="p-2">{t("pr.compare")}</th>
              {c.proposals.map((p) => <th key={p.id} className="p-2 text-center">{p.id}</th>)}
            </tr>
          </thead>
          <tbody>
            {([["pr.cost", "cost"], ["pr.impact", "impact"], ["pr.fairness", "fairness"], ["pr.feasibility", "feasibility"], ["pr.risk", "risk"]] as const).map(([k, field]) => (
              <tr key={field} className="border-t hairline">
                <td className="p-2 text-xs font-medium text-ink-soft">{t(k)}</td>
                {c.proposals.map((p) => <td key={p.id} className="p-2"><div className="flex justify-center"><Dots value={p[field]} color={field === "risk" ? "#f43f5e" : "#a78bfa"} /></div></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ModuleCard>
  );
}

function ProposalModal({ p, onClose }: { p: CaseProposal; onClose: () => void }) {
  const { t, tl } = useI18n();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4 backdrop-blur-md">
      <motion.div initial={{ scale: 0.94, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.94, y: 20 }} onClick={(e) => e.stopPropagation()} className="glass-strong max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-6 shadow-glass-lg">
        <div className="mb-4 flex items-start gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-deep to-brand-purple text-sm font-bold text-white">{p.id}</span>
          <div className="flex-1">
            <h3 className="font-display text-lg font-bold text-ink">{tl(p.name)}</h3>
            <p className="text-sm text-ink-soft">{tl(p.objective)}</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-ink-muted hover:surface"><X className="h-5 w-5" /></button>
        </div>
        <div className="mb-4 grid grid-cols-5 gap-2">
          {([["pr.cost", "cost"], ["pr.impact", "impact"], ["pr.fairness", "fairness"], ["pr.feasibility", "feasibility"], ["pr.risk", "risk"]] as const).map(([k, f]) => (
            <div key={f} className="rounded-lg surface-soft p-2 text-center">
              <p className="text-[10px] text-ink-muted">{t(k)}</p>
              <div className="mt-1 flex justify-center"><Dots value={p[f]} color={f === "risk" ? "#f43f5e" : "#a78bfa"} /></div>
            </div>
          ))}
        </div>
        <div className="space-y-3 text-sm">
          <DetailList label={t("pr.steps")} items={p.steps.map(tl)} ordered />
          <div className="grid gap-3 sm:grid-cols-2">
            <Detail label={t("pr.timeline")} text={tl(p.timeline)} />
            <Detail label={t("pr.budget")} text={tl(p.budget)} />
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">{t("pr.responses")}</p>
            <div className="space-y-1.5">
              {p.stakeholderResponses.map((r, i) => (
                <div key={i} className="flex gap-2 rounded-lg surface-soft p-2 text-xs">
                  <span className="font-semibold text-brand-deep">{tl(r.who)}:</span>
                  <span className="text-ink-soft">{tl(r.reaction)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <DetailList label={t("pr.risks")} items={p.risks.map(tl)} c="text-rose-600" />
            <DetailList label={t("pr.alts")} items={p.alternatives.map(tl)} c="text-violet-600" />
          </div>
          <DetailList label={t("pr.metrics")} items={p.metrics.map(tl)} c="text-emerald-600" />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ============ I — CRITICAL ============ */
function CriticalSection({ c }: { c: ReturnType<typeof getCase> }) {
  const { t, tl } = useI18n();
  return (
    <ModuleCard id="critical" icon={<Gauge className="h-5 w-5" />} title={t("sec.critical")} accent="from-slate-500 to-slate-700">
      <div className="grid gap-3 sm:grid-cols-2">
        {c.critical.map((cr) => (
          <GlassCard key={cr.key} className="p-3.5">
            <p className="mb-1 text-xs font-semibold text-brand-deep">{t(cr.key as DictKey)}</p>
            <p className="text-sm leading-relaxed text-ink-soft">{tl(cr.text)}</p>
          </GlassCard>
        ))}
      </div>
    </ModuleCard>
  );
}

/* ============ J — ESSAY (Basic / Advanced / Research) ============ */
function EssaySection({ c, defaultLevel }: { c: ReturnType<typeof getCase>; defaultLevel: EssayLevel }) {
  const { t, tl } = useI18n();
  const [level, setLevel] = useState<EssayLevel>(defaultLevel);
  useEffect(() => setLevel(defaultLevel), [defaultLevel]);
  const data = c.essay[level];
  const levels: { id: EssayLevel; key: DictKey }[] = [
    { id: "basic", key: "es.basic" }, { id: "advanced", key: "es.advanced" }, { id: "research", key: "es.research" },
  ];
  return (
    <ModuleCard id="essay" icon={<Sigma className="h-5 w-5" />} title={t("sec.essay")} accent="from-fuchsia-500 to-purple-600" copyText={`${tl(data.rq)}\n\n${tl(data.thesis)}`}>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-ink-muted">{t("es.level")}:</span>
        {levels.map((l) => (
          <button key={l.id} onClick={() => setLevel(l.id)} className={cn("rounded-full px-3.5 py-1 text-xs font-medium transition-all", level === l.id ? "bg-gradient-to-r from-brand-deep to-brand-purple text-white shadow" : "border hairline surface-soft text-ink-soft hover:surface-strong")}>{t(l.key)}</button>
        ))}
      </div>
      <div className="space-y-3">
        <EssayBlock label={t("es.rq")} text={tl(data.rq)} highlight />
        <EssayBlock label={t("es.thesis")} text={tl(data.thesis)} highlight />
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">{t("es.outline")}</p>
          <div className="space-y-2">
            {data.outline.map((o, i) => (
              <div key={i} className="rounded-xl border hairline surface-soft p-3">
                <p className="text-sm font-semibold text-brand-deep">{i + 1}. {tl(o.heading)}</p>
                <ul className="mt-1 space-y-1 pl-4">{o.points.map((pt, j) => <li key={j} className="list-disc text-sm text-ink-soft">{tl(pt)}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl glass-tint p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-deep">{t("es.note")}</p>
          <p className="mt-1 text-sm text-ink-soft">{tl(data.note)}</p>
        </div>
      </div>
    </ModuleCard>
  );
}

/* ============ shared bits ============ */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">{label}</p>{children}</div>;
}
function SH({ label, val, c }: { label: string; val: string; c: string }) {
  return <div><p className={cn("font-semibold", c)}>{label}</p><p className="text-ink-muted">{val}</p></div>;
}
function MiniList({ label, items, c, prefix = "• " }: { label: string; items: string[]; c: string; prefix?: string }) {
  if (!items.length) return null;
  return <div><p className={cn("mb-0.5 font-semibold", c)}>{label}</p><ul className="space-y-0.5">{items.map((it, i) => <li key={i} className="text-ink-muted">{prefix}{it}</li>)}</ul></div>;
}
function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return <GlassCard className="p-3"><p className="mb-1 text-xs font-semibold text-ink-soft">{title}</p>{children}</GlassCard>;
}
function ListCard({ title, items }: { title: string; items: string[] }) {
  return <GlassCard className="p-3"><p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">{title}</p><ul className="space-y-1.5">{items.map((it, i) => <li key={i} className="text-xs leading-relaxed text-ink-soft">• {it}</li>)}</ul></GlassCard>;
}
function EssayBlock({ label, text, highlight }: { label: string; text: string; highlight?: boolean }) {
  return <div className={cn("rounded-xl p-3.5", highlight ? "glass-tint" : "border hairline surface-soft")}><p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-deep">{label}</p><p className="text-sm leading-relaxed text-ink">{text}</p></div>;
}
function Detail({ label, text }: { label: string; text: string }) {
  return <div className="rounded-lg surface-soft p-2.5"><p className="text-[10px] font-semibold uppercase tracking-wide text-ink-muted">{label}</p><p className="mt-0.5 text-xs text-ink-soft">{text}</p></div>;
}
function DetailList({ label, items, c, ordered }: { label: string; items: string[]; c?: string; ordered?: boolean }) {
  const List = ordered ? "ol" : "ul";
  return <div><p className={cn("mb-1 text-xs font-semibold uppercase tracking-wide", c ?? "text-ink-muted")}>{label}</p><List className={cn("space-y-1 pl-4 text-xs text-ink-soft", ordered ? "list-decimal" : "list-disc")}>{items.map((it, i) => <li key={i}>{it}</li>)}</List></div>;
}
function gradeBg(g: "A+" | "A" | "B" | "C" | "D") {
  return { "A+": "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300", A: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300", B: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300", C: "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300", D: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300" }[g];
}
function buildMarkdown(c: ReturnType<typeof getCase>, tl: (o: { en: string; zh: string }) => string) {
  return [
    `# ${tl(c.event)}`,
    `\n## Executive Summary\n${tl(c.summary.oneLine)}\n\n${tl(c.summary.overview)}`,
    `\n## Theory\n${c.theories.map((t) => `- ${tl(t.name)} (${t.match}%)`).join("\n")}`,
    `\n## Essay (Research-Level)\n**RQ:** ${tl(c.essay.research.rq)}\n\n**Thesis:** ${tl(c.essay.research.thesis)}`,
    `\n---\n_Generated by Ecomap — demo data._`,
  ].join("\n");
}
