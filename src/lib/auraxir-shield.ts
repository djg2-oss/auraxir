/**
 * AURAXIR SHIELD — standalone elite security layer.
 * We research host baselines, then ADD our stack on top.
 * Customer promise: safest, most encrypted place to build.
 * Never explain host internals — sell the composite Shield.
 */
import { intelligenceFor } from "./host-intelligence";
import { BRAND } from "./brand";

export type ShieldTier = "core" | "shield" | "shield-max";

export interface ShieldControl {
  id: string;
  name: string;
  blurb: string;
  layer: "transport" | "edge" | "access" | "data" | "ops" | "privacy";
  includedIn: ShieldTier[];
  /** Closes which common host gaps */
  closesGaps: string[];
}

export const SHIELD = {
  name: "Auraxir Shield",
  seal: "Auraxir Shield · Elite Encryption",
  principle: "Safest place to build. Encryption that stands alone.",
  tagline: "We study every production line’s security — then we raise it.",
  promise:
    "Auraxir Shield is our own elite security layer: modern transport encryption, edge defense, zero-trust access, secret vaults, and continuous watch — stacked on top of best-fit production so your site is safer than the baseline alone.",
  marketLines: [
    "Not just SSL — a full elite encryption and access stack.",
    "Edge defense, bot friction, and encrypted admin paths.",
    "Secret vaults and session locks for high-trust work.",
    "Built to be the safest place to build a website or app.",
  ],
} as const;

/** Auraxir-owned controls — additive security beyond host baseline */
export const SHIELD_CONTROLS: ShieldControl[] = [
  {
    id: "tls-hardline",
    name: "TLS Hardline",
    blurb: "Modern TLS preference, HSTS posture, and secure cookie defaults on production chrome.",
    layer: "transport",
    includedIn: ["core", "shield", "shield-max"],
    closesGaps: ["Inconsistent HSTS", "Mixed content habits"],
  },
  {
    id: "cert-watch",
    name: "Certificate Watch",
    blurb: "Continuity checks so certificate and HTTPS posture stay production-ready.",
    layer: "transport",
    includedIn: ["core", "shield", "shield-max"],
    closesGaps: ["Cert lapse risk"],
  },
  {
    id: "edge-aegis",
    name: "Edge Aegis",
    blurb: "Edge filtering posture: bot friction, abuse rate signals, and attack surface reduction.",
    layer: "edge",
    includedIn: ["shield", "shield-max"],
    closesGaps: ["Basic/no WAF", "Campaign bot floods"],
  },
  {
    id: "ddos-absorb",
    name: "Surge Absorb",
    blurb: "Traffic surge absorption patterns tied to dual-path Always-On when enabled.",
    layer: "edge",
    includedIn: ["shield", "shield-max"],
    closesGaps: ["Shared-only DDoS tier"],
  },
  {
    id: "zero-trust-admin",
    name: "Zero-Trust Admin",
    blurb: "Identity-locked admin access patterns — least privilege for editors and operators.",
    layer: "access",
    includedIn: ["shield", "shield-max"],
    closesGaps: ["Partial MFA", "Shared admin sessions"],
  },
  {
    id: "session-vault",
    name: "Session Vault",
    blurb: "Hardened session handling for high-trust workspaces and private previews.",
    layer: "access",
    includedIn: ["shield", "shield-max"],
    closesGaps: ["Session fixation / admin takeover patterns"],
  },
  {
    id: "secret-envelope",
    name: "Secret Envelope",
    blurb: "Encrypted handling patterns for API keys and integration secrets across lines.",
    layer: "data",
    includedIn: ["shield", "shield-max"],
    closesGaps: ["API key sprawl", "Mobile/REST token exposure"],
  },
  {
    id: "field-vault",
    name: "Field Vault",
    blurb: "Sensitive field posture for leads, PII, and high-risk form data.",
    layer: "data",
    includedIn: ["shield-max"],
    closesGaps: ["CRM/PII gravity", "Form abuse"],
  },
  {
    id: "audit-ribbon",
    name: "Audit Ribbon",
    blurb: "Change and access audit trail for elite accountability.",
    layer: "ops",
    includedIn: ["shield", "shield-max"],
    closesGaps: ["No unified audit across lines"],
  },
  {
    id: "anomaly-watch",
    name: "Anomaly Watch",
    blurb: "Continuous signals for odd admin, traffic, or publish behavior.",
    layer: "ops",
    includedIn: ["shield-max"],
    closesGaps: ["No continuous security watch"],
  },
  {
    id: "privacy-lock",
    name: "Privacy Lock",
    blurb: "Privacy-rule and access posture checks — especially for app privacy configs.",
    layer: "privacy",
    includedIn: ["shield", "shield-max"],
    closesGaps: ["Misconfigured app privacy rules"],
  },
  {
    id: "media-token",
    name: "Media Token Path",
    blurb: "Tokenized / protected media access patterns for high-value libraries.",
    layer: "data",
    includedIn: ["shield-max"],
    closesGaps: ["Hotlink and scrape risk on media-heavy lines"],
  },
];

