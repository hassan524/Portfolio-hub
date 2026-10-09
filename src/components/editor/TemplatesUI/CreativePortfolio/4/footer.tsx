// @ts-nocheck
import { ArrowUp } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function CreativePortfolio4Footer({ props = {}, theme, onChange }: any) {
  const bg = theme?.bg || "#050505";
  const bgSecond = theme?.["bg-second"] || "#111111";
  const ink = theme?.ink || "#F5F1EA";
  const inkSecond = theme?.["ink-second"] || "#9C978F";
  const surface = theme?.surface || "rgba(245, 241, 234, 0.16)";
  const accent = theme?.accent || "#FF5C35";

  return (
    <footer
      className="border-t px-5 py-8 sm:px-8 lg:px-14 font-mono text-[11px] uppercase tracking-[0.14em]"
      style={{
        backgroundColor: bgSecond,
        color: ink,
        borderColor: surface,
      }}
    >
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="font-bold tracking-widest">
            <Editable
              value={props?.brand || "NOX / MOVING IMAGE STUDIO"}
              onChange={(v) => onChange?.({ brand: v })}
            />
          </span>
          <span className="block sm:inline sm:ml-4 text-[10px]" style={{ color: inkSecond }}>
            <Editable
              value={props?.copyright || "© 2026 NOX. All rights reserved."}
              onChange={(v) => onChange?.({ copyright: v })}
            />
          </span>
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 transition-colors hover:text-[#FF5C35]"
          style={{ color: accent }}
        >
          <span>
            <Editable
              value={props?.backToTop || "Back to top"}
              onChange={(v) => onChange?.({ backToTop: v })}
            />
          </span>
          <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  );
}
