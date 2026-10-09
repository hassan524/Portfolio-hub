// @ts-nocheck
import React, { useEffect, useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion } from "framer-motion";

interface FooterProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

const DISPLAY = "'Anton', 'Bebas Neue', Impact, 'Arial Narrow', sans-serif";
const EASE = [0.16, 1, 0.3, 1];

const useClock = (tz: string) => {
  const [t, setT] = useState("--:--");
  useEffect(() => {
    const tick = () =>
      setT(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: tz,
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [tz]);
  return t;
};

export const InteriorDesignStudio1Footer: React.FC<FooterProps> = ({
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

  const london = useClock("Europe/London");
  const kyoto = useClock("Asia/Tokyo");
  const zurich = useClock("Europe/Zurich");

  return (
    <footer
      className="px-6 md:px-12 lg:px-16 pt-16 pb-8 border-t"
      style={{ backgroundColor: bg, color: ink, borderColor: rule }}
    >
      {/* Top row: clocks cols 1-6, links cols 7-12 (right aligned) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12">
        <div className="md:col-span-6 flex gap-10 text-xs font-mono">
          {[
            ["London", london],
            ["Kyoto", kyoto],
            ["Zurich", zurich],
          ].map(([city, time]) => (
            <div key={city} className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest" style={{ color: ink2 }}>
                {city}
              </span>
              <span>{time}</span>
            </div>
          ))}
        </div>

        <div className="md:col-span-6 flex flex-wrap items-center md:justify-end gap-x-8 gap-y-3 text-xs uppercase tracking-widest font-bold">
          {["Instagram", "Pinterest", "LinkedIn"].map((s) => (
            <motion.a key={s} href="#" whileHover={{ y: -2, color: accent }}>
              {s}
            </motion.a>
          ))}
          <motion.button
            whileHover={{ y: -2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="cursor-pointer"
            style={{ color: accent }}
          >
            Top ↑
          </motion.button>
        </div>
      </div>

      {/* Wordmark, left aligned to the same edge */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE }}
        className="uppercase border-t pt-8 overflow-hidden"
        style={{
          fontFamily: DISPLAY,
          fontWeight: 400,
          fontSize: "clamp(3rem, 14vw, 18rem)",
          lineHeight: 0.85,
          color: accent,
          borderColor: rule,
          marginLeft: "-0.03em",
        }}
      >
        <Editable value={p.brand || "THE COOL STUDIO"} onChange={(v) => handleUpdate("brand", v)} />
      </motion.div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-2 text-xs" style={{ color: ink2 }}>
        <span className="md:col-span-6">© {new Date().getFullYear()} The Cool Studio. All rights reserved.</span>
        <span className="md:col-span-6 md:text-right">
          <Editable value={p.tagline || "Spatial architecture • Minimal living • Material honesty"} onChange={(v) => handleUpdate("tagline", v)} />
        </span>
      </div>
    </footer>
  );
};

export default InteriorDesignStudio1Footer;