import Link from "next/link";
import { navItems } from "@/data/nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface DesktopNavProps {
  className?: string;
}

export function DesktopNav({ className }: DesktopNavProps) {
  return (
    <nav aria-label="Primary navigation" className={cn("hidden items-center gap-0.5 md:flex", className)}>
      {navItems.filter((item) => item.href !== "/contact").map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="nav-link rounded-[var(--radius-button)] px-3 py-2 text-sm font-medium text-[var(--color-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-emerald)]"
        >
          {item.label}
        </Link>
      ))}
      <Button href="/contact" variant="outline" size="sm" className="ml-2 hidden lg:inline-flex">
        Get in Touch
      </Button>
    </nav>
  );
}