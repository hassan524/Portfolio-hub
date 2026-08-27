import { motion } from "framer-motion";
import { ArrowUp, Activity } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";
import type { FooterProps } from "@/types/builder.schema";

type Props = BlockComponentProps<FooterProps>;
const ICONS: Record<string, any> = { github: FaGithub, linkedin: FaLinkedin, twitter: FaTwitter };
const year = new Date().getFullYear();

export function AIProduct1Footer({ props, theme }: Props) {
  const { ink, bg, accent } = theme;

  return (
    <footer className="relative px-6 md:px-16 pt-24 pb-12 overflow-hidden" style={{ background: `${ink}04`, borderTop: `1px solid ${ink}10` }}>
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Top Status Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-16 border-b" style={{ borderColor: `${ink}10` }}>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2.5 w-2.5 rounded-full animate-ping" style={{ background: accent }} />
              <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: accent }}>All Systems Nominal</span>
            </div>
            <p className="text-xs font-mono" style={{ color: `${ink}50` }}>Global Edge Inference Latency: 12.4ms avg</p>
          </div>
          <div className="flex items-center gap-3">
            {["API Docs", "Status", "Security", "Privacy"].map((l) => (
              <a key={l} href="#" className="text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors hover:opacity-100 opacity-70" style={{ background: `${ink}05`, color: ink, border: `1px solid ${ink}08` }}>
                {l}
              </a>
            ))}
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 my-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              {props.logo && <img src={props.logo} alt="Logo" className="h-10 w-10 rounded-xl object-cover" />}
              <Editable as="div" value={props.heading} onChange={() => {}} className="text-2xl font-black tracking-tight" style={{ color: ink }} />
            </div>
            <Editable as="p" value={props.message ?? "The autonomous intelligence platform for modern engineering teams."} onChange={() => {}} className="text-sm leading-relaxed max-w-sm mb-6" style={{ color: `${ink}60` }} />
            <div className="flex gap-3">
              {props.socials?.map((s, i) => {
                const Icon = ICONS[s.platform?.toLowerCase()] ?? FaGithub;
                return (
                  <motion.a key={i} href="#" whileHover={{ y: -3, color: accent, borderColor: accent }} className="h-10 w-10 rounded-2xl grid place-items-center transition-all border shadow-sm" style={{ background: bg, color: `${ink}70`, borderColor: `${ink}15` }}>
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-widest mb-6 font-bold" style={{ color: `${ink}40` }}>Product</div>
            <div className="flex flex-col gap-3.5 text-sm font-medium" style={{ color: `${ink}70` }}>
              {["Inference API", "Vector Engine", "Agent Swarms", "Security Vault", "Changelog"].map(l => (
                <a key={l} href="#" className="hover:opacity-100 opacity-70 transition-opacity" style={{ color: ink }}>{l}</a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-widest mb-6 font-bold" style={{ color: `${ink}40` }}>Developers</div>
            <div className="flex flex-col gap-3.5 text-sm font-medium" style={{ color: `${ink}70` }}>
              {["Documentation", "SDKs & CLI", "Open Weights", "GitHub Repos", "Community"].map(l => (
                <a key={l} href="#" className="hover:opacity-100 opacity-70 transition-opacity" style={{ color: ink }}>{l}</a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-widest mb-6 font-bold" style={{ color: `${ink}40` }}>Company</div>
            <div className="flex flex-col gap-3.5 text-sm font-medium" style={{ color: `${ink}70` }}>
              {["About Us", "Careers", "Press Kit", "Contact", "Terms & Privacy"].map(l => (
                <a key={l} href="#" className="hover:opacity-100 opacity-70 transition-opacity" style={{ color: ink }}>{l}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t" style={{ borderColor: `${ink}10` }}>
          <p className="text-xs font-mono" style={{ color: `${ink}50` }}>
            © {year} {props.heading}. All rights reserved.
          </p>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-10 w-10 rounded-2xl grid place-items-center shadow-lg cursor-pointer"
            style={{ background: `${accent}20`, color: accent, border: `1px solid ${accent}40` }}
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        </div>

      </div>
    </footer>
  );
}