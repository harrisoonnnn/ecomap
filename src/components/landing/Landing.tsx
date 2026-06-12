"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  FileText,
  LineChart,
  Map,
  Newspaper,
  Play,
  Scale,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { Button, GlassCard } from "@/components/ui/primitives";
import type { DictKey } from "@/lib/i18n/dictionaries";

const PIPELINE: { id: string; key: DictKey; tip: DictKey; icon: React.ElementType; color: string }[] = [
  { id: "news", key: "wf.news", tip: "wf.news.tip", icon: Newspaper, color: "from-sky-400 to-blue-500" },
  { id: "analysis", key: "wf.analysis", tip: "wf.analysis.tip", icon: Search, color: "from-blue-400 to-indigo-500" },
  { id: "theory", key: "wf.theory", tip: "wf.theory.tip", icon: BrainCircuit, color: "from-indigo-400 to-violet-500" },
  { id: "evidence", key: "wf.evidence", tip: "wf.evidence.tip", icon: BookOpen, color: "from-violet-400 to-purple-500" },
  { id: "mindmap", key: "wf.mindmap", tip: "wf.mindmap.tip", icon: Map, color: "from-fuchsia-400 to-purple-500" },
  { id: "proposal", key: "wf.proposal", tip: "wf.proposal.tip", icon: Scale, color: "from-purple-400 to-pink-500" },
  { id: "evaluation", key: "wf.evaluation", tip: "wf.evaluation.tip", icon: TrendingUp, color: "from-cyan-400 to-sky-500" },
  { id: "essay", key: "wf.essay", tip: "wf.essay.tip", icon: FileText, color: "from-teal-400 to-cyan-500" },
];

const FEATURES: { icon: React.ElementType; t: DictKey; d: DictKey; ex: DictKey; emoji: string }[] = [
  { icon: LineChart, t: "feat.models.t", d: "feat.models.d", ex: "feat.models.ex", emoji: "📈" },
  { icon: BookOpen, t: "feat.lit.t", d: "feat.lit.d", ex: "feat.lit.ex", emoji: "📚" },
  { icon: Sparkles, t: "feat.copilot.t", d: "feat.copilot.d", ex: "feat.copilot.ex", emoji: "🧠" },
  { icon: Map, t: "feat.mindmap.t", d: "feat.mindmap.d", ex: "feat.mindmap.ex", emoji: "🗺" },
  { icon: LineChart, t: "feat.data.t", d: "feat.data.d", ex: "feat.data.ex", emoji: "📊" },
  { icon: FileText, t: "feat.essay.t", d: "feat.essay.d", ex: "feat.essay.ex", emoji: "📝" },
  { icon: Scale, t: "feat.policy.t", d: "feat.policy.d", ex: "feat.policy.ex", emoji: "⚖" },
  { icon: Search, t: "feat.evidence.t", d: "feat.evidence.d", ex: "feat.evidence.ex", emoji: "🔍" },
];

export function Landing() {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-7xl px-4 pb-10">
      {/* HERO */}
      <section className="relative flex flex-col items-center pt-16 text-center sm:pt-24">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border hairline surface px-4 py-1.5 text-xs font-medium text-brand-deep backdrop-blur">
          <Sparkles className="h-3.5 w-3.5" />
          {t("hero.badge")}
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-7xl">
          <span className="text-gradient">{t("hero.tagline")}</span>
          <br />
          <span className="text-ink">{t("hero.tagline2")}</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-6 max-w-2xl text-balance text-lg text-ink-soft">
          {t("hero.subtitle")}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Link href="/assistant"><Button size="lg" className="group">{t("cta.start")}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></Button></Link>
          <Link href="/news"><Button size="lg" variant="soft"><Newspaper className="h-4 w-4" />{t("cta.explore")}</Button></Link>
        </motion.div>

        {/* auto-playing demo */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }} className="mt-16 w-full max-w-4xl">
          <DemoPlayer />
        </motion.div>
      </section>

      {/* INTERACTIVE PIPELINE */}
      <section className="mt-28">
        <h2 className="text-center font-display text-2xl font-bold text-ink sm:text-3xl">{t("hero.workflowTitle")}</h2>
        <p className="mt-2 text-center text-sm text-ink-muted">{t("hero.workflowHint")}</p>
        <div className="no-scrollbar mt-10 flex items-start gap-1.5 overflow-x-auto pb-4 sm:justify-center">
          {PIPELINE.map((step, i) => (
            <div key={step.id} className="flex items-start gap-1.5">
              <PipelineStage step={step} index={i} />
              {i < PIPELINE.length - 1 && (
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 + 0.1 }} className="mt-8 hidden sm:block">
                  <ArrowRight className="h-4 w-4 text-brand-purple/50" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FEATURE FLIP CARDS */}
      <section className="mt-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">{t("features.title")}</h2>
          <p className="mt-3 text-ink-soft">{t("features.subtitle")}</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <motion.div key={f.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ delay: (i % 4) * 0.06 }}>
              <FlipCard f={f} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-28">
        <GlassCard tint className="relative overflow-hidden p-10 text-center sm:p-14">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-purple/20 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-brand-cyan/20 blur-3xl" />
          <h2 className="relative font-display text-3xl font-bold text-ink sm:text-4xl">{t("hero.tagline")} {t("hero.tagline2")}</h2>
          <p className="relative mx-auto mt-3 max-w-xl text-ink-soft">{t("hero.subtitle")}</p>
          <div className="relative mt-7 flex justify-center gap-3">
            <Link href="/workspace/ev-tariffs"><Button size="lg">{t("cta.tryDemo")}<ArrowRight className="h-4 w-4" /></Button></Link>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}

