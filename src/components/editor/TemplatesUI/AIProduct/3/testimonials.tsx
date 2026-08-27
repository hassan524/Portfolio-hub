import { Editable } from "@/components/editor/ui/Editable";
import { Star, Quote } from "lucide-react";
import type { BlockComponentProps } from "@/components/blocks/types";

export function AIProduct3Testimonials({ theme }: BlockComponentProps<any>) {
  const darkInk = theme?.ink || "#1A0D14";
  const accent = theme?.accent || "#E11D48";

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
    <section className="py-24 px-4 sm:px-6 text-white relative overflow-hidden" style={{ background: darkInk }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-[10px] font-extrabold uppercase tracking-widest block mb-2" style={{ color: accent }}>
            CLIENT TESTIMONIALS
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Trusted by leading AI architects worldwide
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl border border-white/10 flex flex-col justify-between relative overflow-hidden bg-white/[0.02] backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group"
            >
              <div className="absolute top-6 right-6 opacity-10 text-white transition-transform duration-300 group-hover:scale-110">
                <Quote className="h-10 w-10" />
              </div>

              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Editable
                  as="p"
                  value={t.quote}
                  onChange={() => {}}
                  className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal mb-8 relative z-10"
                />
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-10 h-10 rounded-full object-cover border border-white/20 transition-transform duration-300 group-hover:scale-105"
                />
                <div>
                  <Editable as="div" value={t.author} onChange={() => {}} className="text-xs font-bold text-white" />
                  <Editable as="div" value={t.role} onChange={() => {}} className="text-[10px] text-white/50" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}