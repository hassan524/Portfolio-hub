// Centralized font resolution and loading utility

export interface ResolvedFont {
  fontFamily: string;
  className: string;
  googleFontFamily: string;
  key: string;
}

interface FontDefinition {
  family: string;
  className: string;
  googleFont: string;
  aliases: string[];
}

const FONT_DEFINITIONS: FontDefinition[] = [
  {
    family: '"Poppins", sans-serif',
    className: "tb-poppins",
    googleFont: "Poppins",
    aliases: ["poppins"],
  },
  {
    family: '"Inter", sans-serif',
    className: "tb-inter",
    googleFont: "Inter",
    aliases: ["inter"],
  },
  {
    family: '"Cormorant Garamond", Georgia, serif',
    className: "tb-cormorant",
    googleFont: "Cormorant Garamond",
    aliases: [
      "cormorant",
      "cormorant garamond",
      "cormorant-garamond",
      "cormorantgaramond",
    ],
  },
  {
    family: '"Playfair Display", Georgia, serif',
    className: "tb-playfair",
    googleFont: "Playfair Display",
    aliases: [
      "playfair",
      "playfair display",
      "playfair-display",
      "playfairdisplay",
    ],
  },
  {
    family: '"Space Grotesk", sans-serif',
    className: "tb-space-grotesk",
    googleFont: "Space Grotesk",
    aliases: ["space grotesk", "space-grotesk", "spacegrotesk"],
  },
  {
    family: '"DM Sans", Arial, sans-serif',
    className: "tb-dm-sans",
    googleFont: "DM Sans",
    aliases: ["dm sans", "dm-sans", "dmsans"],
  },
  {
    family: '"DM Mono", monospace',
    className: "tb-dm-mono",
    googleFont: "DM Mono",
    aliases: ["dm mono", "dm-mono", "dmmono"],
  },
  {
    family: '"Fraunces", Georgia, serif',
    className: "tb-fraunces",
    googleFont: "Fraunces",
    aliases: ["fraunces"],
  },
  {
    family: '"Instrument Serif", serif',
    className: "tb-instrument",
    googleFont: "Instrument Serif",
    aliases: [
      "instrument serif",
      "instrument-serif",
      "instrument",
      "instrumentserif",
    ],
  },
  {
    family: '"Outfit", sans-serif',
    className: "tb-outfit",
    googleFont: "Outfit",
    aliases: ["outfit"],
  },
  {
    family: '"Comic Relief", system-ui',
    className: "tb-comic",
    googleFont: "Comic Relief",
    aliases: ["comic relief", "comic-relief", "comic", "comicrelief"],
  },
  {
    family: '"Open Sans", sans-serif',
    className: "tb-open-sans",
    googleFont: "Open Sans",
    aliases: ["open sans", "open-sans", "opensans"],
  },
  {
    family: '"Roboto", sans-serif',
    className: "tb-roboto",
    googleFont: "Roboto",
    aliases: ["roboto"],
  },
  {
    family: '"Syne", sans-serif',
    className: "tb-syne",
    googleFont: "Syne",
    aliases: ["syne"],
  },
  {
    family: '"Plus Jakarta Sans", sans-serif',
    className: "tb-jakarta",
    googleFont: "Plus Jakarta Sans",
    aliases: [
      "plus jakarta sans",
      "plus-jakarta-sans",
      "jakarta",
      "plusjakartasans",
    ],
  },
  {
    family: '"Cinzel", serif',
    className: "tb-cinzel",
    googleFont: "Cinzel",
    aliases: ["cinzel"],
  },
];

// Precompute lowercase lookup map
const ALIAS_LOOKUP = new Map<string, FontDefinition>();
for (const def of FONT_DEFINITIONS) {
  for (const alias of def.aliases) {
    ALIAS_LOOKUP.set(alias.toLowerCase(), def);
  }
  ALIAS_LOOKUP.set(def.googleFont.toLowerCase(), def);
}

/**
 * Resolves any font string (case-insensitive, alias-tolerant) into fontFamily, class name, and Google Font name.
 * If an arbitrary custom font name is provided (e.g. "Lora", "Cinzel", "Montserrat"),
 * it formats it cleanly so it strictly renders.
 */
export function resolveFont(fontInput?: string | null): ResolvedFont {
  if (!fontInput || typeof fontInput !== "string" || !fontInput.trim()) {
    return {
      fontFamily: '"Poppins", sans-serif',
      className: "tb-poppins",
      googleFontFamily: "Poppins",
      key: "poppins",
    };
  }

  const raw = fontInput.trim();
  const normalized = raw.toLowerCase().replace(/['"]/g, "").trim();

  // Check known aliases
  const matched = ALIAS_LOOKUP.get(normalized);
  if (matched) {
    return {
      fontFamily: matched.family,
      className: matched.className,
      googleFontFamily: matched.googleFont,
      key: matched.aliases[0] || normalized,
    };
  }

  // Check partial key matches (e.g. if someone wrote "cormorant italic" or similar)
  for (const [alias, def] of ALIAS_LOOKUP.entries()) {
    if (normalized.includes(alias) || alias.includes(normalized)) {
      return {
        fontFamily: def.family,
        className: def.className,
        googleFontFamily: def.googleFont,
        key: alias,
      };
    }
  }

  // Arbitrary custom font name: strictly use what user wrote!
  const cleanName = raw.replace(/['"]/g, "");
  const slug = cleanName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return {
    fontFamily: `"${cleanName}", sans-serif`,
    className: `tb-${slug}`,
    googleFontFamily: cleanName,
    key: slug,
  };
}

/**
 * Dynamically ensures that Google Fonts stylesheet for the given font is injected
 * into the given document (main window or iframe).
 */
const loadedFonts = new Set<string>();

export function ensureGoogleFontLoaded(
  fontName?: string,
  targetDoc?: Document | null,
): void {
  if (typeof document === "undefined" || !fontName) return;

  const doc = targetDoc || document;
  const sanitized = fontName.trim().replace(/['"]/g, "");
  if (!sanitized) return;

  // Don't fetch generic system fonts
  const systemFonts = new Set([
    "sans-serif",
    "serif",
    "monospace",
    "system-ui",
    "arial",
    "helvetica",
    "georgia",
    "times new roman",
    "courier new",
  ]);
  if (systemFonts.has(sanitized.toLowerCase())) return;

  const fontId = `gf-${sanitized.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  if (doc.getElementById(fontId)) return;

  try {
    const link = doc.createElement("link");
    link.id = fontId;
    link.rel = "stylesheet";
    const familyParam = encodeURIComponent(sanitized).replace(/%20/g, "+");
    link.href = `https://fonts.googleapis.com/css2?family=${familyParam}:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&display=swap`;
    doc.head.appendChild(link);
    loadedFonts.add(sanitized.toLowerCase());
  } catch {
    // Ignore DOM insertion errors (e.g. cross-origin iframe)
  }
}
