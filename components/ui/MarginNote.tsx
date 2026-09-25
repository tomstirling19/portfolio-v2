import type { ReactNode } from "react";

export default function MarginNote({ children }: { children: ReactNode }) {
  return (
    <span className="border-warm-accent text-warm-accent block border-l-2 pl-3 text-lg md:border-l-0 md:pl-0">
      {children}
    </span>
  );
}
