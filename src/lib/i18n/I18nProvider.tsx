"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Locale } from "@/types";
import { dict, type DictKey } from "./dictionaries";

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
  t: (key: DictKey) => string;
  /** pick the right field from a { en, zh } object */
  tl: (obj: { en: string; zh: string } | undefined) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("ecomap.locale") as Locale | null;
    if (stored === "en" || stored === "zh") setLocaleState(stored);
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem("ecomap.locale", l);
    document.documentElement.lang = l === "zh" ? "zh-CN" : "en";
  }, []);

  const toggle = useCallback(
    () => setLocale(locale === "en" ? "zh" : "en"),
    [locale, setLocale]
  );

  const t = useCallback(
    (key: DictKey) => dict[locale][key] ?? dict.en[key] ?? key,
    [locale]
  );

  const tl = useCallback(
    (obj: { en: string; zh: string } | undefined) =>
      obj ? obj[locale] ?? obj.en : "",
    [locale]
  );

  const value = useMemo(
    () => ({ locale, setLocale, toggle, t, tl }),
    [locale, setLocale, toggle, t, tl]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
