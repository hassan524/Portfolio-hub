// @ts-nocheck
import { motion } from "framer-motion";
import { Lightbulb, PenTool, Rocket, Heart, Sparkles, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function About({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";
  const icons = [Lightbulb, PenTool, Rocket];
  const features = (props?.features && props.features.length > 0) ? props.features : [
    { title: "Spark", desc: "We workshop wild ideas until one makes everyone in the room grin." },
    { title: "Sculpt", desc: "3D characters, tactile illustration and procedural motion shaped by hand." },
    { title: "Ship", desc: "Delivered as living brand systems, interactive websites and unforgettable viral launches." },
  ];
  const team = (props?.team && props.team.length > 0) ? props.team : [
    { name: "Juno Park", role: "Founder, Art Director", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&q=80" },
    { name: "Milo Quinn", role: "3D Lead & Sculptor", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80" },
    { name: "Zara Lind", role: "Motion Designer", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80" },
    { name: "Ozzy Bright", role: "Creative Technologist", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80" },
  ];
  const chips = (props?.chips && props.chips.length > 0) ? props.chips : ["3D Art", "Illustration", "Motion", "Branding", "Interactive Web", "Tactile Packaging"];
  const values = (props?.values && props.values.length > 0) ? props.values : [
    { title: "Play is a method", desc: "Our best client breakthroughs always begin with playful experimentation." },
    { title: "Make it tactile", desc: "If you don't instantly want to reach out and touch it, we redo it." },
  ];
  const gallery = (props?.gallery && props.gallery.length > 0) ? props.gallery : [
    "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=700&q=80",
    "https://images.unsplash.com/photo-1563089145-599997674d42?w=700&q=80",
    "https://images.unsplash.com/photo-1614850523060-8da1d56ae167?w=700&q=80",
    "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=700&q=80",
  ];
  const up = (key, arr, i, k, v) => onChange?.({ [key]: arr.map((x, j) => (j === i ? { ...x, [k]: v } : x)) });

  return (
    <section id="about" className="relative px-6 py-32" style={{ background: bg, color: ink }}>
      <div className="mx-auto max-w-7xl">
        {/* Giant Typographic Manifesto */}
        <div className="border-b pb-14" style={{ borderColor: surface }}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest" style={{ background: accent, color: bg }}>
              <Sparkles size={14} />
              <Editable as="span" value={props?.eyebrow || "The Manifesto / 01"} onChange={(v) => onChange?.({ eyebrow: v })} />
            </span>
            <div className="flex flex-wrap gap-2">
              {chips.map((c, i) => (
                <motion.span key={i} whileHover={{ scale: 1.05 }} className="rounded-full border px-4 py-1 text-xs font-bold" style={{ borderColor: surface, background: surface }}>
                  <Editable as="span" value={c} onChange={(v) => onChange?.({ chips: chips.map((x, j) => (j === i ? v : x)) })} />
                </motion.span>
              ))}
            </div>
          </div>
          <Editable
            as="h2"
            className="mt-8 text-[clamp(3rem,8.5vw,8.5rem)] font-black uppercase leading-[0.88] tracking-tighter"
            value={props?.title || "Small studio. Giant imagination."}
            onChange={(v) => onChange?.({ title: v })}
          />
        </div>

        {/* Narrative & Principles Row */}
        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6">
            <span className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: accent }}>Studio Origin</span>
            <Editable
              as="p"
              className="mt-4 text-2xl font-bold leading-relaxed md:text-3xl"
              value={props?.story || "Blobby began in 2019 on a kitchen table with a tablet and too much coffee. Now a team of eleven artists and technologists, we make characters, 3D worlds and playful identities for brands who refuse to look boring."}
              onChange={(v) => onChange?.({ story: v })}
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-6">
            {values.map((v, i) => (
              <div key={i} className="rounded-3xl border p-8" style={{ background: surface, borderColor: surface }}>
                <Heart size={24} style={{ color: accent }} fill={accent} />
                <Editable as="h4" className="mt-4 text-2xl font-black uppercase tracking-tight" value={v.title} onChange={(x) => up("values", values, i, "title", x)} />
                <Editable as="p" className="mt-2 text-sm font-medium leading-relaxed" style={{ color: inkSecond }} value={v.desc} onChange={(x) => up("values", values, i, "desc", x)} />
              </div>
            ))}
          </div>
        </div>

        {/* Numbered Full-Width Process Stages */}
        <div className="divide-y border-y" style={{ borderColor: surface }}>
          {features.map((f, i) => {
            const Icon = icons[i % 3];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group flex flex-col justify-between py-10 transition duration-300 md:flex-row md:items-center md:gap-12"
              >
                <div className="flex items-center gap-6 md:w-1/3">
                  <span className="grid h-16 w-16 place-items-center rounded-2xl transition duration-300 group-hover:scale-110 group-hover:rotate-6" style={{ background: accent, color: bg }}>
                    <Icon size={28} />
                  </span>
                  <div>
                    <span className="font-mono text-xs font-black uppercase tracking-widest" style={{ color: accent }}>Stage 0{i + 1}</span>
                    <Editable as="h3" className="mt-1 text-3xl font-black uppercase tracking-tight" value={f.title} onChange={(v) => up("features", features, i, "title", v)} />
                  </div>
                </div>
                <Editable as="p" className="mt-4 flex-1 text-base font-medium leading-relaxed md:mt-0" style={{ color: inkSecond }} value={f.desc} onChange={(v) => up("features", features, i, "desc", v)} />
                <div className="mt-4 flex items-center justify-end md:mt-0">
                  <span className="font-mono text-5xl font-black opacity-20 transition group-hover:opacity-100" style={{ color: accent }}>0{i + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Big Tactile Team Reel */}
        <div className="mt-24">
          <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4 border-b pb-6" style={{ borderColor: surface }}>
            <Editable as="h3" className="text-[clamp(2.4rem,5.5vw,5rem)] font-black uppercase tracking-tight" value={props?.teamTitle || "The Humans Behind The Magic"} onChange={(v) => onChange?.({ teamTitle: v })} />
            <span className="text-xs font-black uppercase tracking-widest" style={{ color: accent }}>Drag & Explore</span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8, rotate: i % 2 === 0 ? 1.5 : -1.5 }}
                className="group overflow-hidden rounded-3xl border p-3"
                style={{ background: surface, borderColor: surface }}
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-black/40">
                  <img src={m.img} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                </div>
                <div className="mt-4 px-2 pb-2">
                  <Editable as="div" className="text-2xl font-black uppercase tracking-tight" value={m.name} onChange={(v) => up("team", team, i, "name", v)} />
                  <Editable as="div" className="text-xs font-bold uppercase tracking-wider" style={{ color: accent }} value={m.role} onChange={(v) => up("team", team, i, "role", v)} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Panoramic Art Showcase */}
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {gallery.map((g, i) => (
              <div key={i} className="aspect-[4/3] overflow-hidden rounded-3xl">
                <img src={g} alt="" className="h-full w-full object-cover transition duration-700 hover:scale-110" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
