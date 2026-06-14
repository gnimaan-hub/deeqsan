"use client";

import Script from "next/script";
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

// Expose jQuery + turn.js load state globally so multiple instances don't re-load
declare global {
  interface Window {
    __turnJsReady?: boolean;
  }
}

export default function BookExcerptViewer({ pages }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const [scriptsReady, setScriptsReady] = useState(
    typeof window !== "undefined" && !!window.__turnJsReady
  );
  const [bookSize, setBookSize] = useState<{
    w: number;
    h: number;
    double: boolean;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const initialized = useRef(false);

  /* ── Mesure du conteneur ──────────────────────────────────────── */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.offsetWidth;
      const isDouble = w >= 600;
      const pageW = isDouble ? Math.floor(w / 2) : w;
      const pageH = Math.min(Math.round(pageW * 1.42), 540);
      setBookSize({ w: pageW * (isDouble ? 2 : 1), h: pageH, double: isDouble });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* ── Initialisation de turn.js ────────────────────────────────── */
  useEffect(() => {
    if (!scriptsReady || !bookSize || !bookRef.current) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const $ = (window as any).$;
    if (!$ || !$.fn?.turn) return;

    const el = bookRef.current;

    // Détruire l'instance précédente
    if (initialized.current) {
      try { $(el).turn("destroy"); } catch {}
      initialized.current = false;
    }

    $(el).turn({
      width: bookSize.w,
      height: bookSize.h,
      autoCenter: true,
      display: bookSize.double ? "double" : "single",
      acceleration: true,
      gradients: true,
      elevation: 50,
      when: {
        turned: (_e: Event, page: number) => setCurrentPage(page),
      },
    });
    initialized.current = true;

    return () => {
      try { $(el).turn("destroy"); } catch {}
      initialized.current = false;
    };
  }, [scriptsReady, bookSize]);

  /* ── Navigation ──────────────────────────────────────────────── */
  const call = useCallback(
    (method: string, arg?: unknown) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const $ = (window as any).$;
      if (!$?.fn?.turn || !bookRef.current || !initialized.current) return;
      try {
        arg !== undefined
          ? $(bookRef.current).turn(method, arg)
          : $(bookRef.current).turn(method);
      } catch {}
    },
    []
  );

  const totalPages = pages.length;
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  // turn.js requiert un nombre pair de pages en mode double
  const paddedPages = [...pages];
  if (bookSize?.double && paddedPages.length % 2 !== 0) paddedPages.push([]);

  return (
    <>
      {/* Scripts chargés une seule fois, en ordre strict */}
      <Script
        src="/jquery.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          // turn.js sera chargé juste après via le second Script
        }}
      />
      <Script
        src="/turn.js"
        strategy="afterInteractive"
        onLoad={() => {
          window.__turnJsReady = true;
          setScriptsReady(true);
        }}
      />

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
              className="overflow-hidden rounded-xl border border-sand/50 shadow-[0_8px_36px_-10px_rgba(15,61,45,0.22)]"
              style={{ width: bookSize.w, height: bookSize.h }}
            >
              {paddedPages.map((paragraphs, i) => (
                <div key={i} style={{ height: bookSize.h }}>
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
            onClick={() => call("previous")}
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
                onClick={() => call("page", i + 1)}
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
            onClick={() => call("next")}
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
          <T
            fr="Glissez les coins pour feuilleter"
            en="Drag the corners to turn pages"
          />
        </p>
      </section>
    </>
  );
}
