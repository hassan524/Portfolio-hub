// @ts-nocheck
import { Check, ArrowUpRight, Camera, Sparkles, Sliders } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function PhotographyPortfolio1Services({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#FCFBF8";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || "#F5F3ED";
  const ink = theme?.text || theme?.ink || "#1A1918";
  const inkSecond = theme?.["text-second"] || theme?.["ink-second"] || "#6E6B65";
  const accent = theme?.accent || "#8E2823";
  const onAccent = theme?.["on-accent"] || "#FFFFFF";

  const go = (e: any, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const packages = props.packages || [
    {
      name: "Editorial Lookbook",
      badge: "Commercial Brands",
      price: "From €3,200",
      description: "Designed for fashion houses and independent labels launching seasonal capsule collections and ready-to-wear lines.",
      features: [
        "1-Day Studio or Parisian Location Shoot",
        "Up to 8 Complete Wardrobe Looks",
        "35 Master Retouched Editorial Plates",
        "Full Digital Lookbook & Commercial Usage",
        "Dedicated Lighting & Digital Assistant",
      ],
      cta: "Book Lookbook",
    },
    {
      name: "Haute Cover Story",
      badge: "Signature Tier",
      price: "From €6,800",
      featured: true,
      description: "Comprehensive creative direction and multi-day production for international magazine features, billboards, and luxury campaigns.",
      features: [
        "2-Day Multi-Location or Château Production",
        "Full Creative Direction & Moodboard Curation",
        "70 Master Fine Art Plates (Analog + Digital)",
        "Contax 645 & Medium Format Analog Rolls",
        "Global Editorial & Commercial Print Rights",
        "Fast-Track 5-Day Delivery of Master Files",
      ],
      cta: "Commission Cover Story",
    },
    {
      name: "Auteur Portraiture",
      badge: "Private VIP",
      price: "From €2,400",
      description: "Intimate and timeless portraiture session for creative directors, artists, and prominent private patrons.",
      features: [
        "3-Hour Private Studio Session in Paris",
        "15 Hand-Graded Black & White Plates",
        "Museum-Grade Hahnemühle Archival Print Box",
        "Bespoke Framing & Authenticity Certificate",
        "Private Digital Archive Access",
      ],
      cta: "Reserve Private Session",
    },
  ];

  return (
    <section id="services" className="py-20 sm:py-32" style={{ background: bg, color: ink }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em]" style={{ color: accent }}>
            <Camera size={13} />
            <Editable value={props.servicesEyebrow || "Services & Commissions"} onChange={(v) => onChange?.({ servicesEyebrow: v })} />
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight">
            <Editable value={props.servicesTitle || "Bespoke Production Packages"} onChange={(v) => onChange?.({ servicesTitle: v })} />
          </h2>
          <p className="text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto" style={{ color: inkSecond }}>
            <Editable
              value={props.servicesSubtitle || "Transparent investment tiers for editorial publications, luxury fashion houses, and discerning private collectors worldwide."}
              onChange={(v) => onChange?.({ servicesSubtitle: v })}
            />
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg: any, i: number) => (
            <div
              key={pkg.name || i}
              className={`rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 relative ${
                pkg.featured
                  ? "shadow-2xl ring-2 scale-100 lg:-translate-y-4"
                  : "border shadow-sm hover:shadow-lg"
              }`}
              style={{
                background: pkg.featured ? bgSecond : bg,
                borderColor: `${ink}18`,
                ringColor: pkg.featured ? accent : "transparent",
              }}
            >
              {pkg.featured && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase font-semibold text-white shadow-md"
                  style={{ background: accent }}
                >
                  Most Requested
                </div>
              )}

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono tracking-widest uppercase px-3 py-1 rounded-full" style={{ background: `${accent}15`, color: accent }}>
                    {pkg.badge}
                  </span>
                  <span className="text-xs font-mono opacity-60">Tier 0{i + 1}</span>
                </div>

                <div>
                  <h3 className="text-2xl font-serif">{pkg.name}</h3>
                  <div className="text-2xl sm:text-3xl font-serif font-semibold mt-2" style={{ color: accent }}>
                    {pkg.price}
                  </div>
                  <p className="text-xs leading-relaxed mt-3" style={{ color: inkSecond }}>
                    {pkg.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="pt-4 border-t space-y-3" style={{ borderColor: `${ink}12` }}>
                  {pkg.features.map((feat: string) => (
                    <div key={feat} className="flex items-start gap-2.5 text-xs font-light">
                      <Check size={14} className="shrink-0 mt-0.5" style={{ color: accent }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8 mt-6 border-t" style={{ borderColor: `${ink}10` }}>
                <a
                  href="#contact"
                  onClick={(e) => go(e, "#contact")}
                  className={`w-full py-4 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 ${
                    pkg.featured ? "shadow-md" : "border"
                  }`}
                  style={{
                    background: pkg.featured ? accent : "transparent",
                    color: pkg.featured ? onAccent : ink,
                    borderColor: ink,
                  }}
                >
                  <span>{pkg.cta}</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PhotographyPortfolio1Services;
