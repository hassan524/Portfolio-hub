import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useAppContext } from "@/context/AppContext";
import { ArrowRight, Check, Wand } from "lucide-react";
import { useTypewriter } from "@/hooks/use-typewriter";

export function Hero() {
  const { session } = useAppContext();
  const isLoggedIn = !!session;
  const line1 = "The portfolio you'll ";
  const line2 = "actually finish.";
  const { displayed: typed1, done: done1 } = useTypewriter(line1, 45, 500);
  const { displayed: typed2, done: done2 } = useTypewriter(
    line2,
    50,
    500 + line1.length * 45 + 100
  );

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="mx-auto max-w-4xl text-center">

          <h1 className="font-display text-[52px] leading-[0.95] md:text-[104px] md:leading-[0.92] tracking-[-0.03em]">
            {/* Line 1 — each letter smoothly joins */}
            {typed1.split("").map((char, i) => (
              <motion.span
                key={`l1-${i}`}
                initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.35,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                style={{ display: "inline-block", whiteSpace: "pre" }}
              >
                {char}
              </motion.span>
            ))}
            {/* Line 2 — italic gradient */}
            <span className="italic text-gradient-brand">
              {typed2.split("").map((char, i) => (
                <motion.span
                  key={`l2-${i}`}
                  initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  style={{ display: "inline-block", whiteSpace: "pre" }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
            {/* Blinking cursor */}
            {!done2 && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-[3px] md:w-[5px] h-[48px] md:h-[90px] bg-foreground ml-1 align-middle rounded-full"
              />
            )}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: done2 ? 1 : 0, y: done2 ? 0 : 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto mt-8 max-w-2xl text-lg md:text-xl text-ink-soft leading-relaxed"
          >
            PortfolioHub is a free portfolio maker with premium, hand-designed templates.
            Pick one, drop in your info, publish a live link. No design skills, no code,
            no monthly fees.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: done2 ? 1 : 0, y: done2 ? 0 : 20 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            {isLoggedIn ? (
              <Link
                to="/dashboard"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background shadow-lift hover:shadow-soft transition-all"
              >
                Go to Dashboard
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <Link
                to="/auth/signup"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background shadow-lift hover:shadow-soft transition-all"
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
            <Link
              to="/templates"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-6 py-3.5 text-sm font-medium hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300 shadow-soft"
            >
              Browse templates
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: done2 ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex items-center justify-center gap-6 text-xs text-ink-soft"
          >
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5" /> Free forever</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5" /> No credit card</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5" /> Publish in 5 min</span>
          </motion.div>
        </div>

        {/* Hero device / mock */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
          className="relative mt-16 md:mt-24 mx-auto max-w-5xl"
        >
          <div className="relative rounded-3xl border border-border bg-surface-elevated shadow-lift overflow-hidden">
            <div className="flex items-center gap-1.5 border-b border-border px-4 py-3 bg-surface">
              <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.85_0.1_25)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.9_0.12_85)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.85_0.1_150)]" />
              <span className="ml-3 text-[11px] text-ink-soft">portfoliohub.app/you</span>
            </div>
            <div className="grid grid-cols-12 min-h-[420px]">
              <div className="col-span-3 border-r border-border bg-surface p-4 hidden md:block">
                <div className="text-[10px] uppercase tracking-widest text-ink-soft">Editor</div>
                {[
                  { l: "Hero", a: true },
                  { l: "About" },
                  { l: "Projects" },
                  { l: "Experience" },
                  { l: "Contact" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className={`mt-2 flex items-center justify-between rounded-md px-2.5 py-2 text-sm ${
                      s.a ? "bg-foreground text-background" : "text-ink hover:bg-secondary"
                    }`}
                  >
                    <span>{s.l}</span>
                    <span className="text-[10px] opacity-60">•••</span>
                  </div>
                ))}
                <div className="mt-6 rounded-lg border border-dashed border-border p-3 text-[11px] text-ink-soft">
                  Auto-saved just now
                </div>
              </div>
              <div className="col-span-12 md:col-span-9 p-8 md:p-12 relative">
                <div className="text-[10px] tracking-[0.25em] uppercase text-ink-soft">
                  Portfolio · 2026
                </div>
                <h3 className="mt-4 font-display text-4xl md:text-6xl leading-[0.95]">
                  Ari Kohen
                </h3>
                <p className="mt-1 font-display italic text-xl md:text-2xl text-ink-soft">
                  Independent product designer, currently in Lisbon.
                </p>
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {[
                    { c: "oklch(0.72 0.18 40)", t: "Field Notes app" },
                    { c: "oklch(0.85 0.14 85)", t: "Nomad Bank rebrand" },
                    { c: "oklch(0.55 0.12 260)", t: "Tessera editor" },
                  ].map((p, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -4 }}
                      className="aspect-[4/5] rounded-xl p-3 flex flex-col justify-between text-white text-xs shadow-soft"
                      style={{ background: p.c }}
                    >
                      <span>0{i + 1}</span>
                      <span className="font-medium">{p.t}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                  className="absolute -right-3 top-24 hidden md:flex items-center gap-2 rounded-full bg-foreground text-background px-3 py-2 text-xs shadow-lift"
                >
                  <Wand className="h-3.5 w-3.5" />
                  Live preview
                </motion.div>
              </div>
            </div>
          </div>
          <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-gradient-brand opacity-20 blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}
