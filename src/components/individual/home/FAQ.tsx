import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "How much does PortfolioHub cost?",
    a: "PortfolioHub is a paid product with simple monthly or annual pricing — check the Pricing page for current plans. There's no permanent free tier, but you can preview templates and the editor before subscribing.",
  },
  {
    q: "Can I get a refund?",
    a: "Yes. If you're not happy within the first 7 days of a paid plan, contact support and we'll refund you in full, no questions asked. After that window, refunds are handled case-by-case.",
  },
  {
    q: "Do I need to know how to code?",
    a: "Not at all. The editor is form-based for structured content and supports markdown for writing. No HTML or CSS required to build or customize your site.",
  },
  {
    q: "Can I use my own custom domain?",
    a: "Yes, custom domains are supported on paid plans. Point your DNS to PortfolioHub and SSL is issued and renewed automatically — no manual certificate setup.",
  },
  {
    q: "Can I switch templates after publishing?",
    a: "Yes. Your content is stored independently from the template, so you can swap designs anytime without losing or re-entering your work.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, cancel whenever you like from your account settings. You'll keep access until the end of your current billing period — no lock-in contracts.",
  },
  {
    q: "What happens to my site if I cancel?",
    a: "Your portfolio is taken offline when your plan ends, but your content isn't deleted immediately — resubscribing restores it. You can also export your data before canceling.",
  },
  {
    q: "Is support included?",
    a: "Yes, email support is included on every paid plan. Response times are typically within one business day.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section className="mx-auto max-w-4xl px-6 py-24 md:py-32">
      <div className="text-center">
        <span className="text-xs tracking-[0.2em] uppercase text-ink-soft">FAQ</span>
        <h2 className="mt-3 font-display text-4xl md:text-6xl leading-[0.95]">
          Questions, <span className="italic text-gradient-brand">answered.</span>
        </h2>
      </div>

      <div className="mt-14 divide-y divide-border border-y border-border">
        {FAQS.map((f, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={f.q} className="py-2">
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-center justify-between gap-6 py-4 text-left text-lg font-medium text-ink transition-colors hover:text-ink/80"
              >
                {f.q}
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                    isOpen
                      ? "border-primary text-primary"
                      : "border-border text-ink-soft"
                  }`}
                >
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg leading-none"
                  >
                    +
                  </motion.span>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 pr-14 text-ink-soft leading-relaxed">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}