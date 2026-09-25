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

function targetTopFor(id: string) {
  const anchorId = SECTIONS.find((section) => section.id === id)?.enterAnchorId;
  const anchorEl = anchorId ? document.getElementById(anchorId) : null;
  const target = anchorEl ?? document.getElementById(id);
  if (!target) return null;

  const rect = target.getBoundingClientRect();
  return anchorEl
    ? window.scrollY + rect.top + rect.height / 2 - window.innerHeight / 2
    : window.scrollY + rect.top;
}

export function smoothScrollBy(delta: number): Promise<void> {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targetTop = window.scrollY + delta;

  if (reducedMotion) {
    window.scrollTo({ top: targetTop, behavior: "instant" });
    return Promise.resolve();
  }

  return glideScrollTo(targetTop, GLIDE_DURATION_MS);
}

export function jumpToSection(id: string): Promise<void> {
  const targetTop = targetTopFor(id);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let done: Promise<void> = Promise.resolve();

  if (targetTop !== null) {
    if (reducedMotion) {
      window.scrollTo({ top: targetTop, behavior: "instant" });
    } else {
      const html = document.documentElement;
      const previousSnapType = html.style.scrollSnapType;
      html.style.scrollSnapType = "none";
      void html.offsetHeight;

      done = glideScrollTo(targetTop, GLIDE_DURATION_MS).then(() => {
        html.style.scrollSnapType = previousSnapType;
      });
    }
  }

  history.replaceState(
    null,
    "",
    id === "landing" ? location.pathname + location.search : `#${id}`,
  );

  return done;
}
