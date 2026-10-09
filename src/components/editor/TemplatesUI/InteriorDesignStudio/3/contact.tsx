// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaArrowRight } from "react-icons/fa";

interface ContactProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const InteriorDesignStudio3Contact: React.FC<ContactProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const bg = theme.bg || "#080808";
  const ink = theme.ink || "#FFFFFF";
  const accent = theme.accent || "#FFFFFF";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  return (
    <section
      id="contact"
      className="relative px-6 md:px-12 lg:px-16 py-32 border-t border-white/10"
      style={{ backgroundColor: bg, color: ink }}
    >
      <div className="max-w-6xl mx-auto">
        <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-500 block mb-6">
          <Editable value={p.tag || "COMMISSION INTAKE // 04"} onChange={(v) => handleUpdate("tag", v)} />
        </span>

        {/* Big Brutalist Heading (NO FORM CARDS) */}
        <h2
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal uppercase tracking-tight text-white leading-[0.95]"
          style={{ fontFamily: "'Times New Roman', Times, serif, system-ui" }}
        >
          <Editable
            value={p.title || "INITIATE A SPATIAL\nCOMMISSION."}
            onChange={(v) => handleUpdate("title", v)}
          />
        </h2>

        <p className="mt-8 text-sm sm:text-base text-zinc-400 font-normal max-w-xl leading-relaxed">
          <Editable
            value={
              p.desc ||
              "All client engagements are handled directly by Adria Vale. We undertake full architectural design, interior material direction, and custom fixture production."
            }
            onChange={(v) => handleUpdate("desc", v)}
          />
        </p>

        {/* Direct Atelier Channels (Plain Typographic Layout) */}
        <div className="mt-16 pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-12 font-mono text-xs">
          <div className="space-y-4">
            <span className="text-zinc-500 uppercase tracking-widest block">Direct Atelier Transmission</span>
            <a
              href="mailto:studio@adriavale.com"
              className="text-2xl sm:text-3xl font-black uppercase text-white hover:text-zinc-300 transition-colors block font-sans"
            >
              <Editable value={p.email || "STUDIO@ADRIAVALE.COM"} onChange={(v) => handleUpdate("email", v)} />
            </a>
            <p className="text-zinc-500">Submissions received are reviewed weekly by the principal director.</p>
          </div>

          <div className="space-y-4">
            <span className="text-zinc-500 uppercase tracking-widest block">Atelier Physical Coordinates</span>
            <div className="text-sm font-semibold uppercase text-zinc-300 leading-relaxed font-sans">
              <p>ADRIA VALE ATELIER GMBH</p>
              <p>NEUMARKT 14, 8001 ZÜRICH</p>
              <p>SWITZERLAND // +41 44 268 91 00</p>
            </div>
            <p className="text-zinc-500">By private appointment only.</p>
          </div>
        </div>

        {/* Action Link */}
        <div className="mt-16 pt-10 border-t border-white/10 flex items-center justify-between">
          <a
            href="mailto:studio@adriavale.com?subject=Spatial%20Commission%20Inquiry"
            className="inline-flex items-center gap-4 text-xs font-mono uppercase tracking-[0.2em] text-white hover:text-zinc-400 transition-colors py-2"
          >
            <span>[SEND ARCHITECTURAL BRIEF]</span>
            <FaArrowRight className="text-[10px]" />
          </a>
          <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 hidden sm:inline">
            INTAKE: Q1/Q2 ARCHIVED • NOW BOOKING Q3
          </span>
        </div>
      </div>
    </section>
  );
};

export default InteriorDesignStudio3Contact;
