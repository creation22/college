"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { SITE } from "@/lib/data";
import Magnetic from "@/components/ui/Magnetic";
import Words from "@/components/ui/Words";

function Embers({ count = 16 }: { count?: number }) {
  const embers = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${(i * 61) % 100}%`,
        size: 2 + ((i * 7) % 3),
        delay: `${((i * 13) % 90) / 10}s`,
        duration: `${7 + ((i * 11) % 60) / 10}s`,
        drift: `${((i % 5) - 2) * 1.6}vw`,
        opacity: 0.4 + ((i * 17) % 40) / 100,
        bottom: `${(i * 29) % 40}%`,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {embers.map((e, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-ember animate-ember"
          style={
            {
              left: e.left,
              bottom: e.bottom,
              width: e.size,
              height: e.size,
              animationDelay: e.delay,
              animationDuration: e.duration,
              "--ember-drift": e.drift,
              "--ember-opacity": e.opacity,
              boxShadow: "0 0 8px 1px rgba(255,110,50,0.6)",
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

export default function AdmissionsCTA() {
  return (
    <section
      id="apply"
      className="relative scroll-mt-20 overflow-hidden bg-ink py-32 md:py-48 noise"
      aria-label="Admissions"
    >
      {/* glow + embers */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60vh] glow-fire" aria-hidden />
      <Embers />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/6"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1600px] px-5 text-center md:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[11px] uppercase tracking-[0.34em] text-fire"
        >
          Admissions Open — {SITE.established} Legacy
        </motion.p>

        <Words
          text="YOUR CAREER STARTS HERE."
          className="display mx-auto mt-8 max-w-[12ch] text-[13vw] leading-[0.92] text-bone md:text-[7.4vw]"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1], delay: 0.15 }}
          className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-ash"
        >
          Take the first step towards a career in fire engineering and industrial safety.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic strength={0.22}>
            <a
              href={SITE.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-fire px-9 py-5 text-[13px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:bg-ember active:scale-[0.98]"
            >
              Apply Now
              <span className="inline-block transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden>↗</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.22}>
            <a
              href={SITE.phoneHref}
              className="group inline-flex items-center gap-3 border border-white/15 px-9 py-5 text-[13px] font-semibold uppercase tracking-[0.18em] text-bone transition-colors duration-300 hover:border-fire hover:text-fire active:scale-[0.98]"
            >
              Talk to us
              <span className="inline-block transition-transform duration-300 ease-out-expo group-hover:translate-x-1" aria-hidden>→</span>
            </a>
          </Magnetic>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 text-sm text-smoke"
        >
          {SITE.phone} · {SITE.email}
        </motion.p>
      </div>
    </section>
  );
}
