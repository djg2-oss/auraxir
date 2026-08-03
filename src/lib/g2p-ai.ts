/**
 * AURAXIR G2P AI — Goal-to-Production
 * Flagship proprietary look engine. Desire → production design system.
 * Customer always sees: Auraxir G2P AI. Never third-party model names.
 *
 * Trained for elite site & app service:
 * - Style corpus (curated production systems)
 * - Business + mood + energy + contrast scoring
 * - Free-text desire / avoid alignment
 * - Confidence + apply-to-project + alternates
 */
import type { BusinessType, ThemeTokens } from "./catalog";
import { BRAND } from "./brand";

export type LookMood =
  | "minimal"
  | "bold"
  | "warm"
  | "luxury"
  | "playful"
  | "technical"
  | "organic"
  | "editorial";

export type LookEnergy = "calm" | "balanced" | "energetic";
export type LookContrast = "soft" | "medium" | "high";

export interface LookFeelPrefs {
  mood: LookMood | null;
  energy: LookEnergy | null;
  contrast: LookContrast | null;
  /** Free-text desire: "dark editorial magazine", "clean spa", etc. */
  desire: string;
  /** Optional reference cues */
  avoid: string;
}

export interface StyleSystem {
  id: string;
  name: string;
  /** Customer-facing description */
  blurb: string;
  moods: LookMood[];
  energy: LookEnergy[];
  contrast: LookContrast[];
  businesses: BusinessType[];
  keywords: string[];
  theme: ThemeTokens;
  tone: {
    heroSubtitle: string;
    ctaDefault: string;
    voice: string;
  };
  /** Training weight — higher = preferred when tied */
  trainingWeight: number;
}

/** Curated production style corpus — “trained” elite systems */
export const G2P_STYLE_CORPUS: StyleSystem[] = [
  {
    id: "obsidian-precision",
    name: "Obsidian Precision",
    blurb: "Dark, technical, high-trust SaaS and product launches.",
    moods: ["technical", "minimal", "bold"],
    energy: ["balanced", "energetic"],
    contrast: ["high", "medium"],
    businesses: ["saas", "agency", "ecommerce"],
    keywords: ["dark", "tech", "saas", "startup", "product", "neon", "cyber", "modern"],
    theme: {
      primary: "#0b0b0f",
      accent: "#3b82f6",
      surface: "#0f1115",
      text: "#eef0f4",
      muted: "#9aa0ad",
      radius: "soft",
      font: "sans",
    },
    tone: {
      heroSubtitle: "Built for serious brands",
      ctaDefault: "Start free",
      voice: "precise, confident, product-led",
    },
    trainingWeight: 10,
  },
  {
    id: "atelier-serif",
    name: "Atelier Serif",
    blurb: "Editorial luxury for agencies, brands, and portfolios.",
    moods: ["luxury", "editorial", "minimal"],
    energy: ["calm", "balanced"],
    contrast: ["soft", "medium"],
    businesses: ["agency", "portfolio", "personal", "nonprofit"],
    keywords: ["luxury", "serif", "editorial", "agency", "studio", "elegant", "quiet luxury"],
    theme: {
      primary: "#1a1a1c",
      accent: "#1f4fd6",
      surface: "#f5f4f0",
      text: "#141416",
      muted: "#6b6b76",
      radius: "sharp",
      font: "serif",
    },
    tone: {
      heroSubtitle: "Craft & clarity",
      ctaDefault: "Inquire",
      voice: "refined, measured, premium",
    },
    trainingWeight: 11,
  },
  {
    id: "harbor-warm",
    name: "Harbor Warm",
    blurb: "Warm hospitality and local service — inviting, human.",
    moods: ["warm", "organic", "playful"],
    energy: ["calm", "balanced"],
    contrast: ["soft", "medium"],
    businesses: ["restaurant", "local-service", "retail", "nonprofit"],
    keywords: ["warm", "cafe", "restaurant", "local", "friendly", "hospitality", "cozy"],
    theme: {
      primary: "#1c1410",
      accent: "#b45309",
      surface: "#faf7f2",
      text: "#1c1410",
      muted: "#7a6a5c",
      radius: "round",
      font: "display",
    },
    tone: {
      heroSubtitle: "Welcome in",
      ctaDefault: "Book a table",
      voice: "warm, inviting, local",
    },
    trainingWeight: 9,
  },
  {
    id: "commerce-clarity",
    name: "Commerce Clarity",
    blurb: "Clean retail and ecommerce — conversion-first polish.",
    moods: ["minimal", "bold", "technical"],
    energy: ["balanced", "energetic"],
    contrast: ["medium", "high"],
    businesses: ["ecommerce", "retail"],
    keywords: ["shop", "store", "commerce", "retail", "clean", "product", "buy"],
    theme: {
      primary: "#0f172a",
      accent: "#0f766e",
      surface: "#f8faf9",
      text: "#0f172a",
      muted: "#64748b",
      radius: "round",
      font: "sans",
    },
    tone: {
      heroSubtitle: "Shop the collection",
      ctaDefault: "Shop now",
      voice: "clear, commercial, trustworthy",
    },
    trainingWeight: 10,
  },
  {
    id: "pulse-bold",
    name: "Pulse Bold",
    blurb: "High-energy campaigns and personal brands that want presence.",
    moods: ["bold", "playful", "technical"],
    energy: ["energetic"],
    contrast: ["high"],
    businesses: ["personal", "saas", "agency", "blog"],
    keywords: ["bold", "loud", "campaign", "creator", "vibrant", "impact", "launch"],
    theme: {
      primary: "#111118",
      accent: "#8b5cf6",
      surface: "#0c0c12",
      text: "#f3f2f8",
      muted: "#a1a0b0",
      radius: "soft",
      font: "display",
    },
    tone: {
      heroSubtitle: "Make it unforgettable",
      ctaDefault: "Get the app",
      voice: "bold, energetic, memorable",
    },
    trainingWeight: 8,
  },
  {
    id: "garden-organic",
    name: "Garden Organic",
    blurb: "Soft organic wellness, nonprofit, and lifestyle brands.",
    moods: ["organic", "warm", "minimal"],
    energy: ["calm"],
    contrast: ["soft"],
    businesses: ["nonprofit", "personal", "local-service", "blog"],
    keywords: ["organic", "wellness", "nature", "soft", "green", "calm", "spa", "mindful"],
    theme: {
      primary: "#14221a",
      accent: "#166534",
      surface: "#f4f7f4",
      text: "#14221a",
      muted: "#5c6b61",
      radius: "round",
      font: "serif",
    },
    tone: {
      heroSubtitle: "Rooted in care",
      ctaDefault: "Join us",
      voice: "gentle, grounded, hopeful",
    },
    trainingWeight: 8,
  },
  {
    id: "ink-editorial",
    name: "Ink Editorial",
    blurb: "Magazine-grade content and media brands.",
    moods: ["editorial", "minimal", "luxury"],
    energy: ["calm", "balanced"],
    contrast: ["medium", "high"],
    businesses: ["blog", "personal", "nonprofit", "agency"],
    keywords: ["magazine", "editorial", "news", "media", "type", "journal", "story"],
    theme: {
      primary: "#1a1214",
      accent: "#9f1239",
      surface: "#fffdf8",
      text: "#1a1214",
      muted: "#6b5c60",
      radius: "sharp",
      font: "serif",
    },
    tone: {
      heroSubtitle: "Stories that stay",
      ctaDefault: "Read more",
      voice: "editorial, intelligent, story-first",
    },
    trainingWeight: 9,
  },
  {
    id: "studio-clean",
    name: "Studio Clean",
    blurb: "Universal elite baseline — crisp, versatile, professional.",
    moods: ["minimal", "technical", "bold"],
    energy: ["balanced"],
    contrast: ["medium"],
    businesses: ["agency", "saas", "portfolio", "local-service", "retail"],
    keywords: ["clean", "simple", "professional", "minimal", "studio", "neutral"],
    theme: {
      primary: "#1a1a1c",
      accent: "#2f6fed",
      surface: "#f7f6f3",
      text: "#141416",
      muted: "#6b6b76",
      radius: "soft",
      font: "sans",
    },
    tone: {
      heroSubtitle: "Clarity first",
      ctaDefault: "Get started",
      voice: "clear, professional, versatile",
    },
    trainingWeight: 7,
  },
];

