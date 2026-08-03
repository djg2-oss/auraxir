import { BRAND } from "./brand";
import {
  type BuilderId,
  getBuilder,
  operatorCostMonthly,
  type PremiumBuilder,
  PHASE1_BUILDERS,
} from "./builders";
import type { NetworkCapability } from "./elite";
import { emptyLookFeel, type LookFeelPrefs } from "./g2p-ai";

export type { BuilderId, PremiumBuilder };
export { getBuilder, PHASE1_BUILDERS };

export type BusinessType =
  | "restaurant"
  | "retail"
  | "saas"
  | "portfolio"
  | "agency"
  | "nonprofit"
  | "blog"
  | "local-service"
  | "ecommerce"
  | "personal"
  | "adult-creator"
  | "adult-studio"
  | "adult-commerce"
  | "adult-community";

export type Goal =
  | "leads"
  | "sales"
  | "bookings"
  | "brand"
  | "content"
  | "community";

export type TrafficLevel = "low" | "medium" | "high" | "global";
export type Budget = "starter" | "growth" | "scale";
export type Skill = "none" | "some" | "dev";
export type ProductIntent = "website" | "app" | "both";

export type HostPlanId = BuilderId;

export type SiteTypeId =
  | "brochure"
  | "storefront"
  | "booking"
  | "product-saas"
  | "portfolio-pro"
  | "magazine"
  | "community-hub"
  | "service-local"
  | "web-app"
  | "mobile-app"
  | "adult-presence"
  | "adult-platform";

export interface HostPlan {
  id: BuilderId;
  name: string;
  tagline: string;
  engineCostMonthly: number;
  networkCostMonthly: number;
  costMonthly: number;
  vendorName: string;
  infraProvider: string;
  priceMonthly: number;
  bestFor: string;
  features: string[];
  qualityExtras: string[];
  network: NetworkCapability[];
  capacity: string;
  performance: "standard" | "fast" | "edge";
  kind: PremiumBuilder["kind"];
  tier: PremiumBuilder["tier"];
  elite: true;
  priority: number;
  ssl: boolean;
  cdn: boolean;
  staging: boolean;
  vpn: boolean;
  tunneling: boolean;
  adultCapable?: boolean;
  support: string;
}

export interface SiteType {
  id: SiteTypeId;
  name: string;
  description: string;
  product: "website" | "app";
  bestBusiness: BusinessType[];
  bestGoals: Goal[];
  preferredBuilders: BuilderId[];
  sections: string[];
  defaultTheme: ThemeTokens;
  defaultPages: string[];
}

export interface ThemeTokens {
  primary: string;
  accent: string;
  surface: string;
  text: string;
  muted: string;
  radius: "sharp" | "soft" | "round";
  font: "serif" | "sans" | "display";
}

export interface NeedsAnswers {
  businessName: string;
  businessType: BusinessType | null;
  productIntent: ProductIntent | null;
  goals: Goal[];
  traffic: TrafficLevel | null;
  budget: Budget | null;
  skill: Skill | null;
  features: string[];
  needsSecureNetwork: boolean;
  /** Dual FE/BE always-on services when continuous uptime is required */
  needsAlwaysOn: boolean;
  description: string;
  /** Auraxir G2P AI look & feel preferences */
  lookFeel: LookFeelPrefs;
  /** Customer accepted: Auraxir is overlay only; customer owns content */
  contentResponsibilityAccepted: boolean;
}

export interface SiteSection {
  id: string;
  type:
    | "hero"
    | "features"
    | "about"
    | "services"
    | "gallery"
    | "testimonials"
    | "pricing"
    | "cta"
    | "contact"
    | "footer";
  title: string;
  subtitle: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  items: { title: string; body: string }[];
  visible: boolean;
  /** Auraxir seamless enhancement page */
  isTieIn?: boolean;
  pageSlug?: string;
  enhancementId?: string;
}

