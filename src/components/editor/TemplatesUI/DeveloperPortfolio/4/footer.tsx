// @ts-nocheck
import { motion } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";

const DISPLAY = "'Bebas Neue','Oswald','Impact',sans-serif";
const SERIF = "'Cormorant Garamond','Playfair Display',Georgia,serif";

const FRAME_IMAGES = [
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=70",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=70",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=70",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&q=70",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=70",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=70",
];

export function Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#040506";
  const ink = theme?.ink || "#E8E4DC";
  const inkSecond = theme?.["ink-second"] || "#7A756C";
  const surface = theme?.surface || "rgba(255,255,255,0.07)";
  const accent = theme?.accent || "#E8412F";

  const links = Array.isArray(props?.links) && props.links.length > 0
    ? props.links
    : [
        { label: "About", href: "#about" },
        { label: "Films", href: "#projects" },
        { label: "Reviews", href: "#testimonials" },
        { label: "Contact", href: "#contact" },
      ];
  const setLink = (i: number, v: string) =>
    onChange?.({ links: links.map((l: any, k: number) => (k === i ? { ...l, label: v } : l)) });

  const frames = [...FRAME_IMAGES, ...FRAME_IMAGES];

  return (
    <footer className="relative w-full overflow-hidden" style={{ backgroundColor: bg, color: ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,500;1,500&display=swap');
        @keyframes footer-film { from{transform:translateX(0)} to{transform:translateX(-50%)} }
      `}</style>

      {/* Film strip marquee with images */}
      <div className="relative w-full overflow-hidden" style={{ backgroundColor: "#0d0e10", height: 100 }}>
        <div className="absolute inset-x-0 top-[6px] h-[9px]" style={{ backgroundImage: "repeating-linear-gradient(90deg, #06060A 0 10px, transparent 10px 22px)", backgroundSize: "22px 100%" }} />
        <div className="absolute inset-x-0 bottom-[6px] h-[9px]" style={{ backgroundImage: "repeating-linear-gradient(90deg, #06060A 0 10px, transparent 10px 22px)", backgroundSize: "22px 100%" }} />
        <div className="absolute left-0 flex gap-[3px]" style={{ top: 18, animation: "footer-film 30s linear infinite", width: "max-content" }}>
          {frames.map((src, i) => (
            <div key={i} style={{ width: 110, height: 64, backgroundColor: "#040406", flexShrink: 0 }}>
              <img src={src} alt="" className="h-full w-full object-cover" style={{ filter: "grayscale(0.7) contrast(1.1) brightness(0.7)" }} loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-20 text-center md:px-12">
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="leading-none select-none"
          style={{ fontFamily: DISPLAY, fontSize: "clamp(4.5rem, 20vw, 16rem)", color: "transparent", WebkitTextStroke: `1.5px ${accent}` }}
        >
          <Editable value={props?.theEnd || "THE END"} onChange={(v) => onChange?.({ theEnd: v })} />
        </motion.p>
        <p className="mt-3 text-2xl italic md:text-3xl" style={{ fontFamily: SERIF, color: inkSecond }}>
          <Editable value={props?.summary || "No software developers were harmed in the making of this portfolio."} onChange={(v) => onChange?.({ summary: v })} />
        </p>

        <nav className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {links.map((l: any, i: number) => (
            <a
              key={i}
              href={l.href}
              className="text-xl tracking-[0.2em] transition-colors duration-200 uppercase"
              style={{ fontFamily: DISPLAY, color: inkSecond }}
              onMouseEnter={e => (e.currentTarget.style.color = accent)}
              onMouseLeave={e => (e.currentTarget.style.color = inkSecond)}
            >
              <Editable value={l.label} onChange={(v) => setLink(i, v)} />
            </a>
          ))}
        </nav>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 font-mono text-[10px] uppercase tracking-[0.25em] sm:flex-row" style={{ borderColor: surface, color: inkSecond }}>
          <p>
            <Editable value={props?.copyright || "© 2026 ZAYAN MALIK CINEMA. ALL RIGHTS RESERVED."} onChange={(v) => onChange?.({ copyright: v })} />
          </p>
          <a href="#home" className="transition-colors duration-200" style={{ color: accent }}>
            <Editable value={props?.backToTop || "↑ REPLAY FROM OPENING"} onChange={(v) => onChange?.({ backToTop: v })} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export const DeveloperPortfolio4Footer = Footer;
export default Footer;
