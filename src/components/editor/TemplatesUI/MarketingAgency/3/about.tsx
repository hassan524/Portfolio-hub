// @ts-nocheck
import { motion } from "framer-motion";
import { Check, Crown, Users } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function About({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#1A0103";
  const bgSecond = theme?.["bg-second"] || "#420205";
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || "#F8D4D4";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#E50914";
  const yellow = "#FFBF00";

  const defaultFeatures = [
    { title: "Strategy that bites", desc: "Positioning and market roadmaps sharp enough to cut through industry noise." },
    { title: "Creative with a crown", desc: "Campaigns and visual identities that look and sound unmistakably royal." },
    { title: "Performance that prints", desc: "Paid acquisition, social and CRM tuned daily against enterprise revenue." },
    { title: "Reporting you can read", desc: "One executive page. Real attribution numbers. Zero corporate fluff." },
  ];
  const features = (props?.features && props.features.length > 0) ? props.features : defaultFeatures;

  const defaultTeam = [
    { name: "Victoria Hale", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80" },
    { name: "Dario Stone", role: "Creative Director", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" },
    { name: "Naomi Okoye", role: "Head of Performance", img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&q=80" },
  ];
  const team = (props?.team && props.team.length > 0) ? props.team : defaultTeam;

  const defaultValues = ["Bold", "Honest", "Fast", "Measurable", "Fearless"];
  const values = (props?.values && props.values.length > 0) ? props.values : defaultValues;

  const defaultGallery = [
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=700&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80",
  ];
  const gallery = (props?.gallery && props.gallery.length > 0) ? props.gallery : defaultGallery;

  const up = (key, arr, i, k, v) => onChange?.({ [key]: arr.map((x, j) => (j === i ? { ...x, [k]: v } : x)) });

  return (
    <section id="about" className="relative px-4 py-32 md:px-8" style={{ background: bg, color: ink }}>
      <div className="mx-auto max-w-7xl">
        {/* Broadsheet Manifesto Header */}
        <div className="border-2" style={{ borderColor: accent, background: "rgba(25, 2, 4, 0.9)" }}>
          <div className="grid md:grid-cols-12">
            <div className="flex flex-col justify-between p-8 md:col-span-5 md:border-r-2" style={{ background: accent, color: "#fff", borderColor: accent }}>
              <div>
                <span className="flex items-center gap-2 font-serif text-xs font-black uppercase tracking-[0.3em]">
                  <Crown size={16} />
                  <Editable as="span" value={props?.eyebrow || "The Agency / 01"} onChange={(v) => onChange?.({ eyebrow: v })} />
                </span>
                <Editable as="div" className="my-8 font-serif text-[clamp(4.5rem,11vw,9.5rem)] font-black leading-[0.8]" value={props?.year || "2014"} onChange={(v) => onChange?.({ year: v })} />
              </div>
              <Editable as="p" className="font-serif text-3xl font-black uppercase leading-tight md:text-4xl" value={props?.title || "Born in a basement. Crowned by results."} onChange={(v) => onChange?.({ title: v })} />
            </div>

            <div className="p-8 md:col-span-7 md:p-14 flex flex-col justify-between">
              <div>
                <span className="font-serif text-xs font-bold uppercase tracking-widest" style={{ color: yellow }}>NYC · LON · MANCHESTER</span>
                <Editable as="p" className="mt-4 text-xl font-medium leading-relaxed text-white/90 md:text-2xl" value={props?.story || "Market Agency started with two founders, one rented desk and a belief that marketing is broken by complexity. Ten years later we run an independent team serving challenger brands across retail, luxury and fintech, keeping every campaign simple, smart and effective."} onChange={(v) => onChange?.({ story: v })} />
              </div>

              {/* Numbered Full-Width Architectural Disciplines */}
              <div className="mt-12 divide-y-2 border-t-2" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
                {features.map((f, i) => (
                  <div key={i} className="flex items-start gap-5 py-5">
                    <span className="font-serif text-lg font-black" style={{ color: yellow }}>0{i + 1}</span>
                    <div className="flex-1">
                      <Editable as="h4" className="font-serif text-2xl font-black uppercase tracking-tight text-white" value={f.title} onChange={(v) => up("features", features, i, "title", v)} />
                      <Editable as="p" className="mt-1 text-sm font-medium leading-relaxed text-white/70" value={f.desc} onChange={(v) => up("features", features, i, "desc", v)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Agency Values Manifesto Banner */}
        <div className="mt-8 flex flex-wrap gap-3">
          {values.map((v, i) => (
            <span key={i} className="border-2 px-6 py-2.5 font-serif text-lg font-black uppercase italic tracking-wider" style={{ borderColor: i % 2 === 0 ? yellow : accent, color: i % 2 === 0 ? yellow : "#fff" }}>
              <Editable as="span" value={v} onChange={(x) => onChange?.({ values: values.map((y, j) => (j === i ? x : y)) })} />
            </span>
          ))}
        </div>

        {/* Royal Court Exhibition Catalog */}
        <div className="mt-28 border-t-2 pt-16" style={{ borderColor: accent }}>
          <div className="mb-12 flex flex-wrap items-baseline justify-between gap-4">
            <div className="flex items-center gap-3">
              <Users size={24} style={{ color: yellow }} />
              <Editable as="h3" className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase tracking-tight text-white" value={props?.teamTitle || "The Royal Command"} onChange={(v) => onChange?.({ teamTitle: v })} />
            </div>
            <span className="font-serif text-xs font-bold uppercase tracking-widest" style={{ color: yellow }}>40.7128° N, 74.0060° W</span>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {team.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-2 p-3 pb-6"
                style={{ borderColor: accent, background: "rgba(30, 2, 4, 0.8)" }}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
                  <img
                    src={m.img}
                    alt=""
                    className="h-full w-full object-cover grayscale contrast-125 transition duration-700 hover:scale-105 hover:grayscale-0"
                  />
                </div>
                <div className="mt-4 px-2">
                  <span className="font-serif text-xs font-bold uppercase tracking-widest" style={{ color: yellow }}>Partner 0{i + 1}</span>
                  <Editable as="div" className="mt-1 font-serif text-3xl font-black uppercase tracking-tight text-white" value={m.name} onChange={(v) => up("team", team, i, "name", v)} />
                  <Editable as="div" className="mt-1 text-xs font-black uppercase tracking-widest text-white/70" value={m.role} onChange={(v) => up("team", team, i, "role", v)} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Exhibition Photo Grid */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            {gallery.map((g, i) => (
              <div key={i} className="aspect-[16/9] overflow-hidden border-2" style={{ borderColor: accent }}>
                <img src={g} alt="" className="h-full w-full object-cover grayscale transition duration-700 hover:scale-110 hover:grayscale-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
