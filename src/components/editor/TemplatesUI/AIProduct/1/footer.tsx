// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";

const ICONS: Record<string, any> = { github: FaGithub, linkedin: FaLinkedin, twitter: FaTwitter };
const year = new Date().getFullYear();
const mix = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

/* props.category = ai | saas | agency | developer ; props.content overrides any key */
const PRESETS: Record<string, any> = {
  ai: {
    brand: "BrandX.ai", message: "The autonomous intelligence platform for modern engineering teams.",
    status: "All Systems Nominal", statusSub: "Global Edge Inference Latency: 12.4ms avg",
    topLinks: ["API Docs", "Status", "Security", "Privacy"],
    columns: [
      { title: "Product", links: ["Inference API", "Vector Engine", "Agent Swarms", "Security Vault", "Changelog"] },
      { title: "Developers", links: ["Documentation", "SDKs & CLI", "Open Weights", "GitHub Repos", "Community"] },
      { title: "Company", links: ["About Us", "Careers", "Press Kit", "Contact", "Terms & Privacy"] },
    ],
  },
  saas: {
    brand: "Flowdeck", message: "The calm, connected workspace for modern teams.",
    status: "All Systems Operational", statusSub: "99.99% uptime over the last 90 days",
    topLinks: ["Docs", "Status", "Security", "Privacy"],
    columns: [
      { title: "Product", links: ["Projects", "Automations", "Analytics", "Integrations", "Changelog"] },
      { title: "Resources", links: ["Help Center", "Templates", "API Reference", "Community", "Blog"] },
      { title: "Company", links: ["About Us", "Careers", "Press Kit", "Contact", "Terms & Privacy"] },
    ],
  },
  agency: {
    brand: "Studio North", message: "An independent brand and digital studio for ambitious companies.",
    status: "Taking Q4 Projects", statusSub: "Currently booking engagements starting in November",
    topLinks: ["Work", "Services", "Journal", "Privacy"],
    columns: [
      { title: "Services", links: ["Brand Identity", "Web Design", "Development", "Campaigns", "Strategy"] },
      { title: "Studio", links: ["About", "Process", "Case Studies", "Journal", "Awards"] },
      { title: "Connect", links: ["Contact", "Careers", "Instagram", "Dribbble", "Terms & Privacy"] },
    ],
  },
  developer: {
    brand: "yourname.dev", message: "Full-stack developer building fast, reliable web products.",
    status: "Available for Work", statusSub: "Typically replies within 24 hours",
    topLinks: ["Projects", "Resume", "Blog", "Contact"],
    columns: [
      { title: "Work", links: ["Projects", "Case Studies", "Open Source", "Services", "Resume"] },
      { title: "Stack", links: ["Next.js", "React", "TypeScript", "Supabase", "Docker"] },
      { title: "Connect", links: ["GitHub", "LinkedIn", "Email", "Twitter", "Contact"] },
    ],
  },
};

export function AIProduct1Footer({ props = {}, theme }: BlockComponentProps<any>) {
  const bg = theme?.bg || "#0B0F19";
  const ink = theme?.ink || "#ffffff";
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#38BDF8";
  const line = mix(ink, 12), muted = mix(ink, 72), faint = mix(ink, 45);

  const c = { ...(PRESETS[props?.category] || PRESETS.ai), ...(props?.content || {}) };
  const brand = props.heading || c.brand;

  return (
    <footer className="relative px-6 md:px-16 pt-28 pb-12 overflow-hidden transition-colors" style={{ backgroundColor: bg, color: ink }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute left-0 top-0 w-full h-12 md:h-20 rotate-180 pointer-events-none" aria-hidden>
        <path d="M0,40 C240,90 480,0 720,36 C960,72 1200,10 1440,44 L1440,80 L0,80 Z" fill={surface} opacity="0.5" />
        <path d="M0,56 C260,20 520,86 760,52 C1000,18 1220,70 1440,50 L1440,80 L0,80 Z" fill={surface} />
      </svg>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-14 border-b" style={{ borderColor: line }}>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full animate-ping opacity-70" style={{ background: accent }} />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ background: accent }} />
              </span>
              <Editable className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: accent }}>{c.status}</Editable>
            </div>
            <Editable as="p" className="text-xs font-mono" style={{ color: muted }}>{c.statusSub}</Editable>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            {c.topLinks.map((l: string) => (
              <a key={l} href="#" className="text-xs font-semibold px-3 py-1.5 rounded-xl border transition-colors hover:opacity-80" style={{ backgroundColor: surface, color: ink, borderColor: line }}>
                <Editable className="inline">{l}</Editable>
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-12 my-14">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              {props.logo && <img src={props.logo} alt="Logo" className="h-9 sm:h-10 w-auto max-w-[180px] shrink-0 object-contain" />}
              <Editable as="div" className="text-2xl font-black tracking-tight" style={{ color: ink }}>{brand}</Editable>
            </div>
            <Editable as="p" className="text-sm leading-relaxed max-w-sm mb-6" style={{ color: muted }}>{props.message ?? c.message}</Editable>
            <div className="flex gap-3">
              {props.socials?.map((s: any, i: number) => {
                const Icon = ICONS[s.platform?.toLowerCase()] ?? FaGithub;
                return (
                  <motion.a key={i} href={s.url || "#"} aria-label={s.platform} whileHover={{ y: -3, color: accent, borderColor: accent }}
                    className="h-10 w-10 rounded-2xl grid place-items-center transition-all border" style={{ backgroundColor: surface, color: ink, borderColor: line }}>
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {c.columns.map((col: any) => (
            <div key={col.title}>
              <Editable className="text-xs font-mono uppercase tracking-widest mb-6 font-bold" style={{ color: faint }}>{col.title}</Editable>
              <div className="flex flex-col gap-3.5 text-sm font-medium">
                {col.links.map((l: string) => (
                  <a key={l} href="#" className="opacity-70 hover:opacity-100 transition-opacity" style={{ color: ink }}>
                    <Editable className="inline">{l}</Editable>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t" style={{ borderColor: line }}>
          <Editable as="p" className="text-xs font-mono" style={{ color: faint }}>{`© ${year} ${brand}. All rights reserved.`}</Editable>
          <motion.button aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ y: -3, scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="h-10 w-10 rounded-2xl grid place-items-center cursor-pointer border" style={{ backgroundColor: surface, color: accent, borderColor: line }}>
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}