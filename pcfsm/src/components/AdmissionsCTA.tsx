"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { SITE } from "@/lib/data";
import Magnetic from "@/components/ui/Magnetic";
import Words from "@/components/ui/Words";
import Embers from "@/components/ui/Embers";

export default function AdmissionsCTA() {
  return (
    <section
      id="apply"
      className="relative scroll-mt-20 overflow-hidden bg-ink py-32 md:py-48 noise"
      aria-label="Admissions"
    >
      {/* glow + embers */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60vh] glow-fire" aria-hidden />
      <div
        className="pointer-events-none absolute -right-40 -top-24 hidden h-[460px] w-[460px] rounded-full md:block"
        style={{ background: "radial-gradient(closest-side, rgba(63,63,149,0.10), transparent 70%)" }}
        aria-hidden
      />
      <Embers />
      {/* emblem watermark */}
      <Image
        src={SITE.logo}
        alt=""
        width={460}
        height={460}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(72vw,460px)] w-[min(72vw,460px)] -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.05]"
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
              className="group inline-flex items-center gap-3 bg-fire px-9 py-5 text-[13px] font-semibold uppercase tracking-[0.18em] text-ink transition-[background-color,transform] duration-200 ease-out hover:bg-ember active:scale-[0.98]"
            >
              Apply Now
              <span className="inline-block transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden>↗</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.22}>
            <a
              href={SITE.phoneHref}
              className="group inline-flex items-center gap-3 border border-black/15 px-9 py-5 text-[13px] font-semibold uppercase tracking-[0.18em] text-bone transition-[color,border-color,transform] duration-200 ease-out hover:border-fire hover:text-fire active:scale-[0.98]"
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
