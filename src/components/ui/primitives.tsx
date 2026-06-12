"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/* ---------------- Button ---------------- */
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline" | "soft";
  size?: "sm" | "md" | "lg";
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  const sizes = {
    sm: "h-8 px-3 text-xs gap-1.5",
    md: "h-10 px-4 text-sm gap-2",
    lg: "h-12 px-6 text-[15px] gap-2",
  };
  const variants = {
    primary:
      "text-white bg-gradient-to-r from-brand-deep via-brand-purple to-brand-blue shadow-[0_8px_24px_rgba(79,124,255,0.35)] hover:shadow-[0_10px_30px_rgba(79,124,255,0.45)] hover:brightness-[1.05]",
    soft:
      "text-brand-deep surface border hairline backdrop-blur hover:surface-strong shadow-glass",
    outline:
      "text-ink border border-brand-blue/30 surface-soft hover:surface backdrop-blur",
    ghost: "text-ink-soft hover:text-ink hover:surface",
  };
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap",
        sizes[size],
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

/* ---------------- GlassCard ---------------- */
export function GlassCard({
  className,
  children,
  tint,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { tint?: boolean }) {
  return (
    <div
      className={cn(
        tint ? "glass-tint" : "glass",
        "rounded-2xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ---------------- Badge ---------------- */
export function Badge({
  className,
  children,
  color = "blue",
}: {
  className?: string;
  children: React.ReactNode;
  color?: "blue" | "purple" | "cyan" | "green" | "amber" | "rose" | "slate";
}) {
  const colors = {
    blue: "bg-blue-50 text-blue-600 ring-blue-200",
    purple: "bg-purple-50 text-purple-600 ring-purple-200",
    cyan: "bg-cyan-50 text-cyan-700 ring-cyan-200",
    green: "bg-emerald-50 text-emerald-600 ring-emerald-200",
    amber: "bg-amber-50 text-amber-700 ring-amber-200",
    rose: "bg-rose-50 text-rose-600 ring-rose-200",
    slate: "bg-slate-100 text-slate-600 ring-slate-200",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        colors[color],
        className
      )}
    >
      {children}
    </span>
  );
}

/* ---------------- ScoreRing ---------------- */
export function ScoreRing({
  value,
  size = 72,
  label,
  stroke = 7,
}: {
  value: number;
  size?: number;
  label?: string;
  stroke?: number;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  const hue = value >= 85 ? "#10b981" : value >= 70 ? "#4f7cff" : "#a78bfa";
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(106,168,255,0.15)" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={hue}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-lg font-semibold text-ink font-display">{value}</span>
        {label && <span className="text-[9px] uppercase tracking-wide text-ink-muted">{label}</span>}
      </div>
    </div>
  );
}

/* ---------------- Meter (horizontal bar) ---------------- */
export function Meter({
  value,
  color = "#4f7cff",
  className,
}: {
  value: number;
  color?: string;
  className?: string;
}) {
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-slate-200/60", className)}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
    </div>
  );
}

/* ---------------- Dots (1-5 rating) ---------------- */
export function Dots({ value, max = 5, color = "#a78bfa" }: { value: number; max?: number; color?: string }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full transition-colors"
          style={{ background: i < value ? color : "rgba(100,116,139,0.25)" }}
        />
      ))}
    </div>
  );
}
