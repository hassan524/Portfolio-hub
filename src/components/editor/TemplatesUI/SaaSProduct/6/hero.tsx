// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const stats = props?.stats || [
    { value: "11", label: "years building SaaS products" },
    { value: "38", label: "products shipped with founders" },
    { value: "2.4M", label: "people using what I have built" },
  ];
  const setStat = (i: number, k: string, v: string) => onChange?.({ stats: stats.map((s: any, j: number) => (j === i ? { ...s, [k]: v } : s)) });
  const go = (e: any, href: string) => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }); };
  const rise = (d: number) => ({ initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] } });

  return (
    <section id="home" className="relative overflow-hidden px-6 pb-24 pt-14 lg:pt-20" style={{ backgroundColor: bg }}>
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-[0.10] blur-3xl" style={{ backgroundColor: accent }} />
      <div className="relative mx-auto max-w-7xl">
        <motion.h1 {...rise(0)} className="break-words font-['Bricolage_Grotesque'] text-[2.6rem] font-bold leading-[1.02] tracking-tight sm:text-7xl lg:text-[7rem]" style={{ color: ink }}>
          <Editable as="span" value={props?.headline || "I design and build software products people keep using."} onChange={(v: string) => onChange?.({ headline: v })} />
        </motion.h1>

        <div className="mt-14 grid items-end gap-10 lg:grid-cols-12">
          <motion.div {...rise(0.15)} className="lg:col-span-4">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="absolute -inset-3 rounded-t-[999px] rounded-b-3xl" style={{ backgroundColor: surface }} />
              <img src={props?.heroImage || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80"} alt="Portrait" className="relative aspect-[4/5] w-full rounded-t-[999px] rounded-b-2xl object-cover" />
            </div>
          </motion.div>

          <motion.div {...rise(0.3)} className="min-w-0 lg:col-span-5">
            <Editable as="p" value={props?.subheadline || "I am a product engineer and designer who works directly with founders. I take SaaS ideas from rough sketch to paying customers, and I stay on to help them grow."} onChange={(v: string) => onChange?.({ subheadline: v })} className="max-w-xl text-lg leading-relaxed sm:text-xl" style={{ color: inkSecond }} />
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#contact" onClick={(e) => go(e, "#contact")} className="rounded-full px-7 py-4 font-semibold transition hover:scale-[1.02] active:scale-95" style={{ backgroundColor: accent, color: bg }}>
                <Editable as="span" value={props?.primaryCta || "Start a conversation"} onChange={(v: string) => onChange?.({ primaryCta: v })} />
              </a>
              <a href="#projects" onClick={(e) => go(e, "#projects")} className="inline-flex items-center gap-2 rounded-full px-7 py-4 font-medium transition hover:scale-[1.02] active:scale-95" style={{ backgroundColor: surface, color: ink }}>
                <Editable as="span" value={props?.secondaryCta || "See selected work"} onChange={(v: string) => onChange?.({ secondaryCta: v })} />
                <ArrowDown size={16} />
              </a>
            </div>
          </motion.div>

          <motion.div {...rise(0.45)} className="lg:col-span-3">
            <div className="rounded-3xl p-2" style={{ backgroundColor: surface }}>
              <div className="rounded-2xl p-6" style={{ backgroundColor: bgSecond }}>
                {stats.map((s: any, i: number) => (
                  <div key={i} className="border-b py-4 first:pt-0 last:border-b-0 last:pb-0" style={{ borderColor: surface }}>
                    <Editable as="p" value={s.value} onChange={(v: string) => setStat(i, "value", v)} className="font-['Bricolage_Grotesque'] text-4xl font-bold" style={{ color: ink }} />
                    <Editable as="p" value={s.label} onChange={(v: string) => setStat(i, "label", v)} className="mt-1 text-sm" style={{ color: inkSecond }} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
