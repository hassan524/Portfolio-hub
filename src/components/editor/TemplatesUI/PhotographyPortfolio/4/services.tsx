// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { Terminal, Check, Camera, Sliders, Shield, Zap } from "lucide-react";

interface ServicesProps {
  theme?: Record<string, string>;
  data?: {
    badge?: string;
    title?: string;
    subtitle?: string;
    items?: Array<{
      tier: string;
      code: string;
      fee: string;
      popular?: boolean;
      summary: string;
      deliverables: string[];
    }>;
  };
  onUpdate?: (path: string, val: any) => void;
}

export const PhotographyPortfolio4Services: React.FC<ServicesProps> = ({
  theme = {},
  data = {},
  onUpdate,
}) => {
  const bg = theme.bg || "#0A0B0E";
  const bgSecond = theme["bg-second"] || theme.bgSecond || "#13151A";
  const text = theme.text || theme.ink || "#F3F4F6";
  const textSecond = theme["text-second"] || theme["ink-second"] || "#9CA3AF";
  const accent = theme.accent || "#E53E3E";
  const onAccent = theme["on-accent"] || "#FFFFFF";

  const defaultItems = [
    {
      tier: "Album Visuals & Artwork",
      code: "PROD-TIER-01",
      fee: "$4,800",
      popular: false,
      summary: "Dedicated studio and urban night location sessions for record labels, vinyl packaging, and press campaign imagery.",
      deliverables: [
        "Full Day Location & Studio Session",
        "Leica 35mm + 120 Medium Format Film",
        "High-Res Flextight Drum Scans (16-Bit)",
        "Master Vinyl Gatefold & Digital Pack Artwork",
        "Full Commercial Worldwide Rights",
      ],
    },
    {
      tier: "Commercial & Unit Stills",
      code: "PROD-TIER-02",
      fee: "$9,500",
      popular: true,
      summary: "High-stakes feature film unit still photography, cinematic brand fashion lookbooks, and high-production commercials.",
      deliverables: [
        "Multi-Day Production Set Coverage",
        "Blimped Silent Cameras for Soundstages",
        "Cinestill & Kodak Vision3 Film Stock",
        "Color-Graded High-Volume Daily Deliveries",
        "DGA & IATSE Set Compliance Ready",
        "Cinema Poster Key-Art Deliverables",
      ],
    },
    {
      tier: "Global Tour Documentary",
      code: "PROD-TIER-03",
      fee: "$16,000",
      popular: false,
      summary: "Embedded tour documentary chronicling arena concerts, private jet transit, green-room candids, and commemorative monographs.",
      deliverables: [
        "Embedded Tour Residency (7-14 Days)",
        "All-Access Pit & Backstage Candid Stills",
        "Instant Daily Social Press Transmissions",
        "Curated 200-Page Hardcover Monograph",
        "All International Transit & Gear Carnets",
      ],
    },
  ];

  const items = data.items && data.items.length > 0 ? data.items : defaultItems;

  return (
    <section
      id="services"
      className="py-24 px-6 md:px-12 lg:px-20 transition-colors duration-300 relative font-mono"
      style={{ backgroundColor: bg, color: text }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 mb-3 text-xs uppercase tracking-widest" style={{ color: accent }}>
            <Sliders className="w-4 h-4" />
            <span>
              <Editable
                value={data.badge || "COMMISSION SPECS & PACKAGES"}
                onChange={(val: string) => onUpdate?.("badge", val)}
              />
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-4" style={{ color: text }}>
            <Editable
              value={data.title || "Production Tiers & Commercial Assignments"}
              onChange={(val: string) => onUpdate?.("title", val)}
            />
          </h2>
          <p className="text-xs md:text-sm font-sans font-light leading-relaxed max-w-2xl" style={{ color: textSecond }}>
            <Editable
              value={
                data.subtitle ||
                "Engineered for motion picture directors, record labels, and premier fashion houses demanding authentic analog grain, cinematic lighting, and rapid digital turnaround."
              }
              onChange={(val: string) => onUpdate?.("subtitle", val)}
            />
          </p>
        </div>

        {/* Pricing/Services Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {items.map((item, index) => {
            const isPop = item.popular;
            return (
              <div
                key={index}
                className="relative rounded-lg p-8 border flex flex-col justify-between transition-all duration-300 hover:border-white"
                style={{
                  backgroundColor: bgSecond,
                  borderColor: isPop ? accent : `${accent}35`,
                  boxShadow: isPop ? `0 0 30px rgba(229,62,62,0.15)` : "none",
                }}
              >
                {isPop && (
                  <div
                    className="absolute -top-3 right-6 px-3 py-1 rounded text-[9px] uppercase tracking-widest font-bold"
                    style={{ backgroundColor: accent, color: onAccent }}
                  >
                    FEATURED UNIT
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between text-[10px] mb-2" style={{ color: textSecond }}>
                    <span>{item.code}</span>
                    <span style={{ color: accent }}>[ ACTIVE ]</span>
                  </div>

                  <h3 className="text-xl font-bold uppercase tracking-wider mb-2" style={{ color: text }}>
                    <Editable
                      value={item.tier}
                      onChange={(val: string) => onUpdate?.(`items.${index}.tier`, val)}
                    />
                  </h3>

                  <div className="mb-6 pb-6 border-b" style={{ borderColor: `${accent}25` }}>
                    <span className="text-3xl font-bold tracking-tight" style={{ color: accent }}>
                      <Editable
                        value={item.fee}
                        onChange={(val: string) => onUpdate?.(`items.${index}.fee`, val)}
                      />
                    </span>
                    <span className="text-[11px] ml-2" style={{ color: textSecond }}>
                      / PROJECT BASE
                    </span>
                  </div>

                  <p className="text-xs font-sans font-light leading-relaxed mb-6" style={{ color: textSecond }}>
                    <Editable
                      value={item.summary}
                      onChange={(val: string) => onUpdate?.(`items.${index}.summary`, val)}
                    />
                  </p>

                  <div className="space-y-2.5 mb-8">
                    {item.deliverables.map((deliv, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs font-sans">
                        <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: accent }} />
                        <span style={{ color: text }}>
                          <Editable
                            value={deliv}
                            onChange={(val: string) =>
                              onUpdate?.(`items.${index}.deliverables.${dIdx}`, val)
                            }
                          />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="#contact"
                  className="w-full py-3 rounded text-xs uppercase tracking-widest font-semibold text-center transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border hover:shadow-[0_0_20px_rgba(229,62,62,0.3)]"
                  style={{
                    backgroundColor: isPop ? accent : "transparent",
                    color: isPop ? onAccent : text,
                    borderColor: accent,
                  }}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>[ LOCK PRODUCTION SLOT ]</span>
                </a>
              </div>
            );
          })}
        </div>

        {/* Gear Rider Strip */}
        <div
          className="rounded-lg p-6 border flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            backgroundColor: bgSecond,
            borderColor: `${accent}25`,
          }}
        >
          <div className="flex items-center gap-3">
            <Camera className="w-5 h-5 shrink-0" style={{ color: accent }} />
            <div className="text-xs">
              <span className="block font-bold text-white uppercase">Standard Gear Rider On-Set:</span>
              <span className="font-sans text-xs" style={{ color: textSecond }}>
                Leica M-A (Typ 127) • Hasselblad 503CW 6x6 • Leica M11 Monochrom • Summilux-M 21/35/50/75mm f/1.4 ASPH
              </span>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2 text-xs" style={{ color: accent }}>
            <Shield className="w-4 h-4" />
            <span>Fully Insured Global Worldwide Equipment</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotographyPortfolio4Services;
