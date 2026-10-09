// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { FaInstagram, FaPinterest, FaFacebook } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";

const year = new Date().getFullYear();

export function Bakery2Footer({ props = {}, theme }: any) {
  const bg = theme?.ink || "#242023";
  const ink = "#ffffff";
  const accent = theme?.accent || "#b23b68";
  const fontHeading = theme?.fontHeading || "Fraunces";
  const fontBody = theme?.fontBody || "Inter";

  const links = [
    { label: "Bakes", href: "#work" },
    { label: "Story", href: "#about" },
    { label: "Craft", href: "#services" },
    { label: "Reviews", href: "#testimonials" },
    { label: "Atelier", href: "#contact" },
  ];

  return (
    <footer
      className="pt-24 pb-12 px-6 md:px-12 transition-colors relative overflow-hidden"
      style={{ backgroundColor: bg, color: ink, fontFamily: fontBody }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 pb-16 border-b border-white/10">
          {/* Brand & Mission */}
          <div className="max-w-md">
            <span className="text-3xl sm:text-4xl font-light tracking-tight block mb-4" style={{ fontFamily: fontHeading }}>
              <Editable value={props?.heading || "Levain Atelier"} />
            </span>
            <p className="text-sm opacity-70 font-light leading-relaxed">
              {props?.message || "Natural leavening, stone-milled heritage grains, and unhurried fermentation. Baked fresh every morning at dawn."}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap gap-8 text-sm font-light">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="opacity-70 hover:opacity-100 transition-opacity"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {[FaInstagram, FaPinterest, FaFacebook].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Giant Brandmark Statement */}
        <div className="py-12 select-none pointer-events-none opacity-10 text-center">
          <span
            className="text-6xl sm:text-8xl md:text-9xl font-light uppercase tracking-widest block whitespace-nowrap overflow-hidden text-ellipsis"
            style={{ fontFamily: fontHeading }}
          >
            LEVAIN ATELIER
          </span>
        </div>

        {/* Copyright Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-light opacity-50">
          <span>© {year} Levain Atelier. All rights reserved.</span>
          <span>Slow Wild Fermentation • 100% Organic Grains</span>
        </div>
      </div>
    </footer>
  );
}

export const Footer = Bakery2Footer;
export default Bakery2Footer;
