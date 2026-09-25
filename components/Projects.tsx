"use client";

import { CarouselNav } from "@/components/CarouselControls";
import { ExternalLinkIcon } from "@/components/icons/BrandIcons";
import { PROJECTS } from "@/content/data";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";

const OFFSET_X = 170;
const SWIPE_THRESHOLD = 60;

function cardStyle(diff: number) {
  const abs = Math.abs(diff);
  if (abs === 0) {
    return { x: 0, scale: 1, opacity: 1, blur: 0, zIndex: 30 };
  }
  if (abs === 1) {
    return { x: diff * OFFSET_X, scale: 0.82, opacity: 0.5, blur: 1.5, zIndex: 20 };
  }
  return { x: diff * OFFSET_X * 1.6, scale: 0.65, opacity: 0, blur: 3, zIndex: 10 };
}

export default function Projects() {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStartX = useRef<number | null>(null);
  const active = PROJECTS[activeIndex];

  const goTo = (index: number) => setActiveIndex(Math.max(0, Math.min(PROJECTS.length - 1, index)));

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragStartX.current = event.clientX;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    const delta = event.clientX - dragStartX.current;
    dragStartX.current = null;
    if (delta < -SWIPE_THRESHOLD) goTo(activeIndex + 1);
    else if (delta > SWIPE_THRESHOLD) goTo(activeIndex - 1);
  };

  return (
    <div className="flex flex-col gap-6">
      <div
        className="relative aspect-[16/10] touch-pan-y overflow-hidden"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          dragStartX.current = null;
        }}
      >
        {PROJECTS.map(({ name, image }, index) => {
          const diff = reducedMotion ? (index === activeIndex ? 0 : 2) : index - activeIndex;
          const style = cardStyle(diff);
          return (
            <div
              key={name}
              className="bg-raised absolute inset-0 m-auto h-full w-[78%] cursor-pointer overflow-hidden rounded-md transition-[transform,opacity,filter] duration-500 ease-out"
              style={{
                zIndex: style.zIndex,
                transform: `translateX(${style.x}px) scale(${style.scale})`,
                opacity: style.opacity,
                filter: `blur(${style.blur}px)`,
              }}
              onClick={() => index !== activeIndex && goTo(index)}
            >
              <Image
                src={image}
                alt={name}
                fill
                unoptimized
                className="pointer-events-none object-cover"
              />
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.name}
          initial={reducedMotion ? undefined : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <a
            href={active.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-baseline justify-between gap-4"
          >
            <span className="text-warm-accent hover:text-icon-orange inline-flex items-center gap-1.5 transition-colors">
              {active.name}
              <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0" />
            </span>
            <span className="text-ink/40 font-mono text-xs whitespace-nowrap">{active.year}</span>
          </a>
          <p className="text-ink mt-2">{active.description}</p>
        </motion.div>
      </AnimatePresence>

      <CarouselNav count={PROJECTS.length} activeIndex={activeIndex} onNavigate={goTo} />
    </div>
  );
}
