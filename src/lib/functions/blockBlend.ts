import type { Block, Theme, SiteData } from "@/types/builder.schema";
import type { PreviewElementStyle } from "@/types/previewEditTypes";

/**
 * DOM-sampling block blender.
 *
 * Instead of guessing a neighbor's color from props/theme, this walks the
 * actual rendered preview (`.preview-edit-canvas`), finds the neighbor's
 * `[data-block-id]` element, and samples the REAL composited color at the
 * seam — left, center and right — including colors that come from
 * gradients, nested divs, translucent overlays and element opacity.
 *
 * That means a Hero with a diagonal cut baked into its JSX, an About with
 * an inline gradient, a Contact with a hardcoded dark band — all of them
 * blend pixel-correctly with zero cooperation from the block components.
 */

// ============================================================================
// RGBA primitives
// ============================================================================

interface RGBA { r: number; g: number; b: number; a: number }

const TRANSPARENT: RGBA = { r: 0, g: 0, b: 0, a: 0 };

function rgba(r: number, g: number, b: number, a = 1): RGBA {
  return { r, g, b, a };
}

function cssOf(c: RGBA): string {
  return `rgba(${Math.round(c.r)}, ${Math.round(c.g)}, ${Math.round(c.b)}, ${+c.a.toFixed(3)})`;
}

/** Same color, alpha 0 — for fade-out stops (avoids the gray "transparent" artifact). */
function cssOf0(c: RGBA): string {
  return `rgba(${Math.round(c.r)}, ${Math.round(c.g)}, ${Math.round(c.b)}, 0)`;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpColor(a: RGBA, b: RGBA, t: number): RGBA {
  return rgba(lerp(a.r, b.r, t), lerp(a.g, b.g, t), lerp(a.b, b.b, t), lerp(a.a, b.a, t));
}

/** Standard source-over compositing: `top` painted over `bottom`. */
function over(top: RGBA, bottom: RGBA): RGBA {
  const a = top.a + bottom.a * (1 - top.a);
  if (a <= 0) return TRANSPARENT;
  return rgba(
    (top.r * top.a + bottom.r * bottom.a * (1 - top.a)) / a,
    (top.g * top.a + bottom.g * bottom.a * (1 - top.a)) / a,
    (top.b * top.a + bottom.b * bottom.a * (1 - top.a)) / a,
    a
  );
}

function withOpacity(c: RGBA, mult: number): RGBA {
  return rgba(c.r, c.g, c.b, c.a * mult);
}

function avg(colors: RGBA[]): RGBA {
  if (!colors.length) return TRANSPARENT;
  const s = colors.reduce((acc, c) => rgba(acc.r + c.r, acc.g + c.g, acc.b + c.b, acc.a + c.a), rgba(0, 0, 0, 0));
  const n = colors.length;
  return rgba(s.r / n, s.g / n, s.b / n, s.a / n);
}

function dist(a: RGBA, b: RGBA): number {
  return Math.sqrt((a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2) + Math.abs(a.a - b.a) * 120;
}

function luminance(c: RGBA): number {
  return (c.r * 299 + c.g * 587 + c.b * 114) / 1000 / 255;
}

// ============================================================================
// Color parsing — any CSS color → RGBA (computed styles are always rgb(),
// but theme colors can be hex / hsl / oklch / named, so we normalize both).
// ============================================================================

const RGB_RE = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:[\s,/]+([\d.]+%?))?\s*\)$/i;

function parseRgbString(s: string): RGBA | null {
  const m = RGB_RE.exec(s.trim());
  if (!m) return null;
  let a = 1;
  if (m[4] !== undefined) {
    a = m[4].endsWith("%") ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
  }
  return rgba(parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3]), a);
}

function parseHex(s: string): RGBA | null {
  const h = s.replace("#", "").trim();
  if (!/^[0-9a-fA-F]{3,8}$/.test(h)) return null;
  if (h.length === 3 || h.length === 4) {
    const r = parseInt(h[0] + h[0], 16), g = parseInt(h[1] + h[1], 16), b = parseInt(h[2] + h[2], 16);
    const a = h.length === 4 ? parseInt(h[3] + h[3], 16) / 255 : 1;
    return rgba(r, g, b, a);
  }
  if (h.length === 6 || h.length === 8) {
    const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
    const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
    return rgba(r, g, b, a);
  }
  return null;
}

/** Hidden probe element: lets the browser itself normalize hsl/oklch/named colors. */
let probeEl: HTMLElement | null = null;

function normalizeViaProbe(color: string): RGBA | null {
  if (typeof document === "undefined") return null;
  if (!probeEl || !probeEl.isConnected) {
    probeEl = document.createElement("span");
    probeEl.id = "__blend_color_probe__";
    probeEl.style.cssText = "position:fixed;left:-9999px;top:-9999px;width:0;height:0;pointer-events:none;";
    document.body.appendChild(probeEl);
  }
  probeEl.style.color = "rgb(1, 2, 3)"; // sentinel
  probeEl.style.color = color;
  const out = getComputedStyle(probeEl).color;
  const parsed = parseRgbString(out);
  if (parsed && parsed.r === 1 && parsed.g === 2 && parsed.b === 3 && color !== "rgb(1, 2, 3)") {
    return null; // browser rejected the color
  }
  return parsed;
}

