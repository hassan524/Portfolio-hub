// @ts-nocheck
import { motion } from "framer-motion";
import { FlaskConical, HeartHandshake, Recycle, Microscope } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function About({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const chips = props?.chips || ["Dermatologist reviewed", "Fragrance free", "Cruelty free", "Refillable", "Barrier first"];
  const values = props?.values || [
    { icon: "flask", title: "Evidence over trends", text: "Every formula is built on published research and tested on real skin before it reaches you." },
    { icon: "heart", title: "Gentle by default", text: "We protect the barrier first. Actives are introduced slowly and only when your skin is ready." },
    { icon: "recycle", title: "Less, but better", text: "Fewer products, refillable glass and a routine that fits in five minutes." },
  ];
  const team = props?.team || [
    { name: "Dr. Amara Voss", role: "Founder, Dermatologist", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=80" },
    { name: "Lina Okafor", role: "Head of Formulation", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" },
    { name: "Mateo Ruiz", role: "Lead Data Scientist", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" },
    { name: "Sana Iqbal", role: "Creative Director", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80" },
  ];
  const icons: any = { flask: FlaskConical, heart: HeartHandshake, recycle: Recycle };

  const upd = (key: string, arr: any[], i: number, patch: any) =>
    onChange?.({ [key]: arr.map((x: any, idx: number) => (idx === i ? { ...x, ...patch } : x)) });

  return (
    <section id="about" className="relative py-24 sm:py-32 px-5 sm:px-8 overflow-hidden" style={{ background: bg, color: ink }}>
      <div className="mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full blur-3xl opacity-30" style={{ background: accent }} />
            <div className="relative aspect-[4/5] rounded-t-[999px] rounded-b-[32px] overflow-hidden">
              <img
                src={props?.mainImage || "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80"}
                alt="Story"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute -bottom-8 -right-2 sm:-right-8 w-40 sm:w-56 aspect-square rounded-full overflow-hidden"
              style={{ border: `8px solid ${bg}` }}
            >
              <img
                src={props?.secondImage || "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80"}
                alt="Formulation"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-8 -right-2 sm:-right-6 rounded-full px-5 py-3 text-center backdrop-blur-xl" style={{ background: accent, color: bg }}>
              <div className="font-[Georgia,'Times_New_Roman',serif] text-3xl leading-none">
                <Editable value={props?.badgeValue || "2019"} onChange={(v) => onChange?.({ badgeValue: v })} />
              </div>
              <div className="text-[10px] tracking-[0.2em] uppercase mt-1">
                <Editable value={props?.badgeLabel || "Founded"} onChange={(v) => onChange?.({ badgeLabel: v })} />
              </div>
            </div>
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="text-xs tracking-[0.3em] uppercase" style={{ color: accent }}>
              <Editable value={props?.eyebrow || "Our story"} onChange={(v) => onChange?.({ eyebrow: v })} />
            </span>
            <h2 className="mt-5 font-[Georgia,'Times_New_Roman',serif] text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
              <Editable value={props?.title || "Built by clinicians, shaped by data."} onChange={(v) => onChange?.({ title: v })} />
            </h2>
            <p className="mt-6 text-base sm:text-lg leading-relaxed" style={{ color: inkSecond }}>
              <Editable
                value={props?.story || "Veluna began in a dermatology clinic, where the same question kept coming back: why does a routine that works in June fall apart in November? We built a platform that tracks the answer, then pairs it with a small, honest range of formulas."}
                onChange={(v) => onChange?.({ story: v })}
              />
            </p>
            <p className="mt-4 text-base leading-relaxed" style={{ color: inkSecond }}>
              <Editable
                value={props?.story2 || "Today our studio designs software and skincare side by side, so every insight in the app has a product behind it and every product has a reason."}
                onChange={(v) => onChange?.({ story2: v })}
              />
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {chips.map((c: string, i: number) => (
                <span key={i} className="rounded-full px-4 py-2 text-xs tracking-wide" style={{ background: surface, color: ink }}>
                  <Editable value={c} onChange={(v) => onChange?.({ chips: chips.map((x: string, idx: number) => (idx === i ? v : x)) })} />
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <div className="mt-28 grid md:grid-cols-3 gap-0">
          {values.map((v: any, i: number) => {
            const Icon = icons[v.icon] || Microscope;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="py-8 md:px-8 first:md:pl-0 last:md:pr-0"
                style={{ borderTop: `1px solid ${surface}` }}
              >
                <Icon size={26} style={{ color: accent }} />
                <h3 className="mt-5 font-[Georgia,'Times_New_Roman',serif] text-2xl">
                  <Editable value={v.title} onChange={(val) => upd("values", values, i, { title: val })} />
                </h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: inkSecond }}>
                  <Editable value={v.text} onChange={(val) => upd("values", values, i, { text: val })} />
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Team */}
        <div className="mt-24">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <h3 className="font-[Georgia,'Times_New_Roman',serif] text-3xl sm:text-4xl">
              <Editable value={props?.teamTitle || "The people behind the formulas"} onChange={(v) => onChange?.({ teamTitle: v })} />
            </h3>
            <p className="text-sm max-w-xs" style={{ color: inkSecond }}>
              <Editable value={props?.teamText || "Dermatologists, chemists and engineers sharing one small studio."} onChange={(v) => onChange?.({ teamText: v })} />
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
            {team.map((t: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group"
              >
                <div className="aspect-[3/4] rounded-t-[999px] rounded-b-2xl overflow-hidden" style={{ background: bgSecond }}>
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                </div>
                <div className="mt-4 text-center">
                  <div className="font-[Georgia,'Times_New_Roman',serif] text-lg">
                    <Editable value={t.name} onChange={(v) => upd("team", team, i, { name: v })} />
                  </div>
                  <div className="text-xs mt-1" style={{ color: inkSecond }}>
                    <Editable value={t.role} onChange={(v) => upd("team", team, i, { role: v })} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
