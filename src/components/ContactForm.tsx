"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { company } from "@/lib/content";
import { Check, ArrowRight, Phone } from "@/components/Icons";

const inputCls =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-navy outline-none transition-colors placeholder:text-mute focus:border-teal focus:ring-2 focus:ring-teal/30 aria-[invalid=true]:border-red-400 aria-[invalid=true]:ring-red-200";

type Errors = { name?: string; email?: string; message?: string; consent?: string };
type Status = "idle" | "submitting" | "sent" | "error";

export function ContactForm({ defaultMessage = "" }: { defaultMessage?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [prefill, setPrefill] = useState(defaultMessage);

  // Prefill from calculator/product links (?wymiary&bloczki&produkt) on the
  // client — works on a static site with no server.
  useEffect(() => {
    if (defaultMessage) return;
    const sp = new URLSearchParams(window.location.search);
    const wymiary = sp.get("wymiary") || "";
    const bloczki = sp.get("bloczki") || "";
    const produkt = sp.get("produkt") || "";
    const zastosowanie = sp.get("zastosowanie") || "";
    const parts: string[] = [];
    if (produkt) parts.push(`Interesuje mnie produkt: ${produkt}.`);
    if (wymiary || bloczki || zastosowanie)
      parts.push(
        `Proszę o wycenę fundamentu${zastosowanie ? ` (${zastosowanie})` : ""}${
          wymiary ? ` o wymiarach ${wymiary}` : ""
        }${bloczki ? ` (orientacyjnie ${bloczki} bloczków wg kalkulatora)` : ""}.`,
      );
    if (parts.length) setPrefill(`Dzień dobry, ${parts.join(" ")} Proszę o kontakt.`);
  }, [defaultMessage]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) || "").trim();
    const name = get("name");
    const email = get("email");
    const phone = get("phone");
    const message = get("message");
    const consent = data.get("consent");
    const honey = get("company_website");

    const errs: Errors = {};
    if (!name) errs.name = "Podaj imię i nazwisko.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Podaj poprawny adres e-mail.";
    if (!message) errs.message = "Napisz, w czym możemy pomóc.";
    if (!consent) errs.consent = "Zaznacz zgodę na kontakt.";
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      const first = Object.keys(errs)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (honey) {
      setStatus("sent"); // silently drop bots
      return;
    }

    setStatus("submitting");
    // Static site (no backend): open the visitor's mail client with a
    // prefilled message to our sales address.
    try {
      const subject = `Zapytanie ze strony DrBlocks – ${name}`;
      const body = [
        `Imię i nazwisko: ${name}`,
        `E-mail: ${email}`,
        phone ? `Telefon: ${phone}` : null,
        "",
        message,
      ]
        .filter((l) => l !== null)
        .join("\n");
      window.location.href = `mailto:${company.emailSales}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-teal/30 bg-teal-50 p-8 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-teal text-white">
          <Check className="size-7" />
        </div>
        <h3 className="mt-5 text-xl">Dziękujemy za zapytanie!</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-steel">
          Otrzymaliśmy Twoją wiadomość i odezwiemy się zwykle w ciągu 24 godzin w dni robocze. W
          pilnej sprawie zadzwoń:{" "}
          <a href={company.phoneHref} className="font-semibold text-teal-800">
            {company.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-line bg-white p-6 sm:p-8">
      <div className="grid gap-5">
        <Field id="name" label="Imię i nazwisko" required error={errors.name}>
          <input id="name" name="name" autoComplete="name" className={inputCls} placeholder="Jan Kowalski" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-err" : undefined} />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="email" label="E-mail" required error={errors.email}>
            <input id="email" name="email" type="email" autoComplete="email" className={inputCls} placeholder="jan@firma.pl" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-err" : undefined} />
          </Field>
          <Field id="phone" label="Telefon">
            <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" className={inputCls} placeholder="+48 600 000 000" />
          </Field>
        </div>

        <Field id="message" label="Wiadomość" required error={errors.message}>
          <textarea key={prefill} id="message" name="message" rows={5} defaultValue={prefill} className={`${inputCls} resize-y`} placeholder="Opisz projekt: typ obiektu, wymiary, termin…" aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} />
        </Field>

        {/* honeypot – ukryte pole anty-spam */}
        <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label>
            Nie wypełniaj tego pola
            <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div>
          <label className="flex items-start gap-3 text-xs leading-relaxed text-steel">
            <input type="checkbox" name="consent" className="mt-0.5 size-4 accent-teal" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "consent-err" : undefined} />
            <span>
              Wyrażam zgodę na przetwarzanie moich danych osobowych przez {company.legal} w celu
              obsługi zapytania, zgodnie z{" "}
              <Link href="/polityka-prywatnosci" className="text-teal-800 underline">
                polityką prywatności
              </Link>
              . <span className="text-teal-800">*</span>
            </span>
          </label>
          {errors.consent && (
            <p id="consent-err" className="mt-1.5 text-xs text-red-600">
              {errors.consent}
            </p>
          )}
        </div>

        {status === "error" && (
          <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            Nie udało się wysłać wiadomości. Spróbuj ponownie lub skontaktuj się bezpośrednio:{" "}
            <a href={company.phoneHref} className="font-semibold underline">
              {company.phone}
            </a>
            ,{" "}
            <a href={`mailto:${company.emailSales}`} className="font-semibold underline">
              {company.emailSales}
            </a>
            .
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-6 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-teal disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? (
            "Wysyłanie…"
          ) : (
            <>
              Wyślij zapytanie
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>

        <p className="flex items-center gap-2 text-xs text-mute">
          <Phone className="size-3.5 text-teal-700" />
          Zwykle odpowiadamy w ciągu 24 godzin w dni robocze.
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate">
        {label} {required && <span className="text-teal-800">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
