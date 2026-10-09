// @ts-nocheck
import { ArrowDownRight, Compass, Film, Globe } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Testimonials({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#171717";
  const ink = theme?.ink || "#E7E0D4";
  const accent = theme?.accent || "#D7472E";

  const cablegrams = props?.quotes || [
    {
      wire: "CABLEGRAM // DISPATCH NO. 048-A",
      sender: "BANFF MOUNTAIN FILM JURY",
      date: "TRANSMITTED: 12 NOV 2024",
      body: "Julian Ross captures the raw, unforgiving majesty of southern ice sheets without ever falling into clichéd adventure melodrama. A masterclass in tactile, patient cinema.",
      author: "Elena Rostova, Jury President",
    },
    {
      wire: "CABLEGRAM // DISPATCH NO. 072-B",
      sender: "NATIONAL GEOGRAPHIC EXPEDITIONS",
      date: "TRANSMITTED: 04 MAR 2024",
      body: "The field audio alone is worth studying. The sound of water carving through centuries of glacial blue ice feels so tactile you can practically taste the frost on your tongue.",
      author: "Arthur Davies, Senior Photo Editor",
    },
  ];

  return (
    <section id="testimonials" className="relative px-4 py-28 sm:px-8 border-t-2 border-white/20 font-serif" style={{ backgroundColor: bg, color: ink }}>
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-white/20 pb-4 font-mono text-xs uppercase tracking-widest text-[#D7472E]">
          <div className="flex items-center gap-2">
            <Compass size={14} />
            <span>DISPATCH ARCHIVE // INCOMING CABLEGRAMS</span>
          </div>
          <span className="text-white/50">CONFIDENTIAL EXPEDITION PRESS</span>
        </div>

        <div className="mt-8">
          <Editable
            as="h2"
            value={props?.headline || "INCOMING WIRE DISPATCHES & JURY PRAISE."}
            className="text-3xl font-normal uppercase tracking-tight text-white sm:text-5xl"
          />
        </div>

        {/* CABLEGRAM ROWS — ZERO BOX CARDS! Vintage wire transmission format */}
        <div className="mt-14 divide-y-2 divide-white/20 border-t-2 border-b-2 border-white/20">
          {cablegrams.map((cable, idx) => (
            <div key={idx} className="py-12 grid gap-6 lg:grid-cols-[0.4fr_1fr]">
              <div className="font-mono text-xs">
                <span className="text-[#D7472E] block font-bold">{cable.wire}</span>
                <span className="mt-1 block text-sm font-semibold uppercase text-white">{cable.sender}</span>
                <span className="mt-1 block text-white/40">{cable.date}</span>
              </div>

              <div>
                <blockquote className="text-xl font-normal leading-relaxed text-white sm:text-2xl italic">
                  "{cable.body}"
                </blockquote>
                <span className="mt-4 block font-mono text-xs text-[#D7472E] font-bold">
                  — {cable.author}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
