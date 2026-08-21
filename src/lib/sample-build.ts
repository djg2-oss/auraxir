import {
  buildDefaultSections,
  emptyNeeds,
  SITE_TYPES,
  type BusinessType,
  type SiteProject,
  type SiteSection,
} from "./catalog";
import { emptyLookFeel, runG2P, applyG2PTheme } from "./g2p-ai";
import { themeFromPalette, paletteById } from "./lab";
import { uid } from "./utils";

export type SampleKindId = "music" | "video" | "restaurant" | "fashion" | "architecture" | "wealth";

type HouseCopy = {
  subtitle: string;
  hero: string;
  aboutTitle: string;
  about: string;
  servicesTitle: string;
  services: { title: string; body: string }[];
  galleryTitle: string;
  gallery: { title: string; body: string }[];
  ctaTitle: string;
};

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
  copy: HouseCopy;
}[] = [
  {
    id: "music",
    label: "Music house",
    name: "North Room",
    businessType: "agency",
    paletteId: "north-room",
    siteTypeId: "brochure",
    description: "A recording house. Sessions, tape, masters.",
    desire: "dark walnut, live meters, quiet luxury music",
    cta: "Book a session",
    copy: {
      subtitle: "Studio A · Tulsa",
      hero: "The desk is the brand. Tracking, mix, master — one room that does not perform for the internet.",
      aboutTitle: "The room",
      about: "North Room is a working house. Analog desk, quiet booth, no playlist template. You come for tape, not a landing page.",
      servicesTitle: "On the floor",
      services: [
        { title: "Tracking", body: "Studio A. Live floor. Booth through glass." },
        { title: "Mix", body: "The desk, not a preset. Recall when you need it." },
        { title: "Master", body: "Leave with something that holds on a system, not a phone speaker." },
      ],
      galleryTitle: "On the tape",
      gallery: [
        { title: "Midnight Signal", body: "Session still. Meters live." },
        { title: "Booth", body: "Glass, walnut, no neon." },
        { title: "Masters", body: "What leaves the house." },
      ],
      ctaTitle: "Put a date on Studio A",
    },
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
    copy: {
      subtitle: "Picture · Sound · Grade",
      hero: "A color suite and a stage. The cut is the brand — not a showreel dump.",
      aboutTitle: "The suite",
      about: "Halo Grade is a production house. Capture, cut, grade. Tungsten when it should be warm. Letterbox when the frame needs law.",
      servicesTitle: "The order",
      services: [
        { title: "Capture", body: "Camera, light, the room." },
        { title: "Cut", body: "Picture first. No stock montage." },
        { title: "Grade", body: "The climate of the frame. Locked." },
      ],
      galleryTitle: "Frames",
      gallery: [
        { title: "Stage", body: "Velvet, tungsten, glass." },
        { title: "Suite", body: "The monitor is the product." },
        { title: "Release", body: "One cut. One grade." },
      ],
      ctaTitle: "Bring a cut",
    },
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
    copy: {
      subtitle: "Dinner · Dusk",
      hero: "A room that keeps its voice down. Fire, copper, a table you reserve — not a deal.",
      aboutTitle: "The room",
      about: "Hearth cooks for the table in front of you. Candle, linen, an open kitchen far enough to stay a kitchen.",
      servicesTitle: "The pass",
      services: [
        { title: "First", body: "Bread, copper, something cold." },
        { title: "Fire", body: "The plate that is the house." },
        { title: "Close", body: "Slow. No rush ticket on dessert." },
      ],
      galleryTitle: "Tonight",
      gallery: [
        { title: "Dining room", body: "Dusk. One arrangement." },
        { title: "Kitchen", body: "Copper, not a content wall." },
        { title: "Table", body: "Linen. Two settings." },
      ],
      ctaTitle: "A table tonight",
    },
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
    copy: {
      subtitle: "Season · Cloth",
      hero: "A garment on a plinth. Not a grid of thumbnails shouting sale.",
      aboutTitle: "The house",
      about: "Atelier cuts few things and shows them like architecture. Ivory, stone, hush.",
      servicesTitle: "On the floor",
      services: [
        { title: "Cut", body: "Cloth as structure." },
        { title: "Show", body: "One piece. Proper light." },
        { title: "Hold", body: "Made, then kept. Not dropped weekly." },
      ],
      galleryTitle: "The stand",
      gallery: [
        { title: "Ivory", body: "Silk on stone." },
        { title: "Gallery", body: "Museum light, not a shop strobe." },
        { title: "Season", body: "What is out, is out." },
      ],
      ctaTitle: "See what is cut",
    },
  },
  {
    id: "architecture",
    label: "Architecture",
    name: "Massing",
    businessType: "agency",
    paletteId: "massing",
    siteTypeId: "portfolio-pro",
    description: "Practice site. Models first.",
    desire: "chipboard, north light, concrete",
    cta: "See the work",
    copy: {
      subtitle: "Practice · Models",
      hero: "The site is a drawing board. Chipboard, brass weights, north light.",
      aboutTitle: "The table",
      about: "Massing is a practice. We show models and drawings before slogans. The work is the page.",
      servicesTitle: "On the table",
      services: [
        { title: "Massing", body: "Form before finish." },
        { title: "Drawings", body: "Plans that can be built." },
        { title: "Site", body: "The land is not a render preset." },
      ],
      galleryTitle: "On the board",
      gallery: [
        { title: "City model", body: "White chipboard, brass." },
        { title: "North light", body: "The studio window." },
        { title: "Section", body: "A cut through the work." },
      ],
      ctaTitle: "Commission the next mass",
    },
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
    copy: {
      subtitle: "By conversation",
      hero: "A desk, a city at dusk, one bronze. No charts. No portal theater.",
      aboutTitle: "The book",
      about: "Private Book is a conversation, not a product page. If this is your room, you already know.",
      servicesTitle: "What we hold",
      services: [
        { title: "Quiet", body: "No dashboard for guests." },
        { title: "Paper", body: "The book is still a book." },
        { title: "City", body: "The window does the talking." },
      ],
      galleryTitle: "The office",
      gallery: [
        { title: "Desk", body: "Walnut. One sculpture." },
        { title: "Dusk", body: "Glass, not a ticker." },
        { title: "Chair", body: "For the conversation." },
      ],
      ctaTitle: "Ask for a time",
    },
  },
];

