// @ts-nocheck
import { Editable } from "@/components/editor/ui/Editable";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import heroImage from "./public/sagent-hero.png";

export function ArchitectureStudio1Hero({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";
  const fontHeading = theme?.fontHeading || "Cormorant Garamond";
  const fontBody = theme?.fontBody || "DM Sans";

    return (
        <section
            id="top"
            className="relative flex flex-col justify-center w-full overflow-hidden transition-colors px-6 md:px-14 lg:px-20 py-28 md:py-36 lg:py-44"
            style={{
                backgroundColor: bg,
                color: ink,
                fontFamily: fontBody,
            }}
        >
            <div className="absolute inset-0 z-0">
                <img
                    src={heroImage}
                    alt="Illustrated European city architecture"
                    className="w-full h-full object-cover object-[center_58%]"
                />
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `linear-gradient(90deg, ${bg} 0%, ${bg}E6 27%, transparent 70%)`,
                    }}
                />
            </div>

            <div className="relative z-10 w-full max-w-[1440px] mx-auto">
                <div className="flex items-center gap-3 mb-4 text-[10px] font-bold uppercase tracking-wider">
                    <span className="w-6 h-[1px]" style={{ backgroundColor: accent }} />
                    <Editable value="PROPERTY, REIMAGINED" />
                </div>

                <Editable
                    as="h1"
                    className="text-[54px] sm:text-[70px] md:text-[86px] lg:text-[104px] font-medium leading-[0.86] max-w-3xl mb-5 tracking-tight font-serif"
                    style={{ color: ink, fontFamily: fontHeading }}
                    value={props?.headline || "Places with a point of view."}
                    onChange={(v) => onChange?.({ headline: v })}
                />

                <Editable
                    as="p"
                    className="max-w-[400px] text-[15px] leading-[1.75] mb-7 opacity-80"
                    style={{ color: inkSecond }}
                    value={props?.subheadline || "We imagine, design and deliver places that become part of the city’s story."}
                    onChange={(v) => onChange?.({ subheadline: v })}
                />

                <div className="flex flex-wrap items-center gap-6">
                    <a
                        href="#projects"
                        className="inline-flex items-center gap-2 rounded-none h-10 px-5 text-[10px] font-bold tracking-wider uppercase shadow-none cursor-pointer hover:-translate-y-0.5 transition-transform"
                        style={{ backgroundColor: accent, color: "#ffffff" }}
                    >
                        <Editable value="EXPLORE OUR WORK" />
                        <ArrowUpRight size={16} />
                    </a>

                    <a
                        href="#about"
                        className="inline-flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-wider transition-opacity hover:opacity-70"
                        style={{ color: ink }}
                    >
                        <Editable value="THE STUDIO" />
                        <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </section>
    );
}

export const Hero = ArchitectureStudio1Hero;
export default ArchitectureStudio1Hero;