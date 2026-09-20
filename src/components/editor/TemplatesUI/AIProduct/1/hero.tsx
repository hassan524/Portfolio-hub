// @ts-nocheck
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Heart, Sparkles } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const rise = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000",
    caption: "Unlock New Customers with AI",
    statValue: "82.45%",
    statLabel: "Conversion",
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000",
    caption: "Real-time High Converting Ads",
    statValue: "94.2%",
    statLabel: "ROI Growth",
  },
  {
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1000",
    caption: "Instant Automated Prospecting",
    statValue: "3.4x",
    statLabel: "Lead Velocity",
  },
];

const LOGOS = ["Keeneland", "Seminole Gaming", "Kintura", "LeafSpring", "Trilogy", "Apex Corp", "Vanguard", "Nexus AI"];

export function AIProduct1Hero({ props = {}, theme, onChange }: any) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const bg = theme?.bg || "#0B0F19";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#38BDF8";

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="px-6 md:px-16 pt-12 pb-16 overflow-hidden transition-colors"
      style={{ backgroundColor: bg, color: ink }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <motion.div initial="initial" animate="animate" className="max-w-xl">
            <motion.div {...rise} className="flex items-center gap-1.5 mb-6">
              <div
                className="h-6 w-6 rounded-full flex items-center justify-center shadow-sm"
                style={{ backgroundColor: surface, color: accent }}
              >
                <Star className="h-3.5 w-3.5 fill-current" />
              </div>
              <Editable as="span" className="text-sm font-semibold" style={{ color: ink, opacity: 0.75 }}>
                4.7 on TrustPilot • Trusted by 500+ Brands
              </Editable>
            </motion.div>

            <motion.div {...rise} transition={{ ...rise.transition, delay: 0.05 }}>
              <Editable
                as="h1"
                className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95]"
                style={{ color: ink }}
              >
                AI-Powered <br />
                <span style={{ color: accent }}>AdWords</span> That <br />
                Find Leads
              </Editable>
            </motion.div>

            <motion.div {...rise} transition={{ ...rise.transition, delay: 0.12 }}>
              <Editable as="p" className="mt-6 text-base md:text-lg leading-relaxed max-w-md" style={{ color: ink, opacity: 0.75 }}>
                The first prospecting tool that pulls live data in real-time as you search — giving you accurate, reliable contact info to scale your brand fast.
              </Editable>
            </motion.div>

            <motion.div {...rise} transition={{ ...rise.transition, delay: 0.2 }} className="mt-8 flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-4 rounded-full font-semibold text-sm shadow-lg cursor-pointer transition-transform"
                style={{ backgroundColor: accent, color: ink }}
              >
                <Editable className="inline">Get Started Now</Editable>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-4 rounded-full font-semibold text-sm transition-colors cursor-pointer border"
                style={{ backgroundColor: surface, color: ink, borderColor: surface }}
              >
                <Editable className="inline">Watch 2-Min Demo</Editable>
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-[32px] overflow-hidden aspect-[4/5] md:aspect-[5/6] shadow-2xl border"
            style={{ backgroundColor: surface, borderColor: surface }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                src={HERO_SLIDES[currentSlide].image}
                alt="Brand showcase slide"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-transparent pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute top-5 right-5 w-56 rounded-2xl p-4 backdrop-blur-md shadow-xl border z-10"
              style={{
                backgroundColor: surface,
                borderColor: surface,
                color: ink,
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <Editable as="span" className="text-[11px] font-bold uppercase tracking-wider" style={{ color: ink, opacity: 0.75 }}>
                  Live Metric
                </Editable>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div
                  className="rounded-xl p-3 border"
                  style={{ backgroundColor: `${accent}15`, borderColor: `${accent}30` }}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentSlide}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-lg font-black block"
                      style={{ color: ink }}
                    >
                      <Editable className="inline">{HERO_SLIDES[currentSlide].statValue}</Editable>
                    </motion.span>
                  </AnimatePresence>
                  <Editable as="span" className="text-[10px] font-medium mt-0.5 block" style={{ color: ink, opacity: 0.75 }}>
                    {HERO_SLIDES[currentSlide].statLabel}
                  </Editable>
                </div>
                <div
                  className="rounded-xl p-3 border flex flex-col justify-between"
                  style={{ backgroundColor: surface, borderColor: surface }}
                >
                  <div>
                    <Editable as="span" className="text-sm font-bold block" style={{ color: ink }}>23.4%</Editable>
                    <Editable as="span" className="text-[9px] font-medium block" style={{ color: ink, opacity: 0.75 }}>Added to cart</Editable>
                  </div>
                  <div className="mt-1 pt-1 border-t" style={{ borderColor: surface }}>
                    <Editable as="span" className="text-[9px] font-bold block" style={{ color: accent }}>76.6% Active</Editable>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="absolute bottom-24 left-5 max-w-[220px] flex items-start gap-2.5 rounded-2xl px-4 py-3 backdrop-blur-md shadow-xl border z-10"
              style={{
                backgroundColor: surface,
                borderColor: surface,
                color: ink,
              }}
            >
              <div className="h-6 w-6 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
              </div>
              <Editable as="span" className="text-xs font-semibold leading-snug" style={{ color: ink }}>
                Love it! Going to try it out
              </Editable>
            </motion.div>

            <div className="absolute bottom-0 left-0 right-0 px-6 py-4 flex items-center justify-between bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10">
              <div className="flex items-center gap-2">
                <div
                  className="h-6 w-6 rounded-full backdrop-blur-sm flex items-center justify-center text-white"
                  style={{ backgroundColor: `${accent}40` }}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentSlide}
                    initial={{ opacity: 0, x: 5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -5 }}
                    className="text-sm font-semibold text-white"
                  >
                    <Editable className="inline">{HERO_SLIDES[currentSlide].caption}</Editable>
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-1.5">
                {HERO_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === i ? "w-5 bg-white" : "w-1.5 bg-white/50"
                      }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 pt-10 border-t overflow-hidden relative" style={{ borderColor: surface }}>
          <Editable as="p" className="text-center text-xs font-bold uppercase tracking-widest mb-8" style={{ color: ink, opacity: 0.75 }}>
            Powering high-growth brands worldwide
          </Editable>

          <motion.div
            className="flex gap-16 whitespace-nowrap items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
          >
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div
                key={i}
                className="transition-colors cursor-pointer text-lg font-bold tracking-tight uppercase inline-block hover:opacity-100"
                style={{ color: ink, opacity: 0.75 }}
              >
                <Editable className="inline">{logo}</Editable>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}