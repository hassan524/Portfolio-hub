// @ts-nocheck
import { ArrowDownRight, ArrowRight, Droplets, Sun, Leaf } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Editable } from "@/components/editor/ui/Editable";

export function Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const wordY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const stats = props?.stats || [
    { value: "48k+", label: "Skin profiles mapped" },
    { value: "92%", label: "Report calmer skin in 8 weeks" },
    { value: "14", label: "Dermatology partners" },
  ];
  const updateStat = (i: number, patch: any) =>
    onChange?.({ stats: stats.map((s: any, idx: number) => (idx === i ? { ...s, ...patch } : s)) });

  const scrollTo = (e: any, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="top" ref={ref} className="relative overflow-hidden" style={{ background: accent, color: bg }}>
      {/* glow */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${bg}55 0%, transparent 65%)` }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${ink}66 0%, transparent 70%)` }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 pt-32 sm:pt-40">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs tracking-[0.2em] uppercase"
          style={{ background: `${bg}26`, border: `1px solid ${bg}40` }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: bg }} />
          <Editable value={props?.pill || "Skin intelligence platform"} onChange={(v) => onChange?.({ pill: v })} />
        </motion.span>

        <div className="mt-8 grid lg:grid-cols-12 gap-10 lg:gap-6 items-end">
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-5 order-2 lg:order-1 lg:pb-24"
          >
            <h1 className="font-[Georgia,'Times_New_Roman',serif] text-5xl sm:text-6xl xl:text-7xl leading-[1.02] tracking-tight">
              <Editable value={props?.headline || "Skincare that learns your skin."} onChange={(v) => onChange?.({ headline: v })} />
            </h1>
            <p className="mt-6 text-base sm:text-lg max-w-md leading-relaxed opacity-85">
              <Editable
                value={props?.subheadline || "Veluna reads your skin through the seasons and rewrites your routine to match. No guesswork, no shelf full of regrets."}
                onChange={(v) => onChange?.({ subheadline: v })}
              />
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                onClick={(e) => scrollTo(e, "projects")}
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-transform hover:scale-[1.02] active:scale-95"
                style={{ background: bg, color: accent }}
              >
                <Editable value={props?.primaryCta || "Explore the collection"} onChange={(v) => onChange?.({ primaryCta: v })} />
                <ArrowRight size={16} />
              </a>
              <a
                href="#about"
                onClick={(e) => scrollTo(e, "about")}
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-transform hover:scale-[1.02] active:scale-95"
                style={{ background: `${bg}1F`, border: `1px solid ${bg}55`, color: bg }}
              >
                <Editable value={props?.secondaryCta || "Our story"} onChange={(v) => onChange?.({ secondaryCta: v })} />
                <ArrowDownRight size={16} />
              </a>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            style={{ y: imgY }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-4 order-1 lg:order-2 relative flex justify-center"
          >
            <div className="relative w-full max-w-[380px] aspect-[3/4]">
              <div
                className="absolute inset-0 rounded-t-[999px] rounded-b-[40px] overflow-hidden"
                style={{ boxShadow: `0 40px 90px -20px ${bg}66` }}
              >
                <img
                  src={props?.heroImage || "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1000&q=80"}
                  alt="Hero"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-4 sm:-left-10 top-1/3 rounded-full px-4 py-2.5 text-xs flex items-center gap-2 backdrop-blur-xl"
                style={{ background: `${bg}E6`, color: ink }}
              >
                <Droplets size={14} style={{ color: accent }} />
                <Editable value={props?.badgeOne || "Hydration 86%"} onChange={(v) => onChange?.({ badgeOne: v })} />
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-3 sm:-right-8 bottom-1/4 rounded-full px-4 py-2.5 text-xs flex items-center gap-2 backdrop-blur-xl"
                style={{ background: `${bg}E6`, color: ink }}
              >
                <Sun size={14} style={{ color: accent }} />
                <Editable value={props?.badgeTwo || "UV exposure: low"} onChange={(v) => onChange?.({ badgeTwo: v })} />
              </motion.div>
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-3 order-3 lg:pb-24"
          >
            <Leaf size={22} />
            <p className="mt-4 font-[Georgia,'Times_New_Roman',serif] text-2xl leading-snug">
              <Editable
                value={props?.note || "Your skin changes with your cycle. Now your routine can too."}
                onChange={(v) => onChange?.({ note: v })}
              />
            </p>
            <div className="mt-8 space-y-5">
              {stats.map((s: any, i: number) => (
                <div key={i} className="flex items-baseline gap-4 pb-4" style={{ borderBottom: `1px solid ${bg}33` }}>
                  <span className="font-[Georgia,'Times_New_Roman',serif] text-4xl min-w-[84px]">
                    <Editable value={s.value} onChange={(v) => updateStat(i, { value: v })} />
                  </span>
                  <span className="text-xs leading-snug opacity-80">
                    <Editable value={s.label} onChange={(v) => updateStat(i, { label: v })} />
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Giant wordmark */}
      <motion.div style={{ y: wordY }} className="relative select-none pointer-events-none -mt-6 sm:-mt-12 lg:-mt-24">
        <div
          className="font-[Georgia,'Times_New_Roman',serif] text-center leading-[0.8] whitespace-nowrap text-[26vw] sm:text-[22vw] lg:text-[19vw] translate-y-[14%]"
          style={{ color: bgSecond }}
        >
          <Editable value={props?.wordmark || "VELUNA"} onChange={(v) => onChange?.({ wordmark: v })} />
        </div>
      </motion.div>
    </section>
  );
}
