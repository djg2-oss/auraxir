/** Standalone production HTML — no vendor, no runtime. */
import type { SiteProject, SiteSection, ThemeTokens } from "./catalog";
import { BRAND } from "./brand";

const AMP = "\u0026amp;";
const LT = "\u0026lt;";
const GT = "\u0026gt;";
const QUOT = "\u0026quot;";

function esc(s: string) {
  return s.replace(/&/g, AMP).replace(/</g, LT).replace(/>/g, GT).replace(/"/g, QUOT);
}

function font(theme: ThemeTokens) {
  if (theme.font === "serif") return "Georgia, 'Times New Roman', serif";
  if (theme.font === "display") return "ui-sans-serif, system-ui, sans-serif";
  return "ui-sans-serif, system-ui, sans-serif";
}

function radius(theme: ThemeTokens) {
  if (theme.radius === "sharp") return "4px";
  if (theme.radius === "round") return "20px";
  return "12px";
}

function block(sec: SiteSection, theme: ThemeTokens): string {
  if (!sec.visible) return "";
  const r = radius(theme);
  const items = sec.items
    .map(
      (it) =>
        `<article style="padding:1rem;border:1px solid ${esc(theme.muted)}33;border-radius:${r}"><h3 style="margin:0 0 .4rem">${esc(it.title)}</h3><p style="margin:0;color:${esc(theme.muted)}">${esc(it.body)}</p></article>`,
    )
    .join("");
  if (sec.type === "hero") {
    return `<section style="background:${esc(theme.primary)};color:${esc(theme.text)};padding:5rem 1.5rem">
      <p style="opacity:.7;letter-spacing:.16em;text-transform:uppercase;font-size:.75rem">${esc(sec.subtitle)}</p>
      <h1 style="font-size:clamp(2rem,6vw,3.75rem);margin:.4rem 0 1rem;max-width:18ch">${esc(sec.title)}</h1>
      <p style="max-width:40rem;opacity:.9">${esc(sec.body)}</p>
      ${sec.ctaLabel ? `<p><a href="${esc(sec.ctaHref || "#contact")}" style="display:inline-block;margin-top:1.5rem;background:${esc(theme.accent)};color:#0b0b0f;text-decoration:none;padding:.9rem 1.4rem;border-radius:${r};font-weight:600">${esc(sec.ctaLabel)}</a></p>` : ""}
    </section>`;
  }
  if (sec.type === "contact") {
    return `<section id="contact" style="padding:3.5rem 1.5rem;max-width:36rem;margin:0 auto">
      <p style="color:${esc(theme.muted)};letter-spacing:.12em;text-transform:uppercase;font-size:.7rem">${esc(sec.subtitle)}</p>
      <h2>${esc(sec.title)}</h2>
      <p style="color:${esc(theme.muted)}">${esc(sec.body)}</p>
      <form action="mailto:concierge@auraxir.com" method="post" enctype="text/plain" style="display:grid;gap:.75rem;margin-top:1.25rem">
        <input name="name" required placeholder="Name" style="padding:.75rem;border-radius:${r};border:1px solid ${esc(theme.muted)}55;background:${esc(theme.surface)};color:${esc(theme.text)}"/>
        <input name="email" type="email" required placeholder="Email" style="padding:.75rem;border-radius:${r};border:1px solid ${esc(theme.muted)}55;background:${esc(theme.surface)};color:${esc(theme.text)}"/>
        <textarea name="message" required rows="4" placeholder="The job" style="padding:.75rem;border-radius:${r};border:1px solid ${esc(theme.muted)}55;background:${esc(theme.surface)};color:${esc(theme.text)}"></textarea>
        <button type="submit" style="background:${esc(theme.accent)};color:#0b0b0f;border:0;padding:.9rem 1.2rem;border-radius:${r};font-weight:600">${esc(sec.ctaLabel || "Send")}</button>
      </form>
    </section>`;
  }
  if (sec.type === "footer") {
    return `<footer style="padding:2rem 1.5rem;border-top:1px solid ${esc(theme.muted)}33;color:${esc(theme.muted)}"><p><strong style="color:${esc(theme.text)}">${esc(sec.title)}</strong></p><p>${esc(sec.body)}</p><p style="font-size:.75rem">${esc(BRAND.productionSeal)}</p></footer>`;
  }
  return `<section id="${esc(sec.type)}" style="padding:3.5rem 1.5rem;max-width:64rem;margin:0 auto">
    <p style="color:${esc(theme.muted)};letter-spacing:.12em;text-transform:uppercase;font-size:.7rem">${esc(sec.subtitle)}</p>
    <h2 style="margin:.3rem 0 1rem">${esc(sec.title)}</h2>
    ${sec.body ? `<p style="color:${esc(theme.muted)};max-width:42rem">${esc(sec.body)}</p>` : ""}
    ${items ? `<div style="display:grid;gap:1rem;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));margin-top:1.5rem">${items}</div>` : ""}
    ${sec.ctaLabel ? `<p><a href="${esc(sec.ctaHref || "#contact")}" style="display:inline-block;margin-top:1.25rem;background:${esc(theme.accent)};color:#0b0b0f;text-decoration:none;padding:.8rem 1.2rem;border-radius:${r};font-weight:600">${esc(sec.ctaLabel)}</a></p>` : ""}
  </section>`;
}

export function projectToHtml(project: SiteProject): string {
  const { theme } = project;
  const body = project.sections.map((s) => block(s, theme)).join("\n");
  const desc = esc(project.needs.description || `${project.name} — built on ${BRAND.name}`);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${esc(project.name)} · ${esc(BRAND.name)}</title>
<meta name="description" content="${desc}"/>
<meta name="theme-color" content="${esc(theme.primary)}"/>
<meta property="og:title" content="${esc(project.name)}"/>
<meta property="og:description" content="${desc}"/>
<link rel="canonical" href="https://${esc(project.domain)}"/>
<style>
  html,body{margin:0;background:${esc(theme.surface)};color:${esc(theme.text)};font-family:${font(theme)};}
  *{box-sizing:border-box}
  img{max-width:100%}
  a{color:inherit}
</style>
</head>
<body>
${body}
</body>
</html>`;
}

export function downloadProjectHtml(project: SiteProject) {
  const html = projectToHtml(project);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${project.name.replace(/[^\w]+/g, "-").toLowerCase() || "site"}.html`;
  a.click();
  URL.revokeObjectURL(url);
}
