import type { ComponentType } from "react";
import type { BlockKind, BlockProps } from "@/types/builder.schema";
import type { BlockComponentProps } from "@/components/blocks/types";

import { Navbar1, Navbar2, Navbar3, Navbar4, Navbar5 } from "@/components/blocks/navbar";
import {
  Hero1, Hero2, Hero3, Hero4, Hero5, Hero6, Hero7, Hero8, Hero9, Hero10,
  Hero11, Hero12, Hero13, Hero14, Hero15, Hero16, Hero17, Hero18, Hero19, Hero20,
} from "@/components/blocks/hero";
import {
  Projects1, Projects2, Projects3, Projects4, Projects5, Projects6, Projects7, Projects8, Projects9, Projects10,
  Projects11, Projects12, Projects13, Projects14, Projects15, Projects16, Projects17, Projects18, Projects19, Projects20,
} from "@/components/blocks/projects";
import {
  About1, About2, About3, About4, About5, About6, About7, About8, About9, About10,
  About11, About12, About13, About14, About15, About16, About17, About18, About19, About20,
} from "@/components/blocks/about";
import {
  Contact1, Contact2, Contact3, Contact4, Contact5, Contact6, Contact7, Contact8, Contact9, Contact10,
  Contact11, Contact12, Contact13, Contact14, Contact15, Contact16, Contact17, Contact18, Contact19, Contact20,
} from "@/components/blocks/contact";
import {
  Footer1, Footer2, Footer3, Footer4, Footer5, Footer6, Footer7, Footer8, Footer9, Footer10,
  Footer11, Footer12, Footer13, Footer14, Footer15, Footer16, Footer17, Footer18, Footer19, Footer20,
} from "@/components/blocks/footer";
import {
  Testimonials1, Testimonials2, Testimonials3, Testimonials4, Testimonials5,
  Testimonials6, Testimonials7, Testimonials8, Testimonials9, Testimonials10,
  Testimonials11, Testimonials12, Testimonials13, Testimonials14, Testimonials15,
  Testimonials16, Testimonials17, Testimonials18, Testimonials19, Testimonials20,
} from "@/components/blocks/testimonials";
import { StatsCounterRow } from "@/components/blocks/stats";

type VariantMap = Record<string, ComponentType<BlockComponentProps<any>>>;

export type BlockCatalogEntry = {
  kind: BlockKind;
  variant: string;
  label: string;
  componentType: string;
  defaultProps: BlockProps;
};

export const BLOCK_REGISTRY: Partial<Record<BlockKind, VariantMap>> = {
navbar: {
  // Legacy aliases
  minimal: Navbar1,
  "centered-logo": Navbar2,
  split: Navbar3,
  mega: Navbar4,
  sidebar: Navbar5,

  // New variants
  navbar1: Navbar1,
  navbar2: Navbar2,
  navbar3: Navbar3,
  navbar4: Navbar4,
  navbar5: Navbar5,
},
  hero: {
    centered: Hero1, "split-image": Hero2, fullbleed: Hero3, terminal: Hero4, marquee: Hero5, "stacked-left": Hero6,
    "hero-1": Hero1, "hero-2": Hero2, "hero-3": Hero3, "hero-4": Hero4, "hero-5": Hero5,
    "hero-6": Hero6, "hero-7": Hero7, "hero-8": Hero8, "hero-9": Hero9, "hero-10": Hero10,
    "hero-11": Hero11, "hero-12": Hero12, "hero-13": Hero13, "hero-14": Hero14, "hero-15": Hero15,
    "hero-16": Hero16, "hero-17": Hero17, "hero-18": Hero18, "hero-19": Hero19, "hero-20": Hero20,
  },
  projects: {
    // legacy aliases
    grid: Projects1,
    "list-rows": Projects2,
    "projects-1": Projects1, "projects-2": Projects2, "projects-3": Projects3, "projects-4": Projects4, "projects-5": Projects5,
    "projects-6": Projects6, "projects-7": Projects7, "projects-8": Projects8, "projects-9": Projects9, "projects-10": Projects10,
    "projects-11": Projects11, "projects-12": Projects12, "projects-13": Projects13, "projects-14": Projects14, "projects-15": Projects15,
    "projects-16": Projects16, "projects-17": Projects17, "projects-18": Projects18, "projects-19": Projects19, "projects-20": Projects20,
  },
  about: {
    "two-column": About1, timeline: About2, "stats-side": About3,
    "about-1": About1, "about-2": About2, "about-3": About3, "about-4": About4, "about-5": About5,
    "about-6": About6, "about-7": About7, "about-8": About8, "about-9": About9, "about-10": About10,
    "about-11": About11, "about-12": About12, "about-13": About13, "about-14": About14, "about-15": About15,
    "about-16": About16, "about-17": About17, "about-18": About18, "about-19": About19, "about-20": About20,
  },
  contact: {
    "simple-links": Contact1,
    "big-email-link": Contact4,
    "contact-1": Contact1, "contact-2": Contact2, "contact-3": Contact3, "contact-4": Contact4, "contact-5": Contact5,
    "contact-6": Contact6, "contact-7": Contact7, "contact-8": Contact8, "contact-9": Contact9, "contact-10": Contact10,
    "contact-11": Contact11, "contact-12": Contact12, "contact-13": Contact13, "contact-14": Contact14, "contact-15": Contact15,
    "contact-16": Contact16, "contact-17": Contact17, "contact-18": Contact18, "contact-19": Contact19, "contact-20": Contact20,
  },
  footer: {
    minimal: Footer1,
    "footer-1": Footer1, "footer-2": Footer2, "footer-3": Footer3, "footer-4": Footer4, "footer-5": Footer5,
    "footer-6": Footer6, "footer-7": Footer7, "footer-8": Footer8, "footer-9": Footer9, "footer-10": Footer10,
    "footer-11": Footer11, "footer-12": Footer12, "footer-13": Footer13, "footer-14": Footer14, "footer-15": Footer15,
    "footer-16": Footer16, "footer-17": Footer17, "footer-18": Footer18, "footer-19": Footer19, "footer-20": Footer20,
  },
  testimonials: {
    carousel: Testimonials2,
    "grid-cards": Testimonials1,
    "testimonials-1": Testimonials1, "testimonials-2": Testimonials2, "testimonials-3": Testimonials3,
    "testimonials-4": Testimonials4, "testimonials-5": Testimonials5, "testimonials-6": Testimonials6,
    "testimonials-7": Testimonials7, "testimonials-8": Testimonials8, "testimonials-9": Testimonials9,
    "testimonials-10": Testimonials10, "testimonials-11": Testimonials11, "testimonials-12": Testimonials12,
    "testimonials-13": Testimonials13, "testimonials-14": Testimonials14, "testimonials-15": Testimonials15,
    "testimonials-16": Testimonials16, "testimonials-17": Testimonials17, "testimonials-18": Testimonials18,
    "testimonials-19": Testimonials19, "testimonials-20": Testimonials20,
  },
  stats: {
    "counter-row": StatsCounterRow,
  },
};

