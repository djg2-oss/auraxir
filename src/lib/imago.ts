/**
 * AURAXIR IMAGO
 * ────────────
 * The correct name for seamless brand-image pages we attach to any site.
 * Principle: Image is everything.
 *
 * Imago elevates how a brand is seen — conversion, trust, offer, launch, care —
 * as visual stages under one premium image standard. Additive. Seamless. Elite.
 */
import type { SiteSection, ThemeTokens } from "./catalog";
import { uid } from "./utils";

export const IMAGO = {
  name: "Auraxir Imago",
  shortName: "Imago",
  principle: "Image is everything.",
  tagline: "Protect the image. Elevate the presence. Attach when it makes the brand sharper.",
  promise:
    "Imago is how Auraxir seamlessly builds custom image stages onto any site — when we see fit to make the brand look even stronger. Image is everything.",
  seal: "Auraxir Imago · Image Standard",
  marketingOneLiner: "Image is everything. Imago is how elite brands stay looking that way.",
} as const;

export type ImageMood = "cinematic" | "editorial" | "luxe" | "bold" | "calm" | "radiant";

export interface ImagoStage {
  id: string;
  /** Market-facing stage name */
  name: string;
  /** One-line market hook */
  hook: string;
  blurb: string;
  pageSlug: string;
  whenWeUseIt: string;
  boostLabel: string;
  /** Visual mood this stage reinforces */
  imageMood: ImageMood;
  /** Atmosphere for renderer */
  atmosphere: {
    gradient: string;
    label: string;
  };
  buildSections: (brandName: string) => SiteSection[];
}

function section(
  partial: Omit<SiteSection, "id" | "visible"> & { id?: string },
): SiteSection {
  return {
    id: partial.id ?? uid("imago"),
    type: partial.type,
    title: partial.title,
    subtitle: partial.subtitle,
    body: partial.body,
    ctaLabel: partial.ctaLabel,
    ctaHref: partial.ctaHref,
    items: partial.items,
    visible: true,
    isTieIn: true,
    pageSlug: partial.pageSlug,
    enhancementId: partial.enhancementId,
  };
}

