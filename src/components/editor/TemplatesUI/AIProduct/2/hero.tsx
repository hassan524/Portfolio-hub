// @ts-nocheck
import { useId } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const mix = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

/* [open, close, high, low] on a 0-100 scale (higher = higher price) */
const CANDLES = [
  [30, 38, 42, 26], [38, 33, 41, 30], [33, 45, 48, 31], [45, 52, 56, 43], [52, 47, 55, 44],
  [47, 58, 61, 45], [58, 54, 62, 51], [54, 66, 70, 52], [66, 61, 69, 58], [61, 74, 78, 59],
  [74, 69, 77, 66], [69, 82, 86, 67], [82, 76, 85, 73], [76, 90, 95, 74],
];

function Coin({ kind }: { kind: "btc" | "usdt" }) {
  const id = useId();
  const c = kind === "btc" ? ["#FFD98A", "#F7931A", "#9A4F04"] : ["#8CF0D0", "#26A17B", "#0B5B43"];
  return (
    <svg viewBox="0 0 160 160" className="w-full h-full" style={{ filter: "drop-shadow(0 24px 40px rgba(0,0,0,0.6))" }} aria-hidden>
      <defs>
        <radialGradient id={`${id}f`} cx="35%" cy="28%" r="85%">
          <stop offset="0%" stopColor={c[0]} /><stop offset="55%" stopColor={c[1]} /><stop offset="100%" stopColor={c[2]} />
        </radialGradient>
        <linearGradient id={`${id}r`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".8" /><stop offset="1" stopColor="#000" stopOpacity=".4" />
        </linearGradient>
      </defs>
      <circle cx="80" cy="80" r="74" fill={`url(#${id}f)`} />
      <circle cx="80" cy="80" r="74" fill="none" stroke={`url(#${id}r)`} strokeWidth="3.5" />
      <circle cx="80" cy="80" r="58" fill="none" stroke="#000" strokeOpacity=".2" strokeWidth="2" />
      <text x="80" y="106" textAnchor="middle" fontSize="80" fontWeight="800" fill="#fff" fillOpacity=".95" fontFamily="Inter, system-ui, sans-serif">
        {kind === "btc" ? "₿" : "₮"}
      </text>
      <ellipse cx="54" cy="38" rx="30" ry="13" fill="#fff" opacity=".2" transform="rotate(-28 54 38)" />
    </svg>
  );
}

function Candles({ ink }: { ink: string }) {
  const W = 1000, H = 300, step = W / (CANDLES.length + 1), bw = 26;
  const y = (v: number) => H - 20 - (v / 100) * (H - 60);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" aria-hidden>
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke={ink} strokeOpacity="0.07" strokeDasharray="4 8" />
      ))}
      {CANDLES.map(([o, c, h, l], i) => {
        const x = step * (i + 1), up = c >= o;
        const top = y(Math.max(o, c)), bot = y(Math.min(o, c));
        return (
          <motion.g
            key={i}
            style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <line x1={x} x2={x} y1={y(h)} y2={y(l)} stroke={ink} strokeOpacity={up ? 0.9 : 0.4} strokeWidth="2.5" strokeLinecap="round" />
            <rect
              x={x - bw / 2} y={top} width={bw} height={Math.max(bot - top, 6)} rx="5"
              fill={up ? ink : "transparent"} fillOpacity={up ? 0.92 : 0}
              stroke={ink} strokeOpacity={up ? 0 : 0.45} strokeWidth="2"
            />
          </motion.g>
        );
      })}
    </svg>
  );
}

export function AIProduct2Hero({ theme }: any) {
  const bg = theme?.bg || "#050505";
  const ink = theme?.ink || "#ffffff";
  const accent = theme?.accent || "#F7931A";
  const line = mix(ink, 14);

  const rise = (d = 0) => ({
    initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay: d, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section id="home" className="relative w-full overflow-hidden transition-colors" style={{ backgroundColor: bg, color: ink }}>
      {/* spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${mix(ink, 14)}, transparent 70%)` }} />
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[520px] h-[260px] rounded-full blur-[120px] pointer-events-none" style={{ background: accent, opacity: 0.12 }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 md:pt-28 flex flex-col items-center text-center">
        {/* badge */}
        <motion.div {...rise(0)} className="inline-flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full border text-xs md:text-sm" style={{ borderColor: line, backgroundColor: mix(ink, 5) }}>
          <Editable as="span" className="px-2.5 py-0.5 rounded-full text-[11px] font-bold" style={{ backgroundColor: ink, color: bg }}>New</Editable>
          <span className="h-4 w-4 rounded-full grid place-items-center text-[9px] font-black" style={{ background: accent, color: "#050505" }}>₿</span>
          <Editable as="span" className="font-medium" style={{ color: mix(ink, 80) }}>Trusted by 2,000+ early investors</Editable>
        </motion.div>

        {/* headline */}
        <motion.div {...rise(0.08)}>
          <h1 className="mt-8 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.04] max-w-4xl">
            <Editable className="block" style={{ color: ink }}>Your Gateway To The</Editable>
            <Editable className="block" style={{ color: ink }}>Decentralized Web3 World</Editable>
          </h1>
        </motion.div>

        <motion.div {...rise(0.16)}>
          <Editable as="p" className="mt-6 text-sm md:text-base leading-relaxed max-w-xl" style={{ color: mix(ink, 62) }}>
            Clear insights, real-time data, and unbiased analysis to master the crypto market. Smart investment in digital assets, from analysis to action, all in one secure place.
          </Editable>
        </motion.div>

        <motion.div {...rise(0.24)} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a href="#contact" className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-transform hover:scale-[1.04] active:scale-95"
            style={{ backgroundColor: ink, color: bg, boxShadow: `0 10px 40px ${mix(ink, 22)}` }}>
            <Editable className="inline">Get Started</Editable>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a href="#projects" className="inline-flex items-center px-7 py-3.5 rounded-full text-sm font-semibold border transition-colors hover:bg-white/10"
            style={{ borderColor: mix(ink, 24), color: ink }}>
            <Editable className="inline">View Markets</Editable>
          </a>
        </motion.div>
      </div>

      {/* chart + coins */}
      <div className="relative z-10 max-w-6xl mx-auto mt-10 md:mt-0 h-[300px] md:h-[400px]">
        <motion.div
          className="absolute left-[2%] md:left-[6%] top-6 md:top-16 w-24 sm:w-32 md:w-44"
          initial={{ opacity: 0, x: -30, rotate: -20 }} animate={{ opacity: 1, x: 0, rotate: 0 }} transition={{ duration: 0.9, delay: 0.4 }}
        >
          <motion.div animate={{ y: [0, -14, 0], rotate: [-8, 6, -8] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}>
            <Coin kind="btc" />
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute right-[2%] md:right-[6%] top-14 md:top-28 w-20 sm:w-28 md:w-36"
          initial={{ opacity: 0, x: 30, rotate: 20 }} animate={{ opacity: 1, x: 0, rotate: 0 }} transition={{ duration: 0.9, delay: 0.55 }}
        >
          <motion.div animate={{ y: [0, 12, 0], rotate: [10, -6, 10] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}>
            <Coin kind="usdt" />
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4">
          <Candles ink={ink} />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-36 pointer-events-none" style={{ background: `linear-gradient(to top, ${bg}, transparent)` }} />
      </div>

      <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${line}, transparent)` }} />
    </section>
  );
}