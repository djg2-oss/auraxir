/**
 * BEST BUILDS FROM MANY HOSTS — absolute premium only.
 * Admission: pro design GUI + real API + production-grade. No toys.
 * Customer surfaces: Auraxir names only. Host variety is our craft.
 */

import { BRAND, retailFromCost } from "./brand";
import { networkForEngine, type NetworkCapability } from "./elite";

export type BuilderKind = "website" | "app" | "commerce" | "ops";
export type BuilderTier = "flagship" | "premium";
export type BuilderId =
  | "webflow"
  | "framer"
  | "weweb"
  | "builder-io"
  | "plasmic"
  | "wix-studio"
  | "duda"
  | "squarespace"
  | "hubspot-cms"
  | "shopify"
  | "bigcommerce"
  | "bubble"
  | "flutterflow"
  | "draftbit"
  | "bravo"
  | "retool"
  | "superblocks"
  | "outsystems"
  | "modelcentro"
  | "fansly"
  | "onlyfans-platform"
  | "loyalfans"
  | "manyvids"
  | "avnstars";

export interface PremiumBuilder {
  id: BuilderId;
  vendorName: string;
  productName: string;
  tagline: string;
  kind: BuilderKind;
  tier: BuilderTier;
  elite: true;
  realProduction: true;
  hasProGui: true;
  hasPublicApi: true;
  priority: number;
  phase: 1;
  costMonthly: number;
  networkCostMonthly: number;
  markupPercent: number;
  priceMonthly: number;
  bestBusiness: string[];
  bestGoals: string[];
  strengths: string[];
  features: string[];
  qualityExtras: string[];
  network: NetworkCapability[];
  capacity: string;
  skillFit: Array<"none" | "some" | "dev">;
  whyPremium: string;
  whyElite: string;
  apiGuiLine: string;
  /** Adult-capable line (18+) — brand overlay only; customer owns content */
  adultCapable?: boolean;
  /** Internal host family for matching diversity */
  hostFamily: "web" | "commerce" | "app" | "mobile" | "ops" | "enterprise" | "adult";
}

function builder(
  partial: Omit<
    PremiumBuilder,
    | "priceMonthly"
    | "qualityExtras"
    | "elite"
    | "realProduction"
    | "hasProGui"
    | "hasPublicApi"
    | "network"
    | "networkCostMonthly"
  > & {
    qualityExtras?: string[];
    networkCostMonthly?: number;
  },
): PremiumBuilder {
  const networkCostMonthly =
    partial.networkCostMonthly ??
    (partial.kind === "app" || partial.kind === "ops" ? 35 : 18);
  const network = networkForEngine({
    tier: partial.tier,
    kind: partial.kind === "ops" ? "app" : partial.kind,
    scale: partial.tier === "flagship",
    alwaysOn: partial.tier === "flagship" || partial.kind === "app" || partial.kind === "commerce" || partial.kind === "ops",
  });
  const totalCost = partial.costMonthly + networkCostMonthly;
  return {
    ...partial,
    elite: true,
    realProduction: true,
    hasProGui: true,
    hasPublicApi: true,
    networkCostMonthly,
    network,
    priceMonthly: retailFromCost(totalCost, partial.markupPercent),
    qualityExtras: partial.qualityExtras ?? [
      `${BRAND.name} elite brand on production`,
      "Pro design GUI + real API",
      "Secure tunnel when needed",
    ],
    features: [
      ...partial.features,
      partial.apiGuiLine,
      ...network.slice(0, 2).map((n) => n.customerLabel),
    ],
  };
}

