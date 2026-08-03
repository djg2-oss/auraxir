/**
 * Production boost layer — ADDITIVE only.
 * Brands Auraxir Elite Quality Service on production; never exposes stack vendors.
 */
import { BRAND } from "./brand";
import type { SiteProject, SiteSection } from "./catalog";
import { getHostPlan } from "./catalog";

export interface ProductionScore {
  total: number;
  max: number;
  percent: number;
  grade: "A" | "B" | "C" | "D";
  checks: ProductionCheck[];
  boostsApplied: string[];
}

export interface ProductionCheck {
  id: string;
  label: string;
  passed: boolean;
  weight: number;
  fix?: string;
}

export interface ProductionMeta {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  robots: string;
  themeColor: string;
  jsonLd: Record<string, unknown>;
}

function visibleSections(project: SiteProject): SiteSection[] {
  return project.sections.filter((s) => s.visible);
}

function heroSection(project: SiteProject) {
  return visibleSections(project).find((s) => s.type === "hero");
}

function hasCta(project: SiteProject) {
  return visibleSections(project).some(
    (s) =>
      (s.type === "hero" || s.type === "cta" || s.type === "contact") &&
      Boolean(s.ctaLabel?.trim()),
  );
}

function contentDensity(project: SiteProject) {
  return visibleSections(project).reduce((n, s) => {
    return n + (s.title?.length ?? 0) + (s.body?.length ?? 0) + s.items.length * 40;
  }, 0);
}

export function scoreProduction(project: SiteProject): ProductionScore {
  const host = getHostPlan(project.builderId ?? project.hostPlanId);
  const sections = visibleSections(project);
  const hero = heroSection(project);
  const density = contentDensity(project);

  const checks: ProductionCheck[] = [
    {
      id: "elite-engine",
      label: "Elite Quality Service line assigned",
      passed: Boolean(host.elite),
      weight: 12,
    },
    {
      id: "always-on",
      label: "Always-On dual FE/BE when required",
      passed:
        !project.needs?.needsAlwaysOn ||
        project.alwaysOnTier === "dual" ||
        project.alwaysOnTier === "max",
      weight: 8,
      fix: "Enable Always-On dual frontend + dual backend for continuous uptime",
    },
    {
      id: "auraxir-shield",
      label: "Auraxir Shield elite encryption layer",
      passed: Boolean(project.shieldTier),
      weight: 10,
      fix: "Apply Auraxir Shield Core / Shield / Shield Max",
    },
    {
      id: "hero-copy",
      label: "Hero has strong title + body",
      passed: Boolean(hero?.title?.trim() && (hero?.body?.length ?? 0) >= 40),
      weight: 12,
      fix: "Expand hero body to at least ~40 characters",
    },
    {
      id: "cta-path",
      label: "Primary CTA path present",
      passed: hasCta(project),
      weight: 12,
      fix: "Add a button label on hero, CTA, or contact",
    },
    {
      id: "contact-or-pricing",
      label: "Conversion section live (contact or pricing)",
      passed: sections.some((s) => s.type === "contact" || s.type === "pricing"),
      weight: 10,
      fix: "Show contact or pricing section",
    },
    {
      id: "section-count",
      label: "Enough visible sections (4+)",
      passed: sections.length >= 4,
      weight: 8,
      fix: "Unhide more sections for complete production",
    },
    {
      id: "content-density",
      label: "Content density production-ready",
      passed: density >= 280,
      weight: 10,
      fix: "Add more body copy and items before publish",
    },
    {
      id: "domain",
      label: "Production domain set",
      passed: Boolean(project.domain?.includes(".")),
      weight: 8,
    },
    {
      id: "brand-overlay",
      label: "Auraxir Elite Quality Service seal",
      passed: true,
      weight: 10,
    },
    {
      id: "secure-net",
      label: "Secure network planned when needed",
      passed:
        !project.needs?.needsSecureNetwork ||
        project.secureNetworkEnabled ||
        host.vpn ||
        host.tunneling,
      weight: 8,
      fix: "Enable Auraxir secure network for this project",
    },
    {
      id: "quality-pass",
      label: "Elite QA marked",
      passed: project.qualityPassed,
      weight: 6,
      fix: "Run elite QA / boost production",
    },
    {
      id: "theme-contrast",
      label: "Theme colors defined",
      passed: Boolean(project.theme.primary && project.theme.accent && project.theme.text),
      weight: 4,
    },
  ];

  const max = checks.reduce((s, c) => s + c.weight, 0);
  const total = checks.reduce((s, c) => s + (c.passed ? c.weight : 0), 0);
  const percent = Math.round((total / max) * 100);
  const grade: ProductionScore["grade"] =
    percent >= 90 ? "A" : percent >= 75 ? "B" : percent >= 60 ? "C" : "D";

  const boostsApplied: string[] = [
    `${BRAND.productionSeal} chrome`,
    "SEO meta + Open Graph (Auraxir publisher)",
    "JSON-LD with Elite Quality Service brand",
    "Conversion data attributes",
    "Reduced-motion safe polish",
    "Mobile-first production spacing",
  ];
  if (project.secureNetworkEnabled) boostsApplied.push("Auraxir secure network armed");
  if (host.kind === "app") boostsApplied.push("App shell production patterns");
  if (host.kind === "commerce") boostsApplied.push("Commerce conversion path");

  return { total, max, percent, grade, checks, boostsApplied };
}

