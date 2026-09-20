// @ts-nocheck
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";

type Props = BlockComponentProps<any>;

function updateLink(links: any, onChange: Props["onChange"], i: number, label: string) {
  const next = [...(links || [])];
  next[i] = { ...next[i], label };
  onChange?.({ links: next });
}

export function AIProduct2Navbar({ props = { links: [] }, theme, onChange }: Props) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";
  const [open, setOpen] = useState(false);
  const links = props?.links || [];

  return (
    <header className={`w-full px-6 py-4 transition-colors ${props?.sticky ? "sticky top-0 z-50" : ""}`}>
      <div
        className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5 rounded-2xl backdrop-blur-xl shadow-sm transition-all"
        style={{ backgroundColor: `${bg}E6`, border: `1px solid ${surface}`, color: ink }}
      >
        <div className="flex items-center gap-4">
          {props?.logo && <img src={props.logo} alt="Logo" className="h-8 w-8 shrink-0 rounded-xl object-cover" />}
          <Editable
            value={props?.logoText || "Portfolio"}
            onChange={(v) => onChange?.({ logoText: v })}
            className="font-bold text-base tracking-tight cursor-pointer"
            style={{ color: ink }}
          />
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l, i) => (
            <div
              key={i}
              className="text-xs font-semibold tracking-wider uppercase cursor-pointer transition-opacity duration-200 hover:opacity-100"
              style={{ color: ink, opacity: 0.75 }}
            >
              <Editable
                className="inline"
                value={l.label}
                onChange={(v) => updateLink(links, onChange, i, v)}
              />
            </div>
          ))}
        </nav>

        {props?.ctaLabel && (
          <a
            href="#contact"
            className="hidden md:flex items-center px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide cursor-pointer shadow-sm transition-transform duration-200 hover:scale-[1.02] active:scale-95"
            style={{ backgroundColor: accent, color: ink }}
          >
            <Editable
              value={props.ctaLabel}
              onChange={(v) => onChange?.({ ctaLabel: v })}
            />
          </a>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-xl transition-colors cursor-pointer border"
          style={{ backgroundColor: surface, color: ink, borderColor: surface }}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden mt-3 p-6 rounded-2xl border shadow-xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-2"
          style={{ backgroundColor: bg, borderColor: surface, color: ink }}
        >
          {links.map((l, i) => (
            <div
              key={i}
              className="text-sm font-semibold tracking-wider uppercase py-1 cursor-pointer transition-opacity hover:opacity-100"
              style={{ color: ink, opacity: 0.75 }}
              onClick={() => setOpen(false)}
            >
              <Editable
                value={l.label}
                onChange={(v) => updateLink(links, onChange, i, v)}
              />
            </div>
          ))}
          {props?.ctaLabel && (
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center px-5 py-3 rounded-xl text-xs font-bold tracking-wide cursor-pointer shadow-sm mt-2"
              style={{ backgroundColor: accent, color: ink }}
            >
              <Editable
                value={props.ctaLabel}
                onChange={(v) => onChange?.({ ctaLabel: v })}
              />
            </a>
          )}
        </div>
      )}
    </header>
  );
}