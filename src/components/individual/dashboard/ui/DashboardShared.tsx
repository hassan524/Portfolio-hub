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
    <div className="col-span-12 flex flex-wrap items-center justify-between gap-8 bg-background p-8">
      <div className="flex items-baseline gap-7">
        <div>
          <p className="eyebrow mb-2">Total views</p>
          <p className="numeric text-4xl font-medium text-foreground">124,892</p>
        </div>
        <div className="h-10 w-40">
          <Sparkline data={viewSeries} className="size-full" />
        </div>
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
          +12.4%
        </span>
      </div>
      <div className="flex gap-10 text-right">
        <div>
          <p className="eyebrow mb-2">Unique</p>
          <p className="numeric text-xl font-medium text-foreground">61,204</p>
        </div>
        <div>
          <p className="eyebrow mb-2">Avg duration</p>
          <p className="numeric text-xl font-medium text-foreground">02:45</p>
        </div>
        <div>
          <p className="eyebrow mb-2">Bounce rate</p>
          <p className="numeric text-xl font-medium text-foreground">24.2%</p>
        </div>
        <div>
          <p className="eyebrow mb-2">Live now</p>
          <p className="numeric flex items-center justify-end gap-2 text-xl font-medium text-foreground">
            84
            <span className="size-1.5 rounded-full bg-primary glow-dot" />
          </p>
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
    <div className="group grid grid-cols-12 items-center gap-4 border-t border-border py-3">
      <span
        className={`col-span-6 flex items-center gap-2.5 text-sm text-foreground ${mono ? "font-mono text-[12px]" : ""}`}
      >
        <span className="size-4 shrink-0 rounded-sm bg-surface-raised" />
        {label}
      </span>
      <span className="numeric col-span-3 text-right text-sm text-muted-foreground">{value}</span>
      <span className="col-span-3 flex items-center justify-end gap-3">
        <span className="h-1 w-20 overflow-hidden rounded-full bg-muted">
          <span className="block h-full bg-primary" style={{ width: `${share}%` }} />
        </span>
        <span className="numeric w-8 text-right text-[11px] text-subtle">{share}%</span>
      </span>
    </div>
  );
}

export function DeployRow({ d }: { d: (typeof deployments)[number] }) {
  return (
    <div className="group flex items-center justify-between gap-6 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-border-strong">
      <div className="flex min-w-0 items-center gap-4">
        <span
          className={`size-2 shrink-0 rounded-full ${
            d.state === "ready"
              ? "bg-primary glow-dot"
              : d.state === "building"
                ? "animate-pulse bg-warning"
                : "bg-destructive"
          }`}
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-foreground">{d.message}</p>
          <p className="mt-0.5 font-mono text-[11px] text-subtle">
            {d.branch} @ {d.sha} · {d.when} · {d.by}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-4">
        <StatusChip state={d.state} />
        <a
          href={`https://${d.url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded bg-background px-2 py-1 font-mono text-[10px] text-subtle md:block underline decoration-primary/40 underline-offset-2 hover:text-primary transition-colors cursor-pointer"
        >
          {d.url}
        </a>
        <a
          href={`https://${d.url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-subtle opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer hover:text-primary"
        >
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
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
