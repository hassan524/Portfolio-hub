import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import type { BlockComponentProps } from "@/components/blocks/types";
import type { NavbarProps } from "@/types/builder.schema";
import { Editable } from "@/components/editor/ui/Editable";

export function AIProduct1Navbar({ props, onChange }: BlockComponentProps<NavbarProps>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100">
      {/* Logo */}
      <div className="flex items-center gap-4">
        {props.logo ? (
          <img src={props.logo} alt="Logo" className="h-8 w-8 shrink-0 rounded-full object-cover shadow-sm" />
        ) : (
          <div className="h-8 w-8 shrink-0 rounded-full bg-black flex items-center justify-center text-white shadow-sm">
            <Sparkles className="h-4 w-4" />
          </div>
        )}
        <Editable
          value={props.logoText || "BrandX.ai"}
          onChange={(value) => onChange({ logoText: value })}
          className="min-w-0 font-bold text-lg tracking-tight text-gray-900"
        />
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8">
        {["Work", "Services", "Results", "About"].map((link, i) => (
          <a
            key={i}
            href={`#${link.toLowerCase()}`}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            {link}
          </a>
        ))}
      </div>

      {/* Desktop CTA (No login, direct brand selling inquiry) */}
      <div className="hidden md:block">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-5 py-2.5 rounded-full text-sm font-semibold bg-black text-white shadow-md hover:bg-gray-800 transition-colors cursor-pointer"
        >
          Let's Talk
        </motion.button>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-900"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {/* Mobile Drawer */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 shadow-xl md:hidden flex flex-col gap-4"
        >
          {["Work", "Services", "Results", "About"].map((link, i) => (
            <a
              key={i}
              href={`#${link.toLowerCase()}`}
              className="text-base font-medium text-gray-800 py-2 border-b border-gray-50"
              onClick={() => setIsOpen(false)}
            >
              {link}
            </a>
          ))}
          <button className="w-full py-3 rounded-full text-sm font-semibold bg-black text-white mt-2 cursor-pointer">
            Let's Talk
          </button>
        </motion.div>
      )}
    </nav>
  );
}