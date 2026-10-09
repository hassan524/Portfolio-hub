// @ts-nocheck
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Clock, Flame, Mail, MapPin, Phone } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const display = "font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif]";

const defaultHours = [
  { day: "Mon – Thu", time: "5:00 PM – 10:30 PM" },
  { day: "Fri – Sat", time: "5:00 PM – 12:00 AM" },
  { day: "Sunday", time: "12:00 PM – 9:00 PM" },
];
const defaultBadges = [{ text: "Walk-ins welcome" }, { text: "Vegetarian friendly" }, { text: "Heated patio" }, { text: "Private dining" }];

export function Contact({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const line = `color-mix(in srgb, ${inkSecond} 20%, transparent)`;
  const soft = `color-mix(in srgb, ${inkSecond} 8%, transparent)`;

  const hours = props?.hours?.length ? props.hours : defaultHours;
  const badges = props?.badges?.length ? props.badges : defaultBadges;

  const T = (key, def, as = "span") => (
    <Editable as={as} value={props?.[key] || def} onChange={(v) => onChange?.({ [key]: v })} />
  );
  const L = (key, list, i, field, as = "span") => (
    <Editable
      as={as}
      value={list[i][field] ?? ""}
      onChange={(v) => onChange?.({ [key]: list.map((it, idx) => (idx === i ? { ...it, [field]: v } : it)) })}
    />
  );

  const reveal = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  };

  const rows = [
    { Icon: Phone, label: T("phoneLabel", "Call us"), value: T("phone", "+1 (415) 555-0142") },
    { Icon: Mail, label: T("emailLabel", "Write to us"), value: T("email", "hello@emberandoak.com") },
    { Icon: MapPin, label: T("addressLabel", "Find us"), value: T("address", "128 Alder Street, Mission District, San Francisco, CA 94110") },
  ];

  return (
    <section id="contact" className="relative w-full overflow-hidden" style={{ background: bgSecond, color: inkSecond }}>
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-10 lg:py-36">
        <motion.div {...reveal}>
          <div className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: bg }}>
            {T("eyebrow", "Visit us")}
          </div>
          <div className={`${display} mt-3 break-words text-[20vw] uppercase leading-[0.85] md:text-[11vw]`}>
            {T("title", "Come hungry.", "h2")}
          </div>
        </motion.div>

        <div className="mt-16 grid items-start gap-16 lg:grid-cols-[1.1fr_1fr]">
          <div>
            {rows.map(({ Icon, label, value }, i) => (
              <motion.div
                key={i}
                {...reveal}
                transition={{ ...reveal.transition, delay: i * 0.1 }}
                className="group flex items-start gap-5 border-t py-6 transition-all duration-300 hover:pl-3"
                style={{ borderColor: line }}
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full" style={{ background: accent }}>
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-[11px] font-black uppercase tracking-[0.2em] opacity-60">{label}</div>
                  <div className="mt-1 text-xl font-bold leading-snug md:text-3xl">{value}</div>
                </div>
              </motion.div>
            ))}

            <motion.div {...reveal} className="border-t pt-8" style={{ borderColor: line }}>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5" style={{ color: bg }} />
                <div className={`${display} text-3xl uppercase md:text-4xl`}>{T("hoursTitle", "Opening hours", "h3")}</div>
              </div>
              <div className="mt-6 space-y-4">
                {hours.map((h, i) => (
                  <div key={i} className="flex items-baseline gap-3 text-base font-bold uppercase tracking-wide md:text-lg">
                    <span>{L("hours", hours, i, "day")}</span>
                    <span className="mb-1 flex-1 border-b-2 border-dotted" style={{ borderColor: line }} />
                    <span>{L("hours", hours, i, "time")}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {badges.map((b, i) => (
                  <span
                    key={i}
                    className="rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em]"
                    style={{ background: soft }}
                  >
                    {L("badges", badges, i, "text")}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div {...reveal} className="relative mx-auto w-full max-w-md lg:mx-0 lg:ml-auto">
            <motion.div
              whileHover={{ rotate: -1.5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 140, damping: 16 }}
              className="aspect-[4/5] w-full overflow-hidden rounded-t-full"
            >
              <img
                src={props?.image || "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1000&q=80"}
                alt="Restaurant"
                draggable={false}
                className="h-full w-full object-cover"
              />
            </motion.div>
            <div
              className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full px-5 py-3 text-xs font-black uppercase tracking-[0.16em] shadow-2xl"
              style={{ background: inkSecond, color: ink }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: accent }} />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ background: accent }} />
              </span>
              {T("openNow", "Open tonight · kitchen closes 10PM")}
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 16, ease: "linear", repeat: Infinity }}
              className="absolute -right-3 top-10 grid h-24 w-24 place-items-center rounded-full border-2 border-dashed md:-right-8"
              style={{ borderColor: inkSecond }}
            />
            <div
              className="absolute -right-3 top-10 grid h-24 w-24 place-items-center rounded-full text-center md:-right-8"
              style={{ background: accent, color: inkSecond }}
            >
              <div className="flex flex-col items-center gap-0.5">
                <Flame className="h-5 w-5" />
                <span className="px-3 text-[9px] font-black uppercase leading-tight tracking-[0.14em]">{T("stamp", "Fire's always lit")}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}