// @ts-nocheck
"use client";
import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Plus, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Services({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const [open, setOpen] = useState<number>(0);
  const [hover, setHover] = useState<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 140, damping: 18 });
  const y = useSpring(my, { stiffness: 140, damping: 18 });

  const _rawSvc = props?.items; const items = Array.isArray(_rawSvc) && _rawSvc.length > 0 ? _rawSvc : [
    { title: "Web Applications", tags: "React \u2022 Next.js \u2022 TypeScript", text: "Scalable product interfaces with clean architecture, auth and real-time data.", price: "From $1,800", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80" },
    { title: "Backend & APIs", tags: "Node.js \u2022 PostgreSQL \u2022 Supabase", text: "Secure, typed services, schemas and integrations built to grow.", price: "From $1,200", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80" },
    { title: "Motion Websites", tags: "Framer Motion \u2022 Three.js", text: "Immersive, scroll-driven sites with the polish of a design tool.", price: "From $1,500", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=700&q=80" },
    { title: "Technical Consulting", tags: "Audit \u2022 Performance \u2022 Review", text: "Code reviews, performance audits and roadmap guidance for your team.", price: "From $90 / hour", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&q=80" },
  ];
  const set = (i: number, k: string, v: string) =>
    onChange?.({ items: items.map((s: any, j: number) => (j === i ? { ...s, [k]: v } : s)) });

  return (
    <section id="services" onMouseMove={(e) => { mx.set(e.clientX + 24); my.set(e.clientY - 120); }} className="relative w-full py-28 md:py-40" style={{ background: bg, color: ink }}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-16 grid gap-6 lg:grid-cols-12">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] lg:col-span-3" style={{ color: inkSecond }}>
            <span className="h-px w-10" style={{ background: inkSecond }} />
            <Editable as="span" value={props?.eyebrow || "Services"} onChange={(v: string) => onChange?.({ eyebrow: v })} />
          </div>
          <h2 className="text-[clamp(2.4rem,6vw,6rem)] font-semibold leading-[1] tracking-[-0.04em] lg:col-span-9">
            <Editable as="span" value={props?.title || "What I can build for you"} onChange={(v: string) => onChange?.({ title: v })} />
          </h2>
        </div>

        <div onMouseLeave={() => setHover(null)}>
          {items.map((s: any, i: number) => {
            const active = open === i;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} onMouseEnter={() => { setOpen(i); setHover(i); }} className="transition-opacity duration-500" style={{ borderTop: `1px solid ${surface}`, opacity: hover !== null && hover !== i ? 0.45 : 1 }}>
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-7 md:grid-cols-[80px_1.4fr_1fr_auto] md:gap-8 md:py-9">
                  <span className="text-sm" style={{ color: inkSecond }}>
                    <Editable as="span" value={String(i + 1).padStart(2, "0")} />
                  </span>
                  <h3 className="text-[clamp(1.6rem,4vw,3.8rem)] font-semibold leading-none tracking-[-0.03em] transition-transform duration-500" style={{ transform: active ? "translateX(12px)" : "none" }}>
                    <Editable as="span" value={s.title} onChange={(v: string) => set(i, "title", v)} />
                  </h3>
                  <span className="hidden text-sm md:block" style={{ color: inkSecond }}>
                    <Editable as="span" value={s.tags} onChange={(v: string) => set(i, "tags", v)} />
                  </span>
                  <button onClick={() => setOpen(active ? -1 : i)} aria-label="Toggle" className="flex h-11 w-11 items-center justify-center rounded-full transition-all hover:scale-[1.02] active:scale-95" style={{ background: active ? accent : surface, color: ink }}>
                    <Plus size={18} className="transition-transform duration-500" style={{ transform: active ? "rotate(135deg)" : "none" }} />
                  </button>
                </div>
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                      <div className="grid gap-4 pb-9 md:grid-cols-[80px_1.4fr_1fr_auto] md:gap-8">
                        <span className="hidden md:block" />
                        <p className="max-w-xl text-base leading-relaxed" style={{ color: inkSecond }}>
                          <Editable as="span" value={s.text} onChange={(v: string) => set(i, "text", v)} />
                        </p>
                        <p className="flex items-center gap-2 text-lg font-semibold">
                          <Editable as="span" value={s.price} onChange={(v: string) => set(i, "price", v)} />
                          <ArrowUpRight size={18} />
                        </p>
                        <span className="hidden md:block" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
          <div style={{ borderTop: `1px solid ${surface}` }} />
        </div>
      </div>

      <AnimatePresence>
        {hover !== null && items[hover] && (
          <motion.div key={hover} style={{ x, y, left: 0, top: 0 }} initial={{ opacity: 0, scale: 0.8, rotate: -4 }} animate={{ opacity: 1, scale: 1, rotate: 3 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.35 }} className="pointer-events-none fixed z-40 hidden h-56 w-72 overflow-hidden rounded-2xl lg:block" >
            <img src={items[hover].image} alt="" className="h-full w-full object-cover" style={{ boxShadow: `0 30px 80px -20px ${accent}` }} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
export const DeveloperPortfolio5Services = Services;
export default Services;
