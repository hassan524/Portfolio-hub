// templates.ts
//
// Everything in one file: types, Zod runtime validation, and the one-time
// migration script for your existing 100 template JSONs.
//
// Heads up: the migration section at the bottom imports Node's fs/path.
// If this file also gets imported by browser code (TemplateLivePreview etc),
// some bundlers will choke on those imports in a client build. If that
// happens, cut everything from "// ---- CLI: migrate-templates ----" down
// into its own script file — everything above that line is browser-safe.

import { z } from "zod";

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
// Override primitives. Full shapes live here as the single source of truth
// for DEFAULT_* constants and the renderer — but a block only ever carries
// Partial<...> of these, and only the keys that actually diverge.
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
// BLOCK KIND PROPS
//
// Unchanged in shape from your original file — this part was already
// right, since it's the real per-block data that actually varies template
// to template. `variant` stays `string` until blockRegistry.ts is shared:
// generate the real per-kind union from the registry's own keys at that
// point rather than hand-authoring the enum again — that's what drifted
// out of sync last time.
// ============================================================

export type NavbarProps = {
  kind: "navbar";
  variant: string; // registry uses e.g. "navbar1"
  logoText: string;
  links: { label: string; href: string }[];
  ctaLabel?: string;
  sticky?: boolean;
};

export type HeroProps = {
  kind: "hero";
  variant: string; // e.g. "hero-20"
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
  variant: string; // e.g. "projects-20"
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
  variant: string; // e.g. "about-20"
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
  variant: string; // e.g. "testimonials-20"
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
  variant: string; // e.g. "contact-20"
  heading: string;
  message: string;
  socials: {
    platform: "email" | "github" | "linkedin" | "twitter" | "dribbble" | "instagram" | string;
    label: string;
  }[];
};

