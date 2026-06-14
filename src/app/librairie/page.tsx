import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";
import LibrairieClient from "@/components/LibrairieClient";
import T from "@/components/T";
import { books, getCategories } from "@/lib/books";

export const metadata: Metadata = {
  title: "Librairie — Les Éditions Deeqsan",
  description:
    "Parcourez le catalogue de la librairie Deeqsan : romans, essais, albums jeunesse, bandes dessinées et beaux livres, avec leurs prix — et venez les découvrir en magasin à Djibouti.",
  openGraph: {
    title: "Librairie — Les Éditions Deeqsan",
    description: "Romans, essais, albums jeunesse et beaux livres disponibles à Djibouti.",
    url: "https://www.deeqsan.net/librairie",
  },
  twitter: {
    title: "Librairie — Les Éditions Deeqsan",
    description: "Romans, essais, albums jeunesse et beaux livres disponibles à Djibouti.",
  },
};

const categories = getCategories();

export default function LibrairiePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-grain bg-canopy-motif pb-12 pt-16 lg:pt-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <span className="animate-glow-pulse absolute -left-16 -top-16 h-72 w-72 rounded-full bg-jade/20 blur-3xl" />
          <span
            className="animate-glow-pulse absolute -right-16 top-10 h-64 w-64 rounded-full bg-coral/15 blur-3xl"
            style={{ animationDelay: "1.8s" }}
          />
        </div>
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <Reveal aboveFold>
            <Eyebrow tone="jade" className="mx-auto">
              <T fr="La librairie" en="The bookstore" />
            </Eyebrow>
            <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-ink text-balance sm:text-5xl">
              <T
                fr={<>Choisissez vos prochaines lectures, et venez les{" "}<span className="text-shimmer">emporter chez vous</span></>}
                en={<>Choose your next reads, and come{" "}<span className="text-shimmer">take them home</span></>}
              />
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              <T
                fr="Romans, essais, albums jeunesse, bandes dessinées, beaux livres et recueils : voici un aperçu de ce qui vous attend dans nos rayons, prix affichés en francs djiboutiens. Tous les ouvrages présentés ici sont disponibles à l'achat en magasin, à Djibouti — notre équipe se fera une joie de vous conseiller sur place."
                en="Novels, essays, children's picture books, comics, coffee table books and collections: here is a glimpse of what awaits you on our shelves, with prices in Djiboutian francs. All books shown here are available for purchase in-store, in Djibouti — our team will be delighted to advise you."
              />
            </p>
            <p className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-surface/55 px-4 py-1.5 text-xs font-medium text-ink-soft">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-live-pulse rounded-full" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-jade" />
              </span>
              {books.length} <T fr="ouvrages référencés" en="books listed" /> &middot; {categories.length} <T fr="rayons à explorer" en="shelves to explore" />
            </p>
          </Reveal>
        </div>
      </section>

      <LibrairieClient />
    </>
  );
}
