// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function CreativePortfolio2Projects({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#FFF4F8";
  const ink = theme?.ink || "#2B1720";
  const inkSecond = theme?.["ink-second"] || "#7A5362";
  const surface = theme?.surface || "rgba(83, 29, 51, 0.14)";
  const accent = theme?.accent || "#F03D87";

  const projects = props?.projects || [
    {
      title: "PwC",
      year: "2026",
      type: "Product / Experience",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85",
      text: "A visual identity and design system for digital enterprise solutions."
    },
    {
      title: "Barclays",
      year: "2025",
      type: "Digital service / Systems",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=85",
      text: "A graphic language with enough confidence to let the work speak first."
    },
    {
      title: "Equiniti",
      year: "2025",
      type: "Product / Transformation",
      image: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1200&q=85",
      text: "A design system built to help teams scale complex workflows seamlessly."
    }
  ];

  return (
    <section
      id="projects"
      className="border-b px-5 py-24 sm:px-8 lg:px-12 transition-colors font-serif"
      style={{
        backgroundColor: bg,
        color: ink,
        borderColor: surface,
      }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b" style={{ borderColor: surface }}>
          <div>
            <span className="font-mono text-3xl font-bold" style={{ color: accent }}>02 /</span>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] mt-3" style={{ color: accent }}>What I do</p>
            <h2 className="mt-4 text-[clamp(2.6rem,7vw,6rem)] font-bold tracking-tight leading-[0.9]">
              Making products and services <em style={{ color: accent }}>better</em> for everyone.
            </h2>
          </div>
          <p className="max-w-md font-sans text-base sm:text-lg leading-relaxed" style={{ color: inkSecond }}>
            Whether that is helping a client improve their experience or creating something new for a better life, I design systems that help people do their best work.
          </p>
        </div>

        {/* Project Cards with Real Images */}
        <div className="mt-20 space-y-24">
          {projects.map((p: any, i: number) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
            >
              <div className="lg:col-span-1 font-mono text-3xl font-bold" style={{ color: accent }}>
                0{i + 1}
              </div>

              <div className="lg:col-span-7">
                <div
                  className="group relative aspect-[16/10] overflow-hidden rounded-3xl shadow-xl border"
                  style={{ borderColor: surface }}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span
                    className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: bg, color: ink }}
                  >
                    {p.year}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-4">
                <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: accent }}>
                  {p.type}
                </p>
                <h3 className="text-4xl sm:text-5xl font-bold tracking-tight">
                  <Editable
                    value={p.title}
                    onChange={(v) =>
                      onChange?.({
                        projects: projects.map((x: any, idx: number) =>
                          idx === i ? { ...x, title: v } : x
                        ),
                      })
                    }
                  />
                </h3>
                <p className="font-sans text-base leading-relaxed" style={{ color: inkSecond }}>
                  <Editable
                    value={p.text}
                    onChange={(v) =>
                      onChange?.({
                        projects: projects.map((x: any, idx: number) =>
                          idx === i ? { ...x, text: v } : x
                        ),
                      })
                    }
                  />
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-semibold pt-4"
                  style={{ color: accent }}
                >
                  Case Study <ArrowUpRight size={15} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
