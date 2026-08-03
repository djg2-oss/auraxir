import { Sparkles, Wand2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  G2P,
  G2P_MODEL_CARD,
  G2P_STYLE_CORPUS,
  type G2PRecommendation,
  type StyleSystem,
} from "@/lib/g2p-ai";
import { cn } from "@/lib/utils";

export function G2PModelBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] px-3 py-1.5 text-xs text-[var(--color-fg-muted)]",
        className,
      )}
    >
      <Wand2 className="size-3.5 text-[var(--color-fg)]" />
      <span>
        <span className="font-medium text-[var(--color-fg)]">{G2P.name}</span>{" "}
        <span className="text-[var(--color-fg-subtle)]">{G2P.version}</span>
      </span>
    </div>
  );
}

export function G2PResultCard({
  rec,
  onApply,
  onPickAlt,
  className,
}: {
  rec: G2PRecommendation;
  onApply?: () => void;
  onPickAlt?: (system: StyleSystem) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] p-4",
        className,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--color-fg-subtle)]">
            {G2P.seal}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-[var(--color-fg)]">{rec.system.name}</h3>
          <p className="mt-1 text-sm text-[var(--color-fg-muted)]">{rec.system.blurb}</p>
        </div>
        <Badge variant="success">{rec.confidence}% fit</Badge>
      </div>

      <p className="mt-2 text-xs font-medium text-[var(--color-fg)]">{G2P.principle}</p>

      <div
        className="mt-4 h-16 rounded-[var(--radius-md)] border border-[var(--color-border)]"
        style={{
          background: `linear-gradient(135deg, ${rec.system.theme.primary}, ${rec.system.theme.accent})`,
        }}
      />
      <div className="mt-2 flex flex-wrap gap-2">
        {(["primary", "accent", "surface"] as const).map((k) => (
          <span
            key={k}
            className="inline-flex items-center gap-1.5 text-[10px] text-[var(--color-fg-subtle)]"
          >
            <span
              className="size-3 rounded-full border border-[var(--color-border)]"
              style={{ background: rec.system.theme[k] }}
            />
            {k}
          </span>
        ))}
        <Badge variant="outline" className="text-[10px]">
          {rec.system.theme.font} · {rec.system.theme.radius}
        </Badge>
      </div>

      <ul className="mt-3 space-y-1">
        {rec.reasons.slice(0, 4).map((r) => (
          <li key={r} className="text-xs text-[var(--color-fg-muted)]">
            · {r}
          </li>
        ))}
      </ul>

      <p className="mt-2 text-[11px] text-[var(--color-fg-subtle)]">
        Voice: {rec.system.tone.voice}
      </p>

      {onApply && (
        <Button className="mt-4 w-full" size="sm" onClick={onApply}>
          <Sparkles className="size-3.5" />
          Apply with {G2P.name}
        </Button>
      )}

      {onPickAlt && rec.alternatives.length > 0 && (
        <div className="mt-4 space-y-2 border-t border-[var(--color-border)] pt-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--color-fg-subtle)]">
            Alternates from G2P corpus
          </p>
          {rec.alternatives.map((a) => (
            <button
              key={a.system.id}
              type="button"
              onClick={() => onPickAlt(a.system)}
              className="flex w-full items-center justify-between rounded-[var(--radius-sm)] border border-[var(--color-border)] px-3 py-2 text-left text-xs hover:bg-[var(--color-bg-subtle)]"
            >
              <span className="font-medium text-[var(--color-fg)]">{a.system.name}</span>
              <span className="text-[var(--color-fg-subtle)]">{a.note}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function G2PStyleSwatches({
  activeId,
  onSelect,
}: {
  activeId?: string;
  onSelect: (system: StyleSystem) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--color-fg-subtle)]">
        {G2P.name} · style corpus
      </p>
      <div className="grid grid-cols-2 gap-2">
        {G2P_STYLE_CORPUS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelect(s)}
            className={cn(
              "rounded-[var(--radius-md)] border p-2 text-left transition-colors",
              activeId === s.id
                ? "border-[var(--color-primary)] bg-[var(--color-bg-subtle)]"
                : "border-[var(--color-border)] hover:border-[var(--color-border-strong)]",
            )}
          >
            <div
              className="mb-2 h-8 rounded-[var(--radius-sm)]"
              style={{
                background: `linear-gradient(135deg, ${s.theme.primary}, ${s.theme.accent})`,
              }}
            />
            <p className="text-[11px] font-medium text-[var(--color-fg)]">{s.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export function G2PTrainingNote() {
  return (
    <div className="rounded-[var(--radius-md)] border border-dashed border-[var(--color-border-strong)] p-3 text-[11px] text-[var(--color-fg-subtle)]">
      <p className="font-medium text-[var(--color-fg)]">
        {G2P.name} · {G2P.version}
      </p>
      <p className="mt-1 text-[var(--color-fg-muted)]">{G2P.tagline}</p>
      <p className="mt-2">{G2P_MODEL_CARD.promise}</p>
      <ul className="mt-2 space-y-0.5">
        {G2P_MODEL_CARD.training.map((line) => (
          <li key={line}>· {line}</li>
        ))}
      </ul>
    </div>
  );
}
