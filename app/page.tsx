import Landing from "@/components/Landing";
import Reveal from "@/components/Reveal";
import { SECTIONS } from "@/content/sections";

export default function Home() {
  return (
    <>
      <Landing />

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
