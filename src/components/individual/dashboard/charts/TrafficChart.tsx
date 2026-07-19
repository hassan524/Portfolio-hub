import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid
} from "recharts";
import { BarChart3 } from "lucide-react";

interface TrafficChartProps {
  isDemo: boolean;
  data: any[];
}

export function TrafficChart({ isDemo, data }: TrafficChartProps) {
  if (!isDemo) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center text-ink-soft border border-dashed border-border rounded-2xl bg-surface/35">
        <BarChart3 className="h-10 w-10 mb-2 stroke-1 text-ink-soft/75" />
        <p className="text-sm font-semibold text-ink">No analytics data recorded yet</p>
        <p className="text-xs text-ink-soft mt-0.5">Publish your site and share the link to collect traffic.</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.72 0.18 40)" stopOpacity={1} />
            <stop offset="100%" stopColor="oklch(0.72 0.18 40)" stopOpacity={0.75} />
          </linearGradient>
          <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.55 0.18 260)" stopOpacity={1} />
            <stop offset="100%" stopColor="oklch(0.55 0.18 260)" stopOpacity={0.75} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.9 0.008 85 / 0.4)" />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--color-ink-soft)" }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--color-ink-soft)" }} />
        <Tooltip
          cursor={{ fill: "oklch(0.9 0.008 85 / 0.15)", stroke: "oklch(0.9 0.008 85 / 0.15)", strokeWidth: 2 }}
          contentStyle={{
            background: "var(--color-surface-elevated)",
            border: "1px solid var(--color-border)",
            borderRadius: "16px",
            fontSize: "12px",
            boxShadow: "var(--shadow-lift)",
          }}
        />
        <Line type="monotone" dataKey="views" name="Page Views" stroke="oklch(0.72 0.18 40)" strokeWidth={3} dot={{ r: 4, fill: "oklch(0.72 0.18 40)", strokeWidth: 0 }} activeDot={{ r: 6 }} />
        <Line type="monotone" dataKey="clicks" name="Link Clicks" stroke="oklch(0.55 0.18 260)" strokeWidth={3} dot={{ r: 4, fill: "oklch(0.55 0.18 260)", strokeWidth: 0 }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
