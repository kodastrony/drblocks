import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/Icons";
import { getContent, localizedHref } from "@/i18n";
import { locales, isLocale, defaultLocale, localeHreflang, type Locale } from "@/i18n/config";

const SITE = "https://drblocks.pl";

const intlLocale: Record<Locale, string> = { pl: "pl-PL", en: "en-GB", de: "de-DE" };

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
  const m = getContent(locale).meta.blog;
  const languages: Record<string, string> = { "x-default": `${SITE}/${defaultLocale}/blog` };
  for (const l of locales) languages[localeHreflang[l]] = `${SITE}/${l}/blog`;
  return {
    title: { absolute: m.title },
    description: m.description,
    keywords: m.keywords,
    alternates: { canonical: `/${locale}/blog`, languages },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const c = getContent(locale);
  const { blog, ui } = c;

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(intlLocale[locale], {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));

  return (
    <>
      <PageHeader
        title={blog.heading}
        lead={blog.lead}
        crumbs={[
          { label: ui.breadcrumbHome, href: localizedHref(locale, "/") },
          { label: blog.heading },
        ]}
      />

      <section className="bg-white py-16 lg:py-24">
        <Container>
          <Stagger className="grid gap-6 md:grid-cols-2">
            {blog.posts.map((post) => (
              <StaggerItem key={post.slug} className="h-full">
                <Link
                  href={localizedHref(locale, `/blog/${post.slug}`)}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-[var(--shadow-card)]"
                >
                  <span className="font-oswald text-xs font-semibold uppercase tracking-wider text-teal-700">
                    {formatDate(post.date)}
                  </span>
                  <h2 className="mt-3 text-xl leading-snug transition-colors group-hover:text-teal-700">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-steel">{post.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
                    {ui.readMore}
                    <ArrowRight className="size-4 text-teal transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
    </>
  );
}
