// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
    { value: "30", label: "Years advising businesses" },
    { value: "1,900", label: "Matters resolved" },
    { value: "$3.1B", label: "Transaction value handled" },
  ];
  const upS = (i: number, f: string) => (v: string) =>
    onChange?.({ stats: stats.map((s: any, j: number) => (j === i ? { ...s, [f]: v } : s)) });

  return (
    <section id="home" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="lg:col-span-8">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: accent }}>
              <span className="h-px w-10" style={{ backgroundColor: accent }} />
              {T("eyebrow", "Corporate law, established 1994")}
            </div>
            <h1 className="mt-8 font-serif text-5xl leading-[1.02] tracking-tight sm:text-7xl lg:text-[5.5rem]" style={{ color: ink }}>
              {T("headline", "Counsel for companies that plan to")} <span className="italic" style={{ color: accent }}>{T("headlineAccent", "last")}</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed" style={{ color: inkSecond }}>
              {T("subheadline", "Marlowe & Finch advises founders, boards and family businesses on transactions, disputes and governance, with partners involved from the first call to the final signature.")}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a href="#contact" className="inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95" style={{ backgroundColor: ink, color: bg }}>
                {T("primaryCta", "Request a consultation")}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#projects" className="text-sm font-semibold underline underline-offset-8 transition-all hover:scale-[1.02] active:scale-95" style={{ color: ink }}>
                {T("secondaryCta", "Our practice areas")}
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.2 }} className="lg:col-span-4">
            <div className="p-3" style={{ backgroundColor: bgSecond, border: `1px solid ${surface}` }}>
              <img src={props?.heroImage || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80"} alt="Law office" className="h-80 w-full object-cover lg:h-[26rem]" />
            </div>
            <p className="mt-3 text-xs italic" style={{ color: inkSecond }}>{T("caption", "Our Chicago offices, Loop district")}</p>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-0 md:grid-cols-3" style={{ borderTop: `1px solid ${ink}` }}>
          {stats.map((s: any, i: number) => (
            <div key={i} className="px-0 py-8 md:px-8" style={{ borderLeft: i === 0 ? "none" : undefined, borderTop: undefined }}>
              <div className="font-serif text-5xl" style={{ color: ink }}><Editable value={s.value} onChange={upS(i, "value")} /></div>
              <div className="mt-2 text-sm" style={{ color: inkSecond }}><Editable value={s.label} onChange={upS(i, "label")} /></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
