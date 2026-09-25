import { EXPERIENCE } from "@/content/data";
import Image from "next/image";

function TimelineEntry({ role, org, period, logo, logoWidth, logoHeight }: (typeof EXPERIENCE)[number]) {
  return (
    <li className="relative flex items-center gap-4 pl-6 sm:gap-6 sm:pl-8 md:gap-8">
      <span className="bg-warm-accent absolute top-2 -left-[3px] h-2 w-2 rounded-full" />
      <div className="flex h-14 w-24 shrink-0 items-center justify-center sm:h-20 sm:w-32 md:h-24 md:w-40">
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
        <p className="text-ink text-base font-semibold sm:text-lg md:text-xl">{role}</p>
        <p className="text-warm-accent font-mono text-xs sm:text-sm">{org}</p>
        <p className="text-ink/40 font-mono text-xs">{period}</p>
      </div>
    </li>
  );
}

export default function Experience() {
  return (
    <div className="relative w-full">
      <div className="bg-ink/15 absolute top-2 bottom-2 left-0 w-px" />
      <p className="text-ink/30 mb-6 pl-6 font-mono text-xs sm:pl-8">Now</p>
      <ol className="flex flex-col gap-8 sm:gap-10 md:gap-12">
        {EXPERIENCE.map((entry) => (
          <TimelineEntry key={entry.org} {...entry} />
        ))}
      </ol>
    </div>
  );
}
