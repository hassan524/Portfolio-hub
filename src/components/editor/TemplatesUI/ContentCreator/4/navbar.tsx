// @ts-nocheck
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, Compass, MapPin, Menu, X } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Navbar({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#E7E0D4";
  const ink = theme?.ink || "#171717";
  const accent = theme?.accent || "#D7472E";

  const folios = [
    { num: "I", label: "EXPEDITIONS", href: "#projects" },
    { num: "II", label: "LOGBOOK", href: "#about" },
    { num: "III", label: "DISPATCHES", href: "#testimonials" },
    { num: "IV", label: "INQUIRE", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 py-4 sm:px-8 font-serif select-none">
      {/* VINTAGE EXPEDITION FOLIO HEADER — COMPLETELY ASYMMETRICAL & UNIQUE */}
      <div className="mx-auto flex max-w-7xl items-center justify-between border-b-2 border-black/30 bg-[#E7E0D4]/90 px-4 py-3 backdrop-blur-md">
        {/* Archival Red Ink Seal Badge */}
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D7472E] text-[10px] font-bold text-white font-mono shadow-sm">
            №
          </div>
          <a href="#top" className="text-sm font-bold tracking-tight text-black uppercase font-mono">
            <Editable value={props?.brand || "ROSS // EXPEDITIONS"} onChange={(v) => onChange?.({ brand: v })} />
          </a>
        </div>

        {/* Roman Numeral Folio Index Links */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-black/70">
          {folios.map((folio) => (
            <a
              key={folio.num}
              href={folio.href}
              className="group flex items-center gap-1.5 transition hover:text-[#D7472E]"
            >
              <span className="text-[#D7472E] font-bold">[{folio.num}]</span>
              <span>{folio.label}</span>
            </a>
          ))}
        </nav>

        {/* Direct Field Inquiry Stamp */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="flex items-center gap-1.5 rounded-full border border-black bg-black px-4 py-1.5 font-mono text-xs font-bold uppercase text-[#E7E0D4] hover:bg-[#D7472E] transition shadow-sm"
          >
            <span>Inquire</span>
            <ArrowDownRight size={13} />
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
