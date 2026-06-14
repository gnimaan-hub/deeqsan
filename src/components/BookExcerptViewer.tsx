"use client";

import { useRef, useState } from "react";
import T from "./T";

interface Props {
  pages: string[][];
}

type Turn = { from: number; dir: 1 | -1 };
type Drag = { dir: 1 | -1; angle: number; settling: boolean; commit: boolean };

const FOLD_MAX = 90;

function PageFace({ paragraphs, pageNumber }: { paragraphs: string[]; pageNumber: number }) {
  return (
    <>
      {/* Pli de reliure */}
      <div
        aria-hidden
        className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-transparent via-sand/30 to-transparent sm:left-10"
      />
      <div className="flex-1 overflow-hidden px-8 py-8 sm:px-16 sm:py-10">
        <div className="space-y-5 font-display text-[0.95rem] leading-[1.85] text-ink-soft sm:text-base sm:leading-[1.9]">
          {paragraphs.map((paragraph, i) => (
            <p key={i} className={i === 0 ? "text-ink" : ""}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      {/* Fondu bas */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-8 left-0 right-0 h-10 bg-gradient-to-t from-paper to-transparent"
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
  const [drag, setDrag] = useState<Drag | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const gestureRef = useRef<{
    startX: number;
    startY: number;
    active: boolean;
    dir: 1 | -1;
    width: number;
  } | null>(null);
  const suppressTapRef = useRef(false);
  const isFirst = current === 0;
  const isLast = current === pages.length - 1;

  const goTo = (next: number) => {
    if (turn || drag || next === current || next < 0 || next >= pages.length) return;
    setTurn({ from: current, dir: next > current ? 1 : -1 });
    setCurrent(next);
  };

  /* ——— Geste de swipe ——— */
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" || turn || drag) return;
    suppressTapRef.current = false;
    gestureRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      active: false,
      dir: 1,
      width: stageRef.current?.offsetWidth ?? 320,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const g = gestureRef.current;
    if (!g) return;
    const dx = e.clientX - g.startX;
    const dy = e.clientY - g.startY;
    if (!g.active) {
      if (Math.abs(dx) < 14 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
      const dir: 1 | -1 = dx < 0 ? 1 : -1;
      if ((dir === 1 && isLast) || (dir === -1 && isFirst)) {
        gestureRef.current = null;
        return;
      }
      g.active = true;
      g.dir = dir;
      try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
    }
    const span = g.width * 0.60;
    const raw = g.dir === 1 ? -dx : dx;
    const progress = Math.min(1, Math.max(0, raw / span));
    const angle = g.dir === 1 ? -progress * FOLD_MAX : -(1 - progress) * FOLD_MAX;
    setDrag({ dir: g.dir, angle, settling: false, commit: false });
  };

  const endGesture = (cancelled: boolean) => {
    const g = gestureRef.current;
    gestureRef.current = null;
    if (!g?.active || !drag) return;
    suppressTapRef.current = true;
    const progress = g.dir === 1 ? -drag.angle / FOLD_MAX : 1 + drag.angle / FOLD_MAX;
    const commit = !cancelled && progress > 0.30;
    const target = commit
      ? (g.dir === 1 ? -FOLD_MAX : 0)
      : (g.dir === 1 ? 0 : -FOLD_MAX);
    if (Math.abs(drag.angle - target) < 1) {
      if (commit) setCurrent((c) => c + g.dir);
      setDrag(null);
      return;
    }
    setDrag({ dir: g.dir, angle: target, settling: true, commit });
  };

  const onSheetTransitionEnd = (e: React.TransitionEvent) => {
    if (e.propertyName !== "transform" || e.target !== e.currentTarget) return;
    if (!drag?.settling) return;
    if (drag.commit) setCurrent((c) => c + drag.dir);
    setDrag(null);
  };

  const tapTo = (next: number) => {
    if (suppressTapRef.current) { suppressTapRef.current = false; return; }
    goTo(next);
  };

  const fold = turn
    ? { sheetIndex: turn.dir === 1 ? turn.from : current, baseIndex: turn.dir === -1 ? turn.from : current }
    : drag
      ? { sheetIndex: drag.dir === 1 ? current : current - 1, baseIndex: drag.dir === 1 ? current + 1 : current }
      : null;
  const baseIndex = fold ? fold.baseIndex : current;

  // Progress [0..1] of the fold (used for live-drag effects on the base page)
  const dragProgress = drag ? Math.abs(drag.angle) / FOLD_MAX : 0;

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

      <div
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={() => endGesture(false)}
        onPointerCancel={() => endGesture(true)}
        className="page-turn-stage relative mt-6 touch-pan-y [@media(pointer:coarse)]:select-none"
      >
        {/* Page de fond */}
        <div className="relative flex min-h-[20rem] flex-col overflow-hidden rounded-2xl border border-sand/60 bg-paper shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_32px_-10px_rgba(15,61,45,0.18)]">
          <PageFace paragraphs={pages[baseIndex]} pageNumber={baseIndex + 1} />

          {/* Ombre portée DE la feuille qui tourne SUR la page de fond — peak au milieu du tour */}
          {fold && (
            <div
              aria-hidden
              className={`pointer-events-none absolute inset-0 rounded-2xl ${
                turn
                  ? turn.dir === 1
                    ? "page-base-shadow-out"
                    : "page-base-shadow-in"
                  : ""
              }`}
              style={
                drag
                  ? {
                      background:
                        "linear-gradient(to right, rgba(15,61,45,0.20) 0%, rgba(15,61,45,0.06) 50%, transparent 75%)",
                      opacity: dragProgress,
                    }
                  : undefined
              }
            />
          )}
        </div>

        {/* Zones de tap (mobile) */}
        <button
          type="button"
          tabIndex={-1}
          aria-hidden
          onClick={() => tapTo(current - 1)}
          className="absolute inset-y-0 left-0 w-[18%] cursor-default md:hidden"
        />
        <button
          type="button"
          tabIndex={-1}
          aria-hidden
          onClick={() => tapTo(current + 1)}
          className="absolute inset-y-0 right-0 w-[18%] cursor-default md:hidden"
        />

        {/* Feuille en cours de tournage */}
        {fold && (
          <div
            aria-hidden
            onAnimationEnd={(e) => {
              if (e.target === e.currentTarget) setTurn(null);
            }}
            onTransitionEnd={onSheetTransitionEnd}
            style={drag ? { transform: `rotateY(${drag.angle}deg)` } : undefined}
            className={`page-turn-sheet absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-sand/60 bg-paper ${
              turn
                ? turn.dir === 1
                  ? "page-fold-out"
                  : "page-fold-in"
                : drag?.settling
                  ? "page-turn-settle"
                  : ""
            }`}
          >
            <PageFace paragraphs={pages[fold.sheetIndex]} pageNumber={fold.sheetIndex + 1} />

            {/* Assombrissement de la feuille + liseré lumineux sur le bord droit */}
            <span
              className={`page-turn-shade absolute inset-0 rounded-2xl ${
                turn
                  ? turn.dir === 1
                    ? "page-fold-out"
                    : "page-fold-in"
                  : ""
              }`}
              style={drag ? { opacity: dragProgress } : undefined}
            />

            {/* Reflet de bord (liseret de lumière sur le bord droit quand la page se soulève) */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-6 rounded-r-2xl"
              style={{
                background:
                  "linear-gradient(to left, rgba(255,250,240,0.18) 0%, transparent 100%)",
                opacity: drag ? dragProgress * 0.9 : turn ? 0.6 : 0,
              }}
            />
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
          <span className="sr-only sm:not-sr-only">
            <T fr="Précédent" en="Previous" />
          </span>
        </button>

        <div className="flex items-center gap-1">
          {pages.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Page ${i + 1}`}
              aria-current={i === current ? "page" : undefined}
              className="group/dot flex h-6 min-w-6 items-center justify-center"
            >
              <span
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "h-2 w-6 bg-jade"
                    : "h-2 w-2 bg-sand group-hover/dot:bg-jade/50"
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(current + 1)}
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
