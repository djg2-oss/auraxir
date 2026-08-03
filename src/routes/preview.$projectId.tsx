import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Rocket } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { SiteRenderer } from "@/components/site-renderer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";
import { scoreProduction } from "@/lib/production";
import { useBuilderStore } from "@/lib/store";

export const Route = createFileRoute("/preview/$projectId")({
  component: PreviewPage,
});

function PreviewPage() {
  const { projectId } = Route.useParams();
  const project = useBuilderStore((s) => s.projects.find((p) => p.id === projectId));

  if (!project) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-[var(--color-bg)] px-4 text-center">
        <h1 className="text-xl font-semibold text-[var(--color-fg)]">Site not found</h1>
        <Button asChild>
          <Link to="/projects">Back to projects</Link>
        </Button>
      </div>
    );
  }

  const score = scoreProduction(project);

  return (
    <div className="min-h-dvh bg-[var(--color-bg)]">
      <div className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-bg)_90%,transparent)] px-4 py-3 backdrop-blur">
        <div className="flex min-w-0 items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link to="/builder/$projectId" params={{ projectId: project.id }}>
              <ArrowLeft />
              Builder
            </Link>
          </Button>
          <BrandMark size="sm" className="hidden sm:inline-flex" />
        </div>
        <div className="flex min-w-0 items-center gap-2">
          {project.published && (
            <Badge variant="success" className="hidden sm:inline-flex">
              <Rocket className="mr-1 size-3" />
              Live
            </Badge>
          )}
          <Badge variant="outline" className="hidden sm:inline-flex">
            Prod {score.percent}% · {score.grade}
          </Badge>
          <p className="truncate text-xs text-[var(--color-fg-muted)]">
            {project.domain} · {BRAND.legalName}
          </p>
        </div>
      </div>
      {/* Full production renderer — SEO, a11y, conversion boosts applied */}
      <SiteRenderer project={project} production showBrandChrome />
    </div>
  );
}
