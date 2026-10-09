// @ts-nocheck
import { motion } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";

export function Spacer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";
  const shapes = ["rounded-full", "rounded-2xl rotate-12", "rounded-full scale-75", "rounded-[40%]", "rounded-full"];
  return (
    <div className="flex items-center justify-center gap-4 px-4 py-8" style={{ background: bg, color: ink }}>
      {shapes.map((s, i) => (
        <motion.span key={i} animate={{ y: [0, -14, 0] }} transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.15 }} className={`block h-8 w-8 ${s}`} style={{ background: i % 2 ? surface : accent }} />
      ))}
      <Editable as="span" className="mx-2 text-sm font-black" style={{ color: inkSecond }} value={props?.label || "keep scrolling!"} onChange={(v) => onChange?.({ label: v })} />
      {shapes.map((s, i) => (
        <motion.span key={i} animate={{ y: [0, -14, 0] }} transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.15 }} className={`hidden h-8 w-8 sm:block ${s}`} style={{ background: i % 2 ? accent : surface }} />
      ))}
    </div>
  );
}
