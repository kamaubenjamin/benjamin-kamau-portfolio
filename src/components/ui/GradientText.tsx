import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}

export function GradientText({
  children,
  className,
  as: Component = "span",
}: GradientTextProps) {
  return (
    <Component
      className={cn(
        "bg-[var(--gradient-text)] bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </Component>
  );
}