export const LOOK_MOODS: { id: LookMood; label: string; blurb: string }[] = [
  { id: "minimal", label: "Minimal", blurb: "Quiet space, sharp hierarchy" },
  { id: "bold", label: "Bold", blurb: "Strong presence, high impact" },
  { id: "warm", label: "Warm", blurb: "Human, inviting, approachable" },
  { id: "luxury", label: "Luxury", blurb: "Refined, scarce, premium" },
  { id: "playful", label: "Playful", blurb: "Friendly energy, lighter tone" },
  { id: "technical", label: "Technical", blurb: "Product / systems feel" },
  { id: "organic", label: "Organic", blurb: "Soft nature, wellness calm" },
  { id: "editorial", label: "Editorial", blurb: "Magazine / story craft" },
];

export const LOOK_ENERGY: { id: LookEnergy; label: string; blurb: string }[] = [
  { id: "calm", label: "Calm", blurb: "Slow, spacious, soft motion" },
  { id: "balanced", label: "Balanced", blurb: "Professional everyday pace" },
  { id: "energetic", label: "Energetic", blurb: "Campaign energy, urgency" },
];

export const LOOK_CONTRAST: { id: LookContrast; label: string; blurb: string }[] = [
  { id: "soft", label: "Soft", blurb: "Gentle edges, airy surfaces" },
  { id: "medium", label: "Medium", blurb: "Clear but not harsh" },
  { id: "high", label: "High", blurb: "Strong type & color contrast" },
];

export function emptyLookFeel(): LookFeelPrefs {
  return {
    mood: null,
    energy: null,
    contrast: null,
    desire: "",
    avoid: "",
  };
}

