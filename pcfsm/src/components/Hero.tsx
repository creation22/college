"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { SITE } from "@/lib/data";
import { useIsMobile, useWebGL } from "@/lib/hooks";
import { scrollToId } from "@/components/SmoothScroll";
import Magnetic from "@/components/ui/Magnetic";

const HeroScene = dynamic(() => import("@/three/HeroScene"), { ssr: false });

const EASE = [0.19, 1, 0.22, 1] as const;

function HeadlineLine({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
      <motion.span
        className="block will-change-transform"
        initial={{ y: "108%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, ease: EASE, delay }}
      >
        {text}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const webgl = useWebGL();
  const [canvasActive, setCanvasActive] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    // warm the 3D chunk while WebGL detection is in flight
    void import("@/three/HeroScene");
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => setCanvasActive(entry.isIntersecting),
      { rootMargin: "80px" }
    );
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  const still = !!reduced;
  const sceneReady = webgl === true && !mobile ? true : webgl === true; // mobile gets simplified scene

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[620px] overflow-hidden bg-ink noise"
      aria-label="PCFSM — Master the science of safety"
    >
      {/* 3D layer */}
      {sceneReady && (
        <div className="absolute inset-0" aria-hidden>
          <HeroScene still={still} simple={mobile} active={canvasActive} />
        </div>
      )}

      {/* non-WebGL / loading fallback — quiet industrial glow */}
      {!sceneReady && (
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 glow-fire rounded-full" />
          <div className="absolute left-1/2 top-1/2 h-[46vmin] w-[46vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
          <div className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/6 rotate-45" style={{ borderStyle: "dashed" }} />
        </div>
      )}

      {/* gradient masks for legibility + transition into next section */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40 pointer-events-none" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent pointer-events-none" aria-hidden />

      {/* content */}
      <motion.div
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-14 md:px-10 md:pb-20"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
          className="mb-5 text-[11px] md:text-xs uppercase tracking-[0.32em] text-ash"
        >
          {SITE.tagline}
          <span className="mx-3 text-fire" aria-hidden>/</span>
          <span className="text-smoke">Established {SITE.established}</span>
        </motion.p>

        <h1 className="display max-w-[13ch] text-[13.5vw] leading-[0.92] text-bone sm:text-[11vw] lg:text-[7.2vw]">
          <HeadlineLine text="MASTER THE" delay={0.55} />
          <span className="flex flex-col md:flex-row md:gap-[0.26em]">
            <HeadlineLine text="SCIENCE" delay={0.68} />
            <HeadlineLine text="OF SAFETY." delay={0.78} />
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 1.0 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <Magnetic strength={0.22}>
            <a
              href="#programs"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("#programs");
              }}
              className="group inline-flex items-center gap-3 border border-white/15 px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-bone transition-colors duration-300 hover:border-fire hover:text-fire active:scale-[0.98]"
            >
              Explore Programs
              <span className="inline-block transition-transform duration-300 ease-out-expo group-hover:translate-x-1" aria-hidden>→</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.22}>
            <a
              href={SITE.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-fire px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-ember active:scale-[0.98]"
            >
              Apply Now
              <span className="inline-block transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden>↗</span>
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-6 right-5 md:right-10 z-10 hidden md:flex flex-col items-center gap-3"
        aria-hidden
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-smoke [writing-mode:vertical-rl]">Scroll</span>
        <div className="h-14 w-px overflow-hidden bg-white/10">
          <motion.div
            className="h-1/2 w-full origin-top bg-fire"
            animate={reduced ? undefined : { y: ["-100%", "200%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
