// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency2Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0B0B0D";
  const text = theme?.text || theme?.ink || "#FFFFFF";
  const textSecond = theme?.["text-second"] || theme?.["ink-second"] || "#A1A1AA";
  const accent = theme?.accent || "#F5559E";
  const go = (e: any, href: string) => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }); };
  const brand = props.brandName || "Curious Packet";
  const columns = props.columns || [
    { h: "Company", l: [["About", "#about"], ["Work", "#projects"], ["Reviews", "#testimonials"], ["Contact", "#contact"]] },
    { h: "Capabilities", l: [["Product Discovery", "#services"], ["Product Design", "#services"], ["Engineering", "#services"], ["Commerce", "#services"], ["Support", "#services"]] },
  ];
  const email = props.email || "hello@yourstudio.com";
  return (
    <footer style={{ background: bg, color: text, borderTop: `1px solid ${textSecond}25` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10">
          <div className="col-span-2 md:col-span-5 space-y-4">
            <a href="#home" onClick={(e) => go(e, "#home")} className="inline-flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl flex items-center justify-center font-black" style={{ background: accent, color: bg }}>{brand[0]}</span>
              <span className="text-xl font-extrabold tracking-tight"><Editable value={brand} onChange={(v) => onChange?.({ brandName: v })} /></span>
            </a>
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: textSecond }}><Editable value={props.footerText || "Product strategy, design, engineering and ongoing platform support for commerce, portals and custom business applications."} onChange={(v) => onChange?.({ footerText: v })} /></p>
          </div>
          {columns.map((c: any) => (
            <div key={c.h} className="md:col-span-2 space-y-3">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em]">{c.h}</h4>
              <ul className="space-y-2 text-sm" style={{ color: textSecond }}>{c.l.map(([l, h]: any) => <li key={l}><a href={h} onClick={(e) => go(e, h)} className="hover:opacity-70">{l}</a></li>)}</ul>
            </div>
          ))}
          <div className="col-span-2 md:col-span-3 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em]">Contact</h4>
            <a href={`mailto:${email}`} className="text-sm font-bold break-all" style={{ color: accent }}>{email}</a>
            <p className="text-sm" style={{ color: textSecond }}>{props.footerLocation || "United States · Pakistan"}</p>
          </div>
        </div>
        <div className="mt-12 pt-6 text-xs flex flex-wrap justify-between gap-3" style={{ borderTop: `1px solid ${textSecond}20`, color: textSecond }}>
          <span>© {new Date().getFullYear()} {brand}. All rights reserved.</span>
          <span>{props.footerNote || "Built for businesses that run on software."}</span>
        </div>
      </div>
    </footer>
  );
}
export default DigitalAgency2Footer;