import { EXPERIENCE } from "@/content/data";

export default function Experience() {
  return (
    <ol className="flex w-full flex-col gap-6">
      {EXPERIENCE.map(({ role, org, period }) => (
        <li
          key={org}
          className="border-ink/10 flex flex-col gap-1 border-b pb-6 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between"
        >
          <div>
            <p className="text-ink">{role}</p>
            <p className="text-cool-accent font-mono text-sm">{org}</p>
          </div>
          <p className="text-ink/40 font-mono text-xs whitespace-nowrap">
            {period}
          </p>
        </li>
      ))}
    </ol>
  );
}
