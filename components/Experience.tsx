"use client";

import { EXPERIENCE } from "@/content/data";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

function TimelineEntry({ role, org, period, logo }: (typeof EXPERIENCE)[number]) {
  const ref = useRef<HTMLLIElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["center end", "center start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 1, 0.35]);

  return (
    <motion.li
      ref={ref}
      style={reducedMotion ? undefined : { opacity }}
      className="relative flex items-center gap-4 pl-6"
    >
      <span className="bg-warm-accent absolute top-1.5 -left-[3px] h-1.5 w-1.5 rounded-full" />
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white p-2">
        <Image
          src={logo}
          alt={`${org} logo`}
          width={80}
          height={80}
          unoptimized
          className="h-full w-full object-contain"
        />
      </div>
      <div>
        <p className="text-ink">{role}</p>
        <p className="text-cool-accent font-mono text-sm">{org}</p>
        <p className="text-ink/40 font-mono text-xs">{period}</p>
      </div>
    </motion.li>
  );
}

export default function Experience() {
  return (
    <div className="relative w-full">
      <div className="bg-ink/15 absolute top-2 bottom-2 left-0 w-px" />
      <p className="text-ink/30 mb-6 pl-6 font-mono text-xs">Now</p>
      <ol className="flex flex-col gap-8">
        {EXPERIENCE.map((entry) => (
          <TimelineEntry key={entry.org} {...entry} />
        ))}
      </ol>
    </div>
  );
}
