// @ts-nocheck
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function CreativePortfolio1Navbar({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || "#A7A9B3";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.09)";
  const accent = theme?.accent || "#3B82F6";
  const [open, setOpen] = useState(false);

  const links = props?.links || [
    { label: "Approach", href: "#about" },
    { label: "Work", href: "#projects" },
    { label: "Services", href: "#testimonials" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <nav
      className="sticky top-0 z-50 border-b backdrop-blur-xl transition-colors"
      style={{
        backgroundColor: `${bg}f0`,
        borderColor: surface,
        color: ink,
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        {/* Brand / Wordmark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 text-left group"
        >
          <span
            className="grid h-8 w-8 place-items-center rounded-full font-serif text-lg font-bold transition-transform group-hover:scale-105"
            style={{ backgroundColor: accent, color: "#ffffff" }}
          >
            A
          </span>
          <div className="leading-tight">
            <span className="block text-sm font-semibold tracking-tight">
              <Editable
                value={props?.brand || "Abiola"}
                onChange={(v) => onChange?.({ brand: v })}
              />
            </span>
            <small
              className="block font-mono text-[9px] uppercase tracking-[0.2em]"
              style={{ color: inkSecond }}
            >
              <Editable
                value={props?.brandSubline || "Creative Practice"}
                onChange={(v) => onChange?.({ brandSubline: v })}
              />
            </small>
          </div>
        </button>

        {/* Center studio location / descriptor */}
        <div
          className="hidden lg:block font-mono text-[10px] uppercase tracking-[0.16em]"
          style={{ color: inkSecond }}
        >
          <Editable
            value={props?.locationTag || "Independent Studio / Lagos — Worldwide"}
            onChange={(v) => onChange?.({ locationTag: v })}
          />
        </div>

        {/* Desktop Links & CTA */}
        <div className="hidden items-center gap-7 md:flex font-mono text-xs uppercase tracking-wider">
          {links.map((link: any, index: number) => (
            <a
              key={index}
              href={link.href}
              className="transition-opacity hover:opacity-60"
            >
              <Editable
                value={link.label}
                onChange={(v) =>
                  onChange?.({
                    links: links.map((item: any, i: number) =>
                      i === index ? { ...item, label: v } : item
                    ),
                  })
                }
              />
            </a>
          ))}
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition hover:scale-105"
            style={{ backgroundColor: accent, color: "#ffffff" }}
          >
            <Editable
              value={props?.cta || "Let's Talk"}
              onChange={(v) => onChange?.({ cta: v })}
            />
            <ArrowUpRight size={13} />
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="border-t px-6 py-5 md:hidden"
          style={{ borderColor: surface, backgroundColor: bgSecond }}
        >
          {links.map((link: any, index: number) => (
            <a
              key={index}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block border-b py-3 font-mono text-sm uppercase tracking-wider"
              style={{ borderColor: surface }}
            >
              <Editable value={link.label} />
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
