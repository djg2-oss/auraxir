import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowRight, Check, Layers3, Shield, Sparkles, Target } from "lucide-react";
import { useMemo } from "react";
import { G2PModelBadge, G2PResultCard } from "@/components/g2p-panel";
import { AlwaysOnPlanBadge } from "@/components/always-on-panel";
import { GuideRail } from "@/components/guide-rail";
import { ShieldPlanCard } from "@/components/shield-panel";
import { HostPriceBlock, QuoteSummary } from "@/components/price-card";
import { AppChrome } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BRAND, QUALITY_CHECKS } from "@/lib/brand";
import { CUSTOMER_EXPERIENCE } from "@/lib/infra";
import { pathFromBusinessType } from "@/lib/guide";
import { pipelineReady, runElitePipeline, type PipelineMode } from "@/lib/pipeline";
import { runAnmosCopy } from "@/lib/anmos";
import { useBuilderStore } from "@/lib/store";

export const Route = createFileRoute("/recommend")({
  validateSearch: (s: Record<string, unknown>): { mode?: PipelineMode } => ({
    mode: s.mode === "express" ? "express" : s.mode === "full" ? "full" : "full",
  }),
  component: RecommendPage,
});

function RecommendPage() {
  const navigate = useNavigate();
  const { mode = "full" } = useSearch({ from: "/recommend" });
  const needs = useBuilderStore((s) => s.needs);
  const createProjectFromNeeds = useBuilderStore((s) => s.createProjectFromNeeds);
  const applyAnmosCopy = useBuilderStore((s) => s.applyAnmosCopy);

  const ready = pipelineReady(needs, mode);
  const plan = useMemo(
    () => (ready ? runElitePipeline(needs, mode) : null),
    [needs, mode, ready],
  );

  async function build() {
    const project = createProjectFromNeeds();
    try {
      const anmos = await runAnmosCopy({
        data: {
          name: needs.businessName,
          type: needs.businessType ?? "",
          description: needs.description,
          desire: needs.lookFeel?.desire ?? "",
          heroSubtitle: plan?.g2p.system.tone.heroSubtitle ?? "",
          ctaDefault: plan?.g2p.system.tone.ctaDefault ?? "",
        },
      });
      if (anmos.ok) applyAnmosCopy(project.id, anmos.copy);
    } catch {
      /* kernel sections already on the project */
    }
    void navigate({ to: "/builder/$projectId", params: { projectId: project.id } });
  }

  if (!ready || !plan) {
    return (
      <AppChrome>
        <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
          <h1 className="text-2xl font-semibold text-[var(--color-fg)]">A little more to go</h1>
          <p className="mt-3 text-[var(--color-fg-muted)]">
            {mode === "express"
              ? "Express needs a name and business type."
              : "Tell us who you are, what you want, and your capacity."}
          </p>
          <Button asChild className="mt-8">
            <Link to="/start" search={{ mode }}>
              Continue match
            </Link>
          </Button>
        </div>
      </AppChrome>
    );
  }

  const { match, g2p, headline, path, economics, seals, primaryAction, alwaysOnTier, alwaysOnServices, shieldTier, shieldScore, shieldGrade } = plan;
  const {
    siteType,
    hostPlan,
    builder,
    reasons,
    alternatives,
    fitConfidence,
    needHits,
    secureNetwork,
  } = match;

  return (
    <AppChrome>
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-8 max-w-2xl">
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="outline">
              <Target className="mr-1 size-3" />
              Your best fit · {mode}
            </Badge>
            <G2PModelBadge />
            <Badge variant="success">
              <Sparkles className="mr-1 size-3" />
              {seals.quality}
            </Badge>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-4xl">
            {needs.businessName || "Your project"}
          </h1>
          <p className="mt-2 text-lg text-[var(--color-fg-muted)]">{headline}</p>
          <p className="mt-3 text-sm text-[var(--color-fg-muted)]">
            ANMOS will lock look locally, then dual-pass copy on the hosted brains. Serana if they miss.
          </p>
          <p className="mt-3 text-sm text-[var(--color-fg-muted)]">
            {CUSTOMER_EXPERIENCE.headline}{" "}
            {CUSTOMER_EXPERIENCE.promise}
          </p>
          <div className="mt-5">
            <GuideRail stage="match" path={pathFromBusinessType(needs.businessType)} />
          </div>

          <ol className="mt-5 grid gap-2 sm:grid-cols-5">
            {path.map((step) => (
              <li
                key={step}
                className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-3 py-2 text-[11px] text-[var(--color-fg-muted)]"
              >
                {step}
              </li>
            ))}
          </ol>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-4 py-2">
              <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--color-fg-subtle)]">
                Needs fit
              </p>
              <p className="text-lg font-semibold text-[var(--color-fg)]">{fitConfidence}%</p>
            </div>
            <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-4 py-2">
              <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--color-fg-subtle)]">
                Look fit
              </p>
              <p className="text-lg font-semibold text-[var(--color-fg)]">{g2p.confidence}%</p>
            </div>
            <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-4 py-2">
              <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--color-fg-subtle)]">
                Your plan
              </p>
              <p className="text-lg font-semibold text-[var(--color-fg)]">
                ${economics.totalMonthly ?? economics.priceMonthly}/mo
              </p>
            </div>
            {secureNetwork && (
              <Badge variant="success">
                <Shield className="mr-1 size-3" />
                Secure options
              </Badge>
            )}
          </div>

          <div className="mt-6">
            <Button size="lg" onClick={build}>
              {primaryAction}
              <ArrowRight />
            </Button>
          </div>
        </div>

        <div className="mb-4 grid gap-4 lg:grid-cols-2">
          <G2PResultCard rec={g2p} />
          <Card className="border-[var(--color-border-strong)] shadow-none">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                Why this fit
              </CardTitle>
              <CardDescription>
                {siteType.name} · {hostPlan.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2">
                {needHits.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-[var(--color-fg)]">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-[var(--color-success)]" />
                    {h}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mb-4">
          <QuoteSummary
            setupFee={economics.setupFee}
            priceMonthly={economics.priceMonthly}
            secureNetwork={secureNetwork}
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="shadow-none">
            <CardHeader>
              <div
                className="mb-3 h-24 rounded-[var(--radius-md)]"
                style={{
                  background: `linear-gradient(135deg, ${g2p.system.theme.primary}, ${g2p.system.theme.accent})`,
                }}
              />
              <div className="flex items-center gap-2">
                <CardTitle>Layout: {siteType.name}</CardTitle>
                <Badge>{siteType.product}</Badge>
              </div>
              <CardDescription>
                {siteType.description} · Look: {g2p.system.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {siteType.sections.map((s) => (
                  <Badge key={s} variant="default">
                    {s}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-none">
            <CardHeader>
              <div className="mb-3 flex size-12 items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-subtle)]">
                <Layers3 className="size-5 text-[var(--color-fg)]" />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle>{hostPlan.name}</CardTitle>
                <Badge variant="accent">{builder.tier}</Badge>
              </div>
              <CardDescription>{hostPlan.tagline}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <HostPriceBlock plan={hostPlan} />
              <Separator />
              <ul className="space-y-2">
                {builder.network.map((n) => (
                  <li key={n.id} className="flex items-start gap-2 text-sm text-[var(--color-fg)]">
                    <Shield className="mt-0.5 size-3.5 shrink-0 text-[var(--color-fg-muted)]" />
                    <span className="font-medium">{n.customerLabel}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-4 shadow-none">
          <CardHeader>
            <CardTitle className="text-base">Our promise to you</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 lg:grid-cols-2">
            <ul className="space-y-3">
              {reasons.map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm text-[var(--color-fg-muted)]">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[var(--color-primary)]" />
                  {r}
                </li>
              ))}
            </ul>
            <ul className="space-y-2">
              {QUALITY_CHECKS.map((c) => (
                <li key={c} className="flex items-center gap-2 text-sm text-[var(--color-fg)]">
                  <Check className="size-3.5 text-[var(--color-success)]" />
                  {c}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {alternatives.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-medium text-[var(--color-fg)]">Also a strong fit</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {alternatives.map((alt) => (
                <Card key={alt.siteType.id} className="shadow-none opacity-90">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">
                      {alt.siteType.name} · {alt.hostPlan.name}
                    </CardTitle>
                    <CardDescription>{alt.note}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const project = createProjectFromNeeds({
                          siteTypeId: alt.siteType.id,
                          hostPlanId: alt.hostPlan.id,
                        });
                        void navigate({
                          to: "/builder/$projectId",
                          params: { projectId: project.id },
                        });
                      }}
                    >
                      Use this line instead
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button asChild variant="ghost">
            <Link to="/start" search={{ mode }}>
              Refine match
            </Link>
          </Button>
          <Button size="lg" onClick={build}>
            {primaryAction}
            <ArrowRight />
          </Button>
        </div>
      </div>
    </AppChrome>
  );
}
