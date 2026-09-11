import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface ViewsChartProps {
  dates?: string[];
  seriesData?: number[];
  loading?: boolean;
}

export function ViewsAreaChart({ dates = [], seriesData = [], loading }: ViewsChartProps) {
  if (loading) {
    return (
      <div className="flex h-[280px] w-full animate-pulse items-center justify-center rounded-xl bg-card border border-border/60">
        <span className="text-xs text-muted-foreground">Loading traffic analytics…</span>
      </div>
    );
  }

  const isDemo = !seriesData.length || seriesData.every((v) => v === 0);
  const activeDates = isDemo
    ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    : dates;
  const activeSeries = isDemo
    ? [14, 28, 42, 38, 65, 84, 98]
    : seriesData;

  const maxVal = Math.max(...activeSeries);
  const maxIdx = activeSeries.indexOf(maxVal);

  const options: ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      background: "transparent",
      fontFamily: "inherit",
      animations: { easing: "easeinout", speed: 400 },
    },
    colors: ["#6366f1"],
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.02, stops: [0, 95, 100] },
    },
    stroke: { curve: "smooth", width: 2.5 },
    dataLabels: { enabled: false },
    markers: { size: 0, hover: { size: 5 } },
    grid: {
      borderColor: "rgba(120, 120, 120, 0.15)",
      strokeDashArray: 3,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      padding: { top: 20 },
    },
    xaxis: {
      categories: activeDates,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: "#888888", fontSize: "11px" }, rotate: 0 },
      tickAmount: activeDates.length > 10 ? Math.floor(activeDates.length / 2) : undefined,
    },
    yaxis: {
      labels: {
        style: { colors: "#888888", fontSize: "11px" },
        formatter: (val) => `${val >= 1000 ? (val / 1000).toFixed(1) + "k" : val}`,
      },
    },
    tooltip: {
      theme: "dark",
      y: { formatter: (val) => `${val.toLocaleString()} views` },
    },
    annotations: {
      points: [
        {
          x: activeDates[maxIdx],
          y: maxVal,
          marker: { size: 4, fillColor: "#6366f1", strokeColor: "#fff", strokeWidth: 2 },
          label: {
            text: String(maxVal),
            borderWidth: 0,
            offsetY: -10,
            style: {
              color: "#6366f1",
              background: "transparent",
              fontSize: "11px",
              fontWeight: 600,
            },
          },
        },
      ],
    },
  };

  return (
    <div className="w-full space-y-2">
      {isDemo && (
        <div className="text-[11px] text-muted-foreground flex items-center gap-1.5 px-1">
          <span className="size-1.5 rounded-full bg-indigo-400" />
          <span>Demo preview trajectory (live views recorded automatically upon visit)</span>
        </div>
      )}
      <Chart options={options} series={[{ name: "Pageviews", data: activeSeries }]} type="area" height={260} />
    </div>
  );
}