// @ts-nocheck
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Eye, Play, Sparkles, Video, X } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Projects({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#F1F7E8";
  const ink = theme?.ink || "#123C35";
  const accent = theme?.accent || "#D6FF4B";

  const defaultWork = [
    {
      num: "01",
      t: "The Minimalist Creative Studio of 2026",
      d: "A comprehensive deep dive into modern creative hardware, cable management, and tactile desk ergonomics.",
      tag: "Tech Review & Tour",
      sponsor: "Keychron & Elgato",
      views: "1.4M Views",
      retention: "74% Avg Retention",
      img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=85",
      brief: "Demonstrate how dedicated hardware controls and acoustic treatment transform daily creator output and mental clarity.",
      deliverables: ["1x 22-minute long-form YouTube review", "3x YouTube Shorts / Reels", "Complete studio gear list with tracking links"],
      results: "Over 48,000 product clicks generated in first 72 hours; trending #8 on YouTube Technology.",
    },
    {
      num: "02",
      t: "Inside the 10-Hour Video Essay Workflow",
      d: "A step-by-step masterclass breaking down pacing, timeline organization, and sound design in DaVinci Resolve.",
      tag: "Creator Masterclass",
      sponsor: "Notion & DaVinci Resolve",
      views: "890K Views",
      retention: "81% Avg Retention",
      img: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=85",
      brief: "Show how professional creators structure complex research, script outlines, and multi-track audio without creative burnout.",
      deliverables: ["1x 30-minute in-depth video guide", "Free downloadable project timeline template", "Custom color LUT pack for audience"],
      results: "Over 35,000 template downloads and 2,400 community comments praising the actionable advice.",
    },
    {
      num: "03",
      t: "Why Every Creator Needs a Real Audio Rig",
      d: "Comparing USB microphones against professional broadcast XLR microphones, preamps, and acoustic foam.",
      tag: "Audio Guide & Teardown",
      sponsor: "Shure Pro Audio",
      views: "2.1M Views",
      retention: "69% Avg Retention",
      img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=85",
      brief: "Educate creators on why audio quality matters 2x more than camera 4K resolution for viewer watch time.",
      deliverables: ["1x 18-minute blind audio test video", "A/B comparison audio files for community download", "Live Q&A stream with viewers"],
      results: "Became the #1 organic YouTube search result for creator audio setup comparisons in 2026.",
    },
  ];

  const work = props?.work || defaultWork;
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <section id="projects" className="relative px-5 py-24 sm:px-8 sm:py-32 border-t border-[#123C35]/20" style={{ backgroundColor: bg, color: ink }}>
      <div className="mx-auto max-w-7xl">
        {/* Header: Straight Alignment & Big Simple Writing */}
        <div className="flex flex-col gap-4 border-b-2 border-[#123C35] pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#123C35]/70">
              <Video size={14} />
              <Editable value="FEATURED YOUTUBE PRODUCTIONS" />
            </div>
            <Editable
              as="h2"
              value={props?.headline || "SELECTED VIDEOS & SPONSOR SHOWCASES."}
              className="mt-4 text-3xl font-light uppercase tracking-tight sm:text-5xl lg:text-6xl text-[#123C35]"
            />
          </div>
          <span className="text-xs uppercase tracking-wider text-[#123C35]/70 font-semibold sm:text-right">
            Click any video to inspect analytics & deliverables →
          </span>
        </div>

        {/* CLEAN HORIZONTAL ROWS — ZERO BOX CARDS! Straight, Linear Alignment */}
        <div className="divide-y-2 divide-[#123C35] border-b-2 border-[#123C35]">
          {work.map((w: any, i: number) => (
            <div
              key={i}
              onClick={() => setSelectedProject(w)}
              className="group cursor-pointer py-10 transition-colors duration-200 hover:bg-[#123C35] hover:text-[#F1F7E8]"
            >
              <div className="grid gap-6 lg:grid-cols-[0.15fr_1fr_0.35fr] lg:items-center">
                {/* Number */}
                <span className="text-2xl font-bold text-[#123C35]/40 group-hover:text-[#D6FF4B] sm:text-3xl">
                  {w.num}
                </span>

                {/* Video Info */}
                <div>
                  <div className="flex items-center gap-3 text-xs opacity-70 uppercase tracking-wider font-semibold">
                    <span>{w.tag}</span>
                    <span>•</span>
                    <span className="group-hover:text-[#D6FF4B]">{w.sponsor}</span>
                  </div>
                  <h3 className="mt-2 text-2xl font-normal tracking-tight sm:text-3xl lg:text-4xl group-hover:text-white transition">
                    {w.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed opacity-75 max-w-2xl">
                    {w.d}
                  </p>
                </div>

                {/* Views & Arrow */}
                <div className="flex items-center justify-between lg:justify-end gap-6 text-right">
                  <div>
                    <span className="block text-2xl font-bold group-hover:text-[#D6FF4B]">
                      {w.views}
                    </span>
                    <span className="block text-xs uppercase opacity-70">
                      {w.retention}
                    </span>
                  </div>

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-current transition group-hover:bg-[#D6FF4B] group-hover:text-[#123C35]">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VIDEO PRODUCTION CASE STUDY MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-[#0A1F1B]/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border-2 border-[#D6FF4B]/40 bg-[#123C35] p-6 text-[#F1F7E8] sm:p-10 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#D6FF4B] font-bold">
                    {selectedProject.tag} // {selectedProject.sponsor}
                  </span>
                  <h3 className="mt-1 text-2xl font-light tracking-tight text-white sm:text-4xl">
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

              {/* Video Thumbnail */}
              <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl bg-black">
                <img src={selectedProject.img} alt={selectedProject.t} className="h-full w-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="flex items-center gap-2 rounded-full bg-[#D6FF4B] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#123C35] shadow-xl">
                    <Play size={14} fill="#123C35" />
                    <span>Watch Video on YouTube</span>
                  </div>
                </div>
              </div>

              {/* Stats Strip */}
              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-b border-white/10 py-4 text-center font-mono">
                <div>
                  <span className="block text-2xl font-bold text-[#D6FF4B]">{selectedProject.views}</span>
                  <span className="text-[11px] uppercase text-white/50">Total Audience</span>
                </div>
                <div>
                  <span className="block text-2xl font-bold text-white">{selectedProject.retention}</span>
                  <span className="text-[11px] uppercase text-white/50">Viewer Retention</span>
                </div>
                <div>
                  <span className="block text-2xl font-bold text-[#D6FF4B]">4K 60FPS</span>
                  <span className="text-[11px] uppercase text-white/50">Production Quality</span>
                </div>
              </div>

              {/* Campaign Notes */}
              <div className="mt-8 space-y-6 text-sm">
                <div>
                  <h4 className="uppercase tracking-widest text-[#D6FF4B] font-bold text-xs">Video Objective & Angle</h4>
                  <p className="mt-2 text-[#F1F7E8]/85 leading-relaxed">{selectedProject.brief}</p>
                </div>

                <div>
                  <h4 className="uppercase tracking-widest text-[#D6FF4B] font-bold text-xs">Campaign Deliverables</h4>
                  <div className="mt-2 space-y-2">
                    {selectedProject.deliverables?.map((d: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-white/90">
                        <Check size={16} className="text-[#D6FF4B] shrink-0" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <span className="text-xs uppercase text-[#D6FF4B] font-bold block mb-1">Impact & Audience Response:</span>
                  <p className="text-xs text-white/90 leading-relaxed">{selectedProject.results}</p>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                <span className="text-xs text-white/50">Inquire for dedicated video sponsorship</span>
                <a
                  href="#contact"
                  onClick={() => setSelectedProject(null)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#D6FF4B] px-5 py-2.5 text-xs font-bold uppercase text-[#123C35] hover:scale-105 transition"
                >
                  <span>Book Sponsored Slot</span>
                  <ArrowUpRight size={14} />
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
