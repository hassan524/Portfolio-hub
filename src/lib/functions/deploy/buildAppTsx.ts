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

    const componentTag = `<${alias} key="${block.id}" id="${block.id}" props={${propsExpr}} theme={siteData.theme} onChange={() => {}} />`;

    const innerJsx = isNewBlock(block)
      ? `<div style={{ height: "100%" }} className="[&>*]:h-full">${componentTag}</div>`
      : componentTag;

    renderLines.push(
      `<div data-block-id="${block.id}" style={{ position: "relative"${block.height ? `, minHeight: "${block.height}px"` : ""} }}>
        ${innerJsx}
      </div>`,
    );
  });

  const appTsx = `
import { useEffect, useLayoutEffect, useRef } from "react";
import siteData from "./site.json";
import { applyAllPreviewEdits } from "./applyPreviewStyles";
${importLines.join("\n")}

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
    <main ref={mainRef} style={{ minHeight: "100vh", background: siteData.theme.bg, color: siteData.theme.ink }}>
      ${renderLines.join("\n      ")}
    </main>
  );
}
`.trim();

  return { appTsx, patchedBlockSource };
}