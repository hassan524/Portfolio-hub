import { motion } from "framer-motion";

export function Testimonials() {
  const quotes = [
    {
      q: "Went from blank page to live portfolio in an afternoon. Got two interviews the same week.",
      n: "Maya S.",
      r: "Product designer, Berlin",
      color: "from-orange-500 to-pink-500",
    },
    {
      q: "The templates are the best I've seen — actually opinionated, not just Tailwind starter kits.",
      n: "Jules T.",
      r: "Freelance developer, London",
      color: "from-blue-500 to-cyan-400",
    },
    {
      q: "I've been putting this off for two years. Portflu made it feel embarrassingly easy.",
      n: "Rin O.",
      r: "Illustrator, Osaka",
      color: "from-violet-500 to-fuchsia-500",
    },
    {
      q: "We moved our whole design team's portfolios over in a weekend. Nobody's gone back to Squarespace since.",
      n: "Devon K.",
      r: "Design lead, Toronto",
      color: "from-lime-400 to-green-700",
    },
    {
      q: "It's the first portfolio builder that didn't make me fight the CMS just to change a headline.",
      n: "Amara L.",
      r: "Motion designer, Lagos",
      color: "from-amber-400 to-orange-600",
    },
    {
      q: "Clients started asking who built my site. That never happened with my old Webflow template.",
      n: "Theo B.",
      r: "Photographer, Lisbon",
      color: "from-sky-400 to-indigo-500",
    },
  ];

  return (
    <section className="relative bg-transparent overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pt-24 md:pt-32">
        <h2 className="text-center poppins font-normal text-3xl md:text-5xl leading-[1.1] tracking-[-0.02em] max-w-3xl mx-auto">
          Loved by the people building with it.
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {quotes.map((q, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-lg border border-border bg-surface p-7 flex flex-col"
            >
              <blockquote className="text-[15px] leading-relaxed text-foreground/90 flex-1">
                "{q.q}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br ${q.color} text-xs font-semibold text-white`}
                >
                  {q.n.charAt(0)}
                </span>
                <div className="text-sm">
                  <div className="font-medium text-white">{q.n}</div>
                  <div className="text-ink-soft text-[13px]">{q.r}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}