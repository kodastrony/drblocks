import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Markdown } from "@/components/Markdown";
import { ArrowRight } from "@/components/Icons";
import { getContent, localizedHref } from "@/i18n";
import { locales, isLocale, defaultLocale, localeHreflang, type Locale } from "@/i18n/config";
import { blogBodies } from "@/lib/blog-content";

const SITE = "https://drblocks.pl";

const intlLocale: Record<Locale, string> = { pl: "pl-PL", en: "en-GB", de: "de-DE" };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getContent(locale).blog.posts.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const c = getContent(locale);
  const post = c.blog.posts.find((p) => p.slug === slug);
  const m = c.meta[`post-${slug}`];
  if (!post) return {};
  const languages: Record<string, string> = {
    "x-default": `${SITE}/${defaultLocale}/blog/${slug}`,
  };
  for (const l of locales) languages[localeHreflang[l]] = `${SITE}/${l}/blog/${slug}`;
  return {
    title: m ? { absolute: m.title } : post.title,
    description: m?.description ?? post.excerpt,
    keywords: m?.keywords,
    alternates: { canonical: `/${locale}/blog/${slug}`, languages },
    openGraph: { type: "article", title: post.title, description: post.excerpt },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const c = getContent(locale);
  const { blog, ui } = c;

  const post = blog.posts.find((p) => p.slug === slug);
  const body = blogBodies[slug];
  if (!post || !body) notFound();

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(intlLocale[locale], {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    inLanguage: locale,
    image: `${SITE}/assets/hero-poster.jpg`,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", "@id": `${SITE}/#organization`, name: "DrBlocks", url: SITE },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "DrBlocks",
      logo: {
        "@type": "ImageObject",
        url: `${SITE}/assets/cropped-DR-BLOCKS_LOGO_male-czarne-270x270.png`,
      },
    },
    mainEntityOfPage: `${SITE}/${locale}/blog/${post.slug}`,
  };

  return (
    <>
      <PageHeader
        eyebrow={formatDate(post.date)}
        title={post.title}
        crumbs={[
          { label: ui.breadcrumbHome, href: localizedHref(locale, "/") },
          { label: blog.heading, href: localizedHref(locale, "/blog") },
          { label: post.title.length > 40 ? post.title.slice(0, 40) + "…" : post.title },
        ]}
      />

      <article className="bg-white py-16 lg:py-20">
        <Container className="max-w-2xl">
          <Markdown content={body} />

          <div className="mt-14 rounded-2xl border border-line bg-mist px-6 py-10 text-center sm:px-10">
            <h2 className="text-2xl sm:text-3xl">{blog.closerHeading}</h2>
            <p className="mx-auto mt-3 max-w-lg text-steel">{blog.closerBody}</p>
            <div className="mt-6 flex justify-center">
              <Button href={localizedHref(locale, "/kontakt")} variant="primary" size="lg" arrow>
                {blog.closerCta}
              </Button>
            </div>
          </div>

          <Link
            href={localizedHref(locale, "/blog")}
            className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-teal-700"
          >
            <ArrowRight className="size-4 rotate-180" />
            {ui.backToBlog}
          </Link>
        </Container>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
