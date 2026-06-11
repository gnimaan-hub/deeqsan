import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import T from "@/components/T";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-grain bg-canopy-motif">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <span className="animate-glow-pulse absolute -left-16 -top-16 h-72 w-72 rounded-full bg-jade/20 blur-3xl" />
        <span className="animate-glow-pulse absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-coral/15 blur-3xl" style={{ animationDelay: "2s" }} />
      </div>
      <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center lg:px-10">
        <Eyebrow tone="coral" className="mx-auto">
          <T fr="Page introuvable" en="Page not found" />
        </Eyebrow>
        <p aria-hidden className="mt-8 font-display text-[6rem] font-bold leading-none text-jade/30 sm:text-[8rem]">
          404
        </p>
        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-ink text-balance sm:text-4xl">
          <T
            fr="Cette page s'est égarée entre deux rayons…"
            en="This page got lost between two shelves…"
          />
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink-soft">
          <T
            fr="L'adresse demandée n'existe pas ou n'existe plus. Le catalogue, lui, est toujours là."
            en="The requested address doesn't exist, or no longer does. The catalogue, however, is still here."
          />
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="shine-sweep inline-flex items-center gap-2 rounded-full bg-jade px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_36px_-12px_rgba(39,184,146,0.65)] transition-transform hover:-translate-y-0.5 hover:bg-jade-deep"
          >
            <T fr="Retour à l'accueil" en="Back to home" />
          </Link>
          <Link
            href="/librairie"
            className="link-underline inline-flex items-center gap-2 rounded-full border border-lagoon/25 bg-surface/60 px-7 py-3.5 text-sm font-semibold text-jade-bright transition-colors hover:bg-surface"
          >
            <T fr="Parcourir la librairie" en="Browse the library" />
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
