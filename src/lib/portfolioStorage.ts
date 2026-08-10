import {
  DEFAULT_PORTFOLIOS,
  type Portfolio,
  type Project,
} from "@/components/individual/dashboard/ui/types";
import type { ProjectItem, SiteData } from "@/types/builder.schema";

const PORTFOLIOS_STORAGE_KEY = "portfolios_list";

export function getStoredPortfolios(): Portfolio[] {
  if (typeof window === "undefined") return DEFAULT_PORTFOLIOS;

  const saved = localStorage.getItem(PORTFOLIOS_STORAGE_KEY);
  if (!saved) return DEFAULT_PORTFOLIOS;

  try {
    return JSON.parse(saved);
  } catch {
    return DEFAULT_PORTFOLIOS;
  }
}

export function saveStoredPortfolios(portfolios: Portfolio[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PORTFOLIOS_STORAGE_KEY, JSON.stringify(portfolios));
}

export function createPortfolioFromSite(site: SiteData): Portfolio {
  const hero = site.blocks.find((block) => block.props.kind === "hero")?.props;
  const projectsBlock = site.blocks.find((block) => block.props.kind === "projects")?.props;
  const projects =
    projectsBlock?.kind === "projects"
      ? projectsBlock.items.map((project, index) => projectItemToPortfolioProject(project, index))
      : [];
  const subdomain = toSubdomain(site.name);

  return {
    id: `portfolio-${Date.now()}`,
    name: site.name,
    url: `${subdomain}.portflu.app`,
    subdomain,
    status: "Draft",
    template: site.id,
    lastUpdated: "Just now",
    headline: hero?.kind === "hero" ? hero.tagline : site.tagline,
    bio: hero?.kind === "hero" ? hero.bio : site.tagline,
    projects,
    showProjects: projects.length > 0,
    showContact: site.blocks.some((block) => block.props.kind === "contact"),
    templateData: structuredClone(site),
  };
}

export function saveSiteAsPortfolio(site: SiteData): Portfolio {
  const portfolio = createPortfolioFromSite(site);
  saveStoredPortfolios([portfolio, ...getStoredPortfolios()]);
  return portfolio;
}

function projectItemToPortfolioProject(project: ProjectItem, index: number): Project {
  return {
    id: `project-${Date.now()}-${index}`,
    name: project.title,
    desc: project.desc,
  };
}

function toSubdomain(value: string) {
  const slug = value
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return slug || "portfolio";
}
