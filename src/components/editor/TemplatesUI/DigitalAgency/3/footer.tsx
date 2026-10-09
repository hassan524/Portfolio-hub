// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency3Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#FFFFFF";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || "#F5F4F2";
  const ink = theme?.text || theme?.ink || "#0F0F10";
  const inkSecond = theme?.["text-second"] || theme?.["ink-second"] || "#6B6B70";
  const go = (e: any, href: string) => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }); };
  const links = props.navLinks || [["Solutions", "#about"], ["Services", "#services"], ["Cases", "#projects"], ["Reviews", "#testimonials"], ["Contact", "#contact"]];
  const brand = props.brandName || "Stackline";
  return (
    <footer style={{ background: bg, color: ink, borderTop: `1px solid ${inkSecond}25` }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-10" style={{ borderBottom: `1px solid ${inkSecond}25` }}>
          <div className="max-w-sm space-y-3">
            <a href="#home" onClick={(e) => go(e, "#home")} className="text-xl font-black tracking-tighter"><Editable value={brand} onChange={(v) => onChange?.({ brandName: v })} /></a>
            <p className="text-sm leading-relaxed" style={{ color: inkSecond }}><Editable value={props.footerText || "Your technical partner for products and business systems, from first idea to ongoing support."} onChange={(v) => onChange?.({ footerText: v })} /></p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium">
            {links.map(([l, h]: any) => <a key={l} href={h} onClick={(e) => go(e, h)} className="transition-opacity hover:opacity-60">{l}</a>)}
          </nav>
        </div>
        <div className="pt-6 text-xs flex flex-wrap justify-between gap-2" style={{ color: inkSecond }}>
          <span>© {new Date().getFullYear()} {brand}. All rights reserved.</span>
          <span>{props.footerNote || "Built for teams that run on software."}</span>
        </div>
      </div>
    </footer>
  );
}
export default DigitalAgency3Footer;