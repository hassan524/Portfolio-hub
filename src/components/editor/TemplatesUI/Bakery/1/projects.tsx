// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import hero from "./public/pantry-hero.jpg";
import products from "./public/pantry-products.jpg";

const DEFAULT_ITEMS = [
  { title: "Classic Sourdough", category: "Breads", image: "hero" },
  { title: "Almond Croissant", category: "Viennoiserie", image: "products" },
  { title: "Rye & Walnut Loaf", category: "Breads", image: "hero" },
  { title: "Seasonal Tart", category: "Patisserie", image: "products" },
];

export function Bakery1Projects({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#faf9f6";
  const ink = theme?.ink || "#1a1a1a";
  const surface = theme?.surface || "#dcdbd8";
  const accent = theme?.accent || "#e85d3d";
  const fontHeading = theme?.fontHeading || "Fraunces";
  const fontBody = theme?.fontBody || "Inter";
  const items = (props.items && props.items.length > 0) ? props.items : DEFAULT_ITEMS;

  return (
    <section id="work" className="scroll-mt-20 py-24 md:py-32" style={{ backgroundColor: bg, color: ink , fontFamily: fontBody }}>
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex items-end justify-between border-b pb-8" style={{ borderColor: surface }}>
          <div>
            <Editable as="p" className="text-xs font-bold uppercase tracking-widest" value="02 — Our Bakes" />
            <Editable
              as="h2"
              className="mt-3 text-4xl md:text-5xl"
              style={{ fontFamily: fontHeading }}
              value={props.projectsTitle || "Made fresh, every morning."}
              onChange={(projectsTitle) => onChange?.({ projectsTitle })}
            />
          </div>
          <a href="#contact" className="hidden text-sm font-semibold underline-offset-4 hover:underline md:block" style={{ color: accent }}>
            See full menu →
          </a>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item: any, i: number) => {
            const src = typeof item.image === "string" && item.image.startsWith("http") ? item.image : (i % 2 === 0 ? hero : products);
            return (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden" style={{ background: surface }}>
                  <img src={src} alt={item.title || `Item ${i + 1}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="mt-4">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-50">{item.category || "Bakery"}</p>
                  <Editable as="h3" className="mt-1 text-lg" style={{ fontFamily: fontHeading }} value={item.title || `Item ${i + 1}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
