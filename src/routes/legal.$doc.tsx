import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getLegalDoc, LEGAL_META } from "@/lib/legal-docs";

export const Route = createFileRoute("/legal/$doc")({
  component: LegalDocPage,
});

function LegalDocPage() {
  const { doc: docId } = Route.useParams();
  const doc = getLegalDoc(docId);
  if (!doc) throw notFound();

  return (
    <article className="min-w-0">
      <Badge variant="outline">Legal</Badge>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-fg)]">
        {doc.title}
      </h1>
      <p className="mt-2 text-sm text-[var(--color-fg-muted)]">{doc.summary}</p>
      <p className="mt-2 text-xs text-[var(--color-fg-subtle)]">
        {LEGAL_META.company} · Effective {LEGAL_META.effectiveDate} · Updated{" "}
        {LEGAL_META.lastUpdated}
      </p>
      <p className="mt-2 text-xs italic text-[var(--color-fg-subtle)]">
        {LEGAL_META.notLegalAdvice}
      </p>

      <div className="mt-10 space-y-10">
        {doc.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-lg font-semibold text-[var(--color-fg)]">{section.heading}</h2>
            <div className="mt-3 space-y-3">
              {section.body.map((para, i) => (
                <p
                  key={i}
                  className="text-sm leading-relaxed text-[var(--color-fg-muted)]"
                >
                  {para}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap gap-2 border-t border-[var(--color-border)] pt-6">
        <Button asChild variant="outline" size="sm">
          <Link to="/legal">All legal docs</Link>
        </Button>
        <Button asChild variant="ghost" size="sm">
          <Link to="/legal/$doc" params={{ doc: "terms" }}>
            Terms
          </Link>
        </Button>
        <Button asChild variant="ghost" size="sm">
          <Link to="/legal/$doc" params={{ doc: "adult" }}>
            Adult addendum
          </Link>
        </Button>
        <Button asChild variant="ghost" size="sm">
          <Link to="/legal/$doc" params={{ doc: "indemnity" }}>
            Indemnity
          </Link>
        </Button>
      </div>
    </article>
  );
}
