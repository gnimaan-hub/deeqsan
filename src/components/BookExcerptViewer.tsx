"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import T from "./T";

interface Props {
  pages: string[][];
}

function PageContent({
  paragraphs,
  pageNumber,
}: {
  paragraphs: string[];
  pageNumber: number;
}) {
  if (paragraphs.length === 0) return <div className="h-full w-full bg-paper" />;
  return (
    <div className="relative flex h-full w-full flex-col bg-paper">
      {/* Pli de reliure */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-5 w-px bg-gradient-to-b from-transparent via-sand/30 to-transparent"
      />
      <div className="flex-1 overflow-hidden px-7 py-8 sm:px-10 sm:py-10">
        <div className="space-y-4 font-display text-[0.88rem] leading-[1.85] text-ink-soft sm:text-[0.93rem] sm:leading-[1.9]">
          {paragraphs.map((p, i) => (
            <p key={i} className={i === 0 ? "text-ink" : ""}>
              {p}
            </p>
          ))}
        </div>
      </div>
      {/* Fondu bas */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-8 left-0 right-0 h-10 bg-gradient-to-t from-paper to-transparent"
      />
      <div className="flex justify-center pb-3 pt-1">
        <span className="text-[0.6rem] font-medium uppercase tracking-[0.16em] text-ink-soft/40">
          — {pageNumber} —
        </span>
      </div>
    </div>
  );
}

export default function BookExcerptViewer({ pages }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const $ref = useRef<any>(null); // jQuery reference kept after async load
  const [currentPage, setCurrentPage] = useState(1); // turn.js is 1-indexed
  const [bookSize, setBookSize] = useState<{
    w: number;
    h: number;
    double: boolean;
  } | null>(null);

  /* ─── Mesure du conteneur ─────────────────────────────────────── */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.offsetWidth;
      const isDouble = w >= 600;
      // Chaque page prend la moitié en double, tout en simple
      const pageW = isDouble ? Math.floor(w / 2) : w;
      const pageH = Math.min(Math.round(pageW * 1.42), 540);
      setBookSize({ w: pageW * (isDouble ? 2 : 1), h: pageH, double: isDouble });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* ─── Initialisation / re-init de turn.js ────────────────────── */
  useEffect(() => {
    if (!bookSize || !bookRef.current) return;
    const el = bookRef.current;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let $ : any;
    let mounted = true;

    (async () => {
      // jQuery doit être chargé avant turn.js (qui le require() à l'exécution)
      const jqModule = await import("jquery");
      $ = jqModule.default ?? jqModule;
      // Exposer globalement pour que turn.js puisse le trouver via require()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (globalThis as any).$ = $;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (globalThis as any).jQuery = $;

      await import("turn.js");
      if (!mounted) return;

      // Détruire l'instance précédente si elle existe
      try { $(el).turn("destroy"); } catch {}

      $ref.current = $(el);
      $ref.current.turn({
        width: bookSize.w,
        height: bookSize.h,
        autoCenter: true,
        display: bookSize.double ? "double" : "single",
        acceleration: true,
        gradients: true,
        elevation: 50,
        when: {
          turned: (_e: Event, page: number) => {
            setCurrentPage(page);
          },
        },
      });
    })();

    return () => {
      mounted = false;
      try { if ($) $(el).turn("destroy"); } catch {}
      $ref.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookSize]);

  /* ─── Navigation ─────────────────────────────────────────────── */
  const prevPage = useCallback(() => {
    try { $ref.current?.turn("previous"); } catch {}
  }, []);

  const nextPage = useCallback(() => {
    try { $ref.current?.turn("next"); } catch {}
  }, []);

  const goToPage = useCallback((n: number) => {
    try { $ref.current?.turn("page", n); } catch {}
  }, []);

  const totalPages = pages.length;
  // turn.js avance de 2 en 2 en mode double — on atteint la fin à la
  // dernière page paire ou impaire selon le total
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  // En mode double, turn.js a besoin d'un nombre pair de pages
  const paddedPages = [...pages];
  if (bookSize?.double && paddedPages.length % 2 !== 0) paddedPages.push([]);

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-semibold text-ink">
          <T fr="Lire un extrait" en="Read an excerpt" />
        </h2>
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-ink-soft">
          <T fr="Extrait" en="Excerpt" />
          {" · "}
          <T fr="p." en="p." /> {currentPage}/{totalPages}
        </span>
      </div>

      {/* ── Livre ── */}
      <div ref={wrapperRef} className="mt-6 flex w-full justify-center">
        {bookSize && (
          <div
            ref={bookRef}
            className="turnjs-book overflow-hidden rounded-xl border border-sand/50 shadow-[0_8px_36px_-10px_rgba(15,61,45,0.22)]"
            style={{ width: bookSize.w, height: bookSize.h }}
          >
            {paddedPages.map((paragraphs, i) => (
              <div key={i}>
                <PageContent paragraphs={paragraphs} pageNumber={i + 1} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Navigation ── */}
      <div className="mt-5 flex items-center justify-between">
        <button
          type="button"
          onClick={prevPage}
          disabled={isFirst}
          className="flex items-center gap-2 rounded-full border border-sand px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-jade/40 hover:text-jade-bright disabled:pointer-events-none disabled:opacity-30"
        >
          <span aria-hidden>←</span>
          <span className="sr-only sm:not-sr-only">
            <T fr="Précédent" en="Previous" />
          </span>
        </button>

        <div className="flex items-center gap-1">
          {pages.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToPage(i + 1)}
              aria-label={`Page ${i + 1}`}
              aria-current={i + 1 === currentPage ? "page" : undefined}
              className="group/dot flex h-6 min-w-6 items-center justify-center"
            >
              <span
                className={`rounded-full transition-all duration-300 ${
                  i + 1 === currentPage
                    ? "h-2 w-6 bg-jade"
                    : "h-2 w-2 bg-sand group-hover/dot:bg-jade/50"
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={nextPage}
          disabled={isLast}
          className="flex items-center gap-2 rounded-full border border-sand px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-jade/40 hover:text-jade-bright disabled:pointer-events-none disabled:opacity-30"
        >
          <span className="sr-only sm:not-sr-only">
            <T fr="Suivant" en="Next" />
          </span>
          <span aria-hidden>→</span>
        </button>
      </div>

      <p className="mt-3 text-center text-xs text-ink-soft/50 sm:hidden">
        <T fr="Glissez les coins pour feuilleter" en="Drag the corners to turn pages" />
      </p>
    </section>
  );
}
