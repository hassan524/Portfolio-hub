// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { FaInstagram, FaFacebook, FaPinterest } from "react-icons/fa";

const ICONS: Record<string, any> = { instagram: FaInstagram, facebook: FaFacebook, pinterest: FaPinterest };
const year = new Date().getFullYear();

export function Bakery1Footer({ props = {}, theme }: any) {
  const bg = theme?.ink || "#1a1a1a";
  const ink = theme?.bg || "#faf9f6";
  const surface = "rgba(255,255,255,0.12)";
  const accent = theme?.accent || "#e85d3d";
  const fontHeading = theme?.fontHeading || "Fraunces";
  const fontBody = theme?.fontBody || "Inter";

  const links = ["Work", "Services", "About", "Team", "Contact"];

  return (
    <footer className="py-20 px-6 md:px-12 relative overflow-hidden" style={{ backgroundColor: bg, color: ink, fontFamily: fontBody }}>
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            {props?.logo ? (
              <img src={props.logo} alt="Logo" className="mb-4 h-10 w-auto max-w-[150px] object-contain" />
            ) : null}
            <Editable
              as="div"
              className="text-3xl font-light tracking-tight"
              style={{ fontFamily: fontHeading }}
            >
              {props.heading || "The Pantry"}
            </Editable>
            <Editable
              as="p"
              className="mt-4 text-sm leading-relaxed opacity-70 font-light"
            >
              {props.message || "Artisan breads and pastries baked fresh every morning with local grain and time-honoured techniques."}
            </Editable>
            {props.socials && props.socials.length > 0 && (
              <div className="mt-6 flex gap-3">
                {props.socials.map((s: any, i: number) => {
                  const Icon = ICONS[s.platform?.toLowerCase()] ?? FaInstagram;
                  return (
                    <a key={i} href={s.url || "#"} className="h-10 w-10 rounded-full grid place-items-center transition-opacity hover:opacity-70" style={{ backgroundColor: surface, color: ink }}>
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-8 text-sm font-medium">
            {links.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="opacity-70 transition-opacity hover:opacity-100" style={{ color: ink }}>
                {l}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t pt-8 flex flex-col gap-4 text-xs opacity-50 md:flex-row md:justify-between font-light" style={{ borderColor: surface }}>
          <Editable as="p">© {year} {props.heading || "The Pantry"}. All rights reserved.</Editable>
          <Editable as="p">Made with care · No preservatives, ever.</Editable>
        </div>
      </div>
    </footer>
  );
}