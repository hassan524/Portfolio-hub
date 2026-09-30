// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { FaInstagram, FaLinkedin, FaBehance } from "react-icons/fa";

const ICONS: Record<string, any> = { instagram: FaInstagram, linkedin: FaLinkedin, behance: FaBehance };
const year = new Date().getFullYear();

export function Bakery2Footer({ props = {}, theme }: any) {
  const bg = theme?.ink || "#242023";
  const ink = theme?.bg || "#ffffff";
  const surface = "rgba(255,255,255,0.1)";
  const accent = theme?.accent || "#882b8b";

  const links = ["Work", "Studio", "People", "Process", "Contact"];

  return (
    <footer className="py-16 px-6 md:px-12" style={{ backgroundColor: bg, color: ink }}>
      <div className="mx-auto max-w-7xl">
        <div className="border-b pb-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between" style={{ borderColor: surface }}>
          {/* Brand */}
          <div>
            {props?.logo && (
              <img src={props.logo} alt="Logo" className="mb-4 h-9 w-auto max-w-[140px] object-contain" />
            )}
            <Editable
              as="div"
              className="text-4xl font-bold uppercase"
              style={{ fontFamily: '"Oswald", sans-serif' }}
            >
              {props.heading || "Bread Studio"}
            </Editable>
            <Editable as="p" className="mt-3 text-sm opacity-50">
              {props.message || "An independent creative practice."}
            </Editable>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6">
            {links.map((l) => (
              <a key={l} href="#" className="text-xs font-bold uppercase tracking-widest opacity-40 transition-opacity hover:opacity-100" style={{ color: ink }}>
                {l}
              </a>
            ))}
          </div>

          {/* Socials */}
          {props.socials && props.socials.length > 0 && (
            <div className="flex gap-3">
              {props.socials.map((s: any, i: number) => {
                const Icon = ICONS[s.platform?.toLowerCase()] ?? FaInstagram;
                return (
                  <a key={i} href={s.url || "#"} className="h-10 w-10 grid place-items-center border transition-opacity hover:opacity-60" style={{ borderColor: surface, color: ink }}>
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-2 text-xs opacity-30 md:flex-row md:justify-between">
          <Editable as="p">© {year} {props.heading || "Bread Studio"}. All rights reserved.</Editable>
          <Editable as="p">Independent. Original. Intentional.</Editable>
        </div>
      </div>
    </footer>
  );
}
