/**
 * OPERATOR INTELLIGENCE — host product & security research.
 * Never shown raw to customers. Used to match lines and stack Auraxir Shield on top.
 *
 * Sources synthesized from public trust centers / security docs (2025–2026):
 * SSL/TLS, SOC2, ISO, CDN, WAF baselines vary by host family.
 * Auraxir never markets host names; we sell the composite elite stack.
 */
import type { BuilderId } from "./builders";

export type HostSecurityBaseline = {
  tls: "standard" | "modern" | "enterprise";
  sslAuto: boolean;
  hsts: boolean | "optional";
  cdn: boolean;
  waf: "none" | "basic" | "advanced" | "enterprise";
  ddos: "shared" | "cdn" | "enterprise";
  soc2: boolean;
  iso27001: boolean;
  gdprTools: boolean;
  pciScope: "none" | "saq" | "platform" | "merchant";
  mfaAdmin: boolean | "partial";
  encryptionAtRest: boolean | "partial";
  notes: string[];
};

export type HostProductProfile = {
  builderId: BuilderId;
  /** Internal only */
  vendorName: string;
  productFocus: string;
  bestFor: string[];
  notIdealFor: string[];
  differentiators: string[];
  security: HostSecurityBaseline;
  /** Gaps we close with Auraxir Shield */
  securityGaps: string[];
  comparisonTags: string[];
};

const modernWeb: HostSecurityBaseline = {
  tls: "modern",
  sslAuto: true,
  hsts: true,
  cdn: true,
  waf: "basic",
  ddos: "cdn",
  soc2: true,
  iso27001: true,
  gdprTools: true,
  pciScope: "saq",
  mfaAdmin: true,
  encryptionAtRest: true,
  notes: ["Public trust: SOC2 / TLS / CDN typical for flagship web hosts"],
};

const commerceBase: HostSecurityBaseline = {
  tls: "enterprise",
  sslAuto: true,
  hsts: true,
  cdn: true,
  waf: "advanced",
  ddos: "enterprise",
  soc2: true,
  iso27001: true,
  gdprTools: true,
  pciScope: "platform",
  mfaAdmin: true,
  encryptionAtRest: true,
  notes: ["Checkout paths often PCI-scoped at platform layer"],
};

const appBase: HostSecurityBaseline = {
  tls: "modern",
  sslAuto: true,
  hsts: "optional",
  cdn: true,
  waf: "basic",
  ddos: "shared",
  soc2: true,
  iso27001: false,
  gdprTools: true,
  pciScope: "none",
  mfaAdmin: "partial",
  encryptionAtRest: "partial",
  notes: ["App hosts vary; auth and data model security is largely builder-config"],
};

const adultBase: HostSecurityBaseline = {
  tls: "modern",
  sslAuto: true,
  hsts: "optional",
  cdn: true,
  waf: "basic",
  ddos: "cdn",
  soc2: false,
  iso27001: false,
  gdprTools: true,
  pciScope: "merchant",
  mfaAdmin: "partial",
  encryptionAtRest: "partial",
  notes: [
    "Adult platforms emphasize account isolation and payment processors",
    "Customer remains content operator; Auraxir adds access & transport polish only",
  ],
};

/**
 * Vast comparison map — product differences + security baseline + gaps.
 * Customer never sees vendorName.
 */
