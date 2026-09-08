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
        "group relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 shadow-[var(--shadow-card)] transition-[transform,border-color,background-color,box-shadow] duration-300",
        hover && "hover:-translate-y-0.5 hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-elevated)] hover:shadow-[var(--shadow-card-hover)]",
        className
      )}
    >
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </Component>
  );
}
