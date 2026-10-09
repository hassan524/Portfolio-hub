// @ts-nocheck
import { ArrowUp } from "lucide-react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { Editable } from "@/components/editor/ui/Editable";

export function Footer({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#181713";
    const ink = theme?.ink || "#F5F0E8";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(245, 240, 232, 0.1)";
    const accent = theme?.accent || "#FF6B35";
    return <footer className="px-5 pb-8 sm:px-10" style={{ backgroundColor: bg, color: ink }}><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 border-t border-white/20 pt-6 text-sm sm:flex-row"><Editable value={props?.copy || "© 2026 Studio / 04"} style={{ color: inkSecond }} /><div className="flex items-center gap-5"><a href="#top"><Editable value="Back to top" /></a><a href="#top"><FaInstagram size={16} /></a><a href="#top"><FaLinkedin size={16} /></a><a href="#top" style={{ color: accent }}><ArrowUp size={17} /></a></div></div></footer>;
}
