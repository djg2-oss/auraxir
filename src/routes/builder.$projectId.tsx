import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  ExternalLink,
  Globe,
  Palette,
  PanelLeft,
  Rocket,
  Shield,
  ShieldCheck,
  Wand2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { BrandMark } from "@/components/brand-mark";
import { G2PStyleSwatches, G2PTrainingNote } from "@/components/g2p-panel";
import { QuoteSummary } from "@/components/price-card";
import { ProductionScoreCard } from "@/components/production-panel";
import { ShieldBuilderPanel } from "@/components/shield-panel";
import { TieInPanel } from "@/components/tie-in-panel";
import { SiteRenderer } from "@/components/site-renderer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { BRAND, QUALITY_CHECKS, formatMoney } from "@/lib/brand";
import { getHostPlan, SITE_TYPES } from "@/lib/catalog";
import { emptyLookFeel, runG2P } from "@/lib/g2p-ai";
import { scoreProduction } from "@/lib/production";
import { useBuilderStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/builder/$projectId")({
  component: BuilderPage,
});

function BuilderPage() {
  const { projectId } = Route.useParams();
  const project = useBuilderStore((s) => s.projects.find((p) => p.id === projectId));
  const updateProject = useBuilderStore((s) => s.updateProject);
  const updateSection = useBuilderStore((s) => s.updateSection);
  const reorderSections = useBuilderStore((s) => s.reorderSections);
  const setTheme = useBuilderStore((s) => s.setTheme);
  const publishProject = useBuilderStore((s) => s.publishProject);
  const runQualityPass = useBuilderStore((s) => s.runQualityPass);
  const boostProduction = useBuilderStore((s) => s.boostProduction);
  const applyG2P = useBuilderStore((s) => s.applyG2P);

  const [panel, setPanel] = useState<"sections" | "theme" | "g2p" | "enhance" | "shield" | "site">("sections");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const selected = useMemo(
    () => project?.sections.find((s) => s.id === selectedId) ?? project?.sections[0],
    [project, selectedId],
  );

  const prodScore = useMemo(
    () => (project ? scoreProduction(project) : null),
    [project],
  );

  if (!project) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-xl font-semibold text-[var(--color-fg)]">Project not found</h1>
        <Button asChild>
          <Link to="/projects">Back to projects</Link>
        </Button>
      </div>
    );
  }

  const siteType = SITE_TYPES.find((t) => t.id === project.siteTypeId);
  const host = getHostPlan(project.builderId ?? project.hostPlanId);
  const activeSection = selected ?? project.sections[0];
  const setupFee = project.setupFee ?? BRAND.setupFee;
  const priceMonthly = project.priceMonthly ?? host.priceMonthly;

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-[var(--color-bg)]">
      <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-[var(--color-border)] px-3 sm:px-4">
        <div className="flex min-w-0 items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Toggle editor"
            onClick={() => setSidebarOpen((v) => !v)}
          >
            <PanelLeft />
          </Button>
          <Link to="/" className="hidden sm:inline">
            <BrandMark size="sm" />
          </Link>
          <span className="hidden text-[var(--color-fg-subtle)] sm:inline">/</span>
          <h1 className="truncate text-sm font-semibold text-[var(--color-fg)]">{project.name}</h1>
          {project.published ? (
            <Badge variant="success" className="hidden sm:inline-flex">
              Production · Auraxir
            </Badge>
          ) : (
            <Badge variant="outline" className="hidden sm:inline-flex">
              {host.name}
            </Badge>
          )}
          {project.g2pStyleName && (
            <Badge variant="accent" className="hidden md:inline-flex">
              <Wand2 className="mr-1 size-3" />
              {project.g2pStyleName}
            </Badge>
          )}
          {prodScore && (
            <Badge
              variant={prodScore.percent >= 70 ? "success" : "outline"}
              className="hidden lg:inline-flex"
            >
              Prod {prodScore.percent}%
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => {
              applyG2P(project.id);
              boostProduction(project.id);
              runQualityPass(project.id);
              toast.success("G2P look + production boosted", {
                description: "Desired aesthetic re-applied · quality raised · nothing removed",
              });
            }}
          >
            <Wand2 />
            G2P + QA
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/preview/$projectId" params={{ projectId: project.id }}>
              <ExternalLink />
              <span className="hidden sm:inline">Preview</span>
            </Link>
          </Button>
          <Button
            size="sm"
            onClick={() => {
              applyG2P(project.id);
              boostProduction(project.id);
              publishProject(project.id);
              toast.success("Live — Elite Quality Service production", {
                description: `${project.domain} · G2P look locked · ${formatMoney(priceMonthly)}/mo`,
              });
            }}
          >
            <Rocket />
            Publish
          </Button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside
          className={cn(
            "flex w-full max-w-full shrink-0 flex-col border-r border-[var(--color-border)] bg-[var(--color-bg-elevated)] lg:w-[360px]",
            sidebarOpen ? "flex" : "hidden lg:flex",
          )}
        >
          <div className="border-b border-[var(--color-border)] px-3 py-2 text-[11px] text-[var(--color-fg-subtle)]">
            Auraxir G2P AI · Imago · Shield · Elite production
          </div>
          <div className="flex gap-1 border-b border-[var(--color-border)] p-2">
            {(
              [
                ["sections", "Sections"],
                ["theme", "Theme"],
                ["g2p", "G2P AI"],
                ["enhance", "Imago"],
                ["shield", "Shield"],
                ["site", "Prod"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setPanel(id)}
                className={cn(
                  "flex-1 rounded-[var(--radius-sm)] px-1.5 py-2 text-[11px] font-medium transition-colors",
                  panel === id
                    ? "bg-[var(--color-bg-subtle)] text-[var(--color-fg)]"
                    : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]",
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-3">
            {panel === "sections" && (
              <div className="space-y-3">
                <div className="space-y-1">
                  {project.sections.map((section, index) => (
                    <div
                      key={section.id}
                      className={cn(
                        "flex items-center gap-1 rounded-[var(--radius-sm)] border px-2 py-1.5",
                        activeSection?.id === section.id
                          ? "border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)]"
                          : "border-transparent",
                      )}
                    >
                      <button
                        type="button"
                        className="min-w-0 flex-1 truncate text-left text-sm text-[var(--color-fg)]"
                        onClick={() => {
                          setSelectedId(section.id);
                          setSidebarOpen(true);
                        }}
                      >
                        <span className="capitalize">{section.type}</span>
                      </button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        aria-label="Move up"
                        disabled={index === 0}
                        onClick={() => reorderSections(project.id, index, index - 1)}
                      >
                        <ChevronUp className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        aria-label="Move down"
                        disabled={index === project.sections.length - 1}
                        onClick={() => reorderSections(project.id, index, index + 1)}
                      >
                        <ChevronDown className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        aria-label={section.visible ? "Hide" : "Show"}
                        onClick={() =>
                          updateSection(project.id, section.id, { visible: !section.visible })
                        }
                      >
                        {section.visible ? (
                          <Eye className="size-3.5" />
                        ) : (
                          <EyeOff className="size-3.5" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>

                {activeSection && (
                  <>
                    <Separator />
                    <div className="space-y-3">
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-fg-subtle)]">
                        Edits · {activeSection.type}
                      </p>
                      <div className="space-y-2">
                        <Label htmlFor="sec-title">Title</Label>
                        <Input
                          id="sec-title"
                          value={activeSection.title}
                          onChange={(e) =>
                            updateSection(project.id, activeSection.id, { title: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sec-sub">Subtitle</Label>
                        <Input
                          id="sec-sub"
                          value={activeSection.subtitle}
                          onChange={(e) =>
                            updateSection(project.id, activeSection.id, {
                              subtitle: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sec-body">Body</Label>
                        <Textarea
                          id="sec-body"
                          value={activeSection.body}
                          onChange={(e) =>
                            updateSection(project.id, activeSection.id, { body: e.target.value })
                          }
                        />
                      </div>
                      {(activeSection.type === "hero" ||
                        activeSection.type === "cta" ||
                        activeSection.type === "contact") && (
                        <div className="space-y-2">
                          <Label htmlFor="sec-cta">Button label</Label>
                          <Input
                            id="sec-cta"
                            value={activeSection.ctaLabel}
                            onChange={(e) =>
                              updateSection(project.id, activeSection.id, {
                                ctaLabel: e.target.value,
                              })
                            }
                          />
                        </div>
                      )}
                      {activeSection.items.length > 0 && (
                        <div className="space-y-3">
                          {activeSection.items.map((item, i) => (
                            <div
                              key={i}
                              className="space-y-2 rounded-[var(--radius-md)] border border-[var(--color-border)] p-3"
                            >
                              <Input
                                value={item.title}
                                onChange={(e) => {
                                  const items = activeSection.items.map((it, idx) =>
                                    idx === i ? { ...it, title: e.target.value } : it,
                                  );
                                  updateSection(project.id, activeSection.id, { items });
                                }}
                              />
                              <Textarea
                                value={item.body}
                                onChange={(e) => {
                                  const items = activeSection.items.map((it, idx) =>
                                    idx === i ? { ...it, body: e.target.value } : it,
                                  );
                                  updateSection(project.id, activeSection.id, { items });
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {panel === "theme" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-[var(--color-fg)]">
                  <Palette className="size-4 text-[var(--color-fg-muted)]" />
                  Manual theme · G2P can override
                </div>
                {(
                  [
                    ["primary", "Primary"],
                    ["accent", "Accent"],
                    ["surface", "Surface"],
                    ["text", "Text"],
                    ["muted", "Muted"],
                  ] as const
                ).map(([key, label]) => (
                  <div key={key} className="flex items-center gap-3">
                    <input
                      type="color"
                      aria-label={label}
                      value={project.theme[key]}
                      onChange={(e) => setTheme(project.id, { [key]: e.target.value })}
                      className="h-10 w-12 cursor-pointer rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-transparent p-1"
                    />
                    <div className="min-w-0 flex-1">
                      <Label>{label}</Label>
                      <Input
                        value={project.theme[key]}
                        onChange={(e) => setTheme(project.id, { [key]: e.target.value })}
                        className="mt-1 font-mono text-xs"
                      />
                    </div>
                  </div>
                ))}
                <div className="space-y-2">
                  <Label>Radius</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["sharp", "soft", "round"] as const).map((r) => (
                      <Button
                        key={r}
                        size="sm"
                        variant={project.theme.radius === r ? "default" : "secondary"}
                        className="capitalize"
                        onClick={() => setTheme(project.id, { radius: r })}
                      >
                        {r}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Font</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["sans", "serif", "display"] as const).map((f) => (
                      <Button
                        key={f}
                        size="sm"
                        variant={project.theme.font === f ? "default" : "secondary"}
                        className="capitalize"
                        onClick={() => setTheme(project.id, { font: f })}
                      >
                        {f}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {panel === "g2p" && (
              <div className="space-y-4">
                <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] p-3">
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-fg-subtle)]">
                    Auraxir G2P AI · Goal-to-Production
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[var(--color-fg)]">
                    {project.g2pStyleName ?? "No system applied yet"}
                  </p>
                  {project.g2pConfidence != null && (
                    <p className="mt-1 text-xs text-[var(--color-fg-muted)]">
                      Look fit {project.g2pConfidence}% · ensures desired aesthetic in production
                    </p>
                  )}
                  <Button
                    className="mt-3 w-full"
                    size="sm"
                    onClick={() => {
                      applyG2P(project.id);
                      const next = runG2P({
                        prefs: project.needs.lookFeel ?? emptyLookFeel(),
                        businessType: project.needs.businessType,
                        description: project.needs.description,
                      });
                      toast.success(`G2P applied: ${next.system.name}`, {
                        description: `${next.confidence}% look fit · voice: ${next.system.tone.voice}`,
                      });
                    }}
                  >
                    <Wand2 className="size-3.5" />
                    Re-run G2P from their desire
                  </Button>
                </div>

                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-fg-subtle)]">
                    Trained production systems
                  </p>
                  <G2PStyleSwatches
                    activeId={project.g2pStyleId}
                    onSelect={(system) => {
                      applyG2P(project.id, system);
                      toast.success(`Look set: ${system.name}`, {
                        description: system.blurb,
                      });
                    }}
                  />
                </div>

                <G2PTrainingNote />
              </div>
            )}

            {panel === "enhance" && (
              <TieInPanel projectId={project.id} />
            )}

            {panel === "shield" && (
              <ShieldBuilderPanel
                tier={project.shieldTier ?? "core"}
                builderId={project.builderId ?? project.hostPlanId}
              />
            )}

            {panel === "site" && (
              <div className="space-y-4">
                <ProductionScoreCard
                  project={project}
                  onBoost={() => {
                    boostProduction(project.id);
                    toast.success("Production quality increased", {
                      description: "Filled gaps only — G2P look preserved",
                    });
                  }}
                />
<div className="space-y-2">
                  <Label htmlFor="site-name">Project name</Label>
                  <Input
                    id="site-name"
                    value={project.name}
                    onChange={(e) => updateProject(project.id, { name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-domain">Auraxir production domain</Label>
                  <Input
                    id="site-domain"
                    value={project.domain}
                    onChange={(e) => updateProject(project.id, { domain: e.target.value })}
                  />
                </div>
                <Separator />
                <QuoteSummary
                  setupFee={setupFee}
                  priceMonthly={priceMonthly}
                  secureNetwork={project.secureNetworkEnabled}
                />
                <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] p-3">
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-fg-subtle)]">
                    Your plan
                  </p>
                  <p className="mt-2 text-sm text-[var(--color-fg)]">
                    Layout: {siteType?.name ?? project.siteTypeId}
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
                    {host.name} · G2P {project.g2pStyleName ?? "—"}
                  </p>
                  <Button
                    className="mt-3 w-full"
                    size="sm"
                    variant={project.secureNetworkEnabled ? "secondary" : "default"}
                    onClick={() =>
                      updateProject(project.id, {
                        secureNetworkEnabled: !project.secureNetworkEnabled,
                      })
                    }
                  >
                    <Shield className="mr-1 size-3.5" />
                    {project.secureNetworkEnabled
                      ? "Secure network ON"
                      : "Enable VPN / tunneling"}
                  </Button>
                </div>
                <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] p-3">
                  <p className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-fg-subtle)]">
                    <ShieldCheck className="size-3.5" />
                    Elite quality bar
                  </p>
                  <ul className="space-y-1.5">
                    {QUALITY_CHECKS.map((c) => (
                      <li key={c} className="text-xs text-[var(--color-fg-muted)]">
                        · {c}
                      </li>
                    ))}
                    <li className="text-xs text-[var(--color-fg-muted)]">
                      · G2P look & feel matched to customer desire
                    </li>
                  </ul>
                </div>
                <div className="flex items-start gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] p-3 text-sm text-[var(--color-fg-muted)]">
                  <Globe className="mt-0.5 size-4 shrink-0" />
                  Production: {BRAND.productionSeal}. Look locked by Auraxir G2P AI.
                </div>
              </div>
            )}
          </div>
        </aside>

        <div
          className={cn(
            "min-w-0 flex-1 overflow-y-auto bg-[var(--color-bg-subtle)] p-3 sm:p-6",
            sidebarOpen && "hidden lg:block",
          )}
        >
          <div className="mx-auto max-w-4xl">
            <div className="mb-3 flex items-center justify-between gap-2">
              <p className="text-xs text-[var(--color-fg-subtle)]">
                Production preview · {host.name}
                {project.g2pStyleName ? ` · G2P ${project.g2pStyleName}` : ""}
                {prodScore ? ` · ${prodScore.percent}%` : ""}
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                Edit
              </Button>
            </div>
            <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]">
              <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-100 px-3 py-2">
                <span className="size-2.5 rounded-full bg-zinc-300" />
                <span className="size-2.5 rounded-full bg-zinc-300" />
                <span className="size-2.5 rounded-full bg-zinc-300" />
                <span className="ml-2 truncate text-xs text-zinc-500">{project.domain}</span>
              </div>
              <SiteRenderer project={project} production />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
