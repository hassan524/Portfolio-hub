import type { ComponentType } from "react";
import type { BlockKind, BlockProps } from "@/types/builder.schema";
import type { BlockComponentProps } from "@/components/blocks/types";
import { templates } from "@/data/templates";

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

export function getBlockComponent(
  kind: string,
  variant?: string,
  category?: string,
  siteId?: string
): any {
  // 1. Try to find the component dynamically based on category and siteId
  if (category && siteId) {
    const folderName = getFolderName(category);
    const templateIndex = getTemplateIndex(category, siteId);
    
    // Capitalize kind (e.g. "about" -> "About")
    const capitalizedKind = kind.charAt(0).toUpperCase() + kind.slice(1);
    
    // Target component name: e.g. "AIProduct1About"
    const componentName = `${folderName}${templateIndex}${capitalizedKind}`;
    
    // Check module path
    const path = `../components/editor/TemplatesUI/${folderName}/${templateIndex}/${kind.toLowerCase()}.tsx`;
    
    const mod = templateModules[path];
    if (mod) {
      const Cmp = mod[componentName] || mod.default || Object.values(mod).find((val) => typeof val === "function");
      if (Cmp) return Cmp;
    }
  }

  // 2. Try parsing the variant if it contains the directory name and number pattern,
  // e.g. variant = "AIProduct1About" or "AIProduct1"
  if (variant) {
    for (const folder of Object.values(CATEGORY_TO_FOLDER)) {
      if (variant.startsWith(folder)) {
        const rest = variant.slice(folder.length);
        const match = rest.match(/^(\d+)/);
        if (match) {
          const templateIndex = parseInt(match[1], 10);
          const capitalizedKind = kind.charAt(0).toUpperCase() + kind.slice(1);
          const componentName = `${folder}${templateIndex}${capitalizedKind}`;
          const path = `../components/editor/TemplatesUI/${folder}/${templateIndex}/${kind.toLowerCase()}.tsx`;
          
          const mod = templateModules[path];
          if (mod) {
            const Cmp = mod[componentName] || mod.default || Object.values(mod).find((val) => typeof val === "function");
            if (Cmp) return Cmp;
          }
        }
      }
    }
  }

  // 3. Fallback to blank component if missing or empty
  return () => null;
}
