// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency1Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#F4F5EF";
  const ink = theme?.ink || "#111827";
  const ink2 = theme?.["ink-second"] || "#5B6472";
  const surface = theme?.surface || "#FFFFFF";
  const accent = theme?.accent || "#87D53C";
  const set = (k: string) => (v: string) => onChange?.({ [k]: v });
  const go = (e: any, id: string) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const marquee = props.marquee || ["Branding", "3D Design", "Illustration", "UI Design", "Motion", "Web Build"];
  const stats = props.stats || [{ n: "120+", l: "Projects" }, { n: "10k+", l: "Users reached" }, { n: "6 yrs", l: "In business" }];
  const hard = `5px 5px 0 ${ink}`;

  return (
    <section id="home" className="scroll-mt-20 relative overflow-hidden" style={{ background: bg, color: ink }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-14 grid lg:grid-cols-12 gap-10 lg:gap-6 items-center">
        <div className="lg:col-span-7 space-y-7">
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="font-black tracking-tighter leading-[0.92] text-[clamp(2.8rem,9vw,6.5rem)]">
            <Editable value={props.headlineWord1 || "We make"} onChange={set("headlineWord1")} />{" "}
            <span className="inline-block px-3 -rotate-2 rounded-2xl border-2 align-middle" style={{ background: accent, borderColor: ink, boxShadow: hard }}>
              <Editable value={props.headlineWord2 || "bold"} onChange={set("headlineWord2")} />
            </span>{" "}
            <Editable value={props.headlineWord3 || "brands people remember."} onChange={set("headlineWord3")} />
          </motion.h1>
          <p className="max-w-lg text-base sm:text-lg leading-relaxed" style={{ color: ink2 }}>
            <Editable value={props.heroSubtitle || "A small creative studio for branding, 3D illustration and web design. Real people, fast turnaround, work you will be proud to show."} onChange={set("heroSubtitle")} />
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#projects" onClick={(e) => go(e, "projects")} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold border-2 transition-transform hover:-translate-y-0.5" style={{ background: ink, color: bg, borderColor: ink }}>
              <Editable value={props.primaryCta || "See our work"} onChange={set("primaryCta")} /> <ArrowDownRight size={18} />
            </a>
            <a href="#contact" onClick={(e) => go(e, "contact")} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold border-2 transition-transform hover:-translate-y-0.5" style={{ background: surface, borderColor: ink, boxShadow: hard }}>
              <Editable value={props.secondaryCta || "Start a project"} onChange={set("secondaryCta")} /> <ArrowUpRight size={18} />
            </a>
          </div>
          <dl className="flex flex-wrap gap-x-8 gap-y-3 pt-2">
            {stats.map((s: any) => <div key={s.l}><dt className="text-2xl sm:text-3xl font-black">{s.n}</dt><dd className="text-xs font-semibold" style={{ color: ink2 }}>{s.l}</dd></div>)}
          </dl>
        </div>

        <div className="lg:col-span-5 relative max-w-md w-full mx-auto lg:max-w-none">
          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] rounded-[2rem] border-2 overflow-hidden" style={{ borderColor: ink, boxShadow: `8px 8px 0 ${ink}`, background: props.heroImage ? `url(${props.heroImage}) center/cover` : "linear-gradient(180deg,#7DD3FC 0 52%,#FB7185 52% 100%)" }}>
            {!props.heroImage && (
              <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-3 pb-10">
                <div className="w-[26%] aspect-[3/5] rounded-t-full rounded-b-2xl border-2 bg-rose-500 -rotate-6" style={{ borderColor: ink, borderBottomWidth: 12, borderBottomColor: accent }} />
                <div className="w-[34%] aspect-[3/6] rounded-t-full rounded-b-3xl border-2 bg-rose-400 rotate-3" style={{ borderColor: ink, borderBottomWidth: 16, borderBottomColor: accent }} />
              </motion.div>
            )}
          </motion.div>
          <motion.div animate={{ rotate: [-6, 4, -6] }} transition={{ duration: 6, repeat: Infinity }} className="absolute -top-3 -right-1 sm:-right-4 px-4 py-2 rounded-full border-2 text-xs sm:text-sm font-black" style={{ background: accent, borderColor: ink, boxShadow: `3px 3px 0 ${ink}` }}>Open for projects</motion.div>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -bottom-4 -left-1 sm:-left-5 px-4 py-2 rounded-2xl border-2 text-xs sm:text-sm font-bold" style={{ background: surface, borderColor: ink, boxShadow: `3px 3px 0 ${ink}` }}>3D · Brand · Web</motion.div>
        </div>
      </div>

      <div className="border-y-2 overflow-hidden py-3" style={{ background: ink, borderColor: ink, color: bg }} aria-hidden>
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="flex gap-10 w-max text-lg sm:text-2xl font-black">
          {[...marquee, ...marquee, ...marquee, ...marquee].map((m: string, i: number) => <span key={i} className="flex items-center gap-10">{m}<span style={{ color: accent }}>✺</span></span>)}
        </motion.div>
      </div>
    </section>
  );
}
export default DigitalAgency1Hero;