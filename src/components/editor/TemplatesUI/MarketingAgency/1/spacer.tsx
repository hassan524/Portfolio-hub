// @ts-nocheck
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Spacer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";
  const words = props?.words || ["Strategy", "Creative", "Growth", "Data", "Launch"];
  return (
    <div className="overflow-hidden border-y py-4" style={{ background: accent, borderColor: surface, color: bg }}>
      <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="flex w-max items-center gap-8 whitespace-nowrap">
        {[0, 1].map((r) => (
          <div key={r} className="flex items-center gap-8">
            {words.map((w, i) => (
              <span key={i} className="flex items-center gap-8 text-3xl font-black uppercase tracking-tight">
                {r === 0 ? <Editable as="span" value={w} onChange={(v) => onChange?.({ words: words.map((x, j) => (j === i ? v : x)) })} /> : <Editable as="span" value={w} />}
                <Zap size={22} />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
