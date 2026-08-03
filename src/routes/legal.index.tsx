import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LEGAL_DOCS, LEGAL_META } from "@/lib/legal-docs";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/legal/")({
  component: LegalIndex,
});

function LegalIndex() {
  return (
    <div className="space-y-8">
      <div>
        <Badge variant="outline">Legal center</Badge>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-fg)]">
          {BRAND.legalName} — Legal documentation
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-fg-muted)]">
          These documents protect {BRAND.name} as a brand-overlay and matching service.
          Customers operate their own sites and are solely responsible for content,
          compliance, and audiences. Effective {LEGAL_META.effectiveDate}.
        </p>
        <p className="mt-2 text-xs text-[var(--color-fg-subtle)]">{LEGAL_META.notLegalAdvice}</p>
      </div>

      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] p-5">
        <div className="flex items-start gap-3">
          <Shield className="mt-0.5 size-5 shrink-0 text-[var(--color-fg-muted)]" />
          <div>
            <p className="text-sm font-semibold text-[var(--color-fg)]">
              Core protection stack
            </p>
            <ul className="mt-2 space-y-1 text-xs text-[var(--color-fg-muted)]">
              <li>· Terms of Service — contract, liability cap, disclaimers</li>
              <li>· AUP — illegal content ban; lawful adult under addendum</li>
              <li>· Adult Addendum (18+) — age, consent, no operator role</li>
              <li>· Disclaimer — not your site operator</li>
              <li>· Indemnity — you cover content & regulatory claims</li>
              <li>· Privacy & DMCA/notice procedures</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {LEGAL_DOCS.map((doc) => (
          <Link
            key={doc.id}
            to="/legal/$doc"
            params={{ doc: doc.id }}
            className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] p-4 no-underline transition-colors hover:border-[var(--color-border-strong)]"
          >
            <p className="text-sm font-semibold text-[var(--color-fg)]">{doc.title}</p>
            <p className="mt-2 text-xs leading-relaxed text-[var(--color-fg-muted)]">
              {doc.summary}
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-fg)]">
              Read <ArrowRight className="size-3" />
            </span>
          </Link>
        ))}
      </div>

      <Button asChild variant="outline">
        <Link to="/start">Back to match</Link>
      </Button>
    </div>
  );
}
