// @ts-nocheck
import { useState, useEffect } from "react";
import { Sun, Menu, X, Phone, Calendar } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Navbar({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#FAF5EE";
  const bgSecond = theme?.["bg-second"] || "#FFFFFF";
  const ink = theme?.ink || "#14213D";
  const inkSecond = theme?.["ink-second"] || "#64748B";
  const accent = theme?.accent || "#E07A5F";
  const surface = theme?.surface || "#F1E9DE";

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const DEFAULT_LINKS = [
    { label: "The Kitchen", href: "#about" },
    { label: "Blackboard Menu", href: "#menu" },
    { label: "Guest Notes", href: "#reviews" },
    { label: "Garden & Hours", href: "#contact" },
  ];

  const links = Array.isArray(props?.links) && props.links.length > 0 ? props.links : DEFAULT_LINKS;
  const setLink = (i: number, k: string, v: string) =>
    onChange?.({ links: links.map((x: any, j: number) => (j === i ? { ...x, [k]: v } : x)) });

  const go = (e: any, href: string) => {
    e.preventDefault();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b shadow-sm backdrop-blur-md" : ""
      }`}
      style={{
        backgroundColor: scrolled ? `${bg}F0` : bg,
        borderColor: surface,
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:py-5">
        {/* Brand */}
        <a href="#home" onClick={(e) => go(e, "#home")} className="group flex items-center gap-3">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-2xl shadow-sm transition duration-300 group-hover:rotate-12"
            style={{ backgroundColor: accent, color: "#FFFFFF" }}
          >
            <Sun size={20} />
          </span>
          <div className="flex flex-col">
            <Editable
              as="span"
              value={props?.brand || "CASA RIVIERA"}
              onChange={(v: string) => onChange?.({ brand: v })}
              className="font-serif text-xl font-black tracking-wider"
              style={{ color: ink }}
            />
            <Editable
              as="span"
              value={props?.tagline || "Coastal Brasserie & Raw Bar"}
              onChange={(v: string) => onChange?.({ tagline: v })}
              className="text-[10px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: accent }}
            />
          </div>
        </a>

        {/* Nav Links */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link: any, i: number) => (
            <a
              key={i}
              href={link.href}
              onClick={(e) => go(e, link.href)}
              className="text-sm font-medium transition duration-200"
              style={{ color: inkSecond }}
              onMouseEnter={(e) => (e.currentTarget.style.color = ink)}
              onMouseLeave={(e) => (e.currentTarget.style.color = inkSecond)}
            >
              <Editable
                as="span"
                value={link.label}
                onChange={(v: string) => setLink(i, "label", v)}
              />
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href="tel:+14155550182"
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider"
            style={{ color: inkSecond }}
          >
            <Phone size={14} style={{ color: accent }} />
            <Editable
              as="span"
              value={props?.phone || "(415) 555-0182"}
              onChange={(v: string) => onChange?.({ phone: v })}
            />
          </a>

          <a
            href="#contact"
            onClick={(e) => go(e, "#contact")}
            className="flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold text-white shadow-sm transition duration-200 hover:scale-[1.02] active:scale-95"
            style={{ backgroundColor: accent }}
          >
            <Calendar size={15} />
            <Editable
              as="span"
              value={props?.ctaText || "Book Terrace"}
              onChange={(v: string) => onChange?.({ ctaText: v })}
            />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          className="flex h-10 w-10 items-center justify-center rounded-xl md:hidden"
          style={{ backgroundColor: surface, color: ink }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-b px-6 py-6 md:hidden shadow-lg" style={{ backgroundColor: bgSecond, borderColor: surface }}>
          <nav className="flex flex-col gap-4">
            {links.map((link: any, i: number) => (
              <a
                key={i}
                href={link.href}
                onClick={(e) => go(e, link.href)}
                className="text-base font-semibold py-1"
                style={{ color: ink }}
              >
                <Editable
                  as="span"
                  value={link.label}
                  onChange={(v: string) => setLink(i, "label", v)}
                />
              </a>
            ))}
            <div className="mt-4 pt-4 border-t" style={{ borderColor: surface }}>
              <a
                href="#contact"
                onClick={(e) => go(e, "#contact")}
                className="flex items-center justify-center gap-2 w-full rounded-xl py-3 text-sm font-bold text-white"
                style={{ backgroundColor: accent }}
              >
                <Calendar size={16} />
                <Editable
                  as="span"
                  value={props?.ctaText || "Book Terrace Table"}
                  onChange={(v: string) => onChange?.({ ctaText: v })}
                />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export const Restaurant3Navbar = Navbar;
export const NavbarBlock = Navbar;
export default Navbar;
