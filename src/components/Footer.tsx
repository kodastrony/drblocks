import Link from "next/link";
import { company } from "@/lib/content";
import { Phone, Mail, Instagram, ArrowRight } from "@/components/Icons";

const cols = [
  {
    title: "Oferta",
    links: [
      { label: "Standard Block", href: "/oferta/standard-block" },
      { label: "Standard Plus Block", href: "/oferta/standard-plus-block" },
    ],
  },
  {
    title: "Informacje",
    links: [
      { label: "O firmie", href: "/o-nas" },
      { label: "FAQ", href: "/faq" },
      { label: "Blog", href: "/blog" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white/70">
      <div className="bg-grid-dark absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-[1200px] px-5 pb-10 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="font-display text-2xl font-bold tracking-tight text-white">
              Dr<span className="text-teal">·</span>BLOCKS
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Regulowane bloczki fundamentowe dla budownictwa modułowego. Fundament w jeden dzień,
              precyzja do milimetra.
            </p>
            <a
              href={company.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex size-10 items-center justify-center rounded-lg border border-white/15 text-white/70 transition-colors hover:border-teal hover:text-teal"
              aria-label="Instagram DrBlocks"
            >
              <Instagram className="size-5" />
            </a>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="font-oswald text-xs font-semibold uppercase tracking-[0.18em] text-white">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/60 transition-colors hover:text-teal"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-oswald text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Kontakt
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={company.phoneHref} className="flex items-center gap-2.5 text-white/70 transition-colors hover:text-teal">
                  <Phone className="size-4 shrink-0 text-teal" /> {company.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.emailSales}`} className="flex items-center gap-2.5 text-white/70 transition-colors hover:text-teal">
                  <Mail className="size-4 shrink-0 text-teal" /> {company.emailSales}
                </a>
              </li>
            </ul>
            <Link
              href="/kontakt"
              className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white"
            >
              Zamów darmową wycenę
              <ArrowRight className="size-4 text-teal transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} DrBlocks · {company.legal} · NIP {company.nip}
          </p>
          <Link href="/polityka-prywatnosci" className="transition-colors hover:text-white/80">
            Polityka prywatności
          </Link>
        </div>
      </div>
    </footer>
  );
}
