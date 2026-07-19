import { motion } from "framer-motion";
import { Palette, Zap, Globe, BarChart3, Shield, Sparkles } from "lucide-react";

export function FeatureGrid() {
  const feats = [
    { icon: Palette, t: "Editable design tokens", d: "Change one color and the whole site updates. Fonts, spacing, radii — all yours." },
    { icon: Zap, t: "Blistering fast pages", d: "Static-first output with edge caching. Your portfolio loads in under 200ms." },
    { icon: Globe, t: "Custom domains, free", d: "Bring your own domain or use portfolio.hub — SSL included, always." },
    { icon: BarChart3, t: "Built-in analytics", d: "Privacy-friendly page views, click-throughs, and referrer data." },
    { icon: Shield, t: "Password protection", d: "Ship a version to hiring managers before making it public." },
    { icon: Sparkles, t: "Auto-generated OG images", d: "Every link you share looks intentional — no more broken previews." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="max-w-2xl">
        <span className="text-xs tracking-[0.2em] uppercase text-ink-soft">Features</span>
        <h2 className="mt-3 font-display text-4xl md:text-6xl leading-[0.95]">
          Everything you need.<br />
          <span className="italic text-ink-soft">Nothing you don't.</span>
        </h2>
      </div>
      <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
        {feats.map((f, i) => (
          <motion.div
            key={f.t}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group bg-background p-8 hover:bg-surface transition-colors"
          >
            <f.icon className="h-6 w-6" strokeWidth={1.5} />
            <h3 className="mt-6 text-lg font-medium">{f.t}</h3>
            <p className="mt-2 text-sm text-ink-soft leading-relaxed">{f.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
