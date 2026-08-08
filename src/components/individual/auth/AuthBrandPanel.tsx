// AuthBrandPanel.tsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Check } from "lucide-react";

const FEATURES = [
  "Free forever — no credit card required",
  "Premium templates included",
  "Publish in under 5 minutes",
  "Custom domain support",
];

const AVATARS = [
  { initials: "E.K", color: "oklch(0.72 0.18 40)" },
  { initials: "M.S", color: "oklch(0.55 0.18 260)" },
  { initials: "J.T", color: "oklch(0.82 0.16 75)" },
  { initials: "R.O", color: "oklch(0.62 0.15 25)" },
];

export function AuthBrandPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
      className="hidden lg:flex lg:w-[48%] relative overflow-hidden flex-col justify-between p-12 xl:p-16"
    >
      <div className="absolute inset-0 bg-foreground" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(800px 600px at 20% 80%, oklch(0.72 0.18 40 / 0.4), transparent 60%), radial-gradient(600px 400px at 80% 20%, oklch(0.82 0.16 75 / 0.3), transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10">
        <Link to="/" className="inline-flex items-center gap-2.5 group">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand shadow-soft">
            <Sparkles className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
          </span>
          <span className="text-xl font-semibold tracking-tight text-background">PortfolioHub</span>
        </Link>
      </div>

      <div className="relative z-10 max-w-lg">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-display text-[44px] xl:text-[56px] leading-[0.95] text-background"
        >
          Build something{" "}
          <span
            className="italic"
            style={{
              background: "linear-gradient(135deg, oklch(0.72 0.18 40), oklch(0.82 0.16 75) 60%, oklch(0.88 0.13 95))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            you're proud of.
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-6 text-lg text-background/60 leading-relaxed"
        >
          Join thousands of creators who use PortfolioHub to showcase their work with premium, hand-designed templates. No code, no design skills needed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-10 space-y-4"
        >
          {FEATURES.map((item) => (
            <div key={item} className="flex items-center gap-3">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-brand">
                <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
              </span>
              <span className="text-sm text-background/70">{item}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="relative z-10"
      >
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {AVATARS.map((avatar, i) => (
              <div
                key={i}
                className="h-8 w-8 rounded-full border-2 border-foreground flex items-center justify-center text-[10px] font-semibold text-background/70"
                style={{ background: avatar.color }}
              >
                {avatar.initials}
              </div>
            ))}
          </div>
          <div>
            <div className="text-sm font-medium text-background/80">12,000+ creators</div>
            <div className="text-xs text-background/40">already building with PortfolioHub</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}