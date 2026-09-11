import { useState } from "react";
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
    <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
      <div className="rounded-2xl border border-border/80 bg-card p-3.5 sm:p-4 shadow-soft min-w-0">
        <p className="text-xs font-medium text-muted-foreground truncate">Total Views</p>
        <div className="mt-1 flex items-baseline justify-between gap-1">
          <p className="numeric text-xl sm:text-2xl font-bold tracking-tight text-foreground">124,892</p>
          <span className="text-[10px] sm:text-[11px] font-semibold text-indigo-400 shrink-0">+12.4%</span>
        </div>
      </div>

      <div className="rounded-2xl border border-border/80 bg-card p-3.5 sm:p-4 shadow-soft min-w-0">
        <p className="text-xs font-medium text-muted-foreground truncate">Site Status</p>
        <div className="mt-1.5 flex items-center justify-between gap-1">
          <p className="text-xs sm:text-sm font-semibold text-foreground truncate">Live & Active</p>
          <span className="size-2 rounded-full bg-emerald-400 shrink-0" />
        </div>
      </div>

      <div className="rounded-2xl border border-border/80 bg-card p-3.5 sm:p-4 shadow-soft min-w-0">
        <p className="text-xs font-medium text-muted-foreground truncate">SSL Security</p>
        <div className="mt-1.5 flex items-center justify-between gap-1">
          <p className="text-xs sm:text-sm font-semibold text-foreground truncate">Protected</p>
          <span className="text-[9px] sm:text-[10px] text-muted-foreground font-mono bg-background border border-border/60 px-1.5 py-0.5 rounded shrink-0">HTTPS</span>
        </div>
      </div>

      <div className="rounded-2xl border border-border/80 bg-card p-3.5 sm:p-4 shadow-soft min-w-0">
        <p className="text-xs font-medium text-muted-foreground truncate">Last Updated</p>
        <div className="mt-1.5 flex items-baseline justify-between gap-1">
          <p className="text-xs sm:text-sm font-semibold text-foreground truncate">2 mins ago</p>
          <span className="font-mono text-[9px] sm:text-[10px] text-muted-foreground truncate hidden xs:inline">main</span>
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
        <StatusChip isDeployed={d.state === "ready"} />
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

export function ShareModal({
  isOpen,
  onClose,
  title,
  url,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
}) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const embedCode = `<iframe src="${url}" width="100%" height="700px" frameborder="0" allowfullscreen></iframe>`;

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(`Check out my developer portfolio: ${title}`);

  const shareLinks = [
    {
      name: "Twitter / X",
      icon: "𝕏",
      color: "bg-black text-white hover:bg-neutral-800",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: "LinkedIn",
      icon: "in",
      color: "bg-[#0A66C2] text-white hover:bg-[#084e96]",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "WhatsApp",
      icon: "💬",
      color: "bg-[#25D366] text-white hover:bg-[#1da851]",
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      name: "Email",
      icon: "✉️",
      color: "bg-neutral-700 text-white hover:bg-neutral-600",
      href: `mailto:?subject=${encodedTitle}&body=Here%20is%20my%20live%20portfolio%3A%20${encodedUrl}`,
    },
  ];

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Check out my portfolio site: ${title}`,
          url,
        });
      } catch {
        // user cancelled
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in-50">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border/80 bg-surface/95 p-6 sm:p-8 shadow-lift space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors cursor-pointer"
        >
          ✕
        </button>

        <div className="space-y-1.5 pr-8">
          <div className="flex items-center gap-2">
            <span className="flex size-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Share Live Website</span>
          </div>
          <h3 className="text-xl font-bold text-foreground">
            Share {title}
          </h3>
          <p className="text-xs text-muted-foreground">
            Distribute your live portfolio link to recruiter contacts, social media, or embed on your custom domain.
          </p>
        </div>

        {/* Link Input Section */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground uppercase tracking-wider">Direct Live URL</label>
          <div className="flex items-center gap-2 rounded-2xl border border-border/80 bg-background p-2">
            <input
              type="text"
              readOnly
              value={url}
              className="flex-1 bg-transparent px-2 font-mono text-xs text-foreground outline-none truncate"
            />
            <button
              onClick={handleCopyLink}
              className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:opacity-95 transition-all cursor-pointer shrink-0"
            >
              {copiedLink ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>

        {/* Social Sharing Grid */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-foreground uppercase tracking-wider">Quick Share</label>
            {typeof navigator !== "undefined" && "share" in navigator && (
              <button
                onClick={handleNativeShare}
                className="text-xs font-medium text-primary hover:underline cursor-pointer"
              >
                Native Share Options
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {shareLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-bold transition-all shadow-sm cursor-pointer ${s.color}`}
              >
                <span>{s.icon}</span>
                <span>{s.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Embed Snippet Code */}
        <div className="space-y-2 pt-2 border-t border-border/50">
          <label className="text-xs font-bold text-foreground uppercase tracking-wider">Embed Code (HTML iframe)</label>
          <div className="flex items-center gap-2 rounded-2xl border border-border/80 bg-background p-2">
            <input
              type="text"
              readOnly
              value={embedCode}
              className="flex-1 bg-transparent px-2 font-mono text-[11px] text-muted-foreground outline-none truncate"
            />
            <button
              onClick={handleCopyEmbed}
              className="rounded-xl border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-accent transition-all cursor-pointer shrink-0"
            >
              {copiedEmbed ? "Copied Code" : "Copy Snippet"}
            </button>
          </div>
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={onClose}
            className="w-full rounded-2xl border border-border/80 bg-surface/80 py-2.5 text-xs font-semibold text-foreground hover:bg-accent transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

