// @ts-nocheck
import { Check } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Services({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const plans = props?.plans || [
    { name: "Product audit", price: "$2,400", note: "One week, fixed price", text: "A clear review of your product and a prioritised list of what to fix first.", features: ["Hour-long walkthrough call", "UX and conversion review", "Written report with next steps", "Recorded video summary"], featured: false },
    { name: "Build sprint", price: "$38,000", note: "Eight to ten weeks", text: "Design and build a first version of your product, ready for paying customers.", features: ["Product design and prototype", "Full-stack build in TypeScript", "Billing and onboarding set up", "Launch support and handover"], featured: true },
    { name: "Fractional partner", price: "$9,500 / month", note: "Three month minimum", text: "A senior product engineer embedded with your team, a few days each week.", features: ["Weekly planning and reviews", "Hands-on design and code", "Hiring and tooling advice", "Pause or stop any time"], featured: false },
  ];
  const setPlan = (i: number, patch: any) => onChange?.({ plans: plans.map((x: any, j: number) => (j === i ? { ...x, ...patch } : x)) });
  const go = (e: any) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <section id="services" className="px-6 py-24 lg:py-32" style={{ backgroundColor: bgSecond }}>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <Editable as="h2" value={props?.title || "Three ways to work together"} onChange={(v: string) => onChange?.({ title: v })} className="max-w-2xl font-['Bricolage_Grotesque'] text-4xl font-bold leading-tight tracking-tight sm:text-6xl" style={{ color: ink }} />
          <Editable as="p" value={props?.subtitle || "Every price is fixed or capped up front. You will never get a surprise invoice."} onChange={(v: string) => onChange?.({ subtitle: v })} className="max-w-sm text-lg" style={{ color: inkSecond }} />
        </div>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((p: any, i: number) => (
            <div key={i} className="flex min-w-0 flex-col rounded-[2rem] p-8 transition duration-300 hover:-translate-y-1" style={{ backgroundColor: p.featured ? accent : bg, color: p.featured ? bg : ink }}>
              <Editable as="h3" value={p.name} onChange={(v: string) => setPlan(i, { name: v })} className="font-['Bricolage_Grotesque'] text-2xl font-semibold" />
              <Editable as="p" value={p.text} onChange={(v: string) => setPlan(i, { text: v })} className="mt-3 min-h-[3.5rem] leading-relaxed opacity-80" />
              <div className="mt-6">
                <Editable as="p" value={p.price} onChange={(v: string) => setPlan(i, { price: v })} className="font-['Bricolage_Grotesque'] text-4xl font-bold" />
                <Editable as="p" value={p.note} onChange={(v: string) => setPlan(i, { note: v })} className="mt-1 text-sm opacity-70" />
              </div>
              <ul className="mt-8 flex-1 space-y-3 border-t pt-8" style={{ borderColor: p.featured ? bg : surface }}>
                {p.features.map((f: string, k: number) => (
                  <li key={k} className="flex items-start gap-3">
                    <Check size={18} className="mt-0.5 shrink-0" />
                    <Editable as="span" value={f} onChange={(v: string) => setPlan(i, { features: p.features.map((x: string, m: number) => (m === k ? v : x)) })} />
                  </li>
                ))}
              </ul>
              <a href="#contact" onClick={go} className="mt-8 rounded-full px-6 py-3.5 text-center font-semibold transition hover:scale-[1.02] active:scale-95" style={{ backgroundColor: p.featured ? bg : accent, color: p.featured ? ink : bg }}>
                <Editable as="span" value={props?.ctaLabel || "Ask about this"} onChange={(v: string) => onChange?.({ ctaLabel: v })} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
