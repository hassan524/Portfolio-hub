import { type Portfolio, type Project } from "./types";

interface PhoneMockupProps {
  portfolio: Portfolio;
  name: string;
  headline: string;
  bio: string;
  showProjects: boolean;
  projects: Project[];
  showContact: boolean;
}

export function PhoneMockup({
  portfolio,
  name,
  headline,
  bio,
  showProjects,
  projects,
  showContact,
}: PhoneMockupProps) {
  return (
    <div className="w-[300px] h-[580px] rounded-[48px] border-[12px] border-zinc-950 bg-zinc-900 shadow-lift relative overflow-hidden flex flex-col">
      
      {/* Phone speaker/camera bar */}
      <div className="absolute top-0 inset-x-0 h-6 bg-zinc-950 flex items-center justify-center z-30">
        <span className="w-16 h-4.5 rounded-full bg-black flex items-center justify-between px-3">
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-800" />
          <span className="w-6 h-1 bg-zinc-800 rounded" />
        </span>
      </div>

      {/* Inner Web Page Screen */}
      <div className="flex-1 bg-surface-elevated pt-8 px-5 pb-6 overflow-y-auto font-sans flex flex-col justify-between text-zinc-900">
        
        {/* Header info */}
        <div>
          <div className="flex items-center justify-between border-b border-border/70 pb-3">
            <span className="text-[8px] font-bold uppercase tracking-wider text-ink-soft">{portfolio.template} template</span>
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          </div>

          {/* Title Section */}
          <div className="mt-6 text-center">
            <h4 className="font-display text-2xl font-bold tracking-tight text-ink truncate">{name || "Your name"}</h4>
            <p className="text-[10px] text-ink-soft font-semibold truncate mt-0.5">{headline || "Your headline tagline"}</p>
            <p className="text-[9px] text-ink-soft/90 leading-relaxed mt-2 text-justify bg-secondary/30 p-2.5 rounded-xl border border-border/50">
              {bio || "Enter biographical information about your skills and goals."}
            </p>
          </div>

          {/* Dynamic Projects Preview */}
          {showProjects && (
            <div className="mt-6 space-y-3">
              <h5 className="text-[9px] font-bold uppercase tracking-wider text-ink border-b border-border pb-1">Featured Work</h5>
              {projects.length === 0 ? (
                <div className="text-[8px] text-center text-ink-soft italic py-2">No projects added.</div>
              ) : (
                projects.map((p) => (
                  <div key={p.id} className="p-2.5 rounded-lg border border-border bg-surface text-left">
                    <div className="text-[9px] font-bold truncate text-ink">{p.name || "Untitled"}</div>
                    <p className="text-[8px] text-ink-soft truncate mt-0.5">{p.desc || "No description"}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Dynamic Contact Form Preview */}
        {showContact && (
          <div className="mt-8 pt-4 border-t border-border/80">
            <div className="text-center">
              <span className="inline-block bg-foreground text-background rounded-full px-4 py-1.5 text-[9px] font-bold">
                Email Me
              </span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-[7px] text-ink-soft/60 mt-10 pt-3 border-t border-border/40">
          Made with PortfolioHub
        </div>
      </div>
    </div>
  );
}
