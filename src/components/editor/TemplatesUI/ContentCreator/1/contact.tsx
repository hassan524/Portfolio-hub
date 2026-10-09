// @ts-nocheck
import { ArrowUpRight, Clock3, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || "#A0A5B5";
  const accent = theme?.accent || "#7DD3FC";

  return (
    <section id="contact" className="relative px-5 py-24 sm:px-8 sm:py-32 border-t border-white/10" style={{ backgroundColor: bg, color: ink }}>
      <div className="mx-auto max-w-7xl">
        {/* Header Block: Big, Clean, Straight Alignment */}
        <div className="border-b border-white/15 pb-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#7DD3FC]">
            <MessageSquare size={14} />
            <Editable value={props?.label || "DIRECTORIAL INQUIRIES & COMMISSIONS"} />
          </div>
          <Editable
            as="h2"
            value={props?.headline || "HAVE A STORY THAT NEEDS TO BE TOLD?"}
            onChange={(v) => onChange?.({ headline: v })}
            className="mt-4 text-4xl font-semibold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl max-w-4xl"
          />
          <p className="mt-4 max-w-2xl text-base text-white/70">
            Accepting select commercial directing commissions, executive video production, and flagship YouTube sponsorships for the upcoming season.
          </p>
        </div>

        {/* Straight-Aligned Editorial Contact Grid — Zero Cards */}
        <div className="mt-12 grid gap-8 sm:grid-cols-3 border-b border-white/15 pb-12 font-mono">
          <div>
            <div className="flex items-center gap-2 text-[#7DD3FC] text-xs font-bold uppercase">
              <Mail size={16} />
              <span>DIRECTORIAL INQUIRY</span>
            </div>
            <a href="mailto:director@maravale.studio" className="mt-3 block text-base font-semibold text-white hover:text-[#7DD3FC] transition">
              <Editable value={props?.email || "director@maravale.studio"} />
            </a>
            <span className="mt-1 block text-xs text-white/50 font-sans">For commercial scripts & treatments</span>
          </div>

          <div>
            <div className="flex items-center gap-2 text-[#7DD3FC] text-xs font-bold uppercase">
              <Phone size={16} />
              <span>STUDIO & AGENT</span>
            </div>
            <a href="tel:+12125550148" className="mt-3 block text-base font-semibold text-white hover:text-[#7DD3FC] transition">
              <Editable value={props?.phone || "+1 (212) 555-0148"} />
            </a>
            <span className="mt-1 block text-xs text-white/50 font-sans">Rep: Paradigm Talent Agency, NY</span>
          </div>

          <div>
            <div className="flex items-center gap-2 text-[#7DD3FC] text-xs font-bold uppercase">
              <MapPin size={16} />
              <span>STUDIO HEADQUARTERS</span>
            </div>
            <span className="mt-3 block text-base font-semibold text-white">
              <Editable value={props?.address || "Brooklyn, NY • Global Shoots"} />
            </span>
            <span className="mt-1 block text-xs text-white/50 font-sans">Available for on-location productions</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs text-white/50 uppercase tracking-widest font-mono">Status: Booking Q3 / Q4 Production Slate</span>
          <a
            href="mailto:director@maravale.studio"
            className="inline-flex items-center gap-2 rounded-full bg-[#7DD3FC] px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#0A0A0C] hover:scale-105 transition"
          >
            <span>Initiate Directorial Brief</span>
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
