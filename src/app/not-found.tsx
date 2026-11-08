import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-[100svh] place-items-center px-5">
      <div className="w-full max-w-lg rounded-2xl border border-line bg-bg-2 p-6 font-mono text-sm sm:p-8">
        <p className="text-muted">
          <span className="text-accent">$</span> cd ./this-page
        </p>
        <p className="mt-2">bash: cd: ./this-page: No such file or directory</p>
        <p className="mt-2 text-muted">Error 404. The link may be old or mistyped.</p>
        <Link
          href="/"
          className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 font-sans font-medium text-accent-fg"
        >
          cd ~ <span aria-hidden="true">→</span> back home
        </Link>
      </div>
    </main>
  );
}
