import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Wand2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { G2P, G2P_STYLE_CORPUS } from "@/lib/g2p-ai";

/** Flagship landing block for Auraxir G2P AI */
export function G2PMarketingSection() {
  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="accent">
          <Wand2 className="mr-1 size-3" />
          {G2P.name}
        </Badge>
        <Badge variant="outline">{G2P.version}</Badge>
        <Badge variant="outline">{G2P.principle}</Badge>
      </div>

      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-4xl">
        {G2P.tagline}
      </h2>
      <p className="mt-2 text-lg text-[var(--color-fg-muted)]">{G2P.fullName}</p>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--color-fg-muted)] sm:text-base">
        {G2P.promise}
      </p>

      <div
        className="mt-8 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)]"
        style={{
          background: "linear-gradient(125deg, #0b0b0f 0%, #1a1528 40%, #7c5cff44 120%)",
        }}
      >
        <div className="p-6 sm:p-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            {G2P.seal}
          </p>
          <p className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{G2P.principle}</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {G2P.marketLines.map((line) => (
              <li key={line} className="text-sm text-white/80">
                · {line}
              </li>
            ))}
          </ul>
          <Button asChild className="mt-6" size="lg" variant="secondary">
            <Link to="/start" search={{ mode: "full" }}>
              <Sparkles className="size-4" />
              Match my look with G2P
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>

      <p className="mt-10 text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-fg-subtle)]">
        Trained style systems in the corpus
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {G2P_STYLE_CORPUS.map((s) => (
          <div
            key={s.id}
            className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-card)]"
          >
            <div
              className="h-12"
              style={{
                background: `linear-gradient(135deg, ${s.theme.primary}, ${s.theme.accent})`,
              }}
            />
            <div className="p-2">
              <p className="text-[11px] font-medium text-[var(--color-fg)]">{s.name}</p>
              <p className="mt-0.5 line-clamp-2 text-[10px] text-[var(--color-fg-muted)]">
                {s.blurb}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
