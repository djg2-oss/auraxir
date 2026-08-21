import type { ThemeTokens } from "./catalog";
import { PALETTES, type Palette } from "./showcase";

export const LAB_STORE = "auraxir-lab-v1";

export type LabSession = {
  paletteId: string;
  brand: string;
  images: string[];
};

export function readLab(): LabSession {
  if (typeof localStorage === "undefined") return { paletteId: "aer", brand: "", images: [] };
  try {
    const raw = localStorage.getItem(LAB_STORE);
    if (!raw) return { paletteId: "aer", brand: "", images: [] };
    const p = JSON.parse(raw) as Partial<LabSession>;
    return {
      paletteId: typeof p.paletteId === "string" ? p.paletteId : "aer",
      brand: typeof p.brand === "string" ? p.brand : "",
      images: Array.isArray(p.images) ? p.images.filter((u) => typeof u === "string").slice(0, 8) : [],
    };
  } catch {
    return { paletteId: "aer", brand: "", images: [] };
  }
}

export function writeLab(next: LabSession) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(LAB_STORE, JSON.stringify(next));
}

export function paletteById(id: string): Palette {
  return PALETTES.find((p) => p.id === id) ?? PALETTES[0]!;
}

export function themeFromPalette(pal: Palette): Partial<ThemeTokens> {
  return {
    surface: pal.paper,
    text: pal.ink,
    primary: pal.colors[2] ?? pal.ink,
    accent: pal.colors[3] ?? pal.colors[2] ?? pal.ink,
    muted: pal.colors[1] ?? pal.paper,
  };
}
