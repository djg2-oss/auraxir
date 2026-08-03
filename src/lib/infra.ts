/**
 * OPERATOR MODEL (internal only — never show in customer UI)
 * ─────────────────────────────────────────────────────────
 * Customers experience Auraxir as the product they are "on":
 *   brand chrome · match · G2P · Imago · Shield · builder · legal
 *
 * Under the hood we utilize best-fit production hosts / platforms.
 * We pay those lines. We mark up. Customers never see vendor names
 * or that we settled host cost — that is not their business.
 *
 * Rule: customer UI = Auraxir only. Ops books = cost + markup + host id.
 */
import { BRAND } from "./brand";
import { operatorCostMonthly, type PremiumBuilder } from "./builders";

export const INTERNAL_OPS = {
  note: "Internal books only. Never render this object in customer surfaces.",
  model: "white-label-overlay",
  principle:
    "Looks like they are on Auraxir. Production runs on the matched host line. We mark up.",
  customerSees: [
    `${BRAND.name} name and production seal`,
    "Match / recommend plan under Auraxir lines only",
    "G2P, Imago, Shield, Always-On as Auraxir products",
    "Retail price only — no cost or margin figures",
  ],
  customerNeverSees: [
    "Vendor / host legal names",
    "What we pay the host",
    "Markup percent",
    "That production is settled on third-party infrastructure",
  ],
  weDo: [
    "Select best-fit host production line",
    "Pay host / platform costs",
    "Apply retail markup",
    "Overlay Auraxir brand and quality layer",
    "Guide business or personal path to best line",
  ],
} as const;

/** Operator ledger line — keep off customer pages */
export function operatorSettlement(builder: PremiumBuilder) {
  const cost = operatorCostMonthly(builder);
  const retail = builder.priceMonthly;
  return {
    productName: builder.productName,
    vendorInternal: builder.vendorName,
    costMonthly: cost,
    retailMonthly: retail,
    markupPercent: builder.markupPercent,
    spreadMonthly: retail - cost,
    note: INTERNAL_OPS.principle,
  };
}

export const CUSTOMER_EXPERIENCE = {
  headline: `You build on ${BRAND.name}.`,
  body: `Every project lives under the ${BRAND.name} name — match, design, security, and production polish. You work in our experience. We handle how production is delivered.`,
  /** Soft language — never "we resell hosts" */
  promise: `${BRAND.name} is the premium home for your site or app. Best-fit production. Your look. Our name.`,
} as const;
