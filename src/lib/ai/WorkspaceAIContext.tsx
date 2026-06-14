"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

/** Snapshot of the currently-open workspace so the Copilot can reason about it. */
export interface WorkspaceContextData {
  id: string;
  title: string;
  category: string;
  theories: string[];
  methods: string[];
  datasets: string[];
  papers: string[];
  proposals: string[];
  stakeholders: string[];
  rq: string;
  thesis: string;
}

interface Ctx {
  workspace: WorkspaceContextData | null;
  setWorkspace: (w: WorkspaceContextData | null) => void;
  /** A pending instruction sent from a "Refine with AI" button to the dock. */
  pending: { section: string; prompt: string; nonce: number } | null;
  refine: (section: string, prompt: string) => void;
  clearPending: () => void;
}

const C = createContext<Ctx | null>(null);

export function WorkspaceAIProvider({ children }: { children: React.ReactNode }) {
  const [workspace, setWorkspace] = useState<WorkspaceContextData | null>(null);
  const [pending, setPending] = useState<Ctx["pending"]>(null);
  const nonce = useRef(0);

  const refine = useCallback((section: string, prompt: string) => {
    nonce.current += 1;
    setPending({ section, prompt, nonce: nonce.current });
  }, []);
  const clearPending = useCallback(() => setPending(null), []);

  const value = useMemo(
    () => ({ workspace, setWorkspace, pending, refine, clearPending }),
    [workspace, pending, refine, clearPending]
  );
  return <C.Provider value={value}>{children}</C.Provider>;
}

export function useWorkspaceAI() {
  const c = useContext(C);
  if (!c) throw new Error("useWorkspaceAI must be used within WorkspaceAIProvider");
  return c;
}
