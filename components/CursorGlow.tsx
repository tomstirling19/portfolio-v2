"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { useState } from "react";

const GLOW_SIZE = 160;
const SPRING_STIFFNESS = 300;
const SPRING_DAMPING = 30;
const OPACITY_DURATION = 0.15;

export default function CursorGlow({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, {
    stiffness: SPRING_STIFFNESS,
    damping: SPRING_DAMPING,
  });
  const springY = useSpring(y, {
    stiffness: SPRING_STIFFNESS,
    damping: SPRING_DAMPING,
  });

  if (reducedMotion) {
    return <>{children}</>;
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - bounds.left);
    y.set(event.clientY - bounds.top);
  };

  const handlePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") setVisible(true);
  };

  return (
    <div
      className="relative"
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={() => setVisible(false)}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute rounded-full"
        style={{
          width: GLOW_SIZE,
          height: GLOW_SIZE,
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, var(--color-warm-accent) 0%, transparent 70%)",
        }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: OPACITY_DURATION }}
      />
      {children}
    </div>
  );
}
