# Live Preview Click-To-Edit System

This preview editor does not edit the original template JSON files or the block components directly. When a template preview opens, the app creates a local in-memory working copy of the selected template, analyzes the blocks and variants in that copy, and stores all preview-only edits inside that copied object.

## Main Files

- `src/components/editor/TemplatePreviewDialog.tsx`
  - Owns the in-memory preview session.
  - Clones the selected template with `structuredClone(template)`.
  - Shows the short loading state while it prepares the editable working copy.
  - Stores the edited session in local React state as `site`.
  - Passes the final edited `site` object to `onSave(site)`.

- `src/components/editor/TemplateLivePreview.tsx`
  - Renders the actual blocks from the working copy.
  - Detects every rendered DOM element inside every block.
  - Assigns each element a stable preview edit id like:

```txt
block-id:0.1.2
```

  - Handles clicking elements, selecting them, applying live styles, and dragging selected elements.

- `src/components/editor/ElementStylePanel.tsx`
  - The right-side editor panel for the selected element.
  - Updates bold, italic, underline, text color, background color, border radius, padding, width, height, position, reset, and remove.

- `src/types/builder.schema.ts`
  - Defines the `previewEdits` types that store all temporary preview changes.

## Temporary Storage

Temporary edits are stored in memory on the cloned `SiteData` object:

```ts
site.previewEdits
```

Shape:

```ts
{
  analyzedAt: string;
  blocks: [
    {
      id: string;
      kind: "navbar" | "hero" | "projects" | "about" | "testimonials" | "contact" | "footer" | string;
      variant?: string;
      order: number;
    }
  ];
  elements: {
    [elementId: string]: {
      id: string;
      blockId: string;
      blockKind: string;
      label: string;
      style: {
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
    };
  };
}
```

Nothing is written to `src/data/templates/*.json`. Nothing is written to `src/components/blocks/*`. The edits only exist while the preview dialog is open unless you save/send the `site` object somewhere.

## How Selection Works

When the preview renders, `TemplateLivePreview` walks through every element inside each block root:

```tsx
root.querySelectorAll("[data-block-id]")
```

For each DOM element, it creates a preview id from:

- the block id
- the element's DOM path inside that block

Example:

```txt
hero-main:0.2.1
```

That id points to one exact rendered element in the preview session. Style changes are stored against only that id, so changing one button/card/text/image does not affect other elements.

## How Live Styles Apply

When an element has saved edits in `site.previewEdits.elements[elementId].style`, the preview applies them directly to that rendered element as inline styles.

Examples:

```ts
element.style.fontWeight = style.bold ? "700" : "400";
element.style.color = style.color || "";
element.style.backgroundColor = style.backgroundColor || "";
element.style.borderRadius = `${style.borderRadius}px`;
element.style.translate = `${style.x}px ${style.y}px`;
```

Dragging updates only:

```ts
style.x
style.y
```

Remove sets:

```ts
removed: true
```

The preview then renders that element with:

```ts
display: "none"
```

## How To Send This To Backend

Use the edited `site` object passed to `onSave(site)`.

That object contains:

- original template metadata
- theme
- blocks
- block order
- block props
- preview edit metadata
- per-element styles and positions

Example frontend call:

```ts
async function saveEditedPreview(site: SiteData) {
  await fetch("/api/generate-html", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(site),
  });
}
```

Then pass it into the preview dialog:

```tsx
<TemplatePreviewDialog
  template={template}
  open={open}
  onClose={() => setOpen(false)}
  onSave={saveEditedPreview}
/>
```

## Backend Generation Plan

The backend should receive the full edited `SiteData`.

Backend steps:

1. Read `site.blocks`.
2. Sort blocks by `order`.
3. For each block, read:

```ts
block.props.kind
block.props.variant
block.props
```

4. Generate the base HTML for that block using the same block kind and variant.
5. Read `site.previewEdits.elements`.
6. For each edited element:
   - find the matching block by `blockId`
   - find the exact generated element by its stored DOM path after the colon
   - apply the stored style values as CSS
   - skip/remove the element if `removed === true`

Example element id:

```txt
hero-main:0.2.1
```

Backend interpretation:

```txt
blockId = "hero-main"
elementPath = "0.2.1"
```

The backend can use that path to walk the generated HTML tree:

```txt
root.children[0].children[2].children[1]
```

Then apply the stored CSS to that exact element.

## Example Payload

```json
{
  "id": "developer-clean-slate",
  "name": "Developer Portfolio",
  "theme": {
    "bg": "#ffffff",
    "ink": "#111111",
    "accent": "#6366f1",
    "fontHeading": "inherit",
    "fontBody": "inherit",
    "corners": "soft",
    "spacing": "cozy"
  },
  "blocks": [
    {
      "id": "hero-main",
      "type": "section",
      "order": 0,
      "props": {
        "kind": "hero",
        "variant": "hero-1",
        "name": "Hassan Rehan"
      }
    }
  ],
  "previewEdits": {
    "analyzedAt": "2026-07-27T12:00:00.000Z",
    "blocks": [
      {
        "id": "hero-main",
        "kind": "hero",
        "variant": "hero-1",
        "order": 0
      }
    ],
    "elements": {
      "hero-main:0.2.1": {
        "id": "hero-main:0.2.1",
        "blockId": "hero-main",
        "blockKind": "hero",
        "label": "Hire me",
        "style": {
          "bold": true,
          "color": "#ffffff",
          "backgroundColor": "#111111",
          "borderRadius": 14,
          "padding": 12,
          "x": 20,
          "y": -8
        }
      }
    }
  }
}
```

## Important Notes

- This is session-only until `onSave(site)` sends the edited copy somewhere.
- The original template files stay unchanged.
- The original block components stay unchanged.
- `previewEdits.elements` is the important backend data for exact per-element CSS.
- `previewEdits.blocks` tells the backend which block kinds and variants were active in the preview.
- Use `blockId:path` to target the exact generated element.

