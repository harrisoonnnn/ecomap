"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/lib/theme/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      title={dark ? "Light mode" : "Dark mode"}
      className="relative flex h-9 w-9 items-center justify-center rounded-xl border hairline surface transition-colors hover:surface-strong"
    >
      <motion.span key={theme} initial={{ rotate: -90, opacity: 0, scale: 0.6 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 18 }}>
        {dark ? <Moon className="h-4 w-4 text-brand-purple" /> : <Sun className="h-4 w-4 text-amber-500" />}
      </motion.span>
    </button>
  );
}
