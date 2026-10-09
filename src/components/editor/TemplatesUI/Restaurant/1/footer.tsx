// @ts-nocheck
"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowUp, Flame } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const display = "font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif]";

export function Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const links = props?.links?.length
    ? props.links
    : [
      { label: "The Menu", href: "#projects" },
      { label: "Our Story", href: "#about" },
      { label: "Reviews", href: "#testimonials" },
      { label: "Visit Us", href: "#contact" },
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
  const go = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="relative w-full overflow-hidden" style={{ background: inkSecond, color: ink }}>
      <div
        className="pointer-events-none absolute -left-32 top-0 h-[50vmin] w-[50vmin] rounded-full opacity-25 blur-3xl"
        style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 65%)` }}
      />

      <div className="relative mx-auto max-w-7xl px-5 pt-20 md:px-10">
        <div className="grid gap-14 md:grid-cols-[1.6fr_1fr_1fr_auto]">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="grid h-11 w-11 place-items-center rounded-full" style={{ background: accent, color: inkSecond }}>
                <Flame className="h-5 w-5" />
              </span>
              <span className="text-lg font-black uppercase tracking-[0.18em]">{T("brand", "Ember & Oak")}</span>
            </div>
            <p className="mt-5 text-sm leading-relaxed opacity-75">
              {T("summary", "A neighborhood wood-fired kitchen serving hand-rolled pasta, blistered pizza and seasonal plates since 2012.")}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em]" style={{ background: surface }}>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: accent }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: accent }} />
              </span>
              {T("status", "Kitchen open · fire's lit")}
            </div>
          </div>

          <div>
            <div className="text-xs font-black uppercase tracking-[0.25em]" style={{ color: accent }}>
              {T("col1Title", "Explore")}
            </div>
            <ul className="mt-5 space-y-3">
              {links.map((l, i) => (
                <li key={i}>
                  <a
                    href={l.href}
                    onClick={(e) => go(e, l.href)}
                    className="inline-block text-sm font-bold uppercase tracking-wider opacity-80 transition-all duration-300 hover:translate-x-1 hover:opacity-100"
                  >
                    {L(i)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-black uppercase tracking-[0.25em]" style={{ color: accent }}>
              {T("col2Title", "Find us")}
            </div>
            <ul className="mt-5 space-y-3 text-sm font-semibold uppercase leading-relaxed tracking-wider opacity-80">
              <li>{T("addressLine", "128 Alder Street, San Francisco")}</li>
              <li>{T("hoursLine", "Mon – Sat 5PM – late")}</li>
              <li>{T("hoursLine2", "Sunday 12PM – 9PM")}</li>
              <li>{T("phoneLine", "+1 (415) 555-0142")}</li>
            </ul>
          </div>

          <div className="md:justify-self-end">
            <motion.button
              type="button"
              aria-label="Back to top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={{ y: -6 }}
              className="grid h-16 w-16 place-items-center rounded-full transition hover:scale-[1.02] active:scale-95"
              style={{ background: accent, color: inkSecond }}
            >
              <ArrowUp className="h-6 w-6" />
            </motion.button>
          </div>
        </div>

        <div
          className="mt-16 flex flex-col items-start justify-between gap-3 border-t py-6 text-[11px] font-bold uppercase tracking-[0.18em] opacity-70 sm:flex-row"
          style={{ borderColor: surface }}
        >
          <span>{T("copyright", "© 2026 Ember & Oak. All rights reserved.")}</span>
          <span>{T("tagline", "Cooked over real fire")}</span>
        </div>
      </div>
    </footer>
  );
}