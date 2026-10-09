// @ts-nocheck
// About section: sticky scroll-lock text reveal + reel that spins with scroll
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";

const DISPLAY = "'Bebas Neue','Oswald','Impact',sans-serif";
const SERIF = "'Cormorant Garamond','Playfair Display',Georgia,serif";

// Inline SVG Reel component (no imports from cinemaKit)
function ReelSVG({ size = 200, color = "#E8412F", rotate = 0 }: any) {
  const holes = [0,1,2,3,4,5].map(i => {
    const a = (i * 60 * Math.PI) / 180;
    return { x: 100 + 56 * Math.cos(a), y: 100 + 56 * Math.sin(a) };
  });
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} style={{ transform: `rotate(${rotate}deg)` }} aria-hidden="true">
      <circle cx="100" cy="100" r="95" fill="none" stroke={color} strokeWidth="2.5" />
      <circle cx="100" cy="100" r="87" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {holes.map((h, i) => (
        <circle key={i} cx={h.x} cy={h.y} r="20" fill="none" stroke={color} strokeWidth="2.5" />
      ))}
      {[0,1,2].map(i => (
        <line key={i} x1="100" y1="22" x2="100" y2="178" stroke={color} strokeWidth="1" opacity="0.4" transform={`rotate(${i*60} 100 100)`} />
      ))}
      <circle cx="100" cy="100" r="25" fill="none" stroke={color} strokeWidth="2.5" />
      <circle cx="100" cy="100" r="8" fill={color} />
    </svg>
  );
}

// Each word fades in as scrollProgress passes over it
function WordReveal({ words, progress, ink, statement, onChange }: any) {
  return (
    <p className="text-3xl leading-[1.2] md:text-5xl lg:text-6xl" style={{ fontFamily: SERIF }}>
      {words.map((w: string, i: number) => {
        const start = i / words.length;
        const end = Math.min(start + 0.1, 1);
        const o = useTransform(progress, [start * 0.95, end], [0.08, 1]);
        return (
          <motion.span key={i} style={{ opacity: o, color: ink }} className="mr-[0.28em] inline-block">
            <Editable value={w} onChange={(v: string) =>
              onChange?.({ statement: words.map((x: string, k: number) => (k === i ? v : x)).join(" ") })
            } />
          </motion.span>
        );
      })}
    </p>
  );
}

