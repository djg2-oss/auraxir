import { Link } from "@tanstack/react-router";
import { Lock, Shield, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  SHIELD,
  SHIELD_COMPARISON_STORY,
  SHIELD_CONTROLS,
  controlsForTier,
  shieldMonthlyAddOn,
  shieldScore,
  type ShieldTier,
} from "@/lib/auraxir-shield";
import { formatMoney } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function ShieldMarketingSection() {
  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="accent">
          <Shield className="mr-1 size-3" />
          {SHIELD.name}
        </Badge>
        <Badge variant="outline">{SHIELD.principle}</Badge>
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-4xl">
        {SHIELD_COMPARISON_STORY.headline}
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--color-fg-muted)] sm:text-base">
        {SHIELD_COMPARISON_STORY.body}
      </p>
      <p className="mt-3 max-w-2xl text-sm font-medium text-[var(--color-fg)]">{SHIELD.promise}</p>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {SHIELD_COMPARISON_STORY.pillars.map((p) => (
          <div
            key={p.title}
            className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] p-4"
          >
            <p className="text-sm font-semibold text-[var(--color-fg)]">{p.title}</p>
            <p className="mt-2 text-xs leading-relaxed text-[var(--color-fg-muted)]">{p.body}</p>
          </div>
        ))}
      </div>

      <div
        className="mt-8 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)]"
        style={{
          background: "linear-gradient(135deg, #070b12 0%, #0f1a28 45%, #1a4d6e55 130%)",
        }}
      >
        <div className="p-6 sm:p-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
            {SHIELD.seal}
          </p>
          <p className="mt-2 text-2xl font-semibold text-white">{SHIELD.tagline}</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {SHIELD.marketLines.map((line) => (
              <li key={line} className="text-sm text-white/80">
                · {line}
              </li>
            ))}
          </ul>
          <Button asChild className="mt-6" size="lg" variant="secondary">
            <Link to="/start">Build under Shield</Link>
          </Button>
        </div>
      </div>

      <p className="mt-10 text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-fg-subtle)]">
        Controls we add (standalone layer)
      </p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {SHIELD_CONTROLS.map((c) => (
          <div
            key={c.id}
            className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-3"
          >
            <div className="flex items-center gap-2">
              <Lock className="size-3.5 text-[var(--color-fg-muted)]" />
              <p className="text-sm font-medium text-[var(--color-fg)]">{c.name}</p>
            </div>
            <p className="mt-1 text-[11px] capitalize text-[var(--color-fg-subtle)]">{c.layer}</p>
            <p className="mt-1 text-xs text-[var(--color-fg-muted)]">{c.blurb}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ShieldPlanCard({
  tier,
  builderId,
  secureNetwork,
  alwaysOn,
  className,
}: {
  tier: ShieldTier;
  builderId?: string;
  secureNetwork?: boolean;
  alwaysOn?: boolean;
  className?: string;
}) {
  const score = shieldScore({ tier, builderId, secureNetwork, alwaysOn });
  const addOn = shieldMonthlyAddOn(tier);
  const controls = controlsForTier(tier);

  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] p-4",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <ShieldCheck className="size-4 text-[var(--color-fg-muted)]" />
        <p className="text-sm font-semibold text-[var(--color-fg)]">{SHIELD.name}</p>
        <Badge variant="success" className="text-[10px]">
          {tier === "core" ? "Core" : tier === "shield" ? "Shield" : "Shield Max"}
        </Badge>
        <Badge variant="outline" className="text-[10px]">
          Grade {score.grade} · {score.score}
        </Badge>
        {addOn > 0 && (
          <span className="text-sm font-semibold text-[var(--color-fg)]">
            +{formatMoney(addOn)}/mo
          </span>
        )}
      </div>
      <p className="mt-2 text-xs text-[var(--color-fg-muted)]">{score.narrative}</p>
      <ul className="mt-3 max-h-40 space-y-1 overflow-y-auto">
        {controls.slice(0, 8).map((c) => (
          <li key={c.id} className="text-xs text-[var(--color-fg)]">
            · {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ShieldBuilderPanel({
  tier,
  builderId,
}: {
  tier: ShieldTier;
  builderId: string;
}) {
  const score = shieldScore({ tier, builderId });
  const controls = controlsForTier(tier);
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-[var(--color-fg)]">{SHIELD.seal}</p>
        <p className="mt-1 text-xs text-[var(--color-fg-muted)]">{SHIELD.promise}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge variant="success">Grade {score.grade}</Badge>
        <Badge variant="outline">Score {score.score}/99</Badge>
        <Badge variant="outline" className="capitalize">
          {tier}
        </Badge>
      </div>
      <div className="space-y-2">
        {controls.map((c) => (
          <div key={c.id} className="rounded-[var(--radius-sm)] border border-[var(--color-border)] p-2">
            <p className="text-xs font-medium text-[var(--color-fg)]">{c.name}</p>
            <p className="text-[11px] text-[var(--color-fg-muted)]">{c.blurb}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
