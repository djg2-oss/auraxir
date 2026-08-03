/**
 * Content responsibility & adult vertical policy.
 *
 * Auraxir provides brand overlay, matching, and production chrome only.
 * We do not operate customer sites or control their content.
 * The customer is solely responsible for what they publish.
 */
import { BRAND } from "./brand";

export const CONTENT_ROLE = {
  brandDoes: [
    "Premium brand name and production overlay",
    "Match to best-fit production lines (including adult-capable lines)",
    "G2P look systems and Imago image stages",
    "Always-On dual FE/BE when selected",
    "Quality polish on presentation — not editorial control of content",
  ],
  brandDoesNot: [
    "Operate the customer’s site day-to-day",
    "Own, host-as-publisher, or curate customer content",
    "Approve, moderate, or legally clear customer materials",
    "Act as the content provider, studio, or platform operator for the customer’s audience",
    "Assume liability for what the customer posts, sells, streams, or stores",
  ],
  customerIsResponsibleFor: [
    "All content they create, upload, stream, sell, or display",
    "Age verification and 18+ / adult access rules where required",
    "Consent, model releases, and performer rights",
    "Local, national, and platform laws (including adult, privacy, and consumer rules)",
    "Payments, taxes, chargebacks, and customer support for their audience",
    "Prohibited content compliance — illegal content is never allowed",
  ],
} as const;

export const CONTENT_DISCLAIMER = {
  short:
    "Auraxir is brand overlay and production polish only. You operate your site. You are solely responsible for your content.",
  medium:
    "Auraxir places our premium brand and quality layer over best-fit production lines. We do not operate your site. You control your content, audience, and compliance. You are solely responsible for what happens with your content — not Auraxir.",
  long: `${BRAND.legalName} provides matching, brand overlay, design systems (G2P / Imago), and production presentation services. ${BRAND.name} does not operate customer websites or applications, does not act as publisher or content host of record for customer materials, and has no editorial control over customer content. The customer alone is responsible for all content, compliance, age gates, rights, payments, and legal obligations. Illegal content is prohibited. Adult (18+) lines are available for lawful explicit adult businesses when selected by the customer.`,
  ageGate:
    "Adult line — 18+ only. By continuing you confirm you are of legal age and that you alone control and are responsible for all content on this project.",
  acceptanceLabel:
    "I understand Auraxir is brand overlay only, does not operate my site, and I alone am responsible for all content and compliance.",
} as const;

export const ADULT_VERTICAL = {
  id: "adult" as const,
  name: "Adult (18+)",
  marketName: "Auraxir After Dark",
  principle: "Best adult-capable lines. Our brand on top. You own the content risk.",
  blurb:
    "Open to the best explicit adult production lines. Auraxir brand overlay only — you operate the site and own everything that happens with your content.",
  minAge: 18,
  requiresAcceptance: true,
  /** Customer-facing line names only */
  promise:
    "We keep adult lines available among the best production options. Structure is simple: Auraxir brand on top. You run the site. Content is yours — not ours.",
} as const;

export function isAdultBusiness(businessType: string | null | undefined): boolean {
  if (!businessType) return false;
  return (
    businessType === "adult-creator" ||
    businessType === "adult-studio" ||
    businessType === "adult-commerce" ||
    businessType === "adult-community"
  );
}

export function isAdultProject(opts: {
  businessType?: string | null;
  features?: string[];
  siteTypeId?: string;
  adultAccepted?: boolean;
}): boolean {
  if (opts.siteTypeId === "adult-presence" || opts.siteTypeId === "adult-platform") return true;
  if (isAdultBusiness(opts.businessType)) return true;
  if (opts.features?.includes("adult-18")) return true;
  return false;
}
