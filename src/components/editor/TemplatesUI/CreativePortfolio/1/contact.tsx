// @ts-nocheck
import { ArrowUpRight, Mail, MapPin, Sparkles } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function CreativePortfolio1Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || "#A7A9B3";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.09)";
  const accent = theme?.accent || "#3B82F6";

  return (
    <section
      id="contact"
      className="border-b px-5 py-24 sm:px-8 lg:px-14 transition-colors"
      style={{
        backgroundColor: bg,
        color: ink,
        borderColor: surface,
      }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Top Label */}
        <div
          className="flex items-center justify-between pb-6 border-b font-mono text-[10px] sm:text-xs uppercase tracking-[0.14em]"
          style={{ borderColor: surface, color: inkSecond }}
        >
          <span>04 — Start a conversation</span>
          <span>Let’s make a little noise</span>
        </div>

        {/* Contact Layout */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <h2 className="text-[clamp(3.2rem,8vw,7.5rem)] font-bold tracking-[-0.08em] leading-[0.88]">
              Have a good<br />
              <span className="font-serif italic font-medium" style={{ color: accent }}>
                one?
              </span>
            </h2>
            <p className="mt-8 max-w-md text-base sm:text-lg leading-relaxed" style={{ color: inkSecond }}>
              <Editable
                value={
                  props?.subheadline ||
                  "Tell me what you’re building, what’s not working, or what you can’t stop thinking about."
                }
                onChange={(v) => onChange?.({ subheadline: v })}
              />
            </p>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <a
              href="mailto:hello@abiola.studio"
              className="flex items-center justify-between p-6 sm:p-8 rounded-3xl border transition-all hover:scale-[1.02] group"
              style={{
                backgroundColor: surface,
                borderColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest block mb-1" style={{ color: accent }}>
                  Direct Inquiries
                </span>
                <span className="text-xl sm:text-2xl font-bold tracking-tight">
                  <Editable
                    value={props?.email || "hello@abiola.studio"}
                    onChange={(v) => onChange?.({ email: v })}
                  />
                </span>
              </div>
              <span
                className="w-12 h-12 rounded-full grid place-items-center transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                style={{ backgroundColor: accent, color: "#ffffff" }}
              >
                <ArrowUpRight size={20} />
              </span>
            </a>

            <div
              className="flex items-center justify-between p-6 rounded-2xl border font-mono text-xs"
              style={{ borderColor: surface, color: inkSecond }}
            >
              <span className="flex items-center gap-2">
                <MapPin size={14} style={{ color: accent }} />
                <span>Lagos, NG & Remote</span>
              </span>
              <span className="flex items-center gap-2">
                <Sparkles size={14} style={{ color: accent }} />
                <span>Booking Q3 / Q4</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
