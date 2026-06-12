"use client";

import { Languages } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useI18n();

  return (
    <div
      className={cn(
        "relative flex items-center rounded-full border hairline surface p-0.5 backdrop-blur",
        compact ? "text-xs" : "text-sm"
      )}
    >
      <Languages className="ml-2 mr-1 h-3.5 w-3.5 text-ink-muted" />
      {(["en", "zh"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={cn(
            "relative z-10 rounded-full px-3 py-1 font-medium transition-colors",
            locale === l ? "text-white" : "text-ink-muted hover:text-ink"
          )}
        >
          {locale === l && (
            <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-brand-deep to-brand-purple" />
          )}
          {l === "en" ? "EN" : "中文"}
        </button>
      ))}
    </div>
  );
}
