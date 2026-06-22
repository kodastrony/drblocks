import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export type Crumb = { label: string; href?: string };

export function PageHeader({
  eyebrow,
  title,
  lead,
  crumbs,
  crumbsLabel = "Okruszki",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumbs: Crumb[];
  crumbsLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-mist">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-teal-50 blur-3xl"
        aria-hidden
      />
      <Container className="relative py-14 lg:py-20">
        <nav aria-label={crumbsLabel} className="flex flex-wrap items-center gap-2 text-sm text-steel">
          {crumbs.map((c, i) => (
            <span key={c.label} className="flex items-center gap-2">
              {c.href ? (
                <Link href={c.href} className="transition-colors hover:text-teal-800">
                  {c.label}
                </Link>
              ) : (
                <span className="text-slate">{c.label}</span>
              )}
              {i < crumbs.length - 1 && <span className="text-line-strong">/</span>}
            </span>
          ))}
        </nav>

        <Reveal className="mt-6">
          {eyebrow && (
            <div className="mb-4">
              <SectionLabel>{eyebrow}</SectionLabel>
            </div>
          )}
          <h1 className="max-w-3xl text-balance text-4xl sm:text-5xl">{title}</h1>
          {lead && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-steel">{lead}</p>}
        </Reveal>
      </Container>
    </section>
  );
}
