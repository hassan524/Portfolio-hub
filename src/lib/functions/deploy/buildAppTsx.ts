import type { SiteData } from "@/types/builder.schema";
import { getImageOverrides } from "@/lib/imageOverrideUtils";
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
      ? (isNavbar
          ? `{ ...siteData.theme, "bg-second": "${block.bgColor}" }`
          : `{ ...siteData.theme, bg: "${block.bgColor}", "bg-second": "${block.bgColor}" }`)
      : `siteData.theme`;

    const componentTag = `<TextOverrideProvider overrides={(siteData.blocks[${i}].props as any)._textOverrides}><${alias} key="${block.id}" id="${block.id}" props={${propsExpr}} theme={${blockThemeExpr}} onChange={() => {}} /></TextOverrideProvider>`;

    // Matches TemplateLivePreview wrapper hierarchy exactly so DOM paths line up with saved previewEdits
    const innerJsx = `<div style={{ height: ${!isNavbar && block.height ? '"100%"' : "undefined"} }} className="${!isNavbar && block.height ? "h-full min-h-full [&>*]:!h-full [&>*]:!min-h-full" : ""}">
    ${componentTag}
  </div>`;

    const navbarClass = isNavbar
      ? `[&_header]:!relative [&_header]:!top-auto [&_header]:!h-auto [&_header]:!min-h-0 [&_nav]:!relative [&_nav]:!top-auto [&_nav]:!h-auto [&_nav]:!min-h-0`
      : "";
    const heightClass = block.height && !isNavbar
      ? ` [&_section]:!h-full [&_section]:!min-h-full [&_header]:!h-full [&_header]:!min-h-full [&_nav]:!h-full [&_nav]:!min-h-full [&_footer]:!h-full [&_footer]:!min-h-full`
      : "";
    const customBgClass = block.bgColor
      ? (isNavbar
          ? ` [&_header]:!bg-transparent [&_nav]:!bg-transparent [&_header>div]:!bg-[var(--block-bg)] [&_nav>div]:!bg-[var(--block-bg)]`
          : ` [&_section]:!bg-[var(--block-bg)] [&_header]:!bg-[var(--block-bg)] [&_nav]:!bg-[var(--block-bg)] [&_footer]:!bg-[var(--block-bg)] [&_header>div]:!bg-[var(--block-bg)] [&_nav>div]:!bg-[var(--block-bg)]`
        )
      : "";

    const wrapperBg = isNavbar ? "transparent" : (block.bgColor || "");
    renderLines.push(
      `<div data-block-id="${block.id}" data-block-kind="${block.props.kind}" data-has-custom-bg={${block.bgColor ? '"true"' : "undefined"}} className="${navbarClass}${heightClass}${customBgClass}" style={{ position: "relative",${block.height ? ` minHeight: "${block.height}px", height: "${block.height}px",` : ""}${block.bgColor ? ` backgroundColor: "${wrapperBg}", "--block-bg": "${block.bgColor}",` : ""} }}>
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