export interface SiteProject {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  needs: NeedsAnswers;
  siteTypeId: SiteTypeId;
  hostPlanId: BuilderId;
  builderId: BuilderId;
  theme: ThemeTokens;
  sections: SiteSection[];
  domain: string;
  published: boolean;
  priceMonthly: number;
  setupFee: number;
  qualityPassed: boolean;
  secureNetworkEnabled: boolean;
  alwaysOnTier?: "standard" | "dual" | "max";
  alwaysOnAddOnMonthly?: number;
  /** G2P AI applied system */
  g2pStyleId?: string;
  g2pStyleName?: string;
  g2pConfidence?: number;
  /** Applied Auraxir tie-in module ids */
  tieInIds?: string[];
  /** Adult (18+) vertical — brand overlay only; customer owns content */
  adultVertical?: boolean;
  /** Customer accepted content responsibility */
  contentResponsibilityAccepted?: boolean;
  shieldTier?: "core" | "shield" | "shield-max";
  shieldAddOnMonthly?: number;
  shieldScore?: number;
}




export const BUSINESS_TYPES: { id: BusinessType; label: string; blurb: string }[] = [
  { id: "restaurant", label: "Restaurant & Food", blurb: "Menus, hours, reservations" },
  { id: "retail", label: "Retail Shop", blurb: "Products, locations, hours" },
  { id: "ecommerce", label: "Online Store", blurb: "Catalog, cart, checkout" },
  { id: "saas", label: "SaaS / Software", blurb: "Product, pricing, real app" },
  { id: "portfolio", label: "Portfolio", blurb: "Work samples, bio, contact" },
  { id: "agency", label: "Agency / Studio", blurb: "Services, case studies, leads" },
  { id: "nonprofit", label: "Nonprofit", blurb: "Mission, donate, events" },
  { id: "blog", label: "Blog / Media", blurb: "Articles, newsletter, ads" },
  { id: "local-service", label: "Local Service", blurb: "Plumbing, salon, gym, etc." },
  { id: "personal", label: "Personal Brand", blurb: "Bio, links, speaking" },
  { id: "adult-creator", label: "Adult creator (18+)", blurb: "Independent adult content — you own content" },
  { id: "adult-studio", label: "Adult studio (18+)", blurb: "Studio / multi-performer — you operate" },
  { id: "adult-commerce", label: "Adult commerce (18+)", blurb: "Adult products & digital sales" },
  { id: "adult-community", label: "Adult community (18+)", blurb: "Fan membership — you run content" },
];

export const PRODUCT_INTENTS: {
  id: ProductIntent;
  label: string;
  blurb: string;
}[] = [
  {
    id: "website",
    label: "Elite website",
    blurb: "Real production site — flagship web lines only",
  },
  {
    id: "app",
    label: "Highest-quality app",
    blurb: "Real web or native app — accounts, logic, mobile",
  },
  {
    id: "both",
    label: "Website + app",
    blurb: "Elite marketing site plus real product app",
  },
];

export const GOALS: { id: Goal; label: string; blurb: string }[] = [
  { id: "leads", label: "Generate leads", blurb: "Forms, CTAs, CRM-ready" },
  { id: "sales", label: "Sell products", blurb: "Real checkout paths" },
  { id: "bookings", label: "Take bookings", blurb: "Appointments & calendars" },
  { id: "brand", label: "Build brand", blurb: "Story, visuals, trust" },
  { id: "content", label: "Publish content", blurb: "Blog, news, SEO" },
  { id: "community", label: "Grow community", blurb: "Members, real app access" },
];

