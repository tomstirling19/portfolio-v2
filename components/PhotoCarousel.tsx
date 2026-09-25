"use client";

import { CarouselNav } from "@/components/CarouselControls";
import { useCarouselIndex } from "@/hooks/useCarouselIndex";
import Image from "next/image";

type Photo = { src: string; alt: string };

export default function PhotoCarousel({ photos }: { photos: readonly Photo[] }) {
  const { trackRef, activeIndex, scrollToIndex } = useCarouselIndex(photos.length);

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={trackRef}
        className="scrollbar-none flex snap-x snap-mandatory overflow-x-auto rounded-md"
      >
        {photos.map(({ src, alt }, index) => (
          <div
            key={src}
            data-index={index}
            className="relative aspect-[3/2] w-full shrink-0 snap-start"
          >
            <Image src={src} alt={alt} fill unoptimized className="object-cover" />
          </div>
        ))}
      </div>
      <CarouselNav count={photos.length} activeIndex={activeIndex} onNavigate={scrollToIndex} />
    </div>
  );
}
