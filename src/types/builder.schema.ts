// templates.ts
// Full type system: layout, style, typography, animation, overrides, editor state.
// No zod validation, no migration CLI — just types.

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

// ============================================================
// Override primitives — full shapes here are the single source of truth
// for DEFAULT_* constants and the renderer. A block only ever carries
// Partial<...> of these under `overrides`, and only keys that diverge.
// ============================================================

export type BoxSpacing = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type BlockLayout = {
  x: number;
  y: number;
  width: string; // e.g. "100%", "480px"
  height: string; // e.g. "auto", "600px"
  minWidth: number | null;
  maxWidth: number | null;
  minHeight: number | null;
  maxHeight: number | null;
  padding: BoxSpacing;
  margin: BoxSpacing;
  display: "flex" | "grid" | "block" | "none";
  flexDirection: "row" | "column" | "row-reverse" | "column-reverse";
  alignItems: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  justifyContent:
    "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
  gap: number;
  zIndex: number;
};

export type BlockStyle = {
  backgroundColor: string | null;
  backgroundImage: string | null;
  backgroundSize: "cover" | "contain" | "auto";
  backgroundPosition: string;
  borderRadius: number;
  borderWidth: number;
  borderColor: string | null;
  borderStyle: "solid" | "dashed" | "dotted" | "none";
  boxShadow: string | null;
  opacity: number;
  filter: string | null;
  overflow: "visible" | "hidden" | "auto" | "scroll";
};

export type BlockTypography = {
  fontFamily: string | null;
  fontSize: number | null;
  fontStyle: "normal" | "italic" | null;
  fontWeight: number | null;
  lineHeight: number | null;
  letterSpacing: number | null;
  textDecoration: "none" | "underline" | null;
  textAlign: Alignment | null;
  color: string | null;
  textTransform: "none" | "uppercase" | "lowercase" | "capitalize";
};

export type AnimationType =
  "none" | "fade" | "slide-up" | "slide-left" | "slide-right" | "scale" | "blur";
export type AnimationTrigger = "onView" | "onLoad" | "onHover" | "onClick";

export type BlockAnimation = {
  type: AnimationType;
  duration: number; // ms
  delay: number; // ms
  easing: string; // e.g. "ease-out"
  trigger: AnimationTrigger;
  repeat: boolean;
};

/** Per-breakpoint patch on top of the resolved base layout/style/typography. Omit a breakpoint entirely if it overrides nothing — never store `{}`. */
export type ResponsiveOverride = Partial<{
  layout: Partial<BlockLayout>;
  style: Partial<BlockStyle>;
  typography: Partial<BlockTypography>;
}>;

export type BlockResponsive = Partial<{
  desktop: ResponsiveOverride;
  tablet: ResponsiveOverride;
  mobile: ResponsiveOverride;
}>;

/** Sparse per-block customization. A block that doesn't customize anything has no `overrides` key at all. */
export type BlockOverrides = {
  layout?: Partial<BlockLayout>;
  style?: Partial<BlockStyle>;
  typography?: Partial<BlockTypography>;
  animation?: Partial<BlockAnimation>;
  responsive?: BlockResponsive;
};

/** Live-editor-only UI state. Never present in a seed template — only appears once a user's SiteData has actually been touched in the builder. */
export type BlockEditorState = {
  locked?: boolean;
  visible?: boolean;
  draggable?: boolean;
  resizable?: boolean;
  groupId?: string | null;
  parentId?: string | null;
  lastEditedAt?: string | null;
};

export type PreviewElementStyle = {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string | null;
  backgroundColor?: string | null;
  backgroundImage?: string | null;
  borderRadius?: number | null;
  padding?: number | null;
  width?: string | null;
  height?: string | null;
  x?: number;
  y?: number;
  removed?: boolean;
};

export type PreviewElementEdit = {
  id: string;
  blockId: string;
  blockKind: BlockKind;
  label: string;
  style: PreviewElementStyle;
};

export type PreviewEditState = {
  analyzedAt: string;
  blocks: {
    id: string;
    kind: BlockKind;
    variant?: string;
    order: number;
  }[];
  elements: Record<string, PreviewElementEdit>;
};

// ============================================================
// BLOCK KIND PROPS — actual content for each section type
// ============================================================

export type NavbarProps = {
  kind: "navbar";
  variant: string;
  logoText: string;
  links: { label: string; href: string }[];
  ctaLabel?: string;
  sticky?: boolean;
};

export type SpacerProps = {
  kind: "spacer";
  backgroundColor?: string;
};

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
  imageUrl?: string;
};

export type StatItem = { label: string; value: string; suffix?: string };
export type StatsProps = {
  kind: "stats";
  variant: string;
  heading?: string;
  items: StatItem[];
};

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
  variant: string;
  eyebrow: string;
  heading: string;
  items: ProjectItem[];
};

export type GalleryItem = { imageUrl: string; caption?: string; category?: string };
export type GalleryProps = {
  kind: "gallery";
  variant: string;
  heading: string;
  items: GalleryItem[];
};

export type ExperienceItem = { co: string; role: string; yr: string; desc?: string };
export type AboutProps = {
  kind: "about";
  variant: string;
  heading: string;
  paragraphs: string[];
  skills: string[];
  experience: ExperienceItem[];
  imageUrl?: string;
};

