import type { SiteData } from "@/types/builder.schema";

// Eagerly imports every .json file in this folder at build time.
// Add a new template by dropping a new .json file here — no manual import needed.
const modules = import.meta.glob("./*.json", { eager: true }) as Record<
  string,
  { default: SiteData }
>;

export function getTemplateNumber(t: SiteData): number {
  if (t.blocks) {
    for (const b of t.blocks) {
      const v = (b as any)?.props?.variant;
      if (typeof v === "string") {
        const m = v.match(/(\d+)/);
        if (m) return parseInt(m[1], 10);
      }
    }
  }
  return 1;
}

export function normalizeBlockOrder(t: SiteData): SiteData {
  if (!t.blocks || !t.blocks.length) return t;
  const blocks = [...t.blocks];
  const pIndex = blocks.findIndex(
    (b) => b.props?.kind === "projects" || b.type?.toLowerCase().includes("project")
  );
  const aIndex = blocks.findIndex(
    (b) => b.props?.kind === "about" || b.type?.toLowerCase().includes("about")
  );

  if (pIndex !== -1 && aIndex !== -1 && pIndex < aIndex) {
    const pOrder = blocks[pIndex].order;
    const aOrder = blocks[aIndex].order;
    blocks[pIndex].order = aOrder;
    blocks[aIndex].order = pOrder;
    blocks.sort((a, b) => a.order - b.order);
    blocks.forEach((b, idx) => {
      b.order = idx;
    });
    return { ...t, blocks };
  }
  return t;
}

export const templates: SiteData[] = Object.values(modules)
  .map((m) => normalizeBlockOrder(m.default))
  .sort((a, b) => {
    const catComp = (a.category ?? "").localeCompare(b.category ?? "");
    if (catComp !== 0) return catComp;
    const numA = getTemplateNumber(a);
    const numB = getTemplateNumber(b);
    if (numA !== numB) return numA - numB;
    return (a.id ?? "").localeCompare(b.id ?? "");
  });

export function getTemplateById(id: string): SiteData | undefined {
  return templates.find((t) => t.id === id);
}

export function getTemplatesByCategory(category: string): SiteData[] {
  return templates.filter((t) => t.category === category);
}

export const allCategories: string[] = Array.from(
  new Set(templates.map((t) => t.category).filter(Boolean))
).sort((a, b) => a.localeCompare(b));
