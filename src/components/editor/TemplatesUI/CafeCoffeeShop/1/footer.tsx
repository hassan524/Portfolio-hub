import { ArrowUp, Coffee } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { Editable } from "@/components/editor/ui/Editable";
import type { Theme } from "@/types/builder.schema";

interface CafeFooterProps {
  props?: {
    brand?: string;
    summary?: string;
    copyright?: string;
    [key: string]: unknown;
  };
  theme?: Theme;
  onChange?: (val: Record<string, unknown>) => void;
}

export function Footer({ props = {}, theme }: CafeFooterProps) {
  const bg = theme?.bg || "#24140d";
  const bgSecond = theme?.["bg-second"] || bg;
  const ink = theme?.ink || "#fff9f0";
  const inkSecond = theme?.["ink-second"] || ink;
  const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
  const accent = theme?.accent || "#e1a66b";
  const fontBody = theme?.fontBody || "Inter";

  return (
    <footer
      className="px-5 pb-6 pt-16 sm:px-10 lg:px-16"
      style={{ backgroundColor: bg, color: ink, fontFamily: fontBody }}
    >
      <div className="mx-auto max-w-7xl">
        <div
          className="flex flex-col justify-between gap-10 border-b pb-14 sm:flex-row"
          style={{ borderColor: surface }}
        >
          <div>
            <div className="flex items-center gap-2">
              <span
                className="grid h-9 w-9 place-items-center rounded-full"
                style={{ backgroundColor: accent, color: bg }}
              >
                <Coffee size={17} />
              </span>

              <span className="font-fraunces text-xl">
                <Editable value={props?.brand || "STC Coffee"} />
              </span>
            </div>

            <p className="mt-5 max-w-xs text-sm leading-6" style={{ color: `${ink}88` }}>
              <Editable
                value={
                  props?.summary ||
                  "Coffee for the curious, the caring, and the beautifully unhurried."
                }
              />
            </p>
          </div>

          <div className="flex gap-12 text-xs uppercase tracking-widest">
            <div className="space-y-4">
              <a className="block transition-opacity hover:opacity-60" href="#about">
                <Editable value="Story" />
              </a>
              <a className="block transition-opacity hover:opacity-60" href="#projects">
                <Editable value="Menu" />
              </a>
            </div>

            <div className="space-y-4">
              <a className="block transition-opacity hover:opacity-60" href="#testimonials">
                <Editable value="Journal" />
              </a>
              <a className="block transition-opacity hover:opacity-60" href="#contact">
                <Editable value="Visit" />
              </a>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col justify-between gap-4 pt-6 text-[10px] uppercase tracking-widest sm:flex-row"
          style={{ color: `${inkSecond}77` }}
        >
          <span>
            <Editable value={props?.copyright || "© 2024 STC Coffee. Made for slow mornings."} />
          </span>

          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2">
              <i className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
              <Editable value="Open today · 6:30 am" />
            </span>

            <FaInstagram size={15} />

            <a
              href="#home"
              className="grid h-8 w-8 place-items-center rounded-full transition hover:scale-[1.02]"
              style={{ backgroundColor: surface, color: ink }}
            >
              <ArrowUp size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
