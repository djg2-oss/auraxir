import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Shield, Target, Wand2, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { ContentAcceptanceToggle } from "@/components/content-responsibility";
import { GuidePathCards, GuideRail } from "@/components/guide-rail";
import { G2PModelBadge } from "@/components/g2p-panel";
import { AppChrome } from "@/components/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { isAdultBusiness } from "@/lib/content-responsibility";
import { BRAND } from "@/lib/brand";
import {
  BUDGETS,
  BUSINESS_TYPES,
  FEATURE_OPTIONS,
  GOALS,
  PRODUCT_INTENTS,
  SKILLS,
  TRAFFIC_LEVELS,
  type Budget,
  type BusinessType,
  type Goal,
  type ProductIntent,
  type Skill,
  type TrafficLevel,
} from "@/lib/catalog";
import {
  LOOK_CONTRAST,
  LOOK_ENERGY,
  LOOK_MOODS,
  type LookContrast,
  type LookEnergy,
  type LookMood,
} from "@/lib/g2p-ai";
import {
  guideDefaultsForPath,
  pathFromBusinessType,
  type GuidePath,
} from "@/lib/guide";
import { hydrateNeeds, type PipelineMode } from "@/lib/pipeline";
import { useBuilderStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/start")({
  validateSearch: (s: Record<string, unknown>): { mode?: PipelineMode } => ({
    mode: s.mode === "express" ? "express" : s.mode === "full" ? "full" : undefined,
  }),
  component: StartWizardPage,
});

/** Fine-tuned structure: 4 high-value steps (was 7). Higher completion. */
const FULL_STEPS = [
  { id: "path", label: "Path" },
  { id: "identity", label: "You" },
  { id: "outcomes", label: "Goals" },
  { id: "look", label: "Look" },
  { id: "capacity", label: "Scale" },
] as const;

const EXPRESS_STEPS = [
  { id: "path", label: "Path" },
  { id: "identity", label: "You" },
  { id: "look", label: "Look" },
] as const;

function ChoiceCard({
  selected,
  title,
  blurb,
  onClick,
}: {
  selected: boolean;
  title: string;
  blurb: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-[var(--radius-lg)] border p-4 text-left transition-colors",
        selected
          ? "border-[var(--color-primary)] bg-[var(--color-bg-subtle)]"
          : "border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-border-strong)]",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-[var(--color-fg)]">{title}</p>
          <p className="mt-1 text-xs leading-relaxed text-[var(--color-fg-muted)]">{blurb}</p>
        </div>
        <span
          className={cn(
            "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border",
            selected
              ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-primary-fg)]"
              : "border-[var(--color-border-strong)] text-transparent",
          )}
        >
          <Check className="size-3" />
        </span>
      </div>
    </button>
  );
}

function StartWizardPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/start" });
  const needs = useBuilderStore((s) => s.needs);
  const setNeeds = useBuilderStore((s) => s.setNeeds);
  const setLookFeel = useBuilderStore((s) => s.setLookFeel);
  const [mode, setMode] = useState<PipelineMode>(search.mode ?? "full");
  const [step, setStep] = useState(0);
  const [guidePath, setGuidePath] = useState<GuidePath>(() =>
    pathFromBusinessType(needs.businessType),
  );

  const steps = mode === "express" ? EXPRESS_STEPS : FULL_STEPS;
  const progress = ((step + 1) / steps.length) * 100;
  const lookFeel = needs.lookFeel;
  const stepId = steps[step]?.id;

  const visibleBusinessTypes = useMemo(() => {
    if (!guidePath) return BUSINESS_TYPES;
    const personal = new Set(["personal", "portfolio"]);
    if (guidePath === "personal") {
      return BUSINESS_TYPES.filter((b) => personal.has(b.id) || b.id === "blog" || b.id === "agency");
    }
    return BUSINESS_TYPES.filter((b) => !personal.has(b.id) || b.id === "agency");
  }, [guidePath]);

  function onSelectPath(path: Exclude<GuidePath, null>) {
    setGuidePath(path);
    const defaults = guideDefaultsForPath(path);
    setNeeds({
      productIntent: needs.productIntent ?? defaults.productIntent ?? null,
      goals: needs.goals.length ? needs.goals : (defaults.goals as typeof needs.goals) ?? [],
    });
  }

  const canNext = useMemo(() => {
    if (stepId === "path") return Boolean(guidePath);
    if (stepId === "identity") {
      return Boolean(
        needs.businessName.trim() &&
          needs.businessType &&
          (mode === "express" || needs.productIntent),
      );
    }
    if (stepId === "outcomes") return needs.goals.length > 0;
    if (stepId === "look") return Boolean(lookFeel?.mood || lookFeel?.desire?.trim());
    if (stepId === "capacity") {
        if (!needs.contentResponsibilityAccepted) return false;
        return Boolean(needs.traffic && needs.budget && needs.skill);
      }
    return false;
  }, [stepId, needs, lookFeel, mode, guidePath]);

  function toggleGoal(id: Goal) {
    const has = needs.goals.includes(id);
    setNeeds({
      goals: has ? needs.goals.filter((g) => g !== id) : [...needs.goals, id],
    });
  }

  function toggleFeature(id: string) {
    const has = needs.features.includes(id);
    const next = has ? needs.features.filter((f) => f !== id) : [...needs.features, id];
    setNeeds({
      features: next,
      needsSecureNetwork: next.includes("secure-network") || needs.needsSecureNetwork,
      needsAlwaysOn:
        next.includes("always-on") ||
        next.includes("dual-frontend") ||
        next.includes("dual-backend") ||
        needs.needsAlwaysOn,
    });
  }

  function switchMode(next: PipelineMode) {
    setMode(next);
    setStep(0);
    void navigate({ to: "/start", search: { mode: next }, replace: true });
  }

  function onContinue() {
    if (step < steps.length - 1) {
      setStep((s) => s + 1);
      return;
    }
    // Hydrate express defaults into store before recommend/pipeline
    if (mode === "express") {
      const hydrated = hydrateNeeds(needs, "express");
      setNeeds(hydrated);
    }
    void navigate({ to: "/recommend", search: { mode } });
  }

  return (
    <AppChrome>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge variant="outline">
              <Target className="mr-1 size-3" />
              {BRAND.name} · success pipeline
            </Badge>
            <G2PModelBadge />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-fg)]">
            We guide you to the best fit
          </h1>
          <p className="mt-2 text-[var(--color-fg-muted)]">
            Business or personal — seamless steps to the strongest production line for your site or app.
            {mode === "express" ? " Express path uses smart defaults." : " Full path fine-tunes goals and scale."}
          </p>
          <div className="mt-4">
            <GuideRail
              stage={
                stepId === "path"
                  ? "path"
                  : stepId === "identity"
                    ? "identity"
                    : stepId === "outcomes"
                      ? "outcomes"
                      : stepId === "look"
                        ? "look"
                        : "capacity"
              }
              path={guidePath}
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              variant={mode === "express" ? "default" : "secondary"}
              onClick={() => switchMode("express")}
            >
              <Zap className="size-3.5" />
              Express
            </Button>
            <Button
              type="button"
              size="sm"
              variant={mode === "full" ? "default" : "secondary"}
              onClick={() => switchMode("full")}
            >
              Full match
            </Button>
            <Button asChild size="sm" variant="ghost">
              <Link to="/">Back home</Link>
            </Button>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-xs text-[var(--color-fg-subtle)]">
              <span>
                Step {step + 1} of {steps.length} — {steps[step]?.label}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} />
          </div>
        </div>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>
              {stepId === "path" && "Business or personal?"}
              {stepId === "identity" && (guidePath === "personal" ? "Your name & presence" : "Business identity")}
              {stepId === "outcomes" && "Goals that define success"}
              {stepId === "look" && "Look you desire"}
              {stepId === "capacity" && "Scale & capacity"}
            </CardTitle>
            <CardDescription>
              {stepId === "path" &&
                "We route you to the best production line for a business site or a personal brand."}
              {stepId === "identity" &&
                "Name, type, and website vs app — we use this to match the strongest Auraxir line."}
              {stepId === "outcomes" && "Pick what matters. We score layouts and lines for those outcomes."}
              {stepId === "look" && "Auraxir G2P AI maps mood and desire into production design."}
              {stepId === "capacity" && "Traffic, budget, skill — then legal acceptance and best-fit plan."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {stepId === "path" && (
              <>
                <GuidePathCards value={guidePath} onChange={onSelectPath} />
                <p className="text-xs text-[var(--color-fg-subtle)]">
                  Next we ask only what is needed for that path — then match, look, and build under {BRAND.name}.
                </p>
              </>
            )}

            {stepId === "identity" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="businessName">
                    {guidePath === "personal" ? "Your name / brand" : "Business / brand name"}
                  </Label>
                  <Input
                    id="businessName"
                    placeholder="e.g. Harbor & Co."
                    value={needs.businessName}
                    onChange={(e) => setNeeds({ businessName: e.target.value })}
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {visibleBusinessTypes.map((b) => (
                    <ChoiceCard
                      key={b.id}
                      title={b.label}
                      blurb={b.blurb}
                      selected={needs.businessType === b.id}
                      onClick={() => {
                        setNeeds({ businessType: b.id as BusinessType });
                        setGuidePath(pathFromBusinessType(b.id as BusinessType));
                      }}
                    />
                  ))}
                </div>
                {mode === "full" && (
                  <div>
                    <p className="mb-3 text-sm font-medium text-[var(--color-fg)]">
                      Website or app?
                    </p>
                    <div className="grid gap-3">
                      {PRODUCT_INTENTS.map((p) => (
                        <ChoiceCard
                          key={p.id}
                          title={p.label}
                          blurb={p.blurb}
                          selected={needs.productIntent === p.id}
                          onClick={() => setNeeds({ productIntent: p.id as ProductIntent })}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {stepId === "outcomes" && (
              <div className="space-y-6">
                <div>
                  <p className="mb-3 text-sm font-medium text-[var(--color-fg)]">Goals</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {GOALS.map((g) => (
                      <ChoiceCard
                        key={g.id}
                        title={g.label}
                        blurb={g.blurb}
                        selected={needs.goals.includes(g.id)}
                        onClick={() => toggleGoal(g.id)}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-3 text-sm font-medium text-[var(--color-fg)]">
                    Capabilities (optional)
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {FEATURE_OPTIONS.map((f) => (
                      <ChoiceCard
                        key={f.id}
                        title={f.label}
                        blurb={
                          f.id === "secure-network" ? "VPN + tunnel as needed" : "Weights match"
                        }
                        selected={needs.features.includes(f.id)}
                        onClick={() => toggleFeature(f.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {stepId === "look" && (
              <div className="space-y-6">
                <div className="flex items-start gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-4">
                  <Wand2 className="mt-0.5 size-4 shrink-0 text-[var(--color-fg-muted)]" />
                  <div>
                    <p className="text-sm font-medium text-[var(--color-fg)]">
                      Auraxir G2P AI · Goal-to-Production
                    </p>
                    <p className="mt-1 text-xs text-[var(--color-fg-muted)]">
                      Trained style corpus applies the look they want on Elite Quality Service
                      production.
                    </p>
                  </div>
                </div>
                <div>
                  <p className="mb-3 text-sm font-medium text-[var(--color-fg)]">Mood</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {LOOK_MOODS.map((m) => (
                      <ChoiceCard
                        key={m.id}
                        title={m.label}
                        blurb={m.blurb}
                        selected={lookFeel?.mood === m.id}
                        onClick={() => setLookFeel({ mood: m.id as LookMood })}
                      />
                    ))}
                  </div>
                </div>
                {mode === "full" && (
                  <>
                    <div>
                      <p className="mb-3 text-sm font-medium text-[var(--color-fg)]">Energy</p>
                      <div className="grid gap-3 sm:grid-cols-3">
                        {LOOK_ENERGY.map((e) => (
                          <ChoiceCard
                            key={e.id}
                            title={e.label}
                            blurb={e.blurb}
                            selected={lookFeel?.energy === e.id}
                            onClick={() => setLookFeel({ energy: e.id as LookEnergy })}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="mb-3 text-sm font-medium text-[var(--color-fg)]">Contrast</p>
                      <div className="grid gap-3 sm:grid-cols-3">
                        {LOOK_CONTRAST.map((c) => (
                          <ChoiceCard
                            key={c.id}
                            title={c.label}
                            blurb={c.blurb}
                            selected={lookFeel?.contrast === c.id}
                            onClick={() => setLookFeel({ contrast: c.id as LookContrast })}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}
                <div className="space-y-2">
                  <Label htmlFor="desire">Describe the look they want</Label>
                  <Textarea
                    id="desire"
                    placeholder="e.g. dark editorial luxury, warm neighborhood cafe…"
                    value={lookFeel?.desire ?? ""}
                    onChange={(e) => setLookFeel({ desire: e.target.value })}
                  />
                </div>
                {mode === "full" && (
                  <div className="space-y-2">
                    <Label htmlFor="avoid">What to avoid (optional)</Label>
                    <Input
                      id="avoid"
                      placeholder="e.g. neon, playful"
                      value={lookFeel?.avoid ?? ""}
                      onChange={(e) => setLookFeel({ avoid: e.target.value })}
                    />
                  </div>
                )}
              </div>
            )}

            {stepId === "capacity" && (
              <div className="space-y-6">
                <div>
                  <p className="mb-3 text-sm font-medium text-[var(--color-fg)]">Traffic</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {TRAFFIC_LEVELS.map((t) => (
                      <ChoiceCard
                        key={t.id}
                        title={t.label}
                        blurb={t.blurb}
                        selected={needs.traffic === t.id}
                        onClick={() => setNeeds({ traffic: t.id as TrafficLevel })}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-3 text-sm font-medium text-[var(--color-fg)]">Subscription band</p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {BUDGETS.map((b) => (
                      <ChoiceCard
                        key={b.id}
                        title={b.label}
                        blurb={b.blurb}
                        selected={needs.budget === b.id}
                        onClick={() => setNeeds({ budget: b.id as Budget })}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-3 text-sm font-medium text-[var(--color-fg)]">Skill</p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {SKILLS.map((s) => (
                      <ChoiceCard
                        key={s.id}
                        title={s.label}
                        blurb={s.blurb}
                        selected={needs.skill === s.id}
                        onClick={() => setNeeds({ skill: s.id as Skill })}
                      />
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setNeeds({ needsSecureNetwork: !needs.needsSecureNetwork })}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-[var(--radius-lg)] border p-4 text-left",
                    needs.needsSecureNetwork
                      ? "border-[var(--color-primary)] bg-[var(--color-bg-subtle)]"
                      : "border-[var(--color-border)]",
                  )}
                >
                  <Shield className="mt-0.5 size-4 shrink-0 text-[var(--color-fg-muted)]" />
                  <div>
                    <p className="text-sm font-medium text-[var(--color-fg)]">
                      Require VPN / secure tunneling
                    </p>
                    <p className="mt-1 text-xs text-[var(--color-fg-muted)]">
                      Auraxir-branded secure production path.
                    </p>
                  </div>
                  <span
                    className={cn(
                      "ml-auto mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border",
                      needs.needsSecureNetwork
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-primary-fg)]"
                        : "border-[var(--color-border-strong)] text-transparent",
                    )}
                  >
                    <Check className="size-3" />
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setNeeds({ needsAlwaysOn: !needs.needsAlwaysOn })}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-[var(--radius-lg)] border p-4 text-left",
                    needs.needsAlwaysOn
                      ? "border-[var(--color-primary)] bg-[var(--color-bg-subtle)]"
                      : "border-[var(--color-border)]",
                  )}
                >
                  <Zap className="mt-0.5 size-4 shrink-0 text-[var(--color-fg-muted)]" />
                  <div>
                    <p className="text-sm font-medium text-[var(--color-fg)]">
                      Always online — dual frontend + dual backend
                    </p>
                    <p className="mt-1 text-xs text-[var(--color-fg-muted)]">
                      Stay online at all times when continuous uptime is required.
                    </p>
                  </div>
                  <span
                    className={cn(
                      "ml-auto mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border",
                      needs.needsAlwaysOn
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-primary-fg)]"
                        : "border-[var(--color-border-strong)] text-transparent",
                    )}
                  >
                    <Check className="size-3" />
                  </span>
                </button>
                <ContentAcceptanceToggle
                  accepted={needs.contentResponsibilityAccepted}
                  adult={isAdultBusiness(needs.businessType) || needs.features.includes("adult-18")}
                  onChange={(v) => setNeeds({ contentResponsibilityAccepted: v })}
                />
                <div className="space-y-2">
                  <Label htmlFor="description">Short description</Label>
                  <Textarea
                    id="description"
                    placeholder="What does this business do, and for whom?"
                    value={needs.description}
                    onChange={(e) => setNeeds({ description: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col-reverse gap-3 border-t border-[var(--color-border)] pt-5 sm:flex-row sm:justify-between">
              <Button
                type="button"
                variant="ghost"
                disabled={step === 0}
                onClick={() => setStep((s) => Math.max(0, s - 1))}
              >
                <ArrowLeft />
                Back
              </Button>
              <Button type="button" disabled={!canNext} onClick={onContinue}>
                {step === steps.length - 1 ? "Show success plan" : "Continue"}
                <ArrowRight />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppChrome>
  );
}
