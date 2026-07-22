import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-[var(--color-text-muted)]">{subtitle}</p>
      )}
    </div>
  );
}