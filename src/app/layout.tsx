import type { Metadata } from "next";
import { Fraunces, Inter, Caveat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ForestAmbience from "@/components/ForestAmbience";
import IntroAnimation from "@/components/IntroAnimation";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
  weight: "variable",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Les Éditions Deeqsan — Librairie & Maison d'édition à Djibouti",
  description:
    "Les Éditions Deeqsan : librairie et première maison d'édition à compte d'éditeur de Djibouti. Découvrez notre catalogue, nos ouvrages publiés et notre démarche éditoriale.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable} ${caveat.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-paper text-ink antialiased">
        <IntroAnimation />
        <ForestAmbience />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
