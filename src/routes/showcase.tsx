import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";
import { motion } from "framer-motion";

export const Route = createFileRoute("/showcase")({
  head: () => ({
    meta: [
      { title: "Showcase — PortfolioHub" },
      { name: "description", content: "Live portfolios built with PortfolioHub. See what's possible." },
    ],
  }),
  component: Showcase,
});

const SITES = [
  { name: "ari.kohen", role: "Product designer", template: "Atlas", accent: "oklch(0.72 0.18 40)" },
  { name: "julien.dev", role: "Rust engineer", template: "Signal", accent: "oklch(0.7 0.18 150)" },
  { name: "maya.studio", role: "Brand designer", template: "Orbit", accent: "oklch(0.65 0.2 20)" },
  { name: "rin.paints", role: "Illustrator", template: "Gallery", accent: "oklch(0.65 0.15 80)" },
  { name: "sky.writes", role: "Copywriter", template: "Meridian", accent: "oklch(0.55 0.14 40)" },
  { name: "kai.co", role: "Freelance PM", template: "North", accent: "oklch(0.5 0.05 260)" },
];

function Showcase() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-hero-glow">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <span className="text-xs tracking-[0.2em] uppercase text-ink-soft">Showcase</span>
          <h1 className="mt-3 font-display text-5xl md:text-7xl leading-[0.95]">
            Real portfolios,<br />
            <span className="italic text-gradient-brand">shipped last week.</span>
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SITES.map((s, i) => (
            <motion.a
              key={s.name}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-2xl overflow-hidden border border-border bg-card shadow-soft hover:shadow-lift transition-all"
            >
              <div
                className="aspect-[4/3] p-8"
                style={{ background: s.accent }}
              >
                <div className="text-white/70 text-[10px] tracking-[0.2em] uppercase">{s.template}</div>
                <div className="mt-8 text-white font-display text-4xl leading-[0.95]">{s.name}</div>
                <div className="text-white/80 font-display italic text-xl mt-1">{s.role}</div>
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <div className="font-medium">{s.name}.portfoliohub.app</div>
                  <div className="text-xs text-ink-soft">Built with {s.template}</div>
                </div>
                <span className="text-sm group-hover:underline">View →</span>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium"
          >
            Start your own →
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
