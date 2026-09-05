// @ts-nocheck
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";
type Props = BlockComponentProps<any>;

function updateLink(links: any, onChange: Props["onChange"], i: number, label: string) {
  const next = [...links];
  next[i] = { ...next[i], label };
  onChange({ links: next });
}

export function AIProduct2Navbar({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;
  const [open, setOpen] = useState(false);

  return (
    <header className={`w-full px-6 py-4 ${props.sticky ? "sticky top-0 z-50" : ""}`}>
      <div 
        className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5 rounded-2xl backdrop-blur-xl shadow-sm transition-all"
        style={{ background: `${bg}90`, borderBottom: `1px solid ${ink}08` }}
      >
        <div className="flex items-center gap-4">
          {props.logo && <img src={props.logo} alt="Logo" className="h-8 w-8 shrink-0 rounded-xl object-cover" />}
          <Editable
            value={props.logoText}
            onChange={(v) => onChange({ logoText: v })}
            className="font-bold text-base tracking-tight cursor-pointer"
            style={{ color: ink }}
          />
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {props.links.map((l, i) => (
            <div
              key={i}
              className="text-xs font-semibold tracking-wider uppercase cursor-pointer transition-opacity duration-200 hover:opacity-100 opacity-60"
              style={{ color: ink }}
            >
              <Editable
                className="inline"
                value={l.label}
                onChange={(v) => updateLink(props.links, onChange, i, v)}
              />
            </div>
          ))}
        </nav>

        {props.ctaLabel && (
          <a
            href="#contact"
            className="hidden md:flex items-center px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide cursor-pointer shadow-sm transition-transform duration-200 hover:scale-[1.02] active:scale-95"
            style={{ background: accent, color: bg }}
          >
            <Editable
              className="inline"
              value={props.ctaLabel}
              onChange={(v) => onChange({ ctaLabel: v })}
            />
          </a>
        )}

        <button
          onClick={() => setOpen(true)}
          className="md:hidden p-2 rounded-xl transition-colors hover:bg-black/5"
          style={{ color: ink }}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex flex-col p-6 md:hidden backdrop-blur-2xl transition-opacity"
          style={{ background: `${bg}F8` }}
        >
          <div className="flex justify-between items-center mb-12">
            <Editable as="span" value="Navigation" className="font-bold text-sm tracking-widest uppercase opacity-60" style={{ color: ink }} />
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-xl transition-colors hover:bg-black/5"
              style={{ color: ink }}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col gap-6 flex-1 justify-center items-center text-center">
            {props.links.map((l, i) => (
              <div key={i} className="text-2xl font-bold cursor-pointer opacity-70 hover:opacity-100 transition-opacity" style={{ color: ink }}>
                <Editable
                  className="inline"
                  value={l.label}
                  onChange={(v) => updateLink(props.links, onChange, i, v)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}