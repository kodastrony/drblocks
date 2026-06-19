import type { Metadata, Viewport } from "next";
import { Wix_Madefor_Display, Wix_Madefor_Text, Oswald } from "next/font/google";
import "./globals.css";

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
    default: "Regulowane bloczki fundamentowe | DrBlocks",
    template: "%s",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1e293b",
  width: "device-width",
  initialScale: 1,
  // pozwala treści sięgać krawędzi ekranu i AKTYWUJE env(safe-area-inset-*)
  // na telefonach z notchem / paskiem gestów (inaczej insety = 0).
  viewportFit: "cover",
};

// Root shell. The per-locale layout (app/[locale]/layout.tsx) supplies the
// providers, chrome and the correct <html lang> (synced client-side). This
// root exists so the global not-found has a root layout.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${display.variable} ${body.variable} ${oswald.variable}`}>
      <body className="bg-paper pb-[calc(68px_+_env(safe-area-inset-bottom))] text-navy antialiased lg:pb-0">
        {children}
      </body>
    </html>
  );
}
