import { createServerFn } from "@tanstack/react-start";
import { anmosXaiKey } from "./xai";
import { PALETTES } from "@/lib/showcase";

export const generateLabStill = createServerFn({ method: "POST" })
  .validator((input: { brand: string; paletteId: string; kind?: string }) => ({
    brand: (input.brand || "").trim().slice(0, 80),
    paletteId: (input.paletteId || "aer").slice(0, 40),
    kind: (input.kind || "site").slice(0, 40),
  }))
  .handler(async ({ data }) => {
    const key = anmosXaiKey();
    if (key.length < 8) {
      return { ok: false as const, error: "Engine dark — use the lab stills until the hosted path is live.", url: "" };
    }
    const pal = PALETTES.find((p) => p.id === data.paletteId);
    const colors = pal?.colors.join(", ") ?? "#0a0a0b, #c4b08a";
    const brand = data.brand || "the house";
    const prompt = [
      `Photoreal editorial still for a premium ${data.kind} brand named ${brand}.`,
      `Color climate strictly: ${colors}.`,
      "No people faces, no logos, no readable UI text, no watermarks.",
      "Quiet luxury photography, sharp, 16:9.",
    ].join(" ");
    try {
      const res = await fetch("https://api.x.ai/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: "grok-imagine-image",
          prompt,
          n: 1,
          resolution: "1k",
        }),
      });
      if (!res.ok) return { ok: false as const, error: `Imagine ${res.status}`, url: "" };
      const body = (await res.json()) as { data?: { url?: string }[] };
      const url = body.data?.[0]?.url ?? "";
      if (!url) return { ok: false as const, error: "No still returned", url: "" };
      return { ok: true as const, error: "", url };
    } catch {
      return { ok: false as const, error: "Imagine failed", url: "" };
    }
  });
