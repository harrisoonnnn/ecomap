"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, BookOpen, Brain, Calculator, ChevronRight, Database, ExternalLink, Layers, Library, Scale, Sigma } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import type { getCase } from "@/lib/cases";
import type { CaseIntegratedArgument } from "@/lib/cases/types";
import { ModuleCard } from "@/components/ui/ModuleCard";
import { Badge, Dots, GlassCard, Meter } from "@/components/ui/primitives";
import { EconDiagram } from "@/components/diagrams/EconDiagram";
import { CorrelationMatrix, ScatterPlot, TrendLine } from "@/components/charts/ResearchCharts";
import { DIAGRAM_LABELS } from "@/lib/data/catalog";
import { cn } from "@/lib/utils";
import type { DictKey } from "@/lib/i18n/dictionaries";

export type Case = ReturnType<typeof getCase>;
type EssayLevelId = "basic" | "advanced" | "research";
export type { EssayLevelId as EssayLevel };

/* ---------- shared helpers ---------- */
export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">{label}</p>{children}</div>;
}
export function SH({ label, val, c }: { label: string; val: string; c: string }) {
  return <div><p className={cn("font-semibold", c)}>{label}</p><p className="text-ink-muted">{val}</p></div>;
}
export function MiniList({ label, items, c, prefix = "• " }: { label: string; items: string[]; c: string; prefix?: string }) {
  if (!items.length) return null;
  return <div><p className={cn("mb-0.5 font-semibold", c)}>{label}</p><ul className="space-y-0.5">{items.map((it, i) => <li key={i} className="text-ink-muted">{prefix}{it}</li>)}</ul></div>;
}

/* ============ D — THEORY (deeper, varied diagrams) ============ */
export function TheorySection({ c, locale }: { c: Case; locale: "en" | "zh" }) {
  const { t, tl } = useI18n();
  return (
    <ModuleCard id="theory" icon={<Brain className="h-5 w-5" />} title={t("sec.theory")} subtitle={t("th.matchScore")} accent="from-indigo-500 to-violet-600">
      <div className="space-y-3">
        {c.theories.map((th, idx) => (
          <details key={idx} className="group rounded-xl border hairline surface-soft p-4 open:surface">
            <summary className="flex cursor-pointer list-none items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-deep to-brand-purple text-xs font-bold text-white">{th.match}</span>
              <div className="flex-1"><p className="text-sm font-semibold text-ink">{tl(th.name)}</p><Meter value={th.match} className="mt-1" /></div>
              {th.noDiagram ? <Badge color="slate">{t("th.noDiagram").split("—")[0]}</Badge> : <Badge color="purple">{DIAGRAM_LABELS[th.diagram][locale]}</Badge>}
            </summary>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                {th.what && <Field label={t("th.what")}><p className="text-sm text-ink-soft">{tl(th.what)}</p></Field>}
                <Field label={t("th.relevance")}><p className="text-sm text-ink-soft">{tl(th.relevance)}</p></Field>
                {th.applicationPoints && th.applicationPoints.length > 0 && (
                  <Field label={t("th.application")}>
                    <ul className="space-y-1">{th.applicationPoints.map((p, i) => <li key={i} className="flex gap-1.5 text-sm text-ink-soft"><span className="font-bold text-brand-purple">{i + 1}.</span>{tl(p)}</li>)}</ul>
                  </Field>
                )}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <MiniList label={t("th.strengths")} items={th.strengths.map(tl)} c="text-emerald-600" prefix="+ " />
                  <MiniList label={t("th.weaknesses")} items={th.weaknesses.map(tl)} c="text-rose-600" prefix="− " />
                </div>
                {th.evaluation && <div className="rounded-lg glass-tint p-2 text-xs"><p className="font-semibold text-brand-deep">{t("pr.eval")}</p><p className="text-ink-soft">{tl(th.evaluation)}</p></div>}
              </div>
              <div>
                {th.noDiagram ? (
                  <div className="flex h-full min-h-[160px] items-center justify-center rounded-xl border border-dashed hairline-2 p-4 text-center text-xs text-ink-muted">{t("th.noDiagram")}</div>
                ) : (
                  <>
                    <p className="mb-1 text-xs font-semibold text-brand-deep">{t("th.diagram")} · {DIAGRAM_LABELS[th.diagram][locale]}</p>
                    <EconDiagram kind={th.diagram} />
                  </>
                )}
              </div>
            </div>
          </details>
        ))}
      </div>
    </ModuleCard>
  );
}

