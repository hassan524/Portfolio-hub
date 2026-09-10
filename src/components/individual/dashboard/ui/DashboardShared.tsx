import { useState } from "react";
import { Sparkline, StatusChip } from "@/components/ui/app-chrome";
import { deployments, edits, viewSeries } from "@/lib/portfolio-data";

export const fmt = new Intl.NumberFormat("en-US");

export function RangeToggle({
  range,
  setRange,
}: {
  range: string;
  setRange: (r: string) => void;
}) {
  return (
    <div className="flex gap-1 rounded-lg bg-surface p-1 ring-1 ring-inset ring-border">
      {["24H", "7D", "30D", "12M"].map((r) => (
        <button
          key={r}
          onClick={() => setRange(r)}
          className={`numeric rounded-md px-2.5 py-1 text-[11px] font-semibold transition-all cursor-pointer ${
            range === r ? "bg-surface-raised text-foreground" : "text-subtle hover:text-foreground"
          }`}
        >
          {r}
        </button>
      ))}
    </div>
  );
}

export function MetricBand() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <div className="rounded-xl border border-border bg-surface p-4">
        <p className="text-xs font-medium text-muted-foreground">Total Views</p>
        <div className="mt-1.5 flex items-baseline justify-between">
          <p className="numeric text-2xl font-semibold text-foreground">124,892</p>
          <span className="text-[11px] font-medium text-emerald-500">+12.4%</span>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-surface p-4">
        <p className="text-xs font-medium text-muted-foreground">Deployment Status</p>
        <div className="mt-1.5 flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">Production Ready</p>
          <span className="size-2 rounded-full bg-emerald-500" />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-surface p-4">
        <p className="text-xs font-medium text-muted-foreground">Custom Domain</p>
        <div className="mt-1.5 flex items-center justify-between">
          <p className="text-sm font-semibold text-foreground">Active (SSL)</p>
          <span className="text-[11px] text-muted-foreground font-mono">HTTPS</span>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-surface p-4">
        <p className="text-xs font-medium text-muted-foreground">Last Deployed</p>
        <div className="mt-1.5 flex items-baseline justify-between">
          <p className="text-sm font-semibold text-foreground">2 mins ago</p>
          <span className="font-mono text-[10px] text-muted-foreground">main@3a9f1b</span>
        </div>
      </div>
    </div>
  );
}

export function BarRow({
  label,
  value,
  share,
  mono,
}: {
  label: string;
  value?: string;
  share: number;
  mono?: boolean;
}) {
  return (
    <div className="grid grid-cols-12 items-center gap-4 border-t border-border py-2.5">
      <span
        className={`col-span-6 flex items-center gap-2.5 text-sm text-foreground ${mono ? "font-mono text-xs" : ""}`}
      >
        <span className="size-3 shrink-0 rounded-sm bg-muted" />
        {label}
      </span>
      <span className="numeric col-span-3 text-right text-sm text-muted-foreground">{value}</span>
      <span className="col-span-3 flex items-center justify-end gap-2.5">
        <span className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
          <span className="block h-full bg-primary" style={{ width: `${share}%` }} />
        </span>
        <span className="numeric w-7 text-right text-[11px] text-muted-foreground">{share}%</span>
      </span>
    </div>
  );
}

export function DeployRow({ d }: { d: (typeof deployments)[number] }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-surface p-3.5 transition-colors">
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={`size-2 shrink-0 rounded-full ${
            d.state === "ready"
              ? "bg-emerald-500"
              : d.state === "building"
                ? "bg-amber-500"
                : "bg-destructive"
          }`}
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">{d.message}</p>
          <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
            {d.branch} @ {d.sha} · {d.when} · {d.by}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <StatusChip state={d.state} />
        <a
          href={`https://${d.url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded border border-border bg-background px-2 py-1 font-mono text-[10px] text-muted-foreground hover:text-foreground transition-colors md:block"
        >
          {d.url}
        </a>
      </div>
    </div>
  );
}

export function Timeline() {
  return (
    <div className="relative space-y-6 pl-5">
      <span className="absolute bottom-1 left-0 top-1 w-px bg-border" />
      {edits.map((e, i) => (
        <div key={e.when + e.what} className="relative">
          <span
            className={`absolute -left-[21px] top-1 size-2.5 rounded-full border-2 border-background ${
              i === 0 ? "bg-primary" : "bg-subtle"
            }`}
          />
          <p className="eyebrow mb-1">{e.when}</p>
          <p className="text-sm text-foreground">{e.what}</p>
          <p className="mt-0.5 font-mono text-[11px] text-subtle">
            {e.target} · {e.who}
          </p>
        </div>
      ))}
    </div>
  );
}

export function Row({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-12 items-center gap-8 py-7">
      <div className="col-span-12 md:col-span-5">
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        <p className="mt-1 text-[12px] text-muted-foreground">{desc}</p>
      </div>
      <div className="col-span-12 flex items-center justify-end gap-3 md:col-span-7">{children}</div>
    </div>
  );
}

export function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={`relative h-5 w-9 rounded-full transition-colors cursor-pointer ${on ? "bg-primary" : "bg-muted"}`}
    >
      <span
        className={`absolute top-0.5 size-4 rounded-full transition-all ${
          on ? "left-[18px] bg-primary-foreground" : "left-0.5 bg-subtle"
        }`}
      />
    </button>
  );
}
