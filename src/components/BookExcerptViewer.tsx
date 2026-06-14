"use client";

import dynamic from "next/dynamic";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import T from "./T";

interface Props {
  pages: string[][];
}

// react-pageflip uses canvas APIs — must be client-only
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HTMLFlipBook = dynamic(() => import("react-pageflip"), { ssr: false }) as any;

const PageContent = forwardRef<
  HTMLDivElement,
  { paragraphs: string[]; pageNumber: number }
>(({ paragraphs, pageNumber }, ref) => (
  <div ref={ref} className="book-page h-full bg-paper flex flex-col relative overflow-hidden">
    {/* Reliure */}
    <div
      aria-hidden
      className="absolute inset-y-0 left-5 w-px bg-gradient-to-b from-transparent via-sand/30 to-transparent"
    />
    <div className="flex-1 px-7 py-8 sm:px-10 sm:py-10 overflow-hidden">
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
));
PageContent.displayName = "PageContent";

export default function BookExcerptViewer({ pages }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bookRef = useRef<any>(null);
  const [pageSize, setPageSize] = useState<{ width: number; height: number } | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.offsetWidth;
      // In landscape the book shows 2 pages side by side; each page gets half the container.
      // react-pageflip switches to portrait (1 page) when width < height.
      const pageW = Math.floor(w / 2);
      const pageH = Math.min(Math.round(pageW * 1.42), 560);
      setPageSize({ width: pageW, height: pageH });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const totalPages = pages.length;
  const isFirst = currentPage === 0;
  const isLast = currentPage >= totalPages - 1;

  const handlePrev = () => bookRef.current?.pageFlip().flipPrev();
  const handleNext = () => bookRef.current?.pageFlip().flipNext();
  const handleFlip = useCallback((e: { data: number }) => setCurrentPage(e.data), []);

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-semibold text-ink">
          <T fr="Lire un extrait" en="Read an excerpt" />
        </h2>
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-ink-soft">
          <T fr="Extrait" en="Excerpt" />
          {" · "}
          <T fr="p." en="p." /> {currentPage + 1}/{totalPages}
        </span>
      </div>

      {/* Le livre */}
      <div ref={containerRef} className="w-full">
        {pageSize && (
          <div className="book-stage relative mx-auto">
            <HTMLFlipBook
              ref={bookRef}
              width={pageSize.width}
              height={pageSize.height}
              size="fixed"
              minWidth={120}
              maxWidth={480}
              minHeight={180}
              maxHeight={600}
              drawShadow
              flippingTime={900}
              usePortrait
              showCover={false}
              autoSize
              maxShadowOpacity={0.45}
              mobileScrollSupport
              showPageCorners
              swipeDistance={30}
              onFlip={handleFlip}
              className=""
              style={{}}
            >
              {pages.map((paragraphs, i) => (
                <PageContent key={i} paragraphs={paragraphs} pageNumber={i + 1} />
              ))}
            </HTMLFlipBook>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-5 flex items-center justify-between">
        <button
          type="button"
          onClick={handlePrev}
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
              onClick={() => {
                bookRef.current?.pageFlip().turnToPage(i);
                setCurrentPage(i);
              }}
              aria-label={`Page ${i + 1}`}
              aria-current={i === currentPage ? "page" : undefined}
              className="group/dot flex h-6 min-w-6 items-center justify-center"
            >
              <span
                className={`rounded-full transition-all duration-300 ${
                  i === currentPage
                    ? "h-2 w-6 bg-jade"
                    : "h-2 w-2 bg-sand group-hover/dot:bg-jade/50"
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
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
        <T fr="Glissez sur la page pour la feuilleter" en="Swipe the page to turn it" />
      </p>
    </section>
  );
}
