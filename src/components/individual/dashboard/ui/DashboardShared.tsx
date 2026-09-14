import { StatusChip } from "@/components/ui/app-chrome";
import { deployments, edits } from "@/lib/portfolio-data";

export const fmt = new Intl.NumberFormat("en-US");

export function RangeToggle({
  range,
  setRange,
}: {
  range: string;
  setRange: (r: string) => void;
}) {
  return (
    <div className="flex gap-1 rounded-md bg-white/[0.03] p-1 border border-white/[0.07]">
      {["24H", "7D", "30D", "12M"].map((r) => (
        <button
          key={r}
          onClick={() => setRange(r)}
          className={`numeric rounded-md px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${range === r ? "bg-white text-black" : "text-white/30 hover:text-white/60"
            }`}
        >
          {r}
        </button>
      ))}
    </div>
  );
}

export function MetricBand({
  totalViews,
  isDeployed,
  liveUrl,
  updatedAt,
}: {
  totalViews: number;
  isDeployed: boolean;
  liveUrl: string | null;
  updatedAt: string;
}) {
  const sslActive = isDeployed && !!liveUrl && liveUrl.startsWith("https://");

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 sm:grid-cols-4">
      <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-4 min-w-0">
        <p className="text-xs text-white/30">Total Views</p>
        <p className="mt-2 numeric text-xl sm:text-2xl font-semibold text-white">
          {fmt.format(totalViews)}
        </p>
      </div>

      <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-4 min-w-0">
        <p className="text-xs text-white/30">Site Status</p>
        <div className="mt-2 flex items-center justify-between gap-1">
          <p className="text-sm font-medium text-white/70">
            {isDeployed ? "Live & Active" : "Not Deployed"}
          </p>
          <span className={`size-1.5 rounded-full ${isDeployed ? "bg-[#86efac]" : "bg-white/20"}`} />
        </div>
      </div>

      <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-4 min-w-0">
        <p className="text-xs text-white/30">SSL Security</p>
        <div className="mt-2 flex items-center justify-between gap-1">
          <p className="text-sm font-medium text-white/70">
            {sslActive ? "Protected" : "Not Active"}
          </p>
          <span className="text-[10px] text-white/25 font-mono">
            {sslActive ? "HTTPS" : "—"}
          </span>
        </div>
      </div>

      <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-4 min-w-0">
        <p className="text-xs text-white/30">Last Updated</p>
        <p className="mt-2 text-sm font-medium text-white/70">
          {new Date(updatedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
        </p>
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
    <div className="grid grid-cols-12 items-center gap-4 border-t border-white/[0.05] py-3">
      <span
        className={`col-span-6 text-sm text-white/60 ${mono ? "font-mono text-xs" : ""}`}
      >
        {label}
      </span>
      <span className="numeric col-span-3 text-right text-sm text-white/30">{value}</span>
      <span className="col-span-3 flex items-center justify-end gap-2.5">
        <span className="h-1 w-16 overflow-hidden rounded-sm bg-white/[0.06]">
          <span className="block h-full bg-white/20" style={{ width: `${share}%` }} />
        </span>
        <span className="numeric w-7 text-right text-xs text-white/25">{share}%</span>
      </span>
    </div>
  );
}

export function DeployRow({ d }: { d: (typeof deployments)[number] }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border border-white/[0.07] bg-white/[0.02] p-3.5">
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={`size-2 shrink-0 rounded-full ${d.state === "ready"
            ? "bg-[#86efac]"
            : d.state === "building"
              ? "bg-amber-300"
              : "bg-red-400"
            }`}
        />
        <div className="min-w-0">
          <p className="truncate text-sm text-white/70">{d.message}</p>
          <p className="mt-0.5 font-mono text-xs text-white/25">
            {d.branch} @ {d.sha} · {d.when} · {d.by}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <StatusChip isDeployed={d.state === "ready"} />
        <a
          href={`https://${d.url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-md border border-white/[0.06] px-2 py-1 font-mono text-[10px] text-white/25 hover:text-white/50 transition-colors md:block"
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
      <span className="absolute bottom-1 left-0 top-1 w-px bg-white/[0.06]" />
      {edits.map((e, i) => (
        <div key={e.when + e.what} className="relative">
          <span
            className={`absolute -left-[21px] top-1 size-2.5 rounded-full border-2 border-black ${i === 0 ? "bg-white" : "bg-white/20"
              }`}
          />
          <p className="text-xs text-white/30 mb-1">{e.when}</p>
          <p className="text-sm text-white/70">{e.what}</p>
          <p className="mt-0.5 font-mono text-xs text-white/20">
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
        <h3 className="text-sm font-medium text-white/80">{title}</h3>
        <p className="mt-1 text-xs text-white/30">{desc}</p>
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
      className={`relative h-5 w-9 rounded-full transition-colors cursor-pointer ${on ? "bg-[#86efac]" : "bg-white/10"}`}
    >
      <span
        className={`absolute top-0.5 size-4 rounded-full transition-all ${on ? "left-[18px] bg-black" : "left-0.5 bg-white/30"
          }`}
      />
    </button>
  );
}

export { ShareModal } from "./ShareModal";
export type { ShareModalProps } from "./ShareModal";
