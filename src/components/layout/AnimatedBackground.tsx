"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { seededRand } from "@/lib/utils";

/**
 * AI-themed economics background: drifting aurora blobs + a generative
 * economic network (nodes, trade-route arcs, flowing data streams).
 * Subtle, elegant, theme-aware via CSS variables. Never distracting.
 */
export function AnimatedBackground() {
  const { nodes, links, streams } = useMemo(() => buildNetwork(), []);

  const blobs = [
    { v: "--blob-1", size: 560, top: "-10%", left: "-8%", dur: 24, x: [0, 60, -20, 0], y: [0, 40, 80, 0] },
    { v: "--blob-2", size: 480, top: "8%", left: "62%", dur: 28, x: [0, -50, 30, 0], y: [0, 60, -30, 0] },
    { v: "--blob-3", size: 440, top: "58%", left: "18%", dur: 32, x: [0, 40, -40, 0], y: [0, -50, 30, 0] },
  ];

  return (
    <div className="aurora" aria-hidden>
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="aurora__blob"
          style={{ width: b.size, height: b.size, top: b.top, left: b.left, background: `var(${b.v})` }}
          animate={{ x: b.x, y: b.y, scale: [1, 1.08, 0.95, 1] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* economic network layer */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1000 600">
        <g stroke="var(--net-stroke)" fill="none">
          {links.map((l, i) => (
            <path key={i} d={`M ${nodes[l[0]].x} ${nodes[l[0]].y} Q ${(nodes[l[0]].x + nodes[l[1]].x) / 2} ${Math.min(nodes[l[0]].y, nodes[l[1]].y) - 40} ${nodes[l[1]].x} ${nodes[l[1]].y}`} strokeWidth={1} />
          ))}
        </g>
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={n.r} fill="var(--net-node)" />
        ))}
        {/* flowing data streams along trade routes */}
        {streams.map((s, i) => (
          <motion.circle
            key={`s${i}`}
            r={2.2}
            fill="var(--net-node)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0], offsetDistance: ["0%", "100%"] as never }}
            transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: "linear" }}
            style={{ offsetPath: `path('${s.path}')` } as never}
          />
        ))}
      </svg>

      <div className="aurora__grid" />
      <div className="aurora__noise" />
    </div>
  );
}

function buildNetwork() {
  const rand = seededRand("ecomap-net-v2");
  const nodes = Array.from({ length: 22 }, () => ({
    x: 40 + rand() * 920,
    y: 40 + rand() * 520,
    r: 1.4 + rand() * 2.6,
  }));
  const links: [number, number][] = [];
  nodes.forEach((n, i) => {
    // connect each node to its 2 nearest neighbours
    const dists = nodes
      .map((m, j) => ({ j, d: (m.x - n.x) ** 2 + (m.y - n.y) ** 2 }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d);
    [0, 1].forEach((k) => {
      const j = dists[k].j;
      if (!links.some(([a, b]) => (a === i && b === j) || (a === j && b === i))) links.push([i, j]);
    });
  });
  const streams = links.slice(0, 10).map((l, i) => {
    const a = nodes[l[0]], b = nodes[l[1]];
    return {
      path: `M ${a.x} ${a.y} Q ${(a.x + b.x) / 2} ${Math.min(a.y, b.y) - 40} ${b.x} ${b.y}`,
      dur: 6 + (i % 5) * 1.5,
      delay: i * 0.8,
    };
  });
  return { nodes, links, streams };
}
