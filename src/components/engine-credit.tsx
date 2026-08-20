import { CREDIT } from "@/lib/credit";
import { cn } from "@/lib/utils";

export function EngineCredit({ className }: { className?: string }) {
  return (
    <p className={cn("text-[11px] leading-relaxed text-[var(--color-fg-subtle)]", className)}>
      {CREDIT.line}
    </p>
  );
}
