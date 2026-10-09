// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowRight, Play, Smartphone, Monitor } from "lucide-react";
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
  const bento = props?.bento || [
    { title: "Mobile apps", text: "Native-feeling iOS and Android products with design systems that scale.", stat: "64 apps shipped" },
    { title: "Responsive", text: "Every screen planned from 320px up.", stat: "" },
    { title: "Priceless", text: "Clients stay for years.", stat: "92% repeat work" },
    { title: "Web platforms", text: "Dashboards, portals and marketing sites built for speed.", stat: "" },
  ];
  const up = (i: number, f: string) => (v: string) =>
    onChange?.({ bento: bento.map((x: any, j: number) => (j === i ? { ...x, [f]: v } : x)) });
  const rise = (d: number) => ({ initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: d } });

  return (
    <section id="home" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8 lg:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div {...rise(0)} className="flex items-center justify-center gap-2 text-sm" style={{ color: inkSecond }}>
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
            {T("status", "Independent product studio since 2016")}
          </motion.div>
          <motion.h1 {...rise(0.1)} className="mt-6 text-5xl font-black leading-[0.98] tracking-tighter sm:text-7xl lg:text-8xl" style={{ color: ink }}>
            {T("headline", "Create like a pro with a")}{" "}
            <span style={{ color: accent }}>{T("headlineAccent", "premium product team")}</span>
          </motion.h1>
          <motion.p {...rise(0.2)} className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed" style={{ color: inkSecond }}>
            {T("subheadline", "Northstack designs and builds software for ambitious companies. Strategy, interface and engineering under one roof, with one team accountable for the result.")}
          </motion.p>
          <motion.div {...rise(0.3)} className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a href="#contact" className="inline-flex items-center gap-2 rounded-lg px-7 py-4 text-sm font-bold transition-all hover:scale-[1.02] active:scale-95" style={{ backgroundColor: accent, color: bg }}>
              {T("primaryCta", "Start a project")}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#projects" className="inline-flex items-center gap-2 rounded-lg px-7 py-4 text-sm font-bold transition-all hover:scale-[1.02] active:scale-95" style={{ backgroundColor: surface, color: ink }}>
              <Play className="h-4 w-4" />
              {T("secondaryCta", "View our work")}
            </a>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-4 lg:grid-cols-12">
          <motion.div {...rise(0.4)} className="rounded-3xl p-7 lg:col-span-5 lg:row-span-2" style={{ backgroundColor: bgSecond, border: `1px solid ${surface}` }}>
            <div className="mx-auto w-52 overflow-hidden rounded-[2rem] p-2" style={{ backgroundColor: surface }}>
              <img src={props?.phoneImage || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"} alt="App preview" className="h-80 w-full rounded-[1.5rem] object-cover" />
            </div>
            <h3 className="mt-7 text-3xl font-black tracking-tight" style={{ color: ink }}><Editable value={bento[0].title} onChange={up(0, "title")} /></h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: inkSecond }}><Editable value={bento[0].text} onChange={up(0, "text")} /></p>
            <div className="mt-5 text-sm font-bold" style={{ color: accent }}><Editable value={bento[0].stat} onChange={up(0, "stat")} /></div>
          </motion.div>

          <motion.div {...rise(0.5)} className="flex flex-col justify-between rounded-3xl p-7 lg:col-span-4" style={{ backgroundColor: accent, color: bg }}>
            <Smartphone className="h-9 w-9" />
            <div className="mt-10">
              <h3 className="text-3xl font-black tracking-tight"><Editable value={bento[1].title} onChange={up(1, "title")} /></h3>
              <p className="mt-2 text-sm font-medium"><Editable value={bento[1].text} onChange={up(1, "text")} /></p>
            </div>
          </motion.div>

          <motion.div {...rise(0.6)} className="rounded-3xl p-7 lg:col-span-3" style={{ backgroundColor: bgSecond, border: `1px solid ${surface}` }}>
            <div className="text-5xl font-black tracking-tighter" style={{ color: ink }}><Editable value={bento[2].stat} onChange={up(2, "stat")} /></div>
            <h3 className="mt-6 text-xl font-black" style={{ color: ink }}><Editable value={bento[2].title} onChange={up(2, "title")} /></h3>
            <p className="mt-1 text-sm" style={{ color: inkSecond }}><Editable value={bento[2].text} onChange={up(2, "text")} /></p>
          </motion.div>

          <motion.div {...rise(0.7)} className="relative overflow-hidden rounded-3xl lg:col-span-7" style={{ backgroundColor: bgSecond, border: `1px solid ${surface}` }}>
            <img src={props?.wideImage || "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=80"} alt="Studio work" className="h-56 w-full object-cover sm:h-64" />
            <div className="flex items-center justify-between gap-4 p-7">
              <div>
                <h3 className="text-2xl font-black tracking-tight" style={{ color: ink }}><Editable value={bento[3].title} onChange={up(3, "title")} /></h3>
                <p className="mt-1 text-sm" style={{ color: inkSecond }}><Editable value={bento[3].text} onChange={up(3, "text")} /></p>
              </div>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: surface, color: ink }}>
                <Monitor className="h-5 w-5" />
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
