// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency3Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#F9F7F2";
  const bgSecond = theme?.["bg-second"] || "#F3EFE6";
  const ink = theme?.ink || "#1C1917";
  const inkSecond = theme?.["ink-second"] || "#78716C";
  const surface = theme?.surface || "#FFFFFF";
  const accent = theme?.accent || "#C2410C";

  const handleSmoothScroll = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "Overview", href: "#home" },
    { label: "Methodology", href: "#about" },
    { label: "Campaigns", href: "#projects" },
    { label: "Client Voices", href: "#testimonials" },
    { label: "Studio Desk", href: "#contact" },
  ];

  return (
    <footer
      className="border-t py-16 transition-colors"
      style={{
        backgroundColor: bgSecond,
        borderColor: "rgba(28, 25, 23, 0.08)",
        color: ink,
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
          
          {/* Logo & Tagline */}
          <div className="space-y-2 text-center md:text-left">
            <a
              href="#home"
              onClick={(e) => handleSmoothScroll(e, "#home")}
              className="inline-flex items-center gap-2 cursor-pointer"
            >
              <span className="text-2xl font-serif font-black tracking-tight" style={{ color: ink }}>
                <Editable
                  value={props?.brandName || "STUDIO EDITORIAL"}
                  onChange={(v) => onChange?.({ brandName: v })}
                />
              </span>
              <span className="text-amber-500 text-sm">✦</span>
            </a>
            <p className="text-xs max-w-sm" style={{ color: inkSecond }}>
              Artisanal brand campaigns, luxury e-commerce storytelling, and quantitative growth architecture.
            </p>
          </div>

          {/* Smooth Links */}
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
            {["In", "Ar", "Vim", "Sub"].map((s) => (
              <div
                key={s}
                className="w-8 h-8 rounded-full border flex items-center justify-center text-xs font-serif font-bold transition-transform hover:scale-110 cursor-pointer"
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
          <div>
            © {new Date().getFullYear()} Studio Editorial. All production rights reserved.
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-serif italic">Accepting select private commissions</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default DigitalAgency3Footer;
