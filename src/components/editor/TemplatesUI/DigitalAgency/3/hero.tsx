// @ts-nocheck
import { motion } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";

const I = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

export function DigitalAgency3Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#FFFFFF";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || theme?.surface || "#F5F4F2";
  const ink = theme?.text || theme?.ink || "#0F0F10";
  const inkSecond = theme?.["text-second"] || theme?.["ink-second"] || "#6B6B70";
  const accent = theme?.accent || "#2F5BFF";
  const onAccent = theme?.["on-accent"] || bg; // text colour on accent buttons
  const set = (k: string) => (v: string) => onChange?.({ [k]: v });
  const go = (e: any, id: string) => { e.preventDefault(); document.querySelector(id)?.scrollIntoView({ behavior: "smooth" }); };
  const stats = props.stats || [{ n: "150+", l: "Products delivered" }, { n: "10M+", l: "Users reached" }, { n: "$25M+", l: "Raised by clients" }, { n: "4.8/5", l: "Average rating" }];
  const images = props.heroImages || [I("photo-1551650975-87deedd944c3"), I("photo-1555774698-0b77e0d5fac6"), I("photo-1512941937669-90a1b58e7e9c")];
  const tilt = [-4, 0, 4];

  return (
    <section id="home" className="relative overflow-hidden" style={{ background: bg, color: ink }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(60% 50% at 50% 0%, ${accent}26, transparent 70%), radial-gradient(40% 40% at 0% 60%, ${accent}12, transparent 70%), radial-gradient(40% 40% at 100% 60%, ${accent}12, transparent 70%)` }} />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-16 sm:pt-28 text-center">
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="font-medium tracking-tight leading-[1.05] text-[clamp(2.4rem,6.5vw,5rem)]">
          <Editable value={props.heroHeadline || "Your technical partner for products and business systems."} onChange={set("heroHeadline")} />
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="mt-6 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: inkSecond }}>
          <Editable value={props.heroSubtitle || "We help founders and business teams decide what to build, develop the software, and support it after launch."} onChange={set("heroSubtitle")} />
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="#contact" onClick={(e) => go(e, "#contact")} className="px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold transition-transform hover:-translate-y-0.5" style={{ background: accent, color: onAccent }}>
            <Editable value={props.primaryCta || "Contact us"} onChange={set("primaryCta")} />
          </a>
          <a href="#services" onClick={(e) => go(e, "#services")} className="px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold transition-transform hover:-translate-y-0.5" style={{ background: bgSecond }}>
            <Editable value={props.secondaryCta || "Explore services"} onChange={set("secondaryCta")} />
          </a>
        </motion.div>
      </div>

      {/* Showcase: three product screens, centered */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 mt-14 sm:mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 items-end">
          {images.map((src: string, i: number) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 + i * 0.12 }}
              className={`rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ${i === 1 ? "aspect-[4/5] sm:aspect-[3/4]" : "hidden sm:block aspect-[3/4]"}`}
              style={{ background: bgSecond, border: `1px solid ${inkSecond}25`, transform: `rotate(${tilt[i] ?? 0}deg)` }}>
              <img src={src} alt="Product preview" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none" style={{ background: `linear-gradient(to top, ${bg}, transparent)` }} />
      </div>

      <div className="relative" style={{ borderTop: `1px solid ${inkSecond}25`, borderBottom: `1px solid ${inkSecond}25`, background: bg }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4">
          {stats.map((s: any, i: number) => (
            <div key={s.l} className="py-8 sm:py-10 text-center" style={{ borderLeft: i > 0 ? `1px solid ${inkSecond}20` : "none" }}>
              <div className="text-3xl sm:text-5xl font-light tracking-tight">{s.n}</div>
              <div className="text-xs sm:text-sm mt-1" style={{ color: inkSecond }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default DigitalAgency3Hero;