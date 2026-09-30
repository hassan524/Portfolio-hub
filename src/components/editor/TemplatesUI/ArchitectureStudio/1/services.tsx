// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { ArrowUpRight } from "lucide-react";

export function ArchitectureStudio1Services({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#0A0A0C";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#ffffff";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#3B82F6";

  const services = [
    {
      num: "01",
      title: "Architecture",
      desc: "Homes and spaces with an unmistakable sense of place.",
    },
    {
      num: "02",
      title: "Interior design",
      desc: "The details, materials and moments that make a space yours.",
    },
    {
      num: "03",
      title: "Creative direction",
      desc: "A complete vision, considered from every angle.",
    },
  ];

  return (
    <section
      id="services"
      className="px-6 md:px-14 lg:px-20 py-24 md:py-32 transition-colors w-full"
      style={{ backgroundColor: bg, color: ink, fontFamily: '"DM Sans", Arial, sans-serif' }}
    >
      <div className="max-w-6xl mx-auto mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span
            className="text-[10px] font-bold uppercase tracking-widest block mb-4"
            style={{ color: accent }}
          >
            <Editable value="WHAT WE DO" />
          </span>
          <Editable
            as="h2"
            className="text-4xl sm:text-5xl md:text-6xl font-medium leading-none tracking-tight font-serif"
            style={{ color: ink, fontFamily: '"Cormorant Garamond", Georgia, serif' }}
            value="Architecture & placemaking"
          />
        </div>
        <Editable
          as="p"
          className="text-xs md:text-sm max-w-xs leading-relaxed opacity-70"
          style={{ color: inkSecond }}
          value="From first conversation to the final built detail."
        />
      </div>

      <div
        className="max-w-6xl mx-auto border-t"
        style={{ borderColor: `${ink}1A` }}
      >
        {services.map((s) => (
          <div
            key={s.num}
            className="group grid grid-cols-[40px_1fr] md:grid-cols-[70px_1fr_1fr_24px] items-center gap-4 md:gap-6 py-7 md:py-8 border-b transition-all duration-300 hover:translate-x-2"
            style={{ borderColor: `${ink}1A` }}
          >
            <span
              className="text-xs font-bold uppercase tracking-wider opacity-60"
              style={{ color: accent }}
            >
              <Editable value={s.num} />
            </span>
            <Editable
              as="h3"
              className="text-2xl md:text-3xl font-medium font-serif"
              style={{ color: ink, fontFamily: '"Cormorant Garamond", Georgia, serif' }}
              value={s.title}
            />
            <Editable
              className="col-span-2 md:col-span-1 text-xs md:text-sm leading-relaxed opacity-75"
              style={{ color: inkSecond }}
              value={s.desc}
            />
            <ArrowUpRight
              size={20}
              className="hidden md:block opacity-60 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-300 shrink-0"
              style={{ color: accent }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export const Services = ArchitectureStudio1Services;
export default ArchitectureStudio1Services;
