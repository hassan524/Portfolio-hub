// @ts-nocheck
import { ArrowUp } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";
import type { BlockComponentProps } from "@/components/blocks/types";

const mix = (c: string, p: number) => `color-mix(in srgb, ${c} ${p}%, transparent)`;

export function AIProduct3Footer({ theme }: BlockComponentProps<any>) {
  const bg = theme?.bg || "#140C12";
  const ink = theme?.ink || "#FFFFFF";
  const accent = theme?.accent || "#FF3B76";
  const line = mix(ink, 14);

  return (
    <footer className="relative w-full overflow-hidden transition-colors" style={{ backgroundColor: bg, color: ink, borderTop: `1px solid ${line}` }}>
      {/* oversized outlined wordmark */}
      <div className="relative select-none pt-16 px-5 sm:px-10">
        <Editable as="div" className="text-[22vw] sm:text-[17vw] font-black tracking-tighter leading-[0.85] whitespace-nowrap"
          style={{ color: "transparent", WebkitTextStroke: `1.5px ${mix(accent, 60)}` }}>
          ALEX RIVERA
        </Editable>
        <div className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none" style={{ background: `linear-gradient(to top, ${bg}, transparent)` }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-xs" style={{ color: mix(ink, 55) }}>
        <Editable as="p">{`© ${new Date().getFullYear()} Alex Rivera. All rights reserved.`}</Editable>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
          <Editable as="p">Designed and built with care</Editable>
        </div>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"
          className="group inline-flex items-center gap-3 cursor-pointer font-semibold" style={{ color: ink }}>
          <Editable className="inline">Back to top</Editable>
          <span className="h-10 w-10 rounded-full grid place-items-center border transition-all group-hover:-translate-y-1" style={{ borderColor: accent, color: accent }}>
            <ArrowUp className="h-4 w-4" />
          </span>
        </button>
      </div>
    </footer>
  );
}