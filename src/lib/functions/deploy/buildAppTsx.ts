import type { SiteData } from "@/types/builder.schema";
import { getImageOverrides } from "@/lib/imageOverrideUtils";
import {
  getPreviewBlockInnerClasses,
  getPreviewBlockWrapperClasses,
} from "@/lib/functions/livePreview/blockWrapper";
import { resolveComponentInfo } from "./resolveComponent";

type BuildResult = {
  appTsx: string;
  patchedBlockSource: Record<string, string>;
};

export function buildAppTsx(
  site: SiteData,
  blockSource: Record<string, string>,
): BuildResult {
  const aiThemeStyles = `
    html, body { margin: 0; padding: 0; width: 100%; max-width: 100vw; overflow-x: hidden !important; }
    * { box-sizing: border-box; }
    [data-free-positioned="true"] { z-index: 250 !important; }
    [data-has-free-positioned="true"],
    [data-has-free-positioned="true"] [data-block-id],
    [data-has-free-positioned="true"] > [data-block-id] > section,
    [data-has-free-positioned="true"] > [data-block-id] > header,
    [data-has-free-positioned="true"] > [data-block-id] > nav,
    [data-has-free-positioned="true"] > [data-block-id] > footer,
    [data-has-free-positioned="true"] section { overflow: visible !important; }
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

    const isNavbar = block.props.kind === "navbar";
    const propsExpr =
      isNavbar || block.props.kind === "footer"
        ? `{ ...siteData.blocks[${i}].props, logo: siteData.logo }`
        : `siteData.blocks[${i}].props`;

    const blockThemeExpr = block.bgColor
      ? `{ ...siteData.theme, bg: "${block.bgColor}", "bg-second": "${block.bgColor}" }`
      : `siteData.theme`;

    const componentTag = `<TextOverrideProvider overrides={(siteData.blocks[${i}].props as any)._textOverrides}><${alias} key="${block.id}" id="${block.id}" props={${propsExpr}} theme={${blockThemeExpr}} onChange={() => {}} /></TextOverrideProvider>`;

    const innerClasses = getPreviewBlockInnerClasses(block) ?? "";
    const innerJsx = `<div style={{ height: ${block.height ? '"100%"' : "undefined"} }} className="${innerClasses}">
    ${componentTag}
  </div>`;

    const wrapperClasses = getPreviewBlockWrapperClasses(block);
    const hasFreePositioned = Boolean(
      site.previewEdits?.elements &&
      Object.entries(site.previewEdits.elements).some(
        ([key, el]: [string, any]) =>
          (el?.blockId === block.id || key.startsWith(`${block.id}:`)) &&
          el?.style?.freePositioned
      )
    );

    renderLines.push(
      `<div data-block-id="${block.id}" data-block-kind="${block.props.kind}" data-has-custom-bg={${block.bgColor ? '"true"' : "undefined"}} data-has-free-positioned={${hasFreePositioned ? '"true"' : "undefined"}} className="${wrapperClasses}" style={{ position: "relative", zIndex: ${hasFreePositioned ? 200 : 1}, ${hasFreePositioned ? 'overflow: "visible", ' : ""}${block.height ? `minHeight: "${block.height}px", height: "${block.height}px", ` : ""}${block.bgColor ? `backgroundColor: "${block.bgColor}", "--block-bg": "${block.bgColor}", ` : ""} }}>
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
  const isApplyingRef = useRef<boolean>(false);
  const needsReapplyRef = useRef<boolean>(false);

  const runApplyStyles = () => {
    if (isApplyingRef.current) {
      needsReapplyRef.current = true;
      return;
    }
    isApplyingRef.current = true;
    try {
      applyAllPreviewEdits(mainRef.current, (siteData as any).previewEdits, (siteData as any).blocks);
    } finally {
      requestAnimationFrame(() => {
        isApplyingRef.current = false;
        if (needsReapplyRef.current) {
          needsReapplyRef.current = false;
          runApplyStyles();
        }
      });
    }
  };

  useLayoutEffect(() => {
    runApplyStyles();

    let resizeRaf: number | null = null;
    const handleResize = () => {
      if (resizeRaf !== null) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        runApplyStyles();
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      if (resizeRaf !== null) cancelAnimationFrame(resizeRaf);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    runApplyStyles();
    const observer = new MutationObserver(() => {
      runApplyStyles();
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
      <main ref={mainRef} style={{ minHeight: "100vh", background: siteData.theme.bg, color: siteData.theme.ink, width: "100%", maxWidth: "100vw", overflowX: "hidden", "--background": siteData.theme.bg, "--foreground": siteData.theme.ink, "--ink": siteData.theme.ink, "--theme-bg": siteData.theme.bg, "--theme-ink": siteData.theme.ink, "--theme-accent": siteData.theme.accent, "--accent": siteData.theme.accent, "--theme-surface": siteData.theme.surface || siteData.theme.bg, "--surface": siteData.theme.surface || siteData.theme.bg }}>
      ${renderLines.join("\n      ")}
      </main>
    </>
  );
}
`.trim();

  return { appTsx, patchedBlockSource };
}
