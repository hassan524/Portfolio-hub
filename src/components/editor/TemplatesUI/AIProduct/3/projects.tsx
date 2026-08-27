import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";
import type { ProjectsProps } from "@/types/builder.schema";

type Props = BlockComponentProps<ProjectsProps>;

export function AIProduct3Projects({ props, theme }: Props) {
  const darkInk = theme?.ink || "#1A0D14";
  const accent = theme?.accent || "#E11D48";

  const stats = [
    { value: "87%", label: "Users say that WideApp AI helps them collaborate more efficiently." },
    { value: "36%", label: "Increase in overall productivity for small or large teams." },
    { value: "95%", label: "Users say that WideApp AI helps them stay seamlessly connected." },
    { value: "500k", label: "Active AI inferences served weekly across global deployments." },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 text-white relative overflow-hidden" style={{ background: darkInk }}>
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-extrabold uppercase tracking-widest block mb-3" style={{ color: accent }}>
            SCALE WITH AUTHORITY
          </span>
          <Editable
            as="h2"
            value={props.title || "Reaching New Heights, Without the Infrastructure Roadblocks"}
            onChange={() => {}}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6"
          />
          <button className="px-5 py-2.5 rounded-xl text-xs font-bold border border-white/20 text-white bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105">
            See All Achievements
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-8 pb-12 border-t border-white/10">
          {stats.map((s, i) => (
            <div key={i} className="space-y-3 transition-transform duration-300 hover:-translate-y-1">
              <Editable as="div" value={s.value} onChange={() => {}} className="text-5xl font-extrabold text-white tracking-tight" />
              <Editable as="p" value={s.label} onChange={() => {}} className="text-xs text-white/70 leading-relaxed font-normal" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}