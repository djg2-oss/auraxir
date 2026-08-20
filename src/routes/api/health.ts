import { createFileRoute } from "@tanstack/react-router";
import { ANMOS } from "@/lib/anmos";
import { anmosApiLive } from "@/lib/anmos/xai";

export const Route = createFileRoute("/api/health" as never)({
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
          engine: ANMOS.engine,
          engineLive: anmosApiLive(),
          ts: Date.now(),
        }),
    },
  },
});
