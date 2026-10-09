// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";

const DISPLAY = "'Bebas Neue','Oswald','Impact',sans-serif";
const SERIF = "'Cormorant Garamond','Playfair Display',Georgia,serif";

function Stars({ n = 5, color = "#E8412F" }: any) {
  return (
    <div className="flex justify-center gap-1.5">
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-5 w-5" fill={color} aria-hidden="true">
          <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
        </svg>
      ))}
    </div>
  );
}

function Laurel({ color = "#E8412F", flip = false }: any) {
  return (
    <svg viewBox="0 0 60 120" width="36" height="72" style={{ transform: flip ? "scaleX(-1)" : "none" }} aria-hidden="true">
      <path d="M 45 10 C 20 40, 20 80, 45 110" fill="none" stroke={color} strokeWidth="2.5" />
      {[
        { cx: 38, cy: 18, rx: 6, ry: 11, rot: -30 },
        { cx: 30, cy: 32, rx: 7, ry: 12.5, rot: -20 },
        { cx: 26, cy: 48, rx: 8, ry: 14, rot: -10 },
        { cx: 25, cy: 65, rx: 8, ry: 14, rot: 5 },
        { cx: 28, cy: 82, rx: 7, ry: 12.5, rot: 20 },
        { cx: 36, cy: 98, rx: 6, ry: 11, rot: 35 },
      ].map((l, i) => (
        <ellipse key={i} cx={l.cx} cy={l.cy} rx={l.rx} ry={l.ry} fill="none" stroke={color} strokeWidth="1.8" transform={`rotate(${l.rot} ${l.cx} ${l.cy})`} />
      ))}
    </svg>
  );
}

export function Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#07080A";
  const ink = theme?.ink || "#E8E4DC";
  const inkSecond = theme?.["ink-second"] || "#7A756C";
  const surface = theme?.surface || "rgba(255,255,255,0.07)";
  const accent = theme?.accent || "#E8412F";

  const [i, setI] = useState(0);

  const defaultReviews = [
    { name: "ELENA ROSTOVA", role: "VP of Product · Horizon Media", quote: "Watching him architect our platform was like watching a master cinematographer set up a one-shot take. Zero fluff, stunning elegance.", rating: 5, publication: "THE TECH CHRONICLE" },
    { name: "MARCUS CHEN", role: "Head of Engineering · Pulsar AI", quote: "He operates with the aesthetic rigor of an auteur and the technical discipline of an aerospace engineer. A rare engineer.", rating: 5, publication: "SILICON REVIEW" },
    { name: "SARAH JENNINGS", role: "Founder & CEO · Studio 77", quote: "Conversion soared 74% post-launch. Every interaction felt alive and cinematic. Best creative technologist we have ever worked with.", rating: 5, publication: "DESIGN QUARTERLY" },
  ];

  const rawList = Array.isArray(props?.items) && props.items.length > 0
    ? props.items
    : Array.isArray(props?.reviews) && props.reviews.length > 0
      ? props.reviews
      : defaultReviews;

  const reviews = rawList.map((r: any, idx: number) => ({
    name: r.name || r.author || `CRITIC 0${idx+1}`,
    role: r.role || r.title || "Executive Producer",
    quote: r.quote || r.text || "Outstanding engineering executed with cinematic precision.",
    rating: r.rating || 5,
    publication: r.publication || "OFFICIAL PRESS",
  }));

  const awards = Array.isArray(props?.awards) && props.awards.length > 0
    ? props.awards
    : ["AWWWARDS SITE OF THE DAY", "CSS DESIGN AWARDS", "WEBBY NOMINEE", "FWA EXCELLENCE"];

  const r = reviews[i % reviews.length];
  const setR = (idx: number, f: string, v: any) =>
    onChange?.({ items: reviews.map((x: any, k: number) => (k === idx ? { ...x, [f]: v } : x)), reviews: reviews.map((x: any, k: number) => (k === idx ? { ...x, [f]: v } : x)) });

  return (
    <section id="testimonials" className="relative w-full overflow-hidden" style={{ backgroundColor: bg, color: ink }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,500;1,500&display=swap');`}</style>

      <div className="relative mx-auto max-w-5xl px-5 py-24 md:px-12 md:py-36">
        <p className="text-center font-mono text-xs uppercase tracking-[0.5em]" style={{ color: accent }}>
          <Editable value={props?.eyebrow || "ACT IV · CRITICAL ACCLAIM"} onChange={(v) => onChange?.({ eyebrow: v })} />
        </p>

        <div className="mt-14 flex items-center justify-center gap-4 md:gap-10">
          <Laurel color={accent} />
          <div className="flex-1 text-center">
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.45 }}>
                <Stars n={r.rating || 5} color={accent} />
                <p className="mx-auto mt-8 max-w-3xl text-2xl italic leading-snug md:text-4xl lg:text-5xl" style={{ fontFamily: SERIF }}>
                  "<Editable value={r.quote} onChange={(v) => setR(i, "quote", v)} />"
                </p>
                <p className="mt-6 text-2xl tracking-[0.2em] md:text-3xl" style={{ fontFamily: DISPLAY }}>
                  <Editable value={r.name} onChange={(v) => setR(i, "name", v)} />
                </p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: inkSecond }}>
                  <Editable value={r.role} onChange={(v) => setR(i, "role", v)} /> · <span style={{ color: accent }}><Editable value={r.publication} onChange={(v) => setR(i, "publication", v)} /></span>
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          <Laurel color={accent} flip />
        </div>

        <div className="mt-10 flex justify-center gap-3">
          {reviews.map((_: any, k: number) => (
            <button key={k} aria-label={`Review ${k+1}`} onClick={() => setI(k)} className="h-1.5 rounded-full transition-all duration-300" style={{ width: k === i ? 48 : 18, backgroundColor: k === i ? accent : surface }} />
          ))}
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t pt-8 font-mono text-[11px] uppercase tracking-[0.3em]" style={{ borderColor: surface, color: inkSecond }}>
          <span className="font-bold" style={{ color: accent }}>OFFICIAL SELECTION:</span>
          {awards.map((a: string, k: number) => (
            <span key={k} className="flex items-center gap-3">
              <span className="text-[10px] opacity-30">◆</span>
              <Editable value={a} onChange={(v) => onChange?.({ awards: awards.map((x: string, idx: number) => (idx === k ? v : x)) })} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export const DeveloperPortfolio4Testimonials = Testimonials;
export default Testimonials;
