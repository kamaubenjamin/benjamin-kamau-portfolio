"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "@/data/nav";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center rounded-[var(--radius-button)] p-2 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-emerald)]"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: "100%" }}
            animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? {} : { opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 top-16 z-40 bg-[var(--color-bg)]/95 backdrop-blur-sm"
          >
            <nav className="flex flex-col items-center gap-4 pt-12">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-emerald)]"
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