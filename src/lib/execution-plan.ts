/**
 * Auraxir Elite — Polished execution plan
 * Customer-facing roadmap language only.
 */
export type ExecStatus = "done" | "active" | "next";

export interface ExecItem {
  id: string;
  title: string;
  detail: string;
  status: ExecStatus;
}

export interface ExecPhase {
  id: string;
  title: string;
  outcome: string;
  items: ExecItem[];
}

export const EXECUTION_NORTH_STAR =
  "Customers get the best fit and the look they desire under the Auraxir premium name — and we deliver the promise.";

export const EXECUTION_PLAN: ExecPhase[] = [
  {
    id: "foundation",
    title: "Phase 1 · Foundation",
    outcome: "Elite brand, premium catalog, G2P look engine",
    items: [
      {
        id: "brand",
        title: "Elite Quality Service brand system",
        detail: "Auraxir production seal on every live project",
        status: "done",
      },
      {
        id: "catalog",
        title: "Premium production lines only",
        detail: "Design OS, Motion, Studio, Commerce, Signature, App Lab, Mobile Lab",
        status: "done",
      },
      {
        id: "g2p",
        title: "Auraxir G2P AI v1.1-elite",
        detail: "Trained style systems · mood/desire → production tokens",
        status: "done",
      },
      {
        id: "network",
        title: "VPN / tunnel as needed",
        detail: "Auraxir-branded secure paths on flagship & apps",
        status: "done",
      },
      {
        id: "pipeline",
        title: "Success pipeline",
        detail: "Match + G2P + economics in one plan",
        status: "done",
      },
      {
        id: "guide",
        title: "Concierge guide",
        detail: "Business or personal path → best-fit production line",
        status: "done",
      },
    ],
  },
  {
    id: "elite-ops",
    title: "Phase 2 · Elite ops",
    outcome: "Shield, Always-On, Imago, legal, first customers live",
    items: [
      {
        id: "shield",
        title: "Auraxir Shield",
        detail: "Elite encryption layer stacked on production baselines",
        status: "done",
      },
      {
        id: "always-on",
        title: "Always-On dual FE/BE",
        detail: "Stay online when continuous uptime is required",
        status: "done",
      },
      {
        id: "imago",
        title: "Imago image stages",
        detail: "Presence, Lookbook, Desire, Reputation, Atelier, Spotlight",
        status: "done",
      },
      {
        id: "legal",
        title: "Legal stack",
        detail: "Terms, AUP, Adult addendum, indemnity, privacy, DMCA",
        status: "done",
      },
      {
        id: "first-customer",
        title: "First customer live",
        detail: "Founder as customer #1 — full elite path verified",
        status: "active",
      },
    ],
  },
  {
    id: "scale",
    title: "Phase 3 · Scale",
    outcome: "Deeper G2P training loop, multi-project ops, billing",
    items: [
      {
        id: "g2p-feedback",
        title: "G2P feedback from publish scores",
        detail: "Close the loop from live quality back into style ranking",
        status: "next",
      },
      {
        id: "billing",
        title: "Subscription billing",
        detail: "Retail invoices under Auraxir; host settlement internal",
        status: "next",
      },
      {
        id: "provision",
        title: "Host provision playbooks",
        detail: "Ops-only maps from Auraxir line → host action",
        status: "next",
      },
    ],
  },
];

export function executionProgress() {
  const items = EXECUTION_PLAN.flatMap((p) => p.items);
  const done = items.filter((i) => i.status === "done").length;
  const active = items.filter((i) => i.status === "active").length;
  const total = items.length;
  const percent = total ? Math.round((done / total) * 100) : 0;
  return { done, active, total, percent };
}

export const EXECUTION_PROMISE = EXECUTION_NORTH_STAR;
