import type { SiteData } from "@/types/builder.schema";
import { templates } from "@/data/templates";
import { getFolderName, CATEGORY_TO_FOLDER } from "./categoryMap";
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

const templatePublicAssets = import.meta.glob(
    "/src/components/editor/TemplatesUI/**/public/**/*",
    { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

const templatePublicRaw = import.meta.glob(
    "/src/components/editor/TemplatesUI/**/public/**/*.{svg,txt,json,xml,html,css,js,ts}",
    { eager: true, query: "?raw", import: "default" },
) as Record<string, string>;

function getTemplateFolderAndIndex(site: SiteData): { folder: string; index: number } | null {
    if (site.category) {
        const folder = getFolderName(site.category);
        const catTemplates = templates.filter((t) => t.category === site.category);
        const idx = catTemplates.findIndex((t) => t.id === site.id);
        const index = idx !== -1 ? idx + 1 : 1;
        return { folder, index };
    }
    for (const block of site.blocks || []) {
        const variant = (block.props as { variant?: string })?.variant;
        if (!variant) continue;
        for (const folder of Object.values(CATEGORY_TO_FOLDER)) {
            if (variant.startsWith(folder)) {
                const rest = variant.slice(folder.length);
                const match = rest.match(/^(\d+)/);
                if (match) {
                    return { folder, index: parseInt(match[1], 10) };
                }
            }
        }
    }
    return null;
}

async function fetchAssetAsBase64(url: string): Promise<string> {
    try {
        const res = await fetch(url);
        const blob = await res.blob();
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                resolve(result || "");
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (e) {
        console.warn("[buildViewerAppFiles] failed to load template public asset:", url, e);
        return "";
    }
}

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

    // Copy template-specific public files into the deploy bundle's public/ folder if they exist
    const templateInfo = getTemplateFolderAndIndex(site);
    if (templateInfo) {
        const targetPrefix = `/src/components/editor/TemplatesUI/${templateInfo.folder}/${templateInfo.index}/public/`;
        for (const [path, url] of Object.entries(templatePublicAssets)) {
            if (!path.startsWith(targetPrefix)) continue;
            const relName = path.slice(targetPrefix.length);
            if (!relName || relName.endsWith(".gitkeep")) continue;

            const destPath = `public/${relName}`;
            if (templatePublicRaw[path]) {
                files[destPath] = templatePublicRaw[path];
            } else if (url) {
                const base64 = await fetchAssetAsBase64(url);
                if (base64) {
                    files[destPath] = base64;
                }
            }
        }
    }

    if (files["index.html"]) {
        files["index.html"] = buildHtml(files["index.html"], site);
    }

    return files;
}