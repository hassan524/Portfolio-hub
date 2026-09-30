export type BlockKind =
  | "navbar"
  | "hero"
  | "projects"
  | "about"
  | "services"
  | "testimonials"
  | "contact"
  | "footer"
  | "stats"
  | "spacer";

export type CornerStyle = "sharp" | "soft" | "rounded" | "pill";
export type SpacingStyle = "compact" | "cozy" | "airy";
export type Alignment = "left" | "center" | "right";

import type { PreviewEditState } from "@/types/previewEditTypes";

export type Theme = {
  bg: string;
  ink: string;
  accent: string;
  accent2?: string;
  surface?: string;
  fontHeading: string;
  fontBody: string;
  corners: CornerStyle;
  spacing: SpacingStyle;
  [key: string]: any;
};

/* =========================
   Navbar
========================= */

export type NavbarLink = {
  label: string;
  href: string;
};

export type NavbarProps = {
  kind: "navbar";
  variant: string;
  logoText: string;
  logo?: string | null;
  links: NavbarLink[];
  ctaLabel?: string;
  sticky?: boolean;
};

/* =========================
   Hero
========================= */

export type HeroProps = {
  kind: "hero";
  variant: string;
  eyebrow: string;
  name: string;
  tagline: string;
  bio: string;
  primaryCta: string;
  secondaryCta: string;
  location: string;
  availability: string;
  align: Alignment;
};

/* =========================
   Projects
========================= */

export type ProjectItem = {
  title: string;
  desc: string;
  featured?: boolean;
  category?: string;
  period?: string;
  tags?: string;
  link?: string;
  linkLabel?: string;
  badgeLabel?: string;
  skillsLabel?: string;
  intro?: string;
};

export type ProjectsProps = {
  kind: "projects";
  variant: string;
  eyebrow: string;
  heading: string;
  items: ProjectItem[];
};

/* =========================
   About
========================= */

export type ExperienceItem = {
  co: string;
  role: string;
  yr: string;
  desc?: string;
};

export type AboutProps = {
  kind: "about";
  variant: string;
  heading: string;
  paragraphs: string[];
  skills: string[];
  experience: ExperienceItem[];
};

/* =========================
   Testimonials
========================= */

export type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
};

export type TestimonialsProps = {
  kind: "testimonials";
  variant: string;
  heading: string;
  items: TestimonialItem[];
};

/* =========================
   Contact
========================= */

export type SocialItem = {
  platform: string;
  label: string;
};

export type ContactProps = {
  kind: "contact";
  variant: string;
  heading: string;
  message: string;
  socials: SocialItem[];
};

/* =========================
   Footer
========================= */

export type FooterProps = {
  kind: "footer";
  variant: string;
  heading: string;
  message: string;
  logo?: string | null;
  socials?: SocialItem[];
};

/* =========================
   Stats
========================= */

export type StatItem = {
  value: string;
  label: string;
  suffix?: string;
};

export type StatsProps = {
  kind: "stats";
  variant: string;
  heading?: string;
  items: StatItem[];
};

/* =========================
   Spacer
========================= */

export type SpacerProps = {
  kind: "spacer";
  variant: string;
  height: number;
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
  isBlended?: boolean;
  isCustom?: boolean;
};

/* =========================
   Services
========================= */

export type ServiceItem = {
  title: string;
  desc?: string;
  icon?: string;
  tags?: string[];
  [key: string]: any;
};

export type ServicesProps = {
  kind: "services";
  variant?: string;
  eyebrow?: string;
  heading?: string;
  items?: ServiceItem[];
  [key: string]: any;
};

/* =========================
   Block Union
========================= */

export type BlockProps =
  | NavbarProps
  | HeroProps
  | ProjectsProps
  | AboutProps
  | ServicesProps
  | TestimonialsProps
  | ContactProps
  | FooterProps
  | StatsProps
  | SpacerProps;

/* =========================
   Block
========================= */

export type Block = {
  id: string;
  type: string;
  order: number;
  props: BlockProps;
  height?: number;
  bgColor?: string;
  label?: string;
  isCustom?: boolean;
  name?: string;
  sectionHref?: string;
  overrides?: { style?: Record<string, unknown> };
};

/* =========================
   Site Data
========================= */

export type SiteData = {
  id: string;
  name?: string;
  category: string;
  logo: string | null;
  theme: Theme;
  blocks: Block[];
  previewEdits?: PreviewEditState;
};
