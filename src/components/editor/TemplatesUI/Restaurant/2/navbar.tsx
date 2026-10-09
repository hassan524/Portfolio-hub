// @ts-nocheck
import { useState } from "react";
import { Flame, Menu, X, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const D = ["", "[animation-delay:100ms]", "[animation-delay:200ms]", "[animation-delay:300ms]", "[animation-delay:400ms]", "[animation-delay:500ms]", "[animation-delay:600ms]", "[animation-delay:700ms]"];

export function Navbar({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const [open, setOpen] = useState(false);
  const links = props?.links || [
    { label: "Home", href: "#home" },
    { label: "Our Story", href: "#about" },
    { label: "Menu", href: "#projects" },
    { label: "Reviews", href: "#testimonials" },
    { label: "Visit Us", href: "#contact" },
  ];
  const setLabel = (i: number, v: string) =>
    onChange?.({ links: links.map((l: any, j: number) => (j === i ? { ...l, label: v } : l)) });

  return (
    <header
      className="sticky top-0 z-50 w-full backdrop-blur-xl animate__animated animate__fadeInDown"
      style={{ backgroundColor: `${bg}E6`, borderBottom: `1px solid ${surface}`, color: ink }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-10">
        <a href="#home" className="animate__animated animate__fadeInLeft flex items-center gap-3 transition hover:scale-[1.02] active:scale-95">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-2xl"
            style={{ backgroundColor: accent, color: bg, boxShadow: `0 8px 30px ${accent}55` }}
          >
            <Flame size={22} />
          </span>
          <span className="text-xl font-black uppercase tracking-tight">
            <Editable value={props?.brand || "Rosso & Fig"} onChange={(v) => onChange?.({ brand: v })} />
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l: any, i: number) => (
            <a
              key={i}
              href={l.href}
              className={`animate__animated animate__fadeInDown ${D[(i + 1) % 8]} rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wide transition hover:scale-[1.02] active:scale-95`}
              style={{ color: inkSecond }}
            >
              <Editable value={l.label} onChange={(v) => setLabel(i, v)} />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span
            className="animate__animated animate__fadeIn [animation-delay:600ms] hidden items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold md:inline-flex"
            style={{ backgroundColor: surface, color: inkSecond }}
          >
            <span className="h-2 w-2 animate-pulse rounded-full" style={{ backgroundColor: accent }} />
            <Editable value={props?.status || "Open today till 11 PM"} onChange={(v) => onChange?.({ status: v })} />
          </span>
          <a
            href="#projects"
            className="animate__animated animate__fadeInRight [animation-delay:700ms] hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold uppercase transition hover:scale-[1.02] active:scale-95 sm:inline-flex"
            style={{ backgroundColor: accent, color: bg, boxShadow: `0 10px 30px ${accent}55` }}
          >
            <Editable value={props?.cta || "View Menu"} onChange={(v) => onChange?.({ cta: v })} />
            <ArrowUpRight size={16} />
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl transition active:scale-95 lg:hidden"
            style={{ backgroundColor: surface, color: ink }}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="animate__animated animate__fadeInDown animate__faster px-5 pb-6 lg:hidden" style={{ backgroundColor: bg }}>
          <div className="flex flex-col gap-2 pt-2">
            {links.map((l: any, i: number) => (
              <a
                key={i}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`animate__animated animate__fadeInLeft ${D[i % 8]} rounded-2xl px-4 py-3 text-base font-bold uppercase transition active:scale-95`}
                style={{ backgroundColor: surface, color: ink }}
              >
                <Editable value={l.label} onChange={(v) => setLabel(i, v)} />
              </a>
            ))}
            <a
              href="#projects"
              onClick={() => setOpen(false)}
              className="animate__animated animate__fadeInUp [animation-delay:500ms] mt-2 rounded-2xl px-4 py-3 text-center text-base font-bold uppercase transition active:scale-95"
              style={{ backgroundColor: accent, color: bg }}
            >
              <Editable value={props?.cta || "View Menu"} onChange={(v) => onChange?.({ cta: v })} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}