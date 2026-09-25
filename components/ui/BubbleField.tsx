"use client";

import { useBubbleField } from "@/hooks/useBubbleField";
import { useReducedMotion } from "motion/react";

const BUBBLE_COLORS = [
  "var(--color-cool-accent)",
  "var(--color-warm-accent)",
  "var(--color-icon-orange)",
];

const BUBBLE_SHADOW =
  "0 6px 14px -4px rgb(0 0 0 / 35%), inset 0 -6px 10px -6px rgb(0 0 0 / 35%), inset 0 4px 8px -4px rgb(255 255 255 / 35%)";

export default function BubbleField({ items }: { items: readonly string[] }) {
  const reducedMotion = useReducedMotion();
  const { containerRef, bubbleElsRef, radii, draggable } = useBubbleField(items, reducedMotion);

  if (reducedMotion) {
    return (
      <ul className="motion-fallback flex flex-wrap justify-center gap-3">
        {items.map((item) => (
          <li
            key={item}
            className="border-ink/20 text-ink/70 rounded-full border px-4 py-2 font-mono text-sm"
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto aspect-square w-full max-w-md select-none ${draggable ? "touch-none" : ""}`}
    >
      {items.map((text, index) => {
        const radius = radii[index];
        const color = BUBBLE_COLORS[index % BUBBLE_COLORS.length];
        const wrapperClassName = draggable
          ? "absolute top-0 left-0 cursor-grab active:cursor-grabbing"
          : "absolute top-0 left-0";
        return (
          <div
            key={text}
            ref={(el) => {
              bubbleElsRef.current[index] = el;
            }}
            className={wrapperClassName}
            style={{ width: radius * 2, height: radius * 2, willChange: "transform" }}
          >
            <div
              className="text-ground flex h-full w-full items-center justify-center rounded-full border-[3px] px-4 text-center font-mono text-sm leading-tight transition-transform duration-150 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: color,
                borderColor: `color-mix(in srgb, ${color} 78%, black)`,
                boxShadow: BUBBLE_SHADOW,
              }}
            >
              {text}
            </div>
          </div>
        );
      })}
    </div>
  );
}
