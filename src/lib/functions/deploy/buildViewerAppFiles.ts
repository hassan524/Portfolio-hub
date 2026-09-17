import type { SiteData } from "@/types/builder.schema";
import { buildAppTsx } from "./buildAppTsx";
import { buildHtml } from "./buildHtml";
import { buildSitemap, buildRobotsTxt } from "./buildSeoFiles";
import { publishedEditable } from "./templates/editable.template";
import { publishedPackage } from "./templates/package.template";
import { publishedApplyPreviewStyles } from "./templates/applyPreviewStyles.template";

export { finalizeDeployFiles } from "./finalizeDeployFiles";
export { SITE_URL_PLACEHOLDER } from "./buildSeoFiles";

const viewerAppBase = import.meta.glob("/viewer-app/**/*", {
    eager: true,
    query: "?raw",
    import: "default",
}) as Record<string, string>;

const blockSource = import.meta.glob(
    ["/src/components/blocks/**/*", "/src/components/editor/TemplatesUI/**/*"],
    { eager: true, query: "?raw", import: "default" },
) as Record<string, string>;

export async function buildViewerAppFiles(site: SiteData) {
    const { appTsx, patchedBlockSource } = buildAppTsx(site, blockSource);

    const files: Record<string, string> = {};

    for (const [path, content] of Object.entries(viewerAppBase)) {
        const relPath = path.replace("/viewer-app/", "");
        if (relPath === "src/App.tsx" || relPath === "src/site.json" || relPath === "package.json") continue;
        files[relPath] = content;
    }

    for (const [path, content] of Object.entries(patchedBlockSource)) {
        files[path.replace("/src/", "src/")] = content;
    }

    files["src/components/editor/ui/Editable.tsx"] = publishedEditable;
    files["src/applyPreviewStyles.ts"] = publishedApplyPreviewStyles;
    files["src/App.tsx"] = appTsx;
    files["src/site.json"] = JSON.stringify(site, null, 2);
    files["package.json"] = publishedPackage;
    files["public/sitemap.xml"] = buildSitemap();
    files["public/robots.txt"] = buildRobotsTxt();

    if (files["index.html"]) {
        files["index.html"] = buildHtml(files["index.html"], site);
    }

    return files;
}