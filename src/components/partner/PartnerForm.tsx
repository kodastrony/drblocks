"use client";

import { useState } from "react";
import Link from "next/link";
import { company } from "@/lib/company";
import { useHref } from "@/i18n/LocaleProvider";
import type { SiteContent } from "@/i18n/types";

type FormStrings = SiteContent["partner"]["form"];

export function PartnerForm({ t }: { t: FormStrings }) {
  const href = useHref();
  const [type, setType] = useState<"producent" | "wykonawca">("producent");
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const data = new FormData(f);
    // honeypot
    if ((data.get("website") as string)?.length) return;
    const companyName = ((data.get("company") as string) || "").trim();
    const email = ((data.get("email") as string) || "").trim();
    const location = ((data.get("location") as string) || "").trim();
    const message = ((data.get("message") as string) || "").trim();
    const consent = data.get("consent");

    const next: Record<string, boolean> = {};
    if (!companyName) next.company = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = true;
    if (!location) next.location = true;
    if (!consent) next.consent = true;
    setErrors(next);
    if (Object.keys(next).length) {
      const firstKey = ["company", "email", "location", "consent"].find((k) => next[k]);
      if (firstKey) f.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    const typeLabel = type === "producent" ? t.typeProducer : t.typeContractor;
    const subject = t.subjectPrefix.replace("{company}", companyName);
    const body = [
      `${t.companyLabel}: ${companyName}`,
      `${t.emailLabel}: ${email}`,
      `${t.locationLabel}: ${location}`,
      `${t.typeLabel}: ${typeLabel}`,
      message ? `\n${t.messageLabel}:\n${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${company.emailPartner}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field =
    "w-full rounded-xl border border-line bg-white px-4 py-3 text-navy shadow-sm outline-none transition-colors placeholder:text-mute focus:border-teal focus:ring-2 focus:ring-teal/20";
  const errField = "border-red-400 focus:border-red-400 focus:ring-red-100";

  if (sent) {
    return (
      <div className="rounded-2xl border border-teal/30 bg-teal-50 p-8 text-center">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-teal-700 text-white">
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display text-xl font-bold text-navy">{t.successHeading}</h3>
        <p className="mx-auto mt-2 max-w-md text-steel">{t.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-navy">{t.companyLabel} *</span>
          <input
            name="company"
            type="text"
            autoComplete="organization"
            aria-invalid={errors.company || undefined}
            placeholder={t.companyPlaceholder}
            className={`${field} ${errors.company ? errField : ""}`}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-navy">{t.emailLabel} *</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={errors.email || undefined}
            placeholder={t.emailPlaceholder}
            className={`${field} ${errors.email ? errField : ""}`}
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-navy">{t.locationLabel} *</span>
        <input
          name="location"
          type="text"
          autoComplete="address-level2"
          aria-invalid={errors.location || undefined}
          placeholder={t.locationPlaceholder}
          className={`${field} ${errors.location ? errField : ""}`}
        />
      </label>

      <fieldset>
        <legend className="mb-1.5 block text-sm font-semibold text-navy">{t.typeLabel}</legend>
        <div className="grid grid-cols-2 gap-2">
          {(["producent", "wykonawca"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setType(v)}
              aria-pressed={type === v}
              className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                type === v
                  ? "border-teal bg-teal-50 text-teal-800"
                  : "border-line bg-white text-slate hover:border-navy/30"
              }`}
            >
              {v === "producent" ? t.typeProducer : t.typeContractor}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-navy">{t.messageLabel}</span>
        <textarea
          name="message"
          rows={3}
          placeholder={t.messagePlaceholder}
          className={field}
        />
      </label>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <label className="flex items-start gap-2.5 text-sm text-steel">
        <input name="consent" type="checkbox" className="mt-0.5 size-4 shrink-0 accent-teal" />
        <span className={errors.consent ? "text-red-600" : ""}>
          {t.consent}{" "}
          <Link href={href("/polityka-prywatnosci")} className="text-teal-800 underline hover:text-teal">
            {t.consentPolicy}
          </Link>
          . *
        </span>
      </label>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-xl bg-navy px-7 py-4 font-semibold text-white shadow-[0_10px_30px_-12px_rgba(15,23,42,0.5)] transition-colors hover:bg-teal-700"
      >
        {t.submit}
      </button>
    </form>
  );
}
