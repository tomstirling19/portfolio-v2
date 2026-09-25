export function CarouselNav({
  count,
  activeIndex,
  onNavigate,
}: {
  count: number;
  activeIndex: number;
  onNavigate: (index: number) => void;
}) {
  if (count < 2) return null;

  return (
    <div className="flex items-center justify-center gap-3">
      <button
        type="button"
        aria-label="Previous"
        onClick={() => onNavigate(Math.max(activeIndex - 1, 0))}
        className="text-ink/50 hover:text-ink flex h-11 w-11 items-center justify-center font-mono text-lg transition-colors"
      >
        ‹
      </button>

      <div className="flex gap-1">
        {Array.from({ length: count }, (_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to item ${index + 1}`}
            aria-current={index === activeIndex}
            onClick={() => onNavigate(index)}
            className="flex h-8 w-8 items-center justify-center"
          >
            <span
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                index === activeIndex ? "bg-warm-accent" : "bg-ink/30"
              }`}
            />
          </button>
        ))}
      </div>

      <button
        type="button"
        aria-label="Next"
        onClick={() => onNavigate(Math.min(activeIndex + 1, count - 1))}
        className="text-ink/50 hover:text-ink flex h-11 w-11 items-center justify-center font-mono text-lg transition-colors"
      >
        ›
      </button>
    </div>
  );
}
