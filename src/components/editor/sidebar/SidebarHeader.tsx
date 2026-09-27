import { useEffect, useState } from "react";
import { PencilLine, X } from "lucide-react";

import type { SiteData } from "@/types/builder.schema";
import { LogoUploader } from "./LogoUploader";
import type { SidebarMetaPatch } from "./types";

type SidebarHeaderProps = {
  site: SiteData;
  onSiteMetaChange: (patch: SidebarMetaPatch) => void;
  onMobileClose?: () => void;
};

export function SidebarHeader({ site, onSiteMetaChange, onMobileClose }: SidebarHeaderProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [siteName, setSiteName] = useState(site.name || site.category || "Portfolio");

  useEffect(() => {
    setSiteName(site.name || site.category || "Portfolio");
  }, [site.name, site.category]);

  const commitNameChange = () => {
    setIsEditingName(false);
    const trimmed = siteName.trim() || site.category || "Portfolio";
    setSiteName(trimmed);
    onSiteMetaChange({ name: trimmed });
  };

  return (
    <div className="flex flex-col gap-4 border-b border-zinc-800 p-4 shrink-0 bg-zinc-950 shadow-xs">
      <div className="flex items-center gap-3">
        <LogoUploader logo={site.logo ?? null} onChange={(url) => onSiteMetaChange({ logo: url })} />
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          {isEditingName ? (
            <input
              type="text"
              autoFocus
              value={siteName}
              onChange={(event) => setSiteName(event.target.value)}
              onBlur={commitNameChange}
              onKeyDown={(event) => {
                if (event.key === "Enter") commitNameChange();
                if (event.key === "Escape") {
                  setIsEditingName(false);
                  setSiteName(site.name || site.category || "Portfolio");
                }
              }}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-sm font-semibold text-white outline-none focus:border-zinc-500 transition-all"
            />
          ) : (
            <div
              onClick={() => setIsEditingName(true)}
              title="Click to rename website"
              className="group flex items-center justify-between gap-1.5 cursor-pointer rounded-lg px-2 py-1 -mx-2 hover:bg-zinc-900/80 transition-colors"
            >
              <div className="flex min-w-0 flex-col">
                <span className="truncate font-display text-sm font-semibold text-white group-hover:text-zinc-200 transition-colors">
                  {site.name || site.category || "Portfolio"}
                </span>
                <span className="truncate text-[10px] text-zinc-400 capitalize">
                  {site.category || "Portfolio"} - Click to edit
                </span>
              </div>
              <PencilLine className="h-3 w-3 shrink-0 text-zinc-500 opacity-0 group-hover:opacity-100 group-hover:text-zinc-300 transition-opacity" />
            </div>
          )}
        </div>
        {onMobileClose && (
          <button
            onClick={onMobileClose}
            className="lg:hidden grid h-8 w-8 shrink-0 place-items-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
            title="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
