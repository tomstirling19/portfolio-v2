"use client";

import { useEffect, useRef, useState } from "react";

export function useCarouselIndex(itemCount: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || itemCount < 2) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveIndex(Number(entry.target.getAttribute("data-index")));
          }
        }
      },
      { root: track, threshold: 0.6 },
    );

    for (const slide of track.children) observer.observe(slide);
    return () => observer.disconnect();
  }, [itemCount]);

  const scrollToIndex = (index: number) => {
    const slide = trackRef.current?.children[index] as HTMLElement | undefined;
    // Instant, not smooth: clicking a dot/arrow should feel immediate.
    slide?.scrollIntoView({ behavior: "instant" as ScrollBehavior, inline: "start", block: "nearest" });
  };

  return { trackRef, activeIndex, scrollToIndex };
}
