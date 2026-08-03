import { Aperture, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IMAGO, IMAGO_STAGES } from "@/lib/imago";

/** Landing / market block — correct product name, image-first story */
export function ImagoMarketingSection() {
  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline">
          <Aperture className="mr-1 size-3" />
          {IMAGO.name}
        </Badge>
        <Badge variant="accent">{IMAGO.principle}</Badge>
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-4xl">
        {IMAGO.principle}
        <span className="mt-2 block text-[var(--color-fg-muted)]">{IMAGO.marketingOneLiner}</span>
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--color-fg-muted)] sm:text-base">
        {IMAGO.promise}
      </p>

      <div
        className="mt-8 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)]"
        style={{
          background: "linear-gradient(125deg, #0b0b0f 0%, #16161c 40%, #c9a22744 120%)",
        }}
      >
        <div className="p-6 sm:p-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Correct market name
          </p>
          <p className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{IMAGO.seal}</p>
          <p className="mt-2 max-w-xl text-sm text-white/80">{IMAGO.tagline}</p>
          <Button asChild className="mt-6" size="lg" variant="secondary">
            <Link to="/start" search={{ mode: "express" }}>
              Build under Auraxir
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>

      <p className="mt-10 text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-fg-subtle)]">
        Imago stages — attach when the image can be stronger
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {IMAGO_STAGES.map((stage) => (
          <div
            key={stage.id}
            className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)]"
          >
            <div className="h-16" style={{ background: stage.atmosphere.gradient }} />
            <div className="p-4">
              <p className="text-sm font-semibold text-[var(--color-fg)]">{stage.name}</p>
              <p className="mt-1 text-xs font-medium text-[var(--color-fg)]">{stage.hook}</p>
              <p className="mt-2 text-xs leading-relaxed text-[var(--color-fg-muted)]">
                {stage.blurb}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
