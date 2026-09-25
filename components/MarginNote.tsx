import type { ReactNode } from "react";

export default function MarginNote({ children }: { children: ReactNode }) {
  return (
    <span className="border-cool-accent text-ink/60 block border-l-2 pl-3 font-mono text-xs md:border-l-0 md:pl-0">
      {children}
    </span>
  );
}
