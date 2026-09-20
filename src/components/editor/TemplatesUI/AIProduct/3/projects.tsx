// @ts-nocheck
import { ArrowRight, Sparkles } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";

type Props = BlockComponentProps<any>;

export function AIProduct3Projects({ props = {}, theme }: Props) {
  const bg = theme?.bg || "#140C12";
  const bgSecond = theme?.["bg-second"] || "#FFF5F8";
  const ink = theme?.ink || "#FFFFFF";
  const inkSecond = theme?.["ink-second"] || "#1E0C17";
  const surface = theme?.surface || "#231420";
  const accent = theme?.accent || "#FF3B76";

  const stats = [
    { value: "87%", label: "Users say that WideApp AI helps them collaborate more efficiently." },
    { value: "36%", label: "Increase in overall productivity for small or large teams." },
    { value: "95%", label: "Users say that WideApp AI helps them stay seamlessly connected." },
    { value: "500k", label: "Active AI inferences served weekly across global deployments." },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 relative overflow-hidden transition-colors" style={{ backgroundColor: bg, color: ink }}>
      
      {/* Subtle Background Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] opacity-15 rounded-full blur-[140px] pointer-events-none" 
        style={{ background: accent }} 
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span 
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-3 border shadow-sm" 
            style={{ 
              backgroundColor: `${surface}90`, 
              borderColor: `${accent}30`, 
              color: accent 
            }}
          >
            <Sparkles className="h-3 w-3" />
            SCALE WITH AUTHORITY
          </span>
          <Editable
            as="h2"
            className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight"
            style={{ color: ink }}
          >{props?.title || "Reaching New Heights, Without the Infrastructure Roadblocks"}</Editable>
          <button
            className="px-6 py-3 rounded-xl text-xs font-bold border backdrop-blur-md transition-all duration-300 hover:scale-105 cursor-pointer shadow-sm"
            style={{ 
              backgroundColor: `${surface}B3`, 
              borderColor: `${accent}30`, 
              color: ink 
            }}
          >
            See All Achievements
          </button>
        </div>

        {/* Stats Grid with Modern Glass Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {stats.map((s, i) => (
            <div 
              key={i} 
              className="p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between group cursor-pointer"
              style={{ 
                backgroundColor: surface, 
                borderColor: `${accent}25`,
                boxShadow: "0 10px 30px rgba(0,0,0,0.35)"
              }}
            >
              <Editable 
                as="div" 
                className="text-5xl font-extrabold tracking-tight mb-4 transition-transform duration-300 group-hover:scale-105" 
                style={{ 
                  color: accent,
                  textShadow: `0 0 25px ${accent}45`
                }}
              >
                {s.value}
              </Editable>
              <Editable 
                as="p" 
                className="text-xs leading-relaxed font-normal" 
                style={{ color: ink, opacity: 0.8 }}
              >
                {s.label}
              </Editable>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}