// @ts-nocheck
import { useState } from "react";
import { Editable } from "@/components/editor/ui/Editable";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ArchitectureStudio2Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";
  const fontHeading = theme?.fontHeading || "Cormorant Garamond";
  const fontBody = theme?.fontBody || "DM Sans";
  const [open, setOpen] = useState(0);

  const steps = [
    {
      title: "Listen",
      text: "We begin with your life, your site and the feeling you want to come home to.",
    },
    {
      title: "Sketch",
      text: "Ideas take shape through hand drawings, models and honest conversation.",
    },
    {
      title: "Refine",
      text: "Materials, light and detail are tuned until every room feels right.",
    },
    {
      title: "Build",
      text: "We stay beside you on site, guarding the vision to the final handover.",
    },
  ];

  return (
    <section
      id="testimonials"
      className="px-6 md:px-14 lg:px-20 py-24 md:py-32 transition-colors w-full"
      style={{ backgroundColor: bgSecond, color: ink, fontFamily: fontBody }}
    >
      <div className="max-w-4xl mx-auto">
        <span
          className="text-[10px] font-bold uppercase tracking-widest block mb-4"
          style={{ color: accent }}
        >
          <Editable value="OUR PROCESS" />
        </span>

        <Editable
          as="h2"
          className="text-3xl sm:text-4xl md:text-5xl font-medium max-w-3xl mb-12 tracking-tight leading-tight font-serif italic"
          style={{ color: ink, fontFamily: fontHeading }}
          value={props?.title || "Four steps to a place that feels like yours."}
          onChange={(v) => onChange?.({ title: v })}
        />

        <div className="flex flex-col border-t" style={{ borderColor: `${ink}26` }}>
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="border-b py-5 transition-colors"
              style={{ borderColor: `${ink}26` }}
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 text-left transition-opacity hover:opacity-75 cursor-pointer"
              >
                <span className="flex items-baseline gap-6">
                  <Editable
                    value={`0${i + 1}`}
                    className="text-sm font-bold tracking-wider font-mono"
                    style={{ color: accent }}
                  />
                  <Editable
                    value={s.title}
                    className="text-2xl md:text-3xl font-medium font-serif italic"
                    style={{ color: ink, fontFamily: fontHeading }}
                  />
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ color: accent }}
                >
                  <Plus size={22} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <Editable
                      as="p"
                      className="block max-w-xl pt-4 pl-12 text-sm md:text-base leading-relaxed opacity-80"
                      style={{ color: inkSecond }}
                      value={s.text}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <Editable
          as="blockquote"
          className="mt-16 block max-w-3xl text-xl sm:text-2xl leading-relaxed opacity-90 font-serif italic"
          style={{ color: ink, fontFamily: fontHeading }}
          value={
            props?.quote ||
            "“They listened first, then designed a home we never imagined possible.” — Daniel Foster"
          }
          onChange={(v) => onChange?.({ quote: v })}
        />
      </div>
    </section>
  );
}

export const Testimonials = ArchitectureStudio2Testimonials;
export default ArchitectureStudio2Testimonials;
