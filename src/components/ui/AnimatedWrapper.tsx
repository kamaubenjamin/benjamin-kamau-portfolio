"use client";

import { useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface AnimatedWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedWrapper({
  children,
  className,
  delay = 0,
}: AnimatedWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div
      ref={ref}
      data-scroll-reveal={inView ? "visible" : "pending"}
      style={{ transitionDelay: `${delay}s` }}
      className={className}
    >
      {children}
    </div>
  );
}