import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandLockupProps {
  className?: string;
  compact?: boolean;
}

// The brand artwork is shared by the global navigation and footer.
export function BrandLockup({ className, compact = false }: BrandLockupProps) {
  return (
    <span className={cn("brand-lockup inline-flex items-center", className)} role="img" aria-label="Benkai Systems">
      <Image
        src="/brand/benkai-wordmark-v2.svg"
        alt=""
        width={690}
        height={170}
        sizes={compact ? "(max-width: 639px) 150px, 172px" : "(max-width: 639px) 166px, 188px"}
        className={compact ? "brand-logo-dark h-auto w-[150px] sm:w-[172px]" : "brand-logo-dark h-auto w-[166px] sm:w-[188px]"}
        priority={compact}
      />
      <Image
        src="/brand/benkai-wordmark-light-v2.svg"
        alt=""
        width={690}
        height={170}
        sizes={compact ? "(max-width: 639px) 150px, 172px" : "(max-width: 639px) 166px, 188px"}
        className={compact ? "brand-logo-light h-auto w-[150px] sm:w-[172px]" : "brand-logo-light h-auto w-[166px] sm:w-[188px]"}
      />
    </span>
  );
}