function parseColor(s: string | undefined | null): RGBA | null {
  if (!s) return null;
  const t = s.trim().toLowerCase();
  if (t === "transparent" || t === "none") return TRANSPARENT;
  if (t.startsWith("#")) return parseHex(t);
  const direct = parseRgbString(t);
  if (direct) return direct;
  return normalizeViaProbe(s);
}

// ============================================================================
// Tokenizer — split CSS lists at top level (respects nested parentheses)
// ============================================================================

function splitTopLevel(input: string, sep = ","): string[] {
  const out: string[] = [];
  let depth = 0, cur = "";
  for (const ch of input) {
    if (ch === "(") depth++;
    else if (ch === ")") depth--;
    if (ch === sep && depth === 0) { out.push(cur.trim()); cur = ""; }
    else cur += ch;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

// ============================================================================
// Local-space geometry — transform & clip-path aware containment.
// getBoundingClientRect() is the AABB of the transformed box, so a rotated
// wedge "contains" points it never paints. We invert the element's own
// transform and do all containment + gradient math in untransformed local px.
// ============================================================================

interface LocalSpace {
  w: number;
  h: number;
  /** viewport point → local px, or null if outside the painted box. */
  toLocal(vx: number, vy: number): { x: number; y: number } | null;
}

function parseLen(tok: string | undefined, ref: number): number {
  if (!tok) return 0;
  if (tok.endsWith("%")) return (parseFloat(tok) / 100) * ref;
  const n = parseFloat(tok);
  return isNaN(n) ? 0 : n;
}

function pointInPolygon(pts: { x: number; y: number }[], x: number, y: number): boolean {
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const xi = pts[i].x, yi = pts[i].y, xj = pts[j].x, yj = pts[j].y;
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

/** Does this element actually paint at local (lx, ly), given its clip-path? */
function passesClip(cs: CSSStyleDeclaration, lx: number, ly: number, w: number, h: number): boolean {
  const cp = cs.clipPath;
  if (!cp || cp === "none") return true;

  const poly = /polygon\(([^)]*)\)/i.exec(cp);
  if (poly) {
    const pts = splitTopLevel(poly[1]).map((pair) => {
      const toks = pair.trim().split(/\s+/);
      return { x: parseLen(toks[0], w), y: parseLen(toks[1] ?? toks[0], h) };
    });
    return pts.length >= 3 ? pointInPolygon(pts, lx, ly) : true;
  }

  const inset = /inset\(([^)]*)\)/i.exec(cp);
  if (inset) {
    const toks = inset[1].split("round")[0].trim().split(/\s+/);
    const t = toks[0], r = toks[1] ?? t, b = toks[2] ?? t, l = toks[3] ?? r;
    return (
      lx >= parseLen(l, w) && lx <= w - parseLen(r, w) &&
      ly >= parseLen(t, h) && ly <= h - parseLen(b, h)
    );
  }

  return true; // circle()/ellipse()/path(): rare on section bgs — assume paints
}

function getLocalSpace(el: HTMLElement, cs: CSSStyleDeclaration, rect: DOMRect): LocalSpace | null {
  const w = el.offsetWidth || rect.width;
  const h = el.offsetHeight || rect.height;
  if (w <= 0 || h <= 0) return null;

  const t = cs.transform;

  // Fast path: no own transform. Ratio maps through any uniform ancestor
  // scale (your responsive-mode scale()) automatically.
  if (!t || t === "none") {
    const sx = rect.width / w || 1;
    const sy = rect.height / h || 1;
    return {
      w, h,
      toLocal(vx, vy) {
        const x = (vx - rect.left) / sx;
        const y = (vy - rect.top) / sy;
        return x >= -0.5 && x <= w + 0.5 && y >= -0.5 && y <= h + 0.5 ? { x, y } : null;
      },
    };
  }

  let m: DOMMatrix, inv: DOMMatrix;
  try {
    m = new DOMMatrix(t);
    inv = m.inverse();
  } catch {
    return null; // non-invertible (scale 0 etc.) → paints nothing measurable
  }

  let ox = w / 2, oy = h / 2;
  const to = cs.transformOrigin.split(" ");
  if (to.length >= 2) { ox = parseLen(to[0], w); oy = parseLen(to[1], h); }

  // Transformed corner bounds (about the transform origin), so we can undo
  // the ancestor scale baked into rect before inverting the own transform.
  const mapPt = (x: number, y: number) => {
    const p = m.transformPoint(new DOMPoint(x - ox, y - oy));
    return { x: p.x + ox, y: p.y + oy };
  };
  const corners = [mapPt(0, 0), mapPt(w, 0), mapPt(w, h), mapPt(0, h)];
  const minX = Math.min(...corners.map((p) => p.x));
  const maxX = Math.max(...corners.map((p) => p.x));
  const minY = Math.min(...corners.map((p) => p.y));
  const maxY = Math.max(...corners.map((p) => p.y));
  const sx = rect.width / (maxX - minX || 1);
  const sy = rect.height / (maxY - minY || 1);

  return {
    w, h,
    toLocal(vx, vy) {
      const qx = (vx - rect.left) / sx + minX;
      const qy = (vy - rect.top) / sy + minY;
      const p = inv.transformPoint(new DOMPoint(qx - ox, qy - oy));
      const x = p.x + ox, y = p.y + oy;
      return x >= -0.5 && x <= w + 0.5 && y >= -0.5 && y <= h + 0.5 ? { x, y } : null;
    },
  };
}

// ============================================================================
// Tile geometry — the missing piece for dotted/striped patterns. Each
// background layer has its own size/position/repeat; a 24px dot tile must be
// sampled inside its OWN tile, not stretched across the whole section.
// ============================================================================

interface TileGeom { sw: number; sh: number; ox: number; oy: number; repX: boolean; repY: boolean }

function cycle<T>(arr: T[], i: number, fallback: T): T {
  return arr.length ? arr[i % arr.length] : fallback;
}

function layerGeometry(cs: CSSStyleDeclaration, layerCount: number, w: number, h: number): TileGeom[] {
  const sizes = splitTopLevel(cs.backgroundSize || "auto");
  const positions = splitTopLevel(cs.backgroundPosition || "0% 0%");
  const repeats = splitTopLevel(cs.backgroundRepeat || "repeat");
  const out: TileGeom[] = [];

  for (let i = 0; i < layerCount; i++) {
    // size — gradients have no intrinsic size: auto/cover/contain = box
    const size = cycle(sizes, i, "auto").trim().toLowerCase();
    let sw = w, sh = h;
    if (size && !["auto", "auto auto", "cover", "contain"].includes(size)) {
      const toks = size.split(/\s+/);
      sw = toks[0] === "auto" ? w : parseLen(toks[0], w) || w;
      sh = !toks[1] || toks[1] === "auto" ? h : parseLen(toks[1], h) || h;
    }

    // position — % means fraction of the LEFTOVER space (CSS spec)
    const pos = cycle(positions, i, "0% 0%").trim().split(/\s+/);
    const pxTok = pos[0] ?? "0%";
    const pyTok = pos[1] ?? "50%";
    const ox = pxTok.endsWith("%") ? ((w - sw) * parseFloat(pxTok)) / 100 : parseLen(pxTok, w);
    const oy = pyTok.endsWith("%") ? ((h - sh) * parseFloat(pyTok)) / 100 : parseLen(pyTok, h);

    // repeat — may be one or two values
    const rep = cycle(repeats, i, "repeat").trim().toLowerCase().split(/\s+/);
    const rx = rep[0] ?? "repeat";
    const ry = rep[1] ?? (rx === "repeat-x" ? "no-repeat" : rx === "repeat-y" ? "no-repeat" : rx);
    out.push({
      sw: Math.max(sw, 0.01), sh: Math.max(sh, 0.01), ox, oy,
      repX: rx === "repeat" || rx === "repeat-x" || rx === "space" || rx === "round",
      repY: ry === "repeat" || rx === "repeat-y" || ry === "space" || ry === "round",
    });
  }
  return out;
}

// ============================================================================
// Gradient sampling — given a computed background-image layer and a point
// inside a tile box, return the color of that layer at that point.
// Computed gradients always carry rgb()/rgba() stops, so parsing is exact.
// ============================================================================

interface Stop { color: RGBA; pos: number | null }

function parseStops(parts: string[]): Stop[] {
  const stops: Stop[] = [];
  for (const part of parts) {
    // color is everything up to the last balanced paren group; positions follow
    const m = /^((?:[a-zA-Z-]+\([^)]*\)|#[0-9a-fA-F]{3,8}|[a-zA-Z]+))\s*(.*)$/.exec(part.trim());
    if (!m) continue;
    const color = parseColor(m[1]);
    if (!color) continue;
    const posTokens = m[2].trim().split(/\s+/).filter(Boolean);
    let pos: number | null = null;
    for (const tok of posTokens) {
      if (tok.endsWith("%")) { pos = parseFloat(tok) / 100; break; }
      if (tok.endsWith("px")) { pos = null; break; } // px positions: fall back to even spread
    }
    stops.push({ color, pos });
    // double-position stops: add second entry
    const second = posTokens.filter((t) => t.endsWith("%"))[1];
    if (second) stops.push({ color, pos: parseFloat(second) / 100 });
  }
  // fill missing positions (CSS spec: even distribution between known anchors)
  if (stops.length) {
    if (stops[0].pos == null) stops[0].pos = 0;
    if (stops[stops.length - 1].pos == null) stops[stops.length - 1].pos = 1;
    let i = 0;
    while (i < stops.length) {
      if (stops[i].pos == null) {
        let j = i;
        while (stops[j].pos == null) j++;
        const start = stops[i - 1].pos as number, end = stops[j].pos as number;
        const span = j - i + 1;
        for (let k = i; k < j; k++) stops[k].pos = start + ((end - start) * (k - i + 1)) / span;
        i = j;
      } else i++;
    }
    // enforce monotonicity
    for (let k = 1; k < stops.length; k++) {
      if ((stops[k].pos as number) < (stops[k - 1].pos as number)) stops[k].pos = stops[k - 1].pos;
    }
  }
  return stops;
}

function colorAtT(stops: Stop[], t: number): RGBA | null {
  if (!stops.length) return null;
  const tt = Math.max(0, Math.min(1, t));
  if (tt <= (stops[0].pos as number)) return stops[0].color;
  for (let i = 1; i < stops.length; i++) {
    const p0 = stops[i - 1].pos as number, p1 = stops[i].pos as number;
    if (tt <= p1) {
      const span = p1 - p0;
      return span <= 0 ? stops[i].color : lerpColor(stops[i - 1].color, stops[i].color, (tt - p0) / span);
    }
  }
  return stops[stops.length - 1].color;
}

function angleFromDirection(dir: string, w: number, h: number): number {
  const d = dir.trim().toLowerCase();
  if (d.endsWith("deg")) return parseFloat(d);
  if (d.endsWith("turn")) return parseFloat(d) * 360;
  if (d.endsWith("rad")) return (parseFloat(d) * 180) / Math.PI;
  if (d.startsWith("to ")) {
    const parts = d.slice(3).split(/\s+/).sort().join(" ");
    const corner = (Math.atan2(w, h) * 180) / Math.PI; // exact CSS corner angle
    switch (parts) {
      case "top": return 0;
      case "right": return 90;
      case "bottom": return 180;
      case "left": return 270;
      case "right top": return corner;
      case "bottom right": return 180 - corner;
      case "bottom left": return 180 + corner;
      case "left top": return 360 - corner;
    }
  }
  return 180; // CSS default: to bottom
}

/** Sample one background-image layer at local point (px,py) inside an sw×sh tile box. */
function sampleLayerAt(layer: string, sw: number, sh: number, px: number, py: number): RGBA | null {
  const fn = /^([a-z-]+)\((.*)\)$/is.exec(layer.trim());
  if (!fn) return null;
  const name = fn[1].toLowerCase();
  const body = fn[2];

  if (name.includes("url")) return null; // raster images: skip layer (can't read pixels cheaply)

  const args = splitTopLevel(body);
  if (!args.length) return null;

  const w = sw, h = sh;

  if (name.endsWith("linear-gradient")) {
    let first = args[0];
    let stopsArgs = args;
    const hasDir = /^(to\s|[-\d.]+(deg|turn|rad))/i.test(first.trim());
    let angle = 180;
    if (hasDir) { angle = angleFromDirection(first, w, h); stopsArgs = args.slice(1); }
    const stops = parseStops(stopsArgs);
    // gradient line math (angle: 0 = to top, clockwise, screen y-down)
    const rad = (angle * Math.PI) / 180;
    const dx = Math.sin(rad), dy = -Math.cos(rad);
    const L = Math.abs(w * Math.sin(rad)) + Math.abs(h * Math.cos(rad));
    if (L <= 0) return colorAtT(stops, 0.5);
    const t = 0.5 + ((px - w / 2) * dx + (py - h / 2) * dy) / L;
    const rep = name.startsWith("repeating");
    return colorAtT(stops, rep ? ((t % 1) + 1) % 1 : t);
  }

  if (name.endsWith("radial-gradient")) {
    let stopsArgs = args;
    let cx = w / 2, cy = h / 2;
    const shapeArg = args[0].toLowerCase();
    if (/(circle|ellipse|closest|farthest|\bat\b|%|px)/.test(shapeArg) && !parseColor(splitTopLevel(shapeArg, " ")[0] ?? "")) {
      stopsArgs = args.slice(1);
      const atMatch = /at\s+([\d.]+%?|\w+)\s*([\d.]+%?|\w+)?/i.exec(shapeArg);
      if (atMatch) {
        const resolve = (tok: string | undefined, size: number, def: number): number => {
          if (!tok) return def;
          if (tok.endsWith("%")) return (parseFloat(tok) / 100) * size;
          if (tok === "left" || tok === "top") return 0;
          if (tok === "right" || tok === "bottom") return size;
          if (tok === "center") return size / 2;
          const n = parseFloat(tok);
          return isNaN(n) ? def : n;
        };
        cx = resolve(atMatch[1], w, w / 2);
        cy = resolve(atMatch[2], h, h / 2);
      }
    }
    const stops = parseStops(stopsArgs);
    // farthest-corner normalization (good approximation for ellipse too)
    const fc = Math.max(
      Math.hypot(cx, cy), Math.hypot(w - cx, cy),
      Math.hypot(cx, h - cy), Math.hypot(w - cx, h - cy)
    );
    if (fc <= 0) return colorAtT(stops, 0);
    return colorAtT(stops, Math.hypot(px - cx, py - cy) / fc);
  }

  if (name.endsWith("conic-gradient")) {
    const stops = parseStops(args.filter((a) => !/^from|^at/i.test(a.trim())));
    return colorAtT(stops, 0.5); // approximation: average band
  }

  return null;
}

// ============================================================================
// DOM compositing — the real "what color is on screen at (x, y)" engine.
// Works on offscreen/scrolled-out blocks too (unlike elementsFromPoint), and
// now understands transforms, clip-paths, and tiled background patterns.
// ============================================================================

function isIgnored(el: HTMLElement): boolean {
  return el.hasAttribute("data-blend-ignore");
}

/** Cheap AABB prefilter of `scope`'s subtree; precise containment happens in ownPaintAt. */
function stackAt(scope: HTMLElement, x: number, y: number): HTMLElement[] {
  const out: HTMLElement[] = [];
  const walk = (el: HTMLElement) => {
    if (isIgnored(el)) return;
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") return;
    const r = el.getBoundingClientRect();
    const near =
      r.width > 0 && r.height > 0 &&
      x >= r.left - 2 && x <= r.right + 2 && y >= r.top - 2 && y <= r.bottom + 2;
    if (near) out.push(el); // AABB prefilter only — ownPaintAt does the real test
    if (near || cs.overflow === "visible") {
      for (const child of Array.from(el.children)) {
        if (child instanceof HTMLElement) walk(child);
      }
    }
  };
  walk(scope);
  return out;
}

/** This element's OWN paint (bg layers + bg color) at the point, with opacity,
 *  transform, clip-path and background tiling all applied. */
function ownPaintAt(el: HTMLElement, vx: number, vy: number): RGBA | null {
  const cs = getComputedStyle(el);
  const opacity = parseFloat(cs.opacity || "1");
  if (opacity <= 0.01) return null;

  const rect = el.getBoundingClientRect();
  const local = getLocalSpace(el, cs, rect);
  if (!local) return null;

  const pt = local.toLocal(vx, vy);
  if (!pt) return null;                                          // rotated wedge: point not really inside
  if (!passesClip(cs, pt.x, pt.y, local.w, local.h)) return null; // diagonal clip-path cut

  let acc = TRANSPARENT;
  if (cs.backgroundImage && cs.backgroundImage !== "none") {
    const layers = splitTopLevel(cs.backgroundImage); // first = topmost
    const geoms = layerGeometry(cs, layers.length, local.w, local.h);
    for (let i = 0; i < layers.length; i++) {
      const g = geoms[i];
      let tx = pt.x - g.ox;
      let ty = pt.y - g.oy;
      if (g.repX) tx = ((tx % g.sw) + g.sw) % g.sw;
      else if (tx < 0 || tx > g.sw) continue; // outside a no-repeat tile
      if (g.repY) ty = ((ty % g.sh) + g.sh) % g.sh;
      else if (ty < 0 || ty > g.sh) continue;

      const c = sampleLayerAt(layers[i], g.sw, g.sh, tx, ty);
      if (c && c.a > 0) {
        acc = over(acc, c);
        if (acc.a >= 0.997) break;
      }
    }
  }
  if (acc.a < 0.997) {
    const bc = parseColor(cs.backgroundColor);
    if (bc && bc.a > 0) acc = over(acc, bc);
  }
  if (acc.a <= 0) return null;
  return withOpacity(acc, opacity);
}

/** Fully composited on-screen color at (x, y), scoped to a block element. */
function compositeAt(scope: HTMLElement, x: number, y: number, canvasBg: RGBA): RGBA {
  const stack = stackAt(scope, x, y);
  let acc = TRANSPARENT;
  for (let i = stack.length - 1; i >= 0; i--) { // last in doc order ≈ topmost paint
    const c = ownPaintAt(stack[i], x, y);
    if (c) {
      acc = over(acc, c);
      if (acc.a >= 0.997) return acc;
    }
  }
  // still translucent → composite ancestors (up to the canvas), then canvas bg
  let p: HTMLElement | null = scope.parentElement;
  while (p && acc.a < 0.997) {
    const c = ownPaintAt(p, x, y);
    if (c) acc = over(acc, c);
    if (p.classList.contains("preview-edit-canvas")) break;
    p = p.parentElement;
  }
  return over(acc, canvasBg);
}

// ============================================================================
// Pattern continuation — when a neighbor's background is a small repeating
// tile (dots, grid, stripes), the correct blend clones the pattern layers,
// it doesn't average them into a gray.
// ============================================================================

interface PatternStack { color: string; image: string; size: string; position: string; repeat: string }

function tiledPatternOf(el: HTMLElement, blockWidth: number): PatternStack | null {
  const cs = getComputedStyle(el);
  if (!cs.backgroundImage || cs.backgroundImage === "none") return null;
  const layers = splitTopLevel(cs.backgroundImage);
  if (layers.some((l) => l.includes("url("))) return null;
  const w = el.offsetWidth || 1, h = el.offsetHeight || 1;
  const geoms = layerGeometry(cs, layers.length, w, h);
  const maxTile = Math.max(160, blockWidth / 3);
  const isTiled = geoms.some((g) => (g.repX || g.repY) && (g.sw <= maxTile || g.sh <= maxTile));
  if (!isTiled) return null;
  return {
    color: cs.backgroundColor,
    image: cs.backgroundImage,
    size: cs.backgroundSize,
    position: cs.backgroundPosition,
    repeat: cs.backgroundRepeat,
  };
}

/** Topmost tiled pattern visible at (x,y) — checks the block's subtree, then
 *  ancestors up to the canvas (dots often live on an ancestor/canvas layer). */
function findPatternAt(blockEl: HTMLElement, x: number, y: number, blockWidth: number): PatternStack | null {
  const stack = stackAt(blockEl, x, y);
  for (let i = stack.length - 1; i >= 0; i--) {
    const p = tiledPatternOf(stack[i], blockWidth);
    if (p) return p;
  }
  let a: HTMLElement | null = blockEl.parentElement;
  while (a) {
    const p = tiledPatternOf(a, blockWidth);
    if (p) return p;
    if (a.classList.contains("preview-edit-canvas")) break;
    a = a.parentElement;
  }
  return null;
}

// ============================================================================
// Seam sampling — left / center / right at a block's top or bottom edge
// ============================================================================

interface Seam { left: RGBA; center: RGBA; right: RGBA; pattern: PatternStack | null }

const SEAM_XS = [0.08, 0.5, 0.92];

function sampleSeam(blockEl: HTMLElement, edge: "top" | "bottom", canvasBg: RGBA): Seam | null {
  const rect = blockEl.getBoundingClientRect();
  if (rect.width < 4 || rect.height < 4) return null;
  const inset = Math.min(3, rect.height / 4);
  const y = edge === "bottom" ? rect.bottom - inset : rect.top + inset;
  const [l, c, r] = SEAM_XS.map((f) =>
    compositeAt(blockEl, rect.left + rect.width * f, y, canvasBg)
  );
  const pattern = findPatternAt(blockEl, rect.left + rect.width * 0.5, y, rect.width);
  return { left: l, center: c, right: r, pattern };
}

function flatSeam(c: RGBA): Seam {
  return { left: c, center: c, right: c, pattern: null };
}

// ============================================================================
// Prop-based fallback (SSR / element not mounted) — kept from the old version
// ============================================================================

function extractPropEdge(b: Block | null, theme: Theme, edge: "top" | "bottom"): string {
  if (!b) return theme.bg;
  const props = b.props as Record<string, unknown>;
  const declared = props._bgEdge as { top?: string; bottom?: string } | undefined;
  if (declared?.[edge]) return declared[edge] as string;
  const computed = props._blendEdges as { top?: string; bottom?: string } | undefined;
  if (computed?.[edge]) return computed[edge] as string;
  const flat =
    (typeof props.backgroundColor === "string" && props.backgroundColor) ||
    (typeof props.bg === "string" && props.bg) ||
    (b.overrides?.style?.backgroundColor as string | undefined) ||
    null;
  return flat || theme.bg;
}

// ============================================================================
// color-mix helpers for accent effects (theme colors may be any CSS format)
// ============================================================================

function clampPct(n: number): number { return Math.max(0, Math.min(100, Math.round(n))); }
function withAlpha(color: string, percent: number): string {
  return `color-mix(in srgb, ${color} ${clampPct(percent)}%, transparent)`;
}
function mixCss(a: string, b: string, wA = 50): string {
  const w = clampPct(wA);
  return `color-mix(in srgb, ${a} ${w}%, ${b} ${100 - w}%)`;
}

// ============================================================================
// Blend modes — all built from REAL sampled seam colors
// ============================================================================

interface BlendCtx {
  top: Seam;      // prev block's bottom seam
  bottom: Seam;   // next block's top seam
  isLight: boolean;
  accent: string;
  accent2: string;
  ink: string;
  surface: string;
}

interface BlendResult {
  bgColor: string;
  bgImage: string; // "none" if flat
  bgSize?: string;
  bgPosition?: string;
  bgRepeat?: string;
  edgeTop: string;
  edgeBottom: string;
}

const TOTAL_MODES = 7;
const VARY_THRESHOLD = 26; // seam counts as horizontally varied above this

/** Corner-anchored radials: exactly match a seam whose left/right differ (diagonal Heroes). */
function cornerLayers(top: Seam, bottom: Seam): string[] {
  const layers: string[] = [];
  if (dist(top.left, top.center) > VARY_THRESHOLD)
    layers.push(`radial-gradient(70% 60% at 0% 0%, ${cssOf(top.left)} 0%, ${cssOf0(top.left)} 72%)`);
  if (dist(top.right, top.center) > VARY_THRESHOLD)
    layers.push(`radial-gradient(70% 60% at 100% 0%, ${cssOf(top.right)} 0%, ${cssOf0(top.right)} 72%)`);
  if (dist(bottom.left, bottom.center) > VARY_THRESHOLD)
    layers.push(`radial-gradient(70% 60% at 0% 100%, ${cssOf(bottom.left)} 0%, ${cssOf0(bottom.left)} 72%)`);
  if (dist(bottom.right, bottom.center) > VARY_THRESHOLD)
    layers.push(`radial-gradient(70% 60% at 100% 100%, ${cssOf(bottom.right)} 0%, ${cssOf0(bottom.right)} 72%)`);
  return layers;
}

function computeMode(step: number, ctx: BlendCtx): BlendResult {
  const { top, bottom, isLight, accent, accent2, ink, surface } = ctx;
  const tc = cssOf(top.center), bc = cssOf(bottom.center);
  const edgeTop = tc, edgeBottom = bc;

  switch (step) {
    case 1: {
      // SEAMLESS MELT — the "invisible spacer": pixel-matched vertical fade,
      // with corner radials wherever a neighbor's seam varies horizontally,
      // and pattern continuation when a neighbor sits on a tiled background
      // (dots/grid/stripes) instead of averaging the tile into a flat gray.
      const pTop = top.pattern, pBot = bottom.pattern;
      const same = pTop && pBot && pTop.image === pBot.image && pTop.size === pBot.size && pTop.repeat === pBot.repeat;

      // Both neighbors share the pattern (e.g. a dotted canvas) → the spacer
      // just IS the pattern. Pixel-identical continuation, dots and all.
      if (same) {
        return {
          bgColor: pTop!.color, bgImage: pTop!.image,
          bgSize: pTop!.size, bgPosition: pTop!.position, bgRepeat: pTop!.repeat,
          edgeTop: tc, edgeBottom: bc,
        };
      }

      // One side patterned → continue the pattern and fade it into the other
      // neighbor's real seam color.
      if (pTop || pBot) {
        const p = (pTop ?? pBot)!;
        const overlay = pTop
          ? `linear-gradient(to bottom, ${cssOf0(bottom.center)} 30%, ${bc} 100%)`
          : `linear-gradient(to bottom, ${tc} 0%, ${cssOf0(top.center)} 70%)`;
        return {
          bgColor: p.color,
          bgImage: `${overlay}, ${p.image}`,
          bgSize: `100% 100%, ${p.size}`,
          bgPosition: `0% 0%, ${p.position}`,
          bgRepeat: `no-repeat, ${p.repeat}`,
          edgeTop: tc, edgeBottom: bc,
        };
      }

      // No patterns → original seamless melt with corner radials.
      const layers = [
        ...cornerLayers(top, bottom),
        `linear-gradient(to bottom, ${tc} 0%, ${bc} 100%)`,
      ];
      return { bgColor: bc, bgImage: layers.join(", "), edgeTop, edgeBottom };
    }
    case 2: {
      // DIAGONAL MELT — follows the dominant horizontal variance so a split
      // Hero flows diagonally into the next block.
      const topVaried = dist(top.left, top.right) > VARY_THRESHOLD;
      const angle = topVaried
        ? (luminance(top.left) > luminance(top.right) ? "160deg" : "200deg")
        : "180deg";
      const mid = cssOf(avg([top.center, bottom.center]));
      return {
        bgColor: bc,
        bgImage: `linear-gradient(${angle}, ${cssOf(top.left)} 0%, ${mid} 50%, ${cssOf(bottom.right)} 100%)`,
        edgeTop, edgeBottom,
      };
    }
    case 3: {
      // ACCENT SWEEP — real seams at the edges, theme accent glow in the middle.
      const highlight = withAlpha(accent, isLight ? 28 : 42);
      return {
        bgColor: bc,
        bgImage: [
          ...cornerLayers(top, bottom),
          `linear-gradient(135deg, ${tc} 0%, ${highlight} 50%, ${bc} 100%)`,
        ].join(", "),
        edgeTop, edgeBottom,
      };
    }
    case 4: {
      // SPOTLIGHT — radial accent glow settling into the true neighbor colors.
      const glow = withAlpha(accent, isLight ? 32 : 48);
      return {
        bgColor: bc,
        bgImage: [
          `radial-gradient(ellipse 80% 70% at 50% 0%, ${glow} 0%, transparent 60%)`,
          ...cornerLayers(top, bottom),
          `linear-gradient(to bottom, ${tc} 0%, ${bc} 100%)`,
        ].join(", "),
        edgeTop, edgeBottom,
      };
    }
    case 5: {
      // GRID over a true melt.
      const gridLine = isLight ? withAlpha(ink, 5) : withAlpha(accent, 14);
      const sheen = isLight ? withAlpha(accent, 9) : withAlpha(accent2, 13);
      return {
        bgColor: bc,
        bgImage: [
          `linear-gradient(to right, ${gridLine} 1px, transparent 1px)`,
          `linear-gradient(to bottom, ${gridLine} 1px, transparent 1px)`,
          `linear-gradient(135deg, ${sheen} 0%, transparent 55%)`,
          ...cornerLayers(top, bottom),
          `linear-gradient(to bottom, ${tc} 0%, ${bc} 100%)`,
        ].join(", "),
        edgeTop, edgeBottom,
      };
    }
    case 6: {
      // SURFACE WASH — theme surface in the middle, true seams at the edges.
      return {
        bgColor: surface,
        bgImage: `linear-gradient(180deg, ${tc} 0%, ${mixCss(surface, tc, 70)} 30%, ${mixCss(surface, bc, 70)} 70%, ${bc} 100%)`,
        edgeTop, edgeBottom,
      };
    }
    case 7:
    default: {
      // SOLID MIDPOINT — numeric average of the two real seams.
      const solid = cssOf(avg([top.center, bottom.center]));
      return { bgColor: solid, bgImage: "none", edgeTop: solid, edgeBottom: solid };
    }
  }
}

// ============================================================================
// Public entry point
// ============================================================================

export function blendBlockWithNeighbors(
  blockId: string,
  blocks: Block[],
  theme: Theme,
  site?: SiteData | null,
  rootEl?: HTMLElement | null
): Record<string, unknown> {
  const sorted = [...blocks].sort((a, b) => a.order - b.order);
  const index = sorted.findIndex((b) => b.id === blockId);
  if (index === -1) return {};

  const currentBlock = sorted[index];
  const prev = index > 0 ? sorted[index - 1] : null;
  const next = index < sorted.length - 1 ? sorted[index + 1] : null;

  const canvasBg = parseColor(theme.bg) ?? rgba(255, 255, 255, 1);

  // ---- resolve the real seams from the DOM ----
  const root =
    rootEl ??
    (typeof document !== "undefined"
      ? document.querySelector<HTMLElement>(".preview-edit-canvas")
      : null);

  const findBlockEl = (b: Block | null): HTMLElement | null =>
    b && root ? root.querySelector<HTMLElement>(`[data-block-id="${b.id}"]`) : null;

  const prevEl = findBlockEl(prev);
  const nextEl = findBlockEl(next);

  const fallbackSeam = (b: Block | null, edge: "top" | "bottom"): Seam =>
    flatSeam(parseColor(extractPropEdge(b, theme, edge)) ?? canvasBg);

  const topSeam =
    (prevEl && sampleSeam(prevEl, "bottom", canvasBg)) || fallbackSeam(prev, "bottom");
  const bottomSeam =
    (nextEl && sampleSeam(nextEl, "top", canvasBg)) || fallbackSeam(next, "top");

  // ---- theme context ----
  const isLight = luminance(canvasBg) > 0.7;
  const ctx: BlendCtx = {
    top: topSeam,
    bottom: bottomSeam,
    isLight,
    accent: theme.accent || "#3b82f6",
    accent2: theme.accent2 || theme.accent || "#8b5cf6",
    ink: theme.ink || (isLight ? "#111111" : "#ffffff"),
    surface: theme.surface || (isLight ? "#f4f4f5" : "#18181b"),
  };

  // ---- step cycling with same-render guard ----
  const currentProps = currentBlock.props as Record<string, unknown>;
  const currentStep = currentProps._blendStep;
  const prevSignature = currentProps._blendSignature as string | undefined;

  let nextStep = typeof currentStep === "number" ? (currentStep % TOTAL_MODES) + 1 : 1;
  let result = computeMode(nextStep, ctx);
  let signature = `${result.bgColor}|${result.bgImage}`;

  let attempts = 0;
  while (prevSignature && signature === prevSignature && attempts < TOTAL_MODES - 1) {
    nextStep = (nextStep % TOTAL_MODES) + 1;
    result = computeMode(nextStep, ctx);
    signature = `${result.bgColor}|${result.bgImage}`;
    attempts++;
  }

  const elementStyle: Partial<PreviewElementStyle> = {
    backgroundColor: result.bgColor,
    backgroundImage: result.bgImage !== "none" ? result.bgImage : null,
  };

  return {
    backgroundColor: result.bgColor,
    backgroundImage: result.bgImage !== "none" ? result.bgImage : undefined,
    backgroundSize: result.bgSize,
    backgroundPosition: result.bgPosition,
    backgroundRepeat: result.bgRepeat,
    // kill inherited transitions/animations — this is the "coming with
    // animation" bug: the blended bg was tweening in via a global transition
    transition: "none",
    animation: "none",
    _blendStep: nextStep,
    _blendSignature: signature,
    _blendEdges: { top: result.edgeTop, bottom: result.edgeBottom },
    isBlended: true,
    elementStyle,
  };
}
