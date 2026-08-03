/**
 * Legal white-hat SEO for Auraxir — premium offer, no ops disclosure.
 */
import { BRAND, MARKETING_PHRASES } from "./brand";

export const SEO_KEYWORDS = [
  "elite website builder",
  "premium website builder",
  "professional web design platform",
  "no code website builder premium",
  "ecommerce website builder elite",
  "app builder no code premium",
  "best website builder for agencies",
  "Auraxir elite quality service",
  "goal to production design AI",
  "high conversion landing page builder",
  "premium brand website platform",
] as const;

export const SEO_FAQ: { q: string; a: string }[] = [
  {
    q: "What is Auraxir?",
    a: "Auraxir is a premium name for elite websites and apps. We match the best fit for your needs, apply G2P AI so the look matches your taste, and you build under one Elite Quality Service experience.",
  },
  {
    q: "How is Auraxir different from free website builders?",
    a: "We do not offer hobby kits. Auraxir is for brands that want elite production, polished design systems, and real app capability when needed.",
  },
  {
    q: "What do I get as a customer?",
    a: "A best-fit Auraxir production line, G2P look-and-feel guidance, a self-serve builder, and live production under the Auraxir Elite Quality Service standard.",
  },
  {
    q: "What is Auraxir G2P AI?",
    a: "Goal-to-Production AI for elite sites. You describe mood and desire; G2P maps that to a production design system — colors, type, and voice.",
  },
  {
    q: "Does Auraxir support ecommerce and apps?",
    a: "Yes. Auraxir Commerce for storefronts; App Lab and Mobile Lab for premium web and mobile apps with secure options when needed.",
  },
  {
    q: "Can I get private or secure options?",
    a: "Yes. Private preview paths, encrypted admin access, and high-trust connectivity are available when your project needs them.",
  },
];

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.legalName,
    legalName: BRAND.legalName,
    url: `https://${BRAND.domain}`,
    logo: `https://${BRAND.domain}/favicon.svg`,
    email: BRAND.supportEmail,
    description: BRAND.seoDescription,
    slogan: BRAND.tagline,
    brand: {
      "@type": "Brand",
      name: BRAND.name,
      slogan: BRAND.superiority,
    },
    sameAs: [] as string[],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND.name,
    url: `https://${BRAND.domain}`,
    description: BRAND.seoDescription,
    publisher: { "@type": "Organization", name: BRAND.legalName },
    potentialAction: {
      "@type": "SearchAction",
      target: `https://${BRAND.domain}/start?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en-US",
  };
}

export function softwareJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${BRAND.name} Elite Website & App Builder`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "149",
      description: "Auraxir Elite Quality Service subscription",
    },
    description: BRAND.seoDescription,
    brand: BRAND.name,
    featureList: [
      "Best-fit production line matching",
      "G2P AI look and feel",
      "Auraxir Elite Quality Service",
      "Commerce and app lines",
      "Secure options when needed",
    ],
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SEO_FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function serviceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: BRAND.legalName,
    serviceType: "Elite website and app production",
    provider: {
      "@type": "Organization",
      name: BRAND.legalName,
    },
    areaServed: "Worldwide",
    description: BRAND.promise,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Auraxir production lines",
      itemListElement: [
        "Design OS",
        "Motion",
        "Studio",
        "Commerce",
        "Signature",
        "App Lab",
        "Mobile Lab",
      ].map((name, i) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `Auraxir ${name}`,
        },
        position: i + 1,
      })),
    },
  };
}

export function homeJsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd(),
      websiteJsonLd(),
      softwareJsonLd(),
      serviceJsonLd(),
      faqJsonLd(),
    ],
  };
}

export function defaultMeta() {
  const title = BRAND.seoTitle;
  const description = BRAND.seoDescription;
  const url = `https://${BRAND.domain}/`;
  return {
    title,
    description,
    canonical: url,
    keywords: SEO_KEYWORDS.join(", "),
    og: {
      title,
      description,
      url,
      type: "website",
      siteName: BRAND.legalName,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
  };
}

export { MARKETING_PHRASES };
