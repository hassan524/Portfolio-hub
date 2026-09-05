import { motion } from "framer-motion";
import {
  Rocket,
  Search,
  Image,
  Palette,
  Blocks,
  Settings2,
} from "lucide-react";

export function FeatureGrid() {
const feats = [
  {
    icon: Rocket,
    t: "Deploy with Vercel or Netlify",
    d: "Choose where your portfolio lives and deploy it directly through your preferred platform.",
  },
  {
    icon: Search,
    t: "Built-in SEO controls",
    d: "Customize your page title, description, keywords, and social metadata to make your portfolio easier to discover.",
  },
  {
    icon: Image,
    t: "Images & logos",
    d: "Upload your own images, profile photos, project visuals, and brand logos directly into your portfolio.",
  },
  {
    icon: Palette,
    t: "Customize every style",
    d: "Change themes, colors, fonts, spacing, borders, and other visual styles to match your personal brand.",
  },
  {
    icon: Blocks,
    t: "Build with blocks",
    d: "Add, remove, reorder, and customize sections to create a portfolio that fits your work.",
  },
  {
    icon: Settings2,
    t: "Fine-tune your portfolio",
    d: "Control the details of your site and make precise changes without rebuilding everything from scratch.",
  },
];

  return (
    <section className="relative bg-transparent overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pt-24 md:pt-32">
        <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
          <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs tracking-[0.15em] uppercase text-ink-soft bg-gradient-to-b from-white/5 to-transparent">
            Features
          </span>
          <h2 className="poppins font-normal text-4xl md:text-6xl leading-[0.95] tracking-[-0.02em]">
            Everything you need.{" "}
            <span className="bg-gradient-to-r from-lime-700 to-green-800 bg-clip-text text-transparent">
              Nothing you don't.
            </span>
          </h2>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 md:grid-cols-3">
          {feats.map((f, i) => (
            <motion.div
              key={f.t}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-background p-8 overflow-hidden transition-colors duration-300 hover:bg-surface"
            >
              {/* top accent line on hover */}
              <span className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-lime-400 to-green-800 transition-all duration-500 group-hover:w-full" />

              <span className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-white/5 text-ink-soft transition-all duration-300 group-hover:text-lime-400 group-hover:border-lime-400/30 group-hover:bg-white/10">
                <f.icon className="h-5 w-5" strokeWidth={1.5} />
              </span>

              <h3 className="mt-6 text-lg font-medium text-white">{f.t}</h3>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">{f.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}