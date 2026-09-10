"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CHAPTERS } from "@/lib/data";
import { useIsMobile, useWebGL } from "@/lib/hooks";
import Words from "@/components/ui/Words";

const SafetyScene = dynamic(() => import("@/three/SafetyScene"), { ssr: false });

const EASE = [0.19, 1, 0.22, 1] as const;

export default function SafetyWorld() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [chapter, setChapter] = useState(0);
  const [active, setActive] = useState(false);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const webgl = useWebGL();
  // pending (null) renders the pinned shell immediately — no layout jump when WebGL confirms
  const use3D = webgl !== false && !reduced;

  useEffect(() => {
    if (!use3D || !sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        progressRef.current = self.progress;
        const idx = Math.min(CHAPTERS.length - 1, Math.floor(self.progress * CHAPTERS.length));
        setChapter((prev) => (prev === idx ? prev : idx));
      },
    });
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      rootMargin: "60px",
    });
    io.observe(stickyRef.current!);
    return () => {
      st.kill();
      io.disconnect();
    };
  }, [use3D]);

  /* ---------- reduced-motion / no-WebGL editorial fallback ---------- */
  if (!use3D) {
    return (
      <section id="world" className="relative bg-coal py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <p className="text-[11px] uppercase tracking-[0.32em] text-fire">The five disciplines</p>
          <h2 className="display mt-6 text-[11vw] leading-[0.95] text-bone md:text-[5.6vw]">
            ENTER THE WORLD OF SAFETY.
          </h2>
          <div className="mt-16 grid gap-px overflow-hidden border border-black/10 bg-black/8 md:grid-cols-2">
            {CHAPTERS.map((c) => (
              <div key={c.index} className="group bg-coal">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="cine object-cover img-zoom"
                  />
                </div>
                <div className="p-8 md:p-10">
                  <p className="text-sm tabular text-fire">{c.index}</p>
                  <h3 className="display mt-4 text-3xl text-bone md:text-4xl">{c.title}</h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-smoke">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const current = CHAPTERS[chapter];

  return (
    <section ref={sectionRef} id="world" className="relative h-[520vh] bg-ink" aria-label="The five disciplines of safety">
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden">
        {/* 3D environment — mounts once WebGL is confirmed; quiet placeholder while pending */}
        <div className="absolute inset-0" aria-hidden>
          {webgl === true ? (
            <SafetyScene progress={progressRef} simple={mobile} active={active} />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,rgba(255,90,31,0.07),transparent_60%)]" />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/45 pointer-events-none" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent pointer-events-none" aria-hidden />

        {/* section heading — fades after first chapter */}
        <div className="pointer-events-none absolute left-5 top-24 z-10 md:left-10 md:top-28">
          <Words
            text="ENTER THE WORLD OF SAFETY."
            className={`display max-w-[16ch] text-[9vw] leading-[0.95] text-bone transition-opacity duration-700 md:text-[4.2vw] ${
              chapter > 0 ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>

        {/* chapter overlay */}
        <div className="absolute inset-x-5 bottom-24 z-10 md:inset-x-10 md:bottom-28 md:left-auto md:w-[46%]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.index}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <p className="display text-[18vw] leading-none text-outline md:text-[9vw]" aria-hidden>
                {current.index}
              </p>
              <h3 className="display -mt-[0.16em] text-[8vw] leading-none text-bone md:text-[3.4vw]">
                {current.title}
              </h3>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-ash md:text-base">
                {current.body}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* chapter rail */}
        <div className="absolute right-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-end gap-4 md:flex md:right-10" aria-hidden>
          {CHAPTERS.map((c, i) => (
            <div key={c.index} className="flex items-center gap-3">
              <span
                className={`text-[10px] uppercase tracking-[0.24em] transition-colors duration-400 ${
                  i === chapter ? "text-bone" : "text-smoke/50"
                }`}
              >
                {c.title}
              </span>
              <span
                className={`block h-px w-10 origin-right transition-[transform,background-color] duration-500 ease-out-expo ${
                  i === chapter ? "scale-x-100 bg-fire" : "scale-x-50 bg-black/20"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
