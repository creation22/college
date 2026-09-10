"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CENTERS, SITE, type Center } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import Words from "@/components/ui/Words";
import SectionTag from "@/components/ui/SectionTag";

/* Simplified Maharashtra outline (viewBox 0 0 440 380) */
const MAHARASHTRA_PATH =
  "M11,104 L16,121 L22,176 L26,190 L44,291 L60,341 L71,363 L115,352 L170,335 L230,313 L275,297 L319,280 L358,259 L400,228 L429,203 L423,159 L401,115 L369,66 L346,44 L319,33 L264,22 L215,28 L170,44 L121,60 L77,77 L55,88 Z";

export default function Centers() {
  const [selected, setSelected] = useState<Center | null>(null);

  return (
    <section id="campus" className="relative scroll-mt-20 bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal>
          <SectionTag index="05" label="Campus & Centers" />
        </Reveal>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <Words
            text="FIND YOUR PCFSM."
            className="display text-[11vw] leading-[0.95] text-bone md:text-[5.6vw]"
          />
          <Reveal delay={0.2}>
            <p className="max-w-xs text-sm leading-relaxed text-smoke">
              A head office, regional office and learning centers across Maharashtra —
              the same discipline, the same training, closer to you.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          {/* map — desktop */}
          <Reveal className="hidden lg:block">
            <div className="relative">
              <svg
                viewBox="0 0 440 380"
                className="w-full max-w-[560px] select-none"
                role="img"
                aria-label="Map of PCFSM learning centers across Maharashtra"
              >
                <path
                  d={MAHARASHTRA_PATH}
                  fill="rgba(255,255,255,0.025)"
                  stroke="rgba(255,255,255,0.14)"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
                {CENTERS.map((c) => {
                  const isSel = selected?.city === c.city;
                  return (
                    <g
                      key={c.city}
                      className="cursor-pointer"
                      onClick={() => setSelected(isSel ? null : c)}
                      onMouseEnter={() => setSelected(c)}
                    >
                      <circle cx={c.x} cy={c.y} r="16" fill="transparent" />
                      {isSel && (
                        <motion.circle
                          cx={c.x}
                          cy={c.y}
                          r="14"
                          fill="none"
                          stroke="#ff5a1f"
                          strokeWidth="1"
                          initial={{ scale: 0.5, opacity: 0.8 }}
                          animate={{ scale: 1.8, opacity: 0 }}
                          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                          style={{ transformOrigin: `${c.x}px ${c.y}px` }}
                        />
                      )}
                      <circle
                        cx={c.x}
                        cy={c.y}
                        r={isSel ? 5 : 3.5}
                        fill={isSel ? "#ff5a1f" : "#6e6e74"}
                        className="transition-all duration-300"
                      />
                      <text
                        x={c.x + 10}
                        y={c.y + 4}
                        fontSize="11"
                        fill={isSel ? "#f2f0eb" : "#a4a4aa"}
                        className="uppercase tracking-widest transition-colors duration-300"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {c.city.split(" — ")[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* detail card */}
              <AnimatePresence mode="wait">
                {selected ? (
                  <motion.div
                    key={selected.city}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                    className="glass absolute bottom-4 left-4 right-4 max-w-md p-6"
                  >
                    <p className="text-[10px] uppercase tracking-[0.3em] text-fire">{selected.type}</p>
                    <h3 className="display mt-2 text-2xl text-bone">{selected.city}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-smoke">{selected.address}</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.18em] text-ash">
                      {selected.programs}
                    </p>
                    <a
                      href={selected.maps ?? SITE.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-5 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-fire"
                    >
                      Explore
                      <span className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1" aria-hidden>→</span>
                    </a>
                  </motion.div>
                ) : (
                  <motion.p
                    key="hint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-4 left-4 text-[11px] uppercase tracking-[0.24em] text-smoke"
                  >
                    Hover a center to see details
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          {/* list */}
          <div>
            {CENTERS.map((c, i) => (
              <Reveal key={c.city} delay={i * 0.05}>
                <button
                  onMouseEnter={() => setSelected(c)}
                  onFocus={() => setSelected(c)}
                  onClick={() => setSelected(selected?.city === c.city ? null : c)}
                  className={`group w-full border-t border-white/8 py-6 text-left transition-colors duration-400 ${
                    i === CENTERS.length - 1 ? "border-b" : ""
                  } ${selected?.city === c.city ? "bg-white/[0.02]" : ""}`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.28em] text-fire">{c.type}</p>
                      <h3 className="display mt-1.5 text-2xl text-bone md:text-3xl">{c.city}</h3>
                    </div>
                    <span
                      className={`text-xl transition-all duration-400 ease-out-expo ${
                        selected?.city === c.city ? "text-fire translate-x-1" : "text-smoke/40"
                      }`}
                      aria-hidden
                    >
                      →
                    </span>
                  </div>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-smoke lg:hidden">
                    {c.address}
                  </p>
                  <p className="mt-2 hidden max-w-md text-sm leading-relaxed text-smoke lg:block">
                    {c.address}
                  </p>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
