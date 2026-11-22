import React from "react";
import Link from "next/link";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Wefik Staff Portal",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PortalLayout({ children }) {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col bg-[var(--color-bg-primary,#f5f8ee)] font-sans text-[var(--color-text-primary,#0f1a05)] transition-colors duration-200 dark:bg-[var(--color-bg-primary,#0a0a0a)] dark:text-white">
        {/* Top Portal Navigation */}
        <header className="sticky top-0 z-30 border-b border-[var(--color-border,#dde8c0)] bg-[var(--color-bg-card,#ffffff)] px-6 py-3.5 dark:border-[var(--color-border,#1e1e1e)] dark:bg-[var(--color-bg-card,#141414)]">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <Link
              href="/portal"
              className="flex items-center gap-2.5 text-sm font-bold tracking-tight uppercase"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-accent,#51731a)]/15 text-[var(--color-accent,#51731a)] dark:bg-[var(--color-accent,#a3e635)]/20 dark:text-[var(--color-accent,#a3e635)]">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <span className="font-extrabold tracking-wider">WEFIK</span>
              <span className="rounded-full bg-[var(--color-accent-subtle,#d4f07a)] px-2 py-0.5 font-mono text-[11px] text-[var(--color-accent,#51731a)] dark:bg-[var(--color-accent-subtle,#1e2e08)] dark:text-[var(--color-accent,#a3e635)]">
                PORTAL
              </span>
            </Link>

            <div className="flex items-center gap-3">
              <ThemeSwitcher />
            </div>
          </div>
        </header>

        {/* Main Portal Viewport */}
        <main className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6 md:p-8">
          {children}
        </main>

        {/* Portal Footer */}
        <footer className="border-t border-[var(--color-border,#dde8c0)] px-6 py-4 text-center text-xs text-[var(--color-text-subtle,#8fa060)] dark:border-[var(--color-border,#1e1e1e)] dark:text-[var(--color-text-subtle,#666666)]">
          Wefik Internal Staff Portal &copy; {new Date().getFullYear()} &bull;
          Strictly Confidential &bull; Authorized Personnel Only
        </footer>
      </div>
    </ThemeProvider>
  );
}
