import type { SiteData } from "@/types/builder.schema";

// The viewer is a real React application, not an HTML export. Keeping the
// components in the generated project preserves animations and interactions.
const viewerAppBase = import.meta.glob("/viewer-app/**/*", {
    eager: true,
    query: "?raw",
    import: "default",
}) as Record<string, string>;

const blockSource = import.meta.glob("/src/components/blocks/**/*", {
    eager: true,
    query: "?raw",
    import: "default",
}) as Record<string, string>;

const viewerSource = import.meta.glob(
    ["/src/lib/blockRegistry.ts", "/src/types/builder.schema.ts"],
    {
        eager: true,
        query: "?raw",
        import: "default",
    },
) as Record<string, string>;

const publishedEditable = `
import type { CSSProperties, ElementType } from "react";

/** Read-only counterpart of the editor's Editable component. */
export function Editable({
  value,
  as: Tag = "div",
  className,
  style,
}: {
  value: string;
  onChange: (value: string) => void;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}) {
  return <Tag className={className} style={style} dangerouslySetInnerHTML={{ __html: value }} />;
}
`.trim();

const publishedPackage = JSON.stringify({
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
}, null, 2);

export async function buildViewerAppFiles(site: SiteData) {
    const appTsx = `
import siteData from "./site.json";
import { getBlockComponent } from "@/lib/blockRegistry";
import type { SiteData } from "@/types/builder.schema";

const site = siteData as unknown as SiteData;

export default function App() {
  const theme = site.theme;
  const sorted = [...site.blocks].sort((a, b) => a.order - b.order);

  return (
    <main style={{ minHeight: "100vh", background: theme.bg, color: theme.ink }}>
      {sorted.map((block) => {
        const variant = (block.props as { variant?: string }).variant;
        const Block = getBlockComponent(block.props.kind, variant);
        if (!Block) return null;

        return <Block key={block.id} id={block.id} props={block.props} theme={theme} onChange={() => {}} />;
      })}
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

    for (const [path, content] of Object.entries(blockSource)) {
        files[path.replace("/src/", "src/")] = content;
    }

    for (const [path, content] of Object.entries(viewerSource)) {
        files[path.replace("/src/", "src/")] = content;
    }

    // Blocks import this alias, so published sites cannot become editable.
    files["src/components/editor/ui/Editable.tsx"] = publishedEditable;
    files["src/App.tsx"] = appTsx;
    files["src/site.json"] = JSON.stringify(site, null, 2);
    files["package.json"] = publishedPackage;

    return files;
}
