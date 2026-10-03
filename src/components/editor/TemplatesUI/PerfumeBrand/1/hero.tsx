// @ts-nocheck
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles, Droplets, Award, Compass, ShieldCheck } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function PerfumeBrand1Hero({ props = {}, theme, onChange }: any) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const bg = theme?.bg || "#EED8C9";
  const bgSecond = theme?.["bg-second"] || "#E5C8B4";
  const ink = theme?.ink || "#2D1D18";
  const inkSecond = theme?.["ink-second"] || "#7A5E54";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.55)";
  const accent = theme?.accent || "#9E4A28";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] w-full overflow-hidden flex flex-col justify-between px-4 sm:px-8 lg:px-14 py-10 transition-colors select-none"
      style={{
        backgroundColor: bg,
        backgroundImage: `radial-gradient(circle at 75% 25%, rgba(255, 255, 255, 0.75) 0%, transparent 60%), radial-gradient(circle at 25% 70%, rgba(229, 200, 180, 0.8) 0%, transparent 70%)`,
        color: ink,
      }}
    >
      {/* Decorative luxury framing corners matching reference image */}
      <div className="absolute top-6 left-6 text-[10px] font-mono tracking-[0.25em] opacity-40 flex items-center gap-1.5 pointer-events-none">
        <span>+</span>
        <span>01 // HAUTE PARFUMERIE</span>
      </div>
      <div className="absolute top-6 right-6 text-[10px] font-mono tracking-[0.25em] opacity-40 hidden sm:flex items-center gap-1.5 pointer-events-none">
        <span>EST. 1928 // GRASSE</span>
        <span>+</span>
      </div>
      <div className="absolute bottom-6 left-6 text-[10px] font-mono tracking-[0.25em] opacity-40 hidden md:block pointer-events-none">
        <span>LAT: 43.6602° N, LONG: 6.9248° E</span>
      </div>
      <div className="absolute bottom-6 right-6 pointer-events-none">
        <div className="w-3.5 h-3.5 rounded-full border border-current opacity-40 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
        </div>
      </div>

      {/* Background glowing halo spheres */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none"
        style={{ backgroundColor: "rgba(255, 245, 235, 0.9)" }}
      />
      <motion.div
        animate={{
          scale: [1.1, 0.95, 1.1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] rounded-full blur-[160px] pointer-events-none"
        style={{ backgroundColor: "rgba(235, 185, 155, 0.6)" }}
      />

      {/* Main Hero Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center pt-4 pb-12">
        {/* Left Editorial column */}
        <div className="lg:col-span-3 flex flex-col justify-between h-full space-y-10 lg:space-y-24 order-2 lg:order-1">
          {/* Top Left Tagline block matching reference */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <span className="h-px w-6" style={{ backgroundColor: accent }} />
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold" style={{ color: accent }}>
                Organic Extrait
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs font-light" style={{ color: inkSecond }}>
              <Editable
                value={
                  props?.leftTagline ||
                  "Specially crafted for your everyday glow. Made in Grasse with soothing botanical extracts and bio-identical rare essences."
                }
                onChange={(v) => onChange?.({ leftTagline: v })}
              />
            </p>
          </motion.div>

          {/* Floating water droplet / botanical badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="p-4 rounded-2xl border backdrop-blur-md hidden sm:block max-w-[240px]"
            style={{
              backgroundColor: surface,
              borderColor: "rgba(255, 255, 255, 0.6)",
              boxShadow: "0 10px 30px -10px rgba(158, 74, 40, 0.12)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm"
                style={{ backgroundColor: accent }}
              >
                <Droplets size={18} />
              </div>
              <div>
                <span className="block text-xs font-serif font-bold" style={{ color: ink }}>
                  Cold-Pressed
                </span>
                <span className="text-[11px] font-mono tracking-tight" style={{ color: inkSecond }}>
                  100% Pure Floral Oils
                </span>
              </div>
            </div>
          </motion.div>

          {/* Left Bottom 3-item list matching reference */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-1.5 pt-4 text-xs font-medium tracking-wider"
            style={{ color: inkSecond }}
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
              <Editable value={props?.bullet1 || "Smooth Scent Trail"} onChange={(v) => onChange?.({ bullet1: v })} />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
              <Editable value={props?.bullet2 || "24h Botanical Hydration"} onChange={(v) => onChange?.({ bullet2: v })} />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
              <Editable value={props?.bullet3 || "Everyday Haute Alchemy"} onChange={(v) => onChange?.({ bullet3: v })} />
            </div>
          </motion.div>
        </div>

        {/* Center Floating Bottle Visual matching reference image */}
        <div className="lg:col-span-5 relative flex items-center justify-center order-1 lg:order-2">
          {/* Levitating Bottle & Botanical Leaves */}
          <motion.div
            animate={{
              y: [0, -18, 0],
              rotate: [0, 1.2, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              x: mousePos.x * 25,
              y: mousePos.y * 25,
            }}
            className="relative z-10 w-full max-w-[340px] sm:max-w-[420px] aspect-[4/5] flex items-center justify-center"
          >
            {/* Ambient shadow underneath bottle */}
            <motion.div
              animate={{
                scale: [1, 0.85, 1],
                opacity: [0.35, 0.2, 0.35],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 w-3/4 h-10 rounded-[100%] blur-xl pointer-events-none"
              style={{ backgroundColor: "rgba(100, 40, 20, 0.35)" }}
            />

            {/* Glowing Backlight backdrop */}
            <div
              className="absolute inset-4 rounded-full blur-3xl opacity-60 pointer-events-none"
              style={{
                background: `radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(240,210,190,0.6) 60%, transparent 100%)`,
              }}
            />

            {/* Glass bottle product image */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/60 backdrop-blur-sm group">
              <img
                src={
                  props?.heroImage ||
                  "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=1000&q=85"
                }
                alt="Lumiere Luxury Perfume Essence"
                className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
              />

              <div
                className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
                style={{
                  backgroundImage: `radial-gradient(circle at 30% 70%, rgba(255,255,255,0.9), transparent 50%)`,
                }}
              />

              {/* Luxury bottle label badge on image */}
              <div className="absolute bottom-5 left-5 right-5 p-3.5 rounded-xl backdrop-blur-md border border-white/40 flex items-center justify-between"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.65)" }}
              >
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase font-mono" style={{ color: accent }}>
                    EAU DE PARFUM // NO. 04
                  </p>
                  <p className="text-xs font-serif font-semibold" style={{ color: ink }}>
                    Radiant Restoring Elixir 50ml
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono tracking-widest uppercase opacity-70" style={{ color: ink }}>
                    Pure Extrait
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Water Droplet Beads */}
            <motion.div
              animate={{
                y: [0, -12, 0],
                x: [0, 6, 0],
              }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3 -right-3 w-12 h-12 rounded-full border border-white/80 backdrop-blur-lg flex items-center justify-center shadow-lg pointer-events-none"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
            >
              <Sparkles size={18} style={{ color: accent }} />
            </motion.div>

            <motion.div
              animate={{
                y: [0, 10, 0],
                x: [0, -8, 0],
              }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-16 -left-5 w-10 h-10 rounded-full border border-white/70 backdrop-blur-md flex items-center justify-center shadow-md pointer-events-none"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
            >
              <Droplets size={16} style={{ color: accent }} />
            </motion.div>
          </motion.div>
        </div>

        {/* Right Typography & CTAs Column */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-10 order-3">
          {/* Main Huge Typography matching the reference image EXACTLY */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="space-y-2 pt-2"
          >
            <h1
              className="font-serif tracking-[-0.03em] uppercase leading-[0.88] select-none"
              style={{
                fontFamily: "Cinzel, Cormorant Garamond, serif",
                color: ink,
              }}
            >
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light">
                <Editable value={props?.titleLine1 || "REVEAL"} onChange={(v) => onChange?.({ titleLine1: v })} />
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal tracking-[-0.04em]">
                <Editable value={props?.titleLine2 || "YOUR SKIN"} onChange={(v) => onChange?.({ titleLine2: v })} />
              </span>
              <span
                className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light italic"
                style={{ color: accent }}
              >
                <Editable value={props?.titleLine3 || "NATURALLY"} onChange={(v) => onChange?.({ titleLine3: v })} />
              </span>
            </h1>

            {/* In-Page Smooth Scroll Buttons */}
            <div className="pt-8 flex flex-wrap items-center gap-4">
              <motion.a
                href="#collection"
                onClick={(e) => handleSmoothScroll(e, "#collection")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.18em] transition-all shadow-lg cursor-pointer"
                style={{
                  backgroundColor: ink,
                  color: "#FFF5EE",
                }}
              >
                <span>
                  <Editable value={props?.primaryCta || "Explore Creations"} onChange={(v) => onChange?.({ primaryCta: v })} />
                </span>
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: accent }}
                >
                  <ArrowRight size={13} />
                </span>
              </motion.a>

              <motion.a
                href="#story"
                onClick={(e) => handleSmoothScroll(e, "#story")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-xs font-medium uppercase tracking-[0.18em] border backdrop-blur-md transition-all shadow-sm cursor-pointer"
                style={{
                  backgroundColor: surface,
                  borderColor: "rgba(255, 255, 255, 0.7)",
                  color: ink,
                }}
              >
                <span>
                  <Editable value={props?.secondaryCta || "The Atelier & Craft"} onChange={(v) => onChange?.({ secondaryCta: v })} />
                </span>
                <ArrowUpRight size={15} style={{ color: accent }} />
              </motion.a>
            </div>
          </motion.div>

          {/* Bottom Right Glassmorphic Card matching the reference image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="p-5 sm:p-6 rounded-3xl border backdrop-blur-xl transition-all shadow-xl"
            style={{
              backgroundColor: surface,
              borderColor: "rgba(255, 255, 255, 0.75)",
              boxShadow: "0 20px 45px -15px rgba(158, 74, 40, 0.15)",
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center text-center p-1.5 flex-shrink-0 border"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.65)",
                  borderColor: "rgba(158, 74, 40, 0.2)",
                  color: accent,
                }}
              >
                <Award size={20} className="mb-0.5" />
                <span className="text-[10px] font-extrabold tracking-tighter leading-none">98%</span>
                <span className="text-[7px] uppercase font-mono tracking-tighter leading-tight mt-0.5">BIO CERT</span>
              </div>

              <div className="space-y-1">
                <h2 className="text-sm font-serif font-bold tracking-tight" style={{ color: ink }}>
                  <Editable
                    value={props?.cardTitle || "Gentle Care for Everyday Glow"}
                    onChange={(v) => onChange?.({ cardTitle: v })}
                  />
                </h2>
                <p className="text-xs leading-relaxed font-light" style={{ color: inkSecond }}>
                  <Editable
                    value={
                      props?.cardDesc ||
                      "Clinically-tested formulas crafted in Grasse with active botanicals, soothing white iris, and pure neroli."
                    }
                    onChange={(v) => onChange?.({ cardDesc: v })}
                  />
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default PerfumeBrand1Hero;
