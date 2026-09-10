/** Water bursting out of the video frame — flowing streams + flying droplets.
 *  Deterministic values, transform/opacity only, disabled under reduced-motion. */
const DROPS = Array.from({ length: 14 }, (_, i) => ({
  dx: -70 - ((i * 37) % 120),
  dy: ((i * 29) % 90) - 50,
  size: 3 + (i % 4),
  dur: `${(0.9 + ((i * 13) % 50) / 100).toFixed(2)}s`,
  delay: `${((i * 17) % 100) / 100}s`,
  lav: i % 3 === 0,
}));

const STREAMS = [
  { d: "M200 80 C 150 70, 90 40, 8 18", o: 0.5, w: 2.5 },
  { d: "M200 82 C 150 80, 100 70, 12 62", o: 0.65, w: 3 },
  { d: "M200 84 C 150 92, 100 105, 10 118", o: 0.55, w: 2.5 },
  { d: "M200 86 C 160 100, 135 124, 112 150", o: 0.35, w: 2 },
];

export default function WaterSpray({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute ${className}`} aria-hidden>
      <svg viewBox="0 0 200 160" className="absolute inset-0 h-full w-full" fill="none">
        {STREAMS.map((s) => (
          <path
            key={s.d}
            d={s.d}
            className="stream"
            stroke="#3f3f95"
            strokeWidth={s.w}
            strokeLinecap="round"
            opacity={s.o}
          />
        ))}
      </svg>
      {/* nozzle anchor on the frame edge */}
      <span className="absolute right-0 top-[78px] h-1.5 w-1.5 rounded-full bg-indigo" />
      {/* droplets flying out of the frame */}
      {DROPS.map((d, i) => (
        <span
          key={i}
          className={`animate-splash absolute right-1 rounded-full ${d.lav ? "bg-lav" : "bg-indigo"}`}
          style={
            {
              top: 80 - d.size / 2,
              width: d.size,
              height: d.size,
              "--dx": `${d.dx}px`,
              "--dy": `${d.dy}px`,
              "--dur": d.dur,
              "--delay": d.delay,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
