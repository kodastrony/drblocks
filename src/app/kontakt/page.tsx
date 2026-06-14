import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { Phone, Mail, MapPin, Instagram } from "@/components/Icons";
import { company } from "@/lib/content";

export const metadata: Metadata = {
  title: "Kontakt – zamów darmową wycenę",
  description:
    "Skontaktuj się z DrBlocks: tel. +48 506 057 727, kontakt@drblocks.pl, sprzedaz@drblocks.pl. Przygotujemy wycenę regulowanych bloczków fundamentowych do Twojego projektu.",
  alternates: { canonical: "/kontakt" },
};

export default async function KontaktPage({
  searchParams,
}: {
  searchParams: Promise<{ [k: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const wymiary = typeof sp.wymiary === "string" ? sp.wymiary : "";
  const bloczki = typeof sp.bloczki === "string" ? sp.bloczki : "";
  const produkt = typeof sp.produkt === "string" ? sp.produkt : "";
  const parts: string[] = [];
  if (produkt) parts.push(`Interesuje mnie produkt: ${produkt}.`);
  if (wymiary || bloczki)
    parts.push(
      `Proszę o wycenę fundamentu${wymiary ? ` o wymiarach ${wymiary}` : ""}${
        bloczki ? ` (orientacyjnie ${bloczki} bloczków wg kalkulatora)` : ""
      }.`,
    );
  const defaultMessage = parts.length > 0 ? `Dzień dobry, ${parts.join(" ")} Proszę o kontakt.` : "";

  const contacts = [
    { icon: Phone, label: "Telefon", value: company.phone, href: company.phoneHref },
    { icon: Mail, label: "Sprzedaż", value: company.emailSales, href: `mailto:${company.emailSales}` },
    { icon: Mail, label: "Kontakt ogólny", value: company.emailContact, href: `mailto:${company.emailContact}` },
    { icon: MapPin, label: "Adres", value: company.address },
  ];

  return (
    <>
      <PageHeader
        title="Porozmawiajmy o Twoim fundamencie"
        lead="Napisz lub zadzwoń – pomożemy dobrać produkt, policzymy liczbę bloczków i przygotujemy wycenę dopasowaną do Twojego projektu."
        crumbs={[{ label: "Strona główna", href: "/" }, { label: "Kontakt" }]}
      />

      <section className="bg-white py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <h2 className="text-2xl">Dane kontaktowe</h2>
            <ul className="mt-6 space-y-3">
              {contacts.map((c) => {
                const Icon = c.icon;
                const inner = (
                  <div className="flex items-start gap-4 rounded-xl border border-line bg-mist/40 p-4 transition-colors hover:border-teal/40">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-mute">{c.label}</p>
                      <p className="mt-0.5 font-medium text-navy">{c.value}</p>
                    </div>
                  </div>
                );
                return (
                  <li key={c.label}>
                    {c.href ? <a href={c.href} className="block">{inner}</a> : inner}
                  </li>
                );
              })}
            </ul>
            <a
              href={company.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal-700"
            >
              <Instagram className="size-5" /> @drblocksforbuildings
            </a>
            <p className="mt-8 text-xs leading-relaxed text-mute">
              {company.legal} · NIP {company.nip} · REGON {company.regon}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <ContactForm defaultMessage={defaultMessage} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