/** Best builds from many different hosts — all absolute premium */
export const PREMIUM_BUILDERS: PremiumBuilder[] = [
  // ── Websites ──────────────────────────────────────────
  builder({
    id: "webflow",
    vendorName: "Webflow",
    productName: "Auraxir Design OS",
    tagline: "Flagship websites — design GUI + CMS API",
    kind: "website",
    tier: "flagship",
    priority: 1,
    phase: 1,
    hostFamily: "web",
    costMonthly: 49,
    networkCostMonthly: 19,
    markupPercent: 190,
    bestBusiness: ["saas", "agency", "nonprofit", "blog", "portfolio"],
    bestGoals: ["brand", "leads", "content"],
    strengths: ["Visual design system", "CMS API", "SEO"],
    apiGuiLine: "Pro design GUI · CMS & site API",
    features: ["Auraxir elite production brand", "Pro visual canvas", "CMS collections", "SEO-ready structure"],
    capacity: "Brand & marketing sites at scale",
    skillFit: ["some", "dev"],
    whyPremium: "Top host for pro marketing sites.",
    whyElite: "Best-in-class web host with GUI + API.",
  }),
  builder({
    id: "framer",
    vendorName: "Framer",
    productName: "Auraxir Motion",
    tagline: "Motion landings — designer GUI + CMS hooks",
    kind: "website",
    tier: "flagship",
    priority: 2,
    phase: 1,
    hostFamily: "web",
    costMonthly: 39,
    networkCostMonthly: 15,
    markupPercent: 195,
    bestBusiness: ["saas", "agency", "portfolio", "personal"],
    bestGoals: ["brand", "leads"],
    strengths: ["Motion polish", "Launch sites", "Components"],
    apiGuiLine: "Designer GUI · CMS & fetch API hooks",
    features: ["Auraxir elite production brand", "Motion-first sections", "Launch landings", "Component libraries"],
    capacity: "Campaign & product launches",
    skillFit: ["some", "dev"],
    whyPremium: "Top host for modern brand motion.",
    whyElite: "Premium motion host — visual + data hooks.",
  }),
  builder({
    id: "weweb",
    vendorName: "WeWeb",
    productName: "Auraxir Interface Lab",
    tagline: "API-first frontends — visual GUI + any backend",
    kind: "website",
    tier: "flagship",
    priority: 3,
    phase: 1,
    hostFamily: "web",
    costMonthly: 59,
    networkCostMonthly: 22,
    markupPercent: 185,
    bestBusiness: ["saas", "agency", "ecommerce"],
    bestGoals: ["leads", "sales", "community"],
    strengths: ["API-first UI", "REST/GraphQL", "No-code GUI"],
    apiGuiLine: "Visual GUI · REST / GraphQL / custom API",
    features: ["Auraxir elite production brand", "API-first page builder", "Auth-ready patterns", "Data-bound UI"],
    capacity: "Data-driven product surfaces",
    skillFit: ["some", "dev"],
    whyPremium: "Best host when APIs drive the UI.",
    whyElite: "Absolute premium API-first web host.",
  }),
  builder({
    id: "builder-io",
    vendorName: "Builder.io",
    productName: "Auraxir Compose",
    tagline: "Headless pages — drag GUI + content API",
    kind: "website",
    tier: "flagship",
    priority: 4,
    phase: 1,
    hostFamily: "web",
    costMonthly: 69,
    networkCostMonthly: 24,
    markupPercent: 180,
    bestBusiness: ["saas", "ecommerce", "agency", "retail"],
    bestGoals: ["brand", "sales", "content"],
    strengths: ["Visual compose", "Headless API", "Multi-brand"],
    apiGuiLine: "Visual compose GUI · headless content API",
    features: ["Auraxir elite production brand", "Drag-and-drop compose", "Headless content model", "Multi-channel publish"],
    capacity: "Multi-brand content systems",
    skillFit: ["some", "dev"],
    whyPremium: "Enterprise headless visual host.",
    whyElite: "Best headless host — marketer GUI + system API.",
  }),
  builder({
    id: "plasmic",
    vendorName: "Plasmic",
    productName: "Auraxir Canvas",
    tagline: "Visual product UI — design GUI + code/API bridge",
    kind: "website",
    tier: "flagship",
    priority: 5,
    phase: 1,
    hostFamily: "web",
    costMonthly: 64,
    networkCostMonthly: 22,
    markupPercent: 182,
    bestBusiness: ["saas", "agency", "ecommerce"],
    bestGoals: ["brand", "leads", "sales"],
    strengths: ["Visual React canvas", "Code components", "API data"],
    apiGuiLine: "Visual product GUI · component & data API",
    features: ["Auraxir elite production brand", "Pixel-true visual canvas", "Design-to-product bridge", "API-bound components"],
    capacity: "Product marketing & app shells",
    skillFit: ["some", "dev"],
    whyPremium: "Top host for design systems wired to code/API.",
    whyElite: "Premium visual host with real engineering bridge.",
  }),
  builder({
    id: "wix-studio",
    vendorName: "Wix Studio",
    productName: "Auraxir Studio",
    tagline: "Agency multi-site — studio GUI + platform API",
    kind: "website",
    tier: "premium",
    priority: 6,
    phase: 1,
    hostFamily: "web",
    costMonthly: 35,
    networkCostMonthly: 15,
    markupPercent: 200,
    bestBusiness: ["agency", "retail", "local-service", "restaurant", "nonprofit"],
    bestGoals: ["leads", "brand", "bookings"],
    strengths: ["Studio GUI", "Business apps", "Multi-site"],
    apiGuiLine: "Studio GUI · business & code API",
    features: ["Auraxir elite production brand", "Responsive studio", "Business apps & forms", "Booking patterns"],
    capacity: "Multi-location brands",
    skillFit: ["none", "some", "dev"],
    whyPremium: "Strong multi-site host for agencies.",
    whyElite: "Premium studio host — GUI + API extensibility.",
  }),
  builder({
    id: "duda",
    vendorName: "Duda",
    productName: "Auraxir Network Sites",
    tagline: "Multi-location brands — white-label ops GUI + API",
    kind: "website",
    tier: "premium",
    priority: 7,
    phase: 1,
    hostFamily: "web",
    costMonthly: 42,
    networkCostMonthly: 16,
    markupPercent: 195,
    bestBusiness: ["agency", "retail", "local-service", "restaurant"],
    bestGoals: ["leads", "bookings", "brand"],
    strengths: ["Multi-location", "Client editor", "Platform API"],
    apiGuiLine: "Network site GUI · platform & content API",
    features: ["Auraxir elite production brand", "Multi-location templates", "Client-safe editing", "Network rollout tools"],
    capacity: "Franchise & multi-location networks",
    skillFit: ["none", "some"],
    whyPremium: "Best host for multi-location networks.",
    whyElite: "Premium network host with full platform API.",
  }),
  builder({
    id: "squarespace",
    vendorName: "Squarespace",
    productName: "Auraxir Signature",
    tagline: "Brand polish — design GUI + commerce & developer APIs",
    kind: "website",
    tier: "premium",
    priority: 8,
    phase: 1,
    hostFamily: "web",
    costMonthly: 33,
    networkCostMonthly: 12,
    markupPercent: 205,
    bestBusiness: ["portfolio", "restaurant", "personal", "blog", "local-service"],
    bestGoals: ["brand", "bookings", "content", "leads"],
    strengths: ["Visual polish", "Galleries", "Scheduling"],
    apiGuiLine: "Brand design GUI · commerce & developer API",
    features: ["Auraxir elite production brand", "Premium brand layouts", "Gallery & portfolio", "Scheduling patterns"],
    capacity: "Creatives & service brands",
    skillFit: ["none", "some"],
    whyPremium: "Consistently elite brand-site host.",
    whyElite: "Premium brand host with production APIs.",
  }),
  builder({
    id: "hubspot-cms",
    vendorName: "HubSpot CMS",
    productName: "Auraxir Growth Hub",
    tagline: "Growth sites — CMS GUI + CRM & Hub APIs",
    kind: "website",
    tier: "flagship",
    priority: 9,
    phase: 1,
    hostFamily: "web",
    costMonthly: 89,
    networkCostMonthly: 28,
    markupPercent: 165,
    bestBusiness: ["saas", "agency", "nonprofit", "ecommerce"],
    bestGoals: ["leads", "sales", "content", "community"],
    strengths: ["CRM-connected CMS", "Hub APIs", "Marketing ops"],
    apiGuiLine: "CMS design GUI · CRM & Hub APIs",
    features: ["Auraxir elite production brand", "Growth-oriented CMS", "Form & CRM paths", "Content ops at scale"],
    capacity: "Inbound-led growth brands",
    skillFit: ["some", "dev"],
    whyPremium: "Best host when marketing + CRM must connect.",
    whyElite: "Premium growth host — GUI + deep CRM APIs.",
  }),

  // ── Commerce ──────────────────────────────────────────
  builder({
    id: "shopify",
    vendorName: "Shopify",
    productName: "Auraxir Commerce",
    tagline: "Elite storefronts — admin GUI + Storefront & Admin API",
    kind: "commerce",
    tier: "flagship",
    priority: 10,
    phase: 1,
    hostFamily: "commerce",
    costMonthly: 79,
    networkCostMonthly: 25,
    markupPercent: 170,
    bestBusiness: ["ecommerce", "retail"],
    bestGoals: ["sales"],
    strengths: ["Admin GUI", "Storefront API", "Checkout"],
    apiGuiLine: "Commerce admin GUI · Storefront & Admin API",
    features: ["Auraxir elite production brand", "Production storefront", "Cart & checkout", "Inventory-ready patterns"],
    capacity: "Serious retail volume",
    skillFit: ["none", "some", "dev"],
    whyPremium: "Gold-standard commerce host.",
    whyElite: "Best commerce host — GUI + full commerce APIs.",
  }),
  builder({
    id: "bigcommerce",
    vendorName: "BigCommerce",
    productName: "Auraxir Commerce Max",
    tagline: "Enterprise stores — control panel GUI + open API",
    kind: "commerce",
    tier: "flagship",
    priority: 11,
    phase: 1,
    hostFamily: "commerce",
    costMonthly: 99,
    networkCostMonthly: 30,
    markupPercent: 160,
    bestBusiness: ["ecommerce", "retail", "saas"],
    bestGoals: ["sales", "brand"],
    strengths: ["Open API", "Multi-channel", "Enterprise catalog"],
    apiGuiLine: "Store control GUI · open REST API",
    features: ["Auraxir elite production brand", "Enterprise catalog tools", "Multi-channel commerce", "Headless-ready storefronts"],
    capacity: "High-SKU enterprise retail",
    skillFit: ["some", "dev"],
    whyPremium: "Enterprise commerce host with open APIs.",
    whyElite: "Premium commerce host for complex catalogs + API.",
  }),

  // ── Apps ──────────────────────────────────────────────
  builder({
    id: "bubble",
    vendorName: "Bubble",
    productName: "Auraxir App Lab",
    tagline: "Web apps — visual logic GUI + API connector",
    kind: "app",
    tier: "flagship",
    priority: 12,
    phase: 1,
    hostFamily: "app",
    costMonthly: 119,
    networkCostMonthly: 39,
    markupPercent: 155,
    bestBusiness: ["saas", "agency", "nonprofit"],
    bestGoals: ["community", "leads", "sales"],
    strengths: ["Visual workflows", "Database", "API connector"],
    apiGuiLine: "Visual app GUI · API connector & data API",
    features: ["Auraxir elite production brand", "Visual app logic", "User accounts & roles", "Workflow automation"],
    capacity: "Production web apps & marketplaces",
    skillFit: ["some", "dev"],
    whyPremium: "Leading visual app host.",
    whyElite: "Best visual app host — GUI + data + API.",
  }),
  builder({
    id: "outsystems",
    vendorName: "OutSystems",
    productName: "Auraxir Enterprise App",
    tagline: "Enterprise apps — low-code GUI + full integration APIs",
    kind: "app",
    tier: "flagship",
    priority: 13,
    phase: 1,
    hostFamily: "enterprise",
    costMonthly: 199,
    networkCostMonthly: 55,
    markupPercent: 140,
    bestBusiness: ["saas", "agency", "ecommerce", "nonprofit"],
    bestGoals: ["community", "sales", "leads"],
    strengths: ["Enterprise low-code", "Integration fabric", "Scale"],
    apiGuiLine: "Enterprise low-code GUI · integration APIs",
    features: ["Auraxir elite production brand", "Enterprise visual development", "System integrations", "Mission-critical scale"],
    capacity: "Enterprise application portfolios",
    skillFit: ["some", "dev"],
    whyPremium: "Top enterprise application host.",
    whyElite: "Absolute premium enterprise host — GUI + deep APIs.",
  }),

  // ── Mobile ────────────────────────────────────────────
  builder({
    id: "flutterflow",
    vendorName: "FlutterFlow",
    productName: "Auraxir Mobile Lab",
    tagline: "Native mobile — visual GUI + REST/Firebase APIs",
    kind: "app",
    tier: "flagship",
    priority: 14,
    phase: 1,
    hostFamily: "mobile",
    costMonthly: 99,
    networkCostMonthly: 35,
    markupPercent: 160,
    bestBusiness: ["saas", "ecommerce", "local-service", "nonprofit"],
    bestGoals: ["community", "sales", "bookings"],
    strengths: ["Native iOS/Android", "API bindings", "Code export"],
    apiGuiLine: "Mobile design GUI · REST / Firebase / custom API",
    features: ["Auraxir elite production brand", "Native mobile path", "Store-ready structure", "Backend integrations"],
    capacity: "Consumer & ops mobile apps",
    skillFit: ["some", "dev"],
    whyPremium: "Leading native mobile host.",
    whyElite: "Best native mobile host — GUI + real backends.",
  }),
  builder({
    id: "draftbit",
    vendorName: "Draftbit",
    productName: "Auraxir Native Studio",
    tagline: "Mobile product UI — screen GUI + REST APIs",
    kind: "app",
    tier: "premium",
    priority: 15,
    phase: 1,
    hostFamily: "mobile",
    costMonthly: 89,
    networkCostMonthly: 32,
    markupPercent: 165,
    bestBusiness: ["saas", "ecommerce", "agency"],
    bestGoals: ["community", "sales", "brand"],
    strengths: ["Screen GUI", "API lists", "Native export"],
    apiGuiLine: "Screen builder GUI · REST API data sources",
    features: ["Auraxir elite production brand", "Visual native screens", "API-powered lists", "Mobile theme systems"],
    capacity: "Product-grade mobile UX",
    skillFit: ["some", "dev"],
    whyPremium: "Premium mobile UI host.",
    whyElite: "Absolute premium mobile — GUI bound to APIs.",
  }),
  builder({
    id: "bravo",
    vendorName: "Bravo Studio",
    productName: "Auraxir Design-to-Device",
    tagline: "Design-to-native — Figma-class GUI path + API data",
    kind: "app",
    tier: "premium",
    priority: 16,
    phase: 1,
    hostFamily: "mobile",
    costMonthly: 79,
    networkCostMonthly: 28,
    markupPercent: 170,
    bestBusiness: ["saas", "agency", "portfolio", "ecommerce"],
    bestGoals: ["brand", "community", "sales"],
    strengths: ["Design-first mobile", "API data", "Rapid native"],
    apiGuiLine: "Design-to-native GUI · REST API data",
    features: ["Auraxir elite production brand", "Design-first mobile flows", "API-bound screens", "Rapid native previews"],
    capacity: "Design-led mobile products",
    skillFit: ["some", "dev"],
    whyPremium: "Best design-to-device mobile host.",
    whyElite: "Premium mobile host from design GUI + APIs.",
  }),

  // ── Ops / internal ────────────────────────────────────
  builder({
    id: "retool",
    vendorName: "Retool",
    productName: "Auraxir Ops Console",
    tagline: "Internal tools — admin GUI + SQL/REST/GraphQL",
    kind: "ops",
    tier: "flagship",
    priority: 17,
    phase: 1,
    hostFamily: "ops",
    costMonthly: 129,
    networkCostMonthly: 45,
    markupPercent: 150,
    bestBusiness: ["saas", "agency", "ecommerce", "retail"],
    bestGoals: ["community", "sales", "leads"],
    strengths: ["Admin GUI", "SQL/REST/GraphQL", "Roles"],
    apiGuiLine: "Ops admin GUI · SQL / REST / GraphQL",
    features: ["Auraxir elite production brand", "Visual internal tools", "Database & API connectors", "Role-based access"],
    capacity: "Mission-critical internal ops",
    skillFit: ["some", "dev"],
    whyPremium: "Leading internal-tools host.",
    whyElite: "Best ops host — GUI + every serious data API.",
  }),
  builder({
    id: "superblocks",
    vendorName: "Superblocks",
    productName: "Auraxir Control Room",
    tagline: "Enterprise ops apps — visual GUI + multi-API fabric",
    kind: "ops",
    tier: "flagship",
    priority: 18,
    phase: 1,
    hostFamily: "ops",
    costMonthly: 139,
    networkCostMonthly: 48,
    markupPercent: 148,
    bestBusiness: ["saas", "ecommerce", "agency", "retail"],
    bestGoals: ["sales", "community", "leads"],
    strengths: ["Enterprise ops UI", "Multi-API", "Governance"],
    apiGuiLine: "Control-room GUI · multi-API integrations",
    features: ["Auraxir elite production brand", "Enterprise ops builder", "Multi-system integrations", "Governance-ready access"],
    capacity: "Enterprise control surfaces",
    skillFit: ["some", "dev"],
    whyPremium: "Enterprise ops host for multi-system work.",
    whyElite: "Premium control-room host — GUI + multi-API fabric.",
  }),
  // ── Adult (18+) — best explicit-capable lines; Auraxir brand overlay only ──
  // Customer operates content. Auraxir does not operate the site.
  builder({
    id: "modelcentro",
    vendorName: "ModelCentro",
    productName: "Auraxir Velvet Site",
    tagline: "Adult creator sites (18+) — pro GUI + commerce API",
    kind: "website",
    tier: "flagship",
    priority: 19,
    phase: 1,
    hostFamily: "adult",
    adultCapable: true,
    costMonthly: 69,
    networkCostMonthly: 28,
    markupPercent: 185,
    bestBusiness: ["adult-creator", "adult-studio", "adult-commerce", "portfolio"],
    bestGoals: ["brand", "sales", "community"],
    strengths: ["Performer sites", "Media galleries", "Adult billing patterns"],
    apiGuiLine: "Adult site GUI · media & billing API",
    features: [
      "Auraxir brand overlay only",
      "18+ production line",
      "Gallery & membership patterns",
      "You operate content — not Auraxir",
    ],
    qualityExtras: ["Age-gate ready layout", "Brand polish only — no content control"],
    capacity: "Independent adult creators & small studios",
    skillFit: ["none", "some"],
    whyPremium: "Top-tier adult creator site host.",
    whyElite: "Best adult site line — GUI + API; customer owns all content.",
  }),
  builder({
    id: "fansly",
    vendorName: "Fansly",
    productName: "Auraxir After Dark",
    tagline: "Adult fan platform (18+) — creator GUI + platform API",
    kind: "app",
    tier: "flagship",
    priority: 20,
    phase: 1,
    hostFamily: "adult",
    adultCapable: true,
    costMonthly: 79,
    networkCostMonthly: 45,
    markupPercent: 160,
    bestBusiness: ["adult-creator", "adult-community", "adult-studio"],
    bestGoals: ["community", "sales", "brand"],
    strengths: ["Fan subscriptions", "Media tiers", "Creator tools"],
    apiGuiLine: "Creator GUI · platform & media API",
    features: [
      "Auraxir brand overlay only",
      "18+ fan platform patterns",
      "Subscription & tip paths",
      "Customer is sole content operator",
    ],
    qualityExtras: ["18+ access patterns", "No Auraxir content control"],
    capacity: "Fan communities at scale",
    skillFit: ["none", "some"],
    whyPremium: "Leading adult fan platform line.",
    whyElite: "Premium adult platform — brand on top; you own the content.",
  }),
  builder({
    id: "onlyfans-platform",
    vendorName: "OnlyFans",
    productName: "Auraxir Private Club",
    tagline: "Exclusive adult membership (18+) — platform GUI + API",
    kind: "app",
    tier: "flagship",
    priority: 21,
    phase: 1,
    hostFamily: "adult",
    adultCapable: true,
    costMonthly: 89,
    networkCostMonthly: 49,
    markupPercent: 155,
    bestBusiness: ["adult-creator", "adult-community", "adult-studio"],
    bestGoals: ["community", "sales"],
    strengths: ["Exclusive membership", "PPV media", "Global fans"],
    apiGuiLine: "Membership GUI · creator platform API",
    features: [
      "Auraxir brand overlay only",
      "18+ exclusive club patterns",
      "PPV & subscription structure",
      "You are solely responsible for content",
    ],
    qualityExtras: ["Brand chrome only", "Content liability stays with customer"],
    capacity: "High-volume creator audiences",
    skillFit: ["none", "some"],
    whyPremium: "Best-known exclusive adult membership host.",
    whyElite: "Flagship adult membership line — overlay only; you operate content.",
  }),
  builder({
    id: "loyalfans",
    vendorName: "LoyalFans",
    productName: "Auraxir Intimate",
    tagline: "Adult creator commerce (18+) — studio GUI + sales API",
    kind: "commerce",
    tier: "premium",
    priority: 22,
    phase: 1,
    hostFamily: "adult",
    adultCapable: true,
    costMonthly: 39,
    networkCostMonthly: 32,
    markupPercent: 175,
    bestBusiness: ["adult-creator", "adult-commerce", "adult-studio"],
    bestGoals: ["sales", "community", "brand"],
    strengths: ["Clips & customs", "Live", "Storefront"],
    apiGuiLine: "Creator commerce GUI · sales API",
    features: [
      "Auraxir brand overlay only",
      "18+ commerce patterns",
      "Clips, customs, live paths",
      "Customer operates all content",
    ],
    qualityExtras: ["Age-aware UX", "No operator role for Auraxir"],
    capacity: "Creator commerce catalogs",
    skillFit: ["none", "some"],
    whyPremium: "Strong adult creator commerce host.",
    whyElite: "Premium adult commerce — brand on top; content is yours.",
  }),
  builder({
    id: "manyvids",
    vendorName: "ManyVids",
    productName: "Auraxir Clip House",
    tagline: "Adult video commerce (18+) — store GUI + catalog API",
    kind: "commerce",
    tier: "premium",
    priority: 23,
    phase: 1,
    hostFamily: "adult",
    adultCapable: true,
    costMonthly: 29,
    networkCostMonthly: 30,
    markupPercent: 180,
    bestBusiness: ["adult-creator", "adult-commerce", "adult-studio"],
    bestGoals: ["sales", "brand"],
    strengths: ["Clip storefronts", "Catalog scale", "Creator tools"],
    apiGuiLine: "Clip store GUI · catalog & sales API",
    features: [
      "Auraxir brand overlay only",
      "18+ video commerce",
      "Catalog & discovery patterns",
      "You control and own all media content",
    ],
    qualityExtras: ["Presentation polish only", "Content remains customer-owned"],
    capacity: "Clip and video catalogs",
    skillFit: ["none", "some"],
    whyPremium: "Major adult video commerce host.",
    whyElite: "Best clip-commerce line — overlay only; you are responsible for content.",
  }),
  builder({
    id: "avnstars",
    vendorName: "AVN Stars",
    productName: "Auraxir Spotlight X",
    tagline: "Adult star platform (18+) — profile GUI + fan API",
    kind: "app",
    tier: "premium",
    priority: 24,
    phase: 1,
    hostFamily: "adult",
    adultCapable: true,
    costMonthly: 35,
    networkCostMonthly: 34,
    markupPercent: 170,
    bestBusiness: ["adult-creator", "adult-studio", "adult-community"],
    bestGoals: ["brand", "community", "sales"],
    strengths: ["Star profiles", "Fan engagement", "Industry presence"],
    apiGuiLine: "Star profile GUI · fan engagement API",
    features: [
      "Auraxir brand overlay only",
      "18+ star presence",
      "Fan engagement patterns",
      "Customer alone is content operator",
    ],
    qualityExtras: ["Image-first presence", "Zero Auraxir content ownership"],
    capacity: "Industry-facing adult brands",
    skillFit: ["none", "some"],
    whyPremium: "Industry star platform line.",
    whyElite: "Premium adult star host — brand on top; content risk is yours.",
  }),

];

