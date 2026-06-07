"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { books as allBooks, getCategories, type Book } from "@/lib/books";
import BookCard from "@/components/BookCard";
import Eyebrow from "@/components/Eyebrow";

type SortKey =
  | "default"
  | "price-asc"
  | "price-desc"
  | "year-desc"
  | "year-asc"
  | "title-asc";

const ALL = "Tous";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "default", label: "Ordre du catalogue" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "year-desc", label: "Plus récent d'abord" },
  { value: "year-asc", label: "Plus ancien d'abord" },
  { value: "title-asc", label: "Titre A → Z" },
];

const categories = [ALL, ...getCategories()];

const categoryCounts: Record<string, number> = { [ALL]: allBooks.length };
for (const book of allBooks) {
  categoryCounts[book.category] = (categoryCounts[book.category] ?? 0) + 1;
}

const availableYears = Array.from(
  new Set(allBooks.map((b) => b.year).filter((y): y is number => y !== undefined))
).sort((a, b) => b - a);

function applyFilters(
  books: Book[],
  category: string,
  search: string,
  year: string,
  sort: SortKey
): Book[] {
  let result = [...books];

  if (category !== ALL) {
    result = result.filter((b) => b.category === category);
  }

  const q = search.trim().toLowerCase();
  if (q) {
    result = result.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        (b.subtitle ?? "").toLowerCase().includes(q)
    );
  }

  if (year) {
    result = result.filter((b) => b.year === Number(year));
  }

  switch (sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "year-desc":
      result.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
      break;
    case "year-asc":
      result.sort((a, b) => (a.year ?? 0) - (b.year ?? 0));
      break;
    case "title-asc":
      result.sort((a, b) => a.title.localeCompare(b.title, "fr"));
      break;
  }

  return result;
}

interface ResultsGridProps {
  filtered: Book[];
  category: string;
  hasFilters: boolean;
  onReset: () => void;
}

function ResultsGrid({ filtered, category, hasFilters, onReset }: ResultsGridProps) {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-ink-soft">
          <span className="font-semibold text-ink">{filtered.length}</span>{" "}
          {filtered.length > 1 ? "ouvrages" : "ouvrage"}
          {category !== ALL && (
            <>
              {" "}&middot; rayon{" "}
              <span className="font-medium text-jade-bright">{category}</span>
            </>
          )}
        </p>
        {hasFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-ink-soft/70 transition-colors hover:text-coral"
          >
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Tout afficher
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-lg text-ink-soft">Aucun ouvrage ne correspond.</p>
          <button
            onClick={onReset}
            className="mt-4 text-sm font-semibold text-jade-bright transition-colors hover:text-jade"
          >
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((book) => (
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
      )}
    </>
  );
}

