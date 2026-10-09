// @ts-nocheck
import { motion } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";

export function CreativePortfolio4Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#050505";
  const bgSecond = theme?.["bg-second"] || "#111111";
  const ink = theme?.ink || "#F5F1EA";
  const inkSecond = theme?.["ink-second"] || "#9C978F";
  const surface = theme?.surface || "rgba(245, 241, 234, 0.16)";
  const accent = theme?.accent || "#FF5C35";

  return (
    <section
      id="home"
      className="relative min-h-[850px] overflow-hidden px-5 py-16 sm:px-8 lg:px-14 flex flex-col justify-between font-mono"
      style={{
        backgroundColor: bg,
        color: ink,
      }}
    >
      {/* Cinematic Ambient Glow Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          className="absolute -top-[10%] right-[5%] w-[45vw] h-[45vw] rounded-full blur-[110px] opacity-25"
          style={{ backgroundColor: accent }}
          animate={{
            transform: ["translate3d(0, 0, 0) scale(0.95)", "translate3d(10%, 10%, 0) scale(1.15)", "translate3d(0, 0, 0) scale(0.95)"],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[40%] -left-[10%] w-[40vw] h-[40vw] rounded-full blur-[120px] opacity-20 bg-[#6E3DFF]"
          animate={{
            transform: ["translate3d(0, 0, 0) scale(1.1)", "translate3d(-8%, -8%, 0) scale(0.9)", "translate3d(0, 0, 0) scale(1.1)"],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        {/* Subtle Scanlines & Grain */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Main Grid Content */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end my-auto pt-10 pb-8">
        {/* Left Column: Overline, Headline, Intro */}
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] font-semibold"
            style={{ color: accent }}
          >
            <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
            <Editable
              value={props?.kicker || "00:30 / PLAY"}
              onChange={(v) => onChange?.({ kicker: v })}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="mt-7 text-[clamp(4.2rem,11.5vw,11.5rem)] font-bold tracking-[-0.1em] leading-[0.76] select-none uppercase"
          >
            <span className="block">
              <Editable
                value={props?.title1 || "Make the"}
                onChange={(v) => onChange?.({ title1: v })}
              />
            </span>
            <span
              className="block font-serif italic font-semibold tracking-[-0.08em] lowercase my-1"
              style={{ color: accent }}
            >
              <Editable
                value={props?.titleAccent || "night"}
                onChange={(v) => onChange?.({ titleAccent: v })}
              />
            </span>
            <span className="block">
              <Editable
                value={props?.title2 || "memorable."}
                onChange={(v) => onChange?.({ title2: v })}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 max-w-md text-base sm:text-lg leading-relaxed font-sans"
            style={{ color: inkSecond }}
          >
            <Editable
              value={
                props?.intro ||
                "A black-box creative studio for films, identities, and visual worlds that stay with you after the screen goes dark."
              }
              onChange={(v) => onChange?.({ intro: v })}
            />
          </motion.p>
        </div>

        {/* Right Column: Giant Circular Interactive Reel Trigger */}
        <div className="lg:col-span-4 flex justify-start lg:justify-end pb-4">
          <a href="#about" className="group">
            <motion.div
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-full border grid place-items-center cursor-pointer transition-colors duration-300"
              style={{
                borderColor: surface,
                backgroundColor: "rgba(255,255,255,0.02)",
              }}
            >
              {/* Outer Pulse ring */}
              <div
                className="absolute inset-0 rounded-full border transition-transform duration-700 group-hover:scale-110 opacity-30"
                style={{ borderColor: accent }}
              />
              {/* Inner Accent Disc */}
              <div
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full grid place-items-center shadow-lg transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundColor: accent }}
              >
                <span className="font-mono text-xs uppercase font-bold text-black tracking-widest text-center leading-tight">
                  <Editable
                    value={props?.reelCta || "PLAY\nREEL"}
                    onChange={(v) => onChange?.({ reelCta: v })}
                  />
                </span>
              </div>
            </motion.div>
          </a>
        </div>
      </div>

      {/* Bottom Bar: Reel metadata */}
      <div
        className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t pt-6 text-[10px] uppercase tracking-[0.16em]"
        style={{ borderColor: surface, color: inkSecond }}
      >
        <span>NOX / MOVING IMAGE STUDIO</span>
        <span>SOUND ON / 4K / 24FPS</span>
        <span style={{ color: accent }}>SCROLL DOWN ↓</span>
      </div>
    </section>
  );
}
