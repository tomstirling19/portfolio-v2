"use client";

import { CarouselNav } from "@/components/CarouselControls";
import { PROJECTS } from "@/content/data";
import { useCarouselIndex } from "@/hooks/useCarouselIndex";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import Image from "next/image";
import type { MouseEvent } from "react";
import { useRef } from "react";

const TILT_DEGREES = 6;
const SPRING_STIFFNESS = 300;
const SPRING_DAMPING = 30;

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, {
    stiffness: SPRING_STIFFNESS,
    damping: SPRING_DAMPING,
  });
  const springRotateY = useSpring(rotateY, {
    stiffness: SPRING_STIFFNESS,
    damping: SPRING_DAMPING,
  });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width - 0.5;
    const py = (event.clientY - bounds.top) / bounds.height - 0.5;
    rotateY.set(px * TILT_DEGREES);
    rotateX.set(py * -TILT_DEGREES);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 800,
      }}
      className="bg-raised relative aspect-[16/10] overflow-hidden rounded-md"
    >
      <Image src={src} alt={alt} fill unoptimized className="object-cover" />
    </motion.div>
  );
}

export default function Projects() {
  const { trackRef, activeIndex, scrollToIndex } = useCarouselIndex(PROJECTS.length);

  return (
    <div className="flex flex-col gap-6">
      <div
        ref={trackRef}
        className="scrollbar-none flex snap-x snap-mandatory overflow-x-auto rounded-md"
      >
        {PROJECTS.map(({ name, description, year, href, image }, index) => (
          <div
            key={name}
            data-index={index}
            className="w-full shrink-0 snap-start px-1 [scroll-snap-stop:always]"
          >
            <ProjectImage src={image} alt={name} />
            <div className="mt-4">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline justify-between gap-4"
              >
                <span className="text-ink group-hover:text-warm-accent transition-colors">
                  {name}
                </span>
                <span className="text-ink/40 font-mono text-xs whitespace-nowrap">{year}</span>
              </a>
              <p className="text-ink/60 mt-2">{description}</p>
            </div>
          </div>
        ))}
      </div>
      <CarouselNav count={PROJECTS.length} activeIndex={activeIndex} onNavigate={scrollToIndex} />
    </div>
  );
}
