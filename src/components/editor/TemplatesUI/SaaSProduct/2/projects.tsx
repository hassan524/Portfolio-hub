// @ts-nocheck
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X, TrendingUp, Check } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Projects({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const rail = useRef(null);
  const [active, setActive] = useState<number | null>(null);

  const items = props?.items || [
    {
      title: "Halden Family Office",
      tags: ["Analytics", "Reporting"],
      description: "Consolidated 14 custodians into one ledger and cut quarterly reporting from nine days to four hours.",
      price: "Result: 94% faster reporting",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
      details: ["14 custodian feeds unified", "White label client portal", "Automated quarterly packs", "Live in six weeks"],
    },
    {
      title: "Northbridge Advisory",
      tags: ["Risk", "Automation"],
      description: "Rule based rebalancing and drift alerts across 1,800 client accounts with a full audit trail.",
      price: "Result: 31% less drift",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
      details: ["Policy rules encoded once", "Two step approval chain", "Concentration alerts", "Zero manual rebalancing runs"],
    },
    {
      title: "Meridian Capital Partners",
      tags: ["Scenario", "Strategy"],
      description: "Scenario engine for an investment committee that now stress tests every proposal before the meeting.",
      price: "Result: 12 minute stress tests",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1000&q=80",
      details: ["Custom macro scenarios", "Factor exposure maps", "Committee ready summaries", "Shared workspace for analysts"],
    },
    {
      title: "Orchard Wealth",
      tags: ["Client portal", "Mobile"],
      description: "A branded mobile experience that lets clients see allocation, goals and documents in one place.",
      price: "Result: 3.4x portal logins",
      image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1000&q=80",
      details: ["Goal tracking visuals", "Secure document vault", "Push notifications for events", "Branded in client colours"],
    },
  ];
  const plans = props?.plans || [
    { name: "Studio", price: "$299 / month", note: "Up to 150 client accounts" },
    { name: "Practice", price: "$899 / month", note: "Up to 1,000 accounts and custom reports" },
    { name: "Enterprise", price: "Custom", note: "Dedicated environment and SLA" },
  ];

  const upd = (i: number, patch: any) =>
    onChange?.({ items: items.map((x: any, idx: number) => (idx === i ? { ...x, ...patch } : x)) });
  const updPlan = (i: number, patch: any) =>
    onChange?.({ plans: plans.map((x: any, idx: number) => (idx === i ? { ...x, ...patch } : x)) });
  const scrollBy = (dir: number) => rail.current?.scrollBy({ left: dir * 440, behavior: "smooth" });
  const current = active !== null ? items[active] : null;

  return (
    <section id="projects" className="relative py-24 sm:py-32 overflow-hidden" style={{ background: bgSecond, color: ink }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
              <span className="w-8 h-px" style={{ background: accent }} />
              <Editable value={props?.eyebrow || "Selected work"} onChange={(v) => onChange?.({ eyebrow: v })} />
            </span>
            <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
              <Editable value={props?.title || "Proof, measured in outcomes."} onChange={(v) => onChange?.({ title: v })} />
            </h2>
          </div>
          <div className="flex gap-3">
            <button aria-label="Previous" onClick={() => scrollBy(-1)} className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95" style={{ background: surface }}>
              <ChevronLeft size={20} />
            </button>
            <button aria-label="Next" onClick={() => scrollBy(1)} className="w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95" style={{ background: accent, color: bg }}>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div ref={rail} className="mt-14 flex gap-6 overflow-x-auto snap-x snap-mandatory px-5 sm:px-8 pb-6" style={{ scrollbarWidth: "none" }}>
        <div className="shrink-0 hidden xl:block w-[calc((100vw-80rem)/2)]" />
        {items.map((it: any, i: number) => (
          <motion.button
            key={i}
            onClick={() => setActive(i)}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.08 }}
            className="group relative shrink-0 snap-start w-[82vw] sm:w-[420px] aspect-[4/5] rounded-[32px] overflow-hidden text-left"
            style={{ background: bg }}
          >
            <img src={it.image} alt={it.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.08]" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${bg} 8%, ${bg}99 40%, transparent 75%)` }} />
            <div className="absolute inset-x-0 bottom-0 p-7" style={{ color: ink }}>
              <div className="flex flex-wrap gap-2">
                {it.tags.map((t: string, ti: number) => (
                  <span key={ti} className="rounded-full px-3 py-1 text-[11px] font-semibold backdrop-blur-md" style={{ background: surface }}>
                    <Editable value={t} onChange={(v) => upd(i, { tags: it.tags.map((x: string, xi: number) => (xi === ti ? v : x)) })} />
                  </span>
                ))}
              </div>
              <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight">
                <Editable value={it.title} onChange={(v) => upd(i, { title: v })} />
              </h3>
              <p className="mt-2 text-sm leading-relaxed line-clamp-3" style={{ color: inkSecond }}>
                <Editable value={it.description} onChange={(v) => upd(i, { description: v })} />
              </p>
              <div className="mt-5 flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: accent }}>
                  <TrendingUp size={16} />
                  <Editable value={it.price} onChange={(v) => upd(i, { price: v })} />
                </span>
                <span className="w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:rotate-45" style={{ background: accent, color: bg }}>
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Pricing highlights */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 mt-20">
        <div className="flex items-center gap-4 mb-2">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            <Editable value={props?.plansTitle || "Simple, transparent pricing"} onChange={(v) => onChange?.({ plansTitle: v })} />
          </h3>
          <span className="flex-1 h-px" style={{ background: surface }} />
        </div>
        <div className="grid md:grid-cols-3">
          {plans.map((p: any, i: number) => (
            <div key={i} className="py-8 md:px-8 first:md:pl-0 transition-transform duration-300 hover:-translate-y-1" style={{ borderLeft: i ? `1px solid ${surface}` : undefined }}>
              <div className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
                <Editable value={p.name} onChange={(v) => updPlan(i, { name: v })} />
              </div>
              <div className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">
                <Editable value={p.price} onChange={(v) => updPlan(i, { price: v })} />
              </div>
              <div className="mt-2 text-sm" style={{ color: inkSecond }}>
                <Editable value={p.note} onChange={(v) => updPlan(i, { note: v })} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8 backdrop-blur-md"
            style={{ background: `${ink}99` }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl grid md:grid-cols-2"
              style={{ background: bg, color: ink }}
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                style={{ background: bg, color: ink, border: `1px solid ${surface}` }}
              >
                <X size={18} />
              </button>
              <div className="aspect-video md:aspect-auto md:min-h-[460px]">
                <img src={current.image} alt={current.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 sm:p-10 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2">
                  {current.tags.map((t: string, ti: number) => (
                    <span key={ti} className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: surface }}>
                      <Editable value={t} />
                    </span>
                  ))}
                </div>
                <h4 className="mt-5 text-3xl font-extrabold tracking-tight">
                  <Editable value={current.title} />
                </h4>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: inkSecond }}>
                  <Editable value={current.description} />
                </p>
                <ul className="mt-6 space-y-3">
                  {current.details.map((d: string, di: number) => (
                    <li key={di} className="flex items-center gap-3 text-sm font-medium">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: accent, color: bg }}>
                        <Check size={13} />
                      </span>
                      <Editable value={d} onChange={(v) => upd(active as number, { details: current.details.map((x: string, xi: number) => (xi === di ? v : x)) })} />
                    </li>
                  ))}
                </ul>
                <div className="mt-8 text-lg font-bold" style={{ color: accent }}>
                  <Editable value={current.price} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