export type FooterProps = {
  kind: "footer";
  variant?: string; // e.g. "footer-20"
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

// ============================================================
// BLOCK / TEMPLATE / SITE DATA
// ============================================================

/** What lives in each of the 100 seed template JSON files. */
export type TemplateBlock = {
  id: string;
  type: string;
  order: number;
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
// (section height, per-block background, etc.) without every block on
// every template needing to carry the full object.
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

// ============================================================
// RUNTIME VALIDATION (Zod)
//
// Mirrors the types above. TS types only check the code that reads your
// JSON — they don't check the JSON itself. With 100+ template files, run
// `template.parse(json)` on every file (a small CI script or pre-commit
// hook) and bad templates fail loudly instead of rendering broken.
// ============================================================

const alignment = z.enum(["left", "center", "right"]);

export const theme = z.object({
  bg: z.string(),
  ink: z.string(),
  accent: z.string(),
  accent2: z.string().optional(),
  surface: z.string().optional(),
  fontHeading: z.string(),
  fontBody: z.string(),
  corners: z.enum(["sharp", "soft", "rounded", "pill"]),
  spacing: z.enum(["compact", "cozy", "airy"]),
});

const boxSpacing = z.object({
  top: z.number(),
  right: z.number(),
  bottom: z.number(),
  left: z.number(),
});

const blockLayout = z
  .object({
    x: z.number(),
    y: z.number(),
    width: z.string(),
    height: z.string(),
    minWidth: z.number().nullable(),
    maxWidth: z.number().nullable(),
    minHeight: z.number().nullable(),
    maxHeight: z.number().nullable(),
    padding: boxSpacing,
    margin: boxSpacing,
    display: z.enum(["flex", "grid", "block", "none"]),
    flexDirection: z.enum(["row", "column", "row-reverse", "column-reverse"]),
    alignItems: z.enum(["flex-start", "center", "flex-end", "stretch", "baseline"]),
    justifyContent: z.enum([
      "flex-start",
      "center",
      "flex-end",
      "space-between",
      "space-around",
      "space-evenly",
    ]),
    gap: z.number(),
    zIndex: z.number(),
  })
  .partial();

const blockStyle = z
  .object({
    backgroundColor: z.string().nullable(),
    backgroundImage: z.string().nullable(),
    backgroundSize: z.enum(["cover", "contain", "auto"]),
    backgroundPosition: z.string(),
    borderRadius: z.number(),
    borderWidth: z.number(),
    borderColor: z.string().nullable(),
    borderStyle: z.enum(["solid", "dashed", "dotted", "none"]),
    boxShadow: z.string().nullable(),
    opacity: z.number(),
    filter: z.string().nullable(),
    overflow: z.enum(["visible", "hidden", "auto", "scroll"]),
  })
  .partial();

const blockTypography = z
  .object({
    fontFamily: z.string().nullable(),
    fontSize: z.number().nullable(),
    fontStyle: z.enum(["normal", "italic"]).nullable(),
    fontWeight: z.number().nullable(),
    lineHeight: z.number().nullable(),
    letterSpacing: z.number().nullable(),
    textDecoration: z.enum(["none", "underline"]).nullable(),
    textAlign: alignment.nullable(),
    color: z.string().nullable(),
    textTransform: z.enum(["none", "uppercase", "lowercase", "capitalize"]),
  })
  .partial();

const blockAnimation = z
  .object({
    type: z.enum(["none", "fade", "slide-up", "slide-left", "slide-right", "scale", "blur"]),
    duration: z.number(),
    delay: z.number(),
    easing: z.string(),
    trigger: z.enum(["onView", "onLoad", "onHover", "onClick"]),
    repeat: z.boolean(),
  })
  .partial();

const responsiveOverride = z
  .object({
    layout: blockLayout,
    style: blockStyle,
    typography: blockTypography,
  })
  .partial();

const blockResponsive = z
  .object({
    desktop: responsiveOverride,
    tablet: responsiveOverride,
    mobile: responsiveOverride,
  })
  .partial();

const blockOverrides = z
  .object({
    layout: blockLayout,
    style: blockStyle,
    typography: blockTypography,
    animation: blockAnimation,
    responsive: blockResponsive,
  })
  .partial();

const blockEditorState = z.object({
  locked: z.boolean().optional(),
  visible: z.boolean().optional(),
  draggable: z.boolean().optional(),
  resizable: z.boolean().optional(),
  groupId: z.string().nullable().optional(),
  parentId: z.string().nullable().optional(),
  lastEditedAt: z.string().nullable().optional(),
});

// ---------- Per-kind props ----------

const navbarProps = z.object({
  kind: z.literal("navbar"),
  variant: z.string(),
  logoText: z.string(),
  links: z.array(z.object({ label: z.string(), href: z.string() })),
  ctaLabel: z.string().optional(),
  sticky: z.boolean().optional(),
});

const heroProps = z.object({
  kind: z.literal("hero"),
  variant: z.string(),
  eyebrow: z.string(),
  name: z.string(),
  tagline: z.string(),
  bio: z.string(),
  primaryCta: z.string(),
  secondaryCta: z.string(),
  location: z.string(),
  availability: z.string(),
  align: alignment,
  imageUrl: z.string().optional(),
});

const statsProps = z.object({
  kind: z.literal("stats"),
  variant: z.string(),
  heading: z.string().optional(),
  items: z.array(z.object({ label: z.string(), value: z.string(), suffix: z.string().optional() })),
});

const projectsProps = z.object({
  kind: z.literal("projects"),
  variant: z.string(),
  eyebrow: z.string(),
  heading: z.string(),
  items: z.array(
    z.object({
      title: z.string(),
      desc: z.string(),
      tags: z.array(z.string()).optional(),
      year: z.string().optional(),
      link: z.string().optional(),
      imageUrl: z.string().optional(),
      featured: z.boolean().optional(),
    }),
  ),
});

const galleryProps = z.object({
  kind: z.literal("gallery"),
  variant: z.string(),
  heading: z.string(),
  items: z.array(
    z.object({
      imageUrl: z.string(),
      caption: z.string().optional(),
      category: z.string().optional(),
    }),
  ),
});

const aboutProps = z.object({
  kind: z.literal("about"),
  variant: z.string(),
  heading: z.string(),
  paragraphs: z.array(z.string()),
  skills: z.array(z.string()),
  experience: z.array(
    z.object({ co: z.string(), role: z.string(), yr: z.string(), desc: z.string().optional() }),
  ),
  imageUrl: z.string().optional(),
});

const servicesProps = z.object({
  kind: z.literal("services"),
  variant: z.string(),
  eyebrow: z.string(),
  heading: z.string(),
  items: z.array(z.object({ title: z.string(), desc: z.string(), icon: z.string().optional() })),
});

const processProps = z.object({
  kind: z.literal("process"),
  variant: z.string(),
  heading: z.string(),
  steps: z.array(z.object({ title: z.string(), desc: z.string(), step: z.number() })),
});

const testimonialsProps = z.object({
  kind: z.literal("testimonials"),
  variant: z.string(),
  heading: z.string(),
  items: z.array(
    z.object({
      quote: z.string(),
      name: z.string(),
      role: z.string(),
      avatarUrl: z.string().optional(),
    }),
  ),
});

const pricingProps = z.object({
  kind: z.literal("pricing"),
  variant: z.string(),
  heading: z.string(),
  tiers: z.array(
    z.object({
      name: z.string(),
      price: z.string(),
      period: z.string().optional(),
      features: z.array(z.string()),
      highlighted: z.boolean().optional(),
      ctaLabel: z.string(),
    }),
  ),
});

const faqProps = z.object({
  kind: z.literal("faq"),
  variant: z.string(),
  heading: z.string(),
  items: z.array(z.object({ q: z.string(), a: z.string() })),
});

const logosProps = z.object({
  kind: z.literal("logos"),
  variant: z.string(),
  heading: z.string().optional(),
  items: z.array(z.object({ name: z.string(), imageUrl: z.string().optional() })),
});

const blogProps = z.object({
  kind: z.literal("blog"),
  variant: z.string(),
  heading: z.string(),
  items: z.array(
    z.object({
      title: z.string(),
      excerpt: z.string(),
      date: z.string(),
      readTime: z.string().optional(),
      link: z.string().optional(),
    }),
  ),
});

const ctaProps = z.object({
  kind: z.literal("cta"),
  variant: z.string(),
  heading: z.string(),
  message: z.string(),
  ctaLabel: z.string(),
});

// Free-form: the registry has a known set of platforms, but a new one
// shouldn't fail validation of the whole file.
const socialPlatform = z.string();

const contactProps = z.object({
  kind: z.literal("contact"),
  variant: z.string(),
  heading: z.string(),
  message: z.string(),
  socials: z.array(z.object({ platform: socialPlatform, label: z.string() })),
});

const footerProps = z.object({
  kind: z.literal("footer"),
  variant: z.string().optional(),
  heading: z.string(),
  message: z.string().optional(),
  socials: z
    .array(z.object({ platform: socialPlatform, label: z.string(), href: z.string().optional() }))
    .optional(),
});

export const blockProps = z.discriminatedUnion("kind", [
  navbarProps,
  heroProps,
  statsProps,
  projectsProps,
  galleryProps,
  aboutProps,
  servicesProps,
  processProps,
  testimonialsProps,
  pricingProps,
  faqProps,
  logosProps,
  blogProps,
  ctaProps,
  contactProps,
  footerProps,
]);

// ---------- Block / Template / SiteData ----------

export const templateBlock = z.object({
  id: z.string(),
  type: z.string(),
  order: z.number(),
  props: blockProps,
  overrides: blockOverrides.optional(),
});

export const template = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  tagline: z.string(),
  isPro: z.boolean(),
  theme,
  blocks: z.array(templateBlock),
});

