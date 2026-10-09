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

const SERIF = "'Instrument Serif', 'Cormorant Garamond', Georgia, serif";
const EASE = [0.16, 1, 0.3, 1];
const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, delay, ease: EASE },
});

export const InteriorDesignStudio2Contact: React.FC<ContactProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };
  const accent = theme.accent || "#2F5D46";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const email = p.email || "hello@alder-studio.com";

  return (
    <section
      id="contact"
      className="relative min-h-screen overflow-hidden text-white flex flex-col justify-end"
      style={{ backgroundColor: "#0c120f" }}
    >
      {/* Second full-bleed photo */}
      <img
        src={
          p.image ||
          "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=2400&q=85"
        }
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(8,12,10,0.35) 0%, rgba(8,12,10,0.8) 100%)" }} />
      <div className="absolute inset-0 mix-blend-multiply opacity-30" style={{ backgroundColor: accent }} />

      <div className="relative z-10 px-6 md:px-12 lg:px-16 pt-40 pb-14">
        <motion.span {...reveal()} className="block text-xs uppercase tracking-[0.2em] mb-8 text-white/70">
          <Editable value={p.tag || "Contact"} onChange={(v) => handleUpdate("tag", v)} />
        </motion.span>

        <motion.h2
          {...reveal(0.1)}
          className="whitespace-pre-line"
          style={{ fontFamily: SERIF, fontWeight: 400, fontSize: "clamp(3.5rem, 11vw, 11rem)", lineHeight: 0.88 }}
        >
          <Editable value={p.headline || "Let’s make\nsomewhere calm."} onChange={(v) => handleUpdate("headline", v)} />
        </motion.h2>

        <div className="mt-14 pt-8 border-t border-white/25 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <motion.div {...reveal(0.15)} className="md:col-span-5">
            <span className="block text-xs uppercase tracking-widest text-white/60 mb-3">Write to us</span>
            <a
              href={`mailto:${email}`}
              className="underline underline-offset-8 decoration-1"
              style={{ fontFamily: SERIF, fontSize: "clamp(1.8rem, 3.5vw, 3rem)", lineHeight: 1 }}
            >
              <Editable value={email} onChange={(v) => handleUpdate("email", v)} />
            </a>
          </motion.div>

          <motion.div {...reveal(0.2)} className="md:col-span-3 md:col-start-7 text-sm space-y-1">
            <span className="block text-xs uppercase tracking-widest text-white/60 mb-3">Studios</span>
            <p>Copenhagen — Nyhavn 24</p>
            <p>Lisbon — Rua da Prata 88</p>
            <p>London — 12 Redchurch St</p>
          </motion.div>

          <motion.div {...reveal(0.25)} className="md:col-span-3 md:text-right">
            <motion.a
              href={`mailto:${email}?subject=New%20Project`}
              whileHover={{ scale: 1.04 }}
              className="inline-block px-8 py-4 rounded-full bg-white text-[#17201B] text-sm font-medium"
            >
              <Editable value={p.cta || "Start a project ↗"} onChange={(v) => handleUpdate("cta", v)} />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const InteriorDesignStudio3Contact = InteriorDesignStudio2Contact;
export default InteriorDesignStudio2Contact;