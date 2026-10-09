// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { Sparkles, Heart, Award, CheckCircle } from "lucide-react";

interface AboutProps {
  theme?: Record<string, string>;
  data?: {
    badge?: string;
    title?: string;
    subtitle?: string;
    bioParagraph1?: string;
    bioParagraph2?: string;
    quote?: string;
    artistName?: string;
    artistTitle?: string;
    imageUrl?: string;
    pressList?: string[];
  };
  onUpdate?: (path: string, val: any) => void;
}

export const PhotographyPortfolio3About: React.FC<AboutProps> = ({
  theme = {},
  data = {},
  onUpdate,
}) => {
  const bg = theme.bg || "#FAF7F2";
  const bgSecond = theme["bg-second"] || theme.bgSecond || "#F4EFE6";
  const text = theme.text || theme.ink || "#251E19";
  const textSecond = theme["text-second"] || theme["ink-second"] || "#6F665E";
  const accent = theme.accent || "#C5A059";
  const onAccent = theme["on-accent"] || "#FFFFFF";

  const defaultPress = [
    "VOGUE WEDDINGS",
    "HARPER’S BAZAAR",
    "OVER THE MOON",
    "BRIDES MAGAZINE",
    "THE LANE EDITORIAL",
    "STYLE ME PRETTY",
  ];

  const press = data.pressList && data.pressList.length > 0 ? data.pressList : defaultPress;

  return (
    <section
      id="about"
      className="py-24 px-6 md:px-12 lg:px-20 transition-colors duration-300 relative"
      style={{ backgroundColor: bgSecond, color: text }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          {/* Left: Artist Portrait in Gilded Arch Frame */}
          <div className="lg:col-span-5 relative">
            <div
              className="relative rounded-t-[10rem] rounded-b-2xl overflow-hidden p-2.5 shadow-xl mx-auto max-w-md lg:max-w-none"
              style={{
                backgroundColor: bg,
                border: `1px solid ${accent}40`,
              }}
            >
              <div className="rounded-t-[9.5rem] rounded-b-xl overflow-hidden aspect-[3/4]">
                <img
                  src={
                    data.imageUrl ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
                  }
                  alt="Aurelia - Lead Artist"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Badge overlay */}
            <div
              className="absolute -bottom-6 right-6 md:right-12 rounded-2xl p-4 shadow-lg border hidden sm:block"
              style={{
                backgroundColor: bg,
                borderColor: `${accent}40`,
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4" style={{ color: accent }} />
                <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: accent }}>
                  Vogue Top Destination
                </span>
              </div>
              <span className="text-xs font-serif italic" style={{ color: text }}>
                Photographer of the Year 2024
              </span>
            </div>
          </div>

          {/* Right: Atelier Philosophy & Narrative */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4" style={{ color: accent }} />
              <span className="text-xs uppercase tracking-[0.25em] font-medium" style={{ color: accent }}>
                <Editable
                  value={data.badge || "THE ATELIER & VISION"}
                  onChange={(val) => onUpdate?.("badge", val)}
                />
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight mb-6 leading-tight" style={{ color: text }}>
              <Editable
                value={
                  data.title ||
                  "Honoring the Romance of Real Connection with Haute Editorial Polish."
                }
                onChange={(val) => onUpdate?.("title", val)}
              />
            </h2>

            <div className="space-y-4 text-base font-light leading-relaxed mb-8" style={{ color: textSecond }}>
              <p>
                <Editable
                  value={
                    data.bioParagraph1 ||
                    "Trained in classical fine art portraiture in Florence and editorial photojournalism in Paris, Aurelia brings a quiet grace to destination wedding celebrations. We believe true luxury is not stiffness—it is the freedom to laugh with unbridled joy while trusting every candid glance is captured like an Italian renaissance canvas."
                  }
                  onChange={(val) => onUpdate?.("bioParagraph1", val)}
                />
              </p>
              <p>
                <Editable
                  value={
                    data.bioParagraph2 ||
                    "We blend the nostalgic grain of medium-format film (Contax 645 & Hasselblad) with modern digital clarity, providing an enduring visual heritage that your great-grandchildren will treasure with the exact same emotional heartbeat as on your wedding night."
                  }
                  onChange={(val) => onUpdate?.("bioParagraph2", val)}
                />
              </p>
            </div>

            {/* Quote block */}
            <div
              className="p-6 rounded-2xl border-l-2 mb-8"
              style={{
                backgroundColor: bg,
                borderColor: accent,
              }}
            >
              <p className="font-serif italic text-base md:text-lg mb-3" style={{ color: text }}>
                “<Editable
                  value={
                    data.quote ||
                    "Photography is the only art form that pauses time without interrupting love. It is our greatest honor to hold that mirror for you."
                  }
                  onChange={(val) => onUpdate?.("quote", val)}
                />”
              </p>
              <div>
                <span className="font-medium text-xs tracking-wider uppercase block" style={{ color: text }}>
                  <Editable
                    value={data.artistName || "Aurelia Fontaine"}
                    onChange={(val) => onUpdate?.("artistName", val)}
                  />
                </span>
                <span className="text-[11px] font-light" style={{ color: accent }}>
                  <Editable
                    value={data.artistTitle || "Founder & Lead Principal Artist"}
                    onChange={(val) => onUpdate?.("artistTitle", val)}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Press Bar */}
        <div className="pt-12 border-t" style={{ borderColor: `${accent}25` }}>
          <span className="block text-center text-[10px] uppercase tracking-[0.3em] font-medium mb-8" style={{ color: textSecond }}>
            Honored with Features in International Publications
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
            {press.map((item, idx) => (
              <span
                key={idx}
                className="font-serif text-sm md:text-base tracking-[0.2em] font-light transition-opacity hover:opacity-70"
                style={{ color: text }}
              >
                <Editable
                  value={item}
                  onChange={(val) => onUpdate?.(`pressList.${idx}`, val)}
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotographyPortfolio3About;