export function About({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#07080A";
  const bgSecond = theme?.["bg-second"] || "#040506";
  const ink = theme?.ink || "#E8E4DC";
  const inkSecond = theme?.["ink-second"] || "#7A756C";
  const surface = theme?.surface || "rgba(255,255,255,0.07)";
  const accent = theme?.accent || "#E8412F";

  const statement =
    props?.statement ||
    "I treat every software system like a motion picture. Start with the premise, block each interaction, light the interface with precision, and never ship a cut I would not sit through myself.";
  const words = statement.split(/\s+/);

  const credits = Array.isArray(props?.credits) && props.credits.length > 0
    ? props.credits
    : [
        { role: "Direction & Architecture", name: "Product Strategy & Systems Design" },
        { role: "Cinematography", name: "React 19 · Next.js · Framer Motion" },
        { role: "Screenplay", name: "TypeScript · Python · Node.js" },
        { role: "Sound Design", name: "Web Audio API · WebSockets" },
        { role: "Set Construction", name: "PostgreSQL · Docker · AWS" },
      ];

  const filmography = Array.isArray(props?.filmography) && props.filmography.length > 0
    ? props.filmography
    : [
        { year: "2025", title: "ATLAS", detail: "AI Research Engine" },
        { year: "2024", title: "PULSE", detail: "Realtime Ops Dashboard" },
        { year: "2024", title: "FORGE", detail: "Developer CLI Studio" },
        { year: "2023", title: "NIMBUS", detail: "Banking Platform" },
      ];

  // ── Sticky scroll-lock section: user must scroll through it to reveal all words ──
  // We use a tall container so the sticky element stays on screen long enough
  const stickyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: textProgress } = useScroll({
    target: stickyRef,
    offset: ["start start", "end end"],
  });

  // For the reel: rotate it based on scroll
  const reelRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: reelProgress } = useScroll({
    target: stickyRef,
    offset: ["start end", "end start"],
  });
  const reelRotate = useTransform(reelProgress, [0, 1], [0, 720]);

  // Credits rolling parallax
  const creditsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: cp } = useScroll({ target: creditsRef, offset: ["start end", "end start"] });
  const rollY = useTransform(cp, [0, 1], [50, -50]);

  return (
    <section id="about" className="relative w-full overflow-hidden" style={{ backgroundColor: bg, color: ink }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,500;1,500&display=swap');`}</style>

      {/* ── STICKY TEXT REVEAL ── */}
      {/* Tall outer wrapper = scroll-lock height */}
      <div ref={stickyRef} style={{ height: `${Math.max(words.length * 28 + 200, 500)}vh` }}>
        <div className="sticky top-0 flex min-h-screen w-full items-center overflow-hidden" style={{ backgroundColor: bg }}>
          {/* Subtle dark gradient, NO bright radial glow */}
          <div className="pointer-events-none absolute inset-0" style={{ background: `linear-gradient(160deg, ${bgSecond} 0%, ${bg} 60%)` }} />

          <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-12 md:px-12">
            <div className="md:col-span-8">
              <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.4em]" style={{ color: accent }}>
                <span className="h-px w-10" style={{ backgroundColor: accent }} />
                <Editable value={props?.eyebrow || "ACT I · THE DIRECTOR'S STATEMENT"} onChange={(v) => onChange?.({ eyebrow: v })} />
              </p>
              <div className="mt-8">
                <WordReveal words={words} progress={textProgress} ink={ink} statement={statement} onChange={onChange} />
              </div>
            </div>

            {/* Reel — spins with scroll */}
            <div className="relative flex items-center justify-center md:col-span-4">
              <motion.div ref={reelRef} style={{ rotate: reelRotate }} className="origin-center opacity-90">
                <ReelSVG size={260} color={accent} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FILMOGRAPHY LEDGER ── */}
      <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-16 md:px-12">
        <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: surface }}>
          <p className="font-mono text-xs uppercase tracking-[0.4em]" style={{ color: accent }}>
            <Editable value={props?.filmTitle || "SELECTED FILMOGRAPHY"} onChange={(v) => onChange?.({ filmTitle: v })} />
          </p>
        </div>
        {filmography.map((f: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: i * 0.07 }}
            className="group grid grid-cols-[4rem_1fr] items-baseline gap-4 border-b py-6 transition-all md:grid-cols-[8rem_1fr_1fr]"
            style={{ borderColor: surface }}
          >
            <span className="font-mono text-sm tracking-wider" style={{ color: accent }}>
              <Editable value={f.year} onChange={(v) => onChange?.({ filmography: filmography.map((c: any, k: number) => (k === i ? { ...c, year: v } : c)) })} />
            </span>
            <span className="text-4xl tracking-wider transition-transform duration-400 group-hover:translate-x-3 md:text-6xl" style={{ fontFamily: DISPLAY }}>
              <Editable value={f.title} onChange={(v) => onChange?.({ filmography: filmography.map((c: any, k: number) => (k === i ? { ...c, title: v } : c)) })} />
            </span>
            <span className="col-start-2 text-xl italic md:col-start-auto md:text-right md:text-2xl" style={{ fontFamily: SERIF, color: inkSecond }}>
              <Editable value={f.detail} onChange={(v) => onChange?.({ filmography: filmography.map((c: any, k: number) => (k === i ? { ...c, detail: v } : c)) })} />
            </span>
          </motion.div>
        ))}
      </div>

      {/* ── ROLLING CREDITS ── */}
      <div ref={creditsRef} className="relative overflow-hidden py-28 md:py-36" style={{ backgroundColor: bgSecond }}>
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24" style={{ background: `linear-gradient(${bgSecond}, transparent)` }} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24" style={{ background: `linear-gradient(transparent, ${bgSecond})` }} />
        <motion.div style={{ y: rollY }} className="relative mx-auto max-w-2xl px-5 text-center">
          <p className="mb-10 font-mono text-xs uppercase tracking-[0.5em]" style={{ color: accent }}>
            <Editable value={props?.creditsTitle || "PRODUCTION CREW & TECHNICAL CREDITS"} onChange={(v) => onChange?.({ creditsTitle: v })} />
          </p>
          <div className="space-y-8">
            {credits.map((c: any, i: number) => (
              <div key={i}>
                <p className="font-mono text-[11px] uppercase tracking-[0.4em]" style={{ color: inkSecond }}>
                  <Editable value={c.role} onChange={(v) => onChange?.({ credits: credits.map((x: any, k: number) => (k === i ? { ...x, role: v } : x)) })} />
                </p>
                <p className="mt-1 text-3xl tracking-[0.14em] md:text-5xl" style={{ fontFamily: DISPLAY }}>
                  <Editable value={c.name} onChange={(v) => onChange?.({ credits: credits.map((x: any, k: number) => (k === i ? { ...x, name: v } : x)) })} />
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export const DeveloperPortfolio4About = About;
export default About;
