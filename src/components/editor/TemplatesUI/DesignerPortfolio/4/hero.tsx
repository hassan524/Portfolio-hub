// @ts-nocheck
import React, { useState, useRef } from "react";
import Editable from "@/components/editor/ui/Editable";
import { MousePointer2, Sparkles, ArrowUpRight, PenTool, Layers, Compass, Play } from "lucide-react";

interface HeroProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const DesignerPortfolio4Hero: React.FC<HeroProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Interactive Mouse Coordinates for cursor moving objects
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const clients = ["Stripe", "Linear", "Raycast", "Vercel", "Figma", "Arc Browser"];

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9]/60 to-[#F8FAFC] text-slate-900 overflow-hidden flex flex-col justify-between py-16 sm:py-24 border-b border-slate-200/80"
    >
      {/* Background Soft Interactive Pastel Gradients */}
      <div
        className="absolute top-1/4 left-1/3 w-[550px] h-[550px] bg-gradient-to-tr from-indigo-200/40 via-purple-200/30 to-pink-200/30 rounded-full blur-[140px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * 60}px, ${mousePos.y * 60}px)`,
        }}
      />
      <div
        className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-gradient-to-br from-amber-100/40 via-rose-100/30 to-sky-100/30 rounded-full blur-[120px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * -40}px, ${mousePos.y * -40}px)`,
        }}
      />

      {/* Subtle Dot Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `radial-gradient(#94A3B8 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* ================= DYNAMIC CURSOR-MOVING SVG OBJECTS ================= */}
      
      {/* Object 1: Floating Figma Multi-User Cursor (Top Right) */}
      <div
        className="absolute top-24 right-[12%] pointer-events-none transition-transform duration-300 ease-out hidden lg:block z-20"
        style={{
          transform: `translate(${mousePos.x * 85}px, ${mousePos.y * 85}px) rotate(${mousePos.x * 12}deg)`,
        }}
      >
        <div className="flex items-start gap-1">
          <svg className="w-5 h-5 text-indigo-600 drop-shadow-md fill-indigo-600" viewBox="0 0 24 24">
            <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.36z" />
          </svg>
          <div className="px-2.5 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-semibold tracking-wide shadow-lg shadow-indigo-600/30">
            Hassan (Editing Component)
          </div>
        </div>
      </div>

      {/* Object 2: Floating Second Collaborator Cursor (Bottom Left) */}
      <div
        className="absolute bottom-36 left-[8%] pointer-events-none transition-transform duration-500 ease-out hidden lg:block z-20"
        style={{
          transform: `translate(${mousePos.x * -70}px, ${mousePos.y * -70}px) rotate(${mousePos.y * -10}deg)`,
        }}
      >
        <div className="flex items-start gap-1">
          <svg className="w-5 h-5 text-rose-500 drop-shadow-md fill-rose-500" viewBox="0 0 24 24">
            <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.36z" />
          </svg>
          <div className="px-2.5 py-1 rounded-full bg-rose-500 text-white text-[10px] font-semibold tracking-wide shadow-lg shadow-rose-500/30">
            Sarah ✦ "Love this micro-motion!"
          </div>
        </div>
      </div>

      {/* Object 3: Interactive SVG Bezier Pen Curve (Floating Graphic) */}
      <div
        className="absolute top-1/3 left-[5%] pointer-events-none transition-transform duration-700 ease-out hidden xl:block z-10"
        style={{
          transform: `translate(${mousePos.x * 50}px, ${mousePos.y * 50}px)`,
        }}
      >
        <div className="p-4 rounded-3xl bg-white/70 backdrop-blur-md border border-white/80 shadow-xl shadow-slate-200/50">
          <svg width="180" height="90" viewBox="0 0 180 90" fill="none">
            {/* Guide line */}
            <line x1="20" y1="70" x2="60" y2="20" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="160" y1="30" x2="120" y2="70" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Bezier Curve */}
            <path
              d="M 20 70 C 60 20, 120 70, 160 30"
              stroke="url(#gradient-curve)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Handle Handles & Anchors */}
            <circle cx="20" cy="70" r="4" fill="#6366F1" stroke="#FFF" strokeWidth="2" />
            <circle cx="60" cy="20" r="3.5" fill="#EC4899" />
            <circle cx="120" cy="70" r="3.5" fill="#EC4899" />
            <circle cx="160" cy="30" r="4" fill="#6366F1" stroke="#FFF" strokeWidth="2" />
            <defs>
              <linearGradient id="gradient-curve" x1="20" y1="70" x2="160" y2="30" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366F1" />
                <stop offset="0.5" stopColor="#A855F7" />
                <stop offset="1" stopColor="#EC4899" />
              </linearGradient>
            </defs>
          </svg>
          <div className="mt-1 flex items-center justify-between text-[9px] font-mono text-slate-500 uppercase tracking-wider">
            <span>CUBIC_BEZIER</span>
            <span className="text-indigo-600 font-bold">SMOOTH 60FPS</span>
          </div>
        </div>
      </div>

      {/* Object 4: Floating Interactive Color Tokens Palette */}
      <div
        className="absolute top-1/2 right-[6%] pointer-events-none transition-transform duration-500 ease-out hidden xl:block z-10"
        style={{
          transform: `translate(${mousePos.x * -60}px, ${mousePos.y * -60}px)`,
        }}
      >
        <div className="p-3.5 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-lg shadow-slate-200/50 space-y-2">
          <div className="text-[10px] font-bold text-slate-700 tracking-wider uppercase flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Design Tokens</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-6 h-6 rounded-lg bg-indigo-500 shadow-sm" />
            <span className="w-6 h-6 rounded-lg bg-violet-500 shadow-sm" />
            <span className="w-6 h-6 rounded-lg bg-pink-500 shadow-sm" />
            <span className="w-6 h-6 rounded-lg bg-amber-400 shadow-sm" />
          </div>
          <div className="text-[9px] font-mono text-slate-500">HEX / OKLCH TOKENS</div>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8 z-10 my-auto">
        
        {/* Playful Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-semibold text-slate-700">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600" />
          </span>
          <span>Digital Product & Interaction Designer</span>
          <span className="text-slate-300">|</span>
          <span className="text-indigo-600">Design Systems & Prototyping</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
            <Editable
              value={p.title || "Crafting digital experiences with unmistakable craft & kinetic delight."}
              onChange={(val) => handleUpdate("title", val)}
            />
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            <Editable
              value={p.subtitle || "I partner with visionary startups and product teams to design thoughtful interfaces, fluid micro-interactions, and design systems that scale effortlessly."}
              onChange={(val) => handleUpdate("subtitle", val)}
            />
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="#projects"
            className="px-8 py-4 rounded-full bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 hover:-translate-y-0.5 flex items-center gap-2"
          >
            <span>Explore Selected Work</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="px-8 py-4 rounded-full bg-white text-slate-800 font-semibold text-sm border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
          >
            <span>Book Design Sprint</span>
          </a>
        </div>

        {/* Interactive Discipline Chips */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
          {["Figma Variables", "Component Architectures", "Micro-Interactions", "Spatial Prototyping", "Design Engineering"].map((chip, idx) => (
            <span
              key={idx}
              className="px-3.5 py-1 rounded-full text-xs font-medium bg-white/80 border border-slate-200/80 text-slate-600 shadow-sm"
            >
              ✦ {chip}
            </span>
          ))}
        </div>

      </div>

      {/* Trusted Clients Marquee */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full pt-12 border-t border-slate-200/80">
        <div className="text-center text-xs font-semibold uppercase tracking-wider text-slate-600 mb-6">
          Selected Design Collaborations & High-Growth Startups
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 font-bold text-slate-700 text-base sm:text-lg">
          {clients.map((c, idx) => (
            <span key={idx} className="hover:text-indigo-600 transition-colors cursor-default">
              {c}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
};

export default DesignerPortfolio4Hero;
