"use client";

import Image from "next/image";
import { NAV, SITE } from "@/lib/data";
import { scrollToId } from "@/components/SmoothScroll";

const PROGRAM_LINKS = [
  { label: "Fire Technology & Industrial Safety", href: "https://pcfsm.org/courses/fire-technology-and-industrial-safety/" },
  { label: "Industrial Safety", href: "https://pcfsm.org/courses/industrial-safety-officer-course/" },
  { label: "Certificate in Fireman", href: "https://pcfsm.org/courses/certificate-in-fireman/" },
  { label: "OSHE Management System", href: "https://pcfsm.org/courses/occupational-safety-health-environment-management-system/" },
  { label: "All Courses", href: "https://pcfsm.org/courses-fire-and-safety-course/" },
];

const CENTER_LINKS = ["Pune", "Aurangabad", "Navi Mumbai", "Thane", "Borivali", "Ratnagiri"];

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-night text-fog">
      {/* logo-color hairline — indigo → fire orange */}
      <div className="h-[2px] w-full bg-gradient-to-r from-indigo via-fire to-indigo" aria-hidden />

      {/* faint indigo glow behind the brand */}
      <div
        className="pointer-events-none absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full opacity-60"
        style={{ background: "radial-gradient(closest-side, rgba(63,63,149,0.28), transparent 70%)" }}
        aria-hidden
      />

      {/* giant watermark wordmark */}
      <p
        className="display pointer-events-none absolute -bottom-[3.5vw] right-0 hidden select-none text-[21vw] leading-none text-transparent md:block"
        style={{ WebkitTextStroke: "1px rgba(255,255,255,0.055)" }}
        aria-hidden
      >
        PCFSM
      </p>

      <div className="relative mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1.2fr] lg:gap-16">
          {/* brand */}
          <div>
            <div className="flex items-center gap-5">
              <Image
                src="/images/logo-light.png"
                alt="PCFSM emblem"
                width={72}
                height={72}
                className="h-14 w-14 object-contain md:h-16 md:w-16"
              />
              <div>
                <p className="display text-3xl text-[#f2f0eb] md:text-4xl">
                  PCF<span className="text-fire">S</span>M
                </p>
                <p className="mt-1.5 text-[10px] uppercase tracking-[0.3em] text-lav">
                  Est. {SITE.established} — MSBTE Affiliated
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-mist">
              {SITE.fullName} — fire engineering and industrial safety education since{" "}
              {SITE.established}. Recognized by the Government of Maharashtra, affiliated
              to MSBTE.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
              {SITE.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] uppercase tracking-[0.2em] text-mist transition-colors duration-300 hover:text-fire"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* explore */}
          <nav aria-label="Footer navigation">
            <p className="text-[10px] uppercase tracking-[0.3em] text-lav">Explore</p>
            <ul className="mt-5 space-y-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(n.href);
                    }}
                    className="text-sm text-fog transition-colors duration-300 hover:text-white"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* programs */}
          <nav aria-label="Programs">
            <p className="text-[10px] uppercase tracking-[0.3em] text-lav">Programs</p>
            <ul className="mt-5 space-y-3">
              {PROGRAM_LINKS.map((p) => (
                <li key={p.href}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-fog transition-colors duration-300 hover:text-white"
                  >
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* contact */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-lav">Contact</p>
            <address className="mt-5 space-y-3 text-sm not-italic leading-relaxed text-fog">
              <p>{SITE.address}</p>
              <p>
                <a
                  href={`mailto:${SITE.email}`}
                  className="transition-colors duration-300 hover:text-white"
                >
                  {SITE.email}
                </a>
              </p>
              <p>
                <a
                  href={SITE.phoneHref}
                  className="font-semibold text-fire transition-colors duration-300 hover:text-ember"
                >
                  {SITE.phone}
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* centers strip */}
        <div className="mt-14 border-t border-white/8 pt-8">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-lav">Learning Centers</p>
            {CENTER_LINKS.map((city) => (
              <span key={city} className="flex items-center gap-6 text-sm text-mist">
                {city}
                <span className="h-1 w-1 rounded-full bg-fire" aria-hidden />
              </span>
            ))}
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-10 flex flex-col gap-4 border-t border-white/8 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xs text-mist">
            © {new Date().getFullYear()} {SITE.fullName}. All rights reserved.
          </p>
          <p className="text-[10px] uppercase tracking-[0.32em] text-lav">
            Designed for the people who protect the world.
          </p>
          <div className="flex gap-6 text-xs text-mist">
            <a
              href="https://pcfsm.org/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-fog"
            >
              Privacy
            </a>
            <a
              href="https://pcfsm.org/terms-conditions/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-fog"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
