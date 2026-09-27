import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <p className="text-warm-accent font-mono text-sm">404</p>
      <h1 className="text-ink font-serif text-3xl sm:text-4xl">Page not found.</h1>
      <p className="text-ink/65 max-w-sm">
        This is a single-page portfolio — there&rsquo;s nothing to find past the front door.
      </p>
      <Link
        href="/"
        className="text-warm-accent hover:text-icon-orange mt-2 font-mono text-sm underline underline-offset-4 transition-colors"
      >
        Back to the top
      </Link>
    </div>
  );
}
