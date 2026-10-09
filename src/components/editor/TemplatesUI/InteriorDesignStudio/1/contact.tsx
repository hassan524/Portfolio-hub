// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion } from "framer-motion";

interface ContactProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

const DISPLAY = "'Anton', 'Bebas Neue', Impact, 'Arial Narrow', sans-serif";
const EASE = [0.16, 1, 0.3, 1];
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, delay, ease: EASE },
});

export const InteriorDesignStudio1Contact: React.FC<ContactProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const bg = theme.bg || "#101012";
  const ink = theme.ink || "#FFFFFF";
  const ink2 = theme["ink-second"] || "#A1A1AA";
  const accent = theme.accent || "#38BDF8";
  const rule = "rgba(255,255,255,0.12)";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const email = p.email || "atelier@thecoolstudio.design";
  const phone = p.phone || "+44 (0) 20 7946 0912";

  return (
    <section
      id="contact"
      className="px-6 md:px-12 lg:px-16 py-32 border-t"
      style={{ backgroundColor: bg, color: ink, borderColor: rule }}
    >
      <motion.span {...reveal()} className="block text-xs uppercase font-mono tracking-widest mb-8" style={{ color: ink2 }}>
        <Editable value={p.sectionTag || "04 — Contact"} onChange={(v) => handleUpdate("sectionTag", v)} />
      </motion.span>

      <motion.h2
        {...reveal(0.1)}
        className="uppercase whitespace-pre-line"
        style={{
          fontFamily: DISPLAY,
          fontWeight: 400,
          fontSize: "clamp(3.5rem, 12vw, 12rem)",
          lineHeight: 0.88,
          color: accent,
        }}
      >
        <Editable value={p.headline || "Let’s build\nsomething"} onChange={(v) => handleUpdate("headline", v)} />
      </motion.h2>

      {/* Subtext starts at col 7, same as Hero + About right columns */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-12">
        <motion.p {...reveal(0.15)} className="md:col-span-5 md:col-start-8 text-base leading-relaxed" style={{ color: ink2 }}>
          <Editable
            value={p.subtext || "We take on a maximum of eight commissions a year so every project gets our full attention on site."}
            onChange={(v) => handleUpdate("subtext", v)}
          />
        </motion.p>
      </div>

      {/* 3 equal columns, all labels share one baseline */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20 pt-10 border-t" style={{ borderColor: rule }}>
        <motion.div {...reveal()} className="flex flex-col gap-3">
          <span className="text-xs uppercase font-mono tracking-widest" style={{ color: ink2 }}>
            Email
          </span>
          <a href={`mailto:${email}`} className="text-lg sm:text-xl font-bold uppercase break-all underline underline-offset-8 decoration-1">
            <Editable value={email} onChange={(v) => handleUpdate("email", v)} />
          </a>
          <span className="text-xs" style={{ color: ink2 }}>Reply within 24 hours</span>
        </motion.div>

        <motion.div {...reveal(0.1)} className="flex flex-col gap-3">
          <span className="text-xs uppercase font-mono tracking-widest" style={{ color: ink2 }}>
            Phone
          </span>
          <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="text-lg sm:text-xl font-bold font-mono">
            <Editable value={phone} onChange={(v) => handleUpdate("phone", v)} />
          </a>
          <span className="text-xs" style={{ color: ink2 }}>Mon–Fri, 09:00–18:00 GMT</span>
        </motion.div>

        <motion.div {...reveal(0.2)} className="flex flex-col gap-3">
          <span className="text-xs uppercase font-mono tracking-widest" style={{ color: ink2 }}>
            Studios
          </span>
          <ul className="text-sm uppercase tracking-wider space-y-1 font-semibold">
            <li>London — 42 Bermondsey St, SE1</li>
            <li>Kyoto — 18 Higashiyama-ku</li>
            <li>Zurich — Seefeldstrasse 114</li>
          </ul>
        </motion.div>
      </div>

      <motion.div {...reveal()} className="mt-14">
        <motion.a
          href={`mailto:${email}?subject=New%20Project%20Inquiry`}
          whileHover={{ x: 6 }}
          className="inline-block px-8 py-5 text-sm font-bold uppercase tracking-widest"
          style={{ backgroundColor: accent, color: "#000" }}
        >
          Start a Project →
        </motion.a>
      </motion.div>
    </section>
  );
};

export default InteriorDesignStudio1Contact;