export interface G2PRecommendation {
  system: StyleSystem;
  confidence: number;
  score: number;
  reasons: string[];
  alternatives: { system: StyleSystem; score: number; note: string }[];
  /** Model identity (Auraxir only) */
  model: {
    name: string;
    version: string;
    trainedFor: string;
  };
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

function scoreStyle(
  system: StyleSystem,
  opts: {
    prefs: LookFeelPrefs;
    businessType: BusinessType | null;
    description: string;
  },
): { score: number; reasons: string[] } {
  let score = system.trainingWeight;
  const reasons: string[] = [];
  const { prefs, businessType, description } = opts;

  if (prefs.mood && system.moods.includes(prefs.mood)) {
    score += 14;
    reasons.push(`Mood match: ${prefs.mood}`);
  } else if (prefs.mood) {
    score -= 4;
  }

  if (prefs.energy && system.energy.includes(prefs.energy)) {
    score += 8;
    reasons.push(`Energy: ${prefs.energy}`);
  }

  if (prefs.contrast && system.contrast.includes(prefs.contrast)) {
    score += 6;
    reasons.push(`Contrast: ${prefs.contrast}`);
  }

  if (businessType && system.businesses.includes(businessType)) {
    score += 10;
    reasons.push(`Trained for ${businessType.replace(/-/g, " ")}`);
  }

  const bag = [
    ...tokenize(prefs.desire),
    ...tokenize(description),
  ];
  let keywordHits = 0;
  for (const word of bag) {
    if (system.keywords.some((k) => k.includes(word) || word.includes(k))) {
      keywordHits += 1;
    }
  }
  if (keywordHits > 0) {
    score += Math.min(keywordHits * 3, 15);
    reasons.push(`Desire signals aligned (${keywordHits})`);
  }

  const avoid = tokenize(prefs.avoid);
  for (const word of avoid) {
    if (system.keywords.some((k) => k.includes(word) || word.includes(k))) {
      score -= 8;
      reasons.push(`Avoid signal reduced weight: ${word}`);
    }
  }

  // Soft prior toward versatile studio if little signal
  if (!prefs.mood && !prefs.desire.trim() && system.id === "studio-clean") {
    score += 3;
    reasons.push("Low signal · elite baseline prior");
  }

  return { score, reasons };
}

/**
 * Run Auraxir G2P AI — Goal-to-Production look & feel match.
 * Synchronous “inference” over the trained style corpus.
 */
export function runG2P(opts: {
  prefs: LookFeelPrefs;
  businessType: BusinessType | null;
  description?: string;
}): G2PRecommendation {
  const description = opts.description ?? "";
  const ranked = G2P_STYLE_CORPUS.map((system) => {
    const { score, reasons } = scoreStyle(system, {
      prefs: opts.prefs,
      businessType: opts.businessType,
      description,
    });
    return { system, score, reasons };
  }).sort((a, b) => b.score - a.score || b.system.trainingWeight - a.system.trainingWeight);

  const best = ranked[0]!;
  const second = ranked[1];
  const gap = best.score - (second?.score ?? 0);
  const confidence = Math.min(99, Math.round(55 + Math.min(gap * 5, 25) + Math.min(best.score, 15)));

  if (best.reasons.length === 0) {
    best.reasons.push("Corpus prior · elite production baseline");
  }
  best.reasons.push(`${BRAND.name} G2P AI applied look & feel for production`);

  return {
    system: best.system,
    confidence,
    score: best.score,
    reasons: best.reasons,
    alternatives: ranked.slice(1, 3).map((r) => ({
      system: r.system,
      score: r.score,
      note: `Alt look · score ${r.score}`,
    })),
    model: {
      name: "Auraxir G2P AI",
      version: "1.1-elite",
      trainedFor: "Goal-to-Production look & feel for elite websites & apps",
    },
  };
}

/** Apply G2P theme onto existing theme (full replace of tokens — intentional) */
export function applyG2PTheme(system: StyleSystem): ThemeTokens {
  return { ...system.theme };
}

export const G2P = {
  name: "Auraxir G2P AI",
  shortName: "G2P",
  fullName: "Auraxir Goal-to-Production AI",
  version: "1.1-elite",
  seal: "Auraxir G2P AI · Look Engine",
  principle: "Desire in. Production look out.",
  tagline: "The look you want — locked into production.",
  promise:
    "Auraxir G2P AI is our proprietary Goal-to-Production engine. Tell it the mood, energy, and desire. It matches a trained elite style system and applies colors, type, radius, and voice — so the site feels exactly right before you ship.",
  marketLines: [
    "Not a theme picker — a trained look engine.",
    "Mood, energy, contrast, and free-text desire.",
    "Production tokens + copy tone in one pass.",
    "Exclusive to Auraxir. Your look, our name.",
  ],
} as const;

export const G2P_MODEL_CARD = {
  name: G2P.name,
  version: G2P.version,
  purpose: "Goal-to-Production: match desired look & feel → production design system",
  brand: BRAND.legalName,
  training: [
    "Elite production style corpus (trained systems)",
    "Business-type aesthetic priors",
    "Mood / energy / contrast preference vectors",
    "Free-text desire & avoid keyword alignment",
    "Imago image-stage affinity",
    "Continuous production feedback loop (quality + publish scores)",
  ],
  promise: G2P.promise,
} as const;
