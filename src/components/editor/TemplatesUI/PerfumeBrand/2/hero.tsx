// @ts-nocheck
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Flame, Moon, Sparkles, Shield, Compass } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function PerfumeBrand2Hero({ props = {}, theme, onChange }: any) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const bg = theme?.bg || "#0A090D";
  const bgSecond = theme?.["bg-second"] || "#14121B";
  const ink = theme?.ink || "#F5F2EB";
  const inkSecond = theme?.["ink-second"] || "#9E96A6";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.05)";
  const accent = theme?.accent || "#D4AF37";

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
      className="relative min-h-[92vh] w-full overflow-hidden flex flex-col justify-between px-4 sm:px-8 lg:px-14 py-12 transition-colors select-none"
      style={{
        backgroundColor: bg,
        backgroundImage: `radial-gradient(circle at 70% 30%, rgba(212, 175, 55, 0.12) 0%, transparent 55%), radial-gradient(circle at 20% 80%, rgba(40, 20, 60, 0.4) 0%, transparent 65%)`,
        color: ink,
      }}
    >
      {/* Alchemical Technical Markings */}
      <div className="absolute top-6 left-6 text-[10px] font-mono tracking-[0.3em] opacity-40 flex items-center gap-2 pointer-events-none" style={{ color: accent }}>
        <Moon size={11} />
        <span>02 // NOCTURNE PARFUMERIE</span>
      </div>
      <div className="absolute top-6 right-6 text-[10px] font-mono tracking-[0.3em] opacity-40 hidden sm:flex items-center gap-2 pointer-events-none" style={{ color: accent }}>
        <span>EXTRAIT PUR 38%</span>
        <span>+</span>
      </div>
      <div className="absolute bottom-6 left-6 text-[10px] font-mono tracking-[0.3em] opacity-40 hidden md:block pointer-events-none" style={{ color: inkSecond }}>
        <span>MACERATION // CHARRED OAK BARRELS</span>
      </div>

      {/* Atmospheric Gold Ember Glow Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none"
        style={{ backgroundColor: accent }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center pt-4 pb-12">
        {/* Left Column: Nocturnal Manifesto & Details */}
        <div className="lg:col-span-4 space-y-10 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-[0.25em] border"
              style={{
                backgroundColor: "rgba(212, 175, 55, 0.08)",
                borderColor: "rgba(212, 175, 55, 0.25)",
                color: accent,
              }}
            >
              <Flame size={12} />
              <span>Smoky Woods & Black Amber</span>
            </div>

            <p className="text-sm font-light leading-relaxed max-w-sm" style={{ color: inkSecond }}>
              <Editable
                value={
                  props?.leftTagline ||
                  "Formulated in darkness. Rare Cambodian oud, charred bourbon vanilla, and night-harvested jasmine steeped over 240 lunar cycles."
                }
                onChange={(v) => onChange?.({ leftTagline: v })}
              />
            </p>
          </motion.div>

          {/* Sillage & Longevity Specifications Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="p-5 rounded-2xl border backdrop-blur-xl space-y-3"
            style={{
              backgroundColor: surface,
              borderColor: "rgba(212, 175, 55, 0.2)",
            }}
          >
            <div className="flex items-center justify-between text-xs font-mono border-b pb-2" style={{ borderColor: "rgba(212, 175, 55, 0.15)" }}>
              <span className="opacity-60" style={{ color: inkSecond }}>CONCENTRATION</span>
              <span className="font-bold" style={{ color: accent }}>38% EXTRAIT DE PARFUM</span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono border-b pb-2" style={{ borderColor: "rgba(212, 175, 55, 0.15)" }}>
              <span className="opacity-60" style={{ color: inkSecond }}>SKIN PROJECTION</span>
              <span className="font-bold" style={{ color: ink }}>INTENSE SILLAGE (24H+)</span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="opacity-60" style={{ color: inkSecond }}>HARVEST YEAR</span>
              <span className="font-bold" style={{ color: accent }}>2025 RESERVE</span>
            </div>
          </motion.div>
        </div>

        {/* Center: Levitating Obsidian Flacon */}
        <div className="lg:col-span-4 relative flex items-center justify-center order-1 lg:order-2">
          <motion.div
            animate={{
              y: [0, -16, 0],
              rotate: [0, -1, 0],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              x: mousePos.x * 20,
              y: mousePos.y * 20,
            }}
            className="relative z-10 w-full max-w-[340px] aspect-[4/5] flex items-center justify-center"
          >
            <motion.div
              animate={{
                scale: [1, 0.85, 1],
                opacity: [0.4, 0.2, 0.4],
              }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 w-3/4 h-10 rounded-[100%] blur-xl pointer-events-none"
              style={{ backgroundColor: "rgba(212, 175, 55, 0.35)" }}
            />

            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-amber-500/30 group">
              <img
                src={
                  props?.heroImage ||
                  "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=85"
                }
                alt="Atelier Obsidian Noir Extrait"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 50% 30%, transparent 40%, rgba(10, 9, 13, 0.75) 100%)",
                }}
              />

              <div
                className="absolute bottom-5 left-5 right-5 p-3 rounded-xl backdrop-blur-xl border flex items-center justify-between"
                style={{
                  backgroundColor: "rgba(10, 9, 13, 0.85)",
                  borderColor: "rgba(212, 175, 55, 0.35)",
                }}
              >
                <div>
                  <p className="text-[10px] font-mono tracking-widest uppercase" style={{ color: accent }}>
                    NOCTURNE RESERVE // 09
                  </p>
                  <p className="text-xs font-serif font-bold" style={{ color: ink }}>
                    Élixir Noir & Fève Tonka 100ml
                  </p>
                </div>
                <span className="text-[10px] font-mono tracking-widest uppercase opacity-70" style={{ color: accent }}>
                  Charred Cask
                </span>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3 -right-3 w-11 h-11 rounded-full border flex items-center justify-center backdrop-blur-md shadow-xl"
              style={{
                backgroundColor: "rgba(20, 18, 27, 0.85)",
                borderColor: accent,
                color: accent,
              }}
            >
              <Sparkles size={16} />
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column: Monumental Gothic-Modern Typography & In-Page CTAs */}
        <div className="lg:col-span-4 space-y-8 order-3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="space-y-2"
          >
            <h1
              className="font-serif tracking-[-0.03em] uppercase leading-[0.88] select-none"
              style={{
                fontFamily: "Cinzel, serif",
                color: ink,
              }}
            >
              <span className="block text-5xl sm:text-6xl lg:text-7xl font-light">
                <Editable value={props?.titleLine1 || "AWAKEN"} onChange={(v) => onChange?.({ titleLine1: v })} />
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl font-normal tracking-[-0.04em]">
                <Editable value={props?.titleLine2 || "THE NOIR"} onChange={(v) => onChange?.({ titleLine2: v })} />
              </span>
              <span
                className="block text-5xl sm:text-6xl lg:text-7xl font-light italic"
                style={{ color: accent }}
              >
                <Editable value={props?.titleLine3 || "SENSATION"} onChange={(v) => onChange?.({ titleLine3: v })} />
              </span>
            </h1>

            {/* In-Page Smooth Scroll Action Buttons */}
            <div className="pt-8 flex flex-wrap items-center gap-4">
              <motion.a
                href="#vault"
                onClick={(e) => handleSmoothScroll(e, "#vault")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.18em] transition-all shadow-xl cursor-pointer"
                style={{
                  backgroundColor: accent,
                  color: "#0A090D",
                }}
              >
                <span>
                  <Editable value={props?.primaryCta || "Enter The Vault"} onChange={(v) => onChange?.({ primaryCta: v })} />
                </span>
                <ArrowRight size={14} />
              </motion.a>

              <motion.a
                href="#alchemy"
                onClick={(e) => handleSmoothScroll(e, "#alchemy")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-xs font-medium uppercase tracking-[0.18em] border backdrop-blur-md transition-all cursor-pointer"
                style={{
                  borderColor: "rgba(212, 175, 55, 0.35)",
                  backgroundColor: surface,
                  color: ink,
                }}
              >
                <span>
                  <Editable value={props?.secondaryCta || "The Alchemy & Craft"} onChange={(v) => onChange?.({ secondaryCta: v })} />
                </span>
                <ArrowUpRight size={14} style={{ color: accent }} />
              </motion.a>
            </div>
          </motion.div>

          {/* Right Floating Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="p-5 rounded-2xl border backdrop-blur-xl shadow-2xl"
            style={{
              backgroundColor: surface,
              borderColor: "rgba(212, 175, 55, 0.25)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center border flex-shrink-0"
                style={{
                  backgroundColor: "rgba(212, 175, 55, 0.12)",
                  borderColor: accent,
                  color: accent,
                }}
              >
                <Shield size={20} />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-serif font-bold uppercase tracking-wider" style={{ color: ink }}>
                  The 240-Night Barrel Standard
                </h4>
                <p className="text-[11px] font-light leading-relaxed" style={{ color: inkSecond }}>
                  Zero synthetic water fillers. Every droplet is steeped in charred American and French oak casks under strict humidity control.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default PerfumeBrand2Hero;
