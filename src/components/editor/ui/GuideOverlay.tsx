import type { GuideLine } from "@/lib/functions/template";

export function GuideOverlay({ guides }: { guides: GuideLine[] }) {
  return (
    <>
      {guides.map((g, i) => {
        const lineClass =
          g.emphasis === "center" ? "bg-sky-500" : "bg-sky-400/95";

        return g.type === "v" ? (
          <div
            key={`v-${i}`}
            className={`pointer-events-none absolute top-0 bottom-0 z-[999] w-[2px] ${lineClass}`}
            style={{ left: g.position }}
          />
        ) : (
          <div
            key={`h-${i}`}
            className={`pointer-events-none absolute left-0 right-0 z-[999] h-[2px] ${lineClass}`}
            style={{ top: g.position }}
          />
        );
      })}
    </>
  );
}
