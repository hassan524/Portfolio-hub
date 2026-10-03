// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowUpRight, Code2 } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency4Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#FFFFFF";
  const bgSecond = theme?.["bg-second"] || "#F8FAFC";
  const ink = theme?.ink || "#0A1128";
  const inkSecond = theme?.["ink-second"] || "#475569";
  const surface = theme?.surface || "#FFFFFF";
  const accent = theme?.accent || "#2563EB";

  const handleSmoothScroll = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer
      className="border-t py-16 transition-colors"
      style={{
        backgroundColor: bgSecond,
        borderColor: "rgba(10, 17, 40, 0.08)",
        color: ink,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b" style={{ borderColor: "rgba(10, 17, 40, 0.08)" }}>
          
          {/* Logo & Tagline */}
          <div className="space-y-2 text-center md:text-left">
            <a
              href="#home"
              onClick={(e) => handleSmoothScroll(e, "#home")}
              className="inline-flex items-center gap-2.5 cursor-pointer"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                style={{ backgroundColor: accent }}
              >
                <Code2 size={18} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-black tracking-tight" style={{ color: ink }}>
                <Editable
                  value={props?.brandName || "CoderEyes"}
                  onChange={(v) => onChange?.({ brandName: v })}
                />
              </span>
            </a>
            <p className="text-xs max-w-sm" style={{ color: inkSecond }}>
              Enterprise software engineering, cloud systems, and high-performance digital presence.
            </p>
          </div>

          {/* Smooth Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold">
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
            {["Git", "In", "𝕏", "Aws"].map((s) => (
              <div
                key={s}
                className="w-8 h-8 rounded-lg border flex items-center justify-center text-xs font-bold transition-transform hover:scale-110 cursor-pointer"
                style={{
                  backgroundColor: surface,
                  borderColor: "rgba(10,17,40,0.1)",
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
            © {new Date().getFullYear()} CoderEyes Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="font-semibold text-slate-700">Engineering Capacity Available for Q3 / Q4</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default DigitalAgency4Footer;
