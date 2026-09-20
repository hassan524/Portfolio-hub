// @ts-nocheck
import { Sparkles, TrendingUp, ArrowRight, Bot, Cpu, MessageSquare, Bell, ThumbsUp, Heart, Smile } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";

type Props = BlockComponentProps<any>;

export function AIProduct3Hero({ props = {}, theme, onChange }: Props) {
  const bg = theme?.bg || "#140C12";
  const bgSecond = theme?.["bg-second"] || "#FFF5F8";
  const ink = theme?.ink || "#FFFFFF";
  const inkSecond = theme?.["ink-second"] || "#1E0C17";
  const surface = theme?.surface || "#231420";
  const accent = theme?.accent || "#FF3B76";

  return (
    <section className="relative w-full pt-14 pb-28 px-4 sm:px-6 overflow-hidden transition-colors" style={{ backgroundColor: bg, color: ink }}>

      {/* Layered Luxury Ambient Glows */}
      <div 
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[650px] sm:w-[900px] h-[350px] sm:h-[450px] opacity-35 rounded-full blur-[160px] pointer-events-none" 
        style={{ background: `radial-gradient(ellipse at 50% 50%, ${accent} 0%, #7E183E 50%, transparent 75%)` }} 
      />
      <div 
        className="absolute top-64 right-10 w-[350px] h-[350px] opacity-20 rounded-full blur-[130px] pointer-events-none" 
        style={{ background: accent }} 
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">

        {/* Top Badge */}
        <div
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-8 text-xs font-semibold backdrop-blur-xl transition-all duration-300 hover:scale-105 border shadow-sm"
          style={{ 
            backgroundColor: `${surface}CC`, 
            borderColor: `${accent}35`, 
            color: accent 
          }}
        >
          <Sparkles className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: "6s", color: accent }} />
          <Editable
            value={props?.badgeText || "WideApp raises $120M to fuel Next-Gen AI Growth"}
            onChange={(v) => onChange?.({ badgeText: v })}
            className="inline tracking-wide"
          />
        </div>

        {/* Headline */}
        <Editable
          as="h1"
          value={props?.headline || "Experience smarter, faster and more engaging AI portfolios"}
          onChange={(v) => onChange?.({ headline: v })}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.07] mb-6 max-w-4xl"
          style={{ color: ink }}
        />

        {/* Subheadline */}
        <Editable
          as="p"
          value={props?.subheadline || "WideApp GO gives you free access to enterprise AI models and autonomous business communication."}
          onChange={(v) => onChange?.({ subheadline: v })}
          className="text-sm sm:text-base lg:text-lg max-w-2xl mb-10 leading-relaxed font-normal opacity-85"
          style={{ color: ink }}
        />

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
          <a
            href="#portfolio"
            className="px-8 py-4 rounded-xl font-bold text-sm shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 group cursor-pointer"
            style={{ 
              background: `linear-gradient(135deg, ${accent}, #E0265F)`, 
              color: ink,
              boxShadow: `0 0 35px ${accent}60` 
            }}
          >
            <span>Explore AI Portfolio</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
          </a>
          <a
            href="#demo"
            className="px-8 py-4 rounded-xl font-bold text-sm border backdrop-blur-xl transition-all duration-300 hover:scale-105 cursor-pointer"
            style={{ 
              backgroundColor: `${surface}B3`, 
              borderColor: `${accent}30`, 
              color: ink 
            }}
          >
            View Live Demos
          </a>
        </div>

        {/* Dynamic Interactive Mockups */}
        <div className="relative w-full max-w-5xl min-h-[480px] sm:min-h-[520px] flex justify-center items-center mt-6">

          <div 
            className="absolute w-[380px] sm:w-[460px] h-[380px] sm:h-[460px] rounded-full border pointer-events-none animate-ping opacity-25" 
            style={{ borderColor: accent, animationDuration: "9s" }} 
          />

          {/* Floating Metric Card (Left Top) */}
          <div
            className="hidden lg:block absolute -left-2 top-4 w-60 p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-left border z-25 backdrop-blur-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-1"
            style={{ 
              backgroundColor: `${surface}F2`, 
              borderColor: `${accent}30`, 
              color: ink 
            }}
          >
            <div className="text-3xl font-extrabold flex items-center gap-2" style={{ color: ink }}>
              48% <TrendingUp className="h-5 w-5 animate-bounce" style={{ color: accent }} />
            </div>
            <div className="text-xs font-medium mt-1 mb-3" style={{ color: ink, opacity: 0.75 }}>
              Increase in AI Automation
            </div>
            <div className="space-y-1.5">
              <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: `${accent}25` }}>
                <div className="w-[75%] h-full rounded-full transition-all duration-1000" style={{ background: `linear-gradient(to right, ${accent}, #FF759F)` }} />
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: `${bg}90` }}>
                <div className="w-[45%] h-full rounded-full" style={{ background: `${accent}70` }} />
              </div>
            </div>
          </div>

          {/* Floating Chat Card (Left Bottom) */}
          <div
            className="hidden lg:block absolute -left-10 bottom-4 w-84 p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-left border z-25 backdrop-blur-2xl transition-all duration-500 hover:scale-105"
            style={{ 
              backgroundColor: `${surface}F2`, 
              borderColor: `${accent}30`, 
              color: ink 
            }}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="AI Lead"
                className="w-7 h-7 rounded-full object-cover border"
                style={{ borderColor: `${accent}40` }}
              />
              <span className="text-xs font-bold" style={{ color: ink }}>Janet Cooper</span>
              <span className="text-[10px] ml-auto font-mono" style={{ color: ink, opacity: 0.65 }}>10:15am</span>
            </div>
            <div className="p-3 rounded-xl text-xs mb-2 leading-relaxed border" style={{ backgroundColor: `${bg}80`, borderColor: `${accent}20`, color: ink }}>
              Neural model training is complete across all cluster nodes.
            </div>
            <div 
              className="p-3 rounded-xl text-xs ml-auto max-w-[85%] font-medium shadow-md mb-3" 
              style={{ 
                background: `linear-gradient(135deg, ${accent}, #E0265F)`, 
                color: ink,
                boxShadow: `0 4px 15px ${accent}40`
              }}
            >
              Deploying autonomous inference agent now!
            </div>
            <div className="flex items-center gap-2 pt-2 border-t" style={{ borderColor: `${surface}` }}>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border" style={{ backgroundColor: `${bg}70`, borderColor: `${accent}20`, color: ink }}>
                <ThumbsUp className="h-3 w-3" style={{ color: accent }} /> 2
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border" style={{ backgroundColor: `${bg}70`, borderColor: `${accent}20`, color: ink }}>
                <Heart className="h-3 w-3" style={{ color: accent }} /> 4
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border" style={{ backgroundColor: `${bg}70`, borderColor: `${accent}20`, color: ink }}>
                <Smile className="h-3 w-3 text-amber-400" /> 1
              </div>
            </div>
          </div>

          {/* Center Mobile Mockup with Responsive Neural Image */}
          <div 
            className="relative z-30 w-[275px] sm:w-[300px] rounded-[46px] p-3 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.85),0_0_35px_rgba(255,59,118,0.18)] border-[5px] transition-all duration-500 hover:scale-[1.02]" 
            style={{ 
              backgroundColor: surface, 
              borderColor: `${accent}35` 
            }}
          >
            {/* Dynamic Island Speaker Notch */}
            <div className="w-24 h-4 bg-black/90 mx-auto rounded-b-xl mb-3 flex items-center justify-center gap-1 border-b border-white/10">
              <div className="w-2.5 h-2.5 rounded-full bg-black/80 border border-white/10" />
              <div className="w-8 h-1 bg-gray-700 rounded-full" />
            </div>

            <div className="rounded-[32px] p-4 text-left min-h-[440px] overflow-hidden flex flex-col justify-between" style={{ backgroundColor: `${bg}F2`, color: ink }}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-5 h-0.5 bg-gray-500 relative before:content-[''] before:absolute before:-top-1.5 before:w-5 before:h-0.5 before:bg-gray-500 after:content-[''] after:absolute after:top-1.5 after:w-3 after:h-0.5 after:bg-gray-500" />
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: `${accent}30`, color: accent }}>
                      <Sparkles className="h-3 w-3" />
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                      alt="User Profile"
                      className="w-6 h-6 rounded-full object-cover border"
                      style={{ borderColor: `${accent}40` }}
                    />
                  </div>
                </div>

                {/* Responsive Image Inside Mobile Frame */}
                <div className="relative w-full h-28 rounded-2xl overflow-hidden mb-3 shadow-md border group" style={{ borderColor: `${accent}30` }}>
                  <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80"
                    alt="Neural AI Visual"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">Active Neural Stream</span>
                  </div>
                </div>

                <div className="text-[10px] uppercase font-bold tracking-wider" style={{ color: accent }}>AI Insights</div>
                <div className="text-lg font-extrabold mb-3" style={{ color: ink }}>Overview</div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="p-2.5 rounded-xl border shadow-sm" style={{ backgroundColor: surface, borderColor: `${accent}20` }}>
                    <div className="text-[10px]" style={{ color: ink, opacity: 0.75 }}>Inferences</div>
                    <div className="text-sm font-extrabold" style={{ color: ink }}>815,479</div>
                  </div>
                  <div className="p-2.5 rounded-xl border shadow-sm" style={{ backgroundColor: surface, borderColor: `${accent}20` }}>
                    <div className="text-[10px]" style={{ color: ink, opacity: 0.75 }}>Models</div>
                    <div className="text-sm font-extrabold" style={{ color: ink }}>102</div>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="p-2.5 rounded-xl border flex items-center justify-between text-xs font-semibold shadow-sm transition-all hover:border-pink-500/50" style={{ backgroundColor: surface, borderColor: `${accent}25`, color: ink }}>
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Agent Hub
                  </span>
                  <span style={{ color: accent }}>›</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Agent Card (Right Top) */}
          <div
            className="hidden lg:block absolute -right-4 top-4 w-76 p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-left border z-25 backdrop-blur-2xl transition-all duration-500 hover:scale-105"
            style={{ 
              backgroundColor: `${surface}F2`, 
              borderColor: `${accent}30`, 
              color: ink 
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: `${accent}25`, color: accent }}>
                <Bot className="h-3.5 w-3.5" />
              </div>
              <span className="text-xs font-bold" style={{ color: ink }}>Shelter AI Agent</span>
            </div>
            <div className="text-xs leading-normal mb-3" style={{ color: ink, opacity: 0.8 }}>
              I am optimizing your neural data pipelines... <span className="underline font-semibold cursor-pointer" style={{ color: accent }}>Learn more</span>
            </div>
            <button
              className="w-full py-2.5 px-3 rounded-xl font-semibold text-xs text-center shadow-md transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
              style={{ 
                background: `linear-gradient(135deg, ${accent}, #E0265F)`, 
                color: ink,
                boxShadow: `0 4px 15px ${accent}40`
              }}
            >
              <span>Optimize Latency Now</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* Floating Architect Card & Tools (Right Bottom) */}
          <div className="hidden lg:flex absolute -right-12 bottom-6 items-center z-25">
            <div
              className="w-68 p-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-left border backdrop-blur-2xl transition-all duration-500 hover:scale-105"
              style={{ 
                backgroundColor: `${surface}F2`, 
                borderColor: `${accent}30`, 
                color: ink 
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                  alt="Architect"
                  className="w-6 h-6 rounded-full object-cover border"
                  style={{ borderColor: `${accent}40` }}
                />
                <span className="text-xs font-bold" style={{ color: ink }}>Jack Cooper</span>
              </div>
              <div className="text-xs font-bold mb-1" style={{ color: ink }}>Model Synthesis Verified</div>
              <p className="text-[11px] leading-tight" style={{ color: ink, opacity: 0.75 }}>
                Multimodal AI pipeline achieved 99.8% precision rate.
              </p>
            </div>

            <div 
              className="ml-2 backdrop-blur-2xl p-1.5 rounded-xl flex flex-col gap-2 shadow-xl border" 
              style={{ 
                backgroundColor: `${surface}F2`, 
                borderColor: `${accent}30`, 
                color: ink 
              }}
            >
              <div className="w-6 h-6 rounded-lg flex items-center justify-center transition-transform hover:scale-110 shadow-sm" style={{ backgroundColor: accent, color: ink }}>
                <Cpu className="h-3.5 w-3.5" />
              </div>
              <div className="w-6 h-6 rounded-lg flex items-center justify-center transition-colors hover:opacity-100" style={{ color: ink, opacity: 0.75 }}>
                <MessageSquare className="h-3 w-3" />
              </div>
              <div className="w-6 h-6 rounded-lg flex items-center justify-center transition-colors hover:opacity-100" style={{ color: ink, opacity: 0.75 }}>
                <Bell className="h-3 w-3" />
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Partner Brand Bar */}
      <div 
        className="w-full mt-20 pt-8 pb-4 border-t backdrop-blur-md" 
        style={{ 
          borderColor: `${accent}20`, 
          backgroundColor: `${surface}80` 
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-6">
          <div 
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-bold tracking-wide" 
            style={{ 
              backgroundColor: `${bg}90`, 
              borderColor: `${accent}30`, 
              color: accent 
            }}
          >
            <span>INNOVATORS WE SERVE</span>
          </div>
          <div className="flex items-center gap-8 sm:gap-14 font-bold tracking-widest text-xs uppercase" style={{ color: ink, opacity: 0.75 }}>
            <span className="hover:opacity-100 transition-opacity">SCENELAND</span>
            <span className="hover:opacity-100 transition-opacity">NORNOLE</span>
            <span className="font-serif capitalize text-sm tracking-normal hover:opacity-100 transition-opacity">Panasonic</span>
            <span className="hover:opacity-100 transition-opacity">Hard Rock</span>
            <span className="hover:opacity-100 transition-opacity">WALKER</span>
          </div>
        </div>
      </div>
    </section>
  );
}