import type { SiteData, Block } from "@/types/builder.schema";
import { getImageOverrides } from "@/lib/imageOverrideUtils";
import { resolveComponentInfo } from "./resolveComponent";

type BuildResult = {
  appTsx: string;
  patchedBlockSource: Record<string, string>;
};

// Mirrors TemplateLivePreview's isNewBlock check. Must stay identical
// to the editor's logic or saved styles won't line up after deploy.
function isNewBlock(block: Block): boolean {
  return Boolean(
    (block as any).isCustom ||
    (block as any).isNew ||
    (block.props as any)?.isCustom ||
    block.props?.kind === "spacer",
  );
}

export function buildAppTsx(
  site: SiteData,
  blockSource: Record<string, string>,
): BuildResult {
  const aiThemeStyles = `
    [data-ai-product-theme] [class*="text-white"], [data-ai-product-theme] [class*="text-gray-900"], [data-ai-product-theme] [class*="text-gray-800"], [data-ai-product-theme] [class*="text-gray-700"], [data-ai-product-theme] [class*="text-gray-600"], [data-ai-product-theme] [class*="text-gray-500"], [data-ai-product-theme] [class*="text-gray-400"], [data-ai-product-theme] [class*="text-black"] { color: var(--ai-theme-ink) !important; }
    [data-ai-product-theme] [class*="text-rose"], [data-ai-product-theme] [class*="text-pink"], [data-ai-product-theme] [class*="text-amber"], [data-ai-product-theme] [class*="text-emerald"] { color: var(--ai-theme-accent) !important; }
    [data-ai-product-theme] [class*="bg-white"], [data-ai-product-theme] [class*="bg-gray"], [data-ai-product-theme] [class*="bg-slate"] { background-color: var(--ai-theme-surface) !important; }
    [data-ai-product-theme] [class*="bg-black"] { background-color: var(--ai-theme-bg) !important; }
    [data-ai-product-theme] [class*="bg-rose"], [data-ai-product-theme] [class*="bg-pink"], [data-ai-product-theme] [class*="bg-amber"], [data-ai-product-theme] [class*="bg-emerald"] { background-color: var(--ai-theme-accent) !important; }
    [data-ai-product-theme] [class*="border-white"], [data-ai-product-theme] [class*="border-gray"], [data-ai-product-theme] [class*="border-slate"], [data-ai-product-theme] [class*="border-black"] { border-color: color-mix(in srgb, var(--ai-theme-ink) 15%, transparent) !important; }
  `.trim();
  const sorted = [...site.blocks].sort((a, b) => a.order - b.order);
  const importLines: string[] = [];
  const renderLines: string[] = [];
  const patchedBlockSource: Record<string, string> = { ...blockSource };

  sorted.forEach((block, i) => {
    const variant = (block.props as { variant?: string }).variant;
    const info = resolveComponentInfo(block.props.kind, variant, site.category, site.id);
    if (!info) return;

    const alias = `Block${i}`;
    const importPath = info.path.replace(/^\/src\//, "./");

    importLines.push(
      info.isDefault
        ? `import ${alias} from "${importPath}";`
        : `import { ${info.exportName} as ${alias} } from "${importPath}";`,
    );

    const overrides = getImageOverrides(block.props as Record<string, unknown>);
    let content = patchedBlockSource[info.path];
    if (content) {
      for (const [oldUrl, newUrl] of Object.entries(overrides)) {
        if (!oldUrl || !newUrl) continue;
        content = content.split(oldUrl).join(newUrl);
      }
      patchedBlockSource[info.path] = content;
    }

    const propsExpr =
      block.props.kind === "navbar" || block.props.kind === "footer"
        ? `{ ...siteData.blocks[${i}].props, logo: siteData.logo }`
        : `siteData.blocks[${i}].props`;

    const componentTag = `<TextOverrideProvider overrides={(siteData.blocks[${i}].props as any)._textOverrides}><${alias} key="${block.id}" id="${block.id}" props={${propsExpr}} theme={siteData.theme} onChange={() => {}} /></TextOverrideProvider>`;

    const innerJsx = isNewBlock(block)
      ? `<div style={{ height: "100%" }} className="[&>*]:h-full">${componentTag}</div>`
      : componentTag;

    renderLines.push(
      `<div data-block-id="${block.id}" data-ai-product-theme={siteData.category === "AI Product" ? "true" : undefined} style={{ position: "relative"${block.height ? `, minHeight: "${block.height}px"` : ""}, ...(siteData.category === "AI Product" ? { "--ai-theme-bg": siteData.theme.bg, "--ai-theme-ink": siteData.theme.ink, "--ai-theme-accent": siteData.theme.accent, "--ai-theme-surface": siteData.theme.surface || siteData.theme.bg } : {}) }}>
        ${innerJsx}
      </div>`,
    );
  });

  const appTsx = `
import { useEffect, useLayoutEffect, useRef } from "react";
import siteData from "./site.json";
import { applyAllPreviewEdits } from "./applyPreviewStyles";
import { TextOverrideProvider } from "./components/editor/ui/Editable";
${importLines.join("\n")}

const AI_THEME_STYLES = ${JSON.stringify(aiThemeStyles)};


export default function App() {
  const mainRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    applyAllPreviewEdits(mainRef.current, (siteData as any).previewEdits);

    const handleResize = () => {
      applyAllPreviewEdits(mainRef.current, (siteData as any).previewEdits);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    applyAllPreviewEdits(mainRef.current, (siteData as any).previewEdits);
    const observer = new MutationObserver(() => {
      applyAllPreviewEdits(mainRef.current, (siteData as any).previewEdits);
    });
    if (mainRef.current) {
      observer.observe(mainRef.current, { childList: true, subtree: true });
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch("https://localhost:5000/api/portfolio/track/" + siteData.id, {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        referrer: document.referrer || null,
        path: window.location.pathname,
      }),
    }).catch(() => {});
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: AI_THEME_STYLES }} />
      <main ref={mainRef} style={{ minHeight: "100vh", background: siteData.theme.bg, color: siteData.theme.ink }}>
      ${renderLines.join("\n      ")}
      </main>
    </>
  );
}
`.trim();

  return { appTsx, patchedBlockSource };
}