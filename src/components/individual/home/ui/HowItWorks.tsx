import { motion } from "framer-motion";
import { Layout, Wand, Globe, BarChart3 } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      n: "01",
      t: "Choose your template",
      d: "Explore 120+ professionally designed templates and pick the style that fits your personal brand.",
      icon: Layout,
    },
    {
      n: "02",
      t: "Edit everything your way",
      d: "Customize your text, images, sections, colors, fonts, and layout with a live preview as you build.",
      icon: Wand,
    },
    {
      n: "03",
      t: "Deploy wherever you want",
      d: "Choose your deployment platform, publish your portfolio, connect a custom domain, and manage your live site from one place.",
      icon: Globe,
    },
    {
      n: "04",
      t: "Track and manage your site",
      d: "Check your portfolio status, view stats, update your content, change your domain, and keep improving your site anytime.",
      icon: BarChart3,
    },
  ];

  return (
    <section className="relative bg-transparent overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pt-24 md:pt-32">
        <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
          <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs tracking-[0.15em] uppercase text-ink-soft bg-gradient-to-b from-white/5 to-transparent">
            How it works
          </span>
          <h2 className="poppins font-normal text-4xl md:text-6xl leading-[0.95] tracking-[-0.02em]">
            Build your portfolio,{" "}
            <span className="bg-gradient-to-r from-lime-700 to-green-800 bg-clip-text text-transparent">
              go live in minutes.
            </span>
          </h2>
        </div>

        <div className="relative mt-20">
          {/* Connecting timeline line — desktop only */}
          <div className="hidden lg:block absolute top-[22px] left-0 right-0 h-px">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
              className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent origin-left"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-2xl border border-border bg-black p-7 shadow-soft transition-all duration-300 hover:border-white/25 hover:-translate-y-1.5 hover:shadow-lift"
              >
                {/* Step dot on the timeline */}
                <span className="hidden lg:block absolute -top-[42px] left-7 h-2.5 w-2.5 rounded-full bg-white/40 ring-4 ring-background transition-colors duration-300 group-hover:bg-lime-400" />

                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-white/5 text-white transition-all duration-300 group-hover:bg-white/10 group-hover:scale-105">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="poppins text-3xl text-white/15 font-semibold transition-colors duration-300 group-hover:text-white/25">
                    {s.n}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-medium text-white">{s.t}</h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}