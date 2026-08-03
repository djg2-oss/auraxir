import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";
import { CONTENT_DISCLAIMER } from "@/lib/content-responsibility";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/start", label: "Match" },
  { to: "/projects", label: "Projects" },
  { to: "/legal", label: "Legal" },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-bg)_88%,transparent)] backdrop-blur-md">
      <div className="border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-1.5 text-[11px] sm:px-6">
          <p className="truncate text-[var(--color-fg-muted)]">
            <span className="font-medium text-[var(--color-fg)]">{BRAND.legalName}</span>
            <span className="hidden sm:inline"> — {BRAND.tagline}</span>
          </p>
          <p className="shrink-0 text-[var(--color-fg-subtle)]">{BRAND.qualityMark}</p>
        </div>
      </div>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="text-[var(--color-fg)] no-underline">
          <BrandMark />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "rounded-[var(--radius-sm)] px-3 py-2 text-sm no-underline transition-colors",
                pathname === item.to || (item.to === "/legal" && pathname.startsWith("/legal"))
                  ? "bg-[var(--color-bg-subtle)] text-[var(--color-fg)]"
                  : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost" size="sm">
            <Link to="/projects">Projects</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/start">Get matched</Link>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {open && (
        <div className="border-t border-[var(--color-border)] px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-[var(--radius-sm)] px-3 py-2 text-sm no-underline",
                  pathname === item.to
                    ? "bg-[var(--color-bg-subtle)] text-[var(--color-fg)]"
                    : "text-[var(--color-fg-muted)]",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild size="sm" className="mt-2">
              <Link to="/start" onClick={() => setOpen(false)}>
                Get matched
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <BrandMark />
            <p className="mt-2 max-w-md text-sm text-[var(--color-fg-muted)]">{BRAND.promise}</p>
            <p className="mt-2 max-w-md text-xs text-[var(--color-fg-subtle)]">
              {CONTENT_DISCLAIMER.short}
            </p>
          </div>
          <div className="text-sm text-[var(--color-fg-subtle)]">
            <p>{BRAND.legalName}</p>
            <p className="mt-1">{BRAND.supportEmail}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-[var(--color-border)] pt-4 text-xs">
          <Link to="/legal" className="text-[var(--color-fg-muted)] no-underline hover:text-[var(--color-fg)]">
            Legal center
          </Link>
          <Link
            to="/legal/$doc"
            params={{ doc: "terms" }}
            className="text-[var(--color-fg-muted)] no-underline hover:text-[var(--color-fg)]"
          >
            Terms
          </Link>
          <Link
            to="/legal/$doc"
            params={{ doc: "aup" }}
            className="text-[var(--color-fg-muted)] no-underline hover:text-[var(--color-fg)]"
          >
            AUP
          </Link>
          <Link
            to="/legal/$doc"
            params={{ doc: "adult" }}
            className="text-[var(--color-fg-muted)] no-underline hover:text-[var(--color-fg)]"
          >
            Adult addendum
          </Link>
          <Link
            to="/legal/$doc"
            params={{ doc: "disclaimer" }}
            className="text-[var(--color-fg-muted)] no-underline hover:text-[var(--color-fg)]"
          >
            Disclaimer
          </Link>
          <Link
            to="/legal/$doc"
            params={{ doc: "indemnity" }}
            className="text-[var(--color-fg-muted)] no-underline hover:text-[var(--color-fg)]"
          >
            Indemnity
          </Link>
          <Link
            to="/legal/$doc"
            params={{ doc: "privacy" }}
            className="text-[var(--color-fg-muted)] no-underline hover:text-[var(--color-fg)]"
          >
            Privacy
          </Link>
          <Link
            to="/legal/$doc"
            params={{ doc: "dmca" }}
            className="text-[var(--color-fg-muted)] no-underline hover:text-[var(--color-fg)]"
          >
            DMCA / notices
          </Link>
        </div>
      </div>
    </footer>
  );
}

export function AppChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
