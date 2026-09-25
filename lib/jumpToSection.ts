import { SECTIONS } from "@/content/sections";

const GLIDE_DURATION_MS = 450;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

function glideScrollTo(targetTop: number, duration: number) {
  return new Promise<void>((resolve) => {
    const startTop = window.scrollY;
    const delta = targetTop - startTop;
    const startTime = performance.now();
    let settled = false;

    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };

    function step(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      window.scrollTo(0, startTop + delta * easeInOutCubic(progress));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        finish();
      }
    }

    requestAnimationFrame(step);
    window.setTimeout(finish, duration + 300);
  });
}

export function jumpToSection(id: string) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior: ScrollBehavior = reducedMotion ? "instant" : "smooth";

  const anchorId = SECTIONS.find((section) => section.id === id)?.enterAnchorId;
  const anchorEntry = anchorId ? document.getElementById(anchorId) : null;

  if (anchorEntry) {
    const html = document.documentElement;
    const previousSnapType = html.style.scrollSnapType;
    html.style.scrollSnapType = "none";
    void html.offsetHeight;

    const rect = anchorEntry.getBoundingClientRect();
    const targetTop = window.scrollY + rect.top + rect.height / 2 - window.innerHeight / 2;

    if (reducedMotion) {
      window.scrollTo({ top: targetTop, behavior: "instant" });
      html.style.scrollSnapType = previousSnapType;
    } else {
      glideScrollTo(targetTop, GLIDE_DURATION_MS).then(() => {
        html.style.scrollSnapType = previousSnapType;
      });
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
