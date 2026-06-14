import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { company } from "@/lib/content";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description: "Polityka prywatności serwisu drblocks.pl – zasady przetwarzania danych osobowych i wykorzystania plików cookies.",
  alternates: { canonical: "/polityka-prywatnosci" },
  robots: { index: false, follow: true },
};

export default function PolitykaPage() {
  return (
    <>
      <PageHeader
        title="Polityka prywatności"
        crumbs={[{ label: "Strona główna", href: "/" }, { label: "Polityka prywatności" }]}
      />
      <section className="bg-white py-16 lg:py-20">
        <Container className="max-w-3xl">
          <div className="prose prose-slate max-w-none prose-headings:font-display prose-headings:text-navy prose-a:text-teal-700 prose-strong:text-navy">
            <h2>§1. Administrator danych</h2>
            <p>
              Administratorem danych osobowych jest <strong>{company.legal}</strong>,{" "}
              {company.address}, NIP {company.nip}, REGON {company.regon} (dalej „Administrator”).
              W sprawach dotyczących ochrony danych osobowych można kontaktować się pod adresem{" "}
              <a href={`mailto:${company.emailContact}`}>{company.emailContact}</a>.
            </p>

            <h2>§2. Zakres i cel przetwarzania danych</h2>
            <p>
              Dane osobowe (imię i nazwisko, adres e-mail, numer telefonu oraz treść wiadomości)
              przetwarzamy w celu:
            </p>
            <ul>
              <li>obsługi zapytań przesłanych przez formularz kontaktowy lub pocztą elektroniczną,</li>
              <li>przygotowania i przedstawienia oferty oraz wyceny,</li>
              <li>realizacji ewentualnej umowy oraz kontaktu w jej ramach.</li>
            </ul>

            <h2>§3. Podstawa prawna</h2>
            <p>
              Dane przetwarzamy na podstawie art. 6 ust. 1 lit. a RODO (zgoda), art. 6 ust. 1 lit. b
              RODO (podjęcie działań przed zawarciem umowy i jej realizacja) oraz art. 6 ust. 1 lit.
              f RODO (prawnie uzasadniony interes Administratora polegający na obsłudze zapytań).
            </p>

            <h2>§4. Okres przechowywania danych</h2>
            <p>
              Dane przechowujemy przez okres niezbędny do obsługi zapytania i realizacji umowy, a
              następnie przez okres wynikający z przepisów prawa (m.in. podatkowych), nie dłużej niż
              10 lat, lub do momentu cofnięcia zgody.
            </p>

            <h2>§5. Prawa osoby, której dane dotyczą</h2>
            <p>
              Przysługuje Ci prawo dostępu do danych, ich sprostowania, usunięcia lub ograniczenia
              przetwarzania, prawo do przenoszenia danych, wniesienia sprzeciwu, a także prawo do
              cofnięcia zgody w dowolnym momencie oraz wniesienia skargi do Prezesa Urzędu Ochrony
              Danych Osobowych.
            </p>

            <h2>§6. Pliki cookies</h2>
            <p>
              Serwis wykorzystuje pliki cookies: sesyjne (usuwane po zamknięciu przeglądarki), stałe
              oraz analityczne (służące do anonimowej analizy ruchu). Możesz zarządzać plikami
              cookies w ustawieniach swojej przeglądarki, w tym je zablokować lub usunąć.
            </p>

            <h2>§7. Kontakt</h2>
            <p>
              We wszelkich sprawach dotyczących przetwarzania danych osobowych prosimy o kontakt:{" "}
              <a href={`mailto:${company.emailContact}`}>{company.emailContact}</a>, tel.{" "}
              {company.phone}.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
