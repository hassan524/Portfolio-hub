// @ts-nocheck
import { Star, Award, Briefcase, Users, Zap, Mail, UserCheck, MessageCircle, Share2, LineChart } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";
type Props = BlockComponentProps<any>;

export function AIProduct3About({ props, theme, onChange }: Props) {
  const darkInk = theme?.ink || "#1A0D14";
  const accent = theme?.accent || "#E11D48";
  const surface = theme?.surface || "#F9F6F7";

  return (
    <section className="bg-white py-24 px-4 sm:px-6" style={{ color: darkInk }}>
      <div className="max-w-7xl mx-auto">
        
        {/* Ratings Pill */}
        <div className="flex items-center justify-center gap-6 mb-8 text-xs font-bold text-gray-600">
          <div className="flex items-center gap-1.5 transition-transform hover:scale-105">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400 animate-spin" style={{ animationDuration: "10s" }} />
            <Editable>4.9 on AppStore</Editable>
          </div>
          <div className="flex items-center gap-1.5 transition-transform hover:scale-105">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <Editable>4.8 on PlayStore</Editable>
          </div>
        </div>

        {/* Main Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Editable
            as="h2"
            className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-snug"
          >{props.heading || "WideApp GO stands at the forefront of AI innovation, bridging the digital divide between your team and autonomous agents."}</Editable>
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
                className="p-8 rounded-3xl border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group cursor-pointer"
                style={{ background: surface }}
              >
                <div className="h-11 w-11 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" style={{ color: accent }}>
                  <IconComponent className="h-5 w-5" />
                </div>
                <Editable
                  as="h3"
                  className="text-base font-bold mb-2 leading-snug"
                >{item.defaultTitle}</Editable>
                <Editable
                  as="p"
                  className="text-xs opacity-70 leading-relaxed"
                >{item.defaultDesc}</Editable>
              </div>
            );
          })}
        </div>

        {/* Ecosystem Feature Showcase */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-extrabold uppercase tracking-widest block mb-3" style={{ color: accent }}>
            INTRODUCING WIDEAPP AI ECOSYSTEM
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Harnessing AI for seamless communication
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Ecosystem Card 1 */}
          <div className="p-8 sm:p-10 rounded-3xl border border-gray-200/60 shadow-lg shadow-gray-200/50 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1" style={{ background: surface }}>
            <div className="mb-8">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                CREATE YOUR NETWORK
              </span>
              <h3 className="text-2xl font-bold mb-4">
                Get started in minutes with a professional communication hub
              </h3>
              <div className="flex gap-3 mb-8">
                <a href="#demo" className="px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md transition-transform hover:scale-105 active:scale-95" style={{ background: accent }}>
                  Explore Models
                </a>
                <a href="#learn" className="px-5 py-2.5 rounded-xl text-xs font-bold bg-white text-gray-700 border border-gray-200 transition-colors hover:bg-gray-50">
                  Learn More
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 grid grid-cols-2 gap-4 shadow-sm">
              <div>
                <div className="text-2xl font-extrabold" style={{ color: darkInk }}>48%</div>
                <Editable className="text-[11px] text-gray-500">Based in communication</Editable>
              </div>
              <div>
                <div className="text-2xl font-extrabold" style={{ color: darkInk }}>15min</div>
                <Editable className="text-[11px] text-gray-500">Average Setup Time</Editable>
              </div>
            </div>
          </div>

          {/* Ecosystem Card 2 */}
          <div className="p-8 sm:p-10 rounded-3xl border border-gray-200/60 shadow-lg shadow-gray-200/50 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1" style={{ background: surface }}>
            <div className="mb-8">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
                CONNECT EVERYONE
              </span>
              <h3 className="text-2xl font-bold mb-6">
                Bring your entire ecosystem into one platform
              </h3>

              <div className="space-y-3 text-xs text-gray-600 font-medium mb-8">
                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4" style={{ color: accent }} />
                  <Editable as="span">Send invitations via link, email or text</Editable>
                </div>
                <div className="flex items-center gap-2.5">
                  <UserCheck className="h-4 w-4" style={{ color: accent }} />
                  <Editable as="span">Assign different roles and permissions</Editable>
                </div>
                <div className="flex items-center gap-2.5">
                  <MessageCircle className="h-4 w-4" style={{ color: accent }} />
                  <Editable as="span">Communicate through direct messages & team chats</Editable>
                </div>
                <div className="flex items-center gap-2.5">
                  <Share2 className="h-4 w-4" style={{ color: accent }} />
                  <Editable as="span">Connect external partners with limited access</Editable>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-3 text-xs font-bold text-gray-800">
                <span className="flex items-center gap-1.5">
                  <LineChart className="h-4 w-4" style={{ color: accent }} /> User Growth Analytics
                </span>
                <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                  +24% vs last week
                </span>
              </div>
              <div className="h-20 w-full flex items-end gap-2 pt-2">
                {[35, 45, 30, 60, 75, 50, 90, 100].map((val, idx) => (
                  <div
                    key={idx}
                    style={{ height: `${val}%`, background: accent }}
                    className="flex-1 rounded-t-md opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-y-105"
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