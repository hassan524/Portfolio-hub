import { useState } from "react";
import { Toggle } from "./DashboardShared";
import { Check, Copy } from "lucide-react";

export function SettingsTab({ domain }: { domain: string }) {
  const [currentDomain, setCurrentDomain] = useState(domain);
  const [indexable, setIndexable] = useState(true);
  const [analytics, setAnalytics] = useState(true);
  const [password, setPassword] = useState(false);
  const [savedDomain, setSavedDomain] = useState(false);
  const [copiedRecord, setCopiedRecord] = useState<string | null>(null);

  const handleSaveDomain = () => {
    setSavedDomain(true);
    setTimeout(() => setSavedDomain(false), 2000);
  };

  const copyDnsRecord = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedRecord(val);
    setTimeout(() => setCopiedRecord(null), 2000);
  };

  return (
    <div className="w-full space-y-8 py-2">
      {/* Domain Section */}
      <section className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-5 sm:p-7 space-y-6">
        <div className="pb-4 border-b border-white/[0.06]">
          <h2 className="text-base font-semibold text-white">Custom Domain</h2>
          <p className="text-sm text-white/30 mt-1">
            Connect your domain to your live portfolio
          </p>
        </div>

        <div className="space-y-6">
          {/* Domain Input */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-md border border-white/[0.06] bg-white/[0.02]">
            <div className="space-y-1">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/60">
                Domain Name
              </h3>
              <p className="text-xs text-white/30">
                e.g. <code className="font-mono text-white/50">alexdeveloper.com</code>
              </p>
            </div>

            <div className="flex flex-col min-[400px]:flex-row items-stretch min-[400px]:items-center gap-2.5 shrink-0 w-full sm:w-auto">
              <input
                type="text"
                value={currentDomain}
                onChange={(e) => setCurrentDomain(e.target.value)}
                placeholder="my-domain.com"
                className="w-full sm:w-64 rounded-md border border-white/[0.08] bg-black px-3.5 py-2.5 font-mono text-xs text-white/70 outline-none focus:border-white/20 transition-colors"
              />
              <button
                onClick={handleSaveDomain}
                className="rounded-md bg-white px-4 py-2.5 text-xs font-semibold text-black hover:bg-white/90 cursor-pointer inline-flex items-center justify-center gap-1.5 shrink-0"
              >
                {savedDomain ? (
                  <>
                    <Check className="size-3.5" />
                    <span>Saved</span>
                  </>
                ) : (
                  <span>Save Domain</span>
                )}
              </button>
            </div>
          </div>

          {/* DNS Records */}
          <div className="rounded-md border border-white/[0.06] bg-white/[0.02] p-4 space-y-4">
            <div>
              <p className="text-xs font-semibold text-white/60">Required DNS Configuration</p>
              <p className="text-xs text-white/25 mt-1">
                Add these records at your domain provider (GoDaddy, Namecheap, Cloudflare):
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center justify-between rounded-md border border-white/[0.06] bg-black/40 p-3 text-xs gap-2">
                <div className="min-w-0">
                  <span className="text-white/30 block text-[10px] uppercase tracking-wider">A Record (Root)</span>
                  <code className="font-mono font-semibold text-white/70 text-xs">76.76.21.21</code>
                </div>
                <button
                  onClick={() => copyDnsRecord("76.76.21.21")}
                  className="text-white/20 hover:text-white/50 p-1.5 cursor-pointer shrink-0"
                >
                  {copiedRecord === "76.76.21.21" ? <Check className="size-3.5 text-[#86efac]" /> : <Copy className="size-3.5" />}
                </button>
              </div>

              <div className="flex items-center justify-between rounded-md border border-white/[0.06] bg-black/40 p-3 text-xs gap-2">
                <div className="min-w-0">
                  <span className="text-white/30 block text-[10px] uppercase tracking-wider">CNAME Record (www)</span>
                  <code className="font-mono font-semibold text-white/70 break-all text-xs">cname.portfoliohub.dev</code>
                </div>
                <button
                  onClick={() => copyDnsRecord("cname.portfoliohub.dev")}
                  className="text-white/20 hover:text-white/50 p-1.5 cursor-pointer shrink-0"
                >
                  {copiedRecord === "cname.portfoliohub.dev" ? <Check className="size-3.5 text-[#86efac]" /> : <Copy className="size-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-5 sm:p-7 space-y-6">
        <div className="pb-4 border-b border-white/[0.06]">
          <h2 className="text-base font-semibold text-white">Privacy & Visibility</h2>
          <p className="text-sm text-white/30 mt-1">
            Search engine indexing and access controls
          </p>
        </div>

        <div className="divide-y divide-white/[0.05]">
          <div className="py-5 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-white/70">Search Indexing</h3>
              <p className="text-xs text-white/30">
                Allow Google and Bing to show your portfolio.
              </p>
            </div>
            <div className="shrink-0">
              <Toggle on={indexable} onChange={setIndexable} />
            </div>
          </div>

          <div className="py-5 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-white/70">Password Protection</h3>
              <p className="text-xs text-white/30">
                Require a passphrase to view your site.
              </p>
            </div>
            <div className="shrink-0">
              <Toggle on={password} onChange={setPassword} />
            </div>
          </div>

          <div className="py-5 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-white/70">Cookieless Analytics</h3>
              <p className="text-xs text-white/30">
                Track visitors while preserving privacy.
              </p>
            </div>
            <div className="shrink-0">
              <Toggle on={analytics} onChange={setAnalytics} />
            </div>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="rounded-lg border border-red-500/15 bg-red-500/[0.03] p-5 sm:p-7 space-y-6">
        <div className="pb-4 border-b border-red-500/10">
          <h2 className="text-base font-semibold text-white">Danger Zone</h2>
          <p className="text-sm text-white/30 mt-1">
            Irreversible actions
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-md border border-white/[0.06] bg-white/[0.02]">
            <div>
              <h3 className="text-sm font-medium text-white/70">Transfer Project</h3>
              <p className="text-xs text-white/30 mt-0.5">
                Move ownership to another workspace.
              </p>
            </div>
            <button className="shrink-0 rounded-md border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/50 hover:text-white/80 hover:bg-white/[0.06] cursor-pointer self-start sm:self-auto">
              Transfer
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-md border border-red-500/15 bg-red-500/[0.04]">
            <div>
              <h3 className="text-sm font-medium text-red-400">Delete Portfolio</h3>
              <p className="text-xs text-white/30 mt-0.5">
                Permanently remove this project and all data.
              </p>
            </div>
            <button
              onClick={() => {
                if (confirm("Are you sure you want to delete this portfolio? This action cannot be undone.")) {
                  alert("Portfolio deleted.");
                }
              }}
              className="shrink-0 rounded-md bg-red-500 px-4 py-2 text-xs font-semibold text-white hover:bg-red-600 cursor-pointer self-start sm:self-auto"
            >
              Delete Portfolio
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
