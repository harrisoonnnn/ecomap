"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, FolderOpen, Network, Plus, Star } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { DASHBOARD_STATS, FOLDERS, PROJECTS } from "@/lib/data/projects";
import { CATEGORY_META } from "@/lib/data/news";
import { Badge, Button, GlassCard } from "@/components/ui/primitives";
import { cn, seededRand } from "@/lib/utils";

export default function DashboardPage() {
  const { t } = useI18n();
  const [folder, setFolder] = useState<string | "all">("all");

  const visible = PROJECTS.filter((p) => folder === "all" || p.folder === folder);
  const favorites = PROJECTS.filter((p) => p.favorite);

  const stats = [
    { label: t("db.stat.projects"), value: DASHBOARD_STATS.projects },
    { label: t("db.stat.sources"), value: DASHBOARD_STATS.sources },
    { label: t("db.stat.theories"), value: DASHBOARD_STATS.theories },
    { label: t("db.stat.words"), value: DASHBOARD_STATS.words.toLocaleString() },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">{t("db.title")}</h1>
          <p className="mt-2 text-ink-soft">{t("db.subtitle")}</p>
        </div>
        <Link href="/assistant"><Button><Plus className="h-4 w-4" />{t("db.new")}</Button></Link>
      </div>

      {/* stats */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <GlassCard className="p-4">
              <p className="font-display text-2xl font-bold text-gradient">{s.value}</p>
              <p className="text-xs text-ink-muted">{s.label}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {/* projects */}
        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center gap-2">
            <FolderOpen className="h-4 w-4 text-brand-deep" />
            <h2 className="font-display font-semibold text-ink">{t("db.projects")}</h2>
          </div>
          <div className="no-scrollbar mb-3 flex gap-2 overflow-x-auto">
            <FolderChip active={folder === "all"} onClick={() => setFolder("all")}>{t("news.all")}</FolderChip>
            {FOLDERS.map((f) => <FolderChip key={f} active={folder === f} onClick={() => setFolder(f)}>{f}</FolderChip>)}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {visible.map((p) => {
              const meta = CATEGORY_META[p.category];
              return (
                <Link key={p.id} href={`/workspace/${p.event}`}>
                  <GlassCard className="group flex items-center gap-3 p-4 transition-all hover:-translate-y-0.5 hover:shadow-glass-lg">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-deep/10 to-brand-purple/10 text-xl">{meta.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink">{p.title}</p>
                      <p className="text-[11px] text-ink-muted">{p.folder} · {p.updated}</p>
                    </div>
                    {p.favorite && <Star className="h-4 w-4 fill-amber-400 text-amber-400" />}
                    <ArrowRight className="h-4 w-4 text-ink-muted transition-transform group-hover:translate-x-0.5" />
                  </GlassCard>
                </Link>
              );
            })}
          </div>
        </div>

        {/* right column */}
        <div className="space-y-5">
          <GlassCard className="p-5">
            <p className="mb-2 flex items-center gap-1.5 font-display font-semibold text-ink"><Star className="h-4 w-4 text-amber-400" />{t("db.favorites")}</p>
            <div className="space-y-1.5">
              {favorites.map((p) => (
                <Link key={p.id} href={`/workspace/${p.event}`} className="flex items-center justify-between rounded-lg surface-soft px-3 py-2 text-sm hover:surface-strong">
                  <span className="truncate text-ink-soft">{p.title}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-ink-muted" />
                </Link>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <p className="mb-2 flex items-center gap-1.5 font-display font-semibold text-ink"><Clock className="h-4 w-4 text-brand-deep" />{t("db.recent")}</p>
            <div className="space-y-1.5">
              {PROJECTS.slice(0, 4).map((p) => (
                <Link key={p.id} href={`/workspace/${p.event}`} className="block truncate rounded-lg px-3 py-1.5 text-sm text-ink-soft hover:surface">
                  {p.title}
                </Link>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* knowledge graph */}
      <GlassCard className="mt-6 p-5">
        <p className="mb-3 flex items-center gap-1.5 font-display font-semibold text-ink"><Network className="h-4 w-4 text-brand-purple" />{t("db.graph")}</p>
        <KnowledgeGraph />
      </GlassCard>
    </div>
  );
}

function FolderChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={cn("shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all", active ? "bg-gradient-to-r from-brand-deep to-brand-purple text-white shadow" : "border hairline surface-soft text-ink-soft hover:surface-strong")}>
      {children}
    </button>
  );
}

function KnowledgeGraph() {
  const rand = seededRand("kg");
  const W = 900, H = 300;
  const nodes = PROJECTS.map((p, i) => {
    const ang = (i / PROJECTS.length) * Math.PI * 2;
    const r = 90 + rand() * 60;
    return { id: p.id, title: p.title, cat: p.category, x: W / 2 + Math.cos(ang) * r * 2.4, y: H / 2 + Math.sin(ang) * r };
  });
  // connect projects in same folder
  const links: [number, number][] = [];
  PROJECTS.forEach((a, i) => PROJECTS.forEach((b, j) => {
    if (i < j && a.folder === b.folder) links.push([i, j]);
  }));
  // a few cross links
  links.push([0, 2], [1, 5], [3, 6]);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full text-ink">
      {links.map(([a, b], i) => (
        <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="rgba(167,139,250,0.25)" strokeWidth={1.2} />
      ))}
      {nodes.map((n, i) => (
        <motion.g key={n.id} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
          <circle cx={n.x} cy={n.y} r={12} fill="url(#kgrad)" stroke="rgba(255,255,255,0.85)" strokeWidth={2.5} />
          <text x={n.x} y={n.y - 18} textAnchor="middle" fontSize="11" fontWeight="600" fill="currentColor">{n.title.length > 22 ? n.title.slice(0, 20) + "…" : n.title}</text>
          <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="11">{CATEGORY_META[n.cat].emoji}</text>
        </motion.g>
      ))}
      <defs>
        <linearGradient id="kgrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4f7cff" /><stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
    </svg>
  );
}
