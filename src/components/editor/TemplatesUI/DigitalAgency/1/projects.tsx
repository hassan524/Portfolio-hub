// @ts-nocheck
import { useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

const U = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=80`;

export function DigitalAgency1Projects({ props = {}, theme, onChange }: any) {
  const bg = theme?.["bg-second"] || "#FFFFFF";
  const ink = theme?.ink || "#111827";
  const ink2 = theme?.["ink-second"] || "#5B6472";
  const accent = theme?.accent || "#87D53C";
  const surface = theme?.surface || "#FFFFFF";
  const projects = props.projects || [
    { title: "Citrus & Clay fruit system", client: "Kinfolk Organics", category: "3D", result: "3.4x checkout conversion", year: "2026", desc: "48 custom clay-rendered assets for packaging, web and social.", tags: ["Cinema 4D", "Packaging"], image: U("photo-1550684848-fac1c5b4e853") },
    { title: "Bubble finance onboarding", client: "NeoSphere", category: "Web", result: "840K mobile activations", year: "2026", desc: "Interactive 3D coins and wallets that turned sign-up into a game.", tags: ["Three.js", "App"], image: U("photo-1618005182384-a83a8bd57fbe") },
    { title: "Zenith visual identity", client: "Zenith Hardware", category: "Branding", result: "Awwwards Site of the Day", year: "2025", desc: "Brand system, 3D guidelines and an animated store microsite.", tags: ["Identity", "Web"], image: U("photo-1600585154340-be6161a56a0c") },
    { title: "Pulse fitness app", client: "Pulse", category: "UI", result: "4.9 App Store rating", year: "2025", desc: "A friendly interface and illustration set for a workout tracker.", tags: ["UI", "Illustration"], image: U("photo-1558655146-9f40138edfeb") },
  ];
  const cats = ["All", ...Array.from(new Set(projects.map((p: any) => p.category)))];
  const [cat, setCat] = useState("All");
  const list = useMemo(() => projects.filter((p: any) => cat === "All" || p.category === cat), [cat, projects]);
  const [ref, api] = useEmblaCarousel({ align: "start", dragFree: false });
  const [sel, setSel] = useState(0);
  useEffect(() => { api?.reInit(); api?.scrollTo(0); setSel(0); }, [cat, api]);
  useEffect(() => { const f = () => setSel(api.selectedScrollSnap()); api?.on("select", f); return () => api?.off("select", f); }, [api]);
  const nb = "w-11 h-11 rounded-full border-2 flex items-center justify-center cursor-pointer transition-transform hover:-translate-y-0.5";

  return (
    <section id="projects" className="py-20 sm:py-28 overflow-hidden" style={{ background: bg, color: ink }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <h2 className="font-black tracking-tighter leading-none text-[clamp(2rem,6vw,4.5rem)]">
            <Editable value={props.projectsTitle || "Selected work"} onChange={(v) => onChange?.({ projectsTitle: v })} />
          </h2>
          <div className="flex flex-wrap gap-2">
            {cats.map((c: string) => (
              <button key={c} type="button" onClick={() => setCat(c)} className="px-4 py-2 rounded-full text-xs sm:text-sm font-bold border-2 cursor-pointer" style={{ background: cat === c ? ink : "transparent", color: cat === c ? bg : ink, borderColor: ink }}>{c}</button>
            ))}
          </div>
        </div>
        <div ref={ref} className="overflow-visible -mx-1 px-1 pb-3">
          <div className="flex gap-4 sm:gap-6">
            {list.map((p: any) => (
              <article key={p.title} className="group flex-[0_0_88%] sm:flex-[0_0_60%] lg:flex-[0_0_42%] min-w-0 rounded-3xl border-2 overflow-hidden flex flex-col" style={{ background: surface, borderColor: ink, boxShadow: `5px 5px 0 ${ink}` }}>
                <div className="relative aspect-[4/3] overflow-hidden border-b-2" style={{ borderColor: ink }}>
                  <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full border-2 text-xs font-black" style={{ background: accent, borderColor: ink }}>{p.category}</span>
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full border-2 text-xs font-bold" style={{ background: surface, borderColor: ink }}>{p.year}</span>
                </div>
                <div className="p-5 sm:p-6 flex flex-col gap-3 flex-1">
                  <p className="text-xs font-bold" style={{ color: ink2 }}>{p.client}</p>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">{p.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: ink2 }}>{p.desc}</p>
                  <div className="mt-auto pt-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">{p.tags?.map((t: string) => <span key={t} className="px-2.5 py-0.5 rounded-full border text-[11px] font-semibold" style={{ borderColor: ink }}>{t}</span>)}</div>
                    <span className="text-xs font-black">{p.result}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between mt-8">
          <span className="font-black text-lg">{String(Math.min(sel + 1, list.length)).padStart(2, "0")} / {String(list.length).padStart(2, "0")}</span>
          <div className="flex gap-3">
            <button type="button" aria-label="Previous project" onClick={() => api?.scrollPrev()} className={nb} style={{ borderColor: ink }}><ArrowLeft size={18} /></button>
            <button type="button" aria-label="Next project" onClick={() => api?.scrollNext()} className={nb} style={{ background: accent, borderColor: ink }}><ArrowRight size={18} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
export default DigitalAgency1Projects;