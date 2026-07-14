export type Template = {
  slug: string;
  name: string;
  tagline: string;
  category: "Developer" | "Designer" | "Photographer" | "Writer" | "Startup" | "Minimal";
  palette: [string, string, string];
  accent: string;
  layout: "split" | "stack" | "grid" | "editorial" | "gallery" | "mono";
  isPro?: boolean;
};

export const TEMPLATES: Template[] = [
  {
    slug: "atlas",
    name: "Atlas",
    tagline: "Editorial serif portfolio for writers & founders.",
    category: "Writer",
    palette: ["#f7f4ec", "#1a1a1a", "#c9662a"],
    accent: "#c9662a",
    layout: "editorial",
  },
  {
    slug: "orbit",
    name: "Orbit",
    tagline: "Bold, kinetic layout for product designers.",
    category: "Designer",
    palette: ["#ffffff", "#0a0a0a", "#ff5b3a"],
    accent: "#ff5b3a",
    layout: "split",
  },
  {
    slug: "monoline",
    name: "Monoline",
    tagline: "Pure typography, engineered for developers.",
    category: "Developer",
    palette: ["#fafafa", "#111111", "#3f6fdf"],
    accent: "#3f6fdf",
    layout: "mono",
  },
  {
    slug: "gallery",
    name: "Gallery",
    tagline: "Full-bleed grid for photographers.",
    category: "Photographer",
    palette: ["#ffffff", "#1c1c1c", "#a08966"],
    accent: "#a08966",
    layout: "gallery",
    isPro: true,
  },
  {
    slug: "north",
    name: "North",
    tagline: "Minimal one-page CV with quiet confidence.",
    category: "Minimal",
    palette: ["#fbfaf7", "#111111", "#6b7280"],
    accent: "#6b7280",
    layout: "stack",
  },
  {
    slug: "prism",
    name: "Prism",
    tagline: "Playful, colorful landing for creative studios.",
    category: "Startup",
    palette: ["#fff8f0", "#111111", "#e94a75"],
    accent: "#e94a75",
    layout: "grid",
    isPro: true,
  },
  {
    slug: "harbor",
    name: "Harbor",
    tagline: "Case-study-first layout for UX designers.",
    category: "Designer",
    palette: ["#f4f2ee", "#0e0e0e", "#2d6a4f"],
    accent: "#2d6a4f",
    layout: "editorial",
  },
  {
    slug: "signal",
    name: "Signal",
    tagline: "Terminal-inspired portfolio for engineers.",
    category: "Developer",
    palette: ["#0b0b0b", "#f5f5f5", "#7cffb2"],
    accent: "#7cffb2",
    layout: "mono",
    isPro: true,
  },
  {
    slug: "meridian",
    name: "Meridian",
    tagline: "Warm, human portfolio for freelancers.",
    category: "Minimal",
    palette: ["#fdf7ee", "#20140a", "#d97742"],
    accent: "#d97742",
    layout: "stack",
  },
];
