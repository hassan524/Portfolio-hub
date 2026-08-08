import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, LayoutTemplate, Timer } from "lucide-react";

const TAGLINES = [
  "Your work deserves more than a PDF.",
  "Built for creators who ship, not tinker.",
  "Design once. Look great everywhere.",
  "No code. No compromise.",
  "From idea to live site in minutes.",
];

export function LogoStrip() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % TAGLINES.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex items-center justify-between gap-6">
          {/* left label */}
          <div className="hidden sm:flex items-center gap-2 text-ink-soft shrink-0">
            <LayoutTemplate className="h-4 w-4" strokeWidth={1.75} />
            <span className="text-xs font-medium">150+ templates</span>
          </div>

          {/* center rotating tagline */}
          <div className="flex-1 flex flex-col items-center min-w-0">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand shadow-soft mb-6">
              <Sparkles className="h-4 w-4 text-white" strokeWidth={2.5} />
            </span>

            <div className="relative h-10 sm:h-12 flex items-center justify-center overflow-hidden w-full">
              <AnimatePresence mode="wait">
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-2xl sm:text-3xl italic text-ink text-center px-4"
                >
                  {TAGLINES[index]}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex items-center gap-1.5">
              {TAGLINES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Show tagline ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-6 bg-foreground" : "w-1.5 bg-border"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* right label */}
          <div className="hidden sm:flex items-center gap-2 text-ink-soft shrink-0">
            <Timer className="h-4 w-4" strokeWidth={1.75} />
            <span className="text-xs font-medium">5 min to publish</span>
          </div>
        </div>
      </div>
    </section>
  );
}