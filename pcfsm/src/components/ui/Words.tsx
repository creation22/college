"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
};

/** Word-by-word heading reveal. Varies distance by word importance: first words travel furthest. */
export default function Words({ text, className, delay = 0, as = "h2" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const words = text.split(" ");
  const Tag = motion[as];

  return (
    <div ref={ref}>
      <Tag className={className} aria-label={text}>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
            <motion.span
              className="inline-block will-change-transform"
              aria-hidden
              initial={{ y: "110%", opacity: 0 }}
              animate={inView ? { y: "0%", opacity: 1 } : undefined}
              transition={{
                duration: 0.65,
                ease: [0.19, 1, 0.22, 1],
                delay: delay + i * 0.05,
              }}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </Tag>
    </div>
  );
}
