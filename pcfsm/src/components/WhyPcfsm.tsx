"use client";

import { WHY } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import Words from "@/components/ui/Words";
import SectionTag from "@/components/ui/SectionTag";

export default function WhyPcfsm() {
  return (
    <section id="why" className="relative bg-coal py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <SectionTag index="08" label="Why PCFSM" />
            </Reveal>
            <Words
              text="WHY PCFSM?"
              className="display mt-6 text-[13vw] leading-[0.95] text-bone md:text-[6.4vw]"
            />
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-xs text-sm leading-relaxed text-smoke">
              Six reasons, all verifiable on pcfsm.org. No borrowed claims.
            </p>
          </Reveal>
        </div>

        <div className="mt-16">
          {WHY.map((w, i) => (
            <Reveal key={w.index} y={i === 0 ? 24 : 0} delay={i === 0 ? 0 : 0.06 + i * 0.04}>
              <div
                className={`group grid gap-4 border-t border-black/10 py-8 transition-colors duration-500 hover:bg-black/[0.03] md:grid-cols-[80px_1fr_1.2fr] md:gap-10 md:py-10 ${
                  i === WHY.length - 1 ? "border-b" : ""
                }`}
              >
                <p className="text-sm tabular text-smoke transition-colors duration-400 group-hover:text-fire">
                  {w.index}
                </p>
                <h3 className="display text-[7vw] leading-[1.02] text-bone/85 transition-[transform,color] duration-400 ease-out-expo group-hover:translate-x-2 group-hover:text-bone md:text-[2.2vw]">
                  {w.title}
                </h3>
                <p className="max-w-xl text-sm leading-relaxed text-smoke group-hover:text-ash transition-colors duration-500">
                  {w.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
