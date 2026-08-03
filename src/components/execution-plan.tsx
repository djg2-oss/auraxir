import { Check, Circle, Loader2, Pause } from "lucide-react";
import {
  EXECUTION_NORTH_STAR,
  EXECUTION_PLAN,
  executionProgress,
  type ExecStatus,
} from "@/lib/execution-plan";
import { cn } from "@/lib/utils";

function StatusIcon({ status }: { status: ExecStatus }) {
  if (status === "done")
    return <Check className="size-3.5 text-[var(--color-success)]" />;
  if (status === "active")
    return <Loader2 className="size-3.5 animate-spin text-[var(--color-fg)]" />;
  if (status === "next")
    return <Circle className="size-3.5 text-[var(--color-fg-muted)]" />;
  return <Pause className="size-3.5 text-[var(--color-fg-subtle)]" />;
}

export function ExecutionPlanPanel({ className }: { className?: string }) {
  const progress = executionProgress();

  return (
    <div
      className={cn(
        "min-w-0 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] p-4 sm:p-5",
        className,
      )}
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--color-fg-subtle)]">
            Polished execution plan
          </p>
          <h3 className="mt-1 text-lg font-semibold text-[var(--color-fg)]">
            What we ship · what is done
          </h3>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold tabular-nums text-[var(--color-fg)]">
            {progress.percent}%
          </p>
          <p className="text-[11px] text-[var(--color-fg-subtle)]">
            {progress.done}/{progress.total} done · {progress.active} active
          </p>
        </div>
      </div>
      <p className="mt-3 text-sm text-[var(--color-fg-muted)]">{EXECUTION_NORTH_STAR}</p>

      <div className="mt-5 space-y-5">
        {EXECUTION_PLAN.map((phase) => (
          <div key={phase.id} className="min-w-0">
            <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between">
              <p className="text-sm font-semibold text-[var(--color-fg)]">{phase.title}</p>
              <p className="text-[11px] text-[var(--color-fg-subtle)]">{phase.outcome}</p>
            </div>
            <ul className="space-y-2">
              {phase.items.map((item) => (
                <li
                  key={item.id}
                  className="flex min-w-0 items-start gap-2.5 rounded-[var(--radius-sm)] border border-[var(--color-border)] px-3 py-2"
                >
                  <span className="mt-0.5 shrink-0">
                    <StatusIcon status={item.status} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[var(--color-fg)]">{item.title}</p>
                    <p className="break-words text-xs text-[var(--color-fg-muted)]">{item.detail}</p>
                  </div>
                  <span className="hidden shrink-0 text-[10px] uppercase tracking-[0.1em] text-[var(--color-fg-subtle)] sm:inline">
                    {item.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
