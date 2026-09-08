import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DesktopNav } from "@/components/navigation/DesktopNav";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { personal } from "@/data/personal";
import { BrandLockup } from "@/components/brand/BrandLockup";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/88 backdrop-blur-xl">
      <Container>
        <div className="flex h-[4.5rem] items-center justify-between gap-4">
          <Link
            href="/"
            className="rounded-[var(--radius-button)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-emerald)]"
          >
            <BrandLockup compact />
            <span className="sr-only"> — founded by {personal.name}</span>
          </Link>
          <DesktopNav />
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}