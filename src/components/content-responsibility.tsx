import { Link } from "@tanstack/react-router";
import { AlertTriangle, Scale, ShieldOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  ADULT_VERTICAL,
  CONTENT_DISCLAIMER,
  CONTENT_ROLE,
} from "@/lib/content-responsibility";
import { LEGAL_ACCEPTANCE_TEXT } from "@/lib/legal-docs";
import { cn } from "@/lib/utils";

export function ContentResponsibilityBanner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] p-5",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Scale className="size-4 text-[var(--color-fg-muted)]" />
        <p className="text-sm font-semibold text-[var(--color-fg)]">Brand overlay only</p>
        <Badge variant="outline">You own your content</Badge>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">
        {CONTENT_DISCLAIMER.medium}
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--color-fg-subtle)]">
            Auraxir does
          </p>
          <ul className="mt-2 space-y-1">
            {CONTENT_ROLE.brandDoes.map((line) => (
              <li key={line} className="text-xs text-[var(--color-fg-muted)]">
                · {line}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--color-fg-subtle)]">
            You are responsible for
          </p>
          <ul className="mt-2 space-y-1">
            {CONTENT_ROLE.customerIsResponsibleFor.map((line) => (
              <li key={line} className="text-xs text-[var(--color-fg-muted)]">
                · {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-4 flex items-start gap-2 text-xs text-[var(--color-fg-subtle)]">
        <ShieldOff className="mt-0.5 size-3.5 shrink-0" />
        Auraxir does not operate your site and has nothing to do with day-to-day content decisions.
      </p>
      <p className="mt-3 text-xs">
        <Link to="/legal" className="font-medium text-[var(--color-fg)] underline-offset-2 hover:underline">
          Full legal documentation
        </Link>
        {" · "}
        <Link
          to="/legal/$doc"
          params={{ doc: "terms" }}
          className="text-[var(--color-fg-muted)] underline-offset-2 hover:underline"
        >
          Terms
        </Link>
        {" · "}
        <Link
          to="/legal/$doc"
          params={{ doc: "indemnity" }}
          className="text-[var(--color-fg-muted)] underline-offset-2 hover:underline"
        >
          Indemnity
        </Link>
        {" · "}
        <Link
          to="/legal/$doc"
          params={{ doc: "adult" }}
          className="text-[var(--color-fg-muted)] underline-offset-2 hover:underline"
        >
          Adult addendum
        </Link>
      </p>
    </div>
  );
}

export function AdultVerticalCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)]",
        className,
      )}
      style={{
        background: "linear-gradient(145deg, #0a0a0c 0%, #1a1018 50%, #c45c8a44 140%)",
      }}
    >
      <div className="p-5 sm:p-6">
        <Badge variant="accent" className="text-[10px]">
          18+ · {ADULT_VERTICAL.marketName}
        </Badge>
        <h3 className="mt-3 text-xl font-semibold text-white">{ADULT_VERTICAL.principle}</h3>
        <p className="mt-2 text-sm text-white/80">{ADULT_VERTICAL.blurb}</p>
        <p className="mt-3 text-xs text-white/65">{ADULT_VERTICAL.promise}</p>
        <p className="mt-4 text-xs text-white/70">
          Bound by{" "}
          <Link to="/legal/$doc" params={{ doc: "adult" }} className="underline">
            Adult Services Addendum
          </Link>
          ,{" "}
          <Link to="/legal/$doc" params={{ doc: "aup" }} className="underline">
            AUP
          </Link>
          , and{" "}
          <Link to="/legal/$doc" params={{ doc: "indemnity" }} className="underline">
            Indemnity
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export function ContentAcceptanceToggle({
  accepted,
  onChange,
  adult,
}: {
  accepted: boolean;
  onChange: (v: boolean) => void;
  adult?: boolean;
}) {
  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => onChange(!accepted)}
        className={cn(
          "flex w-full items-start gap-3 rounded-[var(--radius-lg)] border p-4 text-left",
          accepted
            ? "border-[var(--color-primary)] bg-[var(--color-bg-subtle)]"
            : "border-[var(--color-border)]",
        )}
      >
        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-[var(--color-fg-muted)]" />
        <div className="min-w-0 flex-1">
          {adult && (
            <p className="mb-1 text-xs font-medium text-[var(--color-fg)]">
              Adult (18+) — {CONTENT_DISCLAIMER.ageGate}
            </p>
          )}
          <p className="text-sm text-[var(--color-fg)]">{LEGAL_ACCEPTANCE_TEXT}</p>
          <p className="mt-2 text-xs text-[var(--color-fg-muted)]">{CONTENT_DISCLAIMER.short}</p>
        </div>
        <span
          className={cn(
            "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border text-[10px]",
            accepted
              ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-primary-fg)]"
              : "border-[var(--color-border-strong)] text-transparent",
          )}
        >
          ✓
        </span>
      </button>
      <p className="px-1 text-[11px] text-[var(--color-fg-subtle)]">
        Read:{" "}
        <Link to="/legal/$doc" params={{ doc: "terms" }} className="underline">
          Terms
        </Link>
        {" · "}
        <Link to="/legal/$doc" params={{ doc: "aup" }} className="underline">
          AUP
        </Link>
        {" · "}
        <Link to="/legal/$doc" params={{ doc: "disclaimer" }} className="underline">
          Disclaimer
        </Link>
        {" · "}
        <Link to="/legal/$doc" params={{ doc: "indemnity" }} className="underline">
          Indemnity
        </Link>
        {adult && (
          <>
            {" · "}
            <Link to="/legal/$doc" params={{ doc: "adult" }} className="underline">
              Adult addendum
            </Link>
          </>
        )}
      </p>
    </div>
  );
}

export function AdultAgeGate({ onConfirm }: { onConfirm: () => void }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-[#0a0a0c] px-6 py-16 text-center text-white">
      <Badge variant="accent">18+ only</Badge>
      <h2 className="max-w-md text-2xl font-semibold tracking-tight">Adult production line</h2>
      <p className="max-w-md text-sm text-white/75">{CONTENT_DISCLAIMER.ageGate}</p>
      <p className="max-w-md text-xs text-white/55">{CONTENT_DISCLAIMER.short}</p>
      <p className="max-w-md text-[11px] text-white/45">
        Bound by Terms, AUP, Adult Addendum, Disclaimer, and Indemnity.
      </p>
      <button
        type="button"
        onClick={onConfirm}
        className="mt-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0a0a0c]"
      >
        I am 18+ and accept legal responsibility for content
      </button>
    </div>
  );
}
