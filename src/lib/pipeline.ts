/**
 * Auraxir success pipeline — needs → best fit → look → build → ship.
 * Customer language only; no ops disclosure.
 */
import { BRAND } from "./brand";
import type { NeedsAnswers, SiteProject } from "./catalog";
import { emptyNeeds } from "./catalog";
import { emptyLookFeel, runG2P, type G2PRecommendation, type LookMood } from "./g2p-ai";
import { matchNeeds, type MatchResult } from "./matcher";
import { scoreProduction, type ProductionScore } from "./production";

export type PipelineMode = "express" | "full";

export interface PipelinePlan {
  mode: PipelineMode;
  match: MatchResult;
  g2p: G2PRecommendation;
  headline: string;
  path: string[];
  primaryAction: string;
  economics: {
    priceMonthly: number;
    setupFee: number;
    costMonthly: number;
    spreadMonthly: number;
    alwaysOnAddOnMonthly: number;
    shieldAddOnMonthly: number;
    totalMonthly: number;
  };
  shieldTier: import("./auraxir-shield").ShieldTier;
  shieldScore: number;
  shieldGrade: string;
  alwaysOnTier: import("./always-on").AlwaysOnTier;
  alwaysOnServices: string[];
  seals: {
    quality: string;
    production: string;
    g2p: string;
  };
}

export interface ExpressInput {
  businessName: string;
  businessType: NeedsAnswers["businessType"];
  productIntent?: NeedsAnswers["productIntent"];
  mood?: LookMood | null;
  desire?: string;
  description?: string;
}

function defaultIntent(
  business: NeedsAnswers["businessType"],
): NeedsAnswers["productIntent"] {
  if (business === "saas") return "both";
  if (business === "ecommerce") return "website";
  return "website";
}

function defaultGoals(
  business: NeedsAnswers["businessType"],
): NeedsAnswers["goals"] {
  switch (business) {
    case "ecommerce":
    case "retail":
      return ["sales", "brand"];
    case "restaurant":
    case "local-service":
      return ["bookings", "leads"];
    case "saas":
      return ["leads", "sales", "brand"];
    case "blog":
      return ["content", "community"];
    case "nonprofit":
      return ["community", "leads", "brand"];
    case "portfolio":
    case "personal":
    case "agency":
      return ["brand", "leads"];
    default:
      return ["leads", "brand"];
  }
}

function defaultMood(business: NeedsAnswers["businessType"]): LookMood {
  switch (business) {
    case "saas":
      return "technical";
    case "ecommerce":
    case "retail":
      return "minimal";
    case "restaurant":
    case "local-service":
      return "warm";
    case "agency":
    case "portfolio":
      return "luxury";
    case "blog":
      return "editorial";
    case "nonprofit":
      return "organic";
    case "personal":
      return "bold";
    default:
      return "minimal";
  }
}

export function hydrateNeeds(
  partial: Partial<NeedsAnswers>,
  mode: PipelineMode = "full",
): NeedsAnswers {
  const base = emptyNeeds();
  const merged: NeedsAnswers = {
    ...base,
    ...partial,
    goals: partial.goals?.length ? partial.goals : base.goals,
    features: partial.features ?? base.features,
    lookFeel: {
      ...emptyLookFeel(),
      ...partial.lookFeel,
    },
  };

  if (!merged.productIntent && merged.businessType) {
    merged.productIntent = defaultIntent(merged.businessType);
  }
  if (!merged.goals.length && merged.businessType) {
    merged.goals = defaultGoals(merged.businessType);
  }
  if (!merged.traffic) merged.traffic = mode === "express" ? "medium" : null;
  if (!merged.budget) merged.budget = mode === "express" ? "growth" : null;
  if (!merged.skill) merged.skill = mode === "express" ? "some" : null;

  if (!merged.lookFeel.mood && merged.businessType) {
    merged.lookFeel.mood = defaultMood(merged.businessType);
  }
  if (mode === "express" && !merged.lookFeel.energy) {
    merged.lookFeel.energy = "balanced";
  }
  if (mode === "express" && !merged.lookFeel.contrast) {
    merged.lookFeel.contrast = "medium";
  }

  return merged;
}

