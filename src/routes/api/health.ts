import { createFileRoute } from "@tanstack/react-router";
import { ANMOS } from "@/lib/anmos";
import { gpuStatus } from "@/lib/anmos/gpu";
import { anmosApiLive } from "@/lib/anmos/xai";

export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: () =>
        Response.json({
          ok: true,
          name: "Auraxir",
          os: ANMOS.os,
          anmos: ANMOS.fullName,
          version: ANMOS.version,
          brain: ANMOS.brain,
          dual: true,
          brains: ANMOS.brains,
          engine: ANMOS.engine,
          engineLive: anmosApiLive(),
          gpu: gpuStatus(),
          local: ANMOS.local,
          ts: Date.now(),
        }),
    },
  },
});
