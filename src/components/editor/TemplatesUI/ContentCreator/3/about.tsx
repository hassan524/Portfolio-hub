// @ts-nocheck
import { ArrowUpRight, Camera, CheckCircle2, Laptop, Mic, Radio, Video } from "lucide-react";
import { FaYoutube } from "react-icons/fa";
import { Editable } from "@/components/editor/ui/Editable";

export function About({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#123C35";
  const ink = theme?.ink || "#F1F7E8";
  const accent = theme?.accent || "#D6FF4B";

  const platforms = [
    {
      name: "Main YouTube Channel",
      detail: "Long-form reviews, creative tutorials, and studio tours",
      metric: "850K Subscribers • 18.2M Views",
    },
    {
      name: "The Creator Podcast",
      detail: "Weekly conversations with designers, animators, and founders",
      metric: "120K Listeners on Spotify & Apple",
    },
    {
      name: "Weekly Studio Newsletter",
      detail: "Curated gear recommendations, plugins, and production tips",
      metric: "65,000 Active Creator Subscribers",
    },
  ];

  const gearSetup = [
    { label: "Primary Camera", value: "Sony FX3 Full-Frame Cinema Line" },
    { label: "Studio Audio", value: "Shure SM7B + Cloudlifter + Rodecaster Pro II" },
    { label: "Edit Suite", value: "Mac Studio M2 Ultra + Pro Display XDR" },
    { label: "Post-Production", value: "DaVinci Resolve Studio & Final Cut Pro" },
  ];

  return (
    <section id="about" className="relative px-5 py-24 sm:px-8 sm:py-32 border-t border-[#D6FF4B]/20" style={{ backgroundColor: bg, color: ink }}>
      <div className="mx-auto max-w-7xl">
        {/* Header Block: Big, Simple, Straight Writing */}
        <div className="border-b border-[#D6FF4B]/20 pb-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D6FF4B]">
            <FaYoutube size={15} />
            <Editable value={props?.label || "ABOUT THE CHANNEL & CREATOR"} />
          </div>
          <Editable
            as="h2"
            value={props?.headline || "VIDEOS ABOUT THE GEAR, SOFTWARE, AND HABITS BEHIND GREAT CREATIVE WORK."}
            onChange={(v) => onChange?.({ headline: v })}
            className="mt-4 text-3xl font-light uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl max-w-5xl"
          />
          <p className="mt-4 max-w-3xl text-base text-[#F1F7E8]/80 leading-relaxed">
            Every week, I test new creative gear, breakdown complex digital workflows, and share practical insights with a global audience of ambitious creators, designers, and developers.
          </p>
        </div>

        {/* 2-COLUMN STRAIGHT ALIGNMENT: PLATFORMS ON LEFT, STUDIO RIG ON RIGHT */}
        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Left Column: Core Channel Distribution */}
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D6FF4B] block mb-6">
              CHANNEL AUDIENCE & DISTRIBUTION:
            </span>

            <div className="divide-y divide-[#D6FF4B]/20 border-t border-b border-[#D6FF4B]/20">
              {platforms.map((p, idx) => (
                <div key={idx} className="py-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-normal text-white">{p.name}</h3>
                      <p className="mt-1 text-sm text-[#F1F7E8]/70 leading-relaxed">{p.detail}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="inline-block rounded-full bg-[#D6FF4B]/10 border border-[#D6FF4B]/30 px-3 py-1 font-mono text-xs font-bold text-[#D6FF4B]">
                      {p.metric}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-[#D6FF4B] px-6 py-3 text-xs font-bold uppercase text-[#123C35] hover:scale-105 transition"
              >
                <span>Browse Video Catalog</span>
                <ArrowUpRight size={14} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-xs font-bold uppercase text-white hover:border-[#D6FF4B] hover:text-[#D6FF4B] transition"
              >
                <span>Media Kit & Inquiries</span>
              </a>
            </div>
          </div>

          {/* Right Column: Studio Gear & Production Rig (Straight Alignment) */}
          <div className="border-t lg:border-t-0 lg:border-l border-[#D6FF4B]/20 pt-10 lg:pt-0 lg:pl-12">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#D6FF4B] block mb-6">
              STUDIO HARDWARE & PRODUCTION RIG:
            </span>

            <div className="divide-y divide-white/10 border-t border-b border-white/10 font-mono text-sm">
              {gearSetup.map((g, idx) => (
                <div key={idx} className="py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <span className="text-white/50 text-xs uppercase">{g.label}</span>
                  <span className="text-white font-medium text-sm">{g.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-[#D6FF4B]/20 bg-black/30 p-6">
              <span className="text-xs font-mono font-bold uppercase text-[#D6FF4B] block">
                EDITORIAL HONESTY GUARANTEE
              </span>
              <p className="mt-2 text-xs text-[#F1F7E8]/80 leading-relaxed font-sans">
                We never accept paid reviews or give positive coverage in exchange for free gear. Every sponsored integration is explicitly disclosed according to FTC guidelines and tested over weeks of real production use.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
