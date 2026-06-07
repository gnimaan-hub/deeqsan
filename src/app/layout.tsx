import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Caveat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ForestAmbience from "@/components/ForestAmbience";
import { LanguageProvider } from "@/contexts/LanguageContext";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
  weight: "variable",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0e2018",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.deeqsan.net"),
  title: {
    default: "Les Éditions Deeqsan — Librairie & Maison d'édition à Djibouti",
    template: "%s | Les Éditions Deeqsan",
  },
  description:
    "Les Éditions Deeqsan : librairie et première maison d'édition à compte d'éditeur de Djibouti. Découvrez notre catalogue, nos ouvrages publiés et notre démarche éditoriale.",
  keywords: ["librairie", "maison d'édition", "Djibouti", "livres", "Somali", "Afar", "Corne de l'Afrique"],
  authors: [{ name: "Les Éditions Deeqsan" }],
  creator: "Les Éditions Deeqsan",
  publisher: "Les Éditions Deeqsan",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.deeqsan.net",
    siteName: "Les Éditions Deeqsan",
    title: "Les Éditions Deeqsan — Librairie & Maison d'édition à Djibouti",
    description:
      "Librairie et première maison d'édition à compte d'éditeur de Djibouti. Ouvrages multilingues : somali, afar, arabe, français.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Les Éditions Deeqsan — Librairie & Maison d'édition à Djibouti",
    description:
      "Librairie et première maison d'édition à compte d'éditeur de Djibouti. Ouvrages multilingues : somali, afar, arabe, français.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable} ${caveat.variable} h-full`} suppressHydrationWarning>
      {/* suppressHydrationWarning prevents noise from browser extensions (e.g. Kaspersky) that inject scripts into <head> */}
      <head suppressHydrationWarning>
        {/* Inline script to apply saved theme before paint — prevents flash */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('deeqsan-theme');if(t==='light')document.documentElement.setAttribute('data-theme','light');}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink antialiased">
        <LanguageProvider>
          <ForestAmbience />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