/** Market-correct stage names — image-first language */
export const IMAGO_STAGES: ImagoStage[] = [
  {
    id: "presence",
    name: "Presence Stage",
    hook: "The first impression, perfected.",
    blurb: "A seamless presence page that frames the brand the way the world should see it.",
    pageSlug: "presence",
    whenWeUseIt: "When the first impression must be undeniable.",
    boostLabel: "+ Presence Stage",
    imageMood: "cinematic",
    atmosphere: {
      gradient: "linear-gradient(135deg, #0b0b0f 0%, #1a1a22 45%, #c9a227 160%)",
      label: "Cinematic presence",
    },
    buildSections: (brand) => [
      section({
        type: "hero",
        title: `${brand} — as it should be seen`,
        subtitle: "Imago · Presence",
        body: "Image is everything. This stage is built so the brand arrives with clarity, weight, and quiet confidence.",
        ctaLabel: "Enter the brand",
        ctaHref: "#contact",
        items: [],
        pageSlug: "presence",
        enhancementId: "presence",
      }),
      section({
        type: "features",
        title: "How presence is earned",
        subtitle: "Seen. Felt. Remembered.",
        body: "We only attach this when the main site needs a sharper image entrance.",
        ctaLabel: "",
        ctaHref: "",
        items: [
          { title: "Frame", body: "One powerful frame — no visual noise." },
          { title: "Voice", body: "Language that matches the look." },
          { title: "Motion", body: "A path that feels intentional, not busy." },
        ],
        pageSlug: "presence",
        enhancementId: "presence",
      }),
    ],
  },
  {
    id: "lookbook",
    name: "Lookbook Stage",
    hook: "The image, gallery-ready.",
    blurb: "Visual story page for product, craft, or lifestyle — image first, always.",
    pageSlug: "lookbook",
    whenWeUseIt: "When the brand must be felt through visuals, not paragraphs.",
    boostLabel: "+ Lookbook Stage",
    imageMood: "editorial",
    atmosphere: {
      gradient: "linear-gradient(160deg, #f7f4ef 0%, #e8e0d4 50%, #1a1a1c 180%)",
      label: "Editorial lookbook",
    },
    buildSections: (brand) => [
      section({
        type: "hero",
        title: `${brand} lookbook`,
        subtitle: "Imago · Image story",
        body: "A visual room for the brand. Image is everything — this page proves it.",
        ctaLabel: "View collection",
        ctaHref: "#gallery",
        items: [],
        pageSlug: "lookbook",
        enhancementId: "lookbook",
      }),
      section({
        type: "gallery",
        title: "Selected frames",
        subtitle: "Craft in focus",
        body: "Curated visuals that set the standard for how the brand is seen.",
        ctaLabel: "",
        ctaHref: "",
        items: [
          { title: "Frame 01", body: "Hero material — atmosphere and product in one glance." },
          { title: "Frame 02", body: "Detail that signals quality without a speech." },
          { title: "Frame 03", body: "Lifestyle context that makes desire obvious." },
          { title: "Frame 04", body: "Closing image that invites the next step." },
        ],
        pageSlug: "lookbook",
        enhancementId: "lookbook",
      }),
    ],
  },
  {
    id: "conversion-bridge",
    name: "Desire Stage",
    hook: "Desire, directed.",
    blurb: "Conversion page that keeps the image elite while moving the right people forward.",
    pageSlug: "start",
    whenWeUseIt: "When conversion must rise without cheapening the image.",
    boostLabel: "+ Desire Stage",
    imageMood: "bold",
    atmosphere: {
      gradient: "linear-gradient(135deg, #141416 0%, #2a1f3d 55%, #e8b4a0 140%)",
      label: "Bold desire",
    },
    buildSections: (brand) => [
      section({
        type: "hero",
        title: `Begin with ${brand}`,
        subtitle: "Imago · Desire",
        body: "A focused next step — premium image, zero clutter, one clear action.",
        ctaLabel: "Continue",
        ctaHref: "#contact",
        items: [],
        pageSlug: "start",
        enhancementId: "conversion-bridge",
      }),
      section({
        type: "features",
        title: "Why this path",
        subtitle: "Clear. Premium. Intentional.",
        body: "Attached only when the funnel needs a sharper image of the offer.",
        ctaLabel: "",
        ctaHref: "",
        items: [
          { title: "Clarity", body: "One job: move the right visitor forward." },
          { title: "Image", body: "Still looks like the brand at its best." },
          { title: "Action", body: "A single CTA that fits elite taste." },
        ],
        pageSlug: "start",
        enhancementId: "conversion-bridge",
      }),
      section({
        type: "cta",
        title: "Ready when you are",
        subtitle: "",
        body: "Continue into the main experience with confidence.",
        ctaLabel: "Get started",
        ctaHref: "#contact",
        items: [],
        pageSlug: "start",
        enhancementId: "conversion-bridge",
      }),
    ],
  },
  {
    id: "trust-room",
    name: "Reputation Stage",
    hook: "Proof that protects the image.",
    blurb: "Trust and reputation page — testimonials, process, polish.",
    pageSlug: "trust",
    whenWeUseIt: "When reputation needs its own room without bloating home.",
    boostLabel: "+ Reputation Stage",
    imageMood: "luxe",
    atmosphere: {
      gradient: "linear-gradient(145deg, #0f1419 0%, #1c2a24 50%, #c5a46e 150%)",
      label: "Luxe reputation",
    },
    buildSections: (brand) => [
      section({
        type: "hero",
        title: `Why teams choose ${brand}`,
        subtitle: "Imago · Reputation",
        body: "Image is trust made visible. This stage holds the proof without cluttering the home image.",
        ctaLabel: "Talk to us",
        ctaHref: "#contact",
        items: [],
        pageSlug: "trust",
        enhancementId: "trust-room",
      }),
      section({
        type: "testimonials",
        title: "What clients notice",
        subtitle: "Quality shows",
        body: "",
        ctaLabel: "",
        ctaHref: "",
        items: [
          { title: "Clarity", body: "The story got sharper the moment this page went live." },
          { title: "Confidence", body: "Prospects arrive already trusting the image." },
          { title: "Speed", body: "Fewer back-and-forths before the real conversation." },
        ],
        pageSlug: "trust",
        enhancementId: "trust-room",
      }),
      section({
        type: "about",
        title: "How we work",
        subtitle: "Simple, elite, reliable",
        body: "Discover → match → design → launch — with image checks at every step.",
        ctaLabel: "",
        ctaHref: "",
        items: [],
        pageSlug: "trust",
        enhancementId: "trust-room",
      }),
    ],
  },
  {
    id: "offer-suite",
    name: "Atelier Stage",
    hook: "Offers presented like a house of quality.",
    blurb: "Packages and pricing in a room that still looks elite.",
    pageSlug: "offers",
    whenWeUseIt: "When packages deserve a dedicated, premium image.",
    boostLabel: "+ Atelier Stage",
    imageMood: "luxe",
    atmosphere: {
      gradient: "linear-gradient(135deg, #1a1510 0%, #3d2e22 50%, #e6d5b8 140%)",
      label: "Atelier luxe",
    },
    buildSections: (brand) => [
      section({
        type: "hero",
        title: `${brand} atelier`,
        subtitle: "Imago · Offers",
        body: "Packages presented with the same image standard as the flagship home.",
        ctaLabel: "Choose a plan",
        ctaHref: "#pricing",
        items: [],
        pageSlug: "offers",
        enhancementId: "offer-suite",
      }),
      section({
        type: "pricing",
        title: "Collections",
        subtitle: "Built to convert without looking cheap",
        body: "Structure that makes the right choice obvious — and beautiful.",
        ctaLabel: "Select",
        ctaHref: "#contact",
        items: [
          { title: "Essential", body: "Core delivery with premium polish." },
          { title: "Growth", body: "Expanded reach and conversion assets." },
          { title: "Flagship", body: "Full suite for brands at the top." },
        ],
        pageSlug: "offers",
        enhancementId: "offer-suite",
      }),
    ],
  },
  {
    id: "launch-pad",
    name: "Spotlight Stage",
    hook: "The campaign image, on command.",
    blurb: "Launch and campaign surface that holds peak attention.",
    pageSlug: "launch",
    whenWeUseIt: "When a moment needs a spotlight without rewriting the whole site.",
    boostLabel: "+ Spotlight Stage",
    imageMood: "radiant",
    atmosphere: {
      gradient: "linear-gradient(125deg, #0a0a12 0%, #1e1a3a 40%, #ff6b4a 130%)",
      label: "Radiant spotlight",
    },
    buildSections: (brand) => [
      section({
        type: "hero",
        title: `Spotlight: ${brand}`,
        subtitle: "Imago · Launch",
        body: "A campaign image stage — force, focus, and a CTA that captures the moment.",
        ctaLabel: "Join the launch",
        ctaHref: "#contact",
        items: [],
        pageSlug: "launch",
        enhancementId: "launch-pad",
      }),
      section({
        type: "features",
        title: "What lands today",
        subtitle: "",
        body: "",
        ctaLabel: "",
        ctaHref: "",
        items: [
          { title: "Message", body: "One sharp story for this moment." },
          { title: "Image", body: "A visual that stops the scroll." },
          { title: "Action", body: "A CTA that captures intent now." },
        ],
        pageSlug: "launch",
        enhancementId: "launch-pad",
      }),
      section({
        type: "cta",
        title: "This window is open",
        subtitle: "",
        body: "Move while the spotlight is live.",
        ctaLabel: "Claim your spot",
        ctaHref: "#contact",
        items: [],
        pageSlug: "launch",
        enhancementId: "launch-pad",
      }),
    ],
  },
  {
    id: "care-desk",
    name: "Aftercare Stage",
    hook: "Care that still looks elite.",
    blurb: "Support and onboarding with the same image standard as the front door.",
    pageSlug: "care",
    whenWeUseIt: "When post-sale care must not break the brand image.",
    boostLabel: "+ Aftercare Stage",
    imageMood: "calm",
    atmosphere: {
      gradient: "linear-gradient(160deg, #0e1418 0%, #1a2a32 55%, #7eb8c9 150%)",
      label: "Calm aftercare",
    },
    buildSections: (brand) => [
      section({
        type: "hero",
        title: `${brand} aftercare`,
        subtitle: "Imago · Care",
        body: "Help that feels as considered as the homepage. Image is everything — including after the sale.",
        ctaLabel: "Contact care",
        ctaHref: "#contact",
        items: [],
        pageSlug: "care",
        enhancementId: "care-desk",
      }),
      section({
        type: "features",
        title: "Common questions",
        subtitle: "",
        body: "",
        ctaLabel: "",
        ctaHref: "",
        items: [
          { title: "Getting started", body: "What happens in the first week." },
          { title: "Billing", body: "Clear answers without friction." },
          { title: "Changes", body: "How upgrades and edits work." },
        ],
        pageSlug: "care",
        enhancementId: "care-desk",
      }),
    ],
  },
];

