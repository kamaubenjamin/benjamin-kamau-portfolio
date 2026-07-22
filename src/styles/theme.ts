export const theme = {
  colors: {
    bg: "#0a0a0a",
    bgCard: "#111111",
    bgElevated: "#1a1a1a",
    emerald: "#10b981",
    emeraldDark: "#059669",
    emeraldLight: "#34d399",
    lime: "#a3e635",
    limeBright: "#d9f99d",
    text: "#f1f5f9",
    textMuted: "#94a3b8",
    border: "rgba(16, 185, 129, 0.2)",
    borderHover: "rgba(16, 185, 129, 0.5)",
  },
  gradients: {
    text: "linear-gradient(135deg, #10b981, #a3e635)",
    sectionDivider: "linear-gradient(90deg, transparent, #10b981, transparent)",
    cardGlow: "radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.08), transparent)",
  },
  spacing: {
    section: { default: "6rem", mobile: "4rem" },
    card: { default: "1.5rem", lg: "2rem" },
    gridGap: { default: "1.5rem", lg: "2rem" },
  },
  borderRadius: {
    card: "0.75rem",
    button: "0.5rem",
    badge: "9999px",
  },
  shadows: {
    card: "0 4px 20px rgba(0,0,0,0.3)",
    cardHover: "0 8px 30px rgba(16,185,129,0.15)",
    glow: "0 0 20px rgba(16,185,129,0.15)",
  },
  borders: {
    card: "1px solid rgba(16, 185, 129, 0.2)",
    cardHover: "1px solid rgba(16, 185, 129, 0.5)",
  },
  transitions: {
    default: "300ms ease",
    slow: "500ms ease",
  },
  animation: {
    durationFast: "0.3s",
    durationNormal: "0.5s",
    durationSlow: "0.8s",
  },
  fonts: {
    sans: "var(--font-geist-sans)",
    mono: "var(--font-geist-mono)",
  },
} as const;

export type Theme = typeof theme;