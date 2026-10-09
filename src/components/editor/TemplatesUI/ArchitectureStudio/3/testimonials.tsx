// @ts-nocheck
import { motion } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";
import { Award, Quote, Star } from "lucide-react";

export function ArchitectureStudio3Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#09090B";
  const ink = theme?.ink || "#FFFFFF";
  const fontBody = theme?.fontBody || "DM Sans";

  const reviews = [
    {
      ref: "CRITIQUE // 01",
      citation: "Nordic Architectural Review",
      quote:
        "AMB·TIOUS creates monumental civic forms that feel simultaneously ancient and fiercely contemporary. Their mastery of mass timber and raw concrete sets a new Scandinavian standard.",
      critic: "Dr. Kaisa Mikkola",
      title: "Senior Architectural Scholar, Aalto University",
      badge: "PRACTICE OF THE YEAR 2025",
    },
    {
      ref: "CRITIQUE // 02",
      citation: "Civic Trust International",
      quote:
        "The Arc Cultural Center has become a catalyst for waterfront regeneration. The acoustics, the daylight control, and the carbon-neutral envelope are nothing short of triumphant.",
      critic: "Henrik Lindegaard",
      title: "Jury President, European Urban Design",
      badge: "CIVIC GOLD MEDAL",
    },
    {
      ref: "CRITIQUE // 03",
      citation: "Patron Monograph",
      quote:
        "They took our complex topographic site and carved a home of astonishing stillness. In winter, the sunlight penetrates to the deepest core of the house.",
      critic: "Soren & Mette Haahr",
      title: "Patrons, Woodland Monolith Sanctuary",
      badge: "RESIDENTIAL CITATION 2024",
    },
  ];

  return (
    <section
      id="testimonials"
      className="w-full px-6 md:px-12 lg:px-16 py-24 md:py-36 transition-colors border-b"
      style={{
        backgroundColor: bg,
        borderColor: "rgba(255, 255, 255, 0.12)",
        color: ink,
        fontFamily: fontBody,
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/12">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/70 block mb-3">
              <Editable value="04 // CRITICAL APPRAISAL" />
            </span>
            <Editable
              as="h2"
              className="text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight leading-none text-white"
              value={props?.title || "Endorsements & monograph verdicts."}
              onChange={(v) => onChange?.({ title: v })}
            />
          </div>

          <div className="font-mono text-xs text-white/60">
            <span>PEER REVIEWS & AWARDS</span>
          </div>
        </div>

        {/* 3-Card Dark Brutalist Testimonial Grid with Framer Motion */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, idx) => (
            <motion.div
              key={r.ref}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.4)" }}
              className="p-8 border border-white/12 bg-[#0D0D10] flex flex-col justify-between transition-colors shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-6 border-b border-white/10 font-mono text-xs text-white/60">
                  <span className="font-bold text-white">{r.ref}</span>
                  <span className="uppercase text-[10px]">{r.citation}</span>
                </div>

                <Quote size={24} className="text-white/40 mb-6" />

                <Editable
                  as="blockquote"
                  className="text-base sm:text-lg leading-relaxed text-white/90 font-light mb-8 font-sans"
                  value={`“${r.quote}”`}
                />
              </div>

              <div className="pt-4 border-t border-white/10 font-mono text-xs">
                <span className="font-bold text-white block mb-1">{r.critic}</span>
                <span className="text-[11px] text-white/60 block mb-3">{r.title}</span>
                <span className="inline-block px-2.5 py-1 border border-white/30 text-[10px] font-bold text-white">
                  {r.badge}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Press Ribbon */}
        <div className="mt-14 p-8 border border-white/12 bg-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 font-mono text-xs">
          <div className="flex items-center gap-3">
            <Award size={20} className="text-white" />
            <span className="text-white font-bold tracking-wide">
              HELSINKI DESIGN PRIZE & MIES AWARD COMMENDED (2025)
            </span>
          </div>
          <span className="text-white/60 tracking-wider">
            ALL MONOGRAPHS DOCUMENTED UNDER ISO 14001
          </span>
        </div>
      </div>
    </section>
  );
}

export const Testimonials = ArchitectureStudio3Testimonials;
export default ArchitectureStudio3Testimonials;
