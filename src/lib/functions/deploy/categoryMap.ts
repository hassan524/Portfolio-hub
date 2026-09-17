

export const CATEGORY_TO_FOLDER: Record<string, string> = {
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

export function getFolderName(category: string): string {
    if (CATEGORY_TO_FOLDER[category]) return CATEGORY_TO_FOLDER[category];
    return category.replace(/&/g, "").replace(/\//g, "").replace(/\s+/g, "");
}