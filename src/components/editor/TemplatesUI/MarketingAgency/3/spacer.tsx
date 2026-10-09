// @ts-nocheck
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Spacer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";
  const words = props?.words || ["Simple", "Smart", "Effective", "Fearless"];
  return (
    <div className="overflow-hidden py-6">
      <div className="-rotate-1 scale-105 overflow-hidden border-y-2 py-3" style={{ background: accent, borderColor: bg, color: bg }}>
        <motion.div animate={{ x: ["-50%", "0%"] }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} className="flex w-max whitespace-nowrap">
          {[0, 1].map((r) => (
            <div key={r} className="flex items-center gap-6 pr-6">
              {words.map((w, i) => (
                <span key={i} className="flex items-center gap-6 font-serif text-3xl font-black uppercase italic">
                  {r === 0 ? <Editable as="span" value={w} onChange={(v) => onChange?.({ words: words.map((x, j) => (j === i ? v : x)) })} /> : <Editable as="span" value={w} />}
                  <Star size={20} fill={bg} />
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
