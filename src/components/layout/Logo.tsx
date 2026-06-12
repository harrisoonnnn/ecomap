"use client";

import { motion } from "framer-motion";

/**
 * Ecomap mark: a connected economic network — nodes joined by market pathways
 * that also trace a rising trend line. Premium, startup-grade.
 */
export function Logo({ withWordmark = true, size = 36 }: { withWordmark?: boolean; size?: number }) {
  return (
    <span className="flex items-center gap-2.5">
      <motion.span
        initial={{ rotate: -6, scale: 0.92, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative grid place-items-center rounded-[12px]"
        style={{
          width: size,
          height: size,
          background:
            "conic-gradient(from 210deg at 50% 50%, #4f7cff, #7c5cff 35%, #22d3ee 70%, #4f7cff)",
          boxShadow: "0 6px 20px rgba(79,124,255,0.45), inset 0 1px 0 rgba(255,255,255,0.5)",
        }}
      >
        <svg viewBox="0 0 32 32" width={size * 0.62} height={size * 0.62} fill="none">
          {/* market pathways */}
          <path d="M5 24 L13 13 L20 18 L27 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
          <path d="M5 24 L20 18" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
          <path d="M13 13 L27 7" stroke="white" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
          {/* connected nodes */}
          <circle cx="5" cy="24" r="2.6" fill="white" />
          <circle cx="13" cy="13" r="2.6" fill="white" />
          <circle cx="20" cy="18" r="2.6" fill="white" />
          <circle cx="27" cy="7" r="3" fill="white" />
          <circle cx="27" cy="7" r="5.4" stroke="white" strokeWidth="1" opacity="0.5" />
        </svg>
      </motion.span>
      {withWordmark && (
        <span className="font-display text-lg font-bold tracking-tight text-ink">
          Eco<span className="text-gradient">map</span>
        </span>
      )}
    </span>
  );
}