export default function LibrairieClient() {
  const [category, setCategory] = useState<string>(ALL);
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const [sort, setSort] = useState<SortKey>("default");

  const filtered = useMemo(
    () => applyFilters(allBooks, category, search, year, sort),
    [category, search, year, sort]
  );

  const hasFilters =
    category !== ALL || search.trim() !== "" || year !== "" || sort !== "default";

  const reset = () => {
    setCategory(ALL);
    setSearch("");
    setYear("");
    setSort("default");
  };

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
      {/* Mobile filters */}
      <div className="space-y-3 pt-6 lg:hidden">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Titre ou auteur…"
              className="w-full rounded-xl border border-sand bg-surface/70 py-2.5 pl-9 pr-4 text-sm text-ink placeholder:text-ink-soft/50 focus:outline-none focus:border-jade/50 focus:ring-2 focus:ring-jade/10"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-xl border border-sand bg-surface/70 py-2.5 pl-3 pr-7 text-sm text-ink focus:border-jade/50 focus:outline-none"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                category === cat
                  ? "bg-jade text-white shadow-[0_4px_12px_-4px_rgba(39,184,146,0.55)]"
                  : "border border-sand bg-surface/70 text-ink-soft hover:border-jade/40 hover:text-jade-bright"
              }`}
            >
              {cat}
              <span className={`ml-1 text-[10px] ${category === cat ? "text-white/70" : "text-ink-soft/50"}`}>
                {categoryCounts[cat]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden gap-10 pt-10 lg:flex xl:gap-14">
        {/* Sidebar */}
        <aside className="w-52 shrink-0 xl:w-60">
          <div className="sticky top-24 space-y-7">
            {/* Search */}
            <div>
              <p className="mb-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                Rechercher
              </p>
              <div className="relative">
                <svg
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Titre ou auteur…"
                  className="w-full rounded-xl border border-sand bg-surface/70 py-2.5 pl-9 pr-4 text-sm text-ink placeholder:text-ink-soft/50 focus:border-jade/50 focus:outline-none focus:ring-2 focus:ring-jade/10"
                />
              </div>
            </div>

            {/* Year filter */}
            <div>
              <p className="mb-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                Parution
              </p>
              <div className="relative">
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-sand bg-surface/70 py-2.5 pl-3.5 pr-8 text-sm text-ink focus:border-jade/50 focus:outline-none focus:ring-2 focus:ring-jade/10"
                >
                  <option value="">Toutes les années</option>
                  {availableYears.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Sort */}
            <div>
              <p className="mb-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                Trier par
              </p>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="w-full appearance-none rounded-xl border border-sand bg-surface/70 py-2.5 pl-3.5 pr-8 text-sm text-ink focus:border-jade/50 focus:outline-none focus:ring-2 focus:ring-jade/10"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-sand" />

            {/* Categories */}
            <div>
              <p className="mb-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                Rayon
              </p>
              <nav className="max-h-64 space-y-0.5 overflow-y-auto pr-1 [scrollbar-width:thin] [scrollbar-color:var(--sand)_transparent]">
                {categories.map((cat) => {
                  const isActive = category === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`group flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-all duration-150 ${
                        isActive
                          ? "bg-jade-pale/50 font-semibold text-jade-bright"
                          : "text-ink-soft hover:bg-surface hover:text-ink"
                      }`}
                    >
                      <span>{cat}</span>
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium transition-colors ${
                          isActive
                            ? "bg-jade/20 text-jade-deep"
                            : "bg-sand/50 text-ink-soft/60 group-hover:bg-sand"
                        }`}
                      >
                        {categoryCounts[cat]}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {hasFilters && (
                <button
                  onClick={reset}
                  className="mt-5 flex items-center gap-1.5 text-xs text-ink-soft/70 transition-colors hover:text-coral"
                >
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Réinitialiser les filtres
                </button>
              )}
            </div>
          </div>
        </aside>

        {/* Main grid */}
        <main className="min-w-0 flex-1">
          <ResultsGrid
            filtered={filtered}
            category={category}
            hasFilters={hasFilters}
            onReset={reset}
          />
        </main>
      </div>

      {/* Mobile main grid */}
      <div className="mt-6 lg:hidden">
        <ResultsGrid
          filtered={filtered}
          category={category}
          hasFilters={hasFilters}
          onReset={reset}
        />
      </div>

      {/* Bottom CTA */}
      <div className="relative mt-20 overflow-hidden rounded-[2rem] border border-sand bg-lagoon bg-canopy-motif px-8 py-12 text-center text-ink sm:px-16">
        <span
          aria-hidden
          className="animate-glow-pulse pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-jade/20 blur-3xl"
        />
        <span
          aria-hidden
          className="animate-glow-pulse pointer-events-none absolute -bottom-12 -right-12 h-56 w-56 rounded-full bg-mango/15 blur-3xl"
          style={{ animationDelay: "2.4s" }}
        />
        <Eyebrow tone="mango" className="relative mx-auto">
          Une librairie à visage humain
        </Eyebrow>
        <h2 className="mx-auto mt-4 max-w-xl font-display text-2xl font-semibold text-balance sm:text-3xl">
          Les prix changent, les conseils restent gratuits — venez nous rendre visite
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-ink/75">
          Ce catalogue évolue régulièrement avec nos arrivages. Pour connaître la
          disponibilité d&rsquo;un titre ou recevoir une recommandation personnalisée,
          le plus simple reste de passer nous voir ou de nous écrire.
        </p>
        <Link
          href="/contact"
          className="shine-sweep relative mt-6 inline-flex items-center gap-2 rounded-full bg-jade px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-jade-deep"
        >
          Nous trouver
          <span aria-hidden>&rarr;</span>
        </Link>
      </div>
    </section>
  );
}
