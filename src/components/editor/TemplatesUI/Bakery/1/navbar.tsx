// @ts-nocheck
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Bakery1Navbar({ props = {}, theme, onChange }: any) {
  const [open, setOpen] = useState(false);
  const bg = theme?.bg || "#faf9f6";
  const ink = theme?.ink || "#1a1a1a";
  const surface = theme?.surface || "#dcdbd8";
  const accent = theme?.accent || "#e85d3d";
  const links = ["Work", "Services", "About", "Contact"];

  return (
    <nav
      className="relative z-20 w-full"
      style={{ backgroundColor: bg, color: ink, borderBottom: `1px solid ${surface}` }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-3">
          {props?.logo ? (
            <img src={props.logo} alt="Logo" className="h-9 w-auto max-w-[160px] object-contain" />
          ) : null}
          <Editable
            value={props?.logoText || "The Pantry"}
            onChange={(v) => onChange?.({ logoText: v })}
            className="text-xl tracking-tight"
            style={{ fontFamily: '"DM Serif Display", Georgia, serif', color: ink }}
          />
        </div>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-sm font-medium transition-opacity hover:opacity-60" style={{ color: ink }}>
              {l}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center px-5 py-2 text-sm font-semibold transition-opacity hover:opacity-80"
          style={{ backgroundColor: accent, color: "#fff", borderRadius: 2 }}
        >
          Get in touch
        </a>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded" style={{ color: ink }}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-full shadow-lg md:hidden" style={{ backgroundColor: bg, borderBottom: `1px solid ${surface}` }}>
          <div className="flex flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} className="py-2 text-sm font-medium" style={{ color: ink }}>
                {l}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
