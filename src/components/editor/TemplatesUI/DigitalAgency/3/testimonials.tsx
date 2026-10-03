// @ts-nocheck
import { motion } from "framer-motion";
import { Star, Sparkles, Quote } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency3Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#F9F7F2";
  const bgSecond = theme?.["bg-second"] || "#F3EFE6";
  const ink = theme?.ink || "#1C1917";
  const inkSecond = theme?.["ink-second"] || "#78716C";
  const surface = theme?.surface || "#FFFFFF";
  const accent = theme?.accent || "#C2410C";

  const reviews = [
    {
      author: "Margot Laurent",
      role: "Creative Director, Maison Botanica",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      quote: "Their four-stage production blueprint brought absolute structure to our chaotic seasonal launch. The +70% ROI spoke for itself.",
    },
    {
      author: "Henri Beaumont",
      role: "Managing Partner, Solis Lighting",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
      quote: "Studio Editorial understands how to translate luxury craftsmanship into digital spaces that feel tactile, serene, and commercially unstoppable.",
    },
    {
      author: "Clara Vane",
      role: "Founder, Céramique Paris",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      quote: "Every single asset was delivered with exquisite typographical restraint and editorial precision. They are our permanent creative agency.",
    },
  ];

  return (
    <section
      className="py-24 transition-colors"
      style={{ backgroundColor: bgSecond, color: ink }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200">
            <span>✦</span>
            <span>Client Perspectives</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif">
            <Editable
              value={props?.testimonialsTitle || "Trusted by discerning founders & creative heads"}
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
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-8 rounded-3xl border flex flex-col justify-between"
              style={{
                backgroundColor: surface,
                borderColor: "rgba(0,0,0,0.08)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.02)",
              }}
            >
              <div className="space-y-4">
                <span className="text-amber-500 text-2xl font-serif">“</span>
                <p className="text-sm font-serif italic leading-relaxed" style={{ color: ink }}>
                  {r.quote}
                </p>
              </div>

              <div className="flex items-center gap-4 mt-8 pt-6 border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <img
                  src={r.avatar}
                  alt={r.author}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-stone-200"
                />
                <div>
                  <div className="text-sm font-bold font-serif tracking-tight" style={{ color: ink }}>
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

export default DigitalAgency3Testimonials;