/* ---------------- Interactive pipeline stage with tooltip ---------------- */
function PipelineStage({ step, index }: { step: (typeof PIPELINE)[number]; index: number }) {
  const { t } = useI18n();
  const [hover, setHover] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <motion.div initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
        <GlassCard className={`flex w-24 shrink-0 cursor-default flex-col items-center gap-2 px-2 py-3 transition-all ${hover ? "-translate-y-1 shadow-glass-lg" : ""}`}>
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} text-white shadow-md`}>
            <step.icon className="h-5 w-5" />
          </div>
          <span className="text-xs font-semibold text-ink">{t(step.key)}</span>
        </GlassCard>
      </motion.div>
      <AnimatePresence>
        {hover && (
          <motion.div initial={{ opacity: 0, y: 6, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.96 }}
            className="glass-strong absolute left-1/2 top-full z-30 mt-2 w-52 -translate-x-1/2 rounded-2xl p-3 text-left shadow-glass-lg">
            <p className="mb-1 text-xs font-bold text-brand-deep">{t(step.key)}</p>
            <p className="text-[11px] leading-relaxed text-ink-soft">{t(step.tip)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- 3D flip card ---------------- */
function FlipCard({ f }: { f: (typeof FEATURES)[number] }) {
  const { t } = useI18n();
  return (
    <div className="flip-card h-48" tabIndex={0}>
      <div className="flip-inner h-full w-full">
        {/* front */}
        <GlassCard className="flip-face flex h-full flex-col p-5">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-deep/10 to-brand-purple/15 text-2xl">{f.emoji}</div>
          <h3 className="font-display text-base font-semibold text-ink">{t(f.t)}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{t(f.d)}</p>
          <span className="mt-auto text-[10px] font-medium uppercase tracking-wide text-brand-purple/70">{t("feat.flipHint")} ↻</span>
        </GlassCard>
        {/* back */}
        <GlassCard tint className="flip-face flip-back flex h-full flex-col p-5">
          <h3 className="font-display text-base font-semibold text-ink">{t(f.t)}</h3>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-brand-deep">{t("feat.example")}</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-soft">{t(f.ex)}</p>
        </GlassCard>
      </div>
    </div>
  );
}

/* ---------------- Auto-playing looping product demo ---------------- */
function DemoPlayer() {
  const { t } = useI18n();
  const [step, setStep] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setStep((s) => (s + 1) % PIPELINE.length), 2200);
    return () => clearInterval(iv);
  }, []);
  const cur = PIPELINE[step];

  return (
    <GlassCard className="overflow-hidden p-1.5 shadow-glass-lg">
      <div className="rounded-[14px] surface-strong p-4">
        {/* window chrome */}
        <div className="mb-3 flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-rose-300" />
          <span className="h-3 w-3 rounded-full bg-amber-300" />
          <span className="h-3 w-3 rounded-full bg-emerald-300" />
          <span className="ml-3 flex items-center gap-1 text-xs text-ink-muted"><Play className="h-3 w-3" />{t("demo.badge")}</span>
          <span className="ml-auto rounded-full bg-brand-deep/10 px-2 py-0.5 text-[10px] font-semibold text-brand-deep">ecomap · {t(cur.key)}</span>
        </div>

        {/* progress bars */}
        <div className="mb-3 flex gap-1">
          {PIPELINE.map((s, i) => (
            <div key={s.id} className="h-1 flex-1 overflow-hidden rounded-full bg-ink/10">
              <motion.div className="h-full bg-gradient-to-r from-brand-deep to-brand-purple" initial={false} animate={{ width: i <= step ? "100%" : "0%" }} transition={{ duration: i === step ? 2.1 : 0.3, ease: "linear" }} />
            </div>
          ))}
        </div>

        {/* stage screen */}
        <div className="relative h-44 overflow-hidden rounded-xl">
          <AnimatePresence mode="wait">
            <motion.div key={cur.id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.4 }} className="absolute inset-0">
              <DemoScreen step={step} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </GlassCard>
  );
}

function DemoScreen({ step }: { step: number }) {
  const { t } = useI18n();
  const s = PIPELINE[step];
  return (
    <div className="flex h-full gap-3">
      <div className="flex w-40 shrink-0 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-brand-deep/10 to-brand-purple/10 p-3 text-center">
        <div className={`mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} text-white shadow-md`}>
          <s.icon className="h-6 w-6" />
        </div>
        <p className="text-sm font-bold text-ink">{t(s.key)}</p>
      </div>
      <div className="flex-1 space-y-2">
        <p className="text-xs leading-relaxed text-ink-soft">{t(s.tip)}</p>
        {step === 2 && (
          <div className="flex flex-wrap gap-1.5">
            {[96, 92, 88].map((n) => <span key={n} className="rounded-full bg-brand-blue/15 px-2 py-0.5 text-[10px] font-semibold text-brand-deep">{n}%</span>)}
          </div>
        )}
        {step === 3 && (
          <div className="space-y-1">
            {([["A+", "bg-emerald-300", "w-full"], ["A", "bg-blue-300", "w-4/5"], ["B", "bg-amber-300", "w-3/5"]] as const).map(([g, c, w]) => (
              <div key={g} className="flex items-center gap-2">
                <span className="w-5 text-[10px] font-bold text-ink-muted">{g}</span>
                <div className={`h-1.5 rounded ${c} ${w}`} />
              </div>
            ))}
          </div>
        )}
        {step !== 2 && step !== 3 && (
          <div className="space-y-1.5">
            <div className="h-2 w-5/6 rounded bg-ink/10" />
            <div className="h-2 w-2/3 rounded bg-ink/10" />
            <div className="h-2 w-3/4 rounded bg-ink/10" />
          </div>
        )}
      </div>
    </div>
  );
}