export const FEATURE_OPTIONS = [
  { id: "contact-form", label: "Contact form" },
  { id: "blog", label: "Blog / news" },
  { id: "shop", label: "Online shop" },
  { id: "booking", label: "Online booking" },
  { id: "gallery", label: "Photo gallery" },
  { id: "pricing", label: "Pricing tables" },
  { id: "testimonials", label: "Testimonials" },
  { id: "map", label: "Map / locations" },
  { id: "newsletter", label: "Newsletter signup" },
  { id: "membership", label: "Membership / accounts" },
  { id: "workflows", label: "App workflows / logic" },
  { id: "mobile-native", label: "Native mobile app" },
  { id: "secure-network", label: "VPN / secure tunneling" },
  { id: "analytics", label: "Analytics dashboard" },
  { id: "api-integration", label: "API integrations" },
  { id: "pro-gui", label: "Pro design GUI" },
  { id: "always-on", label: "Always online (dual FE + BE)" },
  { id: "dual-frontend", label: "Dual frontend service" },
  { id: "dual-backend", label: "Dual backend service" },
  { id: "adult-18", label: "Adult / explicit (18+)" },
  { id: "age-gate", label: "Age gate (18+)" },
  { id: "creator-tips", label: "Tips & subscriptions" },
  { id: "private-media", label: "Private media vault" },
  { id: "shield", label: "Auraxir Shield security" },
  { id: "shield-max", label: "Auraxir Shield Max" },
  { id: "elite-encryption", label: "Elite encryption stack" },
];

export const TRAFFIC_LEVELS: { id: TrafficLevel; label: string; blurb: string }[] = [
  { id: "low", label: "Getting started", blurb: "Under 5k visits / month" },
  { id: "medium", label: "Growing", blurb: "5k–50k visits / month" },
  { id: "high", label: "Busy", blurb: "50k–500k visits / month" },
  { id: "global", label: "Global scale", blurb: "500k+ / multi-region" },
];

export const BUDGETS: { id: Budget; label: string; blurb: string }[] = [
  { id: "starter", label: "Elite entry", blurb: "Entry to elite — still premium" },
  { id: "growth", label: "Growth", blurb: "Serious brands · higher standard" },
  { id: "scale", label: "Scale", blurb: "Top-tier elite · secure when needed" },
];

export const SKILLS: { id: Skill; label: string; blurb: string }[] = [
  { id: "none", label: "No code", blurb: "Simple self-serve on Auraxir" },
  { id: "some", label: "Comfortable with tools", blurb: "I can drive a pro builder" },
  { id: "dev", label: "Developer / designer", blurb: "Maximum control" },
];

function toHostPlan(b: PremiumBuilder): HostPlan {
  const costMonthly = operatorCostMonthly(b);
  return {
    id: b.id,
    name: b.productName,
    tagline: b.tagline,
    engineCostMonthly: b.costMonthly,
    networkCostMonthly: b.networkCostMonthly,
    costMonthly,
    vendorName: b.vendorName,
    infraProvider: b.vendorName,
    priceMonthly: b.priceMonthly,
    bestFor: b.bestBusiness.join(", "),
    features: b.features,
    qualityExtras: b.qualityExtras,
    network: b.network,
    capacity: b.capacity,
    performance: b.tier === "flagship" ? "edge" : "fast",
    kind: b.kind,
    tier: b.tier,
    elite: true,
    priority: b.priority,
    ssl: true,
    cdn: true,
    staging: true,
    vpn: b.network.some((n) => n.id === "vpn-access" || n.id === "zero-trust"),
    tunneling: b.network.some((n) => n.id.includes("tunnel")),
    adultCapable: b.adultCapable,
    support: "Auraxir elite concierge",
  };
}

export const HOST_PLANS: HostPlan[] = PHASE1_BUILDERS.map(toHostPlan).sort(
  (a, b) => a.priority - b.priority,
);

export function getHostPlan(id: HostPlanId | string): HostPlan {
  return toHostPlan(getBuilder(id));
}

const baseTheme = (partial: Partial<ThemeTokens>): ThemeTokens => ({
  primary: "#1a1a1c",
  accent: "#2f6fed",
  surface: "#f7f6f3",
  text: "#141416",
  muted: "#6b6b76",
  radius: "soft",
  font: "sans",
  ...partial,
});

