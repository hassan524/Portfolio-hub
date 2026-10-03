// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import products from "./public/bread-products.jpg";

export function Bakery2About({ props = {}, theme, onChange }: any) {
  const bg = theme?.["bg-second"] || "#f7f4f6";
  const ink = theme?.ink || "#242023";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "#ded7dc";
  const accent = theme?.accent || "#882b8b"; const fontHeading = theme?.fontHeading || "Fraunces"; const fontBody = theme?.fontBody || "Inter";

  const values = [
    { label: "Craft", desc: "Every detail executed with precision and intent." },
    { label: "Clarity", desc: "Ideas distilled to their essential form." },
    { label: "Collaboration", desc: "Built alongside the people we serve." },
  ];

  return (
    <section id="studio" className="scroll-mt-20 py-24 md:py-32" style={{ backgroundColor: bg, color: ink , fontFamily: fontBody }}>
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-16 md:grid-cols-2 md:items-center">
          {/* Text */}
          <div>
            <Editable as="p" className="text-xs font-bold uppercase tracking-widest" value="02 / Studio" />
            <Editable
              as="h2"
              className="mt-5 text-4xl font-bold uppercase leading-tight md:text-5xl"
              style={{ fontFamily: fontHeading }}
              value={props.aboutTitle || "Craft, clarity, and conviction."}
              onChange={(aboutTitle) => onChange?.({ aboutTitle })}
            />
            <Editable
              as="p"
              className="mt-6 text-base leading-8 opacity-65"
              value={props.aboutText || "We are an independent creative studio driven by the belief that design should earn its place — every mark, every word, every pixel."}
              onChange={(aboutText) => onChange?.({ aboutText })}
            />
            <div className="mt-10 space-y-6 border-t pt-8" style={{ borderColor: surface }}>
              {values.map(({ label, desc }) => (
                <div key={label} className="flex gap-6">
                  <p className="w-24 shrink-0 text-xs font-bold uppercase tracking-widest opacity-40">{label}</p>
                  <p className="text-sm leading-7 opacity-70">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="aspect-[4/5] overflow-hidden">
            <img src={products} alt="Studio work" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
