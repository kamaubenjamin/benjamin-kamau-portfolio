import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  download?: boolean;
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  download,
  external,
  onClick,
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 rounded-[var(--radius-button)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-emerald)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3 text-base",
  };

  const variantStyles = {
    primary:
      "bg-[var(--color-emerald)] text-black hover:bg-[var(--color-emerald-light)] shadow-[var(--shadow-glow)]",
    outline:
      "border border-[var(--color-border)] text-[var(--color-emerald)] hover:border-[var(--color-emerald)] hover:bg-[var(--color-bg-elevated)]",
    ghost:
      "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-elevated)]",
  };

  const classes = cn(baseStyles, sizeStyles[size], variantStyles[variant], className);

  if (href) {
    const isExternal = external || href.startsWith("http") || href.startsWith("mailto");
    if (isExternal || download) {
      return (
        <a
          href={href}
          className={classes}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          download={download}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}