import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { generateLabStill } from "@/lib/anmos/imagine";
import type { SiteProject } from "@/lib/catalog";
import { paletteById, themeFromPalette } from "@/lib/lab";
import { PALETTES } from "@/lib/showcase";
import { useBuilderStore } from "@/lib/store";
import { cn } from "@/lib/utils";

/** Post-subscribe branding. Public site only shows examples. */
export function ColorLabPanel({ project }: { project: SiteProject }) {
  const setTheme = useBuilderStore((s) => s.setTheme);
  const updateProject = useBuilderStore((s) => s.updateProject);
  const [busy, setBusy] = useState(false);
  const pal = paletteById(project.labPaletteId ?? "aer");
  const images = project.labImages ?? [];

  function apply(id: string) {
    const next = paletteById(id);
    setTheme(project.id, themeFromPalette(next));
    updateProject(project.id, { labPaletteId: id });
    toast(`${next.name} applied to this site`);
  }

  async function generate() {
    setBusy(true);
    try {
      const r = await generateLabStill({
        data: { brand: project.name, paletteId: pal.id, kind: pal.role },
      });
      if (!r.ok || !r.url) {
        toast(r.error || "Could not generate");
        return;
      }
      updateProject(project.id, { labImages: [r.url, ...images].slice(0, 8) });
      toast("Still added");
    } catch {
      toast("Generation failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-gold)]">
        AER Color Lab
      </p>
      <p className="text-sm text-[var(--color-fg-muted)]">
        You subscribed. Brand this site. Examples on the public lab stay examples.
      </p>
      <div className="flex flex-wrap gap-1.5">
        {PALETTES.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => apply(p.id)}
            className={cn(
              "rounded-full border px-2.5 py-1 text-[11px]",
              p.id === pal.id
                ? "border-[var(--color-gold)] text-[var(--color-fg)]"
                : "border-[var(--color-border)] text-[var(--color-fg-muted)]",
            )}
          >
            {p.name}
          </button>
        ))}
      </div>
      <div className="flex h-8 overflow-hidden rounded-[var(--radius-sm)]">
        {pal.colors.map((c) => (
          <span key={c} className="flex-1" style={{ background: c }} />
        ))}
      </div>
      <img src={pal.src} alt="" className="aspect-[16/9] w-full rounded-[var(--radius-md)] object-cover" />
      <Button type="button" size="sm" onClick={() => void generate()} disabled={busy}>
        {busy ? <LoaderCircle className="size-3.5 animate-spin" /> : null}
        Generate a still for {project.name}
      </Button>
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {images.map((src) => (
            <img key={src} src={src} alt="" className="aspect-[16/10] w-full rounded object-cover" />
          ))}
        </div>
      )}
    </div>
  );
}
