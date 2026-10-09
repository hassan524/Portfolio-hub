// @ts-nocheck
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Users, Search, FileText, Handshake, UserCheck } from "lucide-react";
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

  const features = props?.features || [
    { title: "Vetted shortlists", text: "Every candidate is interviewed, reference-checked and skills-tested before you meet them." },
    { title: "Speed with care", text: "First shortlist in five working days, with weekly progress updates." },
    { title: "Retention guarantee", text: "Free replacement within 12 months if a placement does not work out." },
  ];
  const fIcons = [ShieldCheck, Zap, Users];
  const steps = props?.steps || [
    { title: "Brief", text: "We learn the role, team and culture." },
    { title: "Search", text: "Network, outreach and our talent pool." },
    { title: "Assess", text: "Interviews, tests and references." },
    { title: "Place", text: "Offer support and a 90-day check-in." },
  ];
  const sIcons = [FileText, Search, UserCheck, Handshake];
  const team = props?.team || [
    { name: "Olivia Hartwell", role: "Managing Director", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80" },
    { name: "Ravi Menon", role: "Head of Technology Hiring", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80" },
    { name: "Chloe Bernard", role: "Finance Practice Lead", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=500&q=80" },
    { name: "Tobias Klein", role: "Executive Search Partner", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500&q=80" },
  ];
  const values = props?.values || ["Candidates are people first", "Honest advice, even when it costs us a fee", "Diverse shortlists by default"];

  return (
    <section id="about" className="py-24 sm:py-28" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-sm font-semibold uppercase tracking-widest" style={{ color: accent }}>{T("eyebrow", "Why Hartwell")}</div>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl" style={{ color: ink }}>{T("title", "A recruitment partner that behaves like part of your team")}</h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {features.map((f: any, i: number) => {
            const Icon = fIcons[i % fIcons.length];
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-2xl p-8 transition-all hover:scale-[1.02]" style={{ backgroundColor: bgSecond, border: `1px solid ${surface}` }}>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: surface, color: accent }}><Icon className="h-6 w-6" /></span>
                <h3 className="mt-6 text-xl font-bold" style={{ color: ink }}><Editable value={f.title} onChange={up("features", features, i, "title")} /></h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: inkSecond }}><Editable value={f.text} onChange={up("features", features, i, "text")} /></p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-24 grid items-center gap-12 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <img src={props?.imageOne || "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"} alt="Recruiters at work" className="h-72 w-full rounded-2xl object-cover" />
            <img src={props?.imageTwo || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"} alt="Interview session" className="mt-10 h-72 w-full rounded-2xl object-cover" />
          </div>
          <div>
            <h3 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: ink }}>{T("storyTitle", "Fifteen years of matching people to the right work")}</h3>
            <p className="mt-5 text-base leading-relaxed" style={{ color: inkSecond }}>
              {T("story", "Hartwell Talent began as a two-person desk in Manchester. Today a team of 38 recruiters places professionals with startups, scale-ups and established firms across the UK and Europe, always with the same promise: a short list you can trust.")}
            </p>
            <ul className="mt-6 space-y-3">
              {values.map((v: string, i: number) => (
                <li key={i} className="flex items-center gap-3 text-sm font-semibold" style={{ color: ink }}>
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
                  <Editable value={v} onChange={(t: string) => onChange?.({ values: values.map((x: string, j: number) => (j === i ? t : x)) })} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-24 grid gap-5 md:grid-cols-4">
          {steps.map((s: any, i: number) => {
            const Icon = sIcons[i % sIcons.length];
            return (
              <div key={i} className="relative rounded-2xl p-7" style={{ backgroundColor: i === 0 ? ink : bgSecond, color: i === 0 ? bg : ink, border: `1px solid ${surface}` }}>
                <div className="flex items-center justify-between">
                  <Icon className="h-6 w-6" style={{ color: accent }} />
                  <span className="text-sm font-bold" style={{ opacity: 0.5 }}>{`0${i + 1}`}</span>
                </div>
                <h4 className="mt-6 text-lg font-bold"><Editable value={s.title} onChange={up("steps", steps, i, "title")} /></h4>
                <p className="mt-2 text-sm" style={{ opacity: 0.75 }}><Editable value={s.text} onChange={up("steps", steps, i, "text")} /></p>
              </div>
            );
          })}
        </div>

        <div className="mt-24">
          <h3 className="text-3xl font-bold tracking-tight" style={{ color: ink }}>{T("teamTitle", "Meet the recruiters")}</h3>
          <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
            {team.map((m: any, i: number) => (
              <div key={i} className="overflow-hidden rounded-2xl transition-all hover:scale-[1.02]" style={{ backgroundColor: bgSecond, border: `1px solid ${surface}` }}>
                <img src={m.image} alt={m.name} className="h-60 w-full object-cover" />
                <div className="p-5">
                  <div className="text-base font-bold" style={{ color: ink }}><Editable value={m.name} onChange={up("team", team, i, "name")} /></div>
                  <div className="mt-1 text-sm" style={{ color: inkSecond }}><Editable value={m.role} onChange={up("team", team, i, "role")} /></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
