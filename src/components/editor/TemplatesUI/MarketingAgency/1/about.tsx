// @ts-nocheck
import { motion } from "framer-motion";
import { Rocket, BarChart3, Palette, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function About({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";
  const icons = [Rocket, BarChart3, Palette];
  const features = (props?.features && props.features.length > 0) ? props.features : [
    { title: "Growth engineering", desc: "Funnels, experiments and analytics wired together so every campaign teaches the next one." },
    { title: "Performance media", desc: "Paid search, social and video managed daily against revenue, not vanity reach." },
    { title: "Brand and creative", desc: "Identity systems and content that make a small team look unmistakably bigger." },
  ];
  const chips = (props?.chips && props.chips.length > 0) ? props.chips : ["SEO", "Paid Media", "Branding", "Web Design", "CRO", "Content", "Analytics"];
  const team = (props?.team && props.team.length > 0) ? props.team : [
    { name: "Maya Collins", role: "Founder and Strategy", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80" },
    { name: "Daniel Reyes", role: "Head of Growth", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" },
    { name: "Priya Nair", role: "Creative Director", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80" },
  ];
  const values = (props?.values && props.values.length > 0) ? props.values : [
    { title: "Proof over promises", desc: "Reports you can read in five minutes." },
    { title: "Small senior team", desc: "No hand-offs to juniors." },
  ];
  const gallery = (props?.gallery && props.gallery.length > 0) ? props.gallery : [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=700&q=80",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=700&q=80",
  ];
  const up = (key, arr, i, k, v) => onChange?.({ [key]: arr.map((x, j) => (j === i ? { ...x, [k]: v } : x)) });

  return (
    <section id="about" className="relative overflow-hidden px-6 py-32" style={{ background: bg, color: ink }}>
      <div className="mx-auto max-w-7xl">
        {/* Top Header Manifesto */}
        <div className="border-b pb-12" style={{ borderColor: surface }}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em]" style={{ borderColor: surface, color: accent }}>
              <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
              <Editable as="span" value={props?.eyebrow || "01 / The Studio"} onChange={(v) => onChange?.({ eyebrow: v })} />
            </span>
            <div className="flex flex-wrap gap-2">
              {chips.map((c, i) => (
                <span key={i} className="rounded-full border px-3.5 py-1 text-xs font-medium backdrop-blur-md" style={{ background: surface, borderColor: surface }}>
                  <Editable as="span" value={c} onChange={(v) => onChange?.({ chips: chips.map((x, j) => (j === i ? v : x)) })} />
                </span>
              ))}
            </div>
          </div>
          <Editable
            as="h2"
            className="mt-8 break-words text-[clamp(2.8rem,7.5vw,7.5rem)] font-black uppercase leading-[0.88] tracking-tighter"
            value={props?.title || "We turn clicks into customers."}
            onChange={(v) => onChange?.({ title: v })}
          />
        </div>

        {/* Narrative & Principles Row */}
        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6">
            <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: accent }}>
              Our Philosophy
            </p>
            <Editable
              as="p"
              className="mt-4 text-2xl font-medium leading-relaxed md:text-3xl"
              style={{ color: ink }}
              value={props?.story || "Founded in 2014 by two ex-agency strategists, Voltage started in a spare room with one client and a spreadsheet. Today we are 38 specialists who still treat every brand like our own."}
              onChange={(v) => onChange?.({ story: v })}
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-6">
            {values.map((v, i) => (
              <div key={i} className="border-l-2 pl-6" style={{ borderColor: accent }}>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>Pillar 0{i + 1}</span>
                <Editable as="h4" className="mt-2 text-2xl font-black uppercase tracking-tight" value={v.title} onChange={(x) => up("values", values, i, "title", x)} />
                <Editable as="p" className="mt-2 text-sm leading-relaxed" style={{ color: inkSecond }} value={v.desc} onChange={(x) => up("values", values, i, "desc", x)} />
              </div>
            ))}
          </div>
        </div>

        {/* Numbered Full-Width Capabilities */}
        <div className="border-t" style={{ borderColor: surface }}>
          {features.map((f, i) => {
            const Icon = icons[i % 3];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative flex flex-col justify-between border-b py-10 transition duration-300 md:flex-row md:items-center md:gap-12"
                style={{ borderColor: surface }}
              >
                <div className="flex items-center gap-6 md:w-1/3">
                  <span className="text-4xl font-black opacity-30 transition duration-300 group-hover:opacity-100 group-hover:translate-x-1" style={{ color: accent }}>
                    0{i + 1}
                  </span>
                  <Editable as="h3" className="text-2xl font-black uppercase tracking-tight md:text-3xl" value={f.title} onChange={(v) => up("features", features, i, "title", v)} />
                </div>
                <Editable as="p" className="mt-4 flex-1 text-base leading-relaxed md:mt-0" style={{ color: inkSecond }} value={f.desc} onChange={(v) => up("features", features, i, "desc", v)} />
                <div className="mt-4 flex items-center justify-end md:mt-0">
                  <span className="grid h-12 w-12 place-items-center rounded-full border transition duration-300 group-hover:scale-110 group-hover:rotate-45" style={{ borderColor: surface, background: surface, color: accent }}>
                    <ArrowUpRight size={20} />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Big Editorial Team Showcase */}
        <div className="mt-24">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b pb-6" style={{ borderColor: surface }}>
            <Editable as="h3" className="text-[clamp(2rem,5vw,4.5rem)] font-black uppercase tracking-tight" value={props?.teamTitle || "The people behind the power"} onChange={(v) => onChange?.({ teamTitle: v })} />
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: accent }}>Senior Leaders Only</span>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {team.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-black/40">
                  <img
                    src={m.img}
                    alt=""
                    className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: accent }}>0{i + 1}</span>
                    <Editable as="div" className="mt-1 text-2xl font-black uppercase text-white" value={m.name} onChange={(v) => up("team", team, i, "name", v)} />
                    <Editable as="div" className="text-sm font-medium text-white/70" value={m.role} onChange={(v) => up("team", team, i, "role", v)} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Full Bleed Studio Filmstrip */}
          <div className="mt-10 grid grid-cols-3 gap-4">
            {gallery.map((g, i) => (
              <div key={i} className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                <img src={g} alt="" className="h-full w-full object-cover transition duration-700 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
