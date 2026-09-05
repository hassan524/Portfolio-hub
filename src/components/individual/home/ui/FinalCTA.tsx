import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import { ArrowRight } from "lucide-react";

const VIDEO_SRC = "/videos/product-demo.mp4";

export function Hero() {
  const { session } = useAppContext();
  const isLoggedIn = Boolean(session);

  return (
    <section className="relative bg-transparent overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 pt-20 md:pt-25">
        <div className="mx-auto flex flex-col gap-4 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-sm text-ink-soft bg-gradient-to-b from-white/5 to-transparent"
          >
            The portfolio builder creators love
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="poppins font-normal text-[32px] sm:text-[40px] md:text-[69px] leading-[1.05]  sm:leading-[0.95]  md:leading-[1] tracking-[-0.03em]"
          >
            <span className="block">Everything you need</span>
            <span className="block">
              to create stunning{" "}
              <span className="bg-gradient-to-r from-lime-700 to-green-800 bg-clip-text text-transparent">
                websites
              </span>
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="mx-auto max-w-2xl md:text-[18px] text-[15px] text-ink-soft leading-relaxed"
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
                className="group relative inline-flex items-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-white overflow-hidden isolate transition-transform duration-300 hover:-translate-y-1 before:absolute before:inset-[-3px] before:-z-10 before:rounded-full before:animate-spin-slow before:[background:conic-gradient(from_0deg,transparent_0%,var(--primary)_25%,transparent_50%)] before:transition-opacity before:duration-300 group-hover:before:opacity-100 before:opacity-80 after:absolute after:inset-[2px] after:-z-10 after:rounded-full after:bg-black"
              >
                Browse templates
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <Link
                to="/auth/signup"
                className="group relative inline-flex items-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-white overflow-hidden isolate transition-transform duration-300 hover:-translate-y-1 before:absolute before:inset-[-3px] before:-z-10 before:rounded-full before:animate-spin-slow before:[background:conic-gradient(from_0deg,transparent_0%,var(--primary)_25%,transparent_50%)] before:transition-opacity before:duration-300 group-hover:before:opacity-100 before:opacity-80 after:absolute after:inset-[2px] after:-z-10 after:rounded-full after:bg-black"
              >
                Get started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
          {/* Smooth curved connector lines, behind the card */}
          <svg
            className="hidden md:block absolute top-1/2 -left-32 -translate-y-1/2 -z-10 w-32 h-24 overflow-visible"
            viewBox="0 0 128 96"
            fill="none"
          >
            <path
              d="M0 20 C 40 20, 50 48, 90 48 S 128 76, 128 76"
              stroke="oklch(1 0 0 / 0.25)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          <svg
            className="hidden md:block absolute top-1/2 -right-32 -translate-y-1/2 -z-10 w-32 h-24 overflow-visible"
            viewBox="0 0 128 96"
            fill="none"
          >
            <path
              d="M128 20 C 88 20, 78 48, 38 48 S 0 76, 0 76"
              stroke="oklch(1 0 0 / 0.25)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          <div className="relative rounded-3xl border border-border bg-surface-elevated shadow-lift overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/aqz-KE-bpKQ"
              title="Big Buck Bunny"
              className="block w-full aspect-video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}