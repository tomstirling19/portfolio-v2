"use client";

import MarginNote from "@/components/MarginNote";
import PhotoCarousel from "@/components/PhotoCarousel";
import { ABOUT_PHOTOS, LINKS } from "@/content/data";

// Diagonal seam shared by both panels so their edges line up exactly.
const DIAGONAL_CLIP_PHOTO = "polygon(0 0, 62% 0, 46% 100%, 0 100%)";
const DIAGONAL_CLIP_TEXT = "polygon(46% 100%, 62% 0, 100% 0, 100% 100%)";

function AboutText() {
  return (
    <>
      <ul className="flex flex-wrap gap-4">
        {LINKS.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cool-accent hover:text-warm-accent font-mono text-xs transition-colors"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
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
    </>
  );
}

export default function About() {
  return (
    <section id="about" className="scroll-mt-14 snap-start md:scroll-mt-0">
      {/* mobile: photo + text stacked, one stop */}
      <div className="flex min-h-screen flex-col justify-center gap-8 px-6 py-24 md:hidden">
        <PhotoCarousel photos={ABOUT_PHOTOS} />
        <div className="flex flex-col gap-4">
          <AboutText />
        </div>
      </div>

      {/* desktop: diagonal split, photo and text together, one stop */}
      <div className="relative hidden h-screen overflow-hidden md:block">
        <div className="absolute inset-0" style={{ clipPath: DIAGONAL_CLIP_PHOTO }}>
          {/* ponytail: overlay nav centers on the full box; harmless while ABOUT_PHOTOS has <2 entries, re-check alignment once a real carousel ships */}
          <PhotoCarousel photos={ABOUT_PHOTOS} fill navPosition="overlay" />
        </div>
        <div className="bg-ground absolute inset-0" style={{ clipPath: DIAGONAL_CLIP_TEXT }}>
          <div className="flex h-full flex-col justify-center gap-4 py-24 pr-44 pl-[64%]">
            <AboutText />
          </div>
        </div>
      </div>
    </section>
  );
}
