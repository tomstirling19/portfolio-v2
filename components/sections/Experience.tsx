"use client";

import { EXPERIENCE } from "@/content/data";
import { EXPERIENCE_FIRST_ENTRY_ID } from "@/content/sections";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

function TimelineEntry({
  role,
  org,
  period,
  logo,
  logoWidth,
  logoHeight,
  first,
}: (typeof EXPERIENCE)[number] & { first?: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["center end", "center start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1.12, 0.92]);

  return (
    <motion.li
      ref={ref}
      id={first ? EXPERIENCE_FIRST_ENTRY_ID : undefined}
      style={reducedMotion ? undefined : { scale }}
      className="relative flex origin-left items-center gap-4 pl-6 sm:gap-6 sm:pl-8 md:gap-8"
    >
      <span className="text-ink/40 absolute -top-5 left-0 -translate-x-1/2 font-mono text-[10px] whitespace-nowrap">
        {period}
      </span>
      <span className="bg-warm-accent absolute top-2 -left-[3px] h-2 w-2 rounded-full" />
      <div className="flex h-16 w-28 shrink-0 items-center justify-center sm:h-24 sm:w-40 md:h-28 md:w-48">
        <Image
          src={logo}
          alt={`${org} logo`}
          width={logoWidth}
          height={logoHeight}
          unoptimized
          className="max-h-full max-w-full rounded-lg object-contain"
        />
      </div>
      <div>
        <p className="text-ink text-lg font-semibold sm:text-xl md:text-2xl">{role}</p>
        <p className="text-warm-accent font-mono text-sm sm:text-base">{org}</p>
      </div>
    </motion.li>
  );
}

export default function Experience() {
  return (
    <div className="relative w-full">
      <div className="bg-ink/15 absolute top-2 bottom-2 left-0 w-px" />
      <ol className="mt-6 flex flex-col gap-12 sm:gap-14 md:gap-16">
        {EXPERIENCE.map((entry, index) => (
          <TimelineEntry key={entry.org} {...entry} first={index === 0} />
        ))}
      </ol>
    </div>
  );
}