export const PHASE1_BUILDERS = PREMIUM_BUILDERS.filter(
  (b) => b.phase === 1 && b.elite && b.hasProGui && b.hasPublicApi && b.realProduction,
);

export function getBuilder(id: BuilderId | string): PremiumBuilder {
  return PHASE1_BUILDERS.find((b) => b.id === id) ?? PHASE1_BUILDERS[0]!;
}

export function buildersByKind(kind: BuilderKind | "all" = "all") {
  if (kind === "all") return PHASE1_BUILDERS;
  if (kind === "website") {
    return PHASE1_BUILDERS.filter((b) => b.kind === "website" || b.kind === "commerce");
  }
  if (kind === "app") {
    return PHASE1_BUILDERS.filter((b) => b.kind === "app" || b.kind === "ops");
  }
  return PHASE1_BUILDERS.filter((b) => b.kind === kind);
}

export function buildersByHostFamily(family: PremiumBuilder["hostFamily"]) {
  return PHASE1_BUILDERS.filter((b) => b.hostFamily === family);
}

export const HIDDEN_VENDOR_NAMES = PREMIUM_BUILDERS.map((b) => b.vendorName);

export function leaksVendor(text: string): boolean {
  return HIDDEN_VENDOR_NAMES.some((v) => new RegExp(v, "i").test(text));
}

export function operatorCostMonthly(b: PremiumBuilder) {
  return b.costMonthly + b.networkCostMonthly;
}

export const API_GUI_ADMISSION =
  "Every Auraxir line is absolute premium: pro design GUI + real API. Best builds across many production hosts — one Auraxir name for you.";

export const HOST_NETWORK_SUMMARY = {
  total: PHASE1_BUILDERS.length,
  families: ["web", "commerce", "app", "mobile", "ops", "enterprise", "adult"] as const,
  promise: "We pick the best build host for your needs — including adult-capable lines. You only see Auraxir. You own your content.",
};
