// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency5Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0B26E8";
  const bgSecond = theme?.["bg-second"] || "#061385";
  const ink = theme?.ink || "#FFFFFF";
  const inkSecond = theme?.["ink-second"] || "rgba(255, 255, 255, 0.75)";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.12)";
  const accent = theme?.accent || "#FFFFFF";

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Case Studies", href: "#projects" },
    { label: "Direct Inquiries", href: "#contact" },
  ];

  return (
    <footer
      className="relative w-full pt-16 pb-12 px-4 sm:px-8 lg:px-12 overflow-hidden border-t"
      style={{
        backgroundColor: bgSecond,
        borderColor: surface,
        color: ink,
      }}
    >
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Main Agency Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b" style={{ borderColor: surface }}>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-white text-blue-900 font-bold text-xs flex items-center justify-center">
                ✕
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold tracking-[0.2em] uppercase font-mono" style={{ color: ink }}>
                <Editable value={props?.brandName || "AURYX"} onChange={(v) => onChange?.({ brandName: v })} />
              </span>
            </div>
            <p className="text-xs font-light max-w-sm" style={{ color: inkSecond }}>
              Futures Creative AI Agency — Elevating Brands Through Smart Solutions & Human Taste.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-mono uppercase tracking-[0.18em]">
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

        {/* Agency Desk Contact Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs" style={{ color: inkSecond }}>
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider block opacity-70" style={{ color: ink }}>
              General & New Business
            </span>
            <p className="font-mono text-sm font-bold" style={{ color: ink }}>
              hello@auryx.agency
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider block opacity-70" style={{ color: ink }}>
              Partner Hotline
            </span>
            <p className="font-mono text-sm font-bold" style={{ color: ink }}>
              +1 (415) 890-2210
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider block opacity-70" style={{ color: ink }}>
              Global Presence
            </span>
            <p className="font-mono text-sm font-bold" style={{ color: ink }}>
              San Francisco • London • Berlin
            </p>
          </div>
        </div>

        {/* Giant AURYX Watermark Banner */}
        <div className="w-full text-center py-4 select-none opacity-10 pointer-events-none">
          <span
            className="text-7xl sm:text-9xl md:text-[11rem] lg:text-[13rem] font-black uppercase tracking-[-0.05em] leading-none whitespace-nowrap block font-sans"
            style={{ color: ink }}
          >
            AURYX
          </span>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] font-mono" style={{ borderColor: surface, color: inkSecond }}>
          <p>© {new Date().getFullYear()} AURYX CREATIVE AGENCY. ALL RIGHTS RESERVED.</p>
          <a
            href="#home"
            onClick={(e) => handleSmoothScroll(e, "#home")}
            className="inline-flex items-center gap-1.5 transition-colors hover:opacity-100 cursor-pointer"
            style={{ color: ink }}
          >
            <span>Back to Top</span>
            <ArrowUp size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default DigitalAgency5Footer;
