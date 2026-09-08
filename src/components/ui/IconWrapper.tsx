import { cn } from "@/lib/utils";

interface IconWrapperProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function IconWrapper({ children, className, size = "md" }: IconWrapperProps) {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-mint-surface)] text-[var(--color-emerald-light)] shadow-[inset_0_1px_rgba(255,255,255,0.04)]",
        sizes[size],
        className
      )}
    >
      {children}
    </div>
  );
}