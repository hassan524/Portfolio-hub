// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, TrendingUp, CheckCircle2 } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency2Projects({ props = {}, theme, onChange }: any) {
  const [activeProject, setActiveProject] = useState(0);

  // Dynamic theme colors
  const bg = theme?.bg || theme?.bgPrimary || "#0C0C0E";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || "#16161A";
  const text = theme?.text || theme?.ink || "#FFFFFF";
  const textSecond = theme?.["text-second"] || theme?.["ink-second"] || theme?.textSecond || "#9CA3AF";
  const surface = theme?.surface || "#1F1F24";
  const accent = theme?.accent || "#CCFF00";

  const cases = [
    {
      client: "CloudStack AI",
      sector: "Enterprise Infrastructure",
      headline: "+340% ARR Acceleration in 14 Months",
      narrative: "Re-engineered tier pricing architecture, instituted inbound enterprise product loops, and reduced customer acquisition payback from 18 months to 4.2 months.",
      statPrimary: "+340%",
      statLabel: "Annual Recurring Revenue",
      statSecondary: "4.2 Mo",
      statSecondLabel: "CAC Payback",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    },
    {
      client: "Vektor Health",
      sector: "Clinical Intelligence",
      headline: "$42M Series-B Secured & Market Expansion",
      narrative: "Crafted corporate growth roadmap and patient acquisition portal, resulting in contracts with 28 premier health systems nationwide.",
      statPrimary: "$42M",
      statLabel: "Series-B Oversubscribed",
      statSecondary: "28 Systems",
      statSecondLabel: "Commercial Contracts",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    },
    {
      client: "Novus Logistics",
      sector: "Cross-Border Supply Chain",
      headline: "5.8x Freight Volume Handled with Zero Headcount Growth",
      narrative: "Deployed automated route dispatch orchestration and automated supplier APIs, lifting EBITDA margin by 440 basis points.",
      statPrimary: "5.8x",
      statLabel: "Volume Throughput",
      statSecondary: "+440 bps",
      statSecondLabel: "EBITDA Margin",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const current = cases[activeProject];

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
      className="py-24 transition-colors relative"
      style={{ backgroundColor: bg, color: text }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b" style={{ borderColor: `${textSecond}25` }}>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3" style={{ backgroundColor: `${accent}20`, color: accent }}>
              <TrendingUp size={13} />
              <span>Transformation Vault</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Selected Venture Multipliers
            </h2>
          </div>

          {/* Interactive Switcher - NO BOX CARDS */}
          <div className="flex items-center gap-2">
            {cases.map((c, idx) => (
              <button
                key={c.client}
                type="button"
                onClick={() => setActiveProject(idx)}
                className="px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer"
                style={{
                  backgroundColor: activeProject === idx ? text : surface,
                  color: activeProject === idx ? bg : textSecond,
                  border: `1px solid ${activeProject === idx ? text : `${textSecond}30`}`,
                }}
              >
                {c.client}
              </button>
            ))}
          </div>
        </div>

        {/* Large Cinematic Case Canvas - NO BOX CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Case Narrative & Big Stats */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3 text-xs font-mono" style={{ color: accent }}>
              <span>{current.sector}</span>
              <span>•</span>
              <span>{current.client}</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-snug">
              {current.headline}
            </h3>

            <p className="text-sm sm:text-base leading-relaxed" style={{ color: textSecond }}>
              {current.narrative}
            </p>

            {/* Metrics Callout */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t" style={{ borderColor: `${textSecond}20` }}>
              <div>
                <div className="text-4xl sm:text-5xl font-black tracking-tight" style={{ color: accent }}>
                  {current.statPrimary}
                </div>
                <div className="text-xs font-semibold mt-1" style={{ color: textSecond }}>
                  {current.statLabel}
                </div>
              </div>

              <div>
                <div className="text-4xl sm:text-5xl font-black tracking-tight" style={{ color: text }}>
                  {current.statSecondary}
                </div>
                <div className="text-xs font-semibold mt-1" style={{ color: textSecond }}>
                  {current.statSecondLabel}
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, "#contact")}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider underline underline-offset-4 cursor-pointer"
                style={{ color: accent }}
              >
                <span>Inquire About Similar Architecture</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl" style={{ border: `1px solid ${textSecond}30` }}>
              <img
                src={current.image}
                alt={current.client}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(to top, ${bg}dd 0%, transparent 40%)`,
                }}
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default DigitalAgency2Projects;