function paintHouse(sections: SiteSection[], kind: (typeof SAMPLE_KINDS)[number], name: string, cover: string): SiteSection[] {
  const c = kind.copy;
  return sections.map((sec) => {
    if (sec.type === "testimonials" || sec.type === "pricing" || sec.type === "features") {
      return { ...sec, visible: false };
    }
    if (sec.type === "hero") {
      return {
        ...sec,
        title: name,
        subtitle: c.subtitle,
        body: c.hero,
        ctaLabel: kind.cta,
        ctaHref: "#contact",
        imageSrc: cover,
      };
    }
    if (sec.type === "about") {
      return { ...sec, title: c.aboutTitle, subtitle: name, body: c.about };
    }
    if (sec.type === "services") {
      return { ...sec, title: c.servicesTitle, subtitle: name, body: "", items: c.services };
    }
    if (sec.type === "gallery") {
      return { ...sec, title: c.galleryTitle, subtitle: name, body: "", items: c.gallery, imageSrc: cover };
    }
    if (sec.type === "cta") {
      return { ...sec, title: c.ctaTitle, subtitle: name, body: c.hero, ctaLabel: kind.cta, ctaHref: "#contact" };
    }
    if (sec.type === "contact") {
      return { ...sec, title: "Write the house", subtitle: name, body: "One note. A person reads it.", ctaLabel: "Send" };
    }
    if (sec.type === "footer") {
      return { ...sec, title: name, body: `${c.subtitle} · Sample by Auraxir` };
    }
    return sec;
  });
}

export function buildSample(kindId: SampleKindId, customName?: string): SiteProject {
  const kind = SAMPLE_KINDS.find((k) => k.id === kindId) ?? SAMPLE_KINDS[0]!;
  const name = (customName || kind.name).trim() || kind.name;
  const pal = paletteById(kind.paletteId);
  const siteType = SITE_TYPES.find((t) => t.id === kind.siteTypeId) ?? SITE_TYPES[0]!;
  const prefs = { ...emptyLookFeel(), desire: kind.desire, mood: "luxury" as const, energy: "calm" as const, contrast: "high" as const };
  const g2p = runG2P({ prefs, businessType: kind.businessType, description: kind.description });
  const theme = { ...applyG2PTheme(g2p.system), ...themeFromPalette(pal), radius: "sharp" as const, font: "serif" as const };
  const sections = paintHouse(
    buildDefaultSections(siteType, name, kind.description, {
      heroSubtitle: kind.copy.subtitle,
      ctaDefault: kind.cta,
    }),
    kind,
    name,
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
