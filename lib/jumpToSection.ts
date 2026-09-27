import { SECTIONS } from "@/content/sections";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function waitForScrollEnd(): Promise<void> {
  return new Promise((resolve) => {
    const finish = () => {
      window.removeEventListener("scrollend", finish);
      resolve();
    };
    window.addEventListener("scrollend", finish, { once: true });
    window.setTimeout(finish, 1000);
  });
}

let snapDisableCount = 0;
let snapTypeBeforeDisable = "";

function disableSnap() {
  if (snapDisableCount === 0) {
    snapTypeBeforeDisable = document.documentElement.style.scrollSnapType;
    document.documentElement.style.scrollSnapType = "none";
    void document.documentElement.offsetHeight;
  }
  snapDisableCount++;
}

function restoreSnap() {
  snapDisableCount = Math.max(0, snapDisableCount - 1);
  if (snapDisableCount === 0) {
    document.documentElement.style.scrollSnapType = snapTypeBeforeDisable;
  }
}

export function smoothScrollBy(delta: number): Promise<void> {
  if (prefersReducedMotion()) {
    window.scrollBy({ top: delta, behavior: "instant" });
    return Promise.resolve();
  }

  window.scrollBy({ top: delta, behavior: "smooth" });
  return waitForScrollEnd();
}

export function jumpToSection(id: string): Promise<void> {
  const anchorId = SECTIONS.find((section) => section.id === id)?.enterAnchorId;
  const anchorEl = anchorId ? document.getElementById(anchorId) : null;
  const target = anchorEl ?? document.getElementById(id);

  history.replaceState(
    null,
    "",
    id === "landing" ? location.pathname + location.search : `#${id}`,
  );

  if (!target) return Promise.resolve();

  const block = anchorEl ? "center" : "start";

  if (prefersReducedMotion()) {
    target.scrollIntoView({ behavior: "instant", block });
    return Promise.resolve();
  }

  disableSnap();
  target.scrollIntoView({ behavior: "smooth", block });
  return waitForScrollEnd().then(restoreSnap);
}
