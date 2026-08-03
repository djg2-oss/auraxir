import { Outlet, createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { Scale } from "lucide-react";
import { AppChrome } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { LEGAL_DOCS, LEGAL_META } from "@/lib/legal-docs";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/legal")({
  component: LegalLayout,
});

function LegalLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <AppChrome>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[240px_1fr]">
        <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <div className="mb-4 flex items-center gap-2">
            <Scale className="size-4 text-[var(--color-fg-muted)]" />
            <p className="text-sm font-semibold text-[var(--color-fg)]">Legal</p>
          </div>
          <p className="mb-4 text-xs text-[var(--color-fg-muted)]">
            Effective {LEGAL_META.effectiveDate}
          </p>
          <nav className="flex flex-col gap-0.5">
            <Link
              to="/legal"
              className={cn(
                "rounded-[var(--radius-sm)] px-3 py-2 text-sm no-underline",
                pathname === "/legal"
                  ? "bg-[var(--color-bg-subtle)] text-[var(--color-fg)]"
                  : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]",
              )}
            >
              Overview
            </Link>
            {LEGAL_DOCS.map((doc) => (
              <Link
                key={doc.id}
                to="/legal/$doc"
                params={{ doc: doc.id }}
                className={cn(
                  "rounded-[var(--radius-sm)] px-3 py-2 text-sm no-underline",
                  pathname === `/legal/${doc.id}`
                    ? "bg-[var(--color-bg-subtle)] text-[var(--color-fg)]"
                    : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]",
                )}
              >
                {doc.shortTitle}
              </Link>
            ))}
          </nav>
          <Badge variant="outline" className="mt-4 text-[9px]">
            Protects platform · binds customer
          </Badge>
        </aside>
        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </AppChrome>
  );
}
