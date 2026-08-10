import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import { ArrowRight, Sparkles } from "lucide-react";

const VIDEO_SRC = "/videos/product-demo.mp4";

export function Hero() {
  const { session } = useAppContext();
  const isLoggedIn = Boolean(session);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 pt-18 pb-18 md:pt-20 md:pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/10 px-4 py-1.5 text-xs text-ink-soft backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            The portfolio builder creators love
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="font-display text-[40px] leading-[1.05] sm:text-[40px] sm:leading-[0.95] md:text-[65px] md:leading-[1] tracking-[-0.03em]"
          >
            <span className="block">Everything you need</span>
            <span className="block italic text-gradient-brand font-instrument">to create stunning websites</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="mx-auto md:mt-8 mt-6 max-w-2xl md:text-[18px] text-[15px] text-ink-soft leading-relaxed"
          >
            Pick a template, customize it in minutes, and deploy anywhere with one click.
            Track real-time portfolio views and see how your work is performing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            {isLoggedIn ? (
              <Link
                to="/templates"
                className="group inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3.5 text-sm font-semibold text-secondary-foreground shadow-lift hover:opacity-90 transition-all"
              >
                Browse templates
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <Link
              to="/auth/signup"
              className="group inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3.5 text-sm font-semibold text-secondary-foreground shadow-lift transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_-8px_rgba(174,239,41,0.55)]"
            >
              Get started
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="relative mt-16 md:mt-24 mx-auto max-w-5xl"
        >
          <div className="relative rounded-3xl border border-border bg-surface-elevated shadow-lift overflow-hidden">
            <div className="flex items-center gap-1.5 border-b border-border px-4 py-3 bg-surface">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-[11px] text-ink-soft">portflu.app/dashboard</span>
            </div>
            <video
              src={VIDEO_SRC}
              className="block w-full h-auto min-h-[420px] object-cover bg-black"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
          <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-gradient-brand opacity-25 blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}