export function buildProductionMeta(project: SiteProject): ProductionMeta {
  const hero = heroSection(project);
  const title = `${project.name} · ${BRAND.legalName}`;
  const description =
    hero?.body?.trim().slice(0, 160) ||
    `${project.name} — ${BRAND.productionSeal}.`;
  const canonical = `https://${project.domain}`;

  return {
    title,
    description,
    canonical,
    ogTitle: project.name,
    ogDescription: description,
    robots: project.published ? "index,follow" : "noindex,nofollow",
    themeColor: project.theme.primary,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: project.name,
      url: canonical,
      description,
      publisher: {
        "@type": "Organization",
        name: BRAND.legalName,
        url: `https://${BRAND.domain}`,
        brand: BRAND.qualityMark,
      },
    },
  };
}

export function boostProjectForProduction(project: SiteProject): Partial<SiteProject> {
  const sections = project.sections.map((section) => {
    if (!section.visible) return section;
    const next = { ...section };

    if (section.type === "hero") {
      if (!next.ctaLabel?.trim()) next.ctaLabel = "Get started";
      if (!next.ctaHref?.trim()) next.ctaHref = "#contact";
      if (!next.body?.trim()) {
        next.body = `${project.name} delivers results with a clear offer and a fast path to take the next step.`;
      }
      if (!next.subtitle?.trim()) next.subtitle = "Welcome";
    }

    if (section.type === "cta") {
      if (!next.ctaLabel?.trim()) next.ctaLabel = "Contact us";
      if (!next.ctaHref?.trim()) next.ctaHref = "#contact";
    }

    if (section.type === "contact") {
      if (!next.ctaLabel?.trim()) next.ctaLabel = "Send message";
      if (!next.body?.trim()) {
        next.body = "Tell us about your project. We reply within one business day.";
      }
    }

    if (section.type === "footer" && !next.body?.trim()) {
      next.body = `© ${new Date().getFullYear()} ${project.name}. All rights reserved.`;
    }

    if (
      (section.type === "features" ||
        section.type === "services" ||
        section.type === "testimonials" ||
        section.type === "pricing" ||
        section.type === "gallery") &&
      section.items.length === 0
    ) {
      next.items = [
        { title: "Proven results", body: "Clear outcomes your customers can understand." },
        { title: "Trusted process", body: "A reliable path from first visit to decision." },
        { title: "Ready to scale", body: "Built to grow with demand and attention." },
      ];
    }

    return next;
  });

  const hasContact = sections.some((s) => s.type === "contact");
  let nextSections = sections;
  if (!hasContact) {
    nextSections = [
      ...sections,
      {
        id: `sec_prod_${Math.random().toString(36).slice(2, 8)}`,
        type: "contact",
        title: "Get in touch",
        subtitle: "Contact",
        body: "Tell us about your project. We reply within one business day.",
        ctaLabel: "Send message",
        ctaHref: "#",
        items: [],
        visible: true,
      },
    ];
  } else {
    nextSections = sections.map((s) =>
      s.type === "contact" ? { ...s, visible: true } : s,
    );
  }

  return {
    sections: nextSections,
    qualityPassed: true,
    secureNetworkEnabled:
      project.secureNetworkEnabled ||
      project.needs?.needsSecureNetwork ||
      project.needs?.features?.includes("secure-network") ||
      false,
  };
}

export function productionReady(score: ProductionScore) {
  return score.percent >= 70;
}
