// @ts-nocheck
import { useState } from "react";
import { Menu, X, ArrowUpRight, Grid2X2 } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function CreativePortfolio3Navbar({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#160B2B";
  const bgSecond = theme?.["bg-second"] || "#2A1050";
  const ink = theme?.ink || "#FFF8FF";
  const inkSecond = theme?.["ink-second"] || "#CDB9E8";
  const surface = theme?.surface || "rgba(255, 248, 255, 0.16)";
  const accent = theme?.accent || "#C98CFF";
  const [open, setOpen] = useState(false);

  const links = props?.links || [
    { label: "Lab", href: "#about" },
    { label: "Work", href: "#projects" },
    { label: "Hire me", href: "#contact" }
  ];

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-xl transition-colors font-mono text-xs uppercase tracking-[0.12em]"
      style={{
        backgroundColor: `${bg}dd`,
        borderColor: surface,
        color: ink,
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 font-bold tracking-wider"
        >
          <span
            className="w-7 h-7 rounded-lg grid place-items-center"
            style={{ backgroundColor: accent, color: bg }}
          >
            <Grid2X2 size={14} />
          </span>
          <Editable
            value={props?.brand || "Hasan Senjig"}
            onChange={(v) => onChange?.({ brand: v })}
          />
        </button>

        <span className="hidden lg:block text-[10px]" style={{ color: inkSecond }}>
          UIUX Designer / Creative Developer
        </span>

        <nav className="hidden md:flex items-center gap-8 text-[11px]">
          {links.map((link: any, i: number) => (
            <a
              key={i}
              href={link.href}
              className="transition-colors hover:text-[#C98CFF]"
            >
              <Editable value={link.label} />
            </a>
          ))}
        </nav>

        <button
          className="md:hidden p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div
          className="border-t px-6 py-4 md:hidden text-sm"
          style={{ borderColor: surface, backgroundColor: bgSecond }}
        >
          {links.map((link: any, i: number) => (
            <a
              key={i}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block border-b py-3"
              style={{ borderColor: surface }}
            >
              <Editable value={link.label} />
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