export const HOST_INTELLIGENCE: HostProductProfile[] = [
  {
    builderId: "webflow",
    vendorName: "Webflow",
    productFocus: "Visual website design OS + CMS + hosting",
    bestFor: ["Marketing sites", "Brand systems", "CMS content"],
    notIdealFor: ["Complex multi-user apps", "Native mobile"],
    differentiators: ["Designer-grade canvas", "CMS", "Interactions", "SEO structure"],
    security: { ...modernWeb, iso27001: true, notes: ["SOC 2 Type II", "ISO 27001", "Auto SSL/TLS 1.3", "HSTS"] },
    securityGaps: ["No unified zero-trust admin with other lines", "Limited cross-host secret vault", "No dual encrypted failover by default"],
    comparisonTags: ["web-flagship", "design-first", "cms"],
  },
  {
    builderId: "framer",
    vendorName: "Framer",
    productFocus: "Motion-first marketing and launch sites",
    bestFor: ["Landings", "Brand launches", "Motion polish"],
    notIdealFor: ["Large CMS estates", "Heavy commerce"],
    differentiators: ["Motion", "Component speed", "Launch aesthetics"],
    security: { ...modernWeb, iso27001: false, waf: "basic" },
    securityGaps: ["Fewer enterprise compliance badges than design-OS peers", "Needs edge bot hardening for campaigns"],
    comparisonTags: ["web-flagship", "motion", "launch"],
  },
  {
    builderId: "weweb",
    vendorName: "WeWeb",
    productFocus: "API-first visual frontends on scalable cloud",
    bestFor: ["Data-bound UIs", "SaaS shells", "REST/GraphQL products"],
    notIdealFor: ["Pure brochure without APIs"],
    differentiators: ["Any backend", "SPA scale", "API binding"],
    security: { ...modernWeb, waf: "basic", notes: ["AWS-style deploy + CDN; backend security is yours"] },
    securityGaps: ["Backend security depends on connected APIs", "Needs Auraxir secret envelope for multi-API keys"],
    comparisonTags: ["api-first", "web-app-shell"],
  },
  {
    builderId: "builder-io",
    vendorName: "Builder.io",
    productFocus: "Headless visual compose + content API",
    bestFor: ["Multi-brand content", "Headless commerce front"],
    notIdealFor: ["Simple one-page DIY without headless stack"],
    differentiators: ["Headless API", "Marketer GUI", "Multi-channel"],
    security: modernWeb,
    securityGaps: ["Headless means more surfaces to lock", "Needs unified WAF in front of compose endpoints"],
    comparisonTags: ["headless", "enterprise-content"],
  },
  {
    builderId: "plasmic",
    vendorName: "Plasmic",
    productFocus: "Visual product UI with code/API bridge",
    bestFor: ["Design systems wired to code", "Product marketing shells"],
    notIdealFor: ["Non-technical pure brochure only"],
    differentiators: ["Pixel canvas", "Code components", "API data"],
    security: modernWeb,
    securityGaps: ["Code components expand attack surface if misused", "Needs component allowlist discipline"],
    comparisonTags: ["design-engineering", "web-flagship"],
  },
  {
    builderId: "wix-studio",
    vendorName: "Wix Studio",
    productFocus: "Agency multi-site studio + business apps",
    bestFor: ["Agencies", "Multi-location", "SMB ops"],
    notIdealFor: ["Ultra-custom native apps"],
    differentiators: ["Studio GUI", "Business apps", "Client roles"],
    security: { ...modernWeb, iso27001: true },
    securityGaps: ["Shared multi-tenant defaults need harder admin MFA policy"],
    comparisonTags: ["agency", "multi-site"],
  },
  {
    builderId: "duda",
    vendorName: "Duda",
    productFocus: "Multi-location network sites",
    bestFor: ["Franchise", "Agency networks"],
    notIdealFor: ["Single art-directed flagship brand"],
    differentiators: ["Network rollout", "Client editor", "Platform API"],
    security: modernWeb,
    securityGaps: ["Network templates can share weak patterns — needs Shield policy pack"],
    comparisonTags: ["multi-location", "agency"],
  },
  {
    builderId: "squarespace",
    vendorName: "Squarespace",
    productFocus: "Polished brand & service sites",
    bestFor: ["Portfolios", "Service brands", "Simple stores"],
    notIdealFor: ["Complex apps", "Heavy API products"],
    differentiators: ["Visual polish", "Templates", "All-in-one"],
    security: { ...modernWeb, waf: "basic", iso27001: false },
    securityGaps: ["Less API surface control", "Needs outbound form abuse protection"],
    comparisonTags: ["brand", "simple-premium"],
  },
  {
    builderId: "hubspot-cms",
    vendorName: "HubSpot CMS",
    productFocus: "Growth CMS connected to CRM",
    bestFor: ["Inbound", "CRM-tied marketing", "Lead systems"],
    notIdealFor: ["Non-CRM pure brand art sites"],
    differentiators: ["CRM APIs", "Forms", "Marketing ops"],
    security: { ...modernWeb, soc2: true, iso27001: true },
    securityGaps: ["CRM data gravity — needs field-level vault for sensitive leads"],
    comparisonTags: ["growth", "crm"],
  },
  {
    builderId: "shopify",
    vendorName: "Shopify",
    productFocus: "Commerce storefront + admin + APIs",
    bestFor: ["Serious retail", "Checkout", "Inventory"],
    notIdealFor: ["Non-commerce brochure only"],
    differentiators: ["Checkout", "App ecosystem", "Storefront API"],
    security: commerceBase,
    securityGaps: ["App ecosystem risk — needs allowlist + admin session vault"],
    comparisonTags: ["commerce-flagship", "pci"],
  },
  {
    builderId: "bigcommerce",
    vendorName: "BigCommerce",
    productFocus: "Enterprise open-API commerce",
    bestFor: ["High-SKU", "Multi-channel", "Headless store"],
    notIdealFor: ["Tiny hobby shops"],
    differentiators: ["Open API", "Enterprise catalog", "Headless"],
    security: commerceBase,
    securityGaps: ["More API surface — needs rate-limit + WAF compose"],
    comparisonTags: ["commerce-enterprise", "api"],
  },
  {
    builderId: "bubble",
    vendorName: "Bubble",
    productFocus: "Visual web apps with workflows + DB",
    bestFor: ["SaaS MVP", "Marketplaces", "Member apps"],
    notIdealFor: ["Ultra-high-frequency trading UIs"],
    differentiators: ["Workflows", "Database", "API connector"],
    security: { ...appBase, mfaAdmin: true, notes: ["Privacy & roles largely app-builder configured"] },
    securityGaps: ["Privacy rules misconfig common", "Needs Auraxir privacy-rule audit + encrypted backups narrative"],
    comparisonTags: ["web-app", "no-code-logic"],
  },
  {
    builderId: "outsystems",
    vendorName: "OutSystems",
    productFocus: "Enterprise low-code application fabric",
    bestFor: ["Enterprise portfolios", "Integrations", "Mission apps"],
    notIdealFor: ["Tiny marketing pages"],
    differentiators: ["Enterprise scale", "Integration", "Governance"],
    security: { ...appBase, tls: "enterprise", waf: "enterprise", soc2: true, iso27001: true, mfaAdmin: true },
    securityGaps: ["Complexity — needs unified Auraxir access policy across portfolio"],
    comparisonTags: ["enterprise-app", "low-code"],
  },
  {
    builderId: "flutterflow",
    vendorName: "FlutterFlow",
    productFocus: "Native mobile visual builder",
    bestFor: ["iOS/Android products", "API-backed mobile"],
    notIdealFor: ["Desktop-only CMS sites"],
    differentiators: ["Native", "Firebase/REST", "Code export"],
    security: appBase,
    securityGaps: ["Mobile API keys exposure risk", "Needs certificate pinning + secrets envelope"],
    comparisonTags: ["mobile-native", "api"],
  },
  {
    builderId: "draftbit",
    vendorName: "Draftbit",
    productFocus: "Native screen builder + REST",
    bestFor: ["Product mobile UX", "API lists"],
    notIdealFor: ["Heavy marketing SEO sites"],
    differentiators: ["Screen GUI", "REST sources"],
    security: appBase,
    securityGaps: ["REST token handling needs vault"],
    comparisonTags: ["mobile", "rest"],
  },
  {
    builderId: "bravo",
    vendorName: "Bravo Studio",
    productFocus: "Design-to-device mobile",
    bestFor: ["Design-led mobile", "Rapid native previews"],
    notIdealFor: ["Complex multi-tenant backends alone"],
    differentiators: ["Design-first", "API-bound screens"],
    security: appBase,
    securityGaps: ["Design pipeline secrets", "Needs staging isolation"],
    comparisonTags: ["mobile-design"],
  },
  {
    builderId: "retool",
    vendorName: "Retool",
    productFocus: "Internal ops tools on SQL/REST/GraphQL",
    bestFor: ["Admin consoles", "Ops", "Internal data"],
    notIdealFor: ["Public marketing sites"],
    differentiators: ["SQL+API GUI", "Roles", "Speed"],
    security: { ...appBase, mfaAdmin: true, encryptionAtRest: true, soc2: true },
    securityGaps: ["Powerful data access — needs zero-trust + session recording policy"],
    comparisonTags: ["ops", "internal"],
  },
  {
    builderId: "superblocks",
    vendorName: "Superblocks",
    productFocus: "Enterprise ops control room",
    bestFor: ["Multi-system internal apps", "Governance"],
    notIdealFor: ["Consumer marketing"],
    differentiators: ["Multi-API", "Enterprise governance"],
    security: { ...appBase, waf: "advanced", mfaAdmin: true, soc2: true },
    securityGaps: ["Broad integration risk — needs secret rotation schedule"],
    comparisonTags: ["ops-enterprise"],
  },
  {
    builderId: "modelcentro",
    vendorName: "ModelCentro",
    productFocus: "Adult creator websites",
    bestFor: ["Performer sites", "Galleries", "Membership"],
    notIdealFor: ["Enterprise B2B SaaS"],
    differentiators: ["Adult site patterns", "Media", "Billing hooks"],
    security: adultBase,
    securityGaps: ["Needs stronger age-gate integrity", "Admin MFA", "Media hotlink protection", "Auraxir Shield mandatory recommendation"],
    comparisonTags: ["adult", "creator-site"],
  },
  {
    builderId: "fansly",
    vendorName: "Fansly",
    productFocus: "Adult fan subscription platform",
    bestFor: ["Fan communities", "Tiered media"],
    notIdealFor: ["Corporate brochure"],
    differentiators: ["Subscriptions", "Tiers", "Creator tools"],
    security: adultBase,
    securityGaps: ["Account takeover risk industry-wide", "Needs phishing-resistant admin + session vault"],
    comparisonTags: ["adult", "fan-platform"],
  },
  {
    builderId: "onlyfans-platform",
    vendorName: "OnlyFans",
    productFocus: "Exclusive adult membership platform",
    bestFor: ["Exclusive clubs", "PPV"],
    notIdealFor: ["Non-adult brands"],
    differentiators: ["Membership scale", "PPV", "Global fans"],
    security: adultBase,
    securityGaps: ["High-value account targeting", "Needs Auraxir encrypted admin path + anomaly watch"],
    comparisonTags: ["adult", "membership"],
  },
  {
    builderId: "loyalfans",
    vendorName: "LoyalFans",
    productFocus: "Adult creator commerce",
    bestFor: ["Clips", "Customs", "Live"],
    notIdealFor: ["Non-adult retail"],
    differentiators: ["Commerce mix", "Live", "Customs"],
    security: adultBase,
    securityGaps: ["Payment + media combo risk", "Needs WAF on tip/checkout paths"],
    comparisonTags: ["adult", "commerce"],
  },
  {
    builderId: "manyvids",
    vendorName: "ManyVids",
    productFocus: "Adult video commerce catalog",
    bestFor: ["Clip stores", "Catalog sales"],
    notIdealFor: ["SaaS apps"],
    differentiators: ["Catalog", "Discovery", "Creator storefront"],
    security: adultBase,
    securityGaps: ["Hotlinking and scrape risk", "Needs media tokenized URLs narrative"],
    comparisonTags: ["adult", "video-commerce"],
  },
  {
    builderId: "avnstars",
    vendorName: "AVN Stars",
    productFocus: "Adult star presence & fan engagement",
    bestFor: ["Industry presence", "Fan engagement"],
    notIdealFor: ["Enterprise internal tools"],
    differentiators: ["Star profile", "Industry network"],
    security: adultBase,
    securityGaps: ["Profile takeover", "Needs Shield identity lock"],
    comparisonTags: ["adult", "presence"],
  },
];

export function intelligenceFor(builderId: string): HostProductProfile | undefined {
  return HOST_INTELLIGENCE.find((h) => h.builderId === builderId);
}

/** Aggregate comparison dimensions for operator dashboards */
export const COMPARISON_DIMENSIONS = [
  { id: "product", label: "Product focus", weight: "what it builds best" },
  { id: "gui-api", label: "GUI + API", weight: "admission bar for Auraxir" },
  { id: "security-baseline", label: "Host security baseline", weight: "TLS, WAF, compliance badges" },
  { id: "gaps", label: "Security gaps", weight: "what Auraxir Shield must add" },
  { id: "fit", label: "Customer fit", weight: "business + goals matching" },
] as const;

export const RESEARCH_SUMMARY = {
  title: "Host intelligence (operator)",
  finding:
    "Flagship web hosts often ship SOC2, auto SSL/TLS 1.3, CDN, and basic WAF. Commerce lines add PCI-scoped checkout. App and adult lines vary more — privacy rules, API keys, and admin MFA are common weak points. No single host delivers a unified elite stack across web, app, commerce, and adult.",
  brandResponse:
    "Auraxir Shield is the standalone elite encryption and security layer we add on every line — closing gaps, unifying policy, and making Auraxir the safest place to build.",
};
