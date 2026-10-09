// @ts-nocheck
import { useState } from "react";
import { motion } from "framer-motion";
import { Editable } from "@/components/editor/ui/Editable";

const DISPLAY = "'Bebas Neue','Oswald','Impact',sans-serif";
const SERIF = "'Cormorant Garamond','Playfair Display',Georgia,serif";

export function Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#07080A";
  const ink = theme?.ink || "#E8E4DC";
  const inkSecond = theme?.["ink-second"] || "#7A756C";
  const surface = theme?.surface || "rgba(255,255,255,0.07)";
  const accent = theme?.accent || "#E8412F";

  const [hover, setHover] = useState(false);

  const email = props?.email || "hello@zayanmalik.dev";
  const phone = props?.phone || "+1 (555) 014-2290";
  const address = props?.address || "21 Harbor Street, Austin, TX";
  const hours = Array.isArray(props?.hours) && props.hours.length > 0
    ? props.hours
    : [
        { day: "Mon – Fri", time: "09:00 – 18:00" },
        { day: "Saturday", time: "10:00 – 14:00" },
        { day: "Sunday", time: "Wrapped" },
      ];

  return (
    <section id="contact" className="relative w-full overflow-hidden py-24 md:py-36" style={{ backgroundColor: bg, color: ink }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,500;1,500&display=swap');`}</style>

      {/* Faint decorative reel in background */}
      <div className="pointer-events-none absolute -right-32 top-0 opacity-[0.03] select-none" aria-hidden="true">
        <svg viewBox="0 0 200 200" width="500" height="500">
          <circle cx="100" cy="100" r="95" fill="none" stroke={ink} strokeWidth="2" />
          {[0,1,2,3,4,5].map(i => { const a=(i*60*Math.PI)/180; return <circle key={i} cx={100+56*Math.cos(a)} cy={100+56*Math.sin(a)} r="20" fill="none" stroke={ink} strokeWidth="2" />; })}
          <circle cx="100" cy="100" r="25" fill="none" stroke={ink} strokeWidth="2" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-12">
        <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.4em]" style={{ color: accent }}>
          <span className="h-px w-10" style={{ backgroundColor: accent }} />
          <Editable value={props?.eyebrow || "ACT V · CASTING CALL"} onChange={(v) => onChange?.({ eyebrow: v })} />
        </p>

        <h2 className="mt-5 leading-[0.88]" style={{ fontFamily: DISPLAY, fontSize: "clamp(3.5rem, 12vw, 9rem)" }}>
          <Editable value={props?.title || "LIGHTS. CAMERA. CODE."} onChange={(v) => onChange?.({ title: v })} />
        </h2>

        <p className="mt-6 max-w-xl text-xl italic md:text-2xl" style={{ fontFamily: SERIF, color: inkSecond }}>
          <Editable value={props?.subtitle || "Got a high-stakes product that needs a cinematic engineer? Send over the script."} onChange={(v) => onChange?.({ subtitle: v })} />
        </p>

        {/* Giant email */}
        <motion.a
          href={`mailto:${email}`}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mt-12 inline-block break-all text-4xl tracking-wider md:text-6xl"
          style={{ fontFamily: DISPLAY, color: accent }}
        >
          <Editable value={email} onChange={(v) => onChange?.({ email: v })} />
          <svg className="absolute -bottom-3 left-0 h-2.5 w-full" viewBox="0 0 400 10" preserveAspectRatio="none" aria-hidden="true">
            <motion.path d="M0 5 Q 100 0 200 5 T 400 5" fill="none" stroke={accent} strokeWidth="2" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3 }} />
          </svg>
        </motion.a>

        <div className="mt-20 grid gap-10 md:grid-cols-3">
          <div className="border-t pt-5" style={{ borderColor: surface }}>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em]" style={{ color: inkSecond }}>CALL SHEET</p>
            <p className="mt-3 text-3xl tracking-wider md:text-4xl" style={{ fontFamily: DISPLAY }}>
              <Editable value={phone} onChange={(v) => onChange?.({ phone: v })} />
            </p>
          </div>
          <div className="border-t pt-5" style={{ borderColor: surface }}>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em]" style={{ color: inkSecond }}>STUDIO</p>
            <p className="mt-3 text-3xl tracking-wider md:text-4xl" style={{ fontFamily: DISPLAY }}>
              <Editable value={address} onChange={(v) => onChange?.({ address: v })} />
            </p>
          </div>
          <div className="border-t pt-5" style={{ borderColor: surface }}>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em]" style={{ color: inkSecond }}>
              <Editable value={props?.hoursTitle || "CALL TIMES"} onChange={(v) => onChange?.({ hoursTitle: v })} />
            </p>
            <div className="mt-3 space-y-2">
              {hours.map((h: any, i: number) => (
                <div key={i} className="flex items-baseline gap-3 text-lg">
                  <span style={{ fontFamily: DISPLAY }} className="tracking-widest">
                    <Editable value={h.day} onChange={(v) => onChange?.({ hours: hours.map((x: any, k: number) => (k === i ? { ...x, day: v } : x)) })} />
                  </span>
                  <span className="flex-1 border-b border-dotted" style={{ borderColor: inkSecond }} />
                  <span style={{ fontFamily: SERIF, color: inkSecond }} className="italic">
                    <Editable value={h.time} onChange={(v) => onChange?.({ hours: hours.map((x: any, k: number) => (k === i ? { ...x, time: v } : x)) })} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const DeveloperPortfolio4Contact = Contact;
export default Contact;
