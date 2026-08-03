import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Plus, Trash2, Zap } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { AppChrome } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BRAND, formatMoney } from "@/lib/brand";
import { HOST_PLANS, SITE_TYPES } from "@/lib/catalog";
import { projectReadiness } from "@/lib/pipeline";
import { useBuilderStore } from "@/lib/store";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
});

function ProjectsPage() {
  const projects = useBuilderStore((s) => s.projects);
  const deleteProject = useBuilderStore((s) => s.deleteProject);

  const totalSub = projects.reduce((sum, p) => {
    const host = HOST_PLANS.find((h) => h.id === (p.builderId ?? p.hostPlanId));
    return sum + (p.priceMonthly ?? host?.priceMonthly ?? 0);
  }, 0);
  const live = projects.filter((p) => p.published).length;
  const ready = projects.filter((p) => !p.published && projectReadiness(p).stage === "ready")
    .length;

  return (
    <AppChrome>
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-fg)]">
              Your projects
            </h1>
            <p className="mt-2 text-[var(--color-fg-muted)]">
              Draft → Ready → Live under {BRAND.name}.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="secondary">
              <Link to="/start" search={{ mode: "express" }}>
                <Zap />
                Express
              </Link>
            </Button>
            <Button asChild>
              <Link to="/start" search={{ mode: "full" }}>
                <Plus />
                Full match
              </Link>
            </Button>
          </div>
        </div>

        {projects.length > 0 && (
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-4 py-3">
              <p className="text-xs text-[var(--color-fg-subtle)]">Monthly plans</p>
              <p className="mt-1 text-xl font-semibold text-[var(--color-fg)]">
                {formatMoney(totalSub)}
                <span className="text-sm font-normal text-[var(--color-fg-muted)]">/mo</span>
              </p>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-4 py-3">
              <p className="text-xs text-[var(--color-fg-subtle)]">Live</p>
              <p className="mt-1 text-xl font-semibold text-[var(--color-fg)]">{live}</p>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-4 py-3">
              <p className="text-xs text-[var(--color-fg-subtle)]">Ready to launch</p>
              <p className="mt-1 text-xl font-semibold text-[var(--color-fg)]">{ready}</p>
            </div>
          </div>
        )}

        {projects.length === 0 ? (
          <Card className="mt-10 shadow-none">
            <CardHeader>
              <CardTitle>No projects yet</CardTitle>
              <CardDescription>
                Express (2 steps) or Full match (4 steps) — we find the best fit and you build.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button asChild>
                <Link to="/start" search={{ mode: "express" }}>
                  <Zap />
                  Express match
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/start" search={{ mode: "full" }}>
                  Full match
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="mt-8 grid gap-3">
            {projects.map((project) => {
              const siteType = SITE_TYPES.find((t) => t.id === project.siteTypeId);
              const host = HOST_PLANS.find(
                (h) => h.id === (project.builderId ?? project.hostPlanId),
              );
              const price = project.priceMonthly ?? host?.priceMonthly ?? 0;
              const readiness = projectReadiness(project);
              return (
                <Card key={project.id} className="shadow-none">
                  <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="truncate text-base font-semibold text-[var(--color-fg)]">
                          {project.name}
                        </h2>
                        {readiness.stage === "live" && (
                          <Badge variant="success">Live</Badge>
                        )}
                        {readiness.stage === "ready" && (
                          <Badge variant="accent">Ready to publish</Badge>
                        )}
                        {readiness.stage === "draft" && (
                          <Badge variant="outline">Draft · {readiness.production.percent}%</Badge>
                        )}
                        {project.g2pStyleName && (
                          <Badge variant="outline">{project.g2pStyleName}</Badge>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
                        {siteType?.name ?? project.siteTypeId} · {host?.name ?? "—"} ·{" "}
                        {project.domain}
                      </p>
                      <p className="mt-1 text-xs text-[var(--color-fg-subtle)]">
                        Next: {readiness.next}
                      </p>
                      <p className="mt-1 text-xs text-[var(--color-fg-subtle)]">
                        {formatMoney(price)}/mo ·{" "}
                        {formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true })}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button asChild variant="secondary" size="sm">
                        <Link to="/builder/$projectId" params={{ projectId: project.id }}>
                          Builder
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <Link to="/preview/$projectId" params={{ projectId: project.id }}>
                          <ExternalLink />
                          Preview
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label={`Delete ${project.name}`}
                        onClick={() => {
                          if (confirm(`Delete “${project.name}”?`)) deleteProject(project.id);
                        }}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </AppChrome>
  );
}
