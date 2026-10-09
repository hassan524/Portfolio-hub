// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowRight, Compass, Sun, Waves } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#FAF5EE";
  const bgSecond = theme?.["bg-second"] || "#FFFFFF";
  const ink = theme?.ink || "#14213D";
  const inkSecond = theme?.["ink-second"] || "#64748B";
  const accent = theme?.accent || "#E07A5F";
  const surface = theme?.surface || "#F1E9DE";

  const go = (e: any, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative overflow-hidden px-6 pb-20 pt-10 lg:pb-28 lg:pt-16" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 font-serif text-xs font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
            <span>☀️</span>
            <Editable
              as="span"
              value={props?.eyebrow || "SUNLIT BRASSERIE & RAW BAR"}
              onChange={(v: string) => onChange?.({ eyebrow: v })}
            />
            <span>☀️</span>
          </div>

          <h1
            className="mt-5 font-serif text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
            style={{ color: ink }}
          >
            <Editable
              as="span"
              value={props?.headline || "Sun-Drenched Flavors"}
              onChange={(v: string) => onChange?.({ headline: v })}
              className="block"
            />
            <Editable
              as="span"
              value={props?.headlineSub || "From The Mediterranean Coast."}
              onChange={(v: string) => onChange?.({ headlineSub: v })}
              className="block italic font-light"
              style={{ color: accent }}
            />
          </h1>

          <Editable
            as="p"
            value={
              props?.subheadline ||
              "Fresh morning catch from local day-boats, wood-fired seasonal vegetables, cold-pressed estate olive oils, and chilled mineral wines served under our sunlit lemon tree terrace."
            }
            onChange={(v: string) => onChange?.({ subheadline: v })}
            className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed"
            style={{ color: inkSecond }}
          />

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              onClick={(e) => go(e, "#contact")}
              className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-base font-bold text-white shadow-md transition duration-200 hover:scale-[1.02] active:scale-95"
              style={{ backgroundColor: accent }}
            >
              <Editable
                as="span"
                value={props?.primaryCta || "Book Garden Terrace"}
                onChange={(v: string) => onChange?.({ primaryCta: v })}
              />
              <ArrowRight size={18} />
            </a>

            <a
              href="#menu"
              onClick={(e) => go(e, "#menu")}
              className="inline-flex items-center rounded-2xl border px-8 py-4 text-base font-semibold transition duration-200 hover:scale-[1.02] active:scale-95"
              style={{ borderColor: ink, color: ink, backgroundColor: bgSecond }}
            >
              <Editable
                as="span"
                value={props?.secondaryCta || "Today's Blackboard"}
                onChange={(v: string) => onChange?.({ secondaryCta: v })}
              />
            </a>
          </div>
        </motion.div>

        {/* Panoramic Framed Coastal Table Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="mt-14 overflow-hidden rounded-[2.5rem] border p-3 shadow-xl"
          style={{ backgroundColor: bgSecond, borderColor: surface }}
        >
          <img
            src={props?.heroImage || "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=1600&q=80"}
            alt="Sunlit Mediterranean terrace dining table with seafood platters and wine"
            className="aspect-[21/10] w-full rounded-[2rem] object-cover transition duration-700 hover:scale-105"
          />
        </motion.div>
      </div>
    </section>
  );
}

export const Restaurant3Hero = Hero;
export const HeroCentered = Hero;
export default Hero;
