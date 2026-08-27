import { Mail, ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";
import type { FooterProps } from "@/types/builder.schema";

type Props = BlockComponentProps<FooterProps>;
const ICONS: Record<string, any> = { github: FaGithub, linkedin: FaLinkedin, twitter: FaTwitter, email: Mail };
const year = new Date().getFullYear();

export function AIProduct2Footer({ props, theme, onChange }: Props) {
  const { ink, bg, accent } = theme;

  return (
    <footer className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-4 gap-12 mb-16">
        
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            {props.logo && <img src={props.logo} alt="Logo" className="h-10 w-10 rounded-xl object-cover" />}
            <Editable
            as="div"
            value={props.heading}
            onChange={(v) => onChange({ heading: v })}
            className="font-extrabold text-2xl tracking-tight mb-4"
            style={{ color: ink }}
            />
          </div>
          <Editable
            as="p"
            value={props.message ?? ""}
            onChange={(v) => onChange({ message: v })}
            className="text-sm leading-relaxed max-w-sm mb-8 opacity-70"
            style={{ color: ink }}
          />

          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold" style={{ background: `${ink}04`, color: ink }}>
            <span className="h-2 w-2 rounded-full" style={{ background: accent }}></span>
            <span>All Systems Operational</span>
          </div>
        </div>

        <div>
          <div className="text-xs font-bold tracking-widest uppercase mb-6 opacity-50" style={{ color: ink }}>Navigation</div>
          <div className="flex flex-col gap-3">
            {["Home", "About", "Projects", "Testimonials", "Contact"].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium transition-opacity hover:opacity-100 opacity-70" style={{ color: ink }}>
                {link}
              </a>
            ))}
          </div>
        </div>
        
        <div>
          <div className="text-xs font-bold tracking-widest uppercase mb-6 opacity-50" style={{ color: ink }}>Socials</div>
          <div className="flex gap-3">
            {props.socials?.map((s, i) => {
              const Icon = ICONS[s.platform?.toLowerCase()] ?? Mail;
              return (
                <a
                  key={i}
                  href="#"
                  className="h-10 w-10 rounded-xl flex items-center justify-center transition-colors hover:bg-black/5"
                  style={{ background: `${ink}04`, color: ink }}
                >
                  <Icon className="h-4 w-4" style={{ color: accent }} />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: `1px solid ${ink}06` }}>
        <p className="text-xs font-semibold opacity-50" style={{ color: ink }}>
          © {year} {props.heading}. Engineered with precision.
        </p>
        
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="h-10 w-10 rounded-xl flex items-center justify-center transition-colors hover:bg-black/5"
          style={{ background: `${ink}04`, color: ink }}
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </footer>
  );
}