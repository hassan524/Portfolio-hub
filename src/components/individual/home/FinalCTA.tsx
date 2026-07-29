import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export function FinalCTA() {
  const { session } = useAppContext();
  const isLoggedIn = !!session;

  return (
    <section className="relative overflow-hidden border-t border-border">
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="relative mx-auto max-w-4xl px-6 py-28 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-5xl md:text-7xl leading-[0.95]"
        >
          {isLoggedIn ? (
            <>Your dashboard<br /><span className="italic text-gradient-brand">awaits.</span></>
          ) : (
            <>Your portfolio is<br /><span className="italic text-gradient-brand">one hour away.</span></>
          )}
        </motion.h2>
        <p className="mt-6 text-lg text-ink-soft">
          {isLoggedIn
            ? "Manage your portfolio, check analytics, and keep iterating."
            : "No credit card. No lock-in. Just pick a template and start."}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
          {isLoggedIn ? (
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3.5 text-sm font-medium shadow-lift"
            >
              Open Dashboard <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <Link
              to="/auth/signup"
              className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3.5 text-sm font-medium shadow-lift"
            >
              Get Started — it's free <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
