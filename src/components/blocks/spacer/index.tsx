import type { SpacerProps } from "@/types/builder.schema";
import type { BlockComponentProps } from "../types";

export function SpacerBlock({ props, theme }: BlockComponentProps<SpacerProps>) {
  const bg = props.backgroundColor || theme.bg;
  const bgImage = (props as Record<string, unknown>).backgroundImage as string | undefined;
  const bgSize = (props as Record<string, unknown>).backgroundSize as string | undefined;
  const bgPosition = (props as Record<string, unknown>).backgroundPosition as string | undefined;
  const bgRepeat = (props as Record<string, unknown>).backgroundRepeat as string | undefined;
  const isBlended = Boolean((props as Record<string, unknown>).isBlended);

  return (
    <section
      className={`w-full relative flex items-center justify-center p-8 transition-all min-h-[140px] ${isBlended ? "" : "border border-dashed border-border/40 rounded-lg"
        }`}
      style={{
        backgroundColor: bg,
        backgroundImage: bgImage && bgImage !== "none" ? bgImage : undefined,
        backgroundSize: bgSize,
        backgroundPosition: bgPosition,
        backgroundRepeat: bgRepeat,
        transition: "none",
        animation: "none",
      }}
    >
      <div className="text-center select-none py-4 opacity-70 hover:opacity-100 transition-opacity">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft/70">
          Spacer Block
        </p>
        <p className="text-[11px] text-ink-soft/50 mt-1">
          {isBlended ? "Blended seamlessly with neighboring blocks" : "Click to edit block properties"}
        </p>
      </div>
    </section>
  );
}