export const SITE_TYPES: SiteType[] = [
  {
    id: "brochure",
    name: "Brand Brochure",
    description: "Elite multi-section marketing site for trust and inquiries.",
    product: "website",
    bestBusiness: ["agency", "nonprofit", "personal", "retail"],
    bestGoals: ["brand", "leads"],
    preferredBuilders: ["webflow", "framer", "hubspot-cms", "squarespace"],
    sections: ["hero", "about", "services", "testimonials", "cta", "contact", "footer"],
    defaultTheme: baseTheme({ accent: "#1f4fd6", surface: "#f5f4f0", font: "serif" }),
    defaultPages: ["Home", "About", "Contact"],
  },
  {
    id: "storefront",
    name: "Storefront",
    description: "Real commerce layout — Auraxir Commerce production checkout.",
    product: "website",
    bestBusiness: ["ecommerce", "retail"],
    bestGoals: ["sales"],
    preferredBuilders: ["shopify", "bigcommerce", "builder-io"],
    sections: ["hero", "features", "gallery", "pricing", "testimonials", "cta", "footer"],
    defaultTheme: baseTheme({ accent: "#0f766e", surface: "#f8faf9", radius: "round" }),
    defaultPages: ["Home", "Shop", "About", "Cart"],
  },
  {
    id: "booking",
    name: "Booking Site",
    description: "Service schedule focused — hours, offerings, book-now paths.",
    product: "website",
    bestBusiness: ["restaurant", "local-service"],
    bestGoals: ["bookings", "leads"],
    preferredBuilders: ["duda", "wix-studio", "squarespace"],
    sections: ["hero", "services", "gallery", "testimonials", "cta", "contact", "footer"],
    defaultTheme: baseTheme({ accent: "#b45309", surface: "#faf7f2", font: "display" }),
    defaultPages: ["Home", "Services", "Book", "Contact"],
  },
  {
    id: "product-saas",
    name: "Product Launch",
    description: "SaaS-style landing with features, pricing, conversion focus.",
    product: "website",
    bestBusiness: ["saas"],
    bestGoals: ["leads", "sales", "brand"],
    preferredBuilders: ["bubble", "outsystems", "weweb"],
    sections: ["hero", "features", "pricing", "testimonials", "cta", "footer"],
    defaultTheme: baseTheme({
      primary: "#0b0b0f",
      accent: "#3b82f6",
      surface: "#0f1115",
      text: "#eef0f4",
      muted: "#9aa0ad",
      radius: "soft",
    }),
    defaultPages: ["Home", "Features", "Pricing", "Docs"],
  },
  {
    id: "portfolio-pro",
    name: "Portfolio Pro",
    description: "Visual work grid with about, process, and hire CTAs.",
    product: "website",
    bestBusiness: ["portfolio", "agency", "personal"],
    bestGoals: ["brand", "leads"],
    preferredBuilders: ["framer", "squarespace", "plasmic"],
    sections: ["hero", "gallery", "about", "services", "cta", "contact", "footer"],
    defaultTheme: baseTheme({
      accent: "#111827",
      surface: "#fafafa",
      radius: "sharp",
      font: "display",
    }),
    defaultPages: ["Work", "About", "Contact"],
  },
  {
    id: "magazine",
    name: "Editorial Magazine",
    description: "Content-first layout for blogs, newsletters, media brands.",
    product: "website",
    bestBusiness: ["blog", "nonprofit", "personal"],
    bestGoals: ["content", "community", "brand"],
    preferredBuilders: ["webflow", "hubspot-cms", "builder-io"],
    sections: ["hero", "features", "about", "cta", "footer"],
    defaultTheme: baseTheme({ accent: "#9f1239", surface: "#fffdf8", font: "serif" }),
    defaultPages: ["Home", "Articles", "Topics", "About"],
  },
  {
    id: "community-hub",
    name: "Community Hub",
    description: "Events, membership — escalates to real App Lab when needed.",
    product: "website",
    bestBusiness: ["nonprofit", "blog", "saas"],
    bestGoals: ["community", "content", "leads"],
    preferredBuilders: ["bubble", "outsystems", "retool"],
    sections: ["hero", "features", "testimonials", "pricing", "cta", "contact", "footer"],
    defaultTheme: baseTheme({ accent: "#166534", surface: "#f4f7f4", radius: "round" }),
    defaultPages: ["Home", "Events", "Join", "About"],
  },
  {
    id: "service-local",
    name: "Local Authority",
    description: "Local SEO-friendly service site with trust blocks and contact.",
    product: "website",
    bestBusiness: ["local-service", "restaurant", "retail"],
    bestGoals: ["leads", "bookings", "brand"],
    preferredBuilders: ["duda", "wix-studio", "squarespace"],
    sections: ["hero", "services", "about", "testimonials", "cta", "contact", "footer"],
    defaultTheme: baseTheme({ accent: "#1d4ed8", surface: "#f6f8fc" }),
    defaultPages: ["Home", "Services", "Areas", "Contact"],
  },
  {
    id: "web-app",
    name: "Web App Shell",
    description: "Highest-quality app structure — accounts, workflows, dashboards.",
    product: "app",
    bestBusiness: ["saas", "agency", "nonprofit"],
    bestGoals: ["community", "sales", "leads"],
    preferredBuilders: ["bubble", "outsystems", "superblocks"],
    sections: ["hero", "features", "pricing", "testimonials", "cta", "footer"],
    defaultTheme: baseTheme({
      primary: "#0c0c12",
      accent: "#8b5cf6",
      surface: "#111118",
      text: "#f3f2f8",
      muted: "#a1a0b0",
    }),
    defaultPages: ["Home", "Product", "Pricing", "Login"],
  },
  {
    id: "mobile-app",
    name: "Mobile App Shell",
    description: "Native mobile-first product for real iOS & Android.",
    product: "app",
    bestBusiness: ["saas", "ecommerce", "local-service", "nonprofit"],
    bestGoals: ["community", "sales", "bookings"],
    preferredBuilders: ["flutterflow", "draftbit", "bravo"],
    sections: ["hero", "features", "gallery", "cta", "contact", "footer"],
    defaultTheme: baseTheme({
      primary: "#0a0a0b",
      accent: "#06b6d4",
      surface: "#0f1419",
      text: "#ecfeff",
      muted: "#94a3b8",
      radius: "round",
    }),
    defaultPages: ["Home", "Features", "Download", "Support"],
  },
  {
    id: "adult-presence",
    name: "Adult Presence (18+)",
    description: "Premium 18+ creator / brand presence. Auraxir brand overlay only — you own all content.",
    product: "website",
    bestBusiness: ["adult-creator", "adult-studio", "adult-commerce", "portfolio"],
    bestGoals: ["brand", "sales", "community", "leads"],
    preferredBuilders: ["modelcentro", "fansly", "loyalfans", "onlyfans-platform"],
    sections: ["hero", "about", "gallery", "pricing", "cta", "contact", "footer"],
    defaultTheme: baseTheme({ primary: "#0a0a0c", accent: "#c45c8a", surface: "#121014", text: "#f6f0f3", muted: "#9a8f96", font: "display" }),
    defaultPages: ["Home", "Vault", "Join"],
  },
  {
    id: "adult-platform",
    name: "Adult Platform (18+)",
    description: "Membership / fan platform layout for explicit adult businesses. You operate content — not Auraxir.",
    product: "app",
    bestBusiness: ["adult-creator", "adult-community", "adult-studio", "adult-commerce"],
    bestGoals: ["community", "sales", "brand"],
    preferredBuilders: ["fansly", "onlyfans-platform", "manyvids", "loyalfans"],
    sections: ["hero", "features", "pricing", "testimonials", "cta", "contact", "footer"],
    defaultTheme: baseTheme({ primary: "#0c0a10", accent: "#e85d8e", surface: "#141018", text: "#f8f2f5", muted: "#a0909a", font: "sans" }),
    defaultPages: ["Home", "Members", "Billing"],
  },

];

