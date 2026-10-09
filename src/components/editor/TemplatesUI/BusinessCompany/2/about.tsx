// @ts-nocheck
import { motion } from "framer-motion";
import { Check } from "lucide-react";
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

  const steps = props?.steps || [
    { title: "Listen", text: "A long first conversation about your goals, obligations and what keeps you up at night." },
    { title: "Plan", text: "A written strategy covering investments, tax, protection and retirement, in plain language." },
    { title: "Review", text: "Quarterly check-ins and a yearly deep review so the plan keeps pace with your life." },
  ];
  const team = props?.team || [
    { name: "Elena Calder", role: "Founder, Chartered Planner", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80" },
    { name: "James Okoye", role: "Head of Investments", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=500&q=80" },
    { name: "Rina Takeda", role: "Tax and Estate Lead", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80" },
    { name: "Luis Ferrer", role: "Client Director", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80" },
  ];
  const values = props?.values || ["Fee-only, no commissions", "Fiduciary duty to every client", "Plain-language reporting"];

  return (
    <section id="about" className="py-24 sm:py-32" style={{ backgroundColor: bgSecond }}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-sm font-semibold uppercase tracking-widest" style={{ color: accent }}>{T("eyebrow", "About Calder")}</div>
        <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl" style={{ color: ink }}>
          {T("statement", "A small advisory firm that treats your money the way it would treat its own.")}
        </h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <p className="text-lg leading-relaxed" style={{ color: inkSecond }}>
            {T("story", "Calder Wealth Partners was founded in 2008 by a planner who was tired of product-driven advice. We stay independent, charge a transparent fee and limit our client list so every family has a named advisor who knows their story.")}
          </p>
          <ul className="space-y-4">
            {values.map((v: string, i: number) => (
              <li key={i} className="flex items-center gap-4 text-base font-medium" style={{ color: ink }}>
                <span className="flex h-7 w-7 items-center justify-center rounded-full" style={{ backgroundColor: accent, color: bg }}>
                  <Check className="h-4 w-4" />
                </span>
                <Editable value={v} onChange={(t: string) => onChange?.({ values: values.map((x: string, j: number) => (j === i ? t : x)) })} />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-3">
          {steps.map((s: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-[2rem] p-8 transition-all hover:scale-[1.02]"
              style={{ backgroundColor: bg, border: `1px solid ${surface}` }}
            >
              <div className="text-5xl font-semibold" style={{ color: accent }}>{`0${i + 1}`}</div>
              <h3 className="mt-6 text-xl font-semibold" style={{ color: ink }}>
                <Editable value={s.title} onChange={up("steps", steps, i, "title")} />
              </h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: inkSecond }}>
                <Editable value={s.text} onChange={up("steps", steps, i, "text")} />
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-24">
          <h3 className="text-2xl font-semibold" style={{ color: ink }}>{T("teamTitle", "Your advisors")}</h3>
          <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-4">
            {team.map((m: any, i: number) => (
              <div key={i} className="text-center transition-all hover:scale-[1.02]">
                <img src={m.image} alt={m.name} className="mx-auto h-36 w-36 rounded-full object-cover sm:h-44 sm:w-44" style={{ border: `3px solid ${accent}` }} />
                <div className="mt-5 text-base font-semibold" style={{ color: ink }}>
                  <Editable value={m.name} onChange={up("team", team, i, "name")} />
                </div>
                <div className="mt-1 text-sm" style={{ color: inkSecond }}>
                  <Editable value={m.role} onChange={up("team", team, i, "role")} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
