"use client";

import Image from "next/image";
import { useState } from "react";
import { ALSO_OFFERED, PROGRAMS } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import Words from "@/components/ui/Words";
import SectionTag from "@/components/ui/SectionTag";

export default function Programs() {
  const [active, setActive] = useState(0);

  return (
    <section id="programs" className="relative scroll-mt-20 bg-coal py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal>
          <SectionTag index="02" label="Programs" />
        </Reveal>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <Words
            text="CHOOSE YOUR SPECIALIZATION."
            className="display text-[10.5vw] leading-[0.95] text-bone md:text-[5.6vw]"
          />
          <Reveal delay={0.2}>
            <p className="max-w-xs text-sm leading-relaxed text-smoke">
              Diploma, certificate and post-graduate programs across fire technology,
              industrial safety and HSE — MSBTE affiliated, NEBOSH partnered.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          {/* program rows */}
          <div>
            {PROGRAMS.map((p, i) => {
              const isActive = active === i;
              return (
                <Reveal key={p.index} delay={i * 0.05}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={`group relative block border-t border-white/8 py-7 md:py-9 transition-colors duration-500 ${
                      i === PROGRAMS.length - 1 ? "border-b" : ""
                    }`}
                    aria-label={`${p.name} — ${p.duration} program`}
                  >
                    {/* hover accent line */}
                    <span
                      className={`absolute left-0 top-[-1px] h-px bg-fire transition-all duration-600 ease-out-expo ${
                        isActive ? "w-full" : "w-0"
                      }`}
                      aria-hidden
                    />
                    <div className="flex items-baseline gap-5 md:gap-8">
                      <span
                        className={`text-sm tabular transition-colors duration-400 ${
                          isActive ? "text-fire" : "text-smoke"
                        }`}
                      >
                        {p.index}
                      </span>
                      <div className="flex-1">
                        <h3
                          className={`display text-[6.4vw] leading-[1.02] transition-all duration-600 ease-out-expo md:text-[2.6vw] ${
                            isActive ? "translate-x-3 text-bone" : "text-bone/75"
                          }`}
                        >
                          {p.name}
                        </h3>
                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] uppercase tracking-[0.18em]">
                          <span className={isActive ? "text-fire" : "text-smoke"}>{p.duration}</span>
                          <span className="text-smoke/60" aria-hidden>·</span>
                          <span className="text-smoke">{p.level}</span>
                          <span className="text-smoke/60" aria-hidden>·</span>
                          <span className="text-smoke">{p.eligibility}</span>
                        </div>
                        <p
                          className={`mt-3 max-w-lg text-sm leading-relaxed transition-all duration-500 ease-out-expo ${
                            isActive ? "text-ash md:opacity-100 md:translate-y-0" : "text-smoke md:opacity-0 md:translate-y-1"
                          } md:max-h-12 md:overflow-hidden`}
                        >
                          {p.description}
                        </p>
                      </div>
                      <span
                        className={`hidden shrink-0 text-2xl transition-all duration-500 ease-out-expo md:block ${
                          isActive ? "translate-x-1 -translate-y-1 text-fire" : "text-smoke"
                        }`}
                        aria-hidden
                      >
                        ↗
                      </span>
                    </div>

                    {/* mobile inline visual */}
                    <div className="mt-5 overflow-hidden hairline lg:hidden">
                      <div className="relative aspect-[16/10]">
                        <Image
                          src={p.image}
                          alt=""
                          fill
                          sizes="100vw"
                          className="cine object-cover"
                        />
                      </div>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>

          {/* floating visual panel — desktop */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="group relative aspect-[3/4] overflow-hidden hairline vignette">
                {PROGRAMS.map((p, i) => (
                  <div
                    key={p.index}
                    className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-out-expo ${
                      active === i
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-[1.04]"
                    }`}
                    aria-hidden={active !== i}
                  >
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes="38vw"
                      className="cine object-cover"
                    />
                  </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-ink/20" aria-hidden />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-fire">
                      {PROGRAMS[active].level} · {PROGRAMS[active].duration}
                    </p>
                    <p className="display mt-2 text-xl text-bone">{PROGRAMS[active].name}</p>
                  </div>
                  <span className="text-fire text-2xl" aria-hidden>↗</span>
                </div>
              </div>
              <p className="mt-4 text-[11px] uppercase tracking-[0.24em] text-smoke">
                View program on pcfsm.org
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* also offered — marquee */}
      <div className="mt-20 border-y border-white/8 py-5 overflow-hidden" aria-label="Also offered at PCFSM">
        <div className="flex w-max animate-marquee gap-0 whitespace-nowrap will-change-transform">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {ALSO_OFFERED.map((item) => (
                <span key={`${copy}-${item}`} className="flex items-center text-[12px] uppercase tracking-[0.22em] text-smoke">
                  <span className="px-6">{item}</span>
                  <span className="text-fire" aria-hidden>·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
