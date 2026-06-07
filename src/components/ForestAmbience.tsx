"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  drift: number;
  phase: number;
  hue: "jade" | "mango" | "coral";
  baseOpacity: number;
};

const HUES: Record<Particle["hue"], string> = {
  jade: "94, 235, 194",
  mango: "246, 200, 110",
  coral: "239, 160, 130",
};

const HUE_WEIGHTS: Particle["hue"][] = ["jade", "jade", "jade", "mango", "coral"];

export default function ForestAmbience() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Skip entirely on small screens — canvas loop is expensive on mobile
    if (window.innerWidth < 768) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let frame = 0;
    let raf = 0;
    let running = true;

    function buildParticles() {
      // Fewer particles for better performance
      const count = Math.max(12, Math.min(28, Math.round((width * height) / 60000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 1.2 + Math.random() * 2.6,
        speed: 0.12 + Math.random() * 0.32,
        drift: (Math.random() - 0.5) * 0.5,
        phase: Math.random() * Math.PI * 2,
        hue: HUE_WEIGHTS[Math.floor(Math.random() * HUE_WEIGHTS.length)],
        baseOpacity: 0.12 + Math.random() * 0.22,
      }));
    }

    function resize() {
      if (!canvas) return;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
    }

    function draw() {
      if (!ctx || !running) return;
      ctx.clearRect(0, 0, width, height);
      frame += 1;

      for (const p of particles) {
        p.y -= p.speed;
        p.x += Math.sin(frame * 0.012 + p.phase) * p.drift;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const twinkle = 0.65 + 0.35 * Math.sin(frame * 0.04 + p.phase);
        const opacity = p.baseOpacity * twinkle;
        const color = HUES[p.hue];

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 5);
        gradient.addColorStop(0, `rgba(${color}, ${opacity})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${color}, ${Math.min(opacity * 1.8, 0.85)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    function handleVisibility() {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-30 h-full w-full opacity-80"
    />
  );
}
