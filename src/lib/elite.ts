/**
 * Elite Quality Service standard — customer promise only.
 * Absolute premium builds: pro design GUI + real API on every line.
 */
export const ELITE = {
  standard: "Elite Quality Service",
  bar: "Elite Quality Service · Absolute premium · Pro GUI + API · We cost more for the elite",
  rules: [
    "You always work under the Auraxir premium name — it looks like our site end to end.",
    "How production is delivered underneath is our craft — never customer-facing.",
    "Absolute premium builds only — no free-tier toys.",
    "Every production line includes a pro design GUI and real API power.",
    "Apps mean real accounts, workflows, data, and API connectors.",
    "Secure options when your project needs them.",
    "Dual frontend and dual backend services when you must stay online at all times.",
    "Auraxir Imago stages when the brand image can be stronger — image is everything.",
    "Brand overlay only — customer operates the site and owns all content responsibility.",
    "Adult (18+) best-fit lines available; illegal content is never allowed.",
    "Auraxir Shield stacks elite encryption and defense above every production baseline.",
    "We deliver the promise — how we produce is our craft.",
  ],
  rejects: [
    "Budget generators and free toys",
    "Builders without a real pro GUI",
    "Platforms without real API access",
    "Fake “app” shells without logic or integrations",
    "Anything below the absolute premium bar",
  ],
} as const;

export interface NetworkCapability {
  id: string;
  name: string;
  operatorNote: string;
  customerLabel: string;
  whenNeeded: string[];
  includedOn: "all" | "flagship" | "apps" | "scale" | "always-on";
}

export const NETWORK_CAPABILITIES: NetworkCapability[] = [
  {
    id: "secure-tunnel",
    name: "Elite secure publish tunnel",
    operatorNote: "Internal.",
    customerLabel: "Auraxir private preview path",
    whenNeeded: [
      "Private staging before go-live",
      "Private backend hooks",
      "Client review without public URLs",
    ],
    includedOn: "all",
  },
  {
    id: "vpn-access",
    name: "Elite VPN access",
    operatorNote: "Internal.",
    customerLabel: "Auraxir encrypted admin access",
    whenNeeded: [
      "Locked-down admin",
      "Compliance / private networks",
      "High-trust client environments",
    ],
    includedOn: "flagship",
  },
  {
    id: "edge-tunnel",
    name: "Elite edge app tunnel",
    operatorNote: "Internal.",
    customerLabel: "Auraxir high-trust app connectivity",
    whenNeeded: [
      "Real apps with private APIs",
      "Mobile clients to secured backends",
      "Multi-region app traffic",
    ],
    includedOn: "apps",
  },
  {
    id: "zero-trust",
    name: "Elite zero-trust gate",
    operatorNote: "Internal.",
    customerLabel: "Auraxir identity-locked workspace",
    whenNeeded: [
      "Scale subscriptions",
      "Multiple editors",
      "Sensitive data in build environments",
    ],
    includedOn: "scale",
  },
  {
    id: "dual-frontend",
    name: "Dual frontend service",
    operatorNote: "Internal dual FE paths.",
    customerLabel: "Auraxir Dual Frontend — always online",
    whenNeeded: [
      "Stay online at all times",
      "Peak campaigns",
      "Flagship brand launches",
    ],
    includedOn: "always-on",
  },
  {
    id: "dual-backend",
    name: "Dual backend service",
    operatorNote: "Internal dual BE paths.",
    customerLabel: "Auraxir Dual Backend — always online",
    whenNeeded: [
      "Apps and commerce that never sleep",
      "Continuous API availability",
      "Mission-critical data paths",
    ],
    includedOn: "always-on",
  },
];

export function networkForEngine(opts: {
  tier: "flagship" | "premium";
  kind: "website" | "app" | "commerce";
  scale?: boolean;
  alwaysOn?: boolean;
}): NetworkCapability[] {
  return NETWORK_CAPABILITIES.filter((c) => {
    if (c.includedOn === "all") return true;
    if (c.includedOn === "flagship" && opts.tier === "flagship") return true;
    if (c.includedOn === "apps" && opts.kind === "app") return true;
    if (c.includedOn === "scale" && (opts.scale || opts.tier === "flagship")) return true;
    if (c.includedOn === "always-on" && opts.alwaysOn) return true;
    return false;
  });
}