export type ServiceItem = { title: string; desc: string; icon?: string };
export type ServicesProps = {
  kind: "services";
  variant: string;
  eyebrow: string;
  heading: string;
  items: ServiceItem[];
};

export type ProcessStep = { title: string; desc: string; step: number };
export type ProcessProps = {
  kind: "process";
  variant: string;
  heading: string;
  steps: ProcessStep[];
};

export type TestimonialItem = { quote: string; name: string; role: string; avatarUrl?: string };
export type TestimonialsProps = {
  kind: "testimonials";
  variant: string;
  heading: string;
  items: TestimonialItem[];
};

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
  variant: string;
  heading: string;
  tiers: PricingTier[];
};

export type FaqItem = { q: string; a: string };
export type FaqProps = {
  kind: "faq";
  variant: string;
  heading: string;
  items: FaqItem[];
};

export type LogosProps = {
  kind: "logos";
  variant: string;
  heading?: string;
  items: { name: string; imageUrl?: string }[];
};

export type BlogItem = {
  title: string;
  excerpt: string;
  date: string;
  readTime?: string;
  link?: string;
};
export type BlogProps = {
  kind: "blog";
  variant: string;
  heading: string;
  items: BlogItem[];
};

export type CtaProps = {
  kind: "cta";
  variant: string;
  heading: string;
  message: string;
  ctaLabel: string;
};

export type ContactProps = {
  kind: "contact";
  variant: string;
  heading: string;
  message: string;
  socials: {
    platform: "email" | "github" | "linkedin" | "twitter" | "dribbble" | "instagram" | string;
    label: string;
  }[];
};

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
  | FooterProps
  | SpacerProps;

export type BlockKind = BlockProps["kind"];

// ============================================================
// BLOCK / TEMPLATE / SITE DATA
// ============================================================

/** What lives in each of the 100 seed template JSON files. */
export type TemplateBlock = {
  id: string;
  type: string;
  order: number;
  /** Real rendered height in px — auto-measured from the DOM, also user-editable. */
  height?: number;
  /** User-customizable display label/name for the block. */
  label?: string;
  name?: string;
  isCustom?: boolean;
  props: BlockProps;
  /** Omit entirely unless this template intentionally departs from the variant's default look. */
  overrides?: BlockOverrides;
};

export type Template = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  isPro: boolean;
  theme: Theme;
  blocks: TemplateBlock[];
};

/** A user's in-progress document once they start customizing in the builder — a template block plus live-editor UI state. */
export type EditableBlock = TemplateBlock & {
  editor?: BlockEditorState;
  typography?: Partial<BlockTypography>;
};

export type Block = EditableBlock;

export type SiteData = Omit<Template, "blocks"> & {
  blocks: EditableBlock[];
  previewEdits?: PreviewEditState;
};

// ============================================================
// Defaults + resolvers — the renderer can consume overrides incrementally
// without every block needing to carry the full object.
// ============================================================

export const DEFAULT_BLOCK_LAYOUT: BlockLayout = {
  x: 0,
  y: 0,
  width: "100%",
  height: "auto",
  minWidth: null,
  maxWidth: null,
  minHeight: null,
  maxHeight: null,
  padding: { top: 0, right: 0, bottom: 0, left: 0 },
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "flex-start",
  gap: 0,
  zIndex: 0,
};

export const DEFAULT_BLOCK_STYLE: BlockStyle = {
  backgroundColor: null,
  backgroundImage: null,
  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: 0,
  borderWidth: 0,
  borderColor: null,
  borderStyle: "solid",
  boxShadow: null,
  opacity: 1,
  filter: null,
  overflow: "visible",
};

export const DEFAULT_BLOCK_TYPOGRAPHY: BlockTypography = {
  fontFamily: null,
  fontSize: null,
  fontStyle: null,
  fontWeight: null,
  lineHeight: null,
  letterSpacing: null,
  textDecoration: null,
  textAlign: null,
  color: null,
  textTransform: "none",
};

export const DEFAULT_BLOCK_ANIMATION: BlockAnimation = {
  type: "none",
  duration: 400,
  delay: 0,
  easing: "ease-out",
  trigger: "onView",
  repeat: false,
};

export const DEFAULT_EDITOR_STATE: Required<BlockEditorState> = {
  locked: false,
  visible: true,
  draggable: true,
  resizable: true,
  groupId: null,
  parentId: null,
  lastEditedAt: null,
};

export function resolveBlockLayout(block: TemplateBlock): BlockLayout {
  return { ...DEFAULT_BLOCK_LAYOUT, ...block.overrides?.layout };
}

export function resolveBlockStyle(block: TemplateBlock): BlockStyle {
  return { ...DEFAULT_BLOCK_STYLE, ...block.overrides?.style };
}

export function resolveBlockTypography(block: TemplateBlock): BlockTypography {
  return { ...DEFAULT_BLOCK_TYPOGRAPHY, ...block.overrides?.typography };
}

export function resolveBlockAnimation(block: TemplateBlock): BlockAnimation {
  return { ...DEFAULT_BLOCK_ANIMATION, ...block.overrides?.animation };
}

export function resolveEditorState(block: EditableBlock): Required<BlockEditorState> {
  return { ...DEFAULT_EDITOR_STATE, ...block.editor };
}