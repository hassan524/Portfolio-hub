// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { Flame, Leaf, Wine, Wheat } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const D = ["", "[animation-delay:100ms]", "[animation-delay:200ms]", "[animation-delay:300ms]", "[animation-delay:400ms]", "[animation-delay:500ms]", "[animation-delay:600ms]", "[animation-delay:700ms]"];

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

export function About({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const [ref, seen] = useReveal(0.05);
  const r = (i = 0, k = "animate__fadeInUp") => (seen ? `animate__animated ${k} ${D[i % 8]}` : "opacity-0");

  const stats = props?.stats || [
    { value: "2012", label: "Founded" },
    { value: "90", label: "Seats" },
    { value: "24", label: "Partner growers" },
    { value: "11", label: "Industry awards" },
  ];
  const chips = props?.chips || ["Wood-fired", "Seasonal", "Family-run", "Natural wine", "Private dining"];
  const features = props?.features || [
    { title: "Open-fire cooking", text: "Every dish touches oak, olive wood or embers. Fire is our only technique and our signature." },
    { title: "Farm to table", text: "Produce from growers within 80 km, delivered the morning it is picked." },
    { title: "Natural wine programme", text: "Sixty small-batch bottles, selected and poured by our sommelier team." },
    { title: "Daily hand-made pasta", text: "Rolled and cut by hand at 7 AM, never frozen, never rushed." },
  ];
  const icons = [Flame, Leaf, Wine, Wheat];
  const team = props?.team || [
    { name: "Marco Ferretti", role: "Executive Chef", bio: "Trained in Bologna and Lyon. Twenty years leading open-fire kitchens.", image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80" },
    { name: "Elena Rossi", role: "Pastry Chef", bio: "Former head of pastry at a two-star kitchen in Turin.", image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80" },
    { name: "Daniel Okafor", role: "Head Sommelier", bio: "Advanced sommelier focused on small European producers.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80" },
  ];
  const values = props?.values || [
    { title: "Cook with respect", text: "Fewer ingredients, treated properly." },
    { title: "Feed everyone", text: "Warm tables and fair prices, without pretension." },
    { title: "Waste nothing", text: "Trimmings become stocks, ferments and staff meals." },
  ];
  const upd = (key: string, arr: any[], i: number, f: string, v: string) =>
    onChange?.({ [key]: arr.map((it: any, j: number) => (j === i ? { ...it, [f]: v } : it)) });

  return (
    <section id="about" ref={ref} className="relative px-5 py-28 md:px-10" style={{ backgroundColor: bgSecond, color: ink }}>
      <div className="mx-auto max-w-7xl">
        <div className={r(0)}>
          <div className="flex items-center gap-4">
            <span className="h-px w-14" style={{ backgroundColor: accent }} />
            <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: accent }}>
              <Editable value={props?.eyebrow || "Our story"} onChange={(v) => onChange?.({ eyebrow: v })} />
            </span>
          </div>
          <h2 className="mt-6 max-w-4xl font-serif text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">
            <Editable value={props?.title || "A kitchen built on patience, provenance and fire."} onChange={(v) => onChange?.({ title: v })} />
          </h2>
        </div>

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className={`lg:col-span-5 ${r(1, "animate__fadeInLeft")}`}>
            <img
              src={props?.imageMain || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"}
              alt="Dining room"
              className="h-[420px] w-full rounded-2xl object-cover lg:h-[560px]"
            />
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: inkSecond }}>
              <Editable value={props?.caption || "The main dining room, Olive Street"} onChange={(v) => onChange?.({ caption: v })} />
            </p>
          </div>

          <div className="lg:col-span-7">
            <p className={`font-serif text-2xl leading-snug sm:text-3xl ${r(2)}`}>
              <Editable
                value={props?.lead || "Rosso & Fig began in 2012 as a twelve-seat supper club inside a converted bakery. Today it is a ninety-seat kitchen with the same discipline."}
                onChange={(v) => onChange?.({ lead: v })}
              />
            </p>
            <p className={`mt-6 text-base leading-relaxed sm:text-lg ${r(3)}`} style={{ color: inkSecond }}>
              <Editable
                value={props?.text || "Our menu follows the seasons and our suppliers are people we know by name. We cook with a small set of ingredients, treat each one with care, and serve food that is generous without being loud. Guests come for dinner and stay for the room."}
                onChange={(v) => onChange?.({ text: v })}
              />
            </p>

            <div className={`mt-12 grid grid-cols-2 sm:grid-cols-4 ${r(4)}`} style={{ borderTop: `1px solid ${surface}`, borderBottom: `1px solid ${surface}` }}>
              {stats.map((s: any, i: number) => (
                <div
                  key={i}
                  className={`py-8 ${i % 2 ? "pl-6" : "pr-6"} sm:px-6 ${i === 0 ? "sm:pl-0" : "sm:border-l"}`}
                  style={{ borderColor: surface }}
                >
                  <div className="font-serif text-4xl font-semibold sm:text-5xl" style={{ color: accent }}>
                    <Editable value={s.value} onChange={(v) => upd("stats", stats, i, "value", v)} />
                  </div>
                  <div className="mt-2 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: inkSecond }}>
                    <Editable value={s.label} onChange={(v) => upd("stats", stats, i, "label", v)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`mt-20 flex flex-wrap items-center gap-x-10 gap-y-3 py-6 ${r(0, "animate__fadeIn")}`} style={{ borderTop: `1px solid ${surface}`, borderBottom: `1px solid ${surface}` }}>
          {chips.map((c: string, i: number) => (
            <span key={i} className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: inkSecond }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent }} />
              <Editable value={c} onChange={(v) => onChange?.({ chips: chips.map((x: string, j: number) => (j === i ? v : x)) })} />
            </span>
          ))}
        </div>

        <div className="mt-24">
          <div className={r(0)}>
            <h3 className="max-w-2xl font-serif text-3xl font-semibold leading-tight sm:text-5xl">
              <Editable value={props?.featuresTitle || "What we stand for"} onChange={(v) => onChange?.({ featuresTitle: v })} />
            </h3>
          </div>
          <div className="mt-12 grid md:grid-cols-2 md:gap-x-16">
            {features.map((f: any, i: number) => {
              const Icon = icons[i % icons.length];
              return (
                <div key={i} className={`group flex items-start gap-5 py-8 transition-all duration-300 hover:pl-2 ${r(i)}`} style={{ borderTop: `1px solid ${surface}` }}>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition group-hover:scale-110" style={{ border: `1px solid ${accent}`, color: accent }}>
                    <Icon size={20} />
                  </span>
                  <div className="min-w-0">
                    <div className="font-serif text-xl font-semibold sm:text-2xl">
                      <Editable value={f.title} onChange={(v) => upd("features", features, i, "title", v)} />
                    </div>
                    <p className="mt-2 text-base leading-relaxed" style={{ color: inkSecond }}>
                      <Editable value={f.text} onChange={(v) => upd("features", features, i, "text", v)} />
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ borderTop: `1px solid ${surface}` }} />
        </div>

        <div className="mt-28">
          <div className={`flex flex-col justify-between gap-4 md:flex-row md:items-end ${r(0)}`}>
            <h3 className="font-serif text-3xl font-semibold sm:text-5xl">
              <Editable value={props?.teamTitle || "The people behind the pass"} onChange={(v) => onChange?.({ teamTitle: v })} />
            </h3>
            <p className="max-w-sm text-sm" style={{ color: inkSecond }}>
              <Editable value={props?.teamText || "A small, long-serving team. Most have been with us for more than five years."} onChange={(v) => onChange?.({ teamText: v })} />
            </p>
          </div>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {team.map((t: any, i: number) => (
              <div key={i} className={`group ${r(i, "animate__fadeInUp")}`}>
                <div className="overflow-hidden rounded-2xl">
                  <img src={t.image} alt={t.name} className="aspect-[4/5] w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" />
                </div>
                <div className="mt-5 pt-5" style={{ borderTop: `1px solid ${surface}` }}>
                  <div className="font-serif text-2xl font-semibold"><Editable value={t.name} onChange={(v) => upd("team", team, i, "name", v)} /></div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: accent }}><Editable value={t.role} onChange={(v) => upd("team", team, i, "role", v)} /></div>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: inkSecond }}><Editable value={t.bio} onChange={(v) => upd("team", team, i, "bio", v)} /></p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-28 grid gap-10 md:grid-cols-3">
          {values.map((v: any, i: number) => (
            <div key={i} className={`pt-6 ${r(i, "animate__fadeInUp")}`} style={{ borderTop: `2px solid ${accent}` }}>
              <div className="font-serif text-5xl font-semibold" style={{ color: accent }}>0{i + 1}</div>
              <div className="mt-4 font-serif text-2xl font-semibold"><Editable value={v.title} onChange={(x) => upd("values", values, i, "title", x)} /></div>
              <p className="mt-2 text-base leading-relaxed" style={{ color: inkSecond }}><Editable value={v.text} onChange={(x) => upd("values", values, i, "text", x)} /></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}