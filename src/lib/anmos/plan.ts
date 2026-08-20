import { ANMOS, type AnmosPacket, type AnmosSchedule } from "./kernel";

const BRAIN_MS = 4000;
const PARALLEL_MS = 3200;

const HIGH_VARIANCE_TYPES = /portfolio|agency|studio|luxury|fashion|restaurant|hotel|editorial|adult|gallery|architect|law|wellness/;
const LOW_VARIANCE_TYPES = /landing|saas|shop|store|blog|simple|card|link/;

function tokens(s: string) {
  return s.toLowerCase().match(/[a-z0-9]{3,}/g) ?? [];
}

/** 0–10. High = rewrite will move the copy. Low = two first drafts are close enough. */
export function jobVariance(opts: { description: string; desire: string; type?: string; name?: string }) {
  const brief = `${opts.description} ${opts.desire}`.trim();
  const type = (opts.type ?? "").toLowerCase();
  const words = tokens(brief);
  const unique = new Set(words).size;
  const sentences = brief.split(/[.!?]+/).filter((p) => p.trim().length > 12).length;
  let score = 0;
  if (brief.length >= 160) score += 3;
  else if (brief.length >= 80) score += 2;
  else if (brief.length >= 40) score += 1;
  if (unique >= 24) score += 2;
  else if (unique >= 12) score += 1;
  if (sentences >= 3) score += 2;
  else if (sentences >= 2) score += 1;
  if (HIGH_VARIANCE_TYPES.test(type) || HIGH_VARIANCE_TYPES.test(brief)) score += 2;
  if (LOW_VARIANCE_TYPES.test(type) && brief.length < 80) score -= 1;
  if ((opts.desire ?? "").trim().length >= 40) score += 1;
  return Math.max(0, Math.min(10, score));
}

function scheduleFor(variance: number): AnmosSchedule {
  if (variance >= 6) return "series";
  if (variance >= 3) return "parallel";
  return "backup";
}

export function planAnmosBuild(opts: {
  description: string;
  desire: string;
  apiLive: boolean;
  type?: string;
  name?: string;
}): AnmosPacket {
  const id = `ax-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
  const variance = jobVariance(opts);

  if (!opts.apiLive) {
    return {
      id,
      os: "AURAXIR",
      anmos: true,
      dual: true,
      schedule: "series",
      why: "Hosted brains dark — Serana writes locally. Agent Black is not on this machine.",
      budgetMs: 0,
      variance,
      brains: { d: "serana", r: "skip" },
      primary: "serana",
      backup: "serana",
    };
  }

  const schedule = scheduleFor(variance);
  const why =
    schedule === "series"
      ? `${ANMOS.brain}: variance ${variance}/10 — rewrite is worth the extra pass. D writes, R rewrites that draft.`
      : schedule === "parallel"
        ? `${ANMOS.brain}: variance ${variance}/10 — two first drafts in parallel, pick the stronger. Rewrite would not pay the wait.`
        : `${ANMOS.brain}: variance ${variance}/10 — one pass is enough. R only if D misses.`;

  return {
    id,
    os: "AURAXIR",
    anmos: true,
    dual: true,
    schedule,
    why,
    budgetMs: schedule === "parallel" ? PARALLEL_MS : BRAIN_MS,
    variance,
    brains: { d: "grok-4.6", r: "grok-4.6" },
    primary: "grok-4.6",
    backup: "serana",
  };
}

export const ANMOS_BUDGET = { BRAIN_MS, PARALLEL_MS, BACKUP_MS: BRAIN_MS };
