// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { FaInstagram, FaFacebook, FaPinterest } from "react-icons/fa";

const ICONS: Record<string, any> = { instagram: FaInstagram, facebook: FaFacebook, pinterest: FaPinterest };

export function Bakery1Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.["bg-second"] || "#ffffff";
  const ink = theme?.ink || "#1a1a1a";
  const surface = theme?.surface || "#dcdbd8";
  const accent = theme?.accent || "#e85d3d";
  const fontHeading = theme?.fontHeading || "Fraunces";
  const fontBody = theme?.fontBody || "Inter";

  return (
    <section id="contact" className="scroll-mt-20 py-24 md:py-32" style={{ backgroundColor: bg, color: ink , fontFamily: fontBody }}>
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-16 md:grid-cols-2 md:items-start">
          {/* Left: info */}
          <div>
            <Editable as="p" className="text-xs font-bold uppercase tracking-widest" value="05 — Find us" />
            <Editable
              as="h2"
              className="mt-4 text-4xl md:text-5xl"
              style={{ fontFamily: fontHeading }}
              value={props.contactTitle || "Come say hello."}
              onChange={(contactTitle) => onChange?.({ contactTitle })}
            />
            <div className="mt-10 space-y-6 text-sm opacity-70">
              <div>
                <p className="font-semibold uppercase tracking-wider text-xs mb-1" style={{ color: accent }}>Address</p>
                <Editable as="p" value={props.address || "14 Mill Lane, Cotswolds GL54 1AB"} onChange={(address) => onChange?.({ address })} />
              </div>
              <div>
                <p className="font-semibold uppercase tracking-wider text-xs mb-1" style={{ color: accent }}>Hours</p>
                <Editable as="p" value="Mon – Sat: 7am – 4pm · Sun: 8am – 2pm" />
              </div>
              <div>
                <p className="font-semibold uppercase tracking-wider text-xs mb-1" style={{ color: accent }}>Email</p>
                <Editable as="p" value={props.email || "hello@thepantry.co"} onChange={(email) => onChange?.({ email })} />
              </div>
            </div>
            {props.socials && props.socials.length > 0 && (
              <div className="mt-8 flex gap-4">
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

          {/* Right: form */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-4 sm:grid-cols-2">
              <input className="w-full border border-current/20 px-4 py-3 text-sm outline-none focus:border-current/50 bg-transparent" placeholder="Name" style={{ color: ink }} />
              <input type="email" className="w-full border border-current/20 px-4 py-3 text-sm outline-none focus:border-current/50 bg-transparent" placeholder="Email" style={{ color: ink }} />
            </div>
            <input className="w-full border border-current/20 px-4 py-3 text-sm outline-none focus:border-current/50 bg-transparent" placeholder="Subject" style={{ color: ink }} />
            <textarea rows={5} className="w-full border border-current/20 px-4 py-3 text-sm outline-none focus:border-current/50 bg-transparent resize-none" placeholder="Your message…" style={{ color: ink }} />
            <button type="submit" className="px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-80" style={{ backgroundColor: accent, color: "#fff" }}>
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
