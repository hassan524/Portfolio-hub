// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, PenTool, Code2, Check } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function About({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const T = (key: string, d: string) => (
    <Editable value={props?.[key] || d} onChange={(v: string) => onChange?.({ [key]: v })} />
  );
  const up = (key: string, arr: any[], i: number, f: string) => (v: string) =>
    onChange?.({ [key]: arr.map((x: any, j: number) => (j === i ? { ...x, [f]: v } : x)) });
  const [tab, setTab] = useState(0);
  const icons = [Compass, PenTool, Code2];

  const tabs = props?.tabs || [
    { name: "Strategy", title: "Find the product worth building", text: "Two-week discovery sprints that turn a vague idea into a validated scope, a roadmap and a budget you can defend.", points: ["User research and interviews", "Competitive review", "Prioritised roadmap"], image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80" },
    { name: "Design", title: "Interfaces that feel obvious", text: "Systems, prototypes and visual direction tested with real users before a line of production code is written.", points: ["Design systems", "Interactive prototypes", "Brand-aligned UI"], image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1000&q=80" },
    { name: "Engineering", title: "Software that ships and stays up", text: "Typed, tested and documented code on modern stacks, handed over cleanly or maintained by us.", points: ["Web and mobile apps", "APIs and integrations", "Performance and security"], image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80" },
  ];
  const team = props?.team || [
    { name: "Kaya Moreau", role: "Creative Director", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80" },
    { name: "Idris Bello", role: "Engineering Lead", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80" },
    { name: "Noor Haddad", role: "Product Strategist", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80" },
    { name: "Sam Whitlock", role: "Studio Manager", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80" },
  ];
  const values = props?.values || [
    { title: "Small team, senior people", text: "You work with the people whose names are on the proposal." },
    { title: "Fixed scope, fixed price", text: "No hourly surprises. Changes are agreed in writing first." },
    { title: "Ship early, learn fast", text: "A working build in your hands every two weeks." },
  ];
  const t = tabs[tab];

  return (
    <section id="about" className="py-24 sm:py-32" style={{ backgroundColor: bgSecond }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="text-sm font-bold uppercase tracking-widest" style={{ color: accent }}>{T("eyebrow", "The studio")}</div>
            <h2 className="mt-4 text-4xl font-black leading-[1.02] tracking-tighter sm:text-6xl" style={{ color: ink }}>{T("title", "Twelve people. One standard.")}</h2>
            <p className="mt-6 text-base leading-relaxed" style={{ color: inkSecond }}>
              {T("story", "Northstack started in 2016 as two designers and a developer sharing a desk. Today we are twelve, and we still take on only six projects at a time so that each one gets the attention it deserves.")}
            </p>
            <div className="mt-10 space-y-3">
              {tabs.map((tb: any, i: number) => {
                const Icon = icons[i % icons.length];
                const on = tab === i;
                return (
                  <button key={i} type="button" onClick={() => setTab(i)} className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left transition-all hover:scale-[1.02] active:scale-95" style={{ backgroundColor: on ? accent : surface, color: on ? bg : ink }}>
                    <Icon className="h-5 w-5" />
                    <span className="text-base font-bold"><Editable value={tb.name} onChange={up("tabs", tabs, i, "name")} /></span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div key={tab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="overflow-hidden rounded-3xl" style={{ backgroundColor: bg, border: `1px solid ${surface}` }}>
                <img src={t.image} alt={t.name} className="h-64 w-full object-cover sm:h-80" />
                <div className="p-8">
                  <h3 className="text-3xl font-black tracking-tight" style={{ color: ink }}><Editable value={t.title} onChange={up("tabs", tabs, tab, "title")} /></h3>
                  <p className="mt-3 text-base leading-relaxed" style={{ color: inkSecond }}><Editable value={t.text} onChange={up("tabs", tabs, tab, "text")} /></p>
                  <ul className="mt-6 space-y-3">
                    {t.points.map((p: string, k: number) => (
                      <li key={k} className="flex items-center gap-3 text-sm font-semibold" style={{ color: ink }}>
                        <Check className="h-4 w-4" style={{ color: accent }} />
                        <Editable value={p} onChange={(v: string) => onChange?.({ tabs: tabs.map((x: any, j: number) => (j === tab ? { ...x, points: x.points.map((y: string, m: number) => (m === k ? v : y)) } : x)) })} />
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 gap-4 md:grid-cols-4">
          {team.map((m: any, i: number) => (
            <div key={i} className="group overflow-hidden rounded-3xl transition-all hover:scale-[1.02]" style={{ backgroundColor: bg, border: `1px solid ${surface}` }}>
              <img src={m.image} alt={m.name} className="h-56 w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0" />
              <div className="p-5">
                <div className="text-base font-bold" style={{ color: ink }}><Editable value={m.name} onChange={up("team", team, i, "name")} /></div>
                <div className="mt-1 text-sm" style={{ color: inkSecond }}><Editable value={m.role} onChange={up("team", team, i, "role")} /></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          {values.map((v: any, i: number) => (
            <div key={i} className="grid items-center gap-3 py-7 md:grid-cols-12" style={{ borderTop: `1px solid ${surface}` }}>
              <div className="text-sm font-bold md:col-span-1" style={{ color: accent }}>{`0${i + 1}`}</div>
              <h4 className="text-2xl font-black tracking-tight md:col-span-5" style={{ color: ink }}><Editable value={v.title} onChange={up("values", values, i, "title")} /></h4>
              <p className="text-sm leading-relaxed md:col-span-6" style={{ color: inkSecond }}><Editable value={v.text} onChange={up("values", values, i, "text")} /></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
