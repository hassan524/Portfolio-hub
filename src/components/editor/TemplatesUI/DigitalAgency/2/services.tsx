// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";

export function Services({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0B0B0D";
  const text = theme?.text || theme?.ink || "#FFFFFF";
  const textSecond = theme?.["text-second"] || theme?.["ink-second"] || "#A1A1AA";
  const accent = theme?.accent || "#F5559E";
  const set = (k: string) => (v: string) => onChange?.({ [k]: v });
  const go = (e: any) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); };
  const services = props.services || [
    { t: "Product Discovery and Strategy", d: "Clarify the product opportunity, business requirements, user roles, workflows, priorities, architecture, risks and delivery roadmap before major development begins.", b: ["Product requirements", "Workflow mapping", "Feature prioritization", "Technical architecture", "Delivery roadmap", "Scope and cost planning"] },
    { t: "UX and Product Design", d: "Design clear, responsive and accessible product experiences around real users and operational workflows.", b: ["Information architecture", "User journeys", "Wireframes", "Interface design", "Responsive design systems", "Interactive prototypes"] },
    { t: "Custom Product Engineering", d: "Build secure, maintainable and production-ready web applications using modern frontend, backend, database, API and cloud technologies.", b: ["Custom web applications", "SaaS products", "Customer portals", "Administrative systems", "Dashboards", "API integrations"] },
    { t: "Commerce and Marketplace Platforms", d: "Create custom commerce, ordering, catalogue, inventory, dealer and multi-sided marketplace experiences that go beyond standard templates.", b: ["B2C commerce platforms", "B2B ordering systems", "Multi-vendor marketplaces", "Product catalogues", "Inventory workflows", "Payment integrations"] },
    { t: "Product Modernization", d: "Upgrade existing products without unnecessarily rebuilding everything, improving architecture, usability, performance, reliability and maintainability.", b: ["Legacy modernization", "Responsive upgrades", "TypeScript migrations", "Architecture refactoring", "Performance optimization", "SEO and accessibility"] },
    { t: "Ongoing Product and Platform Support", d: "Continue improving and operating the product after launch through feature delivery, infrastructure, monitoring, maintenance and technical support.", b: ["Feature development", "DevOps and deployment", "Monitoring", "Security maintenance", "Performance improvements", "Technical support"] },
  ];
  const tiers = props.tiers || [
    { tag: "Clarity before commitment", t: "Product Discovery Sprint", d: "For teams that need clarity before a full build.", s: ["Requirements", "Workflows", "Architecture", "Roadmap", "Estimate"] },
    { tag: "From definition to launch", t: "Custom Product Build", d: "For teams ready to design and build a new platform or app.", s: ["Product definition", "UX/UI design", "Full-stack build", "Testing", "Launch support"] },
    { tag: "Continuous ownership", t: "Embedded Product Engineering", d: "For teams that need an ongoing partner to improve and run a product.", s: ["Feature delivery", "Modernization", "DevOps", "Maintenance", "Support"] },
  ];
  const line = `${textSecond}30`;
  const num = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <section id="services" className="py-20 sm:py-28" style={{ background: bg, color: text }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-12 sm:mb-16">
          <div className="lg:col-span-7">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>{props.servicesEyebrow || "Services"}</span>
            <h2 className="font-extrabold tracking-tighter leading-[1.05] text-[clamp(2rem,4.5vw,3.25rem)] mt-3"><Editable value={props.servicesTitle || "Product expertise from first decisions to daily operation."} onChange={set("servicesTitle")} /></h2>
          </div>
          <p className="lg:col-span-5 text-sm sm:text-base leading-relaxed" style={{ color: textSecond }}><Editable value={props.servicesDescription || "Bring the whole product lifecycle together, or engage us where an existing team or platform needs focused support."} onChange={set("servicesDescription")} /></p>
        </div>

        <div style={{ borderBottom: `1px solid ${line}` }}>
          {services.map((s: any, i: number) => (
            <div key={s.t} className="grid lg:grid-cols-12 gap-4 lg:gap-12 py-8 sm:py-10" style={{ borderTop: `1px solid ${line}` }}>
              <h3 className="lg:col-span-4 flex items-baseline gap-4 text-xl font-bold tracking-tight"><span className="text-[11px] font-bold" style={{ color: accent }}>{num(i)}</span>{s.t}</h3>
              <p className="lg:col-span-4 text-sm leading-relaxed" style={{ color: textSecond }}>{s.d}</p>
              <ul className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm content-start" style={{ color: textSecond }}>{s.b.map((x: string) => <li key={x} className="flex gap-2"><span className="font-bold" style={{ color: accent }}>+</span>{x}</li>)}</ul>
            </div>
          ))}
        </div>

        <div className="mt-20 sm:mt-28">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-12 sm:mb-16">
            <div className="lg:col-span-7">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>{props.tiersEyebrow || "Ways to work with us"}</span>
              <h2 className="font-extrabold tracking-tighter leading-[1.05] text-[clamp(2rem,4.5vw,3.25rem)] mt-3"><Editable value={props.tiersTitle || "Choose the level of product ownership you need."} onChange={set("tiersTitle")} /></h2>
            </div>
            <p className="lg:col-span-5 text-sm sm:text-base leading-relaxed" style={{ color: textSecond }}><Editable value={props.tiersDescription || "Every engagement is shaped around the problem, the existing product context and the delivery model that creates the clearest path forward."} onChange={set("tiersDescription")} /></p>
          </div>
          <div className="grid md:grid-cols-3">
            {tiers.map((t: any) => (
              <div key={t.t} className="flex flex-col py-8 md:py-0 md:px-8 first:md:pl-0 last:md:pr-0 border-t md:border-t-0 md:border-l first:border-t-0 first:md:border-l-0" style={{ borderColor: line }}>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>{t.tag}</span>
                <h3 className="text-xl font-bold mt-2">{t.t}</h3>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: textSecond }}>{t.d}</p>
                <ul className="text-sm space-y-2 my-6 flex-1" style={{ color: textSecond }}>{t.s.map((x: string) => <li key={x} className="flex gap-2"><span className="font-bold" style={{ color: accent }}>+</span>{x}</li>)}</ul>
                <a href="#contact" onClick={go} className="self-start px-6 py-3 rounded-xl text-sm font-bold transition-transform hover:-translate-y-0.5" style={{ background: accent, color: bg }}>{props.tierCta || "Discuss Your Product"}</a>
              </div>
            ))}
          </div>
          <p className="text-xs mt-10" style={{ color: textSecond }}><Editable value={props.pricingNote || "Engagements typically start from $3,000. Final scope depends on requirements, integrations and delivery model."} onChange={set("pricingNote")} /></p>
        </div>
      </div>
    </section>
  );
}
export default Services;