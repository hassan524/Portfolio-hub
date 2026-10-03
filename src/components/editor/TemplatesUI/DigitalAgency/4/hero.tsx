// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Sparkles, Laptop, ShieldCheck, Zap } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency4Hero({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#FFFFFF";
  const bgSecond = theme?.["bg-second"] || "#F8FAFC";
  const ink = theme?.ink || "#0A1128";
  const inkSecond = theme?.["ink-second"] || "#475569";
  const surface = theme?.surface || "#FFFFFF";
  const accent = theme?.accent || "#2563EB";

  const handleSmoothScroll = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="py-16 md:py-24 transition-colors relative overflow-hidden"
      style={{ backgroundColor: bg, color: ink }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Headline matching Image 5 */}
        <div className="text-center max-w-4xl mx-auto mb-14 relative">
          
          {/* Floating Blue Stamp Badge matching Image 5 ("Discover More ↗") */}
          <motion.a
            href="#services"
            onClick={(e) => handleSmoothScroll(e, "#services")}
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="hidden md:flex absolute -top-4 right-10 lg:right-20 w-24 h-24 rounded-full shadow-xl flex-col items-center justify-center text-white text-[11px] font-bold text-center leading-tight p-2 z-10 cursor-pointer"
            style={{ backgroundColor: accent }}
          >
            <span>Discover</span>
            <span>More</span>
            <ArrowUpRight size={14} className="mt-0.5" />
          </motion.a>

          {/* Monumental Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
            style={{ color: ink }}
          >
            <Editable
              value={props?.heroTitle || "Empower Your Digital Presence"}
              onChange={(v) => onChange?.({ heroTitle: v })}
            />
          </motion.h1>

          {/* Subtitle description matching Image 5 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed"
            style={{ color: inkSecond }}
          >
            <Editable
              value={
                props?.heroSubtitle ||
                "Comprehensive IT solutions designed to grow your business, streamline operations, and deliver transformative customer experiences."
              }
              onChange={(v) => onChange?.({ heroSubtitle: v })}
            />
          </motion.p>
        </div>

        {/* Central Team Workstation Image matching Image 5 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative max-w-5xl mx-auto rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl border aspect-[16/9] max-h-[560px]"
          style={{ borderColor: "rgba(10, 17, 40, 0.08)" }}
        >
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
            alt="CoderEyes IT Engineers Collaborating"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          {/* Floating Metric Pill */}
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-white/60 text-neutral-900 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl text-white flex items-center justify-center font-bold"
              style={{ backgroundColor: accent }}
            >
              <Zap size={20} />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">System Performance</div>
              <div className="text-base font-black tracking-tight">99.98% High-Availability</div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default DigitalAgency4Hero;
