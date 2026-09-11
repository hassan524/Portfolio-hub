import { useState } from "react";
import { MetricBand } from "./DashboardShared";
import {
  Globe,
  ShieldCheck,
  GitBranch,
  History,
  ArrowUpRight,
  LayoutTemplate,
  Tag,
  CalendarPlus,
  CalendarClock,
  Monitor,
  Smartphone,
  ExternalLink,
  CheckCircle2,
  Server,
  Zap,
  Share2,
  RefreshCw,
  Sparkles,
  Download,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DeployEvent {
  id: string;
  status: "success" | "failed" | "building";
  commitMessage?: string | null;
  timestamp: string; // ISO
}

interface OverviewTabProps {
  portfolio?: {
    id: string;
    title: string;
    domain?: string | null;
    description?: string | null;
    isDeployed?: boolean;
    platform?: "vercel" | "netlify" | null;
    lastDeployedAt?: string | null;
    sslStatus?: "active" | "pending" | "none";
    templateName?: string | null;
    templateId?: string | null;
    category?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    liveUrl?: string | null;
  };
  deployHistory?: DeployEvent[];
  range: string;
  setRange: (r: string) => void;
  onShare?: () => void;
}

function formatRelativeTime(iso?: string | null) {
  if (!iso) return null;
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function formatDate(iso?: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between text-xs py-2.5 gap-2">
      <span className="flex items-center gap-2 text-muted-foreground font-medium shrink-0">
        <Icon className="size-3.5 text-muted-foreground/80" />
        {label}
      </span>
      <span className="font-semibold text-foreground truncate max-w-[130px] sm:max-w-[200px] text-right">{value}</span>
    </div>
  );
}

export function OverviewTab({
  portfolio,
  deployHistory = [
    {
      id: "dep-1",
      status: "success",
      commitMessage: "Published latest portfolio updates & theme adjustments",
      timestamp: portfolio?.lastDeployedAt || new Date().toISOString(),
    },
    {
      id: "dep-2",
      status: "success",
      commitMessage: "Updated project showcase section & bio",
      timestamp: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    },
    {
      id: "dep-3",
      status: "success",
      commitMessage: "Initial portfolio deployment on edge network",
      timestamp: portfolio?.createdAt || new Date(Date.now() - 3600000 * 24 * 7).toISOString(),
    },
  ],
  onShare,
}: OverviewTabProps) {
  const navigate = useNavigate();
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">("desktop");
  const [iframeKey, setIframeKey] = useState(0);
  const [iframeError, setIframeError] = useState(false);

  const liveUrl =
    portfolio?.liveUrl ||
    (portfolio?.domain ? `https://${portfolio.domain}` : "https://portfoliohub.dev/demo");

  const platformLabel =
    portfolio?.platform === "vercel"
      ? "Vercel Edge"
      : portfolio?.platform === "netlify"
      ? "Netlify CDN"
      : "PortfolioHub Cloud";

  const sslLabel =
    portfolio?.sslStatus === "active"
      ? "Active TLS"
      : portfolio?.sslStatus === "pending"
      ? "Setting up SSL..."
      : "Standard HTTPS";

  const deployedTime = formatRelativeTime(portfolio?.lastDeployedAt);

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <section className="space-y-2.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Performance & Overview
        </h3>
        <MetricBand />
      </section>

      {/* Main Grid: Pipeline, Portfolio Info & Deploy History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Left Column: Deployment Pipeline Status */}
        <section className="lg:col-span-7 space-y-5 sm:space-y-6">
          <div className="rounded-2xl border border-border/80 bg-card p-4 sm:p-6 space-y-4 sm:space-y-5 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3.5">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-foreground">
                  Hosting & Security
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Your site hosting status and health
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="size-3.5" />
                Healthy
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-xl border border-border/60 bg-background/80 p-3.5 sm:p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                  <Server className="size-3.5 text-primary shrink-0" />
                  <span>Cloud Hosting</span>
                </div>
                <p className="text-xs text-muted-foreground font-medium">{platformLabel}</p>
                <div className="text-[11px] text-emerald-500 font-mono flex items-center gap-1.5 pt-0.5">
                  <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>Fast Response (18ms)</span>
                </div>
              </div>

              <div className="rounded-xl border border-border/60 bg-background/80 p-3.5 sm:p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                  <ShieldCheck className="size-3.5 text-emerald-500 shrink-0" />
                  <span>SSL Security</span>
                </div>
                <p className="text-xs text-muted-foreground font-medium">{sslLabel}</p>
                <div className="text-[11px] text-muted-foreground font-mono pt-0.5">
                  Automatic SSL Active
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border/60 bg-background/80 p-3.5 sm:p-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <Zap className="size-3.5 text-amber-400 shrink-0" />
                <span>Tech Stack</span>
              </div>
              <span className="font-mono text-xs font-medium text-foreground bg-surface px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border border-border/60">
                React + Vite Edge
              </span>
            </div>
          </div>

          {/* Deploy History */}
          <div className="rounded-2xl border border-border/80 bg-card p-4 sm:p-6 space-y-4 sm:space-y-5 shadow-soft">
            <div className="flex items-center justify-between border-b border-border/60 pb-3.5">
              <div className="flex items-center gap-2">
                <History className="size-4 text-primary" />
                <h3 className="text-sm sm:text-base font-bold text-foreground">
                  Release History
                </h3>
              </div>
              <span className="text-xs text-muted-foreground font-mono">
                {deployHistory.length} deploys
              </span>
            </div>

            <ol className="space-y-3">
              {deployHistory.map((event, i) => (
                <li key={event.id} className="relative flex gap-3 sm:gap-4">
                  {i !== deployHistory.length - 1 && (
                    <span className="absolute left-[7px] top-4 h-[calc(100%+12px)] w-px bg-border/60" />
                  )}
                  <span
                    className={`relative mt-1.5 size-2.5 sm:size-3 shrink-0 rounded-full border-2 border-background ${
                      event.status === "success"
                        ? "bg-emerald-500"
                        : event.status === "failed"
                        ? "bg-red-500"
                        : "bg-amber-400"
                    }`}
                  />
                  <div className="flex flex-1 flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-border/60 bg-background/80 p-3 text-xs gap-1.5 min-w-0">
                    <div className="space-y-0.5 min-w-0 pr-2">
                      <p className="font-semibold text-foreground text-xs leading-snug">
                        {event.commitMessage || "Site deployment update"}
                      </p>
                      <p className="font-mono text-[11px] text-muted-foreground flex items-center gap-1.5">
                        <span>main</span>
                        <span>•</span>
                        <span className="text-emerald-400">Published</span>
                      </p>
                    </div>
                    <span className="font-mono text-[11px] text-muted-foreground shrink-0 self-start sm:self-auto">
                      {formatRelativeTime(event.timestamp)}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Right Column: Portfolio Details Specifications */}
        <section className="lg:col-span-5 space-y-5 sm:space-y-6">
          <div className="rounded-2xl border border-border/80 bg-card p-4 sm:p-6 space-y-4 sm:space-y-5 shadow-soft">
            <div className="border-b border-border/60 pb-3.5">
              <h3 className="text-sm sm:text-base font-bold text-foreground">
                Project Details
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Site setup and configuration
              </p>
            </div>

            <div className="space-y-1 divide-y divide-border/50">
              <DetailRow
                icon={LayoutTemplate}
                label="Active Template"
                value={portfolio?.templateName || "Modern Developer"}
              />
              <DetailRow
                icon={Tag}
                label="Category"
                value={portfolio?.category || "Developer Portfolio"}
              />
              <DetailRow
                icon={CalendarPlus}
                label="Created"
                value={formatDate(portfolio?.createdAt)}
              />
              <DetailRow
                icon={CalendarClock}
                label="Updated"
                value={formatDate(portfolio?.updatedAt)}
              />
              <DetailRow
                icon={Globe}
                label="Hosting"
                value={platformLabel}
              />
              <DetailRow
                icon={GitBranch}
                label="Branch"
                value="main (auto)"
              />
            </div>
          </div>

          {/* Quick Actions Shortcuts */}
          <div className="rounded-2xl border border-border/80 bg-card p-4 sm:p-6 space-y-3.5 shadow-soft">
            <h3 className="text-xs sm:text-sm font-bold text-foreground">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => navigate("/templates")}
                className="flex items-center justify-between rounded-xl border border-border/60 bg-background/80 p-3 text-xs font-semibold text-foreground hover:bg-accent transition-all cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <LayoutTemplate className="size-4 text-primary" />
                  Edit Theme & Layout
                </span>
                <ArrowUpRight className="size-3.5 text-muted-foreground" />
              </button>

              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-border/60 bg-background/80 p-3 text-xs font-semibold text-foreground hover:bg-accent transition-all cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Globe className="size-4 text-emerald-400" />
                  View Live Site
                </span>
                <ExternalLink className="size-3.5 text-muted-foreground" />
              </a>

              <button
                type="button"
                onClick={() =>
                  alert(
                    `Exporting full source code bundle for "${portfolio?.title || "Portfolio"}"... ZIP package created.`
                  )
                }
                className="flex items-center justify-between rounded-xl border border-border/60 bg-background/80 p-3 text-xs font-semibold text-foreground hover:bg-accent transition-all cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Download className="size-4 text-indigo-400" />
                  Export Code (ZIP)
                </span>
                <ArrowUpRight className="size-3.5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}