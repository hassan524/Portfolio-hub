// @ts-nocheck
import { motion } from "framer-motion";
import { ScanFace, LineChart, Beaker, Truck, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Services({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const steps = props?.steps || [
    { icon: "scan", title: "Scan", text: "A thirty second photo scan reads texture, tone and hydration without any lab visit." },
    { icon: "chart", title: "Track", text: "Weather, sleep and cycle data are layered in so the app sees patterns you would miss." },
    { icon: "beaker", title: "Formulate", text: "Your plan picks from our core range and adjusts strengths week by week." },
    { icon: "truck", title: "Refine", text: "Monthly check ins keep the routine honest as your skin and your season change." },
  ];
  const icons: any = { scan: ScanFace, chart: LineChart, beaker: Beaker, truck: Truck };
  const upd = (i: number, patch: any) =>
    onChange?.({ steps: steps.map((s: any, idx: number) => (idx === i ? { ...s, ...patch } : s)) });

  return (
    <section id="services" className="relative py-24 sm:py-32 px-5 sm:px-8 overflow-hidden" style={{ background: bgSecond, color: ink }}>
      <div className="absolute right-0 top-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: accent }} />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <span className="text-xs tracking-[0.3em] uppercase" style={{ color: accent }}>
              <Editable value={props?.eyebrow || "The method"} onChange={(v) => onChange?.({ eyebrow: v })} />
            </span>
            <h2 className="mt-5 font-[Georgia,'Times_New_Roman',serif] text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
              <Editable value={props?.title || "Four quiet steps to skin that stays balanced."} onChange={(v) => onChange?.({ title: v })} />
            </h2>
          </div>
          <p className="lg:col-span-5 text-base leading-relaxed" style={{ color: inkSecond }}>
            <Editable
              value={props?.text || "No jargon and no twenty step ritual. The platform does the heavy lifting in the background."}
              onChange={(v) => onChange?.({ text: v })}
            />
          </p>
        </div>

        <div className="mt-16">
          {steps.map((s: any, i: number) => {
            const Icon = icons[s.icon] || ScanFace;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group grid grid-cols-12 gap-4 items-center py-8 sm:py-10 transition-all duration-500 hover:pl-3"
                style={{ borderTop: `1px solid ${surface}`, borderBottom: i === steps.length - 1 ? `1px solid ${surface}` : undefined }}
              >
                <span className="col-span-2 sm:col-span-1 font-[Georgia,'Times_New_Roman',serif] text-3xl sm:text-4xl" style={{ color: accent }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="col-span-10 sm:col-span-4 font-[Georgia,'Times_New_Roman',serif] text-3xl sm:text-4xl">
                  <Editable value={s.title} onChange={(v) => upd(i, { title: v })} />
                </h3>
                <p className="col-span-12 sm:col-span-5 text-sm sm:text-base leading-relaxed" style={{ color: inkSecond }}>
                  <Editable value={s.text} onChange={(v) => upd(i, { text: v })} />
                </p>
                <span
                  className="hidden sm:flex col-span-2 justify-end"
                >
                  <span
                    className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110"
                    style={{ background: surface, color: accent }}
                  >
                    <Icon size={22} />
                  </span>
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 flex items-center gap-2 text-sm" style={{ color: inkSecond }}>
          <ArrowUpRight size={16} style={{ color: accent }} />
          <Editable value={props?.footnote || "Average setup takes under five minutes."} onChange={(v) => onChange?.({ footnote: v })} />
        </div>
      </div>
    </section>
  );
}
