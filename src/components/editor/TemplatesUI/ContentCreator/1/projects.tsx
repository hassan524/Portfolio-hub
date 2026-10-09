// @ts-nocheck
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Disc, Eye, Film, Play, Sparkles, X, Zap } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Projects({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || "#A8AFBF";
  const accent = theme?.accent || "#7DD3FC";

  const defaultProductions = [
    {
      id: "prod-01",
      frameNumber: "FR // 0024A",
      timecode: "00:04:12:08",
      title: "The Architecture of Sound",
      sponsor: "Sennheiser Pro Audio",
      format: "4K DCI // Anamorphic 2.39:1",
      runtime: "18:42",
      views: "2.8M Views",
      retention: "71% Completion Rate",
      objective: "Deconstruct how physical acoustics and brutalist cathedral architecture shape human neurological tranquility.",
      deliverables: ["18-minute master documentary cut", "3x 60s vertical audio teasers", "Dolby Atmos binaural mix download"],
      gear: "Sony FX6 + Atlas Orion Anamorphic Primes, Sennheiser AMBEO VR Mic",
      img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=85",
      slate: "SCENE 04 / TAKE 02 / SOUND_ARCH",
    },
    {
      id: "prod-02",
      frameNumber: "FR // 0038B",
      timecode: "00:11:45:16",
      title: "Solitude at 70° North",
      sponsor: "Arc'teryx Winter Expeditions",
      format: "4K 120p High Frame Rate",
      runtime: "12:15",
      views: "1.9M Views",
      retention: "64% Completion Rate",
      objective: "Follow a lone glaciological researcher through Svalbard during the four-month polar night under sub-zero conditions.",
      deliverables: ["12-minute cinematic YouTube essay", "High-res editorial stills for global billboards", "Original ambient score release"],
      gear: "Sony FX3 in custom thermal cage, Cooke Panchro Classics, Tentacle Sync",
      img: "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1200&q=85",
      slate: "SCENE 09 / TAKE 01 / SVALBARD_EXP",
    },
    {
      id: "prod-03",
      frameNumber: "FR // 0052C",
      timecode: "00:19:04:02",
      title: "Chronicles of Pure Speed",
      sponsor: "Polestar Performance",
      format: "6K RAW // High Dynamic Range",
      runtime: "06:30",
      views: "3.4M Views",
      retention: "83% Completion Rate",
      objective: "Capture the silent, brutal torque of experimental electric hillclimb vehicles through dynamic camera motion control.",
      deliverables: ["6-minute launch film", "5x high-velocity Instagram cuts", "Custom color LUT pack for community"],
      gear: "RED V-Raptor 8K, Motocrane chase vehicle, Master Primes",
      img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85",
      slate: "SCENE 14 / TAKE 04 / POLESTAR_APEX",
    },
  ];

  const films = props?.items || defaultProductions;
  const [activeFilm, setActiveFilm] = useState<any>(null);

  return (
    <section id="projects" className="relative py-28 border-t border-white/10" style={{ backgroundColor: bg, color: ink }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-white/15 pb-8 sm:flex-row sm:items-end font-mono">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#7DD3FC]">
              <Film size={14} />
              <Editable value={props?.label || "FEATURED FILMS & ESSAYS"} />
            </div>
            <Editable
              as="h2"
              value={props?.headline || "SELECTED DIRECTORIAL RELEASES."}
              onChange={(v) => onChange?.({ headline: v })}
              className="mt-4 font-mono text-3xl font-light uppercase tracking-tight sm:text-5xl lg:text-6xl text-white"
            />
          </div>
          <span className="text-xs uppercase tracking-widest text-white/50">
            Click any film to explore production notes & breakdown
          </span>
        </div>
      </div>

      {/* STRAIGHT-ALIGNED EDITORIAL FILM ROWS — ZERO BOX CARDS */}
      <div className="mt-14 border-t border-b border-white/15 divide-y divide-white/15">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 divide-y divide-white/15">
          {films.map((film: any, idx: number) => (
            <div
              key={film.id || idx}
              onClick={() => setActiveFilm(film)}
              className="group cursor-pointer py-12 transition hover:bg-white/[0.02]"
            >
              {/* Row Header Information */}
              <div className="flex flex-wrap items-center justify-between pb-4 font-mono text-xs text-white/60">
                <span className="text-[#7DD3FC] font-semibold tracking-wider uppercase">
                  {film.sponsor} • {film.format}
                </span>
                <span className="text-white/50 tracking-wider">RUNTIME: {film.runtime}</span>
              </div>

              {/* Main Film Gate Frame */}
              <div className="mt-4 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-black">
                  <img
                    src={film.img}
                    alt={film.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="flex items-center gap-2 rounded-full bg-[#7DD3FC] px-4 py-2 font-mono text-xs font-bold uppercase text-[#0A0A0C]">
                      <Play size={12} fill="#0A0A0C" />
                      <span>Watch Film Breakdown</span>
                    </span>
                    <span className="rounded bg-black/70 px-2.5 py-1 font-mono text-xs text-white backdrop-blur-sm">
                      {film.runtime}
                    </span>
                  </div>
                </div>

                {/* Directorial Notes */}
                <div className="font-mono">
                  <h3 className="text-2xl font-normal text-white tracking-tight sm:text-3xl group-hover:text-[#7DD3FC] transition">
                    {film.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70 font-sans">
                    {film.objective}
                  </p>

                  <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-4 text-xs">
                    <div>
                      <span className="block text-[10px] uppercase text-white/40">Total Views</span>
                      <span className="text-sm font-bold text-white mt-1 block">{film.views}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase text-white/40">Retention</span>
                      <span className="text-sm font-bold text-[#7DD3FC] mt-1 block">{film.retention}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase text-white/40">Master Spec</span>
                      <span className="text-sm font-bold text-white mt-1 block">4K ProRes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MASTER DIRECTOR'S CUT REVIEW SUITE MODAL */}
      <AnimatePresence>
        {activeFilm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 font-mono">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveFilm(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border-2 border-[#7DD3FC]/40 bg-[#0A0A0C] p-6 text-white sm:p-10 shadow-2xl"
            >
              {/* Top Slate Bar */}
              <div className="flex items-start justify-between gap-4 border-b border-white/15 pb-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#7DD3FC]">
                    SEQUENCE REVIEW // {activeFilm.frameNumber} // {activeFilm.timecode}
                  </span>
                  <h3 className="mt-1 text-3xl font-light tracking-tight text-white sm:text-4xl">
                    {activeFilm.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveFilm(null)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Master Screen */}
              <div className="relative mt-6 aspect-[21/9] overflow-hidden rounded-xl bg-black">
                <img src={activeFilm.img} alt={activeFilm.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="flex items-center gap-3 rounded-full bg-[#7DD3FC] px-6 py-3 font-mono text-xs uppercase tracking-wider text-[#0A0A0C] font-bold">
                    <Play size={15} fill="#0A0A0C" />
                    <span>Watch Master Reel Cut</span>
                  </div>
                </div>
              </div>

              {/* Telemetry Strip */}
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-b border-white/10 py-5 text-xs">
                <div>
                  <span className="text-white/40 block">SPONSOR CLIENT</span>
                  <span className="text-[#7DD3FC] font-semibold mt-1 block">{activeFilm.sponsor}</span>
                </div>
                <div>
                  <span className="text-white/40 block">ORGANIC REACH</span>
                  <span className="text-white font-semibold mt-1 block">{activeFilm.views}</span>
                </div>
                <div>
                  <span className="text-white/40 block">COMPLETION RATE</span>
                  <span className="text-white font-semibold mt-1 block">{activeFilm.retention}</span>
                </div>
                <div>
                  <span className="text-white/40 block">CAPTURE FORMAT</span>
                  <span className="text-white font-semibold mt-1 block">{activeFilm.format}</span>
                </div>
              </div>

              {/* Production Details */}
              <div className="mt-8 space-y-6 text-xs leading-relaxed">
                <div>
                  <h4 className="uppercase text-[#7DD3FC] tracking-widest font-bold">Creative Objective</h4>
                  <p className="mt-2 text-white/80 font-sans text-sm">{activeFilm.objective}</p>
                </div>

                <div>
                  <h4 className="uppercase text-[#7DD3FC] tracking-widest font-bold">Packaged Deliverables</h4>
                  <div className="mt-2 space-y-1.5">
                    {activeFilm.deliverables?.map((d: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-white/90">
                        <Check size={14} className="text-[#7DD3FC]" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <span className="text-white/40">Camera & Lens Package: </span>
                  <span className="text-white font-semibold">{activeFilm.gear}</span>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                <span className="text-white/50 text-xs">Need a cinematic documentary or launch film?</span>
                <a
                  href="#contact"
                  onClick={() => setActiveFilm(null)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#7DD3FC] px-6 py-3 font-mono text-xs font-bold uppercase text-[#0A0A0C] hover:scale-105 transition"
                >
                  <span>Request Treatment Pitch</span>
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

export { Projects as ContentCreator1Projects };
export default Projects;
