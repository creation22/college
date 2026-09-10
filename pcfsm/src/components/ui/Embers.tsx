"use client";

import { useMemo } from "react";

/** Rising ember particles — pure CSS keyframes, transform/opacity only, disabled under reduced-motion. */
export default function Embers({
  count = 16,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const embers = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${(i * 61) % 100}%`,
        size: 2 + ((i * 7) % 3),
        delay: `${((i * 13) % 90) / 10}s`,
        duration: `${7 + ((i * 11) % 60) / 10}s`,
        drift: `${((i % 5) - 2) * 1.6}vw`,
        opacity: 0.4 + ((i * 17) % 40) / 100,
        bottom: `${(i * 29) % 40}%`,
      })),
    [count]
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {embers.map((e, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-ember animate-ember"
          style={
            {
              left: e.left,
              bottom: e.bottom,
              width: e.size,
              height: e.size,
              animationDelay: e.delay,
              animationDuration: e.duration,
              "--ember-drift": e.drift,
              "--ember-opacity": e.opacity,
              boxShadow: "0 0 8px 1px rgba(255,110,50,0.6)",
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
