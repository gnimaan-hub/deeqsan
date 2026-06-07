import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import Eyebrow from "@/components/Eyebrow";
import BookCover from "@/components/BookCover";
import BookCard from "@/components/BookCard";
import { books, getBookBySlug, formatPrice } from "@/lib/books";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) return {};
  return {
    title: `${book.title} — Librairie Deeqsan`,
    description: book.summary,
  };
}

export default async function BookPage({ params }: Props) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) notFound();

  const related = books
    .filter((b) => b.slug !== book.slug && b.category === book.category)
    .slice(0, 3);

  return (
    <article>
      <section className="relative overflow-hidden bg-grain bg-canopy-motif pb-16 pt-12 lg:pt-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <span className="animate-glow-pulse absolute -left-16 -top-16 h-72 w-72 rounded-full blur-3xl" style={{ background: book.coverPalette[0] + "40" }} />
          <span className="animate-glow-pulse absolute -right-12 bottom-0 h-64 w-64 rounded-full blur-3xl" style={{ background: book.coverPalette[1] + "35", animationDelay: "1.8s" }} />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <nav className="flex items-center gap-2 text-sm text-ink-soft">
              <Link href="/librairie" className="link-underline transition-colors hover:text-jade-bright">
                Librairie
              </Link>
              <span aria-hidden>/</span>
              <span className="text-ink">{book.category}</span>
            </nav>
          </Reveal>

          <div className="mt-10 grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <Reveal className="group/hero relative flex justify-center lg:justify-start">
              <span
                aria-hidden
                className="animate-glow-pulse absolute -inset-6 -z-10 rounded-[2.5rem] blur-2xl"
                style={{ background: `linear-gradient(135deg, ${book.coverPalette[0]}40, ${book.coverPalette[1]}30)` }}
              />
              <div className="transition-transform duration-700 ease-out group-hover/hero:-translate-y-2">
                <BookCover title={book.title} author={book.author} cover={book.cover} palette={book.coverPalette} size="lg" priority />
              </div>
            </Reveal>

            <Reveal delay={100}>
              {book.isHouseEdition && (
                <Eyebrow tone="lagoon" className="mb-4">
                  Édité par Les Éditions Deeqsan
                </Eyebrow>
              )}
              {book.isPlaceholder && (
                <Eyebrow tone="coral" className="mb-4">
                  Exemple de fiche — catalogue à compléter avec le client
                </Eyebrow>
              )}
              <div className="flex items-start gap-4">
                <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl text-balance">
                  {book.title}
                </h1>
                {book.isHouseEdition && (
                  <span className="stamp mt-1 hidden h-14 w-14 shrink-0 rotate-[6deg] text-coral/45 sm:flex">
                    <span className="font-display text-[0.55rem] font-semibold uppercase leading-none tracking-[0.08em] text-coral/70">
                      Édition<br />Deeqsan
                    </span>
                  </span>
                )}
              </div>
              {book.subtitle && (
                <p className="mt-2 font-display text-lg italic text-ink-soft">{book.subtitle}</p>
              )}
              <p className="mt-3 text-base text-ink-soft">
                par <span className="font-medium text-ink">{book.author}</span>
              </p>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">{book.summary}</p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <span className="shine-sweep rounded-full bg-jade px-6 py-3 text-lg font-semibold text-white shadow-[0_14px_30px_-12px_rgba(39,184,146,0.6)]">
                  {formatPrice(book.price, book.currency)}
                </span>
                <Link
                  href="/contact"
                  className="shine-sweep inline-flex items-center gap-2 rounded-full border border-ink/15 bg-surface/70 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-surface"
                >
                  Réserver mon exemplaire en magasin
                  <span aria-hidden>&rarr;</span>
                </Link>
              </div>

              <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-sand pt-6 sm:grid-cols-3">
                <div>
                  <dt className="text-xs uppercase tracking-[0.16em] text-ink-soft">Catégorie</dt>
                  <dd className="mt-1 text-sm font-medium text-ink">{book.category}</dd>
                </div>
                {book.pages && (
                  <div>
                    <dt className="text-xs uppercase tracking-[0.16em] text-ink-soft">Pages</dt>
                    <dd className="mt-1 text-sm font-medium text-ink">{book.pages}</dd>
                  </div>
                )}
                {book.year && (
                  <div>
                    <dt className="text-xs uppercase tracking-[0.16em] text-ink-soft">Parution</dt>
                    <dd className="mt-1 text-sm font-medium text-ink">{book.year}</dd>
                  </div>
                )}
                <div className="col-span-2 sm:col-span-3">
                  <dt className="text-xs uppercase tracking-[0.16em] text-ink-soft">Langues disponibles</dt>
                  <dd className="mt-1.5 flex flex-wrap gap-2">
                    {book.languages.map((lang) => (
                      <span
                        key={lang}
                        className="rounded-full bg-jade-pale px-3 py-1 text-xs font-medium text-jade-deep"
                      >
                        {lang}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16 lg:px-10">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold text-ink">Résumé &amp; extrait</h2>
          <div className="prose-deeqsan mt-6 space-y-5 text-base leading-relaxed text-ink-soft">
            {book.description.map((paragraph, i) => (
              <p key={i} className={i === 0 ? "text-lg text-ink" : ""}>
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100} className="border-organic group relative mt-12 overflow-hidden border-jade/35 bg-jade-pale/40 px-6 py-5 text-sm text-ink-soft transition-colors hover:border-jade/60 hover:bg-jade-pale/60">
          Cet
          ouvrage vous attend dans nos rayons à Djibouti. Passez nous voir pour le
          feuilleter, demander conseil ou réserver votre exemplaire.
        </Reveal>
      </section>

      {related.length > 0 && (
        <section className="bg-paper-deep bg-dot-grid py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-ink">
                Dans la même catégorie
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((b, i) => (
                <Reveal key={b.slug} delay={i * 90}>
                  <BookCard book={b} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
