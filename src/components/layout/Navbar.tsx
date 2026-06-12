"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";
import type { DictKey } from "@/lib/i18n/dictionaries";

const NAV: { href: string; key: DictKey }[] = [
  { href: "/", key: "nav.home" },
  { href: "/news", key: "nav.news" },
  { href: "/assistant", key: "nav.assistant" },
  { href: "/workspace/ev-tariffs", key: "nav.workspace" },
  { href: "/mindmaps", key: "nav.mindmaps" },
  { href: "/literature", key: "nav.literature" },
  { href: "/dashboard", key: "nav.dashboard" },
];

export function Navbar() {
  const { t } = useI18n();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href.split("/").slice(0, 2).join("/"));
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-3"
      )}
    >
      <div className="mx-auto max-w-7xl px-4">
        <nav
          className={cn(
            "flex items-center gap-2 rounded-2xl px-3 transition-all duration-300",
            scrolled
              ? "glass-strong h-14 shadow-glass"
              : "h-15 border border-transparent surface-soft py-2 backdrop-blur-sm"
          )}
        >
          <Link href="/" className="flex items-center gap-2 pr-2">
            <Logo />
          </Link>

          <div className="mx-auto hidden items-center gap-0.5 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "text-brand-deep"
                    : "text-ink-soft hover:text-ink"
                )}
              >
                {isActive(item.href) && (
                  <span className="absolute inset-0 -z-10 rounded-full surface-strong shadow-sm" />
                )}
                {t(item.key)}
              </Link>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <ThemeToggle />
            <LanguageSwitcher compact />
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-soft hover:surface lg:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label="menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="glass-strong mt-2 grid gap-1 rounded-2xl p-2 lg:hidden">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-xl px-3 py-2 text-sm font-medium",
                  isActive(item.href)
                    ? "surface-strong text-brand-deep"
                    : "text-ink-soft"
                )}
              >
                {t(item.key)}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
