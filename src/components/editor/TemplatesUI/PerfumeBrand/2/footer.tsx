// @ts-nocheck
import { motion } from "framer-motion";
import { Moon, ArrowUp } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function PerfumeBrand2Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A090D";
  const bgSecond = theme?.["bg-second"] || "#14121B";
  const ink = theme?.ink || "#F5F2EB";
  const inkSecond = theme?.["ink-second"] || "#9E96A6";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.05)";
  const accent = theme?.accent || "#D4AF37";

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { label: "The Vault", href: "#vault" },
    { label: "Night Pyramids", href: "#alchemy" },
    { label: "Register", href: "#critics" },
    { label: "Contact Info", href: "#bespoke" },
  ];

  return (
    <footer
      className="relative w-full pt-16 pb-12 px-4 sm:px-8 lg:px-14 overflow-hidden border-t"
      style={{
        backgroundColor: bgSecond,
        borderColor: "rgba(212, 175, 55, 0.15)",
        color: ink,
      }}
    >
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Top Showcase Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b" style={{ borderColor: "rgba(212, 175, 55, 0.15)" }}>
          <div className="space-y-2">
            <span
              className="text-3xl sm:text-4xl font-serif tracking-[0.3em] uppercase font-light block"
              style={{ fontFamily: "Cinzel, serif", color: ink }}
            >
              <Editable value={props?.brandName || "ATELIER OBSIDIAN"} onChange={(v) => onChange?.({ brandName: v })} />
            </span>
            <p className="text-xs font-light max-w-sm" style={{ color: inkSecond }}>
              Extrait de Parfum steeped in shadows. Macerated 240 nights in charred oak casks.
            </p>
          </div>

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
              Direct Vault Inquiries
            </span>
            <p className="font-serif text-sm font-semibold" style={{ color: ink }}>
              vault@atelierobsidian.com
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider block opacity-70" style={{ color: accent }}>
              Private Line
            </span>
            <p className="font-serif text-sm font-semibold" style={{ color: ink }}>
              +33 (0)1 48 87 90 22
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase tracking-wider block opacity-70" style={{ color: accent }}>
              Sanctuary Footprint
            </span>
            <p className="font-serif text-sm font-semibold" style={{ color: ink }}>
              Paris • Kyoto • Geneva
            </p>
          </div>
        </div>

        {/* Giant Watermark */}
        <div className="w-full text-center py-4 select-none opacity-5 pointer-events-none">
          <span
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-serif uppercase tracking-[0.25em] font-extrabold whitespace-nowrap block"
            style={{ color: accent }}
          >
            OBSIDIAN
          </span>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] font-mono" style={{ borderColor: "rgba(212, 175, 55, 0.15)", color: inkSecond }}>
          <p>© {new Date().getFullYear()} ATELIER OBSIDIAN. ONE-PAGE SHOWCASE PORTFOLIO.</p>
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

export default PerfumeBrand2Footer;
