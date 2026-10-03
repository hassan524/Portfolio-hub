// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency3Projects({ props = {}, theme, onChange }: any) {
  const [activeIdx, setActiveIdx] = useState(0);

  // Dynamic theme colors - NO manual tailwind color classes!
  const bg = theme?.bg || theme?.bgPrimary || "#F9F7F2";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || "#F3EFE6";
  const text = theme?.text || theme?.ink || "#1C1917";
  const textSecond = theme?.["text-second"] || theme?.["ink-second"] || theme?.textSecond || "#78716C";
  const surface = theme?.surface || "#FFFFFF";
  const accent = theme?.accent || "#C2410C";

  const campaigns = [
    {
      id: "florist",
      title: "Florist Digital Marketing Campaign",
      services: "Digital Marketing Campaign, Floral Photography Direction, Brand Identity Design",
      results: "Raised 70% ROI, 3.8x Average Order Value, 12,000+ New High-LTV Subscriptions",
      image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80",
      narrative: "Our team built an ethereal botanical visual universe rooted in seasonal bloom cycles, balancing visceral emotional storytelling with strict performance attribution models.",
    },
    {
      id: "ceramique",
      title: "Atelier Céramique Heritage Launch",
      services: "Porcelain Art Direction, Collector Catalog, Private Exhibition Microsite",
      results: "Sold Out Complete 400-Piece Collection in 48h, $1.2M Direct Private Sales",
      image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80",
      narrative: "Capturing the tactile imperfections of hand-thrown porcelain under natural studio daylight, transforming artisanal ceramics into coveted collector investments.",
    },
    {
      id: "solis",
      title: "Solis Architectural Luminaires",
      services: "Interactive Lighting Simulator, Global Architectural Portal, Spec Book",
      results: "Adopted by 85 Leading Architectural Firms, Awwwards Site of the Month",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80",
      narrative: "Simulating photon light dispersion in browser real-time, enabling interior architects to experience luminaire ambiance prior to commercial specification.",
    },
  ];

  const current = campaigns[activeIdx];

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Interactive Selector */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-6 border-b" style={{ borderColor: `${textSecond}30` }}>
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest block mb-2" style={{ color: accent }}>
              Selected Archives
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight">
              Curated Production Cases
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {campaigns.map((c, idx) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className="px-4 py-2 rounded-full text-xs font-serif font-bold transition-all cursor-pointer"
                style={{
                  backgroundColor: activeIdx === idx ? text : "transparent",
                  color: activeIdx === idx ? bg : textSecond,
                  border: `1px solid ${activeIdx === idx ? text : `${textSecond}30`}`,
                }}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>

        {/* Cinematic Case Showcase matching Image 4 (NO BOX CARDS!) */}
        <div className="space-y-12">
          
          <div className="relative aspect-[16/9] max-h-[500px] rounded-3xl overflow-hidden shadow-2xl border" style={{ borderColor: `${textSecond}30` }}>
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Dual Column Metadata matching Image 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-4">
            <div className="lg:col-span-4 space-y-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight">
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: textSecond }}>
                {current.narrative}
              </p>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pb-6 border-b" style={{ borderColor: `${textSecond}25` }}>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest block mb-1.5" style={{ color: accent }}>
                    SERVICES
                  </span>
                  <p className="text-sm font-serif font-medium leading-relaxed" style={{ color: text }}>
                    {current.services}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest block mb-1.5" style={{ color: accent }}>
                    RESULTS
                  </span>
                  <p className="text-sm font-serif font-medium leading-relaxed" style={{ color: text }}>
                    {current.results}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <a
                  href="#contact"
                  onClick={(e) => handleSmoothScroll(e, "#contact")}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider underline underline-offset-4 cursor-pointer"
                  style={{ color: text }}
                >
                  <span>Commission Campaign Inquiry</span>
                  <ArrowUpRight size={13} style={{ color: accent }} />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default DigitalAgency3Projects;
