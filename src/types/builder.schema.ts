export type BlockKind =
  | "navbar"
  | "hero"
  | "projects"
  | "about"
  | "testimonials"
  | "contact"
  | "footer"
  | "stats"
  | "spacer";

export type CornerStyle = "sharp" | "soft" | "rounded" | "pill";
export type SpacingStyle = "compact" | "cozy" | "airy";
export type Alignment = "left" | "center" | "right";

export type Theme = {
  bg: string;
  ink: string;
  accent: string;
  fontHeading: string;
  fontBody: string;
  corners: CornerStyle;
  spacing: SpacingStyle;
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
  links: NavbarLink[];
  ctaLabel?: string;
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
};

/* =========================
   Stats
========================= */

export type StatItem = {
  value: string;
  label: string;
};

export type StatsProps = {
  kind: "stats";
  variant: string;
  items: StatItem[];
};

/* =========================
   Spacer
========================= */

export type SpacerProps = {
  kind: "spacer";
  variant: string;
  height: number;
};

/* =========================
   Block Union
========================= */

export type BlockProps =
  | NavbarProps
  | HeroProps
  | ProjectsProps
  | AboutProps
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
  type: BlockKind;
  order: number;
  props: BlockProps;
  height?: number;
  label?: string;
  isCustom?: boolean;
  name?: string;
};

/* =========================
   Site Data
========================= */

export type SiteData = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  isPro: boolean;
  theme: Theme;
  blocks: Block[];
};