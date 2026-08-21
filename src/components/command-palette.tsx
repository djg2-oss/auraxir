import { useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useBuilderStore } from "@/lib/store";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const projects = useBuilderStore((s) => s.projects);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        setQ("");
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const items = useMemo(() => {
    const base = [
      { id: "sample", label: "Live sample", run: () => navigate({ to: "/sample" }) },
      { id: "lab", label: "Color lab", run: () => navigate({ to: "/lab" }) },
      { id: "match", label: "New match", run: () => navigate({ to: "/start", search: { mode: "full" } }) },
      { id: "express", label: "Express match", run: () => navigate({ to: "/start", search: { mode: "express" } }) },
      { id: "projects", label: "Projects", run: () => navigate({ to: "/projects" }) },
      { id: "home", label: "Home", run: () => navigate({ to: "/" }) },
      { id: "legal", label: "Legal", run: () => navigate({ to: "/legal" }) },
    ];
    const proj = projects.map((p) => ({
      id: p.id,
      label: `Open ${p.name}`,
      run: () => navigate({ to: "/builder/$projectId", params: { projectId: p.id } }),
    }));
    const all = [...base, ...proj];
    const needle = q.trim().toLowerCase();
    if (!needle) return all.slice(0, 12);
    return all.filter((i) => i.label.toLowerCase().includes(needle)).slice(0, 12);
  }, [navigate, projects, q]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-start bg-[color-mix(in_oklab,var(--color-bg)_55%,transparent)] px-4 pt-[15vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="mx-auto w-full max-w-lg overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] shadow-[var(--shadow-soft)]"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search projects and commands"
          className="h-12 w-full border-b border-[var(--color-border)] bg-transparent px-4 text-sm text-[var(--color-fg)] outline-none"
        />
        <ul className="max-h-72 overflow-y-auto p-1">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className="flex h-10 w-full items-center rounded-[var(--radius-sm)] px-3 text-left text-sm text-[var(--color-fg)] hover:bg-[var(--color-bg-subtle)]"
                onClick={() => {
                  item.run();
                  setOpen(false);
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
          {items.length === 0 && (
            <li className="px-3 py-4 text-sm text-[var(--color-fg-subtle)]">No match</li>
          )}
        </ul>
        <p className="border-t border-[var(--color-border)] px-3 py-2 text-[10px] text-[var(--color-fg-subtle)]">
          ⌘K · Auraxir command
        </p>
      </div>
    </div>
  );
}
