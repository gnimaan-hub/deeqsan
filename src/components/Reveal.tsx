"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "span";
  aboveFold?: boolean; // transform-only animation: LCP element stays visible from first render
};

export default function Reveal({ children, delay = 0, className = "", as = "div", aboveFold = false }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const baseClass = aboveFold ? "reveal-hero" : "reveal";

  // Typé "div" pour unifier la signature de ref ; rend bien div/li/span à l'exécution
  const Tag = as as "div";

  return (
    <Tag
      ref={ref}
      className={`${baseClass} ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
