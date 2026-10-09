// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { ArrowUp, ArrowRight } from "lucide-react";

const mix = (c: string = "#111417", p: number = 50) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

export function ArchitectureStudio1Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#E8EEEB";
  const ink = theme?.ink || "#111417";
  const inkSecond = theme?.["ink-second"] || "#566166";
  const accent = theme?.accent || "#D92335";
  const fontHeading = theme?.fontHeading || "Cormorant Garamond";
  const fontBody = theme?.fontBody || "DM Sans";

  const explore = [
    { label: "Selected Works", href: "#projects" },
    { label: "The Atelier", href: "#about" },
    { label: "Disciplines", href: "#services" },
    { label: "Critical Monographs", href: "#testimonials" },
  ];

  const connect = [
    { label: "Commission Brief", href: "#contact" },
    { label: "Press Archive", href: "#testimonials" },
    { label: "London Atelier", href: "#contact" },
    { label: "Zürich Studio", href: "#contact" },
  ];

  return (
    <footer
      className="w-full px-6 md:px-12 lg:px-16 pt-20 pb-12 transition-colors"
      style={{ backgroundColor: bg, color: ink, fontFamily: fontBody }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b" style={{ borderColor: mix(ink, 14) }}>
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 flex flex-col justify-between gap-6">
            <div>
              <a
                href="#top"
                className="flex items-center gap-3 text-3xl font-medium tracking-tight mb-4"
                style={{ fontFamily: fontHeading, color: ink }}
              >
                <div className="w-5 h-5 flex items-center justify-center border" style={{ borderColor: mix(ink, 30) }}>
                  <div className="w-2 h-2 rotate-45" style={{ backgroundColor: accent }} />
                </div>
                <Editable value={props?.logoText || "Sagent"} onChange={(v) => onChange?.({ logoText: v })} />
              </a>
              <p className="text-sm leading-relaxed max-w-sm" style={{ color: mix(ink, 75) }}>
                An architectural atelier dedicated to quiet spaces, contextual honesty, and the enduring poetics of natural materials.
              </p>
            </div>

            <div className="text-xs uppercase tracking-wider opacity-60" style={{ color: inkSecond }}>
              Registered with the Architects Registration Board (ARB) & RIBA.
            </div>
          </div>

          {/* Links 1 */}
          <div className="md:col-span-2">
            <span className="text-xs uppercase tracking-[0.18em] font-semibold block mb-4 opacity-60" style={{ color: inkSecond }}>
              Explore
            </span>
            <ul className="space-y-3 text-sm list-none p-0 m-0">
              {explore.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="transition-opacity hover:opacity-60" style={{ color: ink }}>
                    <Editable value={l.label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2 */}
          <div className="md:col-span-2">
            <span className="text-xs uppercase tracking-[0.18em] font-semibold block mb-4 opacity-60" style={{ color: inkSecond }}>
              Practice
            </span>
            <ul className="space-y-3 text-sm list-none p-0 m-0">
              {connect.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="transition-opacity hover:opacity-60" style={{ color: ink }}>
                    <Editable value={l.label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Monograph Dispatch */}
          <div className="md:col-span-3">
            <span className="text-xs uppercase tracking-[0.18em] font-semibold block mb-4 opacity-60" style={{ color: inkSecond }}>
              Monograph Dispatch
            </span>
            <p className="text-xs leading-relaxed mb-4" style={{ color: mix(ink, 75) }}>
              Receive our biennial published folio of built works, lectures, and spatial essays.
            </p>
            <div className="flex border" style={{ borderColor: mix(ink, 20) }}>
              <input
                type="email"
                placeholder="architect@studio.com"
                className="w-full px-3 py-2 text-xs bg-transparent outline-none"
                style={{ color: ink }}
              />
              <button
                type="button"
                className="px-3 flex items-center justify-center border-l cursor-pointer hover:opacity-80 transition-opacity text-white"
                style={{ backgroundColor: accent, borderColor: mix(ink, 20) }}
                aria-label="Subscribe"
              >
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs" style={{ color: mix(inkSecond, 80) }}>
          <span>© 2026 Sagent Architecture Atelier. All rights reserved.</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-60 uppercase tracking-wider font-semibold"
            style={{ color: ink }}
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}

export const Footer = ArchitectureStudio1Footer;
export default ArchitectureStudio1Footer;