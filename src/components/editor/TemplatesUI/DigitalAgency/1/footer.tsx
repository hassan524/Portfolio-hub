// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Heart } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency1Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#F7F8F9";
  const bgSecond = theme?.["bg-second"] || "#FFFFFF";
  const ink = theme?.ink || "#111827";
  const inkSecond = theme?.["ink-second"] || "#6B7280";
  const surface = theme?.surface || "#FFFFFF";
  const accent = theme?.accent || "#87D53C";

  const handleSmoothScroll = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "Community", href: "#home" },
    { label: "Studio Philosophy", href: "#about" },
    { label: "Selected Works", href: "#projects" },
    { label: "Direct Inquiries", href: "#contact" },
  ];

  return (
    <footer
      className="border-t py-16 transition-colors"
      style={{
        backgroundColor: bgSecond,
        borderColor: "rgba(0, 0, 0, 0.08)",
        color: ink,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
          
          {/* Logo & Tagline */}
          <div className="space-y-2 text-center md:text-left">
            <a
              href="#home"
              onClick={(e) => handleSmoothScroll(e, "#home")}
              className="inline-flex items-center gap-2 cursor-pointer"
            >
              <span className="text-2xl font-black tracking-tight" style={{ color: ink }}>
                <Editable
                  value={props?.brandName || "DesignSource"}
                  onChange={(v) => onChange?.({ brandName: v })}
                />
              </span>
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent }} />
            </a>
            <p className="text-xs max-w-sm" style={{ color: inkSecond }}>
              Tactile 3D design systems, WebGL interactions, and high-impact brand identities.
            </p>
          </div>

          {/* In-page Smooth Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold uppercase tracking-wider">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="hover:opacity-100 transition-opacity cursor-pointer"
                style={{ color: inkSecond }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Social Badges */}
          <div className="flex items-center gap-2">
            {["𝕏", "Be", "In", "Dr"].map((s) => (
              <div
                key={s}
                className="w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold transition-transform hover:scale-110 cursor-pointer"
                style={{
                  backgroundColor: surface,
                  borderColor: "rgba(0,0,0,0.1)",
                  color: ink,
                }}
              >
                {s}
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ color: inkSecond }}>
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} DesignSource Studio. Sculpted with tactile care.</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium">Accepting new clients for Q3 / Q4</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default DigitalAgency1Footer;
