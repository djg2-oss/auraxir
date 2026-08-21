import { ShieldCheck } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

export function BrandMark({
  className,
  size = "md",
  showWordmark = true,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
}) {
  const box = size === "sm" ? "size-7" : size === "lg" ? "size-10" : "size-8";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "flex items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-gold-dim)] bg-[var(--color-bg-elevated)]",
          box,
        )}
      >
        <span
          className={cn(
            "font-[family-name:var(--font-display)] font-semibold leading-none text-[var(--color-gold)]",
            size === "sm" ? "text-sm" : size === "lg" ? "text-xl" : "text-base",
          )}
        >
          A
        </span>
      </span>
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-[family-name:var(--font-display)] font-semibold tracking-tight text-[var(--color-fg)]",
              size === "sm" ? "text-lg" : size === "lg" ? "text-2xl" : "text-xl",
            )}
          >
            {BRAND.name}
          </span>
          {size !== "sm" && (
            <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--color-fg-subtle)]">
              Elite Quality Service
            </span>
          )}
        </span>
      )}
    </span>
  );
}

/** Production brand bar — Auraxir Elite Quality Service only (no vendors) */
export function BrandOverlayBar({
  domain,
  production = true,
}: {
  domain?: string;
  production?: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between gap-3 border-b px-3 py-2 text-[11px] sm:px-4"
      style={{
        background: "rgba(10, 10, 11, 0.97)",
        borderColor: "rgba(255,255,255,0.1)",
        color: "#f4f4f5",
        fontFamily: "var(--font-sans), system-ui, sans-serif",
      }}
    >
      <div className="flex min-w-0 items-center gap-2">
        <ShieldCheck className="size-3.5 shrink-0 opacity-90" />
        <span className="truncate font-medium tracking-tight">
          {production ? BRAND.productionSeal : `${BRAND.name} · ${BRAND.qualityMark}`}
        </span>
      </div>
      {domain && <span className="shrink-0 truncate text-zinc-400">{domain}</span>}
    </div>
  );
}

export function BrandSeal({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-subtle)] px-3 py-1.5 text-xs text-[var(--color-fg-muted)]",
        className,
      )}
    >
      <ShieldCheck className="size-3.5 text-[var(--color-fg)]" />
      <span>
        <span className="font-medium text-[var(--color-fg)]">{BRAND.name}</span>{" "}
        {BRAND.qualityMark}
      </span>
    </div>
  );
}

/** Full production quality mark for footers */
export function EliteProductionMark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 text-[11px] font-medium tracking-tight",
        className,
      )}
    >
      <ShieldCheck className="size-3.5 opacity-90" />
      <span>{BRAND.productionSeal}</span>
    </div>
  );
}
