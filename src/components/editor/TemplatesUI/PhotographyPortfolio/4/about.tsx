// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { Terminal, Award, Disc, Eye } from "lucide-react";

interface AboutProps {
  theme?: Record<string, string>;
  data?: {
    badge?: string;
    title?: string;
    manifestoP1?: string;
    manifestoP2?: string;
    quote?: string;
    artistName?: string;
    artistRole?: string;
    imageUrl?: string;
    honors?: string[];
  };
  onUpdate?: (path: string, val: any) => void;
}

export const PhotographyPortfolio4About: React.FC<AboutProps> = ({
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

  const defaultHonors = [
    "LEICA OSKAR BARNACK AWARD NOMINEE (2024)",
    "WORLD PRESS PHOTO CONTEMPORARY ISSUES (2023)",
    "CANNES FILM FESTIVAL OFFICIAL UNIT STILLS (2024)",
    "MAGNUM PHOTOS MASTERCLASS FELLOW",
  ];

  const honors = data.honors && data.honors.length > 0 ? data.honors : defaultHonors;

  return (
    <section
      id="about"
      className="py-24 px-6 md:px-12 lg:px-20 transition-colors duration-300 relative border-b font-mono"
      style={{ backgroundColor: bgSecond, borderColor: `${accent}25`, color: text }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
          {/* Left: Darkroom Safelight Portrait */}
          <div className="lg:col-span-5 relative">
            <div
              className="relative rounded-lg overflow-hidden border p-2 shadow-2xl group"
              style={{
                backgroundColor: bg,
                borderColor: `${accent}40`,
              }}
            >
              <div className="rounded overflow-hidden aspect-[4/5] relative">
                <img
                  src={
                    data.imageUrl ||
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80"
                  }
                  alt="Nocturne Artist in Darkroom"
                  className="w-full h-full object-cover filter contrast-[1.15] grayscale"
                />
                {/* Red safelight ambient wash */}
                <div
                  className="absolute inset-0 mix-blend-color opacity-70"
                  style={{ backgroundColor: accent }}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"
                />
                <div className="absolute bottom-4 left-4 right-4 text-[10px] text-white/90 uppercase tracking-widest flex items-center justify-between">
                  <span>BERLIN DARKROOM LAB</span>
                  <span style={{ color: accent }}>● IN USE</span>
                </div>
              </div>
            </div>

            {/* Overlapping Stamp */}
            <div
              className="absolute -bottom-4 -right-4 px-4 py-2 rounded border hidden sm:block text-[10px] uppercase font-bold tracking-widest"
              style={{
                backgroundColor: bg,
                borderColor: accent,
                color: accent,
              }}
            >
              [ CERTIFIED ANALOG MASTER ]
            </div>
          </div>

          {/* Right: Manifesto & Philosophy */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 mb-3 text-xs uppercase tracking-widest" style={{ color: accent }}>
              <Terminal className="w-4 h-4" />
              <span>
                <Editable
                  value={data.badge || "DARKROOM MANIFESTO // 001"}
                  onChange={(val: string) => onUpdate?.("badge", val)}
                />
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-6 leading-tight" style={{ color: text }}>
              <Editable
                value={
                  data.title ||
                  "Rejecting Digital Sterility in Favor of Raw Silver Gelatin Grain."
                }
                onChange={(val: string) => onUpdate?.("title", val)}
              />
            </h2>

            <div className="space-y-4 text-xs md:text-sm font-sans font-light leading-relaxed mb-8" style={{ color: textSecond }}>
              <p>
                <Editable
                  value={
                    data.manifestoP1 ||
                    "We live in an age of frictionless pixel perfection where every image is algorithmically smoothed, HDR-flattened, and disposable. Nocturne exists as a deliberate counter-movement. We shoot on 35mm and 120 analog film stocks because real physical chemistry responds to tungsten light with an atmospheric breathing soul that code can never fake."
                  }
                  onChange={(val: string) => onUpdate?.("manifestoP1", val)}
                />
              </p>
              <p>
                <Editable
                  value={
                    data.manifestoP2 ||
                    "Every roll is hand-developed in our Berlin darkroom using custom-formulated developer baths. When you look at our negatives, you are seeing light that actually collided with silver halide crystals on a specific rainy 3 AM sidewalk in Shibuya or an arena stadium tunnel in London."
                  }
                  onChange={(val: string) => onUpdate?.("manifestoP2", val)}
                />
              </p>
            </div>

            {/* Manifesto Quote */}
            <div
              className="p-6 rounded border-l-2 mb-8 font-mono"
              style={{
                backgroundColor: bg,
                borderColor: accent,
              }}
            >
              <p className="text-sm md:text-base italic mb-3" style={{ color: text }}>
                “<Editable
                  value={
                    data.quote ||
                    "Shadow is not the absence of light; it is the canvas where truth hides when daylight gets too loud."
                  }
                  onChange={(val: string) => onUpdate?.("quote", val)}
                />”
              </p>
              <div className="text-xs uppercase">
                <span className="font-bold mr-2" style={{ color: text }}>
                  <Editable
                    value={data.artistName || "Dorian K. Vance"}
                    onChange={(val: string) => onUpdate?.("artistName", val)}
                  />
                </span>
                <span style={{ color: accent }}>
                  <Editable
                    value={data.artistRole || "// Director of Photography & Darkroom Printer"}
                    onChange={(val: string) => onUpdate?.("artistRole", val)}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Honors & Accolades */}
        <div className="pt-8 border-t" style={{ borderColor: `${accent}20` }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {honors.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded border text-[11px] uppercase tracking-wider flex items-center gap-3"
                style={{
                  backgroundColor: bg,
                  borderColor: `${accent}25`,
                  color: text,
                }}
              >
                <Award className="w-4 h-4 shrink-0" style={{ color: accent }} />
                <span>
                  <Editable
                    value={item}
                    onChange={(val: string) => onUpdate?.(`honors.${idx}`, val)}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotographyPortfolio4About;
