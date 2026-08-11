import type { GuideLine } from "@/lib/functions/template";

export function GuideOverlay({ guides }: { guides: GuideLine[] }) {
  return (
    <>
      {guides.map((g, i) =>
        g.type === "v" ? (
          <div
            key={`v-${i}`}
            className="pointer-events-none absolute top-0 bottom-0 z-[999] w-[2px] bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.9)]"
            style={{ left: g.position }}
          />
        ) : (
          <div
            key={`h-${i}`}
            className="pointer-events-none absolute left-0 right-0 z-[999] h-[2px] bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.9)]"
            style={{ top: g.position }}
          />
        ),
      )}
    </>
  );
}
