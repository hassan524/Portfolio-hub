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

function isPropControlled(style, key) {
  if (!style) return false;
  if (style[key] !== undefined) return true;
  const resp = style.responsive;
  if (!resp) return false;
  return Boolean(
    (resp.desktop && key in resp.desktop && resp.desktop[key] !== undefined) ||
    (resp.tablet && key in resp.tablet && resp.tablet[key] !== undefined) ||
    (resp.mobile && key in resp.mobile && resp.mobile[key] !== undefined)
  );
}

function resolveResponsiveValue(style, key, breakpoint) {
  if (!style) return undefined;
  const responsive = style.responsive;

  if (responsive) {
    // This breakpoint's own explicit override wins, if it has one.
    if (responsive[breakpoint] && key in responsive[breakpoint]) {
      const val = responsive[breakpoint][key];
      if (val !== undefined) return val;
    }

    // No cross-breakpoint inheritance: desktop edits stay on desktop,
    // tablet edits stay on tablet, mobile edits stay on mobile.

    if (style[key] !== undefined) {
      return style[key];
    }

    const otherBps = ["desktop", "tablet", "mobile"].filter((b) => b !== breakpoint);
    const hasOtherOverride = otherBps.some((b) => responsive[b] && key in responsive[b]);
    if (hasOtherOverride) {
      return undefined;
    }
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

function isChromeElement(el: Element | null | undefined): boolean {
  if (!el || typeof (el as Element).getAttribute !== "function") return false;
  return Boolean(
    el.hasAttribute("data-preview-chrome") ||
    el.closest?.("[data-preview-chrome]") ||
    el.hasAttribute("data-blend-ignore") ||
    el.closest?.("[data-blend-ignore]") ||
    el.hasAttribute("data-block-drag-handle") ||
    el.closest?.("[data-block-drag-handle]") ||
    (el as HTMLElement).dataset?.previewLinkWrapper === "true" ||
    el.closest?.("[data-preview-link-wrapper]")
  );
}

export function getElementPath(root: HTMLElement, element: HTMLElement): string {
  if (isChromeElement(element)) return "";
  const parts: number[] = [];
  let current: HTMLElement | null = element;
  while (current && current !== root) {
    const parent: HTMLElement | null = current.parentElement;
    if (!parent) return "";
    const siblings = Array.from(parent.children).filter(
      (el) => !isChromeElement(el)
    );
    const idx = siblings.indexOf(current as Element);
    if (idx === -1) return "";
    parts.unshift(idx);
    current = parent;
  }
  return parts.length ? parts.join(".") : "";
}

export function applyPreviewStyle(
  element: HTMLElement,
  style: any,
  breakpoint: "desktop" | "tablet" | "mobile",
  allElements?: Record<string, any>,
): void {
  if (!element || !style || Object.keys(style).length === 0) return;

  const resolve = (key) => resolveResponsiveValue(style, key, breakpoint);
  const controlled = (key) => isPropControlled(style, key);

  const isImportant = resolve("isImportant");
  const imp = isImportant ? "important" : "";
  const setProp = (prop: string, val: string | undefined | null) => {
    if (val !== undefined && val !== null && val !== "") {
      element.style.setProperty(prop, val, imp);
    } else {
      element.style.removeProperty(prop);
    }
  };

  const linkHref = resolve("linkHref");
  const linkTarget = resolve("linkTarget") || (linkHref && /^https?:\\/\\//i.test(linkHref) ? "_blank" : "_self");
  applyElementLink(element, typeof linkHref === "string" ? linkHref : "", linkTarget || "_self");

  // Typography
  if (controlled("bold") || controlled("fontWeight")) {
    const bold = resolve("bold");
    const fontWeight = resolve("fontWeight");
    if (bold !== undefined || fontWeight !== undefined) {
      const weight = bold !== undefined ? (bold ? "700" : "400") : (fontWeight || "400");
      setProp("font-weight", String(weight));
    } else {
      element.style.removeProperty("font-weight");
    }
  }

  if (controlled("italic")) {
    const italic = resolve("italic");
    if (italic !== undefined) {
      setProp("font-style", italic ? "italic" : "normal");
    } else {
      element.style.removeProperty("font-style");
    }
  }

  if (controlled("underline") || controlled("strikethrough")) {
    const underline = resolve("underline");
    const strikethrough = resolve("strikethrough");
    if (underline || strikethrough) {
      const decorations: string[] = [];
      if (underline) decorations.push("underline");
      if (strikethrough) decorations.push("line-through");
      setProp("text-decoration", decorations.join(" "));
    } else {
      element.style.removeProperty("text-decoration");
    }
  }

  if (controlled("fontFamily")) {
    const fontFamily = resolve("fontFamily");
    if (fontFamily && fontFamily !== "inherit") {
      setProp("font-family", fontFamily);
    } else {
      element.style.removeProperty("font-family");
    }
  }

  if (controlled("fontSize")) {
    const fontSize = resolve("fontSize");
    if (fontSize) {
      setProp("font-size", \`\${fontSize}px\`);
    } else {
      element.style.removeProperty("font-size");
    }
  }

  if (controlled("lineHeight")) {
    const lineHeight = resolve("lineHeight");
    if (lineHeight) {
      setProp("line-height", String(lineHeight));
    } else {
      element.style.removeProperty("line-height");
    }
  }

  if (controlled("letterSpacing")) {
    const letterSpacing = resolve("letterSpacing");
    if (letterSpacing !== undefined && letterSpacing !== null) {
      setProp("letter-spacing", \`\${letterSpacing}px\`);
    } else {
      element.style.removeProperty("letter-spacing");
    }
  }

  if (controlled("textAlign")) {
    const textAlign = resolve("textAlign");
    if (textAlign) {
      setProp("text-align", textAlign);
    } else {
      element.style.removeProperty("text-align");
    }
  }

  if (controlled("textTransform")) {
    const textTransform = resolve("textTransform");
    if (textTransform && textTransform !== "none") {
      setProp("text-transform", textTransform);
    } else {
      element.style.removeProperty("text-transform");
    }
  }

  // Color & Descendants
  if (controlled("color")) {
    const color = resolve("color");
    if (color) {
      element.style.setProperty("color", color, "important");
      element.style.setProperty("--ai-theme-ink", color);
      element.style.setProperty("--theme-ink", color);
      element.style.setProperty("--ink", color);
    } else {
      element.style.removeProperty("color");
      element.style.removeProperty("--ai-theme-ink");
      element.style.removeProperty("--theme-ink");
      element.style.removeProperty("--ink");
    }

    const textDescendants = element.querySelectorAll<HTMLElement>("*");
    textDescendants.forEach((child) => {
      const childEditId = child.dataset.previewEditId;
      const childHasOwnColor = Boolean(
        childEditId &&
        allElements &&
        allElements[childEditId]?.style &&
        resolveResponsiveValue(allElements[childEditId].style, "color", breakpoint) !== undefined
      );
      if (!childHasOwnColor) {
        if (color) {
          child.style.setProperty("color", color, "important");
          child.style.setProperty("--ai-theme-ink", color);
          child.style.setProperty("--theme-ink", color);
          child.style.setProperty("--ink", color);
        } else {
          child.style.removeProperty("color");
          child.style.removeProperty("--ai-theme-ink");
          child.style.removeProperty("--theme-ink");
          child.style.removeProperty("--ink");
        }
      }
    });
  }

  if (controlled("textShadow")) {
    const textShadow = resolve("textShadow");
    if (textShadow) {
      setProp("text-shadow", textShadow);
    } else {
      element.style.removeProperty("text-shadow");
    }
  }

  // Gradient Text
  if (controlled("gradientText")) {
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
  }

  // Background & Colors
  if (controlled("glassmorphism") || controlled("backgroundColor") || controlled("backgroundImage") || controlled("backgroundGradient")) {
    const glassmorphism = resolve("glassmorphism");
    const backgroundColor = resolve("backgroundColor");
    const backgroundImage = resolve("backgroundImage");
    const backgroundGradient = resolve("backgroundGradient");

    if (glassmorphism) {
      setProp("background-color", "rgba(255, 255, 255, 0.08)");
      setProp("backdrop-filter", "blur(16px)");
      setProp("-webkit-backdrop-filter", "blur(16px)");
      setProp("border", "1px solid rgba(255, 255, 255, 0.18)");
      setProp("box-shadow", "0 8px 32px 0 rgba(0, 0, 0, 0.25)");
    } else {
      if (glassmorphism === false) {
        setProp("backdrop-filter", null);
        setProp("-webkit-backdrop-filter", null);
      }
      if (controlled("backgroundColor")) {
        setProp("background-color", backgroundColor || null);
      }
      if (controlled("backgroundGradient") || controlled("backgroundImage")) {
        setProp("background-image", backgroundGradient || backgroundImage || null);
      }
    }
  }

  if (controlled("opacity")) {
    const opacity = resolve("opacity");
    if (opacity !== undefined && opacity !== null) {
      setProp("opacity", String(opacity));
    } else {
      element.style.removeProperty("opacity");
    }
  }

  // Borders & Shadow
  if (controlled("borderRadius")) {
    const borderRadius = resolve("borderRadius");
    if (borderRadius !== undefined && borderRadius !== null) {
      setProp("border-radius", \`\${borderRadius}px\`);
    } else {
      element.style.removeProperty("border-radius");
    }
  }

  if (controlled("borderWidth")) {
    const borderWidth = resolve("borderWidth");
    if (borderWidth !== undefined && borderWidth !== null) {
      setProp("border-width", \`\${borderWidth}px\`);
    } else {
      element.style.removeProperty("border-width");
    }
  }

  if (controlled("borderStyle")) {
    const borderStyle = resolve("borderStyle");
    if (borderStyle) {
      setProp("border-style", borderStyle);
    } else {
      element.style.removeProperty("border-style");
    }
  }

  if (controlled("borderColor")) {
    const borderColor = resolve("borderColor");
    if (borderColor) {
      setProp("border-color", borderColor);
    } else {
      element.style.removeProperty("border-color");
    }
  }

  if (controlled("glowAccent") || controlled("boxShadow")) {
    const glowAccent = resolve("glowAccent");
    const boxShadow = resolve("boxShadow");
    if (glowAccent) {
      setProp("box-shadow", "0 0 25px rgba(99, 102, 241, 0.6), 0 0 50px rgba(99, 102, 241, 0.3)");
    } else if (boxShadow && boxShadow !== "none") {
      setProp("box-shadow", boxShadow);
    } else {
      element.style.removeProperty("box-shadow");
    }
  }

  if (controlled("backdropBlur")) {
    const backdropBlur = resolve("backdropBlur");
    if (backdropBlur !== undefined && backdropBlur !== null) {
      setProp("backdrop-filter", \`blur(\${backdropBlur}px)\`);
      setProp("-webkit-backdrop-filter", \`blur(\${backdropBlur}px)\`);
    } else {
      element.style.removeProperty("backdrop-filter");
      element.style.removeProperty("-webkit-backdrop-filter");
    }
  }

  // Spacing & Dimensions
  if (controlled("padding")) {
    const padding = resolve("padding");
    if (padding !== undefined && padding !== null) {
      setProp("padding", \`\${padding}px\`);
    } else {
      element.style.removeProperty("padding");
    }
  }

  if (controlled("margin")) {
    const margin = resolve("margin");
    if (margin !== undefined && margin !== null) {
      setProp("margin", \`\${margin}px\`);
    } else {
      element.style.removeProperty("margin");
    }
  }

  if (controlled("width")) {
    const width = resolve("width");
    if (width) {
      const formattedWidth = /^\\d+(\\.\\d+)?$/.test(String(width).trim()) ? \`\${String(width).trim()}px\` : String(width).trim();
      setProp("width", formattedWidth);
      element.style.setProperty("max-width", "none", "important");
      element.style.setProperty("min-width", "0", "important");
    } else {
      element.style.removeProperty("width");
      element.style.removeProperty("max-width");
      element.style.removeProperty("min-width");
    }
  }

  if (controlled("height")) {
    const height = resolve("height");
    if (height) {
      const formattedHeight = /^\\d+(\\.\\d+)?$/.test(String(height).trim()) ? \`\${String(height).trim()}px\` : String(height).trim();
      setProp("height", formattedHeight);
      element.style.setProperty("max-height", "none", "important");
      element.style.setProperty("min-height", "0", "important");
    } else {
      element.style.removeProperty("height");
      element.style.removeProperty("max-height");
      element.style.removeProperty("min-height");
    }
  }

  if (controlled("zIndex")) {
    const zIndex = resolve("zIndex");
    if (zIndex !== undefined && zIndex !== null) {
      setProp("z-index", String(zIndex));
    } else {
      element.style.removeProperty("z-index");
    }
  }

  if (controlled("removed") || controlled("display")) {
    const removed = resolve("removed");
    const display = resolve("display");
    if (removed) {
      setProp("display", "none");
    } else if (display) {
      setProp("display", display);
    } else {
      element.style.removeProperty("display");
    }
  }

  if (controlled("hidden") || controlled("visibility")) {
    const hidden = resolve("hidden");
    const visibility = resolve("visibility");
    if (hidden) {
      setProp("visibility", "hidden");
    } else if (visibility && visibility !== "hidden") {
      setProp("visibility", visibility);
    } else {
      element.style.removeProperty("visibility");
    }
  }

  if (controlled("cursor")) {
    const cursor = resolve("cursor");
    if (cursor) {
      setProp("cursor", cursor);
    } else {
      element.style.removeProperty("cursor");
    }
  }

  if (controlled("overflow")) {
    const overflow = resolve("overflow");
    if (overflow) {
      setProp("overflow", overflow);
    } else {
      element.style.removeProperty("overflow");
    }
  }

  // Transforms
  if (controlled("rotate") || controlled("scale")) {
    const rotate = resolve("rotate");
    const scale = resolve("scale");
    if (rotate || scale) {
      const transforms: string[] = [];
      if (rotate) transforms.push(\`rotate(\${rotate}deg)\`);
      if (scale) transforms.push(\`scale(\${scale})\`);
      setProp("transform", transforms.join(" "));
    } else {
      element.style.removeProperty("transform");
    }
  }

  // Free positioning & moving
  if (controlled("freePositioned")) {
    const freePositioned = resolve("freePositioned");
    if (freePositioned) {
      const x = resolve("x");
      const y = resolve("y");
      const desktopCoords = resolve("desktop");
      const mobileCoords = resolve("mobile");
      const tabletCoords = resolve("tablet");

      let coords;
      if (breakpoint === "desktop") {
        coords = desktopCoords || (x !== undefined && y !== undefined && x !== null && y !== null ? { x, y } : undefined);
      } else if (breakpoint === "tablet") {
        coords = tabletCoords || desktopCoords || (x !== undefined && y !== undefined && x !== null && y !== null ? { x, y } : undefined);
      } else {
        coords = mobileCoords || desktopCoords || (x !== undefined && y !== undefined && x !== null && y !== null ? { x, y } : undefined);
      }

      if (coords) {
        const isAbs = element.style.position === "absolute" || 
          (typeof window !== "undefined" && window.getComputedStyle(element).position === "absolute");
        element.style.setProperty("position", isAbs ? "absolute" : "relative", "important");
        element.style.setProperty("left", \`\${coords.x}px\`, "important");
        element.style.setProperty("top", \`\${coords.y}px\`, "important");
        element.style.setProperty("right", "auto", "important");
        element.style.setProperty("bottom", "auto", "important");
        element.style.setProperty("z-index", "250", "important");
        element.setAttribute("data-free-positioned", "true");

        // Elevate blockRoot and canvas wrapper so cross-block drops are never hidden
        let p = element.parentElement;
        while (p && !p.hasAttribute("data-block-id") && p.tagName !== "BODY") {
          p = p.parentElement;
        }
        if (p && p.hasAttribute("data-block-id")) {
          p.setAttribute("data-has-free-positioned", "true");
          p.style.setProperty("overflow", "visible", "important");
          p.style.setProperty("position", "relative", "important");
          p.style.setProperty("z-index", "200", "important");
          let wrapper = p.parentElement;
          while (wrapper && wrapper.tagName !== "BODY" && !wrapper.classList.contains("preview-edit-canvas")) {
            wrapper.setAttribute("data-has-free-positioned", "true");
            wrapper.style.setProperty("overflow", "visible", "important");
            wrapper.style.setProperty("position", "relative", "important");
            wrapper.style.setProperty("z-index", "200", "important");
            wrapper = wrapper.parentElement;
          }
        }
      } else {
        element.style.removeProperty("position");
        element.style.removeProperty("left");
        element.style.removeProperty("top");
        element.style.removeProperty("z-index");
        element.removeAttribute("data-free-positioned");
      }
    } else {
      element.style.removeProperty("position");
      element.style.removeProperty("left");
      element.style.removeProperty("top");
      element.style.removeProperty("z-index");
      element.removeAttribute("data-free-positioned");
    }
  }

  if (controlled("hoverEffect")) {
    const hoverEffect = resolve("hoverEffect");
    if (hoverEffect && hoverEffect !== "none") {
      element.setAttribute("data-hover-fx", hoverEffect);
    } else {
      element.removeAttribute("data-hover-fx");
    }
  }

  if (controlled("entrance")) {
    const entrance = resolve("entrance");
    const entranceDuration = resolve("entranceDuration");
    if (entrance && entrance !== "none") {
      element.setAttribute("data-entrance-fx", entrance);
      setProp("animation-duration", \`\${entranceDuration !== undefined ? entranceDuration : 0.6}s\`);
    } else {
      element.removeAttribute("data-entrance-fx");
      element.style.removeProperty("animation-duration");
    }
  }
}


function applyElementLink(element: HTMLElement, href: string, target: string): void {
  const existingWrapper = element.parentElement?.dataset.previewLinkWrapper === "true"
    ? element.parentElement
    : null;

  if (!href) {
    element.removeAttribute("data-preview-link-href");
    element.removeAttribute("data-preview-link-target");
    element.style.removeProperty("cursor");
    if (element instanceof HTMLAnchorElement && element.dataset.previewLinkOwner === "true") {
      element.removeAttribute("href");
      element.removeAttribute("target");
      element.removeAttribute("rel");
      element.removeAttribute("data-preview-link-owner");
    }
    if (existingWrapper?.parentElement) {
      existingWrapper.replaceWith(element);
    }
    return;
  }

  element.dataset.previewLinkHref = href;
  element.dataset.previewLinkTarget = target;
  element.style.setProperty("cursor", "pointer");

  if (element.dataset.previewEditId?.endsWith(":root")) return;

  const anchor = element.closest("a");
  if (anchor instanceof HTMLAnchorElement) {
    anchor.href = href;
    anchor.target = target;
    anchor.rel = target === "_blank" ? "noopener noreferrer" : "";
    anchor.dataset.previewLinkOwner = "true";
    return;
  }

  if (existingWrapper instanceof HTMLAnchorElement) {
    existingWrapper.href = href;
    existingWrapper.target = target;
    existingWrapper.rel = target === "_blank" ? "noopener noreferrer" : "";
    return;
  }

  const wrapper = element.ownerDocument.createElement("a");
  wrapper.href = href;
  wrapper.target = target;
  wrapper.rel = target === "_blank" ? "noopener noreferrer" : "";
  wrapper.dataset.previewLinkWrapper = "true";
  wrapper.style.color = "inherit";
  wrapper.style.textDecoration = "none";
  wrapper.style.display = getComputedStyle(element).display === "block" ? "block" : "inline-block";
  element.replaceWith(wrapper);
  wrapper.appendChild(element);
}

function findMatchingEdit(
  elements: Record<string, any>,
  blockId: string,
  path: string,
): { key: string; style: any } | null {
  if (!elements || !path) return null;

  const directKey = \`\${blockId}:\${path}\`;
  if (elements[directKey]?.style) {
    return { key: directKey, style: elements[directKey].style };
  }

  // Handle prefix variations between editor and deploy wrapper hierarchies (e.g. "0.0.0." vs "0.0." vs "0.")
  const candidatePrefixes = ["0.0.0.", "0.0.", "0.", ""];
  for (const p of ["0.0.0.", "0.0.", "0."]) {
    if (path.startsWith(p)) {
      const subpath = path.slice(p.length);
      for (const targetPrefix of candidatePrefixes) {
        const candidateKey = \`\${blockId}:\${targetPrefix}\${subpath}\`;
        if (elements[candidateKey]?.style) {
          return { key: candidateKey, style: elements[candidateKey].style };
        }
      }
      break;
    }
  }

  return null;
}

const PREVIEW_EFFECTS_STYLE_ID = "preview-effects-styles";

function ensurePreviewEffectsStylesheet(doc: Document | null | undefined): void {
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

    [data-block-kind="navbar"] header,
    [data-block-kind="navbar"] nav {
      position: relative !important;
      top: auto !important;
    }

    [data-free-positioned="true"] {
      z-index: 250 !important;
    }

    [data-has-free-positioned="true"],
    [data-has-free-positioned="true"] [data-block-id],
    [data-has-free-positioned="true"] > [data-block-id] > section,
    [data-has-free-positioned="true"] > [data-block-id] > header,
    [data-has-free-positioned="true"] > [data-block-id] > nav,
    [data-has-free-positioned="true"] > [data-block-id] > footer,
    [data-has-free-positioned="true"] section,
    [data-has-free-positioned="true"] .group\\\\/block,
    [data-has-free-positioned="true"] .group\\\\/dragblock {
      overflow: visible !important;
    }
  \`;
  doc.head.appendChild(styleEl);
}

function applyBlockSurfaceStyles(blockRoot, block, backgroundColor) {
  const surfaceSelectors = "section, nav, header, footer";
  const bg = backgroundColor || block?.bgColor;
  if (bg) {
    blockRoot.style.setProperty("--block-bg", bg);
    blockRoot.style.setProperty("background-color", bg, "important");
    blockRoot.querySelectorAll(surfaceSelectors).forEach((node) => {
      if (isChromeElement(node)) return;
      node.style.setProperty("background-color", bg, "important");
      const kind = block?.props?.kind || block?.kind;
      if (kind === "spacer") {
        node.style.setProperty("background-image", "none", "important");
      }
    });
  }
  if (block?.height) {
    blockRoot.style.setProperty("height", block.height + "px", "important");
    blockRoot.style.setProperty("min-height", block.height + "px", "important");
    blockRoot.querySelectorAll(surfaceSelectors).forEach((node) => {
      if (isChromeElement(node)) return;
      node.style.setProperty("height", "100%", "important");
      node.style.setProperty("min-height", "0", "important");
      node.style.setProperty("max-height", "100%", "important");
    });
  } else {
    blockRoot.style.removeProperty("height");
    blockRoot.style.removeProperty("min-height");
    blockRoot.querySelectorAll(surfaceSelectors).forEach((node) => {
      if (isChromeElement(node)) return;
      node.style.removeProperty("height");
      node.style.removeProperty("min-height");
      node.style.removeProperty("max-height");
    });
  }
}

export function applyAllPreviewEdits(
  root: HTMLElement | null,
  previewEdits: any,
  blocks: any[] = [],
): void {
  if (!root || !previewEdits?.elements) return;

  ensurePreviewEffectsStylesheet(root.ownerDocument);

  const breakpoint = typeof window !== "undefined" ? breakpointFromWidth(window.innerWidth) : "desktop";
  const elements = previewEdits.elements;

  const blocksWithFreePos = new Set<string>();
  if (elements) {
    for (const [editKey, editData] of Object.entries(elements)) {
      if ((editData as any)?.style?.freePositioned) {
        const bId = (editData as any).blockId || editKey.split(":")[0];
        if (bId) blocksWithFreePos.add(bId);
      }
    }
  }

  root.querySelectorAll<HTMLElement>("[data-block-id]").forEach((blockRoot) => {
    const blockId = blockRoot.dataset.blockId;
    if (!blockId) return;
    const block = blocks.find((candidate) => candidate.id === blockId);
    const sectionId = block ? getBlockSectionId(block) : "";
    if (sectionId && !blockRoot.querySelector(\`#\${sectionId}\`)) {
      blockRoot.id = sectionId;
    }

    const hasFree = blocksWithFreePos.has(blockId);
    const wrapper = blockRoot.parentElement;

    if (hasFree) {
      blockRoot.setAttribute("data-has-free-positioned", "true");
      blockRoot.style.setProperty("overflow", "visible", "important");
      blockRoot.style.setProperty("position", "relative", "important");
      blockRoot.style.setProperty("z-index", "200", "important");
      if (wrapper && !wrapper.classList.contains("preview-edit-canvas")) {
        wrapper.setAttribute("data-has-free-positioned", "true");
        wrapper.style.setProperty("overflow", "visible", "important");
        wrapper.style.setProperty("position", "relative", "important");
        wrapper.style.setProperty("z-index", "200", "important");
      }
    } else {
      blockRoot.removeAttribute("data-has-free-positioned");
      blockRoot.style.setProperty("position", "relative", "important");
      blockRoot.style.setProperty("z-index", "1", "important");
      if (wrapper && !wrapper.classList.contains("preview-edit-canvas")) {
        wrapper.removeAttribute("data-has-free-positioned");
        wrapper.style.setProperty("position", "relative", "important");
        wrapper.style.setProperty("z-index", "1", "important");
      }
    }

    if (block) {
      applyBlockSurfaceStyles(blockRoot, block);
    }

    if (!blockRoot.dataset.previewEditId) {
      blockRoot.dataset.previewEditId = \`\${blockId}:root\`;
    }

    if (elements[\`\${blockId}:root\`]?.style) {
      applyPreviewStyle(blockRoot, elements[\`\${blockId}:root\`].style, breakpoint, elements);
    }

    blockRoot.querySelectorAll<HTMLElement>("*").forEach((element) => {
      if (isChromeElement(element)) return;

      let editId = element.dataset.previewEditId;
      let matchedStyle = editId && elements[editId]?.style ? elements[editId].style : null;

      if (!matchedStyle) {
        const path = getElementPath(blockRoot, element);
        if (path) {
          const match = findMatchingEdit(elements, blockId, path);
          if (match) {
            element.dataset.previewEditId = match.key;
            matchedStyle = match.style;
          } else {
            element.dataset.previewEditId = \`\${blockId}:\${path}\`;
          }
        }
      }

      if (matchedStyle) {
        applyPreviewStyle(element, matchedStyle, breakpoint, elements);
      }
    });

    const rootBg =
      resolveResponsiveValue(elements[\`\${blockId}:root\`]?.style, "backgroundColor", breakpoint) ||
      block?.bgColor;
    if (block) {
      applyBlockSurfaceStyles(blockRoot, block, rootBg);
    }
  });
}
function getBlockSectionId(block) {
  if (block && block.sectionHref !== undefined) {
    const clean = String(block.sectionHref).replace(/^#+/, "").trim();
    if (!clean) return "";
    return clean.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
  const kind = block.props?.kind || block.kind;
  const raw = kind === "hero"
    ? "home"
    : (block.label || block.name || kind);
  return String(raw).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
`.trim() + "\n";