// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function CreativePortfolio2Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#FFF4F8";
  const ink = theme?.ink || "#2B1720";
  const inkSecond = theme?.["ink-second"] || "#7A5362";
  const surface = theme?.surface || "rgba(83, 29, 51, 0.14)";
  const accent = theme?.accent || "#F03D87";

  return (
    <section
      id="home"
      className="border-b px-5 py-16 sm:px-8 lg:px-12 transition-colors font-serif"
      style={{
        backgroundColor: bg,
        color: ink,
        borderColor: surface,
      }}
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        {/* Left Headline Area */}
        <div className="lg:col-span-7">
          <p
            className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-6"
            style={{ color: accent }}
          >
            <Editable
              value={props?.overline || "Liza / London-based Senior Digital Product Designer"}
              onChange={(v) => onChange?.({ overline: v })}
            />
          </p>

          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[clamp(3.4rem,8vw,7.5rem)] font-bold tracking-[-0.08em] leading-[0.88]"
          >
            <Editable
              value={props?.headline || "Powered by problems, purpose and people."}
              onChange={(v) => onChange?.({ headline: v })}
            />
          </motion.h1>

          <p
            className="mt-8 max-w-md font-sans text-base sm:text-lg leading-relaxed"
            style={{ color: inkSecond }}
          >
            <Editable
              value={
                props?.lede ||
                "I make digital products and services better for everyone — clearer, kinder, and more useful."
              }
              onChange={(v) => onChange?.({ lede: v })}
            />
          </p>

          <a
            href="#projects"
            className="mt-8 inline-grid w-14 h-14 place-items-center rounded-full text-white shadow-lg transition-transform hover:scale-105"
            style={{ backgroundColor: accent }}
            aria-label="Scroll down"
          >
            <ArrowDownRight size={22} />
          </a>
        </div>

        {/* Right Pink Art Canvas */}
        <div className="lg:col-span-5 flex justify-center">
          <motion.div
            initial={{ opacity: 0, rotate: 4 }}
            animate={{ opacity: 1, rotate: -2 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
            style={{
              backgroundColor: "#F3AEC4",
              boxShadow: "16px 20px 0px rgba(249, 220, 232, 0.8)",
            }}
          >
            {/* Pink Art Sun */}
            <div
              className="absolute top-[12%] right-[10%] w-[42%] aspect-square rounded-full"
              style={{ backgroundColor: accent }}
            />

            {/* Pink Art Window */}
            <div
              className="absolute right-[12%] bottom-[12%] w-[46%] h-[50%] border-[14px] border-white rounded-xl shadow-xl transform rotate-6"
              style={{
                background: "linear-gradient(160deg, #F58CAF 0%, #FFF0F5 100%)",
              }}
            />

            {/* Typography Label inside art */}
            <div className="absolute left-[10%] top-[34%] text-5xl sm:text-6xl font-bold leading-none tracking-tight select-none">
              people<br />
              <i style={{ color: accent }}>first.</i>
            </div>

            <span className="absolute left-5 bottom-5 font-mono text-[9px] uppercase tracking-widest text-[#2B1720]/80">
              01 / Product Thinking
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
