// @ts-nocheck
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";

const mix = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;
const ITEMS = [
  { label: "About", id: "about" },
  { label: "Work", id: "projects" },
  { label: "Kind words", id: "testimonials" },
  { label: "Contact", id: "contact" },
];
// one-page portfolio: scroll within the page, no hrefs / routes
const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

export function AIProduct3Navbar({ theme }: BlockComponentProps<any>) {
  const bg = theme?.bg || "#140C12";
  const ink = theme?.ink || "#FFFFFF";
  const accent = theme?.accent || "#FF3B76";
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full px-5 sm:px-10 pt-6 pb-2 relative z-30 transition-colors" style={{ backgroundColor: bg, color: ink }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* wordmark */}
        <button onClick={() => go("home")} className="flex items-center gap-3 cursor-pointer" aria-label="Back to top">
          <svg viewBox="0 0 36 36" className="h-9 w-9" aria-hidden>
            <circle cx="18" cy="18" r="16" fill="none" stroke={accent} strokeWidth="1.5" strokeDasharray="3 4" />
            <circle cx="18" cy="18" r="9" fill={accent} />
            <circle cx="27" cy="9" r="2.5" fill={ink} />
          </svg>
          <Editable as="span" className="font-bold text-lg tracking-tight" style={{ color: ink }}>Alex Rivera</Editable>
        </button>

        {/* nav: plain text with a growing underline, no boxes */}
        <nav className="hidden md:flex items-center gap-10">
          {ITEMS.map((n, i) => (
            <button key={n.id} onClick={() => go(n.id)} className="group relative text-sm font-medium cursor-pointer" style={{ color: mix(ink, 78) }}>
              <span className="mr-1.5 text-[10px] font-mono align-top" style={{ color: accent }}>0{i + 1}</span>
              <Editable className="inline">{n.label}</Editable>
              <span className="absolute -bottom-1.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300" style={{ background: accent }} />
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2.5 text-xs font-medium" style={{ color: mix(ink, 70) }}>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full animate-ping opacity-70" style={{ background: "#34D399" }} />
            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "#34D399" }} />
          </span>
          <Editable className="inline">Open to new projects</Editable>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden h-10 w-10 grid place-items-center cursor-pointer" aria-label="Toggle menu" style={{ color: ink }}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div className="max-w-7xl mx-auto mt-6 h-px" style={{ background: `linear-gradient(90deg, ${accent}, ${mix(ink, 10)} 40%, transparent)` }} />

      {open && (
        <div className="md:hidden absolute inset-x-0 top-full px-5 pb-8 pt-4 flex flex-col gap-5 backdrop-blur-2xl" style={{ backgroundColor: mix(bg, 96) }}>
          {ITEMS.map((n, i) => (
            <button key={n.id} onClick={() => { setOpen(false); go(n.id); }} className="text-left text-3xl font-bold tracking-tight cursor-pointer" style={{ color: ink }}>
              <span className="mr-3 text-xs font-mono" style={{ color: accent }}>0{i + 1}</span>
              <Editable className="inline">{n.label}</Editable>
            </button>
          ))}
        </div>
      )}
    </header>
  );
}