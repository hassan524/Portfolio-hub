// @ts-nocheck
import { ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Experience({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";
  const roles = props?.roles || [
    { role: "Staff Software Engineer", company: "Northstar Studio", dates: "2021 — Present", location: "Remote · Product engineering", description: "Partner with design and product leads to shape new product bets, establish frontend foundations, and help a 14-person team deliver reliable features at a steady pace.", highlights: ["Technical direction", "Design systems", "Team mentorship"] },
    { role: "Senior Full-stack Engineer", company: "Goodkind Health", dates: "2018 — 2021", location: "Brooklyn, NY · Digital health", description: "Led a gradual rebuild of the care coordination platform, improving daily workflows for clinical teams while keeping the service available throughout migration.", highlights: ["Platform rebuild", "React + Rails", "Accessibility"] },
    { role: "Software Engineer", company: "Paperplane", dates: "2016 — 2018", location: "New York, NY · SaaS", description: "Built early collaboration features with a close-knit product team, working across the Rails application, internal tools, and customer-facing interface.", highlights: ["Early product", "Full-stack delivery", "Customer research"] },
  ];
  const updateRole = (index: number, key: string, value: any) => {
    onChange?.({ roles: roles.map((item: any, i: number) => i === index ? { ...item, [key]: value } : item) });
  };
  const updateHighlight = (roleIndex: number, highlightIndex: number, value: string) => {
    onChange?.({ roles: roles.map((item: any, i: number) => i === roleIndex ? { ...item, highlights: item.highlights.map((label: string, j: number) => j === highlightIndex ? value : label) } : item) });
  };

  return (
    <section id="experience" className="scroll-mt-24 py-24 md:py-32" style={{ backgroundColor: bgSecond }}>
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-[0.7fr_1.3fr] md:gap-24 md:px-10">
        <div className="md:sticky md:top-32 md:self-start">
          <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: accent }}>
            <Editable value={props?.eyebrow || "Where I’ve been"} onChange={(v) => onChange?.({ eyebrow: v })} />
          </p>
          <h2 className="mt-5 font-mono text-4xl leading-tight tracking-[-0.06em] md:text-5xl" style={{ color: ink }}>
            <Editable value={props?.headline || "Experience shaped by the work."} onChange={(v) => onChange?.({ headline: v })} />
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-7" style={{ color: inkSecond }}>
            <Editable value={props?.intro || "Different teams, different constraints — the same belief that good engineering starts with understanding the problem."} onChange={(v) => onChange?.({ intro: v })} />
          </p>
          <a href="#contact" className="mt-8 inline-flex items-center gap-2 text-sm transition-all hover:gap-3" style={{ color: accent }}>
            <Editable value={props?.ctaLabel || "Let’s work together"} onChange={(v) => onChange?.({ ctaLabel: v })} />
            <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="border-l pl-6 md:pl-10" style={{ borderColor: surface }}>
          {roles.map((item: any, index: number) => (
            <article key={`role-${index}`} className="relative border-b pb-9 pt-1 first:pt-0 last:border-b-0 last:pb-0" style={{ borderColor: surface }}>
              <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full border-2 md:-left-[47px]" style={{ borderColor: accent, backgroundColor: bgSecond }} aria-hidden="true" />
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-mono text-xl tracking-tight md:text-2xl" style={{ color: ink }}>
                    <Editable value={item.role} onChange={(v) => updateRole(index, "role", v)} />
                  </h3>
                  <p className="mt-2 text-sm font-medium" style={{ color: accent }}>
                    <Editable value={item.company} onChange={(v) => updateRole(index, "company", v)} />
                  </p>
                </div>
                <p className="shrink-0 font-mono text-xs" style={{ color: inkSecond }}>
                  <Editable value={item.dates} onChange={(v) => updateRole(index, "dates", v)} />
                </p>
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.13em]" style={{ color: inkSecond }}>
                <Editable value={item.location} onChange={(v) => updateRole(index, "location", v)} />
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-7" style={{ color: inkSecond }}>
                <Editable value={item.description} onChange={(v) => updateRole(index, "description", v)} />
              </p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                {item.highlights.map((label: string, highlightIndex: number) => (
                  <span key={`highlight-${index}-${highlightIndex}`} className="text-xs" style={{ color: ink }}>
                    <Editable value={label} onChange={(v) => updateHighlight(index, highlightIndex, v)} />
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
