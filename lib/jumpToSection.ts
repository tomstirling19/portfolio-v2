// Instant jump + view-transition crossfade read as a hard teleport. Real
// smooth scrolling (native, respects prefers-reduced-motion) glides instead —
// scroll-snap-type is "proximity" so it doesn't fight the in-flight scroll.
export function jumpToSection(id: string) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior: ScrollBehavior = reducedMotion ? "instant" : "smooth";

  // Landing on experience's own top puts its first entry near the top of
  // the viewport, not centered — already past its magnification peak.
  // Center that entry instead so it's the one that's magnified on arrival.
  if (id === "experience") {
    const firstEntry = document.getElementById("experience-first");
    if (firstEntry) {
      // Proximity snap can still tug toward the section's own top edge
      // mid-scroll since it's a closer snap point than the child's center —
      // suspend it for the duration of this one scroll, then restore.
      const html = document.documentElement;
      const previousSnapType = html.style.scrollSnapType;
      html.style.scrollSnapType = "none";

      const restore = () => {
        html.style.scrollSnapType = previousSnapType;
      };
      if (reducedMotion) {
        firstEntry.scrollIntoView({ behavior, block: "center" });
        restore();
      } else {
        window.addEventListener("scrollend", restore, { once: true });
        window.setTimeout(restore, 700); // fallback if scrollend never fires
        firstEntry.scrollIntoView({ behavior, block: "center" });
      }
    }
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior });
  }

  history.replaceState(
    null,
    "",
    id === "landing" ? location.pathname + location.search : `#${id}`,
  );
}
