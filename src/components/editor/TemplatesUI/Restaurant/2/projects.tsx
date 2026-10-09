// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X, Moon, Utensils, Wine } from "lucide-react";
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

export function Projects({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const [ref, seen] = useReveal(0.05);
  const [active, setActive] = useState<number | null>(null);
  const r = (i = 0, k = "animate__fadeInUp") => (seen ? `animate__animated ${k} ${D[i % 8]}` : "opacity-0");

  const items = props?.items || [
    { tag: "Pizza", title: "Wood-Fired Margherita", desc: "San Marzano tomato, fior di latte, basil and olive oil.", price: "$16", details: "Slow-fermented 48-hour dough baked at 480°C for 90 seconds. Finished with cold-pressed Sicilian olive oil.", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80" },
    { tag: "Mains", title: "Slow-Braised Short Rib", desc: "Eight-hour braise, red wine jus, creamy polenta.", price: "$34", details: "Grass-fed beef braised overnight with rosemary and orange peel, served over stone-ground polenta.", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80" },
    { tag: "Pasta", title: "Hand-Rolled Tagliatelle", desc: "Egg yolk pasta, wild mushroom ragù, aged pecorino.", price: "$22", details: "Rolled every morning. Tossed with porcini, thyme and a splash of Marsala.", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80" },
    { tag: "Starters", title: "Burrata & Charred Fig", desc: "Creamy burrata, grilled figs, honey, toasted hazelnuts.", price: "$15", details: "Made for sharing. Finished with aged balsamic and flaky sea salt.", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80" },
    { tag: "Seafood", title: "Fire-Seared Sea Bass", desc: "Crisp skin, fennel salad, lemon-caper butter.", price: "$31", details: "Line-caught sea bass grilled over oak, served with shaved fennel and blistered tomatoes.", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80" },
    { tag: "Dessert", title: "Tiramisu al Caffè", desc: "Espresso-soaked savoiardi, mascarpone cream, cocoa.", price: "$11", details: "Our nonna-approved recipe, set overnight and dusted with Valrhona cocoa.", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=80" },
  ];
  const menus = props?.menus || [
    { name: "The Fig Table", price: "$58 / person", text: "Four shared courses, served family style." },
    { name: "Chef's Fire", price: "$84 / person", text: "Seven-course tasting with optional wine pairing." },
    { name: "Late Night Bites", price: "$28 / person", text: "Small plates and a glass, after 9 PM." },
  ];
  const gallery = props?.gallery || [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
  ];
  const upd = (key: string, arr: any[], i: number, f: string, v: string) =>
    onChange?.({ [key]: arr.map((it: any, j: number) => (j === i ? { ...it, [f]: v } : it)) });
  const icons = [Utensils, Wine, Moon];
  const a = active !== null ? items[active] : null;

  return (
    <section id="projects" ref={ref} className="relative px-5 py-28 md:px-10" style={{ backgroundColor: bg, color: ink }}>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className={r(0)}>
            <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: accent }}>
              <Editable value={props?.eyebrow || "The menu"} onChange={(v) => onChange?.({ eyebrow: v })} />
            </span>
            <h2 className="mt-4 text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl">
              <Editable value={props?.title || "Our premium plates"} onChange={(v) => onChange?.({ title: v })} />
            </h2>
          </div>
          <p className={`max-w-md ${r(1)}`} style={{ color: inkSecond }}>
            <Editable value={props?.subtitle || "Select any dish to see what goes into it. The menu changes with the seasons."} onChange={(v) => onChange?.({ subtitle: v })} />
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.slice(0, 3).map((it: any, i: number) => (
            <div key={i} onClick={() => setActive(i)} className={`group relative cursor-pointer overflow-hidden rounded-3xl ${r(i, "animate__fadeInUp")}`}>
              <img src={it.image} alt={it.title} className="h-[440px] w-full object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${bg} 5%, transparent 65%)` }} />
              <span className="absolute left-5 top-5 rounded-full px-3 py-1 text-xs font-black uppercase" style={{ backgroundColor: bg, color: accent }}>
                <Editable value={it.tag} onChange={(v) => upd("items", items, i, "tag", v)} />
              </span>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="flex items-end justify-between gap-3">
                  <h3 className="text-2xl font-black uppercase leading-tight" style={{ color: ink }}>
                    <Editable value={it.title} onChange={(v) => upd("items", items, i, "title", v)} />
                  </h3>
                  <span className="text-2xl font-black" style={{ color: accent }}>
                    <Editable value={it.price} onChange={(v) => upd("items", items, i, "price", v)} />
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: inkSecond }}>
                  <Editable value={it.desc} onChange={(v) => upd("items", items, i, "desc", v)} />
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14">
          {items.slice(3).map((it: any, k: number) => {
            const i = k + 3;
            return (
              <div
                key={i}
                onClick={() => setActive(i)}
                className={`group flex cursor-pointer items-center gap-5 py-6 transition-all duration-300 hover:pl-3 ${r(k, "animate__fadeInLeft")}`}
                style={{ borderTop: `1px solid ${surface}` }}
              >
                <img src={it.image} alt={it.title} className="hidden h-20 w-20 rounded-2xl object-cover sm:block" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-black uppercase tracking-widest" style={{ color: accent }}>
                    <Editable value={it.tag} onChange={(v) => upd("items", items, i, "tag", v)} />
                  </div>
                  <div className="text-xl font-black uppercase sm:text-2xl">
                    <Editable value={it.title} onChange={(v) => upd("items", items, i, "title", v)} />
                  </div>
                  <p className="mt-1 text-sm" style={{ color: inkSecond }}>
                    <Editable value={it.desc} onChange={(v) => upd("items", items, i, "desc", v)} />
                  </p>
                </div>
                <span className="text-2xl font-black" style={{ color: accent }}>
                  <Editable value={it.price} onChange={(v) => upd("items", items, i, "price", v)} />
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition group-hover:rotate-45" style={{ backgroundColor: accent, color: bg }}>
                  <ArrowUpRight size={18} />
                </span>
              </div>
            );
          })}
          <div style={{ borderTop: `1px solid ${surface}` }} />
        </div>

        <div className={`mt-24 rounded-[2.5rem] p-8 md:p-14 ${r(0, "animate__fadeInUp")}`} style={{ backgroundColor: accent, color: bg, boxShadow: `0 30px 80px ${accent}55` }}>
          <h3 className="text-3xl font-black uppercase tracking-tight sm:text-5xl">
            <Editable value={props?.menusTitle || "Set menus"} onChange={(v) => onChange?.({ menusTitle: v })} />
          </h3>
          <div className="mt-10 grid md:grid-cols-3">
            {menus.map((m: any, i: number) => {
              const Icon = icons[i % icons.length];
              return (
                <div key={i} className={`py-6 md:px-8 ${r(i + 1, "animate__fadeInUp")}`} style={{ borderLeft: i ? `1px solid ${bg}44` : "none", paddingLeft: i === 0 ? 0 : undefined }}>
                  <Icon size={26} />
                  <div className="mt-4 text-xl font-black uppercase"><Editable value={m.name} onChange={(v) => upd("menus", menus, i, "name", v)} /></div>
                  <div className="mt-1 text-2xl font-black"><Editable value={m.price} onChange={(v) => upd("menus", menus, i, "price", v)} /></div>
                  <p className="mt-2 text-sm opacity-90"><Editable value={m.text} onChange={(v) => upd("menus", menus, i, "text", v)} /></p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {gallery.map((g: string, i: number) => (
            <img
              key={i}
              src={g}
              alt="Gallery"
              className={`h-48 w-full rounded-3xl object-cover transition hover:scale-[1.02] md:h-64 ${i % 2 ? "md:mt-8" : ""} ${r(i, "animate__zoomIn")}`}
            />
          ))}
        </div>
      </div>

      {a && (
        <div className="animate__animated animate__fadeIn animate__faster fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.6)" }} onClick={() => setActive(null)}>
          <div
            className="animate__animated animate__zoomIn animate__faster relative w-full max-w-2xl overflow-hidden rounded-[2rem]"
            style={{ backgroundColor: bg, color: ink, border: `1px solid ${surface}` }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setActive(null)} className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full transition active:scale-95" style={{ backgroundColor: bg, color: ink }} aria-label="Close">
              <X size={18} />
            </button>
            <img src={a.image} alt={a.title} className="h-64 w-full object-cover" />
            <div className="p-7">
              <span className="text-xs font-black uppercase" style={{ color: accent }}>{a.tag}</span>
              <div className="mt-1 flex items-start justify-between gap-4">
                <h3 className="text-3xl font-black uppercase">{a.title}</h3>
                <span className="text-3xl font-black" style={{ color: accent }}>{a.price}</span>
              </div>
              <p className="mt-4 leading-relaxed" style={{ color: inkSecond }}>{a.details}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}