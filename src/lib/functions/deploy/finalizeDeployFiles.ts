import { SITE_URL_PLACEHOLDER } from "./buildSeoFiles";

export function finalizeDeployFiles(
    files: Record<string, string>,
    realUrl: string,
): Record<string, string> {
    const patched: Record<string, string> = {};
    for (const [path, content] of Object.entries(files)) {
        patched[path] = content.includes(SITE_URL_PLACEHOLDER)
            ? content.split(SITE_URL_PLACEHOLDER).join(realUrl.replace(/\/$/, ""))
            : content;
    }
    return patched;
}