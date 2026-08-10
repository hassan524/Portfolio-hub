import { motion } from "framer-motion";

export function Testimonials() {
  const quotes = [
    {
      q: "Went from blank page to live portfolio in an afternoon. Got two interviews the same week.",
      n: "Maya S.",
      r: "Product designer, Berlin",
    },
    {
      q: "The templates are the best I've seen — actually opinionated, not just Tailwind starter kits.",
      n: "Jules T.",
      r: "Freelance developer, London",
    },
    {
      q: "I've been putting this off for two years. Portflu made it feel embarrassingly easy.",
      n: "Rin O.",
      r: "Illustrator, Osaka",
    },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="max-w-2xl">
        <span className="text-xs tracking-[0.2em] uppercase text-ink-soft">Loved by makers</span>
        <h2 className="mt-3 font-display text-4xl md:text-6xl leading-[0.95]">
          Portfolios,<span className="italic text-gradient-brand"> finally shipped.</span>
        </h2>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {quotes.map((q, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-border bg-surface p-8 flex flex-col"
          >
            <blockquote className="font-display text-2xl leading-[1.15] flex-1">
              "{q.q}"
            </blockquote>
            <figcaption className="mt-6 text-sm">
              <div className="font-medium">{q.n}</div>
              <div className="text-ink-soft">{q.r}</div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}