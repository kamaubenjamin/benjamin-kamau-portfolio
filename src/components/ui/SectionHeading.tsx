import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
  level?: "h1" | "h2";
}

export function SectionHeading({
  title,
  subtitle,
  className,
  align = "center",
  level = "h2",
}: SectionHeadingProps) {
  const Heading = level;

  return (
    <div
      className={cn(
        "mb-12 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <Heading className="text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
        {title}
      </Heading>
      {subtitle && (
        <p className="mt-4 text-lg text-[var(--color-text-muted)]">{subtitle}</p>
      )}
    </div>
  );
}