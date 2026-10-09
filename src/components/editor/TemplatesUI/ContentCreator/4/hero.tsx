// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowDownRight, Compass, Eye, Globe, MapPin, Play, Stamp } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#E7E0D4";
  const ink = theme?.ink || "#171717";
  const accent = theme?.accent || "#D7472E";

  return (
    <section id="top" className="relative min-h-screen overflow-hidden px-4 pb-20 pt-28 sm:px-8 sm:pt-36 select-none font-serif" style={{ backgroundColor: bg, color: ink }}>
      <div className="mx-auto max-w-7xl">
        {/* Massive Editorial Headline with Framer Motion Subtle Reveal */}
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#D7472E] block mb-3">
              DOCUMENTARY ESSAYIST & FIELD DIRECTOR
            </span>
            <Editable
              as="h1"
              value={props?.headline || "FILMS BORN IN THE DUST, WIND, AND COLD."}
              onChange={(v) => onChange?.({ headline: v })}
              className="text-5xl font-normal uppercase leading-[0.88] tracking-[-0.05em] sm:text-7xl lg:text-[7.5rem]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="lg:pb-4"
          >
            <Editable
              as="p"
              value={props?.subheadline || "For over a decade, I’ve traveled with analog 35mm cameras and cinema field recorders to the margins of the earth — documenting vanishing cultural trades, glaciological expeditions, and human resilience under extreme climate conditions."}
              className="font-sans text-lg font-light leading-relaxed text-black/80 sm:text-xl"
            />

            <div className="mt-8 flex flex-wrap items-center gap-4 font-mono text-xs uppercase tracking-wider">
              <a
                href="#projects"
                className="inline-flex items-center gap-3 rounded-full bg-[#171717] px-7 py-3.5 font-bold text-[#E7E0D4] hover:bg-[#D7472E] transition shadow-md"
              >
                <span>Read Expedition Dossier</span>
                <ArrowDownRight size={15} />
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 rounded-full border border-black/40 px-6 py-3.5 text-black hover:border-black transition"
              >
                <span>The Field Journal</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Archival Negative Contact Sheet Preview with Framer Motion Tilt & Hover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="mt-16 border-t-2 border-b-2 border-black py-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-black/60 mb-4">
            <span className="text-[#D7472E] font-bold">ILFORD HP5 PLUS 400 // FRAME 24A (GREASE PENCIL SELECT)</span>
            <span>SHUTTER: 1/125s • f/4.0 • 35MM SUMMICRON</span>
            <span className="text-black font-semibold">VIMEO STAFF PICK & TRIBECA LAUREL</span>
          </div>

          <div className="relative aspect-[21/9] w-full overflow-hidden bg-black rounded-lg">
            <img
              src={props?.heroImage || "https://images.pexels.com/photos/11063292/pexels-photo-11063292.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"}
              alt="Field Expedition Document"
              className="h-full w-full object-cover grayscale contrast-125 opacity-90 transition duration-700 hover:scale-105"
            />
            {/* Red grease pencil frame lines */}
            <div className="pointer-events-none absolute inset-6 border-2 border-dashed border-[#D7472E] opacity-70" />
            <div className="absolute top-8 left-8 font-mono text-xs text-[#D7472E] font-bold bg-black/70 px-2 py-0.5">
              CROP 2.39:1 // FINAL MASTER
            </div>
            <a
              href="#projects"
              className="absolute bottom-8 right-8 flex items-center gap-2 rounded-full bg-[#D7472E] px-4 py-2 font-mono text-xs font-bold uppercase text-white shadow-lg hover:scale-105 transition"
            >
              <Play size={12} fill="currentColor" />
              <span>Screen Field Footage</span>
            </a>
          </div>
        </motion.div>

        {/* Ledger Margin Footer */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-black/50">
          <span>ARCHIVE INDEX: EXPEDITIONS 2014—2026</span>
          <span>AVAILABLE FOR REMOTE EXPEDITION COMMISSIONS</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
