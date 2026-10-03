// @ts-nocheck
import { motion } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency2Footer({ props = {}, theme, onChange }: any) {
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || "#16161A";
  const text = theme?.text || theme?.ink || "#FFFFFF";
  const textSecond = theme?.["text-second"] || theme?.["ink-second"] || theme?.textSecond || "#9CA3AF";
  const accent = theme?.accent || "#CCFF00";

  const handleSmoothScroll = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Causes", href: "#about" },
    { label: "Plans", href: "#projects" },
    { label: "Our Story", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer
      className="border-t py-16 transition-colors"
      style={{
        backgroundColor: "#08080A",
        borderColor: `${textSecond}20`,
        color: text,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b" style={{ borderColor: `${textSecond}15` }}>
          
          <div className="space-y-2 text-center md:text-left">
            <a
              href="#home"
              onClick={(e) => handleSmoothScroll(e, "#home")}
              className="inline-flex items-center gap-2 cursor-pointer"
            >
              <span className="text-2xl font-black tracking-tight" style={{ color: text }}>
                <Editable
                  value={props?.brandName || "GrowthCatalysts"}
                  onChange={(v) => onChange?.({ brandName: v })}
                />
              </span>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
            </a>
            <p className="text-xs max-w-sm" style={{ color: textSecond }}>
              Confidential executive advisory, capital narrative structuring, and digital enterprise scaling.
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="transition-colors cursor-pointer"
                style={{ color: textSecond }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {["𝕏", "In", "Sub", "Med"].map((s) => (
              <div
                key={s}
                className="w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold transition-transform hover:scale-110 cursor-pointer"
                style={{
                  borderColor: `${textSecond}30`,
                  color: text,
                }}
              >
                {s}
              </div>
            ))}
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ color: textSecond }}>
          <div>
            © {new Date().getFullYear()} GrowthCatalysts Advisory. All rights reserved.
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
            <span style={{ color: text }}>Accepting select private advisory appointments</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default DigitalAgency2Footer;
