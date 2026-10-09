// @ts-nocheck
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownRight, Compass, Film, Globe, MapPin, Play, X } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Projects({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#171717";
  const ink = theme?.ink || "#E7E0D4";
  const accent = theme?.accent || "#D7472E";

  const defaultWork = [
    {
      plate: "PLATE // 01",
      negative: "HP5-400-089A",
      t: "The Long Way Around",
      d: "A 45-day overland documentary expedition across Patagonia and the high Atacama Desert.",
      category: "Documentary Feature",
      location: "Patagonia & Chile",
      runtime: "42 min 4K",
      laurel: "Vimeo Staff Pick & Banff Finalist",
      views: "1.6M Views",
      img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85",
      brief: "Document three solo glaciologists living in remote meteorological outposts as southern hemisphere ice sheets rapidly retreat.",
      fieldNotes: "Shot under extreme 90 knot winds and sub-zero squalls. Required 100% solar recharge kits carried by packhorse over 300km of unpaved glacial terrain.",
      gear: "Arri Amira, Leica R Cine-Mod Primes (28mm, 50mm, 90mm), Sennheiser MKH 8060",
      reception: "Screened at 9 international festivals; inspired a crowdfunding campaign that preserved 4,000 hectares of indigenous forest.",
    },
    {
      plate: "PLATE // 02",
      negative: "HP5-400-114B",
      t: "A Different Kind of Useful",
      d: "Inside the secluded workshops of eighth-generation wood joiners and urushi lacquer masters in Kyoto.",
      category: "Cultural Essay",
      location: "Kyoto, Japan",
      runtime: "28 min 4K",
      laurel: "Tokyo Independent Doc Fest",
      views: "2.4M Views",
      img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",
      brief: "Explore the philosophy of shokunin — devotion to craft without desire for commercial fame — through intimate macro cinematography.",
      fieldNotes: "Natural window light only. Recorded ambient micro-sounds: the scraping of hand plane blades, boiling tea kettles, and rain on cedar roofs.",
      gear: "Sony FX6, Canon K35 Vintage Primes, Schoeps CMIT 5U, Sound Devices MixPre-6",
      reception: "Received over 8,000 essayistic viewer responses discussing slow craft and mental focus in the digital age.",
    },
    {
      plate: "PLATE // 03",
      negative: "HP5-400-142C",
      t: "Echoes of the Coast",
      d: "Documenting the final generation of traditional deep-sea dory fishermen battling North Atlantic swells.",
      category: "Human Interest Doc",
      location: "Newfoundland, Canada",
      runtime: "35 min 4K",
      laurel: "Tribeca X Selection",
      views: "1.1M Views",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
      brief: "Capture the oral histories and maritime traditions of elderly harbor communities before mechanical factory trawlers replace them completely.",
      fieldNotes: "Filmed from bobbing small wooden craft in freezing North Atlantic fog. Heavy waterproof housing and specialized anti-salt lens maintenance.",
      gear: "RED Komodo 6K in custom water rig, Cooke Speed Panchros, DPA lavalier mics",
      reception: "Acquired for educational distribution by maritime museums and broadcast on Canadian public television.",
    },
  ];

  const work = props?.work || defaultWork;
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <section id="projects" className="relative px-4 py-28 sm:px-8 border-t-2 border-white/20 font-serif select-none" style={{ backgroundColor: bg, color: ink }}>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-white/20 pb-8 font-mono">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D7472E]">
              <Film size={14} />
              <Editable value="EXPEDITION PLATES // CONTACT SHEET NEGATIVES" />
            </div>
            <Editable
              as="h2"
              value={props?.headline || "DOCUMENTARY EXPEDITIONS ARCHIVE."}
              className="mt-4 font-serif text-3xl font-normal uppercase tracking-tight text-white sm:text-6xl"
            />
          </div>
          <span className="text-xs uppercase tracking-wider text-white/50 sm:text-right">
            [Click plate to inspect declassified field journal]
          </span>
        </div>

        {/* CONTINUOUS CONTACT SHEET NEGATIVE PLATES — ZERO BOX CARDS! Full-bleed horizontal spreads */}
        <div className="mt-14 divide-y-2 divide-white/20 border-b-2 border-white/20">
          {work.map((w: any, i: number) => (
            <div
              key={i}
              onClick={() => setSelectedProject(w)}
              className="group cursor-pointer py-12 transition-colors duration-200 hover:bg-white/[0.03]"
            >
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                {/* Meta Notes Column */}
                <div className="font-mono">
                  <div className="flex items-center gap-3 text-xs text-[#D7472E]">
                    <span className="font-bold">{w.plate}</span>
                    <span>•</span>
                    <span className="text-white/60">{w.negative}</span>
                  </div>

                  <h3 className="mt-3 font-serif text-3xl font-normal text-white sm:text-5xl group-hover:text-[#D7472E] transition">
                    {w.t}
                  </h3>

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-white/70">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-[#D7472E]" />
                      {w.location}
                    </span>
                    <span>•</span>
                    <span>{w.runtime}</span>
                    <span>•</span>
                    <span className="text-[#D7472E]">{w.laurel}</span>
                  </div>

                  <p className="mt-4 font-sans text-xs text-white/75 leading-relaxed max-w-md">
                    {w.d}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-xs text-[#D7472E] font-bold uppercase tracking-wider">
                    <span>Inspect Field Negative & Audio</span>
                    <ArrowDownRight size={16} />
                  </div>
                </div>

                {/* Film Plate Visual with Grease Pencil Cropping Marks */}
                <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-black border border-white/20">
                  <img
                    src={w.img}
                    alt={w.t}
                    className="h-full w-full object-cover grayscale contrast-125 transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  {/* Grease pencil crop borders */}
                  <div className="pointer-events-none absolute inset-4 border border-dashed border-[#D7472E]/60" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded bg-black/80 px-3 py-1 font-mono text-[11px] text-white">
                    <Play size={10} fill="currentColor" />
                    <span>{w.views}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EXPEDITION DOSSIER MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 font-mono">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border-2 border-white/30 bg-[#171717] p-6 text-[#E7E0D4] sm:p-10 shadow-2xl font-serif"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b border-white/20 pb-6 font-mono">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D7472E]">
                    <MapPin size={13} />
                    <span>{selectedProject.location}</span>
                    <span className="text-white/40">•</span>
                    <span>{selectedProject.runtime}</span>
                  </div>
                  <h3 className="mt-1 font-serif text-3xl font-normal text-white sm:text-4xl">
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

              {/* Master Visual */}
              <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-xl bg-black">
                <img src={selectedProject.img} alt={selectedProject.t} className="h-full w-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <div className="flex items-center gap-3 rounded-full bg-[#D7472E] px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white">
                    <Play size={16} fill="currentColor" />
                    <span>Play Master 4K Screening</span>
                  </div>
                </div>
              </div>

              {/* Expedition Telemetry Strip */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-b border-white/15 py-4 font-mono text-center text-xs">
                <div>
                  <span className="block text-2xl font-normal text-[#D7472E]">{selectedProject.runtime}</span>
                  <span className="text-[10px] uppercase text-white/50">Runtime</span>
                </div>
                <div>
                  <span className="block text-2xl font-normal text-white">{selectedProject.views}</span>
                  <span className="text-[10px] uppercase text-white/50">Viewers</span>
                </div>
                <div>
                  <span className="block text-2xl font-normal text-white">4K DCI</span>
                  <span className="text-[10px] uppercase text-white/50">Aspect 2.39:1</span>
                </div>
                <div>
                  <span className="block text-2xl font-normal text-[#D7472E]">Tribeca</span>
                  <span className="text-[10px] uppercase text-white/50">Honors</span>
                </div>
              </div>

              {/* Journal Notes */}
              <div className="mt-8 space-y-6 text-xs leading-relaxed font-sans">
                <div>
                  <h4 className="font-mono uppercase text-[#D7472E] tracking-widest font-bold">The Expedition Premise</h4>
                  <p className="mt-2 text-white/85 text-sm">{selectedProject.brief}</p>
                </div>

                <div className="border-l-2 border-[#D7472E] pl-4 italic text-white/80">
                  "{selectedProject.fieldNotes}"
                </div>

                <div className="border-t border-white/15 pt-4 font-mono text-xs">
                  <span className="text-white/50">Camera & Audio Package: </span>
                  <span className="text-white font-semibold">{selectedProject.gear}</span>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="mt-8 flex items-center justify-between border-t border-white/20 pt-6 font-mono">
                <span className="text-xs text-white/50">Inquire for field directing & co-productions</span>
                <a
                  href="#contact"
                  onClick={() => setSelectedProject(null)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#D7472E] px-6 py-3 text-xs font-bold uppercase text-white hover:scale-105 transition"
                >
                  <span>Inquire for Expedition</span>
                  <ArrowDownRight size={15} />
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
