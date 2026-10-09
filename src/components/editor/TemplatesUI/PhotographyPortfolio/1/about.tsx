// @ts-nocheck
import { Award, Camera, Heart, CheckCircle2, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const U = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=85`;

export function PhotographyPortfolio1About({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#FCFBF8";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || "#F5F3ED";
  const ink = theme?.text || theme?.ink || "#1A1918";
  const inkSecond = theme?.["text-second"] || theme?.["ink-second"] || "#6E6B65";
  const accent = theme?.accent || "#8E2823";
  const onAccent = theme?.["on-accent"] || "#FFFFFF";

  const clients = props.clients || [
    "Vogue France", "Dior Haute Couture", "Chanel Studio", "Harper's Bazaar",
    "Saint Laurent", "LVMH Prize", "Elle Paris", "Balenciaga",
  ];

  const awards = props.awards || [
    { year: "2025", title: "PX3 Prix de la Photographie Paris", desc: "Gold Medal · Fine Art Fashion Category" },
    { year: "2024", title: "Hasselblad Masters Finalist", desc: "Portrait & Beauty Section" },
    { year: "2023", title: "International Photography Awards (IPA)", desc: "1st Place · Editorial Cover Feature" },
  ];

  return (
    <section id="about" className="py-20 sm:py-32" style={{ background: bgSecond, color: ink }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
              <img
                src={props.aboutImage || U("photo-1534528741775-53994a69daeb")}
                alt="Photographer Portrait"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] font-mono tracking-widest uppercase opacity-80 block">Auteur & Director</span>
                <span className="text-xl font-serif mt-1 block">Claire Delacroix</span>
              </div>
            </div>

            {/* Experience Floating Badge */}
            <div
              className="absolute -bottom-6 -right-6 hidden sm:flex flex-col p-6 rounded-2xl shadow-xl border text-center"
              style={{ background: bg, borderColor: `${ink}15` }}
            >
              <span className="text-3xl font-serif font-bold" style={{ color: accent }}>14+</span>
              <span className="text-[10px] font-mono tracking-wider uppercase mt-1" style={{ color: inkSecond }}>Years of Craft</span>
            </div>
          </div>

          {/* Biography Content Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em]" style={{ color: accent }}>
                <Camera size={13} />
                <Editable value={props.aboutEyebrow || "The Artist Behind the Lens"} onChange={(v) => onChange?.({ aboutEyebrow: v })} />
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight leading-tight">
                <Editable
                  value={props.aboutTitle || "Choreographing shadows, texture and high-fashion narrative."}
                  onChange={(v) => onChange?.({ aboutTitle: v })}
                />
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base font-light leading-relaxed" style={{ color: inkSecond }}>
              <p>
                <Editable
                  value={props.aboutP1 || "Trained under legendary Parisian darkroom masters and influenced by classic Italian cinema, I approach every shoot as a painter approaches raw canvas. Light is not merely an illumination tool; it is the emotional protagonist of every frame."}
                  onChange={(v) => onChange?.({ aboutP1: v })}
                />
              </p>
              <p>
                <Editable
                  value={props.aboutP2 || "Whether shooting runway moments in Milan, confidential lookbooks in Paris châteaux, or intimate celebrity portraiture in Manhattan, my mission is to crystallize fleeting haute elegance into timeless museum-grade archives."}
                  onChange={(v) => onChange?.({ aboutP2: v })}
                />
              </p>
            </div>

            {/* Accolades & Honours */}
            <div className="pt-4 border-t space-y-3" style={{ borderColor: `${ink}15` }}>
              <div className="text-xs font-mono uppercase tracking-widest font-semibold" style={{ color: ink }}>
                Selected Accolades & Honours
              </div>
              <div className="space-y-3">
                {awards.map((a: any, idx: number) => (
                  <div key={idx} className="flex items-start justify-between gap-4 text-xs">
                    <div>
                      <span className="font-semibold">{a.title}</span>
                      <span className="block text-opacity-70 mt-0.5" style={{ color: inkSecond }}>{a.desc}</span>
                    </div>
                    <span className="font-mono opacity-60 text-[11px]">{a.year}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Editorial Client Ribbon */}
            <div className="pt-4 border-t" style={{ borderColor: `${ink}15` }}>
              <div className="text-[11px] font-mono uppercase tracking-wider mb-3 opacity-60">
                Publications & Featured Houses
              </div>
              <div className="flex flex-wrap gap-2">
                {clients.map((c: string) => (
                  <span
                    key={c}
                    className="px-3.5 py-1.5 rounded-full text-xs font-serif border"
                    style={{ background: bg, borderColor: `${ink}15`, color: ink }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PhotographyPortfolio1About;
