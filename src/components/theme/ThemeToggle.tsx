"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";
const STORAGE_KEY = "benkai-site-theme";
const THEME_EVENT = "benkai-theme-change";

function getActiveTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

/** Accessible user-controlled theme switch shared by desktop and mobile navigation. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const sync = () => setTheme(getActiveTheme());
    const frame = requestAnimationFrame(sync);
    window.addEventListener(THEME_EVENT, sync);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener(THEME_EVENT, sync);
    };
  }, []);

  const toggle = () => {
    const next: Theme = getActiveTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // The switch remains usable when browser storage is unavailable.
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  const light = theme === "light";
  const label = light ? "Switch to dark mode" : "Switch to light mode";
  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-[var(--radius-button)] border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-emerald)]"
      aria-label={label}
      title={label}
    >
      {light ? <Moon size={19} aria-hidden="true" /> : <Sun size={19} aria-hidden="true" />}
    </button>
  );
}
