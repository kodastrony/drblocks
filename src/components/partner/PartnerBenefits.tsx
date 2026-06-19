import type { SiteContent } from "@/i18n/types";

type Benefits = SiteContent["partner"]["benefits"];

const Tag = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.6 12.6 11 5.2a2 2 0 0 1 1.4-.6H19A1.4 1.4 0 0 1 20.4 6v6.6a2 2 0 0 1-.6 1.4l-7.4 7.4a1.5 1.5 0 0 1-2.1 0l-6.7-6.7a1.5 1.5 0 0 1 0-2.1Z" />
    <circle cx="15.6" cy="8.4" r="1.4" />
  </svg>
);
const Star = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z" />
  </svg>
);
const Megaphone = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 9.5v5a1 1 0 0 0 1 1h2.2L16 20V4L7.2 8.5H5a1 1 0 0 0-1 1Z" />
    <path d="M19 9a3.6 3.6 0 0 1 0 6" />
    <path d="M7.5 15.5 8.7 20" />
  </svg>
);

const ICONS = [Tag, Star, Megaphone];

export function PartnerBenefits({ dict, ctaLabel }: { dict: Benefits; ctaLabel: string }) {
  return (
    <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold text-navy sm:text-4xl">{dict.heading}</h2>
        <p className="mt-5 text-lg leading-relaxed text-steel">{dict.lead}</p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {dict.items.map((b, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <div
              key={b.title}
              className="group rounded-2xl border border-line bg-mist/40 p-7 transition duration-500 ease-[cubic-bezier(0.33,0,0.2,1)] hover:-translate-y-1 hover:border-teal/30 hover:bg-white hover:shadow-[0_20px_44px_-30px_rgba(15,23,42,0.22)]"
            >
              <span className="mb-5 inline-flex size-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700 shadow-[0_2px_10px_-6px_rgba(15,23,42,0.16)] ring-1 ring-teal/15 transition duration-500 ease-[cubic-bezier(0.33,0,0.2,1)] group-hover:scale-105 group-hover:bg-teal group-hover:text-white group-hover:ring-transparent">
                <Icon className="size-6" />
              </span>
              <h3 className="font-display text-lg font-bold text-navy">{b.title}</h3>
              <p className="mt-2.5 leading-relaxed text-steel">{b.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex justify-center">
        <a
          href="#zgloszenie"
          className="group inline-flex items-center gap-2 rounded-xl bg-navy px-7 py-4 font-semibold text-white shadow-[0_10px_30px_-12px_rgba(15,23,42,0.5)] transition-colors hover:bg-teal"
        >
          {ctaLabel}
          <svg viewBox="0 0 24 24" className="size-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}
