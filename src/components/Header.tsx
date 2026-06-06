"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/librairie", label: "Librairie" },
  { href: "/maison-edition", label: "Maison d'édition" },
  { href: "/evenements", label: "Évènements" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-paper/85 backdrop-blur-md shadow-[0_1px_0_0_var(--sand)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="group/logo shrink-0">
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
                  active
                    ? "text-jade-bright"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                <span className="relative z-10">{link.label}</span>
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
            className="shine-sweep ml-3 inline-flex items-center gap-2 rounded-full bg-jade px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(39,184,146,0.6)] transition-transform hover:-translate-y-0.5 hover:bg-jade-deep"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-live-pulse rounded-full" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-surface" />
            </span>
            Découvrir le catalogue
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-sand bg-paper/70 text-ink transition-colors hover:border-jade/40 hover:text-jade-bright lg:hidden"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${
                open ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 bottom-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${
                open ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 border-t border-sand bg-paper/95 px-6 py-4 backdrop-blur-md">
          {links.map((link, i) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
                className={`translate-x-0 rounded-xl px-4 py-3 text-base font-medium transition-all duration-300 ${
                  open ? "opacity-100" : "-translate-x-2 opacity-0"
                } ${active ? "bg-jade-pale text-jade-deep" : "text-ink-soft"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Barre de progression de lecture — la maison qui suit votre exploration */}
      <div className="h-[2px] w-full bg-transparent">
        <div
          className="h-full origin-left bg-gradient-to-r from-jade via-jade-bright to-mango transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </header>
  );
}
