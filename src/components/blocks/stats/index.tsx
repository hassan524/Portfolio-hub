import type { BlockComponentProps } from "../types";
import type { StatsProps } from "@/types/builder.schema";

type Props = BlockComponentProps<StatsProps>;

export function StatsCounterRow({ props, theme }: Props) {
  const { ink, accent } = theme;
  return (
    <section className="px-8 md:px-16 py-14" style={{ borderTop: `1px solid ${ink}10` }}>
      {props.heading && <h2 className="font-display text-2xl mb-8" style={{ color: ink }}>{props.heading}</h2>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {props.items.map((s, i) => (
          <div key={i}>
            <div className="font-display text-4xl md:text-5xl" style={{ color: accent }}>
              {s.value}{s.suffix ?? ""}
            </div>
            <div className="mt-1 text-xs uppercase tracking-wide" style={{ color: `${ink}50` }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
