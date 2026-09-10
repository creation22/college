"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { SITE } from "@/lib/data";
import { scrollToId } from "@/components/SmoothScroll";
import Magnetic from "@/components/ui/Magnetic";
import Embers from "@/components/ui/Embers";
import WaterSpray from "@/components/ui/WaterSpray";

const EASE = [0.19, 1, 0.22, 1] as const;

function Line({
  text,
  delay,
  className = "",
}: {
  text: string;
  delay: number;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
      <motion.span
        className={`block will-change-transform ${className}`}
        initial={{ y: "108%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, ease: EASE, delay }}
      >
        {text}
      </motion.span>
    </span>
  );
}

const CHIPS = ["Est. 1999", "MSBTE Affiliated", "Govt. of Maharashtra Recognized"];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [inView, setInView] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const artY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "60px",
    });
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden bg-ink noise"
      aria-label="PCFSM — Master the science of safety"
    >
      {/* faint structural glows */}
      <div
        className="pointer-events-none absolute -right-32 top-1/4 hidden h-[520px] w-[520px] rounded-full md:block"
        style={{ background: "radial-gradient(closest-side, rgba(63,63,149,0.08), transparent 70%)" }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-[1600px] items-center gap-12 px-5 pb-16 pt-24 md:px-10 lg:grid-cols-[1.12fr_1fr] lg:gap-8 lg:pt-16">
        {/* ------------------------------ typography ------------------------------ */}
        <motion.div style={reduced ? undefined : { opacity: contentOpacity }}>
          <motion.ul
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
            className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2"
          >
            {CHIPS.map((chip, i) => (
              <li key={chip} className="flex items-center gap-5 text-[11px] uppercase tracking-[0.24em] text-smoke">
                {chip}
                {i < CHIPS.length - 1 && (
                  <span className="h-1 w-1 rounded-full bg-fire" aria-hidden />
                )}
              </li>
            ))}
          </motion.ul>

          <h1 className="display text-[14vw] leading-[0.94] text-bone sm:text-[11.5vw] lg:text-[6.6vw]">
            <Line text="MASTER THE" delay={0.5} />
            <Line
              text="Science"
              delay={0.62}
              className="serif-accent text-fire text-[1.14em] leading-[0.85]"
            />
            <Line text="OF SAFETY." delay={0.74} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.95 }}
            className="mt-7 max-w-md text-base leading-relaxed text-ash md:text-lg"
          >
            Fire Engineering &amp; Industrial Safety education — diploma, post-graduate
            and certificate programs, taught on real equipment, on real grounds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 1.1 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic strength={0.22}>
              <a
                href={SITE.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-fire px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-ink transition-[background-color,transform] duration-200 ease-out hover:bg-ember active:scale-[0.98]"
              >
                Apply Now
                <span className="inline-block transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden>↗</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.22}>
              <a
                href="#programs"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("#programs");
                }}
                className="group inline-flex items-center gap-3 border border-black/15 px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-bone transition-[color,border-color,transform] duration-200 ease-out hover:border-fire hover:text-fire active:scale-[0.98]"
              >
                Explore Programs
                <span className="inline-block transition-transform duration-300 ease-out-expo group-hover:translate-x-1" aria-hidden>→</span>
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* ------------------------------ the fireman ------------------------------ */}
        <motion.div
          style={reduced ? undefined : { y: artY }}
          className="relative mx-auto w-full max-w-[560px] lg:max-w-none"
        >
          {/* glow bed */}
          <div
            className="pointer-events-none absolute inset-x-8 bottom-4 h-2/3"
            style={{ background: "radial-gradient(closest-side, rgba(255,90,31,0.12), transparent 72%)" }}
            aria-hidden
          />

          <motion.div
            initial={reduced ? undefined : { opacity: 0, scale: 0.94, clipPath: "inset(14% 0 0 0)" }}
            animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.45 }}
            className="relative hairline"
          >
            {reduced ? (
              /* reduced motion — the still frame */
              <Image
                src="/images/hero/fireman.webp"
                alt="Firefighter spraying water on a live training fire — PCFSM practical ground"
                width={1124}
                height={700}
                priority
                sizes="(max-width: 1024px) 90vw, 44vw"
                className="h-auto w-full select-none"
                draggable={false}
              />
            ) : (
              /* the training film — muted, looping, silent */
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster="/images/hero/fireman.webp"
                aria-hidden
                className="h-auto w-full select-none"
              >
                <source src="/videos/hero.mp4" type="video/mp4" />
              </video>
            )}
          </motion.div>

          {/* water bursting out of the frame — desktop only */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.35, duration: 0.6 }}
            className="absolute left-0 top-[58%] z-20 hidden h-[160px] w-[190px] -translate-x-[92%] -translate-y-1/2 lg:block"
            aria-hidden
          >
            <WaterSpray className="inset-0" />
          </motion.div>

          {/* rising embers over the art */}
          <Embers count={14} />

          {/* verified stat chip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 1.25 }}
            className="glass absolute -bottom-3 left-0 flex items-center gap-3 px-5 py-3.5 md:left-2"
          >
            <span className="display text-2xl text-fire tabular">92%</span>
            <span className="text-[10px] uppercase leading-tight tracking-[0.22em] text-ash">
              Practical
              <br />
              Training
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* vertical tagline + scroll cue — unmounted once the hero leaves the viewport */}
      {inView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute bottom-6 right-5 z-10 hidden md:flex items-end gap-6"
          aria-hidden
        >
          <span className="text-[10px] uppercase tracking-[0.34em] text-smoke [writing-mode:vertical-rl]">
            Fire Engineering · Industrial Safety · HSE
          </span>
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-smoke [writing-mode:vertical-rl]">Scroll</span>
            <div className="h-14 w-px overflow-hidden bg-black/10">
              <motion.div
                className="h-1/2 w-full origin-top bg-fire"
                animate={reduced ? undefined : { y: ["-100%", "200%"] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
