"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";

export type Lang = "fr" | "en";

const STORAGE_KEY = "deeqsan-lang";

/*
 * Petit store externe : la langue vit dans localStorage et les composants
 * s'y abonnent via useSyncExternalStore — le serveur rend toujours "fr",
 * puis le client se cale sur la préférence enregistrée après hydratation.
 */
const listeners = new Set<() => void>();

function getLang(): Lang {
  try {
    return localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "fr";
  } catch {
    return "fr";
  }
}

function setLang(l: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, l);
  } catch {}
  listeners.forEach((cb) => cb());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
};

const LanguageContext = createContext<LanguageContextValue>({
  lang: "fr",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getLang, () => "fr" as Lang);

  // Garde l'attribut lang du document aligné sur la langue affichée
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
