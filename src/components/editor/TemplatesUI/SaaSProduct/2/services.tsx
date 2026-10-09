// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, ShieldAlert, FileBarChart, Workflow, Check, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Services({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const [tab, setTab] = useState(0);

  const tabs = props?.tabs || [
    {
      icon: "chart",
      label: "Portfolio analytics",
      title: "Every position, one honest view.",
      text: "Consolidate custodians, models and manual assets into a single live ledger with attribution that actually reconciles.",
      points: ["Multi custodian aggregation", "Performance attribution by factor", "Look through for funds and ETFs"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    },
    {
      icon: "alert",
      label: "Risk modelling",
      title: "See the shock before it lands.",
      text: "Run stress tests and scenario analysis in seconds, with plain language summaries your clients will understand.",
      points: ["Historical and custom scenarios", "Concentration and liquidity alerts", "Drawdown forecasting"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    },
    {
      icon: "report",
      label: "Client reporting",
      title: "Reports that look like you made them.",
      text: "Branded, automated and always current. Send a quarterly pack in minutes instead of a weekend.",
      points: ["White label report builder", "Scheduled delivery", "Interactive client dashboards"],
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    },
    {
      icon: "flow",
      label: "Workflow automation",
      title: "Rebalancing without the spreadsheet.",
      text: "Turn policy into rules, flag drift automatically and keep a clean audit trail for every decision.",
      points: ["Rule based rebalancing", "Approval chains", "Full audit history"],
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1200&q=80",
    },
  ];
  const icons: any = { chart: LineChart, alert: ShieldAlert, report: FileBarChart, flow: Workflow };
  const t = tabs[tab];
  const updTab = (patch: any) =>
    onChange?.({ tabs: tabs.map((x: any, i: number) => (i === tab ? { ...x, ...patch } : x)) });

  return (
    <section id="services" className="relative py-24 sm:py-32 px-5 sm:px-8 overflow-hidden" style={{ background: bgSecond, color: ink }}>
      <div className="absolute -left-40 top-20 w-[520px] h-[520px] rounded-full blur-3xl opacity-25 pointer-events-none" style={{ background: accent }} />
      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
            <span className="w-8 h-px" style={{ background: accent }} />
            <Editable value={props?.eyebrow || "The platform"} onChange={(v) => onChange?.({ eyebrow: v })} />
          </span>
          <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
            <Editable value={props?.title || "Four engines. One calm workspace."} onChange={(v) => onChange?.({ title: v })} />
          </h2>
          <p className="mt-5 text-base sm:text-lg leading-relaxed" style={{ color: inkSecond }}>
            <Editable
              value={props?.text || "Everything an advisory team needs, connected from the first data feed to the final client report."}
              onChange={(v) => onChange?.({ text: v })}
            />
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-12 gap-8 lg:gap-14">
          <div className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0" style={{ scrollbarWidth: "none" }}>
            {tabs.map((x: any, i: number) => {
              const Icon = icons[x.icon] || LineChart;
              const on = i === tab;
              return (
                <button
                  key={i}
                  onClick={() => setTab(i)}
                  className="shrink-0 flex items-center gap-4 rounded-2xl px-5 py-4 text-left transition-all duration-300 hover:scale-[1.01] active:scale-95"
                  style={{ background: on ? accent : "transparent", color: on ? bg : ink, border: `1px solid ${on ? accent : surface}` }}
                >
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: on ? `${bg}33` : surface, color: on ? bg : accent }}>
                    <Icon size={18} />
                  </span>
                  <span className="font-bold text-sm sm:text-base whitespace-nowrap lg:whitespace-normal">
                    <Editable value={x.label} onChange={(v) => onChange?.({ tabs: tabs.map((y: any, yi: number) => (yi === i ? { ...y, label: v } : y)) })} />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                    <Editable value={t.title} onChange={(v) => updTab({ title: v })} />
                  </h3>
                  <p className="mt-4 leading-relaxed" style={{ color: inkSecond }}>
                    <Editable value={t.text} onChange={(v) => updTab({ text: v })} />
                  </p>
                  <ul className="mt-6 space-y-3">
                    {t.points.map((p: string, i: number) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-medium">
                        <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: surface, color: accent }}>
                          <Check size={13} />
                        </span>
                        <Editable value={p} onChange={(v) => updTab({ points: t.points.map((x: string, xi: number) => (xi === i ? v : x)) })} />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative group">
                  <div className="absolute -inset-3 rounded-[32px] blur-2xl opacity-40 transition-opacity group-hover:opacity-70" style={{ background: accent }} />
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden" style={{ border: `1px solid ${surface}` }}>
                    <img src={t.image} alt={t.label} className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.05]" />
                    <span className="absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center" style={{ background: bg, color: accent }}>
                      <ArrowUpRight size={20} />
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
