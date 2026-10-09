// @ts-nocheck
import { motion } from "framer-motion";
import { Target, Lock, Gauge, Handshake } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function About({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const milestones = props?.milestones || [
    { year: "2018", title: "Founded in Karachi and London", text: "Two quants and a former wealth manager start building the tool they wished they had." },
    { year: "2020", title: "First 100 advisory firms", text: "Reporting automation becomes the feature clients cannot stop talking about." },
    { year: "2023", title: "Risk engine launched", text: "Scenario analysis moves from overnight batch jobs to results in seconds." },
    { year: "2026", title: "$6.2B tracked", text: "Now trusted by 2,400 firms across 31 markets with a Tier 1 security audit." },
  ];
  const values = props?.values || [
    { icon: "target", title: "Precision first", text: "Numbers that reconcile every time." },
    { icon: "lock", title: "Security by design", text: "Encryption and audit trails throughout." },
    { icon: "gauge", title: "Speed that scales", text: "Fast on ten clients or ten thousand." },
    { icon: "hand", title: "Plain dealing", text: "Clear pricing and no lock in." },
  ];
  const team = props?.team || [
    { name: "Omar Siddiqui", role: "CEO & Co-founder", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80" },
    { name: "Elena Marchetti", role: "Chief Risk Officer", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80" },
    { name: "Daniel Okoye", role: "Head of Engineering", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80" },
    { name: "Ayesha Khan", role: "Head of Design", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80" },
  ];
  const icons: any = { target: Target, lock: Lock, gauge: Gauge, hand: Handshake };
  const upd = (key: string, arr: any[], i: number, patch: any) =>
    onChange?.({ [key]: arr.map((x: any, idx: number) => (idx === i ? { ...x, ...patch } : x)) });

  return (
    <section id="about" className="relative py-24 sm:py-32 px-5 sm:px-8 overflow-hidden" style={{ background: bg, color: ink }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-20">
          {/* Sticky story */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
              <span className="w-8 h-px" style={{ background: accent }} />
              <Editable value={props?.eyebrow || "About Vaultline"} onChange={(v) => onChange?.({ eyebrow: v })} />
            </span>
            <h2 className="mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
              <Editable value={props?.title || "We build the tools wealth teams trust."} onChange={(v) => onChange?.({ title: v })} />
            </h2>
            <p className="mt-6 leading-relaxed" style={{ color: inkSecond }}>
              <Editable
                value={props?.story || "Vaultline started as a spreadsheet frustration. Advisors were spending Sundays stitching together custodian files, and clients were still getting reports that were a week old."}
                onChange={(v) => onChange?.({ story: v })}
              />
            </p>
            <p className="mt-4 leading-relaxed" style={{ color: inkSecond }}>
              <Editable
                value={props?.story2 || "Eight years later we are a team of sixty engineers, analysts and designers who still believe finance software should feel quiet, fast and honest."}
                onChange={(v) => onChange?.({ story2: v })}
              />
            </p>

            <div className="relative mt-10">
              <div className="absolute -inset-4 rounded-[36px] blur-2xl opacity-30" style={{ background: accent }} />
              <div className="relative grid grid-cols-5 gap-3">
                <div className="col-span-3 aspect-[4/5] rounded-3xl overflow-hidden">
                  <img src={props?.imageOne || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"} alt="Office" className="w-full h-full object-cover" />
                </div>
                <div className="col-span-2 flex flex-col gap-3">
                  <div className="flex-1 rounded-3xl overflow-hidden">
                    <img src={props?.imageTwo || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"} alt="Team" className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-3xl p-4 text-center" style={{ background: accent, color: bg }}>
                    <div className="text-3xl font-extrabold">
                      <Editable value={props?.badgeValue || "60+"} onChange={(v) => onChange?.({ badgeValue: v })} />
                    </div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider">
                      <Editable value={props?.badgeLabel || "Team members"} onChange={(v) => onChange?.({ badgeLabel: v })} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline + values */}
          <div className="lg:col-span-7">
            <div className="relative pl-8 sm:pl-10">
              <div className="absolute left-2 sm:left-3 top-2 bottom-2 w-px" style={{ background: surface }} />
              {milestones.map((m: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.06 }}
                  className="relative pb-12 last:pb-0"
                >
                  <span className="absolute -left-[30px] sm:-left-[38px] top-1.5 w-5 h-5 rounded-full" style={{ background: bg, border: `3px solid ${accent}`, boxShadow: `0 0 0 6px ${surface}` }} />
                  <div className="text-5xl sm:text-6xl font-extrabold tracking-tight" style={{ color: accent }}>
                    <Editable value={m.year} onChange={(v) => upd("milestones", milestones, i, { year: v })} />
                  </div>
                  <h3 className="mt-2 text-xl sm:text-2xl font-bold">
                    <Editable value={m.title} onChange={(v) => upd("milestones", milestones, i, { title: v })} />
                  </h3>
                  <p className="mt-2 leading-relaxed max-w-xl" style={{ color: inkSecond }}>
                    <Editable value={m.text} onChange={(v) => upd("milestones", milestones, i, { text: v })} />
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 grid sm:grid-cols-2 gap-x-8 gap-y-8 pt-12" style={{ borderTop: `1px solid ${surface}` }}>
              {values.map((v: any, i: number) => {
                const Icon = icons[v.icon] || Target;
                return (
                  <div key={i} className="flex items-start gap-4 group">
                    <span className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" style={{ background: surface, color: accent }}>
                      <Icon size={20} />
                    </span>
                    <div>
                      <h4 className="font-bold text-lg">
                        <Editable value={v.title} onChange={(val) => upd("values", values, i, { title: val })} />
                      </h4>
                      <p className="mt-1 text-sm" style={{ color: inkSecond }}>
                        <Editable value={v.text} onChange={(val) => upd("values", values, i, { text: val })} />
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mt-28">
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            <Editable value={props?.teamTitle || "Leadership"} onChange={(v) => onChange?.({ teamTitle: v })} />
          </h3>
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((t: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative aspect-[3/4] rounded-3xl overflow-hidden"
                style={{ background: bgSecond }}
              >
                <img src={t.image} alt={t.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.05]" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${bg}F2, transparent 55%)` }} />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="font-bold text-lg">
                    <Editable value={t.name} onChange={(v) => upd("team", team, i, { name: v })} />
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: accent }}>
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
