import type { Metadata, Viewport } from "next";
import { Wix_Madefor_Display, Wix_Madefor_Text, Oswald } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCta } from "@/components/MobileCta";
import { SmoothScroll } from "@/components/SmoothScroll";
import { company } from "@/lib/content";

const display = Wix_Madefor_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-wix-display",
  display: "swap",
});
const body = Wix_Madefor_Text({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-wix-text",
  display: "swap",
});
const oswald = Oswald({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://drblocks.pl"),
  title: {
    default: "Regulowane bloczki fundamentowe – fundament w 1 dzień | DrBlocks",
    template: "%s | DrBlocks",
  },
  description:
    "Regulowane bloczki fundamentowe DrBlocks dla budownictwa modułowego: precyzja do 1 mm, nośność do 2 ton, montaż w jeden dzień, bez prac mokrych. Alternatywa dla betonu i pali śrubowych.",
  keywords: [
    "regulowane bloczki fundamentowe",
    "fundament pod dom modułowy",
    "fundament pod kontener",
    "fundament bez betonowania",
    "DrBlocks",
  ],
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://drblocks.pl",
    siteName: "DrBlocks",
    title: "Regulowane bloczki fundamentowe – fundament w 1 dzień | DrBlocks",
    description:
      "Precyzja do 1 mm, nośność do 2 ton, montaż w jeden dzień, bez prac mokrych. Regulowane bloczki fundamentowe dla budownictwa modułowego.",
    images: [
      {
        url: "/assets/hero-poster.jpg",
        width: 640,
        height: 480,
        alt: "Regulowane bloczki fundamentowe DrBlocks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Regulowane bloczki fundamentowe – fundament w 1 dzień | DrBlocks",
    description: "Precyzja do 1 mm, nośność do 2 ton, montaż w jeden dzień, bez prac mokrych.",
    images: ["/assets/hero-poster.jpg"],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1e293b",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DrBlocks",
  legalName: company.legal,
  url: "https://drblocks.pl",
  telephone: company.phone,
  email: company.emailContact,
  address: {
    "@type": "PostalAddress",
    streetAddress: "ul. Krakowska 69/9",
    postalCode: "43-300",
    addressLocality: "Bielsko-Biała",
    addressCountry: "PL",
  },
  taxID: company.nip,
  areaServed: "PL",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: company.phone,
    email: company.emailSales,
    contactType: "sales",
    areaServed: "PL",
    availableLanguage: "pl",
  },
  sameAs: [company.instagram],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${display.variable} ${body.variable} ${oswald.variable}`}>
      <body className="bg-paper pb-[68px] text-navy antialiased lg:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Przejdź do treści
        </a>
        <SmoothScroll />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCta />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
