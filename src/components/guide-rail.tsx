import { Compass, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  GUIDE,
  JOURNEY_STEPS,
  PATH_OPTIONS,
  guideCopy,
  journeyIndex,
  type GuidePath,
  type GuideStage,
} from "@/lib/guide";
import { cn } from "@/lib/utils";

export function GuideRail({
  stage,
  path,
  compact,
}: {
  stage: GuideStage;
  path: GuidePath;
  compact?: boolean;
}) {
  const idx = journeyIndex(stage);
  const copy = guideCopy(stage, path);

  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)]",
        compact ? "p-3" : "p-4 sm:p-5",
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Compass className="size-4 text-[var(--color-fg-muted)]" />
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-fg-subtle)]">
          {GUIDE.name}
        </p>
        {path && (
          <Badge variant="outline" className="text-[10px] capitalize">
            {path} path
          </Badge>
        )}
      </div>

      {!compact && (
        <>
          <p className="mt-2 text-sm font-semibold text-[var(--color-fg)]">{copy.title}</p>
          <p className="mt-1 text-xs leading-relaxed text-[var(--color-fg-muted)]">{copy.body}</p>
          <p className="mt-2 flex items-start gap-1.5 text-[11px] text-[var(--color-fg-subtle)]">
            <Sparkles className="mt-0.5 size-3 shrink-0" />
            {copy.tip}
          </p>
        </>
      )}

      <ol className="mt-4 flex flex-wrap gap-1.5">
        {JOURNEY_STEPS.map((s, i) => {
          const done = i < idx;
          const active = i === idx;
          return (
            <li
              key={s.id}
              className={cn(
                "rounded-full px-2.5 py-1 text-[10px] font-medium",
                active && "bg-[var(--color-primary)] text-[var(--color-primary-fg)]",
                done && !active && "bg-[var(--color-bg-subtle)] text-[var(--color-fg)]",
                !done && !active && "text-[var(--color-fg-subtle)]",
              )}
            >
              {s.label}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function GuidePathCards({
  value,
  onChange,
}: {
  value: GuidePath;
  onChange: (path: Exclude<GuidePath, null>) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {PATH_OPTIONS.map((opt) => {
        const selected = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={cn(
              "rounded-[var(--radius-lg)] border p-5 text-left transition-colors",
              selected
                ? "border-[var(--color-primary)] bg-[var(--color-bg-subtle)]"
                : "border-[var(--color-border)] hover:border-[var(--color-border-strong)]",
            )}
          >
            <p className="text-base font-semibold text-[var(--color-fg)]">{opt.label}</p>
            <p className="mt-2 text-sm text-[var(--color-fg-muted)]">{opt.blurb}</p>
            <p className="mt-3 text-[11px] text-[var(--color-fg-subtle)]">{opt.examples}</p>
          </button>
        );
      })}
    </div>
  );
}
