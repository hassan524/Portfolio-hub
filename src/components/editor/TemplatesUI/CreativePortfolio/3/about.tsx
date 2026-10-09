// @ts-nocheck
import { motion } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";

export function CreativePortfolio3About({ props = {}, theme, onChange }: any) {
  const bgSecond = theme?.["bg-second"] || "#2A1050";
  const ink = theme?.ink || "#FFF8FF";
  const inkSecond = theme?.["ink-second"] || "#CDB9E8";
  const surface = theme?.surface || "rgba(255, 248, 255, 0.16)";
  const accent = theme?.accent || "#C98CFF";

  const metrics = props?.metrics || [
    { num: "08", label: "Years designing" },
    { num: "42", label: "Launched worlds" },
    { num: "∞", label: "Curious experiments" }
  ];

  return (
    <section
      id="about"
      className="border-b px-5 py-24 sm:px-8 lg:px-12 transition-colors font-sans"
      style={{
        backgroundColor: bgSecond,
        color: ink,
        borderColor: surface,
      }}
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <span className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: accent }}>
            02 / The Lab
          </span>
          <b className="text-3xl sm:text-4xl font-bold tracking-tight leading-snug">
            <Editable
              value={props?.tagline || "Motion is a material."}
              onChange={(v) => onChange?.({ tagline: v })}
            />
          </b>
        </div>

        <div className="lg:col-span-8 space-y-12">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
            <Editable
              value={
                props?.headline ||
                "I make digital places with a clear rhythm and a little mystery."
              }
              onChange={(v) => onChange?.({ headline: v })}
            />
          </h2>

          <p className="max-w-2xl text-base sm:text-lg leading-relaxed" style={{ color: inkSecond }}>
            From tiny hover states to full-screen transitions, every detail is part of the atmosphere. The interface is not a wrapper around the work — it is the work.
          </p>

          <div className="pt-8 border-t flex flex-wrap gap-12" style={{ borderColor: surface }}>
            {metrics.map((m: any, i: number) => (
              <div key={i} className="font-mono">
                <span className="block text-4xl sm:text-5xl font-bold mb-1" style={{ color: accent }}>
                  {m.num}
                </span>
                <span className="text-[11px] uppercase tracking-wider" style={{ color: inkSecond }}>
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
