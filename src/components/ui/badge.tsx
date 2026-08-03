import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--color-bg-subtle)] text-[var(--color-fg)]",
        outline: "border-[var(--color-border)] text-[var(--color-fg-muted)]",
        success:
          "border-transparent bg-[color-mix(in_oklab,var(--color-success)_18%,transparent)] text-[var(--color-success)]",
        accent:
          "border-transparent bg-[var(--color-primary)] text-[var(--color-primary-fg)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
