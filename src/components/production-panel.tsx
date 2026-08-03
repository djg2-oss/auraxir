import { Gauge, Rocket, Sparkles, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { SiteProject } from "@/lib/catalog";
import {
  productionReady,
  scoreProduction,
  type ProductionScore,
} from "@/lib/production";
import { cn } from "@/lib/utils";

export function ProductionScoreCard({
  project,
  onBoost,
  className,
}: {
  project: SiteProject;
  onBoost?: () => void;
  className?: string;
}) {
  const score = scoreProduction(project);
  const ready = productionReady(score);

  return (
    <div
      className={cn(
        "rounded-[var(--radius-md)] border border-[var(--color-border)] p-3",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-fg-subtle)]">
            <Gauge className="size-3.5" />
            Production score
          </p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-[var(--color-fg)]">
            {score.percent}
            <span className="text-sm font-normal text-[var(--color-fg-muted)]">/100</span>
            <Badge
              variant={score.grade === "A" || score.grade === "B" ? "success" : "outline"}
              className="ml-2 align-middle"
            >
              Grade {score.grade}
            </Badge>
          </p>
        </div>
        {ready ? (
          <Badge variant="success">
            <Rocket className="mr-1 size-3" />
            Prod ready
          </Badge>
        ) : (
          <Badge variant="outline">Boost available</Badge>
        )}
      </div>

      <ul className="mt-3 max-h-40 space-y-1.5 overflow-y-auto">
        {score.checks.map((c) => (
          <li
            key={c.id}
            className={cn(
              "flex items-start gap-2 text-xs",
              c.passed ? "text-[var(--color-fg-muted)]" : "text-[var(--color-fg)]",
            )}
          >
            <span
              className={cn(
                "mt-1 size-1.5 shrink-0 rounded-full",
                c.passed ? "bg-[var(--color-success)]" : "bg-[var(--color-fg-subtle)]",
              )}
            />
            <span>
              {c.label}
              {!c.passed && c.fix && (
                <span className="block text-[10px] text-[var(--color-fg-subtle)]">{c.fix}</span>
              )}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-3 border-t border-[var(--color-border)] pt-3">
        <p className="mb-1.5 flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--color-fg-subtle)]">
          <TrendingUp className="size-3" />
          Production boosts (additive)
        </p>
        <ul className="space-y-1">
          {score.boostsApplied.map((b) => (
            <li key={b} className="text-[11px] text-[var(--color-fg-muted)]">
              + {b}
            </li>
          ))}
        </ul>
      </div>

      {onBoost && (
        <Button className="mt-3 w-full" size="sm" onClick={onBoost}>
          <Sparkles className="size-3.5" />
          Boost production quality
        </Button>
      )}
    </div>
  );
}

export function useProductionScore(project: SiteProject): ProductionScore {
  return scoreProduction(project);
}
