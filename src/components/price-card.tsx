import { Badge } from "@/components/ui/badge";
import { BRAND, formatMoney } from "@/lib/brand";
import type { HostPlan } from "@/lib/catalog";
import { cn } from "@/lib/utils";

/**
 * Customer pricing — premium because elite.
 * Never show hosts, costs, or how we produce.
 */
export function HostPriceBlock({
  plan,
  className,
  size = "md",
}: {
  plan: HostPlan;
  showMargin?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const priceClass =
    size === "lg" ? "text-3xl" : size === "sm" ? "text-lg" : "text-2xl";

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex flex-wrap items-baseline gap-2">
        <span className={cn("font-semibold tracking-tight text-[var(--color-fg)]", priceClass)}>
          {formatMoney(plan.priceMonthly)}
        </span>
        <span className="text-sm text-[var(--color-fg-muted)]">/ month</span>
        <Badge variant="outline" className="text-[10px]">
          Elite
        </Badge>
        {plan.tier === "flagship" && (
          <Badge variant="accent" className="text-[10px]">
            Flagship
          </Badge>
        )}
      </div>
      <p className="text-xs text-[var(--color-fg-muted)]">{plan.tagline}</p>
    </div>
  );
}

export function QuoteSummary({
  setupFee,
  priceMonthly,
  secureNetwork,
  alwaysOnAddOn,
  baseMonthly,
}: {
  setupFee: number;
  priceMonthly: number;
  costMonthly?: number;
  engineCostMonthly?: number;
  networkCostMonthly?: number;
  vendorName?: string;
  secureNetwork?: boolean;
  showMargin?: boolean;
  alwaysOnAddOn?: number;
  baseMonthly?: number;
}) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-4">
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-fg-subtle)]">
        Elite investment
      </p>
      <p className="mt-2 text-xs leading-relaxed text-[var(--color-fg-muted)]">
        {BRAND.pricingStory}{" "}
        {secureNetwork
          ? "Secure options included for this project."
          : "Secure options available if you need them."}
        {alwaysOnAddOn
          ? " Dual frontend + dual backend Always-On when continuous uptime is required."
          : ""}
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)] p-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--color-fg-subtle)]">
            Monthly
          </p>
          <p className="mt-1 text-xl font-semibold text-[var(--color-fg)]">
            {formatMoney(priceMonthly)}
            <span className="text-sm font-normal text-[var(--color-fg-muted)]">/mo</span>
          </p>
          <p className="mt-1 text-[11px] text-[var(--color-fg-subtle)]">
            {alwaysOnAddOn && baseMonthly
              ? `Line ${formatMoney(baseMonthly)} + Always-On ${formatMoney(alwaysOnAddOn)}`
              : "Premium — because elite"}
          </p>
        </div>
        <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)] p-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--color-fg-subtle)]">
            Activation
          </p>
          <p className="mt-1 text-xl font-semibold text-[var(--color-fg)]">
            {formatMoney(setupFee)}
          </p>
          <p className="mt-1 text-[11px] text-[var(--color-fg-subtle)]">{BRAND.setupFeeLabel}</p>
        </div>
      </div>
    </div>
  );
}

export function ModelStrip({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid gap-2 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4 sm:grid-cols-4",
        className,
      )}
    >
      {BRAND.modelLines.map((line) => (
        <p key={line} className="text-xs leading-relaxed text-[var(--color-fg-muted)]">
          {line}
        </p>
      ))}
    </div>
  );
}

export function OperatorInfraChip(_props?: { vendorName?: string; className?: string }) {
  return null;
}

/** Premium pricing banner — why we cost more */
export function ElitePricingBanner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-[var(--color-card)] p-5 sm:p-6",
        className,
      )}
    >
      <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--color-fg-subtle)]">
        Pricing philosophy
      </p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-2xl">
        We cost more because we are for the elite.
      </h3>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-fg-muted)]">
        {BRAND.pricingStory}
      </p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {[
          "Best-fit matching — not random templates",
          "G2P look systems trained for elite taste",
          "Flagship production lines only",
          "Polish and secure options when needed",
        ].map((item) => (
          <li key={item} className="text-sm text-[var(--color-fg)]">
            <span className="mr-2 text-[var(--color-success)]">✓</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
