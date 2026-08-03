import { ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { BrandOverlayBar } from "@/components/brand-mark";
import { BRAND } from "@/lib/brand";
import type { SiteProject, SiteSection, ThemeTokens } from "@/lib/catalog";
import { buildProductionMeta } from "@/lib/production";
import { AdultAgeGate } from "@/components/content-responsibility";
import { isAdultProject } from "@/lib/content-responsibility";
import { listImagoPages } from "@/lib/imago";
import { cn } from "@/lib/utils";

function fontFamily(font: ThemeTokens["font"]) {
  if (font === "serif") return "var(--font-serif), Georgia, serif";
  if (font === "display") return "var(--font-display), system-ui, sans-serif";
  return "var(--font-sans), system-ui, sans-serif";
}

function radiusClass(radius: ThemeTokens["radius"]) {
  if (radius === "sharp") return "0.25rem";
  if (radius === "round") return "1.25rem";
  return "0.75rem";
}

function contrastFg(bg: string, text: string, fallbackLight = "#fafafa") {
  const isDarkSurface =
    bg.startsWith("#0") ||
    bg.startsWith("#1") ||
    text.startsWith("#e") ||
    text.startsWith("#f");
  return isDarkSurface ? text : fallbackLight;
}

function SectionBlock({
  section,
  theme,
  production,
}: {
  section: SiteSection;
  theme: ThemeTokens;
  production: boolean;
}) {
  if (!section.visible) return null;
  const r = radiusClass(theme.radius);
  const heroFg = contrastFg(theme.primary, theme.text);

  if (section.type === "hero") {
    return (
      <section
        data-section="hero"
        data-tie-in={section.isTieIn ? "1" : "0"}
        data-prod={production ? "1" : "0"}
        className="relative overflow-hidden px-6 py-16 sm:px-10 sm:py-24"
        style={{ background: theme.primary, color: heroFg }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 70% 20%, ${theme.accent}55, transparent 60%)`,
          }}
        />
        <div className="relative mx-auto max-w-3xl">
          {section.isTieIn && (
            <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.14em] opacity-60">
              Imago · Image standard
            </p>
          )}
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] opacity-70">
            {section.subtitle}
          </p>
          <h1
            className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
            style={{ lineHeight: 1.08, textWrap: "balance" as const }}
          >
            {section.title}
          </h1>
          <p
            className="mt-5 max-w-2xl text-base opacity-90 sm:text-lg"
            style={{ textWrap: "pretty" as const }}
          >
            {section.body}
          </p>
          {section.ctaLabel && (
            <a
              href={section.ctaHref || "#contact"}
              data-cta="primary"
              className="mt-8 inline-flex h-12 min-w-[9rem] items-center justify-center px-6 text-sm font-semibold no-underline transition-transform duration-200 hover:scale-[1.02]"
              style={{
                background: theme.accent,
                color: contrastFg(theme.accent, theme.text, "#0b0b0f"),
                borderRadius: r,
              }}
            >
              {section.ctaLabel}
            </a>
          )}
        </div>
      </section>
    );
  }

  if (section.type === "footer") {
    return (
      <footer
        className="border-t px-6 py-10 sm:px-10"
        style={{ borderColor: `${theme.muted}33`, background: theme.surface }}
      >
        <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold" style={{ color: theme.text }}>
              {section.title}
            </p>
            <p className="mt-1 text-xs" style={{ color: theme.muted }}>
              {section.body}
            </p>
          </div>
          {production && (
            <p className="inline-flex items-center gap-1.5 text-[11px]" style={{ color: theme.muted }}>
              <ShieldCheck className="size-3.5" />
              {BRAND.productionSeal}
            </p>
          )}
        </div>
      </footer>
    );
  }

  return (
    <section
      id={section.type === "contact" ? "contact" : section.type === "pricing" ? "pricing" : undefined}
      data-section={section.type}
      data-tie-in={section.isTieIn ? "1" : "0"}
      className="px-6 py-14 sm:px-10 sm:py-16"
      style={{ background: theme.surface, color: theme.text }}
    >
      <div className="mx-auto max-w-5xl">
        {section.isTieIn && (
          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.14em]" style={{ color: theme.muted }}>
            Imago · Image standard · /{section.pageSlug}
          </p>
        )}
        {section.subtitle && (
          <p
            className="mb-2 text-xs font-medium uppercase tracking-[0.14em]"
            style={{ color: theme.muted }}
          >
            {section.subtitle}
          </p>
        )}
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{section.title}</h2>
        {section.body && (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed sm:text-base" style={{ color: theme.muted }}>
            {section.body}
          </p>
        )}
        {section.items.length > 0 && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {section.items.map((item, i) => (
              <article
                key={`${item.title}-${i}`}
                className="border p-4"
                style={{
                  borderColor: `${theme.muted}33`,
                  borderRadius: r,
                  background: `${theme.primary}08`,
                }}
              >
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: theme.muted }}>
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        )}
        {section.ctaLabel && (
          <a
            href={section.ctaHref || "#contact"}
            className="mt-8 inline-flex h-11 items-center justify-center px-5 text-sm font-semibold no-underline"
            style={{
              background: theme.primary,
              color: contrastFg(theme.primary, theme.text),
              borderRadius: r,
            }}
          >
            {section.ctaLabel}
          </a>
        )}
      </div>
    </section>
  );
}

function useProductionHead(project: SiteProject, enabled: boolean) {
  useEffect(() => {
    if (!enabled || typeof document === "undefined") return;
    const meta = buildProductionMeta(project);
    const prevTitle = document.title;
    document.title = meta.title;

    const ensure = (key: string, content: string, prop = "name") => {
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${prop}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(prop, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    ensure("description", meta.description);
    ensure("robots", meta.robots);
    ensure("theme-color", meta.themeColor);
    ensure("og:title", meta.ogTitle, "property");
    ensure("og:description", meta.ogDescription, "property");
    ensure("og:type", "website", "property");
    ensure("og:url", meta.canonical, "property");
    ensure("og:site_name", BRAND.legalName, "property");
    ensure("twitter:card", "summary_large_image");
    ensure("application-name", BRAND.legalName);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = meta.canonical;

    let script = document.getElementById("auraxir-jsonld") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "auraxir-jsonld";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      ...meta.jsonLd,
      publisher: {
        "@type": "Organization",
        name: BRAND.legalName,
        url: `https://${BRAND.domain}`,
        brand: BRAND.qualityMark,
      },
    });

    return () => {
      document.title = prevTitle;
    };
  }, [project, enabled]);
}

