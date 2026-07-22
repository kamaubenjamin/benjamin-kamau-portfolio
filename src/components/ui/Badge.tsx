import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "emerald" | "lime" | "expanding";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default:
      "border border-[var(--color-border)] text-[var(--color-text-muted)]",
    emerald:
      "border border-[var(--color-emerald)]/30 text-[var(--color-emerald)] bg-[var(--color-emerald)]/5",
    lime:
      "border border-[var(--color-lime)]/30 text-[var(--color-lime)] bg-[var(--color-lime)]/5",
    expanding:
      "border border-[var(--color-lime)]/20 text-[var(--color-lime)]/70 bg-[var(--color-lime)]/5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}