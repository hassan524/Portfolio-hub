// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowUpRight, Film, Sparkles, Volume2 } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function CreativePortfolio4About({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#050505";
  const bgSecond = theme?.["bg-second"] || "#111111";
  const ink = theme?.ink || "#F5F1EA";
  const inkSecond = theme?.["ink-second"] || "#9C978F";
  const surface = theme?.surface || "rgba(245, 241, 234, 0.16)";
  const accent = theme?.accent || "#FF5C35";

  const pillars = props?.pillars || [
    {
      num: "01",
      title: "Moving Image",
      desc: "Direction, cinematography, title design and editing for screens of any magnitude.",
      icon: Film,
    },
    {
      num: "02",
      title: "Living Identity",
      desc: "Graphic systems engineered for motion first, responsive to live inputs and atmosphere.",
      icon: Sparkles,
    },
    {
      num: "03",
      title: "Sonic Design",
      desc: "Original scoring, tactile foley, and directional spatial audio built for emotional weight.",
      icon: Volume2,
    },
  ];

  return (
    <section
      id="about"
      className="relative px-5 py-24 sm:px-8 lg:px-14 border-t font-mono"
      style={{
        backgroundColor: bgSecond,
        color: ink,
        borderColor: surface,
      }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Main Grid: Reel Frame on left, Story on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: The Cinematic Reel Frame with Scanning Beam */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative min-h-[480px] sm:min-h-[540px] rounded-lg overflow-hidden border p-6 flex flex-col justify-between shadow-2xl"
              style={{
                borderColor: surface,
                background: `linear-gradient(135deg, ${accent}33 0%, #11111188 50%, #6E3DFF33 100%)`,
              }}
            >
              {/* Scanline beam moving up and down */}
              <motion.div
                className="absolute left-0 right-0 h-[2px] z-10"
                style={{
                  backgroundColor: accent,
                  boxShadow: `0 0 20px ${accent}, 0 0 8px #ffffff`,
                }}
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />

              {/* Background ambient texture image */}
              <img
                src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80"
                alt="Studio reel preview"
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 grayscale contrast-125"
              />

              {/* Top Tag */}
              <div className="relative z-10 flex items-center justify-between text-[11px] uppercase tracking-widest font-semibold" style={{ color: accent }}>
                <span>
                  <Editable
                    value={props?.reelLabel || "NOX / REEL 2026"}
                    onChange={(v) => onChange?.({ reelLabel: v })}
                  />
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: accent }} />
                  LIVE
                </span>
              </div>

              {/* Reel Text Overlay */}
              <div className="relative z-10 mt-auto pt-24">
                <strong className="block text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.06em] leading-[0.88] uppercase">
                  <Editable
                    value={props?.reelHeadline || "Every frame earns its place."}
                    onChange={(v) => onChange?.({ reelHeadline: v })}
                  />
                </strong>
                <small className="block mt-4 text-[10px] uppercase tracking-[0.2em]" style={{ color: inkSecond }}>
                  <Editable
                    value={props?.reelMeta || "Sound on / lights low / 01:42"}
                    onChange={(v) => onChange?.({ reelMeta: v })}
                  />
                </small>
              </div>
            </motion.div>
          </div>

          {/* Right: Studio Editorial Manifesto */}
          <div className="lg:col-span-6 flex flex-col justify-end">
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold" style={{ color: accent }}>
              <Editable
                value={props?.eyebrow || "01 / The studio"}
                onChange={(v) => onChange?.({ eyebrow: v })}
              />
            </span>

            <h2 className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.08em] leading-[0.88] uppercase">
              <Editable
                value={props?.title || "The screen is only the beginning. Stay awhile."}
                onChange={(v) => onChange?.({ title: v })}
              />
            </h2>

            <p className="mt-8 text-base sm:text-lg leading-relaxed font-sans max-w-lg" style={{ color: inkSecond }}>
              <Editable
                value={
                  props?.desc ||
                  "We use moving image, sound, typography, and light to build identities that do not sit still. From cinematic teaser drops to full interactive design systems, our work commands attention."
                }
                onChange={(v) => onChange?.({ desc: v })}
              />
            </p>

            <div className="mt-8">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-bold transition-opacity hover:opacity-80"
                style={{ color: accent }}
              >
                <span>Explore the scenes</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Studio Pillars Grid */}
        <div className="mt-20 pt-12 border-t grid grid-cols-1 md:grid-cols-3 gap-8" style={{ borderColor: surface }}>
          {pillars.map((item: any, i: number) => {
            const Icon = item.icon || Film;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="p-6 rounded-lg border transition-colors"
                style={{
                  backgroundColor: "rgba(255,255,255,0.02)",
                  borderColor: surface,
                }}
              >
                <div className="flex items-center justify-between" style={{ color: accent }}>
                  <Icon size={22} />
                  <span className="text-xs uppercase font-mono tracking-widest">{item.num}</span>
                </div>
                <h3 className="mt-6 text-xl font-bold uppercase tracking-tight">
                  <Editable
                    value={item.title}
                    onChange={(v) =>
                      onChange?.({
                        pillars: pillars.map((x: any, n: number) => (n === i ? { ...x, title: v } : x)),
                      })
                    }
                  />
                </h3>
                <p className="mt-3 text-xs leading-relaxed font-sans" style={{ color: inkSecond }}>
                  <Editable
                    value={item.desc}
                    onChange={(v) =>
                      onChange?.({
                        pillars: pillars.map((x: any, n: number) => (n === i ? { ...x, desc: v } : x)),
                      })
                    }
                  />
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