export function SiteRenderer({
  project,
  className,
  showBrandChrome = true,
  production = true,
}: {
  project: SiteProject;
  className?: string;
  showBrandChrome?: boolean;
  production?: boolean;
}) {
  const { theme } = project;
  const tiePages = useMemo(() => listImagoPages(project.sections), [project.sections]);
  const [page, setPage] = useState<"home" | string>("home");
  const adult = isAdultProject({
    businessType: project.needs?.businessType,
    features: project.needs?.features,
    siteTypeId: project.siteTypeId,
  }) || project.adultVertical;
  const [ageOk, setAgeOk] = useState(!adult);
  useProductionHead(project, production);

  const sections = useMemo(() => {
    if (page === "home") {
      // Home: main sections only (no pageSlug), always show footer
      return project.sections.filter(
        (s) => s.visible && (!s.pageSlug || s.type === "footer"),
      );
    }
    return project.sections.filter(
      (s) => s.visible && (s.pageSlug === page || s.type === "footer"),
    );
  }, [project.sections, page]);

  return (
    <div
      className={cn("overflow-hidden", className)}
      style={{
        fontFamily: fontFamily(theme.font),
        background: theme.surface,
        color: theme.text,
        ["--prod-accent" as string]: theme.accent,
        ["--prod-primary" as string]: theme.primary,
      }}
      data-brand={BRAND.legalName}
      data-quality-service={BRAND.qualityMark}
      data-production={production ? "true" : "false"}
      data-project={project.id}
      data-published={project.published ? "true" : "false"}
      data-page={page}
    >
      {showBrandChrome && (
        <BrandOverlayBar domain={project.domain} production={production} />
      )}
      {adult && !ageOk && <AdultAgeGate onConfirm={() => setAgeOk(true)} />}
      {(!adult || ageOk) && (
      <>

      {/* Seamless site nav — home + Auraxir tie-in pages */}
      <nav
        className="flex flex-wrap items-center gap-2 border-b px-4 py-2 sm:px-6"
        style={{ borderColor: `${theme.muted}33`, background: theme.surface }}
        aria-label="Site pages"
      >
        <button
          type="button"
          onClick={() => setPage("home")}
          className="rounded-full px-3 py-1 text-xs font-medium"
          style={{
            background: page === "home" ? theme.primary : "transparent",
            color: page === "home" ? contrastFg(theme.primary, theme.text) : theme.muted,
          }}
        >
          Home
        </button>
        {tiePages.map((p) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => setPage(p.slug)}
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{
              background: page === p.slug ? theme.primary : "transparent",
              color: page === p.slug ? contrastFg(theme.primary, theme.text) : theme.muted,
            }}
          >
            {p.name}
          </button>
        ))}
      </nav>

      <main id="main" role="main">
        {sections.map((section) => (
          <SectionBlock
            key={section.id}
            section={section}
            theme={theme}
            production={production}
          />
        ))}
      </main>
      <div id="end" className="sr-only">
        End of {project.name} · {BRAND.legalName}
      </div>
      </>
      )}
      {adult && (
        <p className="border-t px-4 py-2 text-center text-[10px]" style={{ borderColor: `${theme.muted}33`, color: theme.muted }}>
          18+ · Auraxir brand overlay only · You are solely responsible for all content
        </p>
      )}
    </div>
  );
}
