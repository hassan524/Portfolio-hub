// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";

const Line = ({ kind, c }: any) => {
  const p = { fill: "none", stroke: c, strokeWidth: 1.4, strokeDasharray: "2 3", strokeLinecap: "round" };
  if (kind === "design") return <svg viewBox="0 0 120 120" className="w-full h-full"><path {...p} d="M30 90 C30 60 70 70 70 40 L70 30 L84 30 L84 90 Z" /><rect {...p} x="62" y="22" width="30" height="14" rx="7" /><path {...p} d="M40 100 H96" /></svg>;
  if (kind === "ai") return <svg viewBox="0 0 120 120" className="w-full h-full">{[14, 24, 34, 44].map((r, i) => <ellipse key={i} {...p} cx="60" cy="60" rx={r} ry="46" />)}<ellipse {...p} cx="60" cy="60" rx="52" ry="46" /></svg>;
  return <svg viewBox="0 0 120 120" className="w-full h-full"><rect {...p} x="14" y="26" width="70" height="52" rx="6" /><rect {...p} x="64" y="40" width="30" height="56" rx="6" /><path {...p} d="M30 96 l-8 -8 l8 -8 M48 96 l8 -8 l-8 -8" /></svg>;
};

export function Services({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#FFFFFF";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || theme?.surface || "#F5F4F2";
  const ink = theme?.text || theme?.ink || "#0F0F10";
  const inkSecond = theme?.["text-second"] || theme?.["ink-second"] || "#6B6B70";
  const accent = theme?.accent || "#2F5BFF";
  const onAccent = theme?.["on-accent"] || bg; // text colour on accent buttons
  const set = (k: string) => (v: string) => onChange?.({ [k]: v });
  const services = props.services || [
    { k: "dev", t: "Software Development", d: "Web, Mobile, Frontend, Backend, APIs, QA, DevOps" },
    { k: "design", t: "Product Design", d: "Research, UX/UI, Design Systems, Prototyping" },
    { k: "ai", t: "AI & Automation", d: "AI Integration, AI Workflows, AI Assistants, LLM Solutions" },
  ];
  const stack = props.stack || ["Python", "Swift", "QA", "React", "Next.js", "AWS", "Azure", "UX/UI", "Design Systems", "Node.js", "TypeScript", "Docker"];

  return (
    <section id="services" className="py-16 sm:py-24" style={{ background: bg, color: ink }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-4 lg:gap-12 items-end mb-10 sm:mb-14">
          <h2 className="lg:col-span-8 font-medium tracking-tight leading-[1.1] text-[clamp(1.8rem,4vw,3rem)]"><Editable value={props.servicesTitle || "Services across the product lifecycle"} onChange={set("servicesTitle")} /></h2>
          <p className="lg:col-span-4 text-sm leading-relaxed" style={{ color: inkSecond }}><Editable value={props.servicesDescription || "Whether you are validating an idea, scaling a product or extending your team, we have the expertise to help."} onChange={set("servicesDescription")} /></p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {services.map((s: any) => (
            <div key={s.t} className="rounded-2xl p-6 flex flex-col justify-between min-h-[22rem] sm:min-h-[26rem]" style={{ background: bgSecond }}>
              <div className="w-36 h-36 sm:w-44 sm:h-44"><Line kind={s.k} c={ink} /></div>
              <div><h3 className="text-lg font-medium">{s.t}</h3><p className="text-sm mt-1 leading-relaxed" style={{ color: inkSecond }}>{s.d}</p></div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-4 rounded-2xl p-5" style={{ background: bgSecond }}>
          {stack.map((x: string) => <span key={x} className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium" style={{ background: bg, color: inkSecond }}>{x}</span>)}
          <span className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold" style={{ background: accent, color: onAccent }}>{props.stackNote || "and more"}</span>
        </div>
      </div>
    </section>
  );
}
export default Services;