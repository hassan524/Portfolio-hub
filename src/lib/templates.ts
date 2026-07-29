import { templates } from "@/data/templates";

export const TEMPLATES = templates.map((template) =>
  Object.assign(template, {
    slug: template.id,
    palette: [
      template.theme.bg,
      template.theme.ink,
      template.theme.accent,
      template.theme.accent2,
      template.theme.surface,
    ].filter(Boolean) as string[],
  }),
);