/* ============ E — MATH (educational) ============ */
export function MathSection({ c }: { c: Case }) {
  const { t, tl } = useI18n();
  return (
    <ModuleCard id="math" icon={<Calculator className="h-5 w-5" />} title={t("sec.math")} accent="from-cyan-500 to-sky-600">
      <div className="space-y-3">
        {c.methods.map((m, i) => (
          <details key={i} className="group rounded-xl border hairline surface-soft p-4 open:surface">
            <summary className="flex cursor-pointer list-none items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-sky-600 text-xs font-bold text-white">{m.fit}</span>
              <div className="flex-1"><p className="text-sm font-semibold text-ink">{tl(m.name)}</p>{m.what && <p className="text-xs text-ink-muted">{tl(m.what)}</p>}</div>
              <ChevronRight className="h-4 w-4 text-ink-muted transition-transform group-open:rotate-90" />
            </summary>
            <div className="mt-3 space-y-2.5 text-xs">
              <code className="block overflow-x-auto rounded-lg bg-slate-900/90 px-3 py-2 font-mono text-cyan-100">{m.formula}</code>
              {m.how && <SH label={t("mh.how")} val={tl(m.how)} c="text-blue-600" />}
              {m.why && <SH label={t("mh.why")} val={tl(m.why)} c="text-violet-600" />}
              {m.dataExample && <div className="rounded-lg surface p-2"><SH label={t("mh.dataExample")} val={tl(m.dataExample)} c="text-cyan-600" /></div>}
              {m.application && <SH label={t("mh.application")} val={tl(m.application)} c="text-emerald-600" />}
              <div className="grid grid-cols-2 gap-2">
                <SH label={t("math.advantages")} val={tl(m.advantages)} c="text-emerald-600" />
                <SH label={t("math.weaknesses")} val={tl(m.weaknesses)} c="text-rose-600" />
              </div>
            </div>
          </details>
        ))}
      </div>
    </ModuleCard>
  );
}

/* ============ E2 — CHARTS (clickable interpretation) ============ */
export function ChartsSection({ c }: { c: Case }) {
  const { t, tl } = useI18n();
  const charts = c.charts;
  if (!charts || !charts.length) return null;
  const render = (id: string) => id === "scatter" ? <ScatterPlot seed={c.id} /> : id === "trend" ? <TrendLine seed={c.id} /> : <CorrelationMatrix seed={c.id} />;
  return (
    <ModuleCard id="evidence" icon={<BarChart3 className="h-5 w-5" />} title={t("math.charts")} accent="from-teal-500 to-cyan-600">
      <div className="grid gap-4 lg:grid-cols-3">
        {charts.map((ch) => (
          <div key={ch.id}>
            <GlassCard className="p-3"><p className="mb-1 text-xs font-semibold text-ink-soft">{tl(ch.title)}</p>{render(ch.id)}</GlassCard>
            <details className="group mt-2 rounded-xl border hairline surface-soft p-3 open:surface">
              <summary className="flex cursor-pointer list-none items-center gap-1.5 text-xs font-semibold text-brand-deep"><ChevronRight className="h-3.5 w-3.5 transition-transform group-open:rotate-90" />{t("chart.expand")}</summary>
              <div className="mt-2 space-y-1.5 text-xs">
                <SH label={t("chart.showing")} val={tl(ch.showing)} c="text-blue-600" />
                <SH label={t("chart.trends")} val={tl(ch.trends)} c="text-violet-600" />
                <SH label={t("chart.findings")} val={tl(ch.findings)} c="text-emerald-600" />
                <SH label={t("chart.supports")} val={tl(ch.supportsArgument)} c="text-brand-deep" />
                <SH label={t("chart.limits")} val={tl(ch.limitations)} c="text-rose-600" />
              </div>
            </details>
          </div>
        ))}
      </div>
    </ModuleCard>
  );
}

