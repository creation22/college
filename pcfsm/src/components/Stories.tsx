"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { STORIES } from "@/lib/data";
import SectionTag from "@/components/ui/SectionTag";
import Reveal from "@/components/ui/Reveal";

export default function Stories() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragLimit, setDragLimit] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current || !containerRef.current) return;
      setDragLimit(
        Math.max(0, trackRef.current.scrollWidth - containerRef.current.offsetWidth)
      );
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section id="stories" className="relative bg-ink py-24 md:py-32" aria-label="Student stories">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal>
          <SectionTag index="07" label="Student Stories" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="display mt-6 text-[10vw] leading-[0.95] text-bone md:text-[5vw]">
            IN THEIR <span className="text-outline">WORDS.</span>
          </p>
        </Reveal>
      </div>

      <div
        ref={containerRef}
        className="mt-14 cursor-grab overflow-hidden px-5 active:cursor-grabbing md:px-10"
      >
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={{ left: -dragLimit, right: 0 }}
          dragElastic={0.06}
          className="flex w-max gap-6 md:gap-10"
        >
          {STORIES.map((s) => (
            <article
              key={s.name}
              className="w-[86vw] shrink-0 border-t border-black/10 pt-8 sm:w-[60vw] md:w-[42vw] lg:w-[34vw]"
            >
              <p className="text-2xl font-medium leading-snug text-bone md:text-[1.9rem]">
                <span className="text-fire" aria-hidden>“</span>
                {s.quote}
                <span className="text-fire" aria-hidden>”</span>
              </p>
              <footer className="mt-10 flex items-center gap-5">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full hairline">
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="64px"
                    className="cine object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-bone">
                    {s.name}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-fire">
                    {s.role}
                  </p>
                </div>
              </footer>
            </article>
          ))}

          {/* end card */}
          <div className="flex w-[70vw] shrink-0 items-center sm:w-[40vw] md:w-[28vw]">
            <div>
              <p className="display text-4xl leading-tight text-bone/90">
                YOUR STORY <span className="text-fire">STARTS HERE.</span>
              </p>
              <a
                href="https://pcfsm.org/contact-us/"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-fire"
              >
                Talk to us
                <span className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1" aria-hidden>→</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <p className="mx-auto mt-8 max-w-[1600px] px-5 text-[10px] uppercase tracking-[0.3em] text-smoke md:px-10">
        ← Drag →
      </p>
    </section>
  );
}
