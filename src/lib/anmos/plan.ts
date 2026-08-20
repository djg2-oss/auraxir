import { ANMOS, type AnmosPacket } from "./kernel";

const PARALLEL_MS = 2800;
const BACKUP_MS = 4500;

export function planAnmosBuild(opts: {
  description: string;
  desire: string;
  apiLive: boolean;
}): AnmosPacket {
  const language = (opts.description + " " + opts.desire).trim().length >= 40;
  const id = `ax-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

  if (!language) {
    return {
      id,
      os: "AURAXIR",
      anmos: true,
      schedule: "series",
      why: "Look is local G2P. No copy brief — skip grok-4.6 (right-size).",
      budgetMs: 0,
      brains: { d: "kernel", r: "skip" },
      primary: "kernel",
      backup: "kernel",
    };
  }

  if (!opts.apiLive) {
    return {
      id,
      os: "AURAXIR",
      anmos: true,
      schedule: "series",
      why: "Language needed, vendor dark — kernel writer closes copy. G2P look still applied.",
      budgetMs: 0,
      brains: { d: "kernel", r: "skip" },
      primary: "kernel",
      backup: "kernel",
    };
  }

  return {
    id,
    os: "AURAXIR",
    anmos: true,
    schedule: "parallel",
    why: `${ANMOS.brain} D is kernel copy in hand; grok-4.6 R in flight. First quality-pass within ${PARALLEL_MS}ms wins.`,
    budgetMs: PARALLEL_MS,
    brains: { d: "kernel", r: "grok-4.6" },
    primary: "grok-4.6",
    backup: "kernel",
  };
}

export const ANMOS_BUDGET = { PARALLEL_MS, BACKUP_MS };
