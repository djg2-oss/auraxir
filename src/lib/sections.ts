import type { SiteSection } from "./catalog";
import { uid } from "./utils";

export const SECTION_CATALOG: {
  type: SiteSection["type"];
  label: string;
  blurb: string;
}[] = [
  { type: "hero", label: "Hero", blurb: "First screen · offer + CTA" },
  { type: "features", label: "Features", blurb: "Three proof points" },
  { type: "about", label: "About", blurb: "Story block" },
  { type: "services", label: "Services", blurb: "Offer stack" },
  { type: "gallery", label: "Gallery", blurb: "Selected work" },
  { type: "testimonials", label: "Testimonials", blurb: "Social proof" },
  { type: "pricing", label: "Pricing", blurb: "Packages" },
  { type: "cta", label: "Call to action", blurb: "Convert strip" },
  { type: "contact", label: "Contact", blurb: "How to reach you" },
  { type: "footer", label: "Footer", blurb: "Legal + brand line" },
];

export function blankSection(type: SiteSection["type"], brand = "Your brand"): SiteSection {
  const name = brand.trim() || "Your brand";
  const base = {
    id: uid("sec"),
    type,
    visible: true,
    ctaHref: "#contact",
    items: [] as { title: string; body: string }[],
  };
  switch (type) {
    case "hero":
      return { ...base, title: name, subtitle: "New section", body: "State the offer in one beat.", ctaLabel: "Get started" };
    case "features":
      return {
        ...base,
        title: "Why it works",
        subtitle: "Proof",
        body: "",
        ctaLabel: "",
        items: [
          { title: "Clear", body: "Visitors get the job in seconds." },
          { title: "Trusted", body: "Production polish, not a template dump." },
          { title: "Ready", body: "One primary action." },
        ],
      };
    case "about":
      return { ...base, title: `About ${name}`, subtitle: "Story", body: `${name} exists to do one job well.`, ctaLabel: "" };
    case "services":
      return {
        ...base,
        title: "What we offer",
        subtitle: "Services",
        body: "",
        ctaLabel: "",
        items: [
          { title: "Signature", body: "Flagship offer." },
          { title: "Core", body: "The path most people take." },
          { title: "Care", body: "High-touch when it matters." },
        ],
      };
    case "gallery":
      return {
        ...base,
        title: "Selected work",
        subtitle: "Gallery",
        body: "",
        ctaLabel: "",
        items: [
          { title: "One", body: "A result that proves the offer." },
          { title: "Two", body: "Craft on display." },
          { title: "Three", body: "Quality compounds." },
        ],
      };
    case "testimonials":
      return {
        ...base,
        title: "What clients say",
        subtitle: "Proof",
        body: "",
        ctaLabel: "",
        items: [
          { title: "A. Rivera", body: "They shipped what they promised." },
          { title: "J. Chen", body: "Looked expensive. Worked immediately." },
        ],
      };
    case "pricing":
      return {
        ...base,
        title: "Pricing",
        subtitle: "Simple",
        body: "",
        ctaLabel: "",
        items: [
          { title: "Start", body: "The smallest proof." },
          { title: "Grow", body: "The working default." },
          { title: "Scale", body: "When volume shows up." },
        ],
      };
    case "cta":
      return { ...base, title: `Work with ${name}`, subtitle: "Next", body: "One path. Press the button.", ctaLabel: "Get started" };
    case "contact":
      return { ...base, title: "Contact", subtitle: "Reach us", body: "Tell us the job. We'll reply with a plan.", ctaLabel: "Send" };
    default:
      return { ...base, title: name, subtitle: "", body: `© ${new Date().getFullYear()} ${name}`, ctaLabel: "" };
  }
}
