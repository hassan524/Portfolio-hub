// @ts-nocheck
"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Flame } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const display = "font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif]";

export function Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 16 });
  const sy = useSpring(my, { stiffness: 70, damping: 16 });
  const plateX = useTransform(sx, [-1, 1], [-26, 26]);
  const plateY = useTransform(sy, [-1, 1], [-18, 18]);
  const scrollRotate = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const plateScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const headY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const infoY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const receiptX = useTransform(sx, [-1, 1], [14, -14]);
  const receiptRot = useTransform(sx, [-1, 1], [-9, -3]);

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  const rows = props?.receiptRows?.length
    ? props.receiptRows
    : [
      { name: "00 Flour", weight: "180G" },
      { name: "San Marzano Tomato", weight: "120G" },
      { name: "Fior di Latte", weight: "110G" },
      { name: "Fresh Basil", weight: "6G" },
      { name: "Olive Oil", weight: "12G" },
      { name: "Sea Salt", weight: "3G" },
    ];
  const stats = props?.stats?.length
    ? props.stats
    : [
      { value: "12", label: "Years of fire" },
      { value: "4.9", label: "Guest rating" },
      { value: "60+", label: "Dishes a season" },
    ];

  const T = (key, def, as = "span") => (
    <Editable as={as} value={props?.[key] || def} onChange={(v) => onChange?.({ [key]: v })} />
  );
  const R = (i, field) => (
    <Editable
      as="span"
      value={rows[i][field] ?? ""}
      onChange={(v) => onChange?.({ receiptRows: rows.map((r, idx) => (idx === i ? { ...r, [field]: v } : r)) })}
    />
  );
  const S = (i, field) => (
    <Editable
      as="span"
      value={stats[i][field] ?? ""}
      onChange={(v) => onChange?.({ stats: stats.map((s, idx) => (idx === i ? { ...s, [field]: v } : s)) })}
    />
  );
  const go = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-[100svh] w-full flex-col items-center overflow-hidden px-5 pb-8 pt-6 md:px-10"
      style={{ background: bg, color: ink }}
    >
      {/* soft glow behind the plate */}
      <div
        className="pointer-events-none absolute left-1/2 top-[52%] h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
        style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 65%)` }}
      />

      {/* top row (no navbar on the landing screen) */}
      <div className="relative z-30 flex w-full items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-2.5"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full" style={{ background: accent, color: inkSecond }}>
            <Flame className="h-5 w-5" />
          </span>
          <span className="text-lg font-black uppercase tracking-[0.18em]">{T("brand", "Ember & Oak")}</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md md:text-xs"
          style={{ background: surface }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: accent }} />
            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: accent }} />
          </span>
          {T("status", "Fire's lit · open till 11PM")}
        </motion.div>
      </div>

      {/* giant headline */}
      <motion.div style={{ y: headY }} className="relative z-10 mt-6 w-full text-center md:mt-2">
        <div className="overflow-hidden pt-2">
          <motion.div
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className={`${display} break-words text-[17vw] uppercase leading-[0.84] sm:text-[13vw] lg:text-[10.5vw]`}
          >
            {T("headline1", "Wood-Fired", "h1")}
          </motion.div>
        </div>
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className={`${display} break-words text-[17vw] uppercase leading-[0.84] sm:text-[13vw] lg:text-[10.5vw]`}
          >
            {T("headline2", "Margherita")}
          </motion.div>
        </div>
      </motion.div>

      {/* plate */}
      <div className="relative z-20 -mt-[7vw] aspect-square w-[min(74vw,46svh)] sm:-mt-[5vw] lg:-mt-[3.5vw]">
        <div
          className="absolute -bottom-5 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-full opacity-50 blur-2xl"
          style={{ background: inkSecond }}
        />
        <motion.div style={{ x: plateX, y: plateY, rotate: scrollRotate, scale: plateScale }} className="relative h-full w-full">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 70, ease: "linear", repeat: Infinity }}
            className="h-full w-full"
          >
            <motion.img
              initial={{ scale: 0.4, opacity: 0, rotate: -120 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              src={props?.plateImage || "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80"}
              alt="Signature dish"
              draggable={false}
              className="h-full w-full select-none rounded-full object-cover"
              style={{ boxShadow: `0 40px 90px -25px ${inkSecond}` }}
            />
          </motion.div>
        </motion.div>

        {/* signature badge */}
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 12, delay: 1.1 }}
          className="absolute -right-3 top-2 z-30 sm:-right-8 lg:-right-16 lg:top-6"
        >
          <motion.div
            animate={{ y: [0, -9, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative grid h-24 w-24 place-items-center rounded-full md:h-28 md:w-28"
            style={{ background: inkSecond, color: ink }}
          >
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 18, ease: "linear", repeat: Infinity }}
              className="absolute inset-1.5 rounded-full border-2 border-dashed"
              style={{ borderColor: accent }}
            />
            <div className="relative flex flex-col items-center gap-0.5 text-center">
              <Flame className="h-5 w-5" style={{ color: accent }} />
              <span className="px-3 text-[9px] font-black uppercase leading-tight tracking-[0.14em] md:text-[10px]">
                {T("badge", "Chef's signature")}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* receipt */}
      <motion.div
        style={{ x: receiptX, rotate: receiptRot }}
        initial={{ y: -220, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 70, damping: 14, delay: 0.9 }}
        className="relative z-20 mt-12 w-[250px] lg:absolute lg:left-[4%] lg:top-[34%] lg:mt-0"
      >
        <div className="p-4 shadow-2xl" style={{ background: ink, color: inkSecond }}>
          <div className={`${display} text-2xl uppercase tracking-wide`}>{T("receiptTitle", "Ingredients")}</div>
          <div className="mt-2 font-mono text-[10px] font-bold uppercase leading-5">
            {T("receiptMeta", "Date : 09/10/2026 · Cook : Marco.R")}
          </div>
          <div className="my-3 border-t border-dashed" style={{ borderColor: inkSecond }} />
          <ul className="space-y-1.5 font-mono text-[11px] font-bold uppercase">
            {rows.map((r, i) => (
              <li key={i} className="flex items-baseline justify-between gap-3">
                <span className="flex items-baseline gap-1.5">
                  <span className="h-1 w-1 shrink-0 rounded-full" style={{ background: inkSecond }} />
                  {R(i, "name")}
                </span>
                <span className="shrink-0">{R(i, "weight")}</span>
              </li>
            ))}
          </ul>
          <div className="my-3 border-t border-dashed" style={{ borderColor: inkSecond }} />
          <div className="flex justify-between font-mono text-[11px] font-bold uppercase">
            <span>{T("totalLabel", "Total weight")}</span>
            <span>{T("totalWeight", "431G")}</span>
          </div>
          <div className="mt-1 flex justify-between font-mono text-[11px] font-bold uppercase">
            <span>{T("kcalLabel", "Calories")}</span>
            <span>{T("kcal", "820KCAL")}</span>
          </div>
          <div className="my-3 border-t border-dashed" style={{ borderColor: inkSecond }} />
          <div className="font-mono text-[10px] font-bold uppercase leading-4">{T("allergens", "Allergens: gluten, dairy.")}</div>
        </div>
      </motion.div>

      {/* dish blurb + price */}
      <motion.div
        style={{ y: infoY }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.2 }}
        className="relative z-20 mt-8 max-w-[270px] text-center lg:absolute lg:right-[4%] lg:top-[40%] lg:mt-0 lg:text-left"
      >
        <div className="font-mono text-[11px] font-bold uppercase leading-relaxed tracking-[0.12em]">
          {T("dishBlurb", "Slow-proofed dough, crushed San Marzano tomato, fior di latte and fresh basil, fired at 485°C for ninety seconds.")}
        </div>
        <div className={`${display} mt-4 text-6xl leading-none`} style={{ color: accent }}>
          {T("dishPrice", "$16")}
        </div>
      </motion.div>

      {/* bottom row */}
      <div className="relative z-30 mt-10 flex w-full flex-col items-center gap-7 md:mt-auto md:flex-row md:justify-between md:pt-10">
        <div className="hidden items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] md:flex md:w-1/3">
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="grid h-9 w-9 place-items-center rounded-full"
            style={{ background: surface }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
          {T("scrollHint", "Scroll to taste the menu")}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projects"
            onClick={(e) => go(e, "#projects")}
            className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-black uppercase tracking-wider transition hover:scale-[1.02] active:scale-95"
            style={{ background: accent, color: inkSecond, boxShadow: `0 18px 50px -12px ${accent}` }}
          >
            {T("ctaPrimary", "Explore the menu")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            onClick={(e) => go(e, "#contact")}
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-black uppercase tracking-wider backdrop-blur-md transition hover:scale-[1.02] active:scale-95"
            style={{ background: surface, color: ink }}
          >
            {T("ctaSecondary", "Visit the kitchen")}
          </a>
        </div>

        <div className="flex gap-7 md:w-1/3 md:justify-end">
          {stats.map((s, i) => (
            <div key={i} className="text-center md:text-right">
              <div className={`${display} text-3xl leading-none`} style={{ color: accent }}>
                {S(i, "value")}
              </div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] opacity-80">{S(i, "label")}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}