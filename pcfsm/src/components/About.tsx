"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { RECOGNITION, SITE } from "@/lib/data";
import { useIsMobile, useWebGL } from "@/lib/hooks";
import Reveal from "@/components/ui/Reveal";
import Words from "@/components/ui/Words";
import SectionTag from "@/components/ui/SectionTag";

const CylinderScene = dynamic(() => import("@/three/HeroScene"), { ssr: false });

export default function About() {
  const imgWrap = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const webgl = useWebGL();
  const [sceneActive, setSceneActive] = useState(false);

  const { scrollYProgress } = useScroll({
    target: imgWrap,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  useEffect(() => {
    if (!imgWrap.current) return;
    const io = new IntersectionObserver(([entry]) => setSceneActive(entry.isIntersecting), {
      rootMargin: "80px",
    });
    io.observe(imgWrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="about" className="relative scroll-mt-20 bg-ink py-24 md:py-36">
      {/* vertical label */}
      <div className="pointer-events-none absolute left-5 top-24 hidden xl:block" aria-hidden>
        <span className="text-[10px] uppercase tracking-[0.4em] text-smoke [writing-mode:vertical-rl] rotate-180">
          01 / About PCFSM
        </span>
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-14 px-5 md:px-10 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <div>
          <Reveal>
            <SectionTag index="01" label="About PCFSM" className="xl:hidden" />
          </Reveal>
          <Words
            text="BUILDING THE PEOPLE WHO PROTECT THE WORLD."
            className="display mt-6 text-[10.5vw] leading-[0.95] text-bone md:text-[6vw] lg:text-[4.6vw]"
          />
          <Reveal delay={0.15} className="mt-10 max-w-xl">
            <p className="text-lg leading-relaxed text-ash">
              Since {SITE.established}, PCFSM has trained fire engineering and industrial
              safety professionals through a simple conviction — safety is a science, and it
              is learned by doing. Diploma, post-diploma, graduation and specialized
              certification programs, taught on real equipment, on real grounds.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-12">
            <ul className="divide-y divide-black/10 border-y border-black/10">
              {RECOGNITION.map((item) => (
                <li key={item} className="flex items-start gap-4 py-4">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-fire" aria-hidden />
                  <span className="text-sm leading-relaxed text-ash">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="flex flex-col gap-6">
          <div
            ref={imgWrap}
            className="group relative aspect-[4/5] overflow-hidden hairline vignette"
          >
            {webgl === true ? (
              /* the cylinder — interactive 3D sculpture, renders only while in view */
              <div className="absolute inset-0" aria-hidden>
                <CylinderScene
                  still={!!reduced}
                  simple={mobile}
                  active={sceneActive}
                  drift={false}
                />
              </div>
            ) : (
              /* no-WebGL fallback — the photograph */
              <motion.div
                style={reduced ? undefined : { y: parallaxY }}
                className="absolute inset-[-10%]"
              >
                <Image
                  src="/images/campus/about.webp"
                  alt="PCFSM — safety officer in the field"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="cine object-cover"
                />
              </motion.div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" aria-hidden />
            <p className="absolute bottom-5 left-5 right-5 text-[11px] uppercase tracking-[0.24em] text-bone/80">
              Safety engineering, practiced — not just taught
            </p>
          </div>
          <Reveal delay={0.1}>
            <div className="glass p-6 md:p-7">
              <p className="text-[11px] uppercase tracking-[0.28em] text-indigo">Leadership</p>
              <p className="mt-3 text-base font-medium text-bone">
                Mr. Nandkishor S. Mandavkar — Chief Managing Director
              </p>
              <p className="mt-2 text-sm leading-relaxed text-smoke">
                Ex-Indian Air Force officer. Gold Medalist Fire Safety Officer, Ministry of
                Home Affairs, Government of India. Chairman, Disaster Management Federation,
                Pune.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
