// @ts-nocheck
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Bakery2Navbar({ props = {}, theme, onChange }: any) {
  const [open, setOpen] = useState(false);
  const bg = theme?.bg || "#ffffff";
  const ink = theme?.ink || "#242023";
  const surface = theme?.surface || "#ded7dc";
  const accent = theme?.accent || "#882b8b"; const fontHeading = theme?.fontHeading || "Fraunces"; const fontBody = theme?.fontBody || "Inter";
  const links = ["Studio", "Work", "People", "Contact"];

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
            value={props?.logoText || "Bread Studio"}
            onChange={(v) => onChange?.({ logoText: v })}
            className="text-xl font-black uppercase tracking-tight"
            style={{ fontFamily: fontHeading, color: ink }}
          />
        </div>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-xs font-bold uppercase tracking-widest transition-opacity hover:opacity-60"
              style={{ color: ink }}
            >
              {l}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden md:inline-flex h-9 items-center border px-5 text-xs font-bold uppercase tracking-widest transition-opacity hover:opacity-70"
          style={{ borderColor: accent, color: accent }}
        >
          Work with us
        </a>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2" style={{ color: ink }}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-full shadow-lg md:hidden" style={{ backgroundColor: bg, borderBottom: `1px solid ${surface}` }}>
          <div className="flex flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="py-2 text-xs font-bold uppercase tracking-widest"
                style={{ color: ink }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
