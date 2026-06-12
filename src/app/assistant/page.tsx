"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  FileText,
  FileUp,
  Link2,
  Loader2,
  Mic,
  Sparkles,
  Type,
} from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { Button, GlassCard } from "@/components/ui/primitives";
import { EXAMPLE_PROMPTS } from "@/lib/ai/generate";
import { SECTIONS_FOR_PROGRESS } from "@/lib/ai/progress";
import { cn } from "@/lib/utils";

const INPUTS = [
  { id: "text", icon: Type, key: "as.text" as const },
  { id: "voice", icon: Mic, key: "as.voice" as const },
  { id: "pdf", icon: FileUp, key: "as.pdf" as const },
  { id: "url", icon: Link2, key: "as.url" as const },
  { id: "paper", icon: FileText, key: "as.paper" as const },
];

export default function AssistantPage() {
  const { t, locale } = useI18n();
  const router = useRouter();
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("text");
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [targetId, setTargetId] = useState("ev-tariffs");

  function run(prompt: string, id?: string) {
    const text = prompt.trim();
    if (!text) return;
    // example chips pass an explicit id; a clear keyword match jumps to a rich
    // hero case; anything else is analysed as a brand-new custom topic.
    const hero = id ?? matchHero(text);
    const target = hero ?? slugify(text);
    const href = hero ? `/workspace/${target}` : `/workspace/${target}?q=${encodeURIComponent(text)}`;
    setTargetId(target);
    setRunning(true);
    setStep(0);
    const steps = SECTIONS_FOR_PROGRESS.length;
    const iv = setInterval(() => {
      setStep((s) => {
        if (s >= steps - 1) {
          clearInterval(iv);
          setTimeout(() => router.push(href), 600);
          return s;
        }
        return s + 1;
      });
    }, 360);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <div className="text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-brand-deep via-brand-purple to-brand-cyan text-white shadow-glass-lg">
          <Sparkles className="h-8 w-8" />
        </motion.div>
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">{t("as.title")}</h1>
        <p className="mx-auto mt-3 max-w-xl text-ink-soft">{t("as.subtitle")}</p>
      </div>

      <GlassCard className="mt-8 p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {INPUTS.map((inp) => (
            <button
              key={inp.id}
              onClick={() => setMode(inp.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all",
                mode === inp.id ? "bg-gradient-to-r from-brand-deep to-brand-purple text-white shadow" : "border hairline surface-soft text-ink-soft hover:surface-strong"
              )}
            >
              <inp.icon className="h-3.5 w-3.5" />
              {t(inp.key)}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border hairline surface-soft p-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "url" ? "https://…" : t("as.placeholder")}
            rows={3}
            className="w-full resize-none bg-transparent px-3 py-2 text-sm outline-none placeholder:text-ink-muted/70"
          />
          <div className="flex items-center justify-between px-2 pb-1">
            <span className="text-[11px] text-ink-muted">{t("common.poweredBy")}</span>
            <Button onClick={() => run(input)} disabled={!input.trim()}>
              {t("as.generate")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">{t("as.examples")}</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_PROMPTS.map((ex) => (
              <button
                key={ex.id}
                onClick={() => { setInput(ex[locale]); run(ex[locale], ex.id); }}
                className="rounded-full border hairline surface-soft px-3 py-1.5 text-xs font-medium text-brand-deep transition-all hover:-translate-y-0.5 hover:surface-strong"
              >
                {ex[locale]}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      <AnimatePresence>
        {running && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center surface-soft backdrop-blur-md"
          >
            <GlassCard className="w-[22rem] p-6">
              <div className="mb-4 flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin text-brand-deep" />
                <p className="font-display font-semibold text-ink">{t("as.steps")}</p>
              </div>
              <div className="space-y-2">
                {SECTIONS_FOR_PROGRESS.map((s, i) => (
                  <div key={s.en} className="flex items-center gap-2 text-sm">
                    <span className={cn("flex h-5 w-5 items-center justify-center rounded-full text-[10px]", i < step ? "bg-emerald-100 text-emerald-600" : i === step ? "bg-brand-blue/20 text-brand-deep" : "bg-slate-100 text-slate-400")}>
                      {i < step ? <Check className="h-3 w-3" /> : i + 1}
                    </span>
                    <span className={cn(i <= step ? "text-ink" : "text-ink-muted")}>{s[locale]}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Only jump to a hand-authored hero case on a clear match; otherwise null. */
function matchHero(prompt: string): string | null {
  const p = prompt.toLowerCase();
  if ((p.includes("tariff") || p.includes("关税")) && (p.includes("ev") || p.includes("electric") || p.includes("电动") || p.includes("car") || p.includes("vehicle"))) return "ev-tariffs";
  if ((p.includes("delivery") || p.includes("外卖") || p.includes("rider") || p.includes("骑手")) && (p.includes("insur") || p.includes("social") || p.includes("保险") || p.includes("社保") || p.includes("welfare") || p.includes("gig"))) return "delivery-workers";
  return null;
}

/** Turn an arbitrary prompt into a stable, URL-safe topic id for seeding. */
function slugify(text: string): string {
  const base = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
  if (base) return base;
  // non-latin (e.g. Chinese) prompt → deterministic hash id
  let h = 5381;
  for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) >>> 0;
  return `topic-${h.toString(36)}`;
}
