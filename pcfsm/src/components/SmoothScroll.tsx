"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionConfig } from "motion/react";

let lenisInstance: Lenis | null = null;

export function scrollToId(id: string) {
  const el = document.querySelector(id) as HTMLElement | null;
  if (!el) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset: 0, duration: 1.1 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      lerp: 0.11,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    lenisInstance = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
