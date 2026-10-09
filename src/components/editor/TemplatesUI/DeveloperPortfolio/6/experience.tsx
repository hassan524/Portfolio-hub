// @ts-nocheck
import { motion } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";

export function Experience({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const defaultItems = [
    { period: "2024 — Now", role: "Senior Full-Stack Engineer", company: "Lumen Labs", description: "Leading the core web platform team, migrating the flagship app to Next.js and cutting initial page load times by 60%.", tags: ["Next.js", "TypeScript", "AWS", "Turborepo"] },
    { period: "2022 — 2024", role: "Frontend Engineer", company: "Pixelforge Studio", description: "Built accessible design systems, component libraries, and client portals for high-growth fintech and healthtech products.", tags: ["React", "Tailwind", "Storybook", "GraphQL"] },
    { period: "2020 — 2022", role: "Web Developer", company: "Brightpath Agency", description: "Delivered 25+ client applications and marketing platforms with clean architectures, CMS workflows, and high performance.", tags: ["JavaScript", "Node.js", "PostgreSQL", "REST APIs"] },
  ];
  const rawItems = props?.items;
  const items = Array.isArray(rawItems) && rawItems.length > 0 ? rawItems : defaultItems;

  const set = (i: number, k: string, v: any) =>
    onChange?.({ items: items.map((x: any, j: number) => (j === i ? { ...x, [k]: v } : x)) });

  const fade = {
    initial: { opacity: 0, y: 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  return (
    <section id="experience" style={{ background: bgSecond, borderTop: `1px solid ${surface}` }}>
      <div className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
        {/* Header - Big Text */}
        <motion.div {...fade} className="mb-14 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] md:text-sm" style={{ color: inkSecond }}>
            <Editable as="span" value={props?.eyebrow || "Experience"} onChange={(v) => onChange?.({ eyebrow: v })} />
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl" style={{ color: ink }}>
            <Editable as="span" value={props?.title || "Where I've worked"} onChange={(v) => onChange?.({ title: v })} />
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-mono text-sm leading-relaxed md:text-base" style={{ color: inkSecond }}>
            <Editable
              as="span"
              value={props?.subtitle || "A timeline of engineering roles, platform leadership, and impact."}
              onChange={(v) => onChange?.({ subtitle: v })}
            />
          </p>
        </motion.div>

        {/* Timeline Container with Center Line */}
        <div className="relative">
          {/* Vertical Center Line for Desktop */}
          <div
            className="pointer-events-none absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-[2px] hidden md:block"
            style={{ background: surface }}
          />
          {/* Vertical Line for Mobile */}
          <div
            className="pointer-events-none absolute left-4 top-4 bottom-4 w-[2px] md:hidden"
            style={{ background: surface }}
          />

          <div className="space-y-12 md:space-y-16">
            {items.map((e: any, i: number) => {
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45 }}
                  className="relative flex flex-col md:flex-row items-start"
                >
                  {/* Center Dot (Desktop) */}
                  <span
                    className="hidden md:block absolute left-1/2 -translate-x-1/2 top-2 h-4 w-4 rounded-full z-10"
                    style={{
                      background: accent,
                      border: `3px solid ${bgSecond}`,
                      boxShadow: `0 0 12px ${accent}40`,
                    }}
                  />

                  {/* Left Dot (Mobile) */}
                  <span
                    className="md:hidden absolute left-[11px] top-2 h-3.5 w-3.5 rounded-full z-10"
                    style={{
                      background: accent,
                      border: `2px solid ${bgSecond}`,
                    }}
                  />

                  {/* Content Container */}
                  <div
                    className={`w-full pl-10 md:pl-0 md:w-1/2 ${
                      isEven
                        ? "md:pr-12 md:text-right md:mr-auto"
                        : "md:pl-12 md:text-left md:ml-auto"
                    }`}
                  >
                    {/* Period Badge - Big Text */}
                    <span
                      className="inline-block rounded-full px-4 py-1 font-mono text-xs md:text-sm font-medium tracking-wider"
                      style={{ border: `1px solid ${surface}`, color: inkSecond }}
                    >
                      <Editable as="span" value={e.period} onChange={(v) => set(i, "period", v)} />
                    </span>

                    {/* Role - Big Text */}
                    <h3 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl" style={{ color: ink }}>
                      <Editable as="span" value={e.role} onChange={(v) => set(i, "role", v)} />
                    </h3>

                    {/* Company - Big Text */}
                    <p className="mt-1 font-mono text-sm md:text-base font-semibold" style={{ color: accent }}>
                      <Editable as="span" value={e.company} onChange={(v) => set(i, "company", v)} />
                    </p>

                    {/* Description - Big Text */}
                    <p
                      className={`mt-4 font-mono text-sm md:text-base leading-relaxed ${
                        isEven ? "md:ml-auto" : "md:mr-auto"
                      } max-w-lg`}
                      style={{ color: inkSecond }}
                    >
                      <Editable as="span" value={e.description} onChange={(v) => set(i, "description", v)} />
                    </p>

                    {/* Tags - Big Text */}
                    <div
                      className={`mt-5 flex flex-wrap gap-2 ${
                        isEven ? "md:justify-end" : "md:justify-start"
                      }`}
                    >
                      {(e.tags || []).map((t: string, k: number) => (
                        <span
                          key={k}
                          className="rounded-full px-3.5 py-1 font-mono text-xs"
                          style={{ border: `1px solid ${surface}`, color: inkSecond }}
                        >
                          <Editable
                            as="span"
                            value={t}
                            onChange={(v) =>
                              set(
                                i,
                                "tags",
                                (e.tags || []).map((x: string, m: number) => (m === k ? v : x))
                              )
                            }
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export const DeveloperPortfolio6Experience = Experience;
export default Experience;