export function getImagoStage(id: string): ImagoStage | undefined {
  return IMAGO_STAGES.find((m) => m.id === id);
}

/** @deprecated use getImagoStage — alias for store compatibility */
export function getTieIn(id: string): ImagoStage | undefined {
  return getImagoStage(id);
}

export function projectImagoIds(sections: SiteSection[]): string[] {
  const ids = new Set<string>();
  for (const s of sections) {
    if (s.enhancementId) ids.add(s.enhancementId);
  }
  return [...ids];
}

export function projectTieInIds(sections: SiteSection[]): string[] {
  return projectImagoIds(sections);
}

export function listImagoPages(sections: SiteSection[]): { slug: string; name: string; mood?: ImageMood }[] {
  const map = new Map<string, { name: string; mood?: ImageMood }>();
  for (const s of sections) {
    if (s.pageSlug && s.enhancementId) {
      const mod = getImagoStage(s.enhancementId);
      map.set(s.pageSlug, { name: mod?.name ?? s.pageSlug, mood: mod?.imageMood });
    }
  }
  return [...map.entries()].map(([slug, v]) => ({ slug, name: v.name, mood: v.mood }));
}

export function listTieInPages(sections: SiteSection[]) {
  return listImagoPages(sections);
}

export const TIE_IN_MODULES = IMAGO_STAGES;
export const TIE_IN_PROMISE = IMAGO.promise;

