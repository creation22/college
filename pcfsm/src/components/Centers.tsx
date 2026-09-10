"use client";

import { useState } from "react";
import { CENTERS, type Center } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import Words from "@/components/ui/Words";
import SectionTag from "@/components/ui/SectionTag";

export default function Centers() {
  const [selected, setSelected] = useState<Center>(CENTERS[0]); // Pune — regional office

  const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    selected.mapQuery
  )}&z=14&output=embed`;
  const exploreHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    selected.mapQuery
  )}`;

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

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          {/* map — clean, no overlays */}
          <Reveal>
            <div className="hairline">
              <div className="relative h-[380px] md:h-[520px]">
                <iframe
                  key={selected.city}
                  title={`PCFSM ${selected.city} — Google Map`}
                  src={embedSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-black/10 px-5 py-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-smoke">
                  {selected.type} — {selected.city}
                </p>
                <a
                  href={exploreHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex shrink-0 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-fire"
                >
                  Open in Google Maps
                  <span
                    className="transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                    aria-hidden
                  >
                    →
                  </span>
                </a>
              </div>
            </div>
          </Reveal>

          {/* center list */}
          <div>
            {CENTERS.map((c, i) => {
              const isActive = selected.city === c.city;
              return (
                <Reveal key={c.city} y={i === 0 ? 28 : 0} delay={i === 0 ? 0 : 0.08 + i * 0.05}>
                  <button
                    onClick={() => setSelected(c)}
                    aria-pressed={isActive}
                    className={`group w-full border-t border-black/10 py-6 text-left transition-colors duration-400 ${
                      i === CENTERS.length - 1 ? "border-b" : ""
                    } ${isActive ? "bg-black/[0.03]" : ""}`}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.28em] text-fire">
                          {c.type}
                        </p>
                        <h3
                          className={`display mt-1.5 text-2xl transition-colors duration-400 md:text-3xl ${
                            isActive ? "text-bone" : "text-bone/70 group-hover:text-bone"
                          }`}
                        >
                          {c.city}
                        </h3>
                      </div>
                      <span
                        className={`text-xl transition-[transform,color] duration-300 ease-out-expo ${
                          isActive
                            ? "text-fire translate-x-1"
                            : "text-smoke/40 group-hover:text-ash"
                        }`}
                        aria-hidden
                      >
                        →
                      </span>
                    </div>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-smoke">
                      {c.address}
                    </p>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
