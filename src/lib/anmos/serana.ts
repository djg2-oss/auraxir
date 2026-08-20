const STORE = "auraxir-serana-v5";
export const SERANA_REFRESH_MS = 7 * 24 * 60 * 60 * 1000;

export const SERANA = {
  id: "serana-local",
  name: "SERANA",
  role: "local-fallback" as const,
  usesApi: false,
  cadence: "weekly",
} as const;

export type SeranaSnap = {
  version: string;
  bakedAt: number;
  nextAt: number;
  replaced: boolean;
};

function weekStamp(d = new Date()) {
  const onejan = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil(((d.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7);
  return `${d.getFullYear()}.${String(week).padStart(2, "0")}`;
}

export function bakeSerana(): SeranaSnap {
  const bakedAt = Date.now();
  return {
    version: `serana-${weekStamp()}`,
    bakedAt,
    nextAt: bakedAt + SERANA_REFRESH_MS,
    replaced: true,
  };
}

export function ensureSeranaCurrent(): SeranaSnap {
  if (typeof localStorage === "undefined") return bakeSerana();
  try {
    const prev = JSON.parse(localStorage.getItem(STORE) || "null") as SeranaSnap | null;
    if (prev && Date.now() < prev.nextAt) return { ...prev, replaced: false };
  } catch {
    /* empty */
  }
  const next = bakeSerana();
  localStorage.setItem(STORE, JSON.stringify(next));
  return next;
}

export function seranaAgeLine(snap: SeranaSnap) {
  const left = Math.max(0, Math.round((snap.nextAt - Date.now()) / 86400000));
  return `${snap.version} · next replace in ${left}d · local, no API`;
}
