"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";
import { Logo } from "./Logo";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="relative z-10 mt-20 border-t hairline surface-soft backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-3">
          <Logo />
        </div>
        <p className="max-w-md text-xs text-ink-muted">{t("common.footer")}</p>
        <p className="text-xs text-ink-muted">© 2026 Ecomap · {t("common.poweredBy")}</p>
      </div>
    </footer>
  );
}
