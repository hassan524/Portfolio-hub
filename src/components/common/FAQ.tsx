import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  q: string;
  a: string;
}

interface FAQProps {
  faqs: FAQItem[];
  label?: string;
  title?: string;
}

export function FAQ({ faqs, label = "FAQ", title = "Frequently asked questions" }: FAQProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative bg-transparent overflow-hidden">
      <div className="mx-auto max-w-4xl px-6 pt-24 md:pt-32">
        <div className="mb-10">
          <span className="text-xs tracking-[0.15em] uppercase text-ink-soft">{label}</span>
          <h2 className="mt-2 poppins font-normal text-2xl md:text-3xl tracking-[-0.01em]">
            {title}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="w-full rounded-xl border border-border bg-surface px-6"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="text-base font-medium text-white">
                    {item.q}
                  </span>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="shrink-0 text-ink-soft"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 text-[15px] text-ink-soft leading-relaxed max-w-2xl">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}