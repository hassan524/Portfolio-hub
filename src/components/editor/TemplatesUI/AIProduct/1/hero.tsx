// @ts-nocheck
import { useState, useEffect, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Heart, Sparkles, ArrowRight, Play } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Editable } from "@/components/editor/ui/Editable";

/* ---------- theme helpers (inline) ---------- */
const mix = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;
function readableOn(color: string) {
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec((color || "").trim());
  if (!m) return "#ffffff";
  let h = m[1];
  if (h.length === 3) h = h.split("").map((x) => x + x).join("");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const l = (v: number) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return 0.2126 * l(r) + 0.7152 * l(g) + 0.0722 * l(b) > 0.45 ? "#0B0F19" : "#ffffff";
}

/* ---------- category presets: props.category = ai | saas | agency | developer ---------- */
const IMG = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=1000`;
const PRESETS: Record<string, any> = {
  ai: {
    rating: "4.7 on TrustPilot • Trusted by 500+ Brands",
    before: "AI-Powered", accent: "AdWords", after: "That Find Leads",
    sub: "The first prospecting tool that pulls live data in real-time as you search, giving you accurate, reliable contact info to scale your brand fast.",
    primary: "Get Started Now", secondary: "Watch 2-Min Demo",
    slides: [
      { image: IMG("photo-1534528741775-53994a69daeb"), caption: "Unlock New Customers with AI", statValue: "82.45%", statLabel: "Conversion" },
      { image: IMG("photo-1507003211169-0a1dd7228f2d"), caption: "Real-time High Converting Ads", statValue: "94.2%", statLabel: "ROI Growth" },
      { image: IMG("photo-1517841905240-472988babdf9"), caption: "Instant Automated Prospecting", statValue: "3.4x", statLabel: "Lead Velocity" },
    ],
    metricA: "23.4%", metricALabel: "Added to cart", metricB: "76.6% Active", bubble: "Love it! Going to try it out",
    logosTitle: "Powering high-growth brands worldwide",
    logos: ["Keeneland", "Seminole Gaming", "Kintura", "LeafSpring", "Trilogy", "Apex Corp", "Vanguard", "Nexus AI"],
  },
  saas: {
    rating: "4.9 on G2 • Loved by 12,000+ teams",
    before: "Run your whole", accent: "workflow", after: "in one place",
    sub: "Projects, docs, and automations that finally live together. Replace five tools with one calm workspace your team actually enjoys.",
    primary: "Start Free Trial", secondary: "See How It Works",
    slides: [
      { image: IMG("photo-1551434678-e076c223a692"), caption: "Plan sprints without the chaos", statValue: "42%", statLabel: "Faster Delivery" },
      { image: IMG("photo-1522071820081-009f0129c71c"), caption: "Keep every team in sync", statValue: "98%", statLabel: "On-time Rate" },
      { image: IMG("photo-1460925895917-afdab827c52f"), caption: "Dashboards that explain themselves", statValue: "3.1x", statLabel: "Team Velocity" },
    ],
    metricA: "31.2%", metricALabel: "Tasks automated", metricB: "68.8% Manual", bubble: "Finally, one tool for everything",
    logosTitle: "Teams that ship with us",
    logos: ["Northwind", "Lumen", "Basecamp Labs", "Orbit", "Fieldstone", "Halcyon", "Plover", "Quanta"],
  },
  agency: {
    rating: "5.0 on Clutch • 140+ launches shipped",
    before: "We design brands", accent: "people", after: "remember",
    sub: "A senior team of strategists, designers, and developers building identities and websites that turn attention into revenue.",
    primary: "Start a Project", secondary: "View Our Work",
    slides: [
      { image: IMG("photo-1558655146-9f40138edfeb"), caption: "Identity systems that scale", statValue: "140+", statLabel: "Brands Launched" },
      { image: IMG("photo-1561070791-2526d30994b8"), caption: "Websites built to convert", statValue: "2.8x", statLabel: "Conversion Lift" },
      { image: IMG("photo-1626785774573-4b799315345d"), caption: "Campaigns with real momentum", statValue: "9 yrs", statLabel: "Of Craft" },
    ],
    metricA: "2.8x", metricALabel: "Conversion lift", metricB: "Top 1% Clutch", bubble: "The rebrand exceeded every expectation",
    logosTitle: "Brands we've partnered with",
    logos: ["Aurora", "Kestrel", "Maison Verde", "Pinecrest", "Solace", "Tidewater", "Foxglove", "Atlas & Co"],
  },
  developer: {
    rating: "5+ years shipping • 60+ projects delivered",
    before: "Full-stack engineer", accent: "building", after: "fast, reliable products",
    sub: "I design, build, and maintain web apps end to end, from database schema to polished UI, with a focus on performance and clean code.",
    primary: "Hire Me", secondary: "View Projects",
    slides: [
      { image: IMG("photo-1498050108023-c5249f4df085"), caption: "Clean, maintainable codebases", statValue: "60+", statLabel: "Projects Shipped" },
      { image: IMG("photo-1555066931-4365d14bab8c"), caption: "Performance-first engineering", statValue: "98", statLabel: "Lighthouse Score" },
      { image: IMG("photo-1461749280684-dccba630e2f6"), caption: "Reliable from day one", statValue: "99.9%", statLabel: "Uptime" },
    ],
    metricA: "98", metricALabel: "Lighthouse", metricB: "Open to work", bubble: "Shipped ahead of schedule, great communicator",
    logosTitle: "Tools I work with daily",
    logos: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind", "Supabase", "PostgreSQL", "Docker"],
  },
};

const ease = [0.22, 1, 0.36, 1];
const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease, delay },
});

function GridBackdrop({ color }: { color: string }) {
  const id = useId();
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
      <defs>
        <pattern id={`${id}p`} width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0H0V48" fill="none" stroke={color} strokeWidth="1" opacity="0.14" />
          <circle r="1.6" fill={color} opacity="0.5" />
        </pattern>
        <radialGradient id={`${id}g`} cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="white" /><stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id={`${id}m`}><rect width="100%" height="100%" fill={`url(#${id}g)`} /></mask>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id}p)`} mask={`url(#${id}m)`} />
    </svg>
  );
}

