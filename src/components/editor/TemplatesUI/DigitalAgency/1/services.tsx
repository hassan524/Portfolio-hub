// @ts-nocheck
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Services({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#F4F5EF";
  const ink = theme?.ink || "#111827";
  const ink2 = theme?.["ink-second"] || "#5B6472";
  const accent = theme?.accent || "#87D53C";
  const [open, setOpen] = useState(0);
  const services = props.services || [
    { title: "Brand identity", desc: "Logo, color, type and a guide your whole team can follow.", tags: ["Logo", "Guidelines", "Packaging"], time: "4–6 weeks" },
    { title: "3D and illustration", desc: "Custom 3D scenes, characters and icon sets in the formats you need.", tags: ["Blender", "Characters", "Icons"], time: "2–3 weeks" },
    { title: "Web design and build", desc: "Fast, interactive sites and landing pages, designed and built together.", tags: ["Design", "Development", "WebGL"], time: "3–4 weeks" },
    { title: "Motion and social", desc: "Short animations and content kits for launches and campaigns.", tags: ["Reels", "Ads", "Templates"], time: "1–2 weeks" },
  ];
  return (
    <section id="services" className="py-20 sm:py-28" style={{ background: bg, color: ink }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="font-black tracking-tighter leading-none text-[clamp(2rem,6vw,4.5rem)] mb-10">
          <Editable value={props.servicesTitle || "What we can make for you"} onChange={(v) => onChange?.({ servicesTitle: v })} />
        </h2>
        <div className="border-t-2" style={{ borderColor: ink }}>
          {services.map((s: any, i: number) => {
            const on = open === i;
            return (
              <div key={s.title} className="border-b-2" style={{ borderColor: ink }}>
                <button type="button" onClick={() => setOpen(on ? -1 : i)} aria-expanded={on} className="w-full flex items-center justify-between gap-4 py-5 sm:py-7 text-left cursor-pointer">
                  <span className="text-xl sm:text-4xl font-black tracking-tight">{s.title}</span>
                  <span className="shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-transform duration-300" style={{ background: on ? accent : "transparent", borderColor: ink, transform: on ? "rotate(45deg)" : "none" }}><Plus size={18} /></span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <div className="pb-7 grid md:grid-cols-12 gap-4 items-start">
                        <p className="md:col-span-6 leading-relaxed" style={{ color: ink2 }}>{s.desc}</p>
                        <div className="md:col-span-6 flex flex-wrap gap-2 md:justify-end">
                          {s.tags.map((t: string) => <span key={t} className="px-3 py-1 rounded-full border-2 text-xs font-bold" style={{ borderColor: ink }}>{t}</span>)}
                          <span className="px-3 py-1 rounded-full border-2 text-xs font-bold" style={{ background: accent, borderColor: ink }}>{s.time}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default Services;