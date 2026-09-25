let originalSnapType: string | null = null;
let cancelPendingRestore: (() => void) | null = null;

function suspendScrollSnap() {
  const html = document.documentElement;
  cancelPendingRestore?.();

  if (originalSnapType === null) originalSnapType = html.style.scrollSnapType;
  html.style.scrollSnapType = "none";

  const restore = () => {
    html.style.scrollSnapType = originalSnapType ?? "";
    originalSnapType = null;
    cancelPendingRestore = null;
    window.removeEventListener("scrollend", restore);
    window.clearTimeout(timeoutId);
  };
  const timeoutId = window.setTimeout(restore, 700);
  window.addEventListener("scrollend", restore, { once: true });
  cancelPendingRestore = () => {
    window.removeEventListener("scrollend", restore);
    window.clearTimeout(timeoutId);
  };

  return restore;
}

export function jumpToSection(id: string) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior: ScrollBehavior = reducedMotion ? "instant" : "smooth";

  if (id === "experience") {
    const firstEntry = document.getElementById("experience-first");
    if (firstEntry) {
      const restoreSnapType = suspendScrollSnap();
      firstEntry.scrollIntoView({ behavior, block: "center" });
      if (reducedMotion) restoreSnapType();
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
