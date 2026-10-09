// @ts-nocheck
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";

const mix = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;
const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Markets", href: "#projects" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export function AIProduct2Navbar({ theme }: BlockComponentProps<any>) {
  const bg = theme?.bg || "#050505";
  const ink = theme?.ink || "#ffffff";
  const accent = theme?.accent || "#F7931A";
  const line = mix(ink, 14);
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full px-4 md:px-6 pt-5 relative z-30 transition-colors" style={{ backgroundColor: bg, color: ink }}>
      <div
        className="max-w-6xl mx-auto flex items-center justify-between pl-5 pr-2.5 py-2.5 rounded-full backdrop-blur-xl border"
        style={{ backgroundColor: mix(bg, 70), borderColor: line }}
      >
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5">
          <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
            <defs>
              <linearGradient id="p2logo" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#FFD27A" /><stop offset="1" stopColor={accent} />
              </linearGradient>
            </defs>
            <circle cx="16" cy="16" r="14" fill="url(#p2logo)" />
            <path d="M10 16h12M16 10v12" stroke="#050505" strokeWidth="2.6" strokeLinecap="round" />
          </svg>
          <Editable as="span" className="font-bold text-lg tracking-tight" style={{ color: ink }}>Coinova</Editable>
        </a>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} className="px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-white/10" style={{ color: mix(ink, 78) }}>
              <Editable className="inline">{l.label}</Editable>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold transition-transform hover:scale-[1.03] active:scale-95"
            style={{ backgroundColor: ink, color: bg }}
          >
            <Editable className="inline">Join Waitlist</Editable>
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="md:hidden h-10 w-10 rounded-full grid place-items-center border cursor-pointer"
            style={{ borderColor: line, color: ink }}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden max-w-6xl mx-auto mt-3 p-5 rounded-3xl border flex flex-col gap-1 backdrop-blur-xl" style={{ backgroundColor: mix(bg, 92), borderColor: line }}>
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="px-3 py-3 rounded-xl text-sm font-medium" style={{ color: mix(ink, 85) }}>
              <Editable className="inline">{l.label}</Editable>
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="mt-2 text-center px-5 py-3 rounded-full text-sm font-semibold" style={{ backgroundColor: ink, color: bg }}>
            <Editable className="inline">Join Waitlist</Editable>
          </a>
        </div>
      )}
    </header>
  );
}