function OrbitRings({ color, className = "" }: { color: string; className?: string }) {
  const rings = [{ r: 90, d: 28, dash: "2 8", dir: 1 }, { r: 150, d: 44, dash: "1 6", dir: -1 }, { r: 210, d: 64, dash: "3 10", dir: 1 }];
  return (
    <svg viewBox="-240 -240 480 480" className={`pointer-events-none ${className}`} aria-hidden>
      <circle r="6" fill={color} /><circle r="18" fill={color} opacity="0.12" />
      {rings.map((g, i) => (
        <motion.g key={i} animate={{ rotate: 360 * g.dir }} transition={{ repeat: Infinity, duration: g.d, ease: "linear" }}>
          <circle r={g.r} fill="none" stroke={color} strokeOpacity="0.35" strokeDasharray={g.dash} />
          <circle cx={g.r} r="4.5" fill={color} />
        </motion.g>
      ))}
    </svg>
  );
}

export function AIProduct1Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0B0F19";
  const ink = theme?.ink || "#ffffff";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#38BDF8";
  const line = mix(ink, 12), lineStrong = mix(ink, 24), muted = mix(ink, 72), faint = mix(ink, 45);
  const soft = (p: number) => mix(accent, p);
  const onAccent = readableOn(accent);

  const c = { ...(PRESETS[props?.category] || PRESETS.ai), ...(props?.content || {}) };

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4500, stopOnInteraction: false })]);
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    if (!emblaApi) return;
    const on = () => setCurrentSlide(emblaApi.selectedScrollSnap());
    on();
    emblaApi.on("select", on);
    return () => { emblaApi.off("select", on); };
  }, [emblaApi]);
  const slide = c.slides[currentSlide] || c.slides[0];

  return (
    <section className="relative px-6 md:px-16 pt-16 pb-20 overflow-hidden transition-colors" style={{ backgroundColor: bg, color: ink }}>
      <GridBackdrop color={accent} />
      <div className="absolute -top-24 -left-24 w-[520px] h-[520px] rounded-full blur-[140px] pointer-events-none" style={{ background: accent, opacity: 0.16 }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial="initial" animate="animate" className="max-w-xl">
            <motion.div {...rise(0)} className="inline-flex items-center gap-2 mb-7 pl-1.5 pr-4 py-1.5 rounded-full border backdrop-blur-md" style={{ background: surface, borderColor: line }}>
              <span className="h-6 w-6 rounded-full grid place-items-center" style={{ background: soft(18), color: accent }}>
                <Star className="h-3.5 w-3.5 fill-current" />
              </span>
              <Editable as="span" className="text-xs md:text-sm font-semibold" style={{ color: muted }}>{c.rating}</Editable>
            </motion.div>

            <motion.div {...rise(0.06)}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.98]" style={{ color: ink }}>
                <Editable className="inline">{c.before}</Editable>{" "}
                <span className="relative inline-block" style={{ color: accent }}>
                  <Editable className="inline">{c.accent}</Editable>
                  <svg className="absolute left-0 -bottom-2 w-full h-3" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden>
                    <motion.path d="M2 8 Q 50 1 100 6 T 198 5" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, delay: 0.7, ease: "easeOut" }} />
                  </svg>
                </span>{" "}
                <Editable className="inline">{c.after}</Editable>
              </h1>
            </motion.div>

            <motion.div {...rise(0.14)}>
              <Editable as="p" className="mt-7 text-base md:text-lg leading-relaxed max-w-md" style={{ color: muted }}>{c.sub}</Editable>
            </motion.div>

            <motion.div {...rise(0.22)} className="mt-9 flex flex-wrap gap-3">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="group px-7 py-4 rounded-full font-bold text-sm cursor-pointer inline-flex items-center gap-2"
                style={{ backgroundColor: accent, color: onAccent, boxShadow: `0 12px 32px ${soft(40)}` }}>
                <Editable className="inline">{c.primary}</Editable>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="px-7 py-4 rounded-full font-semibold text-sm cursor-pointer border inline-flex items-center gap-2 backdrop-blur-md"
                style={{ backgroundColor: surface, color: ink, borderColor: lineStrong }}>
                <Play className="h-3.5 w-3.5 fill-current" />
                <Editable className="inline">{c.secondary}</Editable>
              </motion.button>
            </motion.div>
          </motion.div>

          <div className="relative">
            <OrbitRings color={accent} className="absolute -top-16 -right-20 w-[420px] opacity-40 hidden md:block" />
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease }}
              className="relative rounded-[32px] overflow-hidden aspect-[4/5] md:aspect-[5/6] shadow-2xl border"
              style={{ backgroundColor: surface, borderColor: lineStrong }}>
              <div ref={emblaRef} className="absolute inset-0 overflow-hidden">
                <div className="flex h-full">
                  {c.slides.map((s: any, i: number) => (
                    <div key={i} className="relative flex-[0_0_100%] min-w-0 h-full">
                      <img src={s.image} alt={s.caption} className="absolute inset-0 w-full h-full object-cover" loading={i === 0 ? "eager" : "lazy"} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-black/55 via-transparent to-transparent pointer-events-none" />

              <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute top-5 right-5 w-56 rounded-2xl p-4 backdrop-blur-xl shadow-xl border z-10"
                style={{ backgroundColor: surface, borderColor: lineStrong, color: ink }}>
                <div className="flex items-center justify-between mb-3">
                  <Editable as="span" className="text-[11px] font-bold uppercase tracking-wider" style={{ color: muted }}>Live Metric</Editable>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-xl p-3 border" style={{ backgroundColor: soft(14), borderColor: soft(30) }}>
                    <AnimatePresence mode="wait">
                      <motion.span key={currentSlide} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                        className="text-lg font-black block" style={{ color: ink }}>
                        <Editable className="inline">{slide.statValue}</Editable>
                      </motion.span>
                    </AnimatePresence>
                    <Editable as="span" className="text-[10px] font-medium mt-0.5 block" style={{ color: muted }}>{slide.statLabel}</Editable>
                  </div>
                  <div className="rounded-xl p-3 border flex flex-col justify-between" style={{ borderColor: line }}>
                    <div>
                      <Editable as="span" className="text-sm font-bold block" style={{ color: ink }}>{c.metricA}</Editable>
                      <Editable as="span" className="text-[9px] font-medium block" style={{ color: muted }}>{c.metricALabel}</Editable>
                    </div>
                    <Editable as="span" className="text-[9px] font-bold block mt-1 pt-1 border-t" style={{ color: accent, borderColor: line }}>{c.metricB}</Editable>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: [0, -6, 0] }}
                transition={{ opacity: { delay: 0.7 }, y: { delay: 0.7, repeat: Infinity, duration: 5, ease: "easeInOut" } }}
                className="absolute bottom-24 left-5 max-w-[220px] flex items-start gap-2.5 rounded-2xl px-4 py-3 backdrop-blur-xl shadow-xl border z-10"
                style={{ backgroundColor: surface, borderColor: lineStrong, color: ink }}>
                <div className="h-6 w-6 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
                </div>
                <Editable as="span" className="text-xs font-semibold leading-snug" style={{ color: ink }}>{c.bubble}</Editable>
              </motion.div>

              <div className="absolute bottom-0 left-0 right-0 px-6 py-4 flex items-center justify-between bg-gradient-to-t from-black/85 via-black/45 to-transparent z-10">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="h-6 w-6 rounded-full flex items-center justify-center text-white shrink-0" style={{ backgroundColor: soft(45) }}>
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.span key={currentSlide} initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }}
                      className="text-sm font-semibold text-white truncate">
                      <Editable className="inline">{slide.caption}</Editable>
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div className="flex items-center gap-1.5">
                  {c.slides.map((_: any, i: number) => (
                    <button key={i} aria-label={`Slide ${i + 1}`} onClick={() => emblaApi?.scrollTo(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${currentSlide === i ? "w-5 bg-white" : "w-1.5 bg-white/50"}`} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-24 pt-10 border-t relative" style={{ borderColor: line }}>
          <Editable as="p" className="text-center text-xs font-bold uppercase tracking-widest mb-8" style={{ color: faint }}>{c.logosTitle}</Editable>
          <div className="overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)" }}>
            <motion.div className="flex gap-16 whitespace-nowrap items-center w-max" animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, duration: 28, ease: "linear" }}>
              {[...c.logos, ...c.logos].map((logo: string, i: number) => (
                <div key={i} className="inline-flex items-center gap-2 text-lg font-bold tracking-tight uppercase opacity-60 hover:opacity-100 transition-opacity" style={{ color: ink }}>
                  <span className="h-2 w-2 rounded-sm rotate-45" style={{ background: accent }} />
                  <Editable className="inline">{logo}</Editable>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}