import type { ComponentType } from "react";
import type { BlockKind, BlockProps } from "@/types/builder.schema";
import type { BlockComponentProps } from "@/components/blocks/types";
import { templates } from "@/data/templates";
import { SpacerBlock } from "@/components/blocks/spacer";

// Eagerly glob import all template components from components/editor/TemplatesUI
const templateModules = import.meta.glob("../components/editor/TemplatesUI/**/*.tsx", { eager: true }) as Record<
  string,
  any
>;

type VariantMap = Record<string, ComponentType<BlockComponentProps<any>>>;

export type BlockCatalogEntry = {
  kind: BlockKind;
  variant: string;
  label: string;
  componentType: string;
  defaultProps: BlockProps;
};

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
  if (CATEGORY_TO_FOLDER[category]) {
    return CATEGORY_TO_FOLDER[category];
  }
  return category
    .replace(/&/g, "")
    .replace(/\//g, "")
    .replace(/\s+/g, "");
}

function getTemplateIndex(category: string, siteId: string): number {
  const catTemplates = templates.filter((t) => t.category === category);
  const idx = catTemplates.findIndex((t) => t.id === siteId);
  return idx !== -1 ? idx + 1 : 1;
}

export function isExportEmpty(fn: any): boolean {
  if (typeof fn !== "function") return true;
  try {
    const res = fn({});
    if (res === null || res === undefined || res === false) return true;
  } catch {
    return false;
  }
  return false;
}

const FOLDERS = Object.values(CATEGORY_TO_FOLDER).sort((a, b) => b.length - a.length);

function loadTemplateComponent(folder: string, index: number, kind: string) {
  const cap = kind.charAt(0).toUpperCase() + kind.slice(1);
  const path = `../components/editor/TemplatesUI/${folder}/${index}/${kind.toLowerCase()}.tsx`;
  const mod = templateModules[path];
  if (!mod) return null;
  const Cmp =
    mod[`${folder}${index}${cap}`] ||
    mod.default ||
    Object.values(mod).find((v) => typeof v === "function");
  return Cmp && !isExportEmpty(Cmp) ? Cmp : null;
}

export function getBlockComponent(
  kind: string,
  variant?: string,
  category?: string,
  siteId?: string
): any {
  // 1. variant is the source of truth: "ArchitectureStudio3Hero" -> folder + 3
  if (variant) {
    for (const folder of FOLDERS) {
      if (!variant.startsWith(folder)) continue;
      const m = variant.slice(folder.length).match(/^(\d+)/);
      if (!m) continue;
      const Cmp = loadTemplateComponent(folder, parseInt(m[1], 10), kind);
      if (Cmp) return Cmp;
    }
  }

  // 2. fallback: category + position in templates array
  if (category && siteId) {
    const Cmp = loadTemplateComponent(
      getFolderName(category),
      getTemplateIndex(category, siteId),
      kind,
    );
    if (Cmp) return Cmp;
  }

  // 3. spacer fallback
  if (kind.toLowerCase() === "spacer") return SpacerBlock;

  return null;
}
