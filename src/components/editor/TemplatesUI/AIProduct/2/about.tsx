import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";
import type { AboutProps } from "@/types/builder.schema";

type Props = BlockComponentProps<AboutProps>;

export function AIProduct2About({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;

  const experience = props.experience?.length > 0 ? props.experience : [
    { role: "Principal Engineer", co: "Acme Corp", yr: "2021—Present", desc: "Leading frontend architecture and core platform scaling." },
    { role: "Senior Developer", co: "TechFlow", yr: "2018—2021", desc: "Built robust microservices and design systems." }
  ];

  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-28">
      <div className="grid lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-6">
          <span className="text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-lg inline-block mb-6" style={{ color: accent, background: `${accent}10` }}>
            {props.heading || "About Me"}
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 leading-tight" style={{ color: ink }}>
            Engineering with purpose and precision.
          </h2>
          
          <div className="space-y-5 text-base md:text-lg leading-relaxed opacity-80" style={{ color: ink }}>
            {props.paragraphs?.length > 0 ? (
              props.paragraphs.map((p, i) => (
                <Editable
                  key={i}
                  as="p"
                  value={p}
                  onChange={(v) => {
                    const next = [...(props.paragraphs ?? [])];
                    next[i] = v;
                    onChange({ paragraphs: next });
                  }}
                />
              ))
            ) : (
              <p>I focus on building performant web applications with clean architecture and exceptional user interfaces. Every line of code is written with scalability and readability in mind.</p>
            )}
          </div>

          {props.skills?.length > 0 && (
            <div className="mt-12 pt-8" style={{ borderTop: `1px solid ${ink}08` }}>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-4 opacity-50" style={{ color: ink }}>Expertise</h3>
              <div className="flex flex-wrap gap-2.5">
                {props.skills.map((s, i) => (
                  <span key={i} className="px-4 py-2 text-xs font-semibold rounded-xl" style={{ background: `${ink}04`, color: ink }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-6">
          <div className="p-8 sm:p-10 rounded-3xl" style={{ background: `${ink}02` }}>
            <h3 className="text-xl font-bold mb-8" style={{ color: ink }}>Experience Timeline</h3>
            <div className="space-y-8">
              {experience.map((item, i) => (
                <div key={i} className="p-6 rounded-2xl transition-all hover:translate-x-1" style={{ background: `${ink}02`, border: `1px solid ${ink}06` }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md" style={{ background: `${accent}15`, color: accent }}>{item.yr}</span>
                    <span className="text-xs font-semibold opacity-60" style={{ color: ink }}>{item.co}</span>
                  </div>
                  <h4 className="text-lg font-bold mb-1" style={{ color: ink }}>{item.role}</h4>
                  <p className="text-sm opacity-70" style={{ color: ink }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}