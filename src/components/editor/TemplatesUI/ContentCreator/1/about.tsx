// @ts-nocheck
import { ArrowUpRight, Check, Film, Play, Sparkles } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function About({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || "#A0A5B5";
  const accent = theme?.accent || "#7DD3FC";

  return (
    <section id="about" className="relative px-5 py-24 sm:px-8 sm:py-32 border-t border-white/10" style={{ backgroundColor: bg, color: ink }}>
      <div className="mx-auto max-w-7xl">
        {/* Straight Header Label */}
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#7DD3FC]">
          <Film size={14} />
          <Editable value={props?.label || "ABOUT THE DIRECTOR & CHANNEL"} />
        </div>

        {/* Main Straight-Aligned 2-Column Grid */}
        <div className="mt-8 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Left Column: Big Simple Writing & Creator Story */}
          <div>
            <Editable
              as="h2"
              value={props?.headline || "I MAKE VIDEOS THAT PEOPLE ACTUALLY FINISH WATCHING."}
              onChange={(v) => onChange?.({ headline: v })}
              className="text-4xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-6xl text-white uppercase"
            />

            <Editable
              as="p"
              value={props?.story || "Over the last eight years, I've built a YouTube channel of 1.4 million loyal subscribers by focusing on one simple rule: treat online video like real cinema. From high-retention documentary essays to commercial brand films, I direct and edit every project with obsessive care for story, sound, and pace."}
              onChange={(v) => onChange?.({ story: v })}
              className="mt-8 text-lg font-normal leading-relaxed text-white/80 sm:text-xl"
            />

            {/* Directorial Standards: Straight Clean List (Distinct from Template 3) */}
            <div className="mt-10 border-t border-b border-white/15 py-8">
              <span className="text-xs font-bold uppercase tracking-widest text-[#7DD3FC] block mb-6">
                Directorial Standards on Every Film:
              </span>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="border-l-2 border-[#7DD3FC] pl-4">
                  <span className="text-sm font-semibold text-white block">Story-First Structure</span>
                  <p className="text-xs text-white/60 mt-1">Every video is scripted with a 3-act narrative arc to maintain viewer retention from minute 1 to minute 20.</p>
                </div>
                <div className="border-l-2 border-[#7DD3FC] pl-4">
                  <span className="text-sm font-semibold text-white block">Cinema-Grade Production</span>
                  <p className="text-xs text-white/60 mt-1">Filmed in 4K ProRes on cinema cameras with bespoke lighting, tailored color grades, and original sound design.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-[#7DD3FC] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0A0A0C] hover:scale-105 transition"
              >
                <span>Watch Featured Films</span>
                <ArrowUpRight size={14} />
              </a>
              <span className="text-xs uppercase tracking-wider text-white/50">Based in Brooklyn • Working Worldwide</span>
            </div>
          </div>

          {/* Right Column: Studio Photo Showcase & Production Focus */}
          <div className="space-y-6">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/20 bg-black">
              <img
                src={props?.aboutImage || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1000&q=85"}
                alt="Filmmaking Studio & Edit Suite"
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span className="font-mono text-xs uppercase tracking-wider text-[#7DD3FC]">
                  BROOKLYN STUDIO // SONY FX6 CINEMA RIG
                </span>
                <span className="rounded bg-black/60 px-2 py-1 text-[11px] text-white">4K EDIT SUITE</span>
              </div>
            </div>

            {/* Straight Capabilities Checklist */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-white/60 block">
                WHAT I PRODUCE & DIRECT:
              </span>

              <div className="space-y-3 text-sm text-white/85">
                <div className="flex items-start gap-3">
                  <Check size={16} className="text-[#7DD3FC] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Long-Form Video Essays</strong>
                    <span className="text-xs text-white/60">Narrative 15-30 minute documentaries exploring craft, technology, and culture.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check size={16} className="text-[#7DD3FC] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Sponsor Integrations That Don't Get Skipped</strong>
                    <span className="text-xs text-white/60">Seamless mid-rolls and dedicated segments that viewers genuinely enjoy watching.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Check size={16} className="text-[#7DD3FC] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Commercial Launch Films</strong>
                    <span className="text-xs text-white/60">High-end product launches and brand anthems directed for international media brands.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
