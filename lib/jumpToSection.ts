type ViewTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
};

type ViewTransitionDocument = Document & {
  startViewTransition: (callback: () => void) => ViewTransition;
};

function hasViewTransitions(doc: Document): doc is ViewTransitionDocument {
  return "startViewTransition" in doc;
}

export function jumpToSection(id: string) {
  const run = () => {
    // scroll-behavior:smooth + scroll-snap-type can cancel the native anchor
    // jump outright (net 0px movement); an instant jump is reliable.
    document.getElementById(id)?.scrollIntoView({ behavior: "instant" as ScrollBehavior });
    history.replaceState(
      null,
      "",
      id === "landing" ? location.pathname + location.search : `#${id}`,
    );
  };

  if (hasViewTransitions(document)) {
    const transition = document.startViewTransition(run);
    // A transition started before this one finishes gets skipped, which
    // rejects these promises — a fast double-click shouldn't throw.
    transition.ready.catch(() => {});
    transition.finished.catch(() => {});
  } else {
    run();
  }
}
