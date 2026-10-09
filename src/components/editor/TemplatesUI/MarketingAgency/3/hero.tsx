// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowRight, Crosshair, Star } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#1A0103";
  const bgSecond = theme?.["bg-second"] || "#420205";
  const ink = theme?.ink || "#FFFFFF";
  const inkSecond = theme?.["ink-second"] || "#F8D4D4";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#E50914";
  const yellow = "#FFBF00";

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden px-4 pb-6 pt-24 md:px-8"
      style={{
        background: `radial-gradient(110% 90% at 50% 30%, ${bgSecond} 0%, #260103 45%, ${bg} 100%)`,
        color: ink,
      }}
    >
      {/* 1. Giant Outlined Watermark Text in Background */}
      <div
        className="pointer-events-none absolute inset-x-0 top-12 select-none text-center font-black uppercase tracking-tight opacity-15"
        style={{
          fontSize: "clamp(4.5rem, 16vw, 16rem)",
          lineHeight: "0.85",
          WebkitTextStroke: "2px rgba(255, 255, 255, 0.5)",
          color: "transparent",
        }}
      >
        Digital Growth
      </div>

      {/* 2. Horizontal Red Ribbon Banner behind the Figure */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[28%] h-20 -translate-y-1/2 opacity-95 md:h-28"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${accent} 20%, #FF1E27 50%, ${accent} 80%, transparent 100%)`,
          boxShadow: `0 0 80px ${accent}`,
        }}
      />

      {/* 3. Centerpiece: Crown Figure + Overlapping Monumental Flared Typography */}
      <div className="relative z-10 mx-auto my-auto w-full max-w-7xl text-center">
        <div className="relative mx-auto flex items-center justify-center">
          {/* Centered Veiled Figure with Gold Crown */}
          <div className="relative z-10 mx-auto w-72 max-w-[85vw] md:w-[26rem] lg:w-[30rem]">
            <img
              src={props?.heroImage || "/crown_figure_red.jpg"}
              alt="Marketing Agency Crown"
              className="relative z-10 mx-auto h-[26rem] w-full object-cover object-top md:h-[36rem] lg:h-[40rem]"
              style={{
                maskImage: "linear-gradient(180deg, #000 70%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(180deg, #000 70%, transparent 100%)",
              }}
            />

            {/* Red Eye Graphic Plate over Face (exact reference detail) */}
            <div
              className="pointer-events-none absolute left-1/2 top-[44%] z-20 h-16 w-12 -translate-x-1/2 -translate-y-1/2 rounded shadow-2xl md:h-20 md:w-16"
              style={{
                background: "linear-gradient(180deg, #D6000B, #8B0007)",
                border: "1px solid rgba(255,255,255,0.4)",
              }}
            >
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
                <span className="h-6 w-8 rounded-full border-2 border-black bg-white shadow-inner flex items-center justify-center">
                  <span className="h-3 w-3 rounded-full bg-black" />
                </span>
              </div>
            </div>
          </div>

          {/* Giant Monumental Flared Display Title Overlapping Figure: "Market Agency" */}
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-between px-2 md:px-6">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}>
              <Editable
                as="h1"
                className="pointer-events-auto select-none font-serif text-[clamp(3.8rem,13vw,13.5rem)] font-black uppercase leading-none tracking-tight text-white drop-shadow-2xl"
                style={{
                  fontFamily: "'Playfair Display', 'Cinzel', serif",
                  textShadow: "0 10px 40px rgba(0,0,0,0.8)",
                }}
                value={props?.headline || "Market"}
                onChange={(v) => onChange?.({ headline: v })}
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}>
              <Editable
                as="h1"
                className="pointer-events-auto select-none font-serif text-[clamp(3.8rem,13vw,13.5rem)] font-black uppercase leading-none tracking-tight text-white drop-shadow-2xl"
                style={{
                  fontFamily: "'Playfair Display', 'Cinzel', serif",
                  textShadow: "0 10px 40px rgba(0,0,0,0.8)",
                }}
                value={props?.headline2 || "Agency"}
                onChange={(v) => onChange?.({ headline2: v })}
              />
            </motion.div>
          </div>
        </div>

        {/* Small Central Manifesto Line under Title (exact from image) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative z-30 mx-auto -mt-6 max-w-2xl px-4"
        >
          <Editable
            as="p"
            className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/90 md:text-xs"
            value={
              props?.storyIntro ||
              "OUR STORY BEGAN IN 2014 WITH A SIMPLE IDEA: TO TRANSFORM AMBITIOUS BRANDS THROUGH MEANINGFUL DIGITAL EXPERIENCES. 10 YEARS OF RESULTS, BUILT ON TRUE RELATIONSHIPS."
            }
            onChange={(v) => onChange?.({ storyIntro: v })}
          />
        </motion.div>
      </div>

      {/* 4. Bottom Grid Bar: Left Statement, Center CTA, Right Coordinates & Badge */}
      <div className="relative z-30 mx-auto mt-6 w-full max-w-7xl pt-4">
        <div className="grid items-end gap-6 md:grid-cols-12">
          {/* Bottom Left: Bold Statement with Gold Highlight */}
          <div className="md:col-span-5">
            <div className="space-y-0.5">
              <Editable
                as="p"
                className="text-2xl font-black uppercase leading-[1.05] tracking-tight text-white md:text-3xl lg:text-4xl"
                value={props?.subheadline || "We believe marketing should"}
                onChange={(v) => onChange?.({ subheadline: v })}
              />
              <Editable
                as="p"
                className="text-2xl font-black uppercase leading-[1.05] tracking-tight md:text-3xl lg:text-4xl"
                style={{ color: yellow }}
                value={props?.subheadlineGold || "be simple, smart and effective."}
                onChange={(v) => onChange?.({ subheadlineGold: v })}
              />
            </div>

            {/* Sub-glyphs and Data-Driven Line */}
            <div className="mt-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-wider text-white/70">
              <span className="flex items-center gap-1 text-white">
                <span className="grid h-4 w-4 place-items-center border border-white/50 text-[9px] font-mono">+</span>
                <span className="grid h-4 w-4 place-items-center border border-white/50 text-[9px] font-mono">×</span>
                <span className="grid h-4 w-4 place-items-center border border-white/50 text-[9px] font-mono">●</span>
              </span>
              <span>Data-Driven Insights. Accelerating Growth.</span>
            </div>
          </div>

          {/* Bottom Center: Red Capsule "ABOUT US" Button */}
          <div className="flex justify-center md:col-span-2">
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-xs font-black uppercase tracking-widest text-white shadow-2xl transition hover:scale-105 active:scale-95"
              style={{
                background: accent,
                boxShadow: `0 0 25px ${accent}`,
              }}
            >
              <Editable as="span" value={props?.cta || "About Us"} onChange={(v) => onChange?.({ cta: v })} />
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Bottom Right: Coordinates, Smart Marketing, Glowing Pill */}
          <div className="flex flex-col items-start gap-3 md:col-span-5 md:items-end md:text-right">
            {/* Coordinates */}
            <div className="font-serif text-xs font-bold uppercase tracking-[0.25em]" style={{ color: yellow }}>
              40.7128° N, 74.0060° W
            </div>

            {/* Highlighted text */}
            <div className="max-w-xs text-xs font-black uppercase tracking-wider text-white">
              Smart-Marketing that{" "}
              <span style={{ color: yellow }}>converts clicks</span> into customers.{" "}
              <span style={{ color: yellow }}>★</span>
            </div>

            {/* Glowing Gradient Tag Pill */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider text-black shadow-lg"
              style={{
                background: "linear-gradient(90deg, #FF1E27 0%, #FF8C00 100%)",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-black animate-ping" />
              <Editable as="span" value={props?.badge || "*0125 — TRUST"} onChange={(v) => onChange?.({ badge: v })} />
            </div>
          </div>
        </div>

        {/* Bottom Hairline Footer Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between border-t pt-3 text-[10px] font-mono font-bold uppercase tracking-widest text-white/40" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            <span>EST. 2014 / INDEPENDENT REIGN</span>
          </div>
          <div>ALEXANDER PARK COPYRIGHT © 2026</div>
        </div>
      </div>
    </section>
  );
}
