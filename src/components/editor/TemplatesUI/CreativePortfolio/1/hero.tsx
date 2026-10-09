// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function CreativePortfolio1Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || "#A7A9B3";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.09)";
  const accent = theme?.accent || "#3B82F6";

  return (
    <section
      id="home"
      className="relative min-h-[720px] overflow-hidden border-b px-5 py-8 sm:px-8 lg:px-14 flex flex-col justify-between"
      style={{
        backgroundColor: bg,
        color: ink,
        borderColor: surface,
      }}
    >
      {/* Topline Bar */}
      <div
        className="flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-[0.14em]"
        style={{ color: inkSecond }}
      >
        <span>
          <Editable
            value={props?.toplineLeft || "Selected work — 2021 / 2026"}
            onChange={(v) => onChange?.({ toplineLeft: v })}
          />
        </span>
        <a
          href="#projects"
          className="flex items-center gap-1.5 transition-colors hover:opacity-75"
          style={{ color: ink }}
        >
          <Editable
            value={props?.toplineRight || "Scroll to explore"}
            onChange={(v) => onChange?.({ toplineRight: v })}
          />
          <ArrowDownRight size={14} style={{ color: accent }} />
        </a>
      </div>

      {/* Main Hero Center Row */}
      <div className="relative my-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-10 pt-10 pb-12">
        {/* Left Headline Area */}
        <div className="relative z-10 lg:col-span-7">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-[clamp(4.2rem,13vw,12rem)] font-bold tracking-[-0.09em] leading-[0.82] select-none">
              <span className="block">
                <Editable
                  value={props?.title1 || "Ideas"}
                  onChange={(v) => onChange?.({ title1: v })}
                />
              </span>
              <span className="block">
                <Editable
                  value={props?.title2 || "made"}
                  onChange={(v) => onChange?.({ title2: v })}
                />
              </span>
              <span
                className="block font-serif italic font-semibold tracking-[-0.08em] ml-[4vw]"
                style={{ color: accent }}
              >
                <Editable
                  value={props?.title3 || "visible."}
                  onChange={(v) => onChange?.({ title3: v })}
                />
              </span>
            </h1>
          </motion.div>

          {/* Floating Sticker */}
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 8 }}
            transition={{ delay: 0.45, type: "spring", stiffness: 180 }}
            className="absolute left-[54%] top-[34%] sm:left-[56%] sm:top-[38%] z-20 flex flex-col justify-between w-[130px] h-[130px] sm:w-[145px] sm:h-[145px] rounded-full p-4 sm:p-5 shadow-xl select-none"
            style={{
              backgroundColor: "#CFB0FA",
              color: "#121212",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            <span className="text-xs sm:text-sm font-medium leading-tight">
              <Editable
                value={props?.stickerText || "Good design stays with you."}
                onChange={(v) => onChange?.({ stickerText: v })}
              />
            </span>
            <ArrowUpRight size={26} className="self-end" />
          </motion.div>
        </div>

        {/* Right Graphic Composition Area */}
        <div className="relative lg:col-span-5 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-[380px] sm:max-w-[440px] h-[340px] sm:h-[400px] rounded-3xl overflow-hidden shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #FFB800 0%, #E89A00 100%)",
              transform: "rotate(-3deg)",
            }}
          >
            {/* Geometric Orbit */}
            <div
              className="absolute top-10 left-8 w-[280px] h-[280px] rounded-full border border-black/30 pointer-events-none"
            />
            {/* Red Contrasting Disc */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 left-16 w-[180px] h-[180px] rounded-full shadow-lg"
              style={{ backgroundColor: accent }}
            />
            {/* Star Icon */}
            <span
              className="absolute top-8 right-8 text-4xl select-none text-black"
              aria-hidden="true"
            >
              ✦
            </span>
            <div className="absolute bottom-4 left-6 font-mono text-[9px] uppercase tracking-widest text-black/60">
              01 / Studio Identity
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero Bottom Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 pt-4">
        <p
          className="max-w-xs text-sm sm:text-base leading-relaxed"
          style={{ color: inkSecond }}
        >
          <Editable
            value={
              props?.intro ||
              "I build distinct identities and digital worlds for people making something worth noticing."
            }
            onChange={(v) => onChange?.({ intro: v })}
          />
        </p>

        {/* Index indicator */}
        <div
          className="flex items-center gap-3 font-mono text-[11px] w-40"
          style={{ color: inkSecond }}
        >
          <span>01</span>
          <span className="flex-1 h-[1px]" style={{ backgroundColor: surface }} />
          <span style={{ color: accent }}>04</span>
        </div>
      </div>
    </section>
  );
}
