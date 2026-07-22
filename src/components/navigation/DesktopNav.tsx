import Link from "next/link";
import { navItems } from "@/data/nav";
import { cn } from "@/lib/utils";

interface DesktopNavProps {
  className?: string;
}

export function DesktopNav({ className }: DesktopNavProps) {
  return (
    <nav aria-label="Primary navigation" className={cn("hidden items-center gap-1 md:flex", className)}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-[var(--radius-button)] px-3 py-2 text-sm font-medium text-[var(--color-text-muted)] transition-colors duration-300 hover:text-[var(--color-emerald)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-emerald)]"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}