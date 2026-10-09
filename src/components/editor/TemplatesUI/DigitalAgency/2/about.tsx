// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency2About({ props = {}, theme, onChange }: any) {
  const bgSecond = theme?.["bg-second"] || "#131316";
  const text = theme?.text || theme?.ink || "#FFFFFF";
  const textSecond = theme?.["text-second"] || theme?.["ink-second"] || "#A1A1AA";
  const accent = theme?.accent || "#F5559E";
  const set = (k: string) => (v: string) => onChange?.({ [k]: v });
  const stats = props.stats || [{ n: "120+", l: "Products shipped" }, { n: "14 wks", l: "Typical first launch" }, { n: "98%", l: "Clients stay on" }, { n: "6 yrs", l: "Building software" }];
  const situations = props.situations || [
    { t: "Launch a new product", d: "Turn an idea into a clearly scoped, designed and production-ready digital product.", b: ["Scoping", "Design", "Build", "Launch"] },
    { t: "Replace manual workflows", d: "Convert spreadsheets and disconnected tools into one reliable business platform.", b: ["Workflow audit", "Automation", "Admin tools", "Reporting"] },
    { t: "Modernize an existing product", d: "Improve architecture, usability, performance, security and development velocity.", b: ["Refactoring", "Performance", "Security", "UX upgrades"] },
    { t: "Scale digital operations", d: "Build the portals, dashboards and integrations that support the next stage of growth.", b: ["Portals", "Dashboards", "Integrations", "DevOps"] },
  ];
  const reasons = props.reasons || [
    "Business-first product discovery", "Senior technical oversight", "Design and engineering as one process",
    "Full lifecycle delivery, idea to operation", "Experience with commerce, portals and operational systems", "Reusable engineering foundations", "Long-term support, not launch-and-disappear",
  ];
  const line = `${textSecond}30`;
  const num = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <section id="about" className="py-20 sm:py-28" style={{ background: bgSecond, color: text }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-12 sm:mb-16">
          <div className="lg:col-span-7">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>{props.aboutEyebrow || "About"}</span>
            <h2 className="font-extrabold tracking-tighter leading-[1.05] text-[clamp(2rem,4.5vw,3.25rem)] mt-3"><Editable value={props.aboutTitle || "Turn business complexity into dependable software."} onChange={set("aboutTitle")} /></h2>
          </div>
          <p className="lg:col-span-5 text-sm sm:text-base leading-relaxed" style={{ color: textSecond }}><Editable value={props.aboutDescription || "We work with founders and operational teams to transform ambitious ideas, fragmented tools and manual processes into digital products people can rely on."} onChange={set("aboutDescription")} /></p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 mb-16 sm:mb-20">
          {stats.map((s: any) => (
            <div key={s.l} className="pl-5 sm:pl-6" style={{ borderLeft: `1px solid ${line}` }}>
              <div className="text-3xl sm:text-5xl font-extrabold tracking-tight" style={{ color: accent }}>{s.n}</div>
              <div className="text-xs sm:text-sm mt-1 font-semibold" style={{ color: textSecond }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div style={{ borderBottom: `1px solid ${line}` }}>
          {situations.map((s: any, i: number) => (
            <div key={s.t} className="grid lg:grid-cols-12 gap-4 lg:gap-12 py-8 sm:py-10" style={{ borderTop: `1px solid ${line}` }}>
              <h3 className="lg:col-span-4 flex items-baseline gap-4 text-xl font-bold tracking-tight"><span className="text-[11px] font-bold" style={{ color: accent }}>{num(i)}</span>{s.t}</h3>
              <p className="lg:col-span-4 text-sm leading-relaxed" style={{ color: textSecond }}>{s.d}</p>
              <ul className="lg:col-span-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm content-start" style={{ color: textSecond }}>{s.b.map((x: string) => <li key={x} className="flex gap-2"><span className="font-bold" style={{ color: accent }}>+</span>{x}</li>)}</ul>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mt-20 sm:mt-28">
          <div className="lg:col-span-5">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>{props.whyEyebrow || "Why us"}</span>
            <h2 className="font-extrabold tracking-tighter leading-[1.05] text-[clamp(1.8rem,4vw,2.75rem)] mt-3"><Editable value={props.whyTitle || "Product thinking backed by engineering ownership."} onChange={set("whyTitle")} /></h2>
          </div>
          <ul className="lg:col-span-7" style={{ borderBottom: `1px solid ${line}` }}>
            {reasons.map((r: string, i: number) => (
              <li key={r} className="flex items-baseline gap-5 py-4 text-sm sm:text-base font-semibold" style={{ borderTop: `1px solid ${line}` }}>
                <span className="text-[11px] font-bold" style={{ color: accent }}>{num(i)}</span>{r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
export default DigitalAgency2About;