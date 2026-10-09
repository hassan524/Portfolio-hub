// @ts-nocheck
import { ArrowDownRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Experience({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";
  const roles = props?.roles || [
    { role: "Staff Software Engineer", company: "Northstar Studio", dates: "2021 — Present", context: "Remote · Product engineering", description: "Partner with product and design leads to shape new product bets, establish frontend foundations, and help a 14-person team deliver with confidence.", contribution: "Set technical direction · Built the design system · Mentored 5 engineers" },
    { role: "Senior Full-stack Engineer", company: "Goodkind Health", dates: "2018 — 2021", context: "Brooklyn, NY · Digital health", description: "Led a gradual rebuild of care coordination workflows, improving daily work for clinical teams while keeping the service available throughout migration.", contribution: "Platform migration · React + Rails · Accessibility" },
    { role: "Software Engineer", company: "Paperplane", dates: "2016 — 2018", context: "New York, NY · SaaS", description: "Built early collaboration features with a close-knit product team, working across the Rails application, internal tools, and customer-facing interface.", contribution: "Early product · Full-stack delivery · Customer research" },
  ];
  const updateRole = (index: number, key: string, value: string) =>
    onChange?.({ roles: roles.map((item: any, i: number) => i === index ? { ...item, [key]: value } : item) });
  return (
    <section id="experience" className="scroll-mt-20 py-20 md:py-28" style={{ backgroundColor: bgSecond, color: ink }}>
      <div className="mx-auto max-w-[1440px] px-5 md:px-12">
        <div className="grid gap-8 border-b pb-10 md:grid-cols-[0.38fr_1fr] md:gap-16 md:pb-14" style={{ borderColor: surface }}>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: accent }}><Editable value={props?.eyebrow || "Career notation"} onChange={(v) => onChange?.({ eyebrow: v })} /></p>
            <p className="mt-4 font-mono text-xs" style={{ color: inkSecond }}><Editable value={props?.sideNote || "A sequence of useful moves"} onChange={(v) => onChange?.({ sideNote: v })} /></p>
          </div>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h2 className="max-w-2xl font-['DM_Serif_Display'] text-4xl leading-[1.02] md:text-6xl"><Editable value={props?.headline || "Different boards. Shared principles."} onChange={(v) => onChange?.({ headline: v })} /></h2>
            <p className="max-w-xs text-sm leading-6" style={{ color: inkSecond }}><Editable value={props?.intro || "A career built by joining early, earning trust, and making systems easier to move through."} onChange={(v) => onChange?.({ intro: v })} /></p>
          </div>
        </div>
        <div className="mt-5 hidden grid-cols-[80px_1fr_190px] gap-7 border-b pb-3 font-mono text-[9px] uppercase tracking-[0.16em] md:grid" style={{ borderColor: surface, color: inkSecond }}>
          <span><Editable value={props?.numberLabel || "Ply"} onChange={(v) => onChange?.({ numberLabel: v })} /></span>
          <span><Editable value={props?.roleLabel || "Role / contribution"} onChange={(v) => onChange?.({ roleLabel: v })} /></span>
          <span><Editable value={props?.periodLabel || "Period"} onChange={(v) => onChange?.({ periodLabel: v })} /></span>
        </div>
        <div className="divide-y" style={{ borderColor: surface }}>
          {roles.map((item: any, index: number) => (
            <article key={`role-${index}`} className="grid gap-3 py-7 md:grid-cols-[80px_1fr_190px] md:gap-7 md:py-9">
              <span className="font-mono text-xs" style={{ color: accent }}>0{index + 1}.</span>
              <div>
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
                  <h3 className="font-['DM_Serif_Display'] text-2xl md:text-3xl"><Editable value={item.role} onChange={(v) => updateRole(index, "role", v)} /></h3>
                  <p className="text-sm" style={{ color: accent }}><Editable value={item.company} onChange={(v) => updateRole(index, "company", v)} /></p>
                </div>
                <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: inkSecond }}><Editable value={item.context} onChange={(v) => updateRole(index, "context", v)} /></p>
                <p className="mt-4 max-w-3xl text-sm leading-7" style={{ color: inkSecond }}><Editable value={item.description} onChange={(v) => updateRole(index, "description", v)} /></p>
                <p className="mt-4 border-l pl-3 text-xs leading-5" style={{ borderColor: surface, color: ink }}><Editable value={item.contribution} onChange={(v) => updateRole(index, "contribution", v)} /></p>
              </div>
              <p className="font-mono text-[10px] tracking-[0.05em] md:text-right" style={{ color: inkSecond }}><Editable value={item.dates} onChange={(v) => updateRole(index, "dates", v)} /></p>
            </article>
          ))}
        </div>
        <div className="mt-8 grid gap-6 border-t pt-7 md:grid-cols-[80px_1fr] md:gap-7" style={{ borderColor: surface }}>
          <span className="font-mono text-xs" style={{ color: accent }}>∞</span>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <p className="max-w-2xl text-sm leading-6" style={{ color: inkSecond }}><Editable value={props?.closingCopy || "The next chapter is best chosen together. I’m most interested in work that makes someone’s day noticeably better."} onChange={(v) => onChange?.({ closingCopy: v })} /></p>
            <a href="#contact" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: accent }}><Editable value={props?.ctaLabel || "Make the next move"} onChange={(v) => onChange?.({ ctaLabel: v })} /><ArrowDownRight size={14} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
