import {
  buildDefaultSections,
  emptyNeeds,
  SITE_TYPES,
  type BusinessType,
  type SiteProject,
} from "./catalog";
import { emptyLookFeel, runG2P, applyG2PTheme } from "./g2p-ai";
import { themeFromPalette, paletteById } from "./lab";
import { writeKernelCopy } from "./anmos/writer";
import { uid } from "./utils";

export type SampleKindId = "music" | "video" | "restaurant" | "fashion" | "architecture" | "wealth";

export const SAMPLE_KINDS: {
  id: SampleKindId;
  label: string;
  name: string;
  businessType: BusinessType;
  paletteId: string;
  siteTypeId: SiteProject["siteTypeId"];
  description: string;
  desire: string;
  cta: string;
}[] = [
  {
    id: "music",
    label: "Music house",
    name: "North Room",
    businessType: "agency",
    paletteId: "north-room",
    siteTypeId: "brochure",
    description: "A recording house. Sessions, tape, masters. The desk is the brand.",
    desire: "dark walnut, live meters, quiet luxury music",
    cta: "Book a session",
  },
  {
    id: "video",
    label: "Video house",
    name: "Halo Grade",
    businessType: "agency",
    paletteId: "halo-grade",
    siteTypeId: "portfolio-pro",
    description: "Cinema production and color. The cut is the brand.",
    desire: "tungsten, letterbox, editorial film",
    cta: "Start a cut",
  },
  {
    id: "restaurant",
    label: "Restaurant",
    name: "Hearth",
    businessType: "restaurant",
    paletteId: "hearth",
    siteTypeId: "booking",
    description: "A dining room at dusk. Reservations, not a coupon site.",
    desire: "candle, copper, hush",
    cta: "Reserve a table",
  },
  {
    id: "fashion",
    label: "Fashion",
    name: "Atelier",
    businessType: "ecommerce",
    paletteId: "atelier",
    siteTypeId: "storefront",
    description: "Garment as architecture. No merch grid.",
    desire: "ivory silk, stone, museum hush",
    cta: "View the collection",
  },
  {
    id: "architecture",
    label: "Architecture",
    name: "Massing",
    businessType: "agency",
    paletteId: "massing",
    siteTypeId: "portfolio-pro",
    description: "Practice site. Models first. The page is a drawing board.",
    desire: "chipboard, north light, concrete",
    cta: "See the work",
  },
  {
    id: "wealth",
    label: "Wealth",
    name: "Private Book",
    businessType: "personal",
    paletteId: "private",
    siteTypeId: "brochure",
    description: "A desk and a city. No dashboard circus.",
    desire: "walnut, bronze, dusk glass",
    cta: "Request a conversation",
  },
];

function paintCopy(
  sections: SiteProject["sections"],
  copy: ReturnType<typeof writeKernelCopy>,
  cover: string,
): SiteProject["sections"] {
  const overlay: Record<string, { title: string; subtitle: string; body: string; ctaLabel: string; items?: { title: string; body: string }[] }> = {
    hero: copy.hero,
    features: copy.features,
    about: copy.about,
    cta: copy.cta,
  };
  return sections.map((sec) => {
    const next = overlay[sec.type];
    if (sec.type === "testimonials") {
      return { ...sec, visible: false };
    }
    if (!next) return sec;
    return {
      ...sec,
      title: next.title || sec.title,
      subtitle: next.subtitle || sec.subtitle,
      body: next.body || sec.body,
      ctaLabel: next.ctaLabel || sec.ctaLabel,
      items: next.items?.length ? next.items : sec.items,
      imageSrc: sec.type === "hero" ? cover : sec.imageSrc,
    };
  });
}

export function buildSample(kindId: SampleKindId, customName?: string): SiteProject {
  const kind = SAMPLE_KINDS.find((k) => k.id === kindId) ?? SAMPLE_KINDS[0]!;
  const name = (customName || kind.name).trim() || kind.name;
  const pal = paletteById(kind.paletteId);
  const siteType = SITE_TYPES.find((t) => t.id === kind.siteTypeId) ?? SITE_TYPES[0]!;
  const prefs = { ...emptyLookFeel(), desire: kind.desire, mood: "luxury" as const };
  const g2p = runG2P({ prefs, businessType: kind.businessType, description: kind.description });
  const theme = { ...applyG2PTheme(g2p.system), ...themeFromPalette(pal) };
  const copy = writeKernelCopy({
    name,
    type: kind.label,
    description: kind.description,
    desire: kind.desire,
    heroSubtitle: g2p.system.tone.heroSubtitle,
    ctaDefault: kind.cta,
  });
  const sections = paintCopy(
    buildDefaultSections(siteType, name, kind.description, {
      heroSubtitle: g2p.system.tone.heroSubtitle,
      ctaDefault: kind.cta,
    }),
    copy,
    pal.src,
  );
  const now = new Date().toISOString();
  return {
    id: uid("sample"),
    name,
    createdAt: now,
    updatedAt: now,
    needs: {
      ...emptyNeeds(),
      businessName: name,
      businessType: kind.businessType,
      productIntent: "website",
      description: kind.description,
      lookFeel: prefs,
    },
    siteTypeId: kind.siteTypeId,
    hostPlanId: "webflow",
    builderId: "webflow",
    theme,
    sections,
    domain: `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.sample.auraxir.com`,
    published: false,
    priceMonthly: 0,
    setupFee: 0,
    qualityPassed: false,
    secureNetworkEnabled: false,
    g2pStyleId: g2p.system.id,
    g2pStyleName: g2p.system.name,
    g2pConfidence: g2p.confidence,
    labPaletteId: kind.paletteId,
  };
}
