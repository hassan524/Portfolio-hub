// @ts-nocheck
import React from "react";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

interface HeroProps {
  props?: Record<string, any>;
  theme?: Record<string, string>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export function DesignerPortfolio1Hero({ props = {}, theme = {}, data = {}, onChange, onUpdate }: HeroProps) {
  const p = { ...data, ...props };

  const bg = theme?.bg || "#FFFFFF";
  const text = theme?.text || theme?.ink || "#0F172A";
  const textSecond = theme?.["text-second"] || theme?.["ink-second"] || "#64748B";
  const accent = theme?.accent || "#2563EB";

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  return (
    <section id="home" className="relative bg-white text-slate-900 py-20 sm:py-32 border-b border-slate-200/80 overflow-hidden">
      
      {/* Background Soft Subtle Gradient */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-gradient-to-bl from-blue-50 via-indigo-50/40 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 space-y-16 z-10">
        
        {/* Main Headline & Bio */}
        <div className="max-w-4xl space-y-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
            <span>Independent Design Practice</span>
            <span>·</span>
            <span>Based in London & Remote</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.08]">
            <Editable
              value={p.headline || "Product designer shaping digital systems, tactile interfaces & enduring brands."}
              onChange={(val) => handleUpdate("headline", val)}
            />
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed font-normal">
            <Editable
              value={p.subheadline || "Partnering with ambitious founders and engineering teams to transform complex workflows into intuitive, beautifully crafted everyday software."}
              onChange={(val) => handleUpdate("subheadline", val)}
            />
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#projects"
              className="px-7 py-3.5 rounded-full bg-slate-900 text-white font-semibold text-sm hover:bg-blue-600 transition-all flex items-center gap-2 shadow-sm hover:-translate-y-0.5"
            >
              <span>Explore Selected Work</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#about"
              className="px-7 py-3.5 rounded-full bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-200 hover:bg-slate-100 transition-all"
            >
              About the Practice
            </a>
          </div>
        </div>

        {/* Visual Hero Showcase */}
        <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          
          {/* Main Visual Feature */}
          <div className="md:col-span-8 rounded-3xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/50 bg-slate-100 group">
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1400&q=80"
                alt="Selected Design Showcase"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-6 bg-white flex items-center justify-between border-t border-slate-100 text-xs">
              <div>
                <div className="font-bold text-slate-900 text-sm">Linear Systems & Design Tokens</div>
                <div className="text-slate-500">Enterprise Component Architecture · 2026</div>
              </div>
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold">
                Featured Case Study
              </span>
            </div>
          </div>

          {/* Secondary Stats & Quick Bio */}
          <div className="md:col-span-4 space-y-6">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4">
              <div className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                Studio Highlights
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-3xl font-black text-slate-900">8+</div>
                  <div className="text-xs text-slate-500 mt-0.5">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-slate-900">40+</div>
                  <div className="text-xs text-slate-500 mt-0.5">Shipped Products</div>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-200">
                Specializing in zero-to-one product design, token systems, and interaction design for web & mobile.
              </p>
            </div>

            <a
              href="#projects"
              className="p-6 rounded-3xl border border-slate-200 bg-white flex items-center justify-between hover:border-slate-300 transition-colors group"
            >
              <div className="space-y-1">
                <div className="text-xs text-slate-400 font-medium">Scroll to explore</div>
                <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  View 6 Selected Case Studies
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600 flex items-center justify-center transition-colors">
                <ArrowDown size={18} />
              </div>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}

export default DesignerPortfolio1Hero;