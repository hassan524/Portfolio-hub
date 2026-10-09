// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const go = (e: any, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="px-6 pb-20 pt-14 lg:pb-28 lg:pt-20" style={{ backgroundColor: bg }}>
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="min-w-0">
          <h1 className="break-words font-['Poppins'] text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.6rem]" style={{ color: ink }}>
            <Editable as="span" value={props?.headline || "Software built to launch."} onChange={(v: string) => onChange?.({ headline: v })} className="block" />
            <Editable as="span" value={props?.headline2 || "Products built to last."} onChange={(v: string) => onChange?.({ headline2: v })} className="block" />
          </h1>
          <Editable as="p" value={props?.subheadline || "We work with founders and growing teams to design, build, and launch web, mobile, and AI products, from the first sketch to the app store."} onChange={(v: string) => onChange?.({ subheadline: v })} className="mt-7 max-w-xl text-lg leading-relaxed" style={{ color: inkSecond }} />
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#contact" onClick={(e) => go(e, "#contact")} className="inline-flex items-center gap-2 rounded-xl px-7 py-4 font-semibold transition hover:scale-[1.02] active:scale-95" style={{ backgroundColor: accent, color: ink }}>
              <Editable as="span" value={props?.primaryCta || "Start a project"} onChange={(v: string) => onChange?.({ primaryCta: v })} />
              <ArrowRight size={18} />
            </a>
            <a href="#projects" onClick={(e) => go(e, "#projects")} className="inline-flex items-center rounded-xl border px-7 py-4 font-medium transition hover:scale-[1.02] active:scale-95" style={{ borderColor: inkSecond, color: ink }}>
              <Editable as="span" value={props?.secondaryCta || "See our work"} onChange={(v: string) => onChange?.({ secondaryCta: v })} />
            </a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }} className="overflow-hidden rounded-2xl border" style={{ borderColor: surface }}>
          <img src={props?.heroImage || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80"} alt="Team planning a product on a whiteboard" className="aspect-[16/10] w-full object-cover" />
        </motion.div>
      </div>
    </section>
  );
}

export const SaaSProduct5Hero = Hero;
export const HeroCentered = Hero;
export default Hero;
