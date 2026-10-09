// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion } from "framer-motion";

interface FooterProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

const SERIF = "'Instrument Serif', 'Cormorant Garamond', Georgia, serif";
const EASE = [0.16, 1, 0.3, 1];

export const InteriorDesignStudio2Footer: React.FC<FooterProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const bg = theme.bg || "#F2EEE6";
  const ink = theme.ink || "#17201B";
  const ink2 = theme["ink-second"] || "#5C655F";
  const accent = theme.accent || "#2F5D46";
  const rule = "rgba(23,32,27,0.15)";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const cols = [
    { h: "Studio", items: [["About", "#about"], ["Work", "#projects"], ["Words", "#testimonials"]] },
    { h: "Follow", items: [["Instagram", "#"], ["Pinterest", "#"], ["LinkedIn", "#"]] },
    { h: "Contact", items: [["hello@alder-studio.com", "mailto:hello@alder-studio.com"], ["press@alder-studio.com", "mailto:press@alder-studio.com"]] },
  ];

  return (
    <footer className="px-6 md:px-12 lg:px-16 pt-20 pb-8" style={{ backgroundColor: bg, color: ink }}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-12 pb-16">
        <p className="md:col-span-4 text-sm leading-relaxed max-w-xs" style={{ color: ink2 }}>
          <Editable
            value={p.desc || "Interior architecture for calm, tactile homes and hospitality."}
            onChange={(v) => handleUpdate("desc", v)}
          />
        </p>

        <div className="md:col-span-8 grid grid-cols-3 gap-6">
          {cols.map((c) => (
            <div key={c.h}>
              <span className="block text-xs uppercase tracking-widest mb-4" style={{ color: accent }}>
                {c.h}
              </span>
              <ul className="space-y-2 text-sm">
                {c.items.map(([label, href]) => (
                  <li key={label}>
                    <motion.a href={href} whileHover={{ x: 4 }} className="inline-block break-all">
                      {label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Wordmark */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE }}
        className="border-t pt-6 overflow-hidden"
        style={{
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: "clamp(6rem, 28vw, 30rem)",
          lineHeight: 0.8,
          color: accent,
          borderColor: rule,
          letterSpacing: "-0.03em",
          marginLeft: "-0.04em",
        }}
      >
        <Editable value={p.brand || "Alder"} onChange={(v) => handleUpdate("brand", v)} />
      </motion.div>

      <div className="mt-8 flex flex-col sm:flex-row justify-between gap-2 text-xs" style={{ color: ink2 }}>
        <span>© {new Date().getFullYear()} Alder Studio. All rights reserved.</span>
        <span>Copenhagen · Lisbon · London</span>
      </div>
    </footer>
  );
};

export const InteriorDesignStudio3Footer = InteriorDesignStudio2Footer;
export default InteriorDesignStudio2Footer;