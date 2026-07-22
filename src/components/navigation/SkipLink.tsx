export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[var(--radius-button)] focus:bg-[var(--color-emerald)] focus:px-4 focus:py-2 focus:text-sm focus:text-black focus:shadow-[var(--shadow-glow)]"
    >
      Skip to main content
    </a>
  );
}