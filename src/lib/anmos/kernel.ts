/** Auraxir Native Model Operating System — dual-brain G2P Agent Black. */
export const ANMOS = {
  id: "anmos",
  name: "ANMOS",
  fullName: "Auraxir Native Model Operating System",
  version: "4.9.0",
  os: "AURAXIR",
  brain: "G2P-AGENT-BLACK",
  brains: { d: "create", r: "refine" },
  engine: "grok-4.6",
  writer: "anmos-kernel",
  licensee: "G2P",
  owner: "DANNY GREEN",
} as const;

export type AnmosSchedule = "series" | "parallel" | "backup";
export type AnmosEngine = "kernel" | "grok-4.6";

export type AnmosPacket = {
  id: string;
  os: "AURAXIR";
  anmos: true;
  schedule: AnmosSchedule;
  why: string;
  budgetMs: number;
  brains: { d: AnmosEngine; r: AnmosEngine | "skip" };
  primary: AnmosEngine;
  backup: AnmosEngine;
};
