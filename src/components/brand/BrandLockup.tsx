import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandLockupProps {
  className?: string;
  compact?: boolean;
}

export function BrandLockup({ className, compact = false }: BrandLockupProps) {
  return (
    <span className={cn("brand-lockup inline-flex items-center", className)}>
      <span className="brand-mark relative shrink-0" aria-hidden="true">
        <Image
          src="/brand/benkai-mark.png"
          alt=""
          width={512}
          height={512}
          sizes={compact ? "36px" : "42px"}
          priority
        />
      </span>
      <span className="brand-wordmark ml-2 flex flex-col font-semibold uppercase leading-none text-[var(--color-text)]">
        <span className="text-[0.82rem] tracking-[0.2em] sm:text-sm">Benkai</span>
        <span className="mt-1 text-[0.57rem] font-medium tracking-[0.36em] text-[var(--color-mint-muted)] sm:text-[0.62rem]">
          Systems
        </span>
      </span>
    </span>
  );
}