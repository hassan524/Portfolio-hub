// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowDown, Sparkles, SlidersHorizontal, Camera } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const U = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=85`;

export function PhotographyPortfolio1Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#FCFBF8";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || "#F5F3ED";
  const ink = theme?.text || theme?.ink || "#1A1918";
  const inkSecond = theme?.["text-second"] || theme?.["ink-second"] || "#6E6B65";
  const accent = theme?.accent || "#8E2823";
  const onAccent = theme?.["on-accent"] || "#FFFFFF";

  const go = (e: any, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const images = props.heroImages || [
    { src: U("photo-1534528741775-53994a69daeb"), cap: "Milan Runway · Autumn Editorial", format: "PORTRA 400" },
    { src: U("photo-1509631179647-0177331693ae"), cap: "Haute Joaillerie · Paris Vogue", format: "LEICA M11" },
    { src: U("photo-1515886657613-9f3515b0c78f"), cap: "Atelier Silhouette · Studio No. 3", format: "50MM LUX" },
  ];

  const stats = props.stats || [
    { n: "14", l: "Years in Vogue & Harper's" },
    { n: "32", l: "Magazine Covers Shot" },
    { n: "8", l: "Global Gallery Shows" },
    { n: "PX3", l: "Paris Gold Honor" },
  ];

  return (
    <section id="home" className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28" style={{ background: bg, color: ink }}>
      {/* Editorial Watermark Background Text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] font-serif font-bold uppercase tracking-widest pointer-events-none select-none whitespace-nowrap opacity-[0.03]"
        style={{ color: ink }}
      >
        EDITORIAL
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading Block */}
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-[0.2em]"
            style={{ background: bgSecond, border: `1px solid ${ink}15`, color: inkSecond }}
          >
            <Camera size={13} style={{ color: accent }} />
            <Editable value={props.heroEyebrow || "Parisian Haute Couture & Editorial Photography"} onChange={(v) => onChange?.({ heroEyebrow: v })} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-normal tracking-tight leading-[1.04]"
          >
            <Editable
              value={props.heroTitle || "Sculpting light into timeless editorial stories."}
              onChange={(v) => onChange?.({ heroTitle: v })}
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto"
            style={{ color: inkSecond }}
          >
            <Editable
              value={props.heroSubtitle || "Specializing in high-fashion campaigns, runway chronicles, and intimate auteur portraiture for international publications."}
              onChange={(v) => onChange?.({ heroSubtitle: v })}
            />
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="pt-4 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#projects"
              onClick={(e) => go(e, "#projects")}
              className="px-8 py-4 rounded-full text-xs sm:text-sm font-medium tracking-[0.15em] uppercase transition-all hover:scale-105 active:scale-95 shadow-lg"
              style={{ background: accent, color: onAccent }}
            >
              <Editable value={props.heroPrimaryCta || "View Selected Folio"} onChange={(v) => onChange?.({ heroPrimaryCta: v })} />
            </a>

            <a
              href="#contact"
              onClick={(e) => go(e, "#contact")}
              className="px-8 py-4 rounded-full text-xs sm:text-sm font-medium tracking-[0.15em] uppercase transition-all hover:bg-black/5"
              style={{ border: `1.5px solid ${ink}`, color: ink }}
            >
              <Editable value={props.heroSecondaryCta || "Request Lookbook"} onChange={(v) => onChange?.({ heroSecondaryCta: v })} />
            </a>
          </motion.div>
        </div>

        {/* 3-Frame Editorial Spread */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center">
          {images.map((img: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
              className={`group relative overflow-hidden rounded-2xl shadow-xl transition-transform duration-500 hover:-translate-y-2 ${
                i === 1 ? "md:-translate-y-6 aspect-[3/4]" : "aspect-[4/5]"
              }`}
              style={{ background: bgSecond }}
            >
              <img
                src={img.src}
                alt={img.cap}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"
              />

              {/* Photo Caption & Format Stamp */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase opacity-75 block">
                    {img.format}
                  </span>
                  <span className="text-sm sm:text-base font-serif font-light mt-0.5 block">
                    {img.cap}
                  </span>
                </div>
                <span className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-xs backdrop-blur-sm">
                  0{i + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Editorial Stats Ribbon */}
        <div
          className="mt-16 sm:mt-24 rounded-2xl p-6 sm:p-10 border grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
          style={{ background: bgSecond, borderColor: `${ink}12` }}
        >
          {stats.map((s: any, idx: number) => (
            <div key={idx} className="space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal" style={{ color: accent }}>
                {s.n}
              </div>
              <div className="text-xs uppercase tracking-wider font-sans" style={{ color: inkSecond }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PhotographyPortfolio1Hero;
