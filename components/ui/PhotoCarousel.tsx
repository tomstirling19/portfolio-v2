"use client";

import { CarouselNav } from "@/components/ui/CarouselControls";
import { useCarouselIndex } from "@/hooks/useCarouselIndex";
import Image from "next/image";

type Photo = { src: string; alt: string };

export default function PhotoCarousel({
  photos,
  fill = false,
  navPosition = "below",
}: {
  photos: readonly Photo[];
  fill?: boolean;
  navPosition?: "below" | "overlay";
}) {
  const { trackRef, activeIndex, scrollToIndex } = useCarouselIndex(photos.length);

  const track = (
    <div
      ref={trackRef}
      className={`scrollbar-none flex snap-x snap-mandatory overflow-x-auto ${fill ? "h-full" : "rounded-md"}`}
    >
      {photos.map(({ src, alt }, index) => (
        <div
          key={src}
          data-index={index}
          className={`relative w-full shrink-0 snap-start ${fill ? "h-full" : "aspect-[3/2]"}`}
        >
          <Image src={src} alt={alt} fill unoptimized className="object-cover" />
        </div>
      ))}
    </div>
  );

  if (navPosition === "overlay") {
    return (
      <div className="relative h-full">
        {track}
        <div className="absolute right-0 bottom-4 left-0">
          <CarouselNav count={photos.length} activeIndex={activeIndex} onNavigate={scrollToIndex} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {track}
      <CarouselNav count={photos.length} activeIndex={activeIndex} onNavigate={scrollToIndex} />
    </div>
  );
}
