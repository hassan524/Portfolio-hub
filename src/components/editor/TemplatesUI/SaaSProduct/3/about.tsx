// @ts-nocheck
import { motion } from "framer-motion";
import { Layers, Rocket, ShieldCheck } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const rise = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.7 } };
const icons = [Layers, Rocket, ShieldCheck];

export function About({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#F6F5EF";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#111111";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(17, 17, 17, 0.06)";
  const accent = theme?.accent || "#4ADE5A";
  const T = (k: string, d: string) => <Editable value={props?.[k] || d} onChange={(v: string) => onChange?.({ [k]: v })} />;
  const upd = (key: string, arr: any[], i: number, f: string, v: any) => onChange?.({ [key]: arr.map((x: any, j: number) => (j === i ? (f ? { ...x, [f]: v } : v) : x)) });
  const I = (key: string, arr: any[], i: number, f?: string) => <Editable value={f ? arr[i][f] : arr[i]} onChange={(v: string) => upd(key, arr, i, f || "", v)} />;
  const chips = props?.chips || ["Product Design", "Brand Systems", "Web Apps", "Growth", "Motion"];
  const features = props?.features || [{ title: "Research-led design", text: "Every screen starts with real customer interviews and usage data." }, { title: "Built to ship", text: "Design and engineering work side by side, so launches stay on schedule." }, { title: "Measured growth", text: "We track activation and retention, not vanity metrics." }];
  const team = props?.team || [
    { name: "Maya Collins", role: "Founder & Design Lead", image: img("photo-1438761681033-6461ffad8d80", 600) },
    { name: "Daniel Okafor", role: "Head of Engineering", image: img("photo-1500648767791-00dcc994a43e", 600) },
    { name: "Sofia Alvarez", role: "Brand Strategist", image: img("photo-1573496359142-b8d87734a5a2", 600) },
    { name: "Ethan Park", role: "Growth Lead", image: img("photo-1472099645785-5658abf4ff4e", 600) },
  ];
  const values = props?.values || [{ title: "Clarity first", text: "Simple products win. We cut until only what matters remains." }, { title: "Honest partnership", text: "Clear scopes, weekly demos and no surprise invoices." }, { title: "Craft in the details", text: "Spacing, motion and copy are all treated as product features." }];
  return (
    <section id="about" className="px-6 py-24 md:py-32" style={{ background: bgSecond, color: ink }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div {...rise} className="min-w-0">
            <span className="rounded-full px-4 py-1.5 text-sm font-semibold" style={{ background: surface }}>{T("eyebrow", "Our story")}</span>
            <h2 className="mt-5 break-words text-4xl font-black leading-tight tracking-tight md:text-5xl">{T("title", "A small studio obsessed with SaaS people love")}</h2>
            <p className="mt-5 break-words" style={{ color: inkSecond }}>{T("story", "Loopcraft started in 2017 when three designers got tired of watching good software fail on bad onboarding. Today we help founders launch, rebrand and grow products used by thousands of teams.")}</p>
            <div className="mt-6 flex flex-wrap gap-2">{chips.map((c: string, i: number) => (<span key={i} className="rounded-full px-4 py-1.5 text-sm font-medium" style={{ background: surface }}>{I("chips", chips, i)}</span>))}</div>
            <div className="mt-8 space-y-4">
              {features.map((f: any, i: number) => { const Icon = icons[i % icons.length]; return (
                <div key={i} className="flex gap-4 rounded-2xl p-4 transition hover:scale-[1.02] active:scale-95" style={{ background: surface }}>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl" style={{ background: accent, color: ink }}><Icon size={20} /></span>
                  <div className="min-w-0"><div className="font-bold">{I("features", features, i, "title")}</div><p className="break-words text-sm" style={{ color: inkSecond }}>{I("features", features, i, "text")}</p></div>
                </div>); })}
            </div>
          </motion.div>
          <motion.div {...rise} className="grid grid-cols-2 gap-4">
            <img src={props?.image1 || img("photo-1522071820081-009f0129c71c", 800)} alt="" className="row-span-2 h-full min-h-[26rem] w-full rounded-[2rem] object-cover" />
            <img src={props?.image2 || img("photo-1497366216548-37526070297c", 700)} alt="" className="h-52 w-full rounded-[2rem] object-cover" />
            <div className="flex h-52 flex-col justify-end rounded-[2rem] p-6" style={{ background: accent, color: ink }}>
              <div className="text-5xl font-black">{T("years", "9+")}</div><div className="text-sm font-medium">{T("yearsLabel", "Years building SaaS brands")}</div>
            </div>
          </motion.div>
        </div>
        <motion.div {...rise} className="mt-24">
          <h3 className="text-3xl font-black tracking-tight md:text-4xl">{T("teamTitle", "Meet the team")}</h3>
          <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {team.map((m: any, i: number) => (
              <div key={i} className="group overflow-hidden rounded-3xl p-3 transition hover:scale-[1.02] active:scale-95" style={{ background: surface }}>
                <img src={m.image} alt="" className="aspect-[4/5] w-full rounded-2xl object-cover transition duration-500 group-hover:scale-105" />
                <div className="p-3"><div className="break-words font-bold">{I("team", team, i, "name")}</div><div className="break-words text-sm" style={{ color: inkSecond }}>{I("team", team, i, "role")}</div></div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div {...rise} className="mt-20 grid gap-5 md:grid-cols-3">
          {values.map((v: any, i: number) => (
            <div key={i} className="rounded-3xl p-7" style={{ background: surface }}>
              <div className="text-sm font-bold" style={{ color: accent }}><Editable value={`0${i + 1}`} /></div>
              <div className="mt-3 text-xl font-bold">{I("values", values, i, "title")}</div>
              <p className="mt-2 break-words text-sm" style={{ color: inkSecond }}>{I("values", values, i, "text")}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
