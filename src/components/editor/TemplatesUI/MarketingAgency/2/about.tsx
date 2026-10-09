// @ts-nocheck
import { motion } from "framer-motion";
import { Atom, Compass, Layers, Gem, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function About({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";
  const icons = [Atom, Compass, Layers];
  const features = props?.features || [
    { title: "Research-led strategy", desc: "We start with data and customer truth, not assumptions or gut feel." },
    { title: "Product and brand design", desc: "Interfaces, interactions and identities that feel completely inevitable." },
    { title: "Engineering and growth", desc: "Shipped fast, measured honestly, and iteratively improved week over week." },
  ];
  const team = props?.team || [
    { name: "Aria Venn", role: "Founder, CEO", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80" },
    { name: "Theo Marsh", role: "Chief Technologist", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80" },
    { name: "Ines Duarte", role: "Design Lead", img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80" },
    { name: "Kofi Mensah", role: "Growth Lead", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80" },
  ];
  const chips = props?.chips || ["Strategy", "Product", "Brand", "AI", "Growth", "Motion"];
  const values = props?.values || [
    { title: "Curiosity first", desc: "Every brief begins with asking a sharper question." },
    { title: "Craft always", desc: "The micro-details are where true loyalty is won." },
  ];
  const gallery = props?.gallery || [
    "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=700&q=80",
    "https://images.unsplash.com/photo-1563089145-599997674d42?w=700&q=80",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=700&q=80",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=700&q=80",
  ];
  const up = (key, arr, i, k, v) => onChange?.({ [key]: arr.map((x, j) => (j === i ? { ...x, [k]: v } : x)) });

  return (
    <section id="about" className="relative overflow-hidden px-6 py-32" style={{ background: bg, color: ink }}>
      <div className="mx-auto max-w-7xl">
        {/* Section Header with Giant Typography */}
        <div className="border-b pb-14" style={{ borderColor: surface }}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs uppercase tracking-[0.35em]" style={{ color: accent }}>
              <Editable as="span" value={props?.eyebrow || "About the lab / 01"} onChange={(v) => onChange?.({ eyebrow: v })} />
            </span>
            <div className="flex flex-wrap gap-2">
              {chips.map((c, i) => (
                <span key={i} className="rounded-full border px-4 py-1 text-xs font-light tracking-wide" style={{ borderColor: surface, color: inkSecond }}>
                  <Editable as="span" value={c} onChange={(v) => onChange?.({ chips: chips.map((x, j) => (j === i ? v : x)) })} />
                </span>
              ))}
            </div>
          </div>
          <Editable
            as="h2"
            className="mt-8 max-w-5xl text-[clamp(2.8rem,7.5vw,7.5rem)] font-extralight italic leading-[0.88] tracking-tight"
            value={props?.title || "Curious minds building brave digital things."}
            onChange={(v) => onChange?.({ title: v })}
          />
        </div>

        {/* Narrative & Capabilities Split (No Bento Box!) */}
        <div className="grid gap-16 py-20 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Story & Principles */}
          <div className="lg:sticky lg:top-32 lg:col-span-5">
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: accent }}>The Origin</span>
            <Editable
              as="h3"
              className="mt-3 text-3xl font-light italic"
              value={props?.storyTitle || "Our Story & Vision"}
              onChange={(v) => onChange?.({ storyTitle: v })}
            />
            <Editable
              as="p"
              className="mt-6 text-lg font-light leading-relaxed md:text-xl"
              style={{ color: inkSecond }}
              value={props?.story || "Lumora began in 2017 as a three-person experiment between a designer, an engineer and a strategist. We believed the best digital work happens when those worlds share a table. Nine years and 140 launches later, we still work that way."}
              onChange={(v) => onChange?.({ story: v })}
            />

            <div className="mt-12 space-y-8 border-t pt-8" style={{ borderColor: surface }}>
              {values.map((v, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border" style={{ borderColor: surface, color: accent }}>
                    <Gem size={18} />
                  </span>
                  <div>
                    <Editable as="h4" className="text-xl font-light italic" value={v.title} onChange={(x) => up("values", values, i, "title", x)} />
                    <Editable as="p" className="mt-1 text-sm font-light leading-relaxed" style={{ color: inkSecond }} value={v.desc} onChange={(x) => up("values", values, i, "desc", x)} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Anchor + Detailed Capabilities */}
          <div className="space-y-12 lg:col-span-7">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl">
              <img
                src={props?.aboutImage || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80"}
                alt=""
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                <span className="text-xs uppercase tracking-widest font-mono">London R&D Studio</span>
                <span className="text-xs font-light opacity-80">EST. 2017</span>
              </div>
            </div>

            {/* Architectural Capability Rows */}
            <div className="divide-y border-y" style={{ borderColor: surface }}>
              {features.map((f, i) => {
                const Icon = icons[i % 3];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group py-8 transition duration-300"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex items-start gap-5">
                        <span className="font-mono text-xs font-light tracking-widest pt-1" style={{ color: accent }}>0{i + 1}</span>
                        <div>
                          <Editable as="h4" className="text-2xl font-light italic transition group-hover:translate-x-1" value={f.title} onChange={(v) => up("features", features, i, "title", v)} />
                          <Editable as="p" className="mt-3 max-w-xl text-base font-light leading-relaxed" style={{ color: inkSecond }} value={f.desc} onChange={(v) => up("features", features, i, "desc", v)} />
                        </div>
                      </div>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border transition duration-300 group-hover:rotate-45" style={{ borderColor: surface, color: accent }}>
                        <ArrowUpRight size={18} />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Big Editorial Team Showcase (Filmstrip style, no tiny circle cards!) */}
        <div className="mt-24 border-t pt-16" style={{ borderColor: surface }}>
          <div className="mb-12 flex flex-wrap items-baseline justify-between gap-4">
            <Editable as="h3" className="text-[clamp(2.4rem,5.5vw,5rem)] font-extralight italic" value={props?.teamTitle || "The minds in the lab"} onChange={(v) => onChange?.({ teamTitle: v })} />
            <span className="text-xs uppercase tracking-widest font-mono" style={{ color: accent }}>Strategic Partners</span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-white/5">
                  <img
                    src={m.img}
                    alt=""
                    className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span className="font-mono text-xs font-light text-white/50">0{i + 1}</span>
                    <Editable as="div" className="mt-1 text-2xl font-light italic text-white" value={m.name} onChange={(v) => up("team", team, i, "name", v)} />
                    <Editable as="div" className="text-xs font-light uppercase tracking-wider text-white/70" value={m.role} onChange={(v) => up("team", team, i, "role", v)} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Panoramic Atmosphere Gallery */}
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {gallery.map((g, i) => (
              <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <img src={g} alt="" className="h-full w-full object-cover transition duration-700 hover:scale-110" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
