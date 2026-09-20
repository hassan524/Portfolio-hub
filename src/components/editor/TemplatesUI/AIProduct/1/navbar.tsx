// @ts-nocheck
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import type { BlockComponentProps } from "@/components/blocks/types";
import { Editable } from "@/components/editor/ui/Editable";

export function AIProduct1Navbar({ props = {}, theme, onChange }: BlockComponentProps<any>) {
  const [isOpen, setIsOpen] = useState(false);
  const bg = theme?.bg || "#0B0F19";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#38BDF8";
  const navLinks = ["Work", "Services", "Results", "About"];

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 backdrop-blur-md border-b transition-colors"
      style={{
        backgroundColor: `${bg}E6`,
        borderColor: surface,
        color: ink,
      }}
    >
      <div className="flex items-center gap-4">
        {props?.logo ? (
          <img
            src={props.logo}
            alt="Logo"
            className="h-8 w-8 shrink-0 rounded-full object-cover shadow-sm"
          />
        ) : (
          <div
            className="h-8 w-8 shrink-0 rounded-full flex items-center justify-center shadow-sm"
            style={{ backgroundColor: accent, color: ink }}
          >
            <Sparkles className="h-4 w-4" />
          </div>
        )}
        <Editable
          value={props?.logoText || "BrandX.ai"}
          onChange={(value) => onChange?.({ logoText: value })}
          className="min-w-0 font-bold text-lg tracking-tight"
          style={{ color: ink }}
        />
      </div>

      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link, i) => (
          <a
            key={i}
            href={`#${link.toLowerCase()}`}
            className="text-sm font-medium transition-colors hover:opacity-100"
            style={{ color: ink, opacity: 0.75 }}
          >
            <Editable className="inline">{link}</Editable>
          </a>
        ))}
      </div>

      <div className="hidden md:block">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-5 py-2.5 rounded-full text-sm font-semibold shadow-md transition-colors cursor-pointer"
          style={{
            backgroundColor: surface,
            color: ink,
            border: `1px solid ${surface}`,
          }}
        >
          <Editable className="inline">Let's Talk</Editable>
        </motion.button>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden h-9 w-9 rounded-full flex items-center justify-center transition-colors"
        style={{ backgroundColor: surface, color: ink }}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 p-6 shadow-xl md:hidden flex flex-col gap-4 border-b"
          style={{
            backgroundColor: bg,
            borderColor: surface,
            color: ink,
          }}
        >
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={`#${link.toLowerCase()}`}
              className="text-base font-medium py-2 border-b"
              style={{ color: ink, borderColor: surface }}
              onClick={() => setIsOpen(false)}
            >
              <Editable className="inline">{link}</Editable>
            </a>
          ))}
          <button
            className="w-full py-3 rounded-full text-sm font-semibold mt-2 cursor-pointer shadow-md"
            style={{
              backgroundColor: surface,
              color: ink,
              border: `1px solid ${surface}`,
            }}
          >
            <Editable className="inline">Let's Talk</Editable>
          </button>
        </motion.div>
      )}
    </nav>
  );
}