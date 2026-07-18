import Reveal from "@/components/Reveal";
import { SECTIONS } from "@/content/sections";

export default function Home() {
  return (
    <>
      <section
        id="landing"
        className="flex min-h-screen scroll-mt-14 flex-col items-center justify-center gap-4 snap-start md:scroll-mt-0"
      >
        <p className="text-4xl">Portfolio v2</p>
        <p className="font-mono text-cool-accent text-sm">
          application shell —{" "}
          <span className="text-warm-accent">after hours</span>
        </p>
      </section>

      {SECTIONS.map(({ id, label }, index) => (
        <Reveal key={id}>
          <section
            id={id}
            className="flex min-h-screen scroll-mt-14 items-center justify-center snap-start md:scroll-mt-0"
          >
            <p className="font-mono text-ink/40 text-sm">
              {String(index + 1).padStart(2, "0")} — {label}
            </p>
          </section>
        </Reveal>
      ))}
    </>
  );
}
