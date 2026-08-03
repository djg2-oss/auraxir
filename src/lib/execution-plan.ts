/**
 * Auraxir Elite — Polished execution plan
 * Single source of truth for what we ship and what is done.
 */
export type ExecStatus = "done" | "active" | "next" | "later";

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

export const EXECUTION_PLAN: ExecPhase[] = [
  {
    id: "foundation",
    title: "Phase 1 · Foundation",
    outcome: "Elite brand, , premium catalog, G2P look engine",
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
        title: "Auraxir G2P AI v1.0-elite-sites",
        detail: "8 trained style systems · mood/desire → production tokens",
        status: "done",
      },
      {
        id: "network",
        title: "VPN / tunnel as needed",
        detail: "Auraxir-branded secure paths on flagship & apps",
        status: "done",
      },
    ],
  },
  {
    id: "funnel",
    title: "Phase 2 · Success funnel",
    outcome: "Attract → Capture → Plan → Build → Ship with higher completion",
    items: [
      {
        id: "pipeline",
        title: "Unified pipeline orchestrator",
        detail: "runElitePipeline: match + G2P + economics in one plan",
        status: "done",
      },
      {
        id: "express",
        title: "Express match (2 steps)",
        detail: "Smart defaults for goals, traffic, budget, energy",
        status: "done",
      },
      {
        id: "full",
        title: "Full match (4 steps)",
        detail: "Identity → Outcomes → Look → Capacity",
        status: "done",
      },
      {
        id: "plan-page",
        title: "Success plan page",
        detail: "Single CTA into builder with dual fit scores",
        status: "done",
      },
    ],
  },
  {
    id: "polish",
    title: "Phase 3 · Polish & execute",
    outcome: "Production-ready demo quality, verified flows, crisp UX",
    items: [
      {
        id: "flow-verify",
        title: "Verify express → plan → builder → publish",
        detail: "Browser-driven happy path with clean console",
        status: "done",
      },
      {
        id: "prod-score",
        title: "Production boost on publish",
        detail: "Additive SEO, CTAs, density — never strip features",
        status: "done",
      },
      {
        id: "mobile",
        title: "Mobile viewport check (~390px)",
        detail: "No horizontal overflow; primary CTAs usable",
        status: "done",
      },
      {
        id: "build",
        title: "Production build green",
        detail: "npm run build / typecheck pass for deploy target",
        status: "done",
      },
    ],
  },
  {
    id: "scale",
    title: "Phase 4 · Scale (next)",
    outcome: "Deeper G2P training loop, multi-project ops, more lines later",
    items: [
      {
        id: "g2p-feedback",
        title: "G2P feedback from publish scores",
        detail: "Weight styles that convert after go-live",
        status: "next",
      },
      {
        id: "ops-dashboard",
        title: "Portfolio performance view",
        detail: "Portfolio view of plans and launch status",
        status: "next",
      },
      {
        id: "phase2-lines",
        title: "Later-phase engines only if elite",
        detail: "Still no toys — expand catalog carefully",
        status: "later",
      },
    ],
  },
] as const;

export const EXECUTION_NORTH_STAR =
  "Customers get the best fit and the look they desire under the Auraxir premium name — and we deliver the promise.";

export function executionProgress() {
  const items = EXECUTION_PLAN.flatMap((p) => p.items);
  const done = items.filter((i) => i.status === "done").length;
  const active = items.filter((i) => i.status === "active").length;
  return {
    done,
    active,
    total: items.length,
    percent: Math.round((done / items.length) * 100),
  };
}
