// @ts-nocheck
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function AIProduct2Projects({ props = { items: [] }, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const [tickerRef] = useEmblaCarousel({ loop: true, dragFree: true }, [
    Autoplay({ delay: 2000, stopOnInteraction: false })
  ]);

  function updateItem(i: number, patch: Partial<any>) {
    const next = [...(props?.items || [])];
    next[i] = { ...next[i], ...patch };
    onChange?.({ items: next });
  }

  const techStack = ["React 19", "Next.js App Router", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "GraphQL", "Docker", "AI Integration", "Framer Motion CSS"];

  return (
    <section id="projects" className="w-full px-6 py-28 transition-colors" style={{ backgroundColor: bg, color: ink }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <Editable
              as="span"
              value="Selected Works"
              className="text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-lg inline-block mb-4"
              style={{ color: accent, background: `${accent}15` }}
            />
            <Editable
              as="h2"
              value={props?.heading || "Featured Projects"}
              onChange={(v) => onChange?.({ heading: v })}
              className="text-3xl md:text-5xl font-extrabold tracking-tight"
              style={{ color: ink }}
            />
          </div>
          <Editable
            as="p"
            value="Engineered for performance, scale, and high-end aesthetic feedback."
            className="text-sm max-w-sm"
            style={{ color: ink, opacity: 0.75 }}
          />
        </div>

        {/* Auto-Moving Tech Ticker */}
        <div className="overflow-hidden py-4 mb-16" ref={tickerRef}>
          <div className="flex gap-4 items-center">
            {techStack.concat(techStack).map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl shrink-0 text-xs font-bold tracking-wider uppercase border"
                style={{ backgroundColor: surface, color: ink, borderColor: surface }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }}></span>
                <Editable value={tech} />
              </div>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {(props?.items || []).map((item, i) => (
            <div
              key={i}
              className="p-8 sm:p-10 rounded-3xl flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 border"
              style={{ backgroundColor: surface, borderColor: surface }}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <Editable
                    as="span"
                    value={item.category || "Web App"}
                    onChange={(v) => updateItem(i, { category: v })}
                    className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-lg"
                    style={{ backgroundColor: `${bg}90`, color: accent, border: `1px solid ${surface}` }}
                  />
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ backgroundColor: `${bg}90`, color: ink, border: `1px solid ${surface}` }}>
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>

                <Editable
                  as="h3"
                  value={item.title}
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                  onPointerDown={(e: React.PointerEvent) => e.stopPropagation()}
                  onChange={(v) => updateItem(i, { title: v })}
                  className="font-extrabold text-2xl sm:text-3xl mb-3 tracking-tight"
                  style={{ color: ink }}
                />

                <Editable
                  as="p"
                  value={item.desc}
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                  onPointerDown={(e: React.PointerEvent) => e.stopPropagation()}
                  onChange={(v) => updateItem(i, { desc: v })}
                  className="text-sm sm:text-base leading-relaxed"
                  style={{ color: ink, opacity: 0.75 }}
                />
              </div>

              {item.tags && (
                <div className="mt-10 flex flex-wrap gap-2 pt-6 border-t" style={{ borderColor: surface }}>
                  {item.tags.split("·").map((tag, t) => (
                    <Editable
                      key={t}
                      as="span"
                      value={tag.trim()}
                      className="px-3 py-1 rounded-md text-xs font-semibold"
                      style={{ backgroundColor: `${bg}90`, color: ink, border: `1px solid ${surface}` }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}