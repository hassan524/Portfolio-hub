// @ts-nocheck
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, Shield, Rocket, Clock, ArrowRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function DigitalAgency4About({ props = {}, theme, onChange }: any) {
  // Dynamic theme colors - NO manual tailwind color classes!
  const bg = theme?.bg || theme?.bgPrimary || "#FFFFFF";
  const bgSecond = theme?.["bg-second"] || theme?.bgSecond || "#F8FAFC";
  const text = theme?.text || theme?.ink || "#0A1128";
  const textSecond = theme?.["text-second"] || theme?.["ink-second"] || theme?.textSecond || "#475569";
  const surface = theme?.surface || "#FFFFFF";
  const accent = theme?.accent || "#2563EB";

  const metrics = [
    {
      value: "5+",
      label: "Years Experience",
      desc: "Serving fast-growing businesses worldwide with top-tier digital engineering and architectures.",
    },
    {
      value: "200+",
      label: "Projects Done",
      desc: "Successfully delivered across fintech, enterprise SaaS, healthtech, and global e-commerce.",
    },
    {
      value: "150+",
      label: "Happy Clients",
      desc: "Maintaining long-term collaborative technical retainers and advisory partnerships.",
    },
  ];

  const valuePillars = [
    {
      step: "01",
      title: "Full-Cycle Cloud & Systems Engineering",
      desc: "Architectural blueprinting, event-driven microservices, CI/CD automated test suites, and multi-region AWS/GCP failover.",
      spec: "Production Ready",
    },
    {
      step: "02",
      title: "Human-Centric Interface Telemetry",
      desc: "Behavioral heatmaps, zero-layout-shift UI component tokens, and sub-100ms client-side state hydration.",
      spec: "WCAG AAA Accessible",
    },
    {
      step: "03",
      title: "Transparent Bi-Weekly Sprint Rhythm",
      desc: "Direct Git branch access, automated preview staging builds, and real-time sprint burndown telemetry.",
      spec: "Zero Bureaucracy",
    },
  ];

  return (
    <section
      id="about"
      className="py-24 transition-colors"
      style={{ backgroundColor: bgSecond, color: text }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Top: About Codereyes & 3 Metrics matching Image 5 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-16 border-b" style={{ borderColor: `${textSecond}25` }}>
          
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider block" style={{ color: accent }}>
              System Overview //
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              <Editable
                value={props?.aboutTitle || "About Codereyes"}
                onChange={(v) => onChange?.({ aboutTitle: v })}
              />
            </h2>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: textSecond }}>
              <Editable
                value={
                  props?.aboutDescription ||
                  "Codereyes is an elite software engineering studio. We build resilient enterprise architectures and modern web applications that empower ambitious companies to scale with speed and confidence."
                }
                onChange={(v) => onChange?.({ aboutDescription: v })}
              />
            </p>
          </div>

          {/* Right Metrics Stack matching Image 5 (NO BOX CARDS) */}
          <div className="lg:col-span-7 space-y-6">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center pb-6 border-b last:border-b-0"
                style={{ borderColor: `${textSecond}20` }}
              >
                <div className="sm:col-span-4">
                  <div className="text-4xl font-black tracking-tight" style={{ color: accent }}>
                    {m.value}
                  </div>
                  <div className="text-sm font-bold mt-1" style={{ color: text }}>
                    {m.label}
                  </div>
                </div>

                <div className="sm:col-span-8 text-xs sm:text-sm leading-relaxed" style={{ color: textSecond }}>
                  {m.desc}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom: Engineering Standards (Line-item matrix, NO BOX CARDS!) */}
        <div className="space-y-8">
          <div className="pb-4 border-b flex items-center justify-between" style={{ borderColor: `${textSecond}20` }}>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Core Engineering Commitments
            </h3>
            <span className="text-xs font-mono" style={{ color: accent }}>SLA Tier 1</span>
          </div>

          <div className="space-y-4">
            {valuePillars.map((item) => (
              <div
                key={item.title}
                className="py-6 border-b grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                style={{ borderColor: `${textSecond}20` }}
              >
                <div className="md:col-span-4 flex items-center gap-4">
                  <span className="text-sm font-mono font-bold px-2.5 py-1 rounded-md" style={{ backgroundColor: `${accent}15`, color: accent }}>
                    {item.step}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold tracking-tight" style={{ color: text }}>
                    {item.title}
                  </h4>
                </div>

                <div className="md:col-span-6 text-xs sm:text-sm leading-relaxed" style={{ color: textSecond }}>
                  {item.desc}
                </div>

                <div className="md:col-span-2 md:text-right">
                  <span className="text-xs font-mono font-semibold" style={{ color: text }}>
                    {item.spec}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default DigitalAgency4About;