/* ============ F — DATA NEEDED (replaces reliability evidence) ============ */
export function DatasetsSection({ c }: { c: Case }) {
  const { t, tl } = useI18n();
  const ds = c.neededDatasets;
  if (!ds || !ds.length) return null;
  return (
    <ModuleCard id="data" icon={<Database className="h-5 w-5" />} title={t("ds.title")} subtitle={t("ds.subtitle")} accent="from-emerald-500 to-teal-600">
      <div className="space-y-2">
        {ds.map((d, i) => (
          <details key={i} className="group rounded-xl border hairline surface-soft p-3 open:surface">
            <summary className="flex cursor-pointer list-none items-center gap-3">
              <Database className="h-4 w-4 shrink-0 text-emerald-600" />
              <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-ink">{tl(d.name)}</p><p className="truncate text-xs text-ink-muted">{d.institution} · {d.year}</p></div>
              <ChevronRight className="h-4 w-4 text-ink-muted transition-transform group-open:rotate-90" />
            </summary>
            <div className="mt-3 space-y-2 pl-7 text-xs">
              <SH label={t("ds.why")} val={tl(d.whyMatters)} c="text-blue-600" />
              <SH label={t("ds.how")} val={tl(d.howSupports)} c="text-violet-600" />
              <div className="rounded-lg surface p-2"><SH label={t("ds.sample")} val={tl(d.sampleFinding)} c="text-emerald-600" /></div>
              <div className="flex items-center gap-2 text-ink-muted"><span className="font-semibold">{t("ds.institution")}:</span> {d.institution} · {d.website}</div>
              <a href={d.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-brand-deep hover:underline"><ExternalLink className="h-3 w-3" />{t("ds.open")}</a>
            </div>
          </details>
        ))}
      </div>
    </ModuleCard>
  );
}

/* ============ G — LITERATURE (10+ papers) ============ */
export function PapersSection({ c }: { c: Case }) {
  const { t, tl } = useI18n();
  const papers = c.papers;
  return (
    <ModuleCard id="literature" icon={<Library className="h-5 w-5" />} title={t("sec.literature")} subtitle={papers ? `${papers.length} ${t("pp.title")}` : undefined} accent="from-amber-500 to-orange-600">
      {/* consensus meter retained from base */}
      <div className="mb-4">
        <div className="mb-1.5 flex justify-between text-xs font-semibold"><span className="text-emerald-600">{c.literature.consensus}% {t("lit.support")}</span><span className="text-rose-600">{100 - c.literature.consensus}% {t("lit.oppose")}</span></div>
        <div className="flex h-3 overflow-hidden rounded-full"><div className="bg-emerald-400" style={{ width: `${c.literature.consensus}%` }} /><div className="bg-rose-400" style={{ width: `${100 - c.literature.consensus}%` }} /></div>
        <p className="mt-1 text-center text-[11px] text-ink-muted">{t("lit.consensus")}</p>
      </div>
      {papers && papers.length > 0 ? (
        <div className="space-y-2">
          {papers.map((p, i) => (
            <details key={i} className="group rounded-xl border hairline surface-soft p-3 open:surface">
              <summary className="flex cursor-pointer list-none items-center gap-3">
                <BookOpen className="h-4 w-4 shrink-0 text-amber-600" />
                <div className="min-w-0 flex-1"><p className="text-sm font-semibold leading-snug text-ink">{p.citation}</p><p className="text-xs text-ink-muted">{p.authors} · {p.year}</p></div>
                <ChevronRight className="h-4 w-4 shrink-0 text-ink-muted transition-transform group-open:rotate-90" />
              </summary>
              <div className="mt-3 space-y-2 pl-7 text-xs">
                <SH label={t("pp.finding")} val={tl(p.finding)} c="text-blue-600" />
                <SH label={t("pp.helps")} val={tl(p.helps)} c="text-emerald-600" />
                <div className="rounded-lg surface p-2 italic text-ink-soft">“{tl(p.extract)}”</div>
                <a href={p.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-semibold text-brand-deep hover:underline"><ExternalLink className="h-3 w-3" />{t("pp.source")}</a>
              </div>
            </details>
          ))}
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          <div><p className="mb-2 text-xs font-semibold text-emerald-600">{t("lit.supporting")}</p><div className="space-y-2">{c.literature.supporting.map((l, i) => <div key={i} className="rounded-lg bg-emerald-50/70 p-2.5 text-xs dark:bg-emerald-500/10"><span className="font-semibold text-ink">{l.cite}</span><p className="text-ink-muted">{tl(l.finding)}</p></div>)}</div></div>
          <div><p className="mb-2 text-xs font-semibold text-rose-600">{t("lit.opposing")}</p><div className="space-y-2">{c.literature.opposing.map((l, i) => <div key={i} className="rounded-lg bg-rose-50/70 p-2.5 text-xs dark:bg-rose-500/10"><span className="font-semibold text-ink">{l.cite}</span><p className="text-ink-muted">{tl(l.finding)}</p></div>)}</div></div>
        </div>
      )}
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <ListCard title={t("lit.debates")} items={c.literature.debates.map(tl)} />
        <ListCard title={t("lit.gaps")} items={c.literature.gaps.map(tl)} />
        <ListCard title={t("lit.future")} items={c.literature.future.map(tl)} />
      </div>
    </ModuleCard>
  );
}

/* ============ H — PROPOSALS (6, with embedded evaluation) ============ */
export function ProposalsV3Section({ c }: { c: Case }) {
  const { t, tl } = useI18n();
  return (
    <ModuleCard id="proposals" icon={<Scale className="h-5 w-5" />} title={t("sec.proposals")} subtitle={`${c.proposals.length}`} accent="from-rose-500 to-pink-600">
      <div className="space-y-2">
        {c.proposals.map((p) => (
          <details key={p.id} className="group rounded-xl border hairline surface-soft p-4 open:surface">
            <summary className="flex cursor-pointer list-none items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-deep to-brand-purple text-xs font-bold text-white">{p.id}</span>
              <div className="min-w-0 flex-1"><p className="text-sm font-semibold text-ink">{tl(p.name)}</p><p className="truncate text-xs text-ink-muted">{tl(p.objective)}</p></div>
              <ChevronRight className="h-4 w-4 shrink-0 text-ink-muted transition-transform group-open:rotate-90" />
            </summary>
            <div className="mt-3 space-y-3 text-xs">
              <div className="grid grid-cols-5 gap-2">
                {([["pr.cost", "cost"], ["pr.impact", "impact"], ["pr.fairness", "fairness"], ["pr.feasibility", "feasibility"], ["pr.risk", "risk"]] as const).map(([k, f]) => (
                  <div key={f} className="rounded-lg surface p-2 text-center"><p className="text-[10px] text-ink-muted">{t(k)}</p><div className="mt-1 flex justify-center"><Dots value={p[f]} color={f === "risk" ? "#f43f5e" : "#a78bfa"} /></div></div>
                ))}
              </div>
              {p.mechanism && <SH label={t("pr.mechanism")} val={tl(p.mechanism)} c="text-blue-600" />}
              <DetailList label={t("pr.steps")} items={p.steps.map(tl)} ordered />
              <div className="grid gap-2 sm:grid-cols-2">
                <SH label={t("pr.timeline")} val={tl(p.timeline)} c="text-violet-600" />
                <SH label={t("pr.budget")} val={tl(p.budget)} c="text-cyan-600" />
              </div>
              {p.benefits && <DetailList label="Benefits" items={p.benefits.map(tl)} c="text-emerald-600" />}
              {/* embedded evaluation */}
              <div className="rounded-xl glass-tint p-3">
                <p className="mb-1.5 flex items-center gap-1 text-xs font-bold text-brand-deep"><Sigma className="h-3.5 w-3.5" />{t("pr.eval")}</p>
                <div className="space-y-1.5">
                  {p.evalProblems && <DetailList label={t("pr.evalProblems")} items={p.evalProblems.map(tl)} c="text-rose-600" />}
                  {p.evalUnintended && <DetailList label={t("pr.evalUnintended")} items={p.evalUnintended.map(tl)} c="text-amber-600" />}
                  {p.evalPolitical && <DetailList label={t("pr.evalPolitical")} items={p.evalPolitical.map(tl)} c="text-violet-600" />}
                  {p.evalTradeoffs && <DetailList label={t("pr.evalTradeoffs")} items={p.evalTradeoffs.map(tl)} c="text-blue-600" />}
                  {p.evalLongRisks && <DetailList label={t("pr.evalLongRisks")} items={p.evalLongRisks.map(tl)} c="text-rose-600" />}
                </div>
              </div>
              <DetailList label={t("pr.metrics")} items={p.metrics.map(tl)} c="text-emerald-600" />
            </div>
          </details>
        ))}
      </div>
    </ModuleCard>
  );
}

/* ============ J — ESSAY (expandable per-section guidance + levels) ============ */
export function EssayGuideSection({ c, defaultLevel }: { c: Case; defaultLevel: EssayLevelId }) {
  const { t, tl } = useI18n();
  const [level, setLevel] = useState<EssayLevelId>(defaultLevel);
  useEffect(() => setLevel(defaultLevel), [defaultLevel]);
  const data = c.essay[level];
  const levels: { id: EssayLevelId; key: DictKey }[] = [{ id: "basic", key: "es.basic" }, { id: "advanced", key: "es.advanced" }, { id: "research", key: "es.research" }];
  const guides = c.essayGuides;
  return (
    <ModuleCard id="essay" icon={<Sigma className="h-5 w-5" />} title={t("sec.essay")} accent="from-fuchsia-500 to-purple-600" copyText={`${tl(data.rq)}\n\n${tl(data.thesis)}`}>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-ink-muted">{t("es.level")}:</span>
        {levels.map((l) => <button key={l.id} onClick={() => setLevel(l.id)} className={cn("rounded-full px-3.5 py-1 text-xs font-medium transition-all", level === l.id ? "bg-gradient-to-r from-brand-deep to-brand-purple text-white shadow" : "border hairline surface-soft text-ink-soft hover:surface-strong")}>{t(l.key)}</button>)}
      </div>
      <div className="mb-4 space-y-2">
        <EssayBlock label={t("es.rq")} text={tl(data.rq)} highlight />
        <EssayBlock label={t("es.thesis")} text={tl(data.thesis)} highlight />
      </div>

      {/* SYNTHESIS LAYER — integrated arguments inheriting every prior section */}
      {c.integratedArguments && c.integratedArguments.length > 0 && (
        <div className="mb-5">
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-brand-deep to-brand-purple text-white"><Layers className="h-3.5 w-3.5" /></span>
            <div>
              <p className="text-sm font-bold text-ink">{t("ia.title")}</p>
              <p className="text-[11px] text-ink-muted">{t("ia.subtitle")}</p>
            </div>
          </div>
          <div className="space-y-3">
            {c.integratedArguments.map((a) => <IntegratedArgument key={a.n} a={a} />)}
          </div>
        </div>
      )}

      {guides && guides.length > 0 && (
        <div className="space-y-2">
          {guides.map((g) => (
            <details key={g.key} className="group rounded-xl border hairline surface-soft p-3 open:surface">
              <summary className="flex cursor-pointer list-none items-center gap-2">
                <ChevronRight className="h-4 w-4 shrink-0 text-brand-deep transition-transform group-open:rotate-90" />
                <div className="flex-1"><p className="text-sm font-semibold text-ink">{t(g.key as DictKey)}</p><p className="text-xs text-ink-muted">{tl(g.brief)}</p></div>
              </summary>
              <div className="mt-3 space-y-2 pl-6 text-xs">
                <DetailList label={t("es.whatInclude")} items={g.whatToInclude.map(tl)} c="text-blue-600" />
                <DetailList label={t("es.dataCite")} items={g.dataToCite.map(tl)} c="text-emerald-600" />
                <DetailList label={t("es.mistakes")} items={g.mistakes.map(tl)} c="text-rose-600" />
                <div className="rounded-lg glass-tint p-2"><p className="font-semibold text-brand-deep">{t("es.exampleLabel")}</p><p className="italic text-ink-soft">{tl(g.example)}</p></div>
              </div>
            </details>
          ))}
        </div>
      )}
      <div className="mt-3 rounded-xl glass-tint p-3"><p className="text-xs font-semibold uppercase tracking-wide text-brand-deep">{t("es.note")}</p><p className="mt-1 text-sm text-ink-soft">{tl(data.note)}</p></div>
    </ModuleCard>
  );
}

/* ---------- integrated argument (synthesis) ---------- */
function IntegratedArgument({ a }: { a: CaseIntegratedArgument }) {
  const { t, tl } = useI18n();
  return (
    <details className="group rounded-xl border hairline surface-soft p-4 open:surface" open={a.n === 1}>
      <summary className="flex cursor-pointer list-none items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500 to-purple-600 text-xs font-bold text-white">{a.n}</span>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">{t("ia.arg")} {a.n}</p>
          <p className="text-sm font-semibold leading-snug text-ink">{tl(a.coreClaim)}</p>
        </div>
        <ChevronRight className="h-4 w-4 shrink-0 text-ink-muted transition-transform group-open:rotate-90" />
      </summary>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {/* left: the inherited building blocks */}
        <div className="space-y-2.5 text-xs">
          <Inherit tag={t("sec.theory")} label={t("ia.theory")} color="from-indigo-500 to-violet-600">
            <p className="font-semibold text-ink">{tl(a.theory)}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-1 gap-y-1">
              {a.theoryApply.map((s, i) => (
                <span key={i} className="flex items-center gap-1">
                  <span className="rounded-md surface px-1.5 py-0.5 text-ink-soft">{tl(s)}</span>
                  {i < a.theoryApply.length - 1 && <span className="text-brand-purple">→</span>}
                </span>
              ))}
            </div>
          </Inherit>

          <Inherit tag={t("sec.math")} label={t("ia.math")} color="from-cyan-500 to-sky-600">
            <p className="font-semibold text-ink">{tl(a.mathMethod)}</p>
            <div className="mt-1 space-y-1">
              <SH label={t("ia.collect")} val={tl(a.mathSupports.collect)} c="text-blue-600" />
              <SH label={t("ia.relationship")} val={tl(a.mathSupports.relationship)} c="text-violet-600" />
              <SH label={t("ia.result")} val={tl(a.mathSupports.result)} c="text-emerald-600" />
            </div>
          </Inherit>

          <Inherit tag={t("ds.title")} label={t("ia.evidence")} color="from-emerald-500 to-teal-600">
            <p className="text-ink-soft">{tl(a.evidence)}</p>
          </Inherit>

          <Inherit tag={t("sec.literature")} label={t("ia.literature")} color="from-amber-500 to-orange-600">
            <p className="text-ink-soft">{tl(a.literature)}</p>
          </Inherit>

          <div className="rounded-lg glass-tint p-2 text-xs">
            <SH label={t("ia.evaluation")} val={tl(a.evaluation)} c="text-brand-deep" />
            <p className="mt-1 font-semibold text-ink">{t("ia.mini")}: <span className="font-normal text-ink-soft">{tl(a.miniConclusion)}</span></p>
          </div>
        </div>

        {/* right: the visual writing logic chain */}
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">{t("ia.chain")}</p>
          <div className="space-y-0">
            {a.logicChain.map((step, i) => (
              <div key={i}>
                <div className="flex items-start gap-2 rounded-lg surface px-2.5 py-1.5">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-deep to-brand-purple text-[9px] font-bold text-white">{i + 1}</span>
                  <span className="text-xs leading-snug text-ink-soft">{tl(step)}</span>
                </div>
                {i < a.logicChain.length - 1 && <div className="ml-3.5 h-3 w-px bg-brand-purple/40" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </details>
  );
}

function Inherit({ tag, label, color, children }: { tag: string; label: string; color: string; children: React.ReactNode }) {
  const { t } = useI18n();
  return (
    <div className="rounded-lg border hairline surface p-2.5">
      <div className="mb-1 flex items-center gap-1.5">
        <span className={cn("rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white bg-gradient-to-r", color)}>{tag}</span>
        <span className="text-[10px] text-ink-muted">{t("ia.from")} ↑</span>
      </div>
      <p className="mb-0.5 text-[11px] font-semibold text-ink-soft">{label}</p>
      {children}
    </div>
  );
}

/* ---------- small shared bits ---------- */
function ListCard({ title, items }: { title: string; items: string[] }) {
  return <GlassCard className="p-3"><p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">{title}</p><ul className="space-y-1.5">{items.map((it, i) => <li key={i} className="text-xs leading-relaxed text-ink-soft">• {it}</li>)}</ul></GlassCard>;
}
function EssayBlock({ label, text, highlight }: { label: string; text: string; highlight?: boolean }) {
  return <div className={cn("rounded-xl p-3.5", highlight ? "glass-tint" : "border hairline surface-soft")}><p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-deep">{label}</p><p className="text-sm leading-relaxed text-ink">{text}</p></div>;
}
function DetailList({ label, items, c, ordered }: { label: string; items: string[]; c?: string; ordered?: boolean }) {
  const List = ordered ? "ol" : "ul";
  return <div><p className={cn("mb-1 font-semibold", c ?? "text-ink-muted")}>{label}</p><List className={cn("space-y-1 pl-4 text-ink-soft", ordered ? "list-decimal" : "list-disc")}>{items.map((it, i) => <li key={i}>{it}</li>)}</List></div>;
}
