import { createServerFn } from "@tanstack/react-start";
import { ANMOS, type AnmosPacket } from "./kernel";
import { planAnmosBuild } from "./plan";
import { mergeCopy, writeKernelCopy, type AnmosCopy } from "./writer";
import { anmosApiLive, grokCopyJson, parseCopyJson } from "./xai";

export type AnmosBuildResult = {
  ok: true;
  packet: AnmosPacket;
  copy: AnmosCopy;
  source: "kernel" | "grok-4.6" | "kernel-fallback";
  model: string;
};

export const getAnmosStatus = createServerFn({ method: "GET" }).handler(async () => ({
  os: ANMOS.os,
  anmos: ANMOS.fullName,
  version: ANMOS.version,
  brain: ANMOS.brain,
  engine: ANMOS.engine,
  apiLive: anmosApiLive(),
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
      apiLive,
    });
    const kernel = writeKernelCopy(data);

    if (packet.brains.r !== "grok-4.6" || packet.budgetMs <= 0) {
      return { ok: true, packet, copy: kernel, source: "kernel", model: ANMOS.writer };
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

    const raw = await grokCopyJson(brief, packet.budgetMs);
    const parsed = raw ? parseCopyJson(raw) : null;
    if (parsed) {
      return {
        ok: true,
        packet,
        copy: mergeCopy(kernel, parsed),
        source: "grok-4.6",
        model: ANMOS.engine,
      };
    }
    return {
      ok: true,
      packet,
      copy: kernel,
      source: "kernel-fallback",
      model: ANMOS.writer,
    };
  });
