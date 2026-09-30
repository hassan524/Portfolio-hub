// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import hero from "./public/bread-hero.jpg";
import products from "./public/bread-products.jpg";

const DEFAULT_ITEMS = [
  { title: "Sourdough Branding", category: "Identity" },
  { title: "Baker's Quarterly", category: "Print" },
  { title: "Grain & Co. Campaign", category: "Photography" },
  { title: "Studio Identity", category: "Brand" },
];

export function Bakery2Projects({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#ffffff";
  const ink = theme?.ink || "#242023";
  const surface = theme?.surface || "#ded7dc";
  const accent = theme?.accent || "#882b8b";
  const items = (props.items && props.items.length > 0) ? props.items : DEFAULT_ITEMS;

  return (
    <section id="work" className="scroll-mt-20 py-24 md:py-32" style={{ backgroundColor: bg, color: ink }}>
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex items-end justify-between border-b pb-8" style={{ borderColor: surface }}>
          <div>
            <Editable as="p" className="text-xs font-bold uppercase tracking-widest" value="02 / Selected Work" />
            <Editable
              as="h2"
              className="mt-3 text-4xl font-bold uppercase leading-tight md:text-5xl"
              style={{ fontFamily: '"Oswald", sans-serif' }}
              value={props.projectsTitle || "Work that speaks for itself."}
              onChange={(projectsTitle) => onChange?.({ projectsTitle })}
            />
          </div>
          <a href="#contact" className="hidden text-xs font-bold uppercase tracking-widest underline-offset-4 hover:underline md:block" style={{ color: accent }}>
            All projects →
          </a>
        </div>

        <div className="mt-12 grid gap-1 md:grid-cols-2">
          {items.map((item: any, i: number) => {
            const src = typeof item.image === "string" && item.image.startsWith("http") ? item.image : (i % 2 === 0 ? hero : products);
            return (
              <div key={i} className="group relative overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={src} alt={item.title || `Project ${i + 1}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6" style={{ backgroundColor: bg }}>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-40">{item.category || "Work"}</p>
                  <Editable
                    as="h3"
                    className="mt-1 text-xl font-bold uppercase"
                    style={{ fontFamily: '"Oswald", sans-serif' }}
                    value={item.title || `Project ${i + 1}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