export function emptyNeeds(): NeedsAnswers {
  return {
    businessName: "",
    businessType: null,
    productIntent: null,
    goals: [],
    traffic: null,
    budget: null,
    skill: null,
    features: [],
    needsSecureNetwork: false,
    needsAlwaysOn: false,
    contentResponsibilityAccepted: false,
    description: "",
    lookFeel: emptyLookFeel(),
  };
}

export function buildDefaultSections(
  siteType: SiteType,
  businessName: string,
  description: string,
  tone?: { heroSubtitle?: string; ctaDefault?: string },
): SiteSection[] {
  const name = businessName.trim() || "Your Brand";
  const blurb =
    description.trim() ||
    `${name} helps customers get results with a clear, modern presence.`;
  const heroSub = tone?.heroSubtitle ?? siteType.name;
  const cta = tone?.ctaDefault ?? (siteType.product === "app" ? "Get the app" : "Get started");

  const copy: Record<SiteSection["type"], Omit<SiteSection, "id" | "type" | "visible">> = {
    hero: {
      title: name,
      subtitle: heroSub,
      body: blurb,
      ctaLabel: cta,
      ctaHref: "#contact",
      items: [],
    },
    features: {
      title: "Why people choose us",
      subtitle: "Built around what matters",
      body: "",
      ctaLabel: "",
      ctaHref: "",
      items: [
        { title: "Clear value", body: "Visitors understand what you offer in seconds." },
        { title: "Trusted design", body: "Polished layout that feels established and reliable." },
        { title: "Ready to convert", body: "Calls to action placed where decisions happen." },
      ],
    },
    about: {
      title: `About ${name}`,
      subtitle: "Our story",
      body: blurb,
      ctaLabel: "",
      ctaHref: "",
      items: [],
    },
    services: {
      title: "What we offer",
      subtitle: "Services",
      body: "",
      ctaLabel: "",
      ctaHref: "",
      items: [
        { title: "Signature offer", body: "Your flagship product or service, explained simply." },
        { title: "Core package", body: "A mid-tier option for most customers." },
        { title: "Premium care", body: "High-touch support for clients who need more." },
      ],
    },
    gallery: {
      title: "Selected work",
      subtitle: "Gallery",
      body: "Highlight your best projects, products, or moments.",
      ctaLabel: "",
      ctaHref: "",
      items: [
        { title: "Project One", body: "A standout result for a key client." },
        { title: "Project Two", body: "Craft and attention to detail on display." },
        { title: "Project Three", body: "Proof that quality compounds." },
      ],
    },
    testimonials: {
      title: "What clients say",
      subtitle: "Testimonials",
      body: "",
      ctaLabel: "",
      ctaHref: "",
      items: [
        { title: "Alex M.", body: "Professional, fast, and exactly what we needed." },
        { title: "Jordan K.", body: "Our leads doubled within the first month." },
        { title: "Sam R.", body: "Clean design and a process that made sense." },
      ],
    },
    pricing: {
      title: "Simple pricing",
      subtitle: "Plans",
      body: "Transparent options that scale with you.",
      ctaLabel: "",
      ctaHref: "",
      items: [
        { title: "Starter", body: "Essentials for individuals and small teams." },
        { title: "Growth", body: "More capacity, analytics, and priority support." },
        { title: "Scale", body: "Advanced features for serious volume." },
      ],
    },
    cta: {
      title: "Ready when you are",
      subtitle: "Next step",
      body: `Start a conversation with ${name} today.`,
      ctaLabel: "Contact us",
      ctaHref: "#contact",
      items: [],
    },
    contact: {
      title: "Get in touch",
      subtitle: "Contact",
      body: "Tell us about your project. We reply within one business day.",
      ctaLabel: "Send message",
      ctaHref: "#",
      items: [],
    },
    footer: {
      title: name,
      subtitle: "",
      body: `© ${new Date().getFullYear()} ${name}. All rights reserved.`,
      ctaLabel: "",
      ctaHref: "",
      items: [],
    },
  };

  return siteType.sections.map((type) => {
    const t = type as SiteSection["type"];
    return {
      id: uid("sec"),
      type: t,
      visible: true,
      ...copy[t],
    };
  });
}

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export { BRAND };
