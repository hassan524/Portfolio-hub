// TemplateTypes.ts

export type CornerStyle = "sharp" | "soft" | "rounded" | "pill";
export type SpacingStyle = "compact" | "cozy" | "airy";
export type Alignment = "left" | "center" | "right";

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
};

// ---------- NAVBAR ----------
export type NavbarVariant = "minimal" | "centered-logo" | "split" | "mega" | "sidebar";
export type NavbarProps = {
  kind: "navbar";
  variant: NavbarVariant;
  logoText: string;
  links: { label: string; href: string }[];
  ctaLabel?: string;
  sticky?: boolean;
};

// ---------- HERO ----------
export type HeroVariant = "centered" | "split-image" | "fullbleed" | "terminal" | "marquee" | "stacked-left";
export type HeroProps = {
  kind: "hero";
  variant: HeroVariant;
  eyebrow: string;
  name: string;
  tagline: string;
  bio: string;
  primaryCta: string;
  secondaryCta: string;
  location: string;
  availability: string;
  align: Alignment;
  imageUrl?: string;
};

// ---------- STATS ----------
export type StatsVariant = "counter-row" | "bar-inline" | "big-numbers";
export type StatItem = { label: string; value: string; suffix?: string };
export type StatsProps = {
  kind: "stats";
  variant: StatsVariant;
  heading?: string;
  items: StatItem[];
};

// ---------- PROJECTS / GALLERY ----------
export type ProjectsVariant = "grid" | "list-rows" | "case-study" | "masonry" | "carousel";
export type ProjectItem = {
  title: string;
  desc: string;
  tags?: string[];
  year?: string;
  link?: string;
  imageUrl?: string;
  featured?: boolean;
};
export type ProjectsProps = {
  kind: "projects";
  variant: ProjectsVariant;
  eyebrow: string;
  heading: string;
  items: ProjectItem[];
};

export type GalleryVariant = "masonry" | "filterable-grid" | "lightbox-strip" | "fullwidth-scroll";
export type GalleryItem = { imageUrl: string; caption?: string; category?: string };
export type GalleryProps = {
  kind: "gallery";
  variant: GalleryVariant;
  heading: string;
  items: GalleryItem[];
};

// ---------- ABOUT ----------
export type AboutVariant = "two-column" | "timeline" | "stats-side" | "photo-bio";
export type ExperienceItem = { co: string; role: string; yr: string; desc?: string };
export type AboutProps = {
  kind: "about";
  variant: AboutVariant;
  heading: string;
  paragraphs: string[];
  skills: string[];
  experience: ExperienceItem[];
  imageUrl?: string;
};

// ---------- SERVICES ----------
export type ServicesVariant = "icon-grid" | "numbered-list" | "cards-hover";
export type ServiceItem = { title: string; desc: string; icon?: string };
export type ServicesProps = {
  kind: "services";
  variant: ServicesVariant;
  eyebrow: string;
  heading: string;
  items: ServiceItem[];
};

// ---------- PROCESS ----------
export type ProcessVariant = "vertical-steps" | "horizontal-steps" | "numbered-cards";
export type ProcessStep = { title: string; desc: string; step: number };
export type ProcessProps = {
  kind: "process";
  variant: ProcessVariant;
  heading: string;
  steps: ProcessStep[];
};

// ---------- TESTIMONIALS ----------
export type TestimonialsVariant = "carousel" | "grid-cards" | "single-quote" | "marquee-scroll";
export type TestimonialItem = { quote: string; name: string; role: string; avatarUrl?: string };
export type TestimonialsProps = {
  kind: "testimonials";
  variant: TestimonialsVariant;
  heading: string;
  items: TestimonialItem[];
};

// ---------- PRICING ----------
export type PricingVariant = "tier-cards" | "comparison-table" | "single-cta";
export type PricingTier = {
  name: string;
  price: string;
  period?: string;
  features: string[];
  highlighted?: boolean;
  ctaLabel: string;
};
export type PricingProps = {
  kind: "pricing";
  variant: PricingVariant;
  heading: string;
  tiers: PricingTier[];
};

// ---------- FAQ ----------
export type FaqVariant = "accordion" | "two-column-list";
export type FaqItem = { q: string; a: string };
export type FaqProps = {
  kind: "faq";
  variant: FaqVariant;
  heading: string;
  items: FaqItem[];
};

// ---------- LOGOS / CLIENTS ----------
export type LogosVariant = "row-static" | "marquee-scroll" | "grid";
export type LogosProps = {
  kind: "logos";
  variant: LogosVariant;
  heading?: string;
  items: { name: string; imageUrl?: string }[];
};

// ---------- BLOG / WRITING ----------
export type BlogVariant = "card-grid" | "list-minimal" | "featured-plus-list";
export type BlogItem = { title: string; excerpt: string; date: string; readTime?: string; link?: string };
export type BlogProps = {
  kind: "blog";
  variant: BlogVariant;
  heading: string;
  items: BlogItem[];
};

// ---------- CTA BANNER ----------
export type CtaVariant = "centered-banner" | "split-with-image" | "gradient-fullwidth";
export type CtaProps = {
  kind: "cta";
  variant: CtaVariant;
  heading: string;
  message: string;
  ctaLabel: string;
};

// ---------- CONTACT ----------
export type ContactVariant = "simple-links" | "form-and-info" | "big-email-link";
export type ContactProps = {
  kind: "contact";
  variant: ContactVariant;
  heading: string;
  message: string;
  socials: { platform: "email" | "github" | "linkedin" | "twitter" | "dribbble" | "instagram" | string; label: string }[];
};

// ---------- FOOTER ----------
export type FooterVariant = "minimal" | "columns" | "cta-repeat";
export type FooterProps = {
  kind: "footer";
  variant?: string;
  heading: string;
  message?: string;
  socials?: {
    platform: "github" | "linkedin" | "email" | "twitter" | "instagram" | "dribbble" | string;
    label: string;
    href?: string;
  }[];
};

export type BlockProps =
  | NavbarProps
  | HeroProps
  | StatsProps
  | ProjectsProps
  | GalleryProps
  | AboutProps
  | ServicesProps
  | ProcessProps
  | TestimonialsProps
  | PricingProps
  | FaqProps
  | LogosProps
  | BlogProps
  | CtaProps
  | ContactProps
  | FooterProps;

export type BlockKind = BlockProps["kind"];

export type Block = {
  id: string;
  type: string;
  order: number;
  props: BlockProps;
};

export type SiteData = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  isPro: boolean;
  theme: Theme;
  blocks: Block[];
};