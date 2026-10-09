// @ts-nocheck
import { motion } from "framer-motion";
import { Code, Palette, Gauge } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const rise = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.8 } };
const icons = [Code, Palette, Gauge];

export function About({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#09090B";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#F2542D";
  const T = (k: string, d: string) => <Editable value={props?.[k] || d} onChange={(v: string) => onChange?.({ [k]: v })} />;
  const upd = (key: string, arr: any[], i: number, f: string, v: any) => onChange?.({ [key]: arr.map((x: any, j: number) => (j === i ? (f ? { ...x, [f]: v } : v) : x)) });
  const I = (key: string, arr: any[], i: number, f?: string) => <Editable value={f ? arr[i][f] : arr[i]} onChange={(v: string) => upd(key, arr, i, f || "", v)} />;
  const chips = props?.chips || ["TypeScript", "Design systems", "Cloud infra", "AI features", "Data pipelines"];
  const features = props?.features || [{ title: "Full-stack engineering", text: "React, Node and cloud infrastructure built to scale from day one." }, { title: "Interface craft", text: "Design systems and motion that make products feel premium." }, { title: "Performance obsessed", text: "Fast load times, clean metrics and zero-drama deployments." }];
  const team = props?.team || [
    { name: "Liam Foster", role: "Founder & CTO", image: img("photo-1472099645785-5658abf4ff4e", 500) },
    { name: "Nora Bennett", role: "Design Director", image: img("photo-1494790108377-be9c29b29330", 500) },
    { name: "Omar Haddad", role: "Staff Engineer", image: img("photo-1500648767791-00dcc994a43e", 500) },
    { name: "Chloe Martin", role: "Product Manager", image: img("photo-1438761681033-6461ffad8d80", 500) },
  ];
  const values = props?.values || [{ title: "Ship early, learn fast", text: "Small releases beat big reveals every time." }, { title: "Own the outcome", text: "We measure success by your metrics, not our hours." }, { title: "Leave it better", text: "Clean code, clear docs and a team that can take over." }];
  return (
    <section id="about" className="px-6 py-28 md:py-36" style={{ background: bgSecond, color: ink }}>
      <div className="mx-auto max-w-6xl">
        <div className="grid items-stretch gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div {...rise} className="flex min-w-0 flex-col justify-center">
            <span className="text-xs uppercase tracking-[0.3em]" style={{ color: accent }}>{T("eyebrow", "About the studio")}</span>
            <h2 className="mt-4 break-words text-4xl font-light leading-tight tracking-tight md:text-5xl">{T("title", "A studio that treats software like")} <span className="font-serif italic">{T("titleAccent", "craft")}</span></h2>
            <p className="mt-6 break-words opacity-70" style={{ color: inkSecond }}>{T("story", "Halo Labs was founded in 2018 by engineers who wanted fewer meetings and better products. We are a senior team of 14 building SaaS for startups and scale-ups, from first prototype to millions of requests a day.")}</p>
            <div className="mt-6 flex flex-wrap gap-2">{chips.map((c: string, i: number) => (<span key={i} className="rounded-full px-4 py-1.5 text-xs" style={{ background: surface }}>{I("chips", chips, i)}</span>))}</div>
            <div className="mt-10">
              {features.map((f: any, i: number) => {
                const Icon = icons[i % icons.length]; return (
                  <div key={i} className="flex items-start gap-5 py-5" style={{ borderTop: `1px solid ${surface}`, borderBottom: i === features.length - 1 ? `1px solid ${surface}` : "none" }}>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl" style={{ background: accent, color: ink }}><Icon size={19} /></span>
                    <div className="min-w-0"><div className="break-words font-medium">{I("features", features, i, "title")}</div><p className="mt-1 break-words text-sm opacity-60">{I("features", features, i, "text")}</p></div>
                  </div>);
              })}
            </div>
          </motion.div>
          <motion.div {...rise} className="flex min-w-0 flex-col gap-4">
            <div className="relative min-h-[22rem] flex-1 overflow-hidden rounded-[2rem]" style={{ background: surface }}>
              <img src={props?.image1 || img("photo-1522071820081-009f0129c71c", 1200)} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute bottom-5 left-5 rounded-2xl px-6 py-4 backdrop-blur-xl" style={{ background: `color-mix(in srgb, ${bg} 70%, transparent)`, border: `1px solid ${surface}` }}>
                <div className="font-serif text-4xl italic" style={{ color: accent }}>{T("years", "8")}</div><div className="text-xs opacity-70">{T("yearsLabel", "years of shipping")}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {["image2", "image3", "image4"].map((k, i) => (<img key={k} src={props?.[k] || img(["photo-1497366216548-37526070297c", "photo-1531297484001-80022131f5a1", "photo-1555066931-4365d14bab8c"][i], 600)} alt="" className="h-28 w-full rounded-2xl object-cover transition hover:scale-[1.02] md:h-36" />))}
            </div>
          </motion.div>
        </div>
        <motion.div {...rise} className="mt-28">
          <h3 className="text-center text-3xl font-light tracking-tight md:text-4xl">{T("teamTitle", "The people behind the product")}</h3>
          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
            {team.map((m: any, i: number) => (
              <div key={i} className="group text-center">
                <img src={m.image} alt="" className="mx-auto h-32 w-32 rounded-full object-cover transition duration-500 group-hover:scale-105 md:h-40 md:w-40" style={{ border: `2px solid ${accent}` }} />
                <div className="mt-4 break-words font-medium">{I("team", team, i, "name")}</div>
                <div className="break-words text-sm opacity-60">{I("team", team, i, "role")}</div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div {...rise} className="mt-28">
          {values.map((v: any, i: number) => (
            <div key={i} className="grid items-baseline gap-3 py-8 md:grid-cols-[6rem_1fr_1.5fr]" style={{ borderTop: `1px solid ${surface}`, borderBottom: i === values.length - 1 ? `1px solid ${surface}` : "none" }}>
              <span className="font-serif text-2xl italic" style={{ color: accent }}><Editable value={`0${i + 1}`} /></span>
              <span className="break-words text-xl font-light">{I("values", values, i, "title")}</span>
              <span className="break-words text-sm opacity-60">{I("values", values, i, "text")}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}