// This string gets written verbatim into the deployed app as
// src/applyPreviewStyles.ts — it MUST stay in sync with the editor's
// copy in src/lib/functions/template.ts (applyPreviewStyle, getElementPath).
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
    return responsive[breakpoint][key];
  }
  if (breakpoint !== "desktop" && responsive && responsive.desktop && key in responsive.desktop) {
    return responsive.desktop[key];
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

  const imp = style.isImportant ? "important" : "";
  const setProp = (prop: string, val: string | undefined | null) => {
    if (val !== undefined && val !== null && val !== "") {
      element.style.setProperty(prop, val, imp);
    }
  };

  // Typography
  if (style.bold !== undefined || style.fontWeight !== undefined) {
    const weight = style.bold !== undefined ? (style.bold ? "700" : "400") : (style.fontWeight || "400");
    setProp("font-weight", String(weight));
  }
  if (style.italic !== undefined) {
    setProp("font-style", style.italic ? "italic" : "normal");
  }
  if (style.underline !== undefined || style.strikethrough !== undefined) {
    const decorations: string[] = [];
    if (style.underline) decorations.push("underline");
    if (style.strikethrough) decorations.push("line-through");
    setProp("text-decoration", decorations.length > 0 ? decorations.join(" ") : "none");
  }
  if (style.fontFamily && style.fontFamily !== "inherit") {
    setProp("font-family", style.fontFamily);
  }

  const effectiveFontSize = resolveResponsiveValue(style, "fontSize", breakpoint);
  if (effectiveFontSize !== undefined && effectiveFontSize !== null) {
    setProp("font-size", \`\${effectiveFontSize}px\`);
  }

  if (style.lineHeight !== undefined && style.lineHeight !== null) {
    setProp("line-height", String(style.lineHeight));
  }
  if (style.letterSpacing !== undefined && style.letterSpacing !== null) {
    setProp("letter-spacing", \`\${style.letterSpacing}px\`);
  }

  const effectiveTextAlign = resolveResponsiveValue(style, "textAlign", breakpoint);
  if (effectiveTextAlign) {
    setProp("text-align", effectiveTextAlign);
  }

  if (style.textTransform && style.textTransform !== "none") {
    setProp("text-transform", style.textTransform);
  }
  if (style.color) {
    setProp("color", style.color);
  }
  if (style.textShadow) {
    setProp("text-shadow", style.textShadow);
  }

  if (style.gradientText) {
    setProp("background-image", style.backgroundGradient || "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)");
    setProp("-webkit-background-clip", "text");
    setProp("background-clip", "text");
    setProp("-webkit-text-fill-color", "transparent");
  }

  if (style.glassmorphism) {
    setProp("background-color", "rgba(255, 255, 255, 0.08)");
    setProp("backdrop-filter", "blur(16px)");
    setProp("-webkit-backdrop-filter", "blur(16px)");
    setProp("border", "1px solid rgba(255, 255, 255, 0.18)");
    setProp("box-shadow", "0 8px 32px 0 rgba(0, 0, 0, 0.25)");
  } else {
    if (style.backgroundColor) {
      setProp("background-color", style.backgroundColor);
    }
    if (style.backgroundGradient || style.backgroundImage) {
      setProp("background-image", style.backgroundGradient || style.backgroundImage);
    }
  }

  if (style.opacity !== undefined && style.opacity !== null) {
    setProp("opacity", String(style.opacity));
  }

  if (!style.glassmorphism) {
    if (style.borderRadius !== undefined && style.borderRadius !== null) {
      setProp("border-radius", \`\${style.borderRadius}px\`);
    }
    if (style.borderWidth !== undefined && style.borderWidth !== null) {
      setProp("border-width", \`\${style.borderWidth}px\`);
    }
    if (style.borderStyle) {
      setProp("border-style", style.borderStyle);
    }
    if (style.borderColor) {
      setProp("border-color", style.borderColor);
    }
    if (style.glowAccent) {
      setProp("box-shadow", "0 0 25px rgba(99, 102, 241, 0.6), 0 0 50px rgba(99, 102, 241, 0.3)");
    } else if (style.boxShadow && style.boxShadow !== "none") {
      setProp("box-shadow", style.boxShadow);
    }

    if (style.backdropBlur !== undefined && style.backdropBlur !== null) {
      const blurVal = style.backdropBlur ? \`blur(\${style.backdropBlur}px)\` : "";
      setProp("backdrop-filter", blurVal);
      setProp("-webkit-backdrop-filter", blurVal);
    }
  }

  const effectivePadding = resolveResponsiveValue(style, "padding", breakpoint);
  if (effectivePadding !== undefined && effectivePadding !== null) {
    setProp("padding", \`\${effectivePadding}px\`);
  }

  if (style.margin !== undefined && style.margin !== null) {
    setProp("margin", \`\${style.margin}px\`);
  }
  if (style.width) {
    let w = String(style.width).trim();
    if (/^\\d+(\\.\\d+)?$/.test(w)) w = \`\${w}px\`;
    setProp("width", w);
  }
  if (style.height) {
    let h = String(style.height).trim();
    if (/^\\d+(\\.\\d+)?$/.test(h)) h = \`\${h}px\`;
    setProp("height", h);
  }

  if (style.zIndex !== undefined && style.zIndex !== null) {
    setProp("z-index", String(style.zIndex));
  }

  const effectiveRemoved = resolveResponsiveValue(style, "removed", breakpoint);
  if (effectiveRemoved) {
    setProp("display", "none");
  } else if (style.display) {
    setProp("display", style.display);
  }

  if (style.cursor) {
    setProp("cursor", style.cursor);
  }
  if (style.overflow) {
    setProp("overflow", style.overflow);
  }

  if (style.rotate !== undefined || style.scale !== undefined) {
    const transforms: string[] = [];
    if (style.rotate) transforms.push(\`rotate(\${style.rotate}deg)\`);
    if (style.scale) transforms.push(\`scale(\${style.scale})\`);
    if (transforms.length > 0) {
      setProp("transform", transforms.join(" "));
    }
  }

  if (style.freePositioned) {
    const isDesktop = breakpoint === "desktop";
    const coords = isDesktop
      ? (style.desktop || style.mobile)
      : (style.mobile || style.desktop);
    if (coords) {
      setProp("position", "relative");
      setProp("left", \`\${coords.x}px\`);
      setProp("top", \`\${coords.y}px\`);
      setProp("z-index", "20");
    }
  }

  if (style.hoverEffect && style.hoverEffect !== "none") {
    element.setAttribute("data-hover-fx", style.hoverEffect);
  } else {
    element.removeAttribute("data-hover-fx");
  }

  if (style.entrance && style.entrance !== "none") {
    element.setAttribute("data-entrance-fx", style.entrance);
    const duration = style.entranceDuration !== undefined ? style.entranceDuration : 0.6;
    setProp("animation-duration", \`\${duration}s\`);
  } else {
    element.removeAttribute("data-entrance-fx");
    element.style.removeProperty("animation-duration");
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
`.trim();