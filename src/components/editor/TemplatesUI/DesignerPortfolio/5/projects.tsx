// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { ArrowUpRight, Sparkles, TrendingUp } from "lucide-react";

interface ProjectsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

const DEFAULT_PROJECTS = [
  {
    title: "Bloom Calendar & Flow",
    category: "Mobile App",
    year: "2026",
    metric: "+42% Daily Active Retention",
    desc: "A mindful daily scheduling app designed with natural circadian rhythms, sensory soundscapes, and gesture navigation.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    tags: ["iOS Design", "Motion Physics", "Sound Design"]
  },
  {
    title: "Claypad Workspace",
    category: "Web App",
    year: "2025",
    metric: "3.2x Team Collaboration Speed",
    desc: "Collaborative knowledge canvas helping remote async teams organize brainstorming notes into structured product specs.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80",
    tags: ["Canvas UX", "Design Systems", "Real-Time Sync"]
  },
  {
    title: "Radiant Multi-Brand Token System",
    category: "Design System",
    year: "2025",
    metric: "98% Engineer Adoption Rate",
    desc: "Unified design token architecture governing 4 disparate enterprise SaaS platforms with dark mode and WCAG AAA compliance.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80",
    tags: ["Figma Variables", "React Tokens", "Accessibility"]
  },
  {
    title: "Haven Health Companion",
    category: "Mobile App",
    year: "2026",
    metric: "4.9/5 App Store Rating",
    desc: "Patient care tracker that reduces medical anxiety through gentle micro-interactions and clear visual dosage summaries.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
    tags: ["HealthTech", "User Research", "Prototyping"]
  }
];

export const DesignerPortfolio5Projects: React.FC<ProjectsProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };
  const [activeTab, setActiveTab] = useState("All");

  const items = p.items && p.items.length > 0 ? p.items : DEFAULT_PROJECTS;
  const filtered = activeTab === "All" ? items : items.filter((it) => it.category === activeTab);

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  return (
    <section id="projects" className="py-24 bg-[#1C1210] text-[#FFF1E6] border-b border-[#FF7A45]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Header & Category Filters */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-[#FF7A45]/20">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#FF7A45] font-semibold">
              Selected Projects
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#FFF1E6] tracking-tight mt-1">
              <Editable
                value={p.title || "Crafting tools people actually love using."}
                onChange={(val) => handleUpdate("title", val)}
              />
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {["All", "Mobile App", "Web App", "Design System"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeTab === cat
                    ? "bg-[#FF7A45] text-[#1C1210] shadow-[0_0_15px_rgba(255,122,69,0.3)]"
                    : "bg-[#2A1E1C] text-[#FFF1E6]/70 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-[#2A1E1C]/60 border border-[#FF7A45]/25 overflow-hidden hover:border-[#FF7A45] hover:-translate-y-1 transition-all group flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#1C1210]/90 border border-[#FF7A45]/40 text-[#FFA07A] text-xs font-medium flex items-center gap-1.5 shadow-sm">
                  <TrendingUp className="w-3.5 h-3.5 text-[#FF7A45]" />
                  <span>{item.metric}</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-xs text-[#FFA07A] font-semibold">{item.category} · {item.year}</div>
                  <h3 className="text-2xl font-bold text-[#FFF1E6] group-hover:text-[#FF7A45] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#FEE4D7]/70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#FF7A45]/15 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded-full text-[11px] bg-[#1C1210] border border-white/10 text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    className="p-2.5 rounded-full bg-[#FF7A45]/15 text-[#FF7A45] group-hover:bg-[#FF7A45] group-hover:text-[#1C1210] transition-all"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DesignerPortfolio5Projects;
