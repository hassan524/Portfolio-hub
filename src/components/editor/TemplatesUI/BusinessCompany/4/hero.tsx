// @ts-nocheck
import { motion } from "framer-motion";
import { Search, MapPin, Briefcase } from "lucide-react";
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
    { value: "8,400+", label: "Placements made" },
    { value: "1,200", label: "Employer partners" },
    { value: "21 days", label: "Average time to hire" },
    { value: "94%", label: "Still in role after a year" },
  ];
  const upS = (i: number, f: string) => (v: string) =>
    onChange?.({ stats: stats.map((s: any, j: number) => (j === i ? { ...s, [f]: v } : s)) });
  const soft = `color-mix(in srgb, ${bg} 12%, transparent)`;
  const muted = `color-mix(in srgb, ${bg} 72%, transparent)`;

  return (
    <section id="home" style={{ backgroundColor: bg }}>
      <div style={{ backgroundColor: ink }}>
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-28 pt-14 sm:px-8 lg:grid-cols-2 lg:pb-36 lg:pt-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 text-sm font-medium" style={{ color: muted }}>
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
              {T("status", "Recruitment partner since 2009")}
            </div>
            <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl" style={{ color: bg }}>
              {T("headline", "Find the perfect")} <span style={{ color: accent }}>{T("headlineAccent", "candidate")}</span> {T("headlineEnd", "for your team")}
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed" style={{ color: muted }}>
              {T("subheadline", "Hartwell Talent connects growing companies with vetted professionals across technology, finance, operations and sales, usually within three weeks.")}
            </p>

            <div className="mt-9 flex flex-col gap-2 rounded-2xl p-2 sm:flex-row sm:items-center" style={{ backgroundColor: bgSecond }}>
              <div className="flex flex-1 items-center gap-3 rounded-xl px-4 py-3" style={{ color: inkSecond }}>
                <Briefcase className="h-5 w-5" style={{ color: accent }} />
                <span className="text-sm font-medium">{T("searchOne", "Role or skill")}</span>
              </div>
              <div className="flex flex-1 items-center gap-3 rounded-xl px-4 py-3" style={{ color: inkSecond, borderLeft: `1px solid ${surface}` }}>
                <MapPin className="h-5 w-5" style={{ color: accent }} />
                <span className="text-sm font-medium">{T("searchTwo", "City or remote")}</span>
              </div>
              <a href="#projects" className="flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95" style={{ backgroundColor: accent, color: bgSecond }}>
                <Search className="h-4 w-4" />
                {T("primaryCta", "Explore services")}
              </a>
            </div>
            <a href="#contact" className="mt-5 inline-block text-sm font-semibold underline underline-offset-4 transition-all hover:scale-[1.02] active:scale-95" style={{ color: bg }}>
              {T("secondaryCta", "Or speak with a recruiter")}
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }} className="relative mx-auto h-[26rem] w-full max-w-md sm:h-[30rem]">
            <img src={props?.imageOne || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"} alt="Placed candidate" className="absolute left-0 top-0 h-[20rem] w-[58%] rounded-2xl object-cover sm:h-[23rem]" />
            <img src={props?.imageTwo || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"} alt="Hiring manager" className="absolute bottom-0 right-0 h-[20rem] w-[58%] rounded-2xl object-cover sm:h-[23rem]" style={{ border: `6px solid ${ink}` }} />
            <div className="absolute left-4 bottom-6 rounded-2xl px-5 py-4" style={{ backgroundColor: accent, color: bgSecond }}>
              <div className="text-2xl font-bold">{T("badgeStat", "21 days")}</div>
              <div className="text-xs font-medium">{T("badgeLabel", "average time to hire")}</div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative mx-auto -mt-14 max-w-6xl px-5 pb-6 sm:px-8">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl lg:grid-cols-4" style={{ backgroundColor: surface, border: `1px solid ${surface}` }}>
          {stats.map((s: any, i: number) => (
            <div key={i} className="p-7 text-center" style={{ backgroundColor: bgSecond }}>
              <div className="text-3xl font-bold tracking-tight" style={{ color: ink }}><Editable value={s.value} onChange={upS(i, "value")} /></div>
              <div className="mt-1 text-sm" style={{ color: inkSecond }}><Editable value={s.label} onChange={upS(i, "label")} /></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