export function controlsForTier(tier: ShieldTier): ShieldControl[] {
  return SHIELD_CONTROLS.filter((c) => c.includedIn.includes(tier));
}

export function resolveShieldTier(opts: {
  budget?: string | null;
  traffic?: string | null;
  needsSecure?: boolean;
  adult?: boolean;
  features?: string[];
  alwaysOn?: boolean;
}): ShieldTier {
  const f = opts.features ?? [];
  if (
    f.includes("shield-max") ||
    opts.budget === "scale" ||
    opts.traffic === "global" ||
    opts.adult ||
    opts.alwaysOn
  ) {
    return "shield-max";
  }
  if (
    f.includes("shield") ||
    f.includes("secure-network") ||
    opts.needsSecure ||
    opts.budget === "growth" ||
    opts.traffic === "high"
  ) {
    return "shield";
  }
  return "core"; // core still includes baseline Auraxir hardline — always on
}

export function shieldMonthlyAddOn(tier: ShieldTier): number {
  if (tier === "shield-max") return 129;
  if (tier === "shield") return 59;
  return 0; // core included
}

export function shieldScore(opts: {
  tier: ShieldTier;
  builderId?: string;
  secureNetwork?: boolean;
  alwaysOn?: boolean;
}): { score: number; grade: "A+" | "A" | "B"; narrative: string } {
  let score = 62;
  const intel = opts.builderId ? intelligenceFor(opts.builderId) : undefined;
  if (intel) {
    if (intel.security.soc2) score += 4;
    if (intel.security.iso27001) score += 3;
    if (intel.security.waf === "advanced" || intel.security.waf === "enterprise") score += 4;
    if (intel.security.tls === "enterprise" || intel.security.tls === "modern") score += 3;
    if (intel.security.encryptionAtRest) score += 2;
  }
  if (opts.tier === "core") score += 8;
  if (opts.tier === "shield") score += 18;
  if (opts.tier === "shield-max") score += 28;
  if (opts.secureNetwork) score += 4;
  if (opts.alwaysOn) score += 3;
  score = Math.min(99, score);
  const grade = score >= 92 ? "A+" : score >= 84 ? "A" : "B";
  return {
    score,
    grade,
    narrative:
      grade === "A+"
        ? `${SHIELD.seal} — elite composite. Host baseline raised by Auraxir controls.`
        : grade === "A"
          ? `${SHIELD.name} active — stronger than baseline alone.`
          : `${SHIELD.name} Core active — upgrade for full edge and vault stack.`,
  };
}

export function shieldClosesForBuilder(builderId: string): string[] {
  const intel = intelligenceFor(builderId);
  if (!intel) return ["Unified elite policy across production"];
  return intel.securityGaps;
}

export function shieldCustomerBullets(tier: ShieldTier): string[] {
  return controlsForTier(tier).map((c) => c.name + " — " + c.blurb);
}

export const SHIELD_COMPARISON_STORY = {
  headline: "Hosts give a baseline. Auraxir Shield makes it elite.",
  body: `Every serious production line ships some security — TLS, CDN, sometimes SOC 2. Research shows the gaps: uneven WAF, partial MFA, API secret sprawl, weak audit, media hotlinks, privacy misconfigs. ${BRAND.name} does not stop at the baseline. ${SHIELD.name} adds a standalone encryption and defense stack so building here is safer than building on a host alone.`,
  pillars: [
    { title: "Research", body: "We profile product fit and security baselines across production lines." },
    { title: "Raise", body: "Shield controls close real gaps — transport, edge, access, data, ops." },
    { title: "Prove", body: "Security score and grade on every project — Core, Shield, or Shield Max." },
  ],
} as const;
