import Link from "next/link";
import { getContent } from "@/i18n";

// Global 404 (renders inside the root layout's <html>/<body>). Defaults to PL.
export default function NotFound() {
  const c = getContent("pl").notFound;
  return (
    <main className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-mist px-6 py-28 text-center">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative">
        <p className="font-oswald text-7xl font-bold text-teal sm:text-8xl">{c.code}</p>
        <h1 className="mt-4 font-display text-3xl font-bold text-navy sm:text-4xl">{c.title}</h1>
        <p className="mx-auto mt-4 max-w-md text-steel">{c.body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/pl"
            className="inline-flex items-center justify-center rounded-xl bg-navy px-7 py-4 font-semibold text-white transition-colors hover:bg-teal"
          >
            {c.home}
          </Link>
          <Link
            href="/pl/oferta"
            className="inline-flex items-center justify-center rounded-xl border border-line-strong px-7 py-4 font-semibold text-navy transition-colors hover:border-navy"
          >
            {c.offer}
          </Link>
        </div>
      </div>
    </main>
  );
}
