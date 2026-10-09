// @ts-nocheck
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Flame, Leaf, Wheat } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const display = "font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif]";
const img = (id, w = 1000) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const defaultChips = ["Wood-fired", "Hand-rolled pasta", "Local farms", "Natural wine"];
const defaultFeatures = [
  { title: "Real fire", text: "Oak and olive wood, 485°C, ninety seconds from oven to table." },
  { title: "Slow dough", text: "Seventy-two hour fermentation with flour milled every week." },
  { title: "Local first", text: "Almost everything on the plate grows within 80 km of the kitchen." },
];
const featureIcons = [Flame, Wheat, Leaf];
const defaultGallery = [
  { image: img("1414235077428-338989a2e8c0", 900), caption: "The long table" },
  { image: img("1559339352-11d035aa65de", 900), caption: "Fire & brick" },
  { image: img("1555396273-367ea4eb4db5", 900), caption: "Late evenings" },
  { image: img("1528605248644-14dd04022da1", 900), caption: "Sunday lunch" },
  { image: img("1510812431401-41d2bd2722f3", 900), caption: "Natural wine" },
  { image: img("1540189549336-e6e99c3679fe", 900), caption: "Market produce" },
];
const defaultTeam = [
  { name: "Marco Rinaldi", role: "Head chef & founder", bio: "Trained in Naples, cooks every service like it's his first.", image: img("1577219491135-ce391730fb2c", 800) },
  { name: "Elena Costa", role: "Dough & pastry", bio: "Keeps our starter alive and our desserts honest.", image: img("1438761681033-6461ffad8d80", 800) },
  { name: "Daniel Okafor", role: "Sommelier", bio: "Pours small-grower wines that actually suit the food.", image: img("1472099645785-5658abf4ff4e", 800) },
];
const defaultValues = [
  { title: "Fire first", text: "Everything starts at the oven. Technique over tricks." },
  { title: "Seasons rule", text: "The menu changes when the market does, not when we're bored." },
  { title: "Everyone eats", text: "Generous plates, honest prices and a seat for every guest." },
  { title: "Waste nothing", text: "Stems, crusts and bones all find a second life on the menu." },
];
const defaultSets = [
  { name: "Lunch Fire Set", desc: "Starter, any pizza or pasta, espresso", price: "$28" },
  { name: "Chef's Tasting", desc: "Seven courses cooked over the open fire", price: "$64" },
  { name: "Family Table", desc: "Shared plates for two, dessert included", price: "$42" },
];

