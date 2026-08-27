import { Sparkles, TrendingUp, ArrowRight, Bot, Cpu, MessageSquare, Bell, ThumbsUp, Heart, Smile } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";
import type { HeroProps } from "@/types/builder.schema";

type Props = BlockComponentProps<HeroProps>;

export function AIProduct3Hero({ props, theme, onChange }: Props) {
  const darkInk = theme?.ink || "#1A0D14";
  const accent = theme?.accent || "#E11D48";

  return (
    <section className="relative w-full pt-12 pb-28 px-4 sm:px-6 overflow-hidden text-white" style={{ background: darkInk }}>
      
      {/* Background Animated Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[300px] sm:h-[400px] opacity-30 rounded-full blur-[140px] pointer-events-none animate-pulse" style={{ background: accent }} />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 text-xs font-semibold text-rose-200 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:scale-105">
          <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-spin" style={{ animationDuration: "6s" }} />
          <Editable
            value={props.badgeText || "WideApp raises $120M to fuel Next-Gen AI Growth"}
            onChange={(v) => onChange({ badgeText: v })}
            className="inline"
          />
        </div>

        {/* Headline */}
        <Editable
          as="h1"
          value={props.headline || "Experience smarter, faster and more engaging AI portfolios"}
          onChange={(v) => onChange({ headline: v })}
          className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6 max-w-4xl"
        />

        {/* Subheadline */}
        <Editable
          as="p"
          value={props.subheadline || "WideApp GO gives you free access to enterprise AI models and autonomous business communication."}
          onChange={(v) => onChange({ subheadline: v })}
          className="text-sm sm:text-base lg:text-lg text-white/70 max-w-2xl mb-10 leading-relaxed font-normal"
        />

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-3">
          <a
            href="#portfolio"
            className="px-7 py-3.5 rounded-xl font-bold text-sm text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 group"
            style={{ background: accent }}
          >
            <span>Explore AI Portfolio</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
          </a>
          <a
            href="#demo"
            className="px-7 py-3.5 rounded-xl font-bold text-sm bg-white/5 border border-white/15 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            View Live Demos
          </a>
        </div>

        <p className="text-[11px] text-white/40 font-medium tracking-wide mb-14">
          *Deployed across Cloud, Web, and Mobile Infrastructure
        </p>

        {/* Dynamic Interactive Mockups */}
        <div className="relative w-full max-w-5xl min-h-[460px] sm:min-h-[500px] flex justify-center items-center">
          
          <div className="absolute w-[360px] sm:w-[420px] h-[360px] sm:h-[420px] rounded-full border border-white/5 bg-white/[0.02] pointer-events-none animate-ping" style={{ animationDuration: "8s" }} />

          {/* Floating Metric Card (Left Top) */}
          <div className="hidden lg:block absolute -left-2 top-2 w-56 p-5 rounded-2xl bg-white text-gray-900 shadow-2xl text-left border border-white/20 z-25 transition-all duration-500 hover:scale-105 hover:-translate-y-1">
            <div className="text-3xl font-extrabold flex items-center gap-1.5" style={{ color: darkInk }}>
              48% <TrendingUp className="h-5 w-5 animate-bounce" style={{ color: accent }} />
            </div>
            <div className="text-xs font-medium text-gray-500 mt-1 mb-3">
              Increase in AI Automation
            </div>
            <div className="space-y-1.5">
              <div className="w-full h-2.5 bg-rose-100 rounded-full overflow-hidden">
                <div className="w-[75%] h-full rounded-full transition-all duration-1000" style={{ background: accent }} />
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="w-[45%] h-full bg-rose-300 rounded-full" />
              </div>
            </div>
          </div>

          {/* Floating Chat Card (Left Bottom) */}
          <div className="hidden lg:block absolute -left-10 bottom-4 w-80 p-4 rounded-2xl bg-white text-gray-900 shadow-2xl text-left border border-white/20 z-25 transition-all duration-500 hover:scale-105">
            <div className="flex items-center gap-2.5 mb-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="AI Lead"
                className="w-7 h-7 rounded-full object-cover border border-gray-200"
              />
              <span className="text-xs font-bold text-gray-800">Janet Cooper</span>
              <span className="text-[10px] text-gray-400 ml-auto">10:15am</span>
            </div>
            <div className="p-3 rounded-xl bg-gray-100 text-xs text-gray-700 mb-2 leading-relaxed">
              Neural model training is complete across all cluster nodes.
            </div>
            <div className="p-3 rounded-xl text-xs text-white ml-auto max-w-[85%] font-medium shadow-md mb-3" style={{ background: accent }}>
              Deploying autonomous inference agent now!
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-full text-[11px] font-semibold text-gray-600">
                <ThumbsUp className="h-3 w-3" style={{ color: accent }} /> 2
              </div>
              <div className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-full text-[11px] font-semibold text-gray-600">
                <Heart className="h-3 w-3" style={{ color: accent }} /> 4
              </div>
              <div className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-full text-[11px] font-semibold text-gray-600">
                <Smile className="h-3 w-3 text-amber-500" /> 1
              </div>
            </div>
          </div>

          {/* Center Mobile Mockup with Responsive Neural Image */}
          <div className="relative z-30 w-[270px] sm:w-[290px] bg-white rounded-[44px] p-3 shadow-2xl border-[6px] border-[#20040B] transition-all duration-500 hover:scale-105">
            <div className="w-24 h-4 bg-gray-900 mx-auto rounded-b-xl mb-3 flex items-center justify-center">
              <div className="w-8 h-1 bg-gray-700 rounded-full" />
            </div>

            <div className="bg-gray-50 rounded-[32px] p-4 text-gray-900 text-left min-h-[440px] overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-5 h-0.5 bg-gray-700 relative before:content-[''] before:absolute before:-top-1.5 before:w-5 before:h-0.5 before:bg-gray-700 after:content-[''] after:absolute after:top-1.5 after:w-3 after:h-0.5 after:bg-gray-700" />
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center">
                      <Sparkles className="h-3 w-3 text-rose-600" />
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                      alt="User Profile"
                      className="w-6 h-6 rounded-full object-cover border border-gray-300"
                    />
                  </div>
                </div>

                {/* Responsive Image Inside Mobile Frame */}
                <div className="relative w-full h-28 rounded-2xl overflow-hidden mb-3 shadow-sm border border-gray-200 group">
                  <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80"
                    alt="Neural AI Visual"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2.5">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">Active Neural Stream</span>
                  </div>
                </div>

                <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">AI Insights</div>
                <div className="text-lg font-extrabold text-gray-900 mb-3">Overview</div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="p-2.5 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <div className="text-[10px] text-gray-400">Inferences</div>
                    <div className="text-sm font-extrabold text-gray-900">815,479</div>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <div className="text-[10px] text-gray-400">Models</div>
                    <div className="text-sm font-extrabold text-gray-900">102</div>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="p-2 bg-white rounded-xl border border-gray-100 flex items-center justify-between text-xs font-semibold">
                  <span>Agent Hub</span>
                  <span className="text-gray-400">›</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Agent Card (Right Top) */}
          <div className="hidden lg:block absolute -right-4 top-4 w-72 p-4 rounded-2xl bg-white text-gray-900 shadow-2xl text-left border border-white/20 z-25 transition-all duration-500 hover:scale-105">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                <Bot className="h-3.5 w-3.5" />
              </div>
              <span className="text-xs font-bold text-gray-800">Shelter AI Agent</span>
            </div>
            <div className="text-xs text-gray-600 leading-normal mb-3">
              I am optimizing your neural data pipelines... <span className="text-rose-600 underline font-semibold cursor-pointer">Learn more</span>
            </div>
            <button className="w-full py-2 px-3 rounded-xl text-white font-semibold text-xs text-center shadow-sm transition-transform active:scale-95" style={{ background: accent }}>
              Optimize Latency Now
            </button>
          </div>

          {/* Floating Architect Card & Tools (Right Bottom) */}
          <div className="hidden lg:flex absolute -right-12 bottom-6 items-center z-25">
            <div className="w-64 p-4 rounded-2xl bg-white text-gray-900 shadow-2xl text-left border border-white/20 transition-all duration-500 hover:scale-105">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                  alt="Architect"
                  className="w-6 h-6 rounded-full object-cover border border-gray-200"
                />
                <span className="text-xs font-bold text-gray-800">Jack Cooper</span>
              </div>
              <div className="text-xs font-bold text-gray-900 mb-1">Model Synthesis Verified</div>
              <p className="text-[11px] text-gray-500 leading-tight">
                Multimodal AI pipeline achieved 99.8% precision rate.
              </p>
            </div>

            <div className="ml-2 bg-gray-900/90 backdrop-blur-md p-1.5 rounded-xl flex flex-col gap-2 text-white shadow-xl">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center transition-transform hover:scale-110" style={{ background: accent }}>
                <Cpu className="h-3.5 w-3.5 text-white" />
              </div>
              <div className="w-6 h-6 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors">
                <MessageSquare className="h-3 w-3" />
              </div>
              <div className="w-6 h-6 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors">
                <Bell className="h-3 w-3" />
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Partner Brand Bar */}
      <div className="w-full mt-16 pt-6 border-t border-white/10 bg-black/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold text-rose-300">
            <span>INNOVATORS WE SERVE</span>
          </div>
          <div className="flex items-center gap-8 sm:gap-14 opacity-40 font-bold tracking-widest text-xs uppercase text-white">
            <span>SCENELAND</span>
            <span>NORNOLE</span>
            <span className="font-serif capitalize text-sm tracking-normal">Panasonic</span>
            <span>Hard Rock</span>
            <span>WALKER</span>
          </div>
        </div>
      </div>
    </section>
  );
}