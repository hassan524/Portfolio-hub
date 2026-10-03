// @ts-nocheck
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, TrendingUp, Layers, CheckCircle2 } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency3Hero({ props = {}, theme, onChange }: any) {
  const [toggleState, setToggleState] = useState(true);

  const bg = theme?.bg || "#F9F7F2";
  const bgSecond = theme?.["bg-second"] || "#F3EFE6";
  const ink = theme?.ink || "#1C1917";
  const inkSecond = theme?.["ink-second"] || "#78716C";
  const surface = theme?.surface || "#FFFFFF";
  const accent = theme?.accent || "#C2410C";

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
      className="py-16 md:py-24 transition-colors"
      style={{ backgroundColor: bg, color: ink }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Monumental Headline matching Image 4: "✦ OUR WO[pill switch]RK RESULT" */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap"
          >
            {/* Golden Star Glyph ✦ */}
            <span className="text-amber-500 text-3xl sm:text-4xl md:text-5xl select-none">
              ✦
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight uppercase font-sans flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
              <span>OUR</span>

              {/* "WORK" with interactive capsule switch in place of the "O" */}
              <span className="inline-flex items-center">
                <span>W</span>
                
                {/* Capsule Switch Pill inside the "O" */}
                <button
                  type="button"
                  onClick={() => setToggleState(!toggleState)}
                  className="mx-1.5 w-16 sm:w-20 md:w-24 h-8 sm:h-10 md:h-12 rounded-full p-1 border-2 transition-all cursor-pointer relative shadow-inner inline-flex items-center"
                  style={{
                    backgroundColor: toggleState ? "#1C1917" : "#E7E5E4",
                    borderColor: ink,
                  }}
                  title="Toggle Visual Mode"
                >
                  <motion.div
                    animate={{ x: toggleState ? "100%" : "0%" }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="w-6 sm:w-8 md:w-9 h-6 sm:h-8 md:h-9 rounded-full shadow-md flex items-center justify-center text-[10px]"
                    style={{
                      background: toggleState
                        ? "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)"
                        : "linear-gradient(135deg, #10B981 0%, #3B82F6 100%)",
                    }}
                  >
                    <span className="text-white font-bold select-none text-[9px]">✦</span>
                  </motion.div>
                </button>

                <span>RK</span>
              </span>

              <span>RESULT</span>
            </h1>
          </motion.div>
        </div>

        {/* Central High-Impact Visual matching Image 4 (Floral Digital Marketing Campaign) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl border mb-16 aspect-[16/9] max-h-[540px]"
          style={{ borderColor: "rgba(0,0,0,0.08)" }}
        >
          <img
            src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1600&q=80"
            alt="Florist Digital Marketing Campaign"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Floating Result Badge */}
          <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-white/50 text-neutral-900 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <TrendingUp size={20} />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">Campaign Impact</div>
              <div className="text-lg font-black tracking-tight">+70% Revenue ROI</div>
            </div>
          </div>
        </motion.div>

        {/* Case Narrative & Metadata Breakdown matching Image 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 pt-4">
          
          {/* Left Title: "Florist Digital Marketing Campaign" */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif leading-tight">
              <Editable
                value={props?.caseTitle || "Florist Digital Marketing Campaign"}
                onChange={(v) => onChange?.({ caseTitle: v })}
              />
            </h2>

            <div className="pt-2">
              <a
                href="#projects"
                onClick={(e) => handleSmoothScroll(e, "#projects")}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider underline underline-offset-4 hover:opacity-75 transition-opacity cursor-pointer"
                style={{ color: accent }}
              >
                <span>View Full Production Roadmap</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Center Metadata Columns matching Image 4 (SERVICES & RESULTS) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pb-8 border-b" style={{ borderColor: "rgba(0,0,0,0.1)" }}>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest block mb-2" style={{ color: accent }}>
                  SERVICES
                </span>
                <p className="text-sm font-semibold leading-relaxed" style={{ color: ink }}>
                  Digital Marketing Campaign, Floral Photography Direction, Brand Identity Design, E-Commerce Strategy
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest block mb-2" style={{ color: accent }}>
                  RESULTS
                </span>
                <p className="text-sm font-semibold leading-relaxed" style={{ color: ink }}>
                  Raised 70% ROI, 3.8x Average Order Value, and 12,000+ New High-LTV Botanical Subscriptions
                </p>
              </div>
            </div>

            {/* Dual Paragraph Narrative matching Image 4 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm leading-relaxed" style={{ color: inkSecond }}>
              <p>
                Our team of designers and visual strategists built an ethereal botanical visual universe rooted in seasonal bloom cycles. We developed an omnichannel campaign architecture that balanced visceral emotional storytelling with strict performance attribution models.
              </p>
              <p>
                From macro-lens floral cinematography to bespoke typographies and personalized retention flows, every touchpoint was engineered to position artisanal floral gifting as a luxury lifestyle ritual rather than a commodity transaction.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default DigitalAgency3Hero;
