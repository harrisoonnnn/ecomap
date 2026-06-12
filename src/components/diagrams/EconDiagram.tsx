"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DiagramKind } from "@/types";
import { cn } from "@/lib/utils";

const W = 320;
const H = 230;
const PAD = 34;

function Axes({ x, y }: { x: string; y: string }) {
  return (
    <>
      <line x1={PAD} y1={H - PAD} x2={W - 8} y2={H - PAD} stroke="#94a3b8" strokeWidth={1.5} />
      <line x1={PAD} y1={H - PAD} x2={PAD} y2={10} stroke="#94a3b8" strokeWidth={1.5} />
      <polygon points={`${W - 8},${H - PAD} ${W - 14},${H - PAD - 4} ${W - 14},${H - PAD + 4}`} fill="#94a3b8" />
      <polygon points={`${PAD},10 ${PAD - 4},16 ${PAD + 4},16`} fill="#94a3b8" />
      <text x={W - 14} y={H - PAD + 18} fontSize="10" fill="#64748b" textAnchor="end">{x}</text>
      <text x={PAD - 8} y={18} fontSize="10" fill="#64748b" textAnchor="end">{y}</text>
    </>
  );
}

function Line({ d, color, label, lx, ly, dash }: { d: string; color: string; label: string; lx: number; ly: number; dash?: boolean }) {
  return (
    <>
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeDasharray={dash ? "5 4" : undefined}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      <text x={lx} y={ly} fontSize="11" fontWeight={600} fill={color}>{label}</text>
    </>
  );
}

function Dot({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <>
      <line x1={x} y1={y} x2={x} y2={H - PAD} stroke="#cbd5e1" strokeDasharray="3 3" />
      <line x1={x} y1={y} x2={PAD} y2={y} stroke="#cbd5e1" strokeDasharray="3 3" />
      <circle cx={x} cy={y} r={4} fill="#4f7cff" stroke="white" strokeWidth={2} />
      <text x={x + 6} y={y - 6} fontSize="11" fontWeight={700} fill="#1b2436">{label}</text>
    </>
  );
}

