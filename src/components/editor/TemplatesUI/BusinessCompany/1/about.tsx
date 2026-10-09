// @ts-nocheck
import { motion } from "framer-motion";
import { Check, Target, Handshake, Scale, BarChart3, Globe2 } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function About({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const features = props?.features || [
    { title: "Measured, not guessed", text: "Every recommendation starts with your own data and ends with a number you can track." },
    { title: "Built with your team", text: "We work alongside operations and finance so changes stick after we leave." },
    { title: "Clear return", text: "Each program is scoped around payback time, not paperwork." },
  ];
  const capabilities = props?.capabilities || [
    "Carbon accounting", "Supply chain audits", "ESG reporting", "Energy retrofits", "Policy and compliance", "Leadership training",
  ];
  const team = props?.team || [
    { name: "Amara Okafor", role: "Founder and Principal", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" },
    { name: "Daniel Reyes", role: "Head of Operations", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80" },
    { name: "Priya Nair", role: "Lead Analyst", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80" },
    { name: "Marcus Lindqvist", role: "Engineering Advisor", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80" },
  ];
  const values = props?.values || [
    { title: "Integrity", text: "We tell you what the numbers say, even when it is inconvenient." },
    { title: "Partnership", text: "One accountable lead from first workshop to final report." },
    { title: "Balance", text: "Environmental gains that also make financial sense." },
  ];
  const valueIcons = [Scale, Handshake, Target];
  const featureIcons = [BarChart3, Handshake, Globe2];

  const upd = (key: string, arr: any[], i: number, field: string, v: string) =>
    onChange?.({ [key]: arr.map((x: any, j: number) => (j === i ? { ...x, [field]: v } : x)) });

  const rise = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <section id="about" className="relative py-24 sm:py-32" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <motion.div variants={rise} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="text-sm font-bold uppercase tracking-widest" style={{ color: accent }}>
              <Editable value={props?.eyebrow || "Our story"} onChange={(v: string) => onChange?.({ eyebrow: v })} />
            </div>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl" style={{ color: ink }}>
              <Editable
                value={props?.title || "A consultancy founded on one idea: good business and a healthy planet go together"}
                onChange={(v: string) => onChange?.({ title: v })}
              />
            </h2>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: inkSecond }}>
              <Editable
                value={
                  props?.story ||
                  "Verdant & Co. began in 2014 with three advisors and a single manufacturing client. Today we guide more than two hundred companies across logistics, retail, food and professional services toward lower costs, lower emissions and clearer reporting."
                }
                onChange={(v: string) => onChange?.({ story: v })}
              />
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {capabilities.map((c: string, i: number) => (
                <li key={i} className="flex items-center gap-3 text-sm font-semibold" style={{ color: ink }}>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full" style={{ backgroundColor: accent, color: bg }}>
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <Editable
                    value={c}
                    onChange={(v: string) => onChange?.({ capabilities: capabilities.map((x: string, j: number) => (j === i ? v : x)) })}
                  />
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="overflow-hidden rounded-[2rem]" style={{ backgroundColor: surface }}>
              <img
                src={props?.imageOne || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"}
                alt="Our studio"
                className="h-72 w-full object-cover"
              />
            </div>
            <div className="mt-10 overflow-hidden rounded-[2rem]" style={{ backgroundColor: surface }}>
              <img
                src={props?.imageTwo || "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80"}
                alt="Client workshop"
                className="h-72 w-full object-cover"
              />
            </div>
            <div className="col-span-2 rounded-[2rem] p-8" style={{ backgroundColor: accent, color: bg }}>
              <div className="text-5xl font-extrabold tracking-tight">
                <Editable value={props?.cardStat || "9,800 t"} onChange={(v: string) => onChange?.({ cardStat: v })} />
              </div>
              <div className="mt-2 text-sm font-semibold">
                <Editable
                  value={props?.cardLabel || "CO2 equivalent avoided by our clients last year"}
                  onChange={(v: string) => onChange?.({ cardLabel: v })}
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-3">
          {features.map((f: any, i: number) => {
            const Icon = featureIcons[i % featureIcons.length];
            return (
              <motion.div
                key={i}
                variants={rise}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="rounded-[2rem] p-8 transition-all hover:scale-[1.02]"
                style={{ backgroundColor: surface }}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: bg, color: accent }}>
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-xl font-bold" style={{ color: ink }}>
                  <Editable value={f.title} onChange={(v: string) => upd("features", features, i, "title", v)} />
                </h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: inkSecond }}>
                  <Editable value={f.text} onChange={(v: string) => upd("features", features, i, "text", v)} />
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-24">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: ink }}>
              <Editable value={props?.teamTitle || "The people behind the work"} onChange={(v: string) => onChange?.({ teamTitle: v })} />
            </h3>
            <p className="max-w-md text-sm leading-relaxed" style={{ color: inkSecond }}>
              <Editable
                value={props?.teamText || "A small senior team, so every client works directly with the people who do the analysis."}
                onChange={(v: string) => onChange?.({ teamText: v })}
              />
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {team.map((m: any, i: number) => (
              <motion.div
                key={i}
                variants={rise}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="overflow-hidden rounded-[2rem] transition-all hover:scale-[1.02]"
                style={{ backgroundColor: surface }}
              >
                <img src={m.image} alt={m.name} className="h-64 w-full object-cover" />
                <div className="p-5">
                  <div className="text-base font-bold" style={{ color: ink }}>
                    <Editable value={m.name} onChange={(v: string) => upd("team", team, i, "name", v)} />
                  </div>
                  <div className="mt-1 text-sm" style={{ color: inkSecond }}>
                    <Editable value={m.role} onChange={(v: string) => upd("team", team, i, "role", v)} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-24 grid gap-5 md:grid-cols-3">
          {values.map((v: any, i: number) => {
            const Icon = valueIcons[i % valueIcons.length];
            return (
              <div key={i} className="flex gap-5 rounded-[2rem] p-7" style={{ backgroundColor: bgSecond, border: `1px solid ${surface}` }}>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ backgroundColor: accent, color: bg }}>
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h4 className="text-lg font-bold" style={{ color: ink }}>
                    <Editable value={v.title} onChange={(t: string) => upd("values", values, i, "title", t)} />
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: inkSecond }}>
                    <Editable value={v.text} onChange={(t: string) => upd("values", values, i, "text", t)} />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
