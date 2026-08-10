import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { BarChart3 } from "lucide-react";

interface TrafficChartProps {
  isDemo: boolean;
  data: { name: string; views: number; clicks: number }[];
}

export function TrafficChart({ isDemo, data }: TrafficChartProps) {
  if (!isDemo) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center text-ink-soft border border-dashed border-border rounded-2xl bg-surface/35 mx-4">
        <BarChart3 className="h-10 w-10 mb-2 stroke-1 text-ink-soft/50" />
        <p className="text-sm font-semibold text-ink">No data yet</p>
        <p className="text-xs text-ink-soft mt-0.5">
          Publish your site to start collecting traffic.
        </p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="fillViews" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.72 0.18 40)" stopOpacity={0.25} />
            <stop offset="100%" stopColor="oklch(0.72 0.18 40)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="fillClicks" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.55 0.18 260)" stopOpacity={0.2} />
            <stop offset="100%" stopColor="oklch(0.55 0.18 260)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          horizontal={true}
          vertical={false}
          strokeDasharray="3 3"
          stroke="oklch(1 0 0 / 0.06)"
        />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: "var(--color-ink-soft)" }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: "var(--color-ink-soft)" }}
        />
        <Tooltip
          contentStyle={{
            background: "var(--color-surface-elevated)",
            border: "1px solid var(--color-border)",
            borderRadius: "12px",
            fontSize: "12px",
            boxShadow: "var(--shadow-lift)",
          }}
        />
        <Area
          type="monotone"
          dataKey="views"
          name="Views"
          stroke="oklch(0.72 0.18 40)"
          strokeWidth={2.5}
          fill="url(#fillViews)"
          dot={false}
          activeDot={{ r: 5, fill: "oklch(0.72 0.18 40)", strokeWidth: 0 }}
        />
        <Area
          type="monotone"
          dataKey="clicks"
          name="Clicks"
          stroke="oklch(0.55 0.18 260)"
          strokeWidth={2.5}
          fill="url(#fillClicks)"
          dot={false}
          activeDot={{ r: 5, fill: "oklch(0.55 0.18 260)", strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
