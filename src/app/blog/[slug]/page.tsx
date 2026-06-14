import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Markdown } from "@/components/Markdown";
import { ArrowRight } from "@/components/Icons";
import Link from "next/link";
import { blog } from "@/lib/content";
import { blogBodies } from "@/lib/blog-content";

export function generateStaticParams() {
  return blog.map((p) => ({ slug: p.slug }));
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(iso),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blog.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blog.find((p) => p.slug === slug);
  const body = blogBodies[slug];
  if (!post || !body) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "DrBlocks" },
    publisher: { "@type": "Organization", name: "DrBlocks" },
    mainEntityOfPage: `https://drblocks.pl/blog/${post.slug}`,
  };

  return (
    <>
      <PageHeader
        eyebrow={formatDate(post.date)}
        title={post.title}
        crumbs={[
          { label: "Strona główna", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title.length > 40 ? post.title.slice(0, 40) + "…" : post.title },
        ]}
      />

      <article className="bg-white py-16 lg:py-20">
        <Container className="max-w-2xl">
          <Markdown content={body} />

          <div className="mt-14 rounded-2xl border border-line bg-mist px-6 py-10 text-center sm:px-10">
            <h2 className="text-2xl sm:text-3xl">Zastanawiasz się nad fundamentem?</h2>
            <p className="mx-auto mt-3 max-w-lg text-steel">
              Pomożemy dobrać rozwiązanie i przygotujemy wycenę dla Twojego projektu.
            </p>
            <div className="mt-6 flex justify-center">
              <Button href="/kontakt" variant="primary" size="lg" arrow>
                Darmowa wycena
              </Button>
            </div>
          </div>

          <Link
            href="/blog"
            className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-teal-700"
          >
            <ArrowRight className="size-4 rotate-180" />
            Wróć do bloga
          </Link>
        </Container>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