export const editableBlock = templateBlock.extend({
  editor: blockEditorState.optional(),
  typography: blockTypography.optional(),
});

export const siteData = template.extend({
  blocks: z.array(editableBlock),
  previewEdits: z.any().optional(),
});

export type TemplateParsed = z.infer<typeof template>;
export type TemplateBlockParsed = z.infer<typeof templateBlock>;

// ============================================================
// CLI: migrate-templates
//
// One-time batch conversion of your existing verbose template JSONs into
// the lean shape above. For every block, this:
//   1. Diffs layout/style/typography/animation against the DEFAULT_*
//      constants (deep, so nested padding/margin compare key by key) and
//      keeps only keys that actually differ, nested under `overrides`.
//   2. Drops empty responsive breakpoints ({}), keeps only real ones.
//   3. Drops `overrides` entirely if nothing on the block diverged.
//   4. Drops `editor` entirely — live-editor state, not template content.
//
// Usage: npx tsx templates.ts <inputDir> <outputDir>
// Run it against a copy first and spot-check a few files before pointing
// it at your real templates directory.
// ============================================================

import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, basename } from "node:path";

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** Shallow-per-key diff, recursing one level into nested plain objects (covers padding/margin). Returns undefined if nothing differs. */
function diff<T extends Record<string, unknown>>(
  actual: T | undefined,
  base: T,
): Partial<T> | undefined {
  if (!actual) return undefined;
  const out: Record<string, unknown> = {};
  for (const key of Object.keys(base)) {
    const a = actual[key];
    const b = (base as Record<string, unknown>)[key];
    if (isPlainObject(a) && isPlainObject(b)) {
      const nested = diff(a as Record<string, unknown>, b as Record<string, unknown>);
      if (nested) out[key] = nested;
    } else if (JSON.stringify(a) !== JSON.stringify(b)) {
      out[key] = a;
    }
  }
  return Object.keys(out).length > 0 ? (out as Partial<T>) : undefined;
}

