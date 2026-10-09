// @ts-nocheck
import { Sun, ArrowRight } from "lucide-react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { Editable } from "@/components/editor/ui/Editable";

export function Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#FAF5EE";
  const bgSecond = theme?.["bg-second"] || "#FFFFFF";
  const ink = theme?.ink || "#14213D";
  const inkSecond = theme?.["ink-second"] || "#64748B";
  const accent = theme?.accent || "#E07A5F";
  const surface = theme?.surface || "#F1E9DE";

  const go = (e: any, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t px-6 py-16" style={{ backgroundColor: bgSecond, borderColor: surface }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-2xl"
                style={{ backgroundColor: accent, color: "#FFFFFF" }}
              >
                <Sun size={20} />
              </span>
              <Editable
                as="span"
                value={props?.brand || "CASA RIVIERA"}
                onChange={(v: string) => onChange?.({ brand: v })}
                className="font-serif text-xl font-black tracking-wider"
                style={{ color: ink }}
              />
            </div>
            <Editable
              as="p"
              value={
                props?.aboutText ||
                "A sunlit Mediterranean coastal brasserie celebrating wild day-boat seafood, wood-fired hearth cooking, and chilled seaside wines."
              }
              onChange={(v: string) => onChange?.({ aboutText: v })}
              className="mt-4 max-w-sm text-xs leading-relaxed"
              style={{ color: inkSecond }}
            />
            <div className="mt-5 flex gap-3">
              <a
                href="#instagram"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-full border transition hover:scale-105"
                style={{ borderColor: surface, color: ink }}
              >
                <FaInstagram size={14} />
              </a>
              <a
                href="#facebook"
                aria-label="Facebook"
                className="flex h-8 w-8 items-center justify-center rounded-full border transition hover:scale-105"
                style={{ borderColor: surface, color: ink }}
              >
                <FaFacebookF size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider" style={{ color: ink }}>
              Brasserie Links
            </h4>
            <ul className="mt-4 space-y-2 text-xs" style={{ color: inkSecond }}>
              <li><a href="#about" onClick={(e) => go(e, "#about")} className="transition hover:underline">Kitchen Heritage</a></li>
              <li><a href="#menu" onClick={(e) => go(e, "#menu")} className="transition hover:underline">Daily Blackboard Menu</a></li>
              <li><a href="#reviews" onClick={(e) => go(e, "#reviews")} className="transition hover:underline">Guest Reviews</a></li>
              <li><a href="#contact" onClick={(e) => go(e, "#contact")} className="transition hover:underline">Garden Terrace Reservations</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider" style={{ color: ink }}>
              Terrace Club Dispatch
            </h4>
            <p className="mt-2 text-xs leading-relaxed" style={{ color: inkSecond }}>
              Get notified of seasonal seafood blackboard changes and special summer garden wine dinners.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Welcome to the Casa Riviera Terrace Club!"); }} className="mt-4 flex gap-2">
              <input
                type="email"
                required
                placeholder="guest@domain.com"
                className="w-full rounded-2xl border px-4 py-2.5 text-xs outline-none"
                style={{ backgroundColor: bg, borderColor: surface, color: ink }}
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex items-center justify-center rounded-2xl px-4 text-white transition hover:scale-105"
                style={{ backgroundColor: accent }}
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 text-[11px] sm:flex-row" style={{ borderColor: surface, color: inkSecond }}>
          <p>© {new Date().getFullYear()} Casa Riviera Brasserie. San Francisco Marina Harbor.</p>
          <p>Lunch • Aperitivo • Garden Dinner</p>
        </div>
      </div>
    </footer>
  );
}

export const Restaurant3Footer = Footer;
export const FooterDefault = Footer;
export default Footer;
