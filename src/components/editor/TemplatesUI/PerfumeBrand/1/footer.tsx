// @ts-nocheck
import { motion } from "framer-motion";
import { Sparkles, Mail, MapPin, Phone, ArrowUp } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function PerfumeBrand1Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#EED8C9";
  const bgSecond = theme?.["bg-second"] || "#E5C8B4";
  const ink = theme?.ink || "#2D1D18";
  const inkSecond = theme?.["ink-second"] || "#7A5E54";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.55)";
  const accent = theme?.accent || "#9E4A28";

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { label: "Creations", href: "#collection" },
    { label: "The Atelier", href: "#story" },
    { label: "Critics Acclaim", href: "#critics" },
    { label: "Contact Info", href: "#consultation" },
  ];

  return (
    <footer
      className="relative w-full pt-16 pb-12 px-4 sm:px-8 lg:px-14 overflow-hidden border-t"
      style={{
        backgroundColor: bgSecond,
        borderColor: "rgba(158, 74, 40, 0.15)",
        color: ink,
      }}
    >
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Top Clean Showcase Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b" style={{ borderColor: "rgba(158, 74, 40, 0.12)" }}>
          <div className="space-y-2">
            <span
              className="text-3xl sm:text-4xl font-serif tracking-[0.3em] uppercase font-light block"
              style={{ fontFamily: "Cinzel, Cormorant Garamond, serif", color: ink }}
            >
              <Editable value={props?.brandName || "LUMIERE"} onChange={(v) => onChange?.({ brandName: v })} />
            </span>
            <p className="text-xs font-light max-w-sm" style={{ color: inkSecond }}>
              Haute parfumerie distilled in Grasse. Living botanicals in hand-blown crystal.
            </p>
          </div>

          {/* Clean in-page navigation anchors */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-mono uppercase tracking-[0.2em]">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="transition-colors hover:opacity-100 cursor-pointer"
                style={{ color: inkSecond }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Contact Info Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs" style={{ color: inkSecond }}>
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider block opacity-70" style={{ color: accent }}>
              Direct Inquiries
            </span>
            <p className="font-serif text-sm font-semibold" style={{ color: ink }}>
              concierge@maisonlumiere.com
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider block opacity-70" style={{ color: accent }}>
              Central Switchboard
            </span>
            <p className="font-serif text-sm font-semibold" style={{ color: ink }}>
              +33 (0)1 42 68 55 00
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider block opacity-70" style={{ color: accent }}>
              Atelier Footprint
            </span>
            <p className="font-serif text-sm font-semibold" style={{ color: ink }}>
              Paris • London • New York • Grasse
            </p>
          </div>
        </div>

        {/* Bottom Giant Brand Watermark */}
        <div className="w-full text-center py-4 select-none opacity-10 pointer-events-none">
          <span
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-serif uppercase tracking-[0.25em] font-extrabold whitespace-nowrap block"
            style={{ color: ink }}
          >
            LUMIÈRE
          </span>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] font-mono" style={{ borderColor: "rgba(158, 74, 40, 0.12)", color: inkSecond }}>
          <p>© {new Date().getFullYear()} MAISON LUMIÈRE. ONE-PAGE SHOWCASE PORTFOLIO.</p>
          <a
            href="#home"
            onClick={(e) => handleSmoothScroll(e, "#home")}
            className="inline-flex items-center gap-1.5 transition-colors hover:opacity-100 cursor-pointer"
            style={{ color: accent }}
          >
            <span>Back to Top</span>
            <ArrowUp size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default PerfumeBrand1Footer;
