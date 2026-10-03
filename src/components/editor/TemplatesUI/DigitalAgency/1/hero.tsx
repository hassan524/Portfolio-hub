// @ts-nocheck
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ArrowUpRight, CheckCircle2, Star, Layers, Palette, Eye } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency1Hero({ props = {}, theme, onChange }: any) {
  const [activeFilter, setActiveFilter] = useState("3D Design");

  const bg = theme?.bg || "#F7F8F9";
  const bgSecond = theme?.["bg-second"] || "#FFFFFF";
  const ink = theme?.ink || "#111827";
  const inkSecond = theme?.["ink-second"] || "#6B7280";
  const surface = theme?.surface || "#FFFFFF";
  const accent = theme?.accent || "#87D53C"; // playful lime green

  const filterPills = [
    "Branding",
    "3D Design",
    "2D Design",
    "Illustrations 3D",
    "UI Design",
  ];

  const handleSmoothScroll = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-8 pb-20 md:py-24"
      style={{ backgroundColor: bg, color: ink }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Subtext, Avatars, Pills */}
          <div className="lg:col-span-6 space-y-8 z-10">
            {/* Big Headline matching Image 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
                  <Editable
                    value={props?.headlineWord1 || "Look"}
                    onChange={(v) => onChange?.({ headlineWord1: v })}
                  />
                </span>
                
                {/* Triple Asterisk / Star Badge from Image 2 */}
                <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-sky-200 bg-sky-50 text-sky-400">
                  <span className="text-xl leading-none select-none">✳</span>
                  <span className="text-xl leading-none select-none">✳</span>
                  <span className="text-xl leading-none select-none">✳</span>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                {/* Lime Green Arrow Glyphs */}
                <span
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-4"
                  style={{ borderColor: accent, color: accent }}
                >
                  <ArrowRight size={28} className="transform -rotate-45" strokeWidth={3} />
                </span>

                <span className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
                  <Editable
                    value={props?.headlineWord2 || "beyond"}
                    onChange={(v) => onChange?.({ headlineWord2: v })}
                  />
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight block">
                <Editable
                  value={props?.headlineWord3 || "limits"}
                  onChange={(v) => onChange?.({ headlineWord3: v })}
                />
              </h1>
            </motion.div>

            {/* Subtext description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg leading-relaxed max-w-lg"
              style={{ color: inkSecond }}
            >
              <Editable
                value={
                  props?.heroSubtitle ||
                  "From curated 3D clay systems to hyper-engaging digital narratives, we build brand identities that spark wonder and convert curious visitors into loyal advocates."
                }
                onChange={(v) => onChange?.({ heroSubtitle: v })}
              />
            </motion.p>

            {/* Social Proof: Avatars + 10.2k+ Active Users */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center gap-4 pt-2"
            >
              <div className="flex -space-x-3 overflow-hidden">
                <img
                  className="inline-block h-11 w-11 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="Creative director avatar"
                />
                <img
                  className="inline-block h-11 w-11 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                  alt="Founder avatar"
                />
                <img
                  className="inline-block h-11 w-11 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
                  alt="Brand lead avatar"
                />
              </div>

              <div>
                <div className="text-sm font-bold tracking-tight" style={{ color: ink }}>
                  10.2k+
                </div>
                <div className="text-xs" style={{ color: inkSecond }}>
                  Active users around the world
                </div>
              </div>
            </motion.div>

            {/* Pill Filter Tabs matching Image 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center gap-2 pt-4"
            >
              {filterPills.map((pill) => {
                const isSelected = activeFilter === pill;
                return (
                  <button
                    key={pill}
                    type="button"
                    onClick={() => setActiveFilter(pill)}
                    className="px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all border cursor-pointer select-none"
                    style={{
                      backgroundColor: isSelected ? ink : surface,
                      color: isSelected ? "#FFFFFF" : inkSecond,
                      borderColor: isSelected ? ink : "rgba(0, 0, 0, 0.1)",
                      boxShadow: isSelected ? "0 4px 14px rgba(0,0,0,0.12)" : "none",
                    }}
                  >
                    {pill}
                  </button>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column: 3D Clay Showcase Card matching Image 2 */}
          <div className="lg:col-span-6 relative flex justify-center">
            
            {/* Floating Stamp Sticker: "CREATE WITH DETAIL / STUDIO" */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -top-6 left-4 sm:left-10 z-20 w-24 h-24 sm:w-28 sm:h-28 rounded-full shadow-lg flex items-center justify-center border p-1"
              style={{
                backgroundColor: "#F0FDF4",
                borderColor: "rgba(132, 204, 22, 0.4)",
              }}
            >
              <div className="relative w-full h-full rounded-full flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                    fill="none"
                  />
                  <text className="text-[9px] font-bold tracking-widest uppercase" fill="#15803D">
                    <textPath href="#circlePath" startOffset="0%">
                      CREATE WITH DETAIL • STUDIO •
                    </textPath>
                  </text>
                </svg>
                {/* Center avocado / seedling icon */}
                <div className="absolute inset-0 flex items-center justify-center text-lg">
                  🥑
                </div>
              </div>
            </motion.div>

            {/* Main Rounded Clay Canvas Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9 }}
              className="relative w-full max-w-lg aspect-[4/5] sm:aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border"
              style={{
                background: "linear-gradient(180deg, #67E8F9 0%, #38BDF8 40%, #FB7185 40%, #F43F5E 100%)",
                borderColor: "rgba(0,0,0,0.06)",
              }}
            >
              {/* Card Header Pills: Socials and Lime Arrow */}
              <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-bold shadow-md cursor-pointer hover:scale-105 transition-transform">
                    𝕏
                  </div>
                  <div className="w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-bold shadow-md cursor-pointer hover:scale-105 transition-transform">
                    Be
                  </div>
                  <div className="w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-bold shadow-md cursor-pointer hover:scale-105 transition-transform">
                    In
                  </div>
                </div>

                <a
                  href="#projects"
                  onClick={(e) => handleSmoothScroll(e, "#projects")}
                  className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
                  style={{ backgroundColor: accent, color: "#111827" }}
                  aria-label="View Projects"
                >
                  <ArrowUpRight size={20} strokeWidth={2.5} />
                </a>
              </div>

              {/* Floating Clay Clouds in sky */}
              <motion.div
                animate={{ x: [0, 15, 0], y: [0, -6, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-16 right-8 w-28 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg filter blur-[0.5px]"
              />
              <motion.div
                animate={{ x: [0, -12, 0], y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-24 left-10 w-24 h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-md"
              />

              {/* 3D Clay Watermelon Art Slices matching Image 2 */}
              <div className="absolute inset-0 flex items-center justify-center pt-16">
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [0, 1, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative flex items-end justify-center gap-3 filter drop-shadow-2xl"
                >
                  {/* Smaller slice */}
                  <div className="relative w-28 sm:w-32 h-44 sm:h-48 bg-gradient-to-tr from-rose-600 via-rose-500 to-rose-400 rounded-t-[3.5rem] rounded-b-2xl border-b-[12px] border-lime-300 shadow-xl flex flex-col items-center justify-center overflow-hidden transform -rotate-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-white/20 pointer-events-none" />
                    {/* Seeds */}
                    <div className="w-2.5 h-3.5 bg-neutral-900 rounded-full mb-3" />
                    <div className="w-2.5 h-3.5 bg-neutral-900 rounded-full mb-3" />
                    <div className="w-2.5 h-3.5 bg-neutral-900 rounded-full" />
                  </div>

                  {/* Big main watermelon slice */}
                  <div className="relative w-36 sm:w-44 h-60 sm:h-72 bg-gradient-to-tr from-rose-600 via-rose-500 to-rose-400 rounded-t-[4.5rem] rounded-b-3xl border-b-[16px] border-lime-300 shadow-2xl flex flex-col items-center justify-center overflow-hidden transform rotate-3">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-white/30 pointer-events-none" />
                    {/* Highlights & Seeds */}
                    <div className="w-3 h-4 bg-neutral-900 rounded-full mb-4" />
                    <div className="flex gap-4 mb-4">
                      <div className="w-3 h-4 bg-neutral-900 rounded-full" />
                      <div className="w-3 h-4 bg-neutral-900 rounded-full" />
                    </div>
                    <div className="w-3 h-4 bg-neutral-900 rounded-full mb-4" />
                    <div className="w-3 h-4 bg-neutral-900 rounded-full" />
                  </div>
                </motion.div>
              </div>

              {/* Bottom Right CTA Pill inside the card: "Explore 3D work files >" */}
              <div className="absolute bottom-6 right-6 z-20">
                <a
                  href="#projects"
                  onClick={(e) => handleSmoothScroll(e, "#projects")}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold backdrop-blur-md bg-white/90 text-neutral-900 hover:bg-white shadow-lg transition-transform hover:scale-105 cursor-pointer"
                >
                  <span>Explore 3D work files</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default DigitalAgency1Hero;
