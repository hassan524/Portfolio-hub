// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { Disc, Play, Terminal, ArrowRight, Aperture } from "lucide-react";

interface HeroProps {
  theme?: Record<string, string>;
  data?: {
    badge?: string;
    title?: string;
    description?: string;
    primaryCtaText?: string;
    primaryCtaLink?: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
    imageUrl?: string;
    filmStock?: string;
    specs?: Array<{ label: string; value: string }>;
  };
  onUpdate?: (path: string, val: any) => void;
}

export const PhotographyPortfolio4Hero: React.FC<HeroProps> = ({
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

  const defaultSpecs = [
    { label: "PRIMARY BODIES", value: "Leica MP / Hasselblad 503CW" },
    { label: "ANALOG EMULSIONS", value: "Cinestill 800T • Kodak Double-X" },
    { label: "DARKROOM LAB", value: "Custom Rodinal / D-76 Chemistry" },
    { label: "ARCHIVAL RESOLUTION", value: "Hasselblad Flextight 8000 DPI" },
  ];

  const specs = data.specs && data.specs.length > 0 ? data.specs : defaultSpecs;

  return (
    <section
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20 transition-colors duration-300 relative overflow-hidden"
      style={{ backgroundColor: bg, color: text }}
    >
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Darkroom Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* HUD Status Pill */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded font-mono text-[11px] uppercase tracking-widest border mb-6 w-fit"
              style={{
                backgroundColor: bgSecond,
                borderColor: `${accent}40`,
                color: accent,
              }}
            >
              <Terminal className="w-3.5 h-3.5" />
              <Editable
                value={data.badge || "ANALOG REEL // ARCHIVE 2026"}
                onChange={(val: string) => onUpdate?.("badge", val)}
              />
            </div>

            {/* Hero Main Heading */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-mono font-bold tracking-tight leading-[1.08] mb-6 uppercase"
              style={{ color: text }}
            >
              <Editable
                value={
                  data.title ||
                  "Cinematic Darkness. 35mm Grain. Raw Nocturnal Realism."
                }
                onChange={(val: string) => onUpdate?.("title", val)}
              />
            </h1>

            {/* Description */}
            <p
              className="text-base sm:text-lg font-light leading-relaxed mb-8 max-w-xl"
              style={{ color: textSecond }}
            >
              <Editable
                value={
                  data.description ||
                  "Documenting underground music culture, cinematic film production stills, and nocturnal urban topography across Tokyo, Berlin, and New York on vintage tungsten emulsions."
                }
                onChange={(val: string) => onUpdate?.("description", val)}
              />
            </p>

            {/* Dual CTAs with Terminal brackets */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
              <a
                href={data.primaryCtaLink || "#contact"}
                className="px-7 py-4 rounded font-mono text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-lg flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(229,62,62,0.5)] active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: accent,
                  color: onAccent,
                }}
              >
                <Aperture className="w-4 h-4" />
                <Editable
                  value={data.primaryCtaText || "[ COMMISSION PRODUCTION ]"}
                  onChange={(val: string) => onUpdate?.("primaryCtaText", val)}
                />
              </a>

              <a
                href={data.secondaryCtaLink || "#archives"}
                className="px-7 py-4 rounded font-mono text-xs uppercase tracking-widest font-semibold transition-all duration-300 border flex items-center justify-center gap-2 hover:bg-white/5 active:scale-95 cursor-pointer"
                style={{
                  borderColor: `${accent}40`,
                  color: text,
                  backgroundColor: "transparent",
                }}
              >
                <Editable
                  value={data.secondaryCtaText || "VIEW ARCHIVE REELS"}
                  onChange={(val: string) => onUpdate?.("secondaryCtaText", val)}
                />
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Telemetry specs grid */}
            <div
              className="grid grid-cols-2 gap-4 p-5 rounded-lg border font-mono text-xs"
              style={{
                backgroundColor: bgSecond,
                borderColor: `${accent}25`,
              }}
            >
              {specs.map((item, idx) => (
                <div key={idx} className="space-y-0.5">
                  <span className="block text-[10px] uppercase tracking-wider" style={{ color: accent }}>
                    <Editable
                      value={item.label}
                      onChange={(val: string) => onUpdate?.(`specs.${idx}.label`, val)}
                    />
                  </span>
                  <span className="block font-medium truncate" style={{ color: text }}>
                    <Editable
                      value={item.value}
                      onChange={(val: string) => onUpdate?.(`specs.${idx}.value`, val)}
                    />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 35mm Negative Film Frame Showcase */}
          <div className="lg:col-span-6">
            <div
              className="relative rounded-xl overflow-hidden border p-3 shadow-2xl"
              style={{
                backgroundColor: bgSecond,
                borderColor: `${accent}40`,
              }}
            >
              {/* Film Sprocket Perforation Simulation Top Bar */}
              <div
                className="py-1 px-3 mb-2 flex items-center justify-between text-[9px] font-mono tracking-widest uppercase border-b"
                style={{ borderColor: `${accent}20`, color: textSecond }}
              >
                <span style={{ color: accent }}>▲ KODAK 500T 5219</span>
                <span>SAFETY FILM • FRAME 18A</span>
                <span>ISO 800 +1 STOP</span>
              </div>

              {/* Main Photo Frame */}
              <div className="relative rounded overflow-hidden aspect-[16/10] group">
                <img
                  src={
                    data.imageUrl ||
                    "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80"
                  }
                  alt="Nocturnal 35mm Cinema Still"
                  className="w-full h-full object-cover filter contrast-[1.1] transition-transform duration-700 group-hover:scale-105"
                />

                {/* Viewfinder crosshairs */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
                  <div className="w-10 h-10 border border-dashed rounded-full" style={{ borderColor: accent }} />
                  <div className="absolute w-4 h-0.5" style={{ backgroundColor: accent }} />
                  <div className="absolute h-4 w-0.5" style={{ backgroundColor: accent }} />
                </div>

                {/* Film stock indicator overlay */}
                <div
                  className="absolute bottom-4 left-4 right-4 p-3 rounded font-mono text-[11px] backdrop-blur-md flex items-center justify-between border"
                  style={{
                    backgroundColor: "rgba(10, 11, 14, 0.75)",
                    borderColor: `${accent}30`,
                  }}
                >
                  <span className="flex items-center gap-2" style={{ color: text }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
                    <Editable
                      value={data.filmStock || "SEQUENCE: SHINJUKU SUB-STATION // 03:14 AM"}
                      onChange={(val: string) => onUpdate?.("filmStock", val)}
                    />
                  </span>
                  <span className="text-[10px]" style={{ color: accent }}>24MM F/1.4</span>
                </div>
              </div>

              {/* Film Sprocket Perforation Bottom Bar */}
              <div
                className="py-1 px-3 mt-2 flex items-center justify-between text-[9px] font-mono tracking-widest uppercase border-t"
                style={{ borderColor: `${accent}20`, color: textSecond }}
              >
                <span>EASTMAN KODAK CO.</span>
                <span>• • • • • • • •</span>
                <span style={{ color: accent }}>ROLL #04-89</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotographyPortfolio4Hero;
