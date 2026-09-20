// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { Star, Quote } from "lucide-react";
import type { BlockComponentProps } from "@/components/blocks/types";

type Props = BlockComponentProps<any>;

export function AIProduct3Testimonials({ props = {}, theme }: Props) {
  const bg = theme?.bg || "#140C12";
  const bgSecond = theme?.["bg-second"] || "#FFF5F8";
  const ink = theme?.ink || "#FFFFFF";
  const inkSecond = theme?.["ink-second"] || "#1E0C17";
  const surface = theme?.surface || "#231420";
  const accent = theme?.accent || "#FF3B76";

  const testimonials = [
    {
      quote: "WideApp AI completely transformed how our engineering squads manage inference latency and neural deployments. Absolute game changer.",
      author: "Sarah Jenkins",
      role: "VP of AI Engineering, Sceneland",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    },
    {
      quote: "The clean architecture and portfolio-ready components saved us months of development time. Highly recommend to any tech startup.",
      author: "Marcus Vance",
      role: "Chief Technology Officer, Nornole",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    },
    {
      quote: "Deploying autonomous workflows across our global teams has never been more seamless. The performance metrics speak for themselves.",
      author: "Elena Rostova",
      role: "Head of Product, Walker Tech",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 relative overflow-hidden transition-colors" style={{ backgroundColor: bg, color: ink }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span 
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-3 border shadow-sm" 
            style={{ 
              backgroundColor: `${surface}90`, 
              borderColor: `${accent}30`, 
              color: accent 
            }}
          >
            CLIENT TESTIMONIALS
          </span>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight" style={{ color: ink }}>
            Trusted by leading AI architects worldwide
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl border flex flex-col justify-between relative overflow-hidden backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group cursor-pointer"
              style={{ 
                backgroundColor: surface, 
                borderColor: `${accent}25`,
                boxShadow: "0 15px 35px rgba(0,0,0,0.3)"
              }}
            >
              <div className="absolute top-6 right-6 opacity-20 transition-transform duration-300 group-hover:scale-110" style={{ color: accent }}>
                <Quote className="h-10 w-10" />
              </div>

              <div>
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Editable as="p" className="text-sm sm:text-base leading-relaxed mb-8 italic" style={{ color: ink }}>
                  "{t.quote}"
                </Editable>
              </div>

              <div className="flex items-center gap-3.5 pt-5 border-t" style={{ borderColor: `${accent}20` }}>
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-11 h-11 rounded-full object-cover border shadow-sm"
                  style={{ borderColor: `${accent}35` }}
                />
                <div>
                  <h4 className="text-xs font-bold" style={{ color: ink }}>{t.author}</h4>
                  <p className="text-[11px] font-medium" style={{ color: accent }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}