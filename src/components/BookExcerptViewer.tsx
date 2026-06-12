"use client";

import { useState } from "react";
import T from "./T";

interface Props {
  pages: string[][];
}

/* Sens du feuilletage : 1 = on avance (la feuille se replie vers la
   reliure), -1 = on recule (la feuille précédente se déplie). */
type Turn = { from: number; dir: 1 | -1 };

function PageFace({ paragraphs, pageNumber }: { paragraphs: string[]; pageNumber: number }) {
  return (
    <>
      {/* Pli de reliure */}
      <div
        aria-hidden
        className="absolute bottom-0 left-10 top-0 w-px bg-gradient-to-b from-transparent via-sand/30 to-transparent"
      />
      <div className="px-12 py-10 sm:px-16">
        <div className="space-y-5 font-display text-base leading-[1.9] text-ink-soft">
          {paragraphs.map((paragraph, i) => (
            <p key={i} className={i === 0 ? "text-ink" : ""}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      {/* Fondu bas suggérant la suite du texte */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-8 left-0 right-0 h-8 bg-gradient-to-t from-paper to-transparent"
      />
      <div className="flex justify-center pb-4 pt-1">
        <span className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-ink-soft/40">
          — {pageNumber} —
        </span>
      </div>
    </>
  );
}

export default function BookExcerptViewer({ pages }: Props) {
  const [current, setCurrent] = useState(0);
  const [turn, setTurn] = useState<Turn | null>(null);
  const isFirst = current === 0;
  const isLast = current === pages.length - 1;

  const goTo = (next: number) => {
    if (turn || next === current || next < 0 || next >= pages.length) return;
    setTurn({ from: current, dir: next > current ? 1 : -1 });
    setCurrent(next);
  };

  /* Page posée au fond : en avançant c'est la nouvelle page qu'on découvre,
     en reculant c'est l'ancienne qui reste visible le temps du dépliage. */
  const baseIndex = turn && turn.dir === -1 ? turn.from : current;
  const sheetIndex = turn ? (turn.dir === 1 ? turn.from : current) : null;

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-semibold text-ink">
          <T fr="Lire un extrait" en="Read an excerpt" />
        </h2>
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-ink-soft">
          <T fr="Extrait" en="Excerpt" />
          {" · "}
          <T fr="p." en="p." /> {current + 1}/{pages.length}
        </span>
      </div>

      <div className="page-turn-stage relative mt-6">
        {/* Page de fond */}
        <div className="relative overflow-hidden rounded-2xl border border-sand/60 bg-paper shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_32px_-10px_rgba(15,61,45,0.18)]">
          <PageFace paragraphs={pages[baseIndex]} pageNumber={baseIndex + 1} />
        </div>

        {/* Feuille en train de tourner */}
        {turn && sheetIndex !== null && (
          <div
            aria-hidden
            onAnimationEnd={(e) => {
              if (e.target === e.currentTarget) setTurn(null);
            }}
            className={`page-turn-sheet absolute inset-0 overflow-hidden rounded-2xl border border-sand/60 bg-paper ${
              turn.dir === 1 ? "page-fold-out" : "page-fold-in"
            }`}
          >
            <PageFace paragraphs={pages[sheetIndex]} pageNumber={sheetIndex + 1} />
            <span className="page-turn-shade absolute inset-0 rounded-2xl" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => goTo(current - 1)}
          disabled={isFirst}
          className="flex items-center gap-2 rounded-full border border-sand px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-jade/40 hover:text-jade-bright disabled:pointer-events-none disabled:opacity-30"
        >
          <span aria-hidden>←</span>
          <T fr="Précédent" en="Previous" />
        </button>

        {/* Pastilles de pagination */}
        <div className="flex items-center gap-2">
          {pages.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Page ${i + 1}`}
              aria-current={i === current ? "page" : undefined}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "h-2 w-6 bg-jade"
                  : "h-2 w-2 bg-sand hover:bg-jade/50"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(current + 1)}
          disabled={isLast}
          className="flex items-center gap-2 rounded-full border border-sand px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-jade/40 hover:text-jade-bright disabled:pointer-events-none disabled:opacity-30"
        >
          <T fr="Suivant" en="Next" />
          <span aria-hidden>→</span>
        </button>
      </div>
    </section>
  );
}
