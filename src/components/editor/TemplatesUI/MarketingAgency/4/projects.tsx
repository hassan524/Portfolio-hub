// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Sparkles } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Projects({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";
  const [sel, setSel] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const defaultItems = [
    { title: "3D Character Worldbuilding", desc: "Original mascots, sculpted creatures and rigs optimized for WebGL, video and AR.", price: "From $4,500", tags: ["3D", "Sculpting"], img: "https://images.unsplash.com/photo-1614850523060-8da1d56ae167?w=1000&q=80" },
    { title: "Holo Graphics & Key Visuals", desc: "Iridescent, glassmorphic visuals for high-impact product launches and global campaigns.", price: "From $1,800", tags: ["Graphics", "Holo"], img: "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&q=80" },
    { title: "Tactile Motion Identity", desc: "Living brand systems that bounce, morph, stretch and react dynamically on scroll.", price: "From $7,200", tags: ["Motion", "Identity"], img: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80" },
    { title: "Playful Packaging Architecture", desc: "Shelf-stopping bottles, tactile unboxing kits and collectible physical merchandise.", price: "From $3,900", tags: ["Packaging", "Tactile"], img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80" },
    { title: "Interactive WebGL Worlds", desc: "Playful scroll experiences with Three.js, built to win awards and go viral on social.", price: "From $12,500", tags: ["WebGL", "Interactive"], img: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1000&q=80" },
  ];
  const items = (props?.items && props.items.length > 0) ? props.items : defaultItems;
  const set = (i, k, v) => onChange?.({ items: items.map((x, j) => (j === i ? { ...x, [k]: v } : x)) });
  const setTag = (i, ti, v) => set(i, "tags", items[i].tags.map((t, z) => (z === ti ? v : t)));

  return (
    <section id="projects" className="relative px-6 py-32" style={{ background: `linear-gradient(180deg, ${bg}, ${bgSecond})`, color: ink }}>
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6 border-b pb-12" style={{ borderColor: surface }}>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-black uppercase tracking-widest" style={{ background: accent, color: bg }}>
              <Sparkles size={12} />
              <Editable as="span" value={props?.eyebrow || "Selected Works / 02"} onChange={(v) => onChange?.({ eyebrow: v })} />
            </span>
            <Editable
              as="h2"
              className="mt-4 text-[clamp(3.5rem,9.5vw,9rem)] font-black uppercase leading-[0.85] tracking-tighter"
              value={props?.title || "Things we made"}
              onChange={(v) => onChange?.({ title: v })}
            />
          </div>
          <Editable
            as="p"
            className="max-w-xs text-base font-bold leading-relaxed"
            style={{ color: inkSecond }}
            value={props?.subtitle || "Tap any work to inspect the craft. Every project is built from scratch with zero stock templates."}
            onChange={(v) => onChange?.({ subtitle: v })}
          />
        </div>

        {/* Full-Bleed Kinetic Works List */}
        <div className="divide-y border-y" style={{ borderColor: surface }}>
          {items.map((x, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => setSel(i)}
              className="group relative cursor-pointer py-12 transition duration-300"
            >
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                <div className="flex items-baseline gap-6 md:w-3/5">
                  <span className="font-mono text-sm font-black tracking-widest" style={{ color: accent }}>0{i + 1}</span>
                  <div>
                    <Editable
                      as="h3"
                      className="text-[clamp(2rem,5vw,4.5rem)] font-black uppercase leading-[0.95] tracking-tight transition duration-300 group-hover:translate-x-3"
                      value={x.title}
                      onChange={(v) => set(i, "title", v)}
                    />
                    <Editable
                      as="p"
                      className="mt-3 max-w-xl text-base font-medium leading-relaxed"
                      style={{ color: inkSecond }}
                      value={x.desc}
                      onChange={(v) => set(i, "desc", v)}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 md:justify-end md:w-2/5">
                  <div className="flex flex-wrap gap-2">
                    {x.tags.map((t, ti) => (
                      <span key={ti} className="rounded-full border px-4 py-1.5 text-xs font-bold" style={{ borderColor: surface, background: surface }}>
                        <Editable as="span" value={t} onChange={(v) => setTag(i, ti, v)} />
                      </span>
                    ))}
                  </div>

                  <Editable
                    as="span"
                    className="font-mono text-base font-black tracking-wider"
                    style={{ color: accent }}
                    value={x.price}
                    onChange={(v) => set(i, "price", v)}
                  />

                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl transition duration-500 group-hover:scale-110 group-hover:rotate-45" style={{ background: accent, color: bg }}>
                    <ArrowUpRight size={22} />
                  </span>
                </div>
              </div>

              {/* Floating Media Preview on Hover */}
              <AnimatePresence>
                {hoveredIdx === i && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.85, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="pointer-events-none absolute right-36 top-1/2 z-20 hidden -translate-y-1/2 lg:block"
                  >
                    <div className="h-48 w-80 overflow-hidden rounded-3xl shadow-2xl border-2" style={{ borderColor: accent }}>
                      <img src={x.img} alt="" className="h-full w-full object-cover" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popout Dossier Modal */}
      <AnimatePresence>
        {sel !== null && items[sel] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSel(null)}
            className="fixed inset-0 z-[70] grid place-items-center p-4 backdrop-blur-md"
            style={{ background: `color-mix(in srgb, ${bg} 85%, transparent)` }}
          >
            <motion.div
              initial={{ scale: 0.85, rotate: -2 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.85, rotate: 2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl border p-4 shadow-2xl"
              style={{ background: bg, borderColor: surface, color: ink }}
            >
              <img src={items[sel].img} alt="" className="h-72 w-full rounded-2xl object-cover" />
              <button
                onClick={() => setSel(null)}
                className="absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full shadow-lg"
                style={{ background: accent, color: bg }}
              >
                <X size={20} />
              </button>
              <div className="p-6">
                <Editable as="h3" className="text-3xl font-black uppercase tracking-tight" value={items[sel].title} onChange={(v) => set(sel, "title", v)} />
                <Editable as="p" className="mt-3 text-base font-medium leading-relaxed" style={{ color: inkSecond }} value={items[sel].desc} onChange={(v) => set(sel, "desc", v)} />
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6" style={{ borderColor: surface }}>
                  <Editable as="span" className="font-mono text-2xl font-black" style={{ color: accent }} value={items[sel].price} onChange={(v) => set(sel, "price", v)} />
                  <a
                    href="#contact"
                    onClick={() => setSel(null)}
                    className="rounded-full px-8 py-4 text-sm font-black uppercase tracking-wider transition hover:scale-105 active:scale-95"
                    style={{ background: accent, color: bg }}
                  >
                    <Editable as="span" value={props?.dialogCta || "Commission This Style"} onChange={(v) => onChange?.({ dialogCta: v })} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
