// @ts-nocheck
import { ArrowUpRight, Camera, Globe } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { Editable } from "@/components/editor/ui/Editable";

export function PhotographyPortfolio1Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#FCFBF8";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || "#F5F3ED";
  const ink = theme?.text || theme?.ink || "#1A1918";
  const inkSecond = theme?.["text-second"] || theme?.["ink-second"] || "#6E6B65";
  const accent = theme?.accent || "#8E2823";

  const brand = props.brandName || "MAISON ÉTÉ";

  const go = (e: any, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const links = props.navLinks || [
    { label: "Selected Works", href: "#projects" },
    { label: "Commissions", href: "#services" },
    { label: "Biography", href: "#about" },
    { label: "Acclaim", href: "#testimonials" },
    { label: "Contact Atelier", href: "#contact" },
  ];

  return (
    <footer className="border-t pt-16 pb-12 transition-colors" style={{ background: bg, borderColor: `${ink}15`, color: ink }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-6 space-y-4">
            <span className="text-3xl sm:text-4xl font-serif tracking-tight block">
              <Editable value={brand} onChange={(v) => onChange?.({ brandName: v })} />
            </span>
            <p className="text-sm font-light max-w-md leading-relaxed" style={{ color: inkSecond }}>
              <Editable
                value={props.footerTagline || "Parisian Haute Couture, Runway Chronicles & Fine Art Direction. Preserving contemporary elegance into museum archives."}
                onChange={(v) => onChange?.({ footerTagline: v })}
              />
            </p>
          </div>

          <div className="md:col-span-3 space-y-3 text-xs uppercase tracking-widest font-mono">
            <span className="text-[10px] opacity-50 block">Navigation</span>
            <ul className="space-y-2">
              {links.map((l: any) => (
                <li key={l.label}>
                  <a href={l.href} onClick={(e) => go(e, l.href)} className="hover:opacity-100 opacity-70 transition-opacity">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3 text-xs uppercase tracking-widest font-mono">
            <span className="text-[10px] opacity-50 block">Worldwide Inquiries</span>
            <p className="font-sans normal-case text-sm leading-relaxed" style={{ color: inkSecond }}>
              Paris · Milan · New York<br />
              agency@atelierdelacroix.com
            </p>
            <div className="flex gap-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border flex items-center justify-center hover:scale-110 transition-transform" style={{ borderColor: `${ink}20` }}>
                <FaInstagram size={14} />
              </a>
              <a href="https://models.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border flex items-center justify-center hover:scale-110 transition-transform" style={{ borderColor: `${ink}20` }}>
                <Globe size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Large Decorative Serif Typography */}
        <div className="pt-6 border-t select-none pointer-events-none" style={{ borderColor: `${ink}0f` }}>
          <div className="text-[12vw] font-serif font-light tracking-tighter leading-none text-center opacity-10">
            CLAIRE DELACROIX
          </div>
        </div>

        {/* Bottom Copyright & Colophon */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono opacity-60">
          <span>© {new Date().getFullYear()} {brand}. All photographic rights reserved worldwide.</span>
          <span>Printed on archival Hahnemühle Photo Rag</span>
        </div>
      </div>
    </footer>
  );
}

export default PhotographyPortfolio1Footer;
