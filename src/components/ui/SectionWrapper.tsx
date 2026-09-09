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
    <section id={id} className={cn("relative py-14 sm:py-20 lg:py-24", className)}>
      {divider && (
        <div className="absolute inset-x-0 top-0 mx-auto h-px w-full max-w-7xl bg-[var(--color-border)]" />
      )}
      {children}
    </section>
  );
}