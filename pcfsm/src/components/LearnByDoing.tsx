"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { TRAINING } from "@/lib/data";
import SectionTag from "@/components/ui/SectionTag";

export default function LearnByDoing() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState(0);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setRange(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -range]);

  if (reduced) {
    return (
      <section id="training" className="bg-ink py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <SectionTag index="03" label="Learn by doing" />
          <h2 className="display mt-6 text-[10vw] leading-[0.95] text-bone md:text-[5.4vw]">
            DON&apos;T JUST LEARN SAFETY. EXPERIENCE IT.
          </h2>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {TRAINING.map((t) => (
              <div key={t.title} className="hairline bg-coal">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={t.image} alt="" fill sizes="(max-width:640px) 100vw, 33vw" className="cine object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="display text-xl text-bone">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-smoke">{t.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="training"
      className="relative h-[340vh] bg-ink"
      aria-label="Practical training at PCFSM"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="pointer-events-none absolute left-5 top-24 z-10 md:left-10 md:top-28">
          <SectionTag index="03" label="Learn by doing" />
          <p className="display mt-5 max-w-[14ch] text-[9vw] leading-[0.95] text-bone md:text-[4vw]">
            DON&apos;T JUST LEARN SAFETY. <span className="text-fire">EXPERIENCE IT.</span>
          </p>
        </div>

        {/* mobile / tablet: native snap carousel */}
        <div className="flex gap-5 overflow-x-auto px-5 pb-6 snap-x snap-mandatory lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TRAINING.map((t, i) => (
            <div key={t.title} className="w-[78vw] shrink-0 snap-center sm:w-[52vw]">
              <Panel t={t} i={i} big={false} />
            </div>
          ))}
        </div>

        {/* desktop: scrub-driven track */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="hidden lg:flex items-center gap-10 pl-[46vw] pr-[8vw] will-change-transform"
        >
          {TRAINING.map((t, i) => (
            <div key={t.title} className="shrink-0">
              <Panel t={t} i={i} big />
            </div>
          ))}
        </motion.div>

        <p className="pointer-events-none absolute bottom-8 right-10 hidden text-[10px] uppercase tracking-[0.3em] text-smoke lg:block" aria-hidden>
          Keep scrolling →
        </p>
      </div>
    </section>
  );
}

function Panel({
  t,
  i,
  big,
}: {
  t: (typeof TRAINING)[number];
  i: number;
  big: boolean;
}) {
  return (
    <div className={`group relative overflow-hidden hairline vignette ${big ? "w-[34vw]" : ""}`}>
      <div className={`relative ${big ? "aspect-[4/5]" : "aspect-[4/5]"} overflow-hidden`}>
        <Image
          src={t.image}
          alt={t.title}
          fill
          sizes={big ? "34vw" : "78vw"}
          className="cine object-cover img-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" aria-hidden />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
        <p className="text-xs tabular text-fire">{String(i + 1).padStart(2, "0")}</p>
        <h3 className="display mt-2 text-xl leading-tight text-bone md:text-2xl">{t.title}</h3>
        <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-ash/80">{t.caption}</p>
      </div>
    </div>
  );
}
