import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { SiteLayout } from "@/components/common/Layout";
import { toast } from "sonner";
import { Check, Zap } from "lucide-react";
import { useTypewriter } from "@/utils/type";

const INTRO_TEXT =
  "PortfolioHub Pro — every template, your own domain, and room for 10 live portfolios. You're purchasing one plan, $5 a month, cancel anytime.";

const FEATURES = [
  "10 portfolios (vs 1 on free)",
  "All templates — now & future",
  "Deploy to Vercel + Netlify",
  "Custom domain",
  "AI content assist",
  "Priority support",
  "No PortfolioHub branding",
];

export function PricingPage() {
  const navigate = useNavigate();
  const [typing, setTyping] = useState(false);
  const typed = useTypewriter(INTRO_TEXT, 22, typing);
  const isDone = typed.length === INTRO_TEXT.length;

  useEffect(() => {
    const t = setTimeout(() => setTyping(true), 200);
    return () => clearTimeout(t);
  }, []);

  function handleCta() {
    toast.success("Payment coming soon! We'll notify you when billing goes live.", {
      duration: 4000,
    });
  }

  return (
    <SiteLayout>
      {/* ── Small top intro (typewriter) ─────────────────────────────── */}
      <section className="bg-background">
        <div className="mx-auto max-w-xl px-6 pt-16 pb-4 text-center md:pt-20">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold uppercase tracking-[0.18em] text-accent"
          >
            Pricing
          </motion.p>

          <p className="mt-4 min-h-[3.5rem] text-base leading-relaxed text-ink-soft md:text-lg">
            {typed}
            <span
              className={`ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[2px] bg-accent align-middle ${
                isDone ? "animate-pulse" : ""
              }`}
            />
          </p>
        </div>
      </section>

      {/* ── Single pricing card ──────────────────────────────────────── */}
      <section className="mx-auto max-w-lg px-5 pb-20 pt-6 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl border border-accent/30 bg-accent/5 p-6 shadow-lift sm:p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-ink-soft">
              Pro Plan
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
              <Zap className="h-3 w-3" />
              Most popular
            </span>
          </div>

          <div className="mt-6 flex items-end gap-1.5">
            <span className="text-gradient-brand font-display text-6xl font-bold">$5</span>
            <span className="mb-2 text-base text-ink-soft">/month</span>
          </div>
          <p className="mt-1.5 text-sm text-ink-soft">Billed monthly. Cancel anytime.</p>

          <button
            onClick={handleCta}
            className="mt-7 w-full rounded-2xl bg-foreground py-4 text-base font-bold text-background transition-opacity hover:opacity-90"
          >
            Get started — $5/mo
          </button>
          <p className="mt-2.5 text-center text-xs text-ink-soft">
            No credit card required to sign up
          </p>

          <div className="my-7 border-t border-border" />

          <ul className="space-y-3.5">
            {FEATURES.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.4 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 text-sm text-ink"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Check className="h-3 w-3 stroke-[3]" />
                </span>
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </section>
    </SiteLayout>
  );
}