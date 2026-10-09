// @ts-nocheck
import { motion } from "framer-motion";
import { Compass, ArrowDownRight, Layers, MapPin } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const U = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`;

export function PhotographyPortfolio2Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#F7F6F2";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || "#EDEDE6";
  const ink = theme?.text || theme?.ink || "#242922";
  const inkSecond = theme?.["text-second"] || theme?.["ink-second"] || "#636A60";
  const accent = theme?.accent || "#2D5A3E";
  const onAccent = theme?.["on-accent"] || "#FFFFFF";

  const go = (e: any, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="pt-16 pb-20 sm:pt-24 sm:pb-32 overflow-hidden" style={{ background: bg, color: ink }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Info Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono border-b pb-6" style={{ borderColor: `${ink}15` }}>
          <div className="flex items-center gap-2">
            <Compass size={14} style={{ color: accent }} />
            <span style={{ color: inkSecond }}>
              <Editable value={props.heroCoords || "64°08'N 21°56'W · NORDIC ARCHITECTURAL ARCHIVE"} onChange={(v) => onChange?.({ heroCoords: v })} />
            </span>
          </div>
          <div className="flex items-center gap-3" style={{ color: inkSecond }}>
            <span className="w-2 h-2 rounded-full" style={{ background: accent }} />
            <Editable value={props.heroStatus || "LIMITED PRINT EDITIONS NOW AVAILABLE"} onChange={(v) => onChange?.({ heroStatus: v })} />
          </div>
        </div>

        {/* Hero Title & Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.08]">
              <Editable
                value={props.heroHeadline || "Capturing quiet geometries where architecture meets untamed earth."}
                onChange={(v) => onChange?.({ heroHeadline: v })}
              />
            </h1>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <p className="text-sm font-light leading-relaxed" style={{ color: inkSecond }}>
              <Editable
                value={props.heroDescription || "A documentary and fine-art visual dialogue between modern concrete structures and Nordic silence. Printed exclusively on museum-certified cotton rag."}
                onChange={(v) => onChange?.({ heroDescription: v })}
              />
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#projects"
                onClick={(e) => go(e, "#projects")}
                className="px-6 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider transition-transform hover:scale-105 active:scale-95 shadow-md"
                style={{ background: accent, color: onAccent }}
              >
                <Editable value={props.heroPrimaryCta || "Explore Galleries"} onChange={(v) => onChange?.({ heroPrimaryCta: v })} />
              </a>
              <a
                href="#services"
                onClick={(e) => go(e, "#services")}
                className="px-6 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-colors hover:bg-black/5"
                style={{ borderColor: ink, color: ink }}
              >
                <Editable value={props.heroSecondaryCta || "Print Catalog"} onChange={(v) => onChange?.({ heroSecondaryCta: v })} />
              </a>
            </div>
          </div>
        </div>

        {/* Panoramic Landscape Showcase Card */}
        <div className="relative rounded-3xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] shadow-2xl border" style={{ borderColor: `${ink}15` }}>
          <img
            src={props.heroImage || U("photo-1506744038136-46273834b3fb")}
            alt="Panoramic architectural landscape"
            className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Bottom Floating Metadata */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-white text-xs font-mono">
            <div>
              <span className="opacity-75 uppercase tracking-widest text-[10px] block">PLATE NO. 01 — REYKJAVIK OUTSKIRTS</span>
              <span className="text-lg font-serif font-light mt-0.5 block">Structure and Solitude No. 8</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20">
              Hahnemühle Rag · Edition 1 of 25
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PhotographyPortfolio2Hero;
