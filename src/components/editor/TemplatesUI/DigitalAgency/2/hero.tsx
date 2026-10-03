// @ts-nocheck
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Star, Sparkles, TrendingUp, CheckCircle, Calendar, ChevronRight, Clock, ArrowRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency2Hero({ props = {}, theme, onChange }: any) {
  // Current active showcase mode inside the hero
  const [activeStage, setActiveStage] = useState(0);

  // Dynamic theme colors - NO hardcoded tailwind color classes!
  const bg = theme?.bg || theme?.bgPrimary || "#0C0C0E";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || "#16161A";
  const text = theme?.text || theme?.ink || "#FFFFFF";
  const textSecond = theme?.["text-second"] || theme?.["ink-second"] || theme?.textSecond || "#9CA3AF";
  const surface = theme?.surface || "#1F1F24";
  const accent = theme?.accent || "#CCFF00"; // high-energy lime accent from Image 1

  const stages = [
    { id: 0, label: "Overview" },
    { id: 1, label: "About Advisor" },
    { id: 2, label: "Top 3 Offerings" },
    { id: 3, label: "Case Results" },
    { id: 4, label: "Book Appointment" },
  ];

  // Top 3 Things Offered (no cards!)
  const topOfferings = [
    {
      num: "01",
      title: "Revenue & Capital Scaling Blueprint",
      subtitle: "Unlocking enterprise valuation",
      desc: "Comprehensive market penetration, unit economics optimization, and international expansion frameworks built for high-growth venture-backed ventures.",
      stat: "3.4x ARR Lift",
    },
    {
      num: "02",
      title: "Digital Product & AI Transformation",
      subtitle: "Modernizing legacy architectures",
      desc: "Bridging human experience design with rapid AI model integration, automated microservices, and sub-second transaction pipelines.",
      stat: "<90 Days Deployment",
    },
    {
      num: "03",
      title: "Executive Advisory & Board Governance",
      subtitle: "Confidential principal counsel",
      desc: "One-on-one bi-weekly sparring with founders and executive pods on organizational design, M&A prep, and high-stakes negotiations.",
      stat: "16+ Years Experience",
    },
  ];

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden py-8 sm:py-12 transition-colors"
      style={{ backgroundColor: bg, color: text }}
    >
      {/* 1. Golden Sunbeam Light Flare in top-left corner matching Image 1 */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 pointer-events-none rounded-full blur-[100px] opacity-70 z-0"
        style={{
          background: "radial-gradient(circle, #F59E0B 0%, rgba(245, 158, 11, 0) 70%)",
        }}
      />

      {/* 2. Giant Watermark Background Text: "GROW" matching Image 1 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <span
          className="text-[20vw] font-black uppercase tracking-tighter opacity-[0.03] leading-none"
          style={{ color: text }}
        >
          GROW
        </span>
      </div>

      {/* Main Interactive Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-1 flex flex-col justify-center">
        
        {/* Top Stage Bar: Allows switching what the hero showcases */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b overflow-x-auto" style={{ borderColor: `${textSecond}25` }}>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: accent }} />
            <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: textSecond }}>
              Interactive Experience
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {stages.map((stg) => (
              <button
                key={stg.id}
                type="button"
                onClick={() => setActiveStage(stg.id)}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                style={{
                  backgroundColor: activeStage === stg.id ? text : "transparent",
                  color: activeStage === stg.id ? bg : textSecond,
                  border: `1px solid ${activeStage === stg.id ? text : `${textSecond}30`}`,
                }}
              >
                {stg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Animated Content: Changes views without refreshing or jumping */}
        <AnimatePresence mode="wait">
          
          {/* STAGE 0: The Exact Hero from Image 1 */}
          {activeStage === 0 && (
            <motion.div
              key="stage-0"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Monumental Headline matching Image 1: "We Help You To Grow Your Business" */}
              <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]">
                  <Editable
                    value={props?.heroHeadline || "We Help You To Grow Your Business"}
                    onChange={(v) => onChange?.({ heroHeadline: v })}
                  />
                </h1>
              </div>

              {/* Central Composition matching Image 1 */}
              <div className="relative max-w-5xl mx-auto flex items-center justify-center min-h-[460px] sm:min-h-[520px]">
                
                {/* 1. Center Portrait: Smiling advisor with crossed arms */}
                <div className="relative z-10 w-72 sm:w-80 md:w-96 aspect-[3/4] flex items-end justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80"
                    alt="Growth Advisor"
                    className="w-full h-full object-cover rounded-3xl shadow-2xl filter contrast-105"
                  />
                  <div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{
                      background: `linear-gradient(to top, ${bg} 0%, transparent 40%)`,
                    }}
                  />
                </div>

                {/* 2. Top-Left Floating Widget: "Appointment - Book now" */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => setActiveStage(4)}
                  className="absolute top-8 left-0 sm:left-4 md:left-12 z-20 flex items-center gap-3 p-2.5 pr-5 rounded-2xl cursor-pointer shadow-xl backdrop-blur-md transition-transform hover:scale-105"
                  style={{
                    backgroundColor: surface,
                    border: `1px solid ${textSecond}30`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold"
                    style={{ backgroundColor: text, color: bg }}
                  >
                    <ArrowUpRight size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-tight" style={{ color: text }}>
                      Appointment
                    </div>
                    <div className="text-[11px] leading-tight" style={{ color: textSecond }}>
                      Book now
                    </div>
                  </div>
                </motion.div>

                {/* 3. Bottom-Left Floating Widget: High-energy Lime Badge matching Image 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-6 left-0 sm:left-2 md:left-6 z-20 p-5 rounded-3xl shadow-2xl max-w-[240px] sm:max-w-[270px]"
                  style={{
                    backgroundColor: accent,
                    color: "#000000",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl sm:text-3xl font-black tracking-tight">10.2k+</div>
                    <button
                      type="button"
                      onClick={() => setActiveStage(3)}
                      className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shadow-md"
                      style={{ backgroundColor: "#000000", color: accent }}
                      aria-label="View verified metrics"
                    >
                      <ArrowRight size={15} />
                    </button>
                  </div>
                  <div className="text-xs font-bold mb-3 opacity-90 leading-tight">
                    Active client around the world
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-black/15">
                    <div className="flex -space-x-2">
                      <img
                        className="w-6 h-6 rounded-full object-cover ring-2 ring-lime-400"
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                        alt="Client avatar"
                      />
                      <img
                        className="w-6 h-6 rounded-full object-cover ring-2 ring-lime-400"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                        alt="Client avatar"
                      />
                      <img
                        className="w-6 h-6 rounded-full object-cover ring-2 ring-lime-400"
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
                        alt="Client avatar"
                      />
                    </div>
                    <div className="flex items-center gap-1 text-xs font-black">
                      <span>★</span>
                      <span>5 Stars</span>
                    </div>
                  </div>
                </motion.div>

                {/* 4. Top-Right Floating Widget: Doodle Arrow & Stats matching Image 1 */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="absolute top-6 right-0 sm:right-4 md:right-12 z-20 space-y-2 text-right"
                >
                  {/* Green Hand-Drawn Doodle Arrow SVG matching Image 1 */}
                  <div className="flex justify-end mb-1">
                    <svg width="48" height="38" viewBox="0 0 60 50" fill="none">
                      <path
                        d="M10 40 C 25 10, 45 45, 50 15 M 50 15 L 42 16 M 50 15 L 48 24"
                        stroke={accent}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div className="flex items-center gap-6 justify-end">
                    <div>
                      <div className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: text }}>
                        97%
                      </div>
                      <div className="text-[11px] font-semibold" style={{ color: textSecond }}>
                        Revenue growth
                      </div>
                    </div>

                    <div>
                      <div className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: text }}>
                        16Y
                      </div>
                      <div className="text-[11px] font-semibold" style={{ color: textSecond }}>
                        Experience
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* 5. Bottom-Right Floating Widget: Dark Rounded Box matching Image 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-6 right-0 sm:right-2 md:right-8 z-20 p-6 rounded-3xl shadow-2xl max-w-[260px] sm:max-w-[300px] backdrop-blur-xl"
                  style={{
                    backgroundColor: surface,
                    border: `1px solid ${textSecond}30`,
                  }}
                >
                  <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: accent }}>
                    Personal Investment / Trials
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: textSecond }}>
                    Since 2011, we've guided hundreds of venture-backed founders and global teams on their digital transformation journey.
                  </p>
                  <div className="mt-4 pt-3 flex items-center justify-between text-xs" style={{ borderTop: `1px solid ${textSecond}20` }}>
                    <span style={{ color: text }}>Verified Track Record</span>
                    <button
                      type="button"
                      onClick={() => setActiveStage(2)}
                      className="font-bold underline cursor-pointer"
                      style={{ color: accent }}
                    >
                      Top 3 Offers →
                    </button>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          )}

          {/* STAGE 1: About the Advisor (Editorial Story Split - NO BOX CARDS!) */}
          {activeStage === 1 && (
            <motion.div
              key="stage-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-5xl mx-auto py-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5 relative">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                    alt="Growth Advisor Portrait"
                    className="rounded-3xl w-full aspect-[4/5] object-cover shadow-2xl"
                    style={{ border: `1px solid ${textSecond}30` }}
                  />
                  <div
                    className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl backdrop-blur-md"
                    style={{ backgroundColor: `${bg}dd`, border: `1px solid ${textSecond}25` }}
                  >
                    <div className="text-sm font-bold" style={{ color: text }}>David Harrison</div>
                    <div className="text-xs" style={{ color: accent }}>Managing Principal & Advisor</div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: `${accent}20`, color: accent }}>
                    <span>✦</span>
                    <span>16 Years in Enterprise Growth</span>
                  </div>

                  <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                    "Sustainable scale is never accidental; it is engineered through ruthless prioritization."
                  </h2>

                  <p className="text-sm sm:text-base leading-relaxed" style={{ color: textSecond }}>
                    For over a decade and a half, I have partnered directly with CEOs, series-A to pre-IPO founders, and corporate boards. We strip away superficial vanity metrics and reconstruct the operational engines that actually compound revenue.
                  </p>

                  <div className="pt-4 flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setActiveStage(2)}
                      className="px-6 py-3 rounded-full text-xs font-bold tracking-wide transition-all shadow-md cursor-pointer flex items-center gap-2"
                      style={{ backgroundColor: accent, color: "#000000" }}
                    >
                      <span>Explore What I Offer</span>
                      <ArrowRight size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveStage(0)}
                      className="text-xs font-semibold underline cursor-pointer"
                      style={{ color: textSecond }}
                    >
                      ← Back to Overview
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STAGE 2: Top 3 Things He Offers (Full-Bleed Interactive Rows - NO BOX CARDS!) */}
          {activeStage === 2 && (
            <motion.div
              key="stage-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-5xl mx-auto py-8 space-y-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b" style={{ borderColor: `${textSecond}25` }}>
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest block mb-2" style={{ color: accent }}>
                    Core Focus
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                    The 3 Pillars I Personally Deliver
                  </h2>
                </div>
                <p className="text-xs sm:text-sm max-w-sm" style={{ color: textSecond }}>
                  Every engagement is directly led without junior intermediaries or outsourced execution.
                </p>
              </div>

              {/* 3 Full-Bleed Strips (No Cards!) */}
              <div className="space-y-4">
                {topOfferings.map((offering) => (
                  <div
                    key={offering.num}
                    className="p-6 sm:p-8 rounded-2xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-pointer"
                    style={{
                      backgroundColor: surface,
                      border: `1px solid ${textSecond}25`,
                    }}
                    onClick={() => setActiveStage(4)}
                  >
                    <div className="flex items-start gap-6">
                      <span className="text-2xl sm:text-3xl font-black font-mono" style={{ color: accent }}>
                        {offering.num}
                      </span>
                      <div className="space-y-1 max-w-xl">
                        <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: textSecond }}>
                          {offering.subtitle}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight" style={{ color: text }}>
                          {offering.title}
                        </h3>
                        <p className="text-xs sm:text-sm leading-relaxed" style={{ color: textSecond }}>
                          {offering.desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center md:flex-col items-end justify-between gap-2 border-t md:border-t-0 pt-4 md:pt-0" style={{ borderColor: `${textSecond}20` }}>
                      <span className="text-xs font-mono font-bold px-3 py-1 rounded-full" style={{ backgroundColor: `${accent}25`, color: accent }}>
                        {offering.stat}
                      </span>
                      <div className="text-xs font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform" style={{ color: text }}>
                        <span>Book Briefing</span>
                        <ArrowRight size={13} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STAGE 3: Case Results (Metric Canvas - NO BOX CARDS!) */}
          {activeStage === 3 && (
            <motion.div
              key="stage-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-5xl mx-auto py-8 space-y-8"
            >
              <div className="pb-6 border-b" style={{ borderColor: `${textSecond}25` }}>
                <span className="text-xs font-mono font-bold uppercase tracking-widest block mb-2" style={{ color: accent }}>
                  Proven Multipliers
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  High-Impact Transformation Records
                </h2>
              </div>

              {/* Verified Metrics Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-6">
                <div>
                  <div className="text-5xl font-black tracking-tight mb-2" style={{ color: accent }}>
                    +340%
                  </div>
                  <div className="text-sm font-bold" style={{ color: text }}>SaaS Enterprise ARR</div>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: textSecond }}>
                    Redesigned multi-tier enterprise contract pricing model for CloudStack AI.
                  </p>
                </div>

                <div>
                  <div className="text-5xl font-black tracking-tight mb-2" style={{ color: text }}>
                    $140M
                  </div>
                  <div className="text-sm font-bold" style={{ color: text }}>Follow-on Capital Raised</div>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: textSecond }}>
                    Led financial narrative structuring and pitch architecture across 8 portfolio companies.
                  </p>
                </div>

                <div>
                  <div className="text-5xl font-black tracking-tight mb-2" style={{ color: accent }}>
                    10.2k+
                  </div>
                  <div className="text-sm font-bold" style={{ color: text }}>Founders & Leaders Coached</div>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: textSecond }}>
                    Delivered global growth academies across Singapore, London, and San Francisco.
                  </p>
                </div>
              </div>

              <div className="pt-6 flex items-center justify-between border-t" style={{ borderColor: `${textSecond}20` }}>
                <button
                  type="button"
                  onClick={() => setActiveStage(0)}
                  className="text-xs font-semibold underline cursor-pointer"
                  style={{ color: textSecond }}
                >
                  ← Back to Overview
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStage(4)}
                  className="px-6 py-2.5 rounded-full text-xs font-bold cursor-pointer"
                  style={{ backgroundColor: accent, color: "#000000" }}
                >
                  Schedule Initial Consultation →
                </button>
              </div>
            </motion.div>
          )}

          {/* STAGE 4: Appointment & Inquiries (Direct, NO FORM!) */}
          {activeStage === 4 && (
            <motion.div
              key="stage-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto py-8 space-y-8"
            >
              <div className="text-center space-y-3 pb-6 border-b" style={{ borderColor: `${textSecond}25` }}>
                <span className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ backgroundColor: `${accent}25`, color: accent }}>
                  Direct Calendar & Contact
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                  Reserve a Confidential Advisory Session
                </h2>
                <p className="text-sm max-w-lg mx-auto" style={{ color: textSecond }}>
                  Select an available strategic window or copy the direct principal desk coordinates.
                </p>
              </div>

              {/* Direct Timeslots & Direct Info (No Form!) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                
                {/* Available Consultation Slots */}
                <div className="p-6 rounded-2xl space-y-4" style={{ backgroundColor: surface, border: `1px solid ${textSecond}25` }}>
                  <div className="text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>
                    Upcoming Advisory Openings
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { day: "Tuesday", time: "10:00 AM PST", slot: "30-Min Diagnostic" },
                      { day: "Thursday", time: "02:00 PM PST", slot: "45-Min Growth Deep Dive" },
                      { day: "Friday", time: "11:30 AM PST", slot: "Executive Briefing" },
                    ].map((s) => (
                      <div
                        key={s.day}
                        className="p-3 rounded-xl flex items-center justify-between transition-colors"
                        style={{ backgroundColor: bgSecond }}
                      >
                        <div>
                          <div className="text-xs font-bold" style={{ color: text }}>{s.day} • {s.time}</div>
                          <div className="text-[11px]" style={{ color: textSecond }}>{s.slot}</div>
                        </div>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${accent}25`, color: accent }}>
                          Available
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Principal Channels */}
                <div className="p-6 rounded-2xl space-y-4 flex flex-col justify-between" style={{ backgroundColor: surface, border: `1px solid ${textSecond}25` }}>
                  <div className="space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>
                      Direct Coordinates
                    </div>
                    <div className="text-xl sm:text-2xl font-black font-mono tracking-tight" style={{ color: text }}>
                      david@growthcatalysts.com
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: textSecond }}>
                      Private line: +1 (415) 890-5542. Primary operating offices in San Francisco & Zurich. All inquiries treated with strict NDA confidentiality.
                    </p>
                  </div>

                  <div className="pt-4 flex items-center gap-3" style={{ borderTop: `1px solid ${textSecond}20` }}>
                    <a
                      href="mailto:david@growthcatalysts.com"
                      className="px-5 py-2 rounded-full text-xs font-bold"
                      style={{ backgroundColor: accent, color: "#000000" }}
                    >
                      Email Direct
                    </a>
                    <button
                      type="button"
                      onClick={() => setActiveStage(0)}
                      className="text-xs font-semibold underline cursor-pointer"
                      style={{ color: textSecond }}
                    >
                      ← Back to Overview
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>

      {/* Bottom Stage Progress Indicator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 flex items-center justify-between text-xs" style={{ color: textSecond }}>
        <div className="flex items-center gap-2">
          <span>Stage 0{activeStage + 1} of 05</span>
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
          <span style={{ color: text }}>{stages[activeStage].label}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveStage((s) => (s > 0 ? s - 1 : stages.length - 1))}
            className="p-1.5 rounded-full border cursor-pointer hover:opacity-80"
            style={{ borderColor: `${textSecond}30`, color: text }}
            title="Previous Stage"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => setActiveStage((s) => (s < stages.length - 1 ? s + 1 : 0))}
            className="p-1.5 rounded-full border cursor-pointer hover:opacity-80"
            style={{ borderColor: `${textSecond}30`, color: text }}
            title="Next Stage"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}

export default DigitalAgency2Hero;
