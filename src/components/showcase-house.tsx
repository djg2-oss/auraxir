import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { PALETTES, WORKS } from "@/lib/showcase";
import { cn } from "@/lib/utils";

function VuRack() {
  return (
    <div className="flex h-10 items-end gap-0.5" aria-hidden>
      {Array.from({ length: 22 }).map((_, i) => (
        <span
          key={i}
          className="vu w-1 rounded-[1px] bg-[var(--color-gold)]"
          style={{ height: `${40 + ((i * 17) % 60)}%` }}
        />
      ))}
    </div>
  );
}

function MusicScreen() {
  return (
    <div className="flex h-full flex-col bg-[#0b0a09] text-[#e8dcc8]">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <span className="font-[family-name:var(--font-display)] text-sm tracking-tight">North Room</span>
        <span className="font-mono text-[9px] tracking-wider text-[#c9a15b] uppercase">Live session</span>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <img src="/showcase/music.jpg" alt="" className="h-full w-full object-cover opacity-80" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-3">
          <p className="text-[10px] tracking-[0.16em] text-[#c9a15b] uppercase">Studio A · Tape 04</p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-lg leading-none">Midnight Signal</p>
          <VuRack />
        </div>
      </div>
    </div>
  );
}

function VideoScreen() {
  return (
    <div className="flex h-full flex-col bg-[#0c0b0a] text-[#f2ece4]">
      <div className="flex items-center justify-between px-2 py-1.5 font-mono text-[8px] tracking-wider text-[#d4a574] uppercase">
        <span>Halo Grade</span>
        <span className="tc">01:14:22:08</span>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden bg-black">
        <img src="/showcase/video.jpg" alt="" className="h-full w-full object-cover" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[8%] bg-black" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[8%] bg-black" />
      </div>
      <div className="overflow-hidden border-t border-white/10 py-1.5">
        <div className="reel flex w-[200%] gap-1 px-1">
          {[...WORKS, ...WORKS].map((w, i) => (
            <img
              key={`${w.id}-${i}`}
              src={w.src}
              alt=""
              className="h-8 w-14 shrink-0 object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SiteModels3D() {
  return (
    <div className="site-stage relative mx-auto h-[340px] w-full max-w-lg sm:h-[420px]">
      <div className="site-model absolute left-0 top-6 w-[78%] overflow-hidden rounded-[18px] border border-white/15 bg-[#1a1a1c] p-2 shadow-[0_30px_80px_rgb(0_0_0_/_0.55)]">
        <div className="mb-1.5 flex justify-center">
          <span className="h-1 w-10 rounded-full bg-white/20" />
        </div>
        <div className="aspect-[16/10] overflow-hidden rounded-[10px]">{MusicScreen()}</div>
      </div>
      <div className="site-model site-model-phone absolute bottom-0 right-0 w-[34%] overflow-hidden rounded-[28px] border border-white/15 bg-[#141416] p-1.5 shadow-[0_24px_60px_rgb(0_0_0_/_0.6)]">
        <div className="mx-auto mb-1 h-1 w-8 rounded-full bg-white/20" />
        <div className="aspect-[9/16] overflow-hidden rounded-[20px]">{VideoScreen()}</div>
      </div>
    </div>
  );
}

export function AerStudio() {
  const [active, setActive] = useState(PALETTES[0]!.id);
  const pal = PALETTES.find((p) => p.id === active) ?? PALETTES[0]!;
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-gold)]">
        AER Color Lab
      </p>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-5xl">
        The studio is the color lab.
      </h2>
      <p className="mt-3 max-w-xl text-sm text-[var(--color-fg-muted)]">
        Examples of the colorations we use. You brand your own site after you subscribe.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {PALETTES.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActive(p.id)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs",
              p.id === active
                ? "border-[var(--color-gold)] text-[var(--color-fg)]"
                : "border-[var(--color-border)] text-[var(--color-fg-muted)]",
            )}
          >
            {p.name}
          </button>
        ))}
      </div>
      <figure
        className="mt-6 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)]"
        style={{ background: pal.paper, color: pal.ink }}
      >
        <img src={pal.src} alt={`${pal.name} coloration`} className="aspect-[16/9] w-full object-cover" />
        <figcaption className="p-5 sm:p-6">
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-70">{pal.role}</p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-3xl">{pal.name}</p>
          <div className="mt-4 flex h-12 overflow-hidden rounded-[var(--radius-sm)]">
            {pal.colors.map((c) => (
              <span key={c} className="flex-1" style={{ background: c }} title={c} />
            ))}
          </div>
          <p className="mt-3 font-mono text-[10px] tracking-wider opacity-60">{pal.colors.join("  ")}</p>
          <p className="mt-4 text-sm opacity-80">
            <Link to="/lab" className="text-inherit underline-offset-4 hover:underline">
              Full example lab
            </Link>
            {" · "}
            brand yours in the builder after you subscribe.
          </p>
        </figcaption>
      </figure>
    </div>
  );
}

export function FeaturedHouses() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <article className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[#0b0a09]">
        <div className="relative aspect-[16/10]">
          <img src="/showcase/music.jpg" alt="North Room music house" className="h-full w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-5">
            <p className="text-[10px] tracking-[0.18em] text-[#c9a15b] uppercase">Music house</p>
            <h3 className="mt-1 font-[family-name:var(--font-display)] text-3xl text-[#e8dcc8]">North Room</h3>
            <VuRack />
          </div>
        </div>
        <div className="space-y-3 p-5 text-sm text-[#cfc4b0]">
          <p>Polished desk. Live meters. The site behaves like a session — not a playlist template.</p>
          <div className="grid grid-cols-3 gap-2 font-mono text-[10px] uppercase tracking-wider text-[#c9a15b]">
            <span>Booking</span>
            <span>Tape log</span>
            <span>Masters</span>
          </div>
        </div>
      </article>
      <article className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[#0c0b0a]">
        <div className="relative aspect-[16/10]">
          <img src="/showcase/video.jpg" alt="Halo Grade video house" className="h-full w-full object-cover" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[9%] bg-black" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[9%] bg-black" />
          <p className="absolute left-4 top-4 font-mono text-[10px] tracking-wider text-[#d4a574] uppercase">
            Rec · 4K · 01:14:22
          </p>
        </div>
        <div className="space-y-3 p-5 text-sm text-[#e4d8c8]">
          <p className="font-[family-name:var(--font-display)] text-3xl">Halo Grade</p>
          <p>Video production as a 3D object. Reels in motion. The grade is the brand.</p>
        </div>
      </article>
    </div>
  );
}

export function AppAtlas() {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-fg-subtle)]">
        Work we will build
      </p>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-4xl">
        Better than the market they sit in.
      </h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WORKS.map((w) => (
          <article
            key={w.id}
            className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)]"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img src={w.src} alt={`${w.title} ${w.kind}`} className="h-full w-full object-cover" />
            </div>
            <div className="p-4">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--color-gold)]">{w.kind}</p>
              <h3 className="mt-1 font-[family-name:var(--font-display)] text-xl text-[var(--color-fg)]">{w.title}</h3>
              <p className="mt-1 text-sm text-[var(--color-fg-muted)]">{w.line}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function ShowcaseHouse() {
  return (
    <div className="space-y-20">
      <AerStudio />
      <FeaturedHouses />
      <AppAtlas />
    </div>
  );
}
