import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { AppChrome } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { paletteById } from "@/lib/lab";
import { PALETTES } from "@/lib/showcase";
import { useBuilderStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/lab")({
  component: LabPage,
});

function LabPage() {
  const [paletteId, setPaletteId] = useState("aer");
  const pal = paletteById(paletteId);
  const projects = useBuilderStore((s) => s.projects);
  const live = projects[0];

  return (
    <AppChrome>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-gold)]">
          AER Color Lab
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-5xl">
          Examples now. Your brand after you subscribe.
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--color-fg-muted)]">
          These stills show the colorations we paint with. Generating stills and locking a climate
          onto a site happens after purchase — in your builder.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {live ? (
            <Button asChild>
              <Link to="/builder/$projectId" params={{ projectId: live.id }}>
                Brand your site
                <ArrowRight />
              </Link>
            </Button>
          ) : (
            <Button asChild>
              <Link to="/start" search={{ mode: "full" }}>
                Subscribe and brand
                <ArrowRight />
              </Link>
            </Button>
          )}
          <Button asChild variant="secondary">
            <Link to="/start" search={{ mode: "express" }}>
              Express match
            </Link>
          </Button>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {PALETTES.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPaletteId(p.id)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs",
                p.id === paletteId
                  ? "border-[var(--color-gold)] text-[var(--color-fg)]"
                  : "border-[var(--color-border)] text-[var(--color-fg-muted)]",
              )}
            >
              {p.name}
            </button>
          ))}
        </div>

        <figure
          className="mt-8 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)]"
          style={{ background: pal.paper, color: pal.ink }}
        >
          <img src={pal.src} alt={`${pal.name} example`} className="aspect-[16/9] w-full object-cover" />
          <figcaption className="p-5 sm:p-6">
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-70">
              Example · {pal.role}
            </p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-3xl">{pal.name}</p>
            <div className="mt-4 flex h-12 overflow-hidden rounded-[var(--radius-sm)]">
              {pal.colors.map((c) => (
                <span key={c} className="flex-1" style={{ background: c }} title={c} />
              ))}
            </div>
          </figcaption>
        </figure>
      </div>
    </AppChrome>
  );
}
