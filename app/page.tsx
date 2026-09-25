import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Interests from "@/components/sections/Interests";
import Landing from "@/components/sections/Landing";
import Projects from "@/components/sections/Projects";
import Reveal from "@/components/layout/Reveal";
import { SECTIONS } from "@/content/sections";

const CONTENT: Record<string, React.ComponentType> = {
  experience: Experience,
  projects: Projects,
  interests: Interests,
  contact: Contact,
};

export default function Home() {
  return (
    <>
      <Landing />

      <About />

      {SECTIONS.filter(({ id }) => id !== "about").map(({ id, label }, index) => {
        const Content = CONTENT[id];
        return (
          <Reveal key={id}>
            <section
              id={id}
              className="flex min-h-screen scroll-mt-14 items-center justify-center px-6 py-24 snap-start md:scroll-mt-0 md:pr-[max(11rem,11%)] [scroll-snap-stop:always]"
            >
              <div className="mx-auto w-full max-w-2xl">
                <div className="border-warm-accent/30 mb-10 flex items-baseline gap-3 border-b pb-3">
                  <span className="text-warm-accent font-mono text-sm">
                    {String(index + 2).padStart(2, "0")}
                  </span>
                  <h2 className="text-ink font-mono text-xl tracking-wide uppercase">
                    {label}
                  </h2>
                </div>
                <Content />
              </div>
            </section>
          </Reveal>
        );
      })}
    </>
  );
}
