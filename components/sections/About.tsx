"use client";

import MarginNote from "@/components/ui/MarginNote";
import PhotoCarousel from "@/components/ui/PhotoCarousel";
import { ABOUT_PHOTOS } from "@/content/data";
import { DURATION_HOLD, EASE_SETTLE_CSS, SLIDE_DISTANCE } from "@/lib/revealMotion";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const DIAGONAL_CLIP_PHOTO = "polygon(0 0, 38% 0, 24% 100%, 0 100%)";
const DIAGONAL_CLIP_TEXT = "polygon(24% 100%, 38% 0, 100% 0, 100% 100%)";

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
              transition: `opacity ${DURATION_HOLD}s ${EASE_SETTLE_CSS}, transform ${DURATION_HOLD}s ${EASE_SETTLE_CSS}`,
            }
      }
      className="motion-fallback flex flex-col gap-5 text-lg"
    >
      <p>
        Hi, I&rsquo;m Tom. I hold a Master&rsquo;s degree in Computer Science
        from the University of Leeds (MEng &amp; BSc, First-Class Honours).
      </p>
      <p>
        I&rsquo;ve had the chance to build software across defence, security,
        healthcare, gambling &amp; entertainment, and fintech. My greatest
        interests lie in AI, but I also like working on scalable,
        high-throughput and efficient distributed systems.
      </p>
      <MarginNote>
        Outside of engineering, I enjoy hiking (mainly in bad weather),
        cycling, and gaming (my playtime is too much to be discussed).
      </MarginNote>
      <p>
        Right now I&rsquo;m mostly researching how LLMs and agents are
        advancing and taking an interest in graph engineering with agents.
        I have a personal project called Bamboo that I&rsquo;m looking to
        experiment on.
      </p>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

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
      <div className="flex min-h-screen flex-col justify-center gap-8 px-6 py-24 md:hidden">
        <PhotoCarousel photos={ABOUT_PHOTOS} imagePosition="center 85%" />
        <AboutText revealed={revealed} />
      </div>

      <div className="relative hidden h-screen overflow-hidden md:block">
        <div className="absolute inset-0" style={{ clipPath: DIAGONAL_CLIP_PHOTO }}>
          <div className="h-full w-[46%]">
            <PhotoCarousel
              photos={ABOUT_PHOTOS}
              fill
              navPosition="overlay"
              imagePosition="center 15%"
            />
          </div>
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
