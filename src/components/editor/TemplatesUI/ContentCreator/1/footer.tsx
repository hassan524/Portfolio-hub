// @ts-nocheck
import { ArrowUp, Clapperboard } from "lucide-react";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Editable } from "@/components/editor/ui/Editable";

export function Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || "#A0A5B5";
  const accent = theme?.accent || "#7DD3FC";

  return (
    <footer className="px-5 pb-12 sm:px-8 border-t border-white/10" style={{ backgroundColor: bg, color: ink }}>
      <div className="mx-auto max-w-7xl pt-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-xs">
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded bg-[#7DD3FC] text-[#0A0A0C]">
                <Clapperboard size={15} />
              </span>
              <Editable value={props?.brand || "Mara Vale"} className="font-semibold text-lg text-white" />
            </div>
            <Editable
              as="p"
              value={props?.summary || "Cinematic video director and creator producing high-retention stories for the internet."}
              className="mt-4 text-xs leading-relaxed text-white/60"
            />
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-xs sm:grid-cols-3 font-mono">
            <a href="#about" className="text-white/70 hover:text-white transition">About</a>
            <a href="#projects" className="text-white/70 hover:text-white transition">Films</a>
            <a href="#testimonials" className="text-white/70 hover:text-white transition">Reviews</a>
            <a href="#services" className="text-white/70 hover:text-white transition">Services</a>
            <a href="#contact" className="text-white/70 hover:text-white transition">Inquire</a>
            <span className="flex items-center gap-2 text-[#7DD3FC]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7DD3FC] animate-pulse" />
              <span>Available</span>
            </span>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row font-mono">
          <Editable value={props?.copyright || "© 2026 Mara Vale Studio. All rights reserved."} />
          <div className="flex items-center gap-6">
            <a href="#top" className="flex items-center gap-1.5 text-white/70 hover:text-white transition">
              <span>Back to top</span>
              <ArrowUp size={13} />
            </a>
            <a href="#contact" aria-label="YouTube" className="text-white/70 hover:text-[#7DD3FC] transition"><FaYoutube size={15} /></a>
            <a href="#contact" aria-label="Instagram" className="text-white/70 hover:text-[#7DD3FC] transition"><FaInstagram size={15} /></a>
            <a href="#contact" aria-label="LinkedIn" className="text-white/70 hover:text-[#7DD3FC] transition"><FaLinkedin size={15} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
