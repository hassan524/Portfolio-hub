// @ts-nocheck
import { ArrowUp, Video } from "lucide-react";
import { FaInstagram, FaLinkedin, FaYoutube, FaTwitter } from "react-icons/fa";
import { Editable } from "@/components/editor/ui/Editable";

export function Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#123C35";
  const ink = theme?.ink || "#F1F7E8";
  const inkSecond = theme?.["ink-second"] || "#F1F7E8";
  const accent = theme?.accent || "#D6FF4B";

  return (
    <footer className="px-5 pb-10 sm:px-8 border-t border-[#D6FF4B]/20 font-mono" style={{ backgroundColor: bg, color: ink }}>
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 pt-8 text-xs sm:flex-row sm:items-center">
        <div>
          <Editable value={props?.copy || "© 2026 Leo Chen • Creative Tech & Video Channel. All rights reserved."} className="text-[#F1F7E8]/70" />
        </div>

        <div className="flex items-center gap-6">
          <a href="#top" className="flex items-center gap-1.5 text-[#D6FF4B] hover:underline">
            <span>BACK TO TOP</span>
            <ArrowUp size={14} />
          </a>
          <a href="#contact" aria-label="YouTube" className="text-white/70 hover:text-[#D6FF4B] transition"><FaYoutube size={16} /></a>
          <a href="#contact" aria-label="Twitter" className="text-white/70 hover:text-[#D6FF4B] transition"><FaTwitter size={15} /></a>
          <a href="#contact" aria-label="Instagram" className="text-white/70 hover:text-[#D6FF4B] transition"><FaInstagram size={15} /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
