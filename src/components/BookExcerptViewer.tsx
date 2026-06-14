"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import T from "./T";

interface Props {
  pages: string[][];
}

declare global {
  interface Window {
    __turnJsReady?: boolean;
  }
}

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Construit le HTML d'une page à partir des paragraphes. */
function pageHTML(paragraphs: string[], num: number): string {
  if (paragraphs.length === 0) return "";
  const ps = paragraphs
    .map(
      (p, i) =>
        `<p style="margin:0;color:${i === 0 ? "var(--ink)" : "var(--ink-soft)"}">${esc(p)}</p>`
    )
    .join("");

  return `
    <div style="position:relative;display:flex;flex-direction:column;height:100%;
                width:100%;background:var(--paper);box-sizing:border-box;overflow:hidden;">
      <!-- reliure -->
      <div style="position:absolute;top:0;bottom:0;left:1.25rem;width:1px;
                  background:linear-gradient(to bottom,transparent,
                    color-mix(in srgb,var(--sand) 30%,transparent),transparent);"
           aria-hidden="true"></div>
      <!-- texte -->
      <div style="flex:1;overflow:hidden;padding:2rem 1.75rem 0;box-sizing:border-box;">
        <div style="display:flex;flex-direction:column;gap:1rem;
                    font-family:var(--font-display,Georgia,serif);
                    font-size:0.9rem;line-height:1.85;">
          ${ps}
        </div>
      </div>
      <!-- fondu bas -->
      <div style="position:absolute;bottom:2.5rem;left:0;right:0;height:2.5rem;
                  background:linear-gradient(to top,var(--paper),transparent);
                  pointer-events:none;" aria-hidden="true"></div>
      <!-- numéro -->
      <div style="display:flex;justify-content:center;padding-bottom:0.75rem;flex-shrink:0;">
        <span style="font-size:0.6rem;font-weight:500;text-transform:uppercase;
                     letter-spacing:0.16em;
                     color:color-mix(in srgb,var(--ink-soft) 40%,transparent);">
          — ${num} —
        </span>
      </div>
    </div>`;
}

export default function BookExcerptViewer({ pages }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  // bookRef est intentionnellement vide dans le JSX — turn.js gère ses enfants
  const bookRef = useRef<HTMLDivElement>(null);
  const [jqReady, setJqReady] = useState(false);
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

  /* ── Mesure réactive du conteneur ──────────────────────────── */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.offsetWidth;
      const isDouble = w >= 600;
      const pageW = isDouble ? Math.floor(w / 2) : w;
      const pageH = Math.min(Math.round(pageW * 1.45), 560);
      setBookSize({ w: pageW * (isDouble ? 2 : 1), h: pageH, double: isDouble });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* ── Initialisation / re-init de turn.js ───────────────────── */
  useEffect(() => {
    if (!scriptsReady || !bookSize || !bookRef.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const $ = (window as any).$;
    if (!$ || !$.fn?.turn) return;

    const el = bookRef.current;

    // Destruction propre de l'instance précédente
    if (initialized.current) {
      try { $(el).turn("destroy"); } catch {}
      el.innerHTML = "";
      initialized.current = false;
    }

    // Pages — créées manuellement pour que React ne touche JAMAIS ces nodes
    const allPages = [...pages];
    if (bookSize.double && allPages.length % 2 !== 0) allPages.push([]);

    allPages.forEach((paragraphs, i) => {
      const div = document.createElement("div");
      div.innerHTML = pageHTML(paragraphs, i + 1);
      el.appendChild(div);
    });

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
      el.innerHTML = "";
      initialized.current = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptsReady, bookSize]);

  /* ── Navigation ─────────────────────────────────────────────── */
  const call = useCallback((method: string, arg?: unknown) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const $ = (window as any).$;
    if (!$?.fn?.turn || !bookRef.current || !initialized.current) return;
    try {
      arg !== undefined
        ? $(bookRef.current).turn(method, arg)
        : $(bookRef.current).turn(method);
    } catch {}
  }, []);

  const totalPages = pages.length;
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <>
      {/* jQuery d'abord, turn.js uniquement après jQuery prêt */}
      <Script
        src="/jquery.min.js"
        strategy="afterInteractive"
        onLoad={() => setJqReady(true)}
      />
      {jqReady && !scriptsReady && (
        <Script
          src="/turn.js"
          strategy="afterInteractive"
          onLoad={() => {
            window.__turnJsReady = true;
            setScriptsReady(true);
          }}
        />
      )}

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

        {/* Livre — le div bookRef est volontairement vide dans le JSX */}
        <div ref={wrapperRef} className="mt-6 flex w-full justify-center">
          {bookSize && (
            <div
              ref={bookRef}
              className="rounded-xl border border-sand/50 shadow-[0_8px_36px_-10px_rgba(15,61,45,0.22)]"
              style={{ width: bookSize.w, height: bookSize.h }}
            />
          )}
        </div>

        {/* Navigation */}
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
