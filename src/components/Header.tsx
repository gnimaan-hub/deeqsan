"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import Logo from "./Logo";
import { useLanguage } from "@/contexts/LanguageContext";
import T from "./T";

type Theme = "dark" | "light";

/*
 * Le thème vit sur <html data-theme> (posé avant le premier paint par le
 * script inline du layout) ; on s'y abonne via useSyncExternalStore pour
 * que l'icône reste synchronisée sans setState dans un effet.
 */
const themeListeners = new Set<() => void>();

function getTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function applyTheme(next: Theme) {
  if (next === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  try {
    localStorage.setItem("deeqsan-theme", next);
  } catch {}
  themeListeners.forEach((cb) => cb());
}

function subscribeTheme(cb: () => void) {
  themeListeners.add(cb);
  return () => themeListeners.delete(cb);
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => "dark" as Theme);
  const { lang, setLang } = useLanguage();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  const toggleTheme = () => applyTheme(theme === "dark" ? "light" : "dark");

  const toggleLang = () => setLang(lang === "fr" ? "en" : "fr");

  const links = [
    { href: "/", labelFr: "Accueil", labelEn: "Home" },
    { href: "/librairie", labelFr: "Librairie", labelEn: "Library" },
    { href: "/maison-edition", labelFr: "Maison d'édition", labelEn: "Publishing" },
    { href: "/evenements", labelFr: "Évènements", labelEn: "Events" },
    { href: "/contact", labelFr: "Contact", labelEn: "Contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-paper/85 backdrop-blur-md shadow-[0_1px_0_0_var(--sand)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-10 gap-3">
        <Link href="/" aria-label="Les Éditions Deeqsan — Accueil" className="group/logo shrink-0">
          <span className="inline-block transition-transform duration-500 group-hover/logo:-rotate-2 group-hover/logo:scale-[1.03]">
            <Logo />
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative overflow-hidden rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active ? "text-jade-bright" : "text-ink-soft hover:text-ink"
                }`}
              >
                <span className="relative z-10">{lang === "en" ? link.labelEn : link.labelFr}</span>
                <span
                  aria-hidden
                  className={`absolute inset-x-2 bottom-1 h-0.5 origin-left scale-x-0 rounded-full bg-jade transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                    active ? "scale-x-100 bg-jade" : ""
                  }`}
                />
              </Link>
            );
          })}
          <Link
            href="/librairie"
            className="shine-sweep ml-2 inline-flex items-center gap-2 rounded-full bg-jade px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(39,184,146,0.6)] transition-transform hover:-translate-y-0.5 hover:bg-jade-deep"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-live-pulse rounded-full" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-surface" />
            </span>
            <T fr="Catalogue" en="Catalogue" />
          </Link>
        </nav>

        {/* Controls: theme + language + mobile menu */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <button
            type="button"
            onClick={toggleLang}
            aria-label={lang === "fr" ? "Switch to English" : "Passer en français"}
            className="flex h-9 items-center gap-1 rounded-full border border-sand bg-paper/70 px-3 text-xs font-bold text-ink-soft transition-colors hover:border-jade/40 hover:text-jade-bright"
          >
            <span className={lang === "fr" ? "text-jade-bright" : "text-ink-soft"}>FR</span>
            <span className="text-ink-soft/40">/</span>
            <span className={lang === "en" ? "text-jade-bright" : "text-ink-soft"}>EN</span>
          </button>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "dark"
                ? lang === "en" ? "Switch to light mode" : "Passer en mode clair"
                : lang === "en" ? "Switch to dark mode" : "Passer en mode sombre"
            }
            className="flex h-9 w-9 items-center justify-center rounded-full border border-sand bg-paper/70 text-ink-soft transition-colors hover:border-jade/40 hover:text-jade-bright"
          >
            {theme === "dark" ? (
              /* Sun icon */
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
              </svg>
            ) : (
              /* Moon icon */
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={
              open
                ? lang === "en" ? "Close menu" : "Fermer le menu"
                : lang === "en" ? "Open menu" : "Ouvrir le menu"
            }
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-sand bg-paper/70 text-ink transition-colors hover:border-jade/40 hover:text-jade-bright lg:hidden"
          >
            <span className="relative block h-3.5 w-5">
              <span className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${open ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`absolute left-0 bottom-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile nav — inert quand fermé pour le sortir de l'ordre de tabulation */}
      <div
        id="mobile-nav"
        inert={!open}
        className={`overflow-hidden transition-[max-height,opacity] duration-300 lg:hidden ${open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <nav className="flex flex-col gap-1 border-t border-sand bg-paper/95 px-6 py-4 backdrop-blur-md">
          {links.map((link, i) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
                className={`translate-x-0 rounded-xl px-4 py-3 text-base font-medium transition-all duration-300 ${open ? "opacity-100" : "-translate-x-2 opacity-0"} ${active ? "bg-jade-pale/30 text-jade-bright" : "text-ink-soft"}`}
              >
                {lang === "en" ? link.labelEn : link.labelFr}
              </Link>
            );
          })}
          <Link
            href="/librairie"
            onClick={closeMenu}
            className="shine-sweep mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-jade px-5 py-3 text-sm font-semibold text-white transition-transform hover:bg-jade-deep"
          >
            <T fr="Découvrir le catalogue" en="Browse catalogue" />
          </Link>
        </nav>
      </div>

      {/* Reading progress bar */}
      <div className="h-[2px] w-full bg-transparent">
        <div
          className="h-full origin-left bg-gradient-to-r from-jade via-jade-bright to-mango transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </header>
  );
}
