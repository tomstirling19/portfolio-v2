"use client";

import MarginNote from "@/components/MarginNote";
import PhotoCarousel from "@/components/PhotoCarousel";
import { ABOUT_PHOTOS } from "@/content/data";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Diagonal seam shared by both panels so their edges line up exactly.
const DIAGONAL_CLIP_PHOTO = "polygon(0 0, 38% 0, 24% 100%, 0 100%)";
const DIAGONAL_CLIP_TEXT = "polygon(24% 100%, 38% 0, 100% 0, 100% 100%)";

// Same feel as the landing name/icons: a 150px settle over 0.7s on this ease.
const SLIDE_DISTANCE = 150;
const DURATION_HOLD = 0.7;
const EASE_SETTLE = "cubic-bezier(0.16, 0.9, 0.2, 1)";

function AboutText({ revealed }: { revealed: boolean }) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      style={
        reducedMotion
          ? undefined
          : {
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : `translateY(${SLIDE_DISTANCE}px)`,
              transition: `opacity ${DURATION_HOLD}s ${EASE_SETTLE}, transform ${DURATION_HOLD}s ${EASE_SETTLE}`,
            }
      }
      className="motion-fallback flex flex-col gap-5 text-lg"
    >
      <p>
        My name is Thomas Stirling. I hold a Master&rsquo;s degree in
        Computer Science from the University of Leeds (MEng &amp; BSc,
        First-Class Honours).
      </p>
      <MarginNote>
        When not shipping code, you&rsquo;ll find me on a tennis court or
        sketching something badly.
      </MarginNote>
      <p>
        My greatest interests lie in AI, ML, data, and application
        development. I&rsquo;m enthusiastic about all things tech and try to
        stay updated with the latest industry developments.
      </p>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  // Plain IntersectionObserver, same proven primitive as Nav.tsx: reveal
  // once on first entry, then leave it — no re-triggering on scroll away.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="scroll-mt-14 snap-start md:scroll-mt-0 [scroll-snap-stop:always]"
    >
      {/* mobile: photo + text stacked, one stop */}
      <div className="flex min-h-screen flex-col justify-center gap-8 px-6 py-24 md:hidden">
        <PhotoCarousel photos={ABOUT_PHOTOS} />
        <AboutText revealed={revealed} />
      </div>

      {/* desktop: diagonal split, photo and text together, one stop */}
      <div className="relative hidden h-screen overflow-hidden md:block">
        <div className="absolute inset-0" style={{ clipPath: DIAGONAL_CLIP_PHOTO }}>
          {/* ponytail: overlay nav centers on the full box; harmless while ABOUT_PHOTOS has <2 entries, re-check alignment once a real carousel ships */}
          <PhotoCarousel photos={ABOUT_PHOTOS} fill navPosition="overlay" />
        </div>
        <div className="bg-ground absolute inset-0" style={{ clipPath: DIAGONAL_CLIP_TEXT }}>
          <div className="flex h-full flex-col justify-center gap-5 py-24 pr-[max(14rem,14%)] pl-[42%]">
            <AboutText revealed={revealed} />
          </div>
        </div>
      </div>
    </section>
  );
}
