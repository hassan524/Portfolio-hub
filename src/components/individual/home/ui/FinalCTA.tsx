import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

export function FinalCTA() {
  const { session } = useAppContext();
  const isLoggedIn = Boolean(session);

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pt-24 md:pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl bg-black overflow-hidden px-8 py-16 md:py-20 text-center"
        >
          {/* subtle gray connector lines, plain, no color */}
          <svg
            className="hidden md:block absolute top-1/2 left-0 -translate-y-1/2 -z-0 w-40 h-32 overflow-visible opacity-40"
            viewBox="0 0 160 128"
            fill="none"
          >
            <path
              d="M0 24 C 50 24, 60 60, 110 60 S 160 96, 160 96"
              stroke="oklch(1 0 0 / 0.15)"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
          <svg
            className="hidden md:block absolute top-1/2 right-0 -translate-y-1/2 -z-0 w-40 h-32 overflow-visible opacity-40"
            viewBox="0 0 160 128"
            fill="none"
          >
            <path
              d="M160 24 C 110 24, 100 60, 50 60 S 0 96, 0 96"
              stroke="oklch(1 0 0 / 0.15)"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>

          <div className="relative">
            <h2 className="poppins font-normal text-3xl md:text-5xl leading-[1.05] tracking-[-0.02em] max-w-2xl mx-auto">
              Your work deserves a{" "}
              <span className="bg-gradient-to-r from-lime-700 to-green-800 bg-clip-text text-transparent">
                better home
              </span>{" "}
              than a PDF.
            </h2>

            <p className="mt-5 text-ink-soft leading-relaxed max-w-md mx-auto">
              Pick a template, drop in your work, publish. Your portfolio can
              be live in the next ten minutes.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to={isLoggedIn ? "/templates" : "/auth/signup"}
                className="group relative inline-flex items-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-white overflow-hidden isolate transition-transform duration-300 hover:-translate-y-1 before:absolute before:inset-[-3px] before:-z-10 before:rounded-full before:animate-spin-slow before:[background:conic-gradient(from_0deg,transparent_0%,var(--primary)_25%,transparent_50%)] before:transition-opacity before:duration-300 group-hover:before:opacity-100 before:opacity-80 after:absolute after:inset-[2px] after:-z-10 after:rounded-full after:bg-black"
              >
                {isLoggedIn ? "Browse templates" : "Get started free"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <span className="text-xs text-ink-soft">
                No credit card required
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}