import type { SiteData } from "@/types/builder.schema";

// Eagerly imports every .json file in this folder at build time.
// Add a new template by dropping a new .json file here — no manual import needed.
const modules = import.meta.glob("./*.json", { eager: true }) as Record<
  string,
  { default: SiteData }
>;

export const templates: SiteData[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));

export function getTemplateById(id: string): SiteData | undefined {
  return templates.find((t) => t.id === id);
}

export function getTemplatesByCategory(category: string): SiteData[] {
  return templates.filter((t) => t.category === category);
}

export const allCategories: string[] = Array.from(
  new Set(templates.map((t) => t.category))
).sort();
