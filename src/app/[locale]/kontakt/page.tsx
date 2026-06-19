import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { Phone, Mail, Instagram } from "@/components/Icons";
import { getContent, localizedHref } from "@/i18n";
import { locales, isLocale, defaultLocale, localeHreflang, type Locale } from "@/i18n/config";
import { company } from "@/lib/company";

const SITE = "https://drblocks.pl";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const m = getContent(locale).meta.kontakt;
  const languages: Record<string, string> = { "x-default": `${SITE}/${defaultLocale}/kontakt` };
  for (const l of locales) languages[localeHreflang[l]] = `${SITE}/${l}/kontakt`;
  return {
    title: { absolute: m.title },
    description: m.description,
    keywords: m.keywords,
    alternates: { canonical: `/${locale}/kontakt`, languages },
  };
}

export default async function KontaktPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const c = getContent(locale);
  const { contact, ui } = c;

  const contacts = [
    { icon: Phone, label: contact.phone, value: company.phone, href: company.phoneHref },
    { icon: Mail, label: contact.sales, value: company.emailSales, href: `mailto:${company.emailSales}` },
    {
      icon: Mail,
      label: contact.general,
      value: company.emailContact,
      href: `mailto:${company.emailContact}`,
    },
  ];

  return (
    <>
      <PageHeader
        title={contact.heading}
        lead={contact.lead}
        crumbs={[
          { label: ui.breadcrumbHome, href: localizedHref(locale, "/") },
          { label: contact.heading },
        ]}
      />

      <section className="bg-white py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <h2 className="text-2xl">{contact.dataHeading}</h2>
            <ul className="mt-6 space-y-3">
              {contacts.map((cc) => {
                const Icon = cc.icon;
                const inner = (
                  <div className="flex items-start gap-4 rounded-xl border border-line bg-mist/40 p-4 transition-colors hover:border-teal/40">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-mute">{cc.label}</p>
                      <p className="mt-0.5 font-medium text-navy">{cc.value}</p>
                    </div>
                  </div>
                );
                return (
                  <li key={cc.label}>
                    {cc.href ? (
                      <a href={cc.href} className="block">
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
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
              <Instagram className="size-5" /> {company.instagramHandle}
            </a>
            <p className="mt-8 text-xs leading-relaxed text-mute">
              {company.legal} · NIP {company.nip} · REGON {company.regon}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
