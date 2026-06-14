"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X, Send, Mic, FileUp, Link2, FileText, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { cn } from "@/lib/utils";
import { researchReply } from "@/lib/ai/research";
import { useWorkspaceAI } from "@/lib/ai/WorkspaceAIContext";
import type { DictKey } from "@/lib/i18n/dictionaries";

interface Msg {
  role: "user" | "ai";
  text: string;
}

const WELCOME_BULLETS: DictKey[] = [
  "cp.welcome.b1", "cp.welcome.b2", "cp.welcome.b3", "cp.welcome.b4", "cp.welcome.b5", "cp.welcome.b6",
];
const TRY: DictKey[] = ["cp.try1", "cp.try2", "cp.try3"];

export function CopilotDock() {
  const { t, locale } = useI18n();
  const { workspace, pending, clearPending } = useWorkspaceAI();
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 9e9, behavior: "smooth" });
  }, [msgs, typing]);

  const ask = useCallback((text: string, prefix?: string) => {
    const q = text.trim();
    if (!q) return;
    const shown = prefix ? `${prefix}${q}` : q;
    setMsgs((m) => [...m, { role: "user", text: shown }]);
    setInput("");
    setTyping(true);

    const ctx = workspace
      ? `Topic: ${workspace.title}\nCategory: ${workspace.category}\nTheories: ${workspace.theories.join("; ")}\nMethods: ${workspace.methods.join("; ")}\nDatasets: ${workspace.datasets.join("; ")}\nPapers: ${workspace.papers.slice(0, 5).join("; ")}\nThesis: ${workspace.thesis}`
      : "";

    // try live AI; fall back to the offline research engine
    (async () => {
      try {
        const res = await fetch("/api/copilot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: q, context: ctx }),
        });
        const data = await res.json();
        const reply = data?.ok && data?.reply ? data.reply : researchReply(q, locale, workspace);
        setMsgs((m) => [...m, { role: "ai", text: reply }]);
      } catch {
        setMsgs((m) => [...m, { role: "ai", text: researchReply(q, locale, workspace) }]);
      } finally {
        setTyping(false);
      }
    })();
  }, [locale, workspace]);

  // a "Refine with AI" button elsewhere can drive the dock
  useEffect(() => {
    if (!pending) return;
    setOpen(true);
    const label = locale === "zh" ? `优化「${pending.section}」：` : `Refine ${pending.section}: `;
    ask(pending.prompt, label);
    clearPending();
  }, [pending, ask, clearPending, locale]);

  const tools = [
    { icon: Mic, label: t("as.voice") },
    { icon: FileUp, label: t("as.pdf") },
    { icon: Link2, label: t("as.url") },
    { icon: FileText, label: t("as.paper") },
  ];

  return (
    <>
      {/* hover preview bubble (non-blocking) */}
      <AnimatePresence>
        {hover && !open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className="glass-strong pointer-events-none fixed bottom-[5.5rem] right-5 z-40 w-56 rounded-2xl p-3 shadow-glass-lg"
          >
            <p className="flex items-center gap-1.5 text-xs font-bold text-brand-deep"><Sparkles className="h-3.5 w-3.5" />{t("cp.title")}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-ink-soft">{t("cp.preview")}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* launcher */}
      <motion.button
        type="button"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 18 }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => setOpen((o) => !o)}
        aria-label="Open Ecomap Copilot"
        className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-deep via-brand-purple to-brand-cyan text-white shadow-[0_12px_36px_rgba(79,124,255,0.45)] transition-transform hover:scale-105 active:scale-95"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X className="h-6 w-6" /></motion.span>
          ) : (
            <motion.span key="s" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><Sparkles className="h-6 w-6" /></motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="glass-strong fixed bottom-24 right-5 z-[60] flex h-[min(34rem,calc(100vh-7rem))] w-[23rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-3xl shadow-glass-lg"
          >
            <div className="flex items-center gap-2 border-b hairline px-4 py-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand-deep to-brand-purple text-white"><Sparkles className="h-4 w-4" /></div>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-ink">{t("cp.title")}</p>
                <p className="max-w-[14rem] truncate text-[10px] text-ink-muted">{workspace ? `${locale === "zh" ? "上下文" : "Context"}: ${workspace.title}` : t("cp.hint")}</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="ml-auto rounded-lg p-1.5 text-ink-muted hover:surface hover:text-ink">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div ref={scrollRef} className="no-scrollbar flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {/* first-open welcome screen */}
              {msgs.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-deep to-brand-purple text-white"><Sparkles className="h-4 w-4" /></div>
                    <p className="font-display text-sm font-bold text-ink">{t("cp.welcome.hi")}</p>
                  </div>
                  <p className="mb-2 text-xs text-ink-soft">{t("cp.welcome.intro")}</p>
                  <ul className="space-y-1.5">
                    {WELCOME_BULLETS.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-[13px] text-ink-soft">
                        <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500" />{t(b)}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {(workspace
                      ? [t("cp.ws1"), t("cp.ws2"), t("cp.ws3"), t("cp.ws4")]
                      : TRY.map((k) => t(k))
                    ).map((label) => (
                      <button type="button" key={label} onClick={() => ask(label)} className="rounded-full border hairline surface-soft px-2.5 py-1 text-[11px] font-medium text-brand-deep transition-colors hover:surface-strong">{label}</button>
                    ))}
                  </div>
                </motion.div>
              )}

              {msgs.map((m, i) => (
                <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                  <div className={cn("max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-[13px] leading-relaxed", m.role === "user" ? "bg-gradient-to-br from-brand-deep to-brand-purple text-white" : "surface-strong text-ink")}>{m.text}</div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl surface-strong px-3 py-3">
                    {[0, 1, 2].map((i) => <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-brand-purple" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />)}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t hairline px-3 py-2">
              <div className="mb-2 flex gap-1">
                {tools.map((tool) => (
                  <button type="button" key={tool.label} title={tool.label} className="flex h-7 items-center gap-1 rounded-lg surface px-2 text-[11px] text-ink-muted hover:text-brand-deep">
                    <tool.icon className="h-3 w-3" />{tool.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && ask(input)} placeholder={t("cp.placeholder")} className="h-10 flex-1 rounded-xl border hairline surface px-3 text-sm outline-none placeholder:text-ink-muted/70 focus:ring-2 focus:ring-brand-blue/40" />
                <button type="button" onClick={() => ask(input)} aria-label={t("cp.send")} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-deep to-brand-purple text-white transition-transform active:scale-95"><Send className="h-4 w-4" /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
