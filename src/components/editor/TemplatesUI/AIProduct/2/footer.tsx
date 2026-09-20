// @ts-nocheck
import { Mail, ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";

type Props = BlockComponentProps<any>;
const ICONS: Record<string, any> = { github: FaGithub, linkedin: FaLinkedin, twitter: FaTwitter, email: Mail };
const year = new Date().getFullYear();

export function AIProduct2Footer({ props = {}, theme, onChange }: Props) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  return (
    <footer className="w-full px-6 py-20 transition-colors" style={{ backgroundColor: bg, color: ink, borderTop: `1px solid ${surface}` }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">

          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              {props?.logo && <img src={props.logo} alt="Logo" className="h-10 w-10 rounded-xl object-cover" />}
              <Editable
                as="div"
                value={props?.heading || "Portfolio"}
                onChange={(v) => onChange?.({ heading: v })}
                className="font-extrabold text-2xl tracking-tight"
                style={{ color: ink }}
              />
            </div>
            <Editable
              as="p"
              value={props?.message ?? "Turning complex ideas into clean, scalable software."}
              onChange={(v) => onChange?.({ message: v })}
              className="text-sm leading-relaxed max-w-sm mb-8"
              style={{ color: ink, opacity: 0.75 }}
            />

            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border" style={{ backgroundColor: surface, color: ink, borderColor: surface }}>
              <span className="h-2 w-2 rounded-full" style={{ background: accent }}></span>
              <Editable value="All Systems Operational" />
            </div>
          </div>

          <div>
            <Editable value="Navigation" className="text-xs font-bold tracking-widest uppercase mb-6" style={{ color: ink, opacity: 0.75 }} />
            <div className="flex flex-col gap-3">
              {["Home", "About", "Projects", "Testimonials", "Contact"].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium transition-opacity hover:opacity-100" style={{ color: ink, opacity: 0.75 }}>
                  <Editable value={link} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <Editable value="Socials" className="text-xs font-bold tracking-widest uppercase mb-6" style={{ color: ink, opacity: 0.75 }} />
            <div className="flex gap-3">
              {props?.socials?.map((s, i) => {
                const Icon = ICONS[s.platform?.toLowerCase()] ?? Mail;
                return (
                  <a
                    key={i}
                    href="#"
                    className="h-10 w-10 rounded-xl flex items-center justify-center transition-colors border"
                    style={{ backgroundColor: surface, color: ink, borderColor: surface }}
                  >
                    <Icon className="h-4 w-4" style={{ color: accent }} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t" style={{ borderColor: surface }}>
          <p className="text-xs font-semibold" style={{ color: ink, opacity: 0.75 }}>
            <Editable value={`© ${year} ${props?.heading || "Portfolio"}. Engineered with precision.`} />
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="h-10 w-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer border"
            style={{ backgroundColor: surface, color: ink, borderColor: surface }}
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}