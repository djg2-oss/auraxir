import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppChrome } from "@/components/site-shell";
import { SiteRenderer } from "@/components/site-renderer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { buildSample, SAMPLE_KINDS, type SampleKindId } from "@/lib/sample-build";
import { useBuilderStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/sample")({
  component: SamplePage,
});

function SamplePage() {
  const navigate = useNavigate();
  const createFromNeeds = useBuilderStore((s) => s.createProjectFromNeeds);
  const setNeeds = useBuilderStore((s) => s.setNeeds);
  const setLookFeel = useBuilderStore((s) => s.setLookFeel);
  const updateProject = useBuilderStore((s) => s.updateProject);
  const setTheme = useBuilderStore((s) => s.setTheme);
  const [kindId, setKindId] = useState<SampleKindId>("music");
  const [name, setName] = useState("");
  const sample = useMemo(() => buildSample(kindId, name || undefined), [kindId, name]);

  function keep() {
    setNeeds({
      businessName: sample.name,
      businessType: sample.needs.businessType,
      productIntent: "website",
      description: sample.needs.description,
    });
    setLookFeel(sample.needs.lookFeel);
    const project = createFromNeeds({
      siteTypeId: sample.siteTypeId,
      builderId: sample.builderId,
    });
    setTheme(project.id, sample.theme);
    updateProject(project.id, {
      name: sample.name,
      sections: sample.sections,
      labPaletteId: sample.labPaletteId,
      g2pStyleId: sample.g2pStyleId,
      g2pStyleName: sample.g2pStyleName,
    });
    void navigate({ to: "/builder/$projectId", params: { projectId: project.id } });
  }

  return (
    <AppChrome>
      <div className="border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-gold)]">
            Live sample
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-5xl">
            Pick a type. Auraxir builds it now.
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-[var(--color-fg-muted)]">
            A brief working site — look, copy, contact. Not a picture of a template. Keep it after you
            subscribe, or throw it away.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {SAMPLE_KINDS.map((k) => (
              <button
                key={k.id}
                type="button"
                onClick={() => {
                  setKindId(k.id);
                  setName("");
                }}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs",
                  k.id === kindId
                    ? "border-[var(--color-gold)] text-[var(--color-fg)]"
                    : "border-[var(--color-border)] text-[var(--color-fg-muted)]",
                )}
              >
                {k.label}
              </button>
            ))}
          </div>
          <div className="mt-4 flex max-w-md flex-wrap items-end gap-2">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={`Rename ${SAMPLE_KINDS.find((k) => k.id === kindId)?.name ?? ""}`}
              aria-label="Sample brand name"
            />
            <Button type="button" onClick={keep}>
              Keep this build
            </Button>
            <Button asChild variant="secondary">
              <Link to="/start" search={{ mode: "express" }}>
                Subscribe
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)]">
          <SiteRenderer project={sample} production={false} />
        </div>
      </div>
    </AppChrome>
  );
}
