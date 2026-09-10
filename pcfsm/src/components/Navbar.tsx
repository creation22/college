"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { NAV, SITE } from "@/lib/data";
import { scrollToId } from "@/components/SmoothScroll";
import Magnetic from "@/components/ui/Magnetic";

function Logo() {
  return (
    <Link
      href="/"
      aria-label="PCFSM — home"
      className="group flex items-baseline gap-2 select-none"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <span className="display text-2xl tracking-tight text-bone">
        PCF<span className="text-fire">S</span>M
      </span>
      <span className="hidden sm:block text-[9px] uppercase tracking-[0.3em] text-smoke group-hover:text-ash transition-colors duration-300">
        Fire Engineering
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 32));

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => scrollToId(href), open ? 350 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled
            ? "bg-ink/72 backdrop-blur-xl border-b border-white/8"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 md:h-[72px] max-w-[1600px] items-center justify-between px-5 md:px-10">
          <Logo />

          <ul className="hidden lg:flex items-center gap-8">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={go(item.href)}
                  className="group relative text-[13px] uppercase tracking-[0.14em] text-ash hover:text-bone transition-colors duration-300"
                >
                  {item.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-fire transition-all duration-400 ease-out-expo group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Magnetic className="hidden sm:block" strength={0.25}>
              <a
                href={SITE.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-fire px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink transition-transform duration-150 ease-out active:scale-[0.97] hover:bg-ember"
              >
                Apply Now
                <span className="inline-block transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden>
                  ↗
                </span>
              </a>
            </Magnetic>

            <button
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="lg:hidden relative flex h-11 w-11 items-center justify-center"
            >
              <span className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 top-0 h-px w-full bg-bone transition-transform duration-300 ease-out-expo ${
                    open ? "translate-y-[5.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 bottom-0 h-px w-full bg-bone transition-transform duration-300 ease-out-expo ${
                    open ? "-translate-y-[5.5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-ink/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-1 flex-col justify-center gap-1 px-8 pt-16">
              {[...NAV, { label: "Apply Now", href: SITE.applyUrl }].map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={
                    item.href.startsWith("#")
                      ? go(item.href)
                      : undefined
                  }
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{
                    duration: 0.45,
                    ease: [0.19, 1, 0.22, 1],
                    delay: 0.08 + i * 0.06,
                  }}
                  className="display flex items-baseline gap-4 py-3 text-5xl text-bone active:text-fire"
                  {...(item.href.startsWith("#") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                >
                  <span className="text-xs text-fire tabular">0{i + 1}</span>
                  {item.label}
                  {item.href.startsWith("#") ? null : <span aria-hidden>↗</span>}
                </motion.a>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="border-t border-white/8 px-8 py-6 text-sm text-smoke"
            >
              <p>{SITE.email}</p>
              <p className="mt-1">{SITE.phone}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
