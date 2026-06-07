"use client";

import Link from "next/link";
import Logo from "./Logo";
import T from "./T";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { lang } = useLanguage();

  const sitemap = [
    { href: "/", fr: "Accueil", en: "Home" },
    { href: "/librairie", fr: "Librairie", en: "Library" },
    { href: "/maison-edition", fr: "Maison d'édition", en: "Publishing" },
    { href: "/evenements", fr: "Évènements", en: "Events" },
    { href: "/contact", fr: "Contact", en: "Contact" },
  ];

  const marqueeWords = lang === "en"
    ? ["Somali", "Afar", "Arabic", "French", "Truthfulness", "Benevolence", "Relevance", "Djibouti"]
    : ["Somali", "Afar", "Arabe", "Français", "Véracité", "Bienfaisance", "Pertinence", "Djibouti"];

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-sand bg-lagoon text-ink">
      <div aria-hidden className="animate-glow-pulse pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-jade/20 blur-3xl" />
      <div aria-hidden className="animate-glow-pulse pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-coral/10 blur-3xl" style={{ animationDelay: "2.5s" }} />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo variant="paper" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink/70">
              <T
                fr="Librairie et première maison d'édition à compte d'éditeur de Djibouti — sentinelle des voix de la Corne de l'Afrique et d'ailleurs."
                en="Bookstore and Djibouti's first independent publishing house — guardian of voices from the Horn of Africa and beyond."
              />
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-jade-pale">
              <T fr="Navigation" en="Navigation" />
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-ink/75">
              {sitemap.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-ink">
                    {lang === "en" ? item.en : item.fr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-jade-pale">
              <T fr="Nous trouver" en="Find us" />
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-ink/75">
              <li>Djibouti, Djibouti Ville</li>
              <li>
                <a href="tel:+253778111101" className="transition-colors hover:text-ink">+253 77 81 11 01</a>
              </li>
              <li>
                <a href="mailto:contact@deeqsan.net" className="transition-colors hover:text-ink">contact@deeqsan.net</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-jade-pale">
              <T fr="Venez nous rendre visite" en="Come visit us" />
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-ink/75">
              <T
                fr="Notre équipe vous accueille en librairie pour vous conseiller, feuilleter nos ouvrages et découvrir nos prochaines parutions."
                en="Our team welcomes you in-store to advise you, browse our books and discover our upcoming releases."
              />
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-jade px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-jade-deep"
            >
              <T fr="Nous contacter" en="Contact us" />
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </div>

        <div className="marquee mt-14 border-t border-ink/10 py-5">
          <div className="marquee__track gap-10 pr-10 text-xs uppercase tracking-[0.3em] text-ink/35">
            {Array.from({ length: 2 }).map((_, dup) => (
              <div key={dup} className="flex shrink-0 items-center gap-10 pr-10">
                {marqueeWords.map((word) => (
                  <span key={`${dup}-${word}`} className="flex items-center gap-3">
                    {word}
                    <span aria-hidden className="h-1 w-1 rounded-full bg-jade/50" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-ink/15 pt-8 text-xs text-ink/55 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Les Éditions Deeqsan.{" "}
            <T fr="Tous droits réservés." en="All rights reserved." />
          </p>
          <p>Djibouti — <T fr="Corne de l'Afrique" en="Horn of Africa" /></p>
        </div>
      </div>
    </footer>
  );
}