export function getBlockComponent(kind: string, variant?: string) {
  const variants = BLOCK_REGISTRY[kind as BlockKind];
  if (!variants) return null;
  return variants[variant ?? ""] ?? Object.values(variants)[0] ?? null;
}

export const BLOCK_CATALOG: BlockCatalogEntry[] = [
  {
    kind: "navbar",
    variant: "navbar1",
    label: "Navbar",
    componentType: "navbar",
    defaultProps: {
      kind: "navbar",
      variant: "navbar1",
      logoText: "Portfolio",
      links: [
        { label: "Work", href: "#projects" },
        { label: "About", href: "#about" },
        { label: "Contact", href: "#contact" },
      ],
      ctaLabel: "Hire me",
    },
  },
  {
    kind: "hero",
    variant: "hero-1",
    label: "Hero",
    componentType: "hero",
    defaultProps: {
      kind: "hero",
      variant: "hero-1",
      eyebrow: "Available for work",
      name: "Your Name",
      tagline: "Portfolio headline",
      bio: "A short introduction about your work and experience.",
      primaryCta: "View work",
      secondaryCta: "Contact",
      location: "Remote",
      availability: "Open",
      align: "left",
    },
  },
  {
    kind: "projects",
    variant: "projects-1",
    label: "Projects",
    componentType: "projects",
    defaultProps: {
      kind: "projects",
      variant: "projects-1",
      eyebrow: "Selected work",
      heading: "Projects",
      items: [{ title: "Project name", desc: "Short project description.", tags: ["Design"] }],
    },
  },
  {
    kind: "about",
    variant: "about-1",
    label: "About",
    componentType: "about",
    defaultProps: {
      kind: "about",
      variant: "about-1",
      heading: "About",
      paragraphs: ["Write a short paragraph about your background and approach."],
      skills: ["Strategy", "Design", "Development"],
      experience: [{ co: "Company", role: "Role", yr: "2024", desc: "What you did there." }],
    },
  },
  {
    kind: "testimonials",
    variant: "testimonials-1",
    label: "Testimonials",
    componentType: "testimonials",
    defaultProps: {
      kind: "testimonials",
      variant: "testimonials-1",
      heading: "Testimonials",
      items: [{ quote: "Great work and clear communication.", name: "Client Name", role: "Founder" }],
    },
  },
  {
    kind: "contact",
    variant: "contact-1",
    label: "Contact",
    componentType: "contact",
    defaultProps: {
      kind: "contact",
      variant: "contact-1",
      heading: "Contact",
      message: "Tell me about your next project.",
      socials: [{ platform: "email", label: "hello@example.com" }],
    },
  },
  {
    kind: "footer",
    variant: "footer-1",
    label: "Footer",
    componentType: "footer",
    defaultProps: {
      kind: "footer",
      variant: "footer-1",
      heading: "Portfolio",
      message: "Built with PortfolioHub.",
    },
  },
];
