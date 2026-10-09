// @ts-nocheck
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Spacer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";
  return (
    <div className="flex items-center gap-6 px-6 py-10" style={{ background: bg, color: ink }}>
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${accent})` }} />
      <motion.span animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="grid h-10 w-10 place-items-center rounded-full border" style={{ borderColor: accent, background: surface, color: accent }}><Plus size={16} /></motion.span>
      <Editable as="span" className="text-xs font-light uppercase italic tracking-[0.35em]" style={{ color: inkSecond }} value={props?.label || "Curiosity compounds"} onChange={(v) => onChange?.({ label: v })} />
      <motion.span animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="grid h-10 w-10 place-items-center rounded-full border" style={{ borderColor: accent, background: surface, color: accent }}><Plus size={16} /></motion.span>
      <div className="h-px flex-1" style={{ background: `linear-gradient(270deg, transparent, ${accent})` }} />
    </div>
  );
}
