import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  as?: "div" | "article" | "section";
}

export function Card({ children, className, hover = true, as: Component = "div" }: CardProps) {
  return (
    <Component
      className={cn(
        "rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 transition-all duration-300 relative overflow-hidden",
        hover && "hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-elevated)] hover:shadow-[var(--shadow-card-hover)]",
        className
      )}
    >
      {/* Subtle hover background radial gradient */}
      {hover && (
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100 bg-[radial-gradient(ellipse_at_50%_0%,rgba(16,185,129,0.05),transparent)]" />
      )}
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </Component>
  );
}
