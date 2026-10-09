// @ts-nocheck
import { motion } from "framer-motion";
import { ShieldCheck, Zap, LineChart, Globe2 } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";

const mix = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

const FEATURES = [
  { icon: ShieldCheck, title: "Bank-grade security", body: "Cold storage for 95% of assets, multi-sig custody and real-time threat monitoring protect every deposit." },
  { icon: Zap, title: "Lightning execution", body: "Orders match in under 10ms across spot and derivatives, even during peak market volatility." },
  { icon: LineChart, title: "Unbiased insights", body: "On-chain analytics and transparent market data, so you decide with facts, not hype." },
  { icon: Globe2, title: "Truly decentralized", body: "Self-custody wallets and cross-chain swaps put you in control of your keys and your assets." },
];
const STATS = [
  { v: "$2.4B", l: "Monthly volume" },
  { v: "2M+", l: "Active investors" },
  { v: "150+", l: "Listed assets" },
  { v: "99.99%", l: "Uptime" },
];

export function AIProduct2About({ theme }: BlockComponentProps<any>) {
  const bg = theme?.bg || "#050505";
  const ink = theme?.ink || "#ffffff";
  const accent = theme?.accent || "#F7931A";
  const line = mix(ink, 12);
  const fade = (d = 0) => ({
    initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" }, transition: { duration: 0.55, delay: d },
  });

  return (
    <section id="about" className="relative w-full px-6 py-28 overflow-hidden transition-colors" style={{ backgroundColor: bg, color: ink }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full blur-[140px] pointer-events-none" style={{ background: accent, opacity: 0.07 }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div {...fade()} className="text-center max-w-2xl mx-auto mb-16">
          <Editable as="span" className="inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border mb-5" style={{ borderColor: line, color: mix(ink, 75), backgroundColor: mix(ink, 5) }}>About Us</Editable>
          <Editable as="h2" className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]" style={{ color: ink }}>Built for the next generation of investors</Editable>
          <Editable as="p" className="mt-5 text-sm md:text-base leading-relaxed" style={{ color: mix(ink, 62) }}>
            We combine institutional-grade infrastructure with a simple, honest experience, so anyone can step into Web3 with confidence.
          </Editable>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={f.title} {...fade(i * 0.08)}
                className="group relative p-8 rounded-3xl border overflow-hidden transition-colors hover:border-white/25"
                style={{ borderColor: line, backgroundColor: mix(ink, 4) }}>
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity" style={{ background: accent }} />
                <div className="h-12 w-12 rounded-2xl grid place-items-center mb-6 border" style={{ borderColor: line, backgroundColor: mix(ink, 6) }}>
                  <Icon className="h-5 w-5" style={{ color: accent }} />
                </div>
                <Editable as="h3" className="text-xl font-semibold tracking-tight mb-2.5" style={{ color: ink }}>{f.title}</Editable>
                <Editable as="p" className="text-sm leading-relaxed" style={{ color: mix(ink, 62) }}>{f.body}</Editable>
              </motion.div>
            );
          })}
        </div>

        <motion.div {...fade(0.1)} className="mt-5 grid grid-cols-2 md:grid-cols-4 rounded-3xl border overflow-hidden" style={{ borderColor: line }}>
          {STATS.map((s, i) => (
            <div key={s.l} className="p-7 text-center" style={{ borderLeft: i % 2 === 1 || i > 0 ? `1px solid ${line}` : "none", borderTop: i > 1 ? `1px solid ${line}` : "none" }}>
              <Editable as="div" className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: ink }}>{s.v}</Editable>
              <Editable as="div" className="mt-1.5 text-xs font-medium uppercase tracking-wider" style={{ color: mix(ink, 50) }}>{s.l}</Editable>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}