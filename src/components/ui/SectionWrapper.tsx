import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  divider?: boolean;
}

export function SectionWrapper({
  children,
  className,
  id,
  divider = false,
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("py-16 sm:py-24", className)}>
      {divider && (
        <div className="mx-auto mb-16 h-px w-full max-w-7xl bg-gradient-to-r from-transparent via-[var(--color-emerald)] to-transparent opacity-30 sm:mb-24" />
      )}
      {children}
    </section>
  );
}