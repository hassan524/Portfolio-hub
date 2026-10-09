// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowUpRight, Gem, TrendingUp } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const T = (key: string, d: string) => (
    <Editable value={props?.[key] || d} onChange={(v: string) => onChange?.({ [key]: v })} />
  );
  const stats = props?.stats || [
    { value: "$2.4B", label: "Assets under advice" },
    { value: "18 yrs", label: "Average advisor tenure" },
    { value: "97%", label: "Client retention" },
  ];
  const upStat = (i: number, f: string) => (v: string) =>
    onChange?.({ stats: stats.map((s: any, j: number) => (j === i ? { ...s, [f]: v } : s)) });

  return (
    <section id="home" className="relative overflow-hidden" style={{ backgroundColor: bg }}>
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-2 lg:pb-28 lg:pt-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h1 className="text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl" style={{ color: ink }}>
            {T("headline", "We help you")}{" "}
            <span style={{ color: accent }}>{T("headlineAccent", "grow and protect your wealth")}</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed" style={{ color: inkSecond }}>
            {T("subheadline", "Independent financial planning for families and business owners who want a clear strategy, honest fees and an advisor who picks up the phone.")}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full py-2 pl-7 pr-2 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95"
              style={{ backgroundColor: accent, color: bg }}
            >
              {T("primaryCta", "Book a review")}
              <span className="flex h-11 w-11 items-center justify-center rounded-full" style={{ backgroundColor: bg, color: accent }}>
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </a>
            <a
              href="#projects"
              className="inline-flex items-center rounded-full px-7 py-4 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95"
              style={{ backgroundColor: surface, color: ink }}
            >
              {T("secondaryCta", "See our services")}
            </a>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6">
            {stats.map((s: any, i: number) => (
              <div key={i} className="pl-4" style={{ borderLeft: `2px solid ${accent}` }}>
                <div className="text-2xl font-semibold sm:text-3xl" style={{ color: ink }}>
                  <Editable value={s.value} onChange={upStat(i, "value")} />
                </div>
                <div className="mt-1 text-xs leading-snug" style={{ color: inkSecond }}>
                  <Editable value={s.label} onChange={upStat(i, "label")} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute inset-x-5 top-6 h-[30rem] rounded-t-full sm:h-[32rem]" style={{ backgroundColor: accent }} />
          <img
            src={props?.heroImage || "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=80"}
            alt="Senior advisor"
            className="relative h-[30rem] w-full rounded-t-full object-cover sm:h-[32rem]"
          />
          <div
            className="absolute -left-2 bottom-8 rounded-3xl p-5 sm:-left-8"
            style={{ backgroundColor: bgSecond, border: `1px solid ${surface}` }}
          >
            <TrendingUp className="h-6 w-6" style={{ color: accent }} />
            <div className="mt-3 text-3xl font-semibold" style={{ color: ink }}>{T("cardStat", "10.2k+")}</div>
            <div className="text-xs" style={{ color: inkSecond }}>{T("cardLabel", "Households advised")}</div>
          </div>
          <div
            className="absolute -right-1 top-14 flex h-24 w-24 items-center justify-center rounded-full sm:-right-6"
            style={{ backgroundColor: bgSecond, border: `1px solid ${surface}` }}
          >
            <Gem className="h-8 w-8" style={{ color: accent }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
