import type { SiteData } from "@/types/builder.schema";
import { templates } from "@/data/templates";
import { getImageOverrides } from "@/lib/imageOverrideUtils";

const viewerAppBase = import.meta.glob("/viewer-app/**/*", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const blockSource = import.meta.glob(
  ["/src/components/blocks/**/*", "/src/components/editor/TemplatesUI/**/*"],
  { eager: true, query: "?raw", import: "default" },
) as Record<string, string>;

const templateModules = import.meta.glob("/src/components/editor/TemplatesUI/**/*.tsx", {
  eager: true,
}) as Record<string, any>;

const CATEGORY_TO_FOLDER: Record<string, string> = {
  "Developer Portfolio": "DeveloperPortfolio",
  "Designer Portfolio": "DesignerPortfolio",
  "Creative Portfolio": "CreativePortfolio",
  "Personal Brand": "PersonalBrand",
  "SaaS Product": "SaaSProduct",
  "AI Product": "AIProduct",
  "Startup": "Startup",
  "Mobile App": "MobileApp",
  "Digital Agency": "DigitalAgency",
  "Marketing Agency": "MarketingAgency",
  "Business / Company": "BusinessCompany",
  "Clothing Brand": "ClothingBrand",
  "Streetwear Brand": "StreetwearBrand",
  "Beauty & Cosmetics": "BeautyCosmetics",
  "Skincare Brand": "SkincareBrand",
  "Perfume Brand": "PerfumeBrand",
  "Jewelry Brand": "JewelryBrand",
  "Food Brand": "FoodBrand",
  "Restaurant": "Restaurant",
  "Cafe / Coffee Shop": "CafeCoffeeShop",
  "Bakery": "Bakery",
  "Photography Portfolio": "PhotographyPortfolio",
  "Content Creator": "ContentCreator",
  "Music Artist / Band": "MusicArtistBand",
  "Architecture Studio": "ArchitectureStudio",
  "Interior Design Studio": "InteriorDesignStudio",
  "Real Estate Brand": "RealEstateBrand",
  "Fitness Brand / Gym": "FitnessBrandGym",
  "Travel Brand / Agency": "TravelBrandAgency",
  "Wedding Website": "WeddingWebsite",
  "Event / Conference": "EventConference",
  "Online Community": "OnlineCommunity",
};

function getFolderName(category: string): string {
  if (CATEGORY_TO_FOLDER[category]) return CATEGORY_TO_FOLDER[category];
  return category.replace(/&/g, "").replace(/\//g, "").replace(/\s+/g, "");
}

function getTemplateIndex(category: string, siteId: string): number {
  const catTemplates = templates.filter((t) => t.category === category);
  const idx = catTemplates.findIndex((t) => t.id === siteId);
  return idx !== -1 ? idx + 1 : 1;
}

function resolveModuleAndExport(folder: string, templateIndex: number, kind: string) {
  const path = `/src/components/editor/TemplatesUI/${folder}/${templateIndex}/${kind.toLowerCase()}.tsx`;
  const mod = templateModules[path];
  if (!mod) return null;

  const capitalizedKind = kind.charAt(0).toUpperCase() + kind.slice(1);
  const componentName = `${folder}${templateIndex}${capitalizedKind}`;

  if (mod[componentName]) return { path, exportName: componentName, isDefault: false };
  if (mod.default) return { path, exportName: null as string | null, isDefault: true };
  const fnKey = Object.keys(mod).find((k) => typeof mod[k] === "function");
  if (fnKey) return { path, exportName: fnKey, isDefault: false };
  return null;
}

function resolveComponentInfo(kind: string, variant?: string, category?: string, siteId?: string) {
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

const publishedEditable = `
import type { CSSProperties, ElementType, ReactNode } from "react";
export function Editable({
  value,
  as: Tag = "div",
  className,
  style,
  children,
}: {
  value?: string;
  onChange?: (value: string) => void;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const html = value ?? (typeof children === "string" ? children : undefined);
  if (html !== undefined) {
    return <Tag className={className} style={style} dangerouslySetInnerHTML={{ __html: html }} />;
  }
  return <Tag className={className} style={style}>{children}</Tag>;
}
`.trim();

const publishedPackage = JSON.stringify(
  {
    name: "portflu-viewer",
    private: true,
    version: "0.0.0",
    type: "module",
    scripts: { dev: "vite", build: "vite build" },
    dependencies: {
      "embla-carousel-autoplay": "^8.6.0",
      "embla-carousel-react": "^8.6.0",
      "framer-motion": "^12.42.2",
      "lucide-react": "^1.24.0",
      react: "^19.2.0",
      "react-dom": "^19.2.0",
      "react-icons": "^5.7.0",
    },
    devDependencies: {
      "@vitejs/plugin-react": "^5.2.0",
      typescript: "^5.8.3",
      vite: "^8.0.16",
    },
  },
  null,
  2,
);

// Placeholder token — swapped for the real URL AFTER deploy returns it.
// Never trust a pre-deploy guessed slug; Vercel/Netlify silently rename
// on collision and you won't find out until the deploy call resolves.
export const SITE_URL_PLACEHOLDER = "__SITE_URL__";

export async function buildViewerAppFiles(site: SiteData) {
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

    renderLines.push(
      `<${alias} key="${block.id}" id="${block.id}" props={${propsExpr}} theme={siteData.theme} onChange={() => {}} />`,
    );
  });

  const appTsx = `
import { useEffect } from "react";
import siteData from "./site.json";
${importLines.join("\n")}

export default function App() {
  useEffect(() => {
    fetch("https://localhost:5000/api/portfolio/track/" + siteData.id, {
      method: "POST",
      keepalive: true,
    });
  }, []);

  return (
    <main style={{ minHeight: "100vh", background: siteData.theme.bg, color: siteData.theme.ink }}>
      ${renderLines.join("\n      ")}
    </main>
  );
}
`.trim();

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
  files["src/App.tsx"] = appTsx;
  files["src/site.json"] = JSON.stringify(site, null, 2);
  files["package.json"] = publishedPackage;

  // sitemap/robots use the placeholder — resolved after real deploy URL is known
  files["public/sitemap.xml"] = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL_PLACEHOLDER}</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

  files["public/robots.txt"] = `User-agent: *
Allow: /

Sitemap: ${SITE_URL_PLACEHOLDER}/sitemap.xml`;

  if (files["index.html"]) {
    let html = files["index.html"];

    html = /<title>.*?<\/title>/.test(html)
      ? html.replace(/<title>.*?<\/title>/, `<title>${site.name || "Portfolio"}</title>`)
      : html.replace("</head>", `  <title>${site.name || "Portfolio"}</title>\n  </head>`);

    if (site.logo) {
      html = /<link rel="icon"[^>]*>/.test(html)
        ? html.replace(/<link rel="icon"[^>]*>/, `<link rel="icon" href="${site.logo}" />`)
        : html.replace("</head>", `  <link rel="icon" href="${site.logo}" />\n  </head>`);
    }

    files["index.html"] = html;
  }

  return files;
}

// Call this AFTER your deploy API call returns the real, final URL
// (Vercel/Netlify responses always include the actual assigned domain,
// suffix and all — that's your only source of truth, never a guess).
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