export function needsFromExpress(input: ExpressInput): NeedsAnswers {
  return hydrateNeeds(
    {
      businessName: input.businessName.trim(),
      businessType: input.businessType,
      productIntent: input.productIntent ?? null,
      description: input.description?.trim() ?? "",
      lookFeel: {
        ...emptyLookFeel(),
        mood: input.mood ?? null,
        desire: input.desire?.trim() ?? "",
      },
    },
    "express",
  );
}

export function pipelineReady(needs: NeedsAnswers, mode: PipelineMode): boolean {
  if (!needs.businessName.trim() || !needs.businessType) return false;
  if (mode === "express") return true;
  return Boolean(
    needs.productIntent &&
      needs.goals.length > 0 &&
      needs.traffic &&
      needs.budget,
  );
}

export function runElitePipeline(
  rawNeeds: NeedsAnswers,
  mode: PipelineMode = "full",
): PipelinePlan {
  const needs = hydrateNeeds(rawNeeds, mode);
  const match = matchNeeds(needs);
  const g2p = runG2P({
    prefs: needs.lookFeel ?? emptyLookFeel(),
    businessType: needs.businessType,
    description: `${needs.description} ${needs.lookFeel?.desire ?? ""}`,
  });

  const priceMonthly = match.hostPlan.priceMonthly;
  const costMonthly = match.hostPlan.costMonthly;
  const setupFee = BRAND.setupFee;
  const alwaysOnAddOnMonthly = match.alwaysOnAddOnMonthly;
  const shieldAddOnMonthly = match.shieldAddOnMonthly;
  const totalMonthly = priceMonthly + alwaysOnAddOnMonthly + shieldAddOnMonthly;

  return {
    mode,
    match,
    g2p,
    headline: `${match.siteType.name} · ${match.hostPlan.name} · ${g2p.system.name}`,
    path: [
      "1. Needs captured",
      "2. Best fit matched",
      `3. Look: ${g2p.system.name}`,
      match.alwaysOnTier !== "standard" ? "4. Dual FE + BE Always-On" : "4. Build on Auraxir",
      `5. Auraxir Shield ${match.shieldTier} · grade ${match.shieldGrade}`,
      "6. Launch — safest place to build",
    ],
    primaryAction: "Open builder with this plan",
    economics: {
      priceMonthly,
      setupFee,
      costMonthly,
      spreadMonthly: Math.max(0, priceMonthly - costMonthly),
      alwaysOnAddOnMonthly,
      shieldAddOnMonthly,
      totalMonthly,
    },
    alwaysOnTier: match.alwaysOnTier,
    alwaysOnServices: match.alwaysOnServices,
    shieldTier: match.shieldTier,
    shieldScore: match.shieldScore,
    shieldGrade: match.shieldGrade,
    seals: {
      quality: BRAND.qualityMark,
      production: BRAND.productionSeal,
      g2p: `${g2p.model.name} ${g2p.model.version}`,
    },
  };
}

export function projectReadiness(project: SiteProject): {
  production: ProductionScore;
  next: string;
  stage: "draft" | "ready" | "live";
} {
  const production = scoreProduction(project);
  if (project.published) {
    return {
      production,
      stage: "live",
      next: "Refine look with G2P or boost quality further",
    };
  }
  if (production.percent >= 70) {
    return {
      production,
      stage: "ready",
      next: "Publish when you are ready",
    };
  }
  return {
    production,
    stage: "draft",
    next: "Run G2P + boost quality, then publish",
  };
}

export const SUCCESS_FUNNEL = [
  {
    id: "attract",
    title: "Discover",
    body: "Premium name. Best sites and apps for serious brands.",
  },
  {
    id: "capture",
    title: "Match",
    body: "Express or full interview — we find the best fit.",
  },
  {
    id: "plan",
    title: "Plan",
    body: "Your line, your look, your subscription — clear and simple.",
  },
  {
    id: "build",
    title: "Build",
    body: "Self-serve builder with G2P and quality score.",
  },
  {
    id: "ship",
    title: "Launch",
    body: "Ship polished production under Auraxir.",
  },
] as const;
