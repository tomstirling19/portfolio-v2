import { INTERESTS } from "@/content/data";

export default function Interests() {
  return (
    <ul className="flex flex-wrap justify-center gap-3">
      {INTERESTS.map((interest) => (
        <li
          key={interest}
          className="border-ink/20 text-ink/70 rounded-full border px-4 py-2 font-mono text-sm"
        >
          {interest}
        </li>
      ))}
    </ul>
  );
}
