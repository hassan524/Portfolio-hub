// @ts-nocheck
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function CreativePortfolio2Navbar({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#FFF4F8";
  const bgSecond = theme?.["bg-second"] || "#F9DDE8";
  const ink = theme?.ink || "#2B1720";
  const inkSecond = theme?.["ink-second"] || "#7A5362";
  const surface = theme?.surface || "rgba(83, 29, 51, 0.14)";
  const accent = theme?.accent || "#F03D87";
  const [open, setOpen] = useState(false);

  const links = props?.links || [
    { label: "Clients", href: "#about" },
    { label: "Approach", href: "#projects" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-xl transition-colors font-serif"
      style={{
        backgroundColor: `${bg}ee`,
        borderColor: surface,
        color: ink,
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-lg sm:text-xl font-bold tracking-tight text-left"
        >
          <Editable
            value={props?.brand || "Liza / Product Designer"}
            onChange={(v) => onChange?.({ brand: v })}
          />
        </button>

        <nav className="hidden md:flex items-center gap-8 font-sans text-xs uppercase tracking-[0.16em]">
          {links.map((link: any, i: number) => (
            <a
              key={i}
              href={link.href}
              className="transition-opacity hover:opacity-60"
            >
              <Editable value={link.label} />
            </a>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} />
          <span style={{ color: accent }}>
            <Editable
              value={props?.status || "Available / 2026"}
              onChange={(v) => onChange?.({ status: v })}
            />
          </span>
        </div>

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
          className="border-t px-6 py-4 md:hidden font-sans text-sm"
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
