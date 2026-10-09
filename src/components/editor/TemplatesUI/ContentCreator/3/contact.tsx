// @ts-nocheck
import { ArrowUpRight, Mail, MapPin, MessageSquare, Send } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#123C35";
  const ink = theme?.ink || "#F1F7E8";
  const inkSecond = theme?.["ink-second"] || "#F1F7E8";
  const accent = theme?.accent || "#D6FF4B";

  return (
    <section id="contact" className="relative px-5 py-24 sm:px-8 sm:py-32 border-t border-[#D6FF4B]/20" style={{ backgroundColor: bg, color: ink }}>
      <div className="mx-auto max-w-7xl">
        {/* Header: Straight Alignment */}
        <div className="border-b border-[#D6FF4B]/20 pb-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D6FF4B]">
            <MessageSquare size={14} />
            <Editable value={props?.label || "SPONSORSHIP & BUSINESS INQUIRIES"} />
          </div>
          <Editable
            as="h2"
            value={props?.headline || "LET'S COLLABORATE ON AN UPCOMING VIDEO."}
            onChange={(v) => onChange?.({ headline: v })}
            className="mt-4 text-4xl font-light uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl max-w-5xl"
          />
          <p className="mt-4 max-w-2xl text-base text-[#F1F7E8]/75">
            Interested in sponsoring a dedicated video essay, podcast segment, or tech review? Send over your brief and timeline.
          </p>
        </div>

        {/* Straight-Aligned 3-Column Contact Channels */}
        <div className="mt-12 grid gap-8 sm:grid-cols-3 border-b border-[#D6FF4B]/20 pb-12 font-mono">
          <div>
            <div className="flex items-center gap-2 text-[#D6FF4B] text-xs font-bold uppercase">
              <Mail size={16} />
              <span>SPONSORSHIPS</span>
            </div>
            <a href="mailto:sponsors@creatorstudio.tv" className="mt-3 block text-base font-semibold text-white hover:text-[#D6FF4B] transition">
              <Editable value={props?.email || "sponsors@creatorstudio.tv"} />
            </a>
            <span className="mt-1 block text-xs text-white/50 font-sans">For dedicated video integrations & campaigns</span>
          </div>

          <div>
            <div className="flex items-center gap-2 text-[#D6FF4B] text-xs font-bold uppercase">
              <MessageSquare size={16} />
              <span>PODCAST & PRESS</span>
            </div>
            <a href="mailto:press@creatorstudio.tv" className="mt-3 block text-base font-semibold text-white hover:text-[#D6FF4B] transition">
              <Editable value={props?.pressEmail || "press@creatorstudio.tv"} />
            </a>
            <span className="mt-1 block text-xs text-white/50 font-sans">For speaking events and media appearances</span>
          </div>

          <div>
            <div className="flex items-center gap-2 text-[#D6FF4B] text-xs font-bold uppercase">
              <MapPin size={16} />
              <span>STUDIO BASE</span>
            </div>
            <span className="mt-3 block text-base font-semibold text-white">
              <Editable value={props?.location || "Austin, TX • Worldwide"} />
            </span>
            <span className="mt-1 block text-xs text-white/50 font-sans">Primary 4K filming facility</span>
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs text-white/60 font-mono">Response time: Usually within 24–48 business hours</span>
          <a
            href="mailto:sponsors@creatorstudio.tv"
            className="inline-flex items-center gap-2 rounded-full bg-[#D6FF4B] px-8 py-4 text-xs font-bold uppercase text-[#123C35] hover:scale-105 transition shadow-[0_0_20px_rgba(214,255,75,0.2)]"
          >
            <span>Send Sponsorship Brief</span>
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