/** A shift toggle lets the user nudge a curve — interactive comparative statics. */
export function EconDiagram({ kind, className }: { kind: DiagramKind; className?: string }) {
  const [shift, setShift] = useState(0); // -1, 0, +1

  const dx = shift * 26;

  function render() {
    switch (kind) {
      case "supplyDemand":
      case "externalities": {
        const demand = `M ${PAD + 10} 30 L ${W - 30} ${H - PAD - 10}`;
        const supply = `M ${PAD + 10} ${H - PAD - 10} L ${W - 30} 30`;
        const supply2 = `M ${PAD + 10 + dx} ${H - PAD - 10} L ${W - 30 + dx} 30`;
        return (
          <>
            <Axes x="Quantity" y="Price" />
            <Line d={demand} color="#4f7cff" label="D" lx={W - 26} ly={H - PAD - 6} />
            <Line d={supply} color="#a78bfa" label="S" lx={W - 26} ly={34} />
            {shift !== 0 && <Line d={supply2} color="#22d3ee" label="S′" lx={W - 26} ly={50} dash />}
            {kind === "externalities" && (
              <Line d={`M ${PAD + 30} ${H - PAD - 10} L ${W - 10} 50`} color="#f59e0b" label="MSC" lx={W - 40} ly={62} dash />
            )}
            <Dot x={(PAD + W) / 2} y={H / 2} label="E" />
          </>
        );
      }
      case "labourMarket": {
        return (
          <>
            <Axes x="Employment (L)" y="Wage (W)" />
            <Line d={`M ${PAD + 10} 30 L ${W - 30} ${H - PAD - 10}`} color="#4f7cff" label="Dʟ" lx={W - 30} ly={H - PAD - 6} />
            <Line d={`M ${PAD + 10} ${H - PAD - 10} L ${W - 30} 30`} color="#a78bfa" label="Sʟ" lx={W - 30} ly={34} />
            <line x1={PAD} y1={70} x2={W - 20} y2={70} stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 4" />
            <text x={W - 60} y={64} fontSize="11" fontWeight={600} fill="#f59e0b">W min</text>
            <Dot x={(PAD + W) / 2} y={H / 2} label="E" />
          </>
        );
      }
      case "adas": {
        return (
          <>
            <Axes x="Real GDP (Y)" y="Price level" />
            <Line d={`M ${PAD + 10} 30 L ${W - 30} ${H - PAD - 10}`} color="#4f7cff" label="AD" lx={W - 34} ly={H - PAD - 6} />
            {shift !== 0 && <Line d={`M ${PAD + 10 + dx} 30 L ${W - 30 + dx} ${H - PAD - 10}`} color="#22d3ee" label="AD′" lx={W - 40} ly={H - PAD - 22} dash />}
            <path d={`M ${PAD + 10} ${H - PAD - 10} Q 150 ${H - PAD - 30} 200 80 L 210 30`} fill="none" stroke="#a78bfa" strokeWidth={2.5} />
            <text x={205} y={46} fontSize="11" fontWeight={600} fill="#a78bfa">AS</text>
            <Dot x={170} y={108} label="E" />
          </>
        );
      }
      case "ppc": {
        return (
          <>
            <Axes x="Good A" y="Good B" />
            <motion.path
              d={`M ${PAD + 6} 26 Q ${PAD + 30} ${H - PAD - 30} ${W - 28} ${H - PAD - 8}`}
              fill="none" stroke="#4f7cff" strokeWidth={2.5}
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }}
            />
            {shift > 0 && (
              <path d={`M ${PAD + 6} 16 Q ${PAD + 40} ${H - PAD - 50} ${W - 14} ${H - PAD - 8}`} fill="none" stroke="#22d3ee" strokeWidth={2.5} strokeDasharray="5 4" />
            )}
            <circle cx={120} cy={90} r={4} fill="#10b981" stroke="white" strokeWidth={2} />
            <text x={126} y={86} fontSize="10" fill="#10b981">efficient</text>
            <circle cx={90} cy={150} r={4} fill="#f59e0b" stroke="white" strokeWidth={2} />
            <text x={96} y={154} fontSize="10" fill="#f59e0b">inefficient</text>
          </>
        );
      }
      case "costCurves": {
        return (
          <>
            <Axes x="Output (Q)" y="Cost" />
            <path d={`M ${PAD + 10} 60 Q 120 ${H - PAD - 6} 180 110 T ${W - 24} 40`} fill="none" stroke="#4f7cff" strokeWidth={2.5} />
            <text x={W - 40} y={44} fontSize="11" fontWeight={600} fill="#4f7cff">ATC</text>
            <path d={`M ${PAD + 10} 110 Q 120 ${H - PAD} 200 40`} fill="none" stroke="#a78bfa" strokeWidth={2.5} />
            <text x={205} y={44} fontSize="11" fontWeight={600} fill="#a78bfa">MC</text>
            <Dot x={150} y={120} label="min" />
          </>
        );
      }
      default:
        return null;
    }
  }

  return (
    <div className={cn("rounded-xl border hairline surface p-2", className)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        {render()}
      </svg>
      {kind !== "costCurves" && kind !== "labourMarket" && (
        <div className="flex items-center justify-center gap-1 pb-1">
          {[
            { v: -1, l: "◀ shift" },
            { v: 0, l: "reset" },
            { v: 1, l: "shift ▶" },
          ].map((b) => (
            <button
              key={b.v}
              onClick={() => setShift(b.v)}
              className={cn(
                "rounded-md px-2 py-0.5 text-[10px] font-medium transition-colors",
                shift === b.v ? "bg-brand-deep text-white" : "surface text-ink-muted hover:text-ink"
              )}
            >
              {b.l}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
