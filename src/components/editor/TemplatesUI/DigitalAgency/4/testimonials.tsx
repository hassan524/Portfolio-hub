// @ts-nocheck
import { motion } from "framer-motion";
import { Star, ShieldCheck, Sparkles } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency4Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#FFFFFF";
  const bgSecond = theme?.["bg-second"] || "#F8FAFC";
  const ink = theme?.ink || "#0A1128";
  const inkSecond = theme?.["ink-second"] || "#475569";
  const surface = theme?.surface || "#FFFFFF";
  const accent = theme?.accent || "#2563EB";

  const reviews = [
    {
      author: "David Vance",
      role: "VP of Engineering, CloudScale",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      quote: "CoderEyes integrated with our core engineering pod seamlessly. Their cloud architecture handled our Black Friday load spike without a millisecond of delay.",
      rating: 5,
    },
    {
      author: "Rachel Lin",
      role: "Founder & CEO, HealthSync",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      quote: "Delivering a HIPAA-compliant healthcare application in four months seemed impossible until we engaged CoderEyes. Outstanding discipline.",
      rating: 5,
    },
    {
      author: "Alexander Meyer",
      role: "Head of Digital, AgroTech Global",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      quote: "Their team doesn't just write clean code; they understand enterprise unit economics and user workflow friction. Highly recommended.",
      rating: 5,
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-24 transition-colors"
      style={{ backgroundColor: bgSecond, color: ink }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700">
            <Sparkles size={14} />
            <span>Client Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: ink }}>
            <Editable
              value={props?.testimonialsTitle || "Validated by technical leaders worldwide"}
              onChange={(v) => onChange?.({ testimonialsTitle: v })}
            />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div
              key={r.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-3xl border flex flex-col justify-between"
              style={{
                backgroundColor: surface,
                borderColor: "rgba(10, 17, 40, 0.08)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.02)",
              }}
            >
              <div className="space-y-4">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(r.rating)].map((_, idx) => (
                    <Star key={idx} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: ink }}>
                  "{r.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 mt-8 pt-6 border-t" style={{ borderColor: "rgba(10, 17, 40, 0.06)" }}>
                <img
                  src={r.avatar}
                  alt={r.author}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-100"
                />
                <div>
                  <div className="text-sm font-bold tracking-tight" style={{ color: ink }}>
                    {r.author}
                  </div>
                  <div className="text-xs" style={{ color: inkSecond }}>
                    {r.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default DigitalAgency4Testimonials;
