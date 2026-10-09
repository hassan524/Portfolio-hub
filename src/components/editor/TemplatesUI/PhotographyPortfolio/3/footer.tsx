// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { Sparkles, ArrowUp, Heart, Globe } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

interface FooterProps {
  theme?: Record<string, string>;
  data?: {
    brandName?: string;
    brandSub?: string;
    description?: string;
    copyright?: string;
    ateliers?: string;
    links?: Array<{ label: string; href: string }>;
  };
  onUpdate?: (path: string, val: any) => void;
}

export const PhotographyPortfolio3Footer: React.FC<FooterProps> = ({
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

  const defaultLinks = [
    { label: "Love Stories", href: "#stories" },
    { label: "Destination Galleries", href: "#stories" },
    { label: "Bridal Collections", href: "#services" },
    { label: "Atelier Philosophy", href: "#about" },
    { label: "Couple Love Letters", href: "#testimonials" },
    { label: "Reserve Your Date", href: "#contact" },
  ];

  const links = data.links && data.links.length > 0 ? data.links : defaultLinks;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="pt-20 pb-12 px-6 md:px-12 lg:px-20 border-t transition-colors duration-300"
      style={{
        backgroundColor: bg,
        borderColor: `${accent}25`,
        color: text,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b" style={{ borderColor: `${accent}20` }}>
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-3xl font-serif font-light tracking-[0.2em] uppercase block mb-1" style={{ color: text }}>
                <Editable
                  value={data.brandName || "AURELIA"}
                  onChange={(val: string) => onUpdate?.("brandName", val)}
                />
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-light block mb-6" style={{ color: accent }}>
                <Editable
                  value={data.brandSub || "HAUTE DESTINATION WEDDING ATELIER"}
                  onChange={(val: string) => onUpdate?.("brandSub", val)}
                />
              </span>
              <p className="text-xs sm:text-sm font-light leading-relaxed max-w-sm" style={{ color: textSecond }}>
                <Editable
                  value={
                    data.description ||
                    "Preserving timeless romance and celebratory grandeur across Europe’s most revered villas and destinations through luminous film and fine art intimacy."
                  }
                  onChange={(val: string) => onUpdate?.("description", val)}
                />
              </p>
            </div>

            <div className="mt-8 flex items-center gap-2 text-xs font-light" style={{ color: textSecond }}>
              <Globe className="w-4 h-4" style={{ color: accent }} />
              <Editable
                value={data.ateliers || "Ateliers in Florence • Paris • New York"}
                onChange={(val: string) => onUpdate?.("ateliers", val)}
              />
            </div>
          </div>

          {/* Quick Index */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium mb-6" style={{ color: accent }}>
              Atelier Index
            </h4>
            <ul className="space-y-3">
              {links.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-xs uppercase tracking-widest font-light transition-opacity hover:opacity-60"
                    style={{ color: text }}
                  >
                    <Editable
                      value={link.label}
                      onChange={(val: string) => onUpdate?.(`links.${idx}.label`, val)}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Dispatch */}
          <div className="md:col-span-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium mb-6" style={{ color: accent }}>
              Follow The Journey
            </h4>
            <p className="text-xs font-light leading-relaxed mb-6" style={{ color: textSecond }}>
              Daily destination dispatches, behind-the-scenes film rolls, and editorial previews on Instagram.
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs uppercase tracking-widest font-medium transition-all hover:scale-105"
              style={{
                borderColor: `${accent}40`,
                backgroundColor: bgSecond,
                color: text,
              }}
            >
              <FaInstagram className="w-4 h-4" style={{ color: accent }} />
              <span>@Aurelia.Weddings</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light" style={{ color: textSecond }}>
          <p>
            <Editable
              value={data.copyright || `© ${new Date().getFullYear()} Aurelia Maison. All rights reserved. Registered trademark.`}
              onChange={(val: string) => onUpdate?.("copyright", val)}
            />
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:opacity-70 transition-opacity cursor-pointer uppercase tracking-widest text-[11px] font-medium"
            style={{ color: text }}
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" style={{ color: accent }} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default PhotographyPortfolio3Footer;
