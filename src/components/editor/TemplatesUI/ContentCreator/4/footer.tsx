// @ts-nocheck
import { ArrowUp } from "lucide-react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { Editable } from "@/components/editor/ui/Editable";

export function Footer({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#D7472E";
    const ink = theme?.ink || "#fff7ed";
    const accent = theme?.accent || "#171717";
    return <footer className="px-5 pb-8 sm:px-8" style={{ backgroundColor: bg, color: ink }}><div className="mx-auto flex max-w-7xl justify-between border-t border-white/30 pt-5 text-xs"><Editable value={props?.copy || "© 2026 North / South"} /><div className="flex items-center gap-5"><a href="#top"><Editable value="Top" /></a><a href="#top"><FaInstagram size={16} /></a><a href="#top"><FaLinkedin size={16} /></a><a href="#top" style={{ color: accent }}><ArrowUp size={16} /></a></div></div></footer>;
}
