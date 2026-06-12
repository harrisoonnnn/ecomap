"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  MiniMap,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { Download, Map as MapIcon, Plus, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { getCase } from "@/lib/cases";
import { Button, GlassCard } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

/* ---------- custom nodes ---------- */
type NData = { label: string; kind: "root" | "branch" | "leaf" | "card"; emoji?: string; tag?: string };

function MapNode({ data }: NodeProps) {
  const d = data as NData;
  const styles = {
    root: "bg-gradient-to-br from-brand-deep via-brand-purple to-brand-cyan text-white text-sm font-bold px-5 py-3 shadow-glass-lg",
    branch: "glass-strong text-ink font-semibold text-[13px] px-4 py-2",
    leaf: "surface-strong text-ink-soft text-xs px-3 py-1.5 border hairline",
    card: "glass-strong text-ink text-xs px-3 py-2 w-44 text-left",
  } as const;
  return (
    <div className={cn("rounded-2xl backdrop-blur transition-shadow", styles[d.kind])}>
      <Handle type="target" position={Position.Top} className="!h-1.5 !w-1.5 !border-0 !bg-brand-purple/50" />
      {d.kind === "card" && d.tag && (
        <span className="mb-1 block text-[9px] font-bold uppercase tracking-wide text-brand-deep">{d.tag}</span>
      )}
      <span>{d.emoji ? `${d.emoji} ` : ""}{d.label}</span>
      <Handle type="source" position={Position.Bottom} className="!h-1.5 !w-1.5 !border-0 !bg-brand-purple/50" />
    </div>
  );
}
const nodeTypes = { map: MapNode };

/* ---------- build radial mind map ---------- */
function buildMindMap(topicId: string, locale: "en" | "zh") {
  const fw = getCase(topicId);
  const T = (o: { en: string; zh: string }) => o[locale];
  const branches: { emoji: string; label: string; leaves: string[] }[] = [
    { emoji: "🎯", label: locale === "zh" ? "成因" : "Causes", leaves: fw.factors.slice(0, 3).map((p) => T(p.summary)) },
    { emoji: "👥", label: locale === "zh" ? "利益相关者" : "Stakeholders", leaves: fw.summary.stakeholders.slice(0, 4).map((s) => T(s)) },
    { emoji: "🧠", label: locale === "zh" ? "理论" : "Theories", leaves: fw.theories.slice(0, 3).map((t) => `${T(t.name)} ${t.match}%`) },
    { emoji: "🔍", label: locale === "zh" ? "证据" : "Evidence", leaves: fw.evidence.slice(0, 3).map((e) => `${e.grade} · ${e.publisher}`) },
    { emoji: "📊", label: locale === "zh" ? "数据" : "Data", leaves: fw.datasets.slice(0, 3).map((d) => d.provider) },
    { emoji: "⚖", label: locale === "zh" ? "方案" : "Proposals", leaves: fw.proposals.map((p) => T(p.name)) },
    { emoji: "⚠", label: locale === "zh" ? "风险" : "Risks", leaves: fw.critical.slice(4, 7).map((c) => T(c.text).slice(0, 28) + "…") },
  ];

  const nodes: Node[] = [{ id: "root", type: "map", position: { x: 0, y: 0 }, data: { label: T(fw.event).slice(0, 40), kind: "root" } }];
  const edges: Edge[] = [];
  const R = 320;
  branches.forEach((b, i) => {
    const ang = (i / branches.length) * Math.PI * 2 - Math.PI / 2;
    const bx = Math.cos(ang) * R;
    const by = Math.sin(ang) * R;
    const bid = `b${i}`;
    nodes.push({ id: bid, type: "map", position: { x: bx, y: by }, data: { label: b.label, kind: "branch", emoji: b.emoji } });
    edges.push({ id: `e-root-${bid}`, source: "root", target: bid, animated: true, style: { stroke: "rgba(167,139,250,0.5)", strokeWidth: 2 } });
    b.leaves.forEach((leaf, j) => {
      const lid = `${bid}-l${j}`;
      const spread = (j - (b.leaves.length - 1) / 2) * 70;
      const lx = bx + Math.cos(ang) * 170 - Math.sin(ang) * spread;
      const ly = by + Math.sin(ang) * 170 + Math.cos(ang) * spread;
      nodes.push({ id: lid, type: "map", position: { x: lx, y: ly }, data: { label: leaf, kind: "leaf" } });
      edges.push({ id: `e-${bid}-${lid}`, source: bid, target: lid, style: { stroke: "rgba(106,168,255,0.4)" } });
    });
  });
  return { nodes, edges };
}

