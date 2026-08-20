/** Kernel copy — always-on floor. No vendor. No invented claims. */
export type SectionCopy = {
  title: string;
  subtitle: string;
  body: string;
  ctaLabel: string;
  items: { title: string; body: string }[];
};

export type AnmosCopy = {
  hero: SectionCopy;
  features: SectionCopy;
  about: SectionCopy;
  cta: SectionCopy;
};

function clip(s: string, n: number) {
  const t = s.replace(/\s+/g, " ").trim();
  return t.length <= n ? t : t.slice(0, n - 1).trimEnd() + "…";
}

export function writeKernelCopy(opts: {
  name: string;
  type: string;
  description: string;
  desire: string;
  heroSubtitle: string;
  ctaDefault: string;
}): AnmosCopy {
  const name = opts.name.trim() || "Your brand";
  const kind = (opts.type || "brand").replace(/-/g, " ");
  const brief = clip(opts.description || opts.desire || `${name} is a ${kind}.`, 220);
  const cta = opts.ctaDefault || "Get started";

  return {
    hero: {
      title: name,
      subtitle: opts.heroSubtitle || `Elite ${kind}`,
      body: brief,
      ctaLabel: cta,
      items: [],
    },
    features: {
      title: "Why it lands",
      subtitle: "Proof in the first scroll",
      body: "",
      ctaLabel: "",
      items: [
        { title: "Clear offer", body: `${name} states the job in one beat — no filler.` },
        { title: "Look locked", body: "ANMOS G2P applied production tokens before a vendor was called." },
        { title: "Ready to convert", body: "One primary action. No menu dump." },
      ],
    },
    about: {
      title: `About ${name}`,
      subtitle: "The real brief",
      body: brief,
      ctaLabel: "",
      items: [],
    },
    cta: {
      title: `Work with ${name}`,
      subtitle: "Next action",
      body: "One path. A stranger should know what happens when they press the button.",
      ctaLabel: cta,
      items: [],
    },
  };
}

export function mergeCopy(base: AnmosCopy, overlay: Partial<AnmosCopy> | null): AnmosCopy {
  if (!overlay) return base;
  const take = (k: keyof AnmosCopy): SectionCopy => {
    const o = overlay[k];
    const b = base[k];
    if (!o) return b;
    return {
      title: o.title?.trim() || b.title,
      subtitle: o.subtitle?.trim() || b.subtitle,
      body: o.body?.trim() || b.body,
      ctaLabel: o.ctaLabel?.trim() || b.ctaLabel,
      items: o.items?.length ? o.items.slice(0, 4) : b.items,
    };
  };
  return { hero: take("hero"), features: take("features"), about: take("about"), cta: take("cta") };
}