function migrateResponsive(responsive: unknown): unknown {
  if (!isPlainObject(responsive)) return undefined;
  const out: Record<string, unknown> = {};
  for (const bp of ["desktop", "tablet", "mobile"]) {
    const val = responsive[bp];
    if (isPlainObject(val) && Object.keys(val).length > 0) out[bp] = val;
  }
  return Object.keys(out).length > 0 ? out : undefined;
}

function migrateBlock(block: Record<string, unknown>): Record<string, unknown> {
  const { layout, style, typography, animation, responsive, editor, ...rest } = block as Record<
    string,
    any
  >;

  const overrides: Record<string, unknown> = {};
  const layoutDiff = diff(layout, DEFAULT_BLOCK_LAYOUT);
  const styleDiff = diff(style, DEFAULT_BLOCK_STYLE);
  const typographyDiff = diff(typography, DEFAULT_BLOCK_TYPOGRAPHY);
  const animationDiff = diff(animation, DEFAULT_BLOCK_ANIMATION);
  const responsiveDiff = migrateResponsive(responsive);

  if (layoutDiff) overrides.layout = layoutDiff;
  if (styleDiff) overrides.style = styleDiff;
  if (typographyDiff) overrides.typography = typographyDiff;
  if (animationDiff) overrides.animation = animationDiff;
  if (responsiveDiff) overrides.responsive = responsiveDiff;

  // `editor` is intentionally dropped — see TemplateTypes.ts.
  return Object.keys(overrides).length > 0 ? { ...rest, overrides } : rest;
}

function migrateTemplate(input: Record<string, unknown>): Record<string, unknown> {
  const blocks = (input.blocks as Record<string, unknown>[]).map(migrateBlock);
  return { ...input, blocks };
}

function main() {
  const [, , inDir, outDir] = process.argv;
  if (!inDir || !outDir) {
    console.error("Usage: npx tsx templates.ts <inputDir> <outputDir>");
    process.exit(1);
  }
  mkdirSync(outDir, { recursive: true });

  const files = readdirSync(inDir).filter((f) => f.endsWith(".json"));
  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const raw = readFileSync(join(inDir, file), "utf8");
    const before = raw.length;
    const parsed = JSON.parse(raw);
    const migrated = migrateTemplate(parsed);
    const output = JSON.stringify(migrated, null, 2);
    writeFileSync(join(outDir, basename(file)), output, "utf8");
    totalBefore += before;
    totalAfter += output.length;
    console.log(`${file}: ${before}b -> ${output.length}b`);
  }

  console.log(
    `\n${files.length} files migrated. Total ${totalBefore}b -> ${totalAfter}b (${Math.round(
      (1 - totalAfter / totalBefore) * 100,
    )}% smaller).`,
  );
}

// Only runs the migration when this file is executed directly
// (`npx tsx templates.ts in out`) — importing it elsewhere for the types or
// Zod schemas above will not trigger it.
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
