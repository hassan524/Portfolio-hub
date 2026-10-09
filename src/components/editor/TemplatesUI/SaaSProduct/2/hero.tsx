// @ts-nocheck
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Play, TrendingUp, ShieldCheck, CircleDollarSign } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const stageRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18 });
  const sy = useSpring(my, { stiffness: 80, damping: 18 });
  const rotY = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const rotX = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const shiftX = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const shiftY = useTransform(sy, [-0.5, 0.5], [-14, 14]);

  const onMove = (e: any) => {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const stats = props?.stats || [
    { value: "$6.2B", label: "Assets tracked" },
    { value: "2,400+", label: "Advisory firms" },
    { value: "Tier 1", label: "Security audit" },
  ];
  const updStat = (i: number, patch: any) =>
    onChange?.({ stats: stats.map((s: any, idx: number) => (idx === i ? { ...s, ...patch } : s)) });

  const go = (e: any, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="top" className="relative overflow-hidden pt-32 sm:pt-40 pb-20 sm:pb-28 px-5 sm:px-8" style={{ background: bg, color: ink }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 70% 60% at 75% 35%, ${accent}33, transparent 70%)` }} />
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${surface} 1px, transparent 1px), linear-gradient(90deg, ${surface} 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at 70% 40%, black 10%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at 70% 40%, black 10%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl grid lg:grid-cols-12 gap-14 items-center">
        {/* Copy */}
        <div className="lg:col-span-6">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full pl-1.5 pr-4 py-1.5 text-xs font-medium"
            style={{ background: surface, color: inkSecond }}
          >
            <span className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ background: accent, color: bg }}>
              <Editable value={props?.pillTag || "New"} onChange={(v) => onChange?.({ pillTag: v })} />
            </span>
            <Editable value={props?.pill || "Portfolio risk engine 3.0 is live"} onChange={(v) => onChange?.({ pill: v })} />
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-7 text-5xl sm:text-6xl xl:text-7xl font-extrabold leading-[1.02] tracking-tight"
          >
            <Editable value={props?.headline || "Capital intelligence, built for precision."} onChange={(v) => onChange?.({ headline: v })} />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg leading-relaxed max-w-xl"
            style={{ color: inkSecond }}
          >
            <Editable
              value={props?.subheadline || "Vaultline unifies portfolio analytics, risk modelling and client reporting into one calm workspace so advisory teams decide faster and with more confidence."}
              onChange={(v) => onChange?.({ subheadline: v })}
            />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              onClick={(e) => go(e, "projects")}
              className="inline-flex items-center gap-2 rounded-xl px-7 py-4 text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-95"
              style={{ background: accent, color: bg, boxShadow: `0 18px 40px -12px ${accent}` }}
            >
              <Editable value={props?.primaryCta || "See our work"} onChange={(v) => onChange?.({ primaryCta: v })} />
              <ArrowRight size={16} />
            </a>
            <a
              href="#about"
              onClick={(e) => go(e, "about")}
              className="inline-flex items-center gap-2 rounded-xl px-7 py-4 text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-95"
              style={{ background: surface, color: ink }}
            >
              <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: ink, color: bg }}>
                <Play size={10} fill="currentColor" />
              </span>
              <Editable value={props?.secondaryCta || "How we work"} onChange={(v) => onChange?.({ secondaryCta: v })} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 grid grid-cols-3 gap-4 max-w-lg pt-8"
            style={{ borderTop: `1px solid ${surface}` }}
          >
            {stats.map((s: any, i: number) => (
              <div key={i}>
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: i === 0 ? accent : ink }}>
                  <Editable value={s.value} onChange={(v) => updStat(i, { value: v })} />
                </div>
                <div className="mt-1 text-xs" style={{ color: inkSecond }}>
                  <Editable value={s.label} onChange={(v) => updStat(i, { label: v })} />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 3D stage */}
        <motion.div
          ref={stageRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-6 relative h-[460px] sm:h-[560px]"
          style={{ perspective: 1200 }}
        >
          <motion.div style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }} className="absolute inset-0">
            {/* plate */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[86%] aspect-square rounded-[44px] overflow-hidden"
              style={{ background: `linear-gradient(145deg, ${accent}, ${accent}55)`, boxShadow: `0 60px 120px -30px ${accent}99` }}
            >
              <img
                src={props?.heroImage || "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1200&q=80"}
                alt="Hero"
                className="w-full h-full object-cover mix-blend-luminosity opacity-80"
              />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${accent}CC, transparent 55%)` }} />
            </div>

            {/* 3D coin */}
            <motion.div style={{ x: shiftX, y: shiftY, transformStyle: "preserve-3d" }} className="absolute left-[6%] top-[10%] w-28 h-28 sm:w-36 sm:h-36">
              <motion.div
                animate={{ rotateY: 360 }}
                transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                className="relative w-full h-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                {[0, 1, 2, 3, 4, 5].map((n) => (
                  <div
                    key={n}
                    className="absolute inset-0 rounded-full"
                    style={{ transform: `translateZ(${n * 2 - 5}px)`, background: `linear-gradient(135deg, ${bg}, ${accent})`, border: `1px solid ${accent}` }}
                  />
                ))}
                <div
                  className="absolute inset-0 rounded-full flex items-center justify-center"
                  style={{ transform: "translateZ(8px)", background: `radial-gradient(circle at 30% 30%, ${bg}, ${accent})`, color: ink }}
                >
                  <CircleDollarSign size={54} />
                </div>
              </motion.div>
            </motion.div>

            {/* floating glass panels */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ translateZ: 80, background: `${bg}E6`, border: `1px solid ${surface}`, color: ink }}
              className="absolute right-0 sm:-right-2 top-[8%] rounded-2xl p-4 w-52 backdrop-blur-xl shadow-2xl"
            >
              <div className="flex items-center gap-2 text-xs" style={{ color: inkSecond }}>
                <TrendingUp size={14} style={{ color: accent }} />
                <Editable value={props?.panelOneLabel || "Portfolio growth"} onChange={(v) => onChange?.({ panelOneLabel: v })} />
              </div>
              <div className="mt-1 text-2xl font-extrabold">
                <Editable value={props?.panelOneValue || "+18.4%"} onChange={(v) => onChange?.({ panelOneValue: v })} />
              </div>
              <svg viewBox="0 0 160 40" className="mt-2 w-full h-10">
                <path d="M0 34 L22 28 L44 31 L66 20 L88 24 L110 12 L132 16 L160 4" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>

            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ translateZ: 100, background: `${bg}E6`, border: `1px solid ${surface}`, color: ink }}
              className="absolute left-0 sm:-left-4 bottom-[8%] rounded-2xl p-4 w-56 backdrop-blur-xl shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: accent, color: bg }}>
                  <ShieldCheck size={18} />
                </span>
                <div>
                  <div className="text-sm font-bold">
                    <Editable value={props?.panelTwoTitle || "Risk check passed"} onChange={(v) => onChange?.({ panelTwoTitle: v })} />
                  </div>
                  <div className="text-xs" style={{ color: inkSecond }}>
                    <Editable value={props?.panelTwoText || "All 214 holdings in range"} onChange={(v) => onChange?.({ panelTwoText: v })} />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
