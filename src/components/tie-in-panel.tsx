import { Aperture, Check, Plus, Sparkles, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  IMAGO,
  IMAGO_STAGES,
  projectImagoIds,
  imagoThemeHint,
} from "@/lib/imago";
import { useBuilderStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function TieInPanel({ projectId }: { projectId: string }) {
  const project = useBuilderStore((s) => s.projects.find((p) => p.id === projectId));
  const applyTieIn = useBuilderStore((s) => s.applyTieIn);
  const removeTieIn = useBuilderStore((s) => s.removeTieIn);
  const setTheme = useBuilderStore((s) => s.setTheme);

  if (!project) return null;
  const applied = new Set(project.tieInIds ?? projectImagoIds(project.sections));

  return (
    <div className="space-y-4">
      <div>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Aperture className="size-4 text-[var(--color-fg-muted)]" />
          <p className="text-sm font-semibold text-[var(--color-fg)]">{IMAGO.name}</p>
          <Badge variant="accent" className="text-[9px]">
            {IMAGO.principle}
          </Badge>
        </div>
        <p className="text-sm font-medium text-[var(--color-fg)]">{IMAGO.marketingOneLiner}</p>
        <p className="mt-2 text-xs leading-relaxed text-[var(--color-fg-muted)]">{IMAGO.promise}</p>
      </div>

      <div
        className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] p-4"
        style={{
          background: "linear-gradient(135deg, #0b0b0f 0%, #1a1a22 50%, #c9a22755 160%)",
        }}
      >
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/60">
          Market name
        </p>
        <p className="mt-1 text-lg font-semibold text-white">{IMAGO.seal}</p>
        <p className="mt-1 text-xs text-white/75">{IMAGO.tagline}</p>
      </div>

      <div className="space-y-2">
        {IMAGO_STAGES.map((stage) => {
          const on = applied.has(stage.id);
          return (
            <div
              key={stage.id}
              className={cn(
                "overflow-hidden rounded-[var(--radius-md)] border",
                on
                  ? "border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)]"
                  : "border-[var(--color-border)]",
              )}
            >
              <div
                className="h-14 w-full"
                style={{ background: stage.atmosphere.gradient }}
                title={stage.atmosphere.label}
              />
              <div className="p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium text-[var(--color-fg)]">{stage.name}</p>
                  <Badge variant="outline" className="text-[9px]">
                    /{stage.pageSlug}
                  </Badge>
                  <Badge variant="outline" className="text-[9px] capitalize">
                    {stage.imageMood}
                  </Badge>
                  {on && (
                    <Badge variant="success" className="text-[9px]">
                      <Check className="mr-0.5 size-2.5" />
                      Live
                    </Badge>
                  )}
                </div>
                <p className="mt-1 text-xs font-medium text-[var(--color-fg)]">{stage.hook}</p>
                <p className="mt-1 text-xs text-[var(--color-fg-muted)]">{stage.blurb}</p>
                <p className="mt-1 text-[11px] text-[var(--color-fg-subtle)]">{stage.whenWeUseIt}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {on ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        removeTieIn(projectId, stage.id);
                        toast.message("Imago stage removed", { description: stage.name });
                      }}
                    >
                      <Trash2 />
                      Remove
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => {
                        applyTieIn(projectId, stage.id);
                        setTheme(projectId, imagoThemeHint(stage.imageMood));
                        toast.success("Imago stage attached", {
                          description: `${stage.boostLabel} · ${IMAGO.principle}`,
                        });
                      }}
                    >
                      <Plus />
                      Attach stage
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-[var(--radius-md)] border border-dashed border-[var(--color-border)] p-3">
        <Sparkles className="mb-2 size-4 text-[var(--color-fg-muted)]" />
        <p className="text-xs text-[var(--color-fg-muted)]">
          Attach whenever the image can be stronger. Stages appear in site navigation
          automatically. Additive only — image rises, nothing is stripped.
        </p>
      </div>
    </div>
  );
}

/** Alias for market naming */
export function ImagoPanel(props: { projectId: string }) {
  return <TieInPanel {...props} />;
}
