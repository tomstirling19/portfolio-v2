import { PROJECTS } from "@/content/data";

export default function Projects() {
  return (
    <ol className="flex w-full flex-col gap-8">
      {PROJECTS.map(({ name, description, year, href }) => (
        <li key={name} className="border-ink/10 border-b pb-8 last:border-0 last:pb-0">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-baseline justify-between gap-4"
          >
            <span className="text-ink group-hover:text-warm-accent transition-colors">
              {name}
            </span>
            <span className="text-ink/40 font-mono text-xs whitespace-nowrap">
              {year}
            </span>
          </a>
          <p className="text-ink/60 mt-2">{description}</p>
        </li>
      ))}
    </ol>
  );
}
