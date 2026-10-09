// @ts-nocheck
import React, { useState } from "react";
import Editable from "@/components/editor/ui/Editable";
import { ArrowUpRight, Sparkles, TrendingUp, Layers, Check, ExternalLink } from "lucide-react";

interface ProjectsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

const CASE_STUDIES = [
  {
    num: "01",
    client: "Prism Technologies",
    title: "Multi-Brand Design System & Component Engine",
    category: "Design Systems",
    year: "2026",
    impact: "+48% Dev Velocity",
    desc: "A unified Figma variable token architecture governing 4 enterprise SaaS applications. Features multi-theme switching, WCAG AAA accessible palettes, and automated token sync with React codebases.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    tags: ["Figma Variables", "React Tokens", "Accessibility", "Multi-Brand"],
    metrics: [
      { val: "380+", label: "Token Variables" },
      { val: "4", label: "Enterprise Apps" },
      { val: "0", label: "Breaking Regressions" }
    ]
  },
  {
    num: "02",
    client: "FlowState Financial",
    title: "Autonomous Cash Flow & Wealth Management OS",
    category: "Mobile & Web Apps",
    year: "2025",
    impact: "3.4x Dwell Time",
    desc: "Transforming dry banking numbers into intuitive interactive charts and tactile slider widgets. Users can model multi-year liquidity projections in sub-millisecond real-time charts.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    tags: ["FinTech UX", "Chart.js", "Haptic Interactions", "Mobile App"],
    metrics: [
      { val: "$420M", label: "Monthly Volume" },
      { val: "4.9/5", label: "App Store Rating" },
      { val: "60 FPS", label: "Fluid Gestures" }
    ]
  },
  {
    num: "03",
    client: "Aura Intelligence",
    title: "Ambient AI Workspace & Multi-Modal Copilot",
    category: "Spatial & AI UI",
    year: "2026",
    impact: "Product Hunt #1",
    desc: "Designing the next paradigm of generative intelligence. Replaced robotic text chat with an organic ambient canvas that dynamically generates context-aware UI cards, diagrams, and code artifacts.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    tags: ["Generative UI", "Spatial Design", "Framer Motion", "Next.js"],
    metrics: [
      { val: "120K", label: "Active Creators" },
      { val: "#1", label: "Golden Kitty Nominee" },
      { val: "18ms", label: "UI Latency" }
    ]
  }
];

const ARCHIVE_TABLE = [
  { id: "PRJ-01", title: "Prism Multi-Brand Design System", category: "Design Systems", year: "2026", client: "Prism Tech" },
  { id: "PRJ-02", title: "FlowState Financial Web Console", category: "Web App", year: "2025", client: "FlowState" },
  { id: "PRJ-03", title: "Aura Ambient AI Canvas", category: "AI Interface", year: "2026", client: "Aura Labs" },
  { id: "PRJ-04", title: "Chronos Watchmaker Spatial Flagship", category: "Spatial WebGL", year: "2025", client: "Chronos" },
  { id: "PRJ-05", title: "Voxel 3D Collaborative Editor", category: "Creative Tools", year: "2024", client: "Voxel Co." },
  { id: "PRJ-06", title: "Helios Clean Energy Dashboard", category: "Industrial UI", year: "2024", client: "Helios Power" }
];

const ENGAGEMENTS = [
  {
    tier: "DESIGN SPRINT",
    timeline: "2 — 3 Weeks",
    title: "Concept Prototyping & MVP",
    desc: "Rapidly validate a high-stakes product idea with tangible, interactive high-fidelity prototypes that secure funding and guide dev.",
    features: ["Interactive Figma Prototypes", "User Flow Diagrams", "Core Visual Direction"]
  },
  {
    tier: "FULL PRODUCT",
    timeline: "6 — 10 Weeks",
    title: "Complete 0-to-1 Product Design",
    desc: "End-to-end design leadership from user discovery to production-ready design tokens and edge-case specs.",
    features: ["Figma Variable Token System", "Full Desktop & Mobile UI", "Micro-Interactions & Handoff"]
  },
  {
    tier: "ADVISORY",
    timeline: "Monthly Retainer",
    title: "Design Leadership & Critique",
    desc: "Weekly design audits, team mentorship, and executive guidance to elevate your company's craft culture.",
    features: ["Weekly Async Video Critiques", "Design Hiring Support", "Token Architecture Audits"]
  }
];

export const DesignerPortfolio4Projects: React.FC<ProjectsProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? CASE_STUDIES
    : CASE_STUDIES.filter((item) => item.category === activeCategory);

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  return (
    <section id="projects" className="py-24 sm:py-36 bg-[#F8FAFC] text-slate-900 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        
        {/* Header & Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Selected Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              <Editable
                value={p.title || "Selected Works & In-Depth Case Studies"}
                onChange={(val) => handleUpdate("title", val)}
              />
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {["All", "Design Systems", "Mobile & Web Apps", "Spatial & AI UI"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ================= CASE STUDY SHOWCASE CARDS ================= */}
        <div className="space-y-24">
          {filtered.map((study, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white border border-slate-200/80 overflow-hidden shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                
                {/* Visual Preview Side (7 cols) */}
                <div className="lg:col-span-7 relative overflow-hidden bg-slate-100 min-h-[380px] lg:min-h-full">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{study.impact}</span>
                  </div>
                </div>

                {/* Narrative Side (5 cols) */}
                <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-8 bg-white">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                      <span>{study.category}</span>
                      <span>{study.year}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs uppercase tracking-wider text-indigo-600 font-bold">
                        {study.client}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {study.title}
                      </h3>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {study.desc}
                    </p>

                    {/* Metric Highlights */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                      {study.metrics.map((m, mIdx) => (
                        <div key={mIdx}>
                          <div className="text-xl font-black text-slate-900">{m.val}</div>
                          <div className="text-[10px] text-slate-500 font-medium">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {study.tags.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href="#contact"
                      className="p-3 rounded-full bg-slate-900 text-white hover:bg-indigo-600 transition-colors shadow-md"
                      aria-label={`View ${study.title}`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* ================= ARCHIVE TABLE ================= */}
        <div className="space-y-6 pt-12 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-indigo-600 font-bold">
                Project Catalog
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                Complete Works Index (2024 — 2026)
              </h3>
            </div>
            <div className="text-xs text-slate-500 font-mono">
              6 RECORDED ARCHIVES
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white divide-y divide-slate-100 shadow-sm overflow-hidden">
            {ARCHIVE_TABLE.map((row, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors group cursor-default"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-indigo-600 font-bold">{row.id}</span>
                  <span className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {row.title}
                  </span>
                </div>
                <div className="flex items-center gap-6 text-xs text-slate-500">
                  <span>{row.client}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 font-medium text-slate-700">
                    {row.category}
                  </span>
                  <span className="font-mono">{row.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= ENGAGEMENT & SCOPE CALCULATOR ================= */}
        <div className="space-y-8 pt-12 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs uppercase tracking-wider text-indigo-600 font-bold">
              Ways to Collaborate
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Clear Engagements, Predictable Delivery
            </h3>
            <p className="text-sm text-slate-600">
              Whether you need an intense 2-week sprint or an embedded product designer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ENGAGEMENTS.map((eng, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-slate-200 space-y-6 flex flex-col justify-between hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/5 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-600">
                    <span>{eng.tier}</span>
                    <span>{eng.timeline}</span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">{eng.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{eng.desc}</p>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-100 text-xs text-slate-700">
                  {eng.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2">
                      <span className="text-indigo-600 font-bold">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default DesignerPortfolio4Projects;
