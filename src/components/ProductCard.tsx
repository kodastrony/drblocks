import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@/components/Icons";
import type { Product } from "@/lib/content";

export function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      href={`/oferta/${p.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-teal/40 hover:shadow-[var(--shadow-lift)]"
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-gradient-to-b from-mist to-white">
        <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
        {p.badge && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-navy/90 px-3 py-1 font-oswald text-[10px] font-semibold uppercase tracking-wider text-white">
            {p.badge}
          </span>
        )}
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl">{p.name}</h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-steel">{p.short}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700">
          Dowiedz się więcej
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
