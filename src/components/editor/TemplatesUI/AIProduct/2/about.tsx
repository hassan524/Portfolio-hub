// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";
type Props = BlockComponentProps<any>;

export function AIProduct2About({ props, theme, onChange }: Props) {
  const { ink, accent } = theme;

  const experience = props.experience?.length > 0 ? props.experience : [
    { role: "Principal Engineer", co: "Acme Corp", yr: "2021—Present", desc: "Leading frontend architecture and core platform scaling." },
    { role: "Senior Developer", co: "TechFlow", yr: "2018—2021", desc: "Built robust microservices and design systems." }
  ];

  const updateExperience = (index: number, patch: Partial<(typeof experience)[0]>) => {
    const next = [...experience];
    next[index] = { ...next[index], ...patch };
    onChange({ experience: next });
  };

  const updateSkill = (index: number, value: string) => {
    const next = [...(props.skills ?? [])];
    next[index] = value;
    onChange({ skills: next });
  };

  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-28">
      <div className="grid lg:grid-cols-12 gap-16 items-start">
        <div className="lg:col-span-6">
          <Editable
            as="span"
            value={props.heading || "About Me"}
            onChange={(v) => onChange({ heading: v })}
            className="text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-lg inline-block mb-6"
            style={{ color: accent, background: `${accent}10` }}
          />
          <Editable
            as="h2"
            value="Engineering with purpose and precision."
            className="text-3xl md:text-5xl font-extrabold tracking-tight mb-8 leading-tight"
            style={{ color: ink }}
          />
          
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
              <Editable as="p" value="I focus on building performant web applications with clean architecture and exceptional user interfaces. Every line of code is written with scalability and readability in mind." />
            )}
          </div>

          {props.skills?.length > 0 && (
            <div className="mt-12 pt-8" style={{ borderTop: `1px solid ${ink}08` }}>
              <Editable as="h3" value="Expertise" className="text-xs font-bold uppercase tracking-widest mb-4 opacity-50" style={{ color: ink }} />
              <div className="flex flex-wrap gap-2.5">
                {props.skills.map((s, i) => (
                  <Editable
                    key={i}
                    as="span"
                    value={s}
                    onChange={(v) => updateSkill(i, v)}
                    className="px-4 py-2 text-xs font-semibold rounded-xl"
                    style={{ background: `${ink}04`, color: ink }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-6">
          <div className="p-8 sm:p-10 rounded-3xl" style={{ background: `${ink}02` }}>
            <Editable as="h3" value="Experience Timeline" className="text-xl font-bold mb-8" style={{ color: ink }} />
            <div className="space-y-8">
              {experience.map((item, i) => (
                <div key={i} className="p-6 rounded-2xl transition-all hover:translate-x-1" style={{ background: `${ink}02`, border: `1px solid ${ink}06` }}>
                  <div className="flex items-center justify-between mb-2">
                    <Editable
                      as="span"
                      value={item.yr}
                      onChange={(v) => updateExperience(i, { yr: v })}
                      className="text-xs font-bold px-2.5 py-1 rounded-md"
                      style={{ background: `${accent}15`, color: accent }}
                    />
                    <Editable
                      as="span"
                      value={item.co}
                      onChange={(v) => updateExperience(i, { co: v })}
                      className="text-xs font-semibold opacity-60"
                      style={{ color: ink }}
                    />
                  </div>
                  <Editable
                    as="h4"
                    value={item.role}
                    onChange={(v) => updateExperience(i, { role: v })}
                    className="text-lg font-bold mb-1"
                    style={{ color: ink }}
                  />
                  <Editable
                    as="p"
                    value={item.desc}
                    onChange={(v) => updateExperience(i, { desc: v })}
                    className="text-sm opacity-70"
                    style={{ color: ink }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}