// This string gets written verbatim into the deployed app as
// src/applyPreviewStyles.ts — it MUST stay in sync with the editor's
// copy in src/lib/functions/TemplateDialog/index.ts (applyPreviewStyle, getElementPath).
// Any new style property needs the same `if` block added in BOTH places.
export const publishedApplyPreviewStyles = `
const BREAKPOINTS = {
  desktop: { min: 1024 },
  tablet: { min: 768, max: 1023 },
  mobile: { min: 0, max: 767 },
};

function breakpointFromWidth(width) {
  if (width >= BREAKPOINTS.desktop.min) return "desktop";
  if (width >= BREAKPOINTS.tablet.min) return "tablet";
  return "mobile";
}

function resolveResponsiveValue(style, key, breakpoint) {
  const responsive = style.responsive;
  if (responsive && responsive[breakpoint] && key in responsive[breakpoint]) {
    const val = responsive[breakpoint][key];
    if (val !== undefined) return val;
  }
  return style[key];
}

const PREVIEW_EFFECTS_STYLE_ID = "preview-effects-styles";

function ensurePreviewEffectsStylesheet(doc) {
  if (!doc) return;
  if (doc.getElementById(PREVIEW_EFFECTS_STYLE_ID)) return;

  const styleEl = doc.createElement("style");
  styleEl.id = PREVIEW_EFFECTS_STYLE_ID;
  styleEl.textContent = \`
    [data-hover-fx="grow"] { transition: transform 0.2s ease; }
    [data-hover-fx="grow"]:hover { transform: scale(1.04); }

    [data-hover-fx="lift"] { transition: transform 0.2s ease, box-shadow 0.2s ease; }
    [data-hover-fx="lift"]:hover { transform: translateY(-6px); box-shadow: 0 14px 28px -8px rgba(0,0,0,0.28); }

    [data-hover-fx="glow"] { transition: box-shadow 0.2s ease; }
    [data-hover-fx="glow"]:hover { box-shadow: 0 0 26px rgba(99,102,241,0.55); }

    [data-hover-fx="darken"] { transition: filter 0.2s ease; }
    [data-hover-fx="darken"]:hover { filter: brightness(0.85); }

    @keyframes pe-fade-in { from { opacity: 0; } to { opacity: 1; } }
    @keyframes pe-slide-up { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes pe-zoom-in { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }

    [data-entrance-fx="fade"] { animation: pe-fade-in 0.5s ease both; }
    [data-entrance-fx="slideUp"] { animation: pe-slide-up 0.5s ease both; }
    [data-entrance-fx="zoom"] { animation: pe-zoom-in 0.4s ease both; }
  \`;
  doc.head.appendChild(styleEl);
}

export function getElementPath(root: HTMLElement, element: HTMLElement): string {
  const parts: number[] = [];
  let current: HTMLElement | null = element;
  while (current && current !== root) {
    const parent: HTMLElement | null = current.parentElement;
    if (!parent) return "";
    parts.unshift(Array.from(parent.children).indexOf(current));
    current = parent;
  }
  return parts.length ? parts.join(".") : "";
}

export function applyPreviewStyle(
  element: HTMLElement,
  style: any,
  breakpoint: "desktop" | "tablet" | "mobile",
): void {
  if (!style || Object.keys(style).length === 0) return;

  const resolve = (key) => resolveResponsiveValue(style, key, breakpoint);

  const isImportant = resolve("isImportant");
  const imp = isImportant ? "important" : "";
  const setProp = (prop: string, val: string | undefined | null) => {
    if (val !== undefined && val !== null && val !== "") {
      element.style.setProperty(prop, val, imp);
    } else {
      element.style.removeProperty(prop);
    }
  };

  // Typography
  const bold = resolve("bold");
  const fontWeight = resolve("fontWeight");
  if (bold !== undefined || fontWeight !== undefined) {
    const weight = bold !== undefined ? (bold ? "700" : "400") : (fontWeight || "400");
    setProp("font-weight", String(weight));
  } else {
    setProp("font-weight", null);
  }
  const italic = resolve("italic");
  setProp("font-style", italic !== undefined && italic !== null ? (italic ? "italic" : "normal") : null);

  const underline = resolve("underline");
  const strikethrough = resolve("strikethrough");
  if (underline !== undefined || strikethrough !== undefined) {
    const decorations: string[] = [];
    if (underline) decorations.push("underline");
    if (strikethrough) decorations.push("line-through");
    setProp("text-decoration", decorations.length > 0 ? decorations.join(" ") : "none");
  } else {
    setProp("text-decoration", null);
  }

  const fontFamily = resolve("fontFamily");
  setProp("font-family", fontFamily && fontFamily !== "inherit" ? fontFamily : null);

  const effectiveFontSize = resolve("fontSize");
  setProp("font-size", effectiveFontSize !== undefined && effectiveFontSize !== null ? \`\${effectiveFontSize}px\` : null);

  const lineHeight = resolve("lineHeight");
  setProp("line-height", lineHeight !== undefined && lineHeight !== null ? String(lineHeight) : null);

  const letterSpacing = resolve("letterSpacing");
  setProp("letter-spacing", letterSpacing !== undefined && letterSpacing !== null ? \`\${letterSpacing}px\` : null);

  const effectiveTextAlign = resolve("textAlign");
  setProp("text-align", effectiveTextAlign || null);

  const textTransform = resolve("textTransform");
  setProp("text-transform", textTransform && textTransform !== "none" ? textTransform : null);

  const color = resolve("color");
  setProp("color", color || null);

  const textShadow = resolve("textShadow");
  setProp("text-shadow", textShadow || null);

  // Gradient Text
  const gradientText = resolve("gradientText");
  const backgroundGradient = resolve("backgroundGradient");
  if (gradientText) {
    setProp("background-image", backgroundGradient || "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)");
    setProp("-webkit-background-clip", "text");
    setProp("background-clip", "text");
    setProp("-webkit-text-fill-color", "transparent");
  } else {
    setProp("-webkit-background-clip", null);
    setProp("background-clip", null);
    setProp("-webkit-text-fill-color", null);
  }

  // Background & Colors
  const glassmorphism = resolve("glassmorphism");
  const backgroundColor = resolve("backgroundColor");
  const backgroundImage = resolve("backgroundImage");
  if (glassmorphism) {
    setProp("background-color", "rgba(255, 255, 255, 0.08)");
    setProp("backdrop-filter", "blur(16px)");
    setProp("-webkit-backdrop-filter", "blur(16px)");
    setProp("border", "1px solid rgba(255, 255, 255, 0.18)");
    setProp("box-shadow", "0 8px 32px 0 rgba(0, 0, 0, 0.25)");
  } else {
    setProp("background-color", backgroundColor || null);
    setProp("background-image", backgroundGradient || backgroundImage || null);
  }

  const opacity = resolve("opacity");
  setProp("opacity", opacity !== undefined && opacity !== null ? String(opacity) : null);

  // Borders & Shadow
  if (!glassmorphism) {
    const borderRadius = resolve("borderRadius");
    setProp("border-radius", borderRadius !== undefined && borderRadius !== null ? \`\${borderRadius}px\` : null);

    const borderWidth = resolve("borderWidth");
    setProp("border-width", borderWidth !== undefined && borderWidth !== null ? \`\${borderWidth}px\` : null);

    const borderStyle = resolve("borderStyle");
    setProp("border-style", borderStyle || null);

    const borderColor = resolve("borderColor");
    setProp("border-color", borderColor || null);

    const glowAccent = resolve("glowAccent");
    const boxShadow = resolve("boxShadow");
    if (glowAccent) {
      setProp("box-shadow", "0 0 25px rgba(99, 102, 241, 0.6), 0 0 50px rgba(99, 102, 241, 0.3)");
    } else {
      setProp("box-shadow", boxShadow && boxShadow !== "none" ? boxShadow : null);
    }

    const backdropBlur = resolve("backdropBlur");
    setProp("backdrop-filter", backdropBlur !== undefined && backdropBlur !== null ? \`blur(\${backdropBlur}px)\` : null);
    setProp("-webkit-backdrop-filter", backdropBlur !== undefined && backdropBlur !== null ? \`blur(\${backdropBlur}px)\` : null);
  }

  // Spacing & Dimensions
  const effectivePadding = resolve("padding");
  setProp("padding", effectivePadding !== undefined && effectivePadding !== null ? \`\${effectivePadding}px\` : null);

  const margin = resolve("margin");
  setProp("margin", margin !== undefined && margin !== null ? \`\${margin}px\` : null);

  const width = resolve("width");
  setProp("width", width ? (/^\\d+(\\.\\d+)?$/.test(String(width).trim()) ? \`\${String(width).trim()}px\` : String(width).trim()) : null);

  const height = resolve("height");
  setProp("height", height ? (/^\\d+(\\.\\d+)?$/.test(String(height).trim()) ? \`\${String(height).trim()}px\` : String(height).trim()) : null);

  // Important SaaS Styles
  const zIndex = resolve("zIndex");
  setProp("z-index", zIndex !== undefined && zIndex !== null ? String(zIndex) : null);

  const effectiveRemoved = resolve("removed");
  const display = resolve("display");
  if (effectiveRemoved) {
    setProp("display", "none");
  } else {
    setProp("display", display || null);
  }

  const cursor = resolve("cursor");
  setProp("cursor", cursor || null);

  const overflow = resolve("overflow");
  setProp("overflow", overflow || null);

  // Transforms
  const rotate = resolve("rotate");
  const scale = resolve("scale");
  const transforms: string[] = [];
  if (rotate) transforms.push(\`rotate(\${rotate}deg)\`);
  if (scale) transforms.push(\`scale(\${scale})\`);
  setProp("transform", transforms.length > 0 ? transforms.join(" ") : null);

  // Free positioning & moving
  const freePositioned = resolve("freePositioned");
  if (freePositioned) {
    const x = resolve("x");
    const y = resolve("y");
    const desktopCoords = resolve("desktop");
    const mobileCoords = resolve("mobile");

    let coords;
    if (x !== undefined && y !== undefined && x !== null && y !== null) {
      coords = { x, y };
    } else if (breakpoint === "desktop") {
      coords = desktopCoords;
    } else {
      coords = mobileCoords;
    }

    if (coords) {
      setProp("position", "relative");
      setProp("left", \`\${coords.x}px\`);
      setProp("top", \`\${coords.y}px\`);
      setProp("z-index", "20");
    } else {
      setProp("position", null);
      setProp("left", null);
      setProp("top", null);
    }
  } else {
    setProp("position", null);
    setProp("left", null);
    setProp("top", null);
  }

  // Hover Effect
  const hoverEffect = resolve("hoverEffect");
  if (hoverEffect && hoverEffect !== "none") {
    element.setAttribute("data-hover-fx", hoverEffect);
  } else {
    element.removeAttribute("data-hover-fx");
  }

  // Entrance Animation
  const entrance = resolve("entrance");
  const entranceDuration = resolve("entranceDuration");
  if (entrance && entrance !== "none") {
    element.setAttribute("data-entrance-fx", entrance);
    setProp("animation-duration", \`\${entranceDuration !== undefined ? entranceDuration : 0.6}s\`);
  } else {
    element.removeAttribute("data-entrance-fx");
    setProp("animation-duration", null);
  }
}

export function applyAllPreviewEdits(
  root: HTMLElement | null,
  previewEdits: any,
): void {
  if (!root || !previewEdits?.elements) return;

  ensurePreviewEffectsStylesheet(root.ownerDocument);

  const breakpoint = typeof window !== "undefined" ? breakpointFromWidth(window.innerWidth) : "desktop";
  const elements = previewEdits.elements;

  root.querySelectorAll<HTMLElement>("[data-block-id]").forEach((blockRoot) => {
    const blockId = blockRoot.dataset.blockId;
    if (!blockId) return;

    if (!blockRoot.dataset.previewEditId) {
      blockRoot.dataset.previewEditId = \`\${blockId}:root\`;
    }

    if (elements[\`\${blockId}:root\`]?.style) {
      applyPreviewStyle(blockRoot, elements[\`\${blockId}:root\`].style, breakpoint);
    }

    blockRoot.querySelectorAll<HTMLElement>("*").forEach((element) => {
      if (!element.dataset.previewEditId) {
        const path = getElementPath(blockRoot, element);
        if (path) element.dataset.previewEditId = \`\${blockId}:\${path}\`;
      }

      const editId = element.dataset.previewEditId;
      if (editId && elements[editId]?.style) {
        applyPreviewStyle(element, elements[editId].style, breakpoint);
      }
    });
  });
}
`.trim() + "\n";