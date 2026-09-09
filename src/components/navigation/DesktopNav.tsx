"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface DesktopNavProps {
  className?: string;
}

export function DesktopNav({ className }: DesktopNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary navigation" className={cn("hidden items-center gap-0.5 md:flex", className)}>
      {navItems.filter((item) => item.href !== "/contact").map((item) => {
        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className="nav-link rounded-[var(--radius-button)] px-3 py-2 text-sm font-medium text-[var(--color-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-emerald)]"
            aria-current={isActive ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
      <Button href="/contact" variant="outline" size="sm" className="ml-2 hidden lg:inline-flex">
        Get in Touch
      </Button>
    </nav>
  );
}