type ViewTransitionDocument = Document & {
  startViewTransition: (callback: () => void) => void;
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
    document.startViewTransition(run);
  } else {
    run();
  }
}