/* ---------- canvas (free-form) ---------- */
function buildCanvas(topicId: string, locale: "en" | "zh") {
  const fw = getCase(topicId);
  const T = (o: { en: string; zh: string }) => o[locale];
  const cards: { id: string; tag: string; label: string; x: number; y: number }[] = [
    { id: "c-news", tag: locale === "zh" ? "新闻" : "News", label: T(fw.event).slice(0, 50), x: 60, y: 40 },
    { id: "c-theory", tag: locale === "zh" ? "理论" : "Theory", label: T(fw.theories[0].name), x: 380, y: 30 },
    { id: "c-theory2", tag: locale === "zh" ? "理论" : "Theory", label: T(fw.theories[1].name), x: 380, y: 160 },
    { id: "c-paper", tag: locale === "zh" ? "文献" : "Paper", label: fw.literature.supporting[0].cite, x: 60, y: 230 },
    { id: "c-evidence", tag: locale === "zh" ? "证据" : "Evidence", label: `${fw.evidence[0].grade} ${fw.evidence[0].publisher}`, x: 680, y: 90 },
    { id: "c-proposal", tag: locale === "zh" ? "方案" : "Proposal", label: T(fw.proposals[1].name), x: 680, y: 230 },
    { id: "c-note", tag: locale === "zh" ? "笔记" : "Note", label: locale === "zh" ? "净福利效应取决于弹性与报复风险" : "Net welfare hinges on elasticities & retaliation", x: 360, y: 300 },
  ];
  const nodes: Node[] = cards.map((c) => ({ id: c.id, type: "map", position: { x: c.x, y: c.y }, data: { label: c.label, kind: "card", tag: c.tag } }));
  const links: [string, string][] = [["c-news", "c-theory"], ["c-news", "c-theory2"], ["c-news", "c-paper"], ["c-theory", "c-evidence"], ["c-evidence", "c-proposal"], ["c-theory2", "c-note"], ["c-paper", "c-note"]];
  const edges: Edge[] = links.map(([s, t], i) => ({ id: `ce${i}`, source: s, target: t, animated: true, style: { stroke: "rgba(167,139,250,0.45)", strokeWidth: 2 } }));
  return { nodes, edges };
}

export function MindMapClient({ topicId = "ev-tariffs" }: { topicId?: string }) {
  const { t, locale } = useI18n();
  const [view, setView] = useState<"mindmap" | "canvas">("mindmap");

  const initial = useMemo(
    () => (view === "mindmap" ? buildMindMap(topicId, locale) : buildCanvas(topicId, locale)),
    [view, topicId, locale]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initial.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initial.edges);

  // resync when view/locale changes
  useEffect(() => {
    setNodes(initial.nodes);
    setEdges(initial.edges);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, locale, topicId]);

  const addNode = useCallback(() => {
    const id = `n${Date.now()}`;
    setNodes((nds) => [
      ...nds,
      { id, type: "map", position: { x: Math.random() * 200, y: Math.random() * 200 }, data: { label: locale === "zh" ? "新节点" : "New idea", kind: "leaf" } },
    ]);
  }, [setNodes, locale]);

  function exportPng() {
    // deterministic manual render to canvas (no extra deps)
    const padding = 80;
    const xs = nodes.map((n) => n.position.x);
    const ys = nodes.map((n) => n.position.y);
    const minX = Math.min(...xs) - padding, minY = Math.min(...ys) - padding;
    const maxX = Math.max(...xs) + padding + 200, maxY = Math.max(...ys) + padding + 60;
    const w = maxX - minX, h = maxY - minY;
    const canvas = document.createElement("canvas");
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#f4f8ff"); grad.addColorStop(1, "#f6f1ff");
    ctx.fillStyle = grad; ctx.fillRect(0, 0, w, h);
    // edges
    ctx.strokeStyle = "rgba(106,168,255,0.5)"; ctx.lineWidth = 2;
    const pos = (id: string) => nodes.find((n) => n.id === id)!.position;
    edges.forEach((e) => {
      const a = pos(e.source), b = pos(e.target);
      ctx.beginPath();
      ctx.moveTo(a.x - minX + 40, a.y - minY + 16);
      ctx.lineTo(b.x - minX + 40, b.y - minY + 16);
      ctx.stroke();
    });
    // nodes
    nodes.forEach((n) => {
      const d = n.data as NData;
      const x = n.position.x - minX, y = n.position.y - minY;
      ctx.fillStyle = d.kind === "root" ? "#4f7cff" : "rgba(255,255,255,0.92)";
      roundRect(ctx, x, y, d.kind === "root" ? 200 : 150, 34, 12);
      ctx.fill();
      ctx.fillStyle = d.kind === "root" ? "#fff" : "#1b2436";
      ctx.font = `${d.kind === "root" ? "bold " : ""}13px Inter, sans-serif`;
      ctx.fillText(String(d.label).slice(0, 22), x + 12, y + 22);
    });
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `ecomap-mindmap-${topicId}.png`;
    a.click();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink">{t("mm.title")}</h1>
          <p className="mt-1 text-ink-soft">{t("mm.subtitle")}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-full border hairline surface-soft p-0.5">
            {(["mindmap", "canvas"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn("flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all", view === v ? "bg-gradient-to-r from-brand-deep to-brand-purple text-white shadow" : "text-ink-soft")}
              >
                {v === "mindmap" ? <MapIcon className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
                {v === "mindmap" ? t("mm.mindmap") : t("mm.canvas")}
              </button>
            ))}
          </div>
          <Button variant="soft" size="sm" onClick={addNode}><Plus className="h-4 w-4" />{t("mm.add")}</Button>
          <Button size="sm" onClick={exportPng}><Download className="h-4 w-4" />{t("mm.exportPng")}</Button>
        </div>
      </div>

      <GlassCard className="overflow-hidden p-1.5">
        <div style={{ height: "70vh" }} className="rounded-2xl surface-soft">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            minZoom={0.2}
            proOptions={{ hideAttribution: true }}
          >
            <Background variant={BackgroundVariant.Dots} gap={22} size={1.5} color="rgba(106,168,255,0.25)" />
            <Controls className="!rounded-xl !border-0 !shadow-glass" showInteractive={false} />
            <MiniMap pannable zoomable className="!rounded-xl" nodeColor={() => "#a78bfa"} maskColor="rgba(244,248,255,0.6)" />
          </ReactFlow>
        </div>
      </GlassCard>
    </div>
  );
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
