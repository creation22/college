"use client";

import Image from "next/image";
import { CAREER_ROLES, PLACED } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import Words from "@/components/ui/Words";
import SectionTag from "@/components/ui/SectionTag";

export default function Careers() {
  return (
    <section id="careers" className="relative scroll-mt-20 overflow-hidden bg-coal py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal>
          <SectionTag index="06" label="Careers & Placements" />
        </Reveal>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <Words
            text="WHERE SAFETY LEADS."
            className="display text-[11vw] leading-[0.95] text-bone md:text-[5.6vw]"
          />
          <Reveal delay={0.2}>
            <p className="max-w-xs text-sm leading-relaxed text-smoke">
              Trained for roles that industries hire for — in India and abroad.
            </p>
          </Reveal>
        </div>
      </div>

      {/* roles — animated typography */}
      <div className="mt-14 space-y-px border-y border-black/10 bg-black/8 py-px" aria-label="Career paths">
        <div className="overflow-hidden bg-coal py-4">
          <div className="flex w-max animate-marquee whitespace-nowrap will-change-transform">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
                {CAREER_ROLES.slice(0, 3).map((r) => (
                  <span key={`${copy}-${r}`} className="display flex items-center px-8 text-[8vw] leading-none md:text-[3.6vw]">
                    <span className="text-bone">{r}</span>
                    <span className="ml-8 h-2 w-2 rounded-full bg-fire" aria-hidden />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-hidden bg-coal py-4">
          <div className="flex w-max animate-marquee-reverse whitespace-nowrap will-change-transform">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
                {CAREER_ROLES.slice(3).concat([CAREER_ROLES[0]]).map((r) => (
                  <span key={`${copy}-${r}`} className="display flex items-center px-8 text-[8vw] leading-none md:text-[3.6vw]">
                    <span className="text-outline-indigo">{r}</span>
                    <span className="ml-8 h-2 w-2 rounded-full bg-indigo" aria-hidden />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* verified facts */}
      <div className="mx-auto mt-16 grid max-w-[1600px] gap-px overflow-hidden bg-black/8 px-0 md:grid-cols-3">
        <Reveal className="h-full">
          <div className="h-full bg-coal p-8 md:p-10">
            <p className="display text-5xl text-fire tabular md:text-6xl">80%+</p>
            <p className="mt-3 text-sm leading-relaxed text-ash">
              Track record of student placement, with dedicated placement assistance
              alongside training.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="h-full">
          <div className="h-full bg-coal p-8 md:p-10">
            <p className="display text-5xl text-indigo md:text-6xl">GLOBAL</p>
            <p className="mt-3 text-sm leading-relaxed text-ash">
              PCFSM students have served companies internationally as well as across India.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.2} className="h-full">
          <div className="h-full bg-coal p-8 md:p-10">
            <p className="display text-5xl text-bone tabular md:text-6xl">
              ₹8K<span className="text-fire">–</span>₹35K
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ash">
              Typical monthly starting salary range after certification — experienced
              professionals earn ₹5 lakh+ annually.
            </p>
          </div>
        </Reveal>
      </div>

      {/* placed students */}
      <div className="mx-auto mt-20 max-w-[1600px] px-5 md:px-10">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.3em] text-smoke">
            Our placed students — as featured on pcfsm.org
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-7">
          {PLACED.map((s, i) => (
            <Reveal key={s.name} y={i < 2 ? 28 : 0} delay={i < 2 ? i * 0.08 : 0.12 + i * 0.04}>
              <div className="group">
                <div className="relative aspect-square overflow-hidden hairline">
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 14vw"
                    className="cine object-cover img-zoom"
                  />
                </div>
                <p className="mt-3 text-[12px] font-medium leading-tight text-bone">{s.name}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-fire">{s.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
