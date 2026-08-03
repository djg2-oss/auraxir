/**
 * Auraxir Always-On — dual frontend + dual backend services
 * when needed so production stays online at all times.
 * Customer language only — no host internals.
 */

export type AlwaysOnTier = "standard" | "dual" | "max";

export interface AlwaysOnService {
  id: string;
  name: string;
  customerLabel: string;
  blurb: string;
  whenNeeded: string[];
  includedOn: AlwaysOnTier[];
}

/** Dual FE + dual BE services offered for continuous uptime */
export const ALWAYS_ON_SERVICES: AlwaysOnService[] = [
  {
    id: "dual-frontend",
    name: "Dual frontend service",
    customerLabel: "Auraxir Dual Frontend",
    blurb: "Two live frontend paths so visitors never hit a blank wall if one path falters.",
    whenNeeded: [
      "Always-online marketing sites",
      "Peak campaign traffic",
      "Brand launches that cannot go dark",
    ],
    includedOn: ["dual", "max"],
  },
  {
    id: "dual-backend",
    name: "Dual backend service",
    customerLabel: "Auraxir Dual Backend",
    blurb: "Two backend service paths so APIs, forms, and data stay available.",
    whenNeeded: [
      "Apps and commerce that must take orders 24/7",
      "Member logins and workflows",
      "Mission-critical forms and data",
    ],
    includedOn: ["dual", "max"],
  },
  {
    id: "health-failover",
    name: "Health & failover watch",
    customerLabel: "Auraxir Failover Watch",
    blurb: "Continuous health checks that shift traffic when a path needs recovery.",
    whenNeeded: [
      "Any dual-path production",
      "Scale traffic bands",
      "Global audiences",
    ],
    includedOn: ["dual", "max"],
  },
  {
    id: "edge-mirror",
    name: "Edge mirror layer",
    customerLabel: "Auraxir Edge Mirror",
    blurb: "Mirrored edge delivery so pages stay fast and online worldwide.",
    whenNeeded: [
      "Global scale",
      "Commerce peaks",
      "Always-on flagship brands",
    ],
    includedOn: ["max"],
  },
  {
    id: "status-seal",
    name: "Always-On production seal",
    customerLabel: "Auraxir Always-On Seal",
    blurb: "Production marked for continuous online operation under Elite Quality Service.",
    whenNeeded: ["Every dual or max Always-On plan"],
    includedOn: ["dual", "max"],
  },
];

export const ALWAYS_ON_PROMISE =
  "When continuous uptime matters, Auraxir offers dual frontend and dual backend services — so you stay online at all times.";

export function resolveAlwaysOnTier(opts: {
  needsAlwaysOn?: boolean;
  traffic?: string | null;
  budget?: string | null;
  productIntent?: string | null;
  features?: string[];
}): AlwaysOnTier {
  const features = opts.features ?? [];
  const explicit =
    opts.needsAlwaysOn ||
    features.includes("always-on") ||
    features.includes("dual-backend") ||
    features.includes("dual-frontend");

  if (!explicit && opts.budget !== "scale" && opts.traffic !== "global" && opts.traffic !== "high") {
    return "standard";
  }

  if (
    opts.budget === "scale" ||
    opts.traffic === "global" ||
    opts.productIntent === "app" ||
    features.includes("always-on")
  ) {
    return "max";
  }

  return "dual";
}

export function alwaysOnServicesFor(tier: AlwaysOnTier): AlwaysOnService[] {
  if (tier === "standard") return [];
  return ALWAYS_ON_SERVICES.filter((s) => s.includedOn.includes(tier));
}

export function alwaysOnCustomerLines(tier: AlwaysOnTier): string[] {
  return alwaysOnServicesFor(tier).map((s) => s.customerLabel);
}

export function alwaysOnMonthlyAddOn(tier: AlwaysOnTier): number {
  if (tier === "max") return 149;
  if (tier === "dual") return 79;
  return 0;
}
