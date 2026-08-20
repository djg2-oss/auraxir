/** ANMOS — dual grok-4.6 on the Auraxir builder. Agent Black is the OS, not a second local model. */
export const ANMOS = {
  id: "anmos",
  name: "ANMOS",
  fullName: "Auraxir Native Model Operating System",
  version: "5.0.0",
  os: "AURAXIR",
  brain: "G2P-AGENT-BLACK",
  brains: { d: "grok-4.6", r: "grok-4.6" },
  dual: true,
  engine: "grok-4.6",
  writer: "serana-local",
  local: "SERANA",
  licensee: "G2P",
  owner: "DANNY GREEN",
} as const;

export type AnmosSchedule = "series" | "parallel" | "backup";
export type AnmosEngine = "serana" | "grok-4.6";

export type AnmosPacket = {
  id: string;
  os: "AURAXIR";
  anmos: true;
  dual: true;
  schedule: AnmosSchedule;
  why: string;
  budgetMs: number;
  variance: number;
  brains: { d: AnmosEngine; r: AnmosEngine | "skip" };
  primary: AnmosEngine;
  backup: AnmosEngine;
};
