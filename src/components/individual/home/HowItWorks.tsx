import { motion } from "framer-motion";
import { Layout, Wand, Globe } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      n: "01",
      t: "Pick a template",
      d: "Browse hand-designed templates. Every one is production-ready.",
      icon: Layout,
    },
    {
      n: "02",
      t: "Drop in your info",
      d: "Fill out simple fields — projects, experience, links. We handle the layout.",
      icon: Wand,
    },
    {
      n: "03",
      t: "Publish, share, iterate",
      d: "One click gets you a live link. Update anytime, connect a custom domain.",
      icon: Globe,
    },
  ];

  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="max-w-2xl">
          <span className="text-xs tracking-[0.2em] uppercase text-ink-soft">How it works</span>
          <h2 className="mt-3 font-display text-4xl md:text-6xl leading-[0.95]">
            From blank page to live link in{" "}
            <span className="italic text-gradient-brand">under 10 minutes.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative rounded-2xl border border-border bg-surface-elevated p-8 shadow-soft"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-foreground text-background">
                  <s.icon className="h-5 w-5" />
                </span>
                <span className="font-display text-3xl italic text-ink-soft">{s.n}</span>
              </div>
              <h3 className="mt-6 text-xl font-medium">{s.t}</h3>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
