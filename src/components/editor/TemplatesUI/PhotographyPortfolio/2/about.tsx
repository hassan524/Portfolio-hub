// @ts-nocheck
import { Compass, ShieldCheck, MapPin } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const U = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=85`;

export function PhotographyPortfolio2About({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#F7F6F2";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || "#EDEDE6";
  const ink = theme?.text || theme?.ink || "#242922";
  const inkSecond = theme?.["text-second"] || theme?.["ink-second"] || "#636A60";
  const accent = theme?.accent || "#2D5A3E";

  const exhibitions = props.exhibitions || [
    { year: "2025", gallery: "Nordic Light Museum", city: "Reykjavik", title: "Monoliths in Silence" },
    { year: "2024", gallery: "Gallery Kobo-Chika", city: "Tokyo", title: "Geometries of the North" },
    { year: "2023", gallery: "Danish Design Center", city: "Copenhagen", title: "Concrete & Fog" },
  ];

  return (
    <section id="about" className="py-20 sm:py-32" style={{ background: bgSecond, color: ink }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait Image */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-xl border" style={{ borderColor: `${ink}15` }}>
              <img
                src={props.aboutImage || U("photo-1507003211169-0a1dd7228f2d")}
                alt="Artist Portrait"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 p-5 rounded-2xl border shadow-lg"
              style={{ background: bg, borderColor: `${ink}15` }}
            >
              <Compass size={24} style={{ color: accent }} />
              <div>
                <span className="text-xs font-mono font-semibold block">Soren Lindqvist</span>
                <span className="text-[10px] font-mono opacity-70 block">Reykjavik & Copenhagen</span>
              </div>
            </div>
          </div>

          {/* Statement */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em]" style={{ color: accent }}>
              <span>✦</span>
              <Editable value={props.aboutEyebrow || "Artist Philosophy"} onChange={(v) => onChange?.({ aboutEyebrow: v })} />
            </div>

            <h2 className="text-3xl sm:text-5xl font-light tracking-tight leading-tight">
              <Editable
                value={props.aboutTitle || "Searching for balance between permanent stone and passing light."}
                onChange={(v) => onChange?.({ aboutTitle: v })}
              />
            </h2>

            <div className="space-y-4 text-sm sm:text-base font-light leading-relaxed" style={{ color: inkSecond }}>
              <p>
                <Editable
                  value={props.aboutP1 || "Based in Reykjavik, my practice is committed to slow, deliberate observation. Working with medium-format analog and ultra-high-resolution digital systems, I document how human-built architecture breathes within remote Nordic environments."}
                  onChange={(v) => onChange?.({ aboutP1: v })}
                />
              </p>
              <p>
                <Editable
                  value={props.aboutP2 || "Every limited edition print is produced under carbon-neutral darkroom standards using genuine pigment inks on pure cotton rag, guaranteed to retain its depth and luminosity for over two centuries."}
                  onChange={(v) => onChange?.({ aboutP2: v })}
                />
              </p>
            </div>

            {/* Exhibitions */}
            <div className="pt-4 border-t space-y-3" style={{ borderColor: `${ink}15` }}>
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">
                Selected Museum & Gallery Exhibitions
              </span>
              <div className="space-y-2.5">
                {exhibitions.map((ex: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between text-xs font-mono pb-2 border-b" style={{ borderColor: `${ink}0a` }}>
                    <div>
                      <span className="font-medium">{ex.title}</span>
                      <span className="opacity-60 ml-2">({ex.gallery}, {ex.city})</span>
                    </div>
                    <span className="opacity-50">{ex.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PhotographyPortfolio2About;
