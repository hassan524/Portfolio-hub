import { templates } from "@/data/templates";
import { getFolderName, CATEGORY_TO_FOLDER } from "./categoryMap";


const templateModules = import.meta.glob("/src/components/editor/TemplatesUI/**/*.tsx", {
    eager: true,
}) as Record<string, any>;

export type ResolvedComponentInfo = {
    path: string;
    exportName: string | null;
    isDefault: boolean;
};

function getTemplateIndex(category: string, siteId: string): number {
    const catTemplates = templates.filter((t) => t.category === category);
    const idx = catTemplates.findIndex((t) => t.id === siteId);
    return idx !== -1 ? idx + 1 : 1;
}

function resolveModuleAndExport(
    folder: string,
    templateIndex: number,
    kind: string,
): ResolvedComponentInfo | null {
    const path = `/src/components/editor/TemplatesUI/${folder}/${templateIndex}/${kind.toLowerCase()}.tsx`;
    const mod = templateModules[path];
    if (!mod) return null;

    const capitalizedKind = kind.charAt(0).toUpperCase() + kind.slice(1);
    const componentName = `${folder}${templateIndex}${capitalizedKind}`;

    if (mod[componentName]) return { path, exportName: componentName, isDefault: false };
    if (mod.default) return { path, exportName: null, isDefault: true };
    const fnKey = Object.keys(mod).find((k) => typeof mod[k] === "function");
    if (fnKey) return { path, exportName: fnKey, isDefault: false };
    return null;
}

export function resolveComponentInfo(
    kind: string,
    variant?: string,
    category?: string,
    siteId?: string,
): ResolvedComponentInfo | null {
    if (category && siteId) {
        const folder = getFolderName(category);
        const templateIndex = getTemplateIndex(category, siteId);
        const info = resolveModuleAndExport(folder, templateIndex, kind);
        if (info) return info;
    }
    if (variant) {
        for (const folder of Object.values(CATEGORY_TO_FOLDER)) {
            if (variant.startsWith(folder)) {
                const rest = variant.slice(folder.length);
                const match = rest.match(/^(\d+)/);
                if (match) {
                    const templateIndex = parseInt(match[1], 10);
                    const info = resolveModuleAndExport(folder, templateIndex, kind);
                    if (info) return info;
                }
            }
        }
    }
    return null;
}