export function About({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const line = `color-mix(in srgb, ${inkSecond} 20%, transparent)`;
  const soft = `color-mix(in srgb, ${inkSecond} 8%, transparent)`;

  const chips = props?.chips?.length ? props.chips : defaultChips;
  const features = props?.features?.length ? props.features : defaultFeatures;
  const gallery = props?.gallery?.length ? props.gallery : defaultGallery;
  const team = props?.team?.length ? props.team : defaultTeam;
  const values = props?.values?.length ? props.values : defaultValues;
  const sets = props?.sets?.length ? props.sets : defaultSets;

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
  const Chip = (i) => (
    <Editable
      as="span"
      value={chips[i]}
      onChange={(v) => onChange?.({ chips: chips.map((s, idx) => (idx === i ? v : s)) })}
    />
  );

  const reveal = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  };

  return (
    <section id="about" className="relative w-full overflow-hidden" style={{ background: bgSecond, color: inkSecond }}>
      {/* STORY */}
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-24 md:px-10 lg:grid-cols-2 lg:gap-20 lg:py-36">
        <div className="relative mx-auto w-full max-w-xl pb-16 pr-10 lg:mx-0">
          <motion.div
            initial={{ opacity: 0, rotate: -8, y: 60 }}
            whileInView={{ opacity: 1, rotate: -3, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ rotate: 0, scale: 1.02 }}
            className="aspect-[4/5] w-[82%] overflow-hidden rounded-[2.5rem]"
          >
            <img src={props?.storyImage1 || img("1517248135467-4c7edcad34c4", 1000)} alt="Dining room" draggable={false} className="h-full w-full object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, rotate: 10, y: 80 }}
            whileInView={{ opacity: 1, rotate: 5, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            whileHover={{ rotate: 0, scale: 1.03 }}
            className="absolute bottom-0 right-0 aspect-square w-[52%] overflow-hidden rounded-full border-[6px]"
            style={{ borderColor: bgSecond }}
          >
            <img src={props?.storyImage2 || img("1556910103-1c02745aae4d", 800)} alt="Kitchen" draggable={false} className="h-full w-full object-cover" />
          </motion.div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 22, ease: "linear", repeat: Infinity }}
            className="absolute -top-4 right-2 grid h-28 w-28 place-items-center rounded-full border-2 border-dashed"
            style={{ borderColor: inkSecond }}
          />
          <div
            className="absolute -top-4 right-2 grid h-28 w-28 place-items-center rounded-full text-center"
            style={{ background: accent, color: inkSecond }}
          >
            <div>
              <div className={`${display} text-3xl leading-none`}>{T("estYear", "2012")}</div>
              <div className="text-[10px] font-black uppercase tracking-[0.18em]">{T("estLabel", "Since")}</div>
            </div>
          </div>
        </div>

        <motion.div {...reveal}>
          <div className="flex flex-wrap gap-2">
            {chips.map((_, i) => (
              <span
                key={i}
                className="rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.16em]"
                style={{ background: soft }}
              >
                {Chip(i)}
              </span>
            ))}
          </div>
          <div className="mt-6 text-xs font-black uppercase tracking-[0.3em]" style={{ color: bg }}>
            {T("eyebrow", "Our story")}
          </div>
          <div className={`${display} mt-3 text-5xl uppercase leading-[0.92] md:text-7xl`}>
            {T("title", "One fire, one long table, one stubborn grandmother.", "h2")}
          </div>
          <p className="mt-7 max-w-xl text-base leading-relaxed opacity-80 md:text-lg">
            {T("story1", "Ember & Oak began in 2012 as a single brick oven in a borrowed garage, built by Marco Rinaldi and fed with whatever the neighbors' orchards dropped. The recipes were his grandmother's. The rules were simple: cook over real fire, buy from people you can call by name.")}
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed opacity-80 md:text-lg">
            {T("story2", "Today the room seats sixty, the oven still burns oak, and the menu still changes with the market. Come hungry, stay late, and leave smelling faintly of woodsmoke.")}
          </p>

          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {features.map((f, i) => {
              const Icon = featureIcons[i % featureIcons.length];
              return (
                <div key={i} className="border-t pt-5" style={{ borderColor: line }}>
                  <span className="grid h-10 w-10 place-items-center rounded-full" style={{ background: accent }}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="mt-4 text-lg font-black uppercase tracking-wide">{L("features", features, i, "title")}</div>
                  <p className="mt-2 text-sm leading-relaxed opacity-75">{L("features", features, i, "text")}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* GALLERY MARQUEE */}
      <div className="pb-24 lg:pb-32">
        <div className="mx-auto mb-10 flex max-w-7xl items-end justify-between gap-6 px-5 md:px-10">
          <div className={`${display} text-5xl uppercase leading-[0.92] md:text-7xl`}>
            {T("galleryTitle", "Inside the room", "h3")}
          </div>
          <div className="hidden max-w-xs text-sm font-semibold uppercase tracking-wider opacity-70 md:block">
            {T("galleryText", "Brick, copper, candlelight and the occasional shower of sparks.")}
          </div>
        </div>
        <div className="overflow-hidden">
          <motion.div
            className="flex w-max gap-5 px-3"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 48, ease: "linear", repeat: Infinity }}
          >
            {[...gallery, ...gallery].map((g, k) => {
              const i = k % gallery.length;
              return (
                <div
                  key={k}
                  className={`group relative aspect-[4/5] w-[68vw] shrink-0 overflow-hidden rounded-[2rem] sm:w-[320px] ${k % 2 ? "mt-10" : ""}`}
                >
                  <img src={g.image} alt={g.caption} draggable={false} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-sm font-black uppercase tracking-[0.16em]" style={{ background: `linear-gradient(to top, ${inkSecond}, transparent)`, color: ink }}>
                    {L("gallery", gallery, i, "caption")}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* TEAM */}
      <div className="mx-auto max-w-7xl px-5 pb-24 md:px-10 lg:pb-32">
        <motion.div {...reveal} className="mb-14 max-w-2xl">
          <div className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: bg }}>
            {T("teamEyebrow", "The people")}
          </div>
          <div className={`${display} mt-3 text-5xl uppercase leading-[0.92] md:text-7xl`}>
            {T("teamTitle", "Hands behind the fire", "h3")}
          </div>
        </motion.div>
        <div className="grid gap-12 md:grid-cols-3">
          {team.map((m, i) => (
            <motion.div
              key={i}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.12 }}
              className={`group ${i === 1 ? "md:mt-14" : ""} ${i === 2 ? "md:mt-28" : ""}`}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img src={m.image} alt={m.name} draggable={false} className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" />
              </div>
              <div className={`${display} mt-5 text-3xl uppercase`}>{L("team", team, i, "name", "h4")}</div>
              <div className="mt-1 text-xs font-black uppercase tracking-[0.2em]" style={{ color: bg }}>
                {L("team", team, i, "role")}
              </div>
              <p className="mt-3 max-w-xs text-sm leading-relaxed opacity-75">{L("team", team, i, "bio")}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* VALUES */}
      <div className="mx-auto max-w-7xl px-5 pb-24 md:px-10 lg:pb-32">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <motion.div
              key={i}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.1 }}
              className="border-t-2 pt-5"
              style={{ borderColor: inkSecond }}
            >
              <div className={`${display} text-6xl leading-none`} style={{ color: accent, WebkitTextStroke: `1.5px ${inkSecond}` }}>
                0{i + 1}
              </div>
              <div className="mt-4 text-xl font-black uppercase tracking-wide">{L("values", values, i, "title")}</div>
              <p className="mt-2 text-sm leading-relaxed opacity-75">{L("values", values, i, "text")}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* SET MENUS */}
      <div className="px-5 pb-24 md:px-10 lg:pb-36">
        <motion.div {...reveal} className="mx-auto max-w-4xl">
          <div className="text-center text-xs font-black uppercase tracking-[0.3em]" style={{ color: bg }}>
            {T("setsEyebrow", "Set menus")}
          </div>
          <div className={`${display} mt-3 text-center text-5xl uppercase leading-[0.92] md:text-7xl`}>
            {T("setsTitle", "Eat the whole fire", "h3")}
          </div>
          <div className="mt-12">
            {sets.map((s, i) => (
              <div key={i} className="group border-t py-6 transition-all duration-300 hover:pl-4" style={{ borderColor: line }}>
                <div className="flex items-baseline gap-3">
                  <span className={`${display} text-3xl uppercase md:text-4xl`}>{L("sets", sets, i, "name")}</span>
                  <span className="mb-1.5 flex-1 border-b-2 border-dotted" style={{ borderColor: line }} />
                  <span className={`${display} text-3xl md:text-4xl`} style={{ color: bg }}>
                    {L("sets", sets, i, "price")}
                  </span>
                </div>
                <div className="mt-1 text-sm font-semibold uppercase tracking-wider opacity-70">{L("sets", sets, i, "desc")}</div>
              </div>
            ))}
            <div className="border-t" style={{ borderColor: line }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}