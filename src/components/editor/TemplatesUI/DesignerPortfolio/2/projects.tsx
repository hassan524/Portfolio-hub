// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { motion, AnimatePresence } from "framer-motion";
import { FaLayerGroup } from "react-icons/fa6";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface ProjectsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const DesignerPortfolio2Projects: React.FC<ProjectsProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const bg = theme.bg || "#07070D";
  const text = theme.text || theme.ink || "#EEF0FF";
  const muted = theme["text-second"] || "#8B8FA8";
  const surface = theme.surface || "#151524";
  const accent = theme.accent || "#7C9DFF";
  const accent2 = theme["accent-second"] || "#C084FC";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const categories = ["All Work", "AI & SaaS", "Mobile UX", "Design Systems"];

  const works = [
    {
      id: "hyperion",
      title: "Hyperion Autonomous Intelligence",
      category: "AI & SaaS",
      year: "2025",
      impact: "+340% Onboarding Velocity",
      description: "Complete design overhaul of a machine learning workspace for enterprise engineering teams. Simplified multi-agent orchestration into an intuitive node graph.",
      tags: ["AI Interface", "Node Graphs", "Dark System"],
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "prism",
      title: "Prism Financial Mobile OS",
      category: "Mobile UX",
      year: "2025",
      impact: "$1.2B Volume Processed",
      description: "Next-generation wealth management iOS application featuring predictive cash flow forecasting, haptic feedback design, and biometric security layers.",
      tags: ["Fintech iOS", "Micro-Interactions", "Motion"],
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "aeris",
      title: "Aeris Multi-Platform Design System",
      category: "Design Systems",
      year: "2024",
      impact: "140+ Components Shipped",
      description: "A cohesive, cross-platform design token architecture supporting web, iOS, and Android applications with sub-millisecond dark/light theme switching.",
      tags: ["Figma Tokens", "Documentation", "Accessibility"],
      image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const [activeCategory, setActiveCategory] = useState("All Work");

  const filtered = activeCategory === "All Work"
    ? works
    : works.filter((w) => w.category === activeCategory);

  return (
    <section
      id="projects"
      className="relative w-full py-28 md:py-36 overflow-hidden font-['Poppins',sans-serif]"
      style={{ background: bg, color: text }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-8" style={{ borderColor: `${text}15` }}>
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] block" style={{ color: accent }}>
              <Editable value={p.projSub || "SELECTED ARCHIVE // 2024 — 2026"} onChange={(v) => handleUpdate("projSub", v)} />
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight">
              <Editable value={p.projTitle || "Featured Case Studies"} onChange={(v) => handleUpdate("projTitle", v)} />
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-200"
                style={{
                  background: activeCategory === cat ? text : `${text}0a`,
                  color: activeCategory === cat ? bg : muted,
                  border: `1px solid ${activeCategory === cat ? text : `${text}15`}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Stack */}
        <div className="space-y-10">
          <AnimatePresence>
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-3xl border overflow-hidden backdrop-blur-xl group hover:border-slate-500/50 transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 shadow-2xl"
                style={{
                  background: `${surface}70`,
                  borderColor: `${text}15`,
                }}
              >
                {/* Visual Imagery Side (Spans 7 cols) */}
                <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[400px] overflow-hidden bg-black/40">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07070D] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#151524]" />
                  
                  {/* Floating Metric Badge */}
                  <div
                    className="absolute top-6 left-6 px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border shadow-lg flex items-center gap-1.5"
                    style={{ background: `${surface}cc`, borderColor: `${text}20`, color: accent }}
                  >
                    <Sparkles className="text-[10px]" />
                    <span>{item.impact}</span>
                  </div>
                </div>

                {/* Details & Narratives Side (Spans 5 cols) */}
                <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs" style={{ color: muted }}>
                      <span>{item.category}</span>
                      <span className="font-mono">{item.year}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm leading-relaxed font-light" style={{ color: muted }}>
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-[11px] font-medium"
                          style={{ background: `${text}0a`, border: `1px solid ${text}15`, color: muted }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t flex items-center justify-between" style={{ borderColor: `${text}15` }}>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 text-xs font-semibold group/btn transition-transform hover:translate-x-1"
                      style={{ color: text }}
                    >
                      <span>Explore Case Study</span>
                      <ArrowUpRight className="text-xs transition-transform group-hover/btn:rotate-45" style={{ color: accent }} />
                    </a>
                    <span className="text-[11px] font-mono" style={{ color: muted }}>
                      0{index + 1} // 03
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default DesignerPortfolio2Projects;
