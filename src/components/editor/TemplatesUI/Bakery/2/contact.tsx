// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { FaInstagram, FaLinkedin, FaBehance } from "react-icons/fa";

const ICONS: Record<string, any> = { instagram: FaInstagram, linkedin: FaLinkedin, behance: FaBehance };

export function Bakery2Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.["bg-second"] || "#f7f4f6";
  const ink = theme?.ink || "#242023";
  const surface = theme?.surface || "#ded7dc";
  const accent = theme?.accent || "#882b8b"; const fontHeading = theme?.fontHeading || "Fraunces"; const fontBody = theme?.fontBody || "Inter";

  return (
    <section id="contact" className="scroll-mt-20 py-24 md:py-32" style={{ backgroundColor: bg, color: ink , fontFamily: fontBody }}>
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-16 md:grid-cols-2 md:items-start">
          {/* Left */}
          <div>
            <Editable as="p" className="text-xs font-bold uppercase tracking-widest" value="04 / Contact" />
            <Editable
              as="h2"
              className="mt-5 text-4xl font-bold uppercase leading-tight md:text-6xl"
              style={{ fontFamily: fontHeading }}
              value={props.contactTitle || "Let's make something."}
              onChange={(contactTitle) => onChange?.({ contactTitle })}
            />
            <div className="mt-10 space-y-5 text-sm">
              <div className="border-b pb-5" style={{ borderColor: surface }}>
                <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-1">New business</p>
                <Editable as="p" value={props.email || "hello@breadstudio.co"} onChange={(email) => onChange?.({ email })} />
              </div>
              <div className="border-b pb-5" style={{ borderColor: surface }}>
                <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-1">Location</p>
                <Editable as="p" value={props.address || "London, United Kingdom"} onChange={(address) => onChange?.({ address })} />
              </div>
            </div>
            {props.socials && props.socials.length > 0 && (
              <div className="mt-8 flex gap-3">
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

          {/* Right: form */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input className="w-full border-b bg-transparent px-0 py-3 text-sm outline-none focus:border-current/60" style={{ borderColor: surface, color: ink }} placeholder="Full name" />
            <input type="email" className="w-full border-b bg-transparent px-0 py-3 text-sm outline-none focus:border-current/60" style={{ borderColor: surface, color: ink }} placeholder="Email address" />
            <input className="w-full border-b bg-transparent px-0 py-3 text-sm outline-none focus:border-current/60" style={{ borderColor: surface, color: ink }} placeholder="Project type" />
            <textarea rows={5} className="w-full border-b bg-transparent px-0 py-3 text-sm outline-none resize-none focus:border-current/60" style={{ borderColor: surface, color: ink }} placeholder="Tell us about your project…" />
            <div className="pt-4">
              <button type="submit" className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest transition-opacity hover:opacity-70" style={{ color: ink }}>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full" style={{ backgroundColor: accent, color: "#fff" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
                </span>
                Send message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
