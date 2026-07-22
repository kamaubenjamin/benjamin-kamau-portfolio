"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

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
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}