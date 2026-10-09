// @ts-nocheck
import { ArrowDownRight, Compass, Globe, Map, PenTool, Waves } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function About({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#E7E0D4";
  const ink = theme?.ink || "#171717";
  const accent = theme?.accent || "#D7472E";

  const fieldLog = [
    {
      entry: "LOG_01",
      location: "SOUTHERN PATAGONIA ICE FIELD",
      date: "FEB 2024",
      rule: "Unhurried Observation",
      note: "Speed produces noise; patience uncovers truth. We lived in tents for 12 days before turning on the cinema camera, waiting until the glaciologists ceased feeling observed.",
    },
    {
      entry: "LOG_02",
      location: "KYOTO URUSHI LACQUER ATELIER",
      date: "OCT 2023",
      rule: "Tactile Natural Light",
      note: "Refused all artificial softboxes. In a 300-year-old wooden workshop, hot halogen lights disrupt delicate natural drying temperatures. We worked only with morning paper screen light.",
    },
    {
      entry: "LOG_03",
      location: "NORTH ATLANTIC DORY FLEET",
      date: "NOV 2022",
      rule: "Permanent Resonance",
      note: "Films crafted to remain relevant twenty years from today. We record the sound of ocean spray hitting wooden hulls rather than trendy synthetic background music.",
    },
  ];

  return (
    <section id="about" className="relative px-4 py-28 sm:px-8 border-t-2 border-black font-serif" style={{ backgroundColor: bg, color: ink }}>
      <div className="mx-auto max-w-5xl">
        {/* Header Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-black pb-4 font-mono text-xs uppercase tracking-widest text-black/70">
          <div className="flex items-center gap-2 text-[#D7472E]">
            <Map size={15} />
            <span>EXCERPT // DIRECTOR'S EXPEDITION LOGBOOK</span>
          </div>
          <span>TRANSCRIBED FROM FIELD RECORDINGS</span>
        </div>

        {/* Big Editorial Headline */}
        <div className="mt-12">
          <Editable
            as="h2"
            value={props?.headline || "GOOD WORK IS A POINT OF VIEW, TESTED AGAINST TIME AND WEATHER."}
            className="text-4xl font-normal uppercase leading-[0.9] tracking-[-0.05em] sm:text-6xl lg:text-7xl"
          />
          <Editable
            as="p"
            value={props?.story || "I partner with documentary productions, investigative journals, and human-centered brands at the exact moment a story requires more courage. Together we find the frame, the silence, and the tactile details that make the film unmistakably authentic."}
            className="mt-8 max-w-2xl font-sans text-lg font-light leading-relaxed text-black/80 sm:text-xl"
          />
        </div>

        {/* EXPEDITION STATS ROW — ZERO CARDS! Ledger columns */}
        <div className="mt-16 grid grid-cols-2 gap-8 border-t-2 border-b-2 border-black py-8 font-mono sm:grid-cols-4">
          <div>
            <span className="block text-4xl text-[#D7472E] font-normal sm:text-5xl">34</span>
            <span className="mt-1 block text-xs font-bold uppercase text-black">Expeditions</span>
            <span className="text-[11px] text-black/60">on-location shoots</span>
          </div>
          <div>
            <span className="block text-4xl text-black font-normal sm:text-5xl">10+</span>
            <span className="mt-1 block text-xs font-bold uppercase text-black">Years in Field</span>
            <span className="text-[11px] text-black/60">photojournalism</span>
          </div>
          <div>
            <span className="block text-4xl text-[#D7472E] font-normal sm:text-5xl">6x</span>
            <span className="mt-1 block text-xs font-bold uppercase text-black">Festival Laurels</span>
            <span className="text-[11px] text-black/60">Vimeo & Tribeca</span>
          </div>
          <div>
            <span className="block text-4xl text-black font-normal sm:text-5xl">2.8M</span>
            <span className="mt-1 block text-xs font-bold uppercase text-black">Doc Viewers</span>
            <span className="text-[11px] text-black/60">average 74% retention</span>
          </div>
        </div>

        {/* FIELD LOG TRANSCRIPTS — ZERO CARDS! Typewriter Ledger Flow */}
        <div className="mt-16 space-y-6">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#D7472E] block">
            ETHICAL SHOOTING CODES & FIELD LOG ENTRIES:
          </span>

          <div className="divide-y-2 divide-black border-t-2 border-b-2 border-black font-mono">
            {fieldLog.map((log, idx) => (
              <div key={idx} className="py-8 grid gap-4 lg:grid-cols-[0.4fr_1fr]">
                <div>
                  <span className="text-xs text-[#D7472E] block">{log.entry} // {log.date}</span>
                  <span className="text-xs font-bold uppercase text-black block mt-1">{log.location}</span>
                  <span className="text-sm font-semibold uppercase text-[#D7472E] block mt-2">{log.rule}</span>
                </div>
                <div>
                  <p className="font-sans text-base leading-relaxed text-black/85">
                    "{log.note}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-10 flex items-center justify-between font-mono text-xs text-black/50">
          <span>[END OF EXPEDITION LOGBOOK EXCERPT]</span>
          <a href="#projects" className="flex items-center gap-2 text-[#D7472E] font-bold hover:underline">
            <span>UNROLL CONTACT SHEET NEGATIVES</span>
            <ArrowDownRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;
