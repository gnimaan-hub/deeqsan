import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";
import BookCard from "@/components/BookCard";
import { books, getCategories } from "@/lib/books";

export const metadata: Metadata = {
  title: "Librairie — Les Éditions Deeqsan",
  description:
    "Parcourez le catalogue de la librairie Deeqsan : romans, essais, albums jeunesse, bandes dessinées et beaux livres, avec leurs prix — et venez les découvrir en magasin à Djibouti-Ville.",
};

const categories = getCategories();

export default function LibrairiePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-grain bg-canopy-motif pb-16 pt-16 lg:pt-24">
        <div aria-hidden className="bg-aura absolute inset-0 -z-10">
          <span className="absolute -left-28 -top-32 h-96 w-96 bg-jade/20" />
          <span className="absolute -right-20 top-10 h-72 w-72 bg-coral/15" />
        </div>
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <Reveal>
            <Eyebrow tone="jade" className="mx-auto">La librairie</Eyebrow>
            <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl text-balance">
              Choisissez vos prochaines lectures, et venez les{" "}
              <span className="text-shimmer">emporter chez vous</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Romans, essais, albums jeunesse, bandes dessinées, beaux livres et
              recueils : voici un aperçu de ce qui vous attend dans nos rayons,
              prix affichés en francs djiboutiens. Tous les ouvrages présentés ici
              sont disponibles à l&rsquo;achat en magasin, à Djibouti-Ville —
              notre équipe se fera une joie de vous conseiller sur place.
            </p>
            <p className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-surface/55 px-4 py-1.5 text-xs font-medium text-ink-soft">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-live-pulse rounded-full" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-jade" />
              </span>
              {books.length} ouvrages référencés &middot; {categories.length} rayons à explorer
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <Reveal className="flex flex-wrap items-center justify-center gap-2.5">
          {categories.map((cat) => (
            <a
              key={cat}
              href={`#${slugify(cat)}`}
              className="group relative overflow-hidden rounded-full border border-sand bg-surface/70 px-4 py-2 text-sm font-medium text-ink-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-jade/40 hover:text-jade-bright hover:shadow-[0_12px_30px_-16px_rgba(15,61,45,0.5)]"
            >
              <span
                aria-hidden
                className="absolute inset-0 -z-10 origin-left scale-x-0 bg-jade-pale/70 transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
              {cat}
            </a>
          ))}
        </Reveal>

        <div className="mt-16 space-y-20">
          {categories.map((category) => {
            const items = books.filter((b) => b.category === category);
            return (
              <div key={category} id={slugify(category)} className="scroll-mt-28">
                <Reveal className="flex items-baseline justify-between gap-4 border-b border-sand pb-4">
                  <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                    {category}
                  </h2>
                  <span className="text-sm text-ink-soft">
                    {items.length} {items.length > 1 ? "ouvrages" : "ouvrage"}
                  </span>
                </Reveal>
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {items.map((book, i) => (
                    <Reveal key={book.slug} delay={(i % 4) * 80}>
                      <BookCard book={book} />
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <Reveal className="relative mt-20 overflow-hidden rounded-[2rem] border border-sand bg-lagoon bg-canopy-motif px-8 py-12 text-center text-ink sm:px-16">
          <span aria-hidden className="animate-glow-pulse pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-jade/20 blur-3xl" />
          <span aria-hidden className="animate-glow-pulse pointer-events-none absolute -right-12 -bottom-12 h-56 w-56 rounded-full bg-mango/15 blur-3xl" style={{ animationDelay: "2.4s" }} />
          <Eyebrow tone="mango" className="relative mx-auto">Une librairie à visage humain</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-xl font-display text-2xl font-semibold sm:text-3xl text-balance">
            Les prix changent, les conseils restent gratuits — venez nous rendre visite
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-ink/75">
            Ce catalogue évolue régulièrement avec nos arrivages. Pour connaître
            la disponibilité d&rsquo;un titre ou recevoir une recommandation
            personnalisée, le plus simple reste de passer nous voir ou de nous écrire.
          </p>
          <Link
            href="/contact"
            className="shine-sweep relative mt-6 inline-flex items-center gap-2 rounded-full bg-jade px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-jade-deep"
          >
            Nous trouver
            <span aria-hidden>&rarr;</span>
          </Link>
        </Reveal>
      </section>
    </>
  );
}

const DIACRITICS = new RegExp("[\\u0300-\\u036f]", "g");

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(DIACRITICS, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
