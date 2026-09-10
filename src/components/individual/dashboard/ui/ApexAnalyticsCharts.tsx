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
      <div className="flex h-[280px] w-full animate-pulse items-center justify-center rounded-lg bg-muted/40">
        <span className="text-xs text-muted-foreground">Loading traffic…</span>
      </div>
    );
  }

  if (!seriesData.length || seriesData.every((v) => v === 0)) {
    return (
      <div className="flex h-[280px] w-full flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border">
        <span className="text-sm text-muted-foreground">No views yet in this range</span>
        <span className="text-xs text-subtle">Views will show up here once people visit</span>
      </div>
    );
  }

  const maxVal = Math.max(...seriesData);
  const maxIdx = seriesData.indexOf(maxVal);

  const options: ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      background: "transparent",
      fontFamily: "inherit",
      animations: { easing: "easeinout", speed: 400 },
    },
    colors: ["#10b981"],
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.03, stops: [0, 95, 100] },
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
      categories: dates,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: "#888888", fontSize: "11px" }, rotate: 0 },
      tickAmount: dates.length > 10 ? Math.floor(dates.length / 2) : undefined,
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
          x: dates[maxIdx],
          y: maxVal,
          marker: { size: 4, fillColor: "#10b981", strokeColor: "#fff", strokeWidth: 2 },
          label: {
            text: String(maxVal),
            borderWidth: 0,
            offsetY: -10,
            style: {
              color: "#10b981",
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
    <div className="w-full">
      <Chart options={options} series={[{ name: "Pageviews", data: seriesData }]} type="area" height={280} />
    </div>
  );
}