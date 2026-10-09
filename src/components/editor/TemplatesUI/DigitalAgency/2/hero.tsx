// @ts-nocheck
import { motion } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency2Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0B0B0D";
  const text = theme?.text || theme?.ink || "#FFFFFF";
  const textSecond = theme?.["text-second"] || theme?.["ink-second"] || "#A1A1AA";
  const accent = theme?.accent || "#F5559E";
  const set = (k: string) => (v: string) => onChange?.({ [k]: v });
  const go = (e: any, id: string) => { e.preventDefault(); document.querySelector(id)?.scrollIntoView({ behavior: "smooth" }); };
  const highlights = props.highlights || [
    { t: "Customer experience", d: "Designed around product discovery" },
    { t: "Operations", d: "Catalogue and order workflows" },
    { t: "Ownership", d: "A platform the business controls" },
  ];
  const line = `${textSecond}30`;

  return (
    <section id="home" className="py-16 sm:py-24" style={{ background: bg, color: text }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        <div className="lg:col-span-6 space-y-8">
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="font-extrabold tracking-tighter leading-[1.02] text-[clamp(2.5rem,6vw,4.75rem)]">
            <Editable value={props.heroHeadline || "Custom digital products for growing businesses."} onChange={set("heroHeadline")} />
          </motion.h1>
          <p className="text-base sm:text-lg leading-relaxed max-w-xl" style={{ color: textSecond }}>
            <Editable value={props.heroSubtitle || "We design, build, modernize and operate commerce platforms, portals and business applications, from product strategy to launch and continuous improvement."} onChange={set("heroSubtitle")} />
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#contact" onClick={(e) => go(e, "#contact")} className="px-7 py-3.5 rounded-xl text-sm sm:text-base font-bold transition-transform hover:-translate-y-0.5" style={{ background: accent, color: bg }}>
              <Editable value={props.primaryCta || "Discuss Your Product"} onChange={set("primaryCta")} />
            </a>
            <a href="#projects" onClick={(e) => go(e, "#projects")} className="px-7 py-3.5 rounded-xl text-sm sm:text-base font-bold transition-transform hover:-translate-y-0.5" style={{ border: `1px solid ${textSecond}50` }}>
              <Editable value={props.secondaryCta || "View Our Work"} onChange={set("secondaryCta")} />
            </a>
          </div>
          <p className="pt-6 text-xs sm:text-sm font-semibold" style={{ borderTop: `1px solid ${line}`, color: textSecond }}>
            <Editable value={props.tagline || "Product Strategy · UX & UI · Full-Stack Engineering · Platform Operations"} onChange={set("tagline")} />
          </p>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }} className="lg:col-span-6">
          <div className="rounded-2xl overflow-hidden aspect-[4/3]" style={{ border: `1px solid ${line}` }}>
            <img src={props.heroImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80"} alt="Product dashboard preview" className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
            {highlights.map((h: any) => (
              <div key={h.t} className="pt-4" style={{ borderTop: `1px solid ${line}` }}>
                <div className="text-sm font-bold">{h.t}</div>
                <div className="text-xs mt-1 leading-relaxed" style={{ color: textSecond }}>{h.d}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
export default DigitalAgency2Hero;