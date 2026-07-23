"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "@/data/nav";
import { personal } from "@/data/personal";

export function MobileMenu() {
  const [openPathname, setOpenPathname] = useState<string | null>(null);
  const pathname = usePathname();
  const isOpen = openPathname === pathname;
  const shouldReduceMotion = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = (returnFocus = false) => {
    setOpenPathname(null);
    if (returnFocus) {
      requestAnimationFrame(() => triggerRef.current?.focus());
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu(true);
    };

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        onClick={() => setOpenPathname(isOpen ? null : pathname)}
        className="flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-button)] p-2 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-emerald)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-emerald)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-panel"
      >
        <Menu size={24} aria-hidden="true" />
      </button>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                id="mobile-navigation-panel"
                initial={shouldReduceMotion ? false : { opacity: 0, x: "100%" }}
                animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
                exit={shouldReduceMotion ? {} : { opacity: 0, x: "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed inset-0 z-[100] flex min-h-dvh flex-col overflow-y-auto overscroll-contain bg-[var(--color-bg)] text-[var(--color-text)] md:hidden"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation menu"
              >
                <div className="flex min-h-16 shrink-0 items-center justify-between border-b border-[var(--color-border)] px-6 pt-[env(safe-area-inset-top)]">
                  <Link
                    href="/"
                    onClick={() => closeMenu()}
                    className="rounded-[var(--radius-button)] text-lg font-bold tracking-tight text-[var(--color-text)] transition-colors hover:text-[var(--color-emerald)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-emerald)]"
                  >
                    <span className="text-[var(--color-emerald)]">BK</span>
                    <span className="sr-only">{personal.name}</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => closeMenu(true)}
                    className="flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-button)] p-2 text-[var(--color-text)] transition-colors hover:text-[var(--color-emerald)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-emerald)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
                    aria-label="Close menu"
                  >
                    <X size={24} aria-hidden="true" />
                  </button>
                </div>

                <nav
                  aria-label="Mobile navigation"
                  className="flex flex-1 flex-col gap-3 px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-8"
                >
                  {navItems.map((item) => {
                    const isActive =
                      item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => closeMenu()}
                        className="flex min-h-12 w-full items-center rounded-[var(--radius-button)] px-4 text-lg font-medium text-[var(--color-text)] transition-colors hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-emerald)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-emerald)]"
                        aria-current={isActive ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}