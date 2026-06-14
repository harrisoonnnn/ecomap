"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  Copy,
  Download,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { cn, copyToClipboard } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { useWorkspaceAI } from "@/lib/ai/WorkspaceAIContext";

interface ModuleCardProps {
  id?: string;
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  accent?: string; // tailwind gradient classes for the icon chip
  badge?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  /** plain-text representation used by the Copy / Export buttons */
  copyText?: string;
  onRegenerate?: () => void;
}

export function ModuleCard({
  id,
  icon,
  title,
  subtitle,
  accent = "from-brand-deep to-brand-purple",
  badge,
  children,
  defaultOpen = true,
  copyText,
  onRegenerate,
}: ModuleCardProps) {
  const { t } = useI18n();
  const { refine } = useWorkspaceAI();
  const [open, setOpen] = useState(defaultOpen);
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleCopy() {
    const ok = await copyToClipboard(copyText ?? title);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    }
  }

  function handleExport() {
    const blob = new Blob([`# ${title}\n\n${copyText ?? ""}`], {
      type: "text/markdown",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/\s+/g, "-").toLowerCase()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleRegen() {
    if (!onRegenerate) return;
    setBusy(true);
    setTimeout(() => {
      onRegenerate();
      setBusy(false);
    }, 900);
  }

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="glass scroll-mt-24 rounded-2xl"
    >
      <header className="flex items-center gap-3 px-5 py-4">
        {icon && (
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md",
              accent
            )}
          >
            {icon}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="truncate font-display text-[15px] font-semibold text-ink">
              {title}
            </h2>
            {badge}
          </div>
          {subtitle && (
            <p className="truncate text-xs text-ink-muted">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-1">
          <IconBtn label={t("ws.refine")} onClick={() => refine(title, t("ws.refinePrompt"))}>
            <Sparkles className="h-4 w-4 text-brand-purple" />
          </IconBtn>
          <IconBtn label={t("ws.copy")} onClick={handleCopy}>
            {copied ? (
              <Check className="h-4 w-4 text-emerald-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </IconBtn>
          {onRegenerate && (
            <IconBtn label={t("ws.regenerate")} onClick={handleRegen}>
              <RefreshCw
                className={cn("h-4 w-4", busy && "animate-spin text-brand-deep")}
              />
            </IconBtn>
          )}
          <IconBtn label={t("ws.export")} onClick={handleExport}>
            <Download className="h-4 w-4" />
          </IconBtn>
          <IconBtn
            label={open ? t("ws.collapse") : t("ws.expand")}
            onClick={() => setOpen((o) => !o)}
          >
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                open && "rotate-180"
              )}
            />
          </IconBtn>
        </div>
      </header>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t hairline px-5 py-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

function IconBtn({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      title={label}
      aria-label={label}
      onClick={onClick}
      className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted transition-colors hover:surface hover:text-brand-deep"
    >
      {children}
    </button>
  );
}
