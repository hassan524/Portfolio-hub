// @ts-nocheck
import { motion } from "framer-motion";
import { Star, Quote, Sparkles } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency1Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#F7F8F9";
  const bgSecond = theme?.["bg-second"] || "#FFFFFF";
  const ink = theme?.ink || "#111827";
  const inkSecond = theme?.["ink-second"] || "#6B7280";
  const surface = theme?.surface || "#FFFFFF";
  const accent = theme?.accent || "#87D53C";

  const reviews = [
    {
      author: "Elena Rostova",
      role: "VP of Product, NeoSphere",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      quote: "DesignSource transformed our SaaS onboarding with 3D clay elements that made complex data infrastructure instantly intuitive. Our demo requests doubled in 3 weeks.",
      rating: 5,
    },
    {
      author: "Marcus Chen",
      role: "Founder, Kinfolk Beverages",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      quote: "Their tactile 3D renders gave our direct-to-consumer packaging an irresistible physical presence on screen. Absolutely worth every single dollar.",
      rating: 5,
    },
    {
      author: "Sarah Lindqvist",
      role: "Head of Brand, Kinetix AI",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      quote: "No endless corporate meetings or generic templates. They delivered a fully functional 3D brand system on Figma and WebGL in record time.",
      rating: 5,
    },
  ];

  return (
    <section
      className="py-24 transition-colors"
      style={{ backgroundColor: bgSecond, color: ink }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: "#F0FDF4", color: "#16A34A" }}>
            <Sparkles size={14} />
            <span>Client Voices</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            <Editable
              value={props?.testimonialsTitle || "Loved by daring founders and creative directors."}
              onChange={(v) => onChange?.({ testimonialsTitle: v })}
            />
          </h2>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <motion.div
              key={rev.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-8 rounded-3xl border flex flex-col justify-between"
              style={{
                backgroundColor: surface,
                borderColor: "rgba(0,0,0,0.07)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
              }}
            >
              <div className="space-y-4">
                <div className="flex gap-1">
                  {[...Array(rev.rating)].map((_, idx) => (
                    <Star key={idx} size={16} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed italic" style={{ color: ink }}>
                  "{rev.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 mt-8 pt-6 border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-100"
                />
                <div>
                  <div className="text-sm font-bold tracking-tight" style={{ color: ink }}>
                    {rev.author}
                  </div>
                  <div className="text-xs" style={{ color: inkSecond }}>
                    {rev.role}
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

export default DigitalAgency1Testimonials;
