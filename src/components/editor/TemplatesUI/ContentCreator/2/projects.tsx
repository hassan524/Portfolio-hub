// @ts-nocheck
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Flame, Play, Sparkles, TrendingUp, X, Zap } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Projects({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#FF6B35";
  const ink = theme?.ink || "#181713";
  const accent = theme?.accent || "#FF6B35";

  const defaultWork = [
    {
      num: "01",
      t: "A NEW KIND OF BOLD",
      client: "DAYLIGHT AUDIO",
      format: "Viral Launch Film",
      views: "3.4M",
      retention: "91% Hook Hold",
      platform: "YouTube & Shorts",
      img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85",
      brief: "Launch a breakthrough wireless sound system to Gen-Z audiophiles without sounding like a legacy tech ad.",
      hookStrategy: "First 2.5 seconds showed the speaker submerged in kinetic water ripples in reverse slow-motion, triggering immediate visual curiosity.",
      outcomes: ["Over 3.4M organic views across platforms", "18,400+ units sold out within the first 48 hours", "Shortlisted for Webby Award in Branded Entertainment"],
      gear: "RED V-Raptor 8K, Cooke Anamorphic /i, Motion Control Robotic Arm",
    },
    {
      num: "02",
      t: "FUTURE, IN FOCUS",
      client: "NORTHSTAR ECOSYSTEMS",
      format: "Documentary Film",
      views: "1.9M",
      retention: "14.2 min Avg Watch",
      platform: "Long-Form YouTube",
      img: "https://images.unsplash.com/photo-1526481280695-3c687fd5432c?auto=format&fit=crop&w=1000&q=85",
      brief: "Expose the high-stakes world of arctic clean-tech founders operating under extreme minus-40 weather.",
      hookStrategy: "Cold open in a blizzard audio silence suddenly punctured by the scream of an experimental electric turbine.",
      outcomes: ["Organic pick-up by Wired & The Verge", "Over 240,000 newsletter signups driven for client", "Average viewer watch time hit an astounding 14.2 minutes"],
      gear: "Sony FX6 Cinema Line, DZOFilm Vespid Primes, Tentacle Sync",
    },
    {
      num: "03",
      t: "KINETIC VELOCITY",
      client: "APEX MOTION",
      format: "Multi-Platform Campaign",
      views: "5.1M",
      retention: "+320% Social Mentions",
      platform: "Shorts & Broadcast",
      img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=85",
      brief: "Reposition an athletic brand for street culture through rhythmic pacing and hyper-kinetic sound design.",
      hookStrategy: "Percussive shoe stomp synchronized with camera zoom, locking viewer eyes onto the product instantly.",
      outcomes: ["5.1M combined impressions in week one", "68% save rate across Instagram Reels", "Spurred 1,200+ organic user video stitches"],
      gear: "Arri Alexa Mini LF, Master Primes, Custom FPV Drone Rig",
    },
    {
      num: "04",
      t: "TACTILE TOMORROW",
      client: "STUDIO FORM",
      format: "Industrial Design Essay",
      views: "890K",
      retention: "98.4% Like Ratio",
      platform: "YouTube Deep Dive",
      img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=85",
      brief: "Investigate why physical buttons and tactile materials are dominating the next wave of hardware design.",
      hookStrategy: "Side-by-side macro audio recording of mechanical switches compared to flat glass touchscreens.",
      outcomes: ["Generated 3,400+ comments debating hardware tactile feedback", "Ranked #1 on YouTube search for tactile industrial design"],
      gear: "Sony FX3, Macro 90mm f/2.8 G OSS, Sennheiser MKH 416",
    },
  ];

  const work = props?.work || defaultWork;
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <section id="projects" className="relative px-4 py-28 sm:px-8 border-t-2 border-black" style={{ backgroundColor: bg, color: ink }}>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-black pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em]">
              <Zap size={14} />
              <Editable value="02 // PRODUCTION STREAM ARCHIVE" />
            </div>
            <Editable
              as="h2"
              value={props?.headline || "SELECTED VIRAL CASSETTES."}
              className="mt-4 text-5xl font-black uppercase leading-none tracking-[-0.07em] sm:text-7xl lg:text-8xl"
            />
          </div>
          <span className="text-xs font-black uppercase tracking-wider text-black/60 sm:text-right">
            [Click headline to deconstruct hook & retention]
          </span>
        </div>

        {/* FULL-WIDTH INTERACTIVE EDITORIAL ROWS — ZERO BOX CARDS! */}
        <div className="divide-y-2 divide-black border-b-2 border-black">
          {work.map((w: any, i: number) => (
            <div
              key={i}
              onClick={() => setSelectedProject(w)}
              className="group cursor-pointer py-10 transition-colors duration-200 hover:bg-black hover:text-[#F5F0E8]"
            >
              <div className="grid gap-6 lg:grid-cols-[0.1fr_1fr_0.4fr] lg:items-center">
                {/* Index */}
                <span className="text-2xl font-black tracking-tight text-black/30 group-hover:text-[#FF6B35] sm:text-3xl">
                  {w.num}
                </span>

                {/* Big Title & Client */}
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-wider text-black/60 group-hover:text-white/60">
                    <span>{w.client}</span>
                    <span>•</span>
                    <span className="text-black group-hover:text-[#FF6B35]">{w.format}</span>
                    <span>•</span>
                    <span>{w.platform}</span>
                  </div>
                  <h3 className="mt-2 text-3xl font-black uppercase tracking-[-0.05em] sm:text-5xl lg:text-6xl transition-transform group-hover:translate-x-2">
                    {w.t}
                  </h3>
                </div>

                {/* Metrics & Hover Arrow */}
                <div className="flex items-center justify-between lg:justify-end gap-6 text-right">
                  <div>
                    <span className="block text-2xl font-black sm:text-3xl text-black group-hover:text-[#FF6B35]">
                      {w.views}
                    </span>
                    <span className="block text-xs font-bold uppercase text-black/60 group-hover:text-white/60">
                      {w.retention}
                    </span>
                  </div>

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-black group-hover:border-white group-hover:bg-[#FF6B35] group-hover:text-black transition">
                    <ArrowUpRight size={22} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FULL-SCREEN RETENTION TEARDOWN MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2.5rem] border-4 border-black bg-[#181713] p-6 text-[#F5F0E8] sm:p-10 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-white/15 pb-6">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-[#FF6B35]">
                    {selectedProject.client} // {selectedProject.format}
                  </span>
                  <h3 className="mt-1 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
                    {selectedProject.t}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Video Media Preview */}
              <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl bg-black">
                <img src={selectedProject.img} alt={selectedProject.t} className="h-full w-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="flex items-center gap-3 rounded-full bg-[#FF6B35] px-6 py-3 font-black uppercase tracking-wider text-[#181713]">
                    <Play size={18} fill="#181713" />
                    <span>Watch Full Cassette</span>
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-b border-white/15 py-4 text-center">
                <div>
                  <span className="block text-3xl font-black text-[#FF6B35]">{selectedProject.views}</span>
                  <span className="text-[11px] uppercase tracking-wider text-white/50">Total Views</span>
                </div>
                <div>
                  <span className="block text-3xl font-black text-white">{selectedProject.retention}</span>
                  <span className="text-[11px] uppercase tracking-wider text-white/50">Retention</span>
                </div>
                <div>
                  <span className="block text-3xl font-black text-white">{selectedProject.platform}</span>
                  <span className="text-[11px] uppercase tracking-wider text-white/50">Platform</span>
                </div>
                <div>
                  <span className="block text-3xl font-black text-[#FF6B35]">4K 60FPS</span>
                  <span className="text-[11px] uppercase tracking-wider text-white/50">Master Grade</span>
                </div>
              </div>

              {/* Deep Dive Hook Strategy */}
              <div className="mt-8 space-y-6">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-[#FF6B35]">The Creative Brief</h4>
                  <p className="mt-2 text-base leading-relaxed text-white/80">{selectedProject.brief}</p>
                </div>

                <div className="rounded-2xl border border-[#FF6B35]/40 bg-[#FF6B35]/10 p-5">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#FF6B35]">
                    <Sparkles size={16} />
                    <span>First 3-Second Hook Strategy</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white">
                    {selectedProject.hookStrategy}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-[#FF6B35]">Campaign Outcomes</h4>
                  <div className="mt-3 space-y-2">
                    {selectedProject.outcomes?.map((out: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2.5 text-sm text-white/80">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#FF6B35]" />
                        <span>{out}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 text-xs">
                  <span className="text-white/50">Camera & Rig Package: </span>
                  <span className="text-white font-semibold">{selectedProject.gear}</span>
                </div>
              </div>

              {/* Close CTA */}
              <div className="mt-8 flex items-center justify-between border-t border-white/15 pt-6">
                <span className="text-xs uppercase text-white/50">Ready to break the internet together?</span>
                <a
                  href="#contact"
                  onClick={() => setSelectedProject(null)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#FF6B35] px-6 py-3 text-xs font-black uppercase tracking-wider text-[#181713] transition hover:scale-105"
                >
                  <span>Book Strategy Sprint</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Projects;
