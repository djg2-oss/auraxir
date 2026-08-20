/**
 * AURAXIR — premium name, best sites & apps, promise delivered.
 * We cost more because we are for the elite — quality justifies price.
 * Dual FE/BE always-on when continuous uptime is required.
 * Never explain hosts or how we produce. That is our craft.
 */
import { ELITE } from "./elite";

export const BRAND = {
  name: "Auraxir",
  legalName: "Auraxir Elite Quality Service",
  shortName: "Auraxir",
  superiority: "The superior standard in elite websites & apps",
  productionSeal: "Auraxir Elite Quality Service",
  qualityMark: "Elite Quality Service",
  tagline: "ANMOS. Dual grok-4.6 on Agent Black. Image is everything.",
  promise:
    "You build on Auraxir. ANMOS runs dual grok-4.6 — create and refine — as Agent Black on this builder. Look is G2P. GPU is RunPod + Modal. If both brains miss, Serana writes on this computer. Dual FE/BE when you must stay online.",
  /** Primary public domain */
  domain: "auraxir.com",
  supportEmail: "concierge@auraxir.com",
  domainStrategy: {
    primary: "auraxir.com",
    reason: "You own auraxir.com — primary brand home. Point all other TLDs here.",
    alsoSecure: [
      "auraxir.app",
      "getauraxir.com",
      "auraxirhq.com",
      "helloauraxir.com",
      "auraxir.studio",
      "auraxir.io",
      "useauraxir.com",
      "www.auraxir.com",
    ],
    redirects: "Point auraxir.app and all secondary domains to https://auraxir.com",
    email: "concierge@auraxir.com",
  },
  qualityStandard: ELITE.bar,
  defaultMarkupPercent: 175 as number,
  setupFee: 497,
  setupFeeLabel: "Elite activation",
  conciergeLabel: "Auraxir Elite Quality Service",
  pricingStory:
    "Auraxir costs more because elite production is not a free-tier hobby. You pay for best-fit matching, G2P, Imago, dual FE/BE when needed, and Auraxir Shield — the elite encryption layer that makes this the safest place to build.",
  modelLines: [
    "Grow with your wishes — elite promise, homework first.",
    "You build on Auraxir — one premium name end to end.",
    "Premium production lines. Our brand. Your project.",
    "Seamless guide: business or personal → best-fit production line.",
    "We cost more because we serve the elite.",
    "ANMOS — dual grok-4.6 Agent Black on the builder.",
    "Look locked locally. Dual grok copy. Serana if GPU/API is dark.",
    "Dual FE + dual BE so you stay online at all times.",
    "Imago — image stages that elevate how the brand is seen.",
    "Brand overlay only — you operate the site; you own your content.",
    "Auraxir Shield — elite encryption stacked above every production baseline.",
  ],
  operatorDisclosure: "Internal books only.",
  seoTitle: "Auraxir — Elite Websites & Apps · ANMOS",
  seoDescription:
    "Auraxir website and app builder. Dual grok-4.6 on Agent Black — create and refine. Serana only if hosted brains fail.",
} as const;

export const MARKETING_PHRASES = [
  "ANMOS — dual grok-4.6 Agent Black under Auraxir.",
  "Image is everything.",
  "Auraxir Imago — protect the image. Elevate the presence.",
  "We cost more because we are for the elite.",
  "Stay online at all times — dual frontend, dual backend.",
  "The gold standard of elite web production.",
  "Above ordinary builders. Built for brands that refuse average.",
  "Higher investment. Higher standard.",
  "Where elite taste meets production power.",
  "Your vision. Our name. Zero compromise.",
  "Match the best site. Lock the look. Ship premium.",
  "Engineered for conversion. Styled for desire.",
  "Elite Quality Service — not a free-tier afterthought.",
  "From first brief to live production in one golden path.",
  "Secure when it matters. Always online when it counts.",
  "The premium name in elite sites & apps.",
  "Design that hears what you want — and delivers it.",
  "Born for brands that compete at the top.",
  "Less clutter. More crown.",
  "Best fit for your needs. Best look for your brand.",
  "Premium production. One name. Auraxir.",
  "If price is the only filter, we are not your builder.",
  "Sites and apps worthy of your name — under ours.",
] as const;

export const QUALITY_PILLARS = [
  {
    title: "Elite by design — priced accordingly",
    body: "We cost more because every line is production-grade for serious brands, not hobby kits.",
  },
  {
    title: "Always online when it matters",
    body: "Dual frontend and dual backend services when continuous uptime is required — so you stay online at all times.",
  },
  {
    title: "Best fit for your needs",
    body: "We recommend the right Auraxir production line for your business, goals, and scale — no guesswork.",
  },
  {
    title: "Auraxir G2P AI",
    body: "Desire in. Production look out. Mood, energy, and free-text desire → trained elite style system.",
  },
] as const;

export const QUALITY_CHECKS = [
  "Auraxir Elite Quality Service on production",
  "Best-fit line for your stated needs",
  "Look & feel aligned to your taste",
  "Secure options when the project requires privacy",
  "Dual FE/BE always-on when continuous uptime is required",
  "Mobile and conversion path verified",
  "Production quality boosted before go-live",
  "Imago stages when the brand image can be stronger",
] as const;

export const MODEL_STEPS = [
  {
    title: "Tell us what you need",
    body: "Business, goals, look, and whether you must stay online always.",
  },
  {
    title: "Get the best fit",
    body: "We match you to the right Auraxir production line.",
  },
  {
    title: "Build on Auraxir",
    body: "Edit content and design under one premium name.",
  },
  {
    title: "Launch polished",
    body: "Ship with Elite Quality Service — dual paths when needed.",
  },
] as const;

export const ROLLOUT = {
  phase: 1,
  title: "Auraxir production lines",
  includes: [
    "18 absolute-premium lines across many production hosts",
    "Web, commerce, apps, mobile, ops — best builds only",
    "Every line: pro design GUI + real API — no toys",
    "Dual frontend + dual backend Always-On services when required",
    "You only see Auraxir — we pick the best host for the job",
    "Auraxir Imago — image is everything; stages attached when we see fit",
    "Adult-capable lines available (18+) — Auraxir brand on top; customer owns content",
  ],
  excludes: "Hobby kits, free-tier toys, and anything below the elite bar.",
} as const;

export const ALWAYS_ON_COPY = {
  title: "Always online",
  headline: "Dual frontend + dual backend when you must stay up",
  body: "If continuous uptime is required, Auraxir offers dual frontend and dual backend services so production stays online at all times.",
} as const;

export function retailFromCost(costMonthly: number, markupPercent: number = BRAND.defaultMarkupPercent) {
  const retail = Math.round(costMonthly * (1 + markupPercent / 100));
  if (retail < 80) return Math.ceil(retail / 5) * 5 - 1;
  if (retail < 250) return Math.ceil(retail / 10) * 10 - 1;
  return Math.ceil(retail / 50) * 50 - 1;
}

export function marginMonthly(costMonthly: number, retailMonthly: number) {
  return Math.max(0, retailMonthly - costMonthly);
}

export function formatMoney(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}
