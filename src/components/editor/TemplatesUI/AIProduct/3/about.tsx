// @ts-nocheck
import { Star, Award, Briefcase, Users, Zap, Mail, UserCheck, MessageCircle, Share2, LineChart, ArrowRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";

type Props = BlockComponentProps<any>;

export function AIProduct3About({ props = {}, theme, onChange }: Props) {
  const bg = theme?.bg || "#140C12";
  const bgSecond = theme?.["bg-second"] || "#FFF5F8";
  const ink = theme?.ink || "#FFFFFF";
  const inkSecond = theme?.["ink-second"] || "#1E0C17";
  const surface = theme?.surface || "#231420";
  const accent = theme?.accent || "#FF3B76";

  return (
    <section className="py-24 px-4 sm:px-6 transition-colors" style={{ backgroundColor: bgSecond, color: inkSecond }}>
      <div className="max-w-7xl mx-auto">
        
        {/* Ratings Pill */}
        <div className="flex items-center justify-center gap-6 mb-8 text-xs font-bold" style={{ color: inkSecond, opacity: 0.75 }}>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border shadow-sm transition-transform hover:scale-105" style={{ backgroundColor: "#FFFFFF", borderColor: `${accent}20` }}>
            <Star className="h-4 w-4 fill-amber-400 text-amber-400 animate-spin" style={{ animationDuration: "10s" }} />
            <Editable>4.9 on AppStore</Editable>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border shadow-sm transition-transform hover:scale-105" style={{ backgroundColor: "#FFFFFF", borderColor: `${accent}20` }}>
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <Editable>4.8 on PlayStore</Editable>
          </div>
        </div>

        {/* Main Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Editable
            as="h2"
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-snug"
            style={{ color: inkSecond }}
          >{props?.heading || "WideApp GO stands at the forefront of AI innovation, bridging the digital divide between your team and autonomous agents."}</Editable>
        </div>

        {/* 4 Feature Cards Grid with Fully Editable Content */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-28">
          {[
            { icon: Award, defaultTitle: "Decades of AI Research", defaultDesc: "Enterprise grade neural models designed for modern scalability." },
            { icon: Briefcase, defaultTitle: "Deep Industry Expertise", defaultDesc: "Tailored AI workflows engineered specifically for autonomous operations." },
            { icon: Users, defaultTitle: "Human-in-the-Loop Sync", defaultDesc: "Keep human teams and autonomous AI agents perfectly synchronized." },
            { icon: Zap, defaultTitle: "Elevates Human Potential", defaultDesc: "Automate complex analytical workflows with sub-second inference speeds." },
          ].map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-3xl border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group cursor-pointer"
                style={{ 
                  backgroundColor: surface, 
                  borderColor: `${accent}25`,
                  boxShadow: "0 15px 35px rgba(0,0,0,0.25)"
                }}
              >
                <div 
                  className="h-12 w-12 rounded-2xl border shadow-sm flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" 
                  style={{ 
                    backgroundColor: `${bg}90`, 
                    borderColor: `${accent}35`, 
                    color: accent 
                  }}
                >
                  <IconComponent className="h-5 w-5" />
                </div>
                <Editable
                  as="h3"
                  className="text-base font-bold mb-2.5 leading-snug"
                  style={{ color: ink }}
                >{item.defaultTitle}</Editable>
                <Editable
                  as="p"
                  className="text-xs leading-relaxed"
                  style={{ color: ink, opacity: 0.75 }}
                >{item.defaultDesc}</Editable>
              </div>
            );
          })}
        </div>

        {/* Ecosystem Feature Showcase */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-extrabold uppercase tracking-widest block mb-3" style={{ color: accent }}>
            INTRODUCING WIDEAPP AI ECOSYSTEM
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight" style={{ color: inkSecond }}>
            Harnessing AI for seamless communication
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Ecosystem Card 1 */}
          <div 
            className="p-8 sm:p-10 rounded-3xl border shadow-xl flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-1" 
            style={{ 
              backgroundColor: surface, 
              borderColor: `${accent}25` 
            }}
          >
            <div className="mb-8">
              <span className="text-[10px] font-bold uppercase tracking-wider block mb-2" style={{ color: accent }}>
                CREATE YOUR NETWORK
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: ink }}>
                Get started in minutes with a professional communication hub
              </h3>
              <div className="flex flex-wrap gap-3 mb-8">
                <a 
                  href="#demo" 
                  className="px-6 py-3 rounded-xl text-xs font-bold shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-1.5" 
                  style={{ 
                    background: `linear-gradient(135deg, ${accent}, #E0265F)`, 
                    color: ink,
                    boxShadow: `0 4px 20px ${accent}40` 
                  }}
                >
                  <span>Explore Models</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a 
                  href="#learn" 
                  className="px-6 py-3 rounded-xl text-xs font-bold border transition-colors hover:opacity-90" 
                  style={{ 
                    backgroundColor: `${bg}90`, 
                    color: ink, 
                    borderColor: `${accent}30` 
                  }}
                >
                  Learn More
                </a>
              </div>
            </div>

            <div className="rounded-2xl p-6 border grid grid-cols-2 gap-4 shadow-sm" style={{ backgroundColor: bgSecond, borderColor: `${accent}20` }}>
              <div>
                <div className="text-3xl font-extrabold" style={{ color: accent }}>48%</div>
                <Editable className="text-[11px] font-medium" style={{ color: inkSecond, opacity: 0.75 }}>Based in communication</Editable>
              </div>
              <div>
                <div className="text-3xl font-extrabold" style={{ color: accent }}>15min</div>
                <Editable className="text-[11px] font-medium" style={{ color: inkSecond, opacity: 0.75 }}>Average Setup Time</Editable>
              </div>
            </div>
          </div>

          {/* Ecosystem Card 2 */}
          <div 
            className="p-8 sm:p-10 rounded-3xl border shadow-xl flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-1" 
            style={{ 
              backgroundColor: surface, 
              borderColor: `${accent}25` 
            }}
          >
            <div className="mb-8">
              <span className="text-[10px] font-bold uppercase tracking-wider block mb-2" style={{ color: accent }}>
                CONNECT EVERYONE
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: ink }}>
                Bring your entire ecosystem into one platform
              </h3>

              <div className="space-y-3.5 text-xs font-medium mb-8" style={{ color: ink, opacity: 0.85 }}>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${accent}20`, color: accent }}>
                    <Mail className="h-3.5 w-3.5" />
                  </div>
                  <Editable as="span">Send invitations via link, email or text</Editable>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${accent}20`, color: accent }}>
                    <UserCheck className="h-3.5 w-3.5" />
                  </div>
                  <Editable as="span">Assign different roles and permissions</Editable>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${accent}20`, color: accent }}>
                    <MessageCircle className="h-3.5 w-3.5" />
                  </div>
                  <Editable as="span">Communicate through direct messages & team chats</Editable>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${accent}20`, color: accent }}>
                    <Share2 className="h-3.5 w-3.5" />
                  </div>
                  <Editable as="span">Connect external partners with limited access</Editable>
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-5 border shadow-sm" style={{ backgroundColor: bgSecond, borderColor: `${accent}20` }}>
              <div className="flex items-center justify-between mb-3 text-xs font-bold" style={{ color: inkSecond }}>
                <span className="flex items-center gap-1.5">
                  <LineChart className="h-4 w-4" style={{ color: accent }} /> User Growth Analytics
                </span>
                <span className="text-[10px] text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full font-bold border border-rose-200">
                  +24% vs last week
                </span>
              </div>
              <div className="h-20 w-full flex items-end gap-2 pt-2">
                {[35, 45, 30, 60, 75, 50, 90, 100].map((val, idx) => (
                  <div
                    key={idx}
                    style={{ 
                      height: `${val}%`, 
                      background: `linear-gradient(to top, ${accent}, #FF759F)` 
                    }}
                    className="flex-1 rounded-t-md opacity-85 hover:opacity-100 transition-all duration-300 hover:scale-y-105 shadow-sm"
                  />
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}