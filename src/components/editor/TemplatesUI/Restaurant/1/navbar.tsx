// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Flame, Menu, X } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const display = "font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif]";

export function Navbar({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const links = props?.links?.length
    ? props.links
    : [
      { label: "Menu", href: "#projects" },
      { label: "Our Story", href: "#about" },
      { label: "Reviews", href: "#testimonials" },
      { label: "Visit", href: "#contact" },
    ];

  const T = (key, def, as = "span") => (
    <Editable as={as} value={props?.[key] || def} onChange={(v) => onChange?.({ [key]: v })} />
  );
  const L = (i) => (
    <Editable
      as="span"
      value={links[i].label}
      onChange={(v) => onChange?.({ links: links.map((l, idx) => (idx === i ? { ...l, label: v } : l)) })}
    />
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (e, href, delay = 0) => {
    e.preventDefault();
    setOpen(false);
    window.setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, delay);
  };

  return (
    <>
      {/* Top bar: hidden on the landing screen, glides in after the hero */}
      <motion.header
        initial={false}
        animate={{ y: scrolled ? 0 : -130 }}
        transition={{ type: "spring", stiffness: 140, damping: 20 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className="relative mx-3 mt-3 flex items-center justify-between gap-4 rounded-full px-4 py-2.5 backdrop-blur-xl md:mx-auto md:max-w-6xl md:px-6"
          style={{
            background: `color-mix(in srgb, ${bg} 74%, transparent)`,
            border: `1px solid ${surface}`,
            color: ink,
          }}
        >
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5 text-left"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full" style={{ background: accent, color: inkSecond }}>
              <Flame className="h-4 w-4" />
            </span>
            <span className="text-base font-black uppercase tracking-[0.18em]">{T("brand", "Ember & Oak")}</span>
          </button>

          <div
            className="hidden items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider lg:flex"
            style={{ background: surface }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: accent }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: accent }} />
            </span>
            {T("status", "Fire's lit · open till 11PM")}
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l, i) => (
              <a
                key={i}
                href={l.href}
                onClick={(e) => go(e, l.href)}
                className="group relative px-3 py-2 text-sm font-bold uppercase tracking-wider"
              >
                {L(i)}
                <span
                  className="absolute bottom-1 left-3 right-3 h-[2px] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                  style={{ background: accent }}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              onClick={(e) => go(e, "#contact")}
              className="hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-black uppercase tracking-wider transition hover:scale-[1.02] active:scale-95 sm:inline-flex"
              style={{ background: accent, color: inkSecond }}
            >
              {T("cta", "Find us")}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full transition hover:scale-[1.02] active:scale-95 md:hidden"
              style={{ background: surface }}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          <motion.div
            className="absolute -bottom-px left-8 right-8 h-[2px] origin-left rounded-full"
            style={{ scaleX: progress, background: accent }}
          />
        </div>
      </motion.header>

      {/* Floating menu button on the landing screen */}
      <AnimatePresence>
        {!scrolled && !open && (
          <motion.button
            key="fab"
            type="button"
            aria-label="Open menu"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full shadow-2xl md:bottom-8 md:right-8"
            style={{ background: ink, color: inkSecond }}
          >
            <Menu className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto px-6 py-6 md:px-14"
            style={{ background: accent, color: inkSecond }}
            initial={{ clipPath: "circle(0% at 92% 92%)" }}
            animate={{ clipPath: "circle(150% at 92% 92%)" }}
            exit={{ clipPath: "circle(0% at 92% 92%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-full" style={{ background: inkSecond, color: accent }}>
                  <Flame className="h-5 w-5" />
                </span>
                <span className="text-lg font-black uppercase tracking-[0.18em]">{T("brand", "Ember & Oak")}</span>
              </div>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="grid h-12 w-12 place-items-center rounded-full transition hover:scale-[1.02] active:scale-95"
                style={{ background: inkSecond, color: ink }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="my-auto flex flex-col py-10">
              {links.map((l, i) => (
                <motion.a
                  key={i}
                  href={l.href}
                  onClick={(e) => go(e, l.href, 450)}
                  initial={{ y: 90, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35 + i * 0.09, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-baseline gap-4 border-b py-2 transition-all duration-300 hover:translate-x-3 md:py-3"
                  style={{ borderColor: `color-mix(in srgb, ${inkSecond} 22%, transparent)` }}
                >
                  <span className="font-mono text-xs font-bold opacity-60">0{i + 1}</span>
                  <span className={`${display} text-[15vw] uppercase leading-[0.95] md:text-[8vw]`}>{L(i)}</span>
                  <ArrowUpRight className="ml-auto hidden h-10 w-10 opacity-0 transition-all duration-300 group-hover:opacity-100 md:block" />
                </motion.a>
              ))}
            </nav>

            <div className="flex flex-col gap-1 text-sm font-bold uppercase tracking-wider md:flex-row md:justify-between">
              <span>{T("status", "Fire's lit · open till 11PM")}</span>
              <span className="opacity-70">{T("navAddress", "128 Alder Street, San Francisco")}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}