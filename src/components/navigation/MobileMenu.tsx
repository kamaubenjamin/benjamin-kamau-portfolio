"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "@/data/nav";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = (returnFocus = false) => {
    setIsOpen(false);
    if (returnFocus) {
      requestAnimationFrame(() => triggerRef.current?.focus());
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu(true);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex min-h-11 min-w-11 items-center justify-center rounded-[var(--radius-button)] p-2 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-emerald)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-emerald)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-panel"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation-panel"
            initial={shouldReduceMotion ? false : { opacity: 0, x: "100%" }}
            animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? {} : { opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 top-16 z-40 bg-[var(--color-bg)]/95 backdrop-blur-sm"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col items-center gap-2 pt-12">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => closeMenu()}
                  className="inline-flex min-h-11 items-center rounded-[var(--radius-button)] px-4 text-lg font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-emerald)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-emerald)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}