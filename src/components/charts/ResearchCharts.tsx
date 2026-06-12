"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { seededRand } from "@/lib/utils";

const blue = "#4f7cff";
const purple = "#a78bfa";

export function ScatterPlot({ seed = "x" }: { seed?: string }) {
  const rand = seededRand(seed);
  const data = Array.from({ length: 28 }, (_, i) => {
    const x = i + rand() * 4;
    return { x, y: 8 + 1.6 * x + (rand() - 0.5) * 18 };
  });
  return (
    <ResponsiveContainer width="100%" height={180}>
      <ScatterChart margin={{ top: 8, right: 8, bottom: 4, left: -18 }}>
        <CartesianGrid stroke="rgba(148,163,184,0.18)" />
        <XAxis type="number" dataKey="x" tick={{ fontSize: 10, fill: "#64748b" }} />
        <YAxis type="number" dataKey="y" tick={{ fontSize: 10, fill: "#64748b" }} />
        <ZAxis range={[40, 40]} />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} contentStyle={tooltipStyle} />
        <Scatter data={data} fill={blue} fillOpacity={0.7} />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

export function TrendLine({ seed = "t" }: { seed?: string }) {
  const rand = seededRand(seed);
  let base = 100;
  const data = Array.from({ length: 16 }, (_, i) => {
    base += (rand() - 0.4) * 8;
    return { t: 2010 + i, actual: Math.round(base), forecast: i > 11 ? Math.round(base + (i - 11) * 3) : null };
  });
  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={data} margin={{ top: 8, right: 8, bottom: 4, left: -18 }}>
        <CartesianGrid stroke="rgba(148,163,184,0.18)" />
        <XAxis dataKey="t" tick={{ fontSize: 10, fill: "#64748b" }} />
        <YAxis tick={{ fontSize: 10, fill: "#64748b" }} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line type="monotone" dataKey="actual" stroke={blue} strokeWidth={2.5} dot={false} />
        <Line type="monotone" dataKey="forecast" stroke={purple} strokeWidth={2.5} strokeDasharray="5 4" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

const VARS = ["GDP", "Price", "Wage", "Trade", "Emp."];
export function CorrelationMatrix({ seed = "c" }: { seed?: string }) {
  const rand = seededRand(seed);
  const m = VARS.map((_, i) =>
    VARS.map((__, j) => (i === j ? 1 : Math.round((rand() * 1.6 - 0.6) * 100) / 100))
  );
  function color(v: number) {
    const a = Math.abs(v);
    return v >= 0
      ? `rgba(79,124,255,${0.12 + a * 0.7})`
      : `rgba(244,63,94,${0.12 + a * 0.7})`;
  }
  return (
    <div className="overflow-hidden rounded-xl border hairline surface-soft p-2">
      <table className="w-full border-separate border-spacing-1 text-center text-[10px]">
        <thead>
          <tr>
            <th />
            {VARS.map((v) => (
              <th key={v} className="font-medium text-ink-muted">{v}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {m.map((row, i) => (
            <tr key={i}>
              <td className="pr-1 text-right font-medium text-ink-muted">{VARS[i]}</td>
              {row.map((v, j) => (
                <td
                  key={j}
                  className="h-8 rounded-md font-semibold text-ink"
                  style={{ background: color(v) }}
                >
                  {v.toFixed(2)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.7)",
  background: "rgba(255,255,255,0.9)",
  backdropFilter: "blur(8px)",
  fontSize: 12,
  boxShadow: "0 8px 24px rgba(79,124,255,0.15)",
};
