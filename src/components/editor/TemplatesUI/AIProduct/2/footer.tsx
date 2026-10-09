// @ts-nocheck
import { ArrowUp } from "lucide-react";
import { FaTwitter, FaGithub, FaDiscord, FaTelegram } from "react-icons/fa";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";

const mix = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;
const year = new Date().getFullYear();

const COLUMNS = [
  { title: "Platform", links: ["Spot & Swap", "Staking Vaults", "Wallet", "Launchpad"] },
  { title: "Company", links: ["About Us", "Careers", "Blog", "Press Kit"] },
  { title: "Support", links: ["Help Center", "FAQ", "Security", "Contact"] },
];
const SOCIALS = [
  { icon: FaTwitter, label: "Twitter" }, { icon: FaDiscord, label: "Discord" },
  { icon: FaTelegram, label: "Telegram" }, { icon: FaGithub, label: "GitHub" },
];

export function AIProduct2Footer({ theme }: BlockComponentProps<any>) {
  const bg = theme?.bg || "#050505";
  const ink = theme?.ink || "#ffffff";
  const accent = theme?.accent || "#F7931A";
  const line = mix(ink, 12);

  return (
    <footer className="relative w-full px-6 pt-20 pb-10 transition-colors" style={{ backgroundColor: bg, color: ink, borderTop: `1px solid ${line}` }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
                <defs><linearGradient id="p2flogo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFD27A" /><stop offset="1" stopColor={accent} /></linearGradient></defs>
                <circle cx="16" cy="16" r="14" fill="url(#p2flogo)" />
                <path d="M10 16h12M16 10v12" stroke="#050505" strokeWidth="2.6" strokeLinecap="round" />
              </svg>
              <Editable as="span" className="font-bold text-xl tracking-tight" style={{ color: ink }}>Coinova</Editable>
            </div>
            <Editable as="p" className="text-sm leading-relaxed max-w-xs mb-6" style={{ color: mix(ink, 58) }}>
              Your secure gateway to the decentralized Web3 world.
            </Editable>
            <div className="flex gap-2.5">
              {SOCIALS.map(({ icon: Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="h-10 w-10 rounded-full grid place-items-center border transition-all hover:bg-white/10 hover:-translate-y-0.5" style={{ borderColor: line, color: ink }}>
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <Editable as="div" className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: mix(ink, 50) }}>{col.title}</Editable>
              <div className="flex flex-col gap-3.5">
                {col.links.map((l) => (
                  <a key={l} href="#" className="text-sm transition-opacity opacity-70 hover:opacity-100" style={{ color: ink }}>
                    <Editable className="inline">{l}</Editable>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Editable as="p" className="text-[11px] leading-relaxed pt-8 border-t" style={{ borderColor: line, color: mix(ink, 42) }}>
          Risk warning: digital assets are volatile and you may lose some or all of your investment. Nothing on this site is financial advice. Only invest what you can afford to lose.
        </Editable>

        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Editable as="p" className="text-xs" style={{ color: mix(ink, 50) }}>{`© ${year} Coinova. All rights reserved.`}</Editable>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"
            className="h-10 w-10 rounded-full grid place-items-center border cursor-pointer transition-all hover:bg-white/10 hover:-translate-y-0.5" style={{ borderColor: line, color: ink }}>
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}