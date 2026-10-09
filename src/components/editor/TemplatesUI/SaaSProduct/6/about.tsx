// @ts-nocheck
import { Compass, Hammer, MessagesSquare } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const ICONS: any = { compass: Compass, hammer: Hammer, chat: MessagesSquare };

export function About({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const history = props?.history || [
    { years: "2024 to now", role: "Independent product engineer", place: "Working with seed to Series A SaaS teams" },
    { years: "2019 to 2024", role: "Principal designer and engineer", place: "Brightcell, a B2B analytics company" },
    { years: "2015 to 2019", role: "Senior front-end engineer", place: "Northpeak Software" },
    { years: "2013 to 2015", role: "Interaction designer", place: "A small studio in Lagos" },
  ];
  const principles = props?.principles || [
    { icon: "compass", title: "Start with the customer", text: "Before I draw anything I talk to five people who would use it. Most roadmaps change after that." },
    { icon: "hammer", title: "Build the smallest real thing", text: "A working product in a customer's hands beats a polished plan every time." },
    { icon: "chat", title: "Keep you in the loop", text: "You get a short written update every Friday, plus a recorded demo of whatever shipped." },
  ];
  const gallery = props?.gallery || [
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80",
  ];
  const collaborators = props?.collaborators || [
    { name: "Idris Bello", role: "Backend engineer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" },
    { name: "Clara Weiss", role: "Brand designer", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80" },
    { name: "Joon Park", role: "Data and analytics", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" },
  ];
  const skills = props?.skills || ["Product strategy", "UX and UI design", "TypeScript", "React and Next.js", "Node and Postgres", "Stripe and billing", "Analytics", "Accessibility"];
  const set = (key: string, arr: any[], i: number, patch: any) => onChange?.({ [key]: arr.map((x, j) => (j === i ? { ...x, ...patch } : x)) });
  const setStr = (key: string, arr: string[], i: number, v: string) => onChange?.({ [key]: arr.map((x, j) => (j === i ? v : x)) });

  return (
    <section id="about" className="px-6 py-24 lg:py-32" style={{ backgroundColor: bg }}>
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="min-w-0">
          <div className="lg:sticky lg:top-28">
            <Editable as="h2" value={props?.title || "Eleven years of helping small teams ship"} onChange={(v: string) => onChange?.({ title: v })} className="font-['Bricolage_Grotesque'] text-4xl font-bold leading-tight tracking-tight sm:text-5xl" style={{ color: ink }} />
            <div className="mt-8 flex flex-wrap gap-2">
              {skills.map((s: string, i: number) => (
                <Editable key={i} as="span" value={s} onChange={(v: string) => setStr("skills", skills, i, v)} className="rounded-full px-3.5 py-1.5 text-sm" style={{ backgroundColor: surface, color: ink }} />
              ))}
            </div>
          </div>
        </div>

        <div className="min-w-0 space-y-16">
          <div>
            <Editable as="p" value={props?.story || "I grew up taking apart radios and later taught myself to code by rebuilding the websites I used. That curiosity turned into a career building software for companies that could not afford a large agency."} onChange={(v: string) => onChange?.({ story: v })} className="text-xl leading-relaxed sm:text-2xl" style={{ color: ink }} />
            <Editable as="p" value={props?.story2 || "Today I work with a handful of founders at a time. I design the product, write much of the code, and bring in a small group of trusted collaborators when a project needs more hands."} onChange={(v: string) => onChange?.({ story2: v })} className="mt-5 text-lg leading-relaxed" style={{ color: inkSecond }} />
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {gallery.map((g: string, i: number) => (
              <img key={i} src={g} alt="Workspace" className={"aspect-[3/4] w-full rounded-2xl object-cover " + (i === 1 ? "mt-8" : "")} />
            ))}
          </div>

          <div>
            <Editable as="h3" value={props?.historyTitle || "Where I have worked"} onChange={(v: string) => onChange?.({ historyTitle: v })} className="font-['Bricolage_Grotesque'] text-2xl font-semibold" style={{ color: ink }} />
            <div className="mt-6">
              {history.map((h: any, i: number) => (
                <div key={i} className="grid gap-1 border-t py-5 sm:grid-cols-[10rem_1fr] sm:gap-6" style={{ borderColor: surface }}>
                  <Editable as="p" value={h.years} onChange={(v: string) => set("history", history, i, { years: v })} className="text-sm" style={{ color: inkSecond }} />
                  <div className="min-w-0">
                    <Editable as="p" value={h.role} onChange={(v: string) => set("history", history, i, { role: v })} className="font-semibold" style={{ color: ink }} />
                    <Editable as="p" value={h.place} onChange={(v: string) => set("history", history, i, { place: v })} style={{ color: inkSecond }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {principles.map((p: any, i: number) => {
              const Icon = ICONS[p.icon] || Compass;
              return (
                <div key={i} className="min-w-0 rounded-3xl p-6" style={{ backgroundColor: bgSecond }}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full" style={{ backgroundColor: accent, color: bg }}><Icon size={20} /></span>
                  <Editable as="h4" value={p.title} onChange={(v: string) => set("principles", principles, i, { title: v })} className="mt-5 font-['Bricolage_Grotesque'] text-lg font-semibold" style={{ color: ink }} />
                  <Editable as="p" value={p.text} onChange={(v: string) => set("principles", principles, i, { text: v })} className="mt-2 text-[15px] leading-relaxed" style={{ color: inkSecond }} />
                </div>
              );
            })}
          </div>

          <div>
            <Editable as="h3" value={props?.teamTitle || "Collaborators I bring in"} onChange={(v: string) => onChange?.({ teamTitle: v })} className="font-['Bricolage_Grotesque'] text-2xl font-semibold" style={{ color: ink }} />
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {collaborators.map((c: any, i: number) => (
                <div key={i} className="flex min-w-0 items-center gap-4 rounded-2xl p-3" style={{ backgroundColor: surface }}>
                  <img src={c.image} alt={c.name} className="h-14 w-14 shrink-0 rounded-full object-cover" />
                  <div className="min-w-0">
                    <Editable as="p" value={c.name} onChange={(v: string) => set("collaborators", collaborators, i, { name: v })} className="font-semibold" style={{ color: ink }} />
                    <Editable as="p" value={c.role} onChange={(v: string) => set("collaborators", collaborators, i, { role: v })} className="text-sm" style={{ color: inkSecond }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
