import Link from "next/link";
import { company } from "@/lib/company";
import { localizedHref } from "@/i18n";
import type { Locale } from "@/i18n/config";
import type { SiteContent } from "@/i18n/types";
import { Phone } from "@/components/Icons";

export function MobileCta({ locale, content }: { locale: Locale; content: SiteContent }) {
  const { ui } = content;
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-line bg-white/95 p-2.5 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom))" }}
    >
      <a
        href={company.phoneHref}
        className="flex items-center justify-center gap-2 rounded-xl border border-line-strong py-3 text-sm font-semibold text-navy active:scale-[0.98]"
      >
        <Phone className="size-4 text-teal" />
        {ui.call}
      </a>
      <Link
        href={localizedHref(locale, "/kontakt")}
        className="flex items-center justify-center rounded-xl bg-navy py-3 text-sm font-semibold text-white active:scale-[0.98]"
      >
        {ui.freeQuote}
      </Link>
    </div>
  );
}
