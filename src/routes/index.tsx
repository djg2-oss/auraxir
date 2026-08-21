import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  ShieldCheck,
  Sparkles,
  Target,
  Wand2,
  Zap,
} from "lucide-react";
import { AlwaysOnSection } from "@/components/always-on-panel";
import { BrandSeal } from "@/components/brand-mark";
import {
  AdultVerticalCard,
  ContentResponsibilityBanner,
} from "@/components/content-responsibility";
import { ExecutionPlanPanel } from "@/components/execution-plan";
import { G2PMarketingSection } from "@/components/g2p-marketing";
import { EngineCredit } from "@/components/engine-credit";
import { G2PModelBadge } from "@/components/g2p-panel";
import { ImagoMarketingSection } from "@/components/imago-marketing";
import { MarketingPhraseWall, SeoFaqSection } from "@/components/marketing-seo";
import { ElitePricingBanner, ModelStrip } from "@/components/price-card";
import { ShieldMarketingSection } from "@/components/shield-panel";
import { AppChrome } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BRAND,
  MARKETING_PHRASES,
  MODEL_STEPS,
  QUALITY_PILLARS,
  formatMoney,
} from "@/lib/brand";
import { API_GUI_ADMISSION } from "@/lib/builders";
import { GUIDE, PATH_OPTIONS } from "@/lib/guide";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <AppChrome>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--color-border)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 12% -10%, color-mix(in oklab, var(--color-gold) 22%, transparent), transparent 58%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-28">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">
              <Target className="mr-1 size-3" />
              {BRAND.qualityMark}
            </Badge>
            <G2PModelBadge />
          </div>

          <h1 className="mt-8 max-w-3xl font-[family-name:var(--font-display)] text-5xl font-semibold leading-[1.05] tracking-tight text-[var(--color-fg)] sm:text-6xl lg:text-7xl">
            {BRAND.name}
          </h1>
          <p className="mt-5 max-w-2xl text-xl font-medium leading-snug text-[var(--color-gold)] sm:text-2xl">
            {BRAND.tagline}
          </p>
          <p className="mt-5 max-w-xl text-base text-[var(--color-fg-muted)]">
            {BRAND.superiority} We cost more because the people who choose us do not shop the middle.
          </p>
          <EngineCredit className="mt-4" />

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/start" search={{ mode: "full" }}>
                Choose Auraxir
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/start" search={{ mode: "express" }}>
                <Zap className="size-4" />
                Express match
              </Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[var(--color-fg-subtle)]">
            {BRAND.modelLines.slice(0, 4).map((line) => (
              <span key={line} className="inline-flex items-center gap-1.5">
                <Check className="size-3.5 text-[var(--color-fg-muted)]" />
                {line}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Concierge guide — business or personal */}
      <section className="overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-fg-subtle)]">
            {GUIDE.name}
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-3xl">
            {GUIDE.tagline}
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-[var(--color-fg-muted)] sm:text-base">
            {GUIDE.promise}
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {PATH_OPTIONS.map((p) => (
              <Link
                key={p.id}
                to="/start"
                search={{ mode: "full" }}
                className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] p-5 no-underline transition-colors hover:border-[var(--color-border-strong)]"
              >
                <p className="text-base font-semibold text-[var(--color-fg)]">{p.label}</p>
                <p className="mt-2 text-sm text-[var(--color-fg-muted)]">{p.blurb}</p>
                <p className="mt-2 text-[11px] text-[var(--color-fg-subtle)]">{p.examples}</p>
                <p className="mt-3 text-xs font-medium text-[var(--color-fg)]">
                  Start this path →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-fg-subtle)]">
            Seamless path
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-[var(--color-fg)] sm:text-3xl">
            Path → match → look → build → live
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MODEL_STEPS.map((step, i) => (
              <Card key={step.title} className="shadow-none">
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="w-fit text-[10px]">
                    Step {i + 1}
                  </Badge>
                  <CardTitle className="text-base">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[var(--color-fg-muted)]">{step.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* G2P */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <G2PMarketingSection />
        </div>
      </section>

      {/* Imago */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <ImagoMarketingSection />
        </div>
      </section>

      {/* Phrases */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <MarketingPhraseWall />
        </div>
      </section>

      {/* Pillars */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-2xl font-semibold text-[var(--color-fg)]">Why elite brands choose us</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {QUALITY_PILLARS.map((p) => (
              <div
                key={p.title}
                className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] p-5"
              >
                <p className="font-semibold text-[var(--color-fg)]">{p.title}</p>
                <p className="mt-2 text-sm text-[var(--color-fg-muted)]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shield */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <ShieldMarketingSection />
        </div>
      </section>

      {/* Always-On */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <AlwaysOnSection />
        </div>
      </section>

      {/* Adult + responsibility */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
        <div className="mx-auto max-w-6xl space-y-8 px-4 py-16 sm:px-6 sm:py-20">
          <AdultVerticalCard />
          <ContentResponsibilityBanner />
        </div>
      </section>

      {/* Pricing */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
        <div className="mx-auto max-w-6xl space-y-8 px-4 py-16 sm:px-6 sm:py-20">
          <ElitePricingBanner />
          <ModelStrip />
          <p className="text-center text-xs text-[var(--color-fg-subtle)]">
            {API_GUI_ADMISSION} Activation from {formatMoney(BRAND.setupFee)}.
          </p>
        </div>
      </section>

      {/* Execution plan */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <ExecutionPlanPanel />
        </div>
      </section>

      {/* FAQ SEO */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <SeoFaqSection />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[var(--color-bg-elevated)]">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <BrandSeal />
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-[var(--color-fg)]">
            Ready for the best fit?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-[var(--color-fg-muted)]">
            {MARKETING_PHRASES[0]} Business or personal — we guide you through match, look, and
            production under {BRAND.name}.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/start" search={{ mode: "full" }}>
                <Wand2 className="size-4" />
                Start guided match
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/start" search={{ mode: "express" }}>
                <Sparkles className="size-4" />
                Express path
              </Link>
            </Button>
          </div>
          <p className="mt-6 inline-flex items-center gap-2 text-xs text-[var(--color-fg-subtle)]">
            <ShieldCheck className="size-3.5" />
            {BRAND.productionSeal} · {BRAND.domain}
          </p>
        </div>
      </section>
    </AppChrome>
  );
}
