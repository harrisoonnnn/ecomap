"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Network, Quote } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { getCase } from "@/lib/cases";
import { Badge, GlassCard } from "@/components/ui/primitives";
import { cn, seededRand } from "@/lib/utils";

const FORMATS = ["APA", "MLA", "Harvard", "Chicago"] as const;

const SAMPLE = {
  authors: "Acemoglu, D., & Restrepo, P.",
  year: "2022",
  title: "Tasks, Automation, and the Rise in U.S. Wage Inequality",
  journal: "Econometrica",
  vol: "90(5)",
  pages: "1973–2016",
};

function formatCite(f: (typeof FORMATS)[number]) {
  const s = SAMPLE;
  switch (f) {
    case "APA": return `${s.authors} (${s.year}). ${s.title}. ${s.journal}, ${s.vol}, ${s.pages}.`;
    case "MLA": return `${s.authors} "${s.title}." ${s.journal} ${s.vol} (${s.year}): ${s.pages}.`;
    case "Harvard": return `${s.authors} ${s.year}, '${s.title}', ${s.journal}, vol. ${s.vol}, pp. ${s.pages}.`;
    case "Chicago": return `${s.authors} "${s.title}." ${s.journal} ${s.vol} (${s.year}): ${s.pages}.`;
  }
}

export default function LiteraturePage() {
  const { t, tl } = useI18n();
  const fw = getCase("ev-tariffs");
  const [fmt, setFmt] = useState<(typeof FORMATS)[number]>("APA");

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">{t("lh.title")}</h1>
        <p className="mt-2 max-w-2xl text-ink-soft">{t("lh.subtitle")}</p>
      </motion.div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {/* citation network */}
        <GlassCard className="p-5 lg:col-span-2">
          <p className="mb-3 flex items-center gap-1.5 font-display font-semibold text-ink"><Network className="h-4 w-4 text-brand-purple" />{t("lit.map")}</p>
          <CitationNetwork />
        </GlassCard>

        {/* consensus + authors */}
        <div className="space-y-5">
          <GlassCard className="p-5">
            <p className="mb-3 font-display font-semibold text-ink">{t("lit.consensus")}</p>
            <div className="relative mx-auto h-32 w-32">
              <svg viewBox="0 0 120 120" className="-rotate-90">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#fecdd3" strokeWidth="14" />
                <circle cx="60" cy="60" r="50" fill="none" stroke="#34d399" strokeWidth="14" strokeLinecap="round"
                  strokeDasharray={`${(fw.literature.consensus / 100) * 314} 314`} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-ink">{fw.literature.consensus}%</span>
                <span className="text-[10px] text-ink-muted">{t("lit.support")}</span>
              </div>
            </div>
            <div className="mt-3 flex justify-center gap-4 text-xs">
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-400" />{t("lit.support")}</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-rose-300" />{t("lit.oppose")}</span>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <p className="mb-2 font-display font-semibold text-ink">{t("lit.authors")}</p>
            <div className="space-y-2">
              {fw.literature.authors.map((a) => (
                <div key={a.name} className="flex items-center gap-2 rounded-lg surface p-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-deep to-brand-purple text-xs font-bold text-white">
                    {a.name.split(" ").map((x) => x[0]).join("")}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{a.name}</p>
                    <p className="text-[11px] text-ink-muted">{tl(a.field)}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* supporting / opposing */}
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <GlassCard className="p-5">
          <p className="mb-3 flex items-center gap-1.5 font-semibold text-emerald-600"><BookOpen className="h-4 w-4" />{t("lit.supporting")}</p>
          <div className="space-y-2">
            {fw.literature.supporting.map((l, i) => (
              <div key={i} className="rounded-lg bg-emerald-50/70 p-3 text-sm">
                <span className="font-semibold text-ink">{l.cite}</span>
                <p className="text-ink-muted">{tl(l.finding)}</p>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <p className="mb-3 flex items-center gap-1.5 font-semibold text-rose-600"><BookOpen className="h-4 w-4" />{t("lit.opposing")}</p>
          <div className="space-y-2">
            {fw.literature.opposing.map((l, i) => (
              <div key={i} className="rounded-lg bg-rose-50/70 p-3 text-sm">
                <span className="font-semibold text-ink">{l.cite}</span>
                <p className="text-ink-muted">{tl(l.finding)}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* citation formats */}
      <GlassCard className="mt-5 p-5">
        <p className="mb-3 flex items-center gap-1.5 font-display font-semibold text-ink"><Quote className="h-4 w-4 text-brand-purple" />{t("lit.citation")}</p>
        <div className="mb-3 flex gap-2">
          {FORMATS.map((f) => (
            <button key={f} onClick={() => setFmt(f)} className={cn("rounded-full px-3 py-1 text-xs font-medium transition-all", fmt === f ? "bg-gradient-to-r from-brand-deep to-brand-purple text-white shadow" : "border hairline surface-soft text-ink-soft hover:surface-strong")}>
              {f}
            </button>
          ))}
        </div>
        <div className="rounded-xl border hairline surface p-4">
          <p className="font-mono text-sm leading-relaxed text-ink">{formatCite(fmt)}</p>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <ListCard title={t("lit.gaps")} items={fw.literature.gaps.map((g) => tl(g))} color="amber" />
          <ListCard title={t("lit.future")} items={fw.literature.future.map((g) => tl(g))} color="blue" />
        </div>
      </GlassCard>
    </div>
  );
}

function ListCard({ title, items, color }: { title: string; items: string[]; color: "amber" | "blue" }) {
  return (
    <div className="rounded-xl border hairline surface-soft p-3">
      <Badge color={color}>{title}</Badge>
      <ul className="mt-2 space-y-1">
        {items.map((it, i) => <li key={i} className="text-xs leading-relaxed text-ink-soft">• {it}</li>)}
      </ul>
    </div>
  );
}

function CitationNetwork() {
  const rand = seededRand("citenet");
  const central = { x: 240, y: 130 };
  const nodes = Array.from({ length: 9 }, (_, i) => {
    const ang = (i / 9) * Math.PI * 2;
    const r = 80 + rand() * 50;
    return { x: central.x + Math.cos(ang) * r, y: central.y + Math.sin(ang) * r, support: rand() > 0.35, size: 5 + rand() * 6 };
  });
  return (
    <svg viewBox="0 0 480 260" className="w-full">
      {nodes.map((n, i) => (
        <line key={`l${i}`} x1={central.x} y1={central.y} x2={n.x} y2={n.y} stroke="rgba(106,168,255,0.3)" strokeWidth={1.2} />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          {nodes.slice(i + 1).map((m, j) => (rand() > 0.78 ? <line key={j} x1={n.x} y1={n.y} x2={m.x} y2={m.y} stroke="rgba(167,139,250,0.2)" /> : null))}
        </g>
      ))}
      {nodes.map((n, i) => (
        <motion.circle key={i} cx={n.x} cy={n.y} r={n.size}
          fill={n.support ? "#34d399" : "#fb7185"} fillOpacity={0.85} stroke="white" strokeWidth={2}
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.05 }} />
      ))}
      <circle cx={central.x} cy={central.y} r={16} fill="url(#g)" stroke="white" strokeWidth={3} />
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4f7cff" /><stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      <text x={central.x} y={central.y + 4} textAnchor="middle" fontSize="9" fontWeight="700" fill="white">TOPIC</text>
    </svg>
  );
}
