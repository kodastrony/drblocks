import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/Icons";
import { blog } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog – wiedza o fundamentach modułowych",
  description:
    "Poradniki i porównania o fundamentach pod budynki modułowe, kontenery i pawilony: regulowane bloczki vs tradycyjny beton, dobór, koszty i montaż.",
  alternates: { canonical: "/blog" },
};

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(iso),
  );
}

export default function BlogPage() {
  return (
    <>
      <PageHeader
        title="Wiedza o fundamentach"
        lead="Poradniki, porównania i praktyczna wiedza o posadowieniu budynków modułowych, kontenerów i pawilonów."
        crumbs={[{ label: "Strona główna", href: "/" }, { label: "Blog" }]}
      />

      <section className="bg-white py-16 lg:py-24">
        <Container>
          <Stagger className="grid gap-6 md:grid-cols-2">
            {blog.map((post) => (
              <StaggerItem key={post.slug} className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
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
                    Czytaj więcej
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
