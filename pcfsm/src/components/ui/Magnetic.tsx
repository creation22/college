"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type Props = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
};

/** Magnetic hover — the content leans toward the cursor. Pointer-fine devices only (gated by parent CSS). */
export default function Magnetic({ children, className, strength = 0.3 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
