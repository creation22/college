"use client";

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
    <footer id="contact" className="relative border-t border-white/8 bg-coal">
      <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* brand */}
          <div>
            <p className="display text-4xl text-bone">
              PCF<span className="text-fire">S</span>M
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-smoke">
              {SITE.fullName} — fire engineering and industrial safety education since{" "}
              {SITE.established}. Recognized by the Government of Maharashtra, affiliated
              to MSBTE.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {SITE.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] uppercase tracking-[0.2em] text-smoke transition-colors duration-300 hover:text-fire"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* explore */}
          <nav aria-label="Footer navigation">
            <p className="text-[10px] uppercase tracking-[0.3em] text-fire">Explore</p>
            <ul className="mt-5 space-y-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(n.href);
                    }}
                    className="text-sm text-ash transition-colors duration-300 hover:text-bone"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* programs */}
          <nav aria-label="Programs">
            <p className="text-[10px] uppercase tracking-[0.3em] text-fire">Programs</p>
            <ul className="mt-5 space-y-3">
              {PROGRAM_LINKS.map((p) => (
                <li key={p.href}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ash transition-colors duration-300 hover:text-bone"
                  >
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* contact */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-fire">Contact</p>
            <address className="mt-5 space-y-3 text-sm not-italic leading-relaxed text-ash">
              <p>{SITE.address}</p>
              <p>
                <a href={`mailto:${SITE.email}`} className="transition-colors duration-300 hover:text-bone">
                  {SITE.email}
                </a>
              </p>
              <p>
                <a href={SITE.phoneHref} className="transition-colors duration-300 hover:text-bone">
                  {SITE.phone}
                </a>
              </p>
            </address>
            <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-smoke">
              Centers — {CENTER_LINKS.join(" · ")}
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/8 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-smoke">
            © {new Date().getFullYear()} {SITE.fullName}. All rights reserved.
          </p>
          <p className="text-[10px] uppercase tracking-[0.32em] text-smoke">
            Designed for the people who protect the world.
          </p>
          <div className="flex gap-6 text-xs text-smoke">
            <a href="https://pcfsm.org/privacy-policy/" target="_blank" rel="noopener noreferrer" className="transition-colors duration-300 hover:text-ash">Privacy</a>
            <a href="https://pcfsm.org/terms-conditions/" target="_blank" rel="noopener noreferrer" className="transition-colors duration-300 hover:text-ash">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
