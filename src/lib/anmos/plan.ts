import { ANMOS, type AnmosPacket } from "./kernel";

const PARALLEL_MS = 2800;
const BACKUP_MS = 4500;

export function planAnmosBuild(opts: {
  description: string;
  desire: string;
  apiLive: boolean;
}): AnmosPacket {
  const brief = (opts.description + " " + opts.desire).trim();
  const rich = brief.length >= 80;
  const id = `ax-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

  if (!opts.apiLive) {
    return {
      id,
      os: "AURAXIR",
      anmos: true,
      dual: true,
      schedule: "series",
      why: "Both grok-4.6 brains dark — Serana writes locally. Agent Black is not on this machine.",
      budgetMs: 0,
      brains: { d: "serana", r: "skip" },
      primary: "serana",
      backup: "serana",
    };
  }

  if (rich) {
    return {
      id,
      os: "AURAXIR",
      anmos: true,
      dual: true,
      schedule: "parallel",
      why: `${ANMOS.brain} dual grok-4.6: D and R fire together. First quality-pass within ${PARALLEL_MS}ms wins. Serana if both miss.`,
      budgetMs: PARALLEL_MS,
      brains: { d: "grok-4.6", r: "grok-4.6" },
      primary: "grok-4.6",
      backup: "serana",
    };
  }

  return {
    id,
    os: "AURAXIR",
    anmos: true,
    dual: true,
    schedule: "backup",
    why: "Dual grok-4.6: D writes, R only if D misses. Serana if both miss. Extra pass stays under the latency bar.",
    budgetMs: BACKUP_MS,
    brains: { d: "grok-4.6", r: "grok-4.6" },
    primary: "grok-4.6",
    backup: "serana",
  };
}

export const ANMOS_BUDGET = { PARALLEL_MS, BACKUP_MS };
