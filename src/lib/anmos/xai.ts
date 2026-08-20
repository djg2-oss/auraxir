function readXaiKey(): string {
  const names = ["XAI_API_KEY", "xai_api_key", "CAI_API_KEY", "GROKG2PAI", "GROK_API_KEY"];
  const bag = typeof process !== "undefined" ? process.env : {};
  for (const name of names) {
    const v = bag[name];
    if (v && v.trim().length > 8) return v.trim();
  }
  return "";
}

export function anmosApiLive() {
  return readXaiKey().length > 8;
}

export async function grokCopyJson(prompt: string, timeoutMs: number): Promise<string> {
  const key = readXaiKey();
  if (key.length < 8) return "";
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), Math.max(400, timeoutMs));
  try {
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      signal: ctrl.signal,
      body: JSON.stringify({
        model: "grok-4.6",
        temperature: 0.4,
        max_tokens: 900,
        messages: [
          {
            role: "system",
            content:
              "You are ANMOS, the Auraxir Native Model Operating System. Dual-brain G2P Agent Black. Write production website copy. Return ONLY JSON: {hero:{title,subtitle,body,ctaLabel},features:{title,subtitle,items:[{title,body},{title,body},{title,body}]},about:{title,body},cta:{title,subtitle,ctaLabel}}. No hype. No invented metrics. No markdown.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });
    if (!res.ok) return "";
    const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    return json.choices?.[0]?.message?.content ?? "";
  } catch {
    return "";
  } finally {
    clearTimeout(t);
  }
}

export function parseCopyJson(raw: string): import("./writer").AnmosCopy | null {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  try {
    const obj = JSON.parse(raw.slice(start, end + 1)) as Record<string, unknown>;
    const sec = (k: string) => (obj[k] && typeof obj[k] === "object" ? (obj[k] as Record<string, unknown>) : {});
    const str = (v: unknown) => (typeof v === "string" ? v : "");
    const items = (v: unknown) =>
      Array.isArray(v)
        ? v
            .slice(0, 4)
            .map((it) => {
              const r = it && typeof it === "object" ? (it as Record<string, unknown>) : {};
              return { title: str(r.title), body: str(r.body) };
            })
            .filter((it) => it.title)
        : [];
    const h = sec("hero");
    const f = sec("features");
    const a = sec("about");
    const c = sec("cta");
    if (!str(h.title) && !str(h.body)) return null;
    return {
      hero: { title: str(h.title), subtitle: str(h.subtitle), body: str(h.body), ctaLabel: str(h.ctaLabel), items: [] },
      features: {
        title: str(f.title),
        subtitle: str(f.subtitle),
        body: str(f.body),
        ctaLabel: "",
        items: items(f.items),
      },
      about: { title: str(a.title), subtitle: str(a.subtitle), body: str(a.body), ctaLabel: "", items: [] },
      cta: { title: str(c.title), subtitle: str(c.subtitle), body: str(c.body), ctaLabel: str(c.ctaLabel), items: [] },
    };
  } catch {
    return null;
  }
}
