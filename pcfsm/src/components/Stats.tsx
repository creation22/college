"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { STATS } from "@/lib/data";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.19, 1, 0.22, 1],
      onUpdate: (v) =>
        setDisplay(
          value >= 1000 ? Math.round(v).toLocaleString("en-IN") : String(Math.round(v))
        ),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular">
      {display}
      <span className="text-fire">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  const reduced = useReducedMotion();

  return (
    <section className="relative border-y border-white/8 bg-coal" aria-label="PCFSM in numbers">
      <div className="mx-auto max-w-[1600px]">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.unit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{
              duration: reduced ? 0 : 0.6,
              ease: [0.19, 1, 0.22, 1],
              delay: reduced ? 0 : i * 0.08,
            }}
            className={`flex flex-col gap-1 px-5 py-8 md:flex-row md:items-baseline md:justify-between md:px-10 md:py-10 ${
              i > 0 ? "border-t border-white/8" : ""
            }`}
          >
            <div className="display text-[11vw] leading-none text-bone md:text-[5.4vw]">
              {stat.value !== null ? (
                reduced ? (
                  <span className="tabular">
                    {stat.value.toLocaleString("en-IN")}
                    <span className="text-fire">{stat.suffix}</span>
                  </span>
                ) : (
                  <Counter value={stat.value} suffix={stat.suffix} />
                )
              ) : (
                <span>
                  MULTIPLE <span className="text-outline">CENTERS</span>
                </span>
              )}
            </div>
            <div className="text-right">
              <p className="text-[11px] uppercase tracking-[0.28em] text-fire">{stat.unit}</p>
              <p className="mt-1 text-sm text-smoke">{stat.note}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
