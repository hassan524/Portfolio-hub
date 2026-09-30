// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import products from "./public/pantry-products.jpg";

export function Bakery1About({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#faf9f6";
  const bgSecond = theme?.["bg-second"] || "#ffffff";
  const ink = theme?.ink || "#1a1a1a";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "#dcdbd8";
  const accent = theme?.accent || "#e85d3d";

  return (
    <section id="about" className="scroll-mt-20 py-24 md:py-32" style={{ backgroundColor: bgSecond, color: ink }}>
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-16 md:grid-cols-2 md:items-center">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <img src={products} alt="Our products" className="h-full w-full object-cover" />
          </div>

          {/* Text */}
          <div>
            <Editable
              as="p"
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: accent }}
              value="02 — Our Story"
            />
            <Editable
              as="h2"
              className="mt-4 text-4xl leading-tight md:text-5xl"
              style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}
              value={props.aboutTitle || "Baking since 1987, one loaf at a time."}
              onChange={(aboutTitle) => onChange?.({ aboutTitle })}
            />
            <Editable
              as="p"
              className="mt-6 text-base leading-8 opacity-70"
              value={props.aboutText || "We started in a small village kitchen with a single sourdough recipe and a wood-fired oven. Over three decades, nothing has changed except our ambition to keep everything exactly the same — local flour, long ferments, and honest flavour."}
              onChange={(aboutText) => onChange?.({ aboutText })}
            />
            <div className="mt-10 grid grid-cols-2 gap-6 border-t pt-8" style={{ borderColor: surface }}>
              {[["40+", "Recipes"], ["100%", "Local Grain"], ["7 days", "A week, fresh"]].map(([stat, label]) => (
                <div key={label}>
                  <p className="text-3xl font-bold" style={{ color: accent }}>{stat}</p>
                  <p className="mt-1 text-sm opacity-60">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
