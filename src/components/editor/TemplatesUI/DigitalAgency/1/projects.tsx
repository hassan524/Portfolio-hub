// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Box, ArrowRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency1Projects({ props = {}, theme, onChange }: any) {
  const [activeIdx, setActiveIdx] = useState(0);

  // Dynamic theme colors - NO manual tailwind color classes!
  const bg = theme?.bg || theme?.bgPrimary || "#F7F8F9";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || "#FFFFFF";
  const text = theme?.text || theme?.ink || "#111827";
  const textSecond = theme?.["text-second"] || theme?.["ink-second"] || theme?.textSecond || "#6B7280";
  const surface = theme?.surface || "#FFFFFF";
  const accent = theme?.accent || "#87D53C";

  const projects = [
    {
      title: "Citrus & Clay Fruit System",
      client: "Kinfolk Organics",
      desc: "A tactile 3D brand world sculpted with 48 bespoke rendered clay assets, yielding a 3.4x lift in checkout conversions.",
      tag: "Cinema 4D • Clay Shaders",
      impact: "3.4x Conversion Increase",
      image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "NeoBank Bubble Finance",
      client: "NeoSphere",
      desc: "Interactive WebGL clay coins and floating wallets that turned mundane financial onboarding into a playful game.",
      tag: "Three.js • Interaction",
      impact: "840K Mobile Activations",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Zenith Studio Visual Identity",
      client: "Zenith Hardware",
      desc: "Physical-meets-digital brand ecosystem with custom tactile typography, 3D guidelines, and animated store micro-sites.",
      tag: "Brand Architecture",
      impact: "Awwwards Site of the Day",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const current = projects[activeIdx];

  const handleSmoothScroll = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="projects"
      className="py-24 transition-colors"
      style={{ backgroundColor: bg, color: text }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Interactive Selector */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b" style={{ borderColor: `${textSecond}25` }}>
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: `${accent}25`, color: text }}>
              <Box size={14} />
              <span>Tactile Works</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Selected 3D Sculptures & Launches
            </h2>
          </div>

          {/* Interactive Project Switcher (NO CARDS!) */}
          <div className="flex flex-wrap items-center gap-2">
            {projects.map((p, idx) => (
              <button
                key={p.title}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className="px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer"
                style={{
                  backgroundColor: activeIdx === idx ? text : surface,
                  color: activeIdx === idx ? bg : textSecond,
                  border: `1px solid ${activeIdx === idx ? text : `${textSecond}30`}`,
                }}
              >
                {p.client}
              </button>
            ))}
          </div>
        </div>

        {/* Large Cinematic 3D Canvas Showcase (NO BOX CARDS!) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: accent }}>
              {current.tag}
            </span>

            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {current.title}
            </h3>

            <p className="text-sm sm:text-base leading-relaxed" style={{ color: textSecond }}>
              {current.desc}
            </p>

            <div className="p-4 rounded-2xl border" style={{ borderColor: `${textSecond}25`, backgroundColor: surface }}>
              <span className="text-[11px] font-bold uppercase tracking-wider block mb-1" style={{ color: textSecond }}>
                Verified Deliverable Metric
              </span>
              <span className="text-lg font-black" style={{ color: text }}>
                {current.impact}
              </span>
            </div>

            <div className="pt-2">
              <a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, "#contact")}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider underline underline-offset-4 cursor-pointer"
                style={{ color: text }}
              >
                <span>Inquire About Similar 3D Assets</span>
                <ArrowUpRight size={14} style={{ color: accent }} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-2xl border" style={{ borderColor: `${textSecond}30` }}>
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default DigitalAgency1Projects;
