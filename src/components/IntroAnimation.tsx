"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "deeqsan-intro-seen";
const VISIBLE_DURATION = 4200;

/**
 * Rideau de lancement — une plume glisse sur la page et fait apparaître,
 * trait après trait façon manuscrit, la signature de la maison :
 * "Écrire c'est exister". Joué une fois par session, puis s'efface
 * doucement pour laisser place au site.
 */
export default function IntroAnimation() {
  const [phase, setPhase] = useState<"hidden" | "visible" | "leaving">("hidden");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      alreadySeen = false;
    }
    if (alreadySeen) return;

    setPhase("visible");
    document.body.style.overflow = "hidden";

    const leaveTimer = window.setTimeout(() => setPhase("leaving"), VISIBLE_DURATION);
    const cleanupTimer = window.setTimeout(() => {
      setPhase("hidden");
      document.body.style.overflow = "";
    }, VISIBLE_DURATION + 750);

    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* stockage indisponible — l'intro pourra rejouer, ce n'est pas grave */
    }

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(cleanupTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div className="intro-overlay" data-leaving={phase === "leaving"} aria-hidden>
      <div className="intro-stage">
        <span className="intro-eyebrow">Les Éditions Deeqsan</span>
        <span className="intro-script">
          <svg
            viewBox="0 0 64 64"
            fill="none"
            className="intro-quill"
            aria-hidden
          >
            <path
              d="M50 8C36 12 16 30 11 50c8-2 16-6 22-12"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M50 8c-2 9-7 16-13 22M50 8c-9 2-17 6-23 14M50 8c-6 5-10 12-13 20"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              opacity="0.75"
            />
            <path
              d="M11 50 6 58"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
          <span className="intro-script__text">Écrire c&rsquo;est exister</span>
        </span>
        <span className="intro-underline" />
      </div>
    </div>
  );
}
