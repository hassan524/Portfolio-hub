// @ts-nocheck
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function CreativePortfolio4Navbar({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#050505";
  const bgSecond = theme?.["bg-second"] || "#111111";
  const ink = theme?.ink || "#F5F1EA";
  const inkSecond = theme?.["ink-second"] || "#9C978F";
  const surface = theme?.surface || "rgba(245, 241, 234, 0.16)";
  const accent = theme?.accent || "#FF5C35";
  const [open, setOpen] = useState(false);

  const links = props?.links || [
    { label: "Reel", href: "#about" },
    { label: "Scenes", href: "#projects" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-xl transition-colors font-mono text-xs uppercase tracking-[0.14em]"
      style={{
        backgroundColor: `${bg}cc`,
        borderColor: surface,
        color: ink,
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-lg font-bold tracking-wider"
        >
          <Editable
            value={props?.brand || "NOX"}
            onChange={(v) => onChange?.({ brand: v })}
          />
        </button>

        <span className="hidden sm:block text-[10px]" style={{ color: inkSecond }}>
          Moving Image / Identity / Sound
        </span>

        <nav className="hidden md:flex items-center gap-8 text-[11px]">
          {links.map((link: any, i: number) => (
            <a
              key={i}
              href={link.href}
              className="transition-colors hover:text-[#FF5C35]"
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
