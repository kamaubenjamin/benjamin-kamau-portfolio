import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DesktopNav } from "@/components/navigation/DesktopNav";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { personal } from "@/data/personal";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-[var(--color-text)] transition-colors hover:text-[var(--color-emerald)]"
          >
            <span className="text-[var(--color-emerald)]">BK</span>
            <span className="sr-only">{personal.name}</span>
          </Link>
          <DesktopNav />
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}