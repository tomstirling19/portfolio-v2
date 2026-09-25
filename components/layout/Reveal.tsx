"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const DURATION_STANDARD = 0.35;
const EASE_REVEAL: [number, number, number, number] = [0.22, 0.8, 0.32, 1];
const RISE_DISTANCE = 10;

export default function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      className="motion-fallback"
      initial={{ opacity: 0, y: RISE_DISTANCE }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: DURATION_STANDARD, ease: EASE_REVEAL, delay }}
    >
      {children}
    </motion.div>
  );
}
