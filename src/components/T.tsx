"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import type { ReactNode } from "react";

type Props = {
  fr: ReactNode;
  en: ReactNode;
};

export default function T({ fr, en }: Props) {
  const { lang } = useLanguage();
  return <>{lang === "en" ? en : fr}</>;
}
