"use client";

import { CarouselNav } from "@/components/CarouselControls";
import { PROJECTS } from "@/content/data";
import { useCarouselIndex } from "@/hooks/useCarouselIndex";

export default function Projects() {
  const { trackRef, activeIndex, scrollToIndex } = useCarouselIndex(PROJECTS.length);

  return (
    <div className="flex flex-col gap-6">
      <div
        ref={trackRef}
        className="scrollbar-none flex snap-x snap-mandatory overflow-x-auto rounded-md"
      >
        {PROJECTS.map(({ name, description, year, href }, index) => (
          <div key={name} data-index={index} className="w-full shrink-0 snap-start px-1">
            <div className="bg-raised text-ink/30 flex aspect-[16/10] items-center justify-center rounded-md font-mono text-xs">
              photo pending
            </div>
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
