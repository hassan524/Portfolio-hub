// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { motion } from "framer-motion";
import hero from "./public/pantry-hero.jpg";

export function Bakery1Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#faf9f6";
  const ink = theme?.ink || "#1a1a1a";
  const accent = theme?.accent || "#e85d3d";
  const fontHeading = theme?.fontHeading || "Fraunces";
  const fontBody = theme?.fontBody || "Inter";

  return (
    <section
      id="home"
      className="relative isolate min-h-[92vh] md:min-h-[96vh] w-full flex items-center py-28 md:py-36"
      style={{ backgroundColor: bg, color: ink, fontFamily: fontBody }}
    >
      {/* Dedicated background wrapper with strict overflow-hidden so nothing spills out */}
      <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden pointer-events-none">
        <img
          src={hero}
          alt="Pantry bakery hero"
          className="h-full w-full object-cover object-center"
        />

        {/* Seamless full dark overlay extending completely from top to bottom with zero light gap */}
        <div
          className="absolute -top-1 -bottom-1 -left-1 -right-1 pointer-events-none"
          style={{
            background: `
              linear-gradient(180deg, rgba(20, 14, 11, 0.95) 0%, rgba(20, 14, 11, 0.82) 35%, rgba(20, 14, 11, 0.88) 100%),
              linear-gradient(90deg, rgba(20, 14, 11, 0.96) 0%, rgba(20, 14, 11, 0.72) 55%, rgba(20, 14, 11, 0.40) 100%)
            `,
          }}
        />
      </div>

      <div className="mx-auto flex w-full max-w-7xl items-center px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-2xl text-white"
        >
          {/* Animated Rising Steam / Smoke Effect */}
          <div className="flex items-center gap-3 mb-5">
            <div className="relative flex items-center justify-center w-8 h-8">
              <motion.svg
                viewBox="0 0 24 24"
                fill="none"
                stroke={accent}
                strokeWidth="1.5"
                strokeLinecap="round"
                className="w-6 h-6"
                animate={{ y: [-2, -6, -2], opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <path d="M8 19c0-2 2-3 2-5s-2-3-2-5 2-3 2-5" />
                <path d="M14 19c0-2 2-3 2-5s-2-3-2-5 2-3 2-5" />
              </motion.svg>
            </div>
            <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: accent }} />
            <Editable
              as="p"
              className="text-xs font-bold uppercase tracking-widest text-amber-200/90"
              value="01 — Freshly Baked Daily at Dawn"
            />
          </div>

          <Editable
            as="h1"
            className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-white leading-[1.08]"
            style={{ fontFamily: fontHeading }}
            value={props.headline || "Bread made with love, patience & tradition."}
            onChange={(headline) => onChange?.({ headline })}
          />

          <Editable
            as="p"
            className="mt-6 max-w-lg text-lg leading-8 opacity-90 font-light text-neutral-200"
            value={props.intro || "Small-batch pastries, wild-ferment sourdoughs, and seasonal treats baked fresh every morning in our open brick kitchen."}
            onChange={(intro) => onChange?.({ intro })}
          />

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="#about"
              className="inline-flex items-center gap-3 text-sm font-semibold text-white px-8 py-4 rounded-full shadow-2xl transition-all cursor-pointer"
              style={{ backgroundColor: accent }}
            >
              <Editable value="Discover our story" />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </motion.a>
            <a
              href="#work"
              className="text-sm font-medium text-white/90 hover:text-white underline underline-offset-8 transition-colors cursor-pointer"
            >
              Explore menu →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export const Hero = Bakery1Hero;
export default Bakery1Hero;