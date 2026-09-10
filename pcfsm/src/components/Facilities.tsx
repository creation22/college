"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { FACILITIES } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import Words from "@/components/ui/Words";
import SectionTag from "@/components/ui/SectionTag";

export default function Facilities() {
  const imgRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.02]);

  return (
    <section id="facilities" className="relative scroll-mt-20 bg-coal py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal>
          <SectionTag index="04" label="Facilities" />
        </Reveal>
        <Words
          text="BUILT FOR SERIOUS TRAINING."
          className="display mt-6 max-w-[16ch] text-[10.5vw] leading-[0.95] text-bone md:text-[5.4vw]"
        />
      </div>

      {/* full-bleed parallax image */}
      <div ref={imgRef} className="group relative mt-14 h-[62vh] min-h-[420px] overflow-hidden vignette md:h-[78vh]">
        <motion.div
          style={reduced ? undefined : { y, scale }}
          className="absolute inset-[-12%]"
        >
          <Image
            src="/images/campus/testimonial.webp"
            alt="PCFSM practical training facility"
            fill
            sizes="100vw"
            className="cine object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-coal via-transparent to-coal/40" aria-hidden />

        {/* floating info */}
        <div className="absolute inset-x-5 bottom-8 flex flex-wrap items-end justify-between gap-4 md:inset-x-10 md:bottom-12">
          <div className="glass max-w-sm p-5 md:p-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-fire">Practical Training</p>
            <p className="mt-2 text-sm leading-relaxed text-ash">
              One of the best practical grounds — regular fire drills, equipment handling
              and live training on the campus.
            </p>
          </div>
          <p className="hidden text-[11px] uppercase tracking-[0.28em] text-bone/60 md:block">
            Fire grounds · Labs · Computer lab · Library · A/V hall
          </p>
        </div>
      </div>

      {/* editorial rows */}
      <div className="mx-auto mt-4 max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-px overflow-hidden bg-black/8 md:grid-cols-2 xl:grid-cols-3">
          {FACILITIES.slice(1).map((f, i) => (
            <Reveal key={f.index} y={i < 3 ? 24 : 0} delay={i < 3 ? i * 0.08 : 0.12 + i * 0.05} className="h-full">
              <div className="group h-full bg-coal p-7 transition-colors duration-500 hover:bg-panel md:p-9">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm tabular text-fire">{f.index}</span>
                  <span
                    className="pulse-dot h-1.5 w-1.5 rounded-full bg-smoke/50 transition-colors duration-300 group-hover:bg-fire"
                    aria-hidden
                  />
                </div>
                <h3 className="display mt-5 text-2xl text-bone">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-smoke group-hover:text-ash transition-colors duration-500">
                  {f.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
