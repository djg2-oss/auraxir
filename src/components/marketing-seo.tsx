import { Quote } from "lucide-react";
import { MARKETING_PHRASES } from "@/lib/brand";
import { SEO_FAQ, SEO_KEYWORDS } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function MarketingPhraseWall({ className }: { className?: string }) {
  return (
    <div className={cn("min-w-0", className)}>
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-fg-subtle)]">
        Brand voice
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-fg)]">
        Elite language for a premium name
      </h2>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {MARKETING_PHRASES.map((phrase) => (
          <blockquote
            key={phrase}
            className="flex min-w-0 gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] p-4"
          >
            <Quote className="mt-0.5 size-4 shrink-0 text-[var(--color-fg-subtle)]" />
            <p className="text-sm font-medium leading-relaxed text-[var(--color-fg)]">{phrase}</p>
          </blockquote>
        ))}
      </div>
    </div>
  );
}

export function SeoFaqSection({ className }: { className?: string }) {
  return (
    <section
      className={cn("min-w-0", className)}
      aria-labelledby="auraxir-faq-heading"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-fg-subtle)]">
        FAQ
      </p>
      <h2
        id="auraxir-faq-heading"
        className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-fg)]"
      >
        Elite websites & apps — answered
      </h2>
      <p className="mt-3 max-w-2xl text-sm text-[var(--color-fg-muted)]">
        What you get with Auraxir: best-fit production, premium design, and a clear promise.
      </p>
      <div className="mt-8 space-y-3">
        {SEO_FAQ.map((item) => (
          <details
            key={item.q}
            className="group rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3"
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
          >
            <summary
              className="cursor-pointer list-none text-sm font-semibold text-[var(--color-fg)] marker:content-none"
              itemProp="name"
            >
              <span className="flex items-center justify-between gap-3">
                {item.q}
                <span className="text-[var(--color-fg-subtle)] transition group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <div
              className="mt-3 border-t border-[var(--color-border)] pt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]"
              itemScope
              itemProp="acceptedAnswer"
              itemType="https://schema.org/Answer"
            >
              <p itemProp="text">{item.a}</p>
            </div>
          </details>
        ))}
      </div>
      <p className="mt-8 text-[11px] leading-relaxed text-[var(--color-fg-subtle)]">
        <span className="font-medium text-[var(--color-fg-muted)]">Related: </span>
        {SEO_KEYWORDS.join(" · ")}
      </p>
    </section>
  );
}
