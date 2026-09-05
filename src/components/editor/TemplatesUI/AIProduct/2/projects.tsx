// @ts-nocheck
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";


export function AIProduct2Projects({ props, theme, onChange }: any) {
  const { ink, accent } = theme;

  const [tickerRef] = useEmblaCarousel({ loop: true, dragFree: true }, [
    Autoplay({ delay: 2000, stopOnInteraction: false })
  ]);

  function updateItem(i: number, patch: Partial<any>) {
    const next = [...props.items];
    next[i] = { ...next[i], ...patch };
    onChange({ items: next });
  }

  const techStack = ["React 19", "Next.js App Router", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "GraphQL", "Docker", "AI Integration", "Framer Motion CSS"];

  return (
    <section id="projects" className="max-w-7xl mx-auto px-6 py-28">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <Editable
            as="span"
            value="Selected Works"
            className="text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-lg inline-block mb-4"
            style={{ color: accent, background: `${accent}10` }}
          />
          <Editable
            as="h2"
            value={props.heading || "Featured Projects"}
            onChange={(v) => onChange({ heading: v })}
            className="text-3xl md:text-5xl font-extrabold tracking-tight"
            style={{ color: ink }}
          />
        </div>
        <Editable
          as="p"
          value="Engineered for performance, scale, and high-end aesthetic feedback."
          className="text-sm opacity-60 max-w-sm"
          style={{ color: ink }}
        />
      </div>

      {/* Auto-Moving Tech Ticker */}
      <div className="overflow-hidden py-4 mb-16 opacity-70" ref={tickerRef}>
        <div className="flex gap-4 items-center">
          {techStack.concat(techStack).map((tech, i) => (
            <div key={i} className="flex items-center gap-2 px-5 py-2.5 rounded-xl shrink-0 text-xs font-bold tracking-wider uppercase" style={{ background: `${ink}03`, color: ink }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }}></span>
              <Editable value={tech} />
            </div>
          ))}
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {props.items.map((item, i) => (
          <div
            key={i}
            className="p-8 sm:p-10 rounded-3xl flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1"
            style={{ background: `${ink}02` }}
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <Editable
                  as="span"
                  value={item.category || "Web App"}
                  onChange={(v) => updateItem(i, { category: v })}
                  className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-lg"
                  style={{ background: `${ink}05`, color: `${ink}70` }}
                />
                <div className="h-10 w-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: `${ink}05`, color: ink }}>
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
                className="text-sm sm:text-base leading-relaxed opacity-75"
                style={{ color: ink }}
              />
            </div>

            {item.tags && (
              <div className="mt-10 flex flex-wrap gap-2 pt-6" style={{ borderTop: `1px solid ${ink}06` }}>
                {item.tags.split("·").map((tag, t) => (
                  <Editable
                    key={t}
                    as="span"
                    value={tag.trim()}
                    className="px-3 py-1 rounded-md text-xs font-semibold opacity-80"
                    style={{ background: `${ink}04`, color: ink }}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}