import Link from "next/link";
import Logo from "./Logo";

const sitemap = [
  { href: "/", label: "Accueil" },
  { href: "/librairie", label: "Librairie" },
  { href: "/maison-edition", label: "Maison d'édition" },
  { href: "/evenements", label: "Évènements" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-sand bg-lagoon text-ink">
      <div
        aria-hidden
        className="animate-glow-pulse pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-jade/20 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-glow-pulse pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-coral/10 blur-3xl"
        style={{ animationDelay: "2.5s" }}
      />
      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo variant="paper" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink/70">
              Librairie et première maison d&rsquo;édition à compte d&rsquo;éditeur de
              Djibouti — sentinelle des voix de la Corne de l&rsquo;Afrique et d&rsquo;ailleurs.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-jade-pale">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-ink/75">
              {sitemap.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-jade-pale">
              Nous trouver
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-ink/75">
              <li>Djibouti, Djibouti Ville</li>
              <li>
                <a href="tel:+253778111101" className="transition-colors hover:text-ink">
                  +253 77 81 11 01
                </a>
              </li>
              <li>
                <a href="mailto:contact@deeqsan.net" className="transition-colors hover:text-ink">
                  contact@deeqsan.net
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-jade-pale">
              Venez nous rendre visite
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-ink/75">
              Notre équipe vous accueille en librairie pour vous conseiller,
              feuilleter nos ouvrages et découvrir nos prochaines parutions.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-jade px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-jade-deep"
            >
              Nous contacter
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </div>

        <div className="marquee mt-14 border-t border-ink/10 py-5">
          <div className="marquee__track gap-10 pr-10 text-xs uppercase tracking-[0.3em] text-ink/35">
            {Array.from({ length: 2 }).map((_, dup) => (
              <div key={dup} className="flex shrink-0 items-center gap-10 pr-10">
                {["Somali", "Afar", "Arabe", "Français", "Véracité", "Bienfaisance", "Pertinence", "Djibouti-Ville"].map((word) => (
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
          <p>&copy; {new Date().getFullYear()} Les Éditions Deeqsan. Tous droits réservés.</p>
          <p>Djibouti — Corne de l&rsquo;Afrique</p>
        </div>
      </div>
    </footer>
  );
}
