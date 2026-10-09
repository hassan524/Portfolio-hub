// @ts-nocheck
import { useId } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowUpRight, Wallet, Layers, Rocket, Repeat } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const mix = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

const TICKER = [
  { s: "BTC", p: "$67,420", c: "+2.4%", up: true }, { s: "ETH", p: "$3,512", c: "+1.8%", up: true },
  { s: "SOL", p: "$172.30", c: "-0.9%", up: false }, { s: "USDT", p: "$1.00", c: "+0.0%", up: true },
  { s: "BNB", p: "$598.10", c: "+0.6%", up: true }, { s: "XRP", p: "$0.62", c: "-1.2%", up: false },
  { s: "ADA", p: "$0.48", c: "+3.1%", up: true }, { s: "AVAX", p: "$36.40", c: "+4.2%", up: true },
];

const PRODUCTS = [
  { icon: Repeat, tag: "Trade", title: "Spot & Swap", desc: "Trade 150+ assets with deep liquidity, tight spreads and sub-10ms matching.", data: [20, 28, 24, 36, 32, 44, 40, 56, 52, 68] },
  { icon: Layers, tag: "Earn", title: "Staking Vaults", desc: "Put idle assets to work with transparent, on-chain yield and flexible lock periods.", data: [30, 32, 38, 36, 44, 48, 47, 55, 60, 64] },
  { icon: Wallet, tag: "Own", title: "Self-Custody Wallet", desc: "Hold your own keys across chains with a wallet built for everyday use.", data: [40, 38, 46, 44, 52, 50, 58, 62, 60, 70] },
  { icon: Rocket, tag: "Discover", title: "Launchpad", desc: "Get early access to vetted Web3 projects with fair, audited token launches.", data: [18, 24, 22, 34, 30, 46, 42, 58, 64, 78] },
];

function Spark({ data, color }: { data: number[]; color: string }) {
  const id = useId();
  const w = 200, h = 56, max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - 4 - ((v - min) / (max - min || 1)) * (h - 10)]);
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x},${y}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-14" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={color} stopOpacity=".3" /><stop offset="1" stopColor={color} stopOpacity="0" /></linearGradient>
      </defs>
      <path d={`${d} L${w},${h} L0,${h} Z`} fill={`url(#${id})`} />
      <motion.path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }} />
    </svg>
  );
}

export function AIProduct2Projects({ theme }: any) {
  const bg = theme?.bg || "#050505";
  const ink = theme?.ink || "#ffffff";
  const accent = theme?.accent || "#F7931A";
  const line = mix(ink, 12);

  const [tickerRef] = useEmblaCarousel({ loop: true, dragFree: true }, [Autoplay({ delay: 1800, stopOnInteraction: false })]);

  return (
    <section id="projects" className="relative w-full px-6 py-28 transition-colors" style={{ backgroundColor: bg, color: ink, borderTop: `1px solid ${line}` }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Editable as="span" className="inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border mb-5" style={{ borderColor: line, color: mix(ink, 75), backgroundColor: mix(ink, 5) }}>Markets & Products</Editable>
            <Editable as="h2" className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] max-w-xl" style={{ color: ink }}>Everything you need to grow your portfolio</Editable>
          </div>
          <Editable as="p" className="text-sm max-w-sm leading-relaxed" style={{ color: mix(ink, 60) }}>One platform for trading, earning and owning digital assets, with live data behind every decision.</Editable>
        </div>

        {/* live ticker */}
        <div className="overflow-hidden mb-12 rounded-2xl border py-3" style={{ borderColor: line, backgroundColor: mix(ink, 3) }} ref={tickerRef}>
          <div className="flex">
            {[...TICKER, ...TICKER].map((t, i) => (
              <div key={i} className="shrink-0 flex items-center gap-3 px-6 text-sm" style={{ borderRight: `1px solid ${line}` }}>
                <span className="font-bold">{t.s}</span>
                <span style={{ color: mix(ink, 70) }}>{t.p}</span>
                <span className="text-xs font-semibold" style={{ color: t.up ? "#34D399" : "#F87171" }}>{t.c}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {PRODUCTS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={p.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
                className="group p-8 rounded-3xl border flex flex-col justify-between gap-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/25"
                style={{ borderColor: line, backgroundColor: mix(ink, 4) }}>
                <div>
                  <div className="flex items-center justify-between mb-7">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-2xl grid place-items-center border" style={{ borderColor: line, backgroundColor: mix(ink, 6) }}>
                        <Icon className="h-5 w-5" style={{ color: accent }} />
                      </div>
                      <Editable as="span" className="text-xs font-semibold uppercase tracking-widest" style={{ color: mix(ink, 55) }}>{p.tag}</Editable>
                    </div>
                    <div className="h-10 w-10 rounded-full grid place-items-center border transition-transform group-hover:scale-110 group-hover:rotate-12" style={{ borderColor: line }}>
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                  <Editable as="h3" className="text-2xl font-semibold tracking-tight mb-2.5" style={{ color: ink }}>{p.title}</Editable>
                  <Editable as="p" className="text-sm leading-relaxed" style={{ color: mix(ink, 62) }}>{p.desc}</Editable>
                </div>
                <Spark data={p.data} color={accent} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}