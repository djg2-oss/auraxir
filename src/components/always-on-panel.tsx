import { Activity, Server, Layers } from "lucide-react";
import {
  ALWAYS_ON_PROMISE,
  ALWAYS_ON_SERVICES,
  type AlwaysOnTier,
} from "@/lib/always-on";
import { ALWAYS_ON_COPY, formatMoney } from "@/lib/brand";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function AlwaysOnSection({ className }: { className?: string }) {
  return (
    <div className={cn("min-w-0", className)}>
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-fg-subtle)]">
        {ALWAYS_ON_COPY.title}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-fg)]">
        {ALWAYS_ON_COPY.headline}
      </h2>
      <p className="mt-3 max-w-2xl text-sm text-[var(--color-fg-muted)]">
        {ALWAYS_ON_COPY.body} {ALWAYS_ON_PROMISE}
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ALWAYS_ON_SERVICES.map((s) => (
          <div
            key={s.id}
            className="min-w-0 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] p-4"
          >
            {s.id.includes("frontend") ? (
              <Layers className="size-4 text-[var(--color-fg-muted)]" />
            ) : s.id.includes("backend") ? (
              <Server className="size-4 text-[var(--color-fg-muted)]" />
            ) : (
              <Activity className="size-4 text-[var(--color-fg-muted)]" />
            )}
            <p className="mt-3 text-sm font-semibold text-[var(--color-fg)]">{s.customerLabel}</p>
            <p className="mt-1 text-xs leading-relaxed text-[var(--color-fg-muted)]">{s.blurb}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AlwaysOnPlanBadge({
  tier,
  addOnMonthly,
  services,
}: {
  tier: AlwaysOnTier;
  addOnMonthly?: number;
  services?: string[];
}) {
  if (tier === "standard") return null;
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] p-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="success">Always-On · {tier}</Badge>
        {addOnMonthly ? (
          <span className="text-sm font-semibold text-[var(--color-fg)]">
            +{formatMoney(addOnMonthly)}/mo
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-sm text-[var(--color-fg)]">
        Dual frontend + dual backend so you stay online at all times.
      </p>
      {services && services.length > 0 && (
        <ul className="mt-3 space-y-1">
          {services.map((s) => (
            <li key={s} className="text-xs text-[var(--color-fg-muted)]">
              · {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
