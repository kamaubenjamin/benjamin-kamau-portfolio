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
        "mb-12 max-w-3xl sm:mb-14",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <Heading className="text-3xl font-semibold tracking-[-0.035em] text-[var(--color-text)] sm:text-4xl">
        {title}
      </Heading>
      {subtitle && (
        <p className="mt-4 text-base leading-7 text-[var(--color-text-muted)] sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}