export function imagoAtmosphereFor(enhancementId?: string): ImagoStage["atmosphere"] | null {
  if (!enhancementId) return null;
  return getImagoStage(enhancementId)?.atmosphere ?? null;
}

/** Optional theme nudge when applying an Imago stage — image-first polish */
export function imagoThemeHint(mood: ImageMood): Partial<ThemeTokens> {
  switch (mood) {
    case "cinematic":
      return { primary: "#0b0b0f", accent: "#c9a227", surface: "#121214", text: "#f4f0e8", font: "display" };
    case "editorial":
      return { primary: "#1a1a1c", accent: "#8b4513", surface: "#f7f4ef", text: "#141416", font: "serif" };
    case "luxe":
      return { primary: "#14110e", accent: "#c5a46e", surface: "#f8f4ec", text: "#1a1510", font: "serif" };
    case "bold":
      return { primary: "#141416", accent: "#e85d4c", surface: "#faf8f6", text: "#0f0f12", font: "sans" };
    case "calm":
      return { primary: "#0e1418", accent: "#3d7a8c", surface: "#f2f6f7", text: "#12181c", font: "sans" };
    case "radiant":
      return { primary: "#0a0a12", accent: "#ff6b4a", surface: "#faf7f5", text: "#121018", font: "display" };
    default:
      return {};
  }
}
