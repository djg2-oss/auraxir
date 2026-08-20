import { createServerFn } from "@tanstack/react-start";
import { ANMOS, type AnmosPacket } from "./kernel";
import { planAnmosBuild } from "./plan";
import { mergeCopy, writeKernelCopy, type AnmosCopy } from "./writer";
import { anmosApiLive, grokCopyJson, parseCopyJson } from "./xai";
import { gpuStatus } from "./gpu";

export type AnmosBuildResult = {
  ok: true;
  packet: AnmosPacket;
  copy: AnmosCopy;
  source: "serana" | "grok-4.6" | "serana-fallback";
  model: string;
};

function copyScore(c: AnmosCopy) {
  const n = (s: string) => s.trim().length;
  return n(c.hero.title) + n(c.hero.body) + n(c.about.body) + n(c.cta.title) + c.features.items.length * 24;
}

export const getAnmosStatus = createServerFn({ method: "GET" }).handler(async () => ({
  os: ANMOS.os,
  anmos: ANMOS.fullName,
  version: ANMOS.version,
  brain: ANMOS.brain,
  dual: ANMOS.dual,
  brains: ANMOS.brains,
  engine: ANMOS.engine,
  apiLive: anmosApiLive(),
  gpu: gpuStatus(),
  local: ANMOS.local,
}));

export const runAnmosCopy = createServerFn({ method: "POST" })
  .validator(
    (input: {
      name: string;
      type: string;
      description: string;
      desire: string;
      heroSubtitle: string;
      ctaDefault: string;
    }) => ({
      name: (input.name || "").trim().slice(0, 80),
      type: (input.type || "").trim().slice(0, 40),
      description: (input.description || "").trim().slice(0, 800),
      desire: (input.desire || "").trim().slice(0, 400),
      heroSubtitle: (input.heroSubtitle || "").trim().slice(0, 120),
      ctaDefault: (input.ctaDefault || "").trim().slice(0, 40),
    }),
  )
  .handler(async ({ data }): Promise<AnmosBuildResult> => {
    const apiLive = anmosApiLive();
    const packet = planAnmosBuild({
      description: data.description,
      desire: data.desire,
      type: data.type,
      name: data.name,
      apiLive,
    });
    const serana = writeKernelCopy(data);

    if (!apiLive || packet.brains.d !== "grok-4.6") {
      return { ok: true, packet, copy: serana, source: "serana", model: ANMOS.writer };
    }

    const brief = [
      `Brand: ${data.name}`,
      `Type: ${data.type}`,
      `Description: ${data.description || "(none)"}`,
      `Desired look: ${data.desire || "(none)"}`,
      `Hero cue: ${data.heroSubtitle}`,
      `CTA cue: ${data.ctaDefault}`,
      "Write elite production copy. No guaranteed ROI. No fake testimonials.",
    ].join("\n");

    const budget = Math.max(800, packet.budgetMs);

    if (packet.schedule === "parallel") {
      const [dRaw, rRaw] = await Promise.all([
        grokCopyJson(brief, budget, "D"),
        grokCopyJson(`${brief}\nIndependent first draft. You cannot see the other brain.`, budget, "R"),
      ]);
      const d = dRaw ? parseCopyJson(dRaw) : null;
      const r = rRaw ? parseCopyJson(rRaw) : null;
      const pick = !d ? r : !r ? d : copyScore(r) > copyScore(d) ? r : d;
      if (pick) {
        return { ok: true, packet, copy: mergeCopy(serana, pick), source: "grok-4.6", model: ANMOS.engine };
      }
      return { ok: true, packet, copy: serana, source: "serana-fallback", model: ANMOS.writer };
    }

    const dRaw = await grokCopyJson(brief, budget, "D");
    const d = dRaw ? parseCopyJson(dRaw) : null;

    if (packet.schedule === "backup" && d && copyScore(d) >= 80) {
      return { ok: true, packet, copy: mergeCopy(serana, d), source: "grok-4.6", model: ANMOS.engine };
    }

    let r: AnmosCopy | null = null;
    if (packet.brains.r === "grok-4.6") {
      const rPrompt = d
        ? `${brief}\n\nDraft from brain D. Rewrite it. Keep facts. Cut hype. Stronger and tighter:\n${JSON.stringify(d)}`
        : `${brief}\n\nBrain D missed. Write the copy now.`;
      const rRaw = await grokCopyJson(rPrompt, budget, "R");
      r = rRaw ? parseCopyJson(rRaw) : null;
    }

    const pick = !d ? r : !r ? d : copyScore(r) >= copyScore(d) * 0.92 ? r : d;
    if (pick) {
      return { ok: true, packet, copy: mergeCopy(serana, pick), source: "grok-4.6", model: ANMOS.engine };
    }

    return { ok: true, packet, copy: serana, source: "serana-fallback", model: ANMOS.writer };
  });
