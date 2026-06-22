import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { Check } from "@/components/Icons";
import { getContent, localizedHref } from "@/i18n";
import { pageMeta, breadcrumbJsonLd } from "@/i18n/meta";
import { locales, isLocale, defaultLocale, type Locale } from "@/i18n/config";

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
  const m = getContent(locale).meta.oferta;
  return pageMeta({ locale, path: "/oferta", title: m.title, description: m.description, keywords: m.keywords });
}

export default async function OfertaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const c = getContent(locale);
  const { products, ui } = c;
  const cmp = products.compare;

  function Cell({ v }: { v: string | boolean }) {
    if (v === true) return <Check className="mx-auto size-5 text-teal-600" aria-label={cmp.yes} />;
    if (v === false)
      return (
        <span className="text-line-strong" aria-label={cmp.no}>
          –
        </span>
      );
    return <span className="tabular text-navy">{v}</span>;
  }

  const breadcrumbLd = breadcrumbJsonLd(locale, [
    { name: ui.breadcrumbHome, path: "/" },
    { name: cmp.heading },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <PageHeader
        crumbsLabel={ui.breadcrumbAria}
        title={products.heading}
        lead={products.intro}
        crumbs={[
          { label: ui.breadcrumbHome, href: localizedHref(locale, "/") },
          { label: cmp.heading },
        ]}
      />

      <section className="bg-white py-16 lg:py-24">
        <Container>
          <Stagger className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
            {products.list.map((p) => (
              <StaggerItem key={p.slug} className="h-full">
                <ProductCard p={p} locale={locale} learnMore={ui.learnMore} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="bg-mist py-16 lg:py-24">
        <Container>
          <Reveal>
            <h2 className="text-3xl sm:text-4xl">{cmp.heading}</h2>
          </Reveal>
          <Reveal delay={0.06} className="mt-8 overflow-hidden rounded-2xl border border-line bg-white">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-line bg-navy text-white">
                    <th scope="col" className="px-5 py-4 text-left font-medium text-white/70">
                      {cmp.paramHeader}
                    </th>
                    <th scope="col" className="px-5 py-4 text-center font-semibold">
                      {products.list[0]?.name}
                    </th>
                    <th scope="col" className="px-5 py-4 text-center font-semibold">
                      {products.list[1]?.name}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cmp.rows.map((row, i) => (
                    <tr key={row.k} className={i % 2 ? "bg-mist/50" : "bg-white"}>
                      <th scope="row" className="px-5 py-3.5 text-left font-medium text-slate">
                        {row.k}
                      </th>
                      <td className="px-5 py-3.5 text-center">
                        <Cell v={row.standard} />
                      </td>
                      <td className="px-5 py-3.5 text-center">
                        <Cell v={row.plus} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
