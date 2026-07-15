import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles, ChevronDown } from "lucide-react";

const NAV_LINKS = [
  { label: "Templates", to: "/templates" as const },
  { label: "About", to: "/about" as const },
  { label: "Help", to: "/help" as const },
  { label: "Contact", to: "/contact" as const },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl shadow-[0_1px_3px_oklch(0.2_0.02_260_/_0.06)]"
          : "border-b border-transparent bg-background/60 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-6">
        {/* ─── Logo ─── */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand shadow-soft transition-transform duration-300 group-hover:scale-105">
            <Sparkles className="h-4 w-4 text-white" strokeWidth={2.5} />
          </span>
          <span className="text-[17px] font-semibold tracking-tight">
            PortfolioHub
          </span>
        </Link>

        {/* ─── Desktop Nav ─── */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="relative px-3.5 py-2 text-[13.5px] font-medium text-ink-soft hover:text-ink transition-colors rounded-lg hover:bg-secondary/60"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ─── Desktop CTA ─── */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/auth/login"
            className="text-[13.5px] font-medium text-ink-soft hover:text-ink transition-colors px-3 py-2"
          >
            Sign in
          </Link>
          <Link
            to="/auth/signup"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-[13.5px] font-semibold text-background hover:opacity-90 transition-all shadow-soft hover:shadow-lift"
          >
            Get Started
            <svg
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>

        {/* ─── Mobile Hamburger ─── */}
        <button
          className="md:hidden p-2 -mr-2 rounded-lg hover:bg-secondary/60 transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* ─── Mobile Menu ─── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t border-border overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-1 bg-surface/95 backdrop-blur-xl">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-secondary/60 transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <div className="mt-3 pt-3 border-t border-border space-y-2">
                <Link
                  to="/auth/login"
                  onClick={() => setOpen(false)}
                  className="block text-center rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft hover:text-ink transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/auth/signup"
                  onClick={() => setOpen(false)}
                  className="block text-center rounded-full bg-foreground px-4 py-3 text-sm font-semibold text-background shadow-soft"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
