// @ts-nocheck
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Code, Smartphone, Layout, Cloud, Shield, Database, Check } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency4Projects({ props = {}, theme, onChange }: any) {
  const [activeTab, setActiveTab] = useState(0);

  // Dynamic theme colors - NO manual tailwind color classes!
  const bg = theme?.bg || theme?.bgPrimary || "#FFFFFF";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || "#070D1E";
  const text = theme?.text || theme?.ink || "#0A1128";
  const textSecond = theme?.["text-second"] || theme?.["ink-second"] || theme?.textSecond || "#475569";
  const surface = theme?.surface || "#FFFFFF";
  const accent = theme?.accent || "#2563EB";

  // 6 Services matching Image 5
  const services = [
    { title: "Web Architecture & Fullstack Dev", desc: "Enterprise Next.js, Go, and Python microservices deployed to globally distributed edge clusters.", icon: Code },
    { title: "Mobile Engineering (iOS & Android)", desc: "SwiftUI, Jetpack Compose, and offline-first data sync engines with native fluid performance.", icon: Smartphone },
    { title: "Human-Centric Interface Systems", desc: "Component architecture libraries, design tokens, and rigorous conversion accessibility testing.", icon: Layout },
    { title: "Cloud Infrastructure & SRE", desc: "Automated multi-region AWS & GCP infrastructure orchestrated with Terraform and Kubernetes.", icon: Cloud },
    { title: "Enterprise Cyber Security", desc: "Zero-trust credential policies, SOC2 compliance roadmaps, and continuous penetration auditing.", icon: Shield },
    { title: "High-Throughput Data & APIs", desc: "Event streams, GraphQL federation, and sub-second analytical reporting dashboards.", icon: Database },
  ];

  // Projects Showcase matching bottom half of Image 5
  const projects = [
    {
      id: "agro-tech",
      title: "GreenFields AgroTech Cloud Platform",
      category: "Enterprise Web App",
      desc: "Precision agriculture dashboard orchestrating 40,000+ IoT telemetry field sensors across North America.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      metric: "99.99% Uptime",
    },
    {
      id: "med-link",
      title: "HealthSync Clinical Portal",
      category: "Healthcare SaaS",
      desc: "HIPAA-compliant telemedicine consultation system connecting 1,200 specialists with real-time patient charts.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
      metric: "1.2M Patient Records",
    },
  ];

  const handleSmoothScroll = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="services">
      {/* Upper Half: Services Matrix matching Image 5 (Structured technical rows, NO BOX CARDS!) */}
      <section className="py-24 transition-colors" style={{ backgroundColor: bg, color: text }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b" style={{ borderColor: `${textSecond}25` }}>
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider block" style={{ color: accent }}>
                Capabilities Matrix //
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                The Services We Deliver for Your Brand
              </h2>
            </div>
            <p className="text-xs sm:text-sm max-w-md leading-relaxed" style={{ color: textSecond }}>
              Specialized engineering units collaborating to deliver resilient, production-ready software solutions on guaranteed sprint schedules.
            </p>
          </div>

          {/* Structured Technical Capability Rows (NO BOX CARDS!) */}
          <div className="space-y-4">
            {services.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="py-6 border-b transition-colors grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                  style={{ borderColor: `${textSecond}20` }}
                >
                  <div className="md:col-span-5 flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-bold"
                      style={{ backgroundColor: `${accent}15`, color: accent }}
                    >
                      <Icon size={18} />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider block" style={{ color: textSecond }}>
                        Unit 0{idx + 1}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold tracking-tight" style={{ color: text }}>
                        {s.title}
                      </h3>
                    </div>
                  </div>

                  <div className="md:col-span-5 text-xs sm:text-sm leading-relaxed" style={{ color: textSecond }}>
                    {s.desc}
                  </div>

                  <div className="md:col-span-2 md:text-right">
                    <a
                      href="#contact"
                      onClick={(e) => handleSmoothScroll(e, "#contact")}
                      className="text-xs font-bold inline-flex items-center gap-1 hover:underline cursor-pointer"
                      style={{ color: accent }}
                    >
                      <span>Inquire Unit</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Lower Half: "All Amazing Projects We Have Done So Far" matching Image 5 on Deep Navy */}
      <section
        id="projects"
        className="py-24 transition-colors relative"
        style={{ backgroundColor: bgSecond, color: "#FFFFFF" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-slate-800">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider block text-blue-400">
                Production Case Studies //
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                All Amazing Projects We Have Done So Far
              </h2>
            </div>
            <p className="text-xs sm:text-sm max-w-md text-slate-400 leading-relaxed">
              Explore our recent enterprise systems, mission-critical dashboards, and high-conversion commercial platforms.
            </p>
          </div>

          {/* 2-Column Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="space-y-6"
              >
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 p-4 sm:p-6 shadow-2xl">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover rounded-2xl border border-slate-800"
                  />
                  <div className="absolute top-8 right-8 px-3 py-1.5 rounded-full text-xs font-mono font-bold shadow-md" style={{ backgroundColor: accent, color: "#FFFFFF" }}>
                    {proj.metric}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-blue-400">
                    {proj.category}
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight text-white">
                    {proj.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {proj.desc}
                  </p>
                  <div className="pt-2">
                    <a
                      href="#contact"
                      onClick={(e) => handleSmoothScroll(e, "#contact")}
                      className="text-xs font-bold inline-flex items-center gap-1.5 text-blue-400 hover:underline cursor-pointer uppercase tracking-wider"
                    >
                      <span>Review Architecture Spec</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}

export default DigitalAgency4Projects;
