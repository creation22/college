import { STATS } from "@/lib/data";

function statDisplay(stat: (typeof STATS)[number]) {
  if (stat.value === null) return "Multiple";
  if (stat.value === 1999) return "1999";
  return stat.value >= 1000
    ? `${stat.value.toLocaleString("en-IN")}${stat.suffix}`
    : `${stat.value}${stat.suffix}`;
}

function statLabel(stat: (typeof STATS)[number]) {
  return stat.value === null ? "Centers — across India" : `${stat.unit} — ${stat.note}`;
}

export default function Stats() {
  return (
    <section
      className="marquee-hover-pause relative overflow-hidden border-y border-white/8 bg-night"
      aria-label="PCFSM in numbers"
    >
      <div className="flex w-max animate-marquee items-center whitespace-nowrap will-change-transform">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
            {STATS.map((stat) => (
              <span key={`${copy}-${stat.unit}`} className="flex items-center gap-4 px-7 py-5 md:gap-5 md:px-10 md:py-6">
                <span className="display text-3xl text-[#f2f0eb] tabular md:text-4xl">
                  {statDisplay(stat)}
                </span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-mist">
                  {statLabel(stat)}
                </span>
                <span className="ml-6 h-1.5 w-1.5 rounded-full bg-fire md:ml-10" aria-hidden />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
