let originalSnapType: string | null = null;
let cancelPendingRestore: (() => void) | null = null;

function suspendScrollSnap(durationMs: number) {
  const html = document.documentElement;
  cancelPendingRestore?.();

  if (originalSnapType === null) originalSnapType = html.style.scrollSnapType;
  html.style.scrollSnapType = "none";
  void html.offsetHeight;

  const restore = () => {
    html.style.scrollSnapType = originalSnapType ?? "";
    originalSnapType = null;
    cancelPendingRestore = null;
  };
  const timeoutId = window.setTimeout(restore, durationMs);
  cancelPendingRestore = () => window.clearTimeout(timeoutId);

  return restore;
}

export function jumpToSection(id: string) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior: ScrollBehavior = reducedMotion ? "instant" : "smooth";

  if (id === "experience") {
    const firstEntry = document.getElementById("experience-first");
    if (firstEntry) {
      const restoreSnapType = suspendScrollSnap(300);
      const rect = firstEntry.getBoundingClientRect();
      const targetTop = window.scrollY + rect.top + rect.height / 2 - window.innerHeight / 2;
      window.scrollTo({ top: targetTop, behavior: "instant" });
      restoreSnapType();
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
