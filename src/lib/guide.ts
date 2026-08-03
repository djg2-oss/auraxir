/**
 * Seamless customer guide — best production line for business or personal.
 * Customer never sees host names; only Auraxir path language.
 */
import type { BusinessType, Goal, NeedsAnswers, ProductIntent } from "./catalog";
import { BRAND } from "./brand";

export type GuidePath = "business" | "personal" | null;

export type GuideStage =
  | "path"
  | "identity"
  | "outcomes"
  | "look"
  | "capacity"
  | "match"
  | "build"
  | "live";

export const GUIDE = {
  name: `${BRAND.name} Concierge Guide`,
  tagline: "We walk you to the best fit — business or personal.",
  promise:
    "Answer a few clear questions. We match the strongest Auraxir production line for your business or personal site, lock the look with G2P, and you build on Auraxir — our name end to end.",
} as const;

export const PATH_OPTIONS: {
  id: Exclude<GuidePath, null>;
  label: string;
  blurb: string;
  examples: string;
  defaultIntent: ProductIntent;
  defaultGoals: Goal[];
  suggestedTypes: BusinessType[];
}[] = [
  {
    id: "business",
    label: "Business site or app",
    blurb: "Company, store, service, agency, SaaS, or studio — built to convert and grow.",
    examples: "Stores · services · SaaS · restaurants · agencies",
    defaultIntent: "website",
    defaultGoals: ["leads", "sales", "brand"],
    suggestedTypes: [
      "saas",
      "ecommerce",
      "local-service",
      "restaurant",
      "agency",
      "retail",
      "nonprofit",
      "blog",
    ],
  },
  {
    id: "personal",
    label: "Personal site or brand",
    blurb: "You, your craft, your portfolio, or personal presence — polished and memorable.",
    examples: "Portfolio · personal brand · creator · resume presence",
    defaultIntent: "website",
    defaultGoals: ["brand", "leads"],
    suggestedTypes: ["personal", "portfolio", "blog", "agency"],
  },
];

const PERSONAL_TYPES = new Set<BusinessType>(["personal", "portfolio"]);

export function pathFromBusinessType(type: BusinessType | null | undefined): GuidePath {
  if (!type) return null;
  if (PERSONAL_TYPES.has(type)) return "personal";
  if (type.startsWith("adult-")) return "business"; // treat adult vertical as business operation
  return "business";
}

export function filterBusinessTypes(path: GuidePath): BusinessType[] | null {
  if (!path) return null;
  const opt = PATH_OPTIONS.find((p) => p.id === path);
  return opt?.suggestedTypes ?? null;
}

export function guideDefaultsForPath(path: Exclude<GuidePath, null>): Partial<NeedsAnswers> {
  const opt = PATH_OPTIONS.find((p) => p.id === path)!;
  return {
    productIntent: opt.defaultIntent,
    goals: opt.defaultGoals,
  };
}

export function stageForWizardStep(stepId: string | undefined): GuideStage {
  if (stepId === "path") return "path";
  if (stepId === "identity") return "identity";
  if (stepId === "outcomes") return "outcomes";
  if (stepId === "look") return "look";
  if (stepId === "capacity") return "capacity";
  return "identity";
}

export function guideCopy(stage: GuideStage, path: GuidePath): {
  title: string;
  body: string;
  tip: string;
} {
  const who =
    path === "business"
      ? "your business"
      : path === "personal"
        ? "your personal brand"
        : "you";

  switch (stage) {
    case "path":
      return {
        title: "Who is this for?",
        body: "Business or personal — we route you to the best production line for that path.",
        tip: "You can refine details next. This only steers the match.",
      };
    case "identity":
      return {
        title: path === "personal" ? "Your name & presence" : "Your business identity",
        body: `Tell us who ${who === "you" ? "you are" : who + " is"} and what kind of site or app you need.`,
        tip: "Pick the closest type — we still score goals and look after this.",
      };
    case "outcomes":
      return {
        title: "What success looks like",
        body:
          path === "personal"
            ? "Portfolio views, inquiries, credibility — choose what matters most."
            : "Leads, sales, bookings, community — we optimize the match for those outcomes.",
        tip: "Select 1–3. More goals can dilute the best-fit score.",
      };
    case "look":
      return {
        title: "The look you want",
        body: "Auraxir G2P AI turns mood and desire into a production design system.",
        tip: "A short desire line (“dark luxury spa”, “clean tech SaaS”) improves the fit.",
      };
    case "capacity":
      return {
        title: "Traffic, budget & comfort",
        body: "We size the line for expected load and your build comfort — elite only, no toys.",
        tip: "Always-On and Shield scale up automatically when you need high trust or uptime.",
      };
    case "match":
      return {
        title: "Your best-fit production line",
        body: `Matched for ${who}. One Auraxir line, look locked, ready to build.`,
        tip: "Accept the plan to open the builder under your brand.",
      };
    case "build":
      return {
        title: "Shape production",
        body: "Sections, G2P look, Imago stages, Shield — then publish.",
        tip: "Stay in the builder until the preview feels right.",
      };
    case "live":
      return {
        title: "Live under Auraxir",
        body: "Your site runs with our brand polish. You operate content.",
        tip: "Come back anytime to refine look or attach Imago stages.",
      };
  }
}

/** Progress rail for the full customer journey */
export const JOURNEY_STEPS: { id: GuideStage; label: string }[] = [
  { id: "path", label: "Path" },
  { id: "identity", label: "You" },
  { id: "outcomes", label: "Goals" },
  { id: "look", label: "Look" },
  { id: "capacity", label: "Scale" },
  { id: "match", label: "Match" },
  { id: "build", label: "Build" },
  { id: "live", label: "Live" },
];

export function journeyIndex(stage: GuideStage): number {
  return Math.max(
    0,
    JOURNEY_STEPS.findIndex((s) => s.id === stage),
  );
}

export function nextActionLabel(stage: GuideStage): string {
  switch (stage) {
    case "path":
      return "Continue to identity";
    case "identity":
      return "Set goals";
    case "outcomes":
      return "Lock the look";
    case "look":
      return "Set capacity";
    case "capacity":
      return "See best fit";
    case "match":
      return "Open builder";
    case "build":
      return "Publish";
    case "live":
      return "Manage